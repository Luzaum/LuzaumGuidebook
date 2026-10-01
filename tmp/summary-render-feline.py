import pymupdf as f,pathlib
r=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros');d=f.open(next(r.glob('BSAVA Manual of Canine and Feline Dermatology*')))
for p in [186,187,188,193]:d[p-1].get_pixmap(matrix=f.Matrix(1.2,1.2)).save('tmp/summary-books/derm-'+str(p)+'.png')
