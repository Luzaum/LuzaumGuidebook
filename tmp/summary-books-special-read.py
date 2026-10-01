import pathlib,re,pymupdf as f
root=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros')
d=f.open(next(root.glob('BSAVA Manual of Canine and Feline Reproduction*')))
for i in range(len(d)):
 s=d[i].get_text()
 if 'mastitis' in s.lower() and i>20:
  k=s.lower().find('mastitis');print('REPRO',i+1,s[max(0,k-100):k+1800])
for pat,pages in [('BSAVA Manual of Canine and Feline Dermatology*',[86,87,88,92,93,94]),('Greenes*',[4385,4487,5277]),('Practical Guide*',[283,290,291])]:
 d=f.open(next(root.glob(pat)))
 for p in pages:print(pat,p,re.sub(r'\s+',' ',d[p-1].get_text())[:1800])
