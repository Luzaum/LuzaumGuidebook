import type { MedicationRecord } from '../../types/medication';

/**
 * FENOBARBITAL — Monografia Farmacológica Veterinária Completa
 * ConsultaVET / Vetius • Neurologia e farmacologia clínica de cães e gatos • Revisão científica: 16/11/2026
 */
export const phenobarbitalMedicationsSeed: MedicationRecord[] = [
  {
    id: 'med-fenobarbital',
    slug: 'fenobarbital',
    title: 'Fenobarbital',
    activeIngredient:
      'Fenobarbital (ácido 5-etil-5-fenilbarbitúrico; C₁₂H₁₂N₂O₃; 232,24 g/mol na forma base e 254,22 g/mol no sal sódico anidro)',
    isControlled: true,
    controlNotice:
      'Substância da Lista B1 (Portaria SVS/MS nº 344/1998) com adendo expresso: medicamentos contendo fenobarbital são prescritos em RECEITA DE CONTROLE ESPECIAL EM 2 VIAS (branca, com retenção de 1 via na dispensação — NÃO exige Notificação de Receita B azul). Regra confirmada pela RDC ANVISA nº 1.023, de 11/05/2026 (validade usual de 30 dias; quantidade para até 60 dias).',
    tradeNames: [
      'Fenocris® 100 mg comprimidos (fenobarbital base; embalagem comercial/hospitalar de 200 comp.) — Cristália',
      'Fenocris® Solução Oral 40 mg/mL (frasco 20 mL; 40 gotas/mL = 1 mg/gota no gotejador original) — Cristália',
      'Fenocris® Injetável 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL de fenobarbital base; ampola 2 mL) — Cristália',
      'Gardenal® 50 mg e 100 mg comprimidos; Solução Oral 40 mg/mL (40 gotas/mL = 1 mg/gota) — Pharlab (confirmar disponibilidade ativa pós-transferência de titularidade em 07/2026)',
      'Carbital® 100 mg comprimidos e Carbital® 200 mg/mL injetável — Teuto (NÃO presumir equivalência de volume com Fenocris® 100 mg/mL)',
      'Fenobarbital Genérico 100 mg comprimidos e Solução Oral 40 mg/mL (uso humano extrabula; sem marca veterinária registrada no MAPA regularmente confirmada no Brasil)',
    ],
    officialSiteUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    leafletUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/phenobarbital/PNG',
    pharmacologicClass:
      'Anticonvulsivante barbitúrico de longa ação • Modulador alostérico positivo do receptor GABA-A (canal de Cl⁻)',
    species: ['dog', 'cat'],
    category: 'neurologia',
    tags: [
      'fenobarbital',
      'phenobarbital',
      'phenobarbitone',
      'Gardenal',
      'Fenocris',
      'Carbital',
      'barbitúrico',
      'epilepsia',
      'epilepsia idiopática',
      'epilepsia estrutural',
      'convulsão',
      'status epilepticus',
      'crises em cluster',
      'GABA-A',
      'carga anticonvulsivante',
      'antiepiléptico',
      'monitorização sérica',
      'TDM',
      'autoindução',
      'hepatotoxicidade',
      'fosfatase alcalina',
      'refratariedade',
      'sialadenose',
      'Lista B1 adendo 2 vias',
      'RDC 1023/2026',
    ],

    plainLanguageSummary:
      'Anticonvulsivante barbitúrico de longa ação, primeira linha na manutenção crônica da epilepsia em cães e gatos e segunda linha parenteral no status epilepticus (após benzodiazepínicos). Atua prolongando a abertura do canal de Cl⁻ no receptor GABA-A em sítio distinto dos benzodiazepínicos — elevando o limiar convulsivo e contendo a propagação das crises, sem produzir efeito analgésico.\n\n' +
      '- Manutenção e TDM: administrar VO rigorosamente a cada 12 horas (cães 2,5–3 mg/kg; gatos 1,5–3 mg/kg), atingindo equilíbrio em ~10–14 dias. Dosar nível sérico em vale em tubo sem gel separador aos 14 dias, 6 semanas (autoindução canina) e a cada 6 meses (alvo 15–35 µg/mL em cães; 23–30 µg/mL em gatos), sempre integrado ao diário de crises.\n' +
      '- Emergência IV: infundir lentamente (≤ 1–2 mg/kg/min), aguardar 20 min entre incrementos e conferir sal vs. base (Fenocris® 100 mg/mL sal sódico = 91,35 mg/mL base; Carbital® 200 mg/mL). Via SC é proibida.\n' +
      '- Fígado (cão ≠ gato): em cães, FA elevada isolada geralmente traduz indução enzimática benigna (não suspender sem checar ácidos biliares, albumina, bilirrubina e US); em gatos não ocorre indução típica — toda elevação de ALT ou FA exige investigação.\n' +
      '- Retirada e receita: nunca suspender abruptamente (risco de status epilepticus fatal; fazer desmame gradual). No Brasil, prescrever em Receita de Controle Especial em 2 vias (Lista B1 com adendo — RDC ANVISA nº 1.023/2026).',

    mechanismOfAction:
      'Derivado do ácido barbitúrico (ácido 5-etil-5-fenilbarbitúrico; C₁₂H₁₂N₂O₃; massa molecular 232,24 g/mol na forma base e 254,22 g/mol no sal sódico anidro; ácido fraco com pKa ≈ 7,3–7,41). Possui núcleo barbitúrico substituído no carbono 5 por um grupo etil e um grupo fenil, conferindo lipossolubilidade moderada (inferior à de barbitúricos anestésicos ultracurtos como o tiopental) e ação anticonvulsivante sustentada.\n\n' +
      'Atua predominantemente como modulador alostérico positivo dos receptores GABA-A pentaméricos neuronais, ligando-se a um sítio alostérico distinto tanto do sítio do próprio GABA quanto do sítio clássico dos benzodiazepínicos. Enquanto os benzodiazepínicos aumentam sobretudo a frequência dos eventos de abertura do canal de cloreto, os barbitúricos prolongam principalmente a duração da abertura do canal, amplificando a condutância inibitória (hiperpolarização e inibição por derivação elétrica / shunting inhibition), elevando o limiar funcional de disparo e impedindo a sincronização e a propagação transináptica das descargas paroxísticas.\n\n' +
      'Em concentrações elevadas, produz facilitação intensa e ativação direta do receptor GABA-A independente de GABA, explicando sua menor margem de segurança em doses anestésicas ou tóxicas (nas quais a parada respiratória ocorre em exposições cerca de quatro vezes inferiores às de parada cardíaca). Ações secundárias descritas experimentalmente incluem inibição funcional de receptores glutamatérgicos AMPA e modulação da entrada pré-sináptica de cálcio (reduzindo liberação de neurotransmissores excitatórios), sem que o fenobarbital se comporte clinicamente como antagonista seletivo de AMPA. Durante o status epilepticus prolongado, quando receptores GABA-A sinápticos sensíveis a benzodiazepínicos sofrem internalização e a transmissão glutamatérgica (NMDA/AMPA) se intensifica, sua ligação a sítio distinto mantém utilidade clínica como anticonvulsivante de segunda linha. Não exerce atividade analgésica intrínseca clinicamente relevante.',

    indications: [
      'Epilepsia idiopática canina — anticonvulsivante de manutenção de primeira linha (consensos IVETF 2015 e ACVIM 2016).',
      'Epilepsia felina (idiopática ou estrutural) — principal opção de manutenção de primeira linha em gatos sob vigilância clínica, hepática e hematológica.',
      'Status epilepticus em cães (recomendação grau A) e gatos (recomendação grau B) — terapia parenteral de segunda linha após benzodiazepínicos (consenso ACVIM 2024).',
      'Crises epilépticas em agrupamento (cluster seizures) hospitalares — estabelecimento rápido de exposição anticonvulsivante sustentada e prevenção de recorrências.',
      'Epilepsia estrutural secundária a lesões encefálicas — controle sintomático das crises sem corrigir a doença primária.',
      'Sialadenose canina responsiva a fenobarbital — indicação secundária de evidência limitada (relatos e séries pequenas) após exclusão de causas primárias.',
    ],

    contraindications: [
      'Hipersensibilidade comprovada a barbitúricos ou histórico prévio de síndrome de hipersensibilidade anticonvulsivante, pseudolinfoma ou discrasia sanguínea grave induzida pelo fármaco.',
      'Insuficiência hepática grave, cirrose avançada ou encefalopatia hepática (comprometimento do metabolismo e risco de coma prolongado e agravamento parenquimatoso).',
      'Depressão respiratória grave sem suporte ventilatório imediato disponível (risco iminente de apneia e falência ventilatória, especialmente por via IV).',
      'Porfiria (barbitúricos induzem enzimas da biossíntese do heme e podem precipitar crises agudas).',
      'Crises reativas por intoxicação por avermectinas/milbemicinas (ivermectina, moxidectina), mediadas por abertura excessiva de canais de cloreto — barbitúricos agravam a depressão neurológica.',
      'Crises metabólicas reversíveis (hipoglicemia, hipocalcemia, encefalopatia hepática/shunt portossistêmico) como substituto da correção da causa de base.',
      'Via subcutânea (SC): formalmente proscrita pelo pH alcalino (8,5–10,5) da solução de fenobarbital sódico, que causa inflamação grave e necrose tecidual.',
      'Suspensão abrupta em pacientes sob manutenção crônica: risco imediato de crises de rebote, clusters e status epilepticus potencialmente fatal.',
    ],

    cautions: [
      'Não suspender abruptamente: qualquer retirada deve ser gradual ao longo de semanas ou meses sob supervisão clínica e eventual cobertura substituta.',
      'Não titular exclusivamente por mg/kg: em estudo real-world (Despa et al., 2026), não houve correlação linear entre dose em mg/kg/dia e nível sérico; decisões exigem integrar diário de crises, tolerabilidade e TDM.',
      'Diferenciar indução enzimática benigna de hepatotoxicidade verdadeira em cães (FA alta isolada sem alteração de ácidos biliares, albumina persistente, AST ou bilirrubina não indica suspensão); em gatos, porém, NÃO há indução enzimática típica — toda elevação de ALT ou FA exige investigação ativa.',
      'Coletar TDM em tubo SEM gel separador (a matriz de silicone adsorve fenobarbital e gera valores falsamente baixos) e observar jejum/controle de lipemia (7% de falha analítica em cães dislipidêmicos — Despa et al., 2026).',
      'Conferir equivalência química sal sódico vs. base na emergência IV: Fenocris® contém 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL de fenobarbital base); Carbital® injetável possui 200 mg/mL — nunca trocar ampolas sem recalcular.',
      'Na carga IV em status epilepticus, respeitar velocidade máxima veterinária de 1–2 mg/kg/min (jamais aplicar o teto humano de 60 mg/min em cães pequenos/gatos) e aguardar 20 minutos entre incrementos antes de repetir.',
      'Gatos apresentam sensibilidade acentuada à depressão respiratória barbitúrica, aos excipientes (propilenoglicol em exposições elevadas) e a reações imunomediadas precoces (prurido facial, edema distal, febre, citopenias, pseudolinfoma).',
      'Ao desmamar o fenobarbital, lembrar da desindução enzimática progressiva (até 4 semanas): concentrações séricas de fármacos associados (outros anticonvulsivantes, ciclosporina, corticoides) podem subir mesmo sem mudança de dose.',
    ],

    adverseEffects: [
      'Neurológicos frequentes e geralmente transitórios (1–2 semanas): sedação, sonolência e ataxia postural; menos frequentemente, excitação paradoxal, ansiedade ou irritabilidade (inclusive em níveis baixos).',
      'Comportamentais e metabólicos persistentes em cães: polifagia com ganho ponderal/obesidade, polidipsia e poliúria (sempre descartar DM, Cushing, DRC, pielonefrite e hipercalcemia) e hipertrigliceridemia.',
      'Hepáticos: indução enzimática benigna muito frequente em cães (~36% com FA elevada sem lesão estrutural); hepatotoxicidade verdadeira dose- e tempo-dependente (> 1 ano ou > 35–40 µg/mL) cursando com fibrose portal em ponte, regeneração nodular, queda persistente de albumina, ácidos biliares altos, hiperbilirrubinemia e sinais clínicos. Em gatos, ausência de indução típica (ALT/FA elevadas exigem investigação).',
      'Hematológicos idiossincráticos raros (~4,2% de alterações hematológicas nos primeiros 3 meses em estudo canino): neutropenia, trombocitopenia, anemia não regenerativa ou pancitopenia reversíveis após substituição; coagulopatias felinas descritas em doses muito elevadas (10–40 mg/kg/dia).',
      'Cutâneos e imunológicos raros: dermatite necrolítica superficial (SND) e síndrome de Stevens-Johnson em cães; prurido facial, edema distal de membros, febre, pseudolinfoma e síndrome de hipersensibilidade anticonvulsivante precoce em gatos.',
      'Cardiorrespiratórios agudos (principalmente IV rápida ou superdosagem): hipoventilação, apneia, hipotensão, depressão miocárdica, hipotermia, estupor/coma e midríase em gatos intoxicados.',
      'Interferências endócrinas e laboratoriais: redução de T4 total e T4 livre com TSH variável em cães eutireoideus (não suplementar levotiroxina sem clínica); possível aceleração do metabolismo da dexametasona no LDDST; elevação de triglicerídeos e lipase sem significar pancreatite isoladamente.',
    ],

    interactions: [
      'Benzodiazepínicos (diazepam, midazolam), propofol, anestésicos gerais e opioides: depressão respiratória, sedação profunda e hipotensão aditivas em uso parenteral/anestésico; cronicamente, acelera a depuração de benzodiazepínicos.',
      'Levetiracetam: fenobarbital crônico acelera a depuração do levetiracetam de liberação imediata em cães, reduzindo sua meia-vida em ~35–50% e podendo exigir ajustes de dose/intervalo.',
      'Brometo de potássio: sinergismo anticonvulsivante benéfico em cães (~1/3 permite reduzir níveis de fenobarbital em ~33%), porém soma sedação e ataxia; brometo é CONTRAINDICADO em gatos (pneumonite alérgica em 35–42%).',
      'Zonisamida, corticosteroides, ciclosporina, doxiciclina, teofilina/aminofilina, metronidazol e propranolol: indução microssomal hepática reduz a exposição plasmática e pode causar falha terapêutica (e risco inverso de toxicidade durante a desindução pós-retirada).',
      'Cloranfenicol, cimetidina e antifúngicos azólicos (cetoconazol, itraconazol, fluconazol): inibição enzimática eleva a concentração sérica de fenobarbital; com azólicos há interação bidirecional com perda potencial de eficácia antifúngica.',
      'Levotiroxina / eixo tireoidiano: aumenta depuração periférica de hormônios tireoidianos, reduzindo T4 total e T4 livre e exigindo interpretação clínica cuidadosa.',
      'Carprofeno e fármacos potencialmente hepatotóxicos: cautela por potencial somação de risco hepático em uso crônico.',
      'Incompatibilidade físico-química em seringa/linha IV: NÃO misturar fenobarbital sódico com diazepam, midazolam, buprenorfina, cetamina, fentanil, morfina, meperidina, noradrenalina, dobutamina, insulina, ciclosporina ou soluções ácidas.',
    ],

    routes: [
      'Via Oral (VO) — via principal para terapia de manutenção crônica em cães e gatos',
      'Via Intravenosa lenta (IV — máx. 1–2 mg/kg/min) — emergências hospitalares (status epilepticus e clusters)',
      'Via Intramuscular (IM) — alternativa hospitalar selecionada quando não há acesso IV (dolorosa; absorção menos previsível no choque)',
    ],

    administration: [
      'Via oral (manutenção): administrar rigorosamente a cada 12 horas em horários fixos, com ou sem alimento (manter rotina consistente; oferecer com pequena refeição se houver náusea). Em caso de esquecimento isolado, administrar assim que lembrado e retomar o horário regular sem dobrar a dose seguinte.',
      'Para cães < 10–12 kg e gatos: preferir solução oral 40 mg/mL aspirada em seringa oral graduada (evitar cortar comprimidos de 50 ou 100 mg em frações mínimas ou tentar administrar meia gota). Na solução comercial calibrada a 40 gotas/mL (Fenocris®/Gardenal®), 1 gota = 1 mg — conferir sempre o gotejador original.',
      'Administração por sonda enteral: avaliar risco de obstrução ao triturar comprimidos convencionais; a solução oral 40 mg/mL facilita sondas finas quando compatível com os excipientes (álcool etílico/propilenoglicol). Não preparar suspensões improvisadas sem concentração e estabilidade conhecidas.',
      'Via intravenosa (emergência): confirmar acesso venoso pérvio (pH 8,5–10,5 — risco de necrose no extravasamento), verificar se a dose está em fenobarbital base (Fenocris® = 91,35 mg/mL base) ou sal sódico (100 mg/mL sal), infundir ≤ 1–2 mg/kg/min (NÃO usar teto humano de 60 mg/min) e aguardar 20 minutos entre incrementos.',
      'NUNCA administrar por via subcutânea e NUNCA misturar na mesma seringa com diazepam, midazolam ou soluções ácidas; lavar o acesso com SF 0,9% antes e depois.',
      'Amostras para TDM: padronizar coleta em vale (imediatamente antes da dose seguinte), utilizar tubo SEM gel separador (silicone adsorve o fármaco) e manter jejum quando possível para evitar falha analítica por lipemia.',
    ],

    quickIndications: [
      {
        condition: 'Epilepsia idiopática canina — Manutenção de 1ª linha',
        species: 'dog',
        doseSummary: '2,5 a 3 mg/kg VO a cada 12 horas (q12h)',
        route: 'VO',
        duration: 'Contínuo/vitalício; TDM aos 14 d, 6 sem e q6m (alvo 15–35 µg/mL)',
        clinicalContext:
          'Primeira linha pelos consensos IVETF (2015) e ACVIM (2016) quando há ≥ 2 crises em ~6 meses, clusters, status ou agravamento. Doses em mg/kg por administração; cães < 10–12 kg beneficiam-se da solução oral 40 mg/mL em seringa graduada.',
      },
      {
        condition: 'Epilepsia felina (idiopática ou estrutural) — Manutenção de 1ª linha',
        species: 'cat',
        doseSummary: '1,5 a 3 mg/kg VO a cada 12 horas (q12h)',
        route: 'VO',
        duration: 'Contínuo sob TDM aos 10–15 d e q6m (alvo conservador 23–30 µg/mL)',
        clinicalContext:
          'Primeira escolha em felinos (faixa alternativa 1–3 mg/kg q12h). Descartar causas estruturais/metabólicas antes; controle retrospectivo descrito entre 15–45 µg/mL (Finnerty et al., 2014). Gatos não fazem indução enzimática hepática típica.',
      },
      {
        condition: 'Status epilepticus — Cães virgens de tratamento (2ª linha ACVIM 2024)',
        species: 'dog',
        doseSummary: '4 a 8 mg/kg IV lenta (incrementos de 4 mg/kg q20–30 min até carga máx. 20–24 mg/kg)',
        route: 'IV lenta (≤ 1–2 mg/kg/min)',
        duration: 'Emergência hospitalar após benzodiazepínico inicial (Grau A ACVIM 2024)',
        clinicalContext:
          'Aguardar 20 min entre incrementos (pico no SNC em 15–20 min). Esquema alternativo: 12 mg/kg IV + duas doses de 4–6 mg/kg q20 min (nunca somar protocolos). Conferir Fenocris® 91,35 mg/mL base vs. 100 mg/mL sal sódico.',
      },
      {
        condition: 'Status epilepticus / clusters — Cães JÁ em uso crônico (suplementação)',
        species: 'dog',
        doseSummary: '4 a 6 mg/kg IV lenta ou IM (após coleta prévia de TDM)',
        route: 'IV lenta ou IM',
        duration: 'Dose hospitalar pontual de reforço (não aplicar carga cheia de paciente virgem)',
        clinicalContext:
          'Colher sangue em tubo sem gel para TDM ANTES da suplementação. Se o nível sérico prévio já estiver próximo do limite superior, associar precocemente anticonvulsivante de outro mecanismo (ex.: levetiracetam IV).',
      },
      {
        condition: 'Status epilepticus — Gatos (2ª linha ACVIM 2024)',
        species: 'cat',
        doseSummary: '3 a 4 mg/kg IV lenta q20 min (até carga máx. 18–24 mg/kg em 24 h)',
        route: 'IV lenta (≤ 1–2 mg/kg/min)',
        duration: 'Emergência hospitalar sob monitorização ventilatória intensiva (Grau B ACVIM 2024)',
        clinicalContext:
          'Alta sensibilidade felina à depressão respiratória barbitúrica e ao propilenoglicol — não extrapolar tetos caninos automaticamente. Reavaliar reflexo de deglutição e ventilação antes de cada incremento acima de 8 mg/kg.',
      },
      {
        condition: 'Crises em agrupamento (cluster seizures) hospitalares',
        species: 'both',
        doseSummary: '4 a 8 mg/kg (cães) ou 3 a 4 mg/kg (gatos) IV lenta fracionada',
        route: 'IV lenta (transição para VO q12h)',
        duration: 'Estabelecimento rápido de nível protetor + plano de resgate associado',
        clinicalContext:
          '≥ 2 crises em 24 h com recuperação da consciência entre episódios. A carga não elimina a necessidade de plano de resgate nem de investigação de status não convulsivo se houver depressão persistente da consciência.',
      },
      {
        condition: 'Sialadenose canina responsiva a fenobarbital (evidência limitada)',
        species: 'dog',
        doseSummary: '1 a 2,5 mg/kg VO a cada 12 horas (q12h)',
        route: 'VO',
        duration: 'Teste terapêutico individualizado após exclusão de afecções primárias',
        clinicalContext:
          'Indicação secundária baseada em relatos e séries pequenas para hipersalivação, ânsia e aumento bilateral não inflamatório das glândulas salivares mandibulares; iniciar na extremidade inferior (1 mg/kg q12h).',
      },
    ],

    detailedIndications: [
      {
        id: 'ind-feno-dog-epilepsy',
        indication: 'Epilepsia idiopática e estrutural canina — Manutenção de primeira linha',
        clinicalContext:
          '• Critérios de início (IVETF 2015 / ACVIM 2016): Não é obrigatório iniciar após uma primeira crise isolada. Indicar tratamento crônico diante de ≥ 2 crises em aproximadamente 6 meses, episódios prolongados, crises em agrupamento (clusters), status epilepticus, fase pós-ictal severa, progressão da frequência/gravidade ou lesão encefálica estrutural.\n\n' +
          '• Diagnóstico de exclusão obrigatório: Epilepsia idiopática é diagnóstico clínico de exclusão — não basta observar convulsões com hemograma normal. Diferenciar de síncopes cardiovasculares, discinesias paroxísticas, tremores, distúrbios vestibulares/comportamentais e crises reativas (hipoglicemia, hipocalcemia, encefalopatia hepática, intoxicações).',
        species: 'dog',
        dose: '2,5–3 mg/kg por administração (não dose diária total)',
        route: 'VO',
        frequency: 'a cada 12 horas (q12h) em horários fixos',
        duration: 'Prolongada ou vitalícia; eventual desmame somente gradual após remissão sustentada',
        mechanismOfAction:
          '• Potencialização GABA-A prolongada: Liga-se ao sítio alostérico barbitúrico do receptor GABA-A, prolongando a duração da abertura do canal de Cl⁻ e amplificando a hiperpolarização e a inibição por derivação elétrica (shunting inhibition).\n\n' +
          '• Contenção da propagação cortical: Eleva o limiar funcional de disparo neuronal e dificulta que focos epileptogênicos se sincronizem e se propaguem por grandes redes cerebrais, tanto em crises focais quanto generalizadas.',
        clinicalRationale:
          '• Por que iniciar em 2,5–3 mg/kg q12h: A faixa europeia antiga (1–2,5 mg/kg q12h) atingia a janela terapêutica em apenas ~40% dos cães; iniciar em 2,5–3 mg/kg q12h alcança exposição eficaz mais previsível. Na epilepsia estrutural, controla crises sintomaticamente sem corrigir a lesão primária.\n\n' +
          '• Evidência consolidada: Na meta-análise do consenso ACVIM (2016; 311 cães em 8 estudos de monoterapia), obteve redução ≥ 50% das crises em 82% (258/311) e remissão total em 31% (93/311). No ensaio randomizado duplo-cego de Boothe et al. (2012), superou o brometo (85% vs. 52% sem novas crises, com nível médio 25 ± 6 µg/mL).\n\n' +
          '• Regra de ouro da titulação: Não aumentar a dose apenas porque o TDM ficou discretamente abaixo de 15 µg/mL se o cão estiver clinicamente controlado; em cães < 10–12 kg, preferir solução oral 40 mg/mL medida em seringa graduada.',
        monitoring:
          'Diário de crises; TDM em tubo sem gel aos 14 dias, 6 semanas (autoindução) e a cada 6 meses (alvo 15–35 µg/mL); hemograma, FA, ALT, AST, GGT, albumina, bilirrubina e ácidos biliares quando indicados.',
        referenceIds: ['ref-ivetf-2015', 'ref-acvim-seizure-2016', 'ref-boothe-2012', 'ref-charalambous-2014', 'ref-despa-2026'],
        evidenceLevel: 'Forte (Consensos IVETF/ACVIM, RCTs e revisão sistemática de 1.153 cães)',
        highlights: ['Primeira linha canina', '2,5–3 mg/kg q12h', 'Recoleta em 6 semanas (autoindução)', 'Não suspender por FA isolada'],
      },
      {
        id: 'ind-feno-cat-epilepsy',
        indication: 'Epilepsia felina (idiopática ou estrutural) — Manutenção de primeira linha',
        clinicalContext:
          '• Investigação etiológica rigorosa em felinos: Em gatos, crises recorrentes possuem elevada proporção de causas estruturais, inflamatórias/infecciosas (ex.: PIF, toxoplasmose), vasculares ou metabólicas (hipoglicemia, encefalopatia hepática). Nunca substituir a correção da doença de base por sedação anticonvulsivante prolongada.\n\n' +
          '• Vantagem comparativa na espécie: É uma das principais escolhas de manutenção felina, sobretudo porque o brometo de potássio é contraindicado em gatos devido à pneumonite alérgica eosinofílica grave (35–42% dos gatos tratados).',
        species: 'cat',
        dose: '1,5–3 mg/kg (faixa alternativa 1–3 mg/kg) por administração',
        route: 'VO',
        frequency: 'a cada 12 horas (q12h)',
        duration: 'Prolongada ou vitalícia sob vigilância clínica, hematológica e dermatológica',
        mechanismOfAction:
          '• Modulação GABA-A sustentada com meia-vida de 34–56 h (média ~43 h): Mantém concentrações estáveis em regime q12h com steady state em ~9–15 dias.\n\n' +
          '• Metabolismo hepático distinto do cão: Gatos NÃO desenvolvem a autoindução enzimática hepática típica observada em cães (Hermans et al., 2022), preservando enzimas basais na maioria dos pacientes.',
        clinicalRationale:
          '• Eficácia clínica documentada: Na série retrospectiva de Finnerty et al. (2014; n = 30 gatos), 93% (28/30) alcançaram controle das crises e 43% (13/30) permaneceram completamente livres de crises em concentrações séricas entre 15 e 45 µg/mL.\n\n' +
          '• Alvo sérico conservador e vigilância hepática: Recomenda-se trabalhar no alvo conservador de 23–30 µg/mL (30 µg/mL não é intoxicação automática, mas níveis > 30 µg/mL associaram-se a elevações de ALT em 3 gatos no estudo de Hermans et al., 2022). Qualquer aumento de ALT ou FA em gatos exige investigação ativa.\n\n' +
          '• Atenção a reações idiossincráticas precoces: Vigiar prurido facial, edema distal de membros, febre, linfadenomegalia, pseudolinfoma e citopenias nas primeiras semanas; preferir solução oral 40 mg/mL em seringa graduada ou cápsulas manipuladas para precisão.',
        monitoring:
          'Diário de crises; TDM em 10–15 dias e semestralmente (alvo conservador 23–30 µg/mL); hemograma, ALT/FA (nunca assumir indução benigna) e inspeção cutânea/facial precoce.',
        referenceIds: ['ref-finnerty-2014', 'ref-hermans-2022', 'ref-bsava-10', 'ref-plumb-10', 'ref-ettinger-9e'],
        evidenceLevel: 'Moderada (séries retrospectivas felinas consistentes e consensos clínicos)',
        highlights: ['Alvo conservador 23–30 µg/mL', 'Sem indução hepática típica', 'Brometo contraindicado em gatos', 'Vigiar hipersensibilidade precoce'],
      },
      {
        id: 'ind-feno-dog-se-naive',
        indication: 'Status epilepticus em cães virgens de tratamento — 2ª linha parenteral (ACVIM 2024)',
        clinicalContext:
          '• Definição de emergência: Crise convulsiva contínua ≥ 5 minutos ou crises sucessivas sem recuperação adequada da consciência entre episódios. Benzodiazepínicos (midazolam/diazepam) permanecem como primeira linha imediata; fenobarbital IV é segunda linha de consolidação (recomendação Grau A em cães no consenso ACVIM 2024).\n\n' +
          '• Por que não administrar toda a carga rapidamente: A concentração plasmática sobe imediatamente, mas a penetração completa no SNC leva 15–20 minutos. Repetir bolus sem aguardar o equilíbrio central gera empilhamento plasmático com apneia, sedação profunda e colapso cardiovascular.',
        species: 'dog',
        dose: '4–8 mg/kg IV lenta inicial + incrementos de 4 mg/kg q20–30 min até carga máx. 20–24 mg/kg',
        route: 'IV lenta (≤ 1–2 mg/kg/min) em acesso pérvio exclusivo',
        frequency: 'Fracionada a cada 20–30 min conforme resposta clínica e ventilatória',
        duration: 'Fase aguda hospitalar com transição para manutenção VO assim que estável e com deglutição segura',
        mechanismOfAction:
          '• Superação da refratariedade precoce aos benzodiazepínicos: No status epilepticus prolongado, receptores GABA-A sinápticos sensíveis a benzodiazepínicos sofrem internalização enquanto receptores glutamatérgicos NMDA/AMPA se intensificam. Como o fenobarbital interage com sítio alostérico distinto no receptor GABA-A, conserva eficácia anticonvulsivante sustentada.\n\n' +
          '• Limite de refratariedade: Não interrompe todos os quadros refratários; se as crises persistirem apesar da carga, escalonar precocemente para politerapia (levetiracetam, cetamina, propofol/infusões anestésicas).',
        clinicalRationale:
          '• Protocolos alternativos (NUNCA somar): Além do esquema fracionado de 4–8 mg/kg seguidos de 4 mg/kg q20–30 min (teto 20–24 mg/kg), formulários europeus descrevem esquema alternativo de 12 mg/kg IV lenta inicial seguidos de duas doses de 4–6 mg/kg separadas por 20 min (total 18–24 mg/kg). São alternativas distintas que jamais devem ser somadas.\n\n' +
          '• Conferência obrigatória de sal vs. base e velocidade: Respeitar velocidade máxima veterinária de 1–2 mg/kg/min (ex.: cão de 10 kg recebendo 40 mg → ≥ 4 min; NÃO usar o limite humano de 60 mg/min). Fenocris® contém 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL base; 40 mg base = 0,438 mL) e Carbital® possui 200 mg/mL.\n\n' +
          '• Atenção ao status não convulsivo: A cessação dos movimentos motores não garante interrupção da atividade elétrica cerebral; se a consciência permanecer deprimida de forma desproporcional, suspeitar de status epilepticus não convulsivo.',
        monitoring:
          'FR, padrão respiratório, SpO₂, EtCO₂, ECG, PA, temperatura, glicemia, eletrólitos, nível de consciência e vigilância para status não convulsivo.',
        referenceIds: ['ref-acvim-se-2024', 'ref-plumb-10', 'ref-bsava-10', 'ref-anvisa-fenocris-2026'],
        evidenceLevel: 'Consenso Internacional ACVIM 2024 — Recomendação Grau A em cães',
        highlights: ['Grau A ACVIM 2024', '≤ 1–2 mg/kg/min', 'Aguardar 20 min entre bolus', 'Fenocris® 91,35 mg/mL base'],
      },
      {
        id: 'ind-feno-dog-se-chronic',
        indication: 'Status epilepticus ou clusters em cães JÁ em uso crônico — Suplementação emergencial',
        clinicalContext:
          '• Cenário clínico: Cão já tratado diariamente com fenobarbital VO que dá entrada em emergência por status epilepticus ou crises em agrupamento. Aplicar uma carga completa de paciente virgem (18–24 mg/kg) nesse animal gera risco elevado de superdosagem, coma e parada respiratória.\n\n' +
          '• Coleta prévia obrigatória: Antes de administrar a dose de reforço, colher amostra de sangue em tubo seco SEM gel separador para determinar o nível sérico basal e descobrir se a descompensação decorreu de nível subterapêutico (adesão/autoindução) ou refratariedade farmacodinâmica.',
        species: 'dog',
        dose: '4–6 mg/kg (suplementação pontual)',
        route: 'IV lenta (≤ 1–2 mg/kg/min) ou IM profunda se sem acesso IV',
        frequency: 'Dose emergencial única/pontual após coleta de TDM',
        duration: 'Intervenção hospitalar pontual seguida de ajuste guiado pelo resultado do TDM',
        mechanismOfAction:
          '• Elevação controlada do patamar sérico: Acrescenta ~5–8 µg/mL à concentração plasmática estimada (Vd ~0,75 L/kg), resgatando pacientes com exposição limítrofe sem ultrapassar abruptamente o limiar de depressão bulbar.',
        clinicalRationale:
          '• Conduta estratificada: Se o cão já apresentava sedação importante ou se o histórico sugere concentração prévia > 30 µg/mL, priorizar associação precoce com levetiracetam IV (mecanismo SV2A sem somação barbitúrica) em vez de insistir em incrementos de fenobarbital.\n\n' +
          '• Via IM como contingência: Só utilizar via IM se o acesso IV for impossível, ciente da dor local intensa e da absorção errática em pacientes hipotensos/chocados; jamais utilizar via SC.',
        monitoring:
          'TDM colhido antes da dose, ventilação (FR, SpO₂, EtCO₂), grau de sedação, PA e recorrência de crises.',
        referenceIds: ['ref-acvim-se-2024', 'ref-bsava-10', 'ref-plumb-10'],
        evidenceLevel: 'Consenso de emergência neurológica e formulários veterinários internacionais',
        highlights: ['Colher TDM ANTES da dose', 'Nunca dar carga cheia em uso crônico', 'Considerar levetiracetam IV precoce'],
      },
      {
        id: 'ind-feno-cat-se',
        indication: 'Status epilepticus em gatos — 2ª linha parenteral (ACVIM 2024)',
        clinicalContext:
          '• Vulnerabilidade felina acentuada: Gatos são particularmente sensíveis à depressão do centro respiratório bulbar induzida por barbitúricos, especialmente quando receberam benzodiazepínicos, anestésicos ou opioides, além de apresentarem menor tolerância a veículos contendo propilenoglicol em exposições elevadas.\n\n' +
          '• Recomendação de consenso: Segunda linha parenteral após benzodiazepínico inicial com recomendação Grau B no consenso ACVIM (2024), dado o menor volume de estudos prospectivos felinos.',
        species: 'cat',
        dose: '3–4 mg/kg IV lenta em incrementos q20 min (teto cumulativo 18–24 mg/kg em 24 h)',
        route: 'IV lenta (≤ 1–2 mg/kg/min)',
        frequency: 'Incrementos a cada 20 minutos conforme resposta clínica e padrão ventilatório',
        duration: 'Emergência hospitalar sob oxigenoterapia e suporte ventilatório pronto',
        mechanismOfAction:
          '• Ação GABA-A alostérica sustentada em sítio distinto dos benzodiazepínicos, com volume de distribuição felino de ~0,70 L/kg e equilíbrio no SNC em 15–20 minutos.',
        clinicalRationale:
          '• Fracionamento conservador obrigatório: Embora a literatura também mencione bolus lento de 10 mg/kg em cenários selecionados, o fracionamento em alíquotas de 3–4 mg/kg a cada 20 min permite interromper a carga ao menor sinal de hipoventilação ou hipotensão. Jamais extrapolar automaticamente tetos caninos para felinos.\n\n' +
          '• Ponto de checagem acima de 8 mg/kg: Em gatos com doença intracraniana estrutural e quebra da barreira hematoencefálica, a sedação pode ser desproporcional; reavaliar reflexo de tosse/deglutição, SpO₂ e EtCO₂ antes de cada dose adicional e manter material de intubação imediatamente acessível.',
        monitoring:
          'Monitorização ventilatória contínua (FR, amplitude, SpO₂, EtCO₂), PA, temperatura, glicemia, consciência e preparo para intubação endotraqueal.',
        referenceIds: ['ref-acvim-se-2024', 'ref-plumb-10', 'ref-bsava-10'],
        evidenceLevel: 'Consenso Internacional ACVIM 2024 — Recomendação Grau B em gatos',
        highlights: ['Grau B ACVIM 2024', '3–4 mg/kg IV lenta q20 min', 'Alta sensibilidade respiratória felina', 'Checar reflexos > 8 mg/kg'],
      },
      {
        id: 'ind-feno-clusters',
        indication: 'Crises epilépticas em agrupamento (cluster seizures) hospitalares — Cães e gatos',
        clinicalContext:
          '• Definição operacional: Ocorrência de duas ou mais crises epilépticas em um período de 24 horas, com recuperação da consciência entre os episódios.\n\n' +
          '• Papel da carga hospitalar: Em pacientes virgens de tratamento com indicação de terapia crônica, a carga controlada de fenobarbital estabelece rapidamente exposição sérica protetora sem esperar 10–14 dias pelo steady state oral.',
        species: 'both',
        dose: 'Cães: 4–8 mg/kg IV lenta (até 18–24 mg/kg fracionados) | Gatos: 3–4 mg/kg IV lenta q20 min (até 18–24 mg/kg/24 h)',
        route: 'IV lenta (transição para manutenção VO q12h)',
        frequency: 'Fracionada q20–30 min até controle clínico estável, seguida de manutenção VO q12h',
        duration: 'Internação até ≥ 24 h sem novas crises e deglutição preservada',
        mechanismOfAction:
          '• Quebra do ciclo de hiperexcitabilidade recorrente ao elevar rapidamente a inibição GABAérgica sustentada e o limiar convulsivo pós-ictal.',
        clinicalRationale:
          '• A carga não dispensa plano de resgate: Mesmo após carga adequada, o paciente deve manter plano escrito de resgate (benzodiazepínico IV/IN e, frequentemente, pulsoterapia com levetiracetam em cães) e investigação de gatilhos metabólicos, infecciosos ou estruturais.\n\n' +
          '• Monitorização integral: Acompanhar temperatura (risco de hipertermia pós-ictal ou hipotermia por sedação), glicemia, eletrólitos, PA e estado mental para descartar status não convulsivo.',
        monitoring:
          'Frequência de crises, temperatura retal, glicemia, eletrólitos, padrão respiratório, consciência e TDM após estabilização.',
        referenceIds: ['ref-acvim-se-2024', 'ref-ivetf-2015', 'ref-plumb-10'],
        evidenceLevel: 'Consenso ACVIM 2024 e prática consolidada em neurologia de emergência',
        highlights: ['≥ 2 crises em 24 h', 'Estabelece proteção sem esperar 14 dias', 'Manter plano de resgate associado'],
      },
      {
        id: 'ind-feno-dog-rapid-clearance',
        indication: 'Epilepsia canina com depuração ultrarrápida comprovada — Regime q8h individualizado',
        clinicalContext:
          '• Não é primeira escolha: A maioria dos cães mantém níveis estáveis em q12h graças à meia-vida média de ~53 h. Contudo, em uma subpopulação canina com autoindução intensa ou variação genética/dietética, a meia-vida terminal pode cair abaixo de 24 h (chegando a ~12–24 h).\n\n' +
          '• Critério de indicação: Somente quando TDM seriado (incluindo comparação pico/vale em doses ≥ 5 mg/kg q12h) comprovar queda acentuada entre doses com escape de crises antes da próxima tomada, apesar de adesão rigorosa confirmada.',
        species: 'dog',
        dose: '3–5,6 mg/kg VO (descrito na literatura para população selecionada sob TDM)',
        route: 'VO',
        frequency: 'a cada 8 horas (q8h)',
        duration: 'Individualizada com vigilância hepática e TDM rigorosos',
        mechanismOfAction:
          '• Redução da amplitude pico–vale: Encurtar o intervalo de 12 h para 8 h limita a queda da concentração sérica no final do intervalo sem precisar elevar ainda mais o pico de cada tomada.',
        clinicalRationale:
          '• Alerta contra escalonamento cego: O fato de a literatura descrever 3–5,6 mg/kg q8h em cães com meia-vida ultracurta NÃO autoriza prescrever doses altas a qualquer cão refratário. Na maioria dos casos refratários com níveis já em 30–35 µg/mL, associar brometo de potássio ou levetiracetam é muito mais seguro para o fígado do que forçar o fenobarbital.',
        monitoring:
          'TDM em vale e pico, perfil hepático completo (ácidos biliares, albumina, bilirrubina, ALT/FA/AST), hemograma e escore de sedação/ataxia.',
        referenceIds: ['ref-plumb-10', 'ref-ivetf-2015', 'ref-despa-2026'],
        evidenceLevel: 'Moderada/Individualizada (subpopulação farmacocinética específica)',
        highlights: ['Nunca como 1ª escolha', 'Exige TDM comprovando t½ < 24 h', 'Avaliar politerapia antes de forçar dose'],
      },
      {
        id: 'ind-feno-dog-sialadenosis-and-td-alert',
        indication: 'Sialadenose canina responsiva a fenobarbital & Alerta sobre via transdérmica felina',
        clinicalContext:
          '• Sialadenose canina: Caracterizada por aumento bilateral não inflamatório das glândulas salivares mandibulares, hipersalivação persistente, engasgos/ânsia de vômito e desconforto orofaríngeo após exclusão de esofagite, sialoadenite, corpo estranho e afecções digestivas primárias.\n\n' +
          '• Alerta sobre via transdérmica em gatos (9 mg/kg q12h em gel PLO auricular): Estudos experimentais demonstraram absorção altamente variável (ainda pior em Lipoderm®), atingindo alvo terapêutico apenas em parte dos felinos — NÃO deve ser tratada como equivalente à via oral de rotina.',
        species: 'both',
        dose: 'Sialadenose canina: 1–2,5 mg/kg VO q12h (iniciar em 1 mg/kg) | Transdérmica felina: experimental (9 mg/kg q12h PLO — não rotineira)',
        route: 'VO (sialadenose) | Transdérmica auricular apenas experimental/excepcional',
        frequency: 'a cada 12 horas (q12h)',
        duration: 'Individualizada conforme resposta clínica e reavaliação diagnóstica',
        mechanismOfAction:
          '• Na sialadenose, a fisiopatologia da resposta permanece parcialmente esclarecida, envolvendo possivelmente modulação central de fenômenos autonômicos ou paroxísticos (a melhora clínica não prova que toda sialadenose seja epilepsia).',
        clinicalRationale:
          '• Limite de evidência: A evidência em sialadenose restringe-se a relatos e séries pequenas — não utilizar como tratamento empírico antes de investigação clínica/esofágica adequada. Quanto à via transdérmica felina, reservar apenas a cenários excepcionais em que a administração oral é absolutamente inviável, sempre com TDM frequente e inspeção auricular.',
        monitoring:
          'Na sialadenose: regressão de sialorreia/volume glandular e sedação. Na via transdérmica excepcional: TDM frequente, inspeção de dermatite auricular e vigilância de crises.',
        referenceIds: ['ref-plumb-10'],
        evidenceLevel: 'Limitada/Experimental (relatos clínicos pequenos e estudos PK experimentais)',
        highlights: ['Sialadenose: iniciar em 1 mg/kg q12h', 'Evidência limitada', 'Transdérmica felina ≠ equivalente à VO'],
      },
    ],

    pillars: [
      {
        title: 'Inibição GABA-A Sustentada & 2ª Linha no Status',
        icon: 'Brain',
        desc: 'Prolonga a abertura do canal de Cl⁻ em sítio distinto dos benzodiazepínicos, mantendo eficácia na 2ª linha do status epilepticus (ACVIM 2024). Não possui efeito analgésico.',
      },
      {
        title: 'Meia-Vida Longa (~2 Dias) & Steady State',
        icon: 'Clock',
        desc: 'Meia-vida média de ~53 h (cães) e ~43 h (gatos) sustenta regimes q12h, exigindo ~10–14 dias para equilíbrio oral sem carga e 15–20 min para pico central após bolus IV.',
      },
      {
        title: 'Autoindução Canina & TDM Sem Armadilhas',
        icon: 'Activity',
        desc: 'A autoindução canina reduz o nível sérico em semanas e corta em 35–50% a t½ do levetiracetam. Coletar TDM em vale aos 14 d, 6 sem e q6m em tubo sem gel (vigiar lipemia).',
      },
      {
        title: 'Indução vs. Hepatotoxicidade (Cão ≠ Gato) & Desmame',
        icon: 'ShieldCheck',
        desc: 'FA alta isolada em cães costuma ser indução benigna; em gatos não há indução típica (investigar qualquer ALT/FA alta). Nunca interromper abruptamente pelo risco de status epilepticus fatal.',
      },
    ],

    quickSummaryHighlights: [
      '2,5–3 mg/kg',
      '1,5–3 mg/kg',
      '15–35 µg/mL',
      '23–30 µg/mL',
      '≤ 1–2 mg/kg/min',
      '91,35 mg/mL base',
      'tubo sem gel separador',
      'status epilepticus fatal',
      'Receita de Controle Especial em 2 vias',
      'RDC ANVISA nº 1.023/2026',
    ],

    clinicalNotesRichText:
      'Síntese prática de neurologia e farmacologia clínica:\n\n' +
      '1. Monitorização sérica (TDM) e autoindução: o objetivo é controle clínico com tolerabilidade, não tratar um exame isolado. Cronograma canino: Dia 0 (basal sem TDM) → 14 dias (1º steady state) → 6 semanas (checar queda por autoindução) → a cada 6 meses (e após ajustes ou interações). Coletar em vale em tubo seco SEM gel separador (silicone adsorve fenobarbital) e controlar lipemia (7% de falha em Despa et al., 2026). Fórmula teórica sob cinética estável: Dose_nova = Dose_atual × (C_alvo / C_atual). Conversão de unidades: µmol/L × 0,232 = µg/mL (µg/mL × 4,31 = µmol/L).\n\n' +
      '2. Equivalência química no Brasil (sal sódico vs. base) e solução oral 40 mg/mL: Fenocris® injetável contém 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL de fenobarbital base; ex.: 40 mg base = 0,438 mL), enquanto Carbital® injetável apresenta 200 mg/mL — nunca trocar ampolas sem recalcular. Na rotina oral de cães < 10–12 kg e gatos, preferir solução oral 40 mg/mL (40 gotas/mL = 1 mg/gota no gotejador original) medida em seringa graduada.\n\n' +
      '3. Desmame seguro: nunca interromper abruptamente. Protocolos de referência: redução de 25% da dose vigente a cada 2 semanas (100 → 75 → 56 → 42 mg) OU redução de 25% da dose original por mês em 3–4 meses (100 → 75 → 50 → 25 → 0 mg). Em hepatotoxicidade verdadeira ou hipersensibilidade grave, acelerar a retirada sob cobertura imediata de anticonvulsivante substituto.',

    clinicalStructuredBlocks: [
      {
        kind: 'clinicalCallout',
        variant: 'brazil',
        title: 'Regulação Brasileira 2026 & Conversão Fenocris® (Sal Sódico vs. Base)',
        body: '• Receituário: Lista B1 (Portaria 344/1998) com adendo expresso — confirmado pela RDC ANVISA nº 1.023, de 11/05/2026 — determinando prescrição em Receita de Controle Especial em 2 vias com retenção (NÃO talão azul B). • Injetável: Fenocris® contém 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL de fenobarbital base; 40 mg base ÷ 91,35 = 0,438 mL). Atenção redobrada com Carbital® injetável (200 mg/mL). • Não há marca veterinária registrada no MAPA regularmente confirmada no Brasil; utilizam-se especialidades humanas extrabula.',
      },
      {
        kind: 'clinicalCallout',
        variant: 'caution',
        title: 'Indução Enzimática Benigna vs. Hepatotoxicidade — Cão ≠ Gato',
        body: 'Em CÃES, FA alta isolada (e moderada de ALT/GGT, com hepatomegalia homogênea ao US e possível queda transitória de albumina nos 6 primeiros meses) sem elevação de ácidos biliares, bilirrubina ou AST geralmente traduz indução microssomal benigna — suspender o fenobarbital apenas por FA alta é erro clínico grave. Hepatotoxicidade verdadeira (> 1 ano ou > 35–40 µg/mL) cursa com fibrose portal em ponte, queda persistente de albumina, ácidos biliares elevados, icterícia, ascite ou hiporexia. Em GATOS, não há indução enzimática típica (Hermans et al., 2022): qualquer aumento de ALT ou FA exige investigação ativa.',
      },
      {
        kind: 'clinicalCallout',
        variant: 'info',
        title: 'TDM Sem Armadilhas: Tubo Sem Gel, Lipemia, Autoindução & Interação com Levetiracetam',
        body: '• Coleta: evitar tubos com gel separador (silicone adsorve o fenobarbital) e manter jejum para evitar falha analítica por lipemia (7% das amostras em Despa et al., 2026). • Cronograma: Dia 0 → 14 dias → 6 semanas → q6m. • Fórmula teórica (em cinética estável): Dose_nova = Dose_atual × (C_alvo / C_atual). • Politerapia canina: fenobarbital reduz em 35–50% a t½ do levetiracetam; com brometo, ~1/3 dos cães requer níveis ~33% menores de fenobarbital (brometo é contraindicado em gatos).',
      },
    ],

    pharmacokineticsData: {
      halfLife:
        'Cães: ~37–75 h (média ~53 h; amplitude 12–125 h; pode cair < 24 h por autoindução ou ~24–26 h sob dietas restritas em proteína/gordura) | Gatos: ~34–56 h (média ~43 h)',
      plasmaBinding:
        '~45–50% em cães (percentual felino específico menos estabelecido); hipoalbuminemia eleva a fração livre farmacologicamente ativa',
      cnsPenetration:
        'Penetração eficaz na barreira hematoencefálica por difusão passiva (ácido fraco, pKa ≈ 7,3–7,41), porém mais lenta que barbitúricos ultracurtos como tiopental — o equilíbrio completo no SNC após via IV leva 15–20 minutos. Sem percentual universal validado de concentração LCR/plasma.',
      absorption:
        'Absorção por via em cães e gatos (comparação de biodisponibilidade, Tmax e restrições clínicas): ' +
        '• Via Oral (VO): Biodisponibilidade de ~90% em cães (absorção descrita como praticamente completa em gatos, embora sem percentual único universalmente estabelecido). Tmax oral de ~4–8 horas em cães (mais variável em gatos). Pode ser administrado com ou sem alimento, mantendo rotina consistente; não é via de resgate imediato no status epilepticus. Sem carga inicial, atinge estado de equilíbrio (steady state) em ~10–14 dias em cães e ~9–15 dias em gatos. ' +
        '• Via Intravenosa (IV): Biodisponibilidade de 100% por definição, com pico plasmático imediato, porém equilíbrio no SNC em 15–20 minutos devido à lipossolubilidade moderada. Velocidade máxima veterinária: ≤ 1–2 mg/kg/min (NÃO usar o teto humano de 60 mg/min em cães pequenos/gatos); aguardar 20 minutos entre incrementos para evitar depressão respiratória e colapso hemodinâmico. ' +
        '• Via Intramuscular (IM): Alternativa hospitalar quando não há acesso IV, porém provoca dor e irritação tecidual (pH alcalino). Biodisponibilidade percentual e Tmax não são universalmente padronizados e a absorção torna-se errática em pacientes hipotensos ou chocados. ' +
        '• Via Subcutânea (SC): Contraindicada (0% recomendada na prática). Soluções parenterais de fenobarbital sódico possuem pH alcalino (8,5–10,5), causando inflamação grave e necrose tecidual. ' +
        '• Via Transdérmica (Gatos — Experimental): Estudos experimentais em gel PLO no pavilhão auricular (9 mg/kg q12h) mostraram absorção errática e variável (pior em Lipoderm®), atingindo nível terapêutico apenas em parte dos felinos — NÃO intercambiável com a via oral.',
      distribution:
        '• Volume de distribuição aparente (Vd): Aproximadamente 0,75 L/kg em cães e ~0,70 L/kg em gatos, indicando distribuição ampla além do compartimento plasmático para espaços extracelulares e tecidos periféricos. ' +
        '• O que significa Vd de 0,75 L/kg na prática: Em um cão de 10 kg, Vd ≈ 0,75 × 10 = 7,5 L — isso não representa volume físico de sangue, mas o parâmetro matemático que relaciona a quantidade total do fármaco no organismo à concentração plasmática (Vd = Quantidade no organismo ÷ Concentração plasmática). ' +
        '• Relação matemática com a dose de ataque: Pelo modelo simplificado Dose_ataque ≈ (C_alvo × Vd) ÷ F, atingir 20 mg/L (20 µg/mL) por via IV em um cão (Vd 0,75 L/kg) requer teoricamente 20 × 0,75 = 15 mg/kg — ilustrando por que cargas totais situam-se em 12–24 mg/kg. Contudo, trata-se apenas de ilustração farmacocinética e NÃO de ordem automática para aplicar 15 mg/kg em bolus único. ' +
        '• Ligação proteica, placenta e lactação: Ligação de ~45–50% a proteínas plasmáticas em cães (hipoalbuminemia eleva fração livre ativa e exige cautela ao interpretar níveis totais). Atravessa a barreira hematoencefálica (mais lentamente que tiopental), cruza a placenta e é excretado no leite materno (risco de sedação ou abstinência neonatal).',
      metabolism:
        '• Biotransformação hepática principal: Metabolizado majoritariamente no fígado por oxidação microssomal dependente do sistema citocromo P450 (formando sobretudo p-hidroxifenobarbital), seguida de conjugação com sulfato e glicuronídeo para eliminação urinária. Não presumir equivalência quantitativa direta entre isoenzimas CYP humanas (ex.: CYP3A) e caninas/felinas. ' +
        '• Autoindução hepática em cães (fenômeno-chave): A exposição contínua estimula a expressão de enzimas hepáticas metabolizadoras, acelerando o próprio clearance do fenobarbital e encurtando sua meia-vida nas primeiras 6 semanas a 6 meses — reduzindo a concentração sérica mesmo sem mudar a dose. Exemplo clínico: um cão em 3 mg/kg q12h apresenta 24 µg/mL aos 14 dias e cai para 17 µg/mL às 6 semanas mantendo a mesma dose; se as crises retornarem, investigar adesão, autoindução e interações. ' +
        '• Tolerância farmacocinética vs. farmacodinâmica: Na tolerância farmacocinética, as crises retornam porque a concentração sérica caiu por maior clearance (autoindução/adesão); na tolerância farmacodinâmica, as crises retornam apesar da concentração sérica permanecer estável no patamar antes eficaz (adaptação de redes/receptores ou progressão da doença). ' +
        '• Diferença crítica em felinos: Em gatos, o padrão de indução enzimática hepática é marcadamente distinto e mínimo (Hermans et al., 2022) — não presumir autoindução ou elevação fisiológica de FA/ALT como nos cães. ' +
        '• Alerta de dieta e desindução após retirada: Dietas muito restritas em proteína ou gordura podem encurtar a meia-vida canina para ~24–26 h. Após suspender o fenobarbital, a indução microssomal persiste por até 4 semanas — fármacos coadministrados podem subir de concentração durante esse período.',
      elimination:
        '• Rotas renal e metabólica: Cerca de 25% da dose é excretada inalterada pelos rins em cães e ~75% eliminada pela urina como metabólitos conjugados (em gatos a fração renal também existe, com dados quantitativos mais limitados). Oligúria/anúria e DRC avançada retêm a fração renal e exigem monitorização mais estreita. ' +
        '• Meia-vida terminal comparada: Em cães, tipicamente 37–75 h (média ~53 h, com amplitude relatada de 12–125 h e casos crônicos < 24 h); em gatos, ~34–56 h (média ~43 h). ' +
        '• Equação de Henderson–Hasselbalch e efeito do pH urinário: Como ácido fraco (pKa ≈ 7,3–7,41), segue pH = pKa + log([A⁻]/[HA]). No pH sanguíneo de 7,4, ~50% encontra-se na forma não ionizada. Na acidemia aumenta a fração não ionizada (maior passagem por membranas); na alcalinização urinária aumenta a fração ionizada intratubular, reduzindo a reabsorção passiva e acelerando a excreção renal em intoxicações graves (sem justificar alterar rotineiramente o pH urinário em epilépticos). ' +
        '• Por que q12h e quando ocorre o steady state: A meia-vida de ~2 dias mantém níveis estáveis entre doses de 12 h na maioria dos pacientes (exceto cães com t½ < 24 h, nos quais a flutuação pico–vale se acentua). Como o estado de equilíbrio demanda 4–5 meias-vidas, para t½ = 53 h: 5 × 53 = 265 h ≈ 11 dias — explicando a 1ª dosagem aos 14 dias e a recoleta às 6 semanas pela autoindução.',
    },

    doses: [
      {
        id: 'dose-feno-dog-epilepsy-maint',
        species: 'dog',
        indication: 'Epilepsia idiopática ou estrutural canina — Dose inicial de manutenção crônica',
        doseMin: 2.5,
        doseMax: 3.0,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas (q12h)',
        duration: 'Contínua/vitalícia; reavaliação com TDM aos 14 dias, 6 semanas e a cada 6 meses (desmame apenas gradual)',
        clinicalContext:
          'Primeira linha pelos consensos IVETF (2015) e ACVIM (2016), expressa em mg/kg por administração (não como dose diária total). A faixa europeia antiga de 1–2,5 mg/kg q12h atingia o alvo sérico em apenas ~40% dos cães.',
        evidenceLevel: 'Forte (Consensos IVETF 2015 / ACVIM 2016 e ensaios clínicos randomizados)',
        monitoring:
          'Diário de crises; TDM em vale em tubo sem gel aos 14 dias, 6 semanas e q6m (alvo 15–35 µg/mL); hemograma, FA, ALT, AST, GGT, albumina, bilirrubina e ácidos biliares quando indicados.',
        notes:
          'Para cães < 10–12 kg, preferir solução oral 40 mg/mL medida em seringa graduada (evitar fracionar comprimidos de 50/100 mg em frações mínimas). Não titular apenas por mg/kg sem integrar TDM e controle clínico.',
        calculatorEnabled: true,
        presentationId: 'pres-feno-sol-40mgml',
        referenceIds: ['ref-ivetf-2015', 'ref-acvim-seizure-2016', 'ref-boothe-2012', 'ref-bsava-10', 'ref-plumb-10'],
      },
      {
        id: 'dose-feno-cat-epilepsy-maint',
        species: 'cat',
        indication: 'Epilepsia felina (idiopática ou estrutural) — Dose inicial de manutenção crônica',
        doseMin: 1.5,
        doseMax: 3.0,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas (q12h)',
        duration: 'Contínua/prolongada; reavaliação com TDM aos 10–15 dias e semestralmente',
        clinicalContext:
          'Primeira escolha em felinos (faixas descritas de 1,5–3 mg/kg ou 1–3 mg/kg VO q12h); investigar previamente causas estruturais, infecciosas e metabólicas e lembrar que gatos não fazem indução enzimática típica.',
        evidenceLevel: 'Moderada (séries retrospectivas felinas consistentes e consensos clínicos)',
        monitoring:
          'TDM alvo conservador de 23–30 µg/mL (controle retrospectivo descrito em 15–45 µg/mL); hemograma, ALT/FA (qualquer elevação em gatos exige investigação), pele/face e comportamento.',
        notes:
          'Utilizar solução oral 40 mg/mL em seringa graduada ou manipulação exata. Vigiar prurido facial, edema distal de membros, febre e citopenias nas primeiras semanas; brometo é contraindicado na espécie.',
        calculatorEnabled: true,
        presentationId: 'pres-feno-sol-40mgml',
        referenceIds: ['ref-finnerty-2014', 'ref-hermans-2022', 'ref-bsava-10', 'ref-plumb-10', 'ref-ettinger-9e'],
      },
      {
        id: 'dose-feno-dog-se-loading',
        species: 'dog',
        indication: 'Status epilepticus ou clusters — Carga IV em cães virgens de tratamento (2ª linha ACVIM 2024)',
        doseMin: 4.0,
        doseMax: 8.0,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'IV lenta',
        frequency: 'IV lenta (≤ 1–2 mg/kg/min), com incrementos de 4 mg/kg q20–30 min até carga cumulativa máxima de 20–24 mg/kg',
        duration: 'Fase aguda hospitalar (transição para manutenção VO após controle das crises e recuperação da deglutição)',
        clinicalContext:
          'Segunda linha após benzodiazepínico inicial (ACVIM 2024 — Grau A). Esquema alternativo descrito em formulários europeus: 12 mg/kg IV lenta inicial + duas doses de 4–6 mg/kg com 20 min de intervalo (total 18–24 mg/kg) — alternativas distintas, NUNCA somar.',
        evidenceLevel: 'Consenso Internacional ACVIM 2024 (Grau A em cães)',
        monitoring:
          'FR, padrão ventilatório, SpO₂, EtCO₂, pressão arterial, ECG, temperatura, glicemia, eletrólitos, nível de consciência e sinais de status não convulsivo.',
        notes:
          'Calculadora bloqueada intencionalmente para exigir conferência manual de sal vs. base (Fenocris® 100 mg/mL fenobarbital sódico = 91,35 mg/mL base; Carbital® = 200 mg/mL), da velocidade máxima veterinária (≤ 1–2 mg/kg/min; NÃO usar teto humano de 60 mg/min) e da espera obrigatória de 20 min entre incrementos.',
        calculatorEnabled: false,
        presentationId: 'pres-feno-inj-100mgml',
        referenceIds: ['ref-acvim-se-2024', 'ref-plumb-10', 'ref-bsava-10', 'ref-anvisa-fenocris-2026'],
      },
      {
        id: 'dose-feno-dog-se-chronic-topup',
        species: 'dog',
        indication: 'Status epilepticus ou clusters — Suplementação emergencial em cães JÁ em uso crônico',
        doseMin: 4.0,
        doseMax: 6.0,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'IV lenta ou IM',
        frequency: 'administração emergencial pontual após coleta prévia obrigatória de sangue para TDM',
        duration: 'Intervenção hospitalar pontual para correção de eventual nível subterapêutico',
        clinicalContext:
          'Indicada em cães já tratados cronicamente que descompensam; colher SEMPRE amostra de TDM em tubo sem gel antes da suplementação e nunca aplicar carga cheia de paciente virgem.',
        evidenceLevel: 'Formulários clínicos internacionais e consenso de emergência neurológica',
        monitoring:
          'Nível sérico prévio, ventilação (FR, SpO₂, EtCO₂), sedação excessiva, pressão arterial e recorrência de crises.',
        notes:
          'Calculadora bloqueada por segurança hospitalar. Confirmar concentração/forma química da ampola antes do preparo; considerar associação precoce com levetiracetam IV quando o nível prévio já estiver elevado.',
        calculatorEnabled: false,
        presentationId: 'pres-feno-inj-100mgml',
        referenceIds: ['ref-bsava-10', 'ref-acvim-se-2024'],
      },
      {
        id: 'dose-feno-cat-se-loading',
        species: 'cat',
        indication: 'Status epilepticus ou clusters — Carga IV em gatos (2ª linha ACVIM 2024)',
        doseMin: 3.0,
        doseMax: 4.0,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'IV lenta',
        frequency: 'IV lenta (≤ 1–2 mg/kg/min) em incrementos q20 min até carga máxima de 18–24 mg/kg em 24 h',
        duration: 'Fase aguda hospitalar sob suporte cardiorrespiratório intensivo',
        clinicalContext:
          'Segunda linha após benzodiazepínico inicial (ACVIM 2024 — Grau B; literatura também descreve bolus lento de 10 mg/kg em cenários selecionados). Gatos têm elevada vulnerabilidade à depressão respiratória barbitúrica e ao propilenoglicol.',
        evidenceLevel: 'Consenso Internacional ACVIM 2024 (Grau B em gatos; dados diretos limitados)',
        monitoring:
          'Monitorização ventilatória contínua (FR, amplitude, SpO₂, EtCO₂), pressão arterial, temperatura, consciência e material de intubação pronto.',
        notes:
          'Calculadora bloqueada para impedir extrapolação automática de tetos caninos e obrigar conferência base vs. sal sódico (Fenocris® = 91,35 mg/mL base). Reavaliar reflexos de deglutição/tosse e exame neurológico antes de cada incremento acima de 8 mg/kg.',
        calculatorEnabled: false,
        presentationId: 'pres-feno-inj-100mgml',
        referenceIds: ['ref-acvim-se-2024', 'ref-plumb-10'],
      },
      {
        id: 'dose-feno-dog-rapid-clearance-q8h',
        species: 'dog',
        indication: 'Epilepsia canina com depuração ultrarrápida comprovada por TDM (t½ < 24 h) — Regime q8h',
        doseMin: 3.0,
        doseMax: 5.6,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 8 horas (q8h)',
        duration: 'Individualizada somente após comprovação farmacocinética de queda entre doses',
        clinicalContext:
          'Não é primeira escolha nem protocolo para qualquer cão refratário; restrito à subpopulação canina com meia-vida encurtada comprovada por TDM e adesão confirmada.',
        evidenceLevel: 'Moderada/Individualizada (subpopulação farmacocinética específica)',
        monitoring:
          'TDM em vale e pico, perfil hepático completo (ácidos biliares, albumina, bilirrubina, ALT/FA/AST), hemograma e neurotoxicidade.',
        notes:
          'Calculadora bloqueada intencionalmente para impedir prescrição inadvertida de doses elevadas q8h sem comprovação laboratorial de depuração rápida; na maioria dos cães refratários, associar brometo ou levetiracetam é mais seguro.',
        calculatorEnabled: false,
        presentationId: 'pres-feno-comp-100mg',
        referenceIds: ['ref-plumb-10', 'ref-ivetf-2015'],
      },
      {
        id: 'dose-feno-dog-sialadenosis',
        species: 'dog',
        indication: 'Sialadenose canina responsiva a fenobarbital (indicação secundária selecionada)',
        doseMin: 1.0,
        doseMax: 2.5,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'VO',
        frequency: 'a cada 12 horas (q12h)',
        duration: 'Individualizada conforme regressão clínica; não presumir epilepsia sem investigação',
        clinicalContext:
          'Indicação secundária baseada em relatos e séries pequenas para hipersalivação, ânsia e aumento bilateral não inflamatório das glândulas salivares mandibulares; iniciar em ~1 mg/kg VO q12h.',
        evidenceLevel: 'Limitada (relatos e séries clínicas pequenas)',
        monitoring: 'Evolução da sialorreia/tumefação glandular, sedação e painel hepático/hemograma em uso prolongado.',
        notes:
          'Calculadora bloqueada por tratar-se de uso secundário de evidência limitada que exige diagnóstico diferencial prévio (esofagite, sialoadenite, corpo estranho, distúrbios digestivos).',
        calculatorEnabled: false,
        presentationId: 'pres-feno-sol-40mgml',
        referenceIds: ['ref-plumb-10'],
      },
      {
        id: 'dose-feno-cat-transdermal-exp',
        species: 'cat',
        indication: 'Epilepsia felina — Via transdérmica auricular experimental (NÃO equivalente à via oral)',
        doseMin: 9.0,
        doseMax: 9.0,
        doseUnit: 'mg/kg',
        perWeightUnit: 'kg',
        route: 'Transdérmica (gel PLO no pavilhão auricular)',
        frequency: 'a cada 12 horas (q12h)',
        duration: 'Uso experimental excepcional somente quando a via oral for absolutamente inviável',
        clinicalContext:
          'Estudos experimentais em gel PLO atingiram faixa terapêutica apenas em parte dos gatos com grande variabilidade interindividual (pior desempenho em Lipoderm®); sem comprovação clínica de equivalência à VO.',
        evidenceLevel: 'Experimental preliminar (baixa previsibilidade farmacocinética)',
        monitoring: 'TDM mais frequente, inspeção de dermatite auricular local e vigilância estrita de recorrência de crises.',
        notes:
          'Calculadora bloqueada propositalmente: jamais apresentar como via intercambiável com a administração oral de rotina.',
        calculatorEnabled: false,
        referenceIds: ['ref-plumb-10'],
      },
    ],

    presentations: [
      {
        id: 'pres-feno-sol-40mgml',
        label: 'Fenobarbital Solução Oral 40 mg/mL (Fenocris® / Gardenal® — 40 gotas/mL = 1 mg/gota)',
        name: 'Fenocris® / Gardenal® Solução Oral 40 mg/mL (frasco 20 mL)',
        brand: 'Cristália (Fenocris®) / Pharlab (Gardenal® — confirmar disponibilidade pós-07/2026) / Genéricos',
        form: 'Solução oral (gotas / seringa graduada)',
        concentrationValue: 40,
        concentrationUnit: 'mg/mL',
        dropsPerMl: 40,
        packInfo: 'Frasco de 20 mL (40 gotas/mL = 1 mg/gota no gotejador original; contém álcool etílico e propilenoglicol)',
        route: 'Oral (VO)',
        channel: 'human_pharmacy',
        scoringInfo:
          'Conversão validada no gotejador original (40 gotas/mL = 1 mg/gota): 0,10 mL = 4 mg (4 gts) | 0,20 mL = 8 mg (8 gts) | 0,25 mL = 10 mg (10 gts) | 0,50 mL = 20 mg (20 gts) | 0,75 mL = 30 mg (30 gts) | 1,00 mL = 40 mg (40 gts) | 1,25 mL = 50 mg (50 gts). Preferir seringa oral graduada para volumes fracionários em cães < 10–12 kg e gatos; NUNCA aplicar o fator de 40 gotas/mL a soluções manipuladas sem validar o gotejador. Contém álcool etílico e propilenoglicol — avaliar tolerância em gatos e pacientes sensíveis.',
      },
      {
        id: 'pres-feno-comp-50mg',
        label: 'Fenobarbital 50 mg Comprimido (Gardenal® — fenobarbital base)',
        name: 'Gardenal® 50 mg comprimidos (fenobarbital base)',
        brand: 'Pharlab (nota regulatória: transferência de titularidade e cancelamento de registros anteriores em 07/2026 — confirmar estoque ativo)',
        form: 'Comprimido',
        concentrationValue: 50,
        concentrationUnit: 'mg',
        packInfo: 'Caixa com 20 comprimidos de 50 mg (fenobarbital base)',
        route: 'Oral (VO)',
        channel: 'human_pharmacy',
        scoringInfo:
          'Indicado sobretudo para cães de médio porte (≥ 10–20 kg; ex.: 10 kg a 2,5 mg/kg = 25 mg = 1/2 comp.; 20 kg = 50 mg = 1 comp.). Não cortar em décimos, quintos ou quartos imprecisos para animais pequenos (para cães < 10 kg e gatos, usar solução oral 40 mg/mL em seringa graduada ou cápsulas manipuladas). Confirmar disponibilidade comercial ativa após a transição de titularidade de julho de 2026.',
      },
      {
        id: 'pres-feno-comp-100mg',
        label: 'Fenobarbital 100 mg Comprimido (Fenocris® / Gardenal® / Carbital® / Genérico)',
        name: 'Fenocris® / Gardenal® / Carbital® / Genérico 100 mg comprimidos (fenobarbital base)',
        brand: 'Cristália (Fenocris®) / Pharlab (Gardenal®) / Teuto (Carbital®) / Genéricos',
        form: 'Comprimido',
        concentrationValue: 100,
        concentrationUnit: 'mg',
        packInfo: 'Caixas comerciais de 20 ou 30 comprimidos e embalagem hospitalar de 200 comprimidos (Fenocris®)',
        route: 'Oral (VO)',
        channel: 'human_pharmacy',
        scoringInfo:
          'Apresentação prática para cães de porte grande (≥ 20–40 kg; ex.: 20 kg a 2,5 mg/kg = 50 mg = 1/2 comp.; 40 kg = 100 mg = 1 comp.). Evitar fracionamentos menores que 1/2 comprimido. Em cães com necessidade de ajustes finos durante titulação por TDM ou desmame, combinar com comprimido de 50 mg ou solução oral 40 mg/mL. Prescrição sob Receita de Controle Especial em 2 vias.',
      },
      {
        id: 'pres-feno-inj-100mgml',
        label: 'Fenocris® Injetável 100 mg/mL fenobarbital sódico (= 91,35 mg/mL base; 2 mL)',
        name: 'Fenocris® Solução Injetável 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL fenobarbital base)',
        brand: 'Cristália (uso hospitalar IV lenta / IM)',
        form: 'Solução injetável estéril',
        concentrationValue: 91.35,
        concentrationUnit: 'mg/mL',
        packInfo: 'Ampola de 2 mL (= 200 mg sal sódico = 182,7 mg fenobarbital base); caixas com 25 ou 50 ampolas; contém propilenoglicol; pH 8,5–10,5',
        route: 'IV lenta / IM (NUNCA SC)',
        channel: 'human_pharmacy',
        scoringInfo:
          'CONVERSÃO SAL vs. BASE OBRIGATÓRIA: cada 1 mL contém 100 mg de fenobarbital sódico, equivalentes a 91,35 mg de fenobarbital base. Exemplo didático (cão 10 kg a 4 mg/kg expressos em base = 40 mg): Volume = 40 ÷ 91,35 = 0,438 mL; se o protocolo especificar sal sódico, usar 100 mg/mL (0,40 mL). Infundir IV em velocidade ≤ 1–2 mg/kg/min (ex.: 40 mg em ≥ 4 min; NÃO usar teto humano de 60 mg/min), em acesso exclusivo lavado com SF 0,9%. PROIBIDO via SC e proibido misturar com benzodiazepínicos ou soluções ácidas.',
      },
      {
        id: 'pres-feno-inj-carbital-200mgml',
        label: 'Carbital® Injetável 200 mg/mL (Teuto — ATENÇÃO: concentração distinta da Fenocris®!)',
        name: 'Carbital® Solução Injetável 200 mg/mL (uso hospitalar)',
        brand: 'Teuto (conferir rótulo, forma química e bula específica antes de qualquer preparo)',
        form: 'Solução injetável estéril',
        concentrationValue: 200,
        concentrationUnit: 'mg/mL',
        packInfo: 'Apresentação injetável de alta concentração (200 mg/mL) — NÃO intercambiável por volume com Fenocris® 100 mg/mL',
        route: 'IV lenta / IM (NUNCA SC)',
        channel: 'human_pharmacy',
        scoringInfo:
          'ALERTA CRÍTICO DE SEGURANÇA HOSPITALAR: possui o DOBRO da concentração rotulada de Fenocris® 100 mg/mL. Nunca presumir equivalência de mL entre marcas injetáveis sem conferir diretamente a ampola, a forma química declarada (sal sódico vs. equivalente em base) e a bula específica. Manter dupla checagem em UTI e respeitar rigorosamente velocidade ≤ 1–2 mg/kg/min.',
      },
    ],

    attentionSubtitle:
      'Nunca suspender abruptamente; diferenciar indução enzimática benigna de hepatotoxicidade verdadeira (cão ≠ gato); conferir sal sódico (100 mg/mL) vs. base (91,35 mg/mL) na via IV; coletar TDM em tubo sem gel e vigiar lipemia.',

    attentionData: {
      precautions: [
        {
          condition: 'Hipersensibilidade comprovada a barbitúricos ou reação imunomediada prévia',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Reexposição após síndrome de hipersensibilidade anticonvulsivante, pseudolinfoma, dermatite grave ou citopenia idiossincrática pode desencadear recorrência fulminante e potencialmente letal.',
          clinicalAction:
            'Contraindicação absoluta. Evitar nova exposição e empregar anticonvulsivante de classe estrutural distinta (ex.: levetiracetam, brometo em cães, zonisamida).',
        },
        {
          condition: 'Insuficiência hepática grave, cirrose avançada ou encefalopatia hepática',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A depuração do fenobarbital depende predominantemente da biotransformação hepática; insuficiência sintética/metabólica prolonga a exposição, aprofunda a depressão neurológica e acelera fibrose portal em ponte.',
          clinicalAction:
            'Contraindicação absoluta em hepatopatia grave descompensada. Diferenciar sempre de indução enzimática benigna isolada em cães (FA alta sem perda funcional) via ácidos biliares, albumina, bilirrubina, AST e ultrassonografia.',
        },
        {
          condition: 'Depressão respiratória grave sem suporte ventilatório disponível',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Barbitúricos deprimem diretamente o centro respiratório bulbar (parada respiratória ocorre em exposições ~4× inferiores às de parada cardíaca), com risco agudo de hipoventilação grave e apneia.',
          clinicalAction:
            'Contraindicado sem via aérea garantida e capacidade imediata de oxigenoterapia/ventilação assistida (especialmente em cargas IV e em gatos).',
        },
        {
          condition: 'Porfiria',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'Barbitúricos induzem enzimas hepáticas da via de biossíntese do heme (ALA-sintetase), precipitando acúmulo tóxico de porfirinas.',
          clinicalAction: 'Contraindicação absoluta. Utilizar anticonvulsivante alternativo não indutor.',
        },
        {
          condition: 'Suspensão abrupta em pacientes sob manutenção crônica',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A remoção súbita da potencialização GABAérgica prolongada desencadeia hiperexcitabilidade cortical rebote, crises em agrupamento e status epilepticus potencialmente fatal.',
          clinicalAction:
            'NUNCA interromper de forma súbita. Executar desmame lento (redução de 25% da dose vigente a cada 2 semanas ou 25% da dose original/mês em 3–4 meses); em toxicidade grave, associar substituto imediatamente durante a retirada acelerada.',
        },
        {
          condition: 'Via subcutânea (SC), administração IV rápida ou mistura incompatível em seringa',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A solução de fenobarbital sódico possui pH alcalino (8,5–10,5), provocando inflamação grave e necrose tecidual por via SC ou extravasamento; infusão IV rápida precipita apneia e hipotensão antes do pico no SNC (15–20 min).',
          clinicalAction:
            'Proibida via SC. Infundir IV em acesso pérvio a ≤ 1–2 mg/kg/min aguardando 20 min entre incrementos; nunca misturar na mesma seringa com diazepam, midazolam ou soluções ácidas.',
        },
        {
          condition: 'Intoxicação por avermectinas/milbemicinas (ivermectina, moxidectina)',
          alertLevel: 'contraindicated',
          physiologicalExplanation:
            'A neurotoxicidade por lactonas macrocíclicas já envolve hiperpolarização mediada por canais de cloreto GABA/glutamato; barbitúricos agravam severamente a depressão do SNC.',
          clinicalAction: 'Não empregar fenobarbital nessas intoxicações; conduzir com suporte intensivo e protocolos específicos.',
        },
        {
          condition: 'Doença hepática compensada & Elevação de ALT/FA em FELINOS',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Na hepatopatia compensada há menor reserva metabólica para lidar com sobrecarga de biotransformação; em gatos, não existe indução enzimática hepática típica (Hermans et al., 2022), portanto enzimas elevadas indicam alteração real a investigar.',
          clinicalAction:
            'Avaliar alternativas não hepáticas (ex.: levetiracetam); se mantido, iniciar conservadoramente com monitorização estreita de ácidos biliares, albumina e TDM. Em gatos, investigar toda elevação de ALT ou FA.',
        },
        {
          condition: 'Doença renal crônica avançada (IRIS 3–4) ou lesão renal aguda com oligúria/anúria',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Aproximadamente 25% da dose é excretada inalterada pelos rins; queda acentuada da filtração glomerular ou oligúria reduz essa fração de depuração e pode elevar níveis séricos.',
          clinicalAction:
            'Não aplicar reduções percentuais fixas inventadas por estágio IRIS; monitorar TDM e tolerabilidade mais frequentemente e envolver avaliação especializada em IRIS 4/LRA.',
        },
        {
          condition: 'Choque, hipovolemia ou anemia grave',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Pacientes chocados ou gravemente anêmicos possuem menor reserva de transporte de oxigênio e menor tolerância à vasodilatação, hipotensão e depressão miocárdica causadas por cargas IV barbitúricas; a absorção IM também fica errática.',
          clinicalAction:
            'Estabilizar oxigenação e perfusão simultaneamente, fracionar cargas IV em velocidade lenta sob monitorização hemodinâmica contínua e evitar via IM no choque.',
        },
        {
          condition: 'Gestação e lactação',
          alertLevel: 'warning',
          physiologicalExplanation:
            'Barbitúricos cruzam a barreira placentária e são excretados no leite materno, podendo causar sedação, depressão respiratória ou sintomas de abstinência nos neonatos.',
          clinicalAction:
            'Ponderar o risco grave das crises maternas não controladas (hipóxia fetal) contra a exposição fetal/neonatal; evitar início eletivo desnecessário e monitorar recém-nascidos.',
        },
        {
          condition: 'Geriatria, caquexia, obesidade e hipoalbuminemia',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Idosos e caquéticos têm menor reserva orgânica e maior sensibilidade à sedação; na hipoalbuminemia aumenta a fração livre ativa (~45–50% de ligação basal); na obesidade não há fórmula veterinária universal de peso ideal.',
          clinicalAction:
            'Iniciar de forma conservadora, monitorar sedação/ataxia de perto e interpretar concentrações séricas totais com cautela em pacientes hipoalbuminêmicos.',
        },
        {
          condition: 'Associação com depressores do SNC e administração parenteral em gatos',
          alertLevel: 'caution',
          physiologicalExplanation:
            'Somação farmacodinâmica de depressão central/ventilatória com benzodiazepínicos, propofol e opioides; gatos têm maior vulnerabilidade à depressão respiratória e aos excipientes (propilenoglicol) em infusões/exposições elevadas.',
          clinicalAction:
            'Titular doses com lentidão, manter oxigênio e material de intubação prontos e reavaliar ventilação e reflexos antes de cada incremento.',
        },
      ],

      adverseEffectsDetailed: [
        {
          effect: 'Sedação e sonolência (efeito inicial mais frequente)',
          frequency: 'common',
          mechanism:
            'A amplificação da neurotransmissão inibitória GABAérgica não se restringe ao foco epileptogênico, reduzindo também a excitabilidade de redes corticais e do sistema ativador reticular ascendente. Na maioria dos cães ocorre adaptação central em 1–2 semanas.',
          clinicalManagement:
            'Orientar o tutor que a sedação inicial costuma regredir em 1–2 semanas. Se persistir, progredir ou comprometer a qualidade de vida, verificar TDM, horários, interações medicamentosas e exame neurológico (evitar confundir sedação intensa com eficácia anticonvulsivante).',
        },
        {
          effect: 'Ataxia e incoordenação motora',
          frequency: 'common',
          mechanism:
            'Depressão funcional de circuitos cerebelares e motores responsáveis pelo equilíbrio e controle postural, provocando base ampla, oscilação pélvica e dificuldade em escadas sem implicar lesão estrutural do cerebelo.',
          clinicalManagement:
            'Acompanha frequentemente as primeiras 1–2 semanas ou aumentos de dose. Diferenciar de intoxicação aguda (> 35–40 µg/mL), síndrome vestibular, mielopatia ou progressão de neoplasia intracraniana; dosar TDM se persistente.',
        },
        {
          effect: 'Polifagia e ganho de peso / obesidade',
          frequency: 'common',
          mechanism:
            'Alterações centrais na regulação do comportamento alimentar e da saciedade durante a terapia prolongada em cães (mecanismos moleculares exatos ainda não totalmente elucidados); diferente da sedação, tende a persistir enquanto o fármaco é mantido.',
          clinicalManagement:
            'Instituir controle calórico rigoroso desde o início, fracionar refeições, considerar dietas com maior teor de fibra/saciedade (sem restrição extrema de proteína/gordura que encurta a meia-vida) e monitorar peso e escore corporal.',
        },
        {
          effect: 'Polidipsia e poliúria (PU/PD)',
          frequency: 'common',
          mechanism:
            'Alteração da regulação hídrica central/renal que persiste frequentemente durante toda a manutenção em cães, sem um único mecanismo antidiurético universalmente comprovado e podendo ocorrer sem lesão renal estrutural.',
          clinicalManagement:
            'Manter água fresca irrestrita, porém NUNCA atribuir automaticamente toda PU/PD ao fenobarbital — realizar urinálise com densidade, glicemia, perfil renal, eletrólitos e investigar comorbidades (diabetes mellitus, hiperadrenocorticismo, DRC, pielonefrite, hipercalcemia).',
        },
        {
          effect: 'Indução enzimática hepática benigna em cães (FA/ALT/GGT elevadas sem disfunção)',
          frequency: 'common',
          mechanism:
            'O fenobarbital induz sistemas enzimáticos microssomais hepáticos caninos, elevando a atividade sérica de isoenzimas da fosfatase alcalina (~36% das dosagens em Despa et al., 2026) e discretamente ALT/GGT, com eventual hepatomegalia homogênea ao US e queda discreta transitória da albumina nos 6 primeiros meses — SEM necrose hepatocelular ou falha funcional. FA elevada reflete atividade enzimática, não função hepática.',
          clinicalManagement:
            'Caso prático típico (Caso A): cão assintomático com FA 750 U/L, ALT 90 U/L, albumina normal, bilirrubina normal, ácidos biliares normais e PB 22 µg/mL → indução benigna; NÃO suspender o fenobarbital. Em GATOS, porém, não ocorre indução típica (Hermans et al., 2022) — toda elevação de ALT/FA felina exige investigação.',
        },
        {
          effect: 'Interferências endócrinas (T4 baixo, LDDST) e dislipidemia/lipase pancreática',
          frequency: 'common',
          mechanism:
            'A indução hepática acelera o metabolismo e a depuração periférica dos hormônios tireoidianos (reduzindo T4 total e T4 livre com TSH variável em cães eutireoideus) e pode acelerar a depuração da dexametasona (divergência entre referências sobre falsos-positivos no LDDST). Também induz hipertrigliceridemia e variações de lipase pancreática em cães.',
          clinicalManagement:
            'Não iniciar levotiroxina apenas por T4 laboratorial baixo em cão sem sinais clínicos de hipotireoidismo. Considerar o uso de fenobarbital ao interpretar LDDST. Hipertrigliceridemia ou lipase elevada isoladas não confirmam pancreatite sem clínica + imagem; coletar TDM em jejum para evitar falha analítica por lipemia (7%).',
        },
        {
          effect: 'Excitação paradoxal, inquietação e irritabilidade',
          frequency: 'uncommon',
          mechanism:
            'Desinibição comportamental paradoxal em circuitos límbicos/inibitórios, manifestando-se por ansiedade, agitação ou hiperatividade em vez da sedação esperada (pode ocorrer inclusive em níveis séricos subterapêuticos).',
          clinicalManagement:
            'NUNCA elevar a dose automaticamente acreditando tratar-se de "falta de sedação". Avaliar TDM, tempo de adaptação, padrão comportamental e, se intolerável, planejar substituição gradual por outro anticonvulsivante.',
        },
        {
          effect: 'Hepatotoxicidade crônica verdadeira (fibrose portal em ponte / insuficiência hepática)',
          frequency: 'uncommon',
          mechanism:
            'Lesão parenquimatosa progressiva associada sobretudo a uso prolongado (> 1 ano) e concentrações séricas elevadas sustentadas (> 35–40 µg/mL), embora eventos idiossincráticos existam. Histopatologicamente cursa com fibrose portal em ponte, regeneração nodular, hiperplasia biliar e perda da capacidade sintética (queda persistente de albumina, ureia e fatores de coagulação, hiperbilirrubinemia e aumento de ácidos biliares).',
          clinicalManagement:
            'Caso prático de alarme (Caso B): cão com FA/ALT progressivamente altas, albumina baixa, ácidos biliares elevados, perda de peso, hiporexia e PB 42 µg/mL → investigar função hepática + US e iniciar substituição anticonvulsivante (ex.: levetiracetam/brometo em cães) com retirada controlada (nunca suspender sem cobertura).',
        },
        {
          effect: 'Depressão respiratória aguda, hipotensão e intoxicação por superdosagem',
          frequency: 'uncommon',
          mechanism:
            'Depressão dose-dependente do tronco encefálico, centro respiratório e tônus vascular/miocárdico (parada respiratória ocorre em exposições ~4× menores que parada cardíaca). Progride de sonolência/ataxia (leve) → fraqueza/dificuldade de estação (moderada) → estupor, recumbência, hipoventilação e hipotensão (grave) → coma, apneia e choque (muito grave). Gatos intoxicados podem apresentar midríase.',
          clinicalManagement:
            'Não há antídoto específico (flumazenil NÃO reverte barbitúricos!). Priorizar ABC (via aérea, oxigênio, ventilação assistida, fluidoterapia/vasopressores); considerar carvão ativado em múltiplas doses SOMENTE com via aérea protegida, alcalinização urinária monitorada (Henderson–Hasselbalch) e hemodiálise nos quadros graves/refratários.',
        },
        {
          effect: 'Discrasias sanguíneas idiossincráticas (neutropenia, trombocitopenia, anemia/pancitopenia)',
          frequency: 'rare',
          mechanism:
            'Supressão medular idiossincrática ou destruição celular periférica imunomediada (alterações hematológicas relatadas em ~4,2% dos cães nos primeiros 3 meses de terapia em estudo específico — frequência que não equivale à incidência universal de pancitopenia grave). Em gatos, coagulopatias foram descritas em doses muito altas (10–40 mg/kg/dia).',
          clinicalManagement:
            'Realizar hemograma basal e a cada 6 meses (ou imediatamente se febre, petéquias, equimoses, sangramentos ou palidez). Em áreas endêmicas, descartar hemoparasitoses (ex.: Ehrlichia) antes de atribuir trombocitopenia automaticamente ao fármaco; se confirmada toxicidade medicamentosa, substituir sob proteção anticonvulsivante.',
        },
        {
          effect: 'Reações cutâneas graves, dermatite necrolítica superficial (SND) e hipersensibilidade felina',
          frequency: 'rare',
          mechanism:
            'Em cães, a SND associa-se a hepatopatia metabólica severa com lesões crostosas/ulcerativas em coxins e junções mucocutâneas (além de raros quadros de Stevens-Johnson). Em gatos, reações imunomediadas precoces incluem prurido facial intenso, edema distal de membros, febre, linfadenomegalia, pseudolinfoma e síndrome de hipersensibilidade anticonvulsivante.',
          clinicalManagement:
            'Qualquer lesão cutânea grave, edema facial/distal, hipertermia, linfadenomegalia ou deterioração sistêmica temporalmente ligada ao início do tratamento exige suspensão/substituição imediata sob cobertura anticonvulsivante alternativa e investigação hepática/hematológica.',
        },
      ],

      doseReductionGuidelines: [
        {
          clinicalCondition: 'Doença Renal Crônica (DRC — IRIS 1 a 4)',
          recommendedAdjustment:
            'NÃO existem reduções percentuais fixas validadas (25%, 50% ou 75%) por estágio IRIS. IRIS 1: sem corte percentual fixo; IRIS 2: individualizar por TDM e tolerabilidade; IRIS 3: monitorização sérica mais próxima pelo risco de retenção da fração renal; IRIS 4: avaliação especializada individualizada.',
          physiologicalRationale:
            'Aproximadamente 25% da dose é eliminada inalterada pelos rins (e ~75% como metabólitos urinários). Embora o metabolismo seja majoritariamente hepático, quedas importantes da taxa de filtração glomerular podem reduzir a depuração total e aumentar a exposição — por isso a titulação deve basear-se em TDM real, e não em percentuais arbitrários inventados.',
        },
        {
          clinicalCondition: 'Lesão Renal Aguda (LRA) com oligúria ou anúria',
          recommendedAdjustment:
            'Evitar titulação automática de doses crescentes; reavaliar depuração, nível sérico (TDM) e grau de sedação continuamente e considerar anticonvulsivante alternativo/adjuvante conforme balanço clínico.',
          physiologicalRationale:
            'Na oligúria/anúria aguda, a eliminação da fração renal inalterada (~25%) e de metabólitos cai abruptamente, podendo prolongar a meia-vida e somar-se à encefalopatia urêmica.',
        },
        {
          clinicalCondition: 'Hepatopatia Compensada vs. Insuficiência Hepática Descompensada',
          recommendedAdjustment:
            'Hepatopatia compensada: avaliar alternativas (levetiracetam; brometo em cães); se imprescindível, iniciar conservadoramente com monitorização próxima de TDM e função hepática. Insuficiência hepática descompensada/grave: contraindicado em insuficiência severa ou encefalopatia (evitar sempre que possível).',
          physiologicalRationale:
            'O fígado é o principal órgão de oxidação microssomal e conjugação do fenobarbital; perda da capacidade sintética e metabólica gera acúmulo sistêmico, sedação prolongada, agravamento da encefalopatia hepática e risco de fibrose progressiva.',
        },
        {
          clinicalCondition: 'Hipoalbuminemia significativa (enteropatias, nefropatias, hepatopatias)',
          recommendedAdjustment:
            'Iniciar de forma conservadora, monitorar sedação/ataxia clinicamente e interpretar concentrações séricas totais com cautela (evitar mirar o limite superior de 35 µg/mL).',
          physiologicalRationale:
            'O fenobarbital liga-se em ~45–50% às proteínas plasmáticas; reduções importantes da albumina aumentam a fração livre farmacologicamente ativa, podendo produzir toxicidade neurológica mesmo com concentração total aparentemente dentro da faixa de referência.',
        },
        {
          clinicalCondition: 'Pacientes Geriátricos e Caquéticos',
          recommendedAdjustment:
            'Iniciar na extremidade inferior da faixa posológica (ex.: 1,5 a 2,5 mg/kg a cada 12 horas conforme espécie e condição) e titular gradualmente pela resposta clínica e TDM.',
          physiologicalRationale:
            'Menor massa magra, alterações no volume de distribuição, menor reserva hepatorrenal e maior sensibilidade do SNC aos depressores GABAérgicos elevam o risco de sedação excessiva e ataxia.',
        },
        {
          clinicalCondition: 'Neonatos e Pacientes Pediátricos',
          recommendedAdjustment:
            'Não extrapolar diretamente doses adultas; calcular individualmente com monitorização estreita de respiração, temperatura e ganho ponderal.',
          physiologicalRationale:
            'Sistemas microssomais hepáticos e depuração renal ainda imaturos prolongam a meia-vida e amplificam a sensibilidade do SNC neonatal.',
        },
        {
          clinicalCondition: 'Obesidade acentuada',
          recommendedAdjustment:
            'Não há fórmula veterinária universal de correção por peso ideal validada para fenobarbital; iniciar criteriosamente considerando condição corporal e ajustar pelo TDM real aos 14 dias e 6 semanas.',
          physiologicalRationale:
            'O fenobarbital possui lipossolubilidade apenas moderada (Vd ~0,70–0,75 L/kg); calcular automaticamente sobre peso excessivo de gordura pode superestimar a dose, enquanto cortar arbitrariamente pode subdosar — o TDM resolve a incerteza.',
        },
        {
          clinicalCondition: 'Gestação e Lactação',
          recommendedAdjustment:
            'Avaliar rigorosamente risco de crises maternas não controladas (hipóxia fetal) versus exposição fetal/neonatal; manter a menor dose eficaz controlada por TDM e vigiar sedação/abstinência nos filhotes.',
          physiologicalRationale:
            'O fármaco atravessa a placenta e é excretado no leite materno em quantidades variáveis.',
        },
        {
          clinicalCondition: 'Autoindução Canina e Ajuste Proporcional por TDM (Steady State Estável)',
          recommendedAdjustment:
            'Realizar coleta entre 10 a 14 dias, reavaliação em 6 semanas e a cada 6 meses. Sob cinética estável e boa adesão, estimar ajuste teórico por Dose Nova = Dose Atual × (Nível Alvo ÷ Nível Atual), validando sempre com tolerabilidade e diário de crises.',
          physiologicalRationale:
            'A autoindução microssomal canina eleva o clearance semanas após o início (podendo cair t½ < 24 h). A fórmula proporcional serve apenas como guia matemático inicial (ex.: 3 mg/kg × 20/15 = 4 mg/kg q12h), jamais como ordem automática sem reavaliação clínica.',
        },
        {
          clinicalCondition: 'Protocolo de Retirada / Desmame Gradual Programado',
          recommendedAdjustment:
            'NUNCA interromper de forma súbita. Em desmame eletivo, adotar redução lenta de 20% a 25% a cada 2 a 4 semanas (25% da dose vigente q2sem: 100 → 75 → 56 → 42 mg; OU 25% da dose original/mês ao longo de 3–4 meses: 100 → 75 → 50 → 25 → 0 mg). Em hepatotoxicidade ou hipersensibilidade grave, acelerar sob cobertura imediata de anticonvulsivante substituto.',
          physiologicalRationale:
            'A retirada abrupta após exposição crônica precipita hiperexcitabilidade cortical rebote, clusters e status epilepticus letal. Além disso, a desindução enzimática persiste por até 4 semanas, elevando níveis de medicamentos associados.',
        },
        {
          clinicalCondition: 'Emergência Hospitalar (Status Epilepticus) — Fracionamento Seguro da Carga IV',
          recommendedAdjustment:
            'Em cães virgens: fracionar em bólus lentos de 3 a 4 mg/kg a cada 20 a 30 minutos (ou 4–8 mg/kg iniciais) até dose cumulativa de 12 a 20 mg/kg (máx. 20–24 mg/kg). Em gatos: 3–4 mg/kg IV lenta q20 min até 18–24 mg/kg/24h. Em cães já tratados cronicamente: apenas 4–6 mg/kg após coleta prévia de TDM.',
          physiologicalRationale:
            'O pico de concentração no SNC demora 15–20 minutos após a infusão IV; o fracionamento lento (≤ 1–2 mg/kg/min) previne empilhamento plasmático, apneia e colapso cardiovascular.',
        },
      ],

      drugInteractionsDetailed: [
        {
          drugOrClass: 'Benzodiazepínicos (diazepam, midazolam)',
          severity: 'major',
          clinicalEffect:
            'Risco alto na administração parenteral concomitante (status epilepticus): depressão respiratória, sedação profunda e hipotensão aditivas. No uso crônico oral, o fenobarbital acelera o metabolismo dos benzodiazepínicos reduzindo sua eficácia. Conduta: monitorar respiração, consciência e PA; NUNCA misturar na mesma seringa.',
          pharmacologicalMechanism:
            'Modulação sinérgica em sítios alostéricos distintos do receptor GABA-A (frequência + duração de abertura) no agudo; indução enzimática hepática no crônico; incompatibilidade físico-química direta em seringa.',
        },
        {
          drugOrClass: 'Propofol e anestésicos gerais (inalatórios e injetáveis)',
          severity: 'major',
          clinicalEffect:
            'Potencialização acentuada da depressão do SNC, hipoventilação/apneia e hipotensão transoperatória. Conduta: titular indutores lentamente "ao efeito", reduzir concentrações anestésicas quando aplicável e monitorar capnografia/PA rigorosamente.',
          pharmacologicalMechanism:
            'Depressão aditiva da excitabilidade neuronal e dos centros respiratório e vasomotor do tronco encefálico.',
        },
        {
          drugOrClass: 'Opioides (metadona, morfina, fentanil, buprenorfina, tramadol)',
          severity: 'major',
          clinicalEffect:
            'Depressão respiratória e sedação aditivas em pacientes suscetíveis (principalmente pós-carga IV ou em gatos). Conduta: titular doses de opioides com monitorização ventilatória e não misturar na mesma seringa com fenobarbital sódico.',
          pharmacologicalMechanism:
            'Somação farmacodinâmica sobre o centro respiratório bulbar; incompatibilidade química física com o pH alcalino do fenobarbital sódico.',
        },
        {
          drugOrClass: 'Levetiracetam (destaque clínico em cães)',
          severity: 'moderate',
          clinicalEffect:
            'A administração crônica de fenobarbital reduz a meia-vida do levetiracetam de liberação imediata em ~35–50% em cães, podendo gerar escape de crises no final do intervalo posológico. Conduta: a associação continua excelente na epilepsia refratária, mas requer reconhecer que o levetiracetam combinado tem cinética mais curta e pode exigir ajuste de dose/intervalo.',
          pharmacologicalMechanism:
            'Indução metabólica e aceleração da depuração do levetiracetam pelo fenobarbital crônico na espécie canina.',
        },
        {
          drugOrClass: 'Brometo de potássio (cães vs. contraindicação em gatos)',
          severity: 'major',
          clinicalEffect:
            'Em cães, oferece sinergismo anticonvulsivante valioso (~1/3 dos cães em politerapia consegue reduzir o nível de fenobarbital em ~33%), porém soma sedação e ataxia (neurotoxicidade). Em GATOS, o brometo é contraindicado pelo risco de pneumonite alérgica grave (35–42%). Conduta: monitorar ambos os níveis séricos em cães e jamais reproduzir a combinação em felinos.',
          pharmacologicalMechanism:
            'Ação inibitória aditiva sobre correntes de cloreto neuronais (sem competição pelo metabolismo hepático, já que o brometo é excretado por via renal).',
        },
        {
          drugOrClass: 'Zonisamida',
          severity: 'moderate',
          clinicalEffect:
            'Redução potencial da exposição sistêmica e da meia-vida da zonisamida quando coadministrada com fenobarbital em cães. Conduta: considerar doses na porção superior da faixa de zonisamida e monitorização sérica/clínica.',
          pharmacologicalMechanism:
            'Indução das enzimas hepáticas microssomais envolvidas no metabolismo da zonisamida.',
        },
        {
          drugOrClass: 'Cloranfenicol e cimetidina',
          severity: 'major',
          clinicalEffect:
            'Elevação rápida e clinicamente significativa das concentrações séricas de fenobarbital, podendo precipitar sedação profunda, ataxia e hepatotoxicidade. Conduta: evitar associação quando possível; se inevitável, reduzir/revisar dose e dosar TDM precocemente.',
          pharmacologicalMechanism:
            'Inibição potente das enzimas microssomais hepáticas (CYP) responsáveis pela hidroxilação do fenobarbital.',
        },
        {
          drugOrClass: 'Antifúngicos azólicos (cetoconazol, itraconazol, fluconazol)',
          severity: 'major',
          clinicalEffect:
            'Interação bidirecional complexa: inibição enzimática pelos azólicos eleva o fenobarbital (risco de toxicidade), enquanto a indução pelo fenobarbital reduz a concentração do antifúngico (risco de falha no tratamento de micoses sistêmicas). Conduta: monitorar eficácia antifúngica e dosar TDM de fenobarbital.',
          pharmacologicalMechanism:
            'Competição entre inibição microssomal pelos azólicos e indução enzimática hepática sustentada pelo fenobarbital.',
        },
        {
          drugOrClass: 'Corticosteroides (prednisolona, prednisona, dexametasona)',
          severity: 'moderate',
          clinicalEffect:
            'Aceleração do metabolismo hepático do corticosteroide com possível redução de eficácia clínica e interferência potencial no teste de supressão por baixa dose de dexametasona (LDDST), além de somação na elevação da FA canina. Conduta: monitorar resposta terapêutica e interpretar testes adrenais com cautela.',
          pharmacologicalMechanism:
            'Indução de enzimas microssomais hepáticas que biotransformam glicocorticoides.',
        },
        {
          drugOrClass: 'Ciclosporina',
          severity: 'major',
          clinicalEffect:
            'Queda expressiva da concentração sanguínea de ciclosporina com risco de falha imunossupressora em doenças imunomediadas críticas (ex.: IMHA, MUE, atopia severa). Conduta: monitorar resposta clínica e níveis séricos de ciclosporina, ajustando dose se necessário.',
          pharmacologicalMechanism:
            'Forte indução das vias oxidativas hepáticas (CYP) que depuram a ciclosporina.',
        },
        {
          drugOrClass: 'Doxiciclina, metronidazol, teofilina/aminofilina e propranolol',
          severity: 'moderate',
          clinicalEffect:
            'Redução da meia-vida e da exposição plasmática desses fármacos durante uso crônico de fenobarbital, podendo comprometer eficácia antimicrobiana, broncodilatadora ou antiarrítmica. Conduta: acompanhar resposta clínica e considerar alternativas ou ajuste de intervalo.',
          pharmacologicalMechanism:
            'Aumento do clearance hepático por indução microssomal sustentada.',
        },
        {
          drugOrClass: 'Levotiroxina e testes da função tireoidiana (T4 total, T4 livre, TSH)',
          severity: 'moderate',
          clinicalEffect:
            'Queda de T4 total e T4 livre com TSH variável em cães eutireoideus, podendo levar a diagnóstico falso-positivo de hipotireoidismo ou necessidade de revisão de dose em hipotireoideus tratados. Conduta: não tratar T4 isolado sem sinais clínicos compatíveis.',
          pharmacologicalMechanism:
            'Aceleração da depuração periférica e hepática dos hormônios tireoidianos.',
        },
        {
          drugOrClass: 'Carprofeno / hepatotóxicos & Fenômeno de Desindução Pós-Retirada',
          severity: 'moderate',
          clinicalEffect:
            'Potencial somação de risco hepático com fármacos hepatotóxicos (evidência veterinária limitada para carprofeno — monitorar fígado). ATENÇÃO NA RETIRADA: a desindução enzimática leva até 4 semanas após reduzir ou suspender o fenobarbital; medicamentos concomitantes (ex.: ciclosporina, corticoides, outros anticonvulsivantes) podem elevar suas concentrações séricas e causar toxicidade tardia sem mudança de dose.',
          pharmacologicalMechanism:
            'Retorno gradual da expressão basal das enzimas microssomais hepáticas ao longo de semanas após cessar o estímulo indutor.',
        },
      ],
    },

    generalInfoData: {
      routesDetailed: [
        {
          route: 'Via Oral (VO — padrão de manutenção crônica)',
          technique:
            'Administrar comprimidos (50 ou 100 mg) ou solução oral 40 mg/mL (40 gotas/mL = 1 mg/gota no gotejador original; preferir seringa oral graduada para volumes fracionários em cães < 10–12 kg e gatos) rigorosamente a cada 12 horas em horários fixos, com ou sem alimento (manter rotina consistente; oferecer junto à refeição se houver náusea em jejum).',
          nursingCare:
            'Orientar diário estruturado de crises. Uma dose esquecida isoladamente raramente precipita crise imediata devido à meia-vida longa, mas omissões repetidas derrubam o nível sérico — administrar assim que lembrado e jamais dobrar a dose seguinte sem avaliação.',
          limitations:
            'Início gradual (Tmax 4–8 h em cães; steady state em 10–14 dias sem carga); não é via de resgate imediato no status epilepticus.',
        },
        {
          route: 'Via Enteral / Administração por Sonda',
          technique:
            'A solução oral 40 mg/mL facilita a passagem em sondas enterais de pequeno calibre quando mensurada em seringa graduada (lavar a sonda antes e depois). Comprimidos convencionais só devem ser triturados avaliando recuperação completa da dose e risco de obstrução do lúmen.',
          nursingCare:
            'Avaliar tolerância aos excipientes da solução oral comercial (álcool etílico e propilenoglicol), especialmente em gatos e filhotes. NUNCA preparar suspensões caseiras improvisadas sem conhecer concentração final e estabilidade.',
          limitations: 'Risco de entupimento de sondas finas com comprimidos triturados e variabilidade na recuperação da dose.',
        },
        {
          route: 'Via Intravenosa Lenta (IV — emergência hospitalar / status epilepticus)',
          technique:
            'Confirmar acesso IV pérvio e exclusivo. Conferir equivalência sal vs. base ANTES de aspirar: Fenocris® contém 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL de fenobarbital base; ex.: cão 10 kg a 4 mg/kg base = 40 mg → 40 ÷ 91,35 = 0,438 mL). Infundir a ≤ 1–2 mg/kg/min (ex.: cão 10 kg = 10 mg/min → 40 mg em ≥ 4 min; NÃO aplicar teto humano de 60 mg/min) e aguardar 20 minutos completos entre incrementos.',
          nursingCare:
            'Monitorar os 11 parâmetros críticos: FR, padrão ventilatório, SpO₂, EtCO₂, ECG, PA, temperatura, glicemia, eletrólitos, nível de consciência e vigilância para status epilepticus não convulsivo (ausência de tremores não prova cessação da descarga cerebral). Lavar cateter com SF 0,9% antes e depois.',
          limitations:
            'Alto risco de apneia, hipotensão e depressão miocárdica se infundido rápido; extravasamento causa necrose tecidual (pH 8,5–10,5); incompatível na seringa com benzodiazepínicos e soluções ácidas.',
        },
        {
          route: 'Via Intramuscular (IM — alternativa hospitalar selecionada)',
          technique:
            'Reservar para situações selecionadas sem acesso IV disponível (ex.: suplementação pontual de 4–6 mg/kg em paciente crônico ou contingência inicial), aplicando profundamente em massa muscular.',
          nursingCare:
            'Vigiar dor e irritação local no sítio de aplicação (solução alcalina) e reavaliar clinicamente, pois a absorção é menos previsível e mais lenta em pacientes hipotensos, chocados ou hipoperfundidos.',
          limitations: 'Dor tecidual importante e menor precisão de titulação em comparação à via intravenosa.',
        },
        {
          route: 'Via Subcutânea (PROIBIDA) & Via Transdérmica Felina (Experimental)',
          technique:
            'Via SC: formalmente PROIBIDA pelo risco de inflamação severa e necrose tecidual (pH 8,5–10,5). Via transdérmica auricular em gatos (gel PLO 9 mg/kg q12h): uso estritamente experimental/excepcional quando a VO é absolutamente impossível.',
          nursingCare:
            'Caso ocorra extravasamento perivascular inadvertido na via IV, interromper imediatamente, avaliar o membro e manejar lesão alcalina local. Em uso transdérmico excepcional em gatos, intensificar TDM e inspecionar eritema/dermatite auricular.',
          limitations: 'SC: lesão tecidual grave. Transdérmica: absorção errática (pior em Lipoderm®), NÃO intercambiável com a via oral.',
        },
      ],
      dilutionGuide: {
        compatibleFluids: [
          'REGRA DE SEGURANÇA: Não cadastrar fluidos como "universalmente compatíveis" nem presumir estabilidade de 24 horas após diluição sem validação institucional da concentração e apresentação.',
          'SF 0,9% é utilizado em protocolos hospitalares específicos de diluição e lavagem de acesso; SG 5% e Ringer Lactato também aparecem em protocolos hospitalares selecionados (ex.: manuais hospitalares universitários brasileiros), porém a compatibilidade depende estritamente do pH, marca e diluição final.',
          'Preferir administração em acesso exclusivo com lavagem cuidadosa de SF 0,9% antes e depois da infusão lenta.',
          'Equivalência obrigatória no preparo (Fenocris®): 100 mg/mL fenobarbital sódico = 91,35 mg/mL fenobarbital base (ex.: 40 mg base = 0,438 mL). ATENÇÃO: Carbital® injetável possui 200 mg/mL — nunca trocar marcas sem recalcular.',
        ],
        incompatibleFluids: [
          'PROIBIDO misturar na mesma seringa ou linha sem lavagem com: diazepam, midazolam, buprenorfina, cetamina, fentanil, morfina, meperidina, noradrenalina, dobutamina, insulina regular, ciclosporina, difenidramina, hidralazina, succinato de hidrocortisona, oxitetraciclina e fenotiazínicos.',
          'PROIBIDO misturar com soluções de pH ácido: ocorre precipitação imediata do fenobarbital na forma ácida pouco solúvel.',
          'Administrar outros anticonvulsivantes (ex.: levetiracetam IV, midazolam) sempre separadamente com lavagem prévia do acesso.',
        ],
        infusionRateGuidance:
          'Velocidade máxima veterinária: ≤ 1–2 mg/kg/min por via IV lenta (ex.: cão de 10 kg → 10 mg/min; uma dose de 40 mg exige ≥ 4 minutos de infusão). Aguardar 20 minutos entre incrementos antes de repetir. ATENÇÃO: o teto humano de bula (60 mg/min) NÃO se aplica a cães pequenos e gatos.',
        preparationNotes:
          'Fenocris® injetável é solução pronta para administração IM/IV contendo fenobarbital sódico, propilenoglicol e excipientes (pH 8,5–10,5). Inspecionar visualmente antes do uso e descartar se houver turbidez, precipitado ou alteração de cor. Em gatos, atentar ao veículo propilenoglicol em exposições elevadas/prolongadas (sem que toda dose isolada produza toxicidade). Não presumir estabilidade de 24 h pós-diluição; ampolas são de uso único. Referência magistral oral internacional: suspensão extemporânea a 10 mg/mL em ORA-Blend® manteve potência por 115 dias em frasco âmbar à temperatura ambiente (no Brasil, preferir solução oral industrializada 40 mg/mL em seringa graduada quando adequada ao peso).',
        storageRequirements:
          'Comprimidos, solução oral e ampolas injetáveis: conservar entre 15–30 °C (20–25 °C idealmente para comprimidos), protegidos da luz e umidade, em armário trancado conforme legislação de substâncias sob controle especial.',
      },
      pharmacologicalClassification: {
        chemicalClass:
          'Barbitúrico — Ácido 5-etil-5-fenilbarbitúrico (C₁₂H₁₂N₂O₃ • 232,24 g/mol base | 254,22 g/mol sal sódico anidro)',
        chemicalClassDescription:
          'Ácido fraco (pKa ≈ 7,3–7,41; ponto de fusão 174–178 °C) com substituintes etil e fenil no carbono 5. Lipossolubilidade moderada (inferior à de barbitúricos ultracurtos como tiopental → entrada mais gradual no SNC), solubilidade muito limitada em água na forma ácida (base) e elevada na forma de sal sódico alcalino (pH 8,5–10,5). Apresentações orais usam fenobarbital base; injetáveis usam fenobarbital sódico (Fenocris® 100 mg/mL sal = 91,35 mg/mL base).',
        therapeuticClass: 'Anticonvulsivante / Antiepiléptico barbitúrico de longa duração',
        therapeuticClassDescription:
          'Modulador alostérico positivo dos receptores GABA-A com longa meia-vida, elevação sustentada do limiar convulsivo e sem atividade analgésica intrínseca clinicamente relevante.',
        atcCode: 'N03AA02',
        receptorTargets: [
          'Receptor GABA-A (sítio alostérico barbitúrico — prolonga a duração de abertura do canal de Cl⁻, distinto do sítio do GABA e dos benzodiazepínicos)',
          'Receptor GABA-A em concentrações elevadas (facilitação intensa e ativação direta GABA-independente — explica depressão bulbar/anestésica)',
          'Receptores glutamatérgicos AMPA (inibição funcional secundária descrita experimentalmente — NÃO se comporta clinicamente como antagonista AMPA seletivo)',
          'Canais de cálcio pré-sinápticos e sistemas reguladores da excitabilidade (modulação secundária dependente de concentração reduzindo liberação de neurotransmissores excitatórios)',
          'Ausência de alvo analgésico intrínseco (sedação por fenobarbital NÃO bloqueia nocicepção)',
        ],
      },
      prescriptionType: {
        category: 'Receita de Controle Especial em 2 vias (Lista B1 com adendo expresso — NÃO usa Notificação B azul)',
        ordinanceOrLaw:
          'Portaria SVS/MS nº 344/1998 (Lista B1 — Adendo Fenobarbital) • Confirmada pela RDC ANVISA nº 1.023, de 11/05/2026',
        retentionRequired: true,
        guidelines:
          'Emitir Receita de Controle Especial (branca) em 2 vias com retenção de 1 via na farmácia, validade usual de 30 dias e quantidade para até 60 dias de tratamento, contendo identificação completa do prescritor (CRMV), paciente e responsável. ' +
          'MODELO DIDÁTICO DE PRESCRIÇÃO CONTROLADA (exemplo manutenção canina 10 kg a 2,5 mg/kg q12h — não substitui avaliação individual): ' +
          '[RECEITA DE CONTROLE ESPECIAL — 2 VIAS] Paciente: [Nome] | Espécie: Canina | Peso: 10 kg | Responsável: [Dados]. USO ORAL: 1) Fenobarbital solução oral 40 mg/mL — frasco de 20 mL (Quantidade para 60 dias: 4 frascos). Administrar 0,625 mL (25 mg) por via oral, a cada 12 horas (08:00 e 20:00), continuamente. Recomendações: não interromper abruptamente nem alterar dose sem reavaliação; retornar para TDM em 14 dias e 6 semanas, além de hemograma e perfil hepático; procurar emergência diante de crise > 5 min, clusters, sedação intensa, dispneia, icterícia ou deterioração clínica.',
      },
      speciesPeculiarities: [
        {
          species: 'dog',
          title: 'Autoindução microssomal intensa, FA elevada benigna e interação com levetiracetam',
          description:
            'Cães absorvem ~90% por via oral (Tmax 4–8 h; Vd ~0,75 L/kg; t½ típica 37–75 h, média ~53 h, podendo cair < 24 h por autoindução ou ~24–26 h sob dietas restritas em proteína/gordura). Desenvolvem autoindução enzimática hepática nas primeiras 6 semanas a 6 meses — derrubando concentrações séricas mesmo sem alterar a dose — e elevam frequentemente a fosfatase alcalina (~36% das dosagens em Despa et al., 2026), além de discreta elevação de ALT/GGT e queda transitória de albumina nos 6 primeiros meses sem dano estrutural. Contudo, exposição > 1 ano ou níveis > 35–40 µg/mL elevam o risco de hepatotoxicidade verdadeira (fibrose portal em ponte/regeneração nodular). Acelera em 35–50% a depuração do levetiracetam e interage sinergicamente com o brometo de potássio.',
          clinicalImplications:
            'Iniciar em 2,5–3 mg/kg VO q12h; realizar TDM em vale em tubo sem gel aos 14 dias, 6 semanas e q6m (alvo 15–35 µg/mL), controlando lipemia (7% de falha analítica). Nunca suspender apenas por FA elevada sem investigar ácidos biliares, albumina persistente, bilirrubina, AST e ultrassonografia. Não suplementar levotiroxina apenas por T4 baixo em cão assintomático.',
        },
        {
          species: 'cat',
          title: 'Ausência de indução enzimática típica, alta sensibilidade respiratória e hipersensibilidade precoce',
          description:
            'Gatos exibem absorção oral descrita como praticamente completa (Vd ~0,70 L/kg; t½ ~34–56 h, média ~43 h; steady state em 9–15 dias) e alta resposta clínica (93% controle e 43% sem crises entre 15–45 µg/mL em Finnerty et al., 2014). Diferente dos cães, felinos NÃO desenvolvem indução enzimática hepática típica (Hermans et al., 2022) — elevações de ALT ou FA (observadas em gatos com níveis > 30 µg/mL) nunca devem ser descartadas como adaptação benigna. São marcadamente mais suscetíveis à depressão respiratória barbitúrica na via IV, aos excipientes (propilenoglicol em altas exposições), à midríase na intoxicação e a reações imunomediadas precoces (prurido facial, edema distal, febre, pseudolinfoma, citopenias e coagulopatia em doses excessivas).',
          clinicalImplications:
            'Iniciar em 1,5–3 mg/kg VO q12h com alvo sérico conservador de 23–30 µg/mL após investigar causas estruturais/metabólicas. Investigar ativamente qualquer aumento de ALT ou FA; monitorar hemograma e pele nas primeiras semanas; JAMAIS usar brometo de potássio como adjuvante em gatos (pneumonite alérgica em 35–42%); na via IV, fracionar 3–4 mg/kg q20 min sob estrita vigilância ventilatória.',
        },
      ],
      curiositiesAndHistory: [
        'Introduzido na prática médica em 1912 (Luminal®), é o anticonvulsivante mais antigo ainda em uso clínico mundial contínuo, mantendo status de primeira linha na neurologia veterinária mais de um século depois.',
        'A equação de Henderson–Hasselbalch aplicada ao fenobarbital (pKa ≈ 7,4) é um clássico da toxicologia clínica: a alcalinização urinária ioniza o ácido fraco no filtrado tubular, impedindo sua reabsorção passiva e acelerando sua excreção renal em intoxicações graves.',
        'Na farmacopeia histórica norte-americana, comprimidos de fenobarbital eram medidos em "grains" (1 gr ≈ 64,8 mg), razão pela qual ainda existem comprimidos de 16,2 mg, 32,4 mg e 64,8 mg nos EUA e o alerta permanente para nunca abreviar "gr" (confundível com gramas).',
      ],
    },

    practicalWeightTable: {
      standardDoseText:
        'Referência matemática para manutenção canina inicial em 2,5 mg/kg VO q12h (antes do ajuste individual por apresentação). Os valores fracionários (*) NÃO autorizam cortar comprimidos em décimos/quintos nem administrar meia gota — usar seringa oral graduada com solução 40 mg/mL (ou manipulação) para cães pequenos e gatos.',
      headers: [
        'Peso Corporal',
        'Dose por Tomada (2,5 mg/kg)',
        'Solução Oral 40 mg/mL',
        'Gotas Teóricas (1 mg/gota)',
        'Equiv. Comprimido 50 mg',
      ],
      rows: [
        { weight: '2 kg', totalDose: '5 mg q12h', col1: '0,125 mL', col2: '5 gotas', col3: '0,1 comp* (usar solução)' },
        { weight: '4 kg', totalDose: '10 mg q12h', col1: '0,250 mL', col2: '10 gotas', col3: '0,2 comp* (usar solução)' },
        { weight: '5 kg', totalDose: '12,5 mg q12h', col1: '0,313 mL', col2: '12,5* (usar seringa)', col3: '0,25 comp* (usar solução)' },
        { weight: '10 kg', totalDose: '25 mg q12h', col1: '0,625 mL', col2: '25 gotas', col3: '1/2 comp (25 mg)' },
        { weight: '15 kg', totalDose: '37,5 mg q12h', col1: '0,938 mL', col2: '37,5* (usar seringa)', col3: '3/4 comp* (preferir solução)' },
        { weight: '20 kg', totalDose: '50 mg q12h', col1: '1,250 mL', col2: '50 gotas', col3: '1 comp (50 mg)' },
        { weight: '30 kg', totalDose: '75 mg q12h', col1: '1,875 mL', col2: '75 gotas', col3: '1 e 1/2 comp (75 mg)' },
        { weight: '40 kg', totalDose: '100 mg q12h', col1: '2,500 mL', col2: '100 gotas', col3: '2 comp 50 mg (ou 1 comp 100 mg)' },
      ],
      dropletCalibrator: {
        title: 'Calibrador da Solução Oral 40 mg/mL & Conversão Injetável (Fenocris® vs. Carbital®)',
        concentration: 'Solução Oral 40 mg/mL (Fenocris® / Gardenal®): 40 gotas/mL = 1 mg/gota no gotejador original',
        dropletRatio:
          '0,10 mL = 4 mg (4 gts) | 0,20 mL = 8 mg (8 gts) | 0,25 mL = 10 mg (10 gts) | 0,50 mL = 20 mg (20 gts) | 0,75 mL = 30 mg (30 gts) | 1,00 mL = 40 mg (40 gts) | 1,25 mL = 50 mg (50 gts)',
        practicalRule:
          'Preferir seringa oral graduada para volumes fracionários; NÃO aplicar o fator de 40 gotas/mL a soluções manipuladas ou outros gotejadores sem conferir bula.',
        note:
          'Cálculo exclusivamente oral. Na via IV hospitalar, Fenocris® contém 100 mg/mL de fenobarbital sódico (= 91,35 mg/mL base; ex.: 40 mg base = 0,438 mL) e Carbital® injetável possui 200 mg/mL — conferir sempre rótulo, forma química e unidade do protocolo.',
      },
    },

    genericBrandsNote:
      'No Brasil, não há marca veterinária de fenobarbital registrada no MAPA regularmente confirmada; utilizam-se especialidades humanas extrabula sob Receita de Controle Especial em 2 vias (Lista B1 com adendo — RDC ANVISA nº 1.023/2026): Fenocris® (comp. 100 mg, sol. oral 40 mg/mL e injetável 100 mg/mL de sal sódico = 91,35 mg/mL base — Cristália), Gardenal® (50/100 mg e 40 mg/mL — Pharlab; confirmar disponibilidade após transferência de titularidade em 07/2026), Carbital® (comp. 100 mg e injetável 200 mg/mL — Teuto — NÃO presumir equivalência de volume com Fenocris®) e genéricos.',

    clinicalWarningItems: [
      {
        label: '1. Não suspender abruptamente:',
        text: 'A descontinuação súbita em manutenção crônica pode precipitar crises de rebote, agrupamentos e status epilepticus fatal. Realizar sempre retirada gradual (25% da dose vigente q2sem ou 25% da dose original/mês por 3–4 meses) ou substituição coberta em casos de toxicidade grave.',
      },
      {
        label: '2. Não titular exclusivamente por mg/kg:',
        text: 'A exposição sistêmica varia amplamente entre indivíduos — no estudo real-world de Despa et al. (2026), não houve correlação linear entre dose em mg/kg/dia e nível sérico. Integrar sempre diário de crises, tolerabilidade e TDM.',
      },
      {
        label: '3. Não confundir sedação com eficácia (nem com analgesia):',
        text: 'O efeito anticonvulsivante não exige sedação intensa — sedação persistente ou progressiva após 2 semanas indica excesso de exposição ou comorbidade. Além disso, o fenobarbital não tem efeito analgésico intrínseco.',
      },
      {
        label: '4. FA elevada em cães ≠ hepatite automaticamente:',
        text: 'Indução enzimática microssomal eleva FA (~36% das dosagens) e discretamente ALT/GGT sem lesão funcional. Nunca suspender o fármaco apenas por FA isolada sem avaliar ácidos biliares, albumina persistente, bilirrubina, AST e ultrassonografia.',
      },
      {
        label: '5. Gato não é cão pequeno:',
        text: 'Felinos não fazem indução enzimática hepática típica (Hermans et al., 2022 — investigar qualquer ALT/FA alta), têm alta sensibilidade à depressão respiratória barbitúrica/propilenoglicol, sofrem hipersensibilidade cutânea/hematológica precoce e têm contraindicação absoluta ao brometo como adjuvante.',
      },
      {
        label: '6. A primeira dosagem (14 d) não é a única — e atenção ao tubo e à lipemia:',
        text: 'Em cães, a autoindução microssomal pode derrubar a concentração sérica semanas após o início (recoleta obrigatória em 6 semanas e q6m). Usar tubo seco SEM gel separador (silicone adsorve o fármaco) e jejum para evitar falha por lipemia (7% das amostras em Despa et al., 2026).',
      },
      {
        label: '7. Fenobarbital altera múltiplos medicamentos (na introdução e na retirada):',
        text: 'Reduz em 35–50% a t½ do levetiracetam em cães e diminui a exposição a ciclosporina, corticoides, azólicos, doxiciclina e zonisamida. Ao desmamar o fenobarbital, a desindução (até 4 semanas) pode elevar os níveis dos fármacos associados.',
      },
      {
        label: '8. Via SC proibida & incompatibilidade físico-química em seringa:',
        text: 'Soluções parenterais alcalinas (pH 8,5–10,5) causam inflamação grave e necrose por via SC ou extravasamento. Nunca misturar na mesma seringa com diazepam, midazolam, opioides, catecolaminas ou soluções ácidas.',
      },
      {
        label: '9. Carga IV exige velocidade ≤ 1–2 mg/kg/min, espera de 20 min e conferência sal/base:',
        text: 'Não aplicar o teto humano de 60 mg/min em cães pequenos/gatos; aguardar 20 min entre incrementos (pico no SNC em 15–20 min); conferir Fenocris® (100 mg/mL sal = 91,35 mg/mL base) vs. Carbital® (200 mg/mL).',
      },
      {
        label: '10. Concentração sérica nunca substitui o diário de crises:',
        text: 'Controle clínico e tolerabilidade são os desfechos primários: um animal perfeitamente controlado a 12 µg/mL não deve ter dose aumentada automaticamente, enquanto um animal com 37–45 µg/mL exige vigilância rigorosa para toxicidade.',
      },
    ],

    monitoringParameters: [
      'Diário estruturado de crises (data, duração, fenomenologia focal/generalizada, período pós-ictal, gatilhos e escore de sedação/ataxia) — principal desfecho clínico ao lado da tolerabilidade.',
      'Cronograma de TDM (dosagem sérica): Dia 0 (basal clínico/laboratorial sem TDM) → 14 dias (1º steady state) → 6 semanas (detecção de autoindução canina) → a cada 6 meses em manutenção, além de 2–3 semanas após qualquer ajuste de dose, perda de controle ou introdução/retirada de fármacos que interajam.',
      'Técnica pré-analítica do TDM: padronizar amostra de VALE (imediatamente antes da próxima dose — crucial em doses ≥ 5 mg/kg q12h), coletar em tubo SEM gel separador (evitar adsorção ao silicone) e observar jejum para prevenir falha analítica por lipemia (7% das amostras em Despa et al., 2026).',
      'Alvos séricos e interpretação clínica: cães 15–35 µg/mL; gatos alvo conservador 23–30 µg/mL (controle descrito 15–45 µg/mL). Matriz prática: 12 µg/mL sem crises → não subir automaticamente; 12 µg/mL com crises → checar adesão e titular; 25 µg/mL controlado → manter; 25 µg/mL com crises → investigar etiologia/adesão/politerapia; 37 µg/mL controlado → vigiar risco hepático e alternativas; 45 µg/mL com sedação/ataxia → reavaliação urgente por toxicidade.',
      'Perfil hepático basal e semestral (FA, ALT, AST, GGT, albumina, bilirrubina total, ureia, glicemia e ácidos biliares pré/pós-prandiais + coagulograma/US hepático se suspeita de hepatotoxicidade). Em cães, separar indução benigna de falha funcional; em gatos, investigar qualquer elevação de ALT ou FA.',
      'Hemograma completo basal e a cada 6 meses (ou imediato se febre, petéquias, equimoses, palidez ou mucosas alteradas) para rastreio precoce de neutropenia, trombocitopenia, anemia ou pancitopenia idiossincrática.',
      'Peso corporal, escore de condição corporal, triglicerídeos e interpretação crítica de exames endócrinos (T4 total/livre, TSH e LDDST — evitar diagnóstico falso-positivo de hipotireoidismo ou pancreatite sem clínica compatível).',
      'Vigilância dermatológica e imunológica precoce (especialmente em gatos nas primeiras semanas): prurido facial, edema distal de membros, febre, linfadenomegalia ou lesões crostosas em coxins/junções mucocutâneas (SND em cães).',
      'Monitorização hospitalar em emergências IV (11 parâmetros): FR, padrão/amplitude respiratória, SpO₂, EtCO₂, ECG, pressão arterial, temperatura, glicemia, eletrólitos, nível de consciência e vigilância para status epilepticus não convulsivo.',
    ],

    clientInformation: [
      'Medicamento sujeito a controle especial no Brasil (Receita de Controle Especial em 2 vias — Lista B1 com adendo; confirmada pela RDC ANVISA nº 1.023/2026). Guarde em local seguro e trancado, fora do alcance de crianças e animais.',
      'NUNCA interrompa o fenobarbital repentinamente nem mude a dose por conta própria: a parada súbita pode causar convulsões contínuas muito graves com risco de morte (status epilepticus).',
      'Administre rigorosamente a cada 12 horas nos mesmos horários (com ou sem comida, mantendo o mesmo padrão; oferecer com pequena refeição se houver náusea). Se esquecer uma dose, dê assim que lembrar e retome o horário normal sem dobrar a dose seguinte.',
      'Para cães pequenos e gatos usando solução oral 40 mg/mL, utilize preferencialmente seringa oral graduada conforme orientação veterinária (no gotejador original de Fenocris®/Gardenal®, 1 gota = 1 mg — não usar conta-gotas trocado nem tentar pingar meia gota).',
      'Sonolência e andar cambaleante são comuns nas primeiras 1–2 semanas e costumam melhorar; aumento de fome, sede e urina tendem a persistir — controle rigorosamente a quantidade de ração para evitar obesidade e mantenha água fresca disponível.',
      'Anote todas as crises em um diário (data, duração, filmagem e recuperação) e compareça às coletas de sangue programadas (14 dias, 6 semanas e a cada 6 meses, preferencialmente em jejum e antes da dose da manhã).',
      'Procure pronto-atendimento veterinário imediatamente em caso de crise com duração > 5 minutos, duas ou mais crises em 24 horas, sonolência extrema/dificuldade para respirar, vômitos persistentes, mucosas amareladas (icterícia), manchas roxas/sangramentos ou coceira/inchaço facial em gatos.',
    ],

    clinicalFoundationsData: [
      {
        id: 'found-feno-moa-se-systems',
        title: 'Mecanismo molecular no receptor GABA-A, eficácia quando benzodiazepínicos falham e farmacodinâmica por sistemas',
        narrative:
          'O equilíbrio elétrico encefálico depende do balanço dinâmico entre glutamato (excitatório) e GABA (inibitório). Uma crise epiléptica ocorre quando redes neuronais disparam de forma excessiva ou anormalmente sincronizada. O fenobarbital liga-se a um sítio alostérico barbitúrico no receptor GABA-A pentamérico — distinto tanto do sítio do GABA quanto do sítio dos benzodiazepínicos — seguindo uma sequência molecular clara: (1) ligação do GABA ao receptor, (2) modulação alostérica pelo fenobarbital, (3) prolongamento da duração de abertura do canal de Cl⁻ (enquanto benzodiazepínicos aumentam sobretudo a frequência de aberturas), (4) aumento da condutância inibitória (hiperpolarização e inibição por derivação elétrica / shunting inhibition), (5) menor geração e propagação de potenciais excitatórios e (6) elevação do limiar convulsivo. Em altas concentrações, promove ativação direta GABA-independente, reduzindo a margem de segurança (depressão respiratória e coma). Embora experimentos descrevam inibição funcional secundária de receptores AMPA e canais pré-sinápticos de Ca²⁺, o fenobarbital NÃO se comporta clinicamente como antagonista AMPA seletivo. Durante o status epilepticus prolongado, ocorre internalização de receptores GABA-A sinápticos sensíveis a benzodiazepínicos e intensificação glutamatérgica (NMDA/AMPA); por atuar em sítio distinto, o fenobarbital preserva eficácia como agente de segunda linha (sem impedir que casos refratários exijam politerapia precoce com levetiracetam, cetamina ou anestésicos). Sistemicamente, produz efeitos neurológicos (anticonvulsão/sedação/ataxia), respiratórios (depressão bulbar), cardiovasculares (hipotensão IV), hepáticos (indução/hepatotoxicidade), renais (excreção parcial dependente de pH), endócrinos (T4/corticoides), digestivos (polifagia), hematológicos (citopenias raras), metabólicos (triglicerídeos) e comportamentais (excitação paradoxal) — lembrando sempre que o fenobarbital NÃO é analgésico e não substitui opioides ou bloqueios em procedimentos dolorosos.',
        narrativeHighlights: [
          'sítio alostérico barbitúrico',
          'prolongamento da duração de abertura do canal de Cl⁻',
          'internalização de receptores GABA-A sinápticos sensíveis a benzodiazepínicos',
          'NÃO se comporta clinicamente como antagonista AMPA seletivo',
          'fenobarbital NÃO é analgésico',
        ],
        referenceIds: ['ref-acvim-se-2024', 'ref-plumb-10', 'ref-ettinger-9e', 'ref-dewey-neuro-3e'],
        studies: [],
      },
      {
        id: 'found-feno-tdm-realworld',
        title: 'Protocolo completo de monitorização sérica (TDM), autoindução, cálculo de ajuste e evidência real-world (2026)',
        narrative:
          'A monitorização terapêutica sérica (TDM) é pilar central no uso do fenobarbital. Os intervalos preferenciais são 15–35 µg/mL em cães e alvo conservador de 23–30 µg/mL em gatos (com controle retrospectivo relatado em 15–45 µg/mL; valores > 35 µg/mL em cães aumentam o risco de hepatotoxicidade, mas nenhum corte substitui a avaliação clínica). O cronograma estruturado compreende: Dia 0 (hemograma e bioquímica hepática basais, sem TDM), 14 dias (1º steady state — 5 meias-vidas de 53 h ≈ 11 dias), 6 semanas (detecção de queda sérica por autoindução hepática canina) e a cada 6 meses (além de 2–3 semanas após ajustes ou interações). Deve-se padronizar coleta em VALE (imediatamente antes da dose seguinte, indispensável em doses ≥ 5 mg/kg q12h), utilizar tubo seco SEM gel separador (silicone adsorve o fármaco) e observar jejum para minimizar falha analítica por lipemia. Interpretação prática em 6 cenários: 12 µg/mL sem crises há meses → não subir automaticamente; 12 µg/mL com crises frequentes → checar adesão/coleta e titular; 25 µg/mL controlado → manter se tolerado; 25 µg/mL com crises → revisar diagnóstico, adesão e politerapia; 37 µg/mL controlado → ponderar risco hepático e alternativas; 45 µg/mL com sedação/ataxia → reavaliar urgentemente por toxicidade. Em cinética estável, a estimativa matemática é Dose_nova = Dose_atual × (C_alvo ÷ C_atual) — exemplo: cão em 3 mg/kg q12h com 15 µg/mL visando 20 µg/mL → 3 × (20 ÷ 15) = 4 mg/kg q12h (guia teórico, não ordem automática, sujeito a nova autoindução). Conversão de unidades: µmol/L × 0,232 = µg/mL. O estudo observacional real-world de Despa et al. (novembro de 2026; 66 cães, 143 amostras) comprovou ausência de correlação linear entre dose mg/kg/dia e nível sérico, 7% de falha analítica por lipemia, ~36% de FA elevada sem correlação com nível sérico e apenas ~40% de adesão ao TDM nos primeiros 90 dias.',
        narrativeHighlights: [
          '15–35 µg/mL em cães',
          '23–30 µg/mL em gatos',
          'Dia 0',
          '14 dias',
          '6 semanas',
          'tubo seco SEM gel separador',
          'Dose_nova = Dose_atual × (C_alvo ÷ C_atual)',
          '7% de falha analítica por lipemia',
        ],
        referenceIds: ['ref-despa-2026', 'ref-ivetf-2015', 'ref-plumb-10', 'ref-dewey-neuro-3e'],
        studies: [
          {
            citation: 'Despa A et al. Life 2026;16(11):1858 (publicado em 02/11/2026)',
            referenceId: 'ref-despa-2026',
            sourceType: 'Estudo observacional retrospectivo real-world (66 cães / 143 amostras)',
            summaryText:
              'Dose mediana 5,62 mg/kg/dia; 72,3% dentro de 15–35 µg/mL e 24,6% subterapêuticos na primeira coleta; 7% das amostras sem resultado válido por lipemia intensa; ~36% com FA elevada sem associação significativa com o nível sérico; cães < 10 kg receberam doses proporcionais maiores sem níveis proporcionalmente maiores; apenas ~40% realizaram TDM nos primeiros 90 dias.',
            metrics: ['72,3% no alvo inicial', '24,6% subterapêuticos', '7% falha por lipemia', '~36% FA elevada'],
            clinicalConclusion:
              'Dose em mg/kg não garante nível sérico: exige TDM sistemático, jejum/controle de lipemia e não substituição prematura por FA isolada.',
            url: 'https://doi.org/10.3390/life16111858',
          },
        ],
      },
      {
        id: 'found-feno-liver-dog-vs-cat',
        title: 'Indução enzimática hepática versus hepatotoxicidade verdadeira em cães — e por que o fígado felino é diferente',
        narrative:
          'Diferenciar adaptação enzimática benigna de lesão hepática real evita tanto a suspensão desnecessária de um anticonvulsivante eficaz quanto a progressão silenciosa para cirrose. Em CÃES, a indução microssomal eleva frequentemente FA (marcador de atividade enzimática induzível, NÃO medida direta de função hepática) e moderadamente ALT/GGT, podendo gerar hepatomegalia homogênea ao ultrassom e discreta queda transitória de albumina nos 6 primeiros meses — mantendo bilirrubina, ureia, glicemia, coagulação e ácidos biliares preservados (Caso A: cão assintomático com FA 750 U/L, ALT 90 U/L, albumina/bilirrubina/ácidos biliares normais e PB 22 µg/mL → indução benigna). Já a hepatotoxicidade verdadeira (> 1 ano de uso ou níveis sustentados > 35–40 µg/mL) produz fibrose portal em ponte, regeneração nodular, alterações arquiteturais ao US, queda persistente de albumina/ureia, elevação progressiva de ALT e ácidos biliares, icterícia, hiporexia, perda de peso, ascite ou encefalopatia (Caso B: FA/ALT progressivas, albumina reduzida, ácidos biliares elevados, hiporexia e PB 42 µg/mL → hepatopatia relevante exigindo substituição anticonvulsivante sem interrupção abrupta). Em GATOS, o estudo multicêntrico de Hermans et al. (2022; 33 gatos em 4 centros) demonstrou ausência de aumento estatisticamente significativo das enzimas hepáticas pré versus pós-tratamento, com apenas 3 gatos elevando ALT potencialmente ligados a níveis > 30 µg/mL — provando que qualquer elevação de ALT ou FA em gatos deve ser investigada ativamente.',
        narrativeHighlights: [
          'FA (marcador de atividade enzimática induzível, NÃO medida direta de função hepática)',
          'Caso A: cão assintomático com FA 750 U/L',
          'Caso B: FA/ALT progressivas, albumina reduzida, ácidos biliares elevados',
          'fibrose portal em ponte',
          'qualquer elevação de ALT ou FA em gatos deve ser investigada ativamente',
        ],
        referenceIds: ['ref-hermans-2022', 'ref-ettinger-9e', 'ref-despa-2026', 'ref-bsava-10'],
        studies: [
          {
            citation: 'Hermans M, Charalambous M, Pakozdy A et al. JFMS 2022;24(6):530–538',
            referenceId: 'ref-hermans-2022',
            sourceType: 'Estudo retrospectivo multicêntrico felino (4 centros / n = 33 gatos)',
            summaryText:
              'Não houve elevação estatisticamente significativa de FA, ALT ou demais parâmetros bioquímicos hepáticos na comparação basal vs. durante o tratamento; 3 gatos apresentaram elevação de ALT possivelmente associada a concentrações > 30 µg/mL.',
            metrics: ['33 gatos (4 centros)', 'Sem indução enzimática típica', '3 gatos com ALT ↑ (> 30 µg/mL)'],
            clinicalConclusion:
              'Ausência de indução típica em felinos: jamais presumir ALT ou FA elevadas em gatos como adaptação farmacológica benigna.',
            url: 'https://pubmed.ncbi.nlm.nih.gov/34387120/',
          },
        ],
      },
      {
        id: 'found-feno-canine-efficacy',
        title: 'Eficácia comparada de primeira linha em cães: Consenso ACVIM (311 cães), revisão sistemática, brometo e imepitoína',
        narrative:
          'O posicionamento do fenobarbital como primeira escolha na epilepsia idiopática canina repousa sobre consensos internacionais, revisões sistemáticas e ensaios clínicos randomizados mascarados. Na síntese do consenso ACVIM (Podell et al., 2016) reunindo 311 cães em 8 estudos de monoterapia, 82% (258/311) obtiveram redução ≥ 50% das crises, 31% (93/311) ficaram livres de crises e 15% (48/311) não melhoraram (percentuais agregados de estudos heterogêneos, não probabilidades individuais fixas). A revisão sistemática de Charalambous et al. (2014; 26 estudos / 1.153 cães) confirmou a base de evidência mais robusta da classe. Frente ao brometo (Boothe et al., 2012), o fenobarbital demonstrou superioridade significativa em remissão e redução de duração das crises; frente à imepitoína (Tipold et al., 2015), exibiu eficácia comparável nas condições do ensaio, porém com maior incidência de sedação, polidipsia, polifagia e elevação de enzimas hepáticas — reforçando que a seleção do fármaco equilibra eficácia, perfil adverso, acesso, custo e viabilidade de TDM.',
        narrativeHighlights: [
          '82% (258/311) obtiveram redução ≥ 50% das crises',
          '31% (93/311) ficaram livres de crises',
          'superioridade significativa em remissão',
          'maior incidência de sedação, polidipsia, polifagia e elevação de enzimas hepáticas',
        ],
        referenceIds: ['ref-acvim-seizure-2016', 'ref-charalambous-2014', 'ref-boothe-2012', 'ref-tipold-2015'],
        studies: [
          {
            citation: 'Boothe DM, Dewey C, Carpenter DM. JAVMA 2012;240(9):1073–1083',
            referenceId: 'ref-boothe-2012',
            sourceType: 'Ensaio clínico randomizado duplo-cego paralelo (n = 46 cães)',
            summaryText:
              '85% (17/20) dos cães tratados com fenobarbital ficaram sem novas crises durante o período avaliado versus 52% (12/23) no grupo brometo, com maior redução percentual na duração das crises (88 ± 34% vs. 49 ± 75%); concentração média nos controlados de 25 ± 6 µg/mL (dose média 4,1 ± 1,1 mg/kg VO q12h).',
            metrics: ['85% vs. 52% sem crises', 'Duração -88% vs. -49%', 'Nível médio 25 ± 6 µg/mL'],
            clinicalConclusion:
              'Comprova eficácia superior do fenobarbital frente ao brometo sob titulação estruturada (não significa 85% de remissão universal em toda população canina).',
            url: 'https://pubmed.ncbi.nlm.nih.gov/22515627/',
          },
          {
            citation: 'Tipold A, Keefe TJ, Löscher W et al. J Vet Pharmacol Ther 2015;38(2):160–168',
            referenceId: 'ref-tipold-2015',
            sourceType: 'Ensaio multicêntrico mascarado paralelo (n = 226 cães)',
            summaryText:
              'Imepitoína demonstrou eficácia comparável ao fenobarbital na epilepsia idiopática canina sob as condições estudadas, enquanto o fenobarbital cursou com maior frequência de sedação, polidipsia, polifagia e elevações enzimáticas hepáticas.',
            metrics: ['226 cães', 'Eficácia comparável', 'Mais sedação/PU-PD/FA no fenobarbital'],
            clinicalConclusion:
              'A escolha inicial deve ponderar eficácia, tolerabilidade, disponibilidade regional, custo e monitoramento laboratorial.',
            url: 'https://pubmed.ncbi.nlm.nih.gov/25079881/',
          },
          {
            citation: 'Podell M, Volk HA et al. JVIM 2016;30:477–490 & Charalambous M et al. BMC Vet Res 2014;10:257',
            referenceId: 'ref-acvim-seizure-2016',
            sourceType: 'Consenso ACVIM (311 cães) e Revisão Sistemática (1.153 cães)',
            summaryText:
              'Na análise agregada de 8 estudos em monoterapia (311 cães): 82% (258/311) apresentaram redução ≥ 50% das crises, 31% (93/311) ficaram livres de crises e 15% (48/311) não obtiveram melhora.',
            metrics: ['82% redução ≥ 50%', '31% livres de crises', '15% sem melhora'],
            clinicalConclusion: 'Sustenta fortemente o fenobarbital como monoterapia de 1ª linha sob monitoramento sérico.',
            url: 'https://pubmed.ncbi.nlm.nih.gov/26899355/',
          },
        ],
      },
      {
        id: 'found-feno-feline-and-se2024',
        title: 'Evidência clínica na epilepsia felina e manejo emergencial do status epilepticus (ACVIM 2024)',
        narrative:
          'Embora a base de estudos felinos seja menor do que a canina, os dados clínicos disponíveis sustentam o fenobarbital como primeira linha na manutenção crônica em gatos. Na série retrospectiva de Finnerty et al. (2014; n = 30 gatos), 93% (28/30) alcançaram controle das crises e 43% (13/30) permaneceram completamente livres de crises em concentrações de 15–45 µg/mL — reforçando a importância de distinguir controle clínico (93%) de remissão total (43%) e trabalhar no alvo conservador de 23–30 µg/mL. No cenário de emergência hospitalar, o consenso ACVIM 2024 (Charalambous et al.) estabelece benzodiazepínicos como 1ª linha e posiciona o fenobarbital IV como terapia de 2ª linha com recomendação Grau A em cães e Grau B em gatos, enfatizando cargas fracionadas lentas (≤ 1–2 mg/kg/min, intervalos de 20 min) e politerapia precoce quando houver refratariedade.',
        narrativeHighlights: [
          '93% (28/30) alcançaram controle das crises',
          '43% (13/30) permaneceram completamente livres de crises',
          'recomendação Grau A em cães e Grau B em gatos',
          'politerapia precoce',
        ],
        referenceIds: ['ref-finnerty-2014', 'ref-acvim-se-2024'],
        studies: [
          {
            citation: 'Finnerty KE, Barnes Heller HL et al. JAVMA 2014;244(2):195–199',
            referenceId: 'ref-finnerty-2014',
            sourceType: 'Série clínica retrospectiva felina (n = 30 gatos)',
            summaryText:
              'Controle das crises em 93% (28/30) e ausência completa de novas crises em 43% (13/30) em concentrações séricas de 15–45 µg/mL (limitações: desenho retrospectivo não randomizado, amostra pequena e heterogeneidade etiológica).',
            metrics: ['93% controle (28/30)', '43% sem crises (13/30)', '15–45 µg/mL'],
            clinicalConclusion:
              'Consolida o fenobarbital como 1ª linha felina, mantendo alvo conservador de 23–30 µg/mL para equilibrar eficácia e segurança.',
            url: 'https://pubmed.ncbi.nlm.nih.gov/24378029/',
          },
          {
            citation: 'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA. JVIM 2024;38(1):19–40',
            referenceId: 'ref-acvim-se-2024',
            sourceType: 'Consenso Internacional ACVIM (Status Epilepticus e Clusters)',
            summaryText:
              'Define benzodiazepínicos como 1ª linha imediata e recomenda fenobarbital IV como 2ª linha com Grau A em cães e Grau B em gatos, reforçando monitorização rigorosa, detecção de status não convulsivo e escalonamento precoce em quadros refratários.',
            metrics: ['Grau A (cães)', 'Grau B (gatos)', '2ª linha após BZD'],
            clinicalConclusion:
              'Orienta o protocolo hospitalar de cargas fracionadas lentas e associação multimodal no status epilepticus.',
            url: 'https://pubmed.ncbi.nlm.nih.gov/37921621/',
          },
        ],
      },
      {
        id: 'found-feno-tapering-and-overdose',
        title: 'Protocolos comparados de retirada gradual (desmame) e conduta na intoxicação/superdosagem aguda',
        narrative:
          'Desmame seguro: a interrupção abrupta pode precipitar crises de rebote, clusters e status epilepticus fatal. Duas estratégias principais existem na literatura e NÃO são matematicamente equivalentes: (1) redução proporcional de ~25% da dose VIGENTE a cada 2 semanas (ex.: 100 → 75 → 56 → 42 mg sucessivamente); (2) redução linear de 25% da dose ORIGINAL por mês ao longo de 3–4 meses (ex.: 100 → 75 → 50 → 25 → 0 mg). Em hepatotoxicidade grave ou reação imunomediada, pode ser necessário acelerar a retirada mantendo proteção imediata com anticonvulsivante substituto — sempre revisando fármacos concomitantes devido à desindução enzimática nas 4 semanas seguintes. Intoxicação/superdosagem: evolui por 4 graus — Leve (sonolência, ataxia), Moderada (sedação importante, fraqueza, dificuldade de estação), Grave (estupor, recumbência, hipoventilação, hipotensão) e Muito Grave (coma, apneia, choque e risco de morte), podendo cursar com midríase em gatos. Não existe antídoto específico (flumazenil NÃO reverte barbitúricos). O tratamento prioriza ABC (via aérea, ventilação assistida, oxigênio e suporte circulatório), carvão ativado em múltiplas doses (interrompe recirculação/difusão intestinal — SOMENTE com via aérea protegida pelo risco de aspiração), alcalinização urinária monitorada (aumenta fração ionizada renal pela equação de Henderson–Hasselbalch) e hemodiálise em coma prolongado, comprometimento ventilatório grave ou insuficiência renal.',
        narrativeHighlights: [
          '100 → 75 → 56 → 42 mg',
          '100 → 75 → 50 → 25 → 0 mg',
          'flumazenil NÃO reverte barbitúricos',
          'carvão ativado em múltiplas doses',
          'alcalinização urinária monitorada',
          'hemodiálise',
        ],
        referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-dewey-neuro-3e'],
        studies: [],
      },
      {
        id: 'found-feno-comparison-aeds',
        title: 'Como escolher entre fenobarbital e outros anticonvulsivantes na rotina clínica',
        narrative:
          'A seleção do anticonvulsivante considera etiologia, frequência/tipo de crises, função hepática e renal, viabilidade de TDM, adesão e perfil de eventos adversos: ' +
          '(1) Fenobarbital (potencialização GABA-A): evidência clínica mais robusta, longa experiência e custo acessível; limitações = indução enzimática, sedação/PU-PD, hepatotoxicidade crônica e necessidade de TDM. ' +
          '(2) Levetiracetam (ligação à proteína vesicular SV2A): perfil de segurança hepática e interações muito favorável; limitações = intervalos curtos (q8h na formulação imediata) e depuração acelerada em 35–50% quando associado ao fenobarbital em cães. ' +
          '(3) Brometo de potássio (modulação da excitabilidade por íons brometo): eliminação renal sem sobrecarga hepática e bom sinergismo em cães; limitações = meia-vida muito longa, efeitos GI/sedação e CONTRAINDICAÇÃO em gatos (pneumonite alérgica). ' +
          '(4) Imepitoína (agonismo parcial no sítio benzodiazepínico do GABA-A): boa tolerabilidade em cães selecionados com menos efeitos hepáticos/PU-PD; limitações = disponibilidade regional e indicações mais restritas (menor papel em clusters/status). ' +
          '(5) Zonisamida (múltiplos mecanismos em canais iônicos): alternativa para monoterapia ou adjuvante em casos selecionados; limitações = interações com indutores e eventos idiossincráticos. ' +
          '(6) Gabapentina e Pregabalina (subunidade α₂δ de canais de cálcio): úteis quando há dor neuropática ou ansiedade concomitante, porém com evidência limitada como anticonvulsivante principal na epilepsia canina. Regra prática: não substituir fenobarbital por levetiracetam automaticamente apenas por FA isolada, mas tampouco insistir em níveis hepatotóxicos diante de perda real de função hepática.',
        narrativeHighlights: [
          'evidência clínica mais robusta',
          'depuração acelerada em 35–50%',
          'CONTRAINDICAÇÃO em gatos (pneumonite alérgica)',
          'não substituir fenobarbital por levetiracetam automaticamente apenas por FA isolada',
        ],
        referenceIds: ['ref-ivetf-2015', 'ref-acvim-seizure-2016', 'ref-boothe-2012', 'ref-tipold-2015'],
        studies: [],
      },
      {
        id: 'found-feno-ten-rules',
        title: 'Síntese final para o plantão: as 10 regras essenciais para memorizar',
        narrative:
          'Quatro eixos resumem o comportamento do fenobarbital: potência GABAérgica consolidada em cães e gatos, meia-vida longa exigindo tempo (ou carga) para estabilizar, farmacocinética dinâmica pela autoindução e necessidade de separar efeitos esperados de toxicidade verdadeira. Dez pontos essenciais de consulta imediata: ' +
          '(1) Dose inicial canina: 2,5–3 mg/kg VO q12h. ' +
          '(2) Dose inicial felina: 1,5–3 mg/kg VO q12h. ' +
          '(3) Concentração sérica preferencial em cães: 15–35 µg/mL. ' +
          '(4) Alvo sérico conservador em gatos: 23–30 µg/mL (individualizado; controle descrito até 45 µg/mL). ' +
          '(5) Primeira dosagem sérica (TDM): ~14 dias após início ou ajuste. ' +
          '(6) Recoleta obrigatória em cães: ~6 semanas após o início para rastrear autoindução (depois a cada 6 meses, em tubo sem gel). ' +
          '(7) FA elevada isolada em cães costuma refletir indução enzimática, não necessariamente hepatotoxicidade. ' +
          '(8) Elevação de ALT ou FA em gatos NÃO deve ser presumida como indução fisiológica típica. ' +
          '(9) Status epilepticus: 2ª linha no consenso ACVIM 2024 (Grau A cães / Grau B gatos), com carga IV lenta ≤ 1–2 mg/kg/min, espera de 20 min entre incrementos e conferência sal/base (Fenocris® 91,35 mg/mL base vs. Carbital® 200 mg/mL). ' +
          '(10) Retirada: nunca suspender abruptamente uma manutenção crônica sem desmame estruturado ou cobertura anticonvulsivante substituta.',
        narrativeHighlights: [
          '2,5–3 mg/kg VO q12h',
          '1,5–3 mg/kg VO q12h',
          '15–35 µg/mL',
          '23–30 µg/mL',
          '~14 dias',
          '~6 semanas',
          '91,35 mg/mL base',
          'nunca suspender abruptamente',
        ],
        referenceIds: ['ref-ivetf-2015', 'ref-acvim-se-2024', 'ref-despa-2026', 'ref-anvisa-fenocris-2026'],
        studies: [],
      },
    ],

    clinicalStudiesCommented: [
      {
        title: 'Comparison of phenobarbital with bromide as a first-choice antiepileptic drug for treatment of epilepsy in dogs',
        authorsYear: 'Boothe DM, Dewey C, Carpenter DM (2012)',
        journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
        studyDesign: 'Ensaio clínico randomizado, duplo-cego, paralelo',
        sampleSize: '46 cães com epilepsia naturalmente adquirida sem tratamento prévio',
        mainFindings:
          '85% (17/20) dos cães tratados com fenobarbital ficaram sem novas crises versus 52% (12/23) no grupo brometo, com maior redução na duração das crises (88 ± 34% vs. 49 ± 75%); concentração média nos controlados: 25 ± 6 µg/mL (dose média 4,1 ± 1,1 mg/kg q12h).',
        clinicalTakeaway: 'Demonstra superioridade inicial do fenobarbital sobre brometo sob titulação estruturada.',
        referenceId: 'ref-boothe-2012',
      },
      {
        title: 'Clinical efficacy and safety of imepitoin in comparison with phenobarbital for the control of idiopathic epilepsy in dogs',
        authorsYear: 'Tipold A, Keefe TJ, Löscher W, Rundfeldt C, de Vries F (2015)',
        journal: 'Journal of Veterinary Pharmacology and Therapeutics',
        studyDesign: 'Ensaio clínico multicêntrico, mascarado, grupos paralelos',
        sampleSize: '226 cães com epilepsia idiopática',
        mainFindings:
          'Eficácia comparável entre imepitoína e fenobarbital nas condições avaliadas, porém maior incidência de sedação, polidipsia, aumento de apetite e elevações enzimáticas hepáticas no grupo fenobarbital.',
        clinicalTakeaway: 'A seleção do anticonvulsivante deve considerar equilíbrio entre eficácia, tolerabilidade, custo e TDM.',
        referenceId: 'ref-tipold-2015',
      },
      {
        title: 'Evaluation of therapeutic phenobarbital concentrations and application of a classification system for seizures in cats: 30 cases (2004–2013)',
        authorsYear: 'Finnerty KE, Barnes Heller HL, Mercier MN et al. (2014)',
        journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
        studyDesign: 'Série clínica retrospectiva',
        sampleSize: '30 gatos com epilepsia suspeita ou confirmada',
        mainFindings:
          'Controle das crises em 93% (28/30) e remissão total sem novas crises em 43% (13/30) dos gatos em concentrações séricas de 15–45 µg/mL.',
        clinicalTakeaway: 'Fundamenta o fenobarbital como primeira linha felina, diferenciando controle (93%) de ausência total de crises (43%).',
        referenceId: 'ref-finnerty-2014',
      },
      {
        title: 'Evaluation of the effect of phenobarbital administration on the biochemistry profile, with a focus on serum liver values, in epileptic cats',
        authorsYear: 'Hermans M, Charalambous M, Pakozdy A et al. (2022)',
        journal: 'Journal of Feline Medicine and Surgery (JFMS)',
        studyDesign: 'Estudo retrospectivo multicêntrico (4 centros)',
        sampleSize: '33 gatos epilépticos',
        mainFindings:
          'Sem aumento estatisticamente significativo das enzimas hepáticas pré vs. durante o tratamento; 3 gatos exibiram aumento de ALT potencialmente ligado a concentrações > 30 µg/mL.',
        clinicalTakeaway: 'Gatos não fazem indução enzimática hepática típica — elevações de ALT ou FA devem ser investigadas ativamente.',
        referenceId: 'ref-hermans-2022',
      },
      {
        title: 'Real-World Phenobarbital Monitoring in Dogs: Serum Concentrations, Hepatic Biochemistry, Lipaemic Failure and Continuity of Care in a University Referral Hospital',
        authorsYear: 'Despa A et al. (novembro de 2026)',
        journal: 'Life',
        studyDesign: 'Estudo observacional retrospectivo de mundo real',
        sampleSize: '66 cães (143 determinações laboratoriais)',
        mainFindings:
          '72,3% atingiram 15–35 µg/mL e 24,6% ficaram subterapêuticos na 1ª dosagem (dose mediana 5,62 mg/kg/dia); 7% das amostras falharam por lipemia; ~36% apresentaram FA elevada sem correlação com nível sérico; sem correlação linear entre dose mg/kg/dia e nível sérico; apenas ~40% fizeram TDM nos primeiros 90 dias.',
        clinicalTakeaway: 'Comprova a necessidade de TDM sistemático, jejum/controle de lipemia e interpretação criteriosa da FA.',
        referenceId: 'ref-despa-2026',
      },
      {
        title: '2015 ACVIM Small Animal Consensus Statement on Seizure Management in Dogs & Treatment in canine epilepsy — a systematic review',
        authorsYear: 'Podell M, Volk HA et al. (2016) & Charalambous M, Brodbelt D, Volk HA (2014)',
        journal: 'Journal of Veterinary Internal Medicine / BMC Veterinary Research',
        studyDesign: 'Consenso internacional e revisão sistemática (26 estudos / 1.153 cães; 311 cães em monoterapia ACVIM)',
        sampleSize: '311 cães (8 estudos de monoterapia ACVIM) / 1.153 cães (revisão sistemática)',
        mainFindings:
          'Na análise agregada de monoterapia (311 cães): redução ≥ 50% das crises em 82% (258/311), ausência total de crises em 31% (93/311) e ausência de melhora em 15% (48/311).',
        clinicalTakeaway: 'Confirma forte grau de evidência para monoterapia de primeira linha em cães sob monitorização sérica.',
        referenceId: 'ref-acvim-seizure-2016',
      },
      {
        title: 'ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats',
        authorsYear: 'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA (2024)',
        journal: 'Journal of Veterinary Internal Medicine (JVIM)',
        studyDesign: 'Diretriz de consenso internacional ACVIM',
        sampleSize: 'Síntese sistemática das evidências emergenciais em cães e gatos',
        mainFindings:
          'Consolida benzodiazepínicos como 1ª linha e atribui recomendação Grau A (cães) e Grau B (gatos) ao fenobarbital IV como anticonvulsivante de 2ª linha no status epilepticus, reforçando politerapia precoce em quadros refratários.',
        clinicalTakeaway: 'Estabelece o papel hospitalar exato das cargas fracionadas de fenobarbital IV após benzodiazepínicos.',
        referenceId: 'ref-acvim-se-2024',
      },
    ],

    references: [
      {
        id: 'ref-ivetf-2015',
        citationText:
          'Bhatti SFM, De Risio L, Muñana K et al. International Veterinary Epilepsy Task Force consensus proposal: medical treatment of canine epilepsy in Europe. BMC Vet Res. 2015;11:176.',
        sourceType: 'Consenso Internacional IVETF',
        doi: '10.1186/s12917-015-0464-z',
        pmid: '26316233',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26316233/',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-acvim-seizure-2016',
        citationText:
          'Podell M, Volk HA, Berendt M et al. 2015 ACVIM Small Animal Consensus Statement on Seizure Management in Dogs. J Vet Intern Med. 2016;30(2):477–490.',
        sourceType: 'Consenso Internacional ACVIM',
        doi: '10.1111/jvim.13841',
        pmid: '26899355',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26899355/',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-acvim-se-2024',
        citationText:
          'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA. ACVIM Consensus Statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med. 2024;38(1):19–40.',
        sourceType: 'Consenso Internacional ACVIM (Emergência)',
        doi: '10.1111/jvim.16928',
        pmid: '37921621',
        url: 'https://pubmed.ncbi.nlm.nih.gov/37921621/',
        evidenceLevel: 'Consenso Internacional de Especialistas',
      },
      {
        id: 'ref-charalambous-2014',
        citationText:
          'Charalambous M, Brodbelt D, Volk HA. Treatment in canine epilepsy — a systematic review. BMC Vet Res. 2014;10:257.',
        sourceType: 'Revisão Sistemática',
        doi: '10.1186/s12917-014-0257-9',
        pmid: '25338624',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25338624/',
        evidenceLevel: 'Revisão sistemática (26 estudos / 1.153 cães)',
      },
      {
        id: 'ref-boothe-2012',
        citationText:
          'Boothe DM, Dewey C, Carpenter DM. Comparison of phenobarbital with bromide as a first-choice antiepileptic drug for treatment of epilepsy in dogs. J Am Vet Med Assoc. 2012;240(9):1073–1083.',
        sourceType: 'Ensaio Clínico Randomizado Duplo-Cego',
        doi: '10.2460/javma.240.9.1073',
        pmid: '22515627',
        url: 'https://pubmed.ncbi.nlm.nih.gov/22515627/',
        evidenceLevel: 'Nível I — RCT',
      },
      {
        id: 'ref-tipold-2015',
        citationText:
          'Tipold A, Keefe TJ, Löscher W, Rundfeldt C, de Vries F. Clinical efficacy and safety of imepitoin in comparison with phenobarbital for the control of idiopathic epilepsy in dogs. J Vet Pharmacol Ther. 2015;38(2):160–168.',
        sourceType: 'Ensaio Clínico Multicêntrico Mascarado',
        doi: '10.1111/jvp.12151',
        pmid: '25079881',
        url: 'https://pubmed.ncbi.nlm.nih.gov/25079881/',
        evidenceLevel: 'Nível I — Multicêntrico controlado',
      },
      {
        id: 'ref-finnerty-2014',
        citationText:
          'Finnerty KE, Barnes Heller HL, Mercier MN et al. Evaluation of therapeutic phenobarbital concentrations and application of a classification system for seizures in cats: 30 cases (2004–2013). J Am Vet Med Assoc. 2014;244(2):195–199.',
        sourceType: 'Série Clínica Retrospectiva Felina',
        doi: '10.2460/javma.244.2.195',
        pmid: '24378029',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24378029/',
        evidenceLevel: 'Nível III — Série retrospectiva',
      },
      {
        id: 'ref-hermans-2022',
        citationText:
          'Hermans M, Charalambous M, Pakozdy A et al. Evaluation of the effect of phenobarbital administration on the biochemistry profile, with a focus on serum liver values, in epileptic cats. J Feline Med Surg. 2022;24(6):530–538.',
        sourceType: 'Estudo Multicêntrico Retrospectivo Felino',
        doi: '10.1177/1098612X211037431',
        pmid: '34387120',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34387120/',
        evidenceLevel: 'Nível III — Multicêntrico retrospectivo',
      },
      {
        id: 'ref-despa-2026',
        citationText:
          'Despa A et al. Real-World Phenobarbital Monitoring in Dogs: Serum Concentrations, Hepatic Biochemistry, Lipaemic Failure and Continuity of Care in a University Referral Hospital. Life. 2026;16(11):1858.',
        sourceType: 'Estudo Observacional Real-World',
        doi: '10.3390/life16111858',
        url: 'https://doi.org/10.3390/life16111858',
        evidenceLevel: 'Nível II–III — Observacional clínico',
      },
      {
        id: 'ref-plumb-10',
        citationText:
          'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografia: Phenobarbital, pp. 1006–1011 (PDF pp. 1033–1038).',
        sourceType: 'Compêndio Farmacológico Veterinário',
        notes: 'Velocidade IV ≤ 1–2 mg/kg/min, compatibilidades/incompatibilidades físicas, efeito de dietas hipoproteicas/hipolipídicas na meia-vida, TDM, desmame e toxicologia.',
        evidenceLevel: 'Referência terciária padrão-ouro',
      },
      {
        id: 'ref-bsava-10',
        citationText:
          'Allerton F (ed). BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. BSAVA; 2020. Monografia: Phenobarbital (Phenobarbitone), pp. 314–317 (PDF pp. 330–333).',
        sourceType: 'Formulário Veterinário Internacional',
        notes: 'Esquemas IV alternativos de carga e top-up, contraindicação na toxicidade por ivermectina/moxidectina, queda transitória de albumina sem hepatotoxicidade e desmame mensal.',
        evidenceLevel: 'Referência terciária especializada',
      },
      {
        id: 'ref-ettinger-9e',
        citationText:
          'Côté E, Ettinger SJ, Feldman EC. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 247: Epilepsy (pp. 1555–1556 / PDF pp. 1707–1708) e Antiepileptic Drug-Induced Liver Injury (PDF p. 1967).',
        sourceType: 'Tratado de Medicina Interna Veterinária',
        notes: 'Seleção comparada de anticonvulsivantes em cães e gatos e histopatologia da hepatopatia crônica por fenobarbital (fibrose portal em ponte, regeneração nodular e hiperplasia biliar).',
        evidenceLevel: 'Referência terciária especializada',
      },
      {
        id: 'ref-dewey-neuro-3e',
        citationText:
          'Dewey CW, da Costa RC. Practical Guide to Canine and Feline Neurology. 3rd ed. Wiley-Blackwell; 2016. Cap. 9: Seizures and Narcolepsy, pp. 254–262 (PDF pp. 268–276).',
        sourceType: 'Tratado de Neurologia Veterinária',
        notes: 'Adsorção de fenobarbital ao gel de silicone de tubos separadores, conduta de dose esquecida, dissociação eletromecânica no status e pneumonite por brometo em felinos.',
        evidenceLevel: 'Referência terciária especializada',
      },
      {
        id: 'ref-anvisa-fenocris-2026',
        citationText:
          'ANVISA / Cristália Produtos Químicos Farmacêuticos Ltda. Bulas oficiais de Fenocris® (comprimidos 100 mg, solução oral 40 mg/mL e injetável 100 mg/mL = 91,35 mg/mL base), RDC ANVISA nº 1.023, de 11/05/2026 (Receita de Controle Especial em 2 vias — Lista B1 adendo) e materiais hospitalares de referência (HUPE/UERJ e Boletim Técnico UFG).',
        sourceType: 'Documentação Regulatória ANVISA & Bula Oficial',
        url: 'https://consultas.anvisa.gov.br/#/medicamentos/',
        evidenceLevel: 'Normativa regulatória vigente no Brasil (2026)',
      },
    ],

    relatedDiseaseSlugs: [
      'neoplasias-intracranianas-caes',
      'discinesia-paroxistica-caes-gatos',
      'intermacao-caes-gatos',
      'hipotireoidismo-adquirido-caes-gatos',
      'sindrome-cushing-caes',
      'trombocitopenia-caes-gatos',
      'anemia-caes-gatos',
    ],

    isPublished: true,
    source: 'seed',
  },
];

export const phenobarbitalMedicationRecord = phenobarbitalMedicationsSeed[0];
