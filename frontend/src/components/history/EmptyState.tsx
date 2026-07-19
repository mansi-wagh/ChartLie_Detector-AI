import { useNavigate } from "react-router-dom";
import { Database, Plus } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showActionButton?: boolean;
}

export default function EmptyState({
  title = "No Analysis History Found",
  description = "Start by uploading and verifying your first chart to generate compliance reports.",
  showActionButton = true,
}: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0f0f15]/30 p-8 text-center backdrop-blur-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
        <Database className="h-6 w-6 text-violet-400" />
      </div>
      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
      {showActionButton && (
        <button
          onClick={() => navigate("/")}
          className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Verify New Chart</span>
        </button>
      )}
    </div>
  );
}
