import sys
from pathlib import Path

import pymupdf


sys.stdout.reconfigure(encoding="utf-8", errors="replace")

pdf_path = Path(sys.argv[1])
document = pymupdf.open(pdf_path)
for page_number in (int(value) for value in sys.argv[2:]):
    page = document[page_number - 1]
    print(f"\n===== PDF PAGE {page_number} =====\n")
    print(page.get_text("text", sort=True))
