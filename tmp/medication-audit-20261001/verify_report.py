import pathlib,json,re
root=pathlib.Path('tmp/medication-audit-20261001')
p=pathlib.Path('output/consultavet-medicamentos-auditoria-prompt-completo-2026-10-01.md')
t=p.read_text(encoding='utf8')
c=json.loads((root/'catalog.json').read_text(encoding='utf8'))
e=json.loads((root/'remote-nonpublic.json').read_text(encoding='utf8'))
assert len(re.findall(r'^### [0-9]{2}\.',t,re.M))==32
assert len(re.findall(r'^### A[0-9]{2}\.',t,re.M))==29
assert all(('— `'+m['slug']+'`') in t for m in c['medications']+e)
assert '\ufffd' not in t
assert p.with_suffix('.txt').read_text(encoding='utf8')==t
assert len(json.loads((root/'clinical_notes.json').read_text(encoding='utf8')))==32
print('PASS: 32 dossiês públicos, 29 adicionais, 61 slugs, complementos em todas as fichas públicas, UTF-8 e TXT idêntico.')
print('Final artifacts:',str(p.resolve()),str(p.with_suffix('.txt').resolve()))
