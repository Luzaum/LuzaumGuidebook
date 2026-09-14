import re
import sys
from pathlib import Path

import pymupdf


sys.stdout.reconfigure(encoding="utf-8", errors="replace")

pdf_path = Path(sys.argv[1])
pattern = re.compile(sys.argv[2], re.IGNORECASE)
start_page = int(sys.argv[3]) if len(sys.argv) > 3 else 1
end_page = int(sys.argv[4]) if len(sys.argv) > 4 else None

document = pymupdf.open(pdf_path)
last_page = min(end_page or document.page_count, document.page_count)

for page_number in range(start_page, last_page + 1):
    text = document[page_number - 1].get_text("text", sort=True)
    matches = list(pattern.finditer(text))
    if not matches:
        continue

    print(f"\n===== PDF PAGE {page_number} =====\n")
    for match in matches[:12]:
        snippet_start = max(0, match.start() - 500)
        snippet_end = min(len(text), match.end() + 900)
        snippet = re.sub(r"[ \t]+", " ", text[snippet_start:snippet_end])
        print(snippet.strip())
        print("\n---")
