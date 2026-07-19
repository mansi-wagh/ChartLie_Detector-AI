import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { History as HistoryIcon } from "lucide-react";
import Layout from "../components/layout/Layout";
import SearchBar from "../components/history/SearchBar";
import HistoryFilters, { type SeverityFilter, type SortOption } from "../components/history/HistoryFilters";
import HistoryTable from "../components/history/HistoryTable";
import HistoryCard, { type HistoryItem } from "../components/history/HistoryCard";
import EmptyState from "../components/history/EmptyState";
import { generateMockChartFile } from "../components/history/historyUtils";

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("NEWEST");

  // Load from localStorage
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

  // Compute item counts matching search query
  const counts = useMemo(() => {
    const res: Record<SeverityFilter, number> = {
      ALL: 0,
      HONEST: 0,
      SUSPICIOUS: 0,
      MISLEADING: 0,
      DECEPTIVE: 0,
    };
    const searchFiltered = history.filter((item) =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    res.ALL = searchFiltered.length;
    searchFiltered.forEach((item) => {
      const sev = item.analysis.severity as Exclude<SeverityFilter, "ALL">;
      if (res[sev] !== undefined) {
        res[sev]++;
      }
    });
    return res;
  }, [history, searchQuery]);

  // Filter & Sort items
  const processedItems = useMemo(() => {
    let items = history.filter((item) =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (severityFilter !== "ALL") {
      items = items.filter((item) => item.analysis.severity === severityFilter);
    }

    return items.sort((a, b) => {
      if (sortOption === "NEWEST") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      if (sortOption === "OLDEST") return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      if (sortOption === "HIGHEST_SCORE") return b.analysis.score - a.analysis.score;
      if (sortOption === "LOWEST_SCORE") return a.analysis.score - b.analysis.score;
      return 0;
    });
  }, [history, searchQuery, severityFilter, sortOption]);

  const handleDelete = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("chart_history", JSON.stringify(updated));
  };

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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <HistoryIcon className="h-3.5 w-3.5" />
            <span>Audit History Ledger</span>
          </span>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">Analysis History</h1>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
            Review previously uploaded chart graphics, verify compliance logs, and export PDF summaries.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <HistoryFilters
            selectedSeverity={severityFilter}
            onSeverityChange={setSeverityFilter}
            selectedSort={sortOption}
            onSortChange={setSortOption}
            counts={counts}
          />
        </div>

        {processedItems.length === 0 ? (
          <EmptyState
            title={history.length === 0 ? "No Analysis History" : "No Matching Audits Found"}
            description={
              history.length === 0
                ? "Start by uploading and verifying your first chart to generate compliance reports."
                : "Try adjusting your filters or search keywords to find the audits you are looking for."
            }
            showActionButton={history.length === 0}
          />
        ) : (
          <>
            {/* Desktop Table Layout */}
            <div className="hidden md:block">
              <HistoryTable
                items={processedItems}
                onViewDetails={handleViewDetails}
                onDownloadPDF={handleDownloadPDF}
                onDelete={handleDelete}
              />
            </div>
            {/* Mobile Card Grid Layout */}
            <div className="grid gap-4 sm:grid-cols-2 md:hidden">
              {processedItems.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewDetails}
                  onDownloadPDF={handleDownloadPDF}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
