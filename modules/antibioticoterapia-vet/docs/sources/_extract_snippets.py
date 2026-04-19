"""One-off: search PDFs for keywords (dev only).

Saída: em Windows, preferir redirecionar para ficheiro UTF-8 ou definir
PYTHONIOENCODING=utf-8 para evitar UnicodeEncodeError na consola.
"""
import os
import sys
from pypdf import PdfReader

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


def find_pages(path: str, needles: list[str], max_scan: int | None = None) -> list[tuple[int, str]]:
    r = PdfReader(path)
    n = len(r.pages)
    if max_scan is not None:
        n = min(n, max_scan)
    out: list[tuple[int, str]] = []
    needles_l = [x.lower() for x in needles]
    for i in range(n):
        try:
            t = (r.pages[i].extract_text() or "").lower()
        except Exception:
            continue
        for nl in needles_l:
            if nl in t:
                out.append((i + 1, nl))
                break
    return out


def snippet(path: str, page_1based: int, chars: int = 1200) -> str:
    r = PdfReader(path)
    t = r.pages[page_1based - 1].extract_text() or ""
    return " ".join(t.split())[:chars]


if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))
    nelson = os.path.join(base, "NELSON E COUTO 6_compressed (3).pdf")
    cunningham = os.path.join(base, "Cunningham's Textbook of Veterinary Physiology, 6th Edition.pdf")
    neuro = os.path.join(base, "Practical Guide to Canine and Feline Neurology, 3rd Edition (VetBooks.ir)_compressed.pdf")
    ccih = os.path.join(base, "Guia_CCIH_2024.pdf")

    for label, p, terms in [
        ("NELSON", nelson, ["pyometra", "sepsis", "pneumonia", "pyelonephritis", "urinary tract"]),
        ("CUNNINGHAM", cunningham, ["inflammation", "fever", "shock", "respiratory"]),
        ("NEURO", neuro, ["meningitis", "encephalitis"]),
        ("CCIH", ccih, ["profilaxia", "antimicrobiano", "sepse"]),
    ]:
        print("===", label, "===")
        pages = find_pages(p, terms, max_scan=None if label != "NELSON" else 900)
        seen = set()
        for pg, term in pages[:15]:
            if pg in seen:
                continue
            seen.add(pg)
            print(f"  p.{pg} ({term})")
        if pages:
            first = pages[0][0]
            print("  SNIP:", snippet(p, first, 800))
        print()
