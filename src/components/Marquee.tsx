import React from 'react';
import { useTheme } from './ThemeContext';

export const Marquee: React.FC = () => {
  const { palette } = useTheme();

  const tickerItems = [
    { text: 'BRAND EXPERIENCE', highlight: true },
    { text: '3D · 2D', highlight: false },
    { text: 'GRAPHIC DESIGN', highlight: true },
    { text: 'PERFORMANCE ADS', highlight: false },
    { text: 'VISUAL IDENTITY', highlight: true },
    { text: 'ART DIRECTION', highlight: false },
    { text: 'TYPOGRAPHY & PACKAGING', highlight: true },
    { text: 'CREATIVE STRATEGY', highlight: false },
  ];

  return (
    <div
      className="w-full border-y py-5 md:py-6 overflow-hidden select-none transition-colors duration-300 relative"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.surface,
      }}
    >
      <div className="animate-marquee items-center gap-12 font-display text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase whitespace-nowrap">
        {/* First repetition */}
        {tickerItems.map((item, idx) => (
          <span key={`ticker-1-${idx}`} className="flex items-center gap-12">
            <span
              style={{
                color: item.highlight ? palette.text : palette.textMuted,
              }}
            >
              {item.text}
            </span>
            <span className="text-sm opacity-40">✦</span>
          </span>
        ))}

        {/* Duplicate for seamless infinite marquee loop */}
        {tickerItems.map((item, idx) => (
          <span key={`ticker-2-${idx}`} className="flex items-center gap-12">
            <span
              style={{
                color: item.highlight ? palette.text : palette.textMuted,
              }}
            >
              {item.text}
            </span>
            <span className="text-sm opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
