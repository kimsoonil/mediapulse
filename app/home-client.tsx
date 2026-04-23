"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CrossMediaShowcase from "../components/CrossMediaShowcase";
import SectionRow from "../components/SectionRow";
import { GENRE_FILTERS, PLATFORM_FILTERS, SORT_OPTIONS } from "../lib/constants";
import type { ContentItem, ContentType, SortKey, TrendingItem } from "../lib/types";

type HomeClientProps = {
  contents: ContentItem[];
  trending: TrendingItem[];
};

function getSortValue(item: ContentItem, sortKey: SortKey): number {
  switch (sortKey) {
    case "community_heat":  return item.community_heat;
    case "community_score": return item.community_score;
    case "score":           return item.score;
    case "youtube_count":   return item.youtube_count;
  }
}

export default function HomeClient({ contents, trending }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<"전체" | ContentType>("전체");
  const [search, setSearch]       = useState("");
  const [selectedGenre, setSelectedGenre]       = useState<(typeof GENRE_FILTERS)[number]>("전체 장르");
  const [selectedPlatform, setSelectedPlatform] = useState<(typeof PLATFORM_FILTERS)[number]>("전체 플랫폼");
  const [sortBy, setSortBy] = useState<SortKey>("community_heat");

  /* 필터 상태 여부 */
  const isFiltered =
    activeTab !== "전체" ||
    search.trim() !== "" ||
    selectedGenre !== "전체 장르" ||
    selectedPlatform !== "전체 플랫폼";

  /* 필터된 결과 */
  const filtered = useMemo(() => {
    const q = search.trim();
    return [...contents]
      .filter((x) => activeTab === "전체" || x.type === activeTab)
      .filter((x) => selectedGenre === "전체 장르" || x.genre.includes(selectedGenre))
      .filter((x) => selectedPlatform === "전체 플랫폼" || x.platform.includes(selectedPlatform))
      .filter((x) => !q || x.title.includes(q) || x.genre.some((g) => g.includes(q)))
      .sort((a, b) => getSortValue(b, sortBy) - getSortValue(a, sortBy));
  }, [contents, activeTab, search, selectedGenre, selectedPlatform, sortBy]);

  /* 섹션 데이터 */
  const sections = useMemo(() => {
    const byHeat  = (a: ContentItem, b: ContentItem) => b.community_heat  - a.community_heat;
    const byScore = (a: ContentItem, b: ContentItem) => b.community_score - a.community_score;

    return [
      {
        id: "new",
        emoji: "🆕",
        title: "신작",
        badge: "NEW",
        badgeColor: "#16a34a",
        subtitle: "2024–2025",
        items: [...contents].filter((x) => x.year >= 2024).sort(byHeat),
        onMore: () => { setActiveTab("전체"); setSortBy("community_heat"); },
      },
      {
        id: "hot",
        emoji: "🔥",
        title: "커뮤니티 HOT",
        badge: "HOT",
        badgeColor: "#ef4444",
        subtitle: "지금 가장 뜨거운",
        items: [...contents].filter((x) => x.community_heat >= 90).sort(byHeat),
        onMore: () => { setActiveTab("전체"); setSortBy("community_heat"); },
      },
      {
        id: "action",
        emoji: "⚡",
        title: "액션 추천",
        subtitle: "손에 땀을 쥐는 전투",
        items: [...contents]
          .filter((x) => x.genre.some((g) => ["액션", "액션RPG", "헌터물", "무협"].includes(g)))
          .sort(byScore),
        onMore: () => { setActiveTab("전체"); setSelectedGenre("액션"); },
      },
      {
        id: "sf",
        emoji: "🚀",
        title: "SF · 판타지",
        subtitle: "상상을 초월하는 세계",
        items: [...contents]
          .filter((x) => x.genre.some((g) => ["SF", "판타지", "모험", "타임슬립"].includes(g)))
          .sort(byScore),
        onMore: () => { setActiveTab("전체"); setSelectedGenre("SF"); },
      },
      {
        id: "horror",
        emoji: "👻",
        title: "공포 · 스릴러",
        subtitle: "심장이 멈추는 순간",
        items: [...contents]
          .filter((x) =>
            x.genre.some((g) => ["공포", "스릴러", "서바이벌", "미스터리", "복수", "범죄"].includes(g))
          )
          .sort(byScore),
        onMore: () => { setActiveTab("전체"); setSelectedGenre("공포"); },
      },
      {
        id: "romance",
        emoji: "💕",
        title: "로맨스 · 힐링",
        subtitle: "마음이 따뜻해지는 이야기",
        items: [...contents]
          .filter((x) =>
            x.genre.some((g) => ["로맨스", "멜로", "힐링", "일상", "가족", "감동"].includes(g))
          )
          .sort(byScore),
        onMore: () => { setActiveTab("전체"); setSelectedGenre("로맨스"); },
      },
      {
        id: "netflix",
        emoji: "📺",
        title: "Netflix 추천",
        badge: "N",
        badgeColor: "#e50914",
        items: [...contents].filter((x) => x.platform.includes("넷플릭스")).sort(byHeat),
        onMore: () => { setActiveTab("전체"); setSelectedPlatform("넷플릭스"); },
      },
      {
        id: "disney",
        emoji: "✨",
        title: "디즈니+ 추천",
        badge: "D+",
        badgeColor: "#0063e5",
        items: [...contents].filter((x) => x.platform.includes("디즈니+")).sort(byHeat),
        onMore: () => { setActiveTab("전체"); setSelectedPlatform("디즈니+"); },
      },
      {
        id: "watcha",
        emoji: "🎬",
        title: "왓챠 추천",
        items: [...contents].filter((x) => x.platform.includes("왓챠")).sort(byScore),
        onMore: () => { setActiveTab("전체"); setSelectedPlatform("왓챠"); },
      },
      {
        id: "anime",
        emoji: "🎌",
        title: "지금 뜨는 애니",
        subtitle: "2D 세계의 걸작들",
        items: [...contents].filter((x) => x.type === "애니").sort(byHeat),
        onMore: () => setActiveTab("애니"),
      },
      {
        id: "webtoon",
        emoji: "📖",
        title: "인기 웹툰",
        subtitle: "다음 편이 기다려지는",
        items: [...contents].filter((x) => x.type === "웹툰").sort(byScore),
        onMore: () => setActiveTab("웹툰"),
      },
      {
        id: "sport",
        emoji: "🏆",
        title: "스포츠 · 청춘",
        subtitle: "땀과 열정의 이야기",
        items: [...contents]
          .filter((x) => x.genre.some((g) => ["스포츠", "청춘"].includes(g)))
          .sort(byScore),
      },
    ].filter((s) => s.items.length > 0);
  }, [contents]);

  const selectStyle: CSSProperties = {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: "7px 12px",
    color: "#475569",
    fontSize: 12,
    cursor: "pointer",
    outline: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };

  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedGenre("전체 장르");
          setSelectedPlatform("전체 플랫폼");
          setSearch("");
        }}
        search={search}
        onSearchChange={setSearch}
      />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 28 }}>

          {/* ── CrossMedia: 항상 풀 스팬 ── */}
          <div style={{ gridColumn: "1 / -1" }}>
            <CrossMediaShowcase items={contents} />
          </div>

          {/* ── 메인 컬럼 ── */}
          <div style={{ minWidth: 0 }}>

            {isFiltered ? (
              /* ── 필터 적용 시: 그리드 뷰 ── */
              <>
                {/* 필터 바 */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 20,
                    flexWrap: "wrap",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveTab("전체");
                      setSelectedGenre("전체 장르");
                      setSelectedPlatform("전체 플랫폼");
                      setSearch("");
                      setSortBy("community_heat");
                    }}
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #16a34a",
                      borderRadius: 8,
                      padding: "7px 14px",
                      fontSize: 12,
                      color: "#16a34a",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    ← 홈으로
                  </button>

                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value as typeof selectedGenre)}
                    style={selectStyle}
                  >
                    {GENRE_FILTERS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>

                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value as typeof selectedPlatform)}
                    style={selectStyle}
                  >
                    {PLATFORM_FILTERS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    style={selectStyle}
                  >
                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>

                  <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: "auto" }}>
                    {filtered.length}개 결과
                  </span>
                </div>

                {filtered.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {filtered.map((item, i) => (
                      <div key={item.id} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                        <Card item={item} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 0",
                      color: "#94a3b8",
                      fontSize: 14,
                      background: "#ffffff",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    검색 결과가 없습니다
                  </div>
                )}
              </>
            ) : (
              /* ── 홈 뷰: 섹션 로우 ── */
              <div>
                {sections.map((s) => (
                  <SectionRow
                    key={s.id}
                    title={s.title}
                    subtitle={s.subtitle}
                    emoji={s.emoji}
                    badge={s.badge}
                    badgeColor={s.badgeColor}
                    items={s.items}
                    onMore={s.onMore}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── 사이드바 ── */}
          <Sidebar trending={trending} contents={contents} />
        </div>
      </main>
    </>
  );
}
