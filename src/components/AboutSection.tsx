import React from 'react';
import { useTheme } from './ThemeContext';
import { SKILL_GAUGES } from '../data/portfolioData';

interface AboutSectionProps {
  onSelectProjectById?: (id: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const { palette } = useTheme();

  const getToolBadgeColor = (short: string) => {
    switch (short) {
      case 'Ps':
        return { bg: '#001e36', color: '#31a8ff' };
      case 'Ai':
        return { bg: '#330000', color: '#ff9a00' };
      case 'Id':
        return { bg: '#49021f', color: '#ff3366' };
      case 'Pr':
        return { bg: '#00005b', color: '#9999ff' };
      case 'Ae':
        return { bg: '#00005b', color: '#9999ff' };
      case 'M':
        return { bg: '#05313d', color: '#26d2e6' };
      case 'Z':
      default:
        return { bg: '#2b2210', color: '#e69a26' };
    }
  };

  // Timeline items matching the reference image layout and content
  const timelineMilestones = [
    {
      year: '2019',
      title: '한밭대학교 입학',
      subtitle: '시각·영상디자인 학과',
      descriptions: [],
    },
    {
      year: '2023.2',
      title: '한밭대학교 졸업',
      subtitle: '시각·영상디자인 학과',
      descriptions: ['MAYA를 활용한 3D 애니메이션 전시'],
    },
    {
      year: '2024 ~ 2025',
      title: '(주)원정대',
      subtitle: '디자인팀 책임대리',
      descriptions: [
        'GFA 및 META 광고소재 기획 및 제작',
        '회사 내부 편집 디자인 업무',
      ],
    },
    {
      year: '2026.04 ~ 현재',
      title: '마곳간',
      subtitle: '디자인팀장',
      descriptions: [
        '브랜드 비주얼 방향 설정 및 가이드 수립',
        '상세페이지·광고 소재 총괄',
        '팀원 리드 및 외주 관리',
      ],
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-20 md:py-28 border-b transition-colors duration-300"
      style={{
        backgroundColor: palette.id === 'obsidian' ? '#0d0d0d' : palette.surface,
        color: palette.text,
        borderColor: palette.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Top Header & Intro */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 font-mono-custom text-xs uppercase tracking-widest" style={{ color: palette.textMuted }}>
            <span
              className="px-2.5 py-1 rounded-full border text-[11px]"
              style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}
            >
              (01) ABOUT & PROFILE
            </span>
            <span>PDF PAGE 02</span>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl">
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
              안녕하세요,<br />
              디자이너 김나영입니다.
            </h2>

            {/* Pure text format without container box */}
            <div className="flex flex-col gap-2.5 text-base sm:text-lg md:text-xl leading-relaxed opacity-90 font-normal">
              <p>사람들은 늘 분주하고 환경은 수시로 바뀝니다.</p>
              <p>그래서 우리는 매순간 떠오른 필요를 단번에 선택으로 가져오지 못합니다.</p>
              <p>
                저의 디자인은 그틈을 메우며 기억을 결과를{' '}
                <span className="font-semibold" style={{ color: palette.text }}>‘예쁘게’</span> 만드는 것보다{' '}
                <span className="font-semibold" style={{ color: palette.accent }}>‘기억되게’</span> 만듭니다.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline matching Reference Image Style */}
        <div className="pt-8 border-t" style={{ borderColor: palette.border }}>
          {/* Reference-style Clean Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {timelineMilestones.map((item, index) => (
              <div key={index} className="flex flex-col">
                {/* Year - Big, Bold, Clean Sans-Serif / Display */}
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-4"
                  style={{ color: palette.text }}
                >
                  {item.year}
                </div>

                {/* Primary Title / Institution / Company */}
                <div
                  className="text-lg sm:text-xl font-bold tracking-tight mb-1"
                  style={{ color: palette.text }}
                >
                  {item.title}
                </div>

                {/* Subtitle / Department / Position */}
                <div
                  className="text-sm sm:text-base font-normal mb-3"
                  style={{ color: palette.textMuted }}
                >
                  {item.subtitle}
                </div>

                {/* Description Lines without Bullets - matching reference layout */}
                {item.descriptions.length > 0 && (
                  <div
                    className="flex flex-col gap-1 text-xs sm:text-sm leading-relaxed"
                    style={{ color: palette.textMuted }}
                  >
                    {item.descriptions.map((desc, dIdx) => (
                      <span key={dIdx}>{desc}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools Gauge Scale without outer box container and without subheader */}
        <div className="pt-8 border-t flex flex-col gap-6" style={{ borderColor: palette.border }}>
          {/* Scale Header Ruler */}
          <div className="flex flex-col gap-5">
            <div className="hidden sm:flex items-center justify-between font-mono-custom text-[11px] opacity-40 px-16">
              <span>0% (기초)</span>
              <span>25%</span>
              <span>50% (실무 활용)</span>
              <span>75%</span>
              <span>100% (고급 마스터)</span>
            </div>

            {/* Gauge Bars in Clean Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {SKILL_GAUGES.map((tool) => (
                <div key={tool.name} className="flex items-center gap-4 group py-1">
                  {/* Tool Icon Badge (Ps, Ai, Id, Pr, Ae, M, Z) */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs font-mono-custom border flex-shrink-0 shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: getToolBadgeColor(tool.short).bg,
                      color: getToolBadgeColor(tool.short).color,
                      borderColor: palette.border,
                    }}
                  >
                    {tool.short}
                  </div>

                  {/* Scale Gauge with Exact Tick Marks */}
                  <div className="flex-grow flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-mono-custom">
                      <span className="font-bold">{tool.name}</span>
                      <span className="opacity-75 text-[11px] font-semibold">{tool.percent}%</span>
                    </div>

                    <div className="relative w-full h-3.5 rounded-sm border bg-black/30 overflow-hidden flex items-center" style={{ borderColor: palette.border }}>
                      {/* 4 Tick Marks on ruler */}
                      <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />
                      <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/15 pointer-events-none" />
                      <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />

                      {/* Fill bar */}
                      <div
                        className="h-full rounded-none transition-all duration-700 ease-out"
                        style={{
                          width: `${tool.percent}%`,
                          backgroundColor: palette.text,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
