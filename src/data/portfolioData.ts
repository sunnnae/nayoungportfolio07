import { Project, AdCreativeItem, CareerExperience, ThemePalette } from '../types';

import stellaHeroImg from '../assets/images/stella_mockup_1789714197300.jpg';
import kadaeHeroImg from '../assets/images/kadae_mockup_1789714234331.jpg';
import syncroomHeroImg from '../assets/images/syncroom_mockup_1789714268696.jpg';
import hanaCardHeroImg from '../assets/images/hanacard_mockup_1789714295431.jpg';
import adCreativesHeroImg from '../assets/images/ad_creatives_mockup_1789714317546.jpg';

import adCreative1Img from '../assets/images/ad_nightsaren_1_1789721292340.jpg';
import adCreative2Img from '../assets/images/ad_nightsaren_2_1789721303623.jpg';
import adCreative3Img from '../assets/images/ad_nightsaren_3_1789721315183.jpg';
import adCreative4Img from '../assets/images/ad_nightsaren_4_1789721326088.jpg';

export interface SkillGauge {
  name: string;
  short: string;
  percent: number;
  category: string;
  description: string;
}

export const SKILL_GAUGES: SkillGauge[] = [
  { name: 'Photoshop', short: 'Ps', percent: 100, category: '2D Graphic', description: '고급 합성, 아트워크, 패키지 및 광고 크리에이티브' },
  { name: 'Illustrator', short: 'Ai', percent: 100, category: 'Vector', description: '로고, 심볼 시스템, 그래픽 모티프, 벡터 일러스트' },
  { name: 'Maya', short: 'M', percent: 90, category: '3D Animation', description: '3D 모델링, 씬 라이팅, 카메라 연출, 졸업 전시 애니메이션' },
  { name: 'Premiere Pro', short: 'Pr', percent: 65, category: 'Video', description: '영상 편집, 오디오 싱크, 숏폼 모션 컷 편집' },
  { name: 'InDesign', short: 'Id', percent: 50, category: 'Editorial', description: '가이드라인 북, 타이포그래피 조판, 인쇄물 제작' },
  { name: 'ZBrush', short: 'Z', percent: 50, category: '3D Sculpting', description: '3D 스컬프팅, 캐릭터 디테일링, 하이폴리곤 작업' },
  { name: 'After Effects', short: 'Ae', percent: 40, category: 'Motion', description: '모션 그래픽스, 인트로 애니메이션, 키프레임 효과' },
];

export const PERSONAL_INFO = {
  name: 'KIM NA YOUNG',
  nameKr: '김나영',
  role: 'BX · 3D · 2D Graphic Designer',
  specialty: '브랜드 비주얼 아이덴티티, 3D & 2D 그래픽, 퍼포먼스 광고 소재',
  lastUpdate: '26. 09. 20',
  email: 'nolooo@naver.com',
  phone: '+82 010 5512 9132',
  bioHeadline: '안녕하세요, 디자이너 김나영입니다.',
  bioPhilosophy:
    '사람들은 늘 분주하고 환경은 수시로 바뀝니다.\n그래서 우리는 매순간 떠오른 필요를 단번에 선택으로 가져오지 못합니다.\n저의 디자인은 그 틈을 메우며 기억을 결과를 ‘예쁘게’ 만드는 것보다 ‘기억되게’ 만듭니다.',
  tools: SKILL_GAUGES,
};

