"""
Report service — builds a PDF report from the analysis results.

No API calls — pure local PDF generation via ReportLab.
"""

from pathlib import Path

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

# Absolute path anchored to this file's location: backend/reports/
BACKEND_DIR = Path(__file__).resolve().parents[2]
REPORT_DIR  = BACKEND_DIR / "reports"
REPORT_DIR.mkdir(parents=True, exist_ok=True)


def generate_pdf_report(
    filename: str,
    chart_info: dict,
    analysis: dict,
    violations: list,
    report: str
) -> str:
    """
    Build a PDF report and save it to the reports/ directory.

    Returns:
        Absolute path to the generated PDF file.
    """
    pdf_path = REPORT_DIR / f"{filename}.pdf"
    doc      = SimpleDocTemplate(str(pdf_path))
    styles   = getSampleStyleSheet()
    story    = []

    # Title
    story.append(Paragraph("<b>ChartLieDetector AI Report</b>", styles["Title"]))
    story.append(Spacer(1, 20))

    # Score & Severity
    story.append(Paragraph(f"<b>Misleading Score:</b> {analysis['score']}", styles["Heading2"]))
    story.append(Paragraph(f"<b>Severity:</b> {analysis['severity']}", styles["Heading2"]))
    story.append(Spacer(1, 20))

    # Chart metadata
    story.append(Paragraph("<b>Chart Information</b>", styles["Heading1"]))
    for key, value in chart_info.items():
        story.append(Paragraph(f"{key}: {value}", styles["BodyText"]))
    story.append(Spacer(1, 20))

    # Violations
    story.append(Paragraph("<b>Detected Violations</b>", styles["Heading1"]))
    if not violations:
        story.append(Paragraph("No misleading patterns detected.", styles["BodyText"]))
    else:
        for v in violations:
            story.append(Paragraph(
                f"<b>{v['rule']}</b><br/>"
                f"Severity: {v['severity']}<br/>"
                f"Weight: {v['weight']}<br/>"
                f"{v['message']}",
                styles["BodyText"]
            ))
            story.append(Spacer(1, 10))

    # AI Explanation
    story.append(Paragraph("<b>AI Explanation</b>", styles["Heading1"]))
    story.append(Paragraph(report.replace("\n", "<br/>"), styles["BodyText"]))

    doc.build(story)
    return str(pdf_path)