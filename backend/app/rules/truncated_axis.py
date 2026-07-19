from typing import Dict, Any, Optional

def check_truncated_axis(chart_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Checks if the Y-axis baseline is truncated or missing (not starting from zero),
    which exaggerates differences.
    """
    chart_type = chart_info.get("chart_type", "").lower()
    y_start = chart_info.get("y_axis_start", 0.0)
    y_end = chart_info.get("y_axis_end", 0.0)

    if y_start > 0:
        is_bar = "bar" in chart_type
        y_range = y_end - y_start
        
        # Bar charts must start at 0. Line and other charts use a threshold ratio check.
        if is_bar:
            return {
                "rule": "Truncated Y-axis",
                "severity": "High",
                "message": f"Y-axis starts at {y_start} instead of 0."
            }
        elif y_range > 0 and (y_start / y_range) > 0.1:
            return {
                "rule": "Truncated Y-axis",
                "severity": "High",
                "message": "Y-axis does not start from zero which may exaggerate differences."
            }

    return None