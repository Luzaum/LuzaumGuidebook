from pathlib import Path
import fitz
from PIL import Image, ImageDraw
root=Path(__file__).parent
pages=[]
for path in sorted(root.glob('seed-*.pdf')):
    doc=fitz.open(path)
    for i,page in enumerate(doc):
        pix=page.get_pixmap(matrix=fitz.Matrix(0.8,0.8),alpha=False)
        im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
        label=Image.new('RGB',(im.width,im.height+25),'#dddddd')
        label.paste(im,(0,25))
        ImageDraw.Draw(label).text((5,4),f'{path.stem} p{i+1}',fill='black')
        pages.append(label)
w=max(p.width for p in pages);h=max(p.height for p in pages)
sheet=Image.new('RGB',(3*w,((len(pages)+2)//3)*h),'#999999')
for i,p in enumerate(pages):sheet.paste(p,((i%3)*w,(i//3)*h))
sheet.save(root/'contact-sheet-final.png')
print(len(pages),'pages')
