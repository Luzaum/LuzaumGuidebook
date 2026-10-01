import pymupdf as f,pathlib,re
r=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros');d=f.open(next(r.glob('BSAVA Manual of Canine and Feline Nephrology*')))
for i in range(len(d)):
 s=re.sub(r'\s+',' ',d[i].get_text())
 for m in re.finditer('emphysematous',s,re.I):print(i+1,s[max(0,m.start()-300):m.end()+1300])
