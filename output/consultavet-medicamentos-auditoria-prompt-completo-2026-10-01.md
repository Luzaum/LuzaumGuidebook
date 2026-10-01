# Prompt completo — auditoria de medicamentos do ConsultaVet

Data: 01/10/2026. Idioma de resposta esperado: português brasileiro.

Você é a IA responsável por concluir a revisão abaixo. Leia todo o relatório antes de responder. **Não altere código, fichas, banco de dados, livros ou publicação. Entregue apenas uma proposta editorial completa, verificável e pronta para revisão.** As informações já resolvidas pelos livros estão incluídas e devem ser aproveitadas; não repita uma pesquisa como se essas respostas não existissem.

## 1. Escopo e limites da conferência realizada

- Foram inventariadas as **32 fichas do catálogo público local** e consultados, por GET somente leitura, **32 registros publicados no banco**. Apenas alopurinol, fenobarbital e amoxicilina/clavulanato coincidem com a lista pública; os outros **29** estão no apêndice. Total de slugs distintos examinados: **61**.
- A auditoria das seções considerou o tipo MedicationRecord, os componentes que as exibem e os registros após os enriquecimentos locais. O caminho remoto foi reconstruído a partir do mapper/mesclagem atualmente usados pelo aplicativo; não é uma afirmação de que todas as telas de produção foram abertas ou de que todos os possíveis dados privados foram acessados.
- Foram lidos trechos completos das páginas relevantes dos PDFs originais de Plumb’s 10 e BSAVA 10, usando extrações antigas somente para localizar as páginas. As propostas clínicas abaixo são sínteses próprias; páginas impressas e páginas do PDF são diferenciadas.
- Esta é uma auditoria completa da presença das seções do conjunto inventariado e dos problemas estruturais testados, com revisão clínica dirigida às divergências encontradas. **Não constitui certificação de todas as afirmações clínicas, todos os artigos, todas as doses e todos os números de cada ficha.** Campos preenchidos podem continuar exigindo validação; “presente” não significa “correto”. Estudos e consensos de 2025/2026 não foram autenticados por pesquisa externa.
- Os dados do aplicativo não foram alterados. As correções estão propostas neste relatório. Livros não resolvem preço, estoque, registro brasileiro vigente, bula atual, gotejador ou fotografia de produto. Não inventar esses dados.

## 2. Fontes disponíveis e regras para concluir

Prioridade: `C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf` e `C:/Users/luzau/OneDrive/Documentos/Livros/BSAVA Small Animal Formulary, Part A, Canine and Feline, 10th Edition (VetBooks.ir).pdf`. Outros livros do mesmo acervo podem complementar somente depois de localizar e ler as páginas pertinentes. Não citar Ettinger/Nelson/BSAVA por mera semelhança de assunto.

Para cada proposta, informe: medicamento/slug, seção/campo, texto atual ou lacuna, gravidade, texto completo proposto, fonte/edição/monografia/página impressa e página do PDF, espécie, indicação, via, formulação, unidade e limitações. Classifique cada item como **erro confirmado**, **lacuna de conteúdo**, **perda no carregamento**, **não aplicável**, **suspeita a confirmar** ou **não resolvido no acervo**. Não atribua status “confirmado” a suspeitas desta lista sem conferir a fonte.

Regras indispensáveis:

- Não fundir doses de livros diferentes em faixa única sem explicar a divergência; não trocar dose diária total por dose a cada tomada.
- Não confundir mg/kg, mg/animal, mg/m², mg/kg/dia e mg/kg/h; fornecer exemplos de cálculo somente após verificar formulação e base da dose.
- Citação presente ou ID de referência adicionado automaticamente não é validação clínica. Um formulário é referência terciária; não é ensaio clínico nível 1b.
- Separar dose rotulada, uso extra-label, estudo experimental, recomendação de consenso e relato de caso. Não completar um esquema histórico com promessa moderna de eficácia.
- Não inventar incidência “comum/rara” de reação sem denominador/fonte; se o livro apenas enumera efeitos, descrever frequência como não estabelecida.
- Um campo vazio opcional não é automaticamente uma falha clínica: diluição IV não se aplica a tratamento exclusivamente oral; tabela de peso, história, receita pronta e estudo comentado podem ser dispensáveis.
- Se o conteúdo existe em notes, administration, texto clínico ou outra aba, identificar lacuna de estrutura/exibição, sem afirmar que a informação clínica nunca foi escrita.
- Preservar a autoria e verificar metadados dos artigos. Se precisar de informações externas para regulação ou produto, entregar uma lista de documentos oficiais necessários; a solicitação original prioriza resolver pelo acervo.

## 3. Problemas transversais já encontrados

### 3.1 Conteúdo detalhado perdido quando o banco prevalece

SupabaseMedicationRepository.list usa mergeBySlug: o objeto remoto substitui inteiramente o local, não mescla as seções. mapMedicationRow não transporta quickIndications, detailedIndications, pharmacokineticsData, attentionData, generalInfoData, clinicalStudiesCommented, monitoringParameters, clientInformation, samplePrescriptionText nem practicalWeightTable. applyMedicationBookFoundations repõe fundamentos e algumas referências, mas não reconstitui todas essas seções. Isso atinge as três fichas coincidentes.

| Ficha | Doses locais | Doses após banco | Apresentações locais | Após banco |
|---|---:|---:|---:|---:|
| alopurinol | 6 | 1 | 4 | 2 |
| fenobarbital | 5 | 2 | 6 | 3 |
| amoxicilina-clavulanato | 5 | 2 | 5 | 2 |

**Pedido à IA:** propor como preservar as seções, restaurar dose/apresentação completa e verificar ambos os caminhos, sem executar alterações. Não pedir um novo texto para um dado que já existe localmente. O mapper de referências também descarta entradas sem citationText/citation/label e perde metadados estruturados de título/autores/ano; apontar as referências afetadas antes de substituir dados.

### 3.2 Unidade estruturada e fonte de dose

buildDoseSummaryLabel e buildClinicalDoseLabel concatenam doseUnit/perWeightUnit. Há unidades redundantes no seed. O problema de rótulo é demonstrável pelo código; não foi presumido que toda rotina de cálculo necessariamente usa o mesmo caminho.

| Ficha | IDs com representação redundante |
|---|---|
| alopurinol | dose-allo-dog-urate-dissolution → mg/kg/kg; dose-allo-dog-urate-prevention → mg/kg/kg; dose-allo-dog-leishmania-combo → mg/kg/kg; dose-allo-dog-leishmania-renal → mg/kg/kg; dose-allo-cat-leishmania → mg/kg/kg; dose-allo-cat-urate-historical → mg/kg/kg |
| amitriptilina | dose-amit-dog-behavior → mg/kg/kg; dose-amit-dog-neuropathic → mg/kg/kg; dose-amit-dog-pruritus → mg/kg/kg; dose-amit-cat-behavior → mg/kg/kg; dose-amit-cat-fic-refractory → mg/kg/kg |
| clorambucil | dose-chlorambucil-cat-small-cell-pulse → mg/m²/m²; dose-chlorambucil-dog-ple-acvim2026 → mg/m²/m²; dose-chlorambucil-dog-metronomic → mg/m²/m²; dose-chlorambucil-dog-cll-bsava → mg/m²/m²; dose-chlorambucil-dog-chop-substitute → mg/kg/kg; dose-chlorambucil-dog-imd-general → mg/kg/kg |
| mirtazapina | dose-mirt-dog-appetite-formulatory → mg/kg/kg; dose-mirt-dog-appetite-conservative-2025 → mg/kg/kg |

Proposta: guardar `doseUnit=mg` com `perWeightUnit=kg` ou `m²` para os respectivos regimes; dose fixa deve continuar fixa. Não converter superfície corporal em peso por fator improvisado. CRI e dose diária total precisam de unidade temporal explícita, mesmo quando o texto já a descreve.

### 3.3 Referências incorretas ou extrapoladas

- Capromorelina: monografia não localizada no BSAVA 10 fornecido; atribuição p. 61–62 não corresponde a Capromorelin.
- Dipirona: não há monografia isolada Metamizole em p. 252–253 do BSAVA fornecido; referência localizada é à associação com butilescopolamina, p. 55–56. Essa associação não fundamenta automaticamente a dipirona isolada.
- Ceftriaxona: p. 68–72 do BSAVA não é uma monografia de ceftriaxona. Há outras cefalosporinas, incluindo cefotaxima. Não transferir posologia.
- Ampicilina/sulbactam: a monografia Ampicillin do BSAVA não equivale à monografia da associação.
- Pronefra: monografia Chitosan/Ipakitine p. 75 e monografia Calcium, Oral não são monografias da combinação comercial Pronefra.
- Ciclosporina: o começo de Ciclosporin no BSAVA é p. 81 (PDF 97), e não p. 83. Clorambucil começa na p. 75 (PDF 91), e não p. 76. Intervalos citados devem ser revistos após conferir onde cada monografia termina.
- Vários fundamentos de livros têm referenceIds=[] por construção. Acrescentar na proposta ligação precisa da afirmação à fonte, mesmo que a bibliografia geral já liste livros. Não exigir estudo primário fictício para uma explicação de formulário.

### 3.4 Principais divergências clínicas para priorizar

- Prednisolona: dose diária integral oferecida com q12h ou q24h pode duplicar o total diário; separar o fracionamento.
- Enrofloxacina: entrada both com faixa até 10 mg/kg conflita com limite felino de 5 mg/kg/dia expresso no texto.
- Acetilcisteína: faixa IV de ataque também apresentada como oral, embora Plumb’s diferencie 140–180 mg/kg IV de 280 mg/kg oral. BSAVA apresenta esquema próprio que deve permanecer identificado.
- Dipirona: via oral, febre/cólica e manutenção canina não são todos demonstrados pela seção Dosages de Plumb’s citada; alternativas felinas de 12,5 q12h e 25 q24h precisam de linhas distintas.
- Meloxicam: followUpPhases contém manutenção, mas o rótulo da entrada de dor aguda continua com 0,2 mg/kg q24h; alinhar todas as representações de ataque/manutenção.
- Sulfonamida/trimetoprima: três presentationId inexistentes; não há validação automática de concentração/volume para esses vínculos.

## 4. Dossiês individuais — todas as 32 fichas públicas

### 01. Acetilcisteína — `acetilcisteina`

**Achado principal:** Divergência confirmada de atribuição de dose por via.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (4) | presente (4) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (4) | presente (4) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (5) | presente (5) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (16) | presente (16) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** A dose dose-nac-intox-paracetamol-attack reúne 140–180 mg/kg IV e VO. Plumb’s p. 13, seção Dosages, distingue ataque IV de 140–180 mg/kg de ataque oral de 280 mg/kg por sonda, seguido de 70 mg/kg q6h por pelo menos sete administrações. BSAVA p. 3–4 apresenta outro esquema IV, de 140–280 mg/kg. Não fundir os dois livros nem as vias em uma faixa única. Separar os esquemas por fonte; a diluição a 5% corresponde a 50 mg/mL, e Plumb’s exige filtro de 0,2 µm e infusão em 15–20 minutos. Nebulização pode causar broncoespasmo e exige cautela especial em doença broncoespástica. Completar monitoramento de resposta clínica, vômitos e reações durante a infusão; orientar o tutor sobre odor/sabor desagradável e retorno se houver intolerância.

**Pedido específico à IA:** Reestruturar ataque IV e oral em linhas independentes; esclarecer duração mínima e critérios de extensão, técnica de nebulização e preparo estéril oftálmico. Conferir a indicação e a frequência de cada via na monografia correspondente.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-nac-intox-paracetamol-attack / both | 140–180 mg/kg | por via intravenosa lenta (diluída a 5%) ou por via oral por sonda / dose de ataque única | nenhum dos cinco campos |
| ↳ fases seguintes de dose-nac-intox-paracetamol-attack | [{"doseValue": 70, "frequency": "a cada 6 horas", "duration": "por pelo menos 7 doses consecutivas (até 17 doses em ingestão maciça)", "route": "por via intravenosa lenta ou por via oral"}] | já presentes | conferir coerência de exibição |
| dose-nac-intox-paracetamol-maintenance / both | 70 mg/kg | por via intravenosa lenta ou por via oral / a cada 6 horas | nenhum dos cinco campos |
| dose-nac-mucolitico-nebulizacao / dog | 50 mg/paciente | por inalação (nebulização com solução a 2%) / a cada 8 a 12 horas | nenhum dos cinco campos |
| dose-nac-melting-oftalmico / both | 1–2 gotas/olho | por via tópica oftálmica (colírio estéril 5%) / a cada 4 a 6 horas | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-alihosseini-2026: N-acetylcysteine reduces serum creatinine, blood urea nitrogen, symmetric dimethylarginine and urine protein to creatinine ratio in cats with chronic kidney disease: a double-blind, placebo-controlled clinical trial
- ref-toth-2026: Clinical pharmacology, therapeutic applications, and safety profile of N-acetylcysteine in canine and feline medicine: a systematic review of 71 veterinary studies
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 02. Alopurinol — `alopurinol`

**Achado principal:** Perda de conteúdo no caminho remoto e unidade duplicada no local.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | ausente | ausente |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | ausente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (1) | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | ausente |
| Precauções explicadas (attentionData.precautions) | presente (6) | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (6) | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | ausente |
| Monitoramento próprio (monitoringParameters) | presente (7) | ausente |
| Informação ao tutor (clientInformation) | presente (6) | ausente |
| Apresentações (presentations) | presente (4) | presente (2) |
| Tabela de peso (practicalWeightTable) | presente | ausente |
| Modelo de receita (samplePrescriptionText) | presente | ausente |
| Referências (references) | presente (19) | presente (6) |
| Site oficial (officialSiteUrl) | presente | ausente |
| Bula (leafletUrl) | presente | ausente |
| Imagem (imageUrl) | presente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Resumo rápido; Indicações detalhadas; Ajustes posológicos; Interações detalhadas. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** O banco mantém apenas uma dose canina para leishmaniose; a ficha local tem seis. No local, todas usam doseUnit=mg/kg e perWeightUnit=kg, gerando mg/kg/kg. Normalizar a unidade somente em proposta, sem alterar agora. Plumb’s p. 37–39 e BSAVA p. 11–12 sustentam a inibição da xantina oxidase, o risco de xantinúria/urolitíase e a necessidade de dieta com baixo teor de purinas nos protocolos de urato. Na leishmaniose, o medicamento é leishmaniostático e a resposta não equivale a eliminação do agente. Completar precauções renais, acompanhamento urinário e sinais de obstrução; não inventar uma redução percentual universal para toda DRC.

