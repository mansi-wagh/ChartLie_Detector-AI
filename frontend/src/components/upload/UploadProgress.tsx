import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import type { UploadStage } from "../../hooks/useUpload";

interface UploadProgressProps {
  progress: number;
  stage: UploadStage;
}

export default function UploadProgress({ progress, stage }: UploadProgressProps) {
  const stages: { label: UploadStage; val: number }[] = [
    { label: "Uploading Image...", val: 20 },
    { label: "Analyzing Chart Layout...", val: 50 },
    { label: "Running Rule Engine...", val: 70 },
    { label: "Generating AI Report...", val: 85 },
    { label: "Preparing PDF...", val: 98 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full rounded-2xl border border-white/10 bg-[#0f0f15]/50 p-6 backdrop-blur-md"
    >
      {/* Header Info */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">Analyzing Chart</h4>
          <p className="text-xs text-slate-400">Processing visual elements...</p>
        </div>
        <span className="text-sm font-mono font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md">
          {progress}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="relative mb-8 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Stages List */}
      <div className="space-y-3.5">
        {stages.map((stg) => {
          const isComplete = progress > stg.val;
          const isActive = stage === stg.label;
          
          return (
            <div
              key={stg.label}
              className={`flex items-center justify-between text-xs transition-all duration-300 ${
                isActive 
                  ? "text-white font-medium scale-[1.01]" 
                  : isComplete 
                  ? "text-slate-400" 
                  : "text-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                {isComplete ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                ) : isActive ? (
                  <Loader2 className="h-4.5 w-4.5 text-violet-400 animate-spin shrink-0" />
                ) : (
                  <div className="h-4.5 w-4.5 rounded-full border-2 border-slate-700 shrink-0" />
                )}
                <span>{stg.label}</span>
              </div>
              
              {isActive && (
                <span className="text-[10px] font-medium text-violet-400 animate-pulse bg-violet-500/10 px-1.5 py-0.5 rounded">
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
