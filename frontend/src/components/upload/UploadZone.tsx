import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={triggerInputClick}
      className={`group relative flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed transition-all duration-300 ${
        isDragActive
          ? "border-violet-500 bg-violet-500/5 shadow-[0_0_20px_rgba(139,92,246,0.15)] scale-[1.01]"
          : "border-white/10 bg-[#0f0f15]/50 backdrop-blur-md hover:border-violet-500/40 hover:bg-[#12121c]/60"
      }`}
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Icon Wrapper */}
      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 ${
        isDragActive 
          ? "border-violet-500 bg-violet-500/10 text-violet-400" 
          : "border-white/5 bg-white/5 text-slate-400 group-hover:border-violet-500/20 group-hover:bg-violet-500/5 group-hover:text-violet-400 group-hover:scale-110"
      }`}>
        <UploadCloud className="h-6 w-6" />
      </div>

      {/* Upload Details */}
      <h3 className="text-base font-semibold tracking-tight text-white">
        Drag & drop chart image
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        or click to search files
      </p>
      <div className="mt-4 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-[10px] font-medium tracking-wide text-slate-500 group-hover:border-violet-500/10 group-hover:bg-violet-500/5 group-hover:text-slate-400">
        PNG, JPG, or JPEG up to 10MB
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}