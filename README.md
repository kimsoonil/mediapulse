# MEDIAPULSE

영화·드라마·애니·게임·웹툰 커뮤니티 반응 통합 큐레이션 사이트

## 프로젝트 구조

```
mediapulse/
├── app/
│   ├── layout.tsx        # 루트 레이아웃(메타데이터/글로벌 CSS)
│   ├── page.tsx          # 메인 페이지(Server Component + ISR)
│   └── home-client.tsx   # 메인 UI(Client Component: 필터·그리드·모달)
├── components/
│   ├── Header.tsx        # 탭 내비게이션 + 검색
│   ├── Card.tsx          # 콘텐츠 카드
│   ├── Modal.tsx         # 상세 모달
│   ├── Sidebar.tsx       # 트렌딩·연결작·통계
│   ├── HeatBar.tsx       # 커뮤니티 열기 바
│   └── ScoreBadge.tsx    # 평점 배지
├── lib/
│   ├── supabase.ts       # Supabase 클라이언트 + 쿼리 함수
│   ├── constants.ts      # 탭·색상·필터·목 데이터
│   └── types.ts          # 공용 타입
├── styles/
│   └── globals.css       # 전역 스타일·애니메이션 (+ Tailwind)
└── next.config.js
```

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일에 Supabase URL과 ANON KEY 입력

# 3. 개발 서버 실행
npm run dev
```

## Supabase 연동

### 1. 테이블 생성 SQL

```sql
-- 콘텐츠 테이블
create table contents (
  id              bigint primary key generated always as identity,
  type            text not null,           -- 영화|드라마|애니|게임|웹툰
  title           text not null,
  year            int,
  genre           text[],
  score           float,
  community_score float,
  platform        text,
  thumb           text,
  tags            text[],
  youtube_count   int default 0,
  community_heat  int default 0,
  summary         text,
  cross_media_id  bigint references contents(id),
  created_at      timestamptz default now()
);

-- 리뷰 테이블
create table reviews (
  id          bigint primary key generated always as identity,
  content_id  bigint references contents(id) on delete cascade,
  source      text,   -- 유튜브|디시|루리웹 등
  text        text,
  heat        int,
  created_at  timestamptz default now()
);
```

### 2. app/page.tsx 에서 주석 해제

`getStaticProps` 함수 안의 Supabase 코드 주석을 해제하면  
Mock 데이터 대신 실제 DB 데이터를 사용합니다.

## Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

Vercel 대시보드에서 환경변수 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) 를 추가해주세요.

## 파이썬 크롤러 연동

`crawler/` 폴더에 파이썬 크롤러를 추가하고,  
GitHub Actions cron으로 6시간마다 실행하면 Supabase에 자동으로 데이터가 채워집니다.

```yaml
# .github/workflows/crawl.yml
on:
  schedule:
    - cron: "0 */6 * * *"
jobs:
  crawl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r crawler/requirements.txt
      - run: python crawler/main.py
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
```
