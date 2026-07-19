import { Download, FileJson, FileText } from "lucide-react";
import type { AnalysisResult } from "../../types";

interface DownloadReportProps {
  result: AnalysisResult;
}

export default function DownloadReport({ result }: DownloadReportProps) {
  // Generate and download client-side JSON report
  const handleDownloadJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `chartlie_audit_${result.filename || "report"}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Failed to download JSON:", err);
    }
  };

  // Trigger PDF download from server (or fallback to window.print() print layout)
  const handleDownloadPDF = () => {
    // If pdf_report contains reports/file.pdf, map to proxy api route
    const pdfFilename = result.pdf_report ? result.pdf_report.replace(/^.*[\\/]/, "") : `${result.filename}.pdf`;
    
    // Attempt download of static report (if backend is running with a static serving setup)
    // and fallback to print view of the dashboard
    const printWindow = () => {
      window.print();
    };

    // Open report pdf in new tab or trigger save
    const reportUrl = `/api/reports/${pdfFilename}`;
    const link = document.createElement("a");
    link.href = reportUrl;
    link.target = "_blank";
    link.download = pdfFilename;
    document.body.appendChild(link);
    
    // We try to fetch the file to confirm it exists, if not, trigger local print layout
    fetch(reportUrl, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          link.click();
        } else {
          printWindow();
        }
      })
      .catch(() => {
        printWindow();
      })
      .finally(() => {
        link.remove();
      });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0f0f15]/40 p-5 backdrop-blur-md">
      <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
        <Download className="h-4.5 w-4.5 text-violet-400" />
        <span>Export Audit Report</span>
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* PDF Download Button */}
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-violet-500/20 bg-violet-500/10 py-3 text-xs font-semibold text-violet-400 transition-all duration-200 hover:bg-violet-500/20 hover:text-white"
        >
          <FileText className="h-4 w-4" />
          <span>Save PDF Summary</span>
        </button>

        {/* JSON Download Button */}
        <button
          onClick={handleDownloadJSON}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <FileJson className="h-4 w-4" />
          <span>Export Raw JSON</span>
        </button>
      </div>
    </div>
  );
}
