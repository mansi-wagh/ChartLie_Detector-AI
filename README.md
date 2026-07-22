# ChartLie Detector

**An AI-powered tool that catches misleading charts before they mislead you.**

Upload any chart image and get back a structured breakdown of exactly what's wrong with it — truncated axes, cherry-picked date ranges, 3D distortion, and more — along with a 0–100 deception score and a plain-English explanation of each problem.

---

## Why this exists

Misleading charts are everywhere — in news articles, corporate earnings calls, political ads. A bar chart with a Y-axis that starts at 80 instead of 0 can make a 2% change look like a 200% shift. Most people don't catch it, and that's exactly the point.

ChartLie Detector automates the fact-checking. It runs your chart through Google Gemini Vision, a deterministic rule engine grounded in the ACL 2026 Misviz Benchmark, and a LangChain explanation pipeline — then tells you in plain language what's deceptive and why.

---

## What you get from each analysis

- A **lie score** from 0 to 100 with a severity label (Honest → Deceptive)
- A list of every **violation detected**, with the specific rule it broke and how many points it cost
- A **natural language report** explaining the deception mechanics and how the chart could be fixed
- A **downloadable PDF** of the full audit trail
- A **history dashboard** of all past analyses with aggregate stats

---

## The 8 deception patterns it checks

These map directly to the Misviz benchmark taxonomy:

| Pattern | What it catches |
|---|---|
| **Truncated Y-axis** | Y-axis starts above zero, artificially amplifying small differences |
| **Inverted axis** | Reversed scale direction makes growth look like decline (or vice versa) |
| **Inconsistent scale intervals** | Non-uniform tick spacing distorts the slope of trends |
| **Cherry-picked data range** | A narrow time slice selected to support one narrative while hiding the bigger picture |
| **Misleading aspect ratio or area** | Stretched dimensions or radius-instead-of-area mapping skews proportional perception |
| **Dual-axis manipulation** | Two independent Y-scales overlaid to imply a false correlation |
| **Missing baseline** | No reference point makes it impossible to judge the scale of values |
| **Selective time range** | Key periods (like seasonal corrections) excluded to force an artificial trend |

### Severity scale

| Score | Label |
|---|---|
| 0 | Completely Honest |
| 1–30 | Slightly Misleading |
| 31–60 | Misleading |
| 61–80 | Very Misleading |
| 81–100 | Deceptive |

---

## How the pipeline works

1. **Upload** — you drop a PNG, JPG, or WEBP chart image into the React dashboard.
2. **Vision extraction** — Gemini 2.5 Flash reads the image and returns structured metadata: chart type, whether the Y-axis starts at zero, presence of dual axes, 3D effects, labels, source citations, and date range info. The output is validated against a Pydantic schema.
3. **Rule audit** — a deterministic Python engine runs all 8 checks against that metadata. Each rule is a pure function that either returns a violation or returns nothing.
4. **Scoring** — violations are summed by weight, capped at 100: `score = min(100, sum of violation weights)`.
5. **AI report** — a LangChain chain feeds the violations and score into a Gemini prompt that writes a clear, specific explanation of what's wrong and how to fix it.
6. **PDF export** — the full audit (metadata, violations, score, report) is compiled into a ReportLab PDF and saved to disk.
7. **Response** — the frontend receives a JSON payload and renders the score ring, violation cards, and report text.

---

## Tech stack

### Backend

| | |
|---|---|
| Python 3.11+ | Core language |
| FastAPI 0.139 | REST API |
| Uvicorn 0.50 | ASGI server |
| Google GenAI SDK | Gemini Vision + text generation |
| Pydantic 2.x | Schema validation |
| Pillow 12.x | Image processing |
| ReportLab | PDF generation |
| python-dotenv | Environment config |

### Frontend

| | |
|---|---|
| React 19 + TypeScript 6.0 | UI framework |
| Vite 8.1 | Build tool |
| TailwindCSS 4.x | Styling |
| TanStack Query 5.x | Server state |
| Recharts 3.x | Dashboard charts |
| Framer Motion 12.x | Animations |
| Axios 1.x | HTTP client |

---

## Getting started

### Prerequisites

