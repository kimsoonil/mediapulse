import { useEffect } from "react";
import Image from "next/image";
import { TYPE_COLOR } from "../lib/constants";
import type { ContentItem } from "../lib/types";
import HeatBar from "./HeatBar";
import ScoreBadge from "./ScoreBadge";

function getOneLiner(item: ContentItem): string | null {
  if (!item.reviews?.length) return null;
  const top = [...item.reviews].sort((a, b) => b.heat - a.heat)[0];
  return top?.text ?? null;
}

type ModalProps = {
  item: ContentItem;
  linkedItem?: ContentItem | null;
  onClose: () => void;
  onCrossMedia: (id: number) => void;
};

export default function Modal({ item, linkedItem, onClose, onCrossMedia }: ModalProps) {
  const typeColor = TYPE_COLOR[item.type];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#16162a",
          border: `1px solid ${typeColor}44`,
          borderRadius: 16,
          maxWidth: 640,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: `0 0 60px ${typeColor}22`,
        }}
      >
        {/* 매체 컬러 바 */}
        <div style={{ height: 3, background: typeColor, borderRadius: "16px 16px 0 0" }} />

        <div
          style={{
            position: "relative",
            height: 220,
            overflow: "hidden",
          }}
        >
          <Image src={item.thumb} alt={item.title} fill sizes="640px" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 20%, #16162a 100%)",
            }}
          />

          <button
            onClick={onClose}
            aria-label="닫기"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid #2a2a45",
              color: "#fff",
              width: 32,
              height: 32,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>

          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 20,
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
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, color: "#f0f0f5", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {item.title}
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#606078" }}>
                {item.year} · {item.genre.join(", ")} · {item.platform}
              </p>
            </div>
            <div style={{ display: "flex", gap: 20, flexShrink: 0, marginLeft: 16 }}>
              <ScoreBadge score={item.score} label="전문 평점" />
              <ScoreBadge score={item.community_score} label="커뮤니티" />
            </div>
          </div>

          <p style={{ margin: "16px 0", fontSize: 14, color: "#9090a8", lineHeight: 1.7 }}>{item.summary}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0" }}>
            <div
              style={{
                background: "#1e1e35",
                borderRadius: 8,
                padding: "12px 16px",
                border: "1px solid #2a2a45",
              }}
            >
              <div style={{ fontSize: 11, color: "#606078", marginBottom: 4 }}>유튜브 리뷰 수</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#ef4444", fontFamily: "monospace" }}>
                {item.youtube_count.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                background: "#1e1e35",
                borderRadius: 8,
                padding: "12px 16px",
                border: "1px solid #2a2a45",
              }}
            >
              <div style={{ fontSize: 11, color: "#606078", marginBottom: 4 }}>커뮤니티 열기</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <div style={{ flex: 1, height: 6, background: "#2a2a45", borderRadius: 3 }}>
                  <div
                    style={{
                      width: `${item.community_heat}%`,
                      height: "100%",
                      background: item.community_heat > 90 ? "#ef4444" : "#f59e0b",
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span style={{ fontFamily: "monospace", fontSize: 14, color: "#f0f0f5", fontWeight: 700 }}>
                  {item.community_heat}
                </span>
              </div>
            </div>
          </div>

          <h4
            style={{
              margin: "0 0 10px",
              fontSize: 12,
              color: "#606078",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            커뮤니티 반응
          </h4>
          {item.reviews.map((r, i) => (
            <div
              key={`${r.source}-${i}`}
              style={{
                background: "#1e1e35",
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 8,
                border: "1px solid #2a2a45",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 10,
                    color: typeColor,
                    fontWeight: 700,
                    background: `${typeColor}18`,
                    padding: "2px 6px",
                    borderRadius: 3,
                    marginRight: 8,
                  }}
                >
                  {r.source}
                </span>
                <span style={{ fontSize: 13, color: "#f0f0f5" }}>{r.text}</span>
              </div>
              <div style={{ flexShrink: 0, marginLeft: 12 }}>
                <HeatBar value={r.heat} />
              </div>
            </div>
          ))}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
            {item.tags.map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 11,
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

          {(item.cross_media || linkedItem) && (
            <div style={{ marginTop: 18 }}>
              <h4
                style={{
                  margin: "0 0 10px",
                  fontSize: 12,
                  color: "#606078",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                매체 연결 작품
              </h4>

              {linkedItem ? (
                <button
                  onClick={() => onCrossMedia(linkedItem.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: `linear-gradient(135deg, ${TYPE_COLOR[linkedItem.type]}18, #1e1e35)`,
                    border: `1px solid ${TYPE_COLOR[linkedItem.type]}55`,
                    borderLeft: `3px solid ${TYPE_COLOR[linkedItem.type]}`,
                    borderRadius: 12,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 12, padding: 12 }}>
                    <div style={{ position: "relative", width: 96, height: 64, borderRadius: 10, overflow: "hidden" }}>
                      <Image src={linkedItem.thumb} alt={linkedItem.title} fill sizes="96px" style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            fontSize: 10,
                            color: TYPE_COLOR[linkedItem.type],
                            background: `${TYPE_COLOR[linkedItem.type]}18`,
                            padding: "2px 6px",
                            borderRadius: 6,
                            fontWeight: 800,
                            letterSpacing: 1,
                          }}
                        >
                          {linkedItem.type}
                        </span>
                        <span style={{ fontSize: 13, color: "#f0f0f5", fontWeight: 800 }}>{linkedItem.title}</span>
                        <span aria-hidden style={{ marginLeft: "auto", fontSize: 12, color: "#9090a8" }}>
                          열기 ↗
                        </span>
                      </div>
                      <div style={{ marginTop: 4, fontSize: 12, color: "#606078" }}>
                        {linkedItem.year} · {linkedItem.platform}
                      </div>
                      <div style={{ marginTop: 8, display: "flex", gap: 14, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#9090a8", fontFamily: "monospace" }}>
                          평점 {linkedItem.score.toFixed(1)}
                        </span>
                        <span style={{ fontSize: 11, color: "#9090a8", fontFamily: "monospace" }}>
                          커뮤니티 {linkedItem.community_score.toFixed(1)}
                        </span>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 12, color: "#9090a8", lineHeight: 1.55, fontStyle: "italic" }}>
                        {getOneLiner(linkedItem) ? `"${getOneLiner(linkedItem)}"` : linkedItem.summary}
                      </div>
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => onCrossMedia(item.cross_media!.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: `linear-gradient(135deg, ${TYPE_COLOR[item.cross_media!.type]}22, rgba(255,255,255,0.04))`,
                    border: `1px solid ${TYPE_COLOR[item.cross_media!.type]}55`,
                    borderLeft: `3px solid ${TYPE_COLOR[item.cross_media!.type]}`,
                    borderRadius: 12,
                    padding: "10px 12px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: 10, color: "#9090a8", fontWeight: 800, letterSpacing: 1 }}>연결작</span>
                  <span style={{ fontSize: 11, color: TYPE_COLOR[item.cross_media!.type], fontWeight: 800 }}>
                    {item.cross_media!.type}
                  </span>
                  <span style={{ fontSize: 12, color: "#f0f0f5", fontWeight: 700 }}>{item.cross_media!.title}</span>
                  <span aria-hidden style={{ marginLeft: "auto", fontSize: 12, color: "#9090a8" }}>
                    ↗
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
