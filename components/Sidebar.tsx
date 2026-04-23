import { TYPE_COLOR, MOCK_DATA, TRENDING_REASONS } from "../lib/constants";
import type { ContentItem, ContentType, TrendingItem } from "../lib/types";

type TrendingSectionProps = {
  data: TrendingItem[];
};

function TrendingSection({ data }: TrendingSectionProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <h3
        style={{
          margin: "0 0 14px",
          fontSize: 11,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 2,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "#ef4444", animation: "pulse 2s infinite" }}>●</span>
        실시간 트렌딩
      </h3>
      {data.map((t) => (
        <div
          key={t.rank}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "10px 0",
            borderBottom: "1px solid #f1f5f9",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: t.rank <= 3 ? "#f59e0b" : "#cbd5e1",
              fontFamily: "'Bebas Neue', sans-serif",
              width: 20,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {t.rank}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                color: "#0f172a",
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t.title}
            </div>
            <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  color: TYPE_COLOR[t.type],
                  fontWeight: 700,
                  background: `${TYPE_COLOR[t.type]}15`,
                  padding: "1px 6px",
                  borderRadius: 999,
                }}
              >
                {t.type}
              </span>
            </div>
            {/* 트렌딩 이유 */}
            {t.reason && (
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "#94a3b8", lineHeight: 1.3 }}>
                {t.reason}
              </p>
            )}
          </div>
          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color:
                t.change === "NEW"
                  ? "#f59e0b"
                  : t.change?.startsWith("+")
                  ? "#16a34a"
                  : t.change === "—"
                  ? "#cbd5e1"
                  : "#ef4444",
              flexShrink: 0,
              ...(t.change === "NEW"
                ? {
                    fontSize: 9,
                    padding: "2px 6px",
                    background: "#fef3c7",
                    borderRadius: 10,
                    fontFamily: "inherit",
                    fontWeight: 700,
                  }
                : {}),
            }}
          >
            {t.change}
          </span>
        </div>
      ))}
    </div>
  );
}

type StatsSectionProps = {
  items: ContentItem[];
};

function StatsSection({ items }: StatsSectionProps) {
  const maxCount = 4;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <h3
        style={{
          margin: "0 0 14px",
          fontSize: 11,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        매체별 현황
      </h3>
      {Object.entries(TYPE_COLOR).map(([type, color]) => {
        const typed = type as ContentType;
        const count = items.filter((d) => d.type === typed).length;
        return (
          <div key={type} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: "#475569" }}>{type}</span>
              <span style={{ fontSize: 11, color, fontFamily: "monospace", fontWeight: 700 }}>{count}</span>
            </div>
            <div style={{ height: 4, background: "#f1f5f9", borderRadius: 2 }}>
              <div
                style={{
                  height: "100%",
                  width: `${(count / maxCount) * 100}%`,
                  background: color,
                  borderRadius: 2,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

type SidebarProps = {
  trending: TrendingItem[];
  contents?: ContentItem[];
};

export default function Sidebar({ trending, contents }: SidebarProps) {
  const items = contents?.length ? contents : MOCK_DATA;

  /* reason 필드가 없으면 TRENDING_REASONS 맵에서 보완 */
  const trendingWithReasons = trending.map((t) => ({
    ...t,
    reason: t.reason ?? TRENDING_REASONS[t.title],
  }));

  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <TrendingSection data={trendingWithReasons} />
      <StatsSection items={items} />
    </aside>
  );
}