**Pedido específico à IA:** Reconstruir as seções locais perdidas no caminho remoto; discriminar leishmaniose, dissolução/prevenção de uratos e evidência felina. Justificar especificamente a linha de dose renal e cada regime felino, que não devem ganhar validação apenas por receberem um ID de referência de livro.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-allo-dog-urate-dissolution / dog | 15 mg/kg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-allo-dog-urate-prevention / dog | 5–7 mg/kg/kg | VO / q12–24h | monitoring, clinicalContext, evidenceLevel |
| dose-allo-dog-leishmania-combo / dog | 10 mg/kg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-allo-dog-leishmania-renal / dog | 5 mg/kg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-allo-cat-leishmania / cat | 10–20 mg/kg/kg | VO / q12–24h | monitoring, clinicalContext, evidenceLevel |
| dose-allo-cat-urate-historical / cat | 10–15 mg/kg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |

**Doses realmente preservadas no caminho remoto:**

- dose-alopurinol-lvc: 10–10 mg/kg; dog; VO; BID; duração: ausente.

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-leishvet-canine-2025: LeishVet Group. Practical Management of Canine Leishmaniosis. Guidelines Updated 2025. LeishVet; 2025. Disponível em: https://www.leishvet.org/wp-content/uploads/2025/09/FS-LeishVetC.pdf.
- ref-oliveira-xanthinuria-2025: Oliveira BC, Silva AC, Fontes MM, et al. Characterisation and evaluation of predisposing factors for the development of xanthinuria in dogs with leishmaniosis under allopurinol therapy. Parasit Vectors. 2025;18(1):98. doi:10.1186/s13071-025-06731-0.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 03. Amantadina (Cloridrato de Amantadina) — `amantadina`

**Achado principal:** Lacunas estruturadas e regimes especiais a contextualizar.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (4) | presente (4) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (9) | presente (9) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (4) | presente (4) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | presente (6) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (13) | presente (13) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 46 em diante e BSAVA p. 15–16 descrevem antagonismo NMDA e uso adjuvante na dor crônica, não garantia de analgesia isolada. BSAVA apresenta 3–5 mg/kg VO q24h em cães e início de 1 mg/kg VO q24h em gatos, titulável até 4 mg/kg conforme resposta. A excreção renal motiva cautela em disfunção renal. Acrescentar acompanhamento de benefício analgésico, comportamento e efeitos gastrointestinais; orientar que o efeito adjuvante exige reavaliação. O regime local de 14 mg/kg vem identificado como relato de caso e não deve ser tratado como dose rotineira respaldada pelo formulário.

**Pedido específico à IA:** Distinguir regimes de formulário, estudos recentes e relato isolado; verificar a faixa felina de 2–5 mg/kg e frequência q12h nas fontes específicas. Determinar indicação, duração de teste terapêutico e critérios de suspensão sem generalizar o relato de 14 mg/kg.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-amant-dog-oa-lascelles / dog | 3–5 mg/kg | Oral (VO) / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-amant-dog-wsava-range / dog | 2–5 mg/kg | Oral (VO) / A cada 12 ou 24 horas (q12h ou q24h) | nenhum dos cinco campos |
| dose-amant-dog-dlss-caterino / dog | 3 mg/kg | Oral (VO) / A cada 12 horas (monoterapia) ou a cada 24 horas (associada a meloxicam) | nenhum dos cinco campos |
| dose-amant-cat-oa-chronic / cat | 2–5 mg/kg | Oral (VO) / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-amant-cat-bsava-titration / cat | 1–4 mg/kg | Oral (VO) / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-amant-both-windup-cancer / both | 3–5 mg/kg | Oral (VO) / A cada 12 a 24 horas (q12-24h) | nenhum dos cinco campos |
| dose-amant-dog-case-report-14 / dog | 14 mg/kg | Oral (VO) / A cada 24 horas (q24h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** pres-amant-caps-mag-custom/opt-caps-5: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-amant-caps-mag-custom/opt-caps-10: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-amant-caps-mag-custom/opt-caps-25: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-amant-caps-mag-custom/opt-caps-50: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue). Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-caterino-2025: Caterino C, Della Valle G, Aragosa F, et al. Amantadine as a therapeutic option for neuropathic pain in dogs with degenerative lumbosacral stenosis. BMC Vet Res. 2025;21:469. doi:10.1186/s12917-025-04911-9. PMID: 40671053.
- ref-hogberg-2025: Hogberg B, Marshall K, Vardanega M. Successful Treatment With Intravenous Lipid Emulsion of Accidental Amantadine Overdose: A Case Report. Vet Med Sci. 2025;11(3):e70402. doi:10.1002/vms3.70402. PMID: 40359215.
- ref-vin-2025: Veterinary Information Network. VIN Veterinary Drug Handbook — Amantadine. Davis, CA: VIN; revisado em 27/08/2025.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 04. Amitriptilina (Cloridrato de Amitriptilina) — `amitriptilina`

**Achado principal:** Unidade duplicada e seções detalhadas ausentes.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (2) | presente (2) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (7) | presente (7) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (7) | presente (7) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (9) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | presente (6) |
| Monitoramento próprio (monitoringParameters) | presente (7) | presente (7) |
| Informação ao tutor (clientInformation) | presente (8) | presente (8) |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (18) | presente (18) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Indicações detalhadas; Ajustes posológicos; Interações detalhadas. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Cinco regimes locais codificam mg/kg/kg. Plumb’s p. 59–60 e BSAVA p. 22–23 sustentam a classe tricíclica, ações monoaminérgicas e efeitos anticolinérgicos, com cautela para retenção urinária, arritmias e associação a outros fármacos serotoninérgicos. A utilidade em cistite idiopática felina não permite apresentá-la como intervenção universal para crises agudas. O trecho dos fundamentos que prescreve bicarbonato de sódio 8,4%, 2–3 mEq/kg, requer fonte toxicológica específica e monitoramento; não está validado nesta auditoria apenas pela presença de referências gerais.

**Pedido específico à IA:** Criar indicações detalhadas, ajuste individual e interações estruturadas; separar mg/gato de mg/kg; auditar a alegação de tratamento de superdose e os números de farmacocinética atribuídos a estudos. Diferenciar contraindicação comprovada, cautela e falta de indicação.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-amit-dog-behavior / dog | 1–2 mg/kg/kg | VO / q12–24h | monitoring, clinicalContext, evidenceLevel |
| dose-amit-dog-neuropathic / dog | 1–4 mg/kg/kg | VO / q12–24h | monitoring, clinicalContext, evidenceLevel |
| dose-amit-dog-pruritus / dog | 1–2.2 mg/kg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-amit-cat-behavior / cat | 0.5–1 mg/kg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-amit-cat-fic-refractory / cat | 0.5–1 mg/kg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-amit-cat-fic-high-chew / cat | 10 mg/gato | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-amit-cat-neuropathic / cat | 2.5–5 mg/gato | VO / q24h | monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-icatcare-fic-2025: Taylor S, Boysen S, Buffington T, et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. J Feline Med Surg. 2025;27(2):1098612X241309176. doi:10.1177/1098612X241309176.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 05. Amoxicilina + Clavulanato de Potássio — `amoxicilina-clavulanato`

**Achado principal:** Perda de seções locais e de concentrações no registro remoto.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | ausente |
| Indicações aprofundadas (detailedIndications) | presente (5) | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | ausente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (1) | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | ausente |
| Precauções explicadas (attentionData.precautions) | presente (5) | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (4) | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (4) | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (4) | ausente |
| Diluição/compatibilidade (DILUTION) | presente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | presente (4) | ausente |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (2) |
| Tabela de peso (practicalWeightTable) | presente | ausente |
| Modelo de receita (samplePrescriptionText) | presente | ausente |
| Referências (references) | presente (17) | presente (8) |
| Site oficial (officialSiteUrl) | presente | ausente |
| Bula (leafletUrl) | presente | ausente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | presente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** O banco tem duas doses genéricas e duas apresentações sem concentração numérica; o seed contém cinco doses e várias seções detalhadas. Plumb’s p. 70–73 e BSAVA Co-amoxiclav p. 98–99 dão base para separar a dose da associação total da dose apenas de amoxicilina e esclarecer a proporção da formulação. A ação é dependente do tempo acima da concentração inibitória. Completar monitoramento de resposta, tolerância gastrointestinal e hipersensibilidade; orientar administração conforme a formulação e reavaliação de falha terapêutica. A duração de cistite ou piodermite não pode ser inferida de uma dose genérica para qualquer infecção.

**Pedido específico à IA:** Restaurar o conteúdo que se perde na substituição remota; explicitar a base da dose e o significado comercial de 50/250 mg. Conferir durações por doença com as fontes realmente citadas, inclusive as que são posteriores aos livros.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-amox-clav-standard-4-1 / both | 12.5 mg/kg | Oral (VO junto ao alimento) / A cada 12 horas (q12h) | evidenceLevel |
| dose-amox-clav-pyoderma-deep / dog | 12.5–13.75 mg/kg | Oral (VO com alimento) / A cada 12 horas (q12h) | evidenceLevel |
| dose-amox-clav-uti-short / both | 12.5–25 mg/kg | Oral (VO) / A cada 12 horas (ou q8h na faixa de 25 mg/kg) | evidenceLevel |
| dose-amox-clav-feline-abscess / cat | 12.5 mg/kg | Oral (VO) / A cada 12 horas (q12h) | evidenceLevel |
| dose-amox-clav-dog-cistite / dog | 12.5–25 mg/kg | VO / q8–12h | monitoring, clinicalContext, evidenceLevel |

**Doses realmente preservadas no caminho remoto:**

- dose-amox-clav-dog: 12.5–25 mg/kg; dog; VO; BID; duração: ausente.
- dose-amox-clav-cat: 12.5–20 mg/kg; cat; VO; BID; duração: ausente.

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** pres-synulox-50mg/conc-synulox-50mg: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-synulox-250mg/conc-synulox-250mg: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-agemoxi-cl-50mg/conc-agemoxi-50mg: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-agemoxi-cl-250mg/conc-agemoxi-250mg: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-susp-oral-625mg-ml/conc-susp-625mg: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue). Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-iscaid-pyoderma-2025: Morris DO, Loeffler A, Davis GM, et al. Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis (Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases - ISCAID 2025 Update). Vet Dermatol. 2025;36(1):vde.13342. doi: 10.1111/vde.13342.
- ref-vasuntrarak-2025-bioequivalence-bmc: Vasuntrarak K, Patthanachai K, Charoenlertkul P, Nuanualsuwan S, Cheng H, Suanpairintr N. Comparative bioavailability study of two oral formulations of amoxicillin-clavulanic acid in healthy dogs. BMC Vet Res. 2025;21:173. doi: 10.1186/s12917-025-04649-4.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 06. Ampicilina + Sulbactam (Injetável) — `ampicilina-sulbactam`

**Achado principal:** Atribuição excessiva ao BSAVA e esquema renal a justificar.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (4) | presente (4) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (6) | presente (6) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (4) | presente (4) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (2) | presente (2) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (15) | presente (15) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 82–84 tem monografia da associação; BSAVA p. 27–28 é Ampicillin e não valida automaticamente todos os regimes de ampicilina/sulbactam. Especificar se os miligramas representam a associação total ou o componente ampicilina, com a proporção 2:1. Monitorar função renal, resposta infecciosa, hipersensibilidade e acesso venoso. Não reutilizar diluições/estabilidade de ampicilina isolada como se fossem da associação. A linha de 22 mg/kg q12h para paciente azotêmico precisa de fundamento próprio, pois a gravidade e a função renal alteram a decisão.

**Pedido específico à IA:** Confirmar a base de cada dose, diluente, concentração final, tempo de infusão, estabilidade e ajuste renal da associação. Separar sepse, profilaxia e infecção sensível; completar orientação de enfermagem e comunicação ao tutor.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-amp-sulb-standard / both | 22–30 mg/kg | IV lenta / A cada 8 horas (q8h; até q6h em sepse) | nenhum dos cinco campos |
| dose-amp-sulb-sepsis-crit / both | 30 mg/kg | IV lenta diluída / A cada 6 a 8 horas (q6h a q8h) | nenhum dos cinco campos |
| dose-amp-sulb-azotemic / dog | 22 mg/kg | IV lenta / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-amp-sulb-prophylaxis / both | 22 mg/kg | IV lenta / 30 a 60 min pré-incisão; redose q90-120min se cirurgia longa | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** pres-amp-sulb-15g/conc-375mg-ml: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-amp-sulb-30g/conc-375mg-ml-3g: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue). Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-wang-2025-azotemia-pk: Wang Z, Shropshire S, Gustafson D, et al. Pharmacokinetics of Ampicillin-Sulbactam in Azotemic and Non-Azotemic Dogs. J Vet Pharmacol Ther. 2025;48:241-249. doi: 10.1111/jvp.13506.
- ref-goggs-2025-critically-ill-dogs: Goggs R, Robbins S, Menard J, et al. Intravenous Ampicillin/Sulbactam in Critically Ill Dogs has Variable Pharmacokinetics. J Vet Pharmacol Ther. 2025;48(6):445-456. doi: 10.1111/jvp.70004.
- ref-vet-journal-2025-anesthesia-pk: Pressiat C, et al. Population pharmacokinetics of intravenous ampicillin in awake and anaesthetised dogs. Vet J. 2025;314:106435. doi: 10.1016/j.tvjl.2025.106435.
- ref-anvisa-in-360-2025: Agência Nacional de Vigilância Sanitária (ANVISA). Instrução Normativa IN nº 360, de 23 de abril de 2025. Lista de substâncias antimicrobianas sujeitas a controle e retenção de receita.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 07. Betanecol (Cloreto de Betanecol) — `betanecol`

**Achado principal:** Monitoramento e orientação estruturados ausentes.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (4) | presente (4) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (4) | presente (4) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (3) | presente (3) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (4) | presente (4) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (2) | presente (2) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (5) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (12) | presente (12) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 130 em diante e BSAVA Bethanecol p. 45–46 descrevem agonismo muscarínico. Antes do uso urinário, excluir obstrução mecânica e assegurar que a resistência de saída esteja controlada; aumentar contração do detrusor contra obstrução pode causar dano. Monitorar esvaziamento vesical e sinais colinérgicos, como salivação, vômitos, diarreia e bradicardia. Explicar que dose por animal não é dose por kg. As doses propostas para megaesôfago/disautonomia exigem avaliação da resposta e não garantem restituição da motilidade.

