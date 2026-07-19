import { motion } from "framer-motion";
import { Upload, Cpu, BarChart2, CheckSquare } from "lucide-react";

export default function HowItWorksPipeline() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Chart",
      desc: "Drag and drop your chart image. Supports PNG, JPG, and JPEG files.",
    },
    {
      icon: Cpu,
      title: "VLM Inspection",
      desc: "AI Vision Core scans the layout pixels to locate axis start values, intervals, and angles.",
    },
    {
      icon: BarChart2,
      title: "Integrity Rules",
      desc: "Rule engines calculate bias scores by checking visual proportions against raw values.",
    },
    {
      icon: CheckSquare,
      title: "Export Fixes",
      desc: "Audit the visual logs, view correct recommendations, and export summary PDFs.",
    },
  ];

  return (
    <section className="mt-24 w-full relative">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Verification Pipeline
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          The four-step automated verification pipeline.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Outer Circular Badge */}
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0f0f15]/50 text-slate-400 group-hover:border-violet-500/50 group-hover:text-violet-400 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <Icon className="h-5 w-5" />
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-violet-500/0 group-hover:bg-violet-500/5 group-hover:scale-110 transition-all duration-300" />
              </div>

              <h3 className="text-sm font-semibold tracking-tight text-white group-hover:text-violet-300 transition-colors">
                {step.title}
              </h3>
              
              <p className="mt-2 text-xs leading-relaxed text-slate-400 max-w-[220px]">
                {step.desc}
              </p>

              {/* Connecting lines for desktop */}
              {idx < 3 && (
                <div className="absolute left-[calc(60%+20px)] top-[28px] hidden h-[1px] w-[calc(80%-20px)] bg-gradient-to-r from-white/10 to-transparent lg:block" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
