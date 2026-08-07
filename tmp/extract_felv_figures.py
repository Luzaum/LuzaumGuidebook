import fitz
from pathlib import Path
from PIL import Image
import io

out = Path(r"C:/PROJETOS VET/Vetius/public/assets/consulta-vet/diseases/leucemia-viral-felina")
doc = fitz.open(r"C:/PROJETOS VET/Vetius/tmp/abcd-felv-guideline-2021.pdf")

pages = {
    19: "felv-pathophysiology-infection.jpg",
    20: "felv-infection-outcomes-abcd.png",
    18: "felv-immune-response-outcomes-abcd.png",
}

for page_num, filename in pages.items():
    page = doc[page_num - 1]
    imgs = page.get_images(full=True)
    if not imgs:
        print(f"page {page_num}: no images")
        continue
    base = doc.extract_image(imgs[0][0])
    data = base["image"]
    dest = out / filename
    if filename.endswith(".jpg"):
        img = Image.open(io.BytesIO(data)).convert("RGB")
        img.save(dest, "JPEG", quality=92)
    else:
        dest.write_bytes(data)
    print(f"saved {dest.name} ({dest.stat().st_size} bytes)")
