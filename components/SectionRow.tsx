"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { TYPE_COLOR } from "../lib/constants";
import type { ContentItem } from "../lib/types";

/* ── 포스터 미니 카드 ── */
function MiniCard({ item }: { item: ContentItem }) {
  const typeColor = TYPE_COLOR[item.type];

  return (
    <Link
      href={`/contents/${item.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        flexShrink: 0,
        width: 148,
      }}
    >
      {/* 포스터 이미지 */}
      <div
        style={{
          position: "relative",
          width: 148,
          height: 212,
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${typeColor}33`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "none";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        }}
      >
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          sizes="148px"
          style={{ objectFit: "cover" }}
        />
        {/* 그라디언트 오버레이 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.72) 100%)",
          }}
        />

        {/* 상단: 매체 타입 배지 */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: typeColor,
            color: "#fff",
            fontSize: 9,
            fontWeight: 900,
            padding: "2px 7px",
            borderRadius: 3,
            letterSpacing: 0.8,
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          {item.type}
        </div>

        {/* HOT 배지 */}
        {item.community_heat > 90 && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(239,68,68,0.85)",
              color: "#fff",
              fontSize: 8,
              fontWeight: 700,
              padding: "2px 5px",
              borderRadius: 3,
            }}
          >
            🔥
          </div>
        )}

        {/* 하단: 점수 */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            display: "flex",
            alignItems: "center",
            gap: 3,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            borderRadius: 6,
            padding: "3px 8px",
          }}
        >
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.7)" }}>💬</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "'Bebas Neue', monospace",
              lineHeight: 1,
            }}
          >
            {item.community_score.toFixed(1)}
          </span>
        </div>
      </div>

      {/* 카드 하단 정보 */}
      <div style={{ padding: "8px 2px 4px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontFamily: "'Noto Sans KR', sans-serif",
          }}
        >
          {item.title}
        </h3>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>
          {item.year} · {item.platform}
        </span>
      </div>
    </Link>
  );
}

/* ── 섹션 로우 ── */
type SectionRowProps = {
  title: string;
  subtitle?: string;
  emoji?: string;
  badge?: string;
  badgeColor?: string;
  items: ContentItem[];
  onMore?: () => void;
};

export default function SectionRow({
  title,
  subtitle,
  emoji,
  badge,
  badgeColor = "#16a34a",
  items,
  onMore,
}: SectionRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 480 : -480, behavior: "smooth" });
  };

  return (
    <section style={{ marginBottom: 36 }}>
      {/* 섹션 헤더 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {emoji && <span style={{ fontSize: 18, lineHeight: 1 }}>{emoji}</span>}
          <h2
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 900,
              color: "#0f172a",
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            {title}
          </h2>
          {badge && (
            <span
              style={{
                background: badgeColor,
                color: "#fff",
                fontSize: 9,
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: 20,
                letterSpacing: 0.5,
              }}
            >
              {badge}
            </span>
          )}
          {subtitle && (
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{subtitle}</span>
          )}
        </div>

        {onMore && (
          <button
            onClick={onMore}
            style={{
              background: "none",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "5px 12px",
              fontSize: 12,
              color: "#16a34a",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
              (e.currentTarget as HTMLElement).style.borderColor = "#16a34a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
            }}
          >
            더보기 →
          </button>
        )}
      </div>

      {/* 스크롤 영역 */}
      <div style={{ position: "relative" }}>
        {/* 왼쪽 화살표 */}
        <button
          onClick={() => scroll("left")}
          aria-label="이전"
          style={{
            position: "absolute",
            left: -16,
            top: "calc(50% - 28px)",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            color: "#475569",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.15s",
          }}
        >
          ‹
        </button>

        {/* 오른쪽 화살표 */}
        <button
          onClick={() => scroll("right")}
          aria-label="다음"
          style={{
            position: "absolute",
            right: -16,
            top: "calc(50% - 28px)",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            color: "#475569",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.15s",
          }}
        >
          ›
        </button>

        {/* 카드 스크롤 컨테이너 */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 4,
          }}
        >
          {items.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: "start" }}>
              <MiniCard item={item} />
            </div>
          ))}
        </div>

        {/* 오른쪽 페이드 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 4,
            width: 60,
            background: "linear-gradient(to right, transparent, #f8fafc)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>
    </section>
  );
}
