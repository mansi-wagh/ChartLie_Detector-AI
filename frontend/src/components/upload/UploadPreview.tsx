import { useState, useEffect } from "react";
import { Trash2, RefreshCw, FileImage } from "lucide-react";
import { motion } from "framer-motion";

interface UploadPreviewProps {
  file: File;
  onRemove: () => void;
  onReplace: () => void;
}

export default function UploadPreview({ file, onRemove, onReplace }: UploadPreviewProps) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  // Convert bytes to KB/MB
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex w-full flex-col gap-6 rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-5 backdrop-blur-md"
    >
      {/* File Image & Metadata container */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Thumbnail Preview */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border border-white/5 bg-black/40 sm:w-36">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded chart preview"
            className="h-full w-full object-contain"
          />
        </div>

        {/* File information metrics */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <FileImage className="h-4 w-4 text-violet-400 shrink-0" />
            <span className="truncate text-sm font-semibold tracking-tight">
              {file.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-400">
            <div>
              <span className="text-slate-500 font-medium">Size: </span>
              <span>{formatFileSize(file.size)}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Format: </span>
              <span className="uppercase">{file.type.split("/")[1]}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 font-medium">Dimensions: </span>
              <span>
                {dimensions ? `${dimensions.width} × ${dimensions.height} px` : "Loading dimensions..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 border-t border-white/5 pt-4">
        <button
          onClick={onReplace}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Replace Image</span>
        </button>

        <button
          onClick={onRemove}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 transition-all duration-200 hover:bg-red-500/20 hover:text-red-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Remove Chart</span>
        </button>
      </div>
    </motion.div>
  );
}