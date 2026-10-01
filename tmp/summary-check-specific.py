import pymupdf as f,pathlib,re
r=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros');d=f.open(next(r.glob('Ettinger*')))
for a,b,term in [(2296,2299,'emphysem'),(2225,2240,'pyeloneph'),(2392,2401,'cutaneous'),(1110,1120,'remdesivir|GS-441524'),(1900,1903,'phosphate')]:
 print('CHECK',a,b,term)
 for p in range(a,b+1):
  s=re.sub(r'\s+',' ',d[p-1].get_text())
  for m in list(re.finditer(term,s,re.I))[:2]: print(p,s[max(0,m.start()-140):m.end()+430])
