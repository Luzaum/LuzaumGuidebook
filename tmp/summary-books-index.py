import fitz,json,pathlib
root=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros')
out=pathlib.Path('tmp/summary-books');out.mkdir(exist_ok=True)
for key,pattern in [('ettinger','Ettinger*'),('plumb','Plumb*'),('bsava','BSAVA Small Animal Formulary*')]:
 p=next(root.glob(pattern));d=fitz.open(p)
 toc=d.get_toc();(out/(key+'-toc.json')).write_text(json.dumps(toc,ensure_ascii=False),encoding='utf8')
 print(key,len(d),'toc',len(toc));print(str(toc[:12]))
