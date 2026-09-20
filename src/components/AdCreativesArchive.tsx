import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { AD_CREATIVES } from '../data/portfolioData';
import { Sparkles, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

export const AdCreativesArchive: React.FC = () => {
  const { palette } = useTheme();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Wheel horizontal scroll handler
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontalScrollPossible = el.scrollWidth > el.clientWidth;
      if (!isHorizontalScrollPossible) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth && e.deltaY > 0;

        if (!atStart && !atEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    setIsCursorGrabbing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsCursorGrabbing(false);
  };

  return (
    <section
      id="ads"
      className="w-full py-20 md:py-32 border-t transition-colors duration-300 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-10"
      style={{ color: palette.text, borderColor: palette.border }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b" style={{ borderColor: palette.border }}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest text-amber-500 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>(03) PERFORMANCE AD ARCHIVE</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.92]">
            Ad<br />Creatives
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 font-mono-custom text-xs">
            <span className="px-3 py-1 rounded-full border" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
              피드 최적화 배너
            </span>
            <span className="px-3 py-1 rounded-full border" style={{ borderColor: palette.border, backgroundColor: palette.badgeBg }}>
              2024 — 2025
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 font-mono-custom text-xs">
          <span className="px-3.5 py-1.5 rounded-full border font-bold" style={{ borderColor: palette.border, backgroundColor: palette.surface }}>
            ALL ({AD_CREATIVES.length})
          </span>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono-custom opacity-70">
            <MoveHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>휠 스크롤 & 드래그로 슥슥 이동</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollSlider('left')}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              style={{ borderColor: palette.border, backgroundColor: palette.surface, color: palette.text }}
              title="이전 광고 보기"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
              style={{ borderColor: palette.border, backgroundColor: palette.surface, color: palette.text }}
              title="다음 광고 보기"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel / Slider Container */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`w-full flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 select-none transition-all no-scrollbar ${
          isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {AD_CREATIVES.map((ad) => {
          const hasImage = Boolean(ad.image);

          return (
            <div
              key={ad.id}
              className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] group flex flex-col transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Pure Clean Image Frame */}
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden border shadow-lg group-hover:shadow-2xl transition-all duration-300"
                style={{
                  borderColor: palette.border,
                  backgroundColor: palette.surface,
                }}
              >
                {hasImage ? (
                  <img
                    src={ad.image}
                    alt={ad.headline}
                    className="w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="w-full h-full p-6 flex flex-col justify-between"
                    style={{ backgroundColor: palette.surface }}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-custom opacity-70">
                      <span>#{ad.number}</span>
                    </div>

                    <div className="my-auto flex flex-col gap-2">
                      <div className="font-extrabold text-base sm:text-lg leading-snug line-clamp-3">
                        {ad.headline}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono-custom opacity-50 flex items-center justify-between">
                      <span>{ad.dimensions}</span>
                      <span>{ad.brand}</span>
                    </div>
                  </div>
                )}

                {/* Micro Tag Overlay */}
                <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono-custom font-bold bg-black/70 text-white backdrop-blur-md border border-white/10 shadow-sm">
                    #{ad.number}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
