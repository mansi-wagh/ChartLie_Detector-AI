export interface Violation {
    rule: string;
    severity: string;
    weight: number;
    message: string;
}

export interface Analysis {
    score: number;
    severity: string;
}

export interface ChartInfo {
    chart_type: string;
    title: string;
    x_axis_label: string;
    y_axis_label: string;
    y_axis_start: number;
    y_axis_end: number;
    has_source: boolean;
    has_labels: boolean;
    has_dual_axis: boolean;
    is_3d: boolean;
    intervals_uniform: boolean;
}

export interface AnalysisResponse {
    chart_info: ChartInfo;
    violations: Violation[];
    analysis: Analysis;
    report: string;
    pdf_report: string;
}