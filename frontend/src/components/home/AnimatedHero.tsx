import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnimatedHero() {
  return (
    <div className="relative mb-10 flex flex-col items-center text-center">
      {/* Background glowing mesh lights */}
      <div className="absolute top-0 -z-10 h-64 w-64 rounded-full bg-violet-600/10 blur-[90px] animate-pulse" />
      <div className="absolute top-10 -z-10 h-64 w-64 rounded-full bg-indigo-600/10 blur-[110px]" />

      {/* Modern status badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        <span>Audit Visual integrity in Real-Time</span>
        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-ping" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Detect Misleading Charts. <br />
        <span className="gradient-text">Expose Visual Lies Instantly.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg"
      >
        An enterprise-grade verification pipeline inspecting axes scales, dual alignments, and 3D visual tricks using AI.
      </motion.p>
    </div>
  );
}
