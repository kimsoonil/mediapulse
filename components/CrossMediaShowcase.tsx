"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { TYPE_COLOR } from "../lib/constants";
import type { ContentItem, ContentType } from "../lib/types";

function getOneLiner(item: ContentItem): string | null {
  if (!item.reviews?.length) return null;
  const top = [...item.reviews].sort((a, b) => b.heat - a.heat)[0];
  return top?.text ?? null;
}

function formatScore(score: number): string {
  return Number.isFinite(score) ? score.toFixed(1) : "—";
}

/* 매체 칩 — 왼쪽 컬러 바 + Link */
function MediaChip({
  type,
  score,
  isActive,
  href,
}: {
  type: ContentType;
  score: number | null;
  isActive?: boolean;
  href: string;
}) {
  const color = TYPE_COLOR[type];

  return (
    <Link
      href={href}
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 14px",
        borderRadius: 10,
        border: `1px solid ${isActive ? color : "rgba(42,42,69,0.8)"}`,
        borderLeft: `3px solid ${color}`,
        background: isActive ? `${color}18` : "#1e1e35",
        textDecoration: "none",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: 0.5 }}>{type}</span>
      {/* Fix 1: score 없어도 "—" 표시 */}
      <span
        style={{
          fontSize: score !== null ? 16 : 13,
          fontWeight: score !== null ? 900 : 400,
          color: score !== null ? "#f0f0f5" : "#606078",
          fontFamily: "'Bebas Neue', monospace",
          letterSpacing: 0.5,
        }}
      >
        {score !== null ? formatScore(score) : "—"}
      </span>
    </Link>
  );
}

