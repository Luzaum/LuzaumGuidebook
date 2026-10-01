import pymupdf as f,pathlib,json,re
root=pathlib.Path(r'C:\Users\luzau\OneDrive\Documentos\Livros'); out=pathlib.Path('tmp/summary-books')
for key,pattern,pages in [('plumb','Plumb*',[39,71,72,97,109,157,177,212,257,270,309,349,409,440,477,773,823,852,869,947,1033,1075,1085,1216,1220,1288]),('ettinger','Ettinger*',[324,338,726,925,942,964,1062,1071,1089,1091,1097,1102,1110,1310,1314,1325,1363,1364,1400,1440,1500,1519,1532,1539,1574,1728,1762,1763,1790,1898,1901,1912,2027,2053,2072,2087,2092,2111,2118,2126,2142,2156,2174,2188,2225,2241,2296,2316,2323,2345,2392,2402,2453])]:
 d=f.open(next(root.glob(pattern))); chunks=[]
 for p in pages:
  s=d[p-1].get_text(); (out/f'{key}-{p}.txt').write_text(s+'\n'+d[p].get_text(),encoding='utf8');chunks.append(f'\n--- {key} PDF {p} ---\n'+s[:2100])
 (out/(key+'-read.txt')).write_text('\n'.join(chunks),encoding='utf8')
print((out/'plumb-read.txt').read_text(encoding='utf8'))
