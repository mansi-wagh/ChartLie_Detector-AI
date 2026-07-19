import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Eye, 
  AlertTriangle, 
  Calendar,
  FileJson,
  Activity,
  FileText
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { generateMockChartFile } from "../components/history/historyUtils";
import type { HistoryItem } from "../components/history/HistoryCard";
import SeverityBadge from "../components/dashboard/SeverityBadge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

export default function Reports() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load audit logs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("chart_history");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out legacy mock data items
          const filtered = parsed.filter(
            (item: any) => !["hist_1", "hist_2", "hist_3", "hist_4"].includes(item.id)
          );
          setHistory(filtered);
        } else {
          setHistory([]);
        }
      } catch {
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, []);

  // Compute aggregated KPI metrics
  const stats = useMemo(() => {
    const total = history.length;
    if (total === 0) {
      return { total: 0, avgScore: 0, totalViolations: 0, commonRule: "None" };
    }

    const sumScore = history.reduce((acc, item) => acc + item.analysis.score, 0);
    const avgScore = Math.round(sumScore / total);

    const totalViolations = history.reduce((acc, item) => acc + item.violations.length, 0);

    // Find the most frequent violation rule
    const ruleCounts: Record<string, number> = {};
    history.forEach((item) => {
      item.violations.forEach((v) => {
        ruleCounts[v.rule] = (ruleCounts[v.rule] || 0) + 1;
      });
    });

    let commonRule = "None";
    let maxCount = 0;
    Object.entries(ruleCounts).forEach(([rule, count]) => {
      if (count > maxCount) {
        maxCount = count;
        commonRule = rule;
      }
    });

    return { total, avgScore, totalViolations, commonRule };
  }, [history]);

  // Compute severity distribution data for Recharts Pie Chart
  const severityData = useMemo(() => {
    const counts = { HONEST: 0, SUSPICIOUS: 0, MISLEADING: 0, DECEPTIVE: 0 };
    history.forEach((item) => {
      const sev = item.analysis.severity;
      if (counts[sev] !== undefined) {
        counts[sev]++;
      }
    });

    return [
      { name: "Honest", value: counts.HONEST, color: "#10b981" },
      { name: "Suspicious", value: counts.SUSPICIOUS, color: "#f59e0b" },
      { name: "Misleading", value: counts.MISLEADING, color: "#f97316" },
      { name: "Deceptive", value: counts.DECEPTIVE, color: "#ef4444" }
    ].filter(d => d.value > 0);
  }, [history]);

  // Compute top violation rules for Recharts Bar Chart
  const violationsData = useMemo(() => {
    const ruleCounts: Record<string, number> = {};
    history.forEach((item) => {
      item.violations.forEach((v) => {
        ruleCounts[v.rule] = (ruleCounts[v.rule] || 0) + 1;
      });
    });

    return Object.entries(ruleCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [history]);

  // Compute historic score trend for Area Chart
  const trendData = useMemo(() => {
    return [...history]
      .sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime())
      .map((item) => ({
        date: new Date(item.uploadDate).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        score: item.analysis.score,
        name: item.filename
      }));
  }, [history]);

  const handleViewDetails = (item: HistoryItem) => {
    const file = generateMockChartFile(item.filename, item.chart_info?.chart_type);
    navigate("/dashboard", { state: { result: item, file } });
  };

  const handleDownloadPDF = (item: HistoryItem) => {
    const pdfFilename = item.pdf_report ? item.pdf_report.replace(/^.*[\\/]/, "") : `${item.filename}.pdf`;
    const reportUrl = `/api/reports/${pdfFilename}`;
    const link = document.createElement("a");
    link.href = reportUrl;
    link.target = "_blank";
    link.download = pdfFilename;
    document.body.appendChild(link);
    fetch(reportUrl, { method: "HEAD" })
      .then((res) => (res.ok ? link.click() : window.print()))
      .catch(() => window.print())
      .finally(() => link.remove());
  };

  const handleDownloadJSON = (item: HistoryItem) => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `chartlie_audit_${item.filename || "report"}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Failed to download JSON:", err);
    }
  };

  // Custom tooltips to match OpenAI/Linear glassmorphic visual system
  const CustomAreaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel rounded-xl border border-white/10 bg-[#0f0f15]/95 p-3 shadow-2xl text-xs space-y-1">
          <p className="font-bold text-white max-w-[180px] truncate">{payload[0].payload.name}</p>
          <p className="text-slate-400">Date: <span className="text-slate-200 font-semibold">{payload[0].payload.date}</span></p>
          <p className="text-violet-400 font-semibold flex items-center gap-1">
            Lie Score: <span className="text-white font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel rounded-xl border border-white/10 bg-[#0f0f15]/95 p-3 shadow-2xl text-xs">
          <p className="font-bold text-white max-w-[200px] truncate">{payload[0].name}</p>
          <p className="text-slate-400 mt-1">Occurrences: <span className="text-violet-400 font-bold">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Title Section */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span>Compliance Reporting Center</span>
          </span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">Compliance Analytics</h1>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
            Examine audit volumes, track severity trends, and review standard compliance statistics across visual datasets.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Charts Audited",
              value: stats.total,
              desc: "Cumulative files analyzed",
              icon: FileText,
              color: "text-violet-400"
            },
            {
              title: "Average Lie Score",
              value: `${stats.avgScore}/100`,
              desc: "Aggregated visual trust rating",
              icon: TrendingUp,
              color: stats.avgScore >= 70 ? "text-emerald-400" : stats.avgScore >= 40 ? "text-orange-400" : "text-red-400"
            },
            {
              title: "Total Rule Violations",
              value: stats.totalViolations,
              desc: "Identified deceptive visual tricks",
              icon: AlertTriangle,
              color: "text-amber-400"
            },
            {
              title: "Primary Violation Type",
              value: stats.commonRule.length > 22 ? stats.commonRule.substring(0, 20) + "..." : stats.commonRule,
              desc: "Highest recurring scale violation",
              icon: BarChart3,
              color: "text-indigo-400",
              tooltip: stats.commonRule
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-panel rounded-2xl p-5 flex flex-col justify-between h-32 border border-white/8 bg-[#0f0f15]/30"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <card.icon className={`h-4.5 w-4.5 ${card.color}`} />
              </div>
              <div className="mt-1">
                <span className="text-xl font-bold text-white tracking-tight" title={card.tooltip}>
                  {card.value}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        {history.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-12">
            {/* Historical Trend (Area Chart) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#0f0f15]/30 md:col-span-8 space-y-4"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-violet-400" />
                <span>Audited Chart Lie Score Trend</span>
              </h3>
              <div className="h-60 w-full pr-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      domain={[0, 100]} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip content={<CustomAreaTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8b5cf6" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Severity Distribution (Pie Chart) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#0f0f15]/30 md:col-span-4 flex flex-col justify-between"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                <PieIcon className="h-3.5 w-3.5 text-violet-400" />
                <span>Severity Distribution</span>
              </h3>
              <div className="relative h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: "#0f0f15", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
                      itemStyle={{ color: "#fff", fontSize: "11px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-white">{stats.total}</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Total Audits</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-4">
                {severityData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="font-medium truncate">{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Common Violation Types (Bar Chart) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#0f0f15]/30 md:col-span-12 space-y-4"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-violet-400" />
                <span>Frequently Detected Graphic Violations</span>
              </h3>
              {violationsData.length > 0 ? (
                <div className="h-56 pr-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={violationsData} layout="vertical" margin={{ left: 10, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                      <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#94a3b8" 
                        fontSize={9} 
                        tickLine={false} 
                        axisLine={false} 
                        width={130}
                      />
                      <Tooltip content={<CustomBarTooltip />} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={16}>
                        {violationsData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8b5cf6" : "#6366f1"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-36 items-center justify-center text-xs text-slate-500">
                  No visual violations detected in history.
                </div>
              )}
            </motion.div>
          </div>
        ) : null}

        {/* Recent Audits Table Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-violet-400" />
            <span>Recent Audits Ledger</span>
          </h3>
          <div className="w-full overflow-x-auto rounded-2xl border border-white/8 bg-[#0f0f15]/30 backdrop-blur-md">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">Audit Date</th>
                  <th className="px-6 py-4 text-center">Severity</th>
                  <th className="px-6 py-4 text-center">Lie Score</th>
                  <th className="px-6 py-4 text-center">Violations</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.slice(0, 5).map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.015] transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-slate-200 max-w-[200px] truncate" title={item.filename}>
                      {item.filename}
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-500" />
                        <span>
                          {new Date(item.uploadDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="inline-flex justify-center">
                        <SeverityBadge severity={item.analysis.severity} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-200">
                      {item.analysis.score}
                      <span className="text-[10px] text-slate-500 font-normal">/100</span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-300">
                      {item.violations.length}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownloadPDF(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                          title="Save PDF Summary"
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDownloadJSON(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                          title="Export Raw JSON"
                        >
                          <FileJson className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="flex h-8 px-2.5 items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white hover:opacity-90 hover:shadow-[0_2px_8px_rgba(139,92,246,0.2)] transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Details</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-xs text-slate-500">
                      No compliance reports available. Upload charts to populate data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
