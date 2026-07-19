import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative mb-12 flex flex-col items-center text-center">
      {/* Background glowing mesh lights */}
      <div className="absolute top-0 -z-10 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px] animate-pulse" />
      <div className="absolute top-10 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* Vercel-style status badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        <span>Audit Visual Integrity in Real-Time</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Detect Misleading Charts. <br />
        <span className="gradient-text">Expose Visual Lies Instantly.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg"
      >
        Enterprise-grade AI solution that inspects, scores, and details visual distortions, truncated axes, and statistical biases in charts.
      </motion.p>
    </div>
  );
}