**Pedido específico à IA:** Completar monitoramento e informação ao tutor; separar os regimes de Plumb’s e BSAVA e justificar indicações não urinárias. Conferir a grafia Bethanecol no BSAVA, para não deixar de localizar a monografia.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-beth-cat-post-obstruction / cat | 1.25–5 mg/animal | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-beth-cat-detrusor-atony / cat | 1.25–5 mg/animal | Oral (VO) / A cada 8 horas (q8h) ou a cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-beth-dog-detrusor-atony-bsava / dog | 2.5–15 mg/animal | Oral (VO) / A cada 8 horas (q8h) | nenhum dos cinco campos |
| dose-beth-dog-detrusor-atony-plumb / dog | 2.5–25 mg/animal | Oral (VO) / A cada 8 horas (TID; alguns respondem a cada 12 horas) | nenhum dos cinco campos |
| dose-beth-dog-megaesophagus / dog | 5–15 mg/animal | Oral (VO) / A cada 8 horas (q8h) | nenhum dos cinco campos |
| dose-beth-cat-dysautonomia / cat | 1–2.5 mg/animal | Oral (VO) / A cada 8 a 12 horas (q8-12h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 08. Buprenorfina (Cloridrato de Buprenorfina) — `buprenorfina`

**Achado principal:** Formulação específica precisa permanecer vinculada ao regime.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (4) | presente (4) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (6) | presente (6) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (5) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (13) | presente (13) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 150–154 e BSAVA p. 53–55 distinguem formulações e vias. A dose felina de 0,24 mg/kg SC q24h está associada ao produto concentrado Simbadol 1,8 mg/mL; não é substituição automática pela injetável convencional. Plumb’s limita esse esquema rotulado a até três dias e informa que o produto concentrado não deve ser dispensado para aplicação domiciliar pelo tutor. Na via transmucosa felina, depositar na mucosa bucal, sem confundir com medicamento deglutido. Monitorar analgesia, ventilação, sedação e temperatura, sobretudo em gatos.

**Pedido específico à IA:** Vincular cada regime à concentração/produto e via corretos; explicar limites de duração e enfermagem. Codificar CRI com unidade por hora e separar analgesia de pré-medicação.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-buprenorfina-gato-pos-op / cat | 0.02–0.04 mg/kg | Oral Transmucosa (OTM), Intravenosa (IV) ou Intramuscular (IM) / A cada 6 a 8 horas (q6-8h) | nenhum dos cinco campos |
| dose-buprenorfina-cao-pos-op / dog | 0.01–0.02 mg/kg | Intravenosa (IV) ou Intramuscular (IM) / A cada 6 a 8 horas (q6-8h) | nenhum dos cinco campos |
| dose-buprenorfina-mpa-cao-gato / both | 0.01–0.02 mg/kg | Intravenosa (IV) ou Intramuscular (IM) / Dose única na indução pré-cirúrgica (30 a 45 min antes do procedimento) | nenhum dos cinco campos |
| dose-buprenorfina-cri-cao / dog | 0.0025 mg/kg | Intravenosa Contínua (IV CRI) / Infusão contínua horária (mg/kg/h) | nenhum dos cinco campos |
| dose-buprenorfina-simbadol-gatos / cat | 0.24 mg/kg | Subcutânea (SC) / A cada 24 horas (q24h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 09. Capromorelina (Elura™ / Entyce™) — `capromorelina`

**Achado principal:** Referência BSAVA atribuída a monografia não localizada.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (3) | presente (3) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (1) | presente (1) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (4) | presente (4) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (3) | presente (3) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (3) | presente (3) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (2) | presente (2) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (12) | presente (12) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 182–184 diferencia 3 mg/kg VO q24h em cães para estimulação de apetite e 2 mg/kg VO q24h em gatos com perda de peso associada à DRC. Essa indicação felina não equivale a todo gato inapetente. Monitorar ingestão, peso, vômitos/diarreia e doença de base; estimulante não substitui diagnóstico, controle de náusea ou suporte nutricional. Não foi localizada monografia Capromorelin no BSAVA 10 fornecido; as páginas 61–62 atribuídas no código pertencem à região de Carbimazole/Carboplatin. A farmacologia da grelina não valida o registro brasileiro atual dos produtos.

**Pedido específico à IA:** Substituir a atribuição BSAVA incorreta por fonte realmente identificada. Diferenciar Elura/Entyce, concentração, espécie, indicação e limites do estudo; solicitar fonte oficial contemporânea apenas para disponibilidade/registro/bula brasileira.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-capromorelin-feline-ckd / cat | 2 mg/kg | Oral (VO) / A cada 24 horas (q24h) | evidenceLevel |
| dose-capromorelin-canine-appetite / dog | 3 mg/kg | Oral (VO) / A cada 24 horas (q24h) | evidenceLevel |
| dose-capromorelin-feline-extra-label / cat | 1–2 mg/kg | Oral (VO) / A cada 24 horas (q24h) | evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** pres-elura-20mg-ml/conc-elura-20mg-ml: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-entyce-30mg-ml/conc-entyce-30mg-ml: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue). Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-iris-2026-treatment-cats: International Renal Interest Society (IRIS). IRIS Treatment Recommendations for CKD in Cats (2026 Update). IRIS Kidney Guidelines, pp. 1-8; 2026.
- ref-wofford-2025-pivotal-jfms: Wofford JA, Milliken MacKinnon A, Heinen E. Capromorelin promotes weight gain in cats with unintended weight loss: a randomized, masked, placebo-controlled clinical trial. J Feline Med Surg. 2025;27(11). doi: 10.1177/1098612X251379924.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 10. Ceftriaxona — `ceftriaxona`

**Achado principal:** Monografia BSAVA incorretamente identificada.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (4) | presente (4) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (4) | presente (4) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (3) | presente (3) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (5) | presente (5) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (3) | presente (3) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (15) | presente (15) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 230–231 é a fonte específica da ceftriaxona. BSAVA p. 68–72 contém outras cefalosporinas, incluindo cefotaxima, e não uma monografia ceftriaxona: a busca no exemplar não localizou Ceftriaxone. Não transferir doses ou compatibilidades entre moléculas. Como cefalosporina parenteral, requer indicação microbiológica e acompanhamento de resposta, função orgânica e acesso venoso. Conferir separadamente reconstituição, diluente e incompatibilidades de cada produto; apresentação IM com anestésico local não pode ser automaticamente usada IV.

**Pedido específico à IA:** Revisar a referência BSAVA e a evidência da linha dose-ceftriaxona-sepse-hospitalar para ambas as espécies. Confirmar cada dose/via/frequência com Plumb’s ou livro específico, sem rotular farmacocinética experimental como eficácia clínica comprovada.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-ceftriaxona-dog-pk / dog | 50 mg/kg | IM ou SC / A cada 12 a 24 horas (q12h em sepse/grave; q24h em MIC baixa) | nenhum dos cinco campos |
| dose-ceftriaxona-cat-pk / cat | 25 mg/kg | IM ou SC / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-ceftriaxona-dog-meningite / dog | 15–50 mg/kg | Intravenosa Lenta / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-ceftriaxona-dog-endocardite / dog | 20 mg/kg | Intravenosa / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-ceftriaxona-lyme / dog | 25 mg/kg | Intravenosa ou Subcutânea / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-ceftriaxona-sepse-hospitalar / both | 25–50 mg/kg | Intravenosa Lenta em 30 minutos / A cada 12 horas (q12h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- bula-ceftriaxona-eurofarma: Bula Profissional Ceftriaxona Sódica IM com Diluente Lidocaína 1% — Eurofarma
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 11. Ciclosporina (Ciclosporina A / CsA) — `ciclosporina`

**Achado principal:** Múltiplas seções detalhadas ausentes.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (6) | presente (6) |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | ausente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | ausente | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | ausente | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | ausente | ausente |
| Precauções explicadas (attentionData.precautions) | ausente | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | ausente | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (3) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | ausente | ausente |
| Monitoramento próprio (monitoringParameters) | presente (8) | presente (8) |
| Informação ao tutor (clientInformation) | presente (6) | presente (6) |
| Apresentações (presentations) | presente (3) | presente (3) |
| Tabela de peso (practicalWeightTable) | ausente | ausente |
| Modelo de receita (samplePrescriptionText) | ausente | ausente |
| Referências (references) | presente (22) | presente (22) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Indicações detalhadas; Precauções detalhadas; Efeitos adversos detalhados; Ajustes posológicos; Interações detalhadas; Classificação detalhada; Técnica por via; Particularidades por espécie; Aspectos de prescrição; Modelo de receita; Tabela de peso; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s monografia sistêmica p. 322 em diante e BSAVA Ciclosporin p. 81–84 permitem preencher classificação como inibidor de calcineurina, precauções de imunossupressão e interações por metabolismo/transportadores. Formulações microemulsionadas e convencionais não são intercambiáveis por suposição; uso oftálmico tem dose e técnica próprias. Em gatos, evitar carne crua e caça devido ao risco de toxoplasmose. Monitorar tolerância gastrointestinal, infecção e parâmetros definidos pela indicação; níveis sanguíneos não substituem automaticamente a resposta clínica em toda doença.

**Pedido específico à IA:** Produzir as seções estruturadas de indicação, precauções, efeitos adversos, ajustes, interações, técnica e espécies a partir do conteúdo já existente e dos livros. Validar separadamente doses dermatológicas, imunossupressoras e oftálmicas; localizar páginas reais da monografia oftálmica antes de manter a atribuição 1357–1360.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-ciclo-dog-atopy / dog | 5 mg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-cat-fass / cat | 7 mg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-dog-perianal / dog | 5 mg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-dog-imha / dog | 5 mg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-dog-kcs / dog | 1 cm de tira/olho | Oftálmica / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-cat-stomatitis / cat | 2.5 mg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-dog-impa / dog | 5 mg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-cat-keratitis / cat | 1–2 gotas/olho | Oftálmica / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-ciclo-dog-sebadenitis / dog | 5 mg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 12. Ciproeptadina — `ciproeptadina`

**Achado principal:** Farmacocinética e várias seções ausentes; preenchimento possível pelos livros.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | ausente | ausente |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | ausente | ausente |
| Classificação (generalInfoData.pharmacologicalClassification) | ausente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | ausente | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | ausente | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | ausente | ausente |
| Precauções explicadas (attentionData.precautions) | ausente | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | ausente | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (3) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | ausente | ausente |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | ausente | ausente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (16) | presente (16) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Resumo rápido; Indicações detalhadas; Farmacocinética; Precauções detalhadas; Efeitos adversos detalhados; Ajustes posológicos; Interações detalhadas; Classificação detalhada; Técnica por via; Particularidades por espécie; Aspectos de prescrição; Monitoramento; Orientação ao tutor; Tabela de peso; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Proposta de farmacocinética baseada em Plumb’s p. 327–329: absorção oral satisfatória, dados de distribuição insuficientes para uma descrição quantitativa robusta, metabolismo predominantemente hepático e eliminação urinária de metabólitos; meia-vida felina aproximadamente 13 horas, com grande variabilidade. Não apresentar números como biodisponibilidade 101% e Vd 106 L/kg como propriedade universal. Proposta de segurança: sedação e sinais anticolinérgicos; cautela em retenção urinária, glaucoma de ângulo fechado e obstrução piloroduodenal; depressão central aditiva e interação funcional com outros orexígenos devem ser descritas com fonte. Monitorar ingestão, peso e sinais adversos. Plumb’s distingue apetite felino, 1–4 mg/gato VO q12–24h, de antídoto adjuvante na síndrome serotoninérgica; BSAVA p. 103–104 apresenta 0,1–0,5 mg/kg VO q8–12h, sem justificar fundir as recomendações.

**Pedido específico à IA:** Preencher ADME sem extrapolação humana; criar quadro de indicações e segurança. Rever o uso da palavra contraindicação para simples ineficácia, terapia insuficiente ou associação desaconselhada. Não afirmar antagonismo mútuo absoluto dos orexígenos sem demonstração. Para resgate toxicológico, informar dose, via, repetição e supervisão, sem transformá-lo em prescrição domiciliar genérica.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-cipro-cat-appetite-start / cat | 1 mg/gato/dose fixa por animal | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-cipro-cat-appetite-range / cat | 1–4 mg/gato/dose fixa por animal | VO / q12–24h | monitoring, clinicalContext, evidenceLevel |
| dose-cipro-dog-appetite / dog | 0.1–0.2 mg/kg | VO / q12–24h | monitoring, clinicalContext, evidenceLevel |
| dose-cipro-dog-serotonin / dog | 1.1 mg/kg | VO ou PR / q4–6h PRN conforme persistência ou recidiva dos sinais | monitoring, clinicalContext, evidenceLevel |
| dose-cipro-cat-serotonin / cat | 2–4 mg/gato/dose fixa por animal | VO ou PR / q4–6h PRN conforme persistência dos sinais | monitoring, clinicalContext, evidenceLevel |
| dose-cipro-cat-antihistamine / cat | 2–4 mg/gato/dose fixa por animal | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-cipro-dog-antihistamine / dog | 0.5–2 mg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-ray-2025-fate: Ray CC, Wolf J, Guillaumin J. Use of alteplase continuous rate infusion, pentoxifylline, and cyproheptadine in association or not, in acute feline aortic thromboembolism: a study of nine cats. Front Vet Sci. 2025;12:1512649.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 13. Clindamicina — `clindamicina`

**Achado principal:** Campos de acompanhamento ausentes e doses de indicações distintas.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (6) | presente (6) |
| Indicações aprofundadas (detailedIndications) | presente (6) | presente (6) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (7) | presente (7) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (6) | presente (6) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (6) | presente (6) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (7) | presente (7) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (9) |
| Estudos comentados (clinicalStudiesCommented) | presente (4) | presente (4) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (15) | presente (15) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 282–286 e BSAVA p. 91–93 sustentam o mecanismo lincosamida e o uso conforme agente/indicação. Em gatos, comprimidos/cápsulas administrados a seco podem provocar esofagite e estenose; orientar água ou alimento após a dose, de acordo com condição de deglutição. Monitorar resposta, tolerância gastrointestinal e parâmetros necessários em curso prolongado. Não tratar infecção bacteriana comum, toxoplasmose e neosporose como uma mesma duração ou faixa de dose. Via IV exige preparo e velocidade próprios.

**Pedido específico à IA:** Conferir dose e duração da toxoplasmose com envolvimento SNC e a indicação de piotórax IV; explicitar fonte por regime, prevenção de lesão esofágica e critérios de reavaliação.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-clinda-bacterial-clinbacter / both | 10 mg/kg | Oral (VO com alimento; gatos com água) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-clinda-pyoderma-iscaid / dog | 11 mg/kg | Oral (VO com refeição) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-clinda-osteomyelitis / dog | 11–33 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-clinda-feline-toxoplasmosis / cat | 12.5 mg/kg | Oral (VO com alíquota de água obrigatória) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-clinda-feline-toxo-cns / cat | 15–25 mg/kg | Oral (VO) ou IV intermitente lenta / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-clinda-canine-neosporosis / dog | 10–15 mg/kg | Oral (VO) / 10 mg/kg q8h ou 15 mg/kg q12h | nenhum dos cinco campos |
| dose-clinda-pyothorax-iv / both | 10 mg/kg | Intravenosa (IV intermitente lenta em 10 a 60 min) / A cada 12 horas (q12h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-iscaid-pyoderma-2025: Morris DO, Loeffler A, Davis GM, et al. Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis (ISCAID 2025 Update). Vet Dermatol. 2025;36(1):vde.13342. doi: 10.1111/vde.13342.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 14. Clorambucil (Clorambucila) — `clorambucil`

**Achado principal:** Seções de segurança ausentes e unidades duplicadas.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | ausente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | ausente | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | ausente | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | ausente | ausente |
| Precauções explicadas (attentionData.precautions) | ausente | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | ausente | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (3) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | ausente | ausente |
| Monitoramento próprio (monitoringParameters) | presente (6) | presente (6) |
| Informação ao tutor (clientInformation) | presente (8) | presente (8) |
| Apresentações (presentations) | presente (2) | presente (2) |
| Tabela de peso (practicalWeightTable) | ausente | ausente |
| Modelo de receita (samplePrescriptionText) | ausente | ausente |
| Referências (references) | presente (19) | presente (19) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Indicações detalhadas; Precauções detalhadas; Efeitos adversos detalhados; Ajustes posológicos; Interações detalhadas; Classificação detalhada; Técnica por via; Particularidades por espécie; Aspectos de prescrição; Modelo de receita; Tabela de peso; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 243–245 e BSAVA Chlorambucil p. 75–76 permitem preencher classe alquilante, mielossupressão, risco de infecção e acompanhamento hematológico. BSAVA orienta conservação de comprimidos refrigerados a 2–8 °C e protegidos de luz, além de precauções para citotóxicos. Protocolos de 2 mg/gato, mg/kg e mg/m² não são equivalentes. O esquema de 20 mg/m² q14d consta como alternativa para linfoma felino de pequenas células; não somar a um esquema contínuo. A referência local a consenso ACVIM 2026 não pode ser comprovada por livro de 2020/2023.

**Pedido específico à IA:** Criar toda a aba de atenção e técnica de manuseio; corrigir a representação mg/m²/m² e mg/kg/kg. Especificar hemograma, conduta diante de citopenia, protocolo oncológico, fonte de 2026 e duração por resposta; não habilitar cálculo de superfície corporal sem suporte apropriado.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-chlorambucil-cat-small-cell-lymphoma / cat | 2 mg/gato | VO / q48–72h | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-cat-small-cell-pulse / cat | 20 mg/m²/m² | VO / q14d | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-dog-ple-acvim2026 / dog | 2–4 mg/m²/m² | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-dog-metronomic / dog | 4 mg/m²/m² | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-dog-cll-bsava / dog | 2–6 mg/m²/m² | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-dog-chop-substitute / dog | 1.4 mg/kg/kg | VO / Dose única no dia programado do ciclo | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-dog-imd-general / dog | 0.1–0.2 mg/kg/kg | VO / q24–48h | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-cat-imd-general / cat | 2 mg/gato | VO / q48–72h | monitoring, clinicalContext, evidenceLevel |
| dose-chlorambucil-dog-immunosuppression-plumbs / dog | 1.95–4.5 mg/m² | VO / q24h inicialmente | duration, monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-acvim-ple-2026: Allenspach K, Dandrieux JRS, Gaschen F, Jergens AE, Kook PH, Marks SL, Simpson KW, Suchodolski JS. ACVIM-endorsed consensus statement and systematic review on chronic inflammatory enteropathy in dogs. J Vet Intern Med. 2026;40(1):aalaf017. doi:10.1093/jvimsj/aalaf017.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 15. Diazepam — `diazepam`

**Achado principal:** Monitoramento estruturado ausente e CRI sem unidade temporal estruturada.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (5) | presente (5) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (3) | presente (3) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (5) | presente (5) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (2) | presente (2) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (5) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (10) | presente (10) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 379 em diante e BSAVA p. 118–121 sustentam uso de resgate anticonvulsivante e distinguem uso oral de parenteral. Há risco de necrose hepática idiossincrática em gatos com administração oral; essa restrição não é equivalente a proibir resgate IV. Monitorar ventilação, sedação, circulação e atividade convulsiva. Diluição/compatibilidade e sorção em materiais dependem da formulação, devendo constar no protocolo de infusão. O regime CRI local é mg/kg/h no texto, mas doseUnit=mg e perWeightUnit=kg na estrutura: a taxa precisa de representação inequívoca.

**Pedido específico à IA:** Completar monitoramento, enfermagem e orientação ao tutor; auditar compatibilidade, repetição de bolus, limites cumulativos e contexto do regime de neurotoxicidade por metronidazol. Separar bloqueio de crise de terapia oral contínua.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-diaz-dog-status-iv / dog | 0.5–1 mg/kg | Intravenosa (IV lenta) / Dose única de emergência; pode repetir 1 vez após 2 min se a crise persistir | nenhum dos cinco campos |
| dose-diaz-dog-rectal / dog | 0.5–2 mg/kg | Retal (PR) / Dose única no episódio de crise | nenhum dos cinco campos |
| dose-diaz-dog-cri / dog | 0.1–2 mg/kg | Intravenosa (CRI) / Infusão contínua em taxa por hora (mg/kg/h) | nenhum dos cinco campos |
| dose-diaz-dog-metro-iv / dog | 0.43 mg/kg | Intravenosa (IV lenta) / Dose única inicial | nenhum dos cinco campos |
| ↳ fases seguintes de dose-diaz-dog-metro-iv | [{"doseValue": 0.43, "frequency": "A cada 8 horas (q8h)", "duration": "3 dias consecutivos", "route": "Oral (VO)"}] | já presentes | conferir coerência de exibição |
| dose-diaz-dog-metro-po / dog | 0.43 mg/kg | Oral (VO) / A cada 8 horas (q8h / TID) | nenhum dos cinco campos |
| dose-diaz-dog-preanest / both | 0.1–0.5 mg/kg | Intravenosa (IV lenta) / Dose única pré-operatória | nenhum dos cinco campos |
| dose-diaz-cat-status-iv / cat | 0.5–1 mg/kg | Intravenosa (IV lenta) / Dose única de emergência; reavaliar em 2 minutos | nenhum dos cinco campos |
| dose-diaz-dog-urethral / dog | 0.25–1 mg/kg | Oral (VO) / A cada 8 a 12 horas | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 16. Dipirona (metamizol) — `dipirona`

**Achado principal:** Regimes atuais excedem a sustentação explícita do formulário citado.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (7) | presente (7) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (10) | presente (10) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (6) | presente (6) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (7) | presente (7) |
| Estudos comentados (clinicalStudiesCommented) | presente (4) | presente (4) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (14) | presente (14) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 415 descreve analgesia perioperatória canina de 25 mg/kg IV antes ou imediatamente após cirurgia; não estabelece ali o regime universal VO/IV q8h por vários dias para febre/cólica. Para gatos, descreve alternativas pós-operatórias IV de 12,5 mg/kg q12h ou 25 mg/kg q24h. A linha felina local codifica 10–12,5 mg/kg mas também coloca 25 mg/kg no campo frequency, impossibilitando um único valor estruturado fiel. A monografia também não sustenta automaticamente a via oral felina ou cápsulas. No BSAVA 10 não foi localizada monografia isolada de metamizol: há referência à associação com butilescopolamina p. 55–56; p. 252–253 trata de outros fármacos. Monitorar analgesia, temperatura e tolerância; não extrapolar toxicologia equina para probabilidade quantitativa em cães/gatos.

**Pedido específico à IA:** Separar as alternativas felinas em doses distintas e classificar cada regime pela fonte real. Solicitar fonte específica para febre, cólica, uso oral e duração; retirar a atribuição genérica a BSAVA Metamizole 252–253. Conferir receita e tabela de peso que derivam desses esquemas.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-dipirona-cao-pos-op / dog | 25 mg/kg | IV lenta ou VO / A cada 8 horas (TID) | nenhum dos cinco campos |
| dose-dipirona-cao-febre / dog | 20–25 mg/kg | IV lenta ou VO / A cada 8 a 12 horas conforme temperatura | nenhum dos cinco campos |
| dose-dipirona-cao-colica / dog | 25 mg/kg | IV lenta ou IM profunda / A cada 8 horas | nenhum dos cinco campos |
| dose-dipirona-gato-pos-op / cat | 10–12.5 mg/kg | IV lenta ou VO em cápsula / A cada 12 horas (BID) ou 25 mg/kg a cada 24 horas (SID) | nenhum dos cinco campos |
| dose-dipirona-gato-febre / cat | 10–12.5 mg/kg | IV lenta ou VO / A cada 12 a 24 horas | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 17. Enrofloxacina — `enrofloxacina`

**Achado principal:** Faixa numérica conjunta oferece ambiguidade para gatos.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (4) | presente (4) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (4) | presente (4) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (5) | presente (5) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (5) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (12) | presente (12) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 450–454 e BSAVA p. 147–149 destacam retinotoxicidade felina e limite de 5 mg/kg/dia. A entrada dose-enrofloxacina-injetavel-hospitalar tem species=both e faixa de 5–10 mg/kg; o texto adicional restringe gatos a 5 mg/kg, mas a faixa estruturada continua permitindo 10. Separar as espécies na proposta. Fluoroquinolonas interagem com produtos de alumínio/cálcio/magnésio, reduzindo absorção oral; não misturar dose oral com segurança de qualquer solução injetável. Monitorar resposta microbiológica, hidratação, sinais neurológicos e alterações visuais.

**Pedido específico à IA:** Corrigir a discrepância estrutural espécie/faixa; verificar concentração, via parenteral e formulação autorizada para cada espécie. Especificar quando o regime canino de 10–20 mg/kg é justificável e qual a evidência por sítio de infecção.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-enrofloxacina-cao-padrao / dog | 5–10 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-enrofloxacina-cao-profundo / dog | 10–20 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-enrofloxacina-gato-teto / cat | 5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-enrofloxacina-injetavel-hospitalar / both | 5–10 mg/kg | Intramuscular ou Intravenosa Lenta / A cada 24 horas (q24h) [Gatos estritamente 5 mg/kg] | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 18. Gabapentina — `gabapentina`

**Achado principal:** Muitas seções ausentes; complemento de segurança possível.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | ausente | ausente |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | ausente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | ausente | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | ausente | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | ausente | ausente |
| Precauções explicadas (attentionData.precautions) | ausente | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | ausente | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (3) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | ausente | ausente |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (5) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (18) | presente (18) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Resumo rápido; Indicações detalhadas; Precauções detalhadas; Efeitos adversos detalhados; Ajustes posológicos; Interações detalhadas; Classificação detalhada; Técnica por via; Particularidades por espécie; Aspectos de prescrição; Monitoramento; Orientação ao tutor; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 568–570 e BSAVA p. 179–180 descrevem ligação à subunidade α2δ de canais de cálcio e uso adjuvante, sem equivaler a agonista direto GABA. Proposta de precauções: sedação e ataxia, cautela em função renal reduzida e associação a depressores centrais. Conferir excipientes: soluções humanas com xilitol podem causar toxicidade em cães. A retirada após uso crônico deve ser planejada, especialmente em paciente epiléptico. Doses de 50–100 mg/gato para consulta são fixas por animal e não mg/kg; separar ansiólise pontual de analgesia e anticonvulsão. Monitorar marcha, sedação e resposta da indicação.

**Pedido específico à IA:** Preencher indicação detalhada, segurança, técnica, particularidades e tutor. Justificar especificamente a dose para gato com DRC e a faixa de 25–30 mg/kg para fobia sonora; essas linhas não devem receber validação automática a partir da monografia geral.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-gaba-dog-neuropathic-start / dog | 5–10 mg/kg | VO / q8–12h | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-dog-neuropathic-maintenance / dog | 10–20 mg/kg | VO / q8h | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-dog-epilepsy-adj / dog | 10–20 mg/kg | VO / q8h | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-dog-storm-phobia / dog | 25–30 mg/kg | VO / dose única pontual administrada 90 a 120 minutos antes do evento sonoro | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-dog-previsit / dog | 10–30 mg/kg | VO / dose única administrada 90 a 120 minutos antes da consulta | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-cat-neuropathic / cat | 5–10 mg/kg | VO / q8–12h | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-cat-previsit-healthy / cat | 50–100 mg/gato/dose fixa por animal | VO / dose única administrada 90 a 120 minutos antes de colocar o animal na caixa de transporte | monitoring, clinicalContext, evidenceLevel |
| dose-gaba-cat-previsit-ckd / cat | 10 mg/kg | VO / dose única administrada cerca de 2 horas antes da consulta | monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 19. Hidróxido de Alumínio — `hidroxido-de-aluminio`

**Achado principal:** Dose diária total exige distinção de dose por tomada.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (3) | presente (3) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (1) | presente (1) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (6) | presente (6) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (6) | presente (6) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (6) | presente (6) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (8) | presente (8) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (3) | presente (3) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (3) | presente (3) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (13) | presente (13) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 44–46 e BSAVA p. 13–15 dão base para ação intestinal como quelante de fosfato e para acompanhamento de fósforo e tolerância. A faixa da ficha está em mg/kg/dia, dividida com refeições; não aplicar a dose diária inteira em cada refeição. Explicitar se os miligramas são do hidróxido de alumínio ou de alumínio elementar e qual a concentração do preparado. Monitorar fósforo, constipação e risco de acúmulo/toxicidade em tratamento prolongado. Separar de medicamentos cuja absorção seja afetada por antácidos/quelantes.

**Pedido específico à IA:** Definir base química da dose, fracionamento e titulação; verificar tabelas em mL e doseUnit/perWeightUnit. Completar acompanhamento, interação com outros orais e orientação de mistura ao alimento.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-aloh-ckd-initial / both | 30–60 mg/kg/dia | Oral (VO homogeneizado nas refeições) / Dose diária total dividida entre as refeições do dia | nenhum dos cinco campos |
| dose-aloh-ckd-titrated / both | 60–100 mg/kg/dia | Oral (VO com o alimento) / Dose diária total dividida entre as refeições | nenhum dos cinco campos |
| dose-aloh-antacid-empirical / both | 10–30 mg/kg | Oral (VO) / A cada 6 a 8 horas (junto ou logo após as refeições) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-iris-guidelines-2026: International Renal Interest Society (IRIS). IRIS Treatment Recommendations for Chronic Kidney Disease in Dogs and Cats (2026 Reissue / Updates). IRIS; 2026.
- ref-sheffler-2025-toxicity: Sheffler R, Karpf S, Rebolloso S, Miksicek V, Buchweitz JP, Puschner B, et al. Serum aluminum in 176 feline patients with application to the diagnostic approach to a tremoring patient with kidney disease receiving aluminum hydroxide therapy. BMC Vet Res. 2025;21:327. doi: 10.1186/s12917-025-04788-8. PMID: 40336076.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 20. Levetiracetam — `levetiracetam`

**Achado principal:** Campos de acompanhamento e diferenciação de formulações.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (5) | presente (5) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (5) | presente (5) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (3) | presente (3) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (6) | presente (6) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (5) | presente (5) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (8) | presente (8) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (17) | presente (17) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 746–748 e BSAVA p. 227–229 descrevem mecanismo ligado à proteína vesicular SV2A. Separar liberação imediata de prolongada; não triturar ou fracionar apresentação prolongada sem demonstração específica. Monitorar frequência de crises, sedação/ataxia e função renal conforme o paciente. Uso concomitante de fenobarbital pode alterar a exposição e exigir interpretação do regime. Dose de ataque, resgate retal, tratamento em pulso e manutenção não constituem uma única prescrição intercambiável.

**Pedido específico à IA:** Validar a entrada IV marcada both para ambos os animais e a fonte por regime; completar parâmetros e tutor, além de técnica de administração e instruções de dose omitida. Não apresentar resultados de amostra limitada como garantia de resposta individual.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-lev-dog-adj-ir / dog | 20–30 mg/kg | Oral (VO) / A cada 8 horas (q8h / TID) | nenhum dos cinco campos |
| dose-lev-dog-mono-ir / dog | 20–30 mg/kg | Oral (VO) / A cada 8 horas (q8h / TID) | nenhum dos cinco campos |
| dose-lev-dog-xr / dog | 30 mg/kg | Oral (VO) / A cada 12 horas (q12h / BID) | nenhum dos cinco campos |
| dose-lev-dog-status-iv / both | 30–60 mg/kg | Intravenosa (IV lenta) / Dose única de ataque; se necessário manutenção a cada 8 horas | nenhum dos cinco campos |
| dose-lev-dog-pulse-po / dog | 30 mg/kg | Oral (VO) / A cada 8 horas (q8h / TID) | nenhum dos cinco campos |
| dose-lev-dog-rectal / dog | 40 mg/kg | Retal (PR) / Dose única de resgate | nenhum dos cinco campos |
| dose-lev-cat-adj-ir / cat | 20 mg/kg | Oral (VO) / A cada 8 horas (q8h / TID) | nenhum dos cinco campos |
| dose-lev-cat-fars / cat | 20–25 mg/kg | Oral (VO) / A cada 8 horas (q8h / TID) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 21. Marbofloxacina — `marbofloxacina`

**Achado principal:** Regimes especiais exigem fonte individual.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (4) | presente (4) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (4) | presente (4) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (3) | presente (3) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (6) | presente (6) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (9) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | presente (6) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (7) | presente (7) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (18) | presente (18) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 796–798 e BSAVA p. 242–244 sustentam o mecanismo fluoroquinolona e os cuidados com seleção do antimicrobiano, animais em crescimento, convulsões e interações com cátions orais. Monitorar resposta, tolerância e função renal conforme o caso. Não supor que menor retinotoxicidade relativa em gatos signifique ausência de risco em qualquer dose. A linha para leishmaniose e a linha para micoplasmose não se justificam apenas pela indicação genérica antibacteriana.

**Pedido específico à IA:** Confirmar a sustentação de dose-marbo-dog-lvc-brasil e dose-marbo-cat-mycoplasma-haemofelis, e diferenciar uso registrado de experimental/alternativo. Auditar concentração e via do injetável marcado both.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-marbo-dog-piodermite-iscaid / dog | 5.5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-dog-cistite-resistente / dog | 2.75–5.5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-dog-cat-pielonefrite / both | 2.7–5.5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-dog-prostatite / dog | 2.7–5.5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-dog-respiratorio / dog | 2.7–5.5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-dog-lvc-brasil / dog | 2 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-cat-infeccoes-gerais / cat | 2–5.5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-cat-mycoplasma-haemofelis / cat | 2 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-marbo-injetavel-hospitalar / both | 2 mg/kg | Intravenosa Lenta ou Subcutânea / A cada 24 horas (q24h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- iscaid-pyoderma-guidelines-2025: Antimicrobial use guidelines for canine pyoderma by the International Society for Companion Animal Infectious Diseases (ISCAID)
- guideline-abcd-haemoplasmosis-2026: European Advisory Board on Cat Diseases (ABCD) Guideline for Haemoplasmosis in Cats
- diretrizes-brasileish-2025: Diretrizes Brasileish para o Diagnóstico, Tratamento e Prevenção da Leishmaniose Visceral Canina
- papich-2025-feline-fq-pkpd: Pharmacokinetic-pharmacodynamic modeling and proposed clinical breakpoints for fluoroquinolones in cats
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 22. Meloxicam — `meloxicam`

**Achado principal:** Ataque/manutenção precisam ser inequívocos em todas as representações.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (6) | presente (6) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (4) | presente (4) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (6) | presente (6) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (6) | presente (6) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (3) | presente (3) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (8) | presente (8) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (5) | presente (5) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (10) | presente (10) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (16) | presente (16) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 827–828 e BSAVA p. 250–252 distinguem dose inicial canina de 0,2 mg/kg e manutenção de 0,1 mg/kg q24h. A entrada de dor aguda local tem doseMin=0,2 e frequency=q24h, porém notes e followUpPhases preveem 0,1 a partir do segundo dia; portanto o faseamento existe, mas o resumo do regime pode sugerir 0,2 diariamente. Corrigir apenas a proposta de apresentação dos estágios, sem afirmar que toda a calculadora ignora followUpPhases. No gato, separar dose perioperatória, manutenção e uso crônico, com hidratação/função renal, menor dose eficaz e avaliação de risco; DRC não autoriza uso em todo paciente renal.

**Pedido específico à IA:** Conferir renderização do resumo, tabela de peso e receita para ataque/manutenção; separar situação estável de desidratação/hipotensão. Explicitar diferenças de registro entre países com fonte atual apenas se necessário, sem importar restrição de um país como regra brasileira.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-melox-dog-oa-oral / dog | 0.2 mg/kg | Oral (VO) / Dose única de ataque no Dia 1; a partir do Dia 2, seguir com dose de manutenção. | nenhum dos cinco campos |
| ↳ fases seguintes de dose-melox-dog-oa-oral | [{"doseValue": 0.1, "frequency": "A cada 24 horas (q24h)", "duration": "Manutenção contínua ou até reavaliação clínica", "route": "Oral (VO)"}] | já presentes | conferir coerência de exibição |
| dose-melox-dog-acute-oral / dog | 0.2 mg/kg | Oral (VO) / A cada 24 horas (q24h) | nenhum dos cinco campos |
| ↳ fases seguintes de dose-melox-dog-acute-oral | [{"doseValue": 0.1, "frequency": "A cada 24 horas (q24h)", "duration": "3 a 5 dias adicionais", "route": "Oral (VO)"}] | já presentes | conferir coerência de exibição |
| dose-melox-dog-periop-sc / dog | 0.2 mg/kg | Subcutânea (SC) ou Intravenosa (IV lenta) / Dose única perioperatória | nenhum dos cinco campos |
| dose-melox-cat-acute-periop / cat | 0.2 mg/kg | Subcutânea (SC) / Dose única perioperatória | nenhum dos cinco campos |
| ↳ fases seguintes de dose-melox-cat-acute-periop | [{"doseValue": 0.05, "frequency": "A cada 24 horas (q24h)", "duration": "Até 4 dias consecutivos", "route": "Oral (VO)"}] | já presentes | conferir coerência de exibição |
| dose-melox-cat-djd-chronic / cat | 0.05 mg/kg | Oral (VO) / A cada 24 horas (q24h) nos primeiros 3 a 5 dias; após, titular para a menor dose efetiva. | nenhum dos cinco campos |
| ↳ fases seguintes de dose-melox-cat-djd-chronic | [{"doseValue": 0.02, "frequency": "A cada 24 horas (q24h)", "duration": "Manutenção de longo prazo na menor dose eficaz", "route": "Oral (VO)"}] | já presentes | conferir coerência de exibição |
| dose-melox-cat-ckd-lowdose / cat | 0.02 mg/kg | Oral (VO) / A cada 24 horas (q24h) ou a cada 48 horas | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 23. Metadona (Cloridrato de Metadona) — `metadona`

**Achado principal:** CRI e vias neuraxiais/transmucosas exigem especificidade.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (5) | presente (5) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (6) | presente (6) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (8) | presente (8) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (8) | presente (8) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (2) | presente (2) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (13) | presente (13) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 842–846 e BSAVA p. 255 em diante sustentam analgesia opioide com acompanhamento de dor, sedação, ventilação e efeitos cardiovasculares. O regime CRI precisa de unidade mg/kg/h; não rotular como bolus em mg/kg. Via transmucosa é diferente de administração oral deglutida e deve ter evidência por espécie. Para epidural, confirmar formulação sem conservantes e técnica especializada; não transpor automaticamente as concentrações de ampolas comerciais.

**Pedido específico à IA:** Conferir dose, via, formulação e fonte dos regimes OTM felino e epidural both; preencher monitoramento/enfermagem e informação ao tutor. A classificação de controle especial brasileira precisa de fonte normativa contemporânea, não do estatuto britânico do BSAVA.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-metadona-cao-analgesia-aguda / dog | 0.1–0.5 mg/kg | Intravenosa (IV lenta) ou Intramuscular (IM) / A cada 3 a 4 horas (q3-4h) ou conforme reavaliação de escalas de dor | monitoring, clinicalContext |
| dose-metadona-cao-cri / dog | 0.1–0.12 mg/kg | Intravenosa contínua (CRI) / Por hora de infusão contínua (mg/kg/h) | monitoring, clinicalContext |
| dose-metadona-gato-analgesia-aguda / cat | 0.1–0.5 mg/kg | Intramuscular (IM) ou Intravenosa lenta (IV) / A cada 3 a 6 horas conforme escore de dor (Feline Grimace Scale ou Glasgow CMPS-F) | monitoring, clinicalContext |
| dose-metadona-gato-otm / cat | 0.4–0.6 mg/kg | Oral Transmucosa (OTM / bucal) / A cada 4 a 6 horas | monitoring, clinicalContext |
| dose-metadona-epidural / both | 0.1–0.3 mg/kg | Epidural lombossacra (L7-S1) / Dose única intraoperatória | monitoring, clinicalContext |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 24. Micofenolato de Mofetila (MMF) — `micofenolato-mofetila`

**Achado principal:** Faixas de dose e via felina experimental não são universais.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (6) | presente (6) |
| Indicações aprofundadas (detailedIndications) | presente (6) | presente (6) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (6) | presente (6) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (6) | presente (6) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (8) | presente (8) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (7) | presente (7) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | presente (6) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (5) | presente (5) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (19) | presente (19) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 920–922 e BSAVA p. 278–279 sustentam inibição da IMPDH pelo metabólito ativo, com risco gastrointestinal, mielossupressão e infecção. BSAVA apresenta 8–12 mg/kg q12h em doença imunomediada canina e uso IV lento em pelo menos duas horas; o regime felino de 10 mg/kg VO q12h é baseado em experiência limitada, com possível preferência por outros imunossupressores. Isso não valida automaticamente dose IV felina nem o extremo de 20 mg/kg para qualquer indicação. Monitorar hemograma, tolerância gastrointestinal e resposta; aplicar precauções no manuseio de agente citotóxico.

**Pedido específico à IA:** Verificar evidência específica de MUE, miastenia e via IV em gatos, e separar uso experimental. Completar acompanhamento e orientar contato diante de vômitos/diarreia persistentes, febre ou sinais infecciosos; não aplicar redução fixa sem fonte.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-mmf-dog-mue / dog | 10–20 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-mmf-dog-glomerulo / dog | 10 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-mmf-dog-itp / dog | 7–10 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-mmf-dog-dermatopathy / dog | 10–15 mg/kg | Oral (VO) / A cada 12 horas (ou 7 a 13 mg/kg VO q8h) | nenhum dos cinco campos |
| dose-mmf-dog-imha / dog | 8–12 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-mmf-cat-general / cat | 10 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-mmf-cat-iv-exp / cat | 10 mg/kg | Intravenosa (IV lenta em 2 horas) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-mmf-dog-mg / dog | 10–20 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** pres-mmf-caps-mag-custom/opt-caps-20: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-mmf-caps-mag-custom/opt-caps-50: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-mmf-caps-mag-custom/opt-caps-100: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-mmf-caps-mag-custom/opt-caps-150: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-mmf-caps-mag-custom/opt-caps-200: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue); pres-mmf-caps-mag-custom/opt-caps-250: concentração numérica/unidade incompletas (avaliar representação alternativa como unitValue). Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-bula-cellcept-2026: Produtos Roche Químicos e Farmacêuticos S.A. Bula do Profissional de Saúde: CellCept® (micofenolato de mofetila 500 mg). Aprovada pela ANVISA em 08/06/2026.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 25. Mirtazapina — `mirtazapina`

**Achado principal:** Resumo/indicações/ajustes/interações ausentes e unidades duplicadas em cães.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | ausente | ausente |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (2) | presente (2) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (6) | presente (6) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (7) | presente (7) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | presente (8) | presente (8) |
| Informação ao tutor (clientInformation) | presente (6) | presente (6) |
| Apresentações (presentations) | presente (6) | presente (6) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (18) | presente (18) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Resumo rápido; Indicações detalhadas; Ajustes posológicos; Interações detalhadas. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 893–896 e BSAVA p. 270–271 diferenciam dose oral e transdérmica e recomendam atenção à redução de depuração em doença renal/hepática. A apresentação transdérmica de 2 mg/gato q24h não é conversão automática de formulação manipulada nem de comprimido. Monitorar ingestão, peso, vocalização, agitação e sinais serotoninérgicos; orientar contato em suspeita de excesso e cuidado de contato com produto transdérmico. As duas doses caninas da ficha codificam mg/kg/kg. O regime identificado como estudo de 2025 precisa da publicação específica para validação dos resultados.

**Pedido específico à IA:** Criar o quadro por espécie, doença renal/hepática e via; justificar intervalos de 48–72h; normalizar unidades caninas. Conferir referências de estudos recentes sem inventar equivalência de absorção entre preparações.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-mirt-cat-inappetence-br / cat | 2 mg/animal | VO / q48h | nenhum dos cinco campos |
| dose-mirt-cat-inappetence-plumb / cat | 1.88 mg/animal | VO / q24h a q48h | nenhum dos cinco campos |
| dose-mirt-cat-ckd-plumb / cat | 1.88–2 mg/animal | VO / q48h | nenhum dos cinco campos |
| dose-mirt-cat-hepatic / cat | 1.88–2 mg/animal | VO / q48h a q72h | nenhum dos cinco campos |
| dose-mirt-cat-transdermal / cat | 2 mg/animal | TD / q24h | nenhum dos cinco campos |
| dose-mirt-dog-appetite-formulatory / dog | 1.1–1.3 mg/kg/kg | VO / q24h | nenhum dos cinco campos |
| dose-mirt-dog-appetite-conservative-2025 / dog | 0.5–0.6 mg/kg/kg | VO / q24h | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-theodoro-dogs-2025: Theodoro D, Quimby JM, et al. Evaluation of mirtazapine as an appetite stimulant in hospitalized and client-owned dogs: a prospective crossover clinical trial and retrospective cohort analysis. Animals (Basel). 2025;15(3):389. doi:10.3390/ani15030389.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 26. Fenobarbital — `fenobarbital`

**Achado principal:** Perda extensa no caminho remoto e informação de controle não mapeada.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | ausente |
| Indicações aprofundadas (detailedIndications) | presente (4) | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | ausente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | ausente |
| Precauções explicadas (attentionData.precautions) | presente (7) | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (8) | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (7) | ausente |
| Diluição/compatibilidade (DILUTION) | presente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | ausente |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (6) | presente (3) |
| Tabela de peso (practicalWeightTable) | presente | ausente |
| Modelo de receita (samplePrescriptionText) | presente | ausente |
| Referências (references) | presente (13) | presente (5) |
| Site oficial (officialSiteUrl) | presente | ausente |
| Bula (leafletUrl) | presente | ausente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** O seed tem cinco doses e seções detalhadas; a versão carregada do banco tem duas doses de manutenção e perde os campos estruturados. O mapper lê is_controlled, mas esse campo não veio nas colunas consultadas, convertendo-o em false; é um problema de representação que exige revisão do caminho de dados, sem concluir validade jurídica atual a partir disso. Plumb’s p. 1006–1011 e BSAVA p. 314–317 sustentam monitoramento de crises, concentração sérica quando indicada, hemograma e parâmetros hepáticos. Não interromper abruptamente tratamento contínuo sem cobertura anticonvulsivante e supervisão. Não transportar um único intervalo sérico como alvo universal entre espécie/laboratório/contexto.

**Pedido específico à IA:** Restaurar farmacocinética, efeitos adversos, interações, apresentações completas e monitoramento que já existem localmente. Validar doses de ataque e concentrações com contexto; corrigir o mapeamento de controle especial com fonte normativa brasileira atual.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-fenobarbital-dog-initial / dog | 2.5–3 mg/kg | VO / a cada 12 horas | monitoring, clinicalContext |
| dose-fenobarbital-cat-initial / cat | 1.5–2.5 mg/kg | VO / a cada 12 horas | monitoring, clinicalContext |
| dose-fenobarbital-convless-label / dog | 1.3–6 mg/kg | VO / a cada 12 horas | monitoring, clinicalContext |
| dose-fenobarbital-loading-status / both | 12–20 mg/kg | IV / dose cumulativa fracionada em bólus lentos | monitoring, clinicalContext |
| dose-fenobarbital-sialadenosis / dog | 1–2.5 mg/kg | VO / a cada 12 horas | monitoring, clinicalContext |

**Doses realmente preservadas no caminho remoto:**

- dose-fenobarbital-dog: 2.5–3 mg/kg; dog; VO; BID; duração: ausente.
- dose-fenobarbital-cat: 1.5–2.5 mg/kg; cat; VO; BID; duração: ausente.

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 27. Pradofloxacina — `pradofloxacina`

**Achado principal:** Faixas combinam espécies/formulações e indicações distintas.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (4) | presente (4) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (7) | presente (7) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (9) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | presente (6) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (13) | presente (13) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 1048–1050 e BSAVA p. 335–336 distinguem doses/formulações e indicam seleção criteriosa da fluoroquinolona. Não fundir suspensão felina, comprimidos e regimes de estudos como faixa intercambiável de 3–10 mg/kg. Monitorar resposta, efeitos gastrointestinais e sinais neurológicos; não prometer risco zero de toxicidade. Micoplasmose hemotrópica e bartonelose necessitam evidência clínica própria e objetivos de tratamento definidos.

**Pedido específico à IA:** Discriminar dose registrada, extra-label e estudo por espécie e formulação; conferir duração e justificativa para extremos de 7,5–10 mg/kg. Verificar a entrada para ITU marked both em relação à fonte específica.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-prado-cao-piodermite / dog | 3–5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-prado-cao-gato-itu / both | 3–5 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-prado-gato-feridas-abscessos / cat | 5–7.5 mg/kg | Oral (Suspensão 25 mg/mL ou Comprimido 15 mg) / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-prado-gato-respiratorio / cat | 5–7.5 mg/kg | Oral (Suspensão 25 mg/mL) / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-prado-gato-micoplasmose-hemotropica / cat | 5–10 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |
| dose-prado-gato-bartonelose / cat | 5–10 mg/kg | Oral / A cada 24 horas (q24h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 28. Prednisolona — `prednisolona`

**Achado principal:** Ambiguidade confirmada entre dose diária e dose por tomada.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (5) | presente (5) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (4) | presente (4) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (6) | presente (6) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (7) | presente (7) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (7) | presente (7) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (5) | presente (5) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (7) | presente (7) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (16) | presente (16) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** As linhas imunossupressoras codificam cães 2–3 mg/kg e gatos 2–4 mg/kg com frequency=q12h ou q24h; a nota felina fala explicitamente em mg/kg/dia. Aplicar o número integral q12h dobra o total diário. Plumb’s p. 1061–1062 explica que, quando o total diário é dividido, cada administração recebe sua fração; descreve exemplos caninos de 2 mg/kg/dia e alternativas de 50–60 mg/m²/dia para cães acima de 25 kg, com individualização. Não transformar teto ou dose de protocolo específico em regra para toda doença. Gatos absorvem/convertem prednisona de modo menos favorável, apoiando a preferência por prednisolona. Monitorar resposta, efeitos metabólicos, infecção e supressão adrenal; desmame depende de duração, dose e doença.

**Pedido específico à IA:** Separar mg/kg/dia de mg/kg por dose, definir o fracionamento q12h e calcular totais máximos corretamente. Conferir esquema anti-inflamatório, imunossupressor, reposição e oncológico separadamente; corrigir tabelas/receitas que possam repetir o valor diário em cada tomada.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-pred-dog-anti / dog | 0.5–1 mg/kg | VO / q12h–q24h | monitoring, clinicalContext, evidenceLevel |
| dose-pred-cat-anti / cat | 0.5–1.5 mg/kg | VO / q12h–q24h | monitoring, clinicalContext, evidenceLevel |
| dose-pred-dog-imuno / dog | 2–3 mg/kg | VO / q12h ou q24h | monitoring, clinicalContext, evidenceLevel |
| dose-pred-cat-imuno / cat | 2–4 mg/kg | VO / q12h ou q24h | monitoring, clinicalContext, evidenceLevel |
| dose-pred-reposicao / dog | 0.1–0.22 mg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |
| dose-pred-cat-reposicao / cat | 0.1–0.2 mg/kg | VO / q24h (pela manhã) | monitoring, clinicalContext, evidenceLevel |
| dose-pred-dog-onc / dog | 2 mg/kg | VO / q24h | monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-jablonski-2025: Jablonski SA, Strohmeyer JL, Buchweitz JP, Lehner AF, Langlois DK. Prednisolone pharmacokinetics in dogs with protein-losing enteropathy. J Vet Intern Med. 2025;39(1):e17277.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 29. Pronefra® — `pronefra`

**Achado principal:** Confusão de produto com componentes e referência de outra formulação.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (1) | presente (1) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (5) | presente (5) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (4) | presente (4) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (4) | presente (4) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (7) | presente (7) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (7) | presente (7) |
| Estudos comentados (clinicalStudiesCommented) | presente (4) | presente (4) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (1) | presente (1) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (14) | presente (14) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Pronefra é associação comercial; os livros não fornecem automaticamente uma monografia do produto completo. BSAVA p. 75 apresenta Chitosan/Ipakitine, em pó com composição própria, não a suspensão Pronefra. A dose de 200 mg/kg q12h dessa monografia não pode validar mL/kg de Pronefra. Plumb’s Calcium, Oral explica segurança de cálcio e interações, mas não valida o conjunto cálcio/magnésio/quitosana/hidrolisado nem todos os benefícios atribuídos ao produto. É possível propor acompanhamento de fósforo, cálcio e tolerância conforme composição, sem afirmar equivalência. As alegações vasculares/urêmicas e a dose comercial dependem de fonte própria.

**Pedido específico à IA:** Solicitar bula/rótulo oficial vigente para composição quantitativa, concentração, dose por espécie, estabilidade e alegações autorizadas; retirar atribuição de monografia inexistente ao produto. Separar dados de componentes da evidência da combinação; não preencher preço/registro/disponibilidade usando livros.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-pronefra-gato / cat | 0.25 mL/kg | Oral / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-pronefra-cao / dog | 0.2 mL/kg | Oral / A cada 12 horas (q12h) | nenhum dos cinco campos |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- virbac-pronefra-br: Pronefra® — Suplemento Alimentar para Suporte da Função Renal em Cães e Gatos: Monografia Técnica e Níveis de Garantia
- iris-guidelines-2026: IRIS Staging and Treatment Recommendations for CKD in Dogs and Cats (Updated 2026)
- ref-book-foundations-product-pronefra: Virbac Brasil. Pronefra: composição e modo de usar. Consultado em 19/09/2026.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 30. Sucralfato (Sacarose Octassulfatada de Alumínio) — `sucralfato`

**Achado principal:** Seções de segurança/técnica ausentes; preenchimento possível.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | ausente | ausente |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | ausente | ausente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | ausente | ausente |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | ausente | ausente |
| Prescrição/regulação (generalInfoData.prescriptionType) | ausente | ausente |
| Precauções explicadas (attentionData.precautions) | ausente | ausente |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | ausente | ausente |
| Ajustes de dose (attentionData.doseReductionGuidelines) | ausente | ausente |
| Interações explicadas (attentionData.drugInteractionsDetailed) | ausente | ausente |
| Diluição/compatibilidade (DILUTION) | ausente | ausente |
| Fundamentos (clinicalFoundationsData) | presente (3) | presente (3) |
| Estudos comentados (clinicalStudiesCommented) | ausente | ausente |
| Monitoramento próprio (monitoringParameters) | presente (5) | presente (5) |
| Informação ao tutor (clientInformation) | presente (6) | presente (6) |
| Apresentações (presentations) | presente (3) | presente (3) |
| Tabela de peso (practicalWeightTable) | ausente | ausente |
| Modelo de receita (samplePrescriptionText) | ausente | ausente |
| Referências (references) | presente (16) | presente (16) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | presente | presente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Indicações detalhadas; Precauções detalhadas; Efeitos adversos detalhados; Ajustes posológicos; Interações detalhadas; Classificação detalhada; Técnica por via; Particularidades por espécie; Aspectos de prescrição; Modelo de receita; Tabela de peso; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 1189–1190 e BSAVA p. 387–388 dão base para agente protetor de mucosa com ação predominantemente local. Proposta de precauções: cautela para interações de absorção, constipação e carga de alumínio em disfunção renal; BSAVA aponta úlcera perfurada como contraindicação. Separar de outros medicamentos orais, especialmente fluoroquinolonas, tetraciclinas e digoxina, considerando o intervalo indicado para cada associação. BSAVA descreve 500 mg/cão q6–8h até 20 kg, 1–2 g/cão q6–8h acima de 20 kg e 250 mg/gato q8–12h. Esses valores são por animal. Eficácia como quelante de fósforo em insuficiência renal é incerta no BSAVA.

**Pedido específico à IA:** Preencher classificação, técnica, precauções, efeitos adversos e interações. Justificar a dose felina alta e lesões orais tópicas por fontes próprias, especificando concentração para mL/paciente. Não apresentar proteção local como substituto universal da supressão ácida ou diagnóstico.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-sucral-dog-under20-bsava / dog | 500 mg/cão | VO / q6–8h | monitoring, clinicalContext, evidenceLevel |
| dose-sucral-dog-over20-bsava / dog | 1000–2000 mg/cão | VO / q6–8h | monitoring, clinicalContext, evidenceLevel |
| dose-sucral-cat-general-bsava / cat | 250 mg/gato | VO / q8–12h | monitoring, clinicalContext, evidenceLevel |
| dose-sucral-dog-esophagitis-slurry / dog | 500–1000 mg/cão | VO / q8h | monitoring, clinicalContext, evidenceLevel |
| dose-sucral-cat-esophagitis-high / cat | 500 mg/gato | VO / q8h | monitoring, clinicalContext, evidenceLevel |
| dose-sucral-both-oral-lesions / both | 1–2.5 mL/paciente | Tópica oral / q8–12h | monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 31. Trimetoprima + Sulfonamida (TMP-SDZ / TMP-SMX) — `sulfametoxazol-trimetoprima`

**Achado principal:** Três vínculos de apresentação inexistentes e referência recente não validável pelos livros.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (5) | presente (5) |
| Indicações aprofundadas (detailedIndications) | presente (6) | presente (6) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (3) | presente (3) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (8) | presente (8) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (7) | presente (7) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (8) | presente (8) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (8) | presente (8) |
| Estudos comentados (clinicalStudiesCommented) | presente (4) | presente (4) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (4) | presente (4) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (16) | presente (16) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Três doses adicionadas apontam para pres-tmp-smx-susp-br, ID ausente em presentations. A sustentação geral vem de Plumb’s p. 1193–1196 e BSAVA p. 418–420, com distinção da dose da associação total e da proporção sulfonamida/trimetoprima. Monitorar tolerância, olhos/produção lacrimal conforme contexto, citopenias e função orgânica; distinguir reação idiossincrática de efeito dose-dependente. A farmacocinética local cita estudo de 2026, que não foi validado nos livros anteriores. Sulfametoxazol e sulfadiazina não são substitutos automáticos em todos os regimes.

**Pedido específico à IA:** Resolver os IDs de apresentação na proposta e conferir concentrações da associação. Validar duração/indicação de coccidiose por espécie e peso, incluindo o regime acima de 4 kg. Conferir a publicação de 2026 e separar fonte de doses, farmacocinética e eficácia.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-sulfa-tmp-cystitis-short / both | 15 mg/kg | Oral (VO com água abundante) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-sulfa-tmp-uti-complicated / both | 15–30 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-sulfa-tmp-prostatitis / dog | 15–30 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-sulfa-tmp-pyoderma / dog | 15–30 mg/kg | Oral (VO com alimento) / 15 mg/kg q12h ou 30 mg/kg q24h | nenhum dos cinco campos |
| dose-sulfa-tmp-protozoal / both | 15–20 mg/kg | Oral (VO) / A cada 12 horas (q12h) | nenhum dos cinco campos |
| dose-tmp-smx-dog-geral-grave / dog | 15 mg/kg | VO / q12h | duration, monitoring, clinicalContext, evidenceLevel |
| dose-tmp-smx-cat-uti-complicated / cat | 15–30 mg/kg | VO / q12h | monitoring, clinicalContext, evidenceLevel |
| dose-tmp-smx-dog-coccidia-over4 / dog | 30–60 mg/kg | VO / q24h | duration, monitoring, clinicalContext, evidenceLevel |

**Erros mecânicos de IDs/referências encontrados:** doses[dose-tmp-smx-dog-geral-grave]: apresentação inexistente pres-tmp-smx-susp-br; doses[dose-tmp-smx-cat-uti-complicated]: apresentação inexistente pres-tmp-smx-susp-br; doses[dose-tmp-smx-dog-coccidia-over4]: apresentação inexistente pres-tmp-smx-susp-br.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-ekstrand-2026-pk: Ekstrand C, Löwgren M, Erkas M, et al. Comparative pharmacokinetics of trimethoprim-sulfadiazine and trimethoprim-sulfamethoxazole in dogs. BMC Vet Res. 2026;22:336. doi: 10.1186/s12917-026-05604-7. PMID: 42243796.
- ref-ekstrand-2026-systematic-review: Ekstrand C, Hedlund M, Pelander L, Scahill K. Adverse events of trimethoprim-sulphonamide treatment of cats and dogs: a systematic review. Vet Res Commun. 2026;50:224. doi: 10.1007/s11259-026-11143-1. PMID: 41880081.
- ref-vetcompass-2026-kcs: O’Neill DG, et al. Epidemiology of keratoconjunctivitis sicca in dogs receiving potentiated sulfonamides: a VetCompass study of 2,243 dogs. J Vet Intern Med. 2026;40(1):aalaf013. doi: 10.1111/jvim.17120.
- ref-iscaid-pyoderma-2025: Morris DO, Loeffler A, Davis GM, et al. Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis (ISCAID 2025 Update). Vet Dermatol. 2025;36(1):vde.13342. doi: 10.1111/vde.13342.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

### 32. Tramadol (Cloridrato de Tramadol) — `tramadol`

**Achado principal:** Eficácia dependente de espécie e regimes perioperatórios a verificar.

**Inventário de todas as seções** (presença não equivale a validação; “após banco” representa o caminho normal se a leitura remota funcionar):

| Seção / campo | Local | Após banco/mesclagem |
|---|---|---|
| Mecanismo (mechanismOfAction) | presente | presente |
| Resumo de indicações (quickIndications) | presente (4) | presente (4) |
| Indicações aprofundadas (detailedIndications) | presente (3) | presente (3) |
| ADME/farmacocinética (pharmacokineticsData) | presente | presente |
| Classificação (generalInfoData.pharmacologicalClassification) | presente | presente |
| Técnica/cuidados por via (generalInfoData.routesDetailed) | presente (4) | presente (4) |
| Particularidades por espécie (generalInfoData.speciesPeculiarities) | presente (2) | presente (2) |
| Prescrição/regulação (generalInfoData.prescriptionType) | presente | presente |
| Precauções explicadas (attentionData.precautions) | presente (7) | presente (7) |
| Efeitos adversos explicados (attentionData.adverseEffectsDetailed) | presente (7) | presente (7) |
| Ajustes de dose (attentionData.doseReductionGuidelines) | presente (5) | presente (5) |
| Interações explicadas (attentionData.drugInteractionsDetailed) | presente (8) | presente (8) |
| Diluição/compatibilidade (DILUTION) | presente | presente |
| Fundamentos (clinicalFoundationsData) | presente (9) | presente (9) |
| Estudos comentados (clinicalStudiesCommented) | presente (6) | presente (6) |
| Monitoramento próprio (monitoringParameters) | ausente | ausente |
| Informação ao tutor (clientInformation) | ausente | ausente |
| Apresentações (presentations) | presente (7) | presente (7) |
| Tabela de peso (practicalWeightTable) | presente | presente |
| Modelo de receita (samplePrescriptionText) | presente | presente |
| Referências (references) | presente (15) | presente (15) |
| Site oficial (officialSiteUrl) | presente | presente |
| Bula (leafletUrl) | presente | presente |
| Imagem (imageUrl) | ausente | ausente |
| Preço referenciado (priceReference) | ausente | ausente |

**Lacunas/estrutura local:** Monitoramento; Orientação ao tutor; Interações; História. Os campos de acompanhamento/tutor vazios são lacunas de estrutura; verificar informação já existente no corpo antes de pedir texto novo.

**Subcampos obrigatórios vazios nas seções existentes:** nenhum encontrado nas verificações acima.

**Complemento/correção já fundamentado no acervo:** Plumb’s p. 1261–1264 e BSAVA p. 410–412 destacam efeitos opioides/monoaminérgicos e diferenças de formação do metabólito ativo entre espécies. Em cães, eficácia analgésica oral pode ser inconsistente e não deve ser prometida como equivalente a opioide potente para qualquer dor; gatos têm perfil diferente. Monitorar dor, sedação, tolerância e sinais serotoninérgicos; revisar associação com antidepressivos, IMAO e outros depressores centrais. Não atribuir ausência de toxicidade aditiva a combinações analgésicas.

**Pedido específico à IA:** Validar via/frequência dos regimes injetáveis, dose felina de osteoartrite e papel canino multimodal com fonte por indicação. Completar monitoramento e orientação sobre falha de analgesia e sinais de excesso; confirmar concentração/gotejador para qualquer tabela em gotas.

**Auditoria individual das doses locais** — conferir os dados abaixo e preencher contexto, monitoramento, duração/critério de término e nível de evidência somente se a fonte permitir. Ausência de um campo opcional é pendência editorial, não prova de erro de dose:

| ID / espécie | Valor e unidade atualmente exibível | Via / frequência | Campos ausentes |
|---|---|---|---|
| dose-tramadol-dog-periop / dog | 2–4 mg/kg | IV lenta ou IM profunda / a cada 6 a 8 horas | monitoring, clinicalContext |
| dose-tramadol-cat-periop / cat | 1–2 mg/kg | IV lenta, SC ou VO / a cada 8 a 12 horas | monitoring, clinicalContext |
| dose-tramadol-cat-oa / cat | 2–3 mg/kg | VO / a cada 12 horas | monitoring, clinicalContext |
| dose-tramadol-dog-multimodal / dog | 2–3 mg/kg | VO / a cada 8 horas | monitoring, clinicalContext |

**Erros mecânicos de IDs/referências encontrados:** nenhum no conjunto de regras executadas; isso não autentica os artigos.

**Apresentações com concentração incompleta:** nenhuma na verificação de concentraçãoValue/concentrationUnit. Sem conferência de registro/estoque atual.

**Referências posteriores aos formulários, não autenticadas pelo acervo nesta auditoria:**

- ref-mastrocinque-2026-dipyrone-tramadol: Mastrocinque S, et al. Multimodal analgesia with tramadol and dipyrone for soft tissue surgery in small animals: antinociceptive and sparing effects. Front Vet Sci. 2026;13:1204481.
**Entrega esperada para esta ficha:** texto completo das seções faltantes que sejam aplicáveis; tabela de doses verificada com unidade inequívoca; ajustes individualizados; precauções com ação clínica; efeitos adversos sem frequência inventada; interações com conduta; lista do que segue sem comprovação. Usar os complementos já redigidos acima e solicitar apenas a evidência ainda necessária.

## 5. Apêndice — 29 registros publicados no banco fora da lista pública

Esses registros não são automaticamente novas fichas públicas a ativar. A ausência de monografia detalhada aqui não prova que o produto esteja ausente da seção separada Comerciais. Não reativar nem editar nada. Fazer revisão adicional somente como proposta. Os campos detalhados listados abaixo não são mapeados pelo caminho atual, e em vários registros são produtos de marca; não inventar monografia própria diferente da substância apenas para preencher a interface.

### A01. Maropitant — `maropitant`

Princípio ativo cadastrado: Citrato de maropitant. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText); Site oficial (officialSiteUrl); Bula (leafletUrl); Imagem (imageUrl).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- dose-maropitant-dog: Vômito agudo em cães; dog; 1–1 mg/kg; SC/VO; SID; duração: ausente; referência específica: ausente.
- dose-maropitant-cat: Vômito agudo em gatos; cat; 1–1 mg/kg; SC; SID; duração: ausente; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A02. Miltefosina — `miltefosina`

Princípio ativo cadastrado: Miltefosina. Espécies: dog.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText); Site oficial (officialSiteUrl); Bula (leafletUrl); Imagem (imageUrl); Preço referenciado (priceReference).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- dose-miltefosina-lvc: Leishmaniose visceral canina; dog; 2–2 mg/kg; VO; SID por 28 dias; duração: ausente; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A03. Amlodipina — `amlodipina`

Princípio ativo cadastrado: Besilato de amlodipina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText); Site oficial (officialSiteUrl); Bula (leafletUrl); Imagem (imageUrl); Preço referenciado (priceReference).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- dose-amlodipina-dog: Hipertensão sistêmica em cães; dog; 0.1–0.2 mg/kg; VO; SID; duração: ausente; referência específica: ausente.
- dose-amlodipina-cat: Hipertensão sistêmica em gatos; cat; 0.125–0.25 mg/kg; VO; SID; duração: ausente; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** pres-amlodipina-5, pres-amlodipina-10.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A04. Sulfato de Condroitina — `sulfato-de-condroitina`

Princípio ativo cadastrado: Sulfato de condroitina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText); Site oficial (officialSiteUrl); Bula (leafletUrl); Imagem (imageUrl); Preço referenciado (priceReference).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- sulfato-de-condroitina-both-dor-cronica-inicial-q24h: Tratamento adjuvante inicial de dor crônica articular / osteoartrite; both; 15–30 mg/kg; PO; q24h; duração: 4 a 6 semanas iniciais; referência específica: ausente.
- sulfato-de-condroitina-both-dor-cronica-manutencao-q24h: Manutenção após resposta clínica em dor crônica articular / osteoartrite; both; 7.5–15 mg/kg; PO; q24h; duração: manutenção; reavaliar periodicamente; referência específica: ausente.
- sulfato-de-condroitina-both-dor-cronica-manutencao-q48h: Manutenção após resposta clínica em dor crônica articular / osteoartrite; both; 15–30 mg/kg; PO; q48h; duração: manutenção; reavaliar periodicamente; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** sulfato-de-condroitina-condromax-pet-30-tabletes, sulfato-de-condroitina-condromax-pet-90-tabletes, sulfato-de-condroitina-nutricart-1000-30-comprimidos, sulfato-de-condroitina-nutricart-1000-60-comprimidos, sulfato-de-condroitina-nutricart-expert-30-comprimidos, sulfato-de-condroitina-nutricare-60-tabletes, sulfato-de-condroitina-ortho-pet-30-comprimidos, sulfato-de-condroitina-condroivet-30-comprimidos, sulfato-de-condroitina-gerioox-30-comprimidos, sulfato-de-condroitina-procart-60-comprimidos.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A05. Synulox Comprimidos Palatáveis — `synulox-comprimidos-palataveis`

