import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUpload from "../../hooks/useUpload";
import UploadZone from "./UploadZone";
import UploadPreview from "./UploadPreview";
import UploadProgress from "./UploadProgress";
import AnalyzeButton from "./AnalyzeButton";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadCard() {
  const navigate = useNavigate();
  const {
    file,
    loading,
    progress,
    stage,
    error,
    result,
    selectFile,
    removeFile,
    startAnalysis
  } = useUpload();

  // Navigate to Dashboard and save to history when analysis completes successfully
  useEffect(() => {
    if (result) {
      const stored = localStorage.getItem("chart_history");
      let historyList = [];
      if (stored) {
        try {
          historyList = JSON.parse(stored);
        } catch {
          historyList = [];
        }
      }
      
      const newId = `hist_${Date.now()}`;
      const newHistoryItem = {
        id: newId,
        uploadDate: new Date().toISOString(),
        ...result
      };
      
      historyList.unshift(newHistoryItem);
      localStorage.setItem("chart_history", JSON.stringify(historyList));

      navigate("/dashboard", { state: { result: newHistoryItem, file } });
    }
  }, [result, file, navigate]);

  return (
    <div className="mx-auto max-w-xl w-full">
      <AnimatePresence mode="wait">
        {loading ? (
          <UploadProgress key="progress" progress={progress} stage={stage} />
        ) : !file ? (
          <UploadZone key="zone" onFileSelect={selectFile} />
        ) : (
          <div key="preview" className="space-y-4">
            <UploadPreview
              file={file}
              onRemove={removeFile}
              onReplace={removeFile}
            />
            
            <AnalyzeButton
              onClick={startAnalysis}
              disabled={!file}
              loading={loading}
              success={!!result}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Error Announcement */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400"
        >
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <div>
            <h5 className="font-semibold text-red-300">Analysis Error</h5>
            <p className="mt-0.5 leading-relaxed text-red-400/90">{error}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}