from typing import Dict, Any, Optional


def check_three_d(chart_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Detects if the chart uses a 3D perspective that distorts visual perception.

    Args:
        chart_info: Extracted chart attributes.

    Returns:
        Violation dictionary if 3D perspective is used, otherwise None.
    """
    if chart_info.get("is_3d", False):
        return {
            "rule": "3D Distortion",
            "severity": "Medium",
            "message": "3D perspective may distort visual perception."
        }
    return None

