import sys
from pathlib import Path

import pymupdf


pdf_path = Path(sys.argv[1])
output_dir = Path(sys.argv[2])
output_dir.mkdir(parents=True, exist_ok=True)
zoom = float(sys.argv[3])
document = pymupdf.open(pdf_path)
for page_number in (int(value) for value in sys.argv[4:]):
    page = document[page_number - 1]
    destination = output_dir / f"{pdf_path.stem[:40]}-pdf-{page_number}.png"
    page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False).save(destination)
    print(destination.resolve())
