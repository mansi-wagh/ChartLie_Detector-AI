"""
Report service — builds a PDF report from the analysis results.

No API calls — pure local PDF generation via ReportLab.
"""

from pathlib import Path

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4

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
    doc      = SimpleDocTemplate(str(pdf_path), pagesize=A4)
    styles   = getSampleStyleSheet()
    story    = []

    # Title
    story.append(Paragraph("<b>ChartLieDetector — Audit Report</b>", styles["Title"]))
    story.append(Spacer(1, 12))

    # Score & Severity (key verdict at the top)
    score = analysis['score']
    severity = analysis['severity']
    story.append(Paragraph(
        f"<b>Verdict:</b> {severity} &nbsp;&nbsp;|&nbsp;&nbsp; <b>Score:</b> {score}/100",
        styles["Heading2"]
    ))
    story.append(Spacer(1, 12))

    # Key chart info only (not every field)
    key_fields = ["chart_type", "title", "y_axis_start", "y_axis_end"]
    info_data = [["Property", "Value"]]
    for key in key_fields:
        if key in chart_info:
            info_data.append([key.replace("_", " ").title(), str(chart_info[key])])

    if len(info_data) > 1:
        story.append(Paragraph("<b>Chart Summary</b>", styles["Heading3"]))
        info_table = Table(info_data, colWidths=[150, 300])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#333333")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.white]),
        ]))
        story.append(info_table)
        story.append(Spacer(1, 12))

    # Violations
    story.append(Paragraph("<b>Detected Violations</b>", styles["Heading3"]))
    if not violations:
        story.append(Paragraph("No misleading patterns detected. ✓", styles["BodyText"]))
    else:
        viol_data = [["Rule", "Severity", "Impact", "Details"]]
        for v in violations:
            viol_data.append([
                v['rule'],
                v['severity'],
                f"+{v['weight']} pts",
                v['message']
            ])
        viol_table = Table(viol_data, colWidths=[110, 60, 55, 225])
        viol_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#cc3333")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.white]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        story.append(viol_table)
    story.append(Spacer(1, 12))

    # AI Explanation (concise)
    story.append(Paragraph("<b>AI Analysis</b>", styles["Heading3"]))
    # Clean up markdown bold markers for PDF
    clean_report = report.replace("**", "<b>").replace("\n", "<br/>")
    # Fix unclosed bold tags (pairs of <b>)
    import re
    clean_report = re.sub(r'<b>(.*?)<b>', r'<b>\1</b>', clean_report)
    story.append(Paragraph(clean_report, styles["BodyText"]))

    doc.build(story)
    return str(pdf_path)