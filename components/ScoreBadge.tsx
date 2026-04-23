type ScoreBadgeProps = {
  score: number;
  label: string;
};

export default function ScoreBadge({ score, label }: ScoreBadgeProps) {
  const color = score >= 9 ? "#16a34a" : score >= 8 ? "#2563eb" : "#f59e0b";

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color,
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: 1,
        }}
      >
        {score.toFixed(1)}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}
