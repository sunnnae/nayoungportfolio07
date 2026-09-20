import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Palette, Download, Menu, X, Check } from 'lucide-react';

interface NavbarProps {
  onOpenPdfModal: () => void;
  onOpenPdfDeck: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdfModal, onOpenPdfDeck }) => {
  const { palette, setPaletteById, availablePalettes } = useTheme();
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-40 w-full transition-colors duration-300 backdrop-blur-md border-b"
      style={{
        backgroundColor: `${palette.bg}ee`,
        borderColor: palette.border,
        color: palette.text,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#top"
          className="group flex flex-col font-display text-xl md:text-2xl tracking-tight no-underline select-none"
        >
          <span className="leading-none group-hover:opacity-80 transition-opacity">
            {PERSONAL_INFO.name}
          </span>
          <span className="font-mono-custom text-[11px] uppercase tracking-widest mt-1" style={{ color: palette.textMuted }}>
            Designer Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono-custom text-xs uppercase tracking-widest">
          <a
            href="#about"
            className="py-2 hover:opacity-100 transition-all relative group"
            style={{ color: palette.textMuted }}
          >
            <span className="group-hover:text-[var(--color-text)] transition-colors">ABOUT</span>
            <span
              className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              style={{ backgroundColor: palette.text }}
            />
          </a>
          <a
            href="#work"
            className="py-2 hover:opacity-100 transition-all relative group"
            style={{ color: palette.textMuted }}
          >
            <span className="group-hover:text-[var(--color-text)] transition-colors">SELECTED WORK</span>
            <span
              className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              style={{ backgroundColor: palette.text }}
            />
          </a>
          <a
            href="#ads"
            className="py-2 hover:opacity-100 transition-all relative group"
            style={{ color: palette.textMuted }}
          >
            <span className="group-hover:text-[var(--color-text)] transition-colors">AD ARCHIVE</span>
            <span
              className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              style={{ backgroundColor: palette.text }}
            />
          </a>
          <a
            href="#contact"
            className="py-2 hover:opacity-100 transition-all relative group"
            style={{ color: palette.textMuted }}
          >
            <span className="group-hover:text-[var(--color-text)] transition-colors">CONTACT</span>
            <span
              className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              style={{ backgroundColor: palette.text }}
            />
          </a>
        </nav>

        {/* Action Controls: Spencer-style Theme Switcher & PDF Request */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Spencer Gabor Palette Switcher */}
          <div className="relative">
            <button
              id="palette-switcher-btn"
              onClick={() => setShowPaletteMenu(!showPaletteMenu)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono-custom transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: palette.border,
                backgroundColor: palette.surface,
                color: palette.text,
              }}
              title="색상 팔레트 변경 (Spencer Gabor Style)"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: palette.accent }} />
              <span>{palette.name}</span>
            </button>

            {showPaletteMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowPaletteMenu(false)}
                />
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl border p-2 z-50 shadow-2xl backdrop-blur-xl"
                  style={{
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                    color: palette.text,
                  }}
                >
                  <div
                    className="text-[11px] font-mono-custom px-3 py-1.5 uppercase tracking-wider border-b mb-1"
                    style={{ color: palette.textMuted, borderColor: palette.border }}
                  >
                    Color Theme / 팔레트
                  </div>
                  {availablePalettes.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPaletteById(p.id);
                        setShowPaletteMenu(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono-custom rounded-lg hover:opacity-80 transition-all text-left"
                      style={{
                        backgroundColor: palette.id === p.id ? palette.badgeBg : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border shadow-sm"
                          style={{ backgroundColor: p.accent, borderColor: p.border }}
                        />
                        <span className={palette.id === p.id ? 'font-bold' : ''}>{p.name}</span>
                      </div>
                      {palette.id === p.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* PDF Portfolio CTA */}
          <button
            id="nav-pdf-btn"
            onClick={onOpenPdfModal}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-custom font-semibold transition-all hover:opacity-90 active:scale-95 shadow-sm"
            style={{
              backgroundColor: palette.text,
              color: palette.bg,
            }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF 받기</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg border"
            style={{ borderColor: palette.border, color: palette.text }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b px-6 py-6 flex flex-col gap-5 transition-colors"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
            color: palette.text,
          }}
        >
          <div className="flex flex-col gap-4 font-mono-custom text-sm">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b"
              style={{ borderColor: palette.border }}
            >
              01. ABOUT
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b"
              style={{ borderColor: palette.border }}
            >
              02. SELECTED WORK
            </a>
            <a
              href="#ads"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b"
              style={{ borderColor: palette.border }}
            >
              03. AD ARCHIVE
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              04. CONTACT
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <div className="text-xs font-mono-custom" style={{ color: palette.textMuted }}>
              테마 팔레트 선택
            </div>
            <div className="flex flex-wrap gap-2">
              {availablePalettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPaletteById(p.id)}
                  className="px-3 py-1.5 rounded-full text-xs font-mono-custom border flex items-center gap-1.5"
                  style={{
                    backgroundColor: palette.id === p.id ? palette.text : palette.bg,
                    color: palette.id === p.id ? palette.bg : palette.text,
                    borderColor: palette.border,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} />
                  {p.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdfModal();
              }}
              className="w-full mt-2 py-3 rounded-xl font-mono-custom font-bold text-sm flex items-center justify-center gap-2"
              style={{
                backgroundColor: palette.text,
                color: palette.bg,
              }}
            >
              <Download className="w-4 h-4" />
              <span>PDF 포트폴리오 받기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
