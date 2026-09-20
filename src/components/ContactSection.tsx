import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Copy, Check, Download, Phone, ArrowUp } from 'lucide-react';

interface ContactSectionProps {
  onOpenPdfModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPdfModal }) => {
  const { palette } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="w-full transition-colors duration-300 border-t"
      style={{
        backgroundColor: palette.id === 'obsidian' ? '#f4f2ee' : palette.surface,
        color: palette.id === 'obsidian' ? '#141414' : palette.text,
        borderColor: palette.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 flex flex-col justify-between min-h-[620px] gap-16">
        {/* Main Contact Action Box */}
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Section Eyebrow */}
          <div className="flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest opacity-70">
            <span>(04) CONTACT & INQUIRIES</span>
          </div>

          {/* Colossal Spencer Gabor style Email Link */}
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight leading-none no-underline transition-transform hover:translate-x-2 block break-all"
              style={{
                color: palette.id === 'obsidian' ? '#141414' : palette.text,
              }}
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          {/* Action Pills Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {/* Direct Mailto */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2.5 h-13 px-7 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
              style={{
                backgroundColor: palette.id === 'obsidian' ? '#141414' : palette.text,
                color: palette.id === 'obsidian' ? '#f4f2ee' : palette.bg,
              }}
            >
              <Mail className="w-4 h-4" />
              <span>메일 보내기</span>
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2.5 h-13 px-6 rounded-full border text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: palette.id === 'obsidian' ? '#141414' : palette.border,
                backgroundColor: 'transparent',
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 font-bold">이메일 복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>이메일 주소 복사</span>
                </>
              )}
            </button>

            {/* PDF Portfolio Modal Trigger */}
            <button
              onClick={onOpenPdfModal}
              className="inline-flex items-center gap-2.5 h-13 px-6 rounded-full border text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: palette.id === 'obsidian' ? '#141414' : palette.border,
                backgroundColor: 'transparent',
              }}
            >
              <Download className="w-4 h-4" />
              <span>PDF 포트폴리오 받기</span>
            </button>

            {/* Direct Phone */}
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-mono-custom opacity-85"
            >
              <Phone className="w-4 h-4" />
              <span>{PERSONAL_INFO.phone}</span>
            </div>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-custom text-xs"
          style={{
            borderColor: palette.id === 'obsidian' ? '#cfcbc3' : palette.border,
            color: palette.id === 'obsidian' ? '#5b5852' : palette.textMuted,
          }}
        >
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name}. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline opacity-60">DESIGNED & CRAFTED WITH CARE</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-bold hover:underline transition-all"
              style={{
                color: palette.id === 'obsidian' ? '#141414' : palette.text,
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
