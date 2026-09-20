import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEME_PALETTES } from '../data/portfolioData';
import { ThemePalette } from '../types';

interface ThemeContextType {
  palette: ThemePalette;
  setPaletteById: (id: string) => void;
  availablePalettes: ThemePalette[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palette, setPalette] = useState<ThemePalette>(() => {
    const saved = localStorage.getItem('kny_portfolio_theme');
    if (saved) {
      const found = THEME_PALETTES.find((p) => p.id === saved);
      if (found) return found;
    }
    return THEME_PALETTES[0]; // Obsidian Noir default
  });

  const setPaletteById = (id: string) => {
    const found = THEME_PALETTES.find((p) => p.id === id);
    if (found) {
      setPalette(found);
      localStorage.setItem('kny_portfolio_theme', id);
    }
  };

  useEffect(() => {
    // Apply CSS variables to root for smooth system-wide theming
    const root = document.documentElement;
    root.style.setProperty('--color-bg', palette.bg);
    root.style.setProperty('--color-surface', palette.surface);
    root.style.setProperty('--color-text', palette.text);
    root.style.setProperty('--color-text-muted', palette.textMuted);
    root.style.setProperty('--color-border', palette.border);
    root.style.setProperty('--color-accent', palette.accent);
    root.style.setProperty('--color-badge', palette.badgeBg);
  }, [palette]);

  return (
    <ThemeContext.Provider value={{ palette, setPaletteById, availablePalettes: THEME_PALETTES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
