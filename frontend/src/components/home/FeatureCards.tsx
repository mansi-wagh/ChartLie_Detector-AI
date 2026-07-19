import { motion } from "framer-motion";
import { Eye, ShieldCheck, Brain, FileText } from "lucide-react";

export default function FeatureCards() {
  const list = [
    {
      icon: Eye,
      title: "Vision AI Engine",
      desc: "Pixel-level scanning audits visual scales, labeling densities, and origin coordinates directly from chart images.",
      glow: "hover:border-violet-500/35 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    },
    {
      icon: ShieldCheck,
      title: "Rule Scoring Engine",
      desc: "Checks data mappings against strict visualization guidelines to compute an objective misleading index.",
      glow: "hover:border-indigo-500/35 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    },
    {
      icon: Brain,
      title: "Explainable AI Logs",
      desc: "Delivers deep textual breakdowns detailing why specific mappings skew data interpretations.",
      glow: "hover:border-pink-500/35 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    },
    {
      icon: FileText,
      title: "Enterprise Reports",
      desc: "Generates professional summary PDF audits to download and share with research and compliance teams.",
      glow: "hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    },
  ];

  return (
    <section className="mt-20 w-full relative">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Core Audit Capabilities
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Automate chart validation using pixel-level deep inspection and strict rules.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel flex flex-col rounded-2xl p-6 text-left transition-all duration-300 ${feat.glow}`}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 border border-white/10 group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-white">
                {feat.title}
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                {feat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
