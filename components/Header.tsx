import { TABS, TYPE_COLOR } from "../lib/constants";
import type { ContentType } from "../lib/types";

type HeaderProps = {
  activeTab: "전체" | ContentType;
  onTabChange: (tab: "전체" | ContentType) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Header({ activeTab, onTabChange, search, onSearchChange }: HeaderProps) {
  return (
    <header
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
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* 로고 + 서브타이틀 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            padding: "14px 0 8px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 28,
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
          <span style={{ fontSize: 11, color: "#606078", letterSpacing: 2 }}>커뮤니티 반응 큐레이션</span>
        </div>

        {/* 탭 네비게이션 */}
        <nav style={{ display: "flex", gap: 2 }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 700,
                color: activeTab === tab ? (tab === "전체" ? "#f59e0b" : TYPE_COLOR[tab]) : "#606078",
                borderBottom: `2px solid ${
                  activeTab === tab ? (tab === "전체" ? "#f59e0b" : TYPE_COLOR[tab]) : "transparent"
                }`,
                transition: "all 0.2s ease",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* 검색바 — 탭 아래 중앙 배치 (Section 5, 옵션 A) */}
        <div style={{ padding: "10px 0 12px" }}>
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14,
                color: "#606078",
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="제목, 장르, 태그 검색..."
              style={{
                width: "100%",
                background: "#16162a",
                border: "1px solid #2a2a45",
                borderRadius: 12,
                padding: "12px 20px 12px 46px",
                color: "#f0f0f5",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#f59e0b";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#2a2a45";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
