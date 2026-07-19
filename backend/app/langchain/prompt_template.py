# Simple string template — no external dependencies needed.

AUDIT_TEMPLATE = """
You are a data visualization expert.

Chart Analysis

Score: {score}

Severity: {severity}

Violations: {violations}

Generate:

1. Plain English Explanation

2. Why this is misleading

3. Suggested Fix

4. Educational Tip

Answer professionally.
"""


class _SimplePrompt:
    """Minimal prompt template — replaces langchain_core dependency."""

    def __init__(self, template: str):
        self._template = template

    def format(self, **kwargs) -> str:
        return self._template.format(**kwargs)


audit_prompt = _SimplePrompt(AUDIT_TEMPLATE)