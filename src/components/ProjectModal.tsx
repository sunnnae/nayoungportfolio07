import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  User,
  Wrench,
  Tag,
  Palette,
  RotateCw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onOpenPdfDeck?: (page: number) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onOpenPdfDeck,
}) => {
  const { palette } = useTheme();
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [hanaActiveContext, setHanaActiveContext] = useState<'traffic' | 'shopping' | 'vacation'>('traffic');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  // Keyboard navigation: ESC to close, Left/Right arrows to switch projects
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const goToNext = () => {
    setFlippedCardId(null);
    onSelectProject(nextProject);
  };
  const goToPrev = () => {
    setFlippedCardId(null);
    onSelectProject(prevProject);
  };

  const getPdfStartPage = (id: string) => {
    switch (id) {
      case 'stella':
        return 3;
      case 'kadae':
        return 6;
      case 'syncroom':
        return 9;
      case 'hana':
        return 12;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Background click dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Card */}
      <div
        className="relative z-10 w-full max-w-5xl min-h-screen md:min-h-0 md:max-h-[94vh] md:rounded-3xl overflow-y-auto flex flex-col border shadow-2xl transition-colors duration-300"
        style={{
          backgroundColor: palette.bg,
          borderColor: palette.border,
          color: palette.text,
        }}
      >
        {/* Sticky Header with Navigation & Close */}
        <div
          className="sticky top-0 z-30 px-6 md:px-10 py-4 border-b flex items-center justify-between backdrop-blur-xl"
          style={{
            backgroundColor: `${palette.bg}ee`,
            borderColor: palette.border,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-mono-custom font-semibold"
              style={{ backgroundColor: palette.badgeBg, color: palette.accent }}
            >
              {project.categoryLabel}
            </span>
            <span className="font-bold text-lg md:text-xl tracking-tight truncate max-w-[180px] sm:max-w-md">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1 border rounded-full p-1" style={{ borderColor: palette.border }}>
              <button
                onClick={goToPrev}
                className="p-1.5 rounded-full hover:opacity-75 transition-opacity"
                title={`이전: ${prevProject.title}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono-custom px-1.5 opacity-60">
                {currentIndex + 1} / {PROJECTS.length}
              </span>
              <button
                onClick={goToNext}
                className="p-1.5 rounded-full hover:opacity-75 transition-opacity"
                title={`다음: ${nextProject.title}`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border hover:scale-105 active:scale-95 transition-all"
              style={{ borderColor: palette.border, backgroundColor: palette.surface }}
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-12 flex flex-col gap-12 md:gap-16">
          {/* Project Title & Overview Banner */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: palette.textMuted }}>
                CASE STUDY & DESIGN SYSTEM
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono-custom text-xs">
                <span className="px-2.5 py-0.5 rounded-full border" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
                  #1인 프로젝트
                </span>
                <span className="px-2.5 py-0.5 rounded-full border" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
                  #{project.tools.join(' #')}
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl font-medium" style={{ color: palette.accent }}>
              {project.subTitle}
            </p>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl opacity-90 font-normal">
              {project.summary}
            </p>
          </div>

          {/* Metadata Specs Bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border font-mono-custom text-xs"
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
            }}
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 opacity-60">
                <User className="w-3.5 h-3.5" />
                <span>ROLE</span>
              </div>
              <span className="font-bold">{project.role}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 opacity-60">
                <Calendar className="w-3.5 h-3.5" />
                <span>PERIOD</span>
              </div>
              <span className="font-bold">{project.period}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 opacity-60">
                <Wrench className="w-3.5 h-3.5" />
                <span>TOOLS</span>
              </div>
              <span className="font-bold">{project.tools.join(', ')}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 opacity-60">
                <Tag className="w-3.5 h-3.5" />
                <span>CATEGORY</span>
              </div>
              <span className="font-bold truncate">{project.categoryLabel}</span>
            </div>
          </div>

          {/* Hero Showcase Image & Gallery Selector */}
          <div className="flex flex-col gap-4">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden border shadow-xl aspect-video sm:aspect-[16/10] bg-neutral-900 relative group">
              <img
                src={
                  project.galleryImages && project.galleryImages[activeImageIndex]
                    ? project.galleryImages[activeImageIndex]
                    : project.heroImage
                }
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              {project.galleryImages && project.galleryImages.length > 1 && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-mono-custom font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20">
                  IMAGE {activeImageIndex + 1} / {project.galleryImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation if Multiple Gallery Images */}
            {project.galleryImages && project.galleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {project.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border aspect-[16/10] transition-all ${
                      activeImageIndex === idx
                        ? 'ring-2 ring-offset-2 scale-[1.02] shadow-lg'
                        : 'opacity-65 hover:opacity-100'
                    }`}
                    style={{
                      borderColor: activeImageIndex === idx ? palette.accent : palette.border,
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} gallery thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono-custom font-bold bg-black/70 text-white">
                      {idx + 1}번
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Target Audience & Visual Concept */}
          {(project.target || project.visualConcept) && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl border"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              {project.target && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-rose-500">
                    TARGET AUDIENCE
                  </span>
                  <p className="text-base sm:text-lg font-semibold leading-relaxed">
                    {project.target}
                  </p>
                </div>
              )}

              {project.visualConcept && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider text-sky-500">
                    VISUAL CONCEPT
                  </span>
                  <p className="text-base sm:text-lg font-semibold leading-relaxed">
                    {project.visualConcept}
                  </p>
                </div>
              )}

              {project.designRationale && (
                <div className="col-span-1 md:col-span-2 pt-4 border-t flex flex-col gap-2" style={{ borderColor: palette.border }}>
                  <span className="font-mono-custom text-xs font-bold uppercase tracking-wider opacity-60">
                    DESIGN RATIONALE
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed opacity-85">
                    {project.designRationale}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* PROJECT-SPECIFIC INTERACTIVE SHOWCASES FROM PDF */}

          {/* 1. STELLA TTEOKBOKKI: PDF Page 4 & 5 Exact Components */}
          {project.id === 'stella' && (
            <div className="flex flex-col gap-8">
              {/* Logo & Graphic Motif Breakdown (Page 4) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: palette.border }}>
                  <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-rose-500">
                    PDF P.04 · LOGO & GRAFIC MOTIF SYSTEM
                  </div>
                  <span className="font-mono-custom text-xs opacity-60">STELLA BRAND ASSETS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Logo Story */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-xl">떡볶이 별에서 온 외계인</h3>
                    <p className="text-sm opacity-85 leading-relaxed">
                      단순한 '별'의 상징을 넘어, '떡볶이 별에서 온 외계인'이라는 독특한 세계관을 설정했습니다.
                      하늘에서 내려온 외계인과 떡볶이의 곡선을 모티프로 로고를 제작하여 강렬한 레드와 화이트의
                      대비를 통해 주목도를 높이고, 장난스러운 표정으로 브랜드의 즐거운 에너지를 표현했습니다.
                    </p>
                  </div>

                  {/* Right: Graphic Motifs (Dumpling, Ricecake, Fishcake) */}
                  <div className="p-5 rounded-2xl border flex flex-col gap-3" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
                    <span className="font-mono-custom text-xs font-bold opacity-75">
                      GRAFIC MOTIF (미니멀 메뉴 모티프)
                    </span>
                    <p className="text-xs opacity-80 leading-relaxed">
                      떡볶이 가게의 다양한 메뉴(떡, 튀김, 어묵 등)를 미니멀한 그래픽 모티브로 재해석하여,
                      패턴과 프레임으로 확장되어 패키지부터 MD까지 일관된 브랜드 경험을 전달합니다.
                    </p>
                    <div className="grid grid-cols-4 gap-2 pt-2 text-center font-mono-custom text-[11px]">
                      <div className="p-2.5 rounded-lg border flex flex-col items-center gap-1" style={{ borderColor: palette.border }}>
                        <span className="text-xl">🥟</span>
                        <span>튀김 만두</span>
                      </div>
                      <div className="p-2.5 rounded-lg border flex flex-col items-center gap-1" style={{ borderColor: palette.border }}>
                        <span className="text-xl">🌶️</span>
                        <span>떡볶이 떡</span>
                      </div>
                      <div className="p-2.5 rounded-lg border flex flex-col items-center gap-1" style={{ borderColor: palette.border }}>
                        <span className="text-xl">🍢</span>
                        <span>어묵 슬라이스</span>
                      </div>
                      <div className="p-2.5 rounded-lg border flex flex-col items-center gap-1" style={{ borderColor: palette.border }}>
                        <span className="text-xl">✨</span>
                        <span>별빛 시즈닝</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Guideline Book (Page 5) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: palette.border }}>
                  <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-rose-500">
                    PDF P.05 · DESIGN GUIDELINE BOOK & COLOR SPEC
                  </div>
                  <span className="font-mono-custom text-xs opacity-60">MANUAL BS01</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-custom text-xs">
                  {/* Stellar Red */}
                  <div className="p-4 rounded-2xl bg-[#e11d48] text-white flex flex-col justify-between h-32 shadow-md">
                    <span className="font-bold text-sm">STELLAR RED</span>
                    <div className="flex flex-col text-[11px] opacity-90">
                      <span>PANTONE P 48-8 C</span>
                      <span>#E11D48 · 열정 & 매콤함</span>
                    </div>
                  </div>

                  {/* Stellar Yellow */}
                  <div className="p-4 rounded-2xl bg-[#fbbf24] text-neutral-900 flex flex-col justify-between h-32 shadow-md">
                    <span className="font-bold text-sm">STELLAR YELLOW</span>
                    <div className="flex flex-col text-[11px] opacity-90">
                      <span>PANTONE P 7-8 C</span>
                      <span>#FBBF24 · 바삭한 별 & 위트</span>
                    </div>
                  </div>

                  {/* Stellar White */}
                  <div className="p-4 rounded-2xl bg-white text-neutral-900 flex flex-col justify-between h-32 shadow-md border" style={{ borderColor: palette.border }}>
                    <span className="font-bold text-sm">STEELAR WHITE</span>
                    <div className="flex flex-col text-[11px] opacity-75">
                      <span>PURE WHITE</span>
                      <span>#FFFFFF · 깨끗한 여백</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm opacity-85 leading-relaxed pt-2">
                  스텔라떡볶이만의 위트 있는 세계관을 온·오프라인 매체에 일관되게 적용하기 위한 비주얼 가이드입니다.
                  브랜드 캐릭터의 매력을 살리면서 실제 매장과 패키지 실무에서 즉시 활용할 수 있는 실용적인 규정을 담았습니다.
                  유쾌한 브랜드 아이덴티티가 패키지, 유니폼, 인쇄물 등 모든 고객 접점에서 왜곡 없이 유지되도록 설계한 시스템입니다.
                </p>
              </div>
            </div>
          )}

          {/* 2. KADAE: PDF Page 7 & 8 Exact Components */}
          {project.id === 'kadae' && (
            <div className="flex flex-col gap-8">
              {/* Target & Concept Clouds (Page 7) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: palette.border }}>
                  <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-sky-400">
                    PDF P.07 · TARGET & VISUAL CONCEPT
                  </div>
                  <span className="font-mono-custom text-xs opacity-60">KADAE NAMING</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-xl">한 곳으로 모이는 구름 같은 정보</h3>
                    <p className="text-sm opacity-85 leading-relaxed">
                      '카대'는 지역의 특산물, 트렌디한 스팟 등의 정보를 공유할 수 있는 지역 소통 중심 카페입니다.
                      다양한 곳에서 여러개의 구름이 만나 한 곳으로 모이는 이미지를 모티프로 활용하였습니다.
                    </p>
                    <div className="p-4 rounded-xl border text-xs leading-relaxed" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
                      <span className="font-bold font-mono-custom text-emerald-400 block mb-1">경상도 방언 '카대'의 의미</span>
                      KADAE는 말을 전달해주는 경상도의 방언(~라 카대)입니다. 다양한 정보들로 카페가 풍성하게 채워지길 바라는
                      마음을 담아, 비정형화된 형태들의 말풍선들로 여러 지역문화에서 오는 말들을 그래픽 모티프로 표현했습니다.
                    </div>
                  </div>

                  {/* Cloud Speech Bubbles Visual Representation */}
                  <div className="p-6 rounded-2xl border flex flex-col items-center justify-center gap-4 text-center" style={{ borderColor: palette.border, backgroundColor: '#141414', color: '#ffffff' }}>
                    <div className="font-display text-3xl tracking-tight text-white">KADAE</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-4 py-2 rounded-full border border-white/30 text-xs font-mono-custom bg-white/5">
                        ☁️ 둥근 구름 말풍선
                      </span>
                      <span className="px-4 py-2 rounded-2xl border border-white/30 text-xs font-mono-custom bg-white/5">
                        💥 톡톡 튀는 소식 구름
                      </span>
                      <span className="px-4 py-2 rounded-full border border-white/30 text-xs font-mono-custom bg-white/5">
                        💬 전언(傳言)의 타원 버블
                      </span>
                    </div>
                    <span className="text-[11px] font-mono-custom text-neutral-400">
                      직접 그 지역을 가지 않아도 다양한 지역의 문화를 즐기는 20대 타깃
                    </span>
                  </div>
                </div>
              </div>

              {/* Street Poster Rationale (Page 8) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-4"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="font-mono-custom text-xs font-bold uppercase tracking-wider opacity-60">
                  PDF P.08 · BLACK & WHITE CARRIER COLOR STRATEGY
                </div>
                <h3 className="font-bold text-xl">정보 전달자의 역할을 다하는 미니멀 컬러</h3>
                <p className="text-sm opacity-85 leading-relaxed">
                  다양한 컬러를 돋보이게 해주는 블랙과 화이트 컬러를 브랜드의 메인 컬러로 사용하여,
                  어떠한 지역의 특산물을 메인으로 내세우더라도 뒤에서 묵묵히 정보 전달자의 역할을 하는
                  '카대' 카페의 모습을 표현했습니다. (아이스 베리 티 & 과일 타르트 포스터 연출)
                </p>
              </div>
            </div>
          )}

          {/* 3. SYNCROOM: PDF Page 10 & 11 Exact Components */}
          {project.id === 'syncroom' && (
            <div className="flex flex-col gap-8">
              {/* Symbol Anatomy & CMYK Palette (Page 10) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: palette.border }}>
                  <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-sky-400">
                    PDF P.10 · ‘전원을 켜면 시작되는 합주’ 비주얼 컨셉
                  </div>
                  <span className="font-mono-custom text-xs opacity-60">SYMBOL FORMULA</span>
                </div>

                <p className="text-sm opacity-85 leading-relaxed">
                  전원을 켜고 인터넷 세상으로 향하는 문을 열면 자유롭게 시작되는 합주의 이미지를 생각하며 심볼을 만들었습니다.
                </p>

                {/* Formula Box */}
                <div
                  className="p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-around gap-4 text-center font-mono-custom"
                  style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">⏻</span>
                    <span className="font-bold text-xs">전원 (Power)</span>
                  </div>
                  <span className="text-2xl font-bold opacity-50">+</span>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">♪</span>
                    <span className="font-bold text-xs">음표 (Note)</span>
                  </div>
                  <span className="text-2xl font-bold opacity-50">+</span>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl">🗝️</span>
                    <span className="font-bold text-xs">열쇠 (Key)</span>
                  </div>
                  <span className="text-2xl font-bold opacity-50">=</span>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-sky-500 text-white shadow-md">
                    <span className="text-xs font-extrabold uppercase">SYNCROOM 심볼</span>
                    <span className="text-[10px]">인터넷 합주의 문</span>
                  </div>
                </div>

                {/* CMYK Palette */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono-custom text-xs font-bold opacity-60">CMYK COLOR SYSTEM</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-custom text-xs">
                    <div className="p-3 rounded-xl bg-[#00a8cc] text-black font-bold flex flex-col justify-between h-20 shadow-sm">
                      <span>C 70 M 17</span>
                      <span className="text-[10px]">ELECTRIC CYAN</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#99d6ea] text-black font-bold flex flex-col justify-between h-20 shadow-sm">
                      <span>C 40 M 4 Y 3</span>
                      <span className="text-[10px]">SKY MIST</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b1b3d] text-white font-bold flex flex-col justify-between h-20 shadow-sm border border-white/20">
                      <span>C 87 M 78 Y 68 K 47</span>
                      <span className="text-[10px]">DEEP SYNTH NAVY</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#a699c7] text-black font-bold flex flex-col justify-between h-20 shadow-sm">
                      <span>C 39 M 38</span>
                      <span className="text-[10px]">LAVENDER ACCENT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Process (Page 11) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-4"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-sky-400">
                  PDF P.11 · 3-STEP FLOW MOTIF
                </div>
                <h3 className="font-bold text-xl">음악이 흐르는 과정의 시각화</h3>
                <div className="p-5 rounded-2xl border font-mono-custom text-xs flex flex-col sm:flex-row items-center justify-around gap-4 text-center" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">01. POWER ON</span>
                    <span className="opacity-70">전원을 누르고</span>
                  </div>
                  <span className="text-sky-400 font-bold hidden sm:inline">→</span>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">02. ENTER WEB</span>
                    <span className="opacity-70">인터넷 세상에 들어오고</span>
                  </div>
                  <span className="text-sky-400 font-bold hidden sm:inline">→</span>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">03. FLOWING MUSIC</span>
                    <span className="opacity-70">모든 사람에게 흐르는 음악</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. HANA CARD: PDF Page 13, 14 & 15 Exact Interactive Card Flip & Contextual Showcase */}
          {project.id === 'hana' && (
            <div className="flex flex-col gap-8">
              {/* 3 Front/Back Flip Cards (Page 13 & 14) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: palette.border }}>
                  <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>PDF P.13 & 14 · INTERACTIVE 3D CARD FLIP (FRONT & BACK SPEC)</span>
                  </div>
                  <span className="font-mono-custom text-xs opacity-60">클릭하여 앞/뒷면 전환</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: TRAFFIC */}
                  <div
                    onClick={() => setFlippedCardId(flippedCardId === 'traffic' ? null : 'traffic')}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative aspect-[1.58/1] sm:aspect-[1/1.58] rounded-2xl overflow-hidden border shadow-xl transition-all duration-500 p-5 flex flex-col justify-between text-white"
                      style={{
                        backgroundColor: flippedCardId === 'traffic' ? '#0f172a' : '#141414',
                        borderColor: palette.border,
                      }}
                    >
                      {flippedCardId !== 'traffic' ? (
                        /* Front Spec */
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-rose-500 tracking-wider">HANA CARD</span>
                            <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-200 to-yellow-400 border border-yellow-500/50 shadow-inner" />
                          </div>

                          {/* T-band Bandage Illustration */}
                          <div className="my-auto flex flex-col items-center justify-center text-center py-4">
                            <div className="w-24 h-24 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center relative shadow-lg">
                              <span className="text-4xl font-extrabold text-amber-300">T</span>
                              <div className="absolute inset-x-2 h-6 bg-amber-200/40 rounded-full blur-[1px]" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between font-mono-custom text-xs">
                            <span className="font-bold tracking-widest text-neutral-300">TRAFFIC</span>
                            <span className="text-[10px] opacity-60">FLIP BACK ↻</span>
                          </div>
                        </>
                      ) : (
                        /* Back Spec (From PDF Page 14) */
                        <>
                          <div className="w-full h-8 bg-black -mx-5 -mt-5 mb-2 opacity-90" />
                          <div className="flex flex-col gap-2 font-mono-custom">
                            <div className="flex items-center justify-between text-[11px] bg-white text-black px-2 py-1 rounded">
                              <span className="font-bold">5417 0700 5678 0012</span>
                              <span className="text-[10px]">09/15</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] opacity-80">
                              <span>KIM HANA</span>
                              <span>CVC 333</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/20 flex items-center justify-between font-mono-custom text-[10px] opacity-70">
                            <span>하나카드 고객센터 1800-1111</span>
                            <span>FLIP FRONT ↻</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-center font-mono-custom text-xs">
                      <span className="font-bold">01. 교통 (TRAFFIC)</span>
                      <span className="opacity-60 block text-[11px]">야근과 통근길의 네온사인 불빛</span>
                    </div>
                  </div>

                  {/* Card 2: SHOPPING */}
                  <div
                    onClick={() => setFlippedCardId(flippedCardId === 'shopping' ? null : 'shopping')}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative aspect-[1.58/1] sm:aspect-[1/1.58] rounded-2xl overflow-hidden border shadow-xl transition-all duration-500 p-5 flex flex-col justify-between text-neutral-900"
                      style={{
                        backgroundColor: flippedCardId === 'shopping' ? '#fef3c7' : '#fef9c3',
                        borderColor: palette.border,
                      }}
                    >
                      {flippedCardId !== 'shopping' ? (
                        /* Front Spec */
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-emerald-600 tracking-wider">HANA CARD</span>
                            <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-200 to-yellow-400 border border-yellow-500/50 shadow-inner" />
                          </div>

                          {/* S-band Bandage Illustration */}
                          <div className="my-auto flex flex-col items-center justify-center text-center py-4">
                            <div className="w-24 h-24 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center relative shadow-lg">
                              <span className="text-4xl font-extrabold text-amber-700">S</span>
                              <div className="absolute inset-2 rounded-full border border-dashed border-amber-600/30" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between font-mono-custom text-xs">
                            <span className="font-bold tracking-widest text-neutral-800">SHOPPING</span>
                            <span className="text-[10px] opacity-60">FLIP BACK ↻</span>
                          </div>
                        </>
                      ) : (
                        /* Back Spec (From PDF Page 14) */
                        <>
                          <div className="w-full h-8 bg-neutral-800 -mx-5 -mt-5 mb-2 opacity-90" />
                          <div className="flex flex-col gap-2 font-mono-custom text-neutral-900">
                            <div className="flex items-center justify-between text-[11px] bg-white border px-2 py-1 rounded shadow-sm">
                              <span className="font-bold">5417 0700 5678 0012</span>
                              <span className="text-[10px]">09/15</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] opacity-80">
                              <span>KIM HANA</span>
                              <span>CVC 333</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-neutral-400 flex items-center justify-between font-mono-custom text-[10px] opacity-70">
                            <span>하나카드 고객센터 1800-1111</span>
                            <span>FLIP FRONT ↻</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-center font-mono-custom text-xs">
                      <span className="font-bold">02. 쇼핑 (SHOPPING)</span>
                      <span className="opacity-60 block text-[11px]">백화점 조명의 포근한 크림 옐로우</span>
                    </div>
                  </div>

                  {/* Card 3: VACATION */}
                  <div
                    onClick={() => setFlippedCardId(flippedCardId === 'vacation' ? null : 'vacation')}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative aspect-[1.58/1] sm:aspect-[1/1.58] rounded-2xl overflow-hidden border shadow-xl transition-all duration-500 p-5 flex flex-col justify-between text-neutral-900"
                      style={{
                        backgroundColor: flippedCardId === 'vacation' ? '#e0f2fe' : '#bae6fd',
                        borderColor: palette.border,
                      }}
                    >
                      {flippedCardId !== 'vacation' ? (
                        /* Front Spec */
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-sky-700 tracking-wider">HANA CARD</span>
                            <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-200 to-yellow-400 border border-yellow-500/50 shadow-inner" />
                          </div>

                          {/* V-band Bandage Illustration */}
                          <div className="my-auto flex flex-col items-center justify-center text-center py-4">
                            <div className="w-24 h-24 rounded-2xl bg-sky-600/20 border border-sky-600/40 flex items-center justify-center relative shadow-lg">
                              <span className="text-4xl font-extrabold text-sky-800">V</span>
                              <div className="absolute inset-x-3 bottom-3 h-8 bg-sky-300/40 rounded-full" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between font-mono-custom text-xs">
                            <span className="font-bold tracking-widest text-sky-950">VACATION</span>
                            <span className="text-[10px] opacity-60">FLIP BACK ↻</span>
                          </div>
                        </>
                      ) : (
                        /* Back Spec (From PDF Page 14) */
                        <>
                          <div className="w-full h-8 bg-sky-950 -mx-5 -mt-5 mb-2 opacity-90" />
                          <div className="flex flex-col gap-2 font-mono-custom text-neutral-900">
                            <div className="flex items-center justify-between text-[11px] bg-white border px-2 py-1 rounded shadow-sm">
                              <span className="font-bold">5417 0700 5678 0012</span>
                              <span className="text-[10px]">09/15</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] opacity-80">
                              <span>KIM HANA</span>
                              <span>CVC 333</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-sky-300 flex items-center justify-between font-mono-custom text-[10px] opacity-70">
                            <span>하나카드 고객센터 1800-1111</span>
                            <span>FLIP FRONT ↻</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-center font-mono-custom text-xs">
                      <span className="font-bold">03. 휴가 (VACATION)</span>
                      <span className="opacity-60 block text-[11px]">에메랄드빛 해변과 힐링 바다</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual Photography Mockups (Page 15) */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6"
                style={{ backgroundColor: palette.surface, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: palette.border }}>
                  <div className="font-mono-custom text-xs font-bold uppercase tracking-wider text-amber-500">
                    PDF P.15 · CONTEXTUAL MOCKUP PHOTOGRAPHY
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHanaActiveContext('traffic')}
                      className={`px-3 py-1 rounded-full text-xs font-mono-custom transition-all ${
                        hanaActiveContext === 'traffic'
                          ? 'bg-white text-black font-bold'
                          : 'border border-neutral-700 opacity-60'
                      }`}
                    >
                      교통 (TRAFFIC)
                    </button>
                    <button
                      onClick={() => setHanaActiveContext('shopping')}
                      className={`px-3 py-1 rounded-full text-xs font-mono-custom transition-all ${
                        hanaActiveContext === 'shopping'
                          ? 'bg-white text-black font-bold'
                          : 'border border-neutral-700 opacity-60'
                      }`}
                    >
                      쇼핑 (SHOPPING)
                    </button>
                    <button
                      onClick={() => setHanaActiveContext('vacation')}
                      className={`px-3 py-1 rounded-full text-xs font-mono-custom transition-all ${
                        hanaActiveContext === 'vacation'
                          ? 'bg-white text-black font-bold'
                          : 'border border-neutral-700 opacity-60'
                      }`}
                    >
                      휴가 (VACATION)
                    </button>
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-[#090909] border border-neutral-800 flex flex-col items-center justify-center text-center gap-3">
                  {hanaActiveContext === 'traffic' && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🌧️ 🚗 🚦</span>
                      <h4 className="font-bold text-xl text-white">비 내리는 밤거리 도시 도로</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        퇴근길 빗속 도로 위의 자동차 테일램프 불빛과 젖은 아스팔트 반사광 속에 스며든 TRAFFIC 카드
                      </p>
                    </div>
                  )}
                  {hanaActiveContext === 'shopping' && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🛍️ 🏢 🏬</span>
                      <h4 className="font-bold text-xl text-white">모던 백화점 에스컬레이터 & 쇼핑몰</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        세련된 건축 구조물과 화려한 실내 조명이 드리워진 쇼핑 성지 속 SHOPPING 카드
                      </p>
                    </div>
                  )}
                  {hanaActiveContext === 'vacation' && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🏖️ 🌴 🌊</span>
                      <h4 className="font-bold text-xl text-white">열대 해변 야자수 & 휴양지 비치</h4>
                      <p className="text-xs text-neutral-400 max-w-md">
                        눈부신 태양과 에메랄드빛 파도, 모래사장이 펼쳐진 휴양지의 자유를 만끽하는 VACATION 카드
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* In-depth Narrative Sections */}
          <div className="flex flex-col gap-12">
            {project.sections.map((section, sIdx) => (
              <div
                key={sIdx}
                className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border"
                style={{
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono-custom text-xs uppercase tracking-widest" style={{ color: palette.accent }}>
                    {section.title}
                  </span>
                  {section.subtitle && (
                    <h3 className="font-bold text-2xl sm:text-3xl tracking-tight">
                      {section.subtitle}
                    </h3>
                  )}
                </div>

                <p className="text-base leading-relaxed opacity-90 font-normal">
                  {section.description}
                </p>

                {/* Section Real Image if provided */}
                {section.image && (
                  <div className="w-full rounded-xl overflow-hidden border shadow-sm aspect-video sm:aspect-[16/9] bg-neutral-900">
                    <img
                      src={section.image}
                      alt={section.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2 pt-4 border-t" style={{ borderColor: palette.border }}>
                    <span className="font-mono-custom text-xs uppercase tracking-wider opacity-60">
                      KEY DELIVERABLES
                    </span>
                    <ul className="flex flex-col gap-2 font-mono-custom text-xs sm:text-sm">
                      {section.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                          <span className="opacity-90">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Project Footer Switcher */}
          <div
            onClick={goToNext}
            className="group cursor-pointer p-8 rounded-3xl border flex items-center justify-between transition-all hover:shadow-xl hover:-translate-y-1"
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
            }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono-custom text-xs uppercase tracking-widest opacity-60">
                NEXT PROJECT
              </span>
              <span className="font-display text-2xl sm:text-4xl group-hover:underline">
                {nextProject.title}
              </span>
              <span className="font-mono-custom text-xs" style={{ color: palette.accent }}>
                {nextProject.subTitle}
              </span>
            </div>
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-transform"
              style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}
            >
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
