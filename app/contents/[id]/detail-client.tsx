"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TYPE_COLOR } from "../../../lib/constants";
import type { ContentItem, ContentType } from "../../../lib/types";

/* ── 매체별 평점 미니 차트 ── */
function ScoreChart({ items }: { items: { type: ContentType; score: number; label: string }[] }) {
  const sorted = [...items].sort((a, b) => b.score - a.score);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {sorted.map((row) => (
        <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 52, fontSize: 11, color: "#9090a8", flexShrink: 0, textAlign: "right" }}>
            {row.label}
          </span>
          <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#2a2a45", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(row.score / 10) * 100}%`,
                background: TYPE_COLOR[row.type],
                borderRadius: 4,
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <span
            style={{
              width: 32,
              fontSize: 14,
              fontWeight: 800,
              color: "#f0f0f5",
              fontFamily: "'Bebas Neue', monospace",
              textAlign: "right",
            }}
          >
            {row.score.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── 평점 별 분포 (왓챠 스타일) ── */
function ScoreDistribution({ communityScore }: { communityScore: number }) {
  const pct = communityScore * 10;
  const tiers = [
    { label: "매우 좋음", color: "#2ecc71", pct: Math.round(pct * 0.55) },
    { label: "좋음", color: "#f59e0b", pct: Math.round(pct * 0.28) },
    { label: "보통", color: "#9090a8", pct: Math.round(pct * 0.1) },
    { label: "별로", color: "#e67e22", pct: Math.round(pct * 0.04) },
    { label: "싫음", color: "#e74c3c", pct: Math.max(1, 100 - pct) },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {tiers.map((t) => (
        <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 52, fontSize: 10, color: "#9090a8", textAlign: "right", flexShrink: 0 }}>
            {t.label}
          </span>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#2a2a45", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${t.pct}%`,
                background: t.color,
                borderRadius: 3,
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <span style={{ width: 28, fontSize: 10, color: "#606078", textAlign: "right" }}>{t.pct}%</span>
        </div>
      ))}
    </div>
  );
}

/* ── 매체 연결 칩 ── */
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 18px",
        borderRadius: 12,
        border: `1px solid ${isActive ? color : "#2a2a45"}`,
        borderLeft: `3px solid ${color}`,
        background: isActive ? `${color}18` : "#1e1e35",
        textDecoration: "none",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: 0.5 }}>{type}</span>
      {score !== null && (
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#f0f0f5",
            fontFamily: "'Bebas Neue', monospace",
            lineHeight: 1,
          }}
        >
          {score.toFixed(1)}
        </span>
      )}
      {isActive && (
        <span
          style={{
            fontSize: 9,
            color,
            background: `${color}22`,
            padding: "2px 6px",
            borderRadius: 6,
            fontWeight: 700,
          }}
        >
          현재
        </span>
      )}
    </Link>
  );
}

/* ── 메인 컴포넌트 ── */
type Props = {
  item: ContentItem;
  linkedItem: ContentItem | null;
  allItems: ContentItem[];
};

