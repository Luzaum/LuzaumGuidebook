import json,pathlib,collections,re,datetime
root=pathlib.Path('tmp/medication-audit-20261001');out=pathlib.Path('output');out.mkdir(exist_ok=True)
c=json.loads((root/'catalog.json').read_text(encoding='utf8'))
eff=json.loads((root/'effective.json').read_text(encoding='utf8'))
extra=json.loads((root/'remote-nonpublic.json').read_text(encoding='utf8'))
struct=json.loads((root/'structural.json').read_text(encoding='utf8'))
notes=json.loads((root/'clinical_notes.json').read_text(encoding='utf8'))
bs=json.loads((root/'bsava-index-verified.json').read_text(encoding='utf8'))
emap={m['slug']:m for m in eff}
fields=[('Mecanismo','mechanismOfAction'),('Resumo de indicações','quickIndications'),('Indicações aprofundadas','detailedIndications'),('ADME/farmacocinética','pharmacokineticsData'),('Classificação','generalInfoData.pharmacologicalClassification'),('Técnica/cuidados por via','generalInfoData.routesDetailed'),('Particularidades por espécie','generalInfoData.speciesPeculiarities'),('Prescrição/regulação','generalInfoData.prescriptionType'),('Precauções explicadas','attentionData.precautions'),('Efeitos adversos explicados','attentionData.adverseEffectsDetailed'),('Ajustes de dose','attentionData.doseReductionGuidelines'),('Interações explicadas','attentionData.drugInteractionsDetailed'),('Diluição/compatibilidade','DILUTION'),('Fundamentos','clinicalFoundationsData'),('Estudos comentados','clinicalStudiesCommented'),('Monitoramento próprio','monitoringParameters'),('Informação ao tutor','clientInformation'),('Apresentações','presentations'),('Tabela de peso','practicalWeightTable'),('Modelo de receita','samplePrescriptionText'),('Referências','references'),('Site oficial','officialSiteUrl'),('Bula','leafletUrl'),('Imagem','imageUrl'),('Preço referenciado','priceReference')]
def get(m,p):
 if p=='DILUTION':return get(m,'generalInfoData.dilutionGuide') or get(m,'attentionData.dilutionGuide')
 for k in p.split('.'):
  if not isinstance(m,dict):return None
  m=m.get(k)
 return m
def state(v):
 if not v:return 'ausente'
 if isinstance(v,list):return f'presente ({len(v)})'
 return 'presente'