Princípio ativo cadastrado: Amoxicilina + clavulanato de potássio. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- synulox-both-125-q12: Infecções bacterianas sensíveis com indicação para amoxicilina + clavulanato; both; 12.5–25 mg/kg; VO; q12h; duração: Conforme foco; reavaliar resposta e duração.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A06. Agemoxi CL — `agemoxi-cl`

Princípio ativo cadastrado: Amoxicilina tri-hidratada + clavulanato de potássio. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- agemoxi-cl-both-125-q12: Infecções bacterianas sensíveis; both; 12.5–25 mg/kg; VO; q12h; duração: Conforme foco e resposta clínica.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A07. Clavaseptin P — `clavaseptin-p`

Princípio ativo cadastrado: Amoxicilina + ácido clavulânico. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- clavaseptin-both-125-q12: Infecções bacterianas sensíveis; both; 12.5–25 mg/kg; VO; q12h; duração: Conforme foco e reavaliação.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A08. Doxifin Tabs — `doxifin-tabs`

Princípio ativo cadastrado: Doxiciclina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- doxifin-both-5-q12: Infecções sensíveis à doxiciclina; both; 5–5 mg/kg; VO; q12h; duração: Conforme foco; erliquiose frequentemente curso prolongado.; referência específica: ausente.
- doxifin-both-10-q24: Infecções sensíveis / regime SID; both; 10–10 mg/kg; VO; q24h; duração: Bula: 7 dias; erliquiose pode requerer 28 dias conforme protocolo.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A09. Doxitec — `doxitec`

