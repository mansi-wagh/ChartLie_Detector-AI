from typing import Dict, Any, List
from app.rules.truncated_axis import check_truncated_axis
from app.rules.missing_source import check_missing_source
from app.rules.dual_axis import check_dual_axis
from app.rules.wrong_chart_type import check_wrong_chart_type
from app.rules.three_d import check_three_d
from app.rules.inconsistent_scale import check_inconsistent_scale
from app.rules.missing_labels import check_missing_labels
from app.scoring.weights import RULE_WEIGHTS


def analyze_rules(chart_info: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Runs all rule audits on the extracted chart_info metadata.

    Args:
        chart_info: Extracted chart attributes.

    Returns:
        List of violation dictionaries detected by the rules, enriched with configured weights.
    """
    violations = []

    rules = [
        check_truncated_axis,
        check_missing_source,
        check_dual_axis,
        check_wrong_chart_type,
        check_three_d,
        check_inconsistent_scale,
        check_missing_labels
    ]

    for rule in rules:
        result = rule(chart_info)

        if result is not None:
            rule_name = result.get("rule")
            # Dynamically attach weight from RULE_WEIGHTS (default to 10 if not found)
            result["weight"] = RULE_WEIGHTS.get(rule_name, 10)
            violations.append(result)

    return violations