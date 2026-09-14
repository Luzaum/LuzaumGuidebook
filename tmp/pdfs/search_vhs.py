import re
import sys
from pathlib import Path

import fitz

sys.stdout.reconfigure(encoding="utf-8", errors="replace")


ROOT = Path(r"C:\Users\luzau\OneDrive\Desktop\Livros")
PATTERN = re.compile(
    r"vertebral\s+heart|heart\s+vertebral|\bVHS\b|Buchanan(?:\s+and\s+B[uü]cheler)?",
    re.IGNORECASE,
)


def compact(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


for supplied in sys.argv[1:]:
    path = ROOT / supplied
    print(f"\n### {path.name}", flush=True)
    try:
        reader = fitz.open(path)
    except Exception as exc:
        print(f"OPEN_ERROR: {exc}", flush=True)
        continue
    print(f"PAGES: {reader.page_count}", flush=True)
    for index, page in enumerate(reader):
        try:
            text = page.get_text("text") or ""
        except Exception as exc:
            print(f"PAGE_ERROR {index + 1}: {exc}", flush=True)
            continue
        matches = list(PATTERN.finditer(text))
        if not matches:
            continue
        spans = []
        for match in matches[:8]:
            start = max(0, match.start() - 350)
            end = min(len(text), match.end() + 650)
            spans.append(compact(text[start:end]))
        print(f"\n-- PDF_PAGE {index + 1} --", flush=True)
        for span in spans:
            print(span, flush=True)
