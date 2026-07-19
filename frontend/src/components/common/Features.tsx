import { motion } from "framer-motion";
import { Eye, ShieldCheck, Cpu, FileText } from "lucide-react";

export default function Features() {
  const list = [
    {
      icon: Eye,
      title: "Gemini AI",
      desc: "Pixel-level scanning audits visual scales, labeling densities, and origin coordinates directly from chart images."
    },
    {
      icon: ShieldCheck,
      title: "Rule Scoring Engine",
      desc: "Checks data mappings against strict visualization guidelines to compute an objective misleading index."
    },
    {
      icon: Cpu,
      title: "Explainable AI Logs",
      desc: "Delivers deep textual breakdowns detailing why specific mappings skew data interpretations."
    },
    {
      icon: FileText,
      title: "Enterprise Reports",
      desc: "Generates professional summary PDF audits to download and share with research and compliance teams."
    }
  ];

  return (
    <section className="mt-20 w-full">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Audit Engine Capabilities
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Automate visual integrity verification using structured rule checks.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover flex flex-col rounded-2xl p-5 text-left"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-white">
                {feat.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {feat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
