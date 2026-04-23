type ScoreBadgeProps = {
  score: number;
  label: string;
};

export default function ScoreBadge({ score, label }: ScoreBadgeProps) {
  const color = score >= 9 ? "#f59e0b" : score >= 8 ? "#2ecc71" : "#3b82f6";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color,
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: 1,
          textShadow: `0 0 20px ${color}55`,
        }}
      >
        {score.toFixed(1)}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "#606078",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}
