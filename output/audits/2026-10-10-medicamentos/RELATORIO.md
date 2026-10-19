# Auditoria da seção Medicamentos — ConsultaVet

Data: 10/10/2026. Escopo: análise, sem alteração das fichas, do banco ou do código do aplicativo.

Foram encontradas **14 classes de problemas: 6 de prioridade alta (P1) e 8 de prioridade média (P2)**. Há erros reproduzidos de receita, tabelas, renderização, apresentação comercial e perda de informações, além de problemas nas explicações de estudos clínicos.

## Cobertura e limites

**A varredura estrutural cobre as 33 fichas públicas e seus 202 regimes de dose, 147 apresentações e 155 estudos comentados cadastrados. A conferência clínica foi dirigida e permanece parcial.** Não foi feita leitura integral de todos os livros do acervo, nem validação clínica integral de cada regime. A planilha de cobertura distingue isso por medicamento; ausência de achado não significa aprovação de segurança, eficácia ou dose.

O seed contém 41 medicamentos; oito estão fora da lista pública. A leitura remota encontrou 32 registros publicados, mas apenas alopurinol, amoxicilina/clavulanato e fenobarbital coincidem com a lista pública. Aplicando a mesclagem real e as sobreposições, o catálogo efetivo permanece com 33 fichas e 202 regimes. Categorias e vínculos remotos com doenças não foram conferidos nesta etapa e não foram tratados como ausências.

Foram executadas 231 renderizações estáticas de sete componentes para os 33 medicamentos: 230 concluíram e uma falhou, na Info da buprenorfina. Isso verifica processamento e conteúdo do HTML; não substitui inspeção da sessão autenticada, navegação real, celular, contraste, posição visual ou comportamento de impressão. Alguns componentes ficam condicionados à presença de conteúdo na página.

As sondas de cálculo usam o código real do hook com estado React substituído por pesos de teste. A sonda de mesclagem usa a função real extraída do repositório. Não houve montagem da calculadora na tela pública, cópia de receita, administração de medicamento ou gravação remota.

## Problemas priorizados

| ID | Prioridade | Problema | Abrangência |
|---|---|---|---|
| M01 | P1 | Receita e tabela de dipirona aparecem em três outros medicamentos | 3 fichas |
| M02 | P1 | A aba Info de buprenorfina lança exceção | 1 fichas |
| M03 | P1 | Sete quadros de interações deixam de mostrar as listas cadastradas | 7 fichas |
| M04 | P1 | Cinco quadros de efeitos adversos omitem conteúdo disponível | 5 fichas |
| M05 | P1 | A detecção de CRI transforma três doses intermitentes em taxas horárias | 2 fichas |
| M06 | P2 | As taxas de CRI também recebem /h duplicado na formatação | 2 fichas |
| M07 | P1 | Meloxicam: o resultado sobre proteinúria é omitido do estudo usado para segurança renal | 1 fichas |
| M08 | P2 | 83 apresentações têm nome cadastrado, mas título comercial vazio na tela | 19 fichas |
| M09 | P2 | Canal veterinário é confundido com forma injetável | 11 fichas |
| M10 | P2 | A palavra comprimido vira automaticamente Comprimido Sulcado | 2 fichas |
| M11 | P2 | Calculadora latente multiplica doses fixas e ignora teto absoluto | 2 fichas |
| M12 | P2 | Atualizações remotas de doses/apresentações podem ser descartadas pelo tamanho da lista | 3 fichas |
| M13 | P2 | Oito estudos comentados não são incorporados aos blocos de evidência | 6 fichas |
| M14 | P2 | Mirtazapina: o ensaio de 2025 é descrito com dose, autoria e conclusão imprecisas | 1 fichas |

## M01 — Receita e tabela de dipirona aparecem em três outros medicamentos

**P1 · Exibição reproduzida.** Medicamentos: ciclosporina, clorambucil, sucralfato.

Local: `modules/consulta-vet/components/medication/MedicationMarketTab.tsx:30 e :79`.

As três fichas não possuem samplePrescriptionText nem practicalWeightTable. O componente preenche ambas com Novalgina 500 mg/mL, 25 mg/kg e tabela de gotas/comprimidos/injetável. Confirmado no HTML das três fichas. O botão de copiar usa o mesmo texto.

**Consequência:** A prescrição e o guia por peso apresentados sob a ficha do outro princípio ativo são incorretos. Isso não representa uma dose farmacológica válida para esses três medicamentos.

