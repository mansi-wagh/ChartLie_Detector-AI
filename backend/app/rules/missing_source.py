def check_missing_source(chart_info):

    if not chart_info.get("has_source", False):
        return {
            "rule": "Missing Source",
            "severity": "Low",
            "message": "Chart does not mention the data source."
        }

    return None