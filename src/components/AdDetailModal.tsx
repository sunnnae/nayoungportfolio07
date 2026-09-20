import React, { useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { AdCreativeItem } from '../types';
import { X, Smartphone, Sparkles, Check, Share2 } from 'lucide-react';

interface AdDetailModalProps {
  ad: AdCreativeItem | null;
  onClose: () => void;
}

export const AdDetailModal: React.FC<AdDetailModalProps> = ({ ad, onClose }) => {
  const { palette } = useTheme();

  useEffect(() => {
    if (!ad) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [ad]);

  if (!ad) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl flex flex-col transition-colors duration-300 max-h-[90vh]"
        style={{
          backgroundColor: palette.surface,
          borderColor: palette.border,
          color: palette.text,
        }}
      >
        {/* Header */}
        <div
          className="p-5 sm:p-6 border-b flex items-center justify-between"
          style={{ borderColor: palette.border }}
        >
          <div className="flex items-center gap-2 font-mono-custom text-xs">
            <span className="px-2 py-0.5 rounded font-bold" style={{ backgroundColor: palette.badgeBg, color: palette.accent }}>
              #{ad.number}
            </span>
            <span className="font-semibold">{ad.brand} · {ad.platform} 광고 소재</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border hover:opacity-75 transition-opacity"
            style={{ borderColor: palette.border }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body with Simulated Mobile 4:5 Feed Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col md:flex-row gap-6 items-center">
          {/* Simulated Mobile Feed Aspect Ratio Banner */}
          <div
            className="w-full md:w-80 flex-shrink-0 aspect-square sm:aspect-[4/5] rounded-2xl border flex flex-col justify-between relative shadow-xl overflow-hidden"
            style={{
              backgroundColor: '#0a0a0a',
              borderColor: palette.border,
              color: '#ffffff',
            }}
          >
            {ad.image ? (
              <img
                src={ad.image}
                alt={ad.headline}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="p-6 h-full flex flex-col justify-between">
                {/* Top Micro-Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono-custom opacity-70">
                  <span className="font-bold">{ad.brand}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px]">{ad.platform} SPONSORED</span>
                </div>

                {/* Central Giant Headline */}
                <div className="flex flex-col gap-3 my-auto">
                  <div className="font-sans font-extrabold text-xl sm:text-2xl leading-tight tracking-tight drop-shadow-md">
                    {ad.headline}
                  </div>
                  {ad.subtext && (
                    <div className="text-xs font-normal opacity-85 leading-relaxed">
                      {ad.subtext}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono-custom opacity-60">1080 × 1350 px</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-black">
                    자세히 알아보기
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Analysis & Marketing Specs */}
          <div className="flex-grow flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <span className="font-mono-custom text-xs uppercase tracking-wider" style={{ color: palette.accent }}>
                HEADLINE COPY STRATEGY
              </span>
              <h3 className="font-bold text-xl sm:text-2xl leading-snug">
                “{ad.headline}”
              </h3>
              {ad.subtext && (
                <p className="text-sm opacity-80" style={{ color: palette.textMuted }}>
                  {ad.subtext}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-xl border font-mono-custom text-xs" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: palette.border }}>
                <span className="opacity-60">플랫폼</span>
                <span className="font-bold">{ad.platform}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: palette.border }}>
                <span className="opacity-60">해상도 / 비율</span>
                <span className="font-bold">{ad.dimensions} (4:5 Feed Ratio)</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: palette.border }}>
                <span className="opacity-60">기획 연도</span>
                <span className="font-bold">{ad.year}</span>
              </div>
              {ad.marketingAngle && (
                <div className="flex justify-between py-1">
                  <span className="opacity-60">마케팅 앵글</span>
                  <span className="font-bold text-emerald-400">{ad.marketingAngle}</span>
                </div>
              )}
            </div>

            {ad.metricsHighlight && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl border text-xs" style={{ borderColor: palette.border }}>
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="opacity-90">{ad.metricsHighlight}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
