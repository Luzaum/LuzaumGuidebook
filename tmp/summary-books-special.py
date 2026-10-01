import pymupdf as f,pathlib,re,json
root=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros')
for key,pattern,terms in [('derm','BSAVA Manual of Canine and Feline Dermatology*','atop|eosinophil'),('repro','BSAVA Manual of Canine and Feline Reproduction*','mastitis|postpartum|puerper'),('greene','Greenes*','giardi|coccidi|platynos|peritonitis'),('neuro','Practical Guide*','dyskines|movement')]:
 d=f.open(next(root.glob(pattern)));print(key,'toc',len(d.get_toc()))
 for l,t,p in d.get_toc():
  if re.search(terms,t,re.I):print(p,t)
 if not d.get_toc():
  for i in range(len(d)):
   s=d[i].get_text()
   if re.search(terms,s,re.I):print('match',i+1,re.sub(r'\s+',' ',s)[:180])
