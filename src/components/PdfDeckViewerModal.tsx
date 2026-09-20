import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { X, ChevronLeft, ChevronRight, Download, Grid, Layers, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PdfDeckViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

export const PdfDeckViewerModal: React.FC<PdfDeckViewerModalProps> = ({
  isOpen,
  onClose,
  initialPage = 1,
}) => {
  const { palette } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialPage]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((p) => Math.min(15, p + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPages = 15;

  const pageMeta: { [key: number]: { title: string; category: string; description: string } } = {
    1: {
      title: 'COVER: 2026 Portfolio',
      category: 'COVER',
      description: 'BX · 3D · 2D Graphic Designer Kim Na Young 포트폴리오 커버 (Final Update 26.09.20)',
    },
    2: {
      title: 'INTRO & PROFILE & INDEX',
      category: 'ABOUT',
      description: '디자이너 소개, 철학, 2019~2025 타임라인, 툴 숙련도 게이지(Ps, Ai, Id, Pr, Ae, M, Z) 및 프로젝트 인덱스',
    },
    3: {
      title: 'BX- STELLA TTEOKBOKKI: OVERVIEW',
      category: 'STELLA',
      description: '떡볶이 별에서 온 외계인 스텔라 리브랜딩 개요, 타깃(1020 여성), 배달 바이크 가방 & 패키지 목업',
    },
    4: {
      title: 'BX- STELLA: LOGO & GRAFIC MOTIF',
      category: 'STELLA',
      description: '외계인과 떡볶이 곡선 심볼, 미니멀 메뉴(떡, 튀김, 어묵, 만두) 그래픽 모티프 & 패턴 시스템',
    },
    5: {
      title: 'BX- STELLA: DESIGN GUIDELINE BOOK',
      category: 'STELLA',
      description: 'BS01 심볼마크, 팬톤 컬러(STELLAR RED P 48-8 C, YELLOW P 7-8 C, WHITE), 온·오프라인 비주얼 매뉴얼',
    },
    6: {
      title: 'BX- KADE: OVERVIEW',
      category: 'KADE',
      description: '각 지역의 이야기를 아카이브한 로컬 중심 카페 KADAE, 경상도 방언 네이밍, 바리스타 에이프런 & 블랙 머그',
    },
    7: {
      title: 'BX- KADE: TARGET & CONCEPT',
      category: 'KADE',
      description: '타깃(20대), 한 곳으로 모이는 구름 같은 정보, 비정형 말풍선 4종 변형 및 심볼 조합',
    },
    8: {
      title: 'BX- KADE: STREET POSTERS',
      category: 'KADE',
      description: '블랙&화이트 메인 컬러로 지역 특산물(음료, 베이커리)을 돋보이게 하는 거리 포스터 캠페인',
    },
    9: {
      title: 'BX- SYNCROOM: OVERVIEW',
      category: 'SYNCROOM',
      description: '인터넷 합주 프로그램 리브랜딩, 시공간 제약 없는 실시간 음악 소통, 3D 블루 유체 심볼과 어쿠스틱 기타',
    },
    10: {
      title: 'BX- SYNCROOM: SYMBOL ANATOMY',
      category: 'SYNCROOM',
      description: '심볼 조합 공식: 전원(Power) + 음표(Note) + 열쇠(Key), CMYK 컬러 시스템 (C70 M17 등 4종)',
    },
    11: {
      title: 'BX- SYNCROOM: PROCESS & POSTERS',
      category: 'SYNCROOM',
      description: '전원 누름 → 인터넷 진입 → 음악이 흐르는 과정 그래픽 모티프와 테크니컬 스트리트 포스터 목업',
    },
    12: {
      title: 'GF- HANA CARD: OVERVIEW',
      category: 'HANA CARD',
      description: '“상처받지마” 하나카드 PLATE 디자인 3종 (MZ세대 텅장 위로 반창고 메타포), 교통·쇼핑·휴가',
    },
    13: {
      title: 'GF- HANA CARD: 3 FRONT PLATES',
      category: 'HANA CARD',
      description: 'TRAFFIC (T 밴드), SHOPPING (S 밴드), VACATION (V 밴드) 3종 전면 플레이트 그래픽 & IC칩',
    },
    14: {
      title: 'GF- HANA CARD: FRONT & BACK LAYOUT',
      category: 'HANA CARD',
      description: '3종 카드의 앞면과 뒷면 상세 스펙: 카드번호(5417 0700 5678 0012), KIM HANA, 마그네틱 띠',
    },
    15: {
      title: 'GF- HANA CARD: CONTEXTUAL MOCKUPS',
      category: 'HANA CARD',
      description: '소비 상황별 3가지 실사 배경 렌더링: 비 오는 밤거리(교통), 화려한 백화점(쇼핑), 하와이 해변(휴가)',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-6xl max-h-[96vh] rounded-3xl overflow-hidden border shadow-2xl flex flex-col transition-colors duration-300"
        style={{
          backgroundColor: '#0c0c0c',
          borderColor: palette.border,
          color: '#ffffff',
        }}
      >
        {/* Modal Top Control Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono-custom font-bold bg-white/10 text-white">
              PDF SLIDE {currentPage} / {totalPages}
            </span>
            <span className="font-bold text-sm sm:text-base truncate max-w-xs sm:max-w-md text-neutral-200">
              {pageMeta[currentPage]?.title}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono-custom text-xs">
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                showThumbnails ? 'bg-white text-black border-white' : 'border-neutral-700 text-neutral-300 hover:text-white'
              }`}
              title="썸네일 목록 토글"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">전체 슬라이드 (15)</span>
            </button>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1 border border-neutral-700 rounded-lg p-0.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-all"
                title="이전 슬라이드 (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-bold text-neutral-300">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-all"
                title="다음 슬라이드 (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-neutral-700 hover:bg-white/10 text-neutral-300 transition-all"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {/* Central Slide Viewport */}
          <div className="flex-grow p-4 sm:p-8 flex items-center justify-center bg-black/60 overflow-y-auto">
            <div className="w-full max-w-4xl aspect-[16/10] rounded-2xl border border-neutral-800 bg-[#0e0e0e] shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none">
              {/* Render Slide by Page Number */}
              <SlideRenderer page={currentPage} />

              {/* Bottom Micro-Info */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-custom text-neutral-500">
                <span>KIM NA YOUNG PORTFOLIO 2026</span>
                <span>PAGE {String(currentPage).padStart(2, '0')} / 15</span>
              </div>
            </div>
          </div>

          {/* Right Info / Thumbnails Drawer */}
          {showThumbnails ? (
            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-neutral-800 p-4 bg-neutral-950 overflow-y-auto max-h-[35vh] lg:max-h-none flex flex-col gap-2">
              <div className="font-mono-custom text-xs text-neutral-400 font-bold uppercase tracking-wider pb-2 border-b border-neutral-800">
                15 SLIDE SHEETS
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setCurrentPage(num);
                      setShowThumbnails(false);
                    }}
                    className={`p-2 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      currentPage === num
                        ? 'border-rose-500 bg-rose-500/10 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="font-mono-custom text-[11px] font-bold">P. {num}</span>
                    <span className="text-[10px] font-semibold truncate leading-tight">
                      {pageMeta[num]?.title.split(':')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-neutral-800 p-6 bg-neutral-950 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <span className="font-mono-custom text-xs text-rose-400 font-bold uppercase tracking-widest">
                  SLIDE {currentPage} NOTES
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-white leading-tight">
                  {pageMeta[currentPage]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {pageMeta[currentPage]?.description}
                </p>
              </div>

              {/* Navigation hint */}
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 flex flex-col gap-2 text-xs font-mono-custom text-neutral-400">
                <div className="flex items-center justify-between">
                  <span>KEYBOARD NAV</span>
                  <span className="text-white">← / → ARROWS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>CLOSE</span>
                  <span className="text-white">ESC</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component to render the slide content faithfully matching PDF pages 1-15
const SlideRenderer: React.FC<{ page: number }> = ({ page }) => {
  switch (page) {
    case 1:
      // Page 1: Cover
      return (
        <div className="flex-grow flex flex-col justify-between py-4">
          <div className="flex items-start justify-between font-mono-custom text-xs text-neutral-400">
            <div>Final Update 26. 09. 20</div>
            <div className="text-center font-bold text-white">
              KIM NA YOUNG
              <div className="text-[11px] font-normal text-neutral-400">BX·3D·2D Grafic portfolio</div>
            </div>
            <div className="text-right">
              <div>Contect</div>
              <div className="text-white font-semibold">+82 010 5512 9132</div>
              <div>nolooo@naver.com</div>
            </div>
          </div>

          <div className="my-auto py-8">
            <div className="font-display text-4xl sm:text-6xl text-white leading-none mb-2">2026</div>
            <div className="font-display text-6xl sm:text-8xl md:text-9xl text-white leading-none tracking-tight flex items-baseline">
              <span>Port</span>
              <span className="blur-[2px] opacity-90 text-neutral-200">fo</span>
              <span className="blur-[4px] opacity-75 text-neutral-300">lio</span>
            </div>
          </div>
        </div>
      );

    case 2:
      // Page 2: Intro & Timeline & Gauges & Index
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg sm:text-2xl">안녕하세요, 디자이너 김나영입니다.</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              사람들은 늘 분주하고 환경은 수시로 바뀝니다. 그래서 우리는 매순간 떠오른 필요를 단번에 선택으로 가져오지 못합니다.<br />
              저의 디자인은 그 틈을 메우며 기억을 결과를 '예쁘게' 만드는 것보다 '기억되게' 만듭니다.
            </p>
          </div>

          {/* Timeline Row */}
          <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10 text-xs font-mono-custom">
            <div>
              <div className="font-bold text-lg text-white">2019</div>
              <div className="text-neutral-300">한밭대학교 입학</div>
              <div className="text-[10px] text-neutral-400">시각·영상디자인 학과</div>
            </div>
            <div>
              <div className="font-bold text-lg text-white">2023.2</div>
              <div className="text-neutral-300">한밭대학교 졸업</div>
              <div className="text-[10px] text-rose-400 font-semibold">MAYA를 활용한 3D 애니메이션 전시</div>
            </div>
            <div>
              <div className="font-bold text-lg text-white">2024 ~ 2025</div>
              <div className="text-neutral-300">(주)원정대 책임대리</div>
              <div className="text-[10px] text-neutral-400">GFA 및 META 광고 소재 기획 및 제작 / 내부 편집 디자인</div>
            </div>
          </div>

          {/* Tools vs Index Row */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono-custom pt-1">
            <div className="flex flex-col gap-1">
              <div className="text-[10px] text-neutral-400">TOOL PROFICIENCY GAUGE</div>
              <div className="flex items-center gap-2">
                <span className="w-5 font-bold text-sky-400">Ps</span>
                <div className="flex-grow h-2 bg-neutral-800 rounded overflow-hidden">
                  <div className="w-[95%] h-full bg-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 font-bold text-amber-400">Ai</span>
                <div className="flex-grow h-2 bg-neutral-800 rounded overflow-hidden">
                  <div className="w-[95%] h-full bg-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 font-bold text-cyan-400">M</span>
                <div className="flex-grow h-2 bg-neutral-800 rounded overflow-hidden">
                  <div className="w-[90%] h-full bg-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
              <div className="font-bold text-sm text-white">INDEX</div>
              <div className="text-[11px] text-neutral-300">BX- STELLA <span className="text-[10px] text-neutral-500">(떡볶이 브랜드 리브랜딩)</span></div>
              <div className="text-[11px] text-neutral-300">BX- KADE <span className="text-[10px] text-neutral-500">(로컬 중심 카페)</span></div>
              <div className="text-[11px] text-neutral-300">BX- SYNCROOM <span className="text-[10px] text-neutral-500">(합주프로그램 리브랜딩)</span></div>
              <div className="text-[11px] text-neutral-300">GF- HANA CARD <span className="text-[10px] text-neutral-500">(하나카드 PLATE 디자인)</span></div>
            </div>
          </div>
        </div>
      );

    case 3:
      // Page 3: Stella Overview
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-rose-500">스텔라 떡볶이</h3>
              <div className="text-sm font-medium text-neutral-300">스텔라 떡볶이 리브랜딩</div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-rose-600 flex items-center justify-center p-2 shadow-lg">
              <div className="text-center font-bold text-[10px] text-white leading-tight">
                ★ STELLA ★
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed my-auto">
            스텔라 떡볶이 별에서 맛있는 떡볶이를 전하러 온 외계인, 스텔라.<br />
            다양한 메뉴와 바삭바삭한 별을 가지고 있는 외계인을 모티브로 디자인 했습니다.<br />
            10대-20대 여성을 타겟으로, 귀여운 외계인 캐릭터를 심볼로 사용하여 독특함을 더했습니다.
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-mono-custom text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#1인 프로젝트</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#23.05~06</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Photoshop</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Illustrator</span>
          </div>
        </div>
      );

    case 4:
      // Page 4: Stella Logo & Grafic Motif
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-rose-500 font-mono-custom text-sm">LOGO SYSTEM</div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              단순한 '별'의 상징을 넘어, '떡볶이 별에서 온 외계인'이라는 독특한 세계관을 설정.<br />
              하늘에서 내려온 외계인과 떡볶이의 곡선을 모티프로 로고를 제작. 강렬한 레드와 화이트의 대비로 주목도 극대화.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/80 my-auto flex flex-col gap-2">
            <div className="font-bold text-amber-400 font-mono-custom text-sm">GRAFIC MOTIF</div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              떡볶이 가게의 다양한 메뉴(떡, 튀김, 어묵 등)를 미니멀한 그래픽 모티브로 재해석.<br />
              이 요소들은 패턴과 프레임으로 확장되어 패키지부터 MD까지 일관된 브랜드 경험을 전달합니다.
            </p>
            <div className="flex gap-4 pt-2 text-xl justify-center">
              <span>🥟 만두</span>
              <span>🍢 어묵</span>
              <span>🌶️ 떡볶이</span>
              <span>✨ 별가루</span>
            </div>
          </div>
        </div>
      );

    case 5:
      // Page 5: Stella Guideline Book
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <div className="font-display text-2xl text-rose-500">DESIGN GUIDELINE BOOK</div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2">
              스텔라떡볶이만의 위트 있는 세계관을 온·오프라인 매체에 일관되게 적용하기 위한 비주얼 가이드입니다.<br />
              브랜드 캐릭터의 매력을 살리면서 실제 매장과 패키지 실무에서 즉시 활용할 수 있는 실용적인 규정을 담았습니다.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 my-auto p-4 rounded-xl bg-neutral-900/60 border border-white/10 font-mono-custom text-xs">
            <div className="p-3 rounded bg-rose-600 text-white font-bold flex flex-col justify-between h-20">
              <span>STELLAR RED</span>
              <span className="text-[10px]">PANTONE P 48-8 C</span>
            </div>
            <div className="p-3 rounded bg-amber-400 text-black font-bold flex flex-col justify-between h-20">
              <span>STELLAR YELLOW</span>
              <span className="text-[10px]">PANTONE P 7-8 C</span>
            </div>
            <div className="p-3 rounded bg-white text-black font-bold flex flex-col justify-between h-20 border">
              <span>STEELAR WHITE</span>
              <span className="text-[10px]">PURE WHITE</span>
            </div>
          </div>
        </div>
      );

    case 6:
      // Page 6: KADE Overview
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <h3 className="font-display text-3xl text-neutral-100">KADE</h3>
            <div className="text-sm text-neutral-300 mt-1">각 지역의 이야기를 아카이브한 로컬 중심 카페</div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed my-auto">
            지역의 특산물, 정보를 한 곳에 모아 이야기를 나누는 카페입니다.<br />
            경상도의 방언 '카대'(~하더라, ~그렇다더라)를 카페의 이름으로 삼고,<br />
            그래픽 모티브를 말풍선의 형태로 만들어 여러 말이 한 곳에 모이는 이미지를 형상화했습니다.
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-mono-custom text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#1인 프로젝트</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#작업기간 2주</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Photoshop</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Illustrator</span>
          </div>
        </div>
      );

    case 7:
      // Page 7: KADE Target & Concept
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-900 border border-white/10 font-mono-custom text-xs">
            <div>
              <div className="text-neutral-400 font-bold">TARGET</div>
              <div className="text-sm font-semibold text-white mt-1">직접 그 지역을 가지 않아도 다양한 지역의 문화를 즐기고 싶은 20대</div>
            </div>
            <div>
              <div className="text-neutral-400 font-bold">VISUAL CONCEPT</div>
              <div className="text-sm font-semibold text-white mt-1">한 곳으로 모이는 구름 같은 정보</div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed my-auto">
            '카대'는 지역의 특산물, 트렌디한 스팟 등의 정보를 공유할 수 있는 지역 소통 중심 카페입니다.<br />
            다양한 곳에서 여러개의 구름이 만나 한 곳으로 모이는 이미지를 모티프로 활용하였습니다.<br />
            비정형화된 형태들의 말풍선들로 여러 지역문화에서 오는 말들을 그래픽 모티프로 표현했습니다.
          </p>
        </div>
      );

    case 8:
      // Page 8: KADE Street Posters
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <div className="font-display text-2xl text-neutral-100">KADE STREET POSTER CAMPAIGN</div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2">
              다양한 컬러를 돋보이게 해주는 블랙과 화이트 컬러를 브랜드의 메인 컬러로 사용하여<br />
              어떠한 지역의 특산물을 메인으로 내세우더라도 뒤에서 묵묵히 정보 전달자의 역할을 하는 '카대' 카페의 모습을 표현했습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto p-4 rounded-xl bg-neutral-900/60 border border-white/10 text-xs font-mono-custom">
            <div className="p-3 border border-white/20 rounded-lg text-center">
              ☕ 아이스 베리 음료 포스터 연출
            </div>
            <div className="p-3 border border-white/20 rounded-lg text-center">
              🍰 과일 스폰지 케이크 포스터 연출
            </div>
          </div>
        </div>
      );

    case 9:
      // Page 9: SYNCROOM Overview
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <h3 className="font-display text-3xl text-sky-400">SYNCROOM</h3>
            <div className="text-sm text-neutral-300 mt-1">인터넷 합주 프로그램 리브랜딩</div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed my-auto">
            Syncroom은 딜레이 없이 소리를 전달해주어 합주가 가능한 합주 프로그램입니다.<br />
            익명의 사람들과 시공간의 제약 없이 음악만으로 소통이 가능하다는 점이 독특합니다.
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-mono-custom text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#1인 프로젝트</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#작업기간 2주</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Photoshop</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Illustrator</span>
          </div>
        </div>
      );

    case 10:
      // Page 10: SYNCROOM Symbol Anatomy & CMYK Palette
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <div className="font-bold text-sky-400 font-mono-custom text-sm">‘전원을 켜면 시작되는 합주’ 비주얼 컨셉</div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-1">
              전원을 켜고 인터넷 세상으로 향하는 문을 열면 자유롭게 시작되는 합주의 이미지를 생각하며 심볼을 만들었습니다.
            </p>
          </div>

          {/* Symbol formula */}
          <div className="flex items-center justify-center gap-4 py-4 text-2xl font-bold font-mono-custom">
            <span>⏻ 전원</span>
            <span>+</span>
            <span>♪ 음표</span>
            <span>+</span>
            <span>🗝️ 열쇠</span>
            <span>=</span>
            <span className="text-sky-400">SYNCROOM 심볼</span>
          </div>

          {/* CMYK Swatches */}
          <div className="grid grid-cols-4 gap-2 font-mono-custom text-[11px]">
            <div className="p-2 rounded bg-[#00a8cc] text-black font-bold text-center">
              C 70 M 17
            </div>
            <div className="p-2 rounded bg-[#99d6ea] text-black font-bold text-center">
              C 40 M 4 Y 3
            </div>
            <div className="p-2 rounded bg-[#0b1b3d] text-white font-bold text-center border border-white/20">
              C 87 M 78 Y 68 K 47
            </div>
            <div className="p-2 rounded bg-[#a699c7] text-black font-bold text-center">
              C 39 M 38
            </div>
          </div>
        </div>
      );

    case 11:
      // Page 11: SYNCROOM Graphic Motif
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <div className="font-display text-2xl text-sky-400">GRAFIC MOTIF & PROCESS</div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2">
              전원을 누르고 → 인터넷 세상에 들어오고 → 인터넷 세상 속에서 모든 사람에게 흐르는 음악의 과정을 그래픽 모티브로 표현했습니다.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/70 my-auto text-xs font-mono-custom flex items-center justify-around text-center">
            <div>
              <div className="text-lg">01. POWER ON</div>
              <div className="text-neutral-400">전원 누름</div>
            </div>
            <span className="text-sky-400 font-bold">→</span>
            <div>
              <div className="text-lg">02. ENTER WEB</div>
              <div className="text-neutral-400">인터넷 세상 진입</div>
            </div>
            <span className="text-sky-400 font-bold">→</span>
            <div>
              <div className="text-lg">03. FLOWING MUSIC</div>
              <div className="text-neutral-400">모두에게 흐르는 음악</div>
            </div>
          </div>
        </div>
      );

    case 12:
      // Page 12: Hana Card Overview
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <h3 className="font-display text-3xl text-amber-400">“상처받지마”</h3>
            <div className="text-sm text-neutral-300 mt-1">하나카드 PLATE 디자인</div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed my-auto">
            상처받은 MZ세대의 통장잔고를 토닥토닥 해주는 카드시리즈.<br />
            구멍난 내 통장에 반창고 하나 붙여주고 싶은 MZ세대의 소소한 웃음과 공감을 더했습니다.<br />
            교통(TRAFFIC), 쇼핑(SHOPPING), 휴가(VACATION) 이니셜을 직관적인 일러스트와 그래픽디자인으로 표현한 독특하고 새로운 감성의 카드 디자인입니다.
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-mono-custom text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#1인 프로젝트</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#작업기간 1주</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Photoshop</span>
            <span className="px-2.5 py-1 rounded bg-white/10 text-white">#Illustrator</span>
          </div>
        </div>
      );

    case 13:
      // Page 13: Hana Card 3 Plates
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div className="text-center font-mono-custom text-xs px-3 py-1 rounded-full border border-white/20 w-fit mx-auto">
            card design
          </div>

          <div className="grid grid-cols-3 gap-4 my-auto">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-between aspect-[5/8] text-center shadow-lg">
              <span className="text-[10px] text-rose-400 font-bold">HANA CARD</span>
              <div className="text-3xl font-extrabold text-amber-400">T</div>
              <span className="text-xs font-bold tracking-wider">TRAFFIC</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-between aspect-[5/8] text-center shadow-lg">
              <span className="text-[10px] text-emerald-400 font-bold">HANA CARD</span>
              <div className="text-3xl font-extrabold text-amber-300">S</div>
              <span className="text-xs font-bold tracking-wider">SHOPPING</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center justify-between aspect-[5/8] text-center shadow-lg">
              <span className="text-[10px] text-sky-400 font-bold">HANA CARD</span>
              <div className="text-3xl font-extrabold text-sky-300">V</div>
              <span className="text-xs font-bold tracking-wider">VACATION</span>
            </div>
          </div>
        </div>
      );

    case 14:
      // Page 14: Hana Card Front & Back Layout
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <div className="font-display text-2xl text-amber-400">PLATE FRONT & BACK SPECIFICATIONS</div>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              3종 카드의 앞면과 뒷면 상세 규격 (마그네틱 스트라이프, 카드번호 5417 0700 5678 0012, KIM HANA, 유효기간 09/15)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto p-4 rounded-xl bg-neutral-900/60 border border-white/10 font-mono-custom text-xs">
            <div className="p-3 border border-white/20 rounded-lg">
              <div className="font-bold text-amber-300">FRONT PLATE SPEC</div>
              <div className="text-[11px] text-neutral-400 mt-1">IC Chip 실버 엠보싱 / 반창고 투명 텍스처 / HANA CARD 브랜드 로고</div>
            </div>
            <div className="p-3 border border-white/20 rounded-lg">
              <div className="font-bold text-sky-300">BACK PLATE SPEC</div>
              <div className="text-[11px] text-neutral-400 mt-1">5417 0700 5678 0012 / KIM HANA / CVC 333 / 마그네틱 밴드 라인</div>
            </div>
          </div>
        </div>
      );

    case 15:
      // Page 15: Hana Card Contextual Mockups
      return (
        <div className="flex-grow flex flex-col justify-between py-2 text-white">
          <div>
            <div className="font-display text-2xl text-amber-400">CONTEXTUAL MOCKUP PHOTOGRAPHY</div>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              MZ세대의 3대 소비 맥락(교통, 쇼핑, 휴가)을 직관적으로 대변하는 실사 공간 매칭 렌더링
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 my-auto font-mono-custom text-xs">
            <div className="p-3 rounded-lg border border-neutral-700 bg-black/80 text-center">
              <div className="font-bold text-rose-400">TRAFFIC</div>
              <div className="text-[10px] text-neutral-400 mt-1">비 내리는 밤거리 자동차 조명</div>
            </div>
            <div className="p-3 rounded-lg border border-neutral-700 bg-black/80 text-center">
              <div className="font-bold text-amber-300">SHOPPING</div>
              <div className="text-[10px] text-neutral-400 mt-1">백화점 통유리 에스컬레이터</div>
            </div>
            <div className="p-3 rounded-lg border border-neutral-700 bg-black/80 text-center">
              <div className="font-bold text-sky-400">VACATION</div>
              <div className="text-[10px] text-neutral-400 mt-1">하와이 야자수 & 푸른 해변</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