export default function DetailClient({ item, linkedItem, allItems }: Props) {
  const [imgError, setImgError] = useState(false);
  const typeColor = TYPE_COLOR[item.type];
  const positivePercent = Math.round(item.community_score * 10);

  /* 이 작품을 연결하는 다른 작품들 (역방향 링크) */
  const backlinkedItems = allItems.filter(
    (d) => d.cross_media?.id === item.id && d.id !== item.id
  );

  const scoreChartItems: { type: ContentType; score: number; label: string }[] = [
    { type: item.type, score: item.community_score, label: item.type },
    ...(linkedItem
      ? [{ type: linkedItem.type, score: linkedItem.community_score, label: linkedItem.type }]
      : []),
    ...backlinkedItems.map((b) => ({ type: b.type, score: b.community_score, label: b.type })),
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#f0f0f5" }}>

      {/* ── 스티키 네비 ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,18,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #2a2a45",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            height: 52,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#9090a8",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              transition: "color 0.15s",
            }}
          >
            ← 홈
          </Link>
          <span style={{ color: "#2a2a45" }}>|</span>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 900,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: 3,
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MEDIAPULSE
          </h1>
        </div>
      </nav>

      {/* ── 히어로 섹션 ── */}
      <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
        {/* 배경 블러 이미지 */}
        {!imgError && (
          <Image
            src={item.thumb}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", filter: "blur(24px) brightness(0.35)", transform: "scale(1.1)" }}
            onError={() => setImgError(true)}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,18,0.3) 0%, rgba(10,10,18,0.85) 70%, #0a0a12 100%)",
          }}
        />

        {/* 매체 컬러 바 */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: typeColor }} />

        {/* 콘텐츠 오버레이 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 24px 36px",
          }}
        >
          <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
            {/* 포스터 */}
            <div
              style={{
                position: "relative",
                width: 140,
                height: 200,
                borderRadius: 12,
                overflow: "hidden",
                flexShrink: 0,
                border: `2px solid ${typeColor}55`,
                boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${typeColor}33`,
              }}
            >
              <Image src={item.thumb} alt={item.title} fill sizes="140px" style={{ objectFit: "cover" }} />
            </div>

            {/* 제목 + 메타 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span
                  style={{
                    background: typeColor,
                    color: "#000",
                    fontSize: 11,
                    fontWeight: 900,
                    padding: "3px 10px",
                    borderRadius: 4,
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: 1,
                  }}
                >
                  {item.type}
                </span>
                {item.community_heat > 90 && (
                  <span
                    style={{
                      background: "#ef444422",
                      border: "1px solid #ef4444",
                      borderRadius: 4,
                      padding: "2px 8px",
                      fontSize: 10,
                      color: "#ef4444",
                      fontWeight: 700,
                    }}
                  >
                    🔥 HOT
                  </span>
                )}
              </div>

              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: "clamp(24px, 4vw, 38px)",
                  fontWeight: 900,
                  color: "#f0f0f5",
                  fontFamily: "'Noto Sans KR', sans-serif",
                  lineHeight: 1.2,
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                {item.title}
              </h2>

              <p style={{ margin: "0 0 14px", fontSize: 14, color: "#9090a8" }}>
                {item.year} · {item.genre.join(", ")} · {item.platform}
              </p>

              {/* 평점 뱃지 */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid #2a2a45",
                    borderRadius: 10,
                    padding: "8px 16px",
                  }}
                >
                  <span style={{ fontSize: 16 }}>⭐</span>
                  <div>
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: "#f0f0f5",
                        fontFamily: "'Bebas Neue', monospace",
                        lineHeight: 1,
                      }}
                    >
                      {item.score.toFixed(1)}
                    </div>
                    <div style={{ fontSize: 9, color: "#9090a8", marginTop: 1 }}>전문 평점</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid #2a2a45",
                    borderRadius: 10,
                    padding: "8px 16px",
                  }}
                >
                  <span style={{ fontSize: 16 }}>💬</span>
                  <div>
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: "#f0f0f5",
                        fontFamily: "'Bebas Neue', monospace",
                        lineHeight: 1,
                      }}
                    >
                      {item.community_score.toFixed(1)}
                    </div>
                    <div style={{ fontSize: 9, color: "#9090a8", marginTop: 1 }}>커뮤니티 평점</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid #2a2a45",
                    borderRadius: 10,
                    padding: "8px 16px",
                  }}
                >
                  <span style={{ fontSize: 16 }}>📺</span>
                  <div>
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: "#ef4444",
                        fontFamily: "'Bebas Neue', monospace",
                        lineHeight: 1,
                      }}
                    >
                      {item.youtube_count.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 9, color: "#9090a8", marginTop: 1 }}>유튜브 리뷰</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 본문 ── */}
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>

          {/* ── 왼쪽 메인 컬럼 ── */}
          <div style={{ minWidth: 0 }}>

            {/* 커뮤니티 열기 바 */}
            <section
              style={{
                background: "#16162a",
                border: "1px solid #2a2a45",
                borderRadius: 14,
                padding: "20px 24px",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 12, color: "#606078", textTransform: "uppercase", letterSpacing: 2 }}>
                  커뮤니티 열기
                </h3>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: item.community_heat > 90 ? "#ef4444" : item.community_heat > 75 ? "#f59e0b" : "#3b82f6",
                    fontFamily: "'Bebas Neue', monospace",
                  }}
                >
                  {item.community_heat}
                  <span style={{ fontSize: 12, color: "#606078", marginLeft: 3 }}>/ 100</span>
                </span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: "#2a2a45", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${item.community_heat}%`,
                    background:
                      item.community_heat > 90
                        ? "linear-gradient(90deg, #ef4444, #f59e0b)"
                        : item.community_heat > 75
                        ? "#f59e0b"
                        : "#3b82f6",
                    borderRadius: 5,
                    transition: "width 1s ease",
                  }}
                />
              </div>

              {/* 긍정 반응 */}
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(231,76,60,0.2)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${positivePercent}%`,
                      background: "#2ecc71",
                      borderRadius: 3,
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#2ecc71", flexShrink: 0 }}>
                  긍정 {positivePercent}%
                </span>
              </div>
            </section>

            {/* 시놉시스 */}
            <section
              style={{
                background: "#16162a",
                border: "1px solid #2a2a45",
                borderRadius: 14,
                padding: "20px 24px",
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 12,
                  color: "#606078",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                시놉시스
              </h3>
              <p style={{ margin: 0, fontSize: 15, color: "#c0c0d0", lineHeight: 1.8 }}>{item.summary}</p>
            </section>

            {/* 커뮤니티 반응 */}
            <section
              style={{
                background: "#16162a",
                border: "1px solid #2a2a45",
                borderRadius: 14,
                padding: "20px 24px",
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: 12,
                  color: "#606078",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                커뮤니티 반응 · {item.reviews.length}건
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {item.reviews.map((r, i) => (
                  <div
                    key={`${r.source}-${i}`}
                    style={{
                      background: "#1e1e35",
                      border: "1px solid #2a2a45",
                      borderLeft: `3px solid ${typeColor}`,
                      borderRadius: "0 10px 10px 0",
                      padding: "14px 16px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: typeColor,
                          background: `${typeColor}18`,
                          padding: "2px 8px",
                          borderRadius: 4,
                          letterSpacing: 0.5,
                        }}
                      >
                        {r.source}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 60, height: 4, borderRadius: 2, background: "#2a2a45", overflow: "hidden" }}>
                          <div
                            style={{
                              height: "100%",
                              width: `${r.heat}%`,
                              background: r.heat > 90 ? "#ef4444" : r.heat > 75 ? "#f59e0b" : "#3b82f6",
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 11, color: "#9090a8", fontFamily: "monospace" }}>{r.heat}</span>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: "#d0d0e0", lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 매체 연결 */}
            {(linkedItem || backlinkedItems.length > 0) && (
              <section
                style={{
                  background: "#16162a",
                  border: "1px solid #2a2a45",
                  borderRadius: 14,
                  padding: "20px 24px",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 12,
                    color: "#606078",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  매체 연결
                </h3>
                <p style={{ margin: "0 0 16px", fontSize: 12, color: "#606078" }}>
                  같은 IP의 다른 매체에서의 반응을 확인하세요
                </p>

                {/* 매체 흐름 */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                  <MediaChip
                    type={item.type}
                    score={item.community_score}
                    isActive
                    href={`/contents/${item.id}`}
                  />
                  {linkedItem && (
                    <>
                      <span style={{ fontSize: 20, color: "#2a2a45" }}>→</span>
                      <MediaChip
                        type={linkedItem.type}
                        score={linkedItem.community_score}
                        href={`/contents/${linkedItem.id}`}
                      />
                    </>
                  )}
                  {backlinkedItems.map((b) => (
                    <span key={b.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20, color: "#2a2a45" }}>↔</span>
                      <MediaChip type={b.type} score={b.community_score} href={`/contents/${b.id}`} />
                    </span>
                  ))}
                </div>

                {/* 연결 작품 카드 */}
                {linkedItem && (
                  <Link
                    href={`/contents/${linkedItem.id}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "88px 1fr",
                      gap: 14,
                      padding: 14,
                      background: `linear-gradient(135deg, ${TYPE_COLOR[linkedItem.type]}18, #1e1e35)`,
                      border: `1px solid ${TYPE_COLOR[linkedItem.type]}44`,
                      borderLeft: `3px solid ${TYPE_COLOR[linkedItem.type]}`,
                      borderRadius: "0 12px 12px 0",
                      textDecoration: "none",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 88,
                        height: 60,
                        borderRadius: 8,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={linkedItem.thumb}
                        alt={linkedItem.title}
                        fill
                        sizes="88px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span
                          style={{
                            fontSize: 10,
                            color: TYPE_COLOR[linkedItem.type],
                            background: `${TYPE_COLOR[linkedItem.type]}18`,
                            padding: "2px 7px",
                            borderRadius: 4,
                            fontWeight: 800,
                          }}
                        >
                          {linkedItem.type}
                        </span>
                        <span style={{ fontSize: 14, color: "#f0f0f5", fontWeight: 800 }}>{linkedItem.title}</span>
                        <span style={{ marginLeft: "auto", fontSize: 12, color: "#9090a8" }}>열기 ↗</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: "#9090a8" }}>
                        {linkedItem.year} · {linkedItem.platform}
                      </p>
                      <p
                        style={{
                          margin: "6px 0 0",
                          fontSize: 12,
                          color: "#9090a8",
                          fontStyle: "italic",
                          lineHeight: 1.45,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        &ldquo;
                        {linkedItem.reviews?.length
                          ? [...linkedItem.reviews].sort((a, b) => b.heat - a.heat)[0].text
                          : linkedItem.summary}
                        &rdquo;
                      </p>
                    </div>
                  </Link>
                )}
              </section>
            )}

            {/* 태그 */}
            <section style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {item.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.06)",
                    color: "#9090a8",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  #{t}
                </span>
              ))}
            </section>
          </div>

          {/* ── 오른쪽 사이드 ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* 평점 분포 */}
            <div
              style={{
                background: "#16162a",
                border: "1px solid #2a2a45",
                borderRadius: 14,
                padding: "20px 20px",
              }}
            >
              <h4
                style={{
                  margin: "0 0 14px",
                  fontSize: 11,
                  color: "#606078",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                평점 분포
              </h4>
              <ScoreDistribution communityScore={item.community_score} />
            </div>

            {/* 매체별 평점 차트 */}
            {scoreChartItems.length > 1 && (
              <div
                style={{
                  background: "#16162a",
                  border: "1px solid #2a2a45",
                  borderRadius: 14,
                  padding: "20px 20px",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 14px",
                    fontSize: 11,
                    color: "#606078",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  매체별 커뮤니티 반응
                </h4>
                <ScoreChart items={scoreChartItems} />
              </div>
            )}

            {/* 장르 & 메타 */}
            <div
              style={{
                background: "#16162a",
                border: "1px solid #2a2a45",
                borderRadius: 14,
                padding: "20px 20px",
              }}
            >
              <h4
                style={{
                  margin: "0 0 14px",
                  fontSize: 11,
                  color: "#606078",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                작품 정보
              </h4>
              <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px" }}>
                {[
                  { label: "매체", value: item.type },
                  { label: "연도", value: String(item.year) },
                  { label: "플랫폼", value: item.platform },
                  { label: "장르", value: item.genre.join(", ") },
                ].map(({ label, value }) => (
                  <>
                    <dt key={`dt-${label}`} style={{ fontSize: 11, color: "#606078", paddingTop: 1 }}>
                      {label}
                    </dt>
                    <dd key={`dd-${label}`} style={{ margin: 0, fontSize: 13, color: "#d0d0e0", fontWeight: 600 }}>
                      {value}
                    </dd>
                  </>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