**Correção proposta:** Eliminar o preenchimento genérico com outro fármaco. Exibir ausência de modelo/tabela e cadastrar somente exemplos próprios, com espécie, indicação, formulação e contexto.

## M02 — A aba Info de buprenorfina lança exceção

**P1 · Falha de renderização reproduzida.** Medicamentos: buprenorfina.

Local: `modules/consulta-vet/components/medication/MedicationGeneralInfoTab.tsx:146; data/seed/medications.buprenorfina.seed.ts:454`.

TypeError: Cannot read properties of undefined (reading map). O cadastro usa diluentsCompatible/incompatibilities/infusionRate/storageRequirements; o componente exige compatibleFluids/incompatibleFluids/infusionRateGuidance/preparationNotes.

**Consequência:** A aba não consegue renderizar suas informações; compatibilidade, administração e prescrição ficam indisponíveis nesse fluxo.

**Correção proposta:** Normalizar as duas representações na entrada, validar os campos e proteger listas ausentes. Preservar as orientações clínicas existentes.

## M03 — Sete quadros de interações deixam de mostrar as listas cadastradas

**P1 · Omissão de exibição reproduzida.** Medicamentos: amitriptilina, ciclosporina, ciproeptadina, clorambucil, gabapentina, mirtazapina, sucralfato.

Local: `modules/consulta-vet/components/medication/MedicationAttentionTab.tsx:418–473`.

Há 52 entradas em medication.interactions nesses sete registros, mas a seção utiliza apenas attentionData.drugInteractionsDetailed e retorna null quando essa lista falta. Os títulos permanecem no HTML sem as respectivas interações.

**Consequência:** O quadro destinado à consulta de interações fica vazio. Algumas advertências aparecem em outras partes da ficha; isso não substitui a lista omitida e não demonstra ausência de interações.

**Correção proposta:** Converter as listas simples ou criar uma apresentação alternativa. Distinguir informação ainda não cadastrada de ausência de interação conhecida.

## M04 — Cinco quadros de efeitos adversos omitem conteúdo disponível

**P1 · Omissão de exibição reproduzida.** Medicamentos: ciclosporina, ciproeptadina, clorambucil, gabapentina, sucralfato.

Local: `modules/consulta-vet/components/medication/MedicationAttentionTab.tsx:132 e :205–253`.

Os cinco medicamentos somam 30 entradas em adverseEffects. Sem adverseEffectsDetailed, o componente não apresenta essas entradas no quadro de efeitos adversos. Confirmado por dados e renderização.

**Consequência:** O leitor encontra uma seção de segurança sem eventos já descritos no cadastro, inclusive mielossupressão de clorambucil e eventos de ciclosporina.

**Correção proposta:** Usar uma alternativa de renderização sem atribuir frequência ou conduta inventada. Exibir os dados detalhados quando disponíveis.

## M05 — A detecção de CRI transforma três doses intermitentes em taxas horárias

**P1 · Corrupção de unidade no processamento.** Medicamentos: ampicilina-sulbactam, diazepam.

Local: `modules/consulta-vet/data/medicationClinicalCorrections.ts:648–657`.

includes("cri") reconhece o ID dose-amp-sulb-sepsis-crit e a palavra "crise" nas frequências de dose-diaz-dog-status-iv e dose-diaz-dog-rectal. Os seeds têm mg por kg; o catálogo processado contém doseUnit="mg/kg/h", perWeightUnit="h" nesses três regimes.

**Consequência:** Bolus/resgate e dose intermitente passam a ter dimensão de infusão. Os resumos rápidos próprios evitam a exposição direta desses campos nos casos examinados; os dados efetivos continuam errados para outros consumidores.

**Correção proposta:** Usar modalidade de administração explícita ou reconhecimento de termo completo. Manter bolus em mg/kg e distinguir infusão contínua. Conferir novamente dados após as sobreposições.

Fontes:
- C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf — PDF 110 / p. 83: 22–30 mg/kg IV q6–8h da associação total; PDF 407 / p. 380: bolus e resgate retal de diazepam em mg/kg.

## M06 — As taxas de CRI também recebem /h duplicado na formatação

**P2 · Erro dimensional de representação.** Medicamentos: diazepam, metadona.

Local: `modules/consulta-vet/utils/medicationRules.ts:26 e :39; modules/consulta-vet/data/medicationClinicalCorrections.ts:655–656`.

Nos regimes realmente contínuos, doseUnit já contém mg/kg/h e perWeightUnit contém h. buildClinicalDoseLabel concatena ambos e gera mg/kg/h/h. A sonda também reproduziu esse rótulo em doses classificadas incorretamente como CRI.