def cell(v):return str(v or '—').replace('|',' / ').replace('\n',' ')
lines=[]
def add(s=''):lines.append(s)
add('# Prompt completo — auditoria de medicamentos do ConsultaVet')
add('\nData: 01/10/2026. Idioma de resposta esperado: português brasileiro.\n')
add('Você é a IA responsável por concluir a revisão abaixo. Leia todo o relatório antes de responder. **Não altere código, fichas, banco de dados, livros ou publicação. Entregue apenas uma proposta editorial completa, verificável e pronta para revisão.** As informações já resolvidas pelos livros estão incluídas e devem ser aproveitadas; não repita uma pesquisa como se essas respostas não existissem.\n')
add('## 1. Escopo e limites da conferência realizada\n')
add(f'- Foram inventariadas as **{len(c["medications"])} fichas do catálogo público local** e consultados, por GET somente leitura, **32 registros publicados no banco**. Apenas alopurinol, fenobarbital e amoxicilina/clavulanato coincidem com a lista pública; os outros **{len(extra)}** estão no apêndice. Total de slugs distintos examinados: **{len(eff)+len(extra)}**.')
add('- A auditoria das seções considerou o tipo MedicationRecord, os componentes que as exibem e os registros após os enriquecimentos locais. O caminho remoto foi reconstruído a partir do mapper/mesclagem atualmente usados pelo aplicativo; não é uma afirmação de que todas as telas de produção foram abertas ou de que todos os possíveis dados privados foram acessados.')
add('- Foram lidos trechos completos das páginas relevantes dos PDFs originais de Plumb’s 10 e BSAVA 10, usando extrações antigas somente para localizar as páginas. As propostas clínicas abaixo são sínteses próprias; páginas impressas e páginas do PDF são diferenciadas.')
add('- Esta é uma auditoria completa da presença das seções do conjunto inventariado e dos problemas estruturais testados, com revisão clínica dirigida às divergências encontradas. **Não constitui certificação de todas as afirmações clínicas, todos os artigos, todas as doses e todos os números de cada ficha.** Campos preenchidos podem continuar exigindo validação; “presente” não significa “correto”. Estudos e consensos de 2025/2026 não foram autenticados por pesquisa externa.')
add('- Os dados do aplicativo não foram alterados. As correções estão propostas neste relatório. Livros não resolvem preço, estoque, registro brasileiro vigente, bula atual, gotejador ou fotografia de produto. Não inventar esses dados.')
add('\n## 2. Fontes disponíveis e regras para concluir\n')
add("Prioridade: `C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf` e `C:/Users/luzau/OneDrive/Documentos/Livros/BSAVA Small Animal Formulary, Part A, Canine and Feline, 10th Edition (VetBooks.ir).pdf`. Outros livros do mesmo acervo podem complementar somente depois de localizar e ler as páginas pertinentes. Não citar Ettinger/Nelson/BSAVA por mera semelhança de assunto.\n")
add('Para cada proposta, informe: medicamento/slug, seção/campo, texto atual ou lacuna, gravidade, texto completo proposto, fonte/edição/monografia/página impressa e página do PDF, espécie, indicação, via, formulação, unidade e limitações. Classifique cada item como **erro confirmado**, **lacuna de conteúdo**, **perda no carregamento**, **não aplicável**, **suspeita a confirmar** ou **não resolvido no acervo**. Não atribua status “confirmado” a suspeitas desta lista sem conferir a fonte.\n')
add('Regras indispensáveis:\n')
for s in ['Não fundir doses de livros diferentes em faixa única sem explicar a divergência; não trocar dose diária total por dose a cada tomada.','Não confundir mg/kg, mg/animal, mg/m², mg/kg/dia e mg/kg/h; fornecer exemplos de cálculo somente após verificar formulação e base da dose.','Citação presente ou ID de referência adicionado automaticamente não é validação clínica. Um formulário é referência terciária; não é ensaio clínico nível 1b.','Separar dose rotulada, uso extra-label, estudo experimental, recomendação de consenso e relato de caso. Não completar um esquema histórico com promessa moderna de eficácia.','Não inventar incidência “comum/rara” de reação sem denominador/fonte; se o livro apenas enumera efeitos, descrever frequência como não estabelecida.','Um campo vazio opcional não é automaticamente uma falha clínica: diluição IV não se aplica a tratamento exclusivamente oral; tabela de peso, história, receita pronta e estudo comentado podem ser dispensáveis.','Se o conteúdo existe em notes, administration, texto clínico ou outra aba, identificar lacuna de estrutura/exibição, sem afirmar que a informação clínica nunca foi escrita.','Preservar a autoria e verificar metadados dos artigos. Se precisar de informações externas para regulação ou produto, entregar uma lista de documentos oficiais necessários; a solicitação original prioriza resolver pelo acervo.']:
 add('- '+s)
add('\n## 3. Problemas transversais já encontrados\n')
add('### 3.1 Conteúdo detalhado perdido quando o banco prevalece\n')
add('SupabaseMedicationRepository.list usa mergeBySlug: o objeto remoto substitui inteiramente o local, não mescla as seções. mapMedicationRow não transporta quickIndications, detailedIndications, pharmacokineticsData, attentionData, generalInfoData, clinicalStudiesCommented, monitoringParameters, clientInformation, samplePrescriptionText nem practicalWeightTable. applyMedicationBookFoundations repõe fundamentos e algumas referências, mas não reconstitui todas essas seções. Isso atinge as três fichas coincidentes.\n')
add('| Ficha | Doses locais | Doses após banco | Apresentações locais | Após banco |')
add('|---|---:|---:|---:|---:|')
for s in ['alopurinol','fenobarbital','amoxicilina-clavulanato']:
 m=next(x for x in c['medications'] if x['slug']==s);e=emap[s]
 add(f'| {s} | {len(m["doses"])} | {len(e["doses"])} | {len(m["presentations"])} | {len(e["presentations"])} |')
