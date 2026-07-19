from pydantic import BaseModel


class ChartInfo(BaseModel):
    chart_type: str
    title: str
    x_axis_label: str
    y_axis_label: str
    y_axis_start: float
    y_axis_end: float
    has_source: bool
    has_labels: bool
    has_dual_axis: bool
    is_3d: bool
    intervals_uniform: bool