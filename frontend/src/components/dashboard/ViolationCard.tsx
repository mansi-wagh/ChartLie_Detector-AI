import { AlertTriangle, ShieldAlert, AlertCircle, Info } from "lucide-react";
import type { Violation } from "../../types";

interface ViolationCardProps {
  violation: Violation;
}

export default function ViolationCard({ violation }: ViolationCardProps) {
  // Get icon and color themes matching violation severity levels
  const getSeverityTheme = () => {
    switch (violation.severity) {
      case "Critical":
        return {
          icon: ShieldAlert,
          border: "border-red-500/20 bg-red-500/5",
          text: "text-red-400",
          badge: "bg-red-500/10 text-red-400 border-red-500/20",
          glow: "shadow-[0_0_15px_rgba(239,68,68,0.05)]"
        };
      case "High":
        return {
          icon: AlertTriangle,
          border: "border-orange-500/20 bg-orange-500/5",
          text: "text-orange-400",
          badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
          glow: "shadow-[0_0_15px_rgba(249,115,22,0.05)]"
        };
      case "Medium":
        return {
          icon: AlertCircle,
          border: "border-amber-500/20 bg-amber-500/5",
          text: "text-amber-400",
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.05)]"
        };
      case "Low":
      default:
        return {
          icon: Info,
          border: "border-slate-500/20 bg-slate-500/5",
          text: "text-slate-400",
          badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",
          glow: ""
        };
    }
  };

  const theme = getSeverityTheme();
  const Icon = theme.icon;

  return (
    <div className={`flex flex-col gap-3 rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:bg-[#12121c]/40 hover:scale-[1.005] ${theme.border} ${theme.glow}`}>
      <div className="flex items-start justify-between gap-3">
        {/* Rule Title & Icon */}
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-white/[0.02] ${theme.text} ${theme.border}`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <h4 className="text-sm font-semibold tracking-tight text-white">
            {violation.rule}
          </h4>
        </div>

        {/* Severity Tag */}
        <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${theme.badge}`}>
          {violation.severity}
        </span>
      </div>

      {/* Message */}
      <p className="text-xs leading-relaxed text-slate-400">
        {violation.message}
      </p>

      {/* Penalty Weight metric */}
      <div className="mt-1 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-slate-500 font-medium">
        <span>Score impact:</span>
        <span className={`${theme.text} font-mono font-bold`}>
          +{violation.weight} pts
        </span>
      </div>
    </div>
  );
}
