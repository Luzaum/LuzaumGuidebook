# Auditoria ConsultaVet — doenças e acervo local

**Data:** 10/10/2026. **Situação:** auditoria estrutural de todo o catálogo identificado; revisão clínica de trechos selecionados. A leitura integral de todos os livros e a validação clínica integral de todas as fichas NÃO estão concluídas. Nenhuma ficha recebe aprovação clínica neste relatório.

Foram identificados 38 PDFs e um arquivo .opdownload. A extração disponível na fotografia do inventário abrange 13 PDFs com texto útil; o PDF de dermatologia tem 307 páginas sem camada de texto útil. Parte do acervo ainda requer extração/OCR e leitura. Extrair ou pesquisar texto não significa ler cada página nem absorver todo o conhecimento do livro.

O catálogo consultado contém **81 registros após o merge: 78 locais e três adicionais remotos**. A composição varia com acesso/disponibilidade do banco. Foram executadas **729 renderizações das nove seções principais**, sem exceção de execução; o teste encontrou perdas silenciosas de conteúdo. Também foram renderizadas as 27 listas de figuras. Ausência de exceção não significa ausência de falha.

A interface local redirecionou à tela de login. Portanto, a avaliação de exibição se baseia no código da página e na renderização React dos componentes reais com os dados finais; não substitui inspeção visual de todas as telas autenticadas, responsividade e interação. O código do app e os dados remotos não foram alterados. Alterações anteriores do workspace foram preservadas.

Este relatório registra **29 achados**: 14 clínicos/editoriais e 15 de renderização, referências e catálogo. P1: corrigir com prioridade por comprometer decisão/ocultar informação clínica; P2: corrigir conteúdo, completude ou acesso; P3: melhoria editorial. Prioridade não é graduação formal de evidência.

A matriz [COBERTURA-81-FICHAS.csv](COBERTURA-81-FICHAS.csv) inclui todos os registros e o estado da revisão. [INVENTARIO-ACERVO.csv](INVENTARIO-ACERVO.csv) distingue extração, leitura selecionada e pendências. Os dados clínicos remotos foram consultados somente para leitura; não foram exportados identificadores de usuários/credenciais para estes artefatos.

## Achados clínicos e científicos

### C01 — P1 — Falso positivo universal no LDDST felino

**Fichas:** `sindrome-cushing-gatos`.

**Localização:** [diseases.sindrome-cushing-gatos.seed.ts:51](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.sindrome-cushing-gatos.seed.ts:51) e :333; quickDecisionStrip[4], prevention.errosComuns[0].

A ficha afirma 100% de falsos positivos e falsos diagnósticos universais com 0,01 mg/kg. Isso confunde um protocolo inadequado para triagem rotineira com uma taxa universal de erro.

**Evidência:** Ettinger, 9ª edição (2024), capítulo 294, PDF 2177–2178, páginas impressas 2025–2026 do acervo. A página 2025 informa ausência de supressão em cerca de 20% dos gatos saudáveis com a dose canina. A imagem da página foi conferida.

**Ajuste recomendado:** Manter a dose felina usual de 0,1 mg/kg para o protocolo descrito; substituir 100% por explicação da perda de especificidade e do risco de falsos positivos, sem generalização universal.

### C02 — P1 — Redução automática e contraditória da insulina

**Fichas:** `sindrome-cushing-gatos`.

**Localização:** [diseases.sindrome-cushing-gatos.seed.ts:55](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.sindrome-cushing-gatos.seed.ts:55), :127 e :291.

A faixa rápida manda reduzir 30–50%; o fluxo e a farmacoterapia mandam 25–30% no início. A resistência é descrita como desaparecendo subitamente em todos os casos, gerando uma regra de ajuste independente da glicemia.

**Evidência:** Ettinger, 9ª edição (2024), capítulo 294, PDF 2177–2178, páginas impressas 2025–2026 do acervo. O livro descreve respostas variáveis: redução média em um pequeno grupo, mas um gato precisou de aumento. [AAHA 2023](https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/feline-hyperadrenocorticismhypercortisolism/) recomenda acompanhamento individualizado.

**Ajuste recomendado:** Unificar resumo, fluxo e protocolo. Explicar a necessidade de vigilância intensiva para hipoglicemia e ajuste individual pelo acompanhamento glicêmico; não transformar a média de uma série em redução universal.

### C03 — P2 — Trilostano q24h declarado totalmente ineficaz em gatos

**Fichas:** `sindrome-cushing-gatos`.

**Localização:** quickDecisionStrip[7], pilares e prevention.errosComuns[3].

q12h é chamado obrigatório, e q24h é descrito como falha completa por metabolismo acelerado.