add('\n**Pedido à IA:** propor como preservar as seções, restaurar dose/apresentação completa e verificar ambos os caminhos, sem executar alterações. Não pedir um novo texto para um dado que já existe localmente. O mapper de referências também descarta entradas sem citationText/citation/label e perde metadados estruturados de título/autores/ano; apontar as referências afetadas antes de substituir dados.\n')
add('### 3.2 Unidade estruturada e fonte de dose\n')
add('buildDoseSummaryLabel e buildClinicalDoseLabel concatenam doseUnit/perWeightUnit. Há unidades redundantes no seed. O problema de rótulo é demonstrável pelo código; não foi presumido que toda rotina de cálculo necessariamente usa o mesmo caminho.\n')
add('| Ficha | IDs com representação redundante |')
add('|---|---|')
for m in c['medications']:
 ds=[d['id']+' → '+d['doseUnit']+'/'+d['perWeightUnit'] for d in m['doses'] if ('/kg' in d['doseUnit'] and d['perWeightUnit']=='kg') or ('/m²' in d['doseUnit'] and d['perWeightUnit']=='m²')]
 if ds:add('| '+m['slug']+' | '+'; '.join(ds)+' |')
add('\nProposta: guardar `doseUnit=mg` com `perWeightUnit=kg` ou `m²` para os respectivos regimes; dose fixa deve continuar fixa. Não converter superfície corporal em peso por fator improvisado. CRI e dose diária total precisam de unidade temporal explícita, mesmo quando o texto já a descreve.\n')
add('### 3.3 Referências incorretas ou extrapoladas\n')
for s in ['Capromorelina: monografia não localizada no BSAVA 10 fornecido; atribuição p. 61–62 não corresponde a Capromorelin.','Dipirona: não há monografia isolada Metamizole em p. 252–253 do BSAVA fornecido; referência localizada é à associação com butilescopolamina, p. 55–56. Essa associação não fundamenta automaticamente a dipirona isolada.','Ceftriaxona: p. 68–72 do BSAVA não é uma monografia de ceftriaxona. Há outras cefalosporinas, incluindo cefotaxima. Não transferir posologia.','Ampicilina/sulbactam: a monografia Ampicillin do BSAVA não equivale à monografia da associação.','Pronefra: monografia Chitosan/Ipakitine p. 75 e monografia Calcium, Oral não são monografias da combinação comercial Pronefra.','Ciclosporina: o começo de Ciclosporin no BSAVA é p. 81 (PDF 97), e não p. 83. Clorambucil começa na p. 75 (PDF 91), e não p. 76. Intervalos citados devem ser revistos após conferir onde cada monografia termina.','Vários fundamentos de livros têm referenceIds=[] por construção. Acrescentar na proposta ligação precisa da afirmação à fonte, mesmo que a bibliografia geral já liste livros. Não exigir estudo primário fictício para uma explicação de formulário.']:
 add('- '+s)
add('\n### 3.4 Principais divergências clínicas para priorizar\n')
for s in ['Prednisolona: dose diária integral oferecida com q12h ou q24h pode duplicar o total diário; separar o fracionamento.','Enrofloxacina: entrada both com faixa até 10 mg/kg conflita com limite felino de 5 mg/kg/dia expresso no texto.','Acetilcisteína: faixa IV de ataque também apresentada como oral, embora Plumb’s diferencie 140–180 mg/kg IV de 280 mg/kg oral. BSAVA apresenta esquema próprio que deve permanecer identificado.','Dipirona: via oral, febre/cólica e manutenção canina não são todos demonstrados pela seção Dosages de Plumb’s citada; alternativas felinas de 12,5 q12h e 25 q24h precisam de linhas distintas.','Meloxicam: followUpPhases contém manutenção, mas o rótulo da entrada de dor aguda continua com 0,2 mg/kg q24h; alinhar todas as representações de ataque/manutenção.','Sulfonamida/trimetoprima: três presentationId inexistentes; não há validação automática de concentração/volume para esses vínculos.']:
 add('- '+s)
