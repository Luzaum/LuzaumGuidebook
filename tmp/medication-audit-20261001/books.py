import json,re,pathlib
from pypdf import PdfReader
root=pathlib.Path('tmp/medication-audit-20261001')
c=json.loads((root/'catalog.json').read_text(encoding='utf8'))
pltext=pathlib.Path('tmp/pdfs/plumbs-10/plumbs-10.txt').read_text(encoding='utf8')
plpages=re.split(r'===== PDF_PAGE_\d+ =====',pltext)[1:]
bspages=json.loads(pathlib.Path('tmp/medication-review/bsava-pages.json').read_text(encoding='utf8'))
names={'amantadina':('Amantadine','Amantadine'),'betanecol':('Bethanechol','Bethanechol'),'diazepam':('Diazepam','Diazepam'),'gabapentina':('Gabapentin','Gabapentin'),'ciclosporina':('Cyclosporine','Ciclosporin'),'clorambucil':('Chlorambucil','Chlorambucil'),'micofenolato-mofetila':('Mycophenolate','Mycophenolate'),'mirtazapina':('Mirtazapine','Mirtazapine'),'sucralfato':('Sucralfate','Sucralfate'),'ciproeptadina':('Cyproheptadine','Cyproheptadine')}
out={}
for m in c['medications']:
 s=m['slug'];b=c['books'].get(s,{})
 pn=names.get(s,(b.get('plumbs',{}).get('monograph',''),b.get('bsava',{}).get('monograph','')))
 # Existing extraction is used as an index; verify selected pages anew from original PDFs below.
 pi=c['plumbs'].get(s,{}).get('pdfPage')
 if not pi and b.get('plumbs'):
  pi=int(re.search(r'\d+',b['plumbs']['pages'])[0])+27
 hits=[i+1 for i,t in enumerate(bspages) if pn[1] and pn[1].lower() in t[:260].lower() and i>15]
 bi=None
 if b.get('bsava'):
  printed=int(re.search(r'\d+',b['bsava']['pages'])[0]);bi=printed+16
 if hits:bi=hits[0]
 out[s]={'plumbName':pn[0],'plumbPdf':pi,'bsavaName':pn[1],'bsavaPdf':bi,'bsavaCandidates':hits}
books=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros')
pr=PdfReader(str(books/"Plumb's Veterinary Drug Handbook, 10th edition.pdf"))
br=PdfReader(str(next(books.glob('BSAVA Small Animal Formulary*.pdf'))))
for s,b in out.items():
 chunks=[]
 for label,reader,start,num in [('Plumb',pr,b['plumbPdf'],5),('BSAVA',br,b['bsavaPdf'],3)]:
  if not start:continue
  for n in range(start,min(start+num,len(reader.pages)+1)):
   chunks.append(f'\n===== {label} PDF {n} =====\n'+reader.pages[n-1].extract_text())
 (root/(s+'-books.txt')).write_text('\n'.join(chunks),encoding='utf8')
 print(s,b['plumbPdf'],b['bsavaPdf'],flush=True)
(root/'book-index.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8')
