interface SeverityBadgeProps {
  severity: "HONEST" | "SUSPICIOUS" | "MISLEADING" | "DECEPTIVE";
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getStyles = () => {
    switch (severity) {
      case "HONEST":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
      case "SUSPICIOUS":
        return "border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
      case "MISLEADING":
        return "border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]";
      case "DECEPTIVE":
        return "border-red-500/20 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
      default:
        return "border-slate-500/20 bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase ${getStyles()}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      {severity}
    </span>
  );
}
