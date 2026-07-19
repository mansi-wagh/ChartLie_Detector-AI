import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does the AI detect visual lies in charts?",
      answer: "We feed the uploaded chart image into our multimodal vision VLM to analyze coordinates and scale lines. The detected dimensions are fed into our rule engine, checking for truncated scales, perspective tilts, or dual-axis alignment mismatches that skew data visualization.",
    },
    {
      question: "What image formats are supported?",
      answer: "We support PNG, JPG, and JPEG images. For optimal results, ensure the chart text is clear and the entire graph is fully visible within the uploaded frame.",
    },
    {
      question: "How is the Misleading Score calculated?",
      answer: "The score ranges from 0 to 100, where 100 represents a completely honest chart. Points are subtracted based on the weights of the rules violated (e.g., dual-axis manipulation subtracts 40 points, truncated axes subtract 15-25 points).",
    },
    {
      question: "Is my upload history persistent and secure?",
      answer: "Yes, your previous audit history is persisted locally on your browser using localStorage. You can clear this cache at any time from the Settings screen.",
    },
  ];

  return (
    <section className="mt-24 w-full max-w-3xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Learn more about chart audits and AI compliance scoring.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 bg-[#0f0f15]/20 transition-all hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-200 transition-colors hover:text-white cursor-pointer"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400"
                >
                  <ChevronDown className="h-4.5 w-4.5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="border-t border-white/5 p-5 text-xs leading-relaxed text-slate-400 bg-white/[0.01]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