/* 매체별 평점 미니 비교 차트 — Fix 1: target 없어도 항상 2줄 */
function MiniScoreChart({
  sourceType,
  sourceScore,
  targetType,
  targetScore,
}: {
  sourceType: ContentType;
  sourceScore: number;
  targetType: ContentType;
  targetScore: number | null;
}) {
  const rows = [
    { type: sourceType, score: sourceScore, hasScore: true },
    { type: targetType, score: targetScore ?? 0, hasScore: targetScore !== null },
  ].sort((a, b) => b.score - a.score);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingTop: 8 }}>
      {rows.map((row) => (
        <div key={row.type} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 38, fontSize: 10, fontWeight: 700, color: "#9090a8", flexShrink: 0, textAlign: "right" }}>
            {row.type}
          </span>
          <div style={{ flex: 1, height: 7, borderRadius: 4, background: "#2a2a45", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: row.hasScore ? `${(row.score / 10) * 100}%` : "0%",
                borderRadius: 4,
                background: TYPE_COLOR[row.type],
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <span
            style={{
              width: 28,
              fontSize: row.hasScore ? 12 : 11,
              fontWeight: row.hasScore ? 800 : 400,
              color: row.hasScore ? "#f0f0f5" : "#606078",
              fontFamily: "'Bebas Neue', monospace",
              textAlign: "right",
            }}
          >
            {row.hasScore ? row.score.toFixed(1) : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

type CrossMediaShowcaseProps = {
  items: ContentItem[];
  maxItems?: number;
};

export default function CrossMediaShowcase({ items, maxItems = 8 }: CrossMediaShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const linked = items.filter((d) => d.cross_media).slice(0, maxItems);

  if (linked.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <section
      style={{
        background: "#16162a",
        border: "1px solid #2a2a45",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "#606078", textTransform: "uppercase", letterSpacing: 2 }}>
            Cross-media pick
          </div>
          <h2 style={{ margin: "6px 0 0", fontSize: 16, color: "#f0f0f5", fontWeight: 900 }}>
            매체 연결 작품으로 갈아타기
          </h2>
          <div style={{ marginTop: 6, fontSize: 12, color: "#606078", lineHeight: 1.5 }}>
            한 매체가 아쉬웠다면,{" "}
            <span style={{ color: "#f0f0f5", fontWeight: 800 }}>연결된 다른 매체</span>에서 더 좋은 반응을 찾을 수
            있어요.
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#2a2a45", fontFamily: "monospace" }}>{linked.length}개</div>
      </div>

      {/* 스크롤 컨테이너 + 화살표 */}
      <div style={{ position: "relative", marginTop: 14 }}>
        <button
          onClick={() => scroll("left")}
          aria-label="이전"
          style={{
            position: "absolute",
            left: -12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid #2a2a45",
            background: "#16162a",
            color: "#9090a8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            transition: "all 0.2s",
          }}
        >
          ‹
        </button>

        <button
          onClick={() => scroll("right")}
          aria-label="다음"
          style={{
            position: "absolute",
            right: -12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid #2a2a45",
            background: "#16162a",
            color: "#9090a8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            transition: "all 0.2s",
          }}
        >
          ›
        </button>

        <div
          ref={scrollRef}
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(320px, 1fr)",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 8,
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {linked.map((source) => {
            const target = items.find((x) => x.id === source.cross_media?.id) ?? null;
            const targetType = (source.cross_media?.type as ContentType) ?? source.type;
            const title = target?.title ?? source.cross_media?.title ?? "연결 작품";
            const thumb = target?.thumb ?? source.thumb;
            const year = target?.year;
            const platform = target?.platform;

            const hasBetterCommunity =
              target?.community_score != null &&
              Number.isFinite(target.community_score) &&
              target.community_score - source.community_score >= 0.5;

            const oneLiner = target ? getOneLiner(target) : getOneLiner(source);
            const targetId = target?.id ?? source.cross_media!.id;

            return (
              <div
                key={`${source.id}-${source.cross_media?.id ?? "x"}`}
                style={{
                  borderRadius: 12,
                  border: "1px solid #2a2a45",
                  background: "#1e1e35",
                  overflow: "hidden",
                  minWidth: 320,
                  scrollSnapAlign: "start",
                }}
              >
                {/* 카드 헤더 */}
                <Link
                  href={`/contents/${source.id}`}
                  style={{ display: "block", padding: "12px 12px 8px", textDecoration: "none" }}
                >
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#f0f0f5", lineHeight: 1.2 }}>
                    {source.title}
                  </h3>
                  <span style={{ fontSize: 11, color: "#606078" }}>
                    {source.year} · {source.platform}
                  </span>
                </Link>

                {/* 매체 흐름 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 12px 12px",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  <MediaChip type={source.type} score={source.community_score} isActive href={`/contents/${source.id}`} />
                  <span style={{ fontSize: 16, color: "#2a2a45", flexShrink: 0 }}>→</span>
                  <MediaChip type={targetType} score={target?.community_score ?? null} href={`/contents/${targetId}`} />
                  {/* Fix 2: 점선 테두리 + 그라데이션으로 매체 칩과 명확히 구분 */}
                  {hasBetterCommunity && (
                    <span
                      style={{
                        marginLeft: 4,
                        fontSize: 9,
                        color: "#2ecc71",
                        border: "1.5px dashed #2ecc71aa",
                        background: "linear-gradient(135deg, #2ecc7120, #3498db15)",
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontWeight: 900,
                        letterSpacing: 0.8,
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      ✦ 반응↑ 추천
                    </span>
                  )}
                </div>

                {/* 미니 스코어 차트 */}
                <div style={{ padding: "0 12px 4px" }}>
                  <MiniScoreChart
                    sourceType={source.type}
                    sourceScore={source.community_score}
                    targetType={targetType}
                    targetScore={target?.community_score ?? null}
                  />
                </div>

                {/* 커뮤니티 한줄평 + 상세 링크 */}
                <div style={{ padding: "8px 12px 12px" }}>
                  <div style={{ fontSize: 11, color: "#606078", marginBottom: 4 }}>
                    {year ? year : "—"} · {platform ? platform : "—"}
                  </div>
                  {oneLiner && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "#9090a8",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontStyle: "italic",
                        marginBottom: 10,
                      }}
                    >
                      &ldquo;{oneLiner}&rdquo;
                    </div>
                  )}
                  <Link
                    href={`/contents/${source.id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      color: TYPE_COLOR[source.type],
                      textDecoration: "none",
                      fontWeight: 700,
                      background: `${TYPE_COLOR[source.type]}18`,
                      padding: "5px 12px",
                      borderRadius: 6,
                      border: `1px solid ${TYPE_COLOR[source.type]}33`,
                      transition: "all 0.15s",
                    }}
                  >
                    자세히 보기 ↗
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fix 4: scroll container 뒤에 배치해야 위에 렌더링됨 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 8,
            width: 80,
            background: "linear-gradient(to right, transparent, #16162a)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>
    </section>
  );
}
