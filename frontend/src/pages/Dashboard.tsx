import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ScoreCard from "../components/dashboard/ScoreCard";
import ChartPreview from "../components/dashboard/ChartPreview";
import ViolationList from "../components/dashboard/ViolationList";
import ChartInfoCard from "../components/dashboard/ChartInfoCard";
import AIExplanation from "../components/dashboard/AIExplanation";
import SuggestionCard from "../components/dashboard/SuggestionCard";
import DownloadReport from "../components/dashboard/DownloadReport";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "../types";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract analysis results and raw file object from Router state
  const state = location.state as { result?: AnalysisResult; file?: File } | null;
  const result = state?.result;
  const file = state?.file || null;

  // Empty state fallback when accessed directly without uploading
  if (!result) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Analysis Data Found</h3>
          <p className="mt-1.5 max-w-sm text-sm text-slate-400 leading-relaxed">
            Upload a chart on the homepage first to audit visual representations and generate AI compliance scores.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
          >
            <span>Navigate to Upload</span>
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
              Audit Report Details
            </span>
            <h1 className="text-xl font-bold tracking-tight text-white mt-0.5">
              {result.filename || "Chart Analysis"}
            </h1>
          </div>
        </div>

        {/* Audit Dashboard Layout Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column (Stats & Visualizations) */}
          <div className="space-y-6 lg:col-span-4">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ScoreCard score={result.analysis.score} severity={result.analysis.severity} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <ChartPreview file={file} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <DownloadReport result={result} />
            </motion.div>
          </div>

          {/* Right Column (Explanations & Issue Logs) */}
          <div className="space-y-6 lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ChartInfoCard info={result.chart_info} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <ViolationList violations={result.violations} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <AIExplanation report={result.report} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <SuggestionCard violations={result.violations} />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}