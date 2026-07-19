def calculate_score(violations):
    score = sum(v["weight"] for v in violations)
    score = min(score, 100)

    if score <= 20:
        severity = "HONEST"

    elif score <= 50:
        severity = "SUSPICIOUS"

    elif score <= 75:
        severity = "MISLEADING"

    else:
        severity = "DECEPTIVE"

    return {
        "score": score,
        "severity": severity
    }