**Evidência:** Ettinger, 9ª edição (2024), capítulo 294, PDF 2177–2178, páginas impressas 2025–2026 do acervo. O livro admite esquemas q12h e q24h e informa ausência de estudos farmacocinéticos felinos. A [série original de 15 gatos](https://doi.org/10.1111/jvim.12178) utilizou esquemas diários e duas vezes ao dia. A preferência atual por administrações mais frequentes não prova ineficácia universal de q24h.

**Ajuste recomendado:** Distinguir regime inicial preferido, resposta clínica e ajustes. Retirar a explicação farmacocinética sem suporte e a declaração de falha completa.

### C04 — P1 — Localização toracolombar associada a tetraparesia

**Fichas:** `doenca-do-disco-intervertebral-gatos`.

**Localização:** [diseases.doenca-do-disco-intervertebral-gatos.seed.ts:159](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.doenca-do-disco-intervertebral-gatos.seed.ts:159); pathophysiology.

O parágrafo atribui tetraparesia a extrusões toracolombares e lombares caudais. Isso contradiz a localização neuroanatômica descrita.

**Evidência:** Practical Guide to Canine and Feline Neurology, 3ª edição, PDF 73, página impressa 59, tabelas 4.6 e 4.7: tetraparesia em lesões cervicais; paraparesia/paraplegia em T3–L3. A página e as tabelas foram verificadas visualmente.

**Ajuste recomendado:** Relacionar déficits aos segmentos afetados: tetraparesia cervical, paraparesia/paraplegia toracolombar e sinais compatíveis com L4–S3/lombossacro quando aplicável.

### C05 — P1 — Exigência universal de biópsia transmural, IHC e PARR

**Fichas:** `triade-felina`.

**Localização:** [diseases.triade-felina.seed.ts:99](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.triade-felina.seed.ts:99); quickDecisionStrip[7].

A ficha atribui ao consenso ACVIM a impossibilidade de diferenciar LPE e LGITL sem os três procedimentos em todos os pacientes.

**Evidência:** [Consenso ACVIM felino de 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10229359/) permite biópsias endoscópicas adequadas em muitos casos; IHC e PARR entram na investigação integrada, especialmente de resultados ambíguos. O consenso não estabelece a tríplice exigência universal.

**Ajuste recomendado:** Explicar qualidade, quantidade e local das amostras; indicar quando a abordagem endoscópica é suficiente e quando a cirurgia e os testes complementares acrescentam valor.

### C06 — P1 — fTLI limítrofe tratado como confirmação de IPE

**Fichas:** `triade-felina`.

**Localização:** [diseases.triade-felina.seed.ts:592](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.triade-felina.seed.ts:592); diagnóstico.

A expressão fTLI <12 µg/L atesta IPE inclui a faixa inconclusiva e transforma um resultado limítrofe em diagnóstico definitivo.

**Evidência:** [Texas A&M GI Laboratory — TLI](https://vetmed.tamu.edu/gilab/service/assays/tli/): fTLI ≤8 µg/L diagnóstico; 8,1–11,9 inconclusivo. A ficha de IPE do próprio app já distingue corretamente esses limites.

**Ajuste recomendado:** Separar faixa diagnóstica da faixa inconclusiva; contextualizar repetição, condições da amostra e sinais clínicos. Corrigir também a interpretação causal automática de destruição acinar terminal.

### C07 — P1 — Spec fPL histórico apresentado como intervalo atual e definitivo

**Fichas:** `triade-felina`.

**Localização:** [diseases.triade-felina.seed.ts:85](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.triade-felina.seed.ts:85), :98, :151, :432 e :580.

A ficha usa 3,5–5,3 e ≥5,4 µg/L como cortes atuais de Spec fPL e diz que o resultado confirma categoricamente pancreatite ativa. Um valor isolado não tem essa certeza; intervalos dependem do ensaio e de sua versão.

**Evidência:** [Texas A&M GI Laboratory — PLI](https://vetmed.tamu.edu/gilab/service/assays/pli/): Spec fPL ≤4,4, 4,5–8,7 e ≥8,8 µg/L; [comunicado IDEXX](https://www.idexx.no/files/service-update-spec-fpl-reference-intervals-en-uk.pdf) documenta atualização desde julho de 2023. Valores antigos podem aparecer legitimamente em estudos históricos, mas precisam dessa identificação.

**Ajuste recomendado:** Identificar laboratório/ensaio, data e referência; usar os intervalos aplicáveis ao laudo e integrar clínica, imagem e biomarcador. Rotular os resultados de estudos antigos como históricos, sem substituição global de todo fPLI.

### C08 — P1 — Corte antigo de cTLI na enteropatia canina

**Fichas:** `enteropatia-inflamatoria-cronica-canina`, `insuficiencia-pancreatica-exocrina-caes-gatos`.

**Localização:** [diseases.enteropatia-inflamatoria-cronica-canina.seed.ts:386](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.enteropatia-inflamatoria-cronica-canina.seed.ts:386).

A tabela diferencial da enteropatia mantém cTLI <2,5 µg/L como critério, enquanto a ficha de IPE já apresenta ≤5,5 para o ensaio atualizado. O leitor recebe regras divergentes para a mesma investigação.

**Evidência:** [Texas A&M GI Laboratory — TLI](https://vetmed.tamu.edu/gilab/service/assays/tli/) descreve mudança do ensaio em março de 2024 e os novos limiares caninos.

**Ajuste recomendado:** Sincronizar os limiares entre fichas e sempre explicitar ensaio, laboratório e faixa inconclusiva. Preservar o corte antigo apenas ao discutir dados históricos que o utilizaram.

### C09 — P2 — ELISA/PCR usados no algoritmo de falha da giardíase

**Fichas:** `giardiase-caes-gatos`.

**Localização:** quickDecisionStrip[11]; fluxos e treatment.monitoramentoPosTratamento/falhaReinfecaoAlgoritmo.

A ficha recomenda repetir coproscopia/ELISA após ≥7–14 dias e inclui ELISA/PCR na investigação de falha, embora outros blocos reconheçam positividade residual. A orientação rápida permanece ambígua e contraditória.

**Evidência:** [CAPC — Giardia, versão consultada em 10/10/2026](https://capcvet.org/guidelines/giardia/) recomenda flotação com centrifugação, quando indicada, 24–48 horas após tratamento se sinais persistem; ELISA/PCR podem permanecer positivos e não devem orientar falha ou reinfecção.

**Ajuste recomendado:** Separar investigação inicial de diarreia, controle clínico e avaliação pós-tratamento. Não usar antígeno/PCR residual como critério de falha; padronizar o algoritmo em resumo e corpo.

### C10 — P2 — LDDST canino descrito como confirmação automática

**Fichas:** `sindrome-cushing-caes`.

**Localização:** [diseaseOverviewOverrides.ts:38](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseaseOverviewOverrides.ts:38); [diseases.sindrome-cushing-caes.seed.ts:112](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.sindrome-cushing-caes.seed.ts:112) e tabelas.

O corpo apresenta limitações, mas o pilar e o fluxo resumem cortisol acima do corte como confirmação. O contexto e a probabilidade pré-teste ficam insuficientes no texto de maior destaque.

**Evidência:** Ettinger, 9ª edição, capítulo 293, PDF 2162–2164, páginas impressas 2010–2012: sensibilidade e especificidade variáveis, falso positivo em doenças não adrenais. [AAHA — diagnóstico canino](https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/diagnostic-testing-and-monitoring-2/) reforça seleção clínica do paciente.

**Ajuste recomendado:** Usar resultado compatível/sustenta a suspeita no contexto clínico; distinguir diagnóstico, exclusão e diferenciação PDH/ADH, evitando a promessa de confirmação isolada.

### C11 — P2 — Amostra de 35,3 animais e desenho de estudo incorreto

**Fichas:** `hipotireoidismo-congenito-caes-gatos`.

**Localização:** [diseases.hipotireoidismo-congenito.seed.ts:48](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.hipotireoidismo-congenito.seed.ts:48).

A faixa rápida menciona maior coorte multicêntrica de 35,3 animais e agrupa referências distintas como uma única coorte. O número é impossível como contagem e a atribuição não é rastreável.

**Evidência:** [Golinelli et al., 2022](https://pubmed.ncbi.nlm.nih.gov/35324868/) é relato de três irmãos British Shorthair, não uma coorte multicêntrica de 35,3 animais. Os demais artigos precisam ser individualizados antes de atribuir outro N.

**Ajuste recomendado:** Informar espécie, N, desenho, autoria e desfecho de cada estudo separadamente; não corrigir o número por suposição.

### C12 — P2 — Atualização de estágio IRIS datada incorretamente

**Fichas:** `doenca-renal-cronica-canina`.

**Localização:** [diseases.doenca-renal-cronica-canina.seed.ts:71](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.doenca-renal-cronica-canina.seed.ts:71) e quickDecisionStrip[0].

O texto apresenta 1,4–2,8 mg/dL no estágio 2 como expansão nova de 2026 e diz que um cão com 2,5 deixou de ser estágio 3 agora. Esses limites já constavam em 2023.

**Evidência:** [Documento IRIS 2023 de estadiamento](https://ebvminpractice.org/wp-content/uploads/2025/08/2_iris_staging_of_ckd_2023.pdf), de autoria IRIS e hospedado em cópia externa; [diretrizes oficiais atuais](https://www.iris-kidney.com/iris-guidelines-1). A edição 2026 existe; o problema é a cronologia dessa mudança específica.

**Ajuste recomendado:** Manter os limites corretos e corrigir a narrativa histórica. Identificar quais mudanças são realmente de 2026, sem invalidar a atualização toda.

### C13 — P2 — Cinomose sem limitações relevantes da RT-PCR

**Fichas:** `cinomose-canina`.

**Localização:** diagnosis.examesEConfirmacao.Testes específicos; registro remoto.

O texto indica materiais e bom rendimento inicial, mas não explica detecção de cepa vacinal, relação entre resultado e fase clínica, nem falso negativo por baixa carga/local de coleta.

**Evidência:** Greene’s Infectious Diseases, 5ª edição (2023), capítulo 22, PDF 958, seção Molecular Diagnosis: most assays não distinguem cepa vacinal/selvagem e há limitações de amostra. [NDSU Veterinary Diagnostic Laboratory](https://www.vdl.ndsu.edu/tests/canine-distemper-virus-pcr/) confirma possível detecção após vacinação recente.

**Ajuste recomendado:** Adicionar histórico vacinal, tipo de ensaio, seleção/qualidade da amostra e conduta frente a negativo com suspeita alta; substituir referência à página inicial do MSD pelo capítulo específico.

### C14 — P2 — Via bacteriana ascendente tratada como quase universal

**Fichas:** `triade-felina`.

**Localização:** [diseases.triade-felina.seed.ts:94](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.triade-felina.seed.ts:94); quickDecisionStrip[2].

Colangite neutrofílica quase sempre envolve enterobactérias ascendentes confunde associação bacteriana com uma via causal praticamente comprovada.

**Evidência:** Ettinger, 9ª edição, capítulo 225, PDF 1400–1401, páginas impressas 1248–1249: a via de chegada das bactérias é controversa; translocação/rota portal e ascensão são modelos discutidos.

**Ajuste recomendado:** Apresentar a associação bacteriana e as vias propostas, explicitando a incerteza mecanística e a investigação/cultura quando indicada.

## Conteúdo que desaparece, referências e organização

### R01 — P1 — Números clínicos convertidos em referências bibliográficas

**Fichas:** `bronquite-cronica-caes-gatos`, `sindrome-cushing-caes`, `hipoadrenocorticismo-addison`, `diabetes-mellitus-felina`, `intermacao-caes-gatos`.

**Localização:** utils/[editorialReferenceMarkers.ts:33](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/utils/editorialReferenceMarkers.ts:33), :55 e :235.

O parser interpreta números entre parênteses como listas/intervalos bibliográficos. (0,5)^4 vira referência 5; (0–15) vira 15 referências; (1,008–1,020) perde a densidade; (6,48)/(5,26) perdem as razões de chances. O efeito ocorre nos blocos que usam EditorialRichText; alguns campos são texto simples e não passam pelo parser.

**Evidência:** Reprodução com os textos e referências reais das fichas, registrada em evidencias-marcadores.json. A conversão é demonstrada nos segmentos do parser e no HTML do bloco de bronquite/intermação; no clinicalMeaning de Addison há diferença entre apresentação ampla com rich text e compacta com texto simples.

**Ajuste recomendado:** Reservar marcadores explícitos com ID estável para citações. Preservar decimais, intervalos e expressões matemáticas. Nunca descartar partes desconhecidas de um token numérico.

### R02 — P1 — Planos diagnósticos inteiros desaparecem

**Fichas:** `sindrome-cushing-gatos`, `micoplasmoses-hemotropicas`, `cardiomiopatia-restritiva-felina`.

**Localização:** [DiseaseSectionRenderer.tsx:71](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseSectionRenderer.tsx:71) e :1543; diagnosis.passosDiagnosticos.

Cada ficha tem cinco etapas. A última não possui description, então every rejeita a lista inteira. O fallback mantém somente strings e remove os cinco objetos, deixando o título sem plano.

**Evidência:** Renderização React real de cada seção com as referências correspondentes: 15 etapas ausentes. Ausência das descrições e títulos confirmada no HTML e confrontada com o schema.

**Ajuste recomendado:** Normalizar itens individualmente; aceitar description opcional com fallback seguro. Validar o conteúdo no cadastro e impedir que um item inválido elimine seus irmãos.

### R03 — P1 — Sinais clínicos estruturados não aparecem

**Fichas:** `obstrucao-funcional-fluxo-urinario-caes`, `intermacao-caes-gatos`.

**Localização:** [DiseaseSectionRenderer.tsx:52](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseSectionRenderer.tsx:52) e :1544; clinicalSignsPathophysiology.

Obstrução usa name/frequency/description; intermação usa sign/detail. O renderer aceita finding/mechanism, rejeita o conjunto e elimina objetos no fallback. Nas duas fichas, o componente auditado produz a seção sem os grupos e suas explicações cadastradas.

**Evidência:** HTML das seções e schema: oito achados na obstrução e 13 na intermação não exibidos no componente auditado.

**Ajuste recomendado:** Converter os formatos para um schema comum e renderizar cada achado com mecanismo, relevância e prioridade. Acrescentar validação de conteúdo efetivamente visível.

### R04 — P1 — Seção de complicações da trombocitopenia fica vazia

**Fichas:** `trombocitopenia-caes-gatos`.

**Localização:** [diseases.trombocitopenia-caes-gatos.seed.ts:490](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseases.trombocitopenia-caes-gatos.seed.ts:490); [DiseaseSectionRenderer.tsx:1548](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseSectionRenderer.tsx:1548).

As seis complicações são objetos complication/frequency/clinicalImplication. O fallback filtra somente strings; desaparecem hemorragia GI/SNC, complicações oculares, Evans, tromboembolismo e recidiva.

**Evidência:** Seis registros no dado; zero texto correspondente na renderização da seção. Não é falta de autoria: é perda de conteúdo no componente.

**Ajuste recomendado:** Adicionar suporte/normalização para complicações estruturadas e verificar se o renderer produziu conteúdo útil.

### R05 — P2 — 80 figuras de 19 fichas não são renderizadas

**Fichas:** `cistite-enfisematosa-caes-gatos`, `trombocitopenia-caes-gatos`, `anemia-caes-gatos`, `leishmaniose-caes-gatos`, `cistite-idiopatica-felina`, `discinesia-paroxistica-caes-gatos`, `platinosomose-felina`, `triade-felina`, `sepse-canina`, `sepse-felina`, `lesao-renal-aguda-felina`, `pielonefrite-caes-gatos`, `lesao-renal-aguda-canina`, `intermacao-caes-gatos`, `polirradiculoneurite-caes-gatos`, `tetano-caes-gatos`, `brucelose-caes-gatos`, `megaesofago-caes-gatos`, `paralisia-laringea-caes-gatos`.

**Localização:** [DiseaseSectionRenderer.tsx:104](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseSectionRenderer.tsx:104) e :1520; [DiseaseDetailPage.tsx:567](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/pages/DiseaseDetailPage.tsx:567).

Essas listas usam url/legend/caption/source sem kind. normalizeClinicalFigure exige kind e src/url conforme o tipo; nenhuma imagem é reconhecida. O fallback elimina os objetos. Fichas afetadas constam na cobertura individual.

**Evidência:** Foram renderizadas todas as 27 listas de figuras existentes. Em 19 listas, os 80 registros produziram zero tags img. Isso comprova ausência de exibição; não avalia disponibilidade remota, correspondência científica ou direitos das imagens.

**Ajuste recomendado:** Padronizar o schema de imagens, preservar legenda e atribuição de fonte e validar imagens visíveis antes de avaliar seu conteúdo científico.

### R06 — P2 — Tabelas com columns/rows incompatíveis

**Fichas:** `discinesia-paroxistica-caes-gatos`, `platinosomose-felina`, `obstrucao-funcional-fluxo-urinario-caes`.

**Localização:** [DiseaseSectionRenderer.tsx:75](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseSectionRenderer.tsx:75); tabelas nas seções etiologia/diagnóstico/tratamento.

Há 11 tabelas nas seções principais com columns em vez de headers. Nenhuma é reconhecida como tabela. Linhas de objetos podem sumir; linhas de arrays e colunas podem se fragmentar em texto sem as relações comparativas.

**Evidência:** Normalizador rejeita as 11 estruturas. HTML confirma zero table nas seções afetadas de obstrução, e zero tabela nas etiologias/tratamentos citados de discinesia e platinosomose.

**Ajuste recomendado:** Usar headers/rows normalizados ou implementar columns com mapeamento por chave. Preservar correspondência coluna/célula e testar conteúdo, inclusive em tela pequena.

### R07 — P1 — Tabelas e protocolos de paralisia laríngea não entram na página

**Fichas:** `paralisia-laringea-caes-gatos`.

**Localização:** [DiseaseDetailPage.tsx:523](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/pages/DiseaseDetailPage.tsx:523)–578; campos tables/errorsAndTrapdoors/clinicalProtocols.

A página renderiza as seções padronizadas e figuras, mas não esses três campos de topo. Seis tabelas, dez armadilhas e um conjunto de protocolos clínicos ficam fora da página. Trechos mandam consultar Tabela 1–6 sem disponibilizá-las.

**Evidência:** Confronto entre dados e JSX da página; contagem feita no registro final. O conteúdo não chega ao DiseaseSectionRenderer.

**Ajuste recomendado:** Integrar tabelas, armadilhas e protocolos às seções adequadas ou criar blocos explícitos, com navegação e referências internas que funcionem.

### R08 — P1 — Jornadas e mecanismos fisiológicos descartados

**Fichas:** `insulinoma-caes-gatos`, `cetoacidose-diabetica-caes-gatos`.

**Localização:** pathophysiology/pathogenesisTransmission.fluxo*.etapas; diagnosis.jornadaDiagnostica.

Listas fase/evento e etapa/acao/nota não têm renderer compatível e são filtradas como objetos. Duas jornadas diagnósticas de cinco passos e dois fluxos fisiológicos de seis etapas perdem seu conteúdo.

**Evidência:** 22 itens identificados e ausentes no HTML das respectivas seções.

**Ajuste recomendado:** Normalizar as jornadas/fluxos ou renderizar os campos específicos com ordem, ações e critérios de decisão.

### R09 — P2 — Oito tabelas de decisão rápida nunca são exibidas

**Fichas:** `giardiase-caes-gatos`, `coccidiose-caes-gatos`, `hiperparatireoidismo-caes-gatos`, `sepse-canina`, `obstrucao-funcional-fluxo-urinario-caes`, `sepse-felina`, `lesao-renal-aguda-felina`, `lesao-renal-aguda-canina`.

**Localização:** [DiseaseQuickSummaryPanel.tsx](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseQuickSummaryPanel.tsx); quickSummaryRich.tabelaDecisaoClinicaRapida.

O campo está preenchido em oito fichas, mas o painel utiliza lead, pilares e dois fluxos. Não há ramo que exiba a tabela de decisão rápida.

**Evidência:** Busca integral do componente e comparação das chaves consumidas com os dados; os oito slugs constam na cobertura.

**Ajuste recomendado:** Decidir sua posição junto aos fluxos e integrá-la ao painel com schema validado; evitar tabelas cadastradas sem consumidor.

### R10 — P2 — Protocolos medicamentosos da fístula remota desaparecem

**Fichas:** `fistula-perianal`.

**Localização:** treatment.drugProtocolExamples; [DiseaseSectionRenderer.tsx:1548](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseSectionRenderer.tsx:1548).

Cinco protocolos protocolName/details/species não são reconhecidos como protocolos drug. O texto específico de ciclosporina, associação com cetoconazol, tacrolimo, corticoide e lactulose é descartado.

**Evidência:** Lista de cinco objetos no registro remoto incorporado ao catálogo e ausência na renderização de tratamento.

**Ajuste recomendado:** Converter o schema remoto, preservando dose, espécie, condições de uso e monitorização; integrar os dois registros de fístula sem perder informação.

### R11 — P2 — Abas rápidas prometem fluxos que não existem

**Fichas:** `trombocitopenia-caes-gatos`, `linfoma-cutaneo-caes-gatos`.

**Localização:** [DiseaseQuickSummaryPanel.tsx](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/components/disease/DiseaseQuickSummaryPanel.tsx): abas diagnosis/treatment.

Trombocitopenia não tem nenhum dos dois fluxos; linfoma cutâneo não tem fluxo terapêutico. As abas mostram indisponível, apesar de haver conteúdo clínico no corpo.

**Evidência:** Verificação de quickSummaryRich nas 78 fichas locais e das condições de renderização do painel. Os três registros remotos sem quickSummaryRich usam outro caminho; não foram contados como abas vazias.

**Ajuste recomendado:** Completar os fluxos quando úteis ou oferecer navegação explícita para o conteúdo existente, sem insinuar ausência de tratamento.

### R12 — P2 — Citações numéricas fora da bibliografia e referências cruzadas erradas

**Fichas:** `diabetes-mellitus-canina`, `dermatite-atopica-canina`, `doenca-do-disco-intervertebral-caes`, `doenca-do-disco-intervertebral-gatos`.

**Localização:** referências e citações numéricas no corpo.

Detectadas 23 ocorrências de citações numéricas com índices inexistentes nas quatro fichas. Na DDIV felina, números de uma bibliografia anterior parecem ter sido mantidos; uma menção a Fowler aponta para índice 9, cujo item atual é BSAVA. Tokens 1F também não seguem o esquema numérico suportado.

**Evidência:** Contagens locais: diabetes canina 3, dermatite atópica 2, DDIV canina 5, DDIV felina 13. O detector bruto produziu 32 candidatos; nove eram números clínicos/periódicos e NÃO foram contabilizados como citações inválidas confirmadas.

**Ajuste recomendado:** Migrar citações para IDs estáveis; resolver cada menção pela obra correta; validar existência e vínculo sem remover silenciosamente parte da referência.

### R13 — P2 — Catálogo duplica versões da mesma doença

**Fichas:** `doenca-renal-cronica`, `doenca-renal-cronica-canina`, `doenca-renal-cronica-felina`, `fistula-perianal`, `fistula-perianal-furunculose-anal`.

**Localização:** utils/[mergeDiseaseRecords.ts:12](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/utils/mergeDiseaseRecords.ts:12); repositórios local/Supabase.

Cinco registros remotos resultam em três adicionais ao seed: cinomose, DRC geral e fístula. DRC geral e fístula coexistem com fichas locais mais completas. A única alias registrada é colapso traqueal. Falha remota muda o catálogo para 78 registros locais.

**Evidência:** Consulta de leitura ao banco configurado, adaptação de dados legados e execução da função real de merge: 81 slugs. O total é da fotografia consultada; não pressupõe todos os registros privados de outras contas.

**Ajuste recomendado:** Definir entradas canônicas por espécie e finalidade, redirecionar slugs legados após preservar conteúdo exclusivo e explicitar disponibilidade/versão. Não tratar cinomose como duplicata.

### R14 — P2 — Resumo do cartão e detalhe local usam transformações distintas

**Fichas:** `sindrome-cushing-caes`.

**Localização:** services/adapters/local/[localDiseaseRepository.ts:12](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/services/adapters/local/localDiseaseRepository.ts:12) e :18; [diseaseOverviewOverrides.ts](C:/Users/luzau/OneDrive/Documentos/GitHub/LuzaumGuidebook/modules/consulta-vet/data/seed/diseaseOverviewOverrides.ts).

list aplica overrides nos stubs; getBySlug retorna o seed sem override. O modo Supabase aplica overrides na lista consolidada. Portanto, revisar só um dos resumos pode deixar outra versão divergente em uso.

**Evidência:** Leitura dos caminhos reais dos repositórios. O problema arquitetural é confirmado; todas as divergências clínicas entre previews, plainLanguage e corpo ainda não foram avaliadas.

**Ajuste recomendado:** Centralizar a seleção do texto editorial e a aplicação dos overrides; derivar cartão, resumo simples e resumo clínico de uma versão rastreável.

### R15 — P3 — Informação urgente compete com texto extenso e versões repetidas

**Fichas:** Recomendação geral; sem atribuição de erro clínico a todas as fichas..

**Localização:** resumos, QuickDecisionStrip, corpo e previews.

As fichas combinam definição simples, preview, lead, pilares, faixa rápida e corpo. Há longos blocos narrativos e afirmações absolutas; a repetição dificulta identificar qual regra deve orientar a ação e favorece contradições como C02/C08.

**Evidência:** Inspeção dos dados e da composição dos componentes. Trata-se de recomendação editorial: não houve teste de usabilidade com participantes nem avaliação visual autenticada de todas as telas.

**Ajuste recomendado:** Abrir com urgência/primeira decisão, seguir com confirmação e diferenciais, depois terapia/monitorização e aprofundamento. Padronizar condição → ação → reavaliação; separar hipótese mecanística de fato e não usar fatal/obrigatório como substituto de critérios.

## Critérios para a revisão restante

Para cada ficha, ainda é necessário confrontar de ponta a ponta definição, espécie, etiologia, epidemiologia, mecanismos, manifestações, diferenciais, testes e suas limitações, tratamento por cenário, doses/vias/intervalos, contraindicações, monitorização, prognóstico e prevenção. Todo achado deve guardar fonte, edição, capítulo/página e condição de aplicabilidade. Falta de achado nesta rodada não libera a ficha para uso como referência validada.

A conferência deve combinar livros com normas e informações de ensaios atuais. Exemplos de atualizações reais que não foram tratadas como invenção: IRIS 2026, RECOVER First Aid 2026 e o estudo canino de beraprost de 2026. O [estudo de beraprost](https://pmc.ncbi.nlm.nih.gov/articles/PMC13184642/) realmente relata 33 cães e medianas de 1101/198 dias, mas seu desenho sem randomização e controle histórico limita a força causal. A avaliação não marcou uma referência como falsa apenas por ser recente ou ausente do acervo.

A próxima verificação visual precisa de sessão autenticada e deve checar desktop e celular: prioridade das urgências, conteúdo expandido, tabelas com cabeçalhos, imagens/legendas, navegação, referências clicáveis e persistência de dados numéricos. As perdas comprovadas acima podem ser corrigidas e testadas antes dessa etapa.

## Cobertura individual do catálogo

| Ficha | Achados identificados no escopo | Revisão clínica integral |
|---|---|---|
| Anemia em Cães e Gatos (`anemia-caes-gatos`) | R05 | Pendente |
| Anemia Hemolítica Imunomediada em Cães (AHIM / IMHA) (`anemia-hemolitica-imunomediada-canina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Arritmias cardíacas em cães e gatos (`arritmias-cardiacas-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Asma felina (`asma-felina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Babesiose canina (`babesiose-canina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Bronquite crônica em cães e gatos (`bronquite-cronica-caes-gatos`) | R01 | Pendente |
| Brucelose em Cães e Gatos (Brucella canis) (`brucelose-caes-gatos`) | R05 | Pendente |
| Cardiomiopatia dilatada (CMD) (`cardiomiopatia-dilatada-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Cardiomiopatia hipertrófica (CMH) (`cardiomiopatia-hipertrofica-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Cardiomiopatia restritiva felina (CMR / RCM) (`cardiomiopatia-restritiva-felina`) | R02 | Pendente |
| Cetoacidose diabética em cães e gatos (`cetoacidose-diabetica-caes-gatos`) | R08 | Pendente |
| Cinomose Canina (`cinomose-canina`) | C13 | Pendente |
| Cistite Enfisematosa em Cães e Gatos (`cistite-enfisematosa-caes-gatos`) | R05 | Pendente |
| Cistite Idiopática Felina (CIF / FIC) (`cistite-idiopatica-felina`) | R05 | Pendente |
| Cistoisosporose em cães e gatos (`coccidiose-caes-gatos`) | R09 | Pendente |
| Coagulação intravascular disseminada (CID/DIC) (`coagulacao-intravascular-disseminada-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Colapso Traqueal em Cães e Gatos (`colapso-traqueal-canino`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Complexo do granuloma eosinofílico felino (`granuloma-eosinofilico-felino`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Dermatite Atópica Canina (`dermatite-atopica-canina`) | R12 | Pendente |
| Diabetes Mellitus Canino (`diabetes-mellitus-canina`) | R12 | Pendente |
| Diabetes Mellitus Felino (`diabetes-mellitus-felina`) | R01 | Pendente |
| Discinesia Paroxística em Cães e Gatos (`discinesia-paroxistica-caes-gatos`) | R05; R06 | Pendente |
| Doença do Disco Intervertebral — Cães (`doenca-do-disco-intervertebral-caes`) | R12 | Pendente |
| Doença do Disco Intervertebral — Gatos (`doenca-do-disco-intervertebral-gatos`) | C04; R12 | Pendente |
| Doença Periodontal Canina (`doenca-periodontal-caes`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Doença Periodontal Felina (`doenca-periodontal-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Doença Renal Crônica (`doenca-renal-cronica`) | R13 | Pendente |
| Doença renal crônica em cães (DRC canina) (`doenca-renal-cronica-canina`) | C12; R13 | Pendente |
| Doença renal crônica em felinos (DRC felina) (`doenca-renal-cronica-felina`) | R13 | Pendente |
| Doença valvar mitral degenerativa (DMVD / endocardiose) (`doenca-valvar-mitral-degenerativa-caes`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Doenças do trato urinário inferior felino (DTUIF) (`doencas-trato-urinario-inferior-felino-dtuif`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Enteropatia perdedora de proteínas em cães e gatos (PLE) (`enteropatia-perdedora-de-proteinas-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Enteropatias inflamatórias crônicas em cães (CIE / antiga IBD) (`enteropatia-inflamatoria-cronica-canina`) | C08 | Pendente |
| Erliquiose monocítica canina (Ehrlichia canis) (`erliquiose-monocitica-canina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Fístula perianal (`fistula-perianal`) | R10; R13 | Pendente |
| Fístula perianal / furunculose anal (`fistula-perianal-furunculose-anal`) | R13 | Pendente |
| Gengivoestomatite crônica felina (GECF) (`gengivoestomatite-cronica-felina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Giardíase em cães e gatos (`giardiase-caes-gatos`) | C09; R09 | Pendente |
| Hiperparatireoidismo em cães e gatos (`hiperparatireoidismo-caes-gatos`) | R09 | Pendente |
| Hipertensão arterial sistêmica (HAS) (`hipertensao-arterial-sistemica-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Hipertireoidismo felino (`hipertireoidismo-felino`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Hipoadrenocorticismo (Doença de Addison) (`hipoadrenocorticismo-addison`) | R01 | Pendente |
| Hipotireoidismo adquirido (cão e gato) (`hipotireoidismo-adquirido-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Hipotireoidismo congênito (cão e gato) (`hipotireoidismo-congenito-caes-gatos`) | C11 | Pendente |
| Insuficiência pancreática exócrina (IPE/EPI) (`insuficiencia-pancreatica-exocrina-caes-gatos`) | C08 | Pendente |
| Insulinoma em cães e gatos (`insulinoma-caes-gatos`) | R08 | Pendente |
| Intermação em Cães e Gatos (`intermacao-caes-gatos`) | R01; R03; R05 | Pendente |
| Leishmaniose em Cães e Gatos (`leishmaniose-caes-gatos`) | R05 | Pendente |
| Leishmaniose visceral canina (leishmaniose canina por L. infantum) (`leishmaniose-visceral-canina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Lesão Renal Aguda em Cães (LRA / IRA / AKI) (`lesao-renal-aguda-canina`) | R05; R09 | Pendente |
| Lesão Renal Aguda em Felinos (LRA / AKI) (`lesao-renal-aguda-felina`) | R05; R09 | Pendente |
| Leucemia viral felina (FeLV) (`leucemia-viral-felina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Linfoma cutâneo (`linfoma-cutaneo-caes-gatos`) | R11 | Pendente |
| Linfoma Mediastinal em Cães e Gatos (`linfoma-mediastinal-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Mastite em cadelas e gatas (`mastite-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Megacólon (`megacolon-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Megaesôfago em Cães e Gatos (`megaesofago-caes-gatos`) | R05 | Pendente |
| Miastenia gravis adquirida (cão e gato) (`miastenia-gravis-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Micoplasmoses hemotrópicas (hemoplasmas) em pequenos animais (`micoplasmoses-hemotropicas`) | R02 | Pendente |
| Neoplasias intracranianas em cães (tumores encefálicos) (`neoplasias-intracranianas-caes`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Obstrução Funcional do Fluxo Urinário em Cães (FOO) (`obstrucao-funcional-fluxo-urinario-caes`) | R03; R06; R09 | Pendente |
| Paralisia Laríngea em Cães e Gatos (GOLPP / LPPN) (`paralisia-laringea-caes-gatos`) | R05; R07 | Pendente |
| Peritonite infecciosa felina (PIF/FIP) (`peritonite-infecciosa-felina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Pielonefrite em Cães e Gatos (Pielonefrite Bacteriana / Fúngica) (`pielonefrite-caes-gatos`) | R05 | Pendente |
| Piotórax em Cães e Gatos (`piotorax-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Platinosomose Felina (`platinosomose-felina`) | R05; R06 | Pendente |
| Polirradiculoneurite Aguda em Cães e Gatos (ACP / AIP) (`polirradiculoneurite-caes-gatos`) | R05 | Pendente |
| Prostatite em cães e gatos (`prostatite-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Quilotórax em Gatos e Cães (`quilotorax-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Sepse e Choque Séptico em Cães (`sepse-canina`) | R05; R09 | Pendente |
| Sepse e Choque Séptico em Felinos (`sepse-felina`) | R05; R09 | Pendente |
| Síndrome Cutânea Atópica Felina (`sindrome-cutanea-atopica-felina`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Síndrome de Cushing — Cão (`sindrome-cushing-caes`) | C10; R01; R14 | Pendente |
| Síndrome de Cushing — Gato (`sindrome-cushing-gatos`) | C01; C02; C03; R02 | Pendente |
| Síndrome mielodisplásica (MDS) (`sindrome-mielodisplasica-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Síndromes miastênicas congênitas (cão e gato) (`sindromes-miastenicas-congenitas-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Trombocitopenia em Cães e Gatos (`trombocitopenia-caes-gatos`) | R04; R05; R11 | Pendente |
| Tríade Felina (`triade-felina`) | C05; C06; C07; C14; R05 | Pendente |
| Tumores mamários em cães e gatos (`tumores-mamarios-caes-gatos`) | Nenhum listado nesta rodada; não implica validação | Pendente |
| Tétano em Cães e Gatos (Clostridium tetani) (`tetano-caes-gatos`) | R05 | Pendente |
| Vírus da imunodeficiência felina (FIV) (`imunodeficiencia-felina-fiv`) | Nenhum listado nesta rodada; não implica validação | Pendente |

## Evidências reproduzíveis

- `evidencias-renderizacao.json`: 81 registros × nove seções; arrays suspeitos de perda. A triagem automática desses arrays foi confrontada com o schema/HTML antes de formular os achados.
- `evidencias-figuras-tabelas.json`: listas de figuras, reconhecimento do schema e tabelas incompatíveis.
- `evidencias-marcadores.json`: textos reais e saída do parser numérico.
- `ACHADOS.json`: versão estruturada dos achados, com prioridade, localização, fonte e correção proposta.

As extrações integrais dos livros permanecem em tmp e não integram o relatório distribuído. Os números de páginas dos livros indicam página PDF (contagem a partir de 1) e, quando identificada, a paginação impressa. O relatório não reproduz integralmente material do acervo.

Cache de trabalho e scripts desta rodada arquivados em C:\Users\luzau\.codex\audit-cache\2026-10-10-consultavet, fora do repositório. A extração foi interrompida ao consolidar esta rodada; livros pendentes continuam pendentes. O servidor de desenvolvimento iniciado para a inspeção foi encerrado.