add('\n## 4. Dossiês individuais — todas as 32 fichas públicas\n')
for i,m in enumerate(c['medications'],1):
 s=m['slug'];e=emap[s];n=notes[s]
 add(f'### {i:02d}. {m["title"]} — `{s}`\n')
 add(f'**Achado principal:** {n["status"]}.\n')
 add('**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):\n')
 add('| Seção / campo | Local | Após banco/mesclagem |');add('|---|---|---|')
 for label,p in fields:add(f'| {label} ({p}) | {state(get(m,p))} | {state(get(e,p))} |')
 add('\n**Lacunas/estrutura local:** '+('; '.join(struct['local'][s]['missing']) or 'Nenhum campo vazio na lista estrutural básica')+'. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.\n')
 # Required members of existing sections, exact individual paths.
 deep=[]
 for path,required in [('pharmacokineticsData',['absorption','distribution','metabolism','elimination']),('generalInfoData.routesDetailed',['route','technique','nursingCare']),('generalInfoData.speciesPeculiarities',['species','title','description']),('attentionData.precautions',['condition','alertLevel','physiologicalExplanation','clinicalAction']),('attentionData.adverseEffectsDetailed',['effect','frequency','mechanism','clinicalManagement']),('attentionData.drugInteractionsDetailed',['drugOrClass','severity','clinicalEffect','pharmacologicalMechanism']),('detailedIndications',['indication','species','dose','route','frequency','duration','mechanismOfAction','clinicalRationale','referenceIds'])]:
  v=get(m,path)
  if not v:continue
  rows=v if isinstance(v,list) else [v]
  for j,r in enumerate(rows):
   if not isinstance(r,dict):deep.append(f'{path}[{j+1}]: formato inválido');continue
   for k in required:
    if not r.get(k):deep.append(f'{path}[{j+1}].{k}')
 add('**Subcampos obrigatórios vazios nas seções existentes:** '+('; '.join(deep) if deep else 'nenhum encontrado nas verificações acima')+'.\n')
 add('**Complemento/correção já fundamentado no acervo:** '+n['text']+'\n')
 add('**Pedido específico à IA:** '+n['ask']+'\n')
 add('**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:\n')
 add('| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |');add('|---|---|---|---|')
 for d in m['doses']:
  missing=[k for k in ['duration','monitoring','clinicalContext','evidenceLevel','referenceIds'] if not d.get(k)]
  value=f'{d["doseMin"]}'+(f'–{d["doseMax"]}' if d.get('doseMax') is not None and d['doseMax']!=d['doseMin'] else '')+' '+d['doseUnit']+'/'+d['perWeightUnit']
  add(f'| {d["id"]} / {d["species"]} | {value} | {cell(d["route"])} / {cell(d["frequency"])} | {", ".join(missing) or "nenhum dos cinco campos"} |')
  if d.get('followUpPhases'):add(f'| ↳ fases seguintes de {d["id"]} | {cell(json.dumps(d["followUpPhases"],ensure_ascii=False))} | já presentes | conferir coerência de exibição |')
 if s in ['alopurinol','fenobarbital','amoxicilina-clavulanato']:
  add('\n**Doses realmente preservadas no caminho remoto:**\n')
  for d in e['doses']:add(f'- {d["id"]}: {d["doseMin"]}–{d.get("doseMax",d["doseMin"])} {d["doseUnit"]}/{d["perWeightUnit"]}; {d["species"]}; {d["route"]}; {d["frequency"]}; duração: {d.get("duration") or "ausente"}.')
 add('\n**Erros mecânicos de IDs/referências encontrados:** '+('; '.join(x for x in struct['local'][s]['issues'] if ': falta ' not in x) or 'nenhum no conjunto de regras executadas; isso não autentica os artigos')+'.\n')
 pissues=[]
 for p in m['presentations']:
  opts=p.get('concentrationOptions') or [p]
  for op in opts:
   if not op.get('concentrationValue') or not op.get('concentrationUnit'):
    pissues.append(p['id']+(('/'+op['id']) if op is not p and op.get('id') else '')+': concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue)')
 add('**Apresentações com concentração incompleta:** '+('; '.join(pissues) or 'nenhuma na verificação de concentraçãoValue/concentrationUnit')+'. Sem conferência de registro/estoque atual.\n')
 recent=[r for r in m.get('references',[]) if re.search(r'202[5-6]',str(r.get('year',''))+' '+str(r.get('citationText',''))+' '+str(r.get('title','')))]
 if recent:
  add('**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**\n')
  for r in recent:add('- '+str(r.get('id') or 'sem ID')+': '+cell(r.get('citationText') or r.get('title')))
 add('**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.\n')
