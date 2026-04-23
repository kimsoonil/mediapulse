import type { ContentItem, ContentType, SortKey } from "./types";

export const TABS = ["전체", "영화", "드라마", "애니", "게임", "웹툰"] as const;

// 매체별 색상 시스템 (Section 1-3 스펙 기준)
export const TYPE_COLOR: Record<ContentType, string> = {
  영화: "#e74c3c",   // 레드
  드라마: "#e67e22", // 오렌지
  애니: "#3498db",   // 블루
  게임: "#e74c6f",   // 핑크레드
  웹툰: "#2ecc71",   // 그린
};

export const GENRE_FILTERS = [
  "전체 장르",
  "액션",
  "로맨스",
  "SF",
  "공포",
  "판타지",
  "모험",
  "소울라이크",
] as const;

export const PLATFORM_FILTERS = ["전체 플랫폼", "넷플릭스", "극장", "PC/PS5", "카카오페이지"] as const;

export const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "community_heat", label: "커뮤니티 열기순" },
  { value: "community_score", label: "커뮤니티 평점순" },
  { value: "score", label: "평점순" },
  { value: "youtube_count", label: "유튜브 리뷰순" },
];

// Supabase 연결 전 개발용 목 데이터
export const MOCK_DATA: ContentItem[] = [
  {
    id: 1,
    type: "영화",
    title: "파묘",
    year: 2024,
    genre: ["공포", "미스터리"],
    score: 8.4,
    community_score: 9.1,
    platform: "극장",
    thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    tags: ["한국", "흥행", "감독추천"],
    youtube_count: 342,
    community_heat: 98,
    summary: "묫자리를 옮기며 시작된 기이한 사건들. 국내 공포영화 신기록.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "장재현 감독 커리어 최고작, 오컬트 장르의 완성", heat: 94 },
      { source: "디시", text: "엔딩 해석 스레드가 1000개 넘음 ㄷㄷ", heat: 88 },
    ],
  },
  {
    id: 2,
    type: "게임",
    title: "검은 신화: 오공",
    year: 2024,
    genre: ["액션RPG", "소울라이크"],
    score: 9.0,
    community_score: 9.4,
    platform: "PC/PS5",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    tags: ["중국", "GOTY후보", "고사양"],
    youtube_count: 1204,
    community_heat: 99,
    summary: "서유기를 원작으로 한 중국산 AAA 액션RPG. 글로벌 충격작.",
    cross_media: null,
    reviews: [
      { source: "스팀", text: "압도적으로 긍정적 (97%)", heat: 97 },
      { source: "루리웹", text: "보스전 난이도가 소울라이크 그 자체", heat: 85 },
    ],
  },
  {
    id: 3,
    type: "애니",
    title: "프리렌: 장송의 프리렌",
    year: 2023,
    genre: ["판타지", "모험"],
    score: 9.2,
    community_score: 9.5,
    platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80",
    tags: ["완결", "명작", "감성"],
    youtube_count: 876,
    community_heat: 96,
    summary: "모험이 끝난 후를 그린 엘프 마법사의 이야기. 2023년 최고 애니.",
    cross_media: { id: 9, type: "웹툰", title: "프리렌 원작 만화" },
    reviews: [
      { source: "유튜브", text: "100년에 한 번 나올 작품, 명작 확정", heat: 96 },
      { source: "커뮤니티", text: "10화 보고 울었다는 후기가 쏟아짐", heat: 91 },
    ],
  },
  {
    id: 4,
    type: "드라마",
    title: "눈물의 여왕",
    year: 2024,
    genre: ["로맨스", "멜로"],
    score: 8.7,
    community_score: 8.9,
    platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    tags: ["한국", "넷플릭스1위", "김수현"],
    youtube_count: 654,
    community_heat: 93,
    summary: "재벌가 며느리와 시골 군수의 사랑. 넷플릭스 한국 드라마 최고 시청률.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "김지원 역대급 연기, OST도 완벽", heat: 90 },
      { source: "인스타", text: "촬영지 성지순례 시작됨", heat: 78 },
    ],
  },
  {
    id: 5,
    type: "웹툰",
    title: "나 혼자만 레벨업",
    year: 2023,
    genre: ["헌터물", "액션"],
    score: 9.1,
    community_score: 9.3,
    platform: "카카오페이지",
    thumb: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&q=80",
    tags: ["완결", "애니화", "글로벌흥행"],
    youtube_count: 543,
    community_heat: 95,
    summary: "최약체 헌터가 유일한 플레이어로 성장하는 이야기. 글로벌 1위 웹툰.",
    cross_media: { id: 8, type: "애니", title: "Solo Leveling 애니메이션" },
    reviews: [
      { source: "커뮤니티", text: "애니화 발표 후 해외 반응 폭발", heat: 92 },
      { source: "유튜브", text: "완결까지 퀄리티 유지한 보기 드문 작품", heat: 88 },
    ],
  },
  {
    id: 6,
    type: "영화",
    title: "듄: 파트2",
    year: 2024,
    genre: ["SF", "서사"],
    score: 8.9,
    community_score: 8.7,
    platform: "극장/왓챠",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    tags: ["할리우드", "SF걸작", "IMAX추천"],
    youtube_count: 921,
    community_heat: 91,
    summary: "아라키스 행성의 운명을 건 전쟁. 시대를 대표할 SF 서사시.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "IMAX로 봐야 하는 이유가 있는 영화", heat: 93 },
      { source: "레딧", text: "원작 팬도 만족한 완성도", heat: 86 },
    ],
  },
  {
    id: 7,
    type: "게임",
    title: "엘든 링: 황금 나무의 그림자",
    year: 2024,
    genre: ["소울라이크", "RPG"],
    score: 9.3,
    community_score: 9.0,
    platform: "PC/콘솔",
    thumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
    tags: ["DLC", "프롬소프트", "고난이도"],
    youtube_count: 1087,
    community_heat: 97,
    summary: "엘든 링 대규모 DLC. 본편을 능가한다는 평가 속출.",
    cross_media: null,
    reviews: [
      { source: "스팀", text: "DLC 역사상 최고의 완성도", heat: 95 },
      { source: "디시", text: "마지막 보스 난이도 논란 중", heat: 82 },
    ],
  },
  {
    id: 8,
    type: "애니",
    title: "Solo Leveling",
    year: 2024,
    genre: ["헌터물", "액션"],
    score: 8.5,
    community_score: 8.8,
    platform: "크런치롤",
    thumb: "https://images.unsplash.com/photo-1601513445506-2ab0d3f6f2f5?w=400&q=80",
    tags: ["한국원작", "애니화", "2쿨"],
    youtube_count: 734,
    community_heat: 89,
    summary: "국내 최고 인기 웹소설의 애니화. 글로벌 동시 방영.",
    cross_media: { id: 5, type: "웹툰", title: "나 혼자만 레벨업" },
    reviews: [
      { source: "유튜브", text: "작화 퀄리티가 기대 이상", heat: 87 },
      { source: "커뮤니티", text: "해외반응이 더 뜨거운 한국 원작 애니", heat: 84 },
    ],
  },
];

// 트렌딩 이유 맵 (Sidebar Section 3)
export const TRENDING_REASONS: Record<string, string> = {
  "검은 신화: 오공": "📈 유튜브 리뷰 48h 내 +320%",
  "엘든 링: 황금 나무의 그림자": "🔥 커뮤니티 언급량 폭발",
  "파묘": "🎬 극장 재개봉 결정",
  "프리렌: 장송의 프리렌": "💬 해외 반응 급상승",
  "나 혼자만 레벨업": "📺 2쿨 방영 시작",
  "눈물의 여왕": "🏆 넷플릭스 글로벌 1위",
  "듄: 파트2": "🎥 IMAX 재상영 시작",
  "Solo Leveling": "⚡ 2시즌 제작 확정",
};
