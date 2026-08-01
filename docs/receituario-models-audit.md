# Auditoria dos modelos do Receituário

Gerado em 2026-08-01T17:02:48.169Z. O relatório reflete os modelos carregados pelo código e os catálogos canônicos empacotados. A migration 20260801120000 ainda não está aplicada no projeto remoto; portanto não havia modelos remotos para somar à auditoria.

## Resumo geral

- Total de modelos: 19
- Por espécie: {"ambos":15,"cão":3,"gato":1}
- Por categoria: {"Cardiologia":1,"Cuidados gerais":1,"Dermatologia":1,"Dor e pós-operatório":1,"Emergência":1,"Endocrinologia":2,"Gastroenterologia":2,"Infectologia":1,"Nefrologia e urologia":2,"Neurologia":1,"Oftalmologia":1,"Respiratório":1,"Termos":4}
- Por tipo: {"recipe":15,"term":4}
- Incompletos: 12
- Sem fonte estruturada: 15
- Com medicamento não vinculado: 15
- Com recomendações genéricas: 15

## Modelos

### Gastrite Aguda / Gastroenterite

| Campo | Valor |
|---|---|
| ID | seed-gastrite-aguda |
| Condição | Gastrite Aguda / Gastroenterite |
| Categoria | Gastroenterologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | OMEPRAZOL 10mg / 20mg → não vinculado; ONDANSETRONA 4mg / 8mg → não vinculado; SUCRALFATO 500mg / 1g → não vinculado; SIMBIÓTICO / PROBIÓTICO VETERINÁRIO → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Diarreia Aguda e Controle Digestivo

| Campo | Valor |
|---|---|
| ID | seed-diarreia-aguda |
| Condição | Diarreia Aguda e Controle Digestivo |
| Categoria | Gastroenterologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | METRONIDAZOL 250mg → não vinculado; PASTA ABSORVENTE (Zeolita / Caolim-Pectina) → não vinculado; PROBIÓTICO VETERINÁRIO → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Doença Renal Crônica (Manejo de Suporte)

| Campo | Valor |
|---|---|
| ID | seed-drc-suporte |
| Condição | Doença Renal Crônica (Manejo de Suporte) |
| Categoria | Nefrologia e urologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | QUELANTE DE FÓSFORO (Hidróxido de Alumínio / Carbonato de Cálcio / Chitosan) → não vinculado; BENAZEPRIL 5mg / 20mg → med-benazepril; OMEPRAZOL 10mg → não vinculado; SUPLEMENTO ÔMEGA 3 VETERINÁRIO → não vinculado |
| Apresentações vinculadas | Comprimido de benazepril (humano - exemplo) |
| Doses cadastradas | 0.25–0.5 mg/kg; 0.5–1 mg/kg |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Creatinina e eletrólitos 5–7 dias após início ou mudança de dose; maior cautela com diuréticos, AINEs e baixo débito.; Gravidez/lactação: evitar salvo benefício claro.; Dupla bloqueio RAAS (IECA + BRA + espironolactona): só com critério especializado e monitorização. |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Cistite Bacteriana / Infecção Urinária

| Campo | Valor |
|---|---|
| ID | seed-cistite-infecciosa |
| Condição | Cistite Bacteriana / Infecção Urinária |
| Categoria | Nefrologia e urologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | AMOXICILINA COM CLAVULANATO DE POTÁSSIO 50mg / 250mg → não vinculado; MELOXICAM 0,5mg / 1mg / 2mg → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Diabetes Mellitus - Protocolo de Suporte

| Campo | Valor |
|---|---|
| ID | seed-diabetes-mellitus |
| Condição | Diabetes Mellitus - Protocolo de Suporte |
| Categoria | Endocrinologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | INSULINA (NPH / Glargina / Caninsulina) → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Manter horários fixos de alimentação e aplicação de insulina. / * Em caso de tremores, fraqueza, prostração intensa ou sinais de hipoglicemia, oferecer imediatamente solução de glicose/mel na gengiva e contactar a equipe de emergência. / * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | needs-review |

### Hipotireoidismo Canino

| Campo | Valor |
|---|---|
| ID | seed-hipotireoidismo |
| Condição | Hipotireoidismo Canino |
| Categoria | Endocrinologia |
| Espécie | cão |
| Tipo | recipe |
| Medicamentos | LEVOTIROXINA SÓDICA (0,1mg / 0,2mg / 0,4mg / 0,7mg) → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Agendar dosagem de T4 total após 4 a 8 semanas para ajuste de dose. / * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Insuficiência Cardíaca Congestiva (ICC)

