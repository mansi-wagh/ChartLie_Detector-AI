import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#07070a] px-6 py-6 text-xs text-slate-500 sm:px-8">
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600">
            <ShieldCheck className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-sans text-sm font-bold text-white tracking-tight">
            ChartLieDetector <span className="text-[10px] text-violet-400 font-medium">AI</span>
          </span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">Detect misleading charts with AI</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 text-slate-500">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            GitHub
          </a>
          <span>·</span>
          <span>© {currentYear} ChartLieDetector</span>
        </div>
      </div>
    </footer>
  );
}