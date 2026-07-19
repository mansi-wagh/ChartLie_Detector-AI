import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      quote: "Before ChartLieDetector, checking reports for skewed axes was a manual, error-prone task. Now, our auditing team gets detailed visual integrity scores in seconds.",
      author: "Sarah Jenkins",
      role: "Director of Data Integrity",
      company: "Apex Research Lab",
    },
    {
      quote: "As data journalists, our credibility is built on precision. This platform flags misleading 3D perspectives and dual-axes scales that often pass peer reviews unnoticed.",
      author: "Marcus Chen",
      role: "Senior Data Editor",
      company: "The Chronicle Journal",
    },
    {
      quote: "We integrate this system inside our visual graphics workflow. It's incredibly straightforward and saves us from publishing distorted presentations that damage stakeholder trust.",
      author: "Elena Rostova",
      role: "VP of Quality Compliance",
      company: "Novis Financial Group",
    },
  ];

  return (
    <section className="mt-24 w-full">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Trusted by Data Professionals
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          How teams use ChartLieDetector AI to verify public visuals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r, idx) => (
          <motion.div
            key={r.author}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel rounded-2xl p-6 flex flex-col justify-between text-left hover:border-white/10 transition-colors"
          >
            <Quote className="h-6 w-6 text-violet-400/30 mb-4" />
            <p className="text-slate-300 text-xs italic leading-relaxed">
              "{r.quote}"
            </p>
            <div className="mt-6 border-t border-white/5 pt-4">
              <h4 className="text-xs font-bold text-white">{r.author}</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {r.role} at <span className="text-violet-400/90">{r.company}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
