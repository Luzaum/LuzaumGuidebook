from pathlib import Path
p=Path('modules/consulta-vet/pages/MedicationDetailPage.tsx');s=p.read_text(encoding='utf8');s="import { MedicationMechanismExplanation } from '../components/medication/MedicationContextSections';\n"+s
s=s.replace('<MedicationClinicalFoundationsSection medication={medication} />','<MedicationMechanismExplanation medication={medication} />\n                  <MedicationClinicalFoundationsSection medication={medication} />')
s=s.replace("        { id: 'fundamentos-clinicos',", "        { id: 'explicacao-farmacologica', label: 'Ação farmacológica' },\n        { id: 'fundamentos-clinicos',")
s=s.replace("        { id: 'formas-administracao',", "        { id: 'indicacoes-posologia', label: 'Indicações e esquemas' },\n        { id: 'formas-administracao',")
s=s.replace("        { id: 'efeitos-adversos',", "        { id: 'cuidados-clinicos', label: 'Cuidados e monitoramento' },\n        { id: 'efeitos-adversos',")
p.write_text(s,encoding='utf8')
for file,component in [('MedicationAttentionTab','MedicationClinicalWarnings'),('MedicationGeneralInfoTab','MedicationIndicationRegimens')]:
 p=Path('modules/consulta-vet/components/medication/'+file+'.tsx');s=p.read_text(encoding='utf8');s=f"import {{ {component} }} from './MedicationContextSections';\n"+s
 marker='      {/* '
 ix=s.index(marker,s.index('  return (',s.index('export function')))
 s=s[:ix]+f'      <{component} medication={{medication}} />\n'+s[ix:];p.write_text(s,encoding='utf8')
