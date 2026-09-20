import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { PROJECTS, AD_CREATIVES } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ArrowUpRight, Grid, Layout, Layers, Sparkles } from 'lucide-react';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
  onScrollToAds: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject, onScrollToAds }) => {
  const { palette } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'spotlight'>('grid');

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  return (
    <section
      id="work"
      className="w-full py-20 md:py-32 transition-colors duration-300 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16"
      style={{ color: palette.text }}
    >
      {/* Header with Title & Spencer-style Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b" style={{ borderColor: palette.border }}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest" style={{ color: palette.textMuted }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.accent }} />
            <span>(02) PORTFOLIO DIRECTORY</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.92]">
            Selected<br />Work
          </h2>
        </div>

        {/* Spencer Gabor style Category Filter & View Mode Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Category Filter Tabs */}
          <div
            className="flex items-center p-1 rounded-full border text-xs font-mono-custom overflow-x-auto"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.surface,
            }}
          >
            {(
              [
                { id: 'all', label: 'ALL (4)' },
                { id: 'bx', label: 'BX (3)' },
                { id: 'graphic', label: 'GRAPHIC (1)' },
              ] as { id: ProjectCategory; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className="px-3.5 py-1.5 rounded-full transition-all font-medium whitespace-nowrap"
                style={{
                  backgroundColor: selectedFilter === tab.id ? palette.text : 'transparent',
                  color: selectedFilter === tab.id ? palette.bg : palette.textMuted,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Grid vs Spotlight */}
          <div
            className="flex items-center p-1 rounded-full border text-xs font-mono-custom"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.surface,
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              className="p-1.5 rounded-full transition-all"
              style={{
                backgroundColor: viewMode === 'grid' ? palette.text : 'transparent',
                color: viewMode === 'grid' ? palette.bg : palette.textMuted,
              }}
              title="그리드 보기"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('spotlight')}
              className="p-1.5 rounded-full transition-all"
              style={{
                backgroundColor: viewMode === 'spotlight' ? palette.text : 'transparent',
                color: viewMode === 'spotlight' ? palette.bg : palette.textMuted,
              }}
              title="스포트라이트 보기"
            >
              <Layout className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display: Grid View or Spotlight View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              {/* Image Container with Hover Scale */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-neutral-900">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono-custom font-semibold backdrop-blur-md border shadow-sm"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                    }}
                  >
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Action Icon */}
                <div
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#ffffff',
                  }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-bold text-2xl md:text-3xl tracking-tight group-hover:opacity-85 transition-opacity">
                    {project.title}
                  </h3>
                  <span className="font-mono-custom text-xs" style={{ color: palette.textMuted }}>
                    {project.period}
                  </span>
                </div>

                <p className="text-sm line-clamp-2 leading-relaxed font-normal" style={{ color: palette.textMuted }}>
                  {project.subTitle} — {project.summary}
                </p>

                {/* Tool and Tag chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-custom border"
                      style={{
                        borderColor: palette.border,
                        backgroundColor: palette.badgeBg,
                        color: palette.textMuted,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                  <span
                    className="ml-auto text-xs font-mono-custom group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold"
                    style={{ color: palette.accent }}
                  >
                    자세히 보기 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Spotlight View: Large Featured Showcase */
        <div className="flex flex-col gap-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              <div className="lg:col-span-7 h-[360px] sm:h-[440px] rounded-2xl overflow-hidden relative">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono-custom font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-4">
                  <div className="font-mono-custom text-xs tracking-wider" style={{ color: palette.textMuted }}>
                    PROJECT 0{idx + 1} · {project.role}
                  </div>
                  <h3 className="font-bold text-3xl sm:text-4xl tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <div className="font-medium text-base" style={{ color: palette.accent }}>
                    {project.subTitle}
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: palette.textMuted }}>
                    {project.summary}
                  </p>
                </div>

                <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: palette.border }}>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-mono-custom border"
                        style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono-custom text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    CASE STUDY <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Big Feature Banner for Performance Ad Creatives Archive */}
      <div
        onClick={onScrollToAds}
        className="w-full p-8 sm:p-10 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col lg:flex-row items-stretch justify-between gap-8 group"
        style={{
          backgroundColor: palette.surface,
          borderColor: palette.border,
        }}
      >
        <div className="lg:w-96 flex-shrink-0 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest text-amber-500 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>PERFORMANCE MARKETING ARCHIVE</span>
            </div>
            <h3 className="font-bold text-2xl sm:text-3xl tracking-tight">
              광고 소재 아카이브
            </h3>
          </div>

          <div className="flex items-center justify-between font-mono-custom text-xs pt-4 border-t" style={{ borderColor: palette.border, color: palette.textMuted }}>
            <span>51+ AD CREATIVES</span>
            <span className="font-bold group-hover:translate-x-2 transition-transform" style={{ color: palette.accent }}>
              아카이브 전체 보기 →
            </span>
          </div>
        </div>

        {/* 4 Representative Thumbnails */}
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {AD_CREATIVES.slice(0, 4).map((ad) => (
            <div
              key={ad.id}
              className="rounded-xl overflow-hidden border relative aspect-square bg-neutral-900 group-hover:border-opacity-60 transition-colors flex flex-col justify-between p-3"
              style={{ borderColor: palette.border }}
            >
              {ad.image ? (
                <img
                  src={ad.image}
                  alt={ad.headline}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : null}

              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-custom text-neutral-200">
                <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm font-bold">#{ad.number}</span>
                <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white text-[10px]">{ad.platform}</span>
              </div>

              <div className="relative z-10 flex flex-col gap-1 p-2 rounded-lg bg-black/75 backdrop-blur-sm mt-auto">
                <span className="font-bold text-xs text-white leading-tight line-clamp-1">
                  {ad.headline}
                </span>
                <span className="text-[10px] text-amber-300 font-mono-custom truncate">
                  {ad.brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
