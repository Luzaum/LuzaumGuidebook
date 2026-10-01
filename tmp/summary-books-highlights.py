import pathlib,re,pymupdf as f
out=pathlib.Path('tmp/summary-books');d=f.open(next(pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros').glob('Plumb*')))
for p in [39,72,97,157,209,270,309,349,405,440,477,773,823,852,1033,1075,1085,1288]:
 s='\n'.join(d[i].get_text() for i in range(p-1,p+2));start=s.find('Prescriber Highlights');print('\nPAGE',p, s[start:start+1800])
