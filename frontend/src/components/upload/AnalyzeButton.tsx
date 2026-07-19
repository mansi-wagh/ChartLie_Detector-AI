import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  success: boolean;
}

export default function AnalyzeButton({ onClick, disabled, loading, success }: AnalyzeButtonProps) {
  return (
    <motion.button
      whileHover={disabled || loading || success ? {} : { scale: 1.01, translateY: -1 }}
      whileTap={disabled || loading || success ? {} : { scale: 0.99 }}
      onClick={onClick}
      disabled={disabled || loading || success}
      className={`relative flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 shadow-md ${
        success
          ? "bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20"
          : loading
          ? "bg-indigo-600/40 border border-indigo-500/20 cursor-not-allowed"
          : disabled
          ? "bg-white/5 border border-white/5 text-slate-500 cursor-not-allowed"
          : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 border border-violet-500/20 shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.4)]"
      }`}
    >
      {/* Backlight Glow effect */}
      {!disabled && !loading && !success && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 blur-md opacity-20 -z-10 animate-pulse" />
      )}

      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Analyzing Chart Elements...</span>
        </>
      ) : success ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <span>Analysis Successful!</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4 text-violet-300" />
          <span>Audit & Detect Deceptions</span>
        </>
      )}
    </motion.button>
  );
}