add('## 5. Apêndice — 29 registros publicados no banco fora da lista pública\n')
add('Esses registros não são automaticamente novas fichas públicas a ativar. A ausência de monografia detalhada aqui não prova que o produto esteja ausente da seção separada Comerciais. Não reativar nem editar nada. Fazer revisão adicional somente como proposta. Os campos detalhados listados abaixo não são mapeados pelo caminho atual, e em vários registros são produtos de marca; não inventar monografia própria diferente da substância apenas para preencher a interface.\n')
for i,m in enumerate(extra,1):
 add(f'### A{i:02d}. {m["title"]} — `{m["slug"]}`\n')
 add('Princípio ativo cadastrado: '+cell(m['activeIngredient'])+'. Espécies: '+', '.join(m['species'])+'.\n')
 missing=[label+' ('+p+')' for label,p in fields if not get(m,p)]
 add('**Seções/campos ausentes no objeto mapeado:** '+('; '.join(missing) or 'nenhum')+'.\n')
 add('**Seções básicas preenchidas:** '+', '.join(label for label,p in fields if get(m,p))+'. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.\n')
 add('**Regimes cadastrados:**\n')
 for d in m['doses']:
  add(f'- {d.get("id","sem ID")}: {d.get("indication","sem indicação")}; {d.get("species","sem espécie")}; {d.get("doseMin","?")}–{d.get("doseMax",d.get("doseMin","?"))} {d.get("doseUnit","?")}/{d.get("perWeightUnit","?")}; {d.get("route","sem via")}; {d.get("frequency","sem frequência")}; duração: {d.get("duration") or "ausente"}; referência específica: {", ".join(d.get("referenceIds",[])) or "ausente"}.')
 if not m['doses']:add('- nenhuma dose cadastrada.')
 presmissing=[p['id'] for p in m['presentations'] if not p.get('concentrationValue') or not p.get('concentrationUnit')]
 add('\n**Apresentações sem concentração numérica/unidade:** '+(', '.join(presmissing) or 'nenhuma na verificação simples')+'.\n')
 add('**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.\n')
add('## 6. Fontes localizadas para orientar a continuidade\n')
add('Página inicial de localização; pode haver outra monografia terminando no alto da mesma página. Ler somente o trecho da molécula correta e localizar o término antes de citar o intervalo. As quatro exceções abaixo são especialmente relevantes.\n')
add('| Slug | Plumb’s: localização inicial impressa / PDF | BSAVA: localização impressa / PDF |');add('|---|---|---|')
for m in c['medications']:
 s=m['slug'];b=c['books'].get(s,{});p=c['plumbs'].get(s,{}).get('pdfPage')
 if not p and b.get('plumbs'):p=int(re.search(r'\d+',b['plumbs']['pages'])[0])+27
 bp=bs.get(s)
 bst=f'{bp-16} / {bp}' if bp else 'monografia não localizada'
 if s=='dipirona':bst+=' — associação com butilescopolamina, não isolada'
 if s=='ceftriaxona':bst+=' — outras cefalosporinas, não ceftriaxona'
 if s=='ampicilina-sulbactam':bst+=' — ampicilina isolada'
 if s=='pronefra':bst+=' — Chitosan/Ipakitine, outro produto'
 add(f'| {s} | {str(p-27)+" / "+str(p) if p else "não indexado"} | {bst} |')
add('\n## 7. Formato da resposta que solicito à outra IA\n')
add('1. Comece pelos erros confirmados com risco clínico e pela perda de dados no caminho remoto. Não execute as correções.\n2. Para cada uma das 32 fichas públicas, entregue as seções completas aplicáveis e justificadas, preservando a distinção entre informação inexistente e informação já existente que apenas não é exibida.\n3. Apresente cada dose em uma linha: espécie, indicação, contexto, formulação, via, dose POR ADMINISTRAÇÃO, dose TOTAL DIÁRIA quando aplicável, intervalo, duração/critério de término, ajuste, monitoramento e fonte exata.\n4. Acrescente tabela “afirmação → fonte → página → grau de sustentação”; um livro não precisa comprovar artigos posteriores que não contém.\n5. Liste os itens que não puderam ser resolvidos no acervo com uma pergunta objetiva por item e o documento necessário. Não usar “não há interação” quando a fonte apenas diz “sem informação”.\n6. Trate o apêndice separadamente, sem ativar produtos/medicamentos escondidos.\n7. Ao final, forneça um conjunto de propostas editoriais prontas para revisão humana, sem SQL, deploy ou alteração automática.\n')
body='\n'.join(lines)+'\n'
path=out/'consultavet-medicamentos-auditoria-prompt-completo-2026-10-01.md';path.write_text(body,encoding='utf8')
path.with_suffix('.txt').write_text(body,encoding='utf8')
stats={'public':len(c['medications']),'extra':len(extra),'distinct':len(eff)+len(extra),'dosesLocal':sum(len(m['doses']) for m in c['medications']),'dosesEffective':sum(len(m['doses']) for m in eff),'chars':len(body),'words':len(body.split()),'sections':len(lines)}
(root/'report-stats.json').write_text(json.dumps(stats,indent=2),encoding='utf8')
print(json.dumps(stats))
