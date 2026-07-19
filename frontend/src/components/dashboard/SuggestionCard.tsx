import { Lightbulb, CheckCircle2 } from "lucide-react";
import type { Violation } from "../../types";

interface SuggestionCardProps {
  violations: Violation[];
}

export default function SuggestionCard({ violations }: SuggestionCardProps) {
  // Derive suggested design fixes based on violation checklist
  const getSuggestions = () => {
    const fixes: string[] = [];

    const hasRule = (ruleName: string) => 
      violations.some((v) => v.rule.toLowerCase().includes(ruleName.toLowerCase()));

    if (hasRule("truncated")) {
      fixes.push("Recalibrate y-axis scaling: Adjust the origin to begin at exactly 0. Truncating the origin visualizes exaggerated differences.");
    }
    if (hasRule("source")) {
      fixes.push("Cite data origin: Add a visible legend label or footer link showing the source publisher and survey dates.");
    }
    if (hasRule("dual")) {
      fixes.push("Avoid dual axes if scale mappings mismatch: Use separate stacked charts side-by-side to display mismatched indices.");
    }
    if (hasRule("3d")) {
      fixes.push("Flatten 3D effects to 2D: Dimensional projections skew sector volumes and height perspectives (e.g., in pie charts).");
    }

    // Default suggestions when no violations exist or for others
    if (fixes.length === 0) {
      fixes.push("Maintain standard styling: Ensure typography contrasts, font sizing hierarchies, and grid borders remain clean.");
      fixes.push("Follow accessibility (WCAG): Use high-contrast color palettes suitable for colorblind readers.");
    }

    return fixes;
  };

  const suggestions = getSuggestions();

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-5 backdrop-blur-md">
      <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
        <Lightbulb className="h-4.5 w-4.5 text-yellow-400" />
        <span>Suggested Corrections</span>
      </h3>
      
      <p className="mt-1 text-xs text-slate-400">
        Review design guidelines to fix visual misrepresentations:
      </p>

      <div className="mt-4 space-y-3">
        {suggestions.map((fix, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{fix}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
