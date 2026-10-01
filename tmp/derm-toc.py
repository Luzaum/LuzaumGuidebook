import pymupdf as f,pathlib
r=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros');d=f.open(next(r.glob('BSAVA Manual of Canine and Feline Dermatology*')))
for x in d.get_toc():print(x)