Princípio ativo cadastrado: Hiclato de doxiciclina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- doxitec-dog-5-q12: Infecções gerais sensíveis; dog; 5–5 mg/kg; VO; q12h; duração: 7 dias conforme bula; ajustar por foco.; referência específica: ausente.
- doxitec-cat-10-q24: Infecções gerais sensíveis; cat; 10–10 mg/kg; VO; q24h; duração: 7 dias conforme bula; ajustar por foco.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A10. Trissulfin SID — `trissulfin-sid`

Princípio ativo cadastrado: Sulfadimetoxina + ormetoprim. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- trissulfin-both-bacterial-loading: Infecções bacterianas - primeiro dia; both; 160–160 mg/kg; VO; q24h; duração: 1º dia; referência específica: ausente.
- trissulfin-both-bacterial-maintenance: Infecções bacterianas - manutenção; both; 80–80 mg/kg; VO; q24h; duração: Mínimo 3 dias e continuar 2 dias após remissão; máximo 21 dias.; referência específica: ausente.
- trissulfin-both-isosporose: Isosporose; both; 200–200 mg/kg; VO; q24h; duração: Mínimo 5 dias; máximo 14 dias.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A11. Sulfaprim Comprimidos — `sulfaprim-comprimidos`

Princípio ativo cadastrado: Sulfametoxazol + trimetoprim. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- sulfaprim-both-15-q12: Infecções bacterianas sensíveis; both; 15–30 mg/kg; VO; q12h; duração: Conforme foco, cultura e resposta clínica.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A12. Cefex — `cefex`

