import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowDownRight, Sparkles, Layers, Eye, FileText } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenPdfDeck?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection, onOpenPdfDeck }) => {
  const { palette } = useTheme();
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const letters = [
    { char: 'P', isBlur: false, driftClass: '' },
    { char: 'o', isBlur: false, driftClass: '' },
    { char: 'r', isBlur: false, driftClass: '' },
    { char: 't', isBlur: false, driftClass: '' },
    { char: 'f', isBlur: true, driftClass: 'drift-subtle-1' },
    { char: 'o', isBlur: true, driftClass: 'drift-subtle-2' },
    { char: 'l', isBlur: true, driftClass: 'drift-subtle-3' },
    { char: 'i', isBlur: true, driftClass: 'drift-subtle-1' },
    { char: 'o', isBlur: true, driftClass: 'drift-subtle-2' },
  ];

  return (
    <section className="relative w-full overflow-hidden transition-colors duration-300 min-h-[calc(100vh-5rem)] flex flex-col justify-between py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Metadata Grid - Matching PDF Page 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-12 border-b" style={{ borderColor: palette.border }}>
        <div className="flex flex-col gap-1 font-mono-custom text-xs">
          <span style={{ color: palette.textMuted }}>FINAL UPDATE</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: palette.text }}>
            {PERSONAL_INFO.lastUpdate}
          </span>
        </div>

        <div className="flex flex-col gap-1 font-mono-custom text-xs">
          <span style={{ color: palette.textMuted }}>DISCIPLINE & SPECIALTY</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: palette.text }}>
            BX · 3D · 2D Graphic portfolio
          </span>
        </div>

        <div className="flex flex-col gap-1 font-mono-custom text-xs">
          <span style={{ color: palette.textMuted }}>CONTACT INFO</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-wide" style={{ color: palette.text }}>
              {PERSONAL_INFO.phone} · {PERSONAL_INFO.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main Massive Spencer-style Typographic Display */}
      <div className="my-auto py-10 md:py-16 flex flex-col justify-center select-none">
        {/* Year Label */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none transition-colors"
            style={{ color: palette.text }}
          >
            2026
          </span>
          <div className="hidden sm:flex items-center gap-3 font-mono-custom text-xs" style={{ color: palette.textMuted }}>
            <span className="px-3 py-1 rounded-full border" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
              BX / GRAPHIC / 3D
            </span>
            <span>SEOUL & GLOBAL</span>
          </div>
        </div>

        {/* Huge Interactive "Portfolio" Title with Page 1 Dreamy Glow/Blur */}
        <h1
          id="hero-title"
          className="font-display font-normal text-6xl sm:text-8xl md:text-[140px] lg:text-[195px] xl:text-[230px] leading-[0.88] tracking-[-0.04em] whitespace-nowrap flex items-baseline overflow-hidden"
          style={{ color: palette.text }}
        >
          {letters.map((item, idx) => (
            <span
              key={idx}
              onMouseEnter={() => setHoveredLetter(idx)}
              onMouseLeave={() => setHoveredLetter(null)}
              className={`inline-block transition-all duration-300 cursor-default ${item.driftClass} ${
                hoveredLetter === idx ? 'scale-110 -translate-y-3' : ''
              } ${item.isBlur ? 'filter blur-[1.2px] hover:blur-none' : ''}`}
              style={{
                color: hoveredLetter === idx ? palette.accent : 'inherit',
                opacity: item.isBlur ? 0.9 : 1,
              }}
            >
              {item.char}
            </span>
          ))}
        </h1>

        {/* Action Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-start sm:justify-end gap-2.5 font-mono-custom text-xs">
          <button
            onClick={() => onScrollToSection('work')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.surface,
              color: palette.text,
            }}
          >
            <Layers className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>SELECTED WORK (4)</span>
            <ArrowDownRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <button
            onClick={() => onScrollToSection('ads')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.surface,
              color: palette.text,
            }}
          >
            <Eye className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>PERFORMANCE ADS</span>
            <ArrowDownRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-custom text-xs" style={{ borderColor: palette.border, color: palette.textMuted }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" style={{ color: palette.accent }} />
          <span>PORTFOLIO DIRECTORY 2026 · ALL RIGHTS RESERVED</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onScrollToSection('about')}
            className="hover:underline hover:text-white transition-colors"
          >
            MEET KIM NA YOUNG →
          </button>
        </div>
      </div>
    </section>
  );
};
