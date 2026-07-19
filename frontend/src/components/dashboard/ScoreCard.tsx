import ScoreGauge from "./ScoreGauge";
import SeverityBadge from "./SeverityBadge";

interface ScoreCardProps {
  score: number;
  severity: "HONEST" | "SUSPICIOUS" | "MISLEADING" | "DECEPTIVE";
}

export default function ScoreCard({ score, severity }: ScoreCardProps) {
  const getSeverityDescription = () => {
    switch (severity) {
      case "HONEST":
        return "The chart conforms to design standards with no significant statistical or graphical anomalies detected.";
      case "SUSPICIOUS":
        return "Minor irregularities or layout choices present. Review visual scales carefully.";
      case "MISLEADING":
        return "Visual choices alter chart interpretation (e.g., truncated origins, omitted sources, dual axis mismatches).";
      case "DECEPTIVE":
        return "Severe violations detected. Design choices intentionally or majorly distort statistical reality.";
      default:
        return "Analysis status unknown.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-6 backdrop-blur-md">
      <div className="mb-4 flex w-full items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-white">
          Deception Rating
        </h3>
        <SeverityBadge severity={severity} />
      </div>

      <ScoreGauge score={score} severity={severity} />

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
        {getSeverityDescription()}
      </p>
    </div>
  );
}