Princípio ativo cadastrado: Cefalexina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- cefex-both-10-30-q8-12: Infecções sensíveis à cefalexina; both; 10–30 mg/kg; VO; q8-12h; duração: Conforme foco; piodermite pode exigir curso mais longo.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A13. Ceftrat — `ceftrat`

Princípio ativo cadastrado: Cefpodoxima proxetil. Espécies: dog.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- ceftrat-dog-5-10-q24: Infecções sensíveis em cães; dog; 5–10 mg/kg; VO; q24h; duração: Conforme foco e resposta clínica.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A14. Convenia — `convenia`

Princípio ativo cadastrado: Cefovecina sódica. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- convenia-both-8-sc: Infecções compatíveis com cefovecina; both; 8–8 mg/kg; SC; dose única; repetir apenas se indicado; duração: Longa ação; reavaliação conforme bula/foco.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A15. Baytril Flavour — `baytril-flavour`

Princípio ativo cadastrado: Enrofloxacino. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- baytril-dog-5-20-q24: Infecções sensíveis justificadas em cães; dog; 5–20 mg/kg; VO; q24h; duração: Conforme foco, cultura e resposta clínica.; referência específica: ausente.
- baytril-cat-5-q24: Infecções sensíveis justificadas em gatos; cat; 5–5 mg/kg; VO; q24h; duração: Conforme foco e resposta clínica.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A16. Enrotrat Tabs — `enrotrat-tabs`