export const CAREER_HISTORY: CareerExperience[] = [
  {
    period: '2026.04 — 현재',
    title: '디자인팀장',
    company: '마곳간',
    description:
      '브랜드 비주얼 방향 설정 및 가이드 수립, 상세페이지·광고 소재 총괄, 팀원 리드 및 외주 관리',
    highlights: [
      '브랜드 비주얼 아이덴티티(BI) 리뉴얼 및 온·오프라인 비주얼 시스템 구축',
      '전체 상세페이지 기획/제작 총괄 및 퍼포먼스 마케팅용 전환율 중심 크리에이티브 지휘',
      '팀 리딩, 프로덕션 일정 조율 및 브랜드 톤앤매너 검수',
    ],
  },
  {
    period: '2024 — 2025',
    title: '디자인팀 책임대리',
    company: '(주)원정대',
    description:
      'GFA 및 META 광고 소재 기획·제작, 사내 편집 디자인 및 퍼포먼스 크리에이티브',
    highlights: [
      '네이버 GFA 및 메타(META) 피드 최적화 1080×1350 버티컬 광고 소재 30+종 제작',
      '엔드퍼프(END PUFF) 등 주요 브랜드 후킹 카피라이팅 및 전환율(CTR/CVR) 증대 비주얼 설계',
      '브랜드 오프라인 홍보물, 프로모션 배너 및 사내 편집 브랜딩 총괄',
    ],
  },
  {
    period: '2023.02',
    title: '한밭대학교 시각·영상디자인학과 졸업',
    company: '한밭대학교',
    description: 'MAYA를 활용한 3D 애니메이션 졸업 전시 및 종합 시각 조형 연구',
    highlights: [
      'Autodesk MAYA 및 ZBrush를 기반으로 한 3D 캐릭터 모델링, 텍스처링 및 씬 라이팅',
      '영상 연출, 스토리보딩 및 모션 그래픽 완성도 검증',
    ],
  },
  {
    period: '2019',
    title: '한밭대학교 시각·영상디자인학과 입학',
    company: '한밭대학교',
    description: '타이포그래피, 브랜딩, 조형 원리, 영상 그래픽 전공 이수',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'stella',
    title: '스텔라 떡볶이',
    subTitle: '떡볶이 브랜드 리브랜딩',
    category: 'bx',
    categoryLabel: 'BX · 리브랜딩',
    summary:
      '떡볶이 별에서 맛있는 떡볶이를 전하러 온 외계인, 스텔라. 다양한 메뉴와 바삭바삭한 별을 가진 외계인을 모티브로 디자인했습니다. 10–20대 여성을 타깃으로, 귀여운 외계인 캐릭터를 심볼로 사용해 독특함을 더했습니다.',
    heroImage: 'https://i.ifh.cc/NzvClw.jpg',
    galleryImages: [
      'https://i.ifh.cc/NzvClw.jpg',
      'https://i.ifh.cc/Cn6JDB.jpg',
      'https://i.ifh.cc/ap5maA.jpg',
    ],
    role: '1인 프로젝트 (브랜드 리브랜딩 총괄)',
    period: '2023.05 — 2023.06',
    tools: ['Photoshop', 'Illustrator'],
    tags: ['브랜드 아이덴티티', '캐릭터 심볼', '패키지 디자인', '가이드라인 북'],
    accentColor: '#e11d48',
    target: '트렌디한 외식 경험과 비주얼을 중시하는 10-20대 여성 타깃',
    visualConcept: '떡볶이 별에서 내려온 친근한 외계인 캐릭터 & 바삭한 별빛 곡선',
    designRationale:
      '단순한 별(Star)의 상징을 넘어 외계인이라는 스토리텔링을 입혀 독창적인 세계관을 설정했습니다. 강렬한 스텔라 레드와 옐로우의 높은 대비로 주목도를 극대화하고, 일관된 패키지/매장 매뉴얼을 수립했습니다.',
    sections: [
      {
        title: '01. BRAND STORY & CONCEPT',
        subtitle: '별에서 내려온 독특한 세계관',
        image: 'https://i.ifh.cc/NzvClw.jpg',
        description:
          '흔한 분식집 이미지를 탈피하기 위해 "떡볶이 별에서 맛있는 음식을 전하러 온 외계인 스텔라"라는 위트 있는 스토리텔링을 구축했습니다. 바삭한 별가루 토핑과 떡의 곡선을 캐릭터 뿔과 표정에 자연스럽게 결합시켰습니다.',
        keyPoints: [
          '메인 컬러: STELLAR RED (열정, 매콤함) & STELLAR YELLOW (바삭한 별, 즐거움)',
          '타깃 오디언스: 시각적 재미와 SNS 인증을 즐기는 10·20 여성 고객층',
          '심볼마크: 외계인 실루엣과 떡볶이 떡의 유려한 곡선을 합성한 위트 있는 캐릭터',
        ],
      },
      {
        title: '02. LOGO & GRAFIC MOTIF',
        subtitle: '단순한 심볼을 넘어선 비주얼 모듈',
        image: 'https://i.ifh.cc/Cn6JDB.jpg',
        description:
          '떡, 튀김, 어묵, 만두 등 떡볶이 매장의 대표 메뉴들을 미니멀한 그래픽 모티프로 재해석했습니다. 이 요소들은 독립적인 아이콘뿐 아니라 리드미컬한 패턴과 프레임으로 확장되어 포장 패키지부터 굿즈까지 일관되게 적용됩니다.',
        keyPoints: [
          '미니멀 메뉴 모티프: 떡, 만두, 어묵의 실루엣을 기하학적 곡선으로 정제',
          '모듈러 패턴: 배달 용기 띠지, 유니폼 자수, 박스 테이프에 반복 적용 가능한 시스템',
          '로고 타입: 레트로와 모던이 공존하는 볼드한 아치형 국문 레터링',
        ],
      },
      {
        title: '03. DESIGN GUIDELINE BOOK',
        subtitle: '매장부터 배달 패키지까지 왜곡 없는 적용 시스템',
        image: 'https://i.ifh.cc/ap5maA.jpg',
        description:
          '스텔라 떡볶이만의 위트 있는 세계관을 온·오프라인 매체에 일관되게 적용하기 위한 종합 비주얼 가이드입니다. 배달 가방, 테이크아웃 박스, 보온 백, 유니폼, 식기류 등 모든 고객 접점 규정을 정밀하게 수립했습니다.',
        keyPoints: [
          'A/B 타입 로고 변형 규정 및 최소 여백 규정 준수',
          '실제 배달 상황을 고려한 고시인성 바이크 배달백 및 테이핑 시스템',
          '가맹점 확장을 고려한 오프라인 인쇄 매뉴얼 및 머천다이즈 시방서',
        ],
      },
    ],
  },
  {
    id: 'kadae',
    title: 'KADAE 카대',
    subTitle: '지역의 이야기를 아카이브한 로컬 중심 카페',
    category: 'bx',
    categoryLabel: 'BX · 로컬 카페',
    summary:
      '지역의 특산물과 정보를 한곳에 모아 이야기를 나누는 카페입니다. ‘~하더라, ~그렇다더라’라는 뜻의 경상도 방언 ‘카대’를 이름으로 삼고, 여러 말이 한곳에 모이는 모습을 말풍선 그래픽 모티브로 형상화했습니다.',
    heroImage: 'https://i.ifh.cc/35S7w3.jpg',
    galleryImages: [
      'https://i.ifh.cc/35S7w3.jpg',
      'https://i.ifh.cc/ZjR9BT.jpg',
      'https://i.ifh.cc/oRORfN.jpg',
    ],
    role: '1인 프로젝트 (네이밍, 아이덴티티, 공간 어플리케이션)',
    period: '2023 (작업기간 2주)',
    tools: ['Photoshop', 'Illustrator'],
    tags: ['로컬 브랜딩', '스토리텔링', '말풍선 모티프', '공간 그래픽'],
    accentColor: '#141414',
    target: '직접 그 지역에 가지 않아도 다양한 지역 문화를 즐기고 싶은 20대',
    visualConcept: '한곳으로 모이는 구름 같은 정보 & 비정형 말풍선 모티프',
    designRationale:
      '다양한 컬러의 지역 특산물 메뉴가 돋보이도록 베이스는 절제된 블랙&화이트로 설계했습니다. 카대는 뒤에서 묵묵히 정보를 담아 전달하는 그릇의 역할을 합니다.',
    sections: [
      {
        title: '01. NAMING & ARCHIVE CONCEPT',
        subtitle: '이야기가 모여 문화가 되는 곳',
        image: 'https://i.ifh.cc/35S7w3.jpg',
        description:
          '‘카대’는 경상도 방언으로 "~라더라, ~그렇다더라"라는 전언의 뉘앙스를 품고 있습니다. 전국 각지의 제철 특산물과 그 땅의 이야기들을 아카이브하여 도심 속 카페에서 음료와 디저트로 향유하는 커뮤니티 플랫폼을 지향합니다.',
        keyPoints: [
          '언어적 유희: 소문과 구전처럼 흥미진진하게 전달되는 지역 콘텐츠',
          '타깃: 로컬 라이프스타일과 식문화를 탐색하는 감각적인 20대 청년층',
          '컬러 전략: 모노톤(Black & White)으로 중심을 잡고, 원재료 고유의 천연 색감을 극대화',
        ],
      },
      {
        title: '02. VISUAL MOTIF: CLOUDS OF STORIES',
        subtitle: '구름처럼 부유하다 한곳으로 맺히는 말풍선',
        image: 'https://i.ifh.cc/ZjR9BT.jpg',
        description:
          '여러 곳에서 피어난 이야기 구름이 한곳에 모이는 이미지를 바탕으로, 비정형의 유기적인 말풍선 그래픽 모티프를 창조했습니다. 이 말풍선들은 텍스트를 담거나, 제품 사진을 꽃받침처럼 받쳐주는 시각적 앵커가 됩니다.',
        keyPoints: [
          '비정형 말풍선: 정형화되지 않은 친근하고 자유로운 손글씨적 곡선',
          '거리 포스터 캠페인: 과일 타르트, 콜드브루와 결합되어 거리의 시선을 사로잡는 타이포 포스터',
          '굿즈 & 유니폼: 린넨 에이프런 자수 및 묵직한 무광 블랙 머그컵 각인',
        ],
      },
      {
        title: '03. SPATIAL & MERCHANDISE APPLICATION',
        subtitle: '로컬이 머무는 공간의 질감',
        image: 'https://i.ifh.cc/oRORfN.jpg',
        description:
          '온라인과 매장 내 포스터, 메뉴보드, 패키지 컵홀더까지 하나의 단단한 미니멀리즘으로 귀결됩니다. 손님들은 음료를 마시며 컵 아래 적힌 그 달의 로컬 스토리를 자연스럽게 읽게 됩니다.',
        keyPoints: [
          '테이크아웃 컵 & 패키지: 친환경 크라프트지와 모노톤 라인아트의 결합',
          '거리 벽보 포스터: 그래픽 텍스처를 살린 모듈형 연속 부착 디자인',
          '브랜드 슬로건: "I HEAR THERE: 지역의 말이 깃든 향긋한 한 잔"',
        ],
      },
    ],
  },
  {
    id: 'syncroom',
    title: 'SYNCROOM',
    subTitle: '인터넷 합주 프로그램 리브랜딩',
    category: 'bx',
    categoryLabel: 'BX · 합주 프로그램',
    summary:
      'SYNCROOM은 딜레이 없이 소리를 전달해 온라인 합주를 가능하게 하는 프로그램입니다. 익명의 사람들과 시공간의 제약 없이 음악만으로 소통할 수 있다는 점에 주목해, 전원을 켜고 문을 여는 합주의 여정을 시각화했습니다.',
    heroImage: 'https://i.ifh.cc/1mjC60.jpg',
    galleryImages: [
      'https://i.ifh.cc/1mjC60.jpg',
      'https://i.ifh.cc/Vad0wh.jpg',
      'https://i.ifh.cc/XQho4m.jpg',
    ],
    role: '1인 프로젝트 (로고 리디자인, 키비주얼, 포스터)',
    period: '2023 (작업기간 2주)',
    tools: ['Photoshop', 'Illustrator'],
    tags: ['소프트웨어 브랜딩', '뮤직 테크', '심볼 시스템', '비주얼 아이덴티티'],
    accentColor: '#0284c7',
    target: '거리의 한계를 넘어 실시간 세션과 잼을 원하는 뮤지션 및 음악 애호가',
    visualConcept: '전원을 켜면 인터넷 세상의 문이 열리고 음악이 흐른다',
    designRationale:
      '전원(Power Button) + 8분음표(Note) + 열쇠/문(Key)의 3가지 의미 요소를 미니멀하게 융합해, 디지털 공간에서의 유기적인 음악 교류를 상징했습니다.',
    sections: [
      {
        title: '01. PROBLEM & SYMBOL ANATOMY',
        subtitle: '시공간의 지연(Delay)을 제로로 잇는 음악의 통로',
        image: 'https://i.ifh.cc/1mjC60.jpg',
        description:
          '기존 SYNCROOM의 기술 중심적이고 투박했던 인상을 개선하고, "집에서도 언제든 프로 뮤지션들과 합주할 수 있는 마법 같은 연결"이라는 사용자 감성 가치에 집중했습니다.',
        keyPoints: [
          '전원 버튼 (Power): 클릭 한 번으로 합주 세션에 입장하는 직관성',
          '음표 (Note): 장르와 국경을 뛰어넘는 음악 본연의 즐거움',
          '열쇠와 문 (Key & Gate): 인터넷 네트워크 세상으로 진입하는 문',
        ],
      },
      {
        title: '02. COLOR PALETTE & FLUID GRAPHIC',
        subtitle: '일렉트릭 블루와 유연한 음파의 흐름',
        image: 'https://i.ifh.cc/Vad0wh.jpg',
        description:
          '디지털 네트워크의 투명함과 청량한 음색을 표현하는 Cyan 70 M 17 컬러를 키 컬러로 설정했습니다. 심볼 내부에는 기타 피크와 일렉트릭 텍스처를 머금은 마블링 유체 효과를 가미해 역동성을 불어넣었습니다.',
        keyPoints: [
          'Color System: Electric Blue (C70 M17), Sky Mist (C40 M4 Y3), Deep Synth Navy, Lavender Accent',
          'Graphic Motif: 전원 버튼 누름 → 인터넷 진입 → 모든 이에게 딜레이 없이 흐르는 음파 라인',
          '타이포그래피: 기하학적 산세리프 레터링과 흐르는 곡선의 입체적 오버랩',
        ],
      },
      {
        title: '03. POSTER SERIES & BRAND CAMPAIGN',
        subtitle: '방 안에서 펼쳐지는 무한한 합주 무대',
        image: 'https://i.ifh.cc/XQho4m.jpg',
        description:
          '마이크, 오디오 인터페이스, 광케이블 등 실제 홈 레코딩 뮤지션들의 작업 환경 오브제들을 모노톤 그래픽으로 배경에 배치하고, 그 위에 볼드한 SYNCROOM 워드마크와 푸른 심볼을 오버레이했습니다.',
        keyPoints: [
          '대형 스트리트 포스터 목업: 실제 거리 전시 및 버스킹 문화권 침투',
          '인터랙티브 UI 매칭: 소프트웨어 구동 시 로딩 화면 및 인터페이스 아이콘과 완벽 일치',
          '테크니컬 스펙 명시: ASIO 드라이버 및 광랜 환경 가이드의 감각적 인포그래픽화',
        ],
      },
    ],
  },
  {
    id: 'hana',
    title: '“상처받지마” 하나카드',
    subTitle: '하나카드 PLATE 디자인 시리즈',
    category: 'graphic',
    categoryLabel: 'GD · 카드 플레이트',
    summary:
      '상처받은 MZ세대의 통장 잔고를 토닥토닥 달래주는 카드 시리즈. 구멍 난 통장에 반창고 하나 붙여주고 싶은 마음으로, 교통(TRAFFIC)·쇼핑(SHOPPING)·휴가(VACATION)의 이니셜을 반창고 일러스트와 그래픽으로 풀어냈습니다.',
    heroImage: 'https://i.ifh.cc/P3kG1W.jpg',
    galleryImages: [
      'https://i.ifh.cc/P3kG1W.jpg',
      'https://i.ifh.cc/9xQpKV.jpg',
      'https://i.ifh.cc/vwlcsq.jpg',
    ],
    role: '1인 프로젝트 (카드 플레이트 그래픽 기획 및 비주얼 디자인)',
    period: '2023 (작업기간 1주)',
    tools: ['Photoshop', 'Illustrator'],
    tags: ['카드 디자인', '패키징 & 플레이트', '일러스트레이션', '위트 & 공감'],
    accentColor: '#f59e0b',
    target: '고물가 속에서 소비에 피로감을 느끼며 힐링과 위트를 원하는 2030 세대',
    visualConcept: '텅장과 지갑에 붙이는 알록달록 반창고 케어(Band-Aid Care)',
    designRationale:
      'IC 칩과의 조화를 고려하면서 반창고의 구멍 타공 텍스처와 반투명 밴드 질감을 사실적이면서도 몽환적인 그라디언트로 표현했습니다.',
    sections: [
      {
        title: '01. CONCEPT & RATIONALE',
        subtitle: '지출의 상처를 따뜻하게 감싸주는 위트',
        image: 'https://i.ifh.cc/P3kG1W.jpg',
        description:
          '월급날 직후 순식간에 통장을 스쳐 지나가는 잔고를 보며 한숨 쉬는 2030 청년들의 마음에 주목했습니다. "돈 쓰는 것도 지치는데, 카드라도 나를 위로해주면 안 될까?"라는 물음에서 반창고를 모티브로 한 힐링 플레이트가 탄생했습니다.',
        keyPoints: [
          '핵심 메타포: 찢어진 마음에 붙이는 반창고(Band-Aid) 일러스트레이션',
          '소비 3대 영역 세분화: 교통(T), 쇼핑(S), 휴가(V)',
          '재질감 연구: 반투명 특수 코팅 및 펄 텍스처를 시뮬레이션한 입체 렌더링',
        ],
      },
      {
        title: '02. THREE PLATE VARIATIONS',
        subtitle: 'T · S · V 세 가지 일상의 순간들',
        image: 'https://i.ifh.cc/9xQpKV.jpg',
        description:
          '각 알파벳의 골격을 반창고의 겹침으로 재구성했습니다. 각 소비 테마가 연상되는 감성적인 배경과 컬러를 부여했습니다.',
        keyPoints: [
          'TRAFFIC (T): 야근과 통근길의 네온사인 불빛을 머금은 딥 블랙 & 웜 오렌지 밴드',
          'SHOPPING (S): 쇼핑몰 에스컬레이터의 화사한 조명을 닮은 부드러운 파스텔 옐로우 & 크림 밴드',
          'VACATION (V): 에메랄드빛 해변과 야자수 바다를 담은 청량한 스카이 블루 & 쿨 밴드',
        ],
      },
      {
        title: '03. CONTEXTUAL DISPLAY MOCKUPS',
        subtitle: '현실의 풍경과 맞닿는 카드의 존재감',
        image: 'https://i.ifh.cc/vwlcsq.jpg',
        description:
          '도시의 비 내리는 밤거리, 쇼핑몰의 세련된 공간, 눈부신 하와이 해변 실사와 1:1로 매칭하여 카드가 손에 쥐어졌을 때 느껴지는 감성적 몰입감을 극대화했습니다.',
        keyPoints: [
          'IC 칩 홀더 및 마그네틱 라인 규격 최적화 설계',
          '홀로그램 박과 음각 레터링 후가공을 고려한 그래픽 배치',
          '소장 욕구를 자극하는 카드 패키지 슬리브 확장 디자인',
        ],
      },
    ],
  },
];

