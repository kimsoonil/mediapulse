type HeatBarProps = {
  value: number;
};

export default function HeatBar({ value }: HeatBarProps) {
  const color = value > 90 ? "#ef4444" : value > 75 ? "#f59e0b" : "#3b82f6";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 80,
          height: 4,
          background: "#1e1e35",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: color,
            borderRadius: 2,
            transition: "width 1s ease",
          }}
        />
      </div>
      <span style={{ fontSize: 11, color: "#9090a8", fontFamily: "monospace" }}>{value}</span>
    </div>
  );
}
