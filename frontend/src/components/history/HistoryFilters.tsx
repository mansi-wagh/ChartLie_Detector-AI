export type SeverityFilter = "ALL" | "HONEST" | "SUSPICIOUS" | "MISLEADING" | "DECEPTIVE";
export type SortOption = "NEWEST" | "OLDEST" | "HIGHEST_SCORE" | "LOWEST_SCORE";

interface HistoryFiltersProps {
  selectedSeverity: SeverityFilter;
  onSeverityChange: (severity: SeverityFilter) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  counts: Record<SeverityFilter, number>;
}

export default function HistoryFilters({
  selectedSeverity,
  onSeverityChange,
  selectedSort,
  onSortChange,
  counts,
}: HistoryFiltersProps) {
  const severities: { label: string; value: SeverityFilter; color: string }[] = [
    { label: "All", value: "ALL", color: "bg-slate-500/10 text-slate-300 border-slate-500/20 active:bg-slate-500/20" },
    { label: "Honest", value: "HONEST", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 active:bg-emerald-500/20" },
    { label: "Suspicious", value: "SUSPICIOUS", color: "bg-amber-500/10 text-amber-400 border-amber-500/20 active:bg-amber-500/20" },
    { label: "Misleading", value: "MISLEADING", color: "bg-orange-500/10 text-orange-400 border-orange-500/20 active:bg-orange-500/20" },
    { label: "Deceptive", value: "DECEPTIVE", color: "bg-red-500/10 text-red-400 border-red-500/20 active:bg-red-500/20" },
  ];

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Newest First", value: "NEWEST" },
    { label: "Oldest First", value: "OLDEST" },
    { label: "Highest Score", value: "HIGHEST_SCORE" },
    { label: "Lowest Score", value: "LOWEST_SCORE" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4">
      {/* Severity Filter Chips */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-slate-500 uppercase mr-1">
          Severity:
        </span>
        {severities.map((sev) => {
          const isSelected = selectedSeverity === sev.value;
          return (
            <button
              key={sev.value}
              onClick={() => onSeverityChange(sev.value)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isSelected
                  ? sev.value === "ALL"
                    ? "bg-white/10 text-white border-white/20"
                    : sev.color.split(" ").slice(0, 2).join(" ").replace("/10", "/20") + " border-current"
                  : "bg-transparent text-slate-400 border-white/5 hover:border-white/10 hover:text-slate-300"
              }`}
            >
              <span>{sev.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isSelected ? "bg-white/15 text-white" : "bg-white/5 text-slate-500"
                }`}
              >
                {counts[sev.value]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sorting Control */}
      <div className="flex items-center gap-2.5">
        <label htmlFor="history-sort" className="text-xs font-semibold text-slate-500 uppercase shrink-0">
          Sort By:
        </label>
        <select
          id="history-sort"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-xl border border-white/10 bg-[#0f0f15]/50 px-3.5 py-1.5 text-xs font-semibold text-slate-300 outline-none transition-all focus:border-violet-500/50 hover:bg-[#0f0f15]/75 cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0f0f15] text-slate-300">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
