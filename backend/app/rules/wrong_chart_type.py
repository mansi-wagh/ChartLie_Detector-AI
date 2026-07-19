from typing import Dict, Any, Optional


def check_wrong_chart_type(chart_info: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Validates chart type selection against axis labels and title parameters.

    Args:
        chart_info: Extracted chart attributes.

    Returns:
        Violation dictionary if chart type is mismatched, otherwise None.
    """
    chart_type = chart_info.get("chart_type", "").lower()
    x_label = chart_info.get("x_axis_label", "").lower()
    title = chart_info.get("title", "").lower()

    categorical_keywords = {
        "country", "state", "name", "product", "category",
        "department", "gender", "item", "store", "company", "region"
    }
    temporal_keywords = {
        "trend", "over time", "growth", "timeline", "evolution",
        "forecast", "year", "month"
    }

    # Case 1: Inappropriate use of line chart
    if "line" in chart_type and any(kw in x_label for kw in categorical_keywords):
        return {
            "rule": "Wrong Chart Type",
            "severity": "Medium",
            "message": "Line chart used for unordered categories. "
                       "Line charts are designed for continuous or time-series data."
        }

    # Case 2: Inappropriate use of pie chart
    is_pie = "pie" in chart_type or "donut" in chart_type
    has_temporal_title = any(kw in title for kw in temporal_keywords)
    has_temporal_axis = any(kw in x_label for kw in temporal_keywords)

    if is_pie and (has_temporal_title or has_temporal_axis):
        return {
            "rule": "Wrong Chart Type",
            "severity": "Medium",
            "message": "Pie chart used for temporal trend data. "
                       "Line or bar charts are better suited to show changes over time."
        }


    return None
