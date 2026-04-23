import type { ContentItem, ContentType, SortKey } from "./types";

export const TABS = ["전체", "영화", "드라마", "애니", "게임", "웹툰"] as const;

export const TYPE_COLOR: Record<ContentType, string> = {
  영화:   "#dc2626",
  드라마: "#ea580c",
  애니:   "#2563eb",
  게임:   "#db2777",
  웹툰:   "#16a34a",
};

export const GENRE_FILTERS = [
  "전체 장르", "액션", "로맨스", "SF", "공포", "판타지", "스릴러", "힐링", "감동", "스포츠", "모험", "소울라이크",
] as const;

export const PLATFORM_FILTERS = [
  "전체 플랫폼", "넷플릭스", "디즈니+", "왓챠", "웨이브", "티빙", "Apple TV+", "극장", "라프텔", "네이버웹툰", "카카오페이지",
] as const;

export const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "community_heat",  label: "커뮤니티 열기순" },
  { value: "community_score", label: "커뮤니티 평점순" },
  { value: "score",           label: "전문 평점순" },
  { value: "youtube_count",   label: "유튜브 리뷰순" },
];

export const TRENDING_REASONS: Record<string, string> = {
  "검은 신화: 오공":              "📈 유튜브 리뷰 48h 내 +320%",
  "엘든 링: 황금 나무의 그림자": "🔥 커뮤니티 언급량 폭발",
  "파묘":                         "🎬 극장 재개봉 결정",
  "프리렌: 장송의 프리렌":       "💬 해외 반응 급상승",
  "나 혼자만 레벨업":             "📺 2쿨 방영 시작",
  "눈물의 여왕":                  "🏆 넷플릭스 글로벌 1위",
  "오징어게임 시즌2":             "🌍 190개국 동시 공개 화제",
  "진격의 거인: 파이널":         "⚡ 완결 기념 재조명 급등",
  "스즈메의 문단속":              "🎥 왓챠 신규 입점",
  "더 글로리":                    "🌐 넷플릭스 글로벌 TOP10",
  "귀멸의 칼날: 무한성 편":      "🔥 ufotable 작화 화제 폭발",
  "폭싹 속았수다":                "❤️ IU 주연 글로벌 반응 폭발",
  "선재 업고 튀어":               "📈 티빙 역대 최고 시청률",
};

