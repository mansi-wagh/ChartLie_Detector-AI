import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";

export default function CTASection() {
  const handleScrollToUpload = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mt-24 mb-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 to-indigo-950/20 p-8 md:p-12 text-center shadow-[0_0_50px_rgba(139,92,246,0.08)]"
      >
        {/* Glow dots */}
        <div className="absolute -left-10 -top-10 -z-10 h-32 w-32 rounded-full bg-violet-600/20 blur-[50px]" />
        <div className="absolute -right-10 -bottom-10 -z-10 h-32 w-32 rounded-full bg-indigo-600/20 blur-[50px]" />

        <div className="mx-auto max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-bold text-violet-400 border border-violet-500/20 uppercase tracking-wider mb-4">
            <Sparkles className="h-3 w-3" />
            <span>Audit Ledger</span>
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Audit Your Charts Today
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Ensure data compliance, identify perspective biases, and export summary reports. Upload your charts to run the vision engines instantly.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleScrollToUpload}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5.5 py-3 text-xs font-bold text-white transition-all hover:shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:scale-[1.02] cursor-pointer"
            >
              <span>Verify Chart Now</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