| Campo | Valor |
|---|---|
| ID | seed-icc-canina |
| Condição | Insuficiência Cardíaca Congestiva (ICC) |
| Categoria | Cardiologia |
| Espécie | cão |
| Tipo | recipe |
| Medicamentos | PIMOBENDAN 1,25mg / 2,5mg / 5mg → med-pimobendan; FUROSEMIDA 40mg → não vinculado; BENAZEPRIL ou ENALAPRIL 5mg → med-benazepril; ESPIRONOLACTONA 25mg → não vinculado |
| Apresentações vinculadas | Comprimido mastigavel de pimobendan (vet); Comprimido de benazepril (humano - exemplo) |
| Doses cadastradas | 0.25–0.3 mg/kg; 0.3–0.3 mg/kg; 0.25–0.5 mg/kg; 0.5–1 mg/kg |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Monitorizar frequência cardíaca, apetite e função renal em politerapia.; Gatos: evidência menor — doses e segurança extrapoladas; usar com transparência ao tutor.; Creatinina e eletrólitos 5–7 dias após início ou mudança de dose; maior cautela com diuréticos, AINEs e baixo débito.; Gravidez/lactação: evitar salvo benefício claro.; Dupla bloqueio RAAS (IECA + BRA + espironolactona): só com critério especializado e monitorização. |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Bronquite Crônica / Asma Felina

| Campo | Valor |
|---|---|
| ID | seed-asma-felina |
| Condição | Bronquite Crônica / Asma Felina |
| Categoria | Respiratório |
| Espécie | gato |
| Tipo | recipe |
| Medicamentos | FLUTICASONA 125mcg / 250mcg → não vinculado; SALBUTAMOL 100mcg → não vinculado; PREDNISOLONA 5mg → med-prednisolona |
| Apresentações vinculadas | Preni - comprimido (Eurofarma, uso humano); Solução oral 3 mg/mL (fosfato sódico Aché / Preni solução); Prelone gotas — 11 mg/mL (Aché, uso humano); Prediderm - comprimido (Ourofino, vet); Predivet - comprimido (Mundo Animal, vet) |
| Doses cadastradas | 0.5–1 mg/kg; 1–2 mg/kg; 2–4 mg/kg; 2–8 mg/kg; 0.1–0.25 mg/kg; 2–2 mg/kg; 0.25–1 mg/kg; 0.5–1 mg/kg |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Gatos: maior risco diabetogênico com uso prolongado; obesidade e prednisolona — ajustar à massa magra quando possível.; Não associar AINEs (incl. aspirina) sem critério — risco de ulceração GI.; Desmame gradual após uso prolongado (eixo HPA).; Monitorar glicemia, peso, PU/PD, comportamento e enzimas hepáticas conforme duração/dose. |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Epilepsia / Controle de Crises Convulsivas

| Campo | Valor |
|---|---|
| ID | seed-crise-convulsiva |
| Condição | Epilepsia / Controle de Crises Convulsivas |
| Categoria | Neurologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | FENOBARBITAL 10mg / 50mg / 100mg → não vinculado; LEVETIRACETAM 250mg / 500mg → não vinculado; DIAZEPAM INJETÁVEL 10mg/2mL → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Dermatite Atópica / Alérgica e Otite Externa

| Campo | Valor |
|---|---|
| ID | seed-dermatite-atopica |
| Condição | Dermatite Atópica / Alérgica e Otite Externa |
| Categoria | Dermatologia |
| Espécie | cão |
| Tipo | recipe |
| Medicamentos | OCLACITINIB (APOQUEL) 3,6mg / 5,4mg / 16mg → não vinculado; SHAMPOO COM CLOREXIDINE 2% A 4% E FITOSPHINGOSINE → não vinculado; SOLUÇÃO OTOLÓGICA (Antibiótico + Antifúngico + Corticosteroide) → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Conjuntivite / Afecções Oculares

| Campo | Valor |
|---|---|
| ID | seed-conjuntivite-ulcera-cornea |
| Condição | Conjuntivite / Afecções Oculares |
| Categoria | Oftalmologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | COLÍRIO ANTIBIÓTICO (Tobramicina 0,3% / Ciprofloxacino 0,3%) → não vinculado; COLÍRIO LUBRIFICANTE / LÁGRIMA ARTIFICIAL (Hialuronato de Sódio / Carboximetilcelulose) → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Manter colar elizabetano 24 horas por dia até reavaliação oftálmica. / * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Manter colar elizabetano 24 horas por dia até reavaliação oftálmica. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | needs-review |

### Piodermite / Infecção Bacteriana de Pele

| Campo | Valor |
|---|---|
| ID | seed-pif-felina |
| Condição | Piodermite / Infecção Bacteriana de Pele |
| Categoria | Infectologia |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | CEFALEXINA 300mg / 600mg → não vinculado; SPRAY OU POMADA ANTISSÉPTICA (Clorexidine 2%) → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Analgesia Pós-Operatória / Manejo da Dor

