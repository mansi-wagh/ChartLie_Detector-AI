from typing import Dict, Any, Optional


def check_missing_labels(chart_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Checks if the chart lacks labels, causing general data misrepresentation.

    Args:
        chart_info: Extracted chart attributes.

    Returns:
        Violation dictionary if labels are missing, otherwise None.
    """
    if not chart_info.get("has_labels", True):
        return {
            "rule": "Missing Labels",
            "severity": "Medium",
            "message": "Chart lacks proper labels, preventing validation of "
                       "actual scale magnitudes."
        }
    return None

