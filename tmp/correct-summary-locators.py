from pathlib import Path
p=Path('modules/consulta-vet/data/conciseClinicalSummaries.ts');s=p.read_text(encoding='utf8')
for slug in ['granuloma-eosinofilico-felino','sindrome-cutanea-atopica-felina']:
 lines=s.splitlines();lines=[line.replace("'86–101'", "'186–197'") if "'"+slug+"':" in line else line for line in lines];s='\n'.join(lines)+'\n'
s=s.replace("'283–297'", "'283–290'").replace("'5277–5284'", "'5278–5293'")
p.write_text(s,encoding='utf8')