Princípio ativo cadastrado: Enrofloxacina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- enrotrat-dog-5-20-q24: Infecções sensíveis justificadas em cães; dog; 5–20 mg/kg; VO; q24h; duração: Bula 3–5 dias; ajustar por foco/cultura.; referência específica: ausente.
- enrotrat-cat-5-q24: Infecções sensíveis justificadas em gatos; cat; 5–5 mg/kg; VO; q24h; duração: Conforme foco; não exceder dose diária.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A17. Marbocyl P — `marbocyl-p`

Princípio ativo cadastrado: Marbofloxacina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- marbocyl-both-2-q24: Infecções sensíveis conforme bula; both; 2–2 mg/kg; VO; q24h; duração: Conforme foco; bula cita até 40 dias em indicações específicas.; referência específica: ausente.
- marbocyl-both-2-55-q24-lit: Faixa de literatura para foco selecionado; both; 2–5.5 mg/kg; VO; q24h; duração: Individualizar por cultura/foco.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A18. Marbopet — `marbopet`

Princípio ativo cadastrado: Marbofloxacina. Espécies: dog.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- marbopet-dog-275-q24: Infecções sensíveis em cães; dog; 2.75–2.75 mg/kg; VO; q24h; duração: Conforme foco e bula.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A19. Clinbacter — `clinbacter`

