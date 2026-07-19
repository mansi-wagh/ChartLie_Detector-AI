import ViolationCard from "./ViolationCard";
import { ShieldCheck } from "lucide-react";
import type { Violation } from "../../types";

interface ViolationListProps {
  violations: Violation[];
}

export default function ViolationList({ violations }: ViolationListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-white">
          Detected Violations ({violations.length})
        </h3>
        {violations.length > 0 && (
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
            Issue Log
          </span>
        )}
      </div>

      {violations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center backdrop-blur-md">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-semibold text-white">All Clear</h4>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-400">
            No visual manipulations or statistical distortions were flagged in this chart. The visual mapping is standard and honest.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {violations.map((violation, index) => (
            <ViolationCard key={`${violation.rule}-${index}`} violation={violation} />
          ))}
        </div>
      )}
    </div>
  );
}
