"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TYPE_COLOR } from "../lib/constants";
import type { ContentItem, CrossMedia } from "../lib/types";

type CrossMediaBadgeProps = {
  crossMedia: CrossMedia | null;
};

function CrossMediaBadge({ crossMedia }: CrossMediaBadgeProps) {
  if (!crossMedia) return null;

  const targetColor = TYPE_COLOR[crossMedia.type];

  return (
    <Link
      href={`/contents/${crossMedia.id}`}
      onClick={(e) => e.stopPropagation()}
      aria-label={`연결 작품 보기: ${crossMedia.type} ${crossMedia.title}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: `linear-gradient(135deg, ${targetColor}22, rgba(255,255,255,0.04))`,
        border: `1px solid ${targetColor}55`,
        borderRadius: 20,
        padding: "6px 10px",
        cursor: "pointer",
        marginTop: 8,
        boxShadow: `0 0 0 1px ${targetColor}22, 0 8px 30px ${targetColor}18`,
        textDecoration: "none",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: targetColor,
          boxShadow: `0 0 18px ${targetColor}aa`,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 10, color: "#9090a8", fontWeight: 800, letterSpacing: 1 }}>연결작</span>
      <span style={{ fontSize: 10, color: targetColor, fontWeight: 800 }}>{crossMedia.type}</span>
      <span style={{ fontSize: 10, color: "#f0f0f5", fontWeight: 700 }}>{crossMedia.title}</span>
      <span aria-hidden style={{ marginLeft: "auto", fontSize: 11, color: "#606078" }}>
        ↗
      </span>
    </Link>
  );
}

/* 커뮤니티 반응 바 */
function CommunityReactionBar({ youtubeCount, communityScore }: { youtubeCount: number; communityScore: number }) {
  const positivePercent = Math.round(communityScore * 10);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 12 }}>💬</span>
        <span style={{ fontSize: 11, color: "#9090a8" }}>{youtubeCount.toLocaleString()}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
        <div
          style={{
            flex: 1,
            height: 6,
            borderRadius: 3,
            background: "rgba(231,76,60,0.25)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${positivePercent}%`,
              height: "100%",
              borderRadius: 3,
              background: "#2ecc71",
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#2ecc71", flexShrink: 0 }}>{positivePercent}%</span>
      </div>
    </div>
  );
}

type CardProps = {
  item: ContentItem;
};

export default function Card({ item }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const typeColor = TYPE_COLOR[item.type];

  const topReview = item.reviews?.length
    ? [...item.reviews].sort((a, b) => b.heat - a.heat)[0]
    : null;

  return (
    <Link
      href={`/contents/${item.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: isHovered ? "#1c1c38" : "#16162a",
        border: `1px solid ${isHovered ? `${typeColor}55` : "#2a2a45"}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: isHovered ? "translateY(-4px)" : "none",
        boxShadow: isHovered ? `0 12px 40px ${typeColor}22` : "none",
      }}
    >
      {/* Fix 3: 매체별 상단 컬러 바 — 4px + 하단 glow */}
      <div
        style={{
          height: 4,
          background: typeColor,
          boxShadow: `0 2px 10px ${typeColor}88`,
        }}
      />

      <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, #16162a 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: typeColor,
            color: "#000",
            fontSize: 10,
            fontWeight: 900,
            padding: "3px 8px",
            borderRadius: 4,
            letterSpacing: 1,
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          {item.type}
        </div>

        {item.community_heat > 90 && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#ef444422",
              border: "1px solid #ef4444",
              borderRadius: 4,
              padding: "2px 6px",
              fontSize: 9,
              color: "#ef4444",
              fontWeight: 700,
            }}
          >
            🔥 HOT
          </div>
        )}

        {/* 개선된 평점 표시 */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 0,
            background: "rgba(0,0,0,0.55)",
            borderRadius: 10,
            backdropFilter: "blur(8px)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5px 10px" }}>
            <span style={{ fontSize: 9 }}>⭐</span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 0.5,
                lineHeight: 1,
              }}
            >
              {item.score.toFixed(1)}
            </span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>전문</span>
          </div>
          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5px 10px" }}>
            <span style={{ fontSize: 9 }}>💬</span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 0.5,
                lineHeight: 1,
              }}
            >
              {item.community_score.toFixed(1)}
            </span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>커뮤</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 800,
              color: "#f0f0f5",
              fontFamily: "'Noto Sans KR', sans-serif",
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </h3>
          <span style={{ fontSize: 11, color: "#606078", flexShrink: 0, marginLeft: 8 }}>{item.year}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "8px 0" }}>
          {item.genre.map((g) => (
            <span
              key={g}
              style={{
                fontSize: 10,
                color: "#606078",
                background: "#1e1e35",
                padding: "2px 6px",
                borderRadius: 3,
              }}
            >
              {g}
            </span>
          ))}
          <span
            style={{
              fontSize: 10,
              color: `${typeColor}cc`,
              background: `${typeColor}18`,
              padding: "2px 6px",
              borderRadius: 3,
            }}
          >
            {item.platform}
          </span>
        </div>

        {topReview ? (
          <div
            style={{
              margin: "6px 0 8px",
              padding: "8px 10px",
              background: "#1e1e35",
              borderLeft: `2px solid ${typeColor}`,
              borderRadius: "0 6px 6px 0",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: 700,
                color: typeColor,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 3,
              }}
            >
              {topReview.source} 베스트
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#9090a8",
                lineHeight: 1.45,
                fontStyle: "italic",
              }}
            >
              &ldquo;{topReview.text}&rdquo;
            </p>
          </div>
        ) : (
          <p style={{ margin: "6px 0 8px", fontSize: 12, color: "#606078", lineHeight: 1.5 }}>{item.summary}</p>
        )}

        <CommunityReactionBar youtubeCount={item.youtube_count} communityScore={item.community_score} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
          {item.tags.map((t) => (
            <span
              key={t}
              style={{
                display: "inline-block",
                padding: "3px 9px",
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 500,
                background: "rgba(255,255,255,0.06)",
                color: "#9090a8",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        <CrossMediaBadge crossMedia={item.cross_media} />
      </div>
    </Link>
  );
}
