import pathlib
import pymupdf

root = pathlib.Path(r'C:\Users\luzau\OneDrive\Desktop\Livros')
out = pathlib.Path('tmp/pdfs/receituario-review')
for prefix, ranges in [('Ettinger', [(1308,1314),(1320,1329),(1400,1406),(2018,2027)]), ('NELSON', [(320,337),(650,665)]), ('Plumb', [])]:
    path = next(p for p in root.glob('*.pdf') if p.name.startswith(prefix))
    doc = pymupdf.open(path)
    if prefix == 'Plumb':
        terms = ['maropitant','ondansetron','buprenorphine','ursodiol','fluticasone','hydrocodone','prednisolone']
        toc = doc.get_toc()
        for i, entry in enumerate(toc):
            if entry[1].lower().strip() in terms:
                end = toc[i+1][2] if i+1 < len(toc) else entry[2]+5
                ranges.append((entry[2],end))
        print('Plumb ranges', ranges)
    text = '\n'.join(f'\n=== PDF PAGE {page} ===\n'+doc[page-1].get_text() for start,end in ranges for page in range(start,end+1))
    (out / (prefix+'.txt')).write_text(text,encoding='utf8')
    print(prefix, len(text))
