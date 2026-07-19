VISION_PROMPT = """
You are an expert in chart understanding.

Analyze the uploaded chart.

Return ONLY valid JSON.

Schema:

{
    "chart_type": "",
    "title": "",
    "x_axis_label": "",
    "y_axis_label": "",
    "y_axis_start": 0,
    "y_axis_end": 0,
    "has_source": false,
    "has_labels": true,
    "has_dual_axis": false,
    "is_3d": false,
    "intervals_uniform": true
}

Do not explain.

Do not use markdown.

Return JSON only.
"""