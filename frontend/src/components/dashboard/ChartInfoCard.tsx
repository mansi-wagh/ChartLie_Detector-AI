import { BarChart, Type, Axis3d, CheckCircle2, XCircle } from "lucide-react";
import type { ChartInfo } from "../../types";

interface ChartInfoCardProps {
  info: ChartInfo;
}

export default function ChartInfoCard({ info }: ChartInfoCardProps) {
  const metaItems = [
    { label: "Chart Type", val: info.chart_type, icon: BarChart },
    { label: "Chart Title", val: info.title || "Untitled", icon: Type },
    { label: "Y-Axis Range", val: `${info.y_axis_start} to ${info.y_axis_end}`, icon: Axis3d },
  ];

  const booleanIndicators = [
    { label: "Uniform Intervals", val: info.intervals_uniform },
    { label: "Has Data Labels", val: info.has_labels },
    { label: "Has Citation Source", val: info.has_source },
    { label: "Dual Y-Axis Map", val: info.has_dual_axis },
    { label: "3D Presentation", val: info.is_3d },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-5 backdrop-blur-md">
      <h3 className="text-sm font-semibold tracking-tight text-white">
        Extracted Structure Details
      </h3>

      {/* Grid of Key Info */}
      <div className="grid gap-3.5 sm:grid-cols-3">
        {metaItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.01] p-3">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                {item.label}
              </span>
              <div className="mt-1.5 flex items-center gap-2 text-white">
                <Icon className="h-4 w-4 text-violet-400 shrink-0" />
                <span className="text-xs font-bold truncate">{item.val}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Boolean indicators Checklist */}
      <div className="mt-2 border-t border-white/5 pt-4">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
          {booleanIndicators.map((ind) => (
            <div key={ind.label} className="flex items-center gap-2 text-xs">
              {ind.val ? (
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="h-4.5 w-4.5 text-slate-600 shrink-0" />
              )}
              <span className={ind.val ? "text-slate-300" : "text-slate-500"}>
                {ind.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
