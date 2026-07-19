import { motion } from "framer-motion";
import { Download, Eye, Trash2, AlertTriangle, Calendar } from "lucide-react";
import SeverityBadge from "../dashboard/SeverityBadge";
import type { AnalysisResult } from "../../types";

export interface HistoryItem extends AnalysisResult {
  id: string;
  uploadDate: string;
}

interface HistoryCardProps {
  item: HistoryItem;
  onViewDetails: (item: HistoryItem) => void;
  onDownloadPDF: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export default function HistoryCard({
  item,
  onViewDetails,
  onDownloadPDF,
  onDelete,
}: HistoryCardProps) {
  const formattedDate = new Date(item.uploadDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getMiniChartPreview = () => {
    const isLine = item.chart_info?.chart_type?.toLowerCase().includes("line");
    return (
      <svg className="h-full w-full opacity-60" viewBox="0 0 100 50">
        <defs>
          <linearGradient id="cardGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 10 40 L 90 40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {isLine ? (
          <>
            <path
              d="M 10 35 Q 30 15 50 28 T 90 10"
              fill="url(#cardGlow)"
              stroke="transparent"
            />
            <path
              d="M 10 35 Q 30 15 50 28 T 90 10"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
            />
          </>
        ) : (
          <g fill="#8b5cf6" opacity="0.8">
            <rect x="15" y="25" width="8" height="15" rx="1.5" />
            <rect x="30" y="15" width="8" height="25" rx="1.5" />
            <rect x="45" y="20" width="8" height="20" rx="1.5" />
            <rect x="60" y="10" width="8" height="30" rx="1.5" fill="#6366f1" />
            <rect x="75" y="18" width="8" height="22" rx="1.5" fill="#6366f1" />
          </g>
        )}
      </svg>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="glass-panel glass-panel-hover overflow-hidden rounded-2xl flex flex-col h-full border border-white/10 bg-[#0f0f15]/30"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full border-b border-white/5 bg-black/40 flex items-center justify-center p-4">
        {getMiniChartPreview()}
        <div className="absolute top-2 left-2 rounded-lg bg-black/50 px-2 py-0.5 text-[9px] font-bold text-slate-400 border border-white/5 uppercase">
          {item.chart_info?.chart_type || "Chart"}
        </div>
        <div className="absolute top-2 right-2">
          <SeverityBadge severity={item.analysis.severity} />
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-bold text-slate-200 text-sm truncate mb-1" title={item.filename}>
          {item.filename}
        </h4>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3.5">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          <span>{formattedDate}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-white/[0.02] rounded-xl border border-white/5 p-3 mb-4 mt-auto">
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase">Lie Score</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {item.analysis.score}
              <span className="text-slate-500 text-xs font-normal">/100</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-500/80" />
              <span>Violations</span>
            </div>
            <div className="text-lg font-bold text-white mt-0.5">
              {item.violations.length}
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-3.5">
          <button
            onClick={() => onDelete(item.id)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-all cursor-pointer"
            title="Delete Audit"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
          
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => onDownloadPDF(item)}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all text-xs font-semibold cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => onViewDetails(item)}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 hover:shadow-[0_2px_10px_rgba(139,92,246,0.2)] transition-all text-xs font-semibold cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
