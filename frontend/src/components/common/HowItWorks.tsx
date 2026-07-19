import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Upload Chart",
      desc: "Drag & drop or select your chart image. The API supports standard JPG, JPEG, and PNG images."
    },
    {
      num: "02",
      title: "VLM Inspection",
      desc: "AI Core scans the layout pixels to identify axis origins, labels, and 3D proportions."
    },
    {
      num: "03",
      title: "Score Audits",
      desc: "The rule engine applies visualization integrity checks to calculate a misleading index."
    },
    {
      num: "04",
      title: "Export Fixes",
      desc: "Read the explainable AI audit details, view suggested fixes, and export the PDF report."
    }
  ];

  return (
    <section className="mt-24 w-full">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          How It Works
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          The four-step automated verification pipeline.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative flex flex-col items-start text-left"
          >
            {/* Step Number Badge */}
            <span className="text-4xl font-extrabold tracking-tight text-white/5 font-mono select-none">
              {step.num}
            </span>
            
            <h3 className="mt-2 text-sm font-semibold tracking-tight text-white">
              {step.title}
            </h3>
            
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {step.desc}
            </p>

            {/* Connecting lines for desktop viewports */}
            {idx < 3 && (
              <div className="absolute left-[calc(100%-10px)] top-[20px] hidden h-[1px] w-[calc(100%-20px)] bg-white/5 lg:block" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
