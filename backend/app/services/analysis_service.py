"""
Analysis service — orchestrates the full chart analysis pipeline.

API usage per upload:
  Step 1 — Gemini Vision  (1 API call  → vlm_service)
  Step 4 — Gemini Report  (1 API call  → explanation_chain)
  Total   — 2 Gemini calls per upload
"""

from app.services.vlm_service import analyze_chart
from app.rules.rule_engine import analyze_rules
from app.scoring.score_engine import calculate_score
from app.langchain.explanation_chain import generate_report
from app.services.report_service import generate_pdf_report
from app.core.logging import logger


def analyze_image(image_path: str, mime_type: str, filename: str) -> dict:
    """
    Run the full analysis pipeline on an uploaded chart image.

    Args:
        image_path: Absolute path to the saved image file.
        mime_type:  MIME type, e.g. "image/png".
        filename:   Base filename (no extension) used for the PDF report name.

    Returns:
        Dict with chart_info, violations, analysis, report, and pdf_report.
    """
    logger.info(f"[Analysis] Starting pipeline for: {image_path}")

    # Step 1: Gemini Vision — extract structured chart metadata (1 API call)
    chart_info = analyze_chart(image_path, mime_type)

    # Step 2: Rule Engine — detect misleading patterns (no API call)
    violations = analyze_rules(chart_info)
    logger.info(f"[Analysis] Violations detected: {len(violations)}")

    # Step 3: Scoring — calculate misleading score (no API call)
    analysis = calculate_score(violations)
    logger.info(f"[Analysis] Score: {analysis['score']} | Severity: {analysis['severity']}")

    # Step 4: Gemini Report — generate plain-English explanation (1 API call)
    report = generate_report(analysis["score"], analysis["severity"], violations)

    # Step 5: PDF — build downloadable report (no API call)
    pdf_path = generate_pdf_report(
        filename=filename,
        chart_info=chart_info,
        analysis=analysis,
        violations=violations,
        report=report
    )

    return {
        "chart_info": chart_info,
        "violations": violations,
        "analysis": analysis,
        "report": report,
        "pdf_report": pdf_path
    }