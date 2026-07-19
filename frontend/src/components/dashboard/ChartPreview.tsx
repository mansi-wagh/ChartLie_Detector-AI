import { useState, useEffect } from "react";
import { Maximize2, Image as ImageIcon } from "lucide-react";

interface ChartPreviewProps {
  file: File | null;
}

export default function ChartPreview({ file }: ChartPreviewProps) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-violet-400" />
          <span>Uploaded Chart Image</span>
        </h3>
        <span className="text-[10px] font-semibold text-slate-500 uppercase">
          Source Preview
        </span>
      </div>

      <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-black/40">
        {src ? (
          <img
            src={src}
            alt="Audited chart"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <ImageIcon className="h-8 w-8 animate-pulse" />
            <span className="text-xs">No chart preview available</span>
          </div>
        )}

        {/* Hover zoom banner info */}
        {src && (
          <div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
