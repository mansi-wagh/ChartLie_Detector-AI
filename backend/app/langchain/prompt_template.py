AUDIT_TEMPLATE = """
You are a data visualization auditor. Be concise.

Score: {score} | Severity: {severity}
Violations: {violations}

Respond in this exact format (keep each section to 2-3 sentences max):

**What's Wrong:** Briefly state the issues found.

**Why It Matters:** One line on how it misleads viewers.

**How to Fix:** Concrete fix in 1-2 bullet points.

If no violations are critical, state the chart is mostly fair.
Do NOT use markdown headers. Keep total response under 150 words.
"""


class _SimplePrompt:
    """Formats string templates with named parameters."""

    def __init__(self, template: str):
        self._template = template

    def format(self, **kwargs) -> str:
        return self._template.format(**kwargs)


audit_prompt = _SimplePrompt(AUDIT_TEMPLATE)