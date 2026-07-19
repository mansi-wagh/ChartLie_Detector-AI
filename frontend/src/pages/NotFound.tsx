import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, History, Home } from "lucide-react";
import Layout from "../components/layout/Layout";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* 404 Center Pane */}
      <div className="relative flex min-h-[65vh] flex-col items-center justify-center text-center overflow-hidden">
        {/* Animated backdrop glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[100px]"
          />
        </div>

        {/* 404 Visual Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        >
          <ShieldAlert className="h-7 w-7 text-violet-400" />
        </motion.div>

        {/* Big Code Text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-7xl font-extrabold tracking-tighter text-white"
        >
          404
        </motion.h1>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-3 text-lg font-bold text-slate-200 tracking-tight"
        >
          Destination Out of Bounds
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-2 max-w-sm text-xs leading-relaxed text-slate-400"
        >
          The page or asset ledger directory you are seeking does not exist or has been relocated within our system configuration.
        </motion.p>

        {/* Quick Actions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>

          {/* Home button */}
          <button
            onClick={() => navigate("/")}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:opacity-95 hover:shadow-[0_4px_15px_rgba(139,92,246,0.25)] transition-all cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Return to Verify</span>
          </button>

          {/* History button */}
          <button
            onClick={() => navigate("/history")}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <History className="h-4 w-4" />
            <span>Check Ledger</span>
          </button>
        </motion.div>
      </div>
    </Layout>
  );
}