Princípio ativo cadastrado: Cloridrato de clindamicina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- clinbacter-both-label-10-q12: Infecções orais, tecidos moles e anaeróbios sensíveis; both; 10–10 mg/kg; VO; q12h; duração: Conforme foco e reavaliação.; referência específica: ausente.
- clinbacter-both-plumbs-55-q12: Faixa de literatura clínica para infecções sensíveis; both; 5.5–5.5 mg/kg; VO; q12h; duração: Conforme foco.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A20. Oralguard — `oralguard-clindamicina`

Princípio ativo cadastrado: Clindamicina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- oralguard-dog-dental-5-q12: Infecções dentárias/tecidos moles em cães; dog; 5–5 mg/kg; VO; q12h; duração: 7-14 dias conforme bula e controle do foco.; referência específica: ausente.
- oralguard-cat-dental-10-20-q24: Infecções dentárias, feridas e abscessos em gatos; cat; 10–20 mg/kg; VO; q24h; duração: Máximo 14 dias conforme bula localizada.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A21. Stomorgyl — `stomorgyl`

Princípio ativo cadastrado: Espiramicina + metronidazol. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- stomorgyl-both-label-q24: Afecções bucodentárias sensíveis; both; 12.5–12.5 mg/kg; VO; q24h; duração: 5-10 dias; manter 48 h após melhora conforme bula.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A22. Giardicid — `giardicid`

Princípio ativo cadastrado: Metronidazol + sulfadimetoxina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- giardicid-both-125-25-q12: Giardíase/protozoários conforme diagnóstico; both; 12.5–25 mg/kg; VO; q12h; duração: 5 dias conforme bula/fonte.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A23. Doxitrat — `doxitrat`

Princípio ativo cadastrado: Hiclato de doxiciclina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- doxitrat-both-5-q12: Infecções sensíveis à doxiciclina; both; 5–5 mg/kg; VO; q12h; duração: Conforme foco.; referência específica: ausente.
- doxitrat-both-10-q24: Regime SID para infecções sensíveis; both; 10–10 mg/kg; VO; q24h; duração: Conforme foco.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A24. Zelotril — `zelotril`

Princípio ativo cadastrado: Enrofloxacina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- zelotril-dog-5-20-q24: Infecções sensíveis justificadas em cães; dog; 5–20 mg/kg; VO; q24h; duração: Conforme foco/cultura.; referência específica: ausente.
- zelotril-cat-5-q24: Infecções sensíveis justificadas em gatos; cat; 5–5 mg/kg; VO; q24h; duração: Conforme foco; não exceder dose diária.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A25. Tobrasyn — `tobrasyn`

Princípio ativo cadastrado: Sulfato de tobramicina 0,3%. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- tobrasyn-both-eye-1drop: Infecção ocular superficial sensível; both; 1–1 gota/olho afetado; Oftálmica; 4-6x/dia; duração: Conforme gravidade e reavaliação oftálmica.; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A26. Auritop — `auritop`

Princípio ativo cadastrado: Ciprofloxacina + cetoconazol + fluocinolona + lidocaína. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- auritop-dog-small: Otite externa - cão <15 kg; dog; 4–4 gotas/ouvido afetado; Otológica; q12h; duração: 7-10 dias; referência específica: ausente.
- auritop-cat: Otite externa - gato; cat; 3–3 gotas/ouvido afetado; Otológica; q12h; duração: 7-10 dias; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A27. Aurigen — `aurigen`

Princípio ativo cadastrado: Gentamicina + miconazol + betametasona. Espécies: dog.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- aurigen-dog-small: Otite externa - cão até 15 kg; dog; 4–4 gotas/ouvido afetado; Otológica; q12h; duração: 7-9 dias; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A28. Otomax — `otomax`

Princípio ativo cadastrado: Gentamicina + clotrimazol + betametasona. Espécies: dog.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Site oficial, Bula, Imagem, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- otomax-dog-small: Otite externa - cão <15 kg; dog; 4–4 gotas/ouvido afetado; Otológica; q12h; duração: 7 dias; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

### A29. Pregabalina — `pregabalina`

Princípio ativo cadastrado: Pregabalina. Espécies: dog, cat.

**Seções/campos ausentes no objeto mapeado:** Resumo de indicações (quickIndications); Indicações aprofundadas (detailedIndications); ADME/farmacocinética (pharmacokineticsData); Classificação (generalInfoData.pharmacologicalClassification); Técnica/cuidados por via (generalInfoData.routesDetailed); Particularidades por espécie (generalInfoData.speciesPeculiarities); Prescrição/regulação (generalInfoData.prescriptionType); Precauções explicadas (attentionData.precautions); Efeitos adversos explicados (attentionData.adverseEffectsDetailed); Ajustes de dose (attentionData.doseReductionGuidelines); Interações explicadas (attentionData.drugInteractionsDetailed); Diluição/compatibilidade (DILUTION); Fundamentos (clinicalFoundationsData); Estudos comentados (clinicalStudiesCommented); Monitoramento próprio (monitoringParameters); Informação ao tutor (clientInformation); Tabela de peso (practicalWeightTable); Modelo de receita (samplePrescriptionText); Site oficial (officialSiteUrl); Bula (leafletUrl); Imagem (imageUrl).

**Seções básicas preenchidas:** Mecanismo, Apresentações, Referências, Preço referenciado. A conferência deste apêndice é estrutural; o conteúdo clínico não foi revalidado individualmente.

**Regimes cadastrados:**

- pregabalina-dog-epilepsia-refrataria-inicial: Terapia adjuvante inicial para epilepsia refratária; dog; 2–2 mg/kg; PO; q12h; duração: início do tratamento; reavaliar em 5 a 7 dias; referência específica: ausente.
- pregabalina-dog-epilepsia-refrataria-manutencao-q8h: Terapia adjuvante de manutenção para epilepsia refratária; dog; 3–4 mg/kg; PO; q8h; duração: contínuo, com reavaliação periódica; referência específica: ausente.
- pregabalina-dog-epilepsia-refrataria-manutencao-q12h: Terapia adjuvante de manutenção para epilepsia refratária; dog; 4–4 mg/kg; PO; q12h; duração: contínuo, com reavaliação periódica; referência específica: ausente.
- pregabalina-dog-dor-neuropatica-q8h: Dor neuropática; dog; 2–5 mg/kg; PO; q8h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-dog-dor-neuropatica-q12h: Dor neuropática; dog; 2–5 mg/kg; PO; q12h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-dog-dor-perioperatoria-pre: Controle de dor perioperatória - pré-operatório; dog; 4–4 mg/kg; PO; dose única; duração: 1 hora antes da anestesia; referência específica: ausente.
- pregabalina-dog-dor-perioperatoria-pos: Controle de dor perioperatória - pós-operatório; dog; 4–4 mg/kg; PO; q8h; duração: 5 dias; referência específica: ausente.
- pregabalina-dog-tremor-ortostatico-q8h: Tremor ortostático; dog; 3.5–3.5 mg/kg; PO; q8h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-dog-tremor-ortostatico-q12h: Tremor ortostático; dog; 3.5–3.5 mg/kg; PO; q12h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-cat-epilepsia-adjuvante-inicial: Terapia adjuvante inicial para epilepsia; cat; 1–2 mg/kg; PO; q12h; duração: início do tratamento; reavaliar em 5 a 7 dias; referência específica: ausente.
- pregabalina-cat-dor-neuropatica-1mg-q8h: Dor neuropática; cat; 1–1 mg/kg; PO; q8h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-cat-dor-neuropatica-1mg-q12h: Dor neuropática; cat; 1–1 mg/kg; PO; q12h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-cat-dor-neuropatica-3mg-q12h: Dor neuropática; cat; 3–3 mg/kg; PO; q12h; duração: individualizar conforme resposta clínica; referência específica: ausente.
- pregabalina-cat-ansiolise-transporte: Ansiolise pré-transporte; cat; 5–10 mg/kg; PO; dose única; duração: 90 minutos antes do transporte; referência específica: ausente.

**Apresentações sem concentração numérica/unidade:** nenhuma na verificação simples.

**Pedido à IA:** localizar monografia do princípio ativo no acervo e verificar dose, espécie, via, indicação, contraindicações, interações e monitoramento. Para associações ou marcas, solicitar rótulo/bula oficial exata com composição, concentração, espécie, modo de uso e validade; não completar apresentações por suposição. Separar informação da substância de informação do produto e explicar se convém uma única monografia vinculada ao produto.

## 6. Fontes localizadas para orientar a continuidade

Página inicial de localização; pode haver outra monografia terminando no alto da mesma página. Ler somente o trecho da molécula correta e localizar o término antes de citar o intervalo. As quatro exceções abaixo são especialmente relevantes.

| Slug | Plumb’s: localização inicial impressa / PDF | BSAVA: localização impressa / PDF |
|---|---|---|
| acetilcisteina | 12 / 39 | 3 / 19 |
| alopurinol | 37 / 64 | 11 / 27 |
| amantadina | 46 / 73 | 15 / 31 |
| amitriptilina | 59 / 86 | 22 / 38 |
| amoxicilina-clavulanato | 70 / 97 | 98 / 114 |
| ampicilina-sulbactam | 82 / 109 | 27 / 43 — ampicilina isolada |
| betanecol | 130 / 157 | 45 / 61 |
| buprenorfina | 150 / 177 | 53 / 69 |
| capromorelina | 182 / 209 | monografia não localizada |
| ceftriaxona | 230 / 257 | 68 / 84 — outras cefalosporinas, não ceftriaxona |
| ciclosporina | 322 / 349 | 81 / 97 |
| ciproeptadina | 327 / 354 | 103 / 119 |
| clindamicina | 282 / 309 | 91 / 107 |
| clorambucil | 243 / 270 | 75 / 91 |
| diazepam | 379 / 406 | 118 / 134 |
| dipirona | 413 / 440 | 55 / 71 — associação com butilescopolamina, não isolada |
| enrofloxacina | 450 / 477 | 147 / 163 |
| gabapentina | 568 / 595 | 179 / 195 |
| hidroxido-de-aluminio | 44 / 71 | 13 / 29 |
| levetiracetam | 746 / 773 | 227 / 243 |
| marbofloxacina | 796 / 823 | 242 / 258 |
| meloxicam | 825 / 852 | 250 / 266 |
| metadona | 842 / 869 | 255 / 271 |
| micofenolato-mofetila | 920 / 947 | 278 / 294 |
| mirtazapina | 893 / 920 | 270 / 286 |
| fenobarbital | 1006 / 1033 | 314 / 330 |
| pradofloxacina | 1048 / 1075 | 335 / 351 |
| prednisolona | 1058 / 1085 | 339 / 355 |
| pronefra | 178 / 205 | 75 / 91 — Chitosan/Ipakitine, outro produto |
| sucralfato | 1189 / 1216 | 387 / 403 |
| sulfametoxazol-trimetoprima | 1193 / 1220 | 418 / 434 |
| tramadol | 1261 / 1288 | 410 / 426 |

## 7. Formato da resposta que solicito à outra IA

1. Comece pelos erros confirmados com risco clínico e pela perda de dados no caminho remoto. Não execute as correções.
2. Para cada uma das 32 fichas públicas, entregue as seções completas aplicáveis e justificadas, preservando a distinção entre informação inexistente e informação já existente que apenas não é exibida.
3. Apresente cada dose em uma linha: espécie, indicação, contexto, formulação, via, dose POR ADMINISTRAÇÃO, dose TOTAL DIÁRIA quando aplicável, intervalo, duração/critério de término, ajuste, monitoramento e fonte exata.
4. Acrescente tabela “afirmação → fonte → página → grau de sustentação”; um livro não precisa comprovar artigos posteriores que não contém.
5. Liste os itens que não puderam ser resolvidos no acervo com uma pergunta objetiva por item e o documento necessário. Não usar “não há interação” quando a fonte apenas diz “sem informação”.
6. Trate o apêndice separadamente, sem ativar produtos/medicamentos escondidos.
7. Ao final, forneça um conjunto de propostas editoriais prontas para revisão humana, sem SQL, deploy ou alteração automática.

