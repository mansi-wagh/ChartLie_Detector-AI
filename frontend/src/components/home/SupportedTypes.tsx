import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function SupportedTypes() {
  const types = [
    {
      title: "Truncated Y-Axis",
      desc: "Detects axis origins starting above zero, which visually exaggerates minor differences.",
    },
    {
      title: "Dual Axis Inconsistency",
      desc: "Audits dual axes to flag misaligned scales designed to force fake correlations.",
    },
    {
      title: "3D perspective Bias",
      desc: "Recognizes perspective distortions that warp relative slice/bar weights.",
    },
    {
      title: "Non-Uniform Intervals",
      desc: "Checks linear distances between markers for mathematical consistency.",
    },
    {
      title: "Scale Inversions",
      desc: "Exposes inverted scales designed to visually flip negative trends to positive ones.",
    },
    {
      title: "Missing Citations",
      desc: "Verifies the presence of verifiable data source labels in headers and footers.",
    },
  ];

  return (
    <section className="mt-24 w-full">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Supported Audit Violations
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Our VLM rule-engine tests visual elements against six primary integrity metrics.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((t, idx) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex items-start gap-4 rounded-xl border border-white/5 bg-[#0f0f15]/20 p-5 backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {t.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {t.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