export const MOCK_DATA: ContentItem[] = [
  /* ───── 기존 15개 ───── */
  {
    id: 1, type: "영화", title: "파묘", year: 2024,
    genre: ["공포", "미스터리"], score: 8.4, community_score: 9.1, platform: "극장",
    thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80",
    tags: ["한국", "흥행", "감독추천"], youtube_count: 342, community_heat: 98,
    summary: "묫자리를 옮기며 시작된 기이한 사건들. 국내 공포영화 신기록.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "장재현 감독 커리어 최고작, 오컬트 장르의 완성", heat: 94 },
      { source: "디시", text: "엔딩 해석 스레드가 1000개 넘음 ㄷㄷ", heat: 88 },
    ],
  },
  {
    id: 2, type: "게임", title: "검은 신화: 오공", year: 2024,
    genre: ["액션RPG", "소울라이크"], score: 9.0, community_score: 9.4, platform: "PC/PS5",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    tags: ["중국", "GOTY후보", "고사양"], youtube_count: 1204, community_heat: 99,
    summary: "서유기를 원작으로 한 중국산 AAA 액션RPG. 글로벌 충격작.",
    cross_media: null,
    reviews: [
      { source: "스팀", text: "압도적으로 긍정적 (97%)", heat: 97 },
      { source: "루리웹", text: "보스전 난이도가 소울라이크 그 자체", heat: 85 },
    ],
  },
  {
    id: 3, type: "애니", title: "프리렌: 장송의 프리렌", year: 2023,
    genre: ["판타지", "모험"], score: 9.2, community_score: 9.5, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80",
    tags: ["완결", "명작", "감성"], youtube_count: 876, community_heat: 96,
    summary: "모험이 끝난 후를 그린 엘프 마법사의 이야기. 2023년 최고 애니.",
    cross_media: { id: 9, type: "웹툰", title: "프리렌 원작 만화" },
    reviews: [
      { source: "유튜브", text: "100년에 한 번 나올 작품, 명작 확정", heat: 96 },
      { source: "커뮤니티", text: "10화 보고 울었다는 후기가 쏟아짐", heat: 91 },
    ],
  },
  {
    id: 4, type: "드라마", title: "눈물의 여왕", year: 2024,
    genre: ["로맨스", "멜로"], score: 8.7, community_score: 8.9, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    tags: ["한국", "넷플릭스1위", "김수현"], youtube_count: 654, community_heat: 93,
    summary: "재벌가 며느리와 시골 군수의 사랑. 넷플릭스 한국 드라마 최고 시청률.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "김지원 역대급 연기, OST도 완벽", heat: 90 },
      { source: "인스타", text: "촬영지 성지순례 시작됨", heat: 78 },
    ],
  },
  {
    id: 5, type: "웹툰", title: "나 혼자만 레벨업", year: 2023,
    genre: ["헌터물", "액션"], score: 9.1, community_score: 9.3, platform: "카카오페이지",
    thumb: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&q=80",
    tags: ["완결", "애니화", "글로벌흥행"], youtube_count: 543, community_heat: 95,
    summary: "최약체 헌터가 유일한 플레이어로 성장하는 이야기. 글로벌 1위 웹툰.",
    cross_media: { id: 8, type: "애니", title: "Solo Leveling 애니메이션" },
    reviews: [
      { source: "커뮤니티", text: "애니화 발표 후 해외 반응 폭발", heat: 92 },
      { source: "유튜브", text: "완결까지 퀄리티 유지한 보기 드문 작품", heat: 88 },
    ],
  },
  {
    id: 6, type: "영화", title: "듄: 파트2", year: 2024,
    genre: ["SF", "서사", "모험"], score: 8.9, community_score: 8.7, platform: "왓챠",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    tags: ["할리우드", "SF걸작", "IMAX추천"], youtube_count: 921, community_heat: 91,
    summary: "아라키스 행성의 운명을 건 전쟁. 시대를 대표할 SF 서사시.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "IMAX로 봐야 하는 이유가 있는 영화", heat: 93 },
      { source: "레딧", text: "원작 팬도 만족한 완성도", heat: 86 },
    ],
  },
  {
    id: 7, type: "게임", title: "엘든 링: 황금 나무의 그림자", year: 2024,
    genre: ["소울라이크", "RPG", "액션"], score: 9.3, community_score: 9.0, platform: "PC/콘솔",
    thumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
    tags: ["DLC", "프롬소프트", "고난이도"], youtube_count: 1087, community_heat: 97,
    summary: "엘든 링 대규모 DLC. 본편을 능가한다는 평가 속출.",
    cross_media: null,
    reviews: [
      { source: "스팀", text: "DLC 역사상 최고의 완성도", heat: 95 },
      { source: "디시", text: "마지막 보스 난이도 논란 중", heat: 82 },
    ],
  },
  {
    id: 8, type: "애니", title: "Solo Leveling", year: 2024,
    genre: ["헌터물", "액션"], score: 8.5, community_score: 8.8, platform: "크런치롤",
    thumb: "https://images.unsplash.com/photo-1601513445506-2ab0d3f6f2f5?w=400&q=80",
    tags: ["한국원작", "애니화", "2쿨"], youtube_count: 734, community_heat: 89,
    summary: "국내 최고 인기 웹소설의 애니화. 글로벌 동시 방영.",
    cross_media: { id: 5, type: "웹툰", title: "나 혼자만 레벨업" },
    reviews: [
      { source: "유튜브", text: "작화 퀄리티가 기대 이상", heat: 87 },
      { source: "커뮤니티", text: "해외반응이 더 뜨거운 한국 원작 애니", heat: 84 },
    ],
  },
  {
    id: 9, type: "웹툰", title: "프리렌 원작 만화", year: 2020,
    genre: ["판타지", "모험", "감동"], score: 9.4, community_score: 9.6, platform: "선데이 코믹스",
    thumb: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
    tags: ["일본만화", "원작", "완결"], youtube_count: 312, community_heat: 88,
    summary: "애니메이션보다 먼저 시작된 원작 만화. 여유로운 서사와 깊은 감성이 특징.",
    cross_media: { id: 3, type: "애니", title: "프리렌: 장송의 프리렌" },
    reviews: [
      { source: "커뮤니티", text: "애니보다 원작이 더 여운이 깊다", heat: 91 },
      { source: "유튜브", text: "만화계 올해의 작품 후보 1순위", heat: 85 },
    ],
  },
  {
    id: 10, type: "드라마", title: "오징어게임 시즌2", year: 2024,
    genre: ["스릴러", "서바이벌"], score: 8.2, community_score: 8.6, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1614813404944-4b5e14e4e7a9?w=400&q=80",
    tags: ["한국", "글로벌", "시즌2"], youtube_count: 1893, community_heat: 97,
    summary: "전 세계를 강타한 생존 게임의 귀환. 기훈이 다시 게임에 뛰어든다.",
    cross_media: { id: 11, type: "게임", title: "오징어게임: 더 챌린지 게임" },
    reviews: [
      { source: "넷플릭스", text: "시즌1의 충격을 재현한 완성도", heat: 88 },
      { source: "레딧", text: "마지막 화 반전이 시즌3 기대감 폭발", heat: 94 },
    ],
  },
  {
    id: 11, type: "게임", title: "오징어게임: 더 챌린지", year: 2024,
    genre: ["파티게임", "서바이벌"], score: 7.8, community_score: 8.3, platform: "PC/모바일",
    thumb: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    tags: ["IP게임", "넷플릭스", "멀티플레이"], youtube_count: 567, community_heat: 82,
    summary: "드라마의 6가지 게임을 직접 플레이. 456인 온라인 배틀.",
    cross_media: { id: 10, type: "드라마", title: "오징어게임 시즌2" },
    reviews: [
      { source: "스팀", text: "원작 감성 재현 성공, 멀티가 살림", heat: 80 },
      { source: "유튜브", text: "드라마 팬이라면 한 번쯤은 해볼 만", heat: 76 },
    ],
  },
  {
    id: 12, type: "애니", title: "진격의 거인: 파이널", year: 2023,
    genre: ["액션", "다크판타지"], score: 9.1, community_score: 9.4, platform: "왓챠",
    thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    tags: ["완결", "10년의서사", "전설"], youtube_count: 2341, community_heat: 98,
    summary: "10년을 달려온 거대한 서사의 마침표. 애니 역사에 길이 남을 피날레.",
    cross_media: { id: 13, type: "웹툰", title: "진격의 거인 원작 만화" },
    reviews: [
      { source: "유튜브", text: "애니 역사에서 손꼽힐 마지막화", heat: 96 },
      { source: "커뮤니티", text: "완결 후 허탈감이 밀려오는 명작", heat: 93 },
    ],
  },
  {
    id: 13, type: "웹툰", title: "진격의 거인 원작 만화", year: 2009,
    genre: ["액션", "다크판타지"], score: 9.3, community_score: 9.2, platform: "별책 소년 매거진",
    thumb: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&q=80",
    tags: ["일본만화", "완결", "레전드"], youtube_count: 876, community_heat: 90,
    summary: "인류를 위협하는 거인과 싸우는 병사들의 이야기. 만화계 불후의 명작.",
    cross_media: { id: 12, type: "애니", title: "진격의 거인: 파이널" },
    reviews: [
      { source: "커뮤니티", text: "결말 호불호 있지만 전개는 역대급", heat: 89 },
      { source: "레딧", text: "애니보다 원작 읽는 것을 추천", heat: 85 },
    ],
  },
  {
    id: 14, type: "영화", title: "스즈메의 문단속", year: 2022,
    genre: ["판타지", "감동"], score: 8.8, community_score: 9.0, platform: "왓챠",
    thumb: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&q=80",
    tags: ["신카이마코토", "일본", "감성"], youtube_count: 654, community_heat: 92,
    summary: "문을 닫는 소녀 스즈메의 여정. 신카이 마코토의 감성 로드무비.",
    cross_media: { id: 15, type: "웹툰", title: "스즈메의 문단속 소설판" },
    reviews: [
      { source: "유튜브", text: "OST만으로도 인생 영화 등극", heat: 91 },
      { source: "커뮤니티", text: "너의 이름은 이후 최고작", heat: 88 },
    ],
  },
  {
    id: 15, type: "웹툰", title: "스즈메의 문단속 소설판", year: 2022,
    genre: ["판타지", "감동"], score: 8.5, community_score: 8.7, platform: "카카오페이지",
    thumb: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    tags: ["소설판", "신카이마코토", "영화원작"], youtube_count: 234, community_heat: 79,
    summary: "영화의 배경과 캐릭터를 더 깊이 탐구한 소설 버전. 영화 팬 필독서.",
    cross_media: { id: 14, type: "영화", title: "스즈메의 문단속" },
    reviews: [
      { source: "커뮤니티", text: "영화에서 설명 안 된 부분이 채워진다", heat: 83 },
      { source: "유튜브", text: "소설이 영화보다 더 감동적이라는 평도", heat: 79 },
    ],
  },

  /* ───── 신규 추가 ───── */

  /* 신작 2024-2025 */
  {
    id: 16, type: "드라마", title: "폭싹 속았수다", year: 2025,
    genre: ["로맨스", "가족", "감동"], score: 9.1, community_score: 9.3, platform: "Apple TV+",
    thumb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    tags: ["2025신작", "애플TV", "IU주연"], youtube_count: 823, community_heat: 96,
    summary: "제주 출신 소년과 서울 소녀의 운명적 만남. IU와 박보검 주연의 시대극 로맨스.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "IU의 인생 드라마 탄생, 매화 오열 각", heat: 95 },
      { source: "커뮤니티", text: "애플TV 한국 드라마 역대 최고작", heat: 93 },
    ],
  },
  {
    id: 17, type: "드라마", title: "지옥 시즌2", year: 2024,
    genre: ["공포", "스릴러", "SF"], score: 8.3, community_score: 8.5, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80",
    tags: ["2024신작", "공포", "연상호"], youtube_count: 654, community_heat: 87,
    summary: "지옥 사자들이 다시 나타났다. 혼돈 속 새로운 신흥 종교의 탄생.",
    cross_media: null,
    reviews: [
      { source: "넷플릭스", text: "시즌1보다 더 복잡해진 세계관", heat: 83 },
      { source: "커뮤니티", text: "반전 엔딩 예측 불가, 시즌3 확정각", heat: 88 },
    ],
  },
  {
    id: 18, type: "애니", title: "귀멸의 칼날: 무한성 편", year: 2024,
    genre: ["액션", "판타지", "감동"], score: 9.0, community_score: 9.2, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    tags: ["2024신작", "귀멸", "작화신"], youtube_count: 1432, community_heat: 96,
    summary: "무한 성을 배경으로 펼쳐지는 상위 귀신들과의 격전. ufotable 작화 한계 돌파.",
    cross_media: { id: 34, type: "웹툰", title: "귀멸의 칼날 원작 만화" },
    reviews: [
      { source: "유튜브", text: "작화가 진짜 만화보다 예쁜 애니", heat: 96 },
      { source: "커뮤니티", text: "무이치로 vs 상현 6위 역대급 명장면", heat: 93 },
    ],
  },
  {
    id: 19, type: "영화", title: "범죄도시4", year: 2024,
    genre: ["액션", "범죄"], score: 8.1, community_score: 8.8, platform: "웨이브",
    thumb: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    tags: ["2024신작", "마동석", "천만영화"], youtube_count: 1203, community_heat: 94,
    summary: "마석도가 돌아왔다. 더 강해진 빌런과 더 강해진 주먹. 천만 관객 돌파.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "마석도 주먹 퀄리티는 시리즈 최고", heat: 91 },
      { source: "커뮤니티", text: "빌런 캐스팅이 역대급", heat: 88 },
    ],
  },
  {
    id: 20, type: "드라마", title: "선재 업고 튀어", year: 2024,
    genre: ["판타지", "로맨스", "타임슬립"], score: 9.0, community_score: 9.3, platform: "티빙",
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    tags: ["2024신작", "타임슬립", "변우석"], youtube_count: 892, community_heat: 95,
    summary: "좋아하는 스타를 구하기 위해 과거로 돌아간 소녀의 이야기. 2024 로맨스 드라마 1위.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "변우석 남주인공 역대급 완성도", heat: 94 },
      { source: "커뮤니티", text: "매화 소름 돋는 타임슬립 연출", heat: 92 },
    ],
  },

  /* 액션 */
  {
    id: 21, type: "드라마", title: "무빙", year: 2023,
    genre: ["액션", "SF", "감동"], score: 9.0, community_score: 9.3, platform: "디즈니+",
    thumb: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
    tags: ["한국", "초능력", "가족"], youtube_count: 987, community_heat: 95,
    summary: "숨겨진 능력을 가진 아이들과 그 부모들의 이야기. 강풀 원작의 한국형 슈퍼히어로물.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "한국 드라마 새 역사, 매화 영화급 퀄리티", heat: 96 },
      { source: "디시", text: "7화까지 보면 인생 드라마 된다", heat: 94 },
    ],
  },
  {
    id: 22, type: "드라마", title: "비질란테", year: 2023,
    genre: ["액션", "스릴러", "범죄"], score: 8.5, community_score: 8.8, platform: "디즈니+",
    thumb: "https://images.unsplash.com/photo-1504191342926-89ab0f1ab79b?w=400&q=80",
    tags: ["히어로물", "다크", "남주혁"], youtube_count: 654, community_heat: 87,
    summary: "법으로 처벌받지 못하는 범죄자들을 심판하는 자경단 이야기. 어두운 히어로물.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "남주혁 다크한 연기 충격이었음", heat: 88 },
      { source: "커뮤니티", text: "국내 최고 수위의 히어로 드라마", heat: 85 },
    ],
  },

  /* SF */
  {
    id: 23, type: "영화", title: "인터스텔라", year: 2014,
    genre: ["SF", "감동", "서사"], score: 9.5, community_score: 9.3, platform: "왓챠",
    thumb: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    tags: ["놀란", "SF명작", "10주년"], youtube_count: 2876, community_heat: 96,
    summary: "인류를 구하기 위해 블랙홀로 향한 아버지의 이야기. SF 영화의 교과서.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "10년이 지나도 여전히 최고의 SF", heat: 97 },
      { source: "커뮤니티", text: "IMAX 재개봉 때마다 봄", heat: 95 },
    ],
  },
  {
    id: 24, type: "드라마", title: "고요의 바다", year: 2021,
    genre: ["SF", "스릴러", "공포"], score: 7.8, community_score: 8.0, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=400&q=80",
    tags: ["한국SF", "달탐사", "공유"], youtube_count: 456, community_heat: 78,
    summary: "폐쇄된 달 연구기지에 숨겨진 비밀을 파헤치는 미래 한국 SF 스릴러.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "한국 SF 드라마의 새 지평", heat: 80 },
      { source: "커뮤니티", text: "후반부 반전이 압도적", heat: 82 },
    ],
  },

  /* 공포·스릴러 */
  {
    id: 25, type: "드라마", title: "더 글로리", year: 2023,
    genre: ["스릴러", "복수", "드라마"], score: 9.0, community_score: 9.2, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
    tags: ["복수극", "송혜교", "글로벌1위"], youtube_count: 2134, community_heat: 97,
    summary: "끔찍한 학교폭력 피해자의 치밀한 복수극. 넷플릭스 글로벌 1위 드라마.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "송혜교 눈빛 연기만으로도 소름", heat: 96 },
      { source: "레딧", text: "가해자들 처벌 장면에서 쾌감 폭발", heat: 95 },
    ],
  },
  {
    id: 26, type: "드라마", title: "경성크리처", year: 2023,
    genre: ["공포", "역사", "스릴러"], score: 8.0, community_score: 8.3, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80",
    tags: ["공포", "일제강점기", "박서준"], youtube_count: 543, community_heat: 82,
    summary: "1945년 경성을 배경으로 한 공포 생존 드라마. 역사와 크리처물의 결합.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "일제강점기 크리처물이라는 신선한 조합", heat: 80 },
      { source: "커뮤니티", text: "2부에서 반전 터짐", heat: 85 },
    ],
  },
  {
    id: 27, type: "드라마", title: "마스크걸", year: 2023,
    genre: ["스릴러", "범죄", "드라마"], score: 8.7, community_score: 8.9, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80",
    tags: ["넷플릭스", "반전", "3인3색"], youtube_count: 876, community_heat: 90,
    summary: "마스크로 얼굴을 가리고 BJ 활동을 하는 여성의 이야기. 충격적인 반전의 연속.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "3명의 배우가 한 인물을 연기하는 신개념", heat: 91 },
      { source: "레딧", text: "한국 드라마에서 이런 걸 볼 줄 몰랐다", heat: 89 },
    ],
  },

  /* 로맨스·힐링 */
  {
    id: 28, type: "드라마", title: "이상한 변호사 우영우", year: 2022,
    genre: ["힐링", "로맨스", "드라마"], score: 8.8, community_score: 9.1, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1516146544193-b54a65682f16?w=400&q=80",
    tags: ["힐링", "공감", "박은빈"], youtube_count: 765, community_heat: 92,
    summary: "자폐 스펙트럼을 가진 천재 변호사 우영우의 성장 이야기. 전 세계 시청자 공감 폭발.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "박은빈 연기 보려고 넷플릭스 구독함", heat: 93 },
      { source: "커뮤니티", text: "고래 나올 때마다 힐링됨", heat: 89 },
    ],
  },
  {
    id: 29, type: "드라마", title: "도깨비", year: 2016,
    genre: ["판타지", "로맨스", "감동"], score: 9.2, community_score: 9.4, platform: "웨이브",
    thumb: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=80",
    tags: ["레전드", "공유", "클래식OST"], youtube_count: 1123, community_heat: 94,
    summary: "불멸의 삶을 끝내줄 신부를 기다리는 도깨비와 저승사자의 이야기. 한국 드라마 전설.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "2016년 이후 이 드라마를 넘는 작품이 없다", heat: 95 },
      { source: "커뮤니티", text: "OST 아직도 자주 듣는 레전드", heat: 92 },
    ],
  },

  /* 애니 */
  {
    id: 30, type: "애니", title: "하이큐!! 더 더스터", year: 2024,
    genre: ["스포츠", "감동", "청춘"], score: 9.3, community_score: 9.5, platform: "넷플릭스",
    thumb: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80",
    tags: ["2024신작", "완결", "배구"], youtube_count: 1654, community_heat: 97,
    summary: "까라스노 배구부의 마지막 여정. 10년 팬들의 눈물 보장.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "애니 완결 중 역대 최고 감동", heat: 97 },
      { source: "커뮤니티", text: "마지막 장면에서 눈물 참을 수 없음", heat: 95 },
    ],
  },
  {
    id: 31, type: "애니", title: "블루 록", year: 2022,
    genre: ["스포츠", "액션", "청춘"], score: 8.7, community_score: 9.0, platform: "라프텔",
    thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    tags: ["축구", "배틀로얄", "에고이스트"], youtube_count: 987, community_heat: 91,
    summary: "최강의 스트라이커를 탄생시키기 위한 역대급 축구 배틀로얄. 스포츠물의 새 지평.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "축구를 몰라도 재밌는 이세계물 감성", heat: 90 },
      { source: "커뮤니티", text: "이사기 요이치 캐릭터 완전 미쳤음", heat: 88 },
    ],
  },

  /* 웹툰 */
  {
    id: 32, type: "웹툰", title: "유미의 세포들", year: 2015,
    genre: ["로맨스", "일상", "힐링"], score: 9.2, community_score: 9.4, platform: "네이버웹툰",
    thumb: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80",
    tags: ["완결", "드라마화", "공감"], youtube_count: 456, community_heat: 88,
    summary: "평범한 직장인 유미의 연애와 일상을 뇌 세포들의 시각으로 담아낸 힐링 웹툰.",
    cross_media: null,
    reviews: [
      { source: "커뮤니티", text: "공감 100%짜리 연애 감성 웹툰", heat: 91 },
      { source: "유튜브", text: "드라마보다 원작이 훨씬 깊다", heat: 87 },
    ],
  },
  {
    id: 33, type: "웹툰", title: "나노마신", year: 2020,
    genre: ["액션", "무협", "판타지"], score: 8.9, community_score: 9.0, platform: "카카오페이지",
    thumb: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    tags: ["무협", "나노기술", "연재중"], youtube_count: 543, community_heat: 86,
    summary: "미래에서 온 나노머신이 체내에 주입된 무당 소년의 성장기. 무협+SF의 신개념 웹툰.",
    cross_media: null,
    reviews: [
      { source: "커뮤니티", text: "무협 웹툰 르네상스를 이끈 작품", heat: 88 },
      { source: "유튜브", text: "매화 빌드업이 폭발적", heat: 84 },
    ],
  },

  /* 크로스미디어 — 귀멸 원작 만화 */
  {
    id: 34, type: "웹툰", title: "귀멸의 칼날 원작 만화", year: 2016,
    genre: ["액션", "판타지", "감동"], score: 9.2, community_score: 9.3, platform: "점프플러스",
    thumb: "https://images.unsplash.com/photo-1619400349027-74bb7e5ee3e4?w=400&q=80",
    tags: ["일본만화", "완결", "7700만부"], youtube_count: 1234, community_heat: 92,
    summary: "가족을 잃고 귀살대가 된 소년 탄지로의 이야기. 전 세계 7700만 부 판매.",
    cross_media: { id: 18, type: "애니", title: "귀멸의 칼날: 무한성 편" },
    reviews: [
      { source: "커뮤니티", text: "작화는 애니지만 감동은 원작이 깊다", heat: 92 },
      { source: "유튜브", text: "탄지로의 성장 서사는 만화 역사에 남을 것", heat: 89 },
    ],
  },

  /* 왓챠 힐링 */
  {
    id: 35, type: "드라마", title: "더 베어", year: 2022,
    genre: ["힐링", "드라마", "감동"], score: 9.1, community_score: 8.9, platform: "왓챠",
    thumb: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    tags: ["미국드라마", "요리", "에미상"], youtube_count: 456, community_heat: 84,
    summary: "시카고 샌드위치 가게를 물려받은 파인 다이닝 셰프의 이야기. 에미상 수상작.",
    cross_media: null,
    reviews: [
      { source: "유튜브", text: "요리와 드라마가 이렇게 결합될 수 있구나", heat: 87 },
      { source: "커뮤니티", text: "6화 원테이크 씬이 역대급", heat: 91 },
    ],
  },
];
