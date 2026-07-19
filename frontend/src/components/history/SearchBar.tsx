import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search audited charts by filename...",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
        <Search className="h-4.5 w-4.5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#0f0f15]/40 py-3 pl-11 pr-10 text-sm text-slate-200 placeholder-slate-500 outline-none backdrop-blur-md transition-all focus:border-violet-500/50 focus:bg-[#0f0f15]/60 focus:ring-1 focus:ring-violet-500/50"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
