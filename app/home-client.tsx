"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CrossMediaShowcase from "../components/CrossMediaShowcase";
import { GENRE_FILTERS, PLATFORM_FILTERS, SORT_OPTIONS } from "../lib/constants";
import type { ContentItem, ContentType, SortKey, TrendingItem } from "../lib/types";

type HomeClientProps = {
  contents: ContentItem[];
  trending: TrendingItem[];
};

function getSortValue(item: ContentItem, sortKey: SortKey): number {
  switch (sortKey) {
    case "community_heat":
      return item.community_heat;
    case "community_score":
      return item.community_score;
    case "score":
      return item.score;
    case "youtube_count":
      return item.youtube_count;
  }
}

export default function HomeClient({ contents, trending }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<"전체" | ContentType>("전체");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<(typeof GENRE_FILTERS)[number]>("전체 장르");
  const [selectedPlatform, setSelectedPlatform] = useState<(typeof PLATFORM_FILTERS)[number]>("전체 플랫폼");
  const [sortBy, setSortBy] = useState<SortKey>("community_heat");

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim();
    return [...contents]
      .filter((item) => activeTab === "전체" || item.type === activeTab)
      .filter((item) => selectedGenre === "전체 장르" || item.genre.includes(selectedGenre))
      .filter((item) => selectedPlatform === "전체 플랫폼" || item.platform.includes(selectedPlatform))
      .filter((item) => {
        if (!normalizedSearch) return true;
        return item.title.includes(normalizedSearch) || item.genre.some((g) => g.includes(normalizedSearch));
      })
      .sort((a, b) => getSortValue(b, sortBy) - getSortValue(a, sortBy));
  }, [contents, activeTab, search, selectedGenre, selectedPlatform, sortBy]);

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
      <Header activeTab={activeTab} onTabChange={setActiveTab} search={search} onSearchChange={setSearch} />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 24 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <CrossMediaShowcase items={contents} />
          </div>

          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value as (typeof GENRE_FILTERS)[number])}
                style={selectStyle}
              >
                {GENRE_FILTERS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>

              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as (typeof PLATFORM_FILTERS)[number])}
                style={selectStyle}
              >
                {PLATFORM_FILTERS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)} style={selectStyle}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: "auto" }}>{filtered.length}개 결과</span>
            </div>

            {filtered.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {filtered.map((item, i) => (
                  <div key={item.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 60, color: "#cbd5e1", fontSize: 14 }}>
                검색 결과가 없습니다
              </div>
            )}
          </div>

          <Sidebar trending={trending} contents={contents} />
        </div>
      </main>
    </>
  );
}
