from typing import Dict, Any, Optional


def check_inconsistent_scale(chart_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Checks if the axis tick intervals are non-uniform or inconsistent.

    Args:
        chart_info: Extracted chart attributes.

    Returns:
        Violation dictionary if intervals are not uniform, otherwise None.
    """
    if not chart_info.get("intervals_uniform", True):
        return {
            "rule": "Inconsistent Scale",
            "severity": "High",
            "message": "Axis intervals are inconsistent."
        }
    return None

