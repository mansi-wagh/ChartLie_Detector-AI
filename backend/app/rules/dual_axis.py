from typing import Dict, Any, Optional


def check_dual_axis(chart_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Detects if the chart uses dual axes, which can mislead comparisons.

    Args:
        chart_info: Extracted chart attributes.

    Returns:
        Violation dictionary if dual axes exist, otherwise None.
    """
    if chart_info.get("has_dual_axis", False):
        return {
            "rule": "Dual Y-axis",
            "severity": "High",
            "message": "Chart uses dual axes that may mislead comparisons."
        }
    return None

