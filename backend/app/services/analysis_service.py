"""Orchestrates chart analysis across vision extraction, rule checking, scoring, and PDF export."""

from app.services.vlm_service import analyze_chart
from app.rules.rule_engine import analyze_rules
from app.scoring.score_engine import calculate_score
from app.langchain.explanation_chain import generate_report
from app.services.report_service import generate_pdf_report
from app.core.logging import logger


def analyze_image(image_path: str, mime_type: str, filename: str, api_key: str | None = None) -> dict:
    """Runs the chart analysis pipeline from image parsing to final PDF report."""
    logger.info(f"[Analysis] Starting pipeline for: {image_path}")

    # Extract chart metadata using Gemini Vision
    chart_info = analyze_chart(image_path, mime_type, api_key=api_key)

    # Run rule engine checks and calculate severity score
    violations = analyze_rules(chart_info)
    logger.info(f"[Analysis] Violations detected: {len(violations)}")

    analysis = calculate_score(violations)
    logger.info(f"[Analysis] Score: {analysis['score']} | Severity: {analysis['severity']}")

    # Generate plain-text report and generate PDF summary
    report = generate_report(analysis["score"], analysis["severity"], violations, api_key=api_key)

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