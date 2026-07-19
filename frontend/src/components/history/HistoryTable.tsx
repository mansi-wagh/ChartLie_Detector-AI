import { Download, Eye, Trash2, Calendar, AlertTriangle } from "lucide-react";
import SeverityBadge from "../dashboard/SeverityBadge";
import type { HistoryItem } from "./HistoryCard";

interface HistoryTableProps {
  items: HistoryItem[];
  onViewDetails: (item: HistoryItem) => void;
  onDownloadPDF: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export default function HistoryTable({
  items,
  onViewDetails,
  onDownloadPDF,
  onDelete,
}: HistoryTableProps) {
  const getMiniChartPreview = (chartType: string = "bar") => {
    const isLine = chartType.toLowerCase().includes("line");
    return (
      <svg className="h-full w-full opacity-50" viewBox="0 0 100 50">
        <path d="M 10 40 L 90 40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {isLine ? (
          <path
            d="M 10 35 Q 30 15 50 28 T 90 10"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
          />
        ) : (
          <g fill="#8b5cf6" opacity="0.8">
            <rect x="15" y="25" width="8" height="15" rx="1" />
            <rect x="35" y="15" width="8" height="25" rx="1" />
            <rect x="55" y="20" width="8" height="20" rx="1" fill="#6366f1" />
            <rect x="75" y="10" width="8" height="30" rx="1" fill="#6366f1" />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f15]/30 backdrop-blur-md">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-slate-400">
            <th className="px-6 py-4.5">Thumbnail</th>
            <th className="px-6 py-4.5">File Name</th>
            <th className="px-6 py-4.5">Upload Date</th>
            <th className="px-6 py-4.5 text-center">Score</th>
            <th className="px-6 py-4.5 text-center">Severity</th>
            <th className="px-6 py-4.5 text-center">Violations</th>
            <th className="px-6 py-4.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {items.map((item) => {
            const formattedDate = new Date(item.uploadDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <tr
                key={item.id}
                className="group hover:bg-white/[0.02] transition-colors duration-200"
              >
                {/* Thumbnail */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex h-9 w-14 items-center justify-center rounded-lg border border-white/5 bg-black/40 overflow-hidden p-1">
                    {getMiniChartPreview(item.chart_info?.chart_type)}
                  </div>
                </td>
                
                {/* Filename */}
                <td className="px-6 py-4 font-semibold text-slate-200 max-w-[200px] truncate" title={item.filename}>
                  {item.filename}
                </td>

                {/* Upload Date */}
                <td className="whitespace-nowrap px-6 py-4 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{formattedDate}</span>
                  </div>
                </td>

                {/* Score */}
                <td className="whitespace-nowrap px-6 py-4 text-center font-bold text-white text-base">
                  {item.analysis.score}
                  <span className="text-[10px] text-slate-500 font-normal">/100</span>
                </td>

                {/* Severity */}
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <SeverityBadge severity={item.analysis.severity} />
                </td>

                {/* Violations Count */}
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1.5 font-bold text-slate-300">
                    {item.violations.length > 0 && (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500/80" />
                    )}
                    <span>{item.violations.length}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onDownloadPDF(item)}
                      className="flex h-8.5 px-3 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                      title="Download PDF Report"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </button>
                    <button
                      onClick={() => onViewDetails(item)}
                      className="flex h-8.5 px-3 items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white hover:opacity-90 hover:shadow-[0_2px_10px_rgba(139,92,246,0.2)] transition-all cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-all cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