- Python 3.11+
- Node.js 18+
- A Google Gemini API key (get one at aistudio.google.com)

### Backend

```bash
# Clone the repo
git clone https://github.com/your-username/ChartLie_Detector.git
cd ChartLie_Detector

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Add your API key
cp backend/.env.example backend/.env
# Open backend/.env and set GEMINI_API_KEY=your_key_here

# Start the server
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API runs at http://localhost:8000 — Swagger docs at http://localhost:8000/docs.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173.

### Docker (one command)

```bash
docker-compose up --build
```

---

## API reference

### POST /api/upload

Upload a chart image for analysis.

**Request:** multipart/form-data

| Field | Type | Description |
|---|---|---|
| `file` | File | PNG, JPG, or WEBP chart image |

**Response:** 200 OK

```json
{
  "chart_info": {
    "chart_type": "bar",
    "has_source": false,
    "y_axis_starts_at_zero": false,
    "has_3d_effects": false,
    "has_dual_axes": false
  },
  "violations": [
    {
      "rule": "Truncated Y-axis",
      "severity": "high",
      "description": "Y-axis begins at 80 instead of 0, which exaggerates the difference between bars."
    }
  ],
  "analysis": {
    "score": 45,
    "severity": "Misleading",
    "total_violations": 2
  },
  "report": "This bar chart exhibits two significant deceptive patterns...",
  "pdf_report": "reports/analysis_20260714_120000.pdf"
}
```

**Error codes**

| Code | Meaning |
|---|---|
| 400 | Invalid file format or corrupted image |
| 422 | Validation error |
| 500 | Internal server error (usually a Gemini API issue) |

---

## Project structure

```
ChartLie_Detector/
├── docker-compose.yml
├── requirements.txt
│
├── backend/
│   ├── .env                        ← Your API key goes here (gitignored)
│   ├── requirements.txt
│   ├── uploads/                    ← Uploaded images (gitignored)
│   ├── reports/                    ← Generated PDFs (gitignored)
│   └── app/
│       ├── main.py                 ← FastAPI entry point
│       ├── api/routes/
│       │   └── upload.py           ← Upload endpoint
│       ├── core/
│       │   ├── config.py
│       │   └── logging.py
│       ├── services/
│       │   ├── analysis_service.py ← Pipeline orchestrator
│       │   ├── vlm_service.py      ← Gemini Vision integration
│       │   ├── gemini_service.py
│       │   ├── image_validator.py
│       │   ├── report_service.py   ← PDF generation
│       │   └── cache_service.py    ← In-memory result cache
│       ├── models/
│       │   └── chart_info.py       ← Pydantic schema
│       ├── rules/
│       │   ├── rule_engine.py      ← Rule orchestrator
│       │   ├── truncated_axis.py
│       │   ├── dual_axis.py
│       │   ├── missing_baseline.py
│       │   ├── missing_labels.py
│       │   ├── missing_source.py
│       │   ├── inconsistent_scale.py
│       │   ├── three_d.py
│       │   └── wrong_chart_type.py
│       ├── scoring/
│       │   ├── score_engine.py
│       │   └── weights.py
│       └── langchain/
│           ├── explanation_chain.py
│           └── prompt_template.py
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── Home.tsx            ← Upload interface
        │   ├── Dashboard.tsx       ← Analytics overview
        │   ├── History.tsx         ← Past analyses
        │   └── Reports.tsx         ← PDF viewer
        ├── components/
        │   ├── layout/
        │   ├── upload/
        │   ├── dashboard/
        │   └── charts/
        └── services/               ← Axios API calls
```

---

## Adding a new rule

1. Create `backend/app/rules/your_rule.py`
2. Define `def check_your_rule(chart_info: Dict) -> Optional[Dict]` — return a violation dict or `None`
3. Register it in `rules/rule_engine.py`
4. Add its weight to `scoring/weights.py`

---

## Academic grounding

The eight deception categories and their definitions are drawn from the **Misviz Benchmark** (Tonglet et al., ACL 2026), which provides the first standardized taxonomy of misleading visualization behaviors. ChartLie Detector is one of the first open implementations that translates this benchmark into a production-grade application.

---

## License

MIT — see LICENSE for details.
