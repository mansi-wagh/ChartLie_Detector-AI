import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ScoreGaugeProps {
  score: number;
  severity: "HONEST" | "SUSPICIOUS" | "MISLEADING" | "DECEPTIVE";
}

export default function ScoreGauge({ score, severity }: ScoreGaugeProps) {
  // Map severity to enterprise colors
  const getSeverityColors = () => {
    switch (severity) {
      case "HONEST":
        return { stroke: "#10b981", bg: "rgba(16,185,129,0.1)" };
      case "SUSPICIOUS":
        return { stroke: "#f59e0b", bg: "rgba(245,158,11,0.1)" };
      case "MISLEADING":
        return { stroke: "#f97316", bg: "rgba(249,115,22,0.1)" };
      case "DECEPTIVE":
        return { stroke: "#ef4444", bg: "rgba(239,68,68,0.1)" };
      default:
        return { stroke: "#a855f7", bg: "rgba(168,85,247,0.1)" };
    }
  };

  const colors = getSeverityColors();
  
  // Data structure for Recharts Gauge (semi-circle representation)
  const data = [
    { value: score },
    { value: 100 - score }
  ];

  return (
    <div className="relative flex h-48 w-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius="75%"
            outerRadius="95%"
            dataKey="value"
            stroke="none"
          >
            <Cell fill={colors.stroke} />
            <Cell fill="rgba(255, 255, 255, 0.05)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Value Overlay */}
      <div className="absolute bottom-[20%] flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {score}
        </span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Misleading Score
        </span>
      </div>
    </div>
  );
}
