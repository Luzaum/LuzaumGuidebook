import json,pathlib,collections,re
root=pathlib.Path('tmp/medication-audit-20261001')
c=json.loads((root/'catalog.json').read_text(encoding='utf8'))
eff=json.loads((root/'effective.json').read_text(encoding='utf8'))
fields={'Resumo rápido':'quickIndications','Indicações detalhadas':'detailedIndications','Farmacocinética':'pharmacokineticsData','Precauções detalhadas':'attentionData.precautions','Efeitos adversos detalhados':'attentionData.adverseEffectsDetailed','Ajustes posológicos':'attentionData.doseReductionGuidelines','Interações detalhadas':'attentionData.drugInteractionsDetailed','Classificação detalhada':'generalInfoData.pharmacologicalClassification','Técnica por via':'generalInfoData.routesDetailed','Particularidades por espécie':'generalInfoData.speciesPeculiarities','Aspectos de prescrição':'generalInfoData.prescriptionType','Monitoramento':'monitoringParameters','Orientação ao tutor':'clientInformation','Apresentações':'presentations','Referências':'references','Mecanismo':'mechanismOfAction','Contraindicações':'contraindications','Cuidados':'cautions','Efeitos adversos':'adverseEffects','Interações':'interactions','Modelo de receita':'samplePrescriptionText','Tabela de peso':'practicalWeightTable','História':'generalInfoData.curiositiesAndHistory'}
def get(m,p):
 for k in p.split('.'):
  if not isinstance(m,dict):return None
  m=m.get(k)
 return m
def audit(m):
 missing=[label for label,p in fields.items() if not get(m,p)]
 issues=[]; refs={r.get('id') for r in m.get('references',[])};pids={p.get('id') for p in m.get('presentations',[])}
 for group in ['doses','detailedIndications','clinicalStudiesCommented','clinicalFoundationsData']:
  rows=m.get(group,[])
  ids=collections.Counter(r.get('id') for r in rows if r.get('id'))
  issues += [f'{group}: ID repetido {k} ({n} ocorrências)' for k,n in ids.items() if n>1]
  for i,r in enumerate(rows):
   rid=r.get('id',str(i+1)); links=r.get('referenceIds',[])+([r['referenceId']] if r.get('referenceId') else [])
   for link in links:
    if link not in refs:issues.append(f'{group}[{rid}]: referência inexistente {link}')
   if group=='doses':
    if r.get('doseMax',r['doseMin'])<r['doseMin']:issues.append(f'doses[{rid}]: doseMax < doseMin')
    if r.get('presentationId') and r['presentationId'] not in pids:issues.append(f'doses[{rid}]: apresentação inexistente {r["presentationId"]}')
    if r.get('species') not in [*m['species'],'both']:issues.append(f'doses[{rid}]: espécie fora da ficha')
    for p in ['duration','monitoring','clinicalContext','evidenceLevel','referenceIds']:
     if not r.get(p):issues.append(f'doses[{rid}]: falta {p}')
   if group=='clinicalFoundationsData':
    for st in r.get('studies',[]):
     if st.get('referenceId') and st['referenceId'] not in refs:issues.append(f'fundamento[{rid}]: estudo com referência inexistente {st["referenceId"]}')
 return {'missing':missing,'issues':issues}
data={'local':{m['slug']:audit(m) for m in c['medications']},'effective':{m['slug']:audit(m) for m in eff}}
(root/'structural.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
for m in c['medications']:
 a=data['local'][m['slug']]
 print('\n'+m['slug']+' AUSENTE: '+', '.join(a['missing']))
 print('DOSES: '+' | '.join(f'{d["id"]} {d["species"]} {d["doseMin"]}-{d.get("doseMax",d["doseMin"])}{d["doseUnit"]}/{d["perWeightUnit"]} {d["route"]} {d["frequency"]}' for d in m['doses']))
 print('ERROS: '+' | '.join(x for x in a['issues'] if ': falta ' not in x))