**Consequência:** A notação temporal perde clareza e não deve orientar cálculo de bomba. Os seletores da calculadora não estão montados na tela pública atual.

**Correção proposta:** Definir unidades estruturadas de massa, peso e tempo; formatar uma única vez e apresentar mg/h ou mL/h após conversão, conforme o regime.

## M07 — Meloxicam: o resultado sobre proteinúria é omitido do estudo usado para segurança renal

**P1 · Explicação clínica incompleta.** Medicamentos: meloxicam.

Local: `modules/consulta-vet/data/seed/medications.meloxicam.seed.ts:422, :789–799 e :903`.

Atenção e Fundamentos enfatizam ausência de diferenças de creatinina/TFG/biomarcadores no estudo de KuKanich. Não apresentam o aumento de UPC e sua implicação. A lista efetiva de monitoramento também não inclui UPC.

**Consequência:** A interpretação transmite segurança renal mais ampla do que o ensaio sustenta. Ausência de diferença na função excretora não equivale à ausência de outros efeitos renais.

**Correção proposta:** Acrescentar o sinal de proteinúria, eventos digestivos e monitoramento de UPC. Explicar seleção individual e incerteza, sem transformar DRC estável em contraindicação automática.

Fontes:
- [Fonte primária](https://pubmed.ncbi.nlm.nih.gov/32594827/)
- [Fonte primária](https://pmc.ncbi.nlm.nih.gov/articles/PMC10741344/)

## M08 — 83 apresentações têm nome cadastrado, mas título comercial vazio na tela

**P2 · Exibição e esquema incompatíveis.** Medicamentos: amantadina, amitriptilina, ampicilina-sulbactam, betanecol, capromorelina, ciclosporina, ciproeptadina, clorambucil, diazepam, gabapentina, levetiracetam, meloxicam, metadona, micofenolato-mofetila, mirtazapina, sucralfato, trazodona, alopurinol, amoxicilina-clavulanato.

Local: `modules/consulta-vet/components/medication/MedicationMarketTab.tsx:202; modules/consulta-vet/utils/medicationRules.ts:110`.

83 de 147 apresentações, em 19 fichas, usam name e não label. O título usa exclusivamente pres.label; não existe alternativa com name. O validador editorial exige label, embora esses registros sejam publicados.

**Consequência:** O usuário vê concentração/via sem o nome no título da apresentação. O esquema também dificulta edição/importação desses registros.

**Correção proposta:** Padronizar o nome na entrada e manter compatibilidade com cadastros existentes. Revalidar apresentações antes de publicar.

## M09 — Canal veterinário é confundido com forma injetável

**P2 · Exibição reproduzida.** Medicamentos: ciclosporina, clindamicina, enrofloxacina, marbofloxacina, meloxicam, mirtazapina, pradofloxacina, prednisolona, pronefra, tramadol, fenobarbital.

Local: `modules/consulta-vet/components/medication/MedicationMarketTab.tsx:85–96`.

A condição formLower.includes("injet") || channel === "veterinary" rotula 40 apresentações de 11 fichas como "Solução Injetável Estéril". Inclui Cyclavance oral, Optimmune oftálmico, Mirtz oral, Mirataz transdérmico e comprimidos. As vias cadastradas podem continuar corretas na linha seguinte.

**Consequência:** A mesma apresentação passa a trazer informações conflitantes de forma e via. O canal de aquisição não determina a forma farmacêutica.

**Correção proposta:** Derivar a forma de campo validado e tratar canal separadamente. Preservar suspensão, solução oral, pomada, cápsula e comprimido.

## M10 — A palavra comprimido vira automaticamente Comprimido Sulcado

**P2 · Generalização de exibição.** Medicamentos: clorambucil, sucralfato.

Local: `modules/consulta-vet/components/medication/MedicationMarketTab.tsx:92–96`.

Qualquer form contendo "comprim" que não caiu na condição anterior recebe "Comprimido Sulcado", sem consultar scoringInfo. Exemplos reproduzidos: Leukeran 2 mg (form: comprimido revestido) e Sucrafilm 1 g (mastigável/dispersível). A regra alcança outros registros também.

**Consequência:** A ficha sugere uma característica de partição que o cadastro não estabelece. Clorambucil exige cuidados específicos de exposição ao manipular comprimidos.

**Correção proposta:** Mostrar a forma real. Só afirmar sulco/divisibilidade quando documentado; manter alerta de manipulação de citotóxico.

Fontes:
- C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf — PDF 271 / p. 244, Dosages, nota 2: manipulação/partição exige salvaguardas de exposição.

## M11 — Calculadora latente multiplica doses fixas e ignora teto absoluto

**P2 · Falha reproduzida em componente não montado.** Medicamentos: betanecol, mirtazapina.

Local: `modules/consulta-vet/hooks/useDoseCalculator.ts:53–56; modules/consulta-vet/components/medication/DoseCalculatorCard.tsx`.

O hook multiplica doseMin/doseMax pelo peso sem considerar perWeightUnit e não aplica maximumDose. Com peso de 4 kg, a dose fixa de Mirtz 2 mg resulta em 8 mg; com 40 kg, o regime canino de mirtazapina resulta em 44–52 mg apesar do teto cadastrado de 30 mg. Há 11 regimes por animal habilitados: seis de betanecol e cinco de mirtazapina. Não foi encontrado ponto de montagem pública do cartão.

**Consequência:** A matemática fica incorreta se esse componente for habilitado/reutilizado. Não foi demonstrado que usuários recebem esses cálculos na interface atual.

**Correção proposta:** Implementar dose fixa, por kg, por superfície e por tempo explicitamente, com limites estruturados. Bloquear regimes não suportados antes de montar a calculadora.

Fontes:
- C:/Users/luzau/OneDrive/Documentos/Livros/Plumb's Veterinary Drug Handbook, 10th edition.pdf — PDF 158–159 / p. 131–132: betanecol por cão/gato; PDF 922 / p. 895: mirtazapina por gato e teto canino de 30 mg.

## M12 — Atualizações remotas de doses/apresentações podem ser descartadas pelo tamanho da lista

**P2 · Risco editorial reproduzido.** Medicamentos: alopurinol, amoxicilina-clavulanato, fenobarbital.

Local: `modules/consulta-vet/services/adapters/supabase/supabaseMedicationRepository.ts:137–138`.

A mesclagem escolhe a lista maior; em empate, escolhe a local. Uma sonda usando a função real mudou frequências e nomes remotos mantendo a quantidade, e ambas as alterações foram descartadas. Os três slugs listados têm registros remotos públicos nesta leitura.

**Consequência:** Uma correção editorial legítima pode não chegar ao catálogo, embora outros campos remotos sejam aplicados. A sonda demonstra o mecanismo; não prova que uma correção concreta já foi perdida.

**Correção proposta:** Definir precedência/versionamento explícitos e mesclar por ID. Não usar quantidade de itens como evidência de atualidade ou qualidade.

## M13 — Oito estudos comentados não são incorporados aos blocos de evidência

**P2 · Omissão no processamento.** Medicamentos: amantadina, betanecol, diazepam, levetiracetam, micofenolato-mofetila, amoxicilina-clavulanato.

Local: `modules/consulta-vet/data/medicationBookFoundations.ts:1153–1158; modules/consulta-vet/pages/MedicationDetailPage.tsx:463`.

Quando priorHasStudies é verdadeiro, a rotina mantém priorFoundations e não converte estudos adicionais de clinicalStudiesCommented. Oito IDs de seis fichas ficam sem bloco correspondente. O componente MedicationClinicalStudiesSection existe, mas não é montado na página.

**Consequência:** Os comentários desses estudos ficam fora do fluxo de evidências; a referência ou menção narrativa pode existir em outro local. Isso não significa que os 155 estudos cadastrados estejam todos ocultos.

**Correção proposta:** Mesclar por referenceId e mostrar os estudos ainda não incorporados, evitando duplicação. Verificar se retirar um comentário foi decisão editorial explícita.

## M14 — Mirtazapina: o ensaio de 2025 é descrito com dose, autoria e conclusão imprecisas

**P2 · Inconsistência clínica/bibliográfica.** Medicamentos: mirtazapina.

Local: `modules/consulta-vet/data/seed/medications.mirtazapina.seed.ts:708, :856–865 e dose-mirt-dog-appetite-conservative-2025`.

O bloco renderizado atribui o trabalho a "Theodoro D, Quimby JM" e usa título diferente. A fonte real é Theodoro SS e colaboradores. O app atribui o resultado prospectivo à faixa uniforme de 0,5–0,6 mg/kg e a menor sedação versus doses altas; o ensaio utilizou faixas por peso com exposição variável e não comparou aleatoriamente dose baixa com dose alta.

**Consequência:** O leitor recebe uma recomendação com grau de comprovação maior que o desenho permite. A evidência de estímulo alimentar no primeiro dia não valida por si só toda a faixa, duração ou superioridade de tolerabilidade proposta.

**Correção proposta:** Corrigir autoria/título e separar dose mediana retrospectiva do protocolo prospectivo. Identificar inferência clínica como tal e retirar a comparação de sedação não testada.

Fontes:
- [Fonte primária](https://www.mdpi.com/2076-2615/15/17/2538)
- [Fonte primária](https://pmc.ncbi.nlm.nih.gov/articles/PMC12427372/)

## Conferências que evitaram falsos positivos

- **Ampicilina/sulbactam em azotemia:** q12h para paciente selecionado com patógeno suscetível encontra apoio no estudo PK de 2025; não foi classificado como erro universal. O estudo não elimina a necessidade de individualização ou justifica generalização para qualquer sepse. [Wang e colaboradores](https://pubmed.ncbi.nlm.nih.gov/40072220/).
- **Mirtazapina transdérmica:** a orientação de aproximadamente 3,8 cm de Mirataz a 2%, equivalente a 2 mg/gato, uma vez ao dia por 14 dias, corresponde à orientação do fabricante. Não foi confundida com dose por kg. [Dechra — administração](https://mirataz.com/mirataz/dosing-and-administration/).
- **Meloxicam canino:** os resumos/notas registram 0,2 mg/kg no primeiro dia e 0,1 mg/kg na manutenção. O valor inicial não foi chamado de sobredose diária só por aparecer no campo principal do regime. Plumb, PDF 854, p. 827.
- **Buprenorfina:** o conteúdo distingue a absorção errática da apresentação convencional por via SC das formulações específicas; não foi considerada falta de alerta sobre essa diferença. Plumb, PDF 179–180, p. 152–153.
- Referências preenchidas e IDs resolvidos não demonstram que cada artigo exista, que a citação esteja correta ou que a conclusão seja fiel. O caso M14 mostra por que essa verificação precisa ocorrer além da validação estrutural.

## Fontes do acervo efetivamente consultadas nesta etapa

Plumb’s Veterinary Drug Handbook, 10ª edição, arquivo do acervo indicado pelo usuário. Consulta dirigida às páginas PDF 109–112 (ampicilina/sulbactam), 157–159 (betanecol), 177–181 (buprenorfina), 270–272 (clorambucil), 405–409 (diazepam), 852–855 (meloxicam) e 920–923 (mirtazapina). O texto extraído foi usado para localizar doses e advertências; a página PDF 109 foi também inspecionada como imagem. As faixas extraídas podem incluir início da monografia seguinte. Não representam leitura integral do livro.

O inventário do acervo da auditoria anterior continua disponível em [INVENTARIO-ACERVO.csv](../2026-10-10-consultavet/INVENTARIO-ACERVO.csv). Extrações e dados remotos brutos ficam em cache local fora do repositório; este relatório não redistribui os livros nem os registros remotos brutos.

## Organização e próximos pontos de revisão

A prioridade é retirar receitas/tabelas de outro princípio ativo, recuperar conteúdo de segurança omitido e corrigir a falha de buprenorfina. Em seguida, revisar unidades antes/depois das sobreposições e corrigir as formas comerciais. Para melhorar a disposição, cada apresentação deve mostrar nome, forma e via coerentes; se uma seção estiver sem dados, deve informar essa ausência sem parecer uma lista negativa de riscos.

Depois desses problemas comprovados, a revisão clínica integral deve conferir cada linha da triagem contra monografia, bula da apresentação e indicação específica: dose, base por animal/kg/m², ataque/manutenção, frequência, duração, contraindicações, ajustes, interações e monitoramento. Também permanecem pendentes a validação de todas as citações primárias, situação comercial/regulatória brasileira por produto e inspeção visual autenticada/responsiva.

## Arquivos de apoio

- [ACHADOS.json](ACHADOS.json): problemas, evidências e propostas de correção.
- [COBERTURA-33-MEDICAMENTOS.csv](COBERTURA-33-MEDICAMENTOS.csv): cobertura e pendências por ficha.
- [TRIAGEM-202-REGIMES.csv](TRIAGEM-202-REGIMES.csv): inventário dos regimes efetivos, sem certificação de posologia.
- [EVIDENCIAS.json](EVIDENCIAS.json): renderizações, sondas, apresentações sem título e estudos omitidos.
- [FORA-DO-CATALOGO-PUBLICO.csv](FORA-DO-CATALOGO-PUBLICO.csv): oito seeds excluídos da seção pública.