const AD_CREATIVE_URLS: string[] = [
  'https://i.ifh.cc/MCGKsT.jpg',
  'https://i.ifh.cc/baxao8.jpg',
  'https://i.ifh.cc/VoNqlR.jpg',
  'https://i.ifh.cc/Nrx1pX.jpg',
  'https://i.ifh.cc/l5K96Y.jpg',
  'https://i.ifh.cc/t8DvLZ.jpg',
  'https://i.ifh.cc/58Jkjo.jpg',
  'https://i.ifh.cc/vRBbPY.jpg',
  'https://i.ifh.cc/rrAdPy.jpg',
  'https://i.ifh.cc/0wOazt.jpg',
  'https://i.ifh.cc/H9BsWX.jpg',
  'https://i.ifh.cc/SRq1Wc.jpg',
  'https://i.ifh.cc/W9RASs.jpg',
  'https://i.ifh.cc/KgrfCm.jpg',
  'https://i.ifh.cc/qok0jt.jpg',
  'https://i.ifh.cc/HGsTpT.jpg',
  'https://i.ifh.cc/MB8Lqy.jpg',
  'https://i.ifh.cc/c5AkNl.jpg',
  'https://i.ifh.cc/kl88tz.jpg',
  'https://i.ifh.cc/SFhCzM.jpg',
  'https://i.ifh.cc/wAAOxQ.jpg',
  'https://i.ifh.cc/QlcJBm.jpg',
  'https://i.ifh.cc/HoZz9P.jpg',
  'https://i.ifh.cc/pR5lAo.jpg',
  'https://i.ifh.cc/fCGBd6.jpg',
  'https://i.ifh.cc/SdPN08.jpg',
  'https://i.ifh.cc/BwCd43.jpg',
  'https://i.ifh.cc/KRcLPz.jpg',
  'https://i.ifh.cc/f1wCl1.jpg',
  'https://i.ifh.cc/lSG4xW.jpg',
  'https://i.ifh.cc/wDyzcN.jpg',
  'https://i.ifh.cc/Q8RdNK.jpg',
  'https://i.ifh.cc/c2KRXA.jpg',
  'https://i.ifh.cc/GV6T7l.jpg',
  'https://i.ifh.cc/LbgCjT.jpg',
  'https://i.ifh.cc/ScfvAt.jpg',
  'https://i.ifh.cc/mgDQ0K.jpg',
  'https://i.ifh.cc/nC0TDr.jpg',
  'https://i.ifh.cc/FsbNnZ.jpg',
  'https://i.ifh.cc/jaDbNo.jpg',
  'https://i.ifh.cc/ozfO9A.jpg',
  'https://i.ifh.cc/6WQGCV.jpg',
  'https://i.ifh.cc/DnQxmS.jpg',
  'https://i.ifh.cc/o6X3wR.jpg',
  'https://i.ifh.cc/vngqxC.jpg',
  'https://i.ifh.cc/w5tCWc.jpg',
  'https://i.ifh.cc/j6Vnlo.jpg',
  'https://i.ifh.cc/vMcQCF.jpg',
  'https://i.ifh.cc/A46tz6.jpg',
  'https://i.ifh.cc/hZSybA.jpg',
  'https://i.ifh.cc/k6PPXz.jpg',
];

