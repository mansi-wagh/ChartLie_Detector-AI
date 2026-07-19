import { useState, useEffect } from "react";
import { Settings as SettingsIcon, ShieldCheck, Database, Sliders, Info, Trash2, Server, Key } from "lucide-react";
import Layout from "../components/layout/Layout";
import api from "../services/api";

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [backendUrl, setBackendUrl] = useState(() => localStorage.getItem("backend_url") || "/api");
  const [apiStatus, setApiStatus] = useState<"Checking" | "Online" | "Offline">("Checking");
  const [geminiStatus, setGeminiStatus] = useState<"Checking" | "Active" | "Offline">("Checking");
  const [saveStatus, setSaveStatus] = useState("");
  const [clearStatus, setClearStatus] = useState("");

  useEffect(() => {
    api.get("/health")
      .then(() => {
        setApiStatus("Online");
        setGeminiStatus("Active");
      })
      .catch(() => {
        api.get("/")
          .then(() => {
            setApiStatus("Online");
            setGeminiStatus("Active");
          })
          .catch(() => {
            setApiStatus("Offline");
            setGeminiStatus("Offline");
          });
      });
  }, [backendUrl]);

  const handleSaveURL = () => {
    localStorage.setItem("backend_url", backendUrl);
    setSaveStatus("Saved successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleClearCache = () => {
    localStorage.clear();
    setHistoryDefault();
    setClearStatus("Cache cleared successfully!");
    setTimeout(() => setClearStatus(""), 3000);
  };

  const setHistoryDefault = () => {
    setTheme("dark");
    setBackendUrl("/api");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <SettingsIcon className="h-3.5 w-3.5" />
            <span>Preferences Panel</span>
          </span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">Application Settings</h1>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
            Configure backend URL endpoints, select themes, verify AI connection statuses, and manage cached storage logs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column (Configurations) */}
          <div className="space-y-6">
            {/* Theme Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="h-4.5 w-4.5 text-violet-400" />
                <span>Appearance Theme</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {["dark", "light", "system"].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleThemeChange(t)}
                    className={`rounded-xl border py-2.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                      theme === t
                        ? "bg-violet-600/10 text-violet-400 border-violet-500/50"
                        : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Backend URL Configuration */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Server className="h-4.5 w-4.5 text-violet-400" />
                <span>Backend Configuration</span>
              </h3>
              <div className="space-y-3">
                <label className="text-[10px] font-semibold text-slate-500 uppercase">Base API Endpoint URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-[#0f0f15]/40 px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-violet-500/50"
                  />
                  <button
                    onClick={handleSaveURL}
                    className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>
                {saveStatus && <p className="text-[10px] text-emerald-400 font-semibold">{saveStatus}</p>}
              </div>
            </div>

            {/* Cache Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Trash2 className="h-4.5 w-4.5 text-red-400" />
                <span>Storage Cleanup</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Purge all audited chart history and reset the client-side system configurations back to default settings.
              </p>
              <button
                onClick={handleClearCache}
                className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition-all cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Cache & Reset Ledger</span>
              </button>
              {clearStatus && <p className="text-[10px] text-emerald-400 font-semibold">{clearStatus}</p>}
            </div>
          </div>

          {/* Right Column (Status & Info) */}
          <div className="space-y-6">
            {/* Health Checklist Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-violet-400" />
                <span>System Status</span>
              </h3>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-xs text-slate-400 flex items-center gap-2"><Database className="h-4 w-4" /> Backend Server</span>
                  <span className={`text-[10px] font-bold uppercase rounded-full px-2 py-0.5 ${
                    apiStatus === "Online" ? "bg-emerald-500/10 text-emerald-400" : apiStatus === "Offline" ? "bg-red-500/10 text-red-400" : "bg-slate-500/10 text-slate-400"
                  }`}>{apiStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-2"><Key className="h-4 w-4" /> AI Vision Core</span>
                  <span className={`text-[10px] font-bold uppercase rounded-full px-2 py-0.5 ${
                    geminiStatus === "Active" ? "bg-emerald-500/10 text-emerald-400" : geminiStatus === "Offline" ? "bg-red-500/10 text-red-400" : "bg-slate-500/10 text-slate-400"
                  }`}>{geminiStatus}</span>
                </div>
              </div>
            </div>

            {/* About Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-3.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Info className="h-4.5 w-4.5 text-violet-400" />
                <span>About ChartLieDetector</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ChartLieDetector AI leverages cutting-edge computer vision models alongside multi-rule checks to audit structural parameters in charts, detecting non-uniform scales, 3D visual projections, dual-axis contradictions, and general graph manipulation attempts.
              </p>
              <div className="border-t border-white/5 pt-3.5 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Version</span>
                <span className="text-[10px] font-bold text-slate-300">v1.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
