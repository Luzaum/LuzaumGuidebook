from pathlib import Path
from pypdf import PdfReader
root=Path(r'C:\Users\luzau\OneDrive\Documentos\Livros')
books=[('bsava','BSAVA Guide to Procedures in Small Animal Practice, 3rd Edition.pdf',210,255),('procedures','Veterinary Emergency and Critical Care Procedures, 3d Ed.pdf',145,190),('feline','Feline Emergency and Critical Care Medicine, 2nd Edition.pdf',75,112)]
for ident,name,start,end in books:
 r=PdfReader(root/name)
 out=[]
 for i in range(start-1,min(end,len(r.pages))):
  t=r.pages[i].extract_text() or ''
  out.append(f'\n--- PDF {i+1} ---\n{t}')
 Path(f'tmp/esofagostomia/{ident}.txt').write_text('\n'.join(out),encoding='utf-8')
 print(ident,len(r.pages))
