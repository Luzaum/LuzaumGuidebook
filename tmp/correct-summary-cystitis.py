from pathlib import Path
p=Path('modules/consulta-vet/data/conciseClinicalSummaries.ts');s=p.read_text(encoding='utf8');s='\n'.join(line.replace("'2296–2299')", "'117, 345–346', 'BSAVA Nefrologia e Urologia Canina e Felina, 3ª ed.')") if "'cistite-enfisematosa-caes-gatos':" in line else line for line in s.splitlines())+'\n';p.write_text(s,encoding='utf8')