| Campo | Valor |
|---|---|
| ID | seed-pos-operatorio-geral |
| Condição | Analgesia Pós-Operatória / Manejo da Dor |
| Categoria | Dor e pós-operatório |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | DIPIRONA SÓDICA 500mg/mL → não vinculado; MELOXICAM 0,5mg / 1mg / 2mg → não vinculado; TRAMADOL / PREGABALINA / GABAPENTINA → med-pregabalina |
| Apresentações vinculadas | Capsula de pregabalina (humano - uso extra-label); Solução oral 25 mg/mL — Dorene® (Brasil; uso humano extra-label em pequenos animais) |
| Doses cadastradas | 3–4 mg/kg; 2–5 mg/kg; 4–4 mg/kg; 3.5–3.5 mg/kg; 1–2 mg/kg; 1–3 mg/kg; 5–10 mg/kg |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Insuficiência renal: acúmulo e sedação — reduzir dose ou espaçar conforme filtração; lógica semelhante ao ajuste humano por depuração.; Suspensão abrupta (sobretudo em epilepsia): em humanos, piora de crises, sintomas de abstinência — descontinuar gradualmente.; Associação com outros depressores do SNC (opioides, benzodiazepínicos, fenobarbital, acepromazina, dexmedetomidina): sedação aditiva e risco respiratório em debilitados.; Evidência veterinária ainda limitada; grande parte do uso é extrapolação e séries pequenas — informar tutores. |
| Recomendações | * Limpar a ferida com solução fisiológica 0,9% e antisséptico suave a cada 12 horas. / * Manter colar elizabetano / roupa protetora continuamente. / * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Manejo Inicial de Intoxicação / Suporte Emergencial

| Campo | Valor |
|---|---|
| ID | seed-manejo-intoxicacao |
| Condição | Manejo Inicial de Intoxicação / Suporte Emergencial |
| Categoria | Emergência |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | CARBÃO ATIVADO VETERINÁRIO (Sachê / Pasta) → não vinculado; SILIMARINA / SAMe / ANTIOXIDANTE HEPÁTICO → não vinculado; OMEPRAZOL / PROTEÇÃO GÁSTRICA → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Possui concentração ou dose digitada no texto histórico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | incomplete |

### Desverminação e Controle de Ectoparasitas

| Campo | Valor |
|---|---|
| ID | seed-desverminacao-ectoparasitas |
| Condição | Desverminação e Controle de Ectoparasitas |
| Categoria | Cuidados gerais |
| Espécie | ambos |
| Tipo | recipe |
| Medicamentos | VERMÍFUGO DE AMPLO ESPECTRO (Praziquantel + Pyrantel + Febantel) → não vinculado; ANTIPARASITÁRIO CONTRA PULGAS E CARRAPATOS (Isoxazolina / Spot-on) → não vinculado |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | * Oferecer as medicações conforme os horários prescritos. / * Não interromper o tratamento sem orientação médico-veterinária. / * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. / * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Sinais de alerta | * Procurar atendimento caso ocorram vômitos persistentes, diarreia intensa, prostração, dificuldade respiratória, convulsões, sangramentos ou piora do estado geral. |
| Retorno | * Retornar para reavaliação no período definido pelo médico-veterinário ou antes, caso necessário. |
| Placeholders | Nenhum |
| Problemas | Possui medicamento sem vínculo canônico. / Não há fonte estruturada vinculada às doses do modelo. |
| Status | needs-review |

### Termo Geral de Recusa de Procedimento, Exame ou Tratamento

| Campo | Valor |
|---|---|
| ID | term-geral-recusa |
| Condição | Termo Geral de Recusa de Procedimento, Exame ou Tratamento |
| Categoria | Termos |
| Espécie | ambos |
| Tipo | term |
| Medicamentos | Nenhum |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | Nenhuma |
| Sinais de alerta | Nenhum |
| Retorno | Não informado |
| Placeholders | Nenhum |
| Problemas | Nenhum |
| Status | complete |

### Termo de Retirada do Paciente sem Alta Médica

| Campo | Valor |
|---|---|
| ID | term-retirada-sem-alta |
| Condição | Termo de Retirada do Paciente sem Alta Médica |
| Categoria | Termos |
| Espécie | ambos |
| Tipo | term |
| Medicamentos | Nenhum |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | Nenhuma |
| Sinais de alerta | Nenhum |
| Retorno | Não informado |
| Placeholders | Nenhum |
| Problemas | Nenhum |
| Status | complete |

### Termo Geral de Consentimento

| Campo | Valor |
|---|---|
| ID | term-geral-consentimento |
| Condição | Termo Geral de Consentimento |
| Categoria | Termos |
| Espécie | ambos |
| Tipo | term |
| Medicamentos | Nenhum |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | Nenhuma |
| Sinais de alerta | Nenhum |
| Retorno | Não informado |
| Placeholders | Nenhum |
| Problemas | Nenhum |
| Status | complete |

### Termo de Consentimento para Eutanásia

| Campo | Valor |
|---|---|
| ID | term-consentimento-eutanasia |
| Condição | Termo de Consentimento para Eutanásia |
| Categoria | Termos |
| Espécie | ambos |
| Tipo | term |
| Medicamentos | Nenhum |
| Apresentações vinculadas | Nenhuma |
| Doses cadastradas | Nenhuma |
| Fontes | Nenhuma fonte estruturada |
| Precauções | Nenhuma |
| Recomendações | Nenhuma |
| Sinais de alerta | Nenhum |
| Retorno | Não informado |
| Placeholders | Nenhum |
| Problemas | Nenhum |
| Status | complete |

