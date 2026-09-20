import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { PERSONAL_INFO, PROJECTS, AD_CREATIVES } from '../data/portfolioData';
import { X, Download, FileText, CheckCircle, Mail, ExternalLink, Sparkles } from 'lucide-react';

interface PdfRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfRequestModal: React.FC<PdfRequestModalProps> = ({ isOpen, onClose }) => {
  const { palette } = useTheme();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    // Create a mock text file / PDF summary download
    const summaryText = `[김나영 디자이너 포트폴리오 요약본 2026]
이름: ${PERSONAL_INFO.nameKr} (${PERSONAL_INFO.name})
전문 분야: ${PERSONAL_INFO.role}
이메일: ${PERSONAL_INFO.email}
연락처: ${PERSONAL_INFO.phone}
최근 업데이트: ${PERSONAL_INFO.lastUpdate}

[수록 프로젝트]
1. 스텔라 떡볶이 - 떡볶이 브랜드 리브랜딩 (BX)
2. KADAE 카대 - 로컬 중심 카페 브랜딩 (BX)
3. SYNCROOM - 인터넷 합주 프로그램 리브랜딩 (BX)
4. “상처받지마” 하나카드 - 하나카드 PLATE 디자인 3종 (GD)
5. 퍼포먼스 광고 소재 아카이브 - GFA & META 30+종

* 고해상도 인쇄용 PDF 원본 요청은 ${PERSONAL_INFO.email}로 문의주시면 바로 회신 드립니다.`;

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KimNaYoung_Portfolio_Summary_2026.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) return;
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setRecipientEmail('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-xl rounded-3xl overflow-hidden border shadow-2xl flex flex-col p-6 sm:p-8 gap-6 transition-colors duration-300"
        style={{
          backgroundColor: palette.surface,
          borderColor: palette.border,
          color: palette.text,
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: palette.border }}>
          <div className="flex items-center gap-2 font-mono-custom text-xs">
            <FileText className="w-4 h-4 text-rose-500" />
            <span className="font-bold uppercase tracking-wider">PDF PORTFOLIO DOCUMENT</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border hover:opacity-75 transition-opacity"
            style={{ borderColor: palette.border }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight">
            김나영 디자이너<br />2026 포트폴리오 문서
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: palette.textMuted }}>
            온라인 웹사이트에 수록된 4가지 핵심 브랜드 경험(BX) & 그래픽 디자인 케이스 스터디와
            GFA·META 퍼포먼스 광고 소재 30+선이 정리된 포트폴리오 패키지입니다.
          </p>

          {/* Included Checklist */}
          <div
            className="p-4 rounded-2xl border flex flex-col gap-2.5 font-mono-custom text-xs"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.badgeBg,
            }}
          >
            <div className="font-bold flex items-center gap-1.5" style={{ color: palette.accent }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>포함된 케이스 스터디 목록</span>
            </div>
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex items-center justify-between opacity-90 pl-1">
                <span>• {p.title} ({p.subTitle})</span>
                <span className="text-[11px] opacity-60">{p.categoryLabel}</span>
              </div>
            ))}
            <div className="flex items-center justify-between opacity-90 pl-1 border-t pt-2" style={{ borderColor: palette.border }}>
              <span>• 퍼포먼스 광고 소재 아카이브 (30+종)</span>
              <span className="text-[11px] opacity-60">GFA / META</span>
            </div>
          </div>

          {/* Direct Download Button */}
          <button
            onClick={handleSimulateDownload}
            className="w-full py-4 rounded-full font-mono-custom font-bold text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-98 shadow-md"
            style={{
              backgroundColor: palette.text,
              color: palette.bg,
            }}
          >
            {downloadSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>포트폴리오 요약 패키지 다운로드 완료!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>포트폴리오 요약본 즉시 다운로드 (TXT/PDF)</span>
              </>
            )}
          </button>

          {/* Email Delivery Option */}
          <div className="pt-3 border-t flex flex-col gap-2.5" style={{ borderColor: palette.border }}>
            <span className="font-mono-custom text-xs" style={{ color: palette.textMuted }}>
              인쇄용 대용량 고해상도 PDF를 이메일로 받아보시겠습니까?
            </span>
            {emailSent ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-custom flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>요청이 접수되었습니다! 24시간 이내에 고해상도 PDF 링크를 전달드립니다.</span>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="flex-grow px-4 py-2.5 rounded-full border text-xs font-mono-custom bg-transparent outline-none focus:border-current"
                  style={{ borderColor: palette.border }}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-mono-custom font-bold border transition-all hover:opacity-80"
                  style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}
                >
                  요청하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