export const AD_CREATIVES: AdCreativeItem[] = AD_CREATIVE_URLS.map((url, index) => {
  const num = index + 1;
  const numStr = String(num).padStart(2, '0');

  return {
    id: `ad-${numStr}`,
    number: numStr,
    brand: 'Performance Ad',
    headline: `광고 소재 #${numStr}`,
    dimensions: '1080 × 1080',
    year: '2024 — 2025',
    image: url,
    isPlaceholder: false,
  };
});

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Noir',
    bg: '#0e0e0e',
    surface: '#181715',
    text: '#f2f0ec',
    textMuted: '#a9a59e',
    border: '#2c2b29',
    accent: '#ffffff',
    badgeBg: '#252422',
  },
  {
    id: 'electric',
    name: 'Electric Cobalt',
    bg: '#080c14',
    surface: '#101726',
    text: '#f0f6fc',
    textMuted: '#94a3b8',
    border: '#1e293b',
    accent: '#38bdf8',
    badgeBg: '#1e293b',
  },
  {
    id: 'terracotta',
    name: 'Spencer Warm',
    bg: '#14110f',
    surface: '#201b17',
    text: '#faf5ee',
    textMuted: '#bdae9f',
    border: '#3b322a',
    accent: '#f97316',
    badgeBg: '#2d241d',
  },
  {
    id: 'cream',
    name: 'Cream Editorial',
    bg: '#f6f4ee',
    surface: '#ffffff',
    text: '#141414',
    textMuted: '#5b5852',
    border: '#e2ded5',
    accent: '#0e0e0e',
    badgeBg: '#e8e4dc',
  },
  {
    id: 'matcha',
    name: 'Cyber Sage',
    bg: '#0a120e',
    surface: '#122019',
    text: '#f2fcf6',
    textMuted: '#8ba696',
    border: '#1e382b',
    accent: '#4ade80',
    badgeBg: '#182f23',
  },
];
