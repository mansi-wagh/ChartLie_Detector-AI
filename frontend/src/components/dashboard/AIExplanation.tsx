import { Sparkles, FileText } from "lucide-react";

interface AIExplanationProps {
  report: string;
}

export default function AIExplanation({ report }: AIExplanationProps) {
  // Simple layout parser for formatting raw report strings
  const formatReportText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      
      // Parse headings
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="mt-4 mb-2 text-sm font-bold text-white tracking-tight">
            {trimmed.replace(/^###\s*/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="mt-5 mb-2.5 text-base font-bold text-white tracking-tight">
            {trimmed.replace(/^##\s*/, "")}
          </h3>
        );
      }
      
      // Parse bullet lists
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs leading-relaxed text-slate-300 mt-1">
            {trimmed.substring(1).trim()}
          </li>
        );
      }
      
      // Spacer on double newlines
      if (trimmed === "") {
        return <div key={idx} className="h-3" />;
      }
      
      // Standard paragraph text
      return (
        <p key={idx} className="text-xs leading-relaxed text-slate-300 mt-1">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <span>Explainable AI Report Audit</span>
        </h3>
        <FileText className="h-4 w-4 text-slate-600" />
      </div>

      <div className="max-h-[300px] overflow-y-auto pr-2 text-slate-300 scrollbar">
        {formatReportText(report)}
      </div>
    </div>
  );
}
