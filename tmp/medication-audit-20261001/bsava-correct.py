import json,pathlib
from pypdf import PdfReader
root=pathlib.Path('tmp/medication-audit-20261001');books=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros')
r=PdfReader(str(next(books.glob('BSAVA Small Animal Formulary*.pdf'))))
starts={'acetilcisteina':19,'alopurinol':27,'amantadina':31,'amitriptilina':38,'amoxicilina-clavulanato':114,'ampicilina-sulbactam':43,'betanecol':61,'buprenorfina':69,'ceftriaxona':84,'ciclosporina':97,'ciproeptadina':119,'clindamicina':107,'clorambucil':91,'diazepam':134,'dipirona':71,'enrofloxacina':163,'gabapentina':195,'hidroxido-de-aluminio':29,'levetiracetam':243,'marbofloxacina':258,'meloxicam':266,'metadona':271,'micofenolato-mofetila':294,'mirtazapina':286,'fenobarbital':330,'pradofloxacina':351,'prednisolona':355,'pronefra':91,'sucralfato':403,'sulfametoxazol-trimetoprima':434,'tramadol':426}
for s,n in starts.items():
 (root/(s+'-bsava-verified.txt')).write_text('\n'.join(f'===== BSAVA PDF {i} / impressa {i-16} =====\n'+r.pages[i-1].extract_text() for i in range(n,n+3)),encoding='utf8')
(root/'bsava-index-verified.json').write_text(json.dumps(starts,indent=2),encoding='utf8')
print('Extracted',len(starts),'page groups from original PDF')
