import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#07070a] px-6 py-12 text-xs text-slate-500 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-10 text-left">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600">
                <ShieldCheck className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-sans text-sm font-bold text-white tracking-tight">
                ChartLieDetector <span className="text-[10px] text-violet-400 font-medium">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Analyzing chart data scales, axis truncation, and visual perspective tricks using advanced VLM engines.
            </p>
            {/* Status indicator */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-0.8 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-tight">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-slate-300 transition-colors">Verify Chart</Link></li>
              <li><Link to="/dashboard" className="hover:text-slate-300 transition-colors">Audit Dashboard</Link></li>
              <li><Link to="/history" className="hover:text-slate-300 transition-colors">Analysis History</Link></li>
              <li><Link to="/settings" className="hover:text-slate-300 transition-colors">Preferences</Link></li>
            </ul>
          </div>

          {/* Resources links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-tight">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-slate-300 transition-colors">AI VLM Models</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Rule Specs</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">API Guide</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white tracking-tight">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-slate-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/5 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-slate-500">
          <span>© {currentYear} ChartLieDetector AI. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Github</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}