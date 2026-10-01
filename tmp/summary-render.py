import pymupdf as f,pathlib
r=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros');d=f.open(next(r.glob('BSAVA Manual of Canine and Feline Dermatology*')))
for p in [86,87,90,92]: d[p-1].get_pixmap(matrix=f.Matrix(1.5,1.5)).save('tmp/summary-books/derm-'+str(p)+'.png')
g=f.open(next(r.glob('Greenes*')))
for p in [5278,5279,5280]:print('PDF',p,g[p-1].get_text()[:3000])
