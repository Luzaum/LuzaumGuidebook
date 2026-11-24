import { MedicationRecord } from '../../types/medication';

export const maropitantMedicationRecord: MedicationRecord = {
  id: 'med-maropitant',
  slug: 'maropitant',
  title: 'Maropitant',
  activeIngredient:
    'Citrato de maropitant monoidratado (CJ-11,972; quinuclidina substituída, isômero (2S,3S); base C₃₂H₄₀N₂O, MM base 468,68 g/mol, MM sal 678,81 g/mol)',
  isControlled: false,
  controlNotice:
    'Receita simples no Brasil (prescrição médico-veterinária comum, sem retenção ou notificação especial).',
  tradeNames: [
    'Cerenia® 10 mg/mL Solução Injetável Frasco 20 mL (Zoetis — Brasil e EUA)',
    'Cerenia® 16 mg, 24 mg, 60 mg e 160 mg Comprimidos Ranhurados (Zoetis — Brasil e EUA)',
    'Marovet® 10 mg/mL Solução Injetável Frasco-ampola 20 mL (Botupharma — Brasil)',
    'Prevomax® / Vetemex® 10 mg/mL Solução Injetável com Álcool Benzílico (referência europeia; não comercializadas no Brasil)',
  ],
  officialSiteUrl: 'https://www.zoetis.com.br/cerenia-solucao-injetavel.aspx',
  leafletUrl:
    'https://www2.zoetis.com.br/content/pt/pages/Especies/Caes-e-Gatos/Veterinario/Bulario/_assets/cerenia-comprimidos.pdf',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/maropitant/PNG',
  priceReference: {
    amountBrl: 141.0,
    label:
      'Cerenia® Injetável 10 mg/mL (20 mL): ~R$ 290–380 | Comprimidos (cx 4): 16 mg ~R$ 115–135; 24 mg ~R$ 130–155; 60 mg ~R$ 165–195; 160 mg ~R$ 250–295 | Marovet® Injetável (20 mL): ~R$ 240–310',
    presentation: 'Cerenia® 24 mg caixa com 4 comprimidos ranhurados (Zoetis Brasil)',
    sourceName: 'Referência de varejo veterinário brasileiro',
    sourceUrl: 'https://www2.zoetis.com.br',
    checkedAt: '2026-11-13',
    notes:
      'Sem apresentação humana registrada no Brasil equivalente às formas veterinárias. Concentração rotulada em equivalentes de maropitant ativo (10 mg/mL fornece 10 mg de base ativa/mL, sem conversão adicional pelo sal).',
  },
  pharmacologicClass:
    'Antiemético de amplo espectro | Antagonista seletivo dos receptores de neurocinina-1 (NK₁)',
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'antiemético',
    'maropitant',
    'citrato de maropitant',
    'Cerenia',
    'Marovet',
    'NK1',
    'substância P',
    'vômito',
    'náusea',
    'cinetose',
    'gastroenterite',
    'parvovirose',
    'pancreatite',
    'quimioterapia',
    'DRC',
    'pré-anestesia',
    'êmese induzida por opioide',
  ],
  relatedDiseaseSlugs: ['parvovirose-canina', 'pancreatite-caes', 'pancreatite-gatos'],

  attentionSubtitle:
    'Antagonista seletivo NK₁ (isômero 2S,3S): bloqueia a substância P na via integradora do vômito em cães e gatos. Controlar o vômito NÃO garante resolução da náusea, não estimula o apetite, não previne refluxo gastroesofágico (RGE) nem exclui abdome cirúrgico obstrutivo. Atenção às diferenças de registro Brasil vs FDA, à dor na injeção SC, à precipitação com pantoprazol e ao metabolismo hepático saturável.',

  mechanismOfAction:
    'Antagonista potente, seletivo e não peptídico dos receptores de neurocinina-1 (NK₁), impedindo que a substância P se ligue aos receptores NK₁ no complexo vagal dorsal do tronco encefálico (núcleo do trato solitário e área postrema) e em aferências viscerais periféricas, bloqueando a via final integradora do reflexo emético sem atuação direta relevante sobre dopamina, serotonina ou motilidade gástrica.',

  indications: [
    'Prevenção e tratamento do vômito agudo de origem central ou periférica em cães e gatos (gastroenterite aguda, parvovirose, pancreatite, gastrite urêmica, hepatopatias e distúrbios gastrointestinais não obstrutivos)',
    'Prevenção do vômito por cinetose (enjoo de movimento) em cães por via oral',
    'Prevenção do vômito induzido por quimioterápicos emetogênicos (como cisplatina e doxorrubicina) e estímulos na zona quimiorreceptora de gatilho',
    'Pré-medicação antes de opioides emetogênicos (morfina, hidromorfona) para redução da êmese perioperatória, quando administrado 45–60 minutos antes do opioide',
    'Manejo adjuvante do vômito associado à doença renal crônica em gatos, como componente de controle sintomático após investigação e suporte clínico adequados',
    'Aplicações experimentais ou extrabula com evidência limitada ou incerta (pouco suportadas como primeira linha): prurido felino refratário e bronquite crônica canina — não substituir terapias padrão estabelecidas',
  ],

  plainLanguageSummary:
    'O maropitant é um antiemético de amplo espectro que bloqueia o principal sinal neuroquímico responsável pela integração de diferentes estímulos que desencadeiam o vômito: a ação da substância P nos receptores de neurocinina-1 (NK₁). Por atuar nessa etapa integradora no tronco encefálico e nas vias aferentes viscerais, apresenta eficácia contra a êmese associada a doenças gastrointestinais, quimioterapia, opioides emetogênicos, estímulos vestibulares (cinetose) e uremia, permitindo geralmente administração a cada 24 horas.\n\nEntretanto, controlar o vômito não significa necessariamente eliminar a náusea, corrigir a doença de base, promover esvaziamento gástrico ou estimular o apetite. Essa distinção é essencial em cães e gatos internados: um paciente pode parar de vomitar mesmo mantendo náusea intensa (sialorreia, lambedura labial, hiporexia) ou apresentando obstrução mecânica por corpo estranho. Além disso, a aprovação regulatória por espécie, via e prazo de conservação após abertura varia conforme o país e o fabricante comercial.',

  pillars: [
    {
      title: 'Bloqueio de uma via emética final comum',
      icon: 'Brain',
      desc: 'A antagonização seletiva de NK₁ impede que a substância P ative circuitos do complexo vagal dorsal (núcleo do trato solitário e área postrema) e aferências viscerais, sustentando amplo espectro antiemético contra gatilhos centrais e periféricos.',
    },
    {
      title: 'Proteção clínica prolongada (q24h)',
      icon: 'Clock',
      desc: 'A atividade antiemética sustenta regimes a cada 24 horas mesmo quando a meia-vida plasmática é inferior a 24 h; duração farmacodinâmica e ocupação de receptores não devem ser confundidas com meia-vida sérica.',
    },
    {
      title: 'Facilitação do suporte — sem substituir etiologia',
      icon: 'ShieldAlert',
      desc: 'Reduz perdas hídricas e favorece a retomada alimentar, mas não possui ação procinética, não estimula diretamente o apetite, não previne RGE anestésico e não substitui fluidoterapia, analgesia ou investigação cirúrgica.',
    },
    {
      title: 'Modulação experimental de circuitos neurogênicos',
      icon: 'HeartPulse',
      desc: 'A substância P também participa de nocicepção visceral, tosse e prurido neurogênico; porém, essas aplicações permanecem experimentais ou de evidência limitada e não substituem protocolos padrão.',
    },
  ],

  quickSummaryHighlights: [
    'Peculiaridade farmacotécnica: formulado como citrato de maropitant monoidratado (MM 678,81 g/mol), mas rotulado em equivalentes de maropitant ativo (10 mg/mL fornece 10 mg de base ativa/mL; na dose de 1 mg/kg, equivale a 0,1 mL/kg).',
    'Regulação BR vs FDA: no Brasil, Cerenia® comprimidos é indicado para vômito agudo e cinetose em cães (uso oral felino é extrabula), Cerenia® injetável página BR descreve SC em cães, e Marovet® indica SC em cães (60d em 15–30 °C); nos EUA (FDA), o injetável é aprovado para cães (≥2m SC; ≥4m SC/IV) e gatos (≥4m SC/IV).',
    'Antiêmese ≠ antináusea ≠ orexígeno: bloqueia o reflexo motor do vômito, mas sinais de náusea podem persistir (Shin & Ambros 2026) e ensaio em DRC felina IRIS 2–3 não mostrou ganho de apetite ou peso (Quimby et al. 2015).',
    'Farmacocinética não linear canina: a biodisponibilidade oral sobe de ~24% (2 mg/kg) para ~37% (8 mg/kg) por saturação hepática de CYP2D15 e recrutamento de CYP3A12; SC alcança ~91% em cães e gatos.',
    'Dor SC & conservação: o complexo maropitant–SBECD dissocia acima de 20 °C liberando fármaco livre irritante (além do conservante metacresol); refrigeração atenua a dor quando compatível com a bula (não aplicar automaticamente a regra de 90d FDA ao Cerenia BR de 56d ou ao Marovet de 60d em 15–30 °C).',
    'Incompatibilidade física: precipitação descrita com pantoprazol na mesma linha IV; não misturar rotineiramente na mesma seringa.',
  ],

  quickIndications: [
    {
      condition: 'Vômito agudo (gastroenterite, parvovirose, pancreatite, sistêmicas)',
      species: 'both',
      doseSummary: 'Cães: 1 mg/kg SC/IV lenta q24h ou ≥2 mg/kg VO q24h | Gatos: 1 mg/kg SC/IV lenta q24h (FDA); VO extrabula 1 mg/kg q24h',
      route: 'SC, IV lenta (1–2 min) ou VO',
      duration: 'Até 5 dias consecutivos (bula/FDA); adultos conforme reavaliação etiológica',
      clinicalContext:
        'Preferir via parenteral quando há vômito ativo para garantir absorção; investigar obstrução mecânica, perfuração e pancreatite se não houver melhora ou se sinais persistirem >48 h.',
    },
    {
      condition: 'Cinetose e vômito vestibular',
      species: 'both',
      doseSummary: 'Cães (≥4 meses): ≥8 mg/kg VO q24h (~2 h antes) | Gatos: 1 mg/kg SC ou VO (protocolos experimentais extrabula)',
      route: 'VO (cães); SC ou VO extrabula (gatos)',
      duration: 'Até 2 dias consecutivos em cães para viagens',
      clinicalContext:
        'Evitar refeição volumosa antes do deslocamento (oferecer apenas pequena porção de alimento). Não possui efeito ansiolítico nem sedativo; medo de viagem exige abordagem comportamental.',
    },
    {
      condition: 'Profilaxia de êmese por quimioterapia, opioides ou sedativos',
      species: 'both',
      doseSummary: 'Cães (≥4 meses FDA): 1 mg/kg SC/IV lenta 45–60 min antes | Gatos: 1 mg/kg SC/IV (perioperatório extrabula)',
      route: 'SC ou IV lenta (1–2 min)',
      duration: 'Dose única prévia antes do estímulo emético',
      clinicalContext:
        'Eficácia preventiva é marcadamente superior quando dado 30–60 min antes do opioide/cisplatina; aplicação simultânea falha na prevenção. Não reduz refluxo gastroesofágico anestésico.',
    },
    {
      condition: 'Vômito crônico na Doença Renal Crônica (DRC) felina',
      species: 'cat',
      doseSummary: '4 mg/gato VO q24h (DOSE FIXA por animal, não mg/kg)',
      route: 'VO (extrabula)',
      duration: '14 dias (protocolo do ensaio clínico controlado IRIS 2–3)',
      clinicalContext:
        'Reduz significativamente os episódios de vômito (p < 0,01) em gatos IRIS 2–3 estáveis, mas sem aumento estatístico de apetite, peso ou atividade; avaliar ondansetrona/mirtazapina se persistir hiporexia.',
    },
    {
      condition: 'Adjuvante anestésico e possível efeito antinociceptivo (Experimental)',
      species: 'both',
      doseSummary: '1 mg/kg SC/IV ou protocolos experimentais de CRI (50–200 µg/kg/h cães; 30–100 µg/kg/h gatos)',
      route: 'SC, IV ou CRI experimental',
      duration: 'Transoperatório experimental',
      clinicalContext:
        'Redução de ~14–24% na CAM inalatória observada em estudos cirúrgicos, porém sem evidência consistente para substituir analgesia opioide ou multimodal convencional.',
    },
  ],

  clinicalWarningItems: [
    {
      label: '1. VÔMITO CONTROLADO NÃO EXCLUI ABDOME CIRÚRGICO',
      text: 'O maropitant suprime o vômito mesmo diante de obstrução mecânica por corpo estranho, intussuscepção ou peritonite, podendo atrasar a cirurgia e precipitar perfuração gastrointestinal. Reavalie sempre por exame físico e imagem se houver dor ou falha de resolução em 24–48 h; não administre antes da decisão de induzir êmese após ingestão recente de toxinas.',
    },
    {
      label: '2. CÃES: A VIA ALTERA A DOSE (NÃO SUBSTITUIR 2 mg/kg VO POR 2 mg/kg IV)',
      text: 'A biodisponibilidade oral canina é de ~24% a 2 mg/kg por primeira passagem hepática, contra ~91% SC e 100% IV. Empregar 2 mg/kg ou 8 mg/kg pela via parenteral configura erro posológico grave.',
    },
    {
      label: '3. CINETOSE CANINA EXIGE REGIME PRÓPRIO (≥8 mg/kg VO)',
      text: 'Administrar ≥8 mg/kg VO aproximadamente 2 horas antes da viagem (com pequena porção alimentar, evitando refeição cheia), por no máximo 2 dias consecutivos. Não confundir com a dose oral de 2 mg/kg do vômito agudo nem usar para ansiedade.',
    },
    {
      label: '4. NÁUSEA E VÔMITO SÃO DESFECHOS DIFERENTES',
      text: 'A cessação da êmese mecânica não assegura resolução da náusea (sialorreia, lambedura labial, deglutições repetidas) nem estimula o apetite. Em pacientes hiporéxicos ou urêmicos, associar investigação, suporte nutricional, ondansetrona (5-HT₃) ou orexígeno quando indicado.',
    },
    {
      label: '5. DOR À APLICAÇÃO SUBCUTÂNEA E TERMOLABILIDADE DO COMPLEXO SBECD',
      text: 'Muito comum em gatos (22,6% moderada + 11,3% intensa = 33,9% combinada) e frequente em cães. Acima de 20 °C, o maropitant dissocia-se da β-ciclodextrina (SBECD) liberando fármaco livre irritante (além da irritação do conservante metacresol). Quando previsto na bula do produto, aplicar refrigerado (2–8 °C) atenua a dor.',
    },
    {
      label: '6. HEPATOPATIAS E CARDIOPATIAS EXIGEM INDIVIDUALIZAÇÃO',
      text: 'A depuração é quase exclusivamente hepática (<1% de excreção renal inalterada, dispensando corte automático em DRC). Em hepatopatas não há percentual universal validado para calculadora (-50% empírico não deve ser automático). Em cardiopatas sob risco arrítmico, considerar QT prolongado, eletrólitos e advertência europeia sobre bloqueadores de canais de Ca²⁺.',
    },
    {
      label: '7. VIA IV: REGISTRO NACIONAL, VELOCIDADE DE INFUSÃO E HIPOTENSÃO',
      text: 'A bula FDA aprova IV em 1–2 min para cães e gatos ≥4 meses, mas a página brasileira de Cerenia® injetável descreve SC em cães e o Marovet® indica SC em cães (uso IV/felino depende do registro específico). Infundir sempre em 1–2 min, monitorando PA principalmente em cães sob isoflurano ou acepromazina.',
    },
    {
      label: '8. INCOMPATIBILIDADE FÍSICA COM PANTOPRAZOL E MISTURAS EM SERINGA',
      text: 'Há relato de precipitação quando maropitant e pantoprazol compartilham a mesma linha IV. Não misturar na mesma seringa com outros fármacos; usar vias separadas ou lavar o acesso antes e após administração. Presença no mesmo paciente não comprova compatibilidade em Y-site.',
    },
  ],

  doses: [
    {
      id: 'dose-maro-dog-sc',
      species: 'dog',
      indication: 'Prevenção e tratamento de vômito agudo em cães (Bula BR/FDA)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC',
      frequency: 'q24h',
      duration: 'Até 5 dias consecutivos (bula); reavaliar se persistir >48 h',
      clinicalContext: 'Cães ≥2 meses na rotulagem FDA; seguir idade mínima da marca brasileira utilizada.',
      notes:
        'Equivale a 0,1 mL/kg da solução 10 mg/mL (expresso em maropitant ativo). Quando compatível com a bula do produto (ex.: Cerenia®), aplicar refrigerado reduz dor SC; para Marovet®, observar conservação em 15–30 °C segundo bula própria.',
      monitoring: 'Frequência de vômitos, náusea residual, reação no local SC e hidratação.',
      referenceIds: ['ref-maro-zoetis-bula', 'ref-maro-fda-2025', 'ref-maropitant-dogs-rct-2008'],
      evidenceLevel: 'Forte — Bula registrada e ensaios clínicos randomizados',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-inj-20ml',
    },
    {
      id: 'dose-maro-dog-iv',
      species: 'dog',
      indication: 'Prevenção e tratamento de vômito agudo em cães ≥4 meses — via IV (Bula FDA)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta (1–2 min)',
      frequency: 'q24h',
      duration: 'Até 5 dias consecutivos',
      clinicalContext:
        'Aprovado por bula FDA para cães ≥4 meses; verificar bula do produto brasileiro adquirido (uso IV com Marovet® ou página BR não especificada caracteriza uso extrabula).',
      notes:
        'Infundir estritamente em 1 a 2 minutos sem misturar na seringa. Monitorar pressão arterial especialmente sob anestesia inalatória ou acepromazina. Nunca administrar junto com pantoprazol na mesma linha IV.',
      monitoring: 'Pressão arterial, ECG em cardiopatas, resolução da êmese e náusea.',
      referenceIds: ['ref-maro-fda-2025', 'ref-maropitant-dogs-rct-2008'],
      evidenceLevel: 'Forte — Bula FDA (verificar registro nacional por produto)',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-inj-20ml',
    },
    {
      id: 'dose-maro-dog-po',
      species: 'dog',
      indication: 'Prevenção e tratamento de vômito agudo em cães — via oral (Bula BR/FDA)',
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: '5 dias (2–7 meses) ou até cessar o vômito (>7 meses)',
      clinicalContext: 'Dose mínima rotulada de 2 mg/kg VO; cães ≥2 meses.',
      notes:
        'A dose oral é o dobro da parenteral porque a biodisponibilidade oral canina é ~24% a 2 mg/kg (primeira passagem hepática). O esquema comercial por faixas de peso pode entregar >2 mg/kg sem arredondar abaixo da dose mínima.',
      monitoring: 'Retenção do comprimido sem êmese precoce, hidratação e evolução clínica.',
      referenceIds: ['ref-maro-zoetis-bula', 'ref-maro-fda-2025', 'ref-maropitant-dogs-rct-2008'],
      evidenceLevel: 'Forte — Bula brasileira/FDA e ensaio clínico randomizado',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-comp',
    },
    {
      id: 'dose-maro-dog-motion',
      species: 'dog',
      indication: 'Prevenção de vômito por cinetose (enjoo de movimento) em cães ≥4 meses (Bula BR/FDA)',
      doseMin: 8,
      doseMax: 8,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h (~2 h antes da viagem)',
      duration: 'Máximo de 2 dias consecutivos',
      clinicalContext: 'Dose mínima de 8 mg/kg VO específica para cinetose; não utilizar em vômitos gastrointestinais de rotina.',
      notes:
        'Satura a primeira passagem hepática (CYP2D15), elevando a biodisponibilidade para ~37%. Administrar ~2 h antes do deslocamento com pequena porção alimentar (evitar refeição completa pré-viagem). Não trata ansiedade comportamental. Evitar altas doses em filhotes <11–16 semanas pelo risco histológico de hipoplasia medular.',
      monitoring: 'Sialorreia pré-viagem, vômito, sonolência/letargia e sinais de estresse.',
      referenceIds: ['ref-maro-zoetis-bula', 'ref-maro-fda-2025', 'ref-maro-benchaoui-2007'],
      evidenceLevel: 'Forte — Bula registrada e estudos farmacocinéticos',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-comp',
    },
    {
      id: 'dose-maro-dog-cisplatin-chemo',
      species: 'dog',
      indication: 'Profilaxia de êmese induzida por quimioterápicos ou opioides em cães ≥4 meses (Bula FDA)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC ou IV lenta (1–2 min)',
      frequency: 'Dose prévia única (45–60 min antes do estímulo)',
      duration: 'Dose única pré-quimioterapia ou pré-opioide (pode seguir q24h se vômito tardio)',
      clinicalContext:
        'A janela prévia de 45–60 min (mínimo 30 min) é crítica: aplicação simultânea com morfina ou hidromorfona perde expressivamente a eficácia preventiva.',
      notes:
        'Em quimioterapia emetogênica (ex.: cisplatina), a profilaxia prévia supera o resgate tardio. Considerar associação de ondansetrona se náusea intensa persistir.',
      monitoring: 'Vômito agudo/tardio e sinais de náusea pós-quimioterapia.',
      referenceIds: ['ref-maro-fda-2025', 'ref-maro-vail-2007'],
      evidenceLevel: 'Forte — Bula FDA e ensaios clínicos em oncologia/anestesia',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-inj-20ml',
    },
    {
      id: 'dose-maro-cat-vomito',
      species: 'cat',
      indication: 'Tratamento do vômito em gatos ≥4 meses (Bula FDA; uso nacional conforme registro do produto)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC ou IV lenta (1–2 min)',
      frequency: 'q24h',
      duration: 'Até 5 dias consecutivos',
      clinicalContext:
        'Aprovado em gatos ≥4 meses pela bula FDA; no Brasil, verificar registro da marca utilizada (página consultada de Cerenia® e Marovet® especificam cães).',
      notes:
        'Equivale a 0,1 mL/kg da solução 10 mg/mL. Dor à injeção SC ocorre em até ~33,9% dos gatos tratados em campo; produto refrigerado reduz o desconforto quando permitido pela bula.',
      monitoring: 'Vocalização/dor à aplicação SC, vômitos, náusea, ingestão alimentar e hidratação.',
      referenceIds: ['ref-maro-fda-2025', 'ref-maro-hickman-2008', 'ref-maro-ersoz-2026'],
      evidenceLevel: 'Forte — Bula FDA e meta-análise felina (RR 0,20)',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-inj-20ml',
    },
    {
      id: 'dose-maro-cat-po',
      species: 'cat',
      indication: 'Prevenção e manejo de vômito em gatos — via oral (Literatura/Formulários; extrabula)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h (ou dose única prévia 2–18 h antes de estímulo)',
      duration: 'Conforme quadro clínico e tolerância oral',
      clinicalContext: 'Comprimidos comerciais são registrados para cães; uso oral em gatos é extrabula.',
      notes:
        'Biodisponibilidade oral felina (~40–50%) e meia-vida mais longa fundamentam 1 mg/kg VO (metade da dose canina oral). Atenção à salivação ou rejeição na manipulação do comprimido em gatos.',
      monitoring: 'Aceitação oral, salivação pós-administração e controle emético.',
      referenceIds: ['ref-maro-hickman-2008'],
      evidenceLevel: 'Moderada — Formulários veterinários e estudos experimentais felinos',
      calculatorEnabled: true,
      presentationId: 'pres-cerenia-comp',
    },
    {
      id: 'dose-maro-cat-drc',
      species: 'cat',
      indication: 'Vômito crônico na DRC felina estável IRIS 2–3 (Ensaio clínico — DOSE FIXA)',
      doseMin: 4,
      doseMax: 4,
      doseUnit: 'mg',
      perWeightUnit: 'gato (dose fixa)',
      route: 'VO',
      frequency: 'q24h',
      duration: '14 dias (protocolo do ensaio clínico controlado)',
      clinicalContext:
        'DOSE FIXA de 4 mg/gato (NÃO multiplicar pelo peso em kg). Não extrapolar automaticamente para IRIS 4 descompensada.',
      notes:
        'No ensaio clínico controlado (Quimby et al. 2015), 4 mg/gato VO reduziu significativamente o vômito (p < 0,01), mas não melhorou apetite, peso ou atividade. Se o gato parar de vomitar mas seguir anoréxico, investigar e tratar hiporexia separadamente.',
      maximumDose: '4 mg/gato (dose fixa estudada)',
      monitoring: 'Frequência de vômitos, apetite real, peso corporal, hidratação, potássio e função renal.',
      referenceIds: ['ref-maropitant-ckd-cats-rct-2015', 'ref-maro-icatcare-2026'],
      evidenceLevel: 'Moderada — Ensaio clínico randomizado controlado (Quimby et al. 2015)',
      calculatorEnabled: false,
    },
    {
      id: 'dose-maro-cat-pruritus-exp',
      species: 'cat',
      indication: 'Prurido em síndrome cutânea atópica felina (EXPERIMENTAL — evidência limitada)',
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q24h',
      duration: '28 dias (4 semanas)',
      clinicalContext: 'Estudo piloto aberto não controlado (n = 12 gatos); uso experimental extrabula.',
      notes:
        'A ausência de grupo controle impede concluir eficácia definitiva ou recomendá-lo como primeira linha. Calculadora desativada por tratar-se de protocolo experimental.',
      referenceIds: ['ref-maro-maina-2019'],
      evidenceLevel: 'Limitada — Estudo piloto aberto não controlado',
      calculatorEnabled: false,
    },
    {
      id: 'dose-maro-dog-cough-exp',
      species: 'dog',
      indication: 'Tosse na bronquite crônica canina (EXPERIMENTAL — não trata inflamação brônquica)',
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q48h',
      duration: '14 dias (efeito máximo pode levar 1–2 semanas)',
      clinicalContext: 'Estudo não controlado com 8 cães; NÃO reduz neutrófilos ou eosinófilos no lavado broncoalveolar.',
      notes:
        'Reduziu escores de tosse relatados pelos tutores, mas não trata a inflamação brônquica de base. Não substituir corticoterapia ou manejo específico das vias aéreas.',
      referenceIds: ['ref-maro-grobman-2016'],
      evidenceLevel: 'Limitada — Estudo clínico pequeno não controlado',
      calculatorEnabled: false,
    },
    {
      id: 'dose-maro-cri-exp',
      species: 'both',
      indication: 'Adjuvante anestésico / CRI experimental (poupança de inalatório — NÃO validada como analgesia isolada)',
      doseMin: 30,
      doseMax: 200,
      doseUnit: 'µg/kg/h',
      perWeightUnit: 'infusão contínua experimental',
      route: 'IV CRI após bolus 1 mg/kg IV',
      frequency: 'Contínua durante anestesia (50–200 µg/kg/h cães; 30–100 µg/kg/h gatos)',
      duration: 'Transoperatório experimental',
      clinicalContext:
        'Sem estabilidade farmacotécnica padronizada para mistura nas apresentações comerciais brasileiras; NÃO existe CRI antiemética de rotina.',
      notes:
        'Reduziu fração expirada de sevoflurano (~14,2% em ensaio canino de 2025 e ~15–24% em estudos experimentais anteriores), mas sem benefício estatístico consistente na dor pós-operatória em cadelas. Nunca usar para substituir opioides ou bloqueios regionais.',
      referenceIds: ['ref-maro-silva-2025', 'ref-maro-niyom-2013'],
      evidenceLevel: 'Limitada/Inconsistente — Protocolo anestésico experimental',
      calculatorEnabled: false,
    },
  ],

  detailedIndications: [
    {
      id: 'ind-maro-dog-cat-emesis',
      indication: 'Vômito agudo associado a gastroenteropatias, parvovirose, pancreatite e doenças sistêmicas',
      clinicalContext:
        'Pacientes com gastroenterite, parvovirose, pancreatite, hepatopatias, uremia ou vômitos medicamentosos recebem múltiplos estímulos eméticos simultâneos. No vômito ativo, preferir via parenteral antes da transição oral.',
      species: 'both',
      dose: '1 mg/kg SC/IV lenta (cães e gatos) | ≥2 mg/kg VO (cães) | 1 mg/kg VO extrabula (gatos)',
      route: 'SC, IV lenta (1–2 min) ou VO',
      frequency: 'q24h',
      duration: 'Até 5 dias consecutivos segundo bula; reavaliação obrigatória em 24–48 h',
      mechanismOfAction:
        'A inflamação GI, isquemia esplâncnica e mediadores humorais ativam aferências vagais e circuitos bulbares que convergem para a transmissão por substância P nos receptores NK₁ do complexo vagal dorsal.',
      clinicalRationale:
        'Ao atuar na via de integração emética, reduz vômitos de diversas etiologias e facilita suporte hídrico e enteral. Entretanto, NÃO possui efeito procinético nem substitui o diagnóstico etiológico: um animal com corpo estranho obstrutivo ou perfuração pode cessar a êmese sem resolução cirúrgica.',
      monitoring:
        'Frequência de vômitos, persistência de náusea (ptialismo/lambedura), hidratação, eletrólitos, dor abdominal e reavaliação por imagem se houver suspeita obstrutiva.',
      highlights: [
        'Ação central e periférica',
        'SC/IV no vômito ativo',
        'Não é procinético',
        'Vômito controlado ≠ exclusão de obstrução',
        'Reavaliação em 24–48 h',
      ],
      referenceIds: ['ref-maro-zoetis-bula', 'ref-maropitant-dogs-rct-2008', 'ref-maro-sullivan-2018', 'ref-maro-ersoz-2026'],
      evidenceLevel: 'Forte — Regime principal para controle da êmese',
    },
    {
      id: 'ind-maro-dog-motion',
      indication: 'Cinetose (enjoo de movimento) e vômito vestibular em cães',
      clinicalContext:
        'Desencadeada por conflito entre sinais vestibulares, visuais e proprioceptivos em viagens. O regime canino de 8 mg/kg VO difere do regime de gastroenterite e não deve ser confundido com terapia da ansiedade.',
      species: 'dog',
      dose: 'Mínimo de 8 mg/kg (cães ≥4 meses; gatos têm apenas uso experimental de 1 mg/kg SC/VO)',
      route: 'VO',
      frequency: 'q24h, administrado pelo menos 2 horas antes da viagem',
      duration: 'Máximo de 2 dias consecutivos',
      mechanismOfAction:
        'A dose oral quadruplicada satura parcialmente o metabolismo hepático de primeira passagem (CYP2D15), elevando a biodisponibilidade (~37%) e garantindo ocupação dos receptores NK₁ envolvidos na convergência vestíbulo-bulbar.',
      clinicalRationale:
        'Oferecer com pequena porção de alimento (evitar refeição volumosa pré-viagem). Como não é ansiolítico nem sedativo, vocalização, ofegação ou tremores persistentes exigem abordagem comportamental ou ansiolítica, não elevação empírica de dose.',
      monitoring: 'Sialorreia pré-viagem, êmese e sinais de medo/ansiedade.',
      highlights: [
        'Estímulo vestibular',
        '≥8 mg/kg VO em cães',
        '2 horas antes da viagem',
        'Máximo 2 dias',
        'Não trata ansiedade',
      ],
      referenceIds: ['ref-maro-zoetis-bula', 'ref-maro-fda-2025', 'ref-maro-benchaoui-2007'],
      evidenceLevel: 'Forte — Indicação registrada para cães',
    },
    {
      id: 'ind-maro-chemo-opioids',
      indication: 'Prevenção de êmese induzida por quimioterapia, opioides e sedativos pré-anestésicos',
      clinicalContext:
        'Agonistas μ-opioides (morfina, hidromorfona), certos α₂-agonistas (xilazina) e quimioterápicos (cisplatina, doxorrubicina) desencadeiam êmese intensa via área postrema e aferências GI.',
      species: 'both',
      dose: '1 mg/kg',
      route: 'SC ou IV lenta (1–2 min)',
      frequency: '45–60 minutos antes do estímulo emético',
      duration: 'Dose prévia única (ou cursos curtos q24h conforme protocolo oncológico)',
      mechanismOfAction:
        'Bloqueia a transmissão final mediada por substância P/NK₁ sem antagonizar receptores opioides μ, dopaminérgicos D₂ ou serotoninérgicos 5-HT₃. Portanto, reduz o reflexo emético sem bloquear analgesia opioide.',
      clinicalRationale:
        'A janela temporal pré-operatória é decisiva: a administração simultânea com morfina ou hidromorfona resulta em falha preventiva relevante; 30 a 60 min de antecedência reduzem drasticamente o vômito. Todavia, não previne refluxo gastroesofágico (RGE) nem substitui ondansetrona na náusea quimioterápica mediada por 5-HT₃.',
      monitoring: 'Episódios de êmese vs sinais de náusea/ptialismo e pressão arterial sob anestesia.',
      highlights: [
        '45–60 min antes do estímulo',
        'Cisplatina e opioides',
        'Não previne RGE anestésico',
        'NK₁ ≠ 5-HT₃ (náusea residual)',
      ],
      referenceIds: ['ref-maro-fda-2025', 'ref-maro-vail-2007', 'ref-maro-shin-2026'],
      evidenceLevel: 'Forte para prevenção do vômito nas condições avaliadas',
    },
    {
      id: 'ind-maro-cat-ckd',
      indication: 'Vômito crônico associado à Doença Renal Crônica (DRC) felina',
      clinicalContext:
        'Gatos com DRC IRIS 2–3 estáveis que apresentam vômitos recorrentes secundários a toxinas urêmicas na área postrema e disfunção GI associada.',
      species: 'cat',
      dose: '4 mg/gato (dose fixa total estudada; não calcular por kg)',
      route: 'VO (uso extrabula)',
      frequency: 'q24h',
      duration: '14 dias (ensaio clínico); reavaliação contínua caso uso estendido',
      mechanismOfAction:
        'Inibe receptores NK₁ na área postrema e complexo vagal dorsal expostos a toxinas urêmicas circulantes, diminuindo a frequência de vômitos.',
      clinicalRationale:
        'No ensaio cego controlado com placebo de Quimby et al. (2015) em gatos IRIS 2–3 (n = 41 randomizados; 33 concluintes), houve redução significativa do vômito (p < 0,01), porém sem melhora de apetite, peso, atividade ou creatinina sérica. Não extrapolar automaticamente para IRIS 4 descompensada.',
      monitoring: 'Frequência de vômitos, consumo calórico real, peso corporal, hidratação e pressão arterial.',
      highlights: [
        'DRC IRIS 2–3 estável',
        'Dose fixa 4 mg/gato',
        'Redução de vômito (p < 0,01)',
        'Sem ganho direto de apetite',
      ],
      referenceIds: ['ref-maropitant-ckd-cats-rct-2015', 'ref-maro-icatcare-2026'],
      evidenceLevel: 'Moderada — Ensaio clínico controlado em IRIS 2–3 (extrabula)',
    },
    {
      id: 'ind-maro-experimental',
      indication: 'Aplicações experimentais: antinocicepção/CAM, bronquite crônica canina e prurido atópico felino',
      clinicalContext:
        'A substância P participa de vias nociceptivas no corno dorsal, neuroinflamação de vias aéreas e prurido neurogênico cutâneo; todas essas indicações são extrabula e carecem de comprovação robusta de primeira linha.',
      species: 'both',
      dose: 'Anestesia CRI: 1 mg/kg IV + 50–200 µg/kg/h (cães) ou 30–100 µg/kg/h (gatos) | Bronquite cão: 2 mg/kg VO q48h × 14d | Prurido gato: 2 mg/kg VO q24h × 28d',
      route: 'IV CRI / VO',
      frequency: 'Experimental conforme estudo',
      duration: 'Experimental',
      mechanismOfAction:
        'Modulação central e periférica da transmissão peptidergica mediada por substância P/NK₁ em aferentes viscerais, fibras C cutâneas e reflexos tusse-neurogênicos.',
      clinicalRationale:
        'Na OVH canina (UFMG 2025), a CRI de 50 ou 100 µg/kg/h reduziu o sevoflurano expirado em ~14,2%, porém SEM benefício em escores de dor pós-operatória. Na bronquite crônica canina (n = 8), reduziu escores de tosse em 1–2 semanas, mas NÃO reduziu neutrófilos ou eosinófilos no lavado broncoalveolar. Na dermatite felina (n = 12), faltou grupo controle.',
      monitoring: 'Se usado em anestesia: FC, ECG, PA, FR, SpO₂, EtCO₂, fração expirada do inalatório e dor.',
      highlights: [
        'Evidência limitada / experimental',
        'Não substitui opioides',
        'Não reduz inflamação brônquica',
        'Sem protocolo CRI antiemético padrão',
      ],
      referenceIds: ['ref-maro-silva-2025', 'ref-maro-niyom-2013', 'ref-maro-grobman-2016', 'ref-maro-maina-2019'],
      evidenceLevel: 'Limitada / Experimental — Não substitui terapias padrão',
    },
  ],

  contraindications: [
    'Hipersensibilidade conhecida ao maropitant ou a qualquer componente da formulação (incluindo reações anafiláticas ou anafilactoides prévias).',
    'Presença ou forte suspeita de obstrução mecânica gastrointestinal, intussuscepção ou perfuração: o bloqueio emético mascara a gravidade clínica e atrasa a cirurgia.',
    'Antes da decisão de indução de êmese após ingestão recente de toxinas: o maropitant impede a ação de eméticos (apomorfina, ropinirol, xilazina).',
    'Filhotes abaixo da idade mínima autorizada por bula (risco de hipoplasia de medula óssea em cães <11–16 semanas expostos a doses elevadas; Cerenia FDA ≥2 meses SC/VO, ≥4 meses cinetose/IV; gatos ≥4 meses).',
    'Cautela/evitação na associação com bloqueadores de canais de cálcio (amlodipino, diltiazem, verapamil) segundo advertências regulatórias europeias devido à afinidade do maropitant por canais de Ca²⁺.',
  ],

  cautions: [
    'Hepatopatia significativa: eliminação quase exclusivamente hepática; requer cautela e individualização (uma referência farmacológica admite considerar redução empírica de ~50%, mas sem percentual validado universalmente para ajuste automático).',
    'Cardiopatias com arritmias ou QT prolongado e associação com agentes que prolongam repolarização (sotalol, quinidina, cisaprida, domperidona): potencial bloqueio de canais de potássio cardíacos.',
    'Administração IV rápida e associação com acepromazina/isoflurano: infundir em 1–2 minutos e monitorar pressão arterial pelo risco de hipotensão transitória.',
    'Dor frequente à injeção subcutânea (especialmente em gatos): dissociar o complexo SBECD acima de 20 °C aumenta maropitant livre; usar produto refrigerado quando previsto na bula.',
    'Diferenças de registro Brasil vs FDA e estabilidade pós-abertura por produto (Cerenia BR 56d vs FDA 90d refrigerado vs Marovet 60d em 15–30 °C).',
    'Gestação e lactação: segurança reprodutiva não estabelecida; utilizar somente quando o benefício materno justificar o risco potencial.',
  ],

  adverseEffects: [
    'Dor, desconforto ou vocalização transitória à injeção subcutânea (observada em 33,9% dos gatos em estudo de campo — 22,6% moderada e 11,3% intensa — e frequente em cães).',
    'Hipotensão arterial transitória após administração intravenosa, agravada em cães sob isoflurano e pré-medicados com acepromazina.',
    'Em estudos clínicos com cisplatina em cães: diarreia (7,8%), anorexia/hiporexia (5,2%), reação no local da aplicação (4%) e letargia (2,6%).',
    'Hipersalivação e vômito pré-viagem (especialmente nas doses orais de 8 mg/kg para cinetose se dado em jejum prolongado sem pequeno alimento).',
    'Relatos pós-comercialização raros ou sem taxa confiável: ataxia, tremores musculares, convulsões, febre, dispneia, recumbência e reações anafiláticas/anafilactoides (edema facial, urticária).',
    'Discreta alteração do intervalo QTc sem arritmias em cães saudáveis (estudo de 2025) e hipoplasia de medula óssea em filhotes <11 semanas sob doses elevadas (não vista ≥16 semanas).',
  ],

  interactions: [
    'Pantoprazol na mesma linha IV: incompatibilidade física relatada com formação de precipitado — utilizar acessos separados ou lavar adequadamente o cateter.',
    'Bloqueadores de canais de cálcio (amlodipino, diltiazem, verapamil): advertência europeia para evitar uso concomitante pela afinidade por canais de cálcio; monitorar PA e ECG se indispensável.',
    'Fármacos que prolongam QT (sotalol, quinidina, cisaprida, domperidona): potencial efeito aditivo na repolarização cardíaca.',
    'Inibidores de CYP3A / CYP2D (cetoconazol, itraconazol, eritromicina, cimetidina, fluoxetina, terbinafina): interação teórica por biotransformação hepática; espaçar cimetidina oral em 2 horas quando associada.',
    'Fármacos altamente ligados a proteínas (AINEs, anticoagulantes, sulfonamidas): competição teórica pela ligação proteica (~99,5%), geralmente sem relevância clínica sustentada.',
    'Eméticos (apomorfina, ropinirol ocular, xilazina): maropitant antagoniza a resposta emética esperada.',
    'Associações racionais sinérgicas: ondansetrona (para náusea refratária via 5-HT₃), opioides (previne êmese sem anular analgesia) e procinéticos (quando há íleo).',
  ],

  routes: ['SC', 'IV lenta (1–2 min)', 'VO'],

  administration: [
    'Subcutânea (SC): 1 mg/kg (0,1 mL/kg da solução 10 mg/mL) q24h. Quando previsto na bula (ex.: Cerenia®), a aplicação refrigerada (2–8 °C) reduz a dissociação do complexo SBECD e diminui a dor local; para Marovet®, observar conservação em 15–30 °C conforme bula própria.',
    'Intravenosa (IV): 1 mg/kg (0,1 mL/kg) lentamente ao longo de 1–2 minutos (regra da bula FDA para cães e gatos ≥4 meses; verificar registro nacional do produto). Nunca misturar na mesma seringa nem correr na mesma linha com pantoprazol.',
    'Pré-operatório contra êmese por opioides: administrar 45–60 min antes (mínimo 30 min) do opioide emetogênico; não previne refluxo gastroesofágico (RGE).',
    'Oral (VO) em cães: 2 mg/kg q24h para vômito agudo (após estabilização parenteral se êmese ativa); 8 mg/kg VO ~2 horas antes da viagem com pequena porção alimentar para cinetose (até 2 dias). Não embrulhar em massa espessa de alimento que impeça a desagregação gástrica.',
    'Oral (VO) em gatos: uso extrabula (1 mg/kg q24h segundo formulários ou 4 mg/gato q24h × 14d em DRC IRIS 2–3).',
  ],

  presentations: [
    {
      id: 'pres-cerenia-inj-20ml',
      name: 'Cerenia® 10 mg/mL Solução Injetável Frasco 20 mL (Zoetis)',
      brand: 'Cerenia® (Zoetis Brasil)',
      form: 'Solução injetável estéril multidose (expressa em maropitant ativo)',
      concentrationValue: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC (página BR cães) / SC ou IV lenta 1–2 min (bula FDA cães e gatos ≥4 meses)',
      channel: 'veterinary',
      commercialProductSlug: 'cerenia-injetavel',
      calculatedMlPerKgFormula: '0,1 mL/kg (para dose parenteral de 1 mg/kg)',
      packInfo:
        'Frasco de 20 mL contendo citrato de maropitant monoidratado equivalente a 10 mg/mL de maropitant ativo, com sulfobutiléter-β-ciclodextrina (SBECD) e metacresol. Referência técnica BR cita 56 dias após primeira punção; rotulagem FDA prevê 90 dias sob refrigeração (2–8 °C, máx. 25 punções).',
    },
    {
      id: 'pres-cerenia-comp',
      name: 'Cerenia® Comprimidos Ranhurados 16 mg, 24 mg, 60 mg e 160 mg (Zoetis)',
      brand: 'Cerenia® (Zoetis Brasil)',
      form: 'Comprimidos orais ranhurados (blister de alumínio com 4 unidades)',
      concentrationValue: 24,
      concentrationUnit: 'mg/comprimido',
      route: 'VO (bula BR: cães; uso oral em gatos é extrabula)',
      channel: 'veterinary',
      commercialProductSlug: 'cerenia-comprimidos',
      scoringInfo:
        'Comprimidos ranhurados em blister protetor de umidade (estabilidade de metade preservada em folha metálica por 48 h descrita na Europa). Não presumir divisão automática em 1/4 ou 1/8 nem arredondar para baixo da dose mínima.',
      packInfo:
        'Blister aluminizado com 4 comprimidos. Bula BR indicada para vômito agudo (≥2 mg/kg) e cinetose (≥8 mg/kg) em cães.',
      concentrationOptions: [
        { id: '16', label: '16 mg', concentrationValue: 16, concentrationUnit: 'mg/comprimido' },
        { id: '24', label: '24 mg', concentrationValue: 24, concentrationUnit: 'mg/comprimido', isDefault: true },
        { id: '60', label: '60 mg', concentrationValue: 60, concentrationUnit: 'mg/comprimido' },
        { id: '160', label: '160 mg', concentrationValue: 160, concentrationUnit: 'mg/comprimido' },
      ],
    },
    {
      id: 'pres-marovet-inj-20ml',
      name: 'Marovet® 10 mg/mL Solução Injetável Frasco-ampola 20 mL (Botupharma)',
      brand: 'Marovet® (Botupharma Brasil)',
      form: 'Solução injetável estéril multidose (expressa em maropitant ativo)',
      concentrationValue: 10,
      concentrationUnit: 'mg/mL',
      route: 'SC em cães (bula Botupharma; uso IV ou felino caracteriza extrabula)',
      channel: 'veterinary',
      commercialProductSlug: 'marovet-injetavel',
      calculatedMlPerKgFormula: '0,1 mL/kg (para dose de 1 mg/kg SC)',
      packInfo:
        'Frasco-ampola âmbar de 20 mL (10 mg/mL de maropitant ativo). Conservar entre 15–30 °C protegido da luz e utilizar em até 60 dias após a abertura; seguir idade mínima e restrições da bula própria.',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Via SC (1 mg/kg): rápida e elevada em ambas as espécies, com biodisponibilidade de ~91% (Tmax ~0,56 h [<1 h] e Cmax ~103 ng/mL no cão; Tmax ~0,32 h no gato). Via IV (1 mg/kg): 100% por definição, atingindo Cmax ~3× maior que SC no cão (~297 ng/mL). Via VO em cães: comportamento não linear por saturação hepática de primeira passagem — biodisponibilidade de ~24% a 2 mg/kg (Tmax ~1,9 h; Cmax ~81 ng/mL) eleva-se para ~37% a 8 mg/kg (Tmax ~1,7 h), sem prejuízo relevante pelo alimento. Via VO em gatos (~1 mg/kg): biodisponibilidade de ~40–50% (Tmax variável; uso extrabula). Nota metodológica: estudo PK antigo estimou ~117% SC em gatos (fisiologicamente impossível); adota-se ~91% como referência regulatória. Vias IM, OTM e transdérmica não possuem biodisponibilidade quantificada com segurança.',
    distribution:
      'Ligação a proteínas plasmáticas extremamente elevada (~99,5% no cão; ~99–99,1% no gato). Volume de distribuição no estado de equilíbrio (Vdss IV) de ~9,3 L/kg em cães nos estudos regulatórios e ~2,3 L/kg em gatos, indicando extensa distribuição extravascular. A estrutura quinuclidínica lipofílica [isômero (2S,3S)] permite acesso funcional aos receptores NK₁ do sistema nervoso central, porém a concentração exata no LCR (% do plasma), passagem placentária e excreção no leite não estão estabelecidas com segurança.',
    metabolism:
      'Metabolismo predominantemente hepático via citocromo P450 com diferenças interespécie marcantes. Cães: CYP2D15 (alta afinidade e baixa capacidade — satura em doses maiores) e CYP3A12 (menor afinidade e alta capacidade — assume o clearance nas doses de cinetose), originando ≥21 metabólitos (incluindo metabólito hidroxilado ativo). Gatos: isoformas das famílias CYP1A e CYP3A; ao contrário de outros fármacos, a deficiência felina de glicuronidação não é o fator explicativo central. Filhotes (10 semanas em cães; 16 semanas em gatos) exibem clearance mais rápido que adultos.',
    elimination:
      'Depuração essencialmente hepática com recuperação urinária de fármaco inalterado <1% em cães e gatos (sem influência relevante de pH urinário). Em cães, clearance IV varia conforme estudo e dose (~970–1.500 mL/kg/h em baixa dose) e meia-vida é ~6,9 h (IV), ~8,8 h (SC; faixa 6,07–17,7 h) e ~4,03 h (VO 2 mg/kg; faixa 2,58–7,09 h). Em gatos, clearance IV é ~510 mL/kg/h, meia-vida IV ~4,9 h e meia-vida terminal SC mais longa (~16,8 h em adultos; faixa global ~13–17 h) influenciada pela taxa de absorção subcutânea. Apesar de meias-vidas <24 h, a persistência da ocupação de NK₁ sustenta intervalo clínico q24h. Acúmulo em cães por AUC: ~1,5× (5d 1 mg/kg SC ou 2 mg/kg VO), ~2,18× (2d 8 mg/kg VO), ~2,46× (14d 2 mg/kg VO) e ~4,81× (14d 8 mg/kg VO; embora estudo de 28d a 2 mg/kg VO não tenha evidenciado acúmulo adicional); também há acúmulo mensurável em gatos com SC repetida.',
    halfLife:
      'Cães: ~6,9 h (IV 1 mg/kg), ~8,8 h (SC 1 mg/kg) e ~4,0 h (VO 2 mg/kg) | Gatos adultos: ~4,9 h (IV 1 mg/kg) e ~16,8 h (SC 1 mg/kg)',
    plasmaBinding: 'Cães ~99,5% | Gatos ~99–99,1%',
    cnsPenetration:
      'Penetração funcional central demonstrada pela atividade antiemética bulbar (estrutura lipofílica 2S,3S), mas % de concentração no LCR vs plasma não estabelecida com segurança.',
  },

  generalInfoData: {
    pharmacologicalClassification: {
      chemicalClass: 'Quinuclidina substituída — Citrato de maropitant monoidratado (CJ-11,972)',
      chemicalClassDescription:
        'Isômero estereoquímico (2S,3S) de fórmula base C₃₂H₄₀N₂O (MM base 468,68 g/mol; citrato monoidratado 678,81 g/mol) com grupos aromáticos volumosos e caráter lipofílico que favorecem distribuição tecidual e acesso central. Rotulado comercialmente em equivalentes de maropitant base ativo (10 mg/mL = 10 mg de base ativa/mL).',
      therapeuticClass: 'Antiemético de amplo espectro — Antagonista seletivo de NK₁',
      therapeuticClassDescription:
        'Bloqueia a ação da substância P no receptor de neurocinina-1 (NK₁), integrando a modulação de estímulos periféricos e centrais sem atuar primariamente como antagonista 5-HT₃, D₂, H₁ ou M₁.',
      atcCode: 'QA04AD90',
      receptorsAndSites: [
        {
          name: 'Receptor NK₁ (gene TACR1 — proteína Gq/11)',
          type: 'Alvo farmacológico primário (antagonismo competitivo)',
          action: 'Impede a ligação da substância P, bloqueando PLC-β → hidrólise de PIP₂ → IP₃/DAG → liberação de Ca²⁺ intracelular e ativação de PKC.',
          clinicalEffect: 'Interrompe a transmissão excitatória bulbar e visceral do reflexo do vômito.',
        },
        {
          name: 'Complexo vagal dorsal (Núcleo do Trato Solitário / Área Postrema)',
          type: 'Sítio integrador central no tronco encefálico',
          action: 'Atenua a convergência de sinais vindos da área postrema (humoral/toxinas), aferências vagais GI e vias vestibulares.',
          clinicalEffect: 'Controle amplo da êmese por causas GI, urêmicas, quimioterapia, opioides e cinetose.',
        },
        {
          name: 'Medula espinhal (corno dorsal) e aferências neurogênicas periféricas',
          type: 'Sítios modulatórios secundários / experimentais',
          action: 'Reduz a neurotransmissão mediada por substância P em fibras nociceptivas viscerais e cutâneas.',
          clinicalEffect: 'Potencial poupador de CAM anestésica, antinociceptivo visceral, antitussígeno e antipruriginoso com evidência clínica variável.',
        },
        {
          name: 'Canais de potássio e canais de cálcio cardíacos (interação secundária)',
          type: 'Alvo off-target / segurança cardiovascular',
          action: 'Afinidade descrita por canais iônicos cardíacos em estudos pré-clínicos/regulatórios.',
          clinicalEffect: 'Fundamenta cautela em pacientes com QT prolongado e advertência europeia sobre associação com bloqueadores de canais de Ca²⁺.',
        },
      ],
      autonomicAndEndocrineEffects: [
        {
          system: 'Gastrointestinal',
          effect: 'Antiemético sem efeito procinético',
          description:
            'Reduz êmese de forma robusta; não acelera esvaziamento gástrico nem trânsito intestinal (pode reduzir discretamente padrões pressóricos contráteis do intestino delgado) e não previne RGE anestésico.',
        },
        {
          system: 'Neurológico e Vestibular',
          effect: 'Bloqueio NK₁ central (não ansiolítico)',
          description:
            'Previne vômito vestibular (cinetose) em cães a 8 mg/kg VO; não possui ação sedativa ou ansiolítica nem substitui controle comportamental.',
        },
        {
          system: 'Nociceptivo',
          effect: 'Modulação visceral experimental',
          description:
            'Pode reduzir necessidade de anestésico inalatório (~14–24% da CAM) em modelos cirúrgicos, mas não substitui opioides, anestesia local ou analgesia multimodal.',
        },
        {
          system: 'Cardiovascular',
          effect: 'Atenção a repolarização e pressão arterial',
          description:
            'Pode causar queda transitória de PA após IV rápida (especialmente sob isoflurano/acepromazina) e alteração discreta de QTc; cautela com arritmias e bloqueadores de Ca²⁺.',
        },
        {
          system: 'Respiratório',
          effect: 'Antitussígeno experimental (não anti-inflamatório)',
          description:
            'Reduziu tosse relatada em pequeno estudo de bronquite crônica canina, sem reduzir neutrófilos ou eosinófilos no lavado broncoalveolar.',
        },
        {
          system: 'Renal',
          effect: 'Ausência de nefroproteção direta',
          description:
            'Útil contra vômitos urêmicos na DRC (excreção renal <1%), mas não reduz creatinina nem altera a progressão estrutural renal.',
        },
        {
          system: 'Cutâneo',
          effect: 'Modulação experimental de prurido neurogênico',
          description:
            'Evidência felina preliminar em estudo piloto aberto sem grupo controle (n = 12).',
        },
        {
          system: 'Endócrino',
          effect: 'Sem ação endócrina terapêutica validada',
          description:
            'Alterações endócrinas não constituem alvo clínico nem parâmetro de monitorização rotineira.',
        },
      ],
      detailedTargets: [
        {
          target: 'NTS e Área Postrema (Complexo Vagal Dorsal)',
          action: 'Bloqueio competitivo NK₁ pós-sináptico contra substância P',
          clinicalSignificance: 'Suprime a via motora integrada do vômito independentemente do gatilho proximal.',
        },
        {
          target: 'Convergência Vestíbulo-Visceral',
          action: 'Atenuação do recrutamento NK₁ em doses orais elevadas (cinetose) ou aferências vagais',
          clinicalSignificance: 'Explica necessidade de ≥8 mg/kg VO na cinetose canina vs ≥2 mg/kg VO no vômito GI.',
        },
        {
          target: 'Vias Nociceptivas e Neurogênicas (Corno Dorsal / Terminações Periféricas)',
          action: 'Antagonismo de substância P em fibras aferentes C/A-delta',
          clinicalSignificance: 'Base mecanística para redução de CAM e estudos em dor visceral, tosse e prurido, ainda sem força para substituir terapias padrão.',
        },
      ],
    },
    routesDetailed: [
      {
        route: 'Via Subcutânea (SC)',
        technique:
          'Dose padrão de 1 mg/kg (0,1 mL/kg na solução de 10 mg/mL) q24h, com técnica asséptica. Quando previsto na rotulagem do produto (ex.: formulações com sulfobutiléter-β-ciclodextrina refrigeradas), administrar o líquido refrigerado a 2–8 °C atenua a dissociação termodependente do maropitant livre acima de 20 °C e diminui o desconforto local.',
        nursingCare:
          'Aplicar sem friccionar vigorosamente o local; alternar sítios subcutâneos em tratamentos seriados e registrar reação vocal ou cutânea (ocorre em ~33,9% dos gatos com formulação com metacresol).',
        limitations:
          'Na presença de choque grave ou edema subcutâneo intenso, a absorção SC pode ser errática. Não aplicar regras de refrigeração de formulações com SBECD/metacresol automaticamente a marcas com excipiente e armazenamento próprios (ex.: Marovet® conserva em 15–30 °C).',
      },
      {
        route: 'Via Intravenosa (IV)',
        technique:
          'Regime FDA: 1 mg/kg (0,1 mL/kg) em cães e gatos ≥4 meses, infundido lentamente ao longo de 1 a 2 minutos por acesso venoso pérvio. Na profilaxia de êmese por quimioterapia ou opioides (morfina, hidromorfona), administrar 45–60 min antes (mínimo 30 min).',
        nursingCare:
          'Monitorar pressão arterial durante e logo após a infusão em pacientes anestesiados ou pré-medicados com acepromazina. Lavar o cateter com SF 0,9% antes e depois de qualquer outro medicamento, evitando contato com pantoprazol.',
        limitations:
          'Conferir o registro brasileiro da marca utilizada (página BR consultada de Cerenia® descreve via SC em cães; Marovet® indica via SC em cães). Não misturar na mesma seringa e não usar em bolus rápido. Não previne refluxo gastroesofágico (RGE) perioperatório.',
      },
      {
        route: 'Via Oral (VO)',
        technique:
          'Cães: mínimo de 2 mg/kg q24h para vômito agudo (após cessar êmese ativa parenteral) ou mínimo de 8 mg/kg ~2 h antes da viagem para cinetose com pequena porção alimentar (evitar refeição completa). Gatos (extrabula): 1 mg/kg q24h ou 4 mg/gato fixo na DRC IRIS 2–3.',
        nursingCare:
          'Não envolver o comprimido em bolo denso de petisco/pasta que impeça a desagregação no estômago. Em cinetose, lembrar que o medicamento não substitui manejo de ansiedade. Se associada à cimetidina oral, espaçar as administrações em 2 horas.',
        limitations:
          'Em pacientes com êmese ativa incontrolável, o comprimido pode ser expelido antes da absorção. Comprimidos frequentemente causam salivação/rejeição em gatos; não presumir fracionamento em 1/4 ou 1/8 ou trituração segura fora das instruções de bula.',
      },
      {
        route: 'Vias Não Padronizadas (IM, OTM, Transdérmica e CRI Experimental)',
        technique:
          'As vias intramuscular, transmucosa oral (OTM) e transdérmica não dispõem de farmacocinética clínica validada para rotina. A infusão contínua (CRI) restringe-se a estudos experimentais de anestesia (bolus 1 mg/kg IV + 50–200 µg/kg/h em cães; 30–100 µg/kg/h em gatos).',
        nursingCare:
          'Qualquer protocolo experimental em CRI anestésica exige monitorização completa (FC, ECG, PA, FR, SpO₂, EtCO₂, T°C, fração expirada do inalatório e dor) e validação farmacotécnica da diluição.',
        limitations:
          'Não existe CRI antiemética padronizada para rotina clínica nem dados universais de estabilidade após diluição para os frascos comerciais disponíveis no Brasil.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Solução de Cloreto de Sódio 0,9% (SF 0,9%): usada para lavagem do acesso venoso antes/após administração isolada (estabilidade prolongada em mistura diluída não padronizada universalmente para todas as marcas)',
        'Ringer com Lactato: empregado como veículo em ensaios experimentais específicos de CRI anestésica, porém sem comprovação universal de estabilidade química e microbiológica para prescrição padrão',
      ],
      incompatibleFluids: [
        'Pantoprazol sódico na mesma linha IV ou equipo em Y (relato de precipitação física)',
        'Qualquer outro medicamento misturado na mesma seringa (incompatibilidade potencial e ausência de estudos)',
        'SG 5% como diluente padrão de infusão (compatibilidade físico-química e estabilidade não confirmadas com segurança)',
      ],
      infusionRateGuidance:
        'Via IV intermitente: infundir 1 mg/kg ao longo de 1–2 minutos, isoladamente. Exemplo puramente matemático de CRI experimental (sem protocolo validado de preparo): cão de 5 kg a 50 µg/kg/h → 250 µg/h (0,25 mg/h); numa solução validada a 0,1 mg/mL, corresponderia a 2,5 mL/h.',
      preparationNotes:
        'A administração concomitante de antibióticos (ex.: cefazolina) e fluidoterapia em estudos clínicos de campo comprova uso no mesmo paciente, mas NÃO comprova compatibilidade física no mesmo Y-site ou equipo. Sempre utilizar vias separadas ou flush rigoroso entre fármacos.',
      storageRequirements:
        'Comparativo de estabilidade pós-abertura (não intercambiáveis): • Cerenia® Injetável rotulagem FDA: conservar a 2–8 °C após primeira punção e usar em até 90 dias (máx. 25 perfurações). • Cerenia® Injetável referência técnica Brasil: utilizar em até 56 dias após primeira retirada. • Marovet® Brasil (Botupharma): conservar a 15–30 °C protegido da luz e utilizar em até 60 dias após abertura. • Comprimidos Cerenia®: manter no blister aluminizado protegido de umidade; metade preservada em folha metálica mostrou estabilidade de 48 h em estudo europeu.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Cães: metabolismo não linear (CYP2D15/3A12), cinetose e nuance ABCB1 (MDR1)',
        description:
          'A saturação pré-sistêmica de CYP2D15 explica o aumento da biodisponibilidade oral de ~24% (2 mg/kg) para ~37% (8 mg/kg), bem como o maior acúmulo sistêmico após 14 dias repetidos (~2,46× a 2 mg/kg; ~4,81× a 8 mg/kg). Filhotes de 10 semanas eliminam mais rápido, porém cães <11 semanas sob altas doses exibiram maior hipoplasia medular histológica (ausente em ≥16 semanas). Quanto ao gene ABCB1 (MDR1): não há evidência para contraindicar maropitant ou impor redução automática como ocorre com ivermectina/loperamida, embora literatura toxicológica veterinária relate possível depressão discreta a moderada do SNC em cães com a mutação.',
        clinicalImplications:
          'Respeitar idade mínima de cada bula (especialmente na dose de 8 mg/kg para cinetose), diferenciar 2 mg/kg VO vs 1 mg/kg parenteral e monitorar letargia/sedação em cães de raças predispostas à mutação MDR1 sem negar terapia antiemética quando indicada.',
      },
      {
        species: 'cat',
        title: 'Gatos: clearance mais lento (CYP1A/3A), dor SC e registro brasileiro extrabula',
        description:
          'Em felinos, o metabolismo oxidativo depende de CYP1A e CYP3A (a deficiência felina de glicuronidação não explica sua cinética), com clearance ~510 mL/kg/h e meia-vida terminal SC mais longa (~16,8 h em adultos vs ~4,9 h IV). A absorção oral é superior (~40–50%), sustentando 1 mg/kg VO em protocolos extrabula. A dor/vocalização à aplicação SC ocorre em ~33,9% dos gatos (22,6% moderada + 11,3% intensa) pela dissociação de SBECD e presença de metacresol.',
        clinicalImplications:
          'Nos EUA a via SC/IV é aprovada pela FDA para gatos ≥4 meses, mas no Brasil a página consultada de Cerenia® e a bula do Marovet® descrevem cães (sendo uso felino extrabula conforme produto). Aplicar produto refrigerado quando previsto em bula e observar rigorosamente a dose fixa de 4 mg/gato em DRC IRIS 2–3.',
      },
      {
        species: 'dog',
        title: 'Diferenças de excipientes e equivalência de sal (SBECD, metacresol vs álcool benzílico)',
        description:
          'A solução de Cerenia® usa sulfobutiléter-β-ciclodextrina (SBECD) e metacresol; formulações europeias com álcool benzílico (não comercializadas no Brasil) produzem escores de dor SC significativamente menores mesmo em temperatura ambiente. Além disso, a concentração rotulada de 10 mg/mL já expressa equivalentes de maropitant ativo, não do sal citrato.',
        clinicalImplications:
          'Nunca converter doses de mg de citrato para mg de base e jamais transferir automaticamente orientações de conservação, dor local ou via IV entre marcas comerciais diferentes.',
      },
    ],
    prescriptionType: {
      category: 'Prescrição médico-veterinária simples (Brasil)',
      ordinanceOrLaw: 'Receituário veterinário simples (sem retenção de via pela Portaria SVS/MS 344/1998)',
      retentionRequired: false,
      guidelines:
        'Registrar identificação completa do médico-veterinário (CRMV), do paciente e do tutor, espécie, concentração do produto, dose em mg/kg, dose total em mg, volume em mL (nunca apenas o volume isolado), via de administração, intervalo e duração do tratamento.',
    },
    curiositiesAndHistory: [
      'Desenvolvido originalmente sob o código experimental CJ-11,972 como antagonista não peptídico seletivo NK₁ para uso em medicina veterinária.',
      'No Brasil, ainda não existe apresentação humana registrada com maropitant nem apresentação comercial veterinária em gotas calibradas; manipulações eventuais (extrabula) não permitem número fixo padronizado de gotas/mL devido à variação de gotejador e veículo.',
      'Apesar de amplo apelo em anestesia e dor visceral, ensaio clínico recente (UFMG, 2025) confirmou redução de ~14,2% do sevoflurano expirado com CRI, mas sem melhora consistente de escores de dor pós-operatória em cadelas.',
    ],
  },

  attentionData: {
    attentionSubtitle:
      'Vômito controlado não exclui abdome cirúrgico nem resolve náusea residual. Individualizar hepatopatas sem corte automático na calculadora, respeitar janelas etárias, evitar pantoprazol no mesmo acesso e observar alertas cardíacos.',
    precautions: [
      {
        condition: 'Hipersensibilidade conhecida ao maropitant ou excipientes (Contraindicação forte)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Reações anafiláticas e anafilactoides (edema facial, urticária, dispneia, colapso) foram relatadas após exposição comercial.',
        clinicalAction:
          'Suspender imediatamente, instituir suporte emergencial e evitar reexposição sem avaliação especializada.',
      },
      {
        condition: 'Suspeita de obstrução intestinal mecânica ou perfuração gastrointestinal',
        alertLevel: 'warning',
        physiologicalExplanation:
          'O bloqueio central em NK₁ suprime o reflexo emético mesmo diante de corpo estranho obstrutivo ou necrose de alça; há relatos de perfuração por atraso diagnóstico.',
        clinicalAction:
          'Investigar ativamente com palpação e exames de imagem; nunca usar a parada do vômito para descartar cirurgia nem manter uso sintomático prolongado sem diagnóstico (>48 h).',
      },
      {
        condition: 'Ingestão recente de toxinas (antes da decisão de descontaminação)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Bloqueia o centro emético medular e torna ineficazes agentes indutores de vômito (apomorfina, ropinirol, xilazina).',
        clinicalAction:
          'Definir primeiramente tóxico, tempo desde ingestão e indicação de emese/lavagem antes de administrar antieméticos.',
      },
      {
        condition: 'Hepatopatia significativa (compensada ou descompensada)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Biotransformação hepática predominante (CYP2D15/CYP3A12 em cães; CYP1A/CYP3A em gatos) com risco de redução do clearance e maior exposição sistêmica.',
        clinicalAction:
          'Individualizar dose, intervalo e monitoramento clínico/bioquímico. Evitar regra automática de -50% em calculadoras, pois não há percentual universal validado por estudo clínico e subdosagem pode falhar.',
      },
      {
        condition: 'Cardiopatias com arritmia, QT prolongado ou bloqueadores de canais de Ca²⁺',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Bloqueio potencial de canais de potássio (repolarização/QTc discreto em estudo canino de 2025) e afinidade descrita por canais de cálcio (advertência europeia contra associação com bloqueadores de Ca²⁺).',
        clinicalAction:
          'Avaliar ECG basal, eletrólitos (K⁺, Mg²⁺, Ca²⁺) e alternativas em cardiopatas predispostos; evitar associações arrítmicas desnecessárias.',
      },
      {
        condition: 'Filhotes muito jovens (<8–16 semanas) e dose elevada (8 mg/kg)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Estudos toxicológicos demonstraram maior frequência e gravidade de hipoplasia histológica de medula óssea em filhotes <11 semanas recebendo doses altas (não observada em cães ≥16 semanas).',
        clinicalAction:
          'Seguir estritamente idade mínima de cada bula (≥2 meses vômito / ≥4 meses cinetose e IV na bula FDA) e monitorar hemograma se exposição acidental elevada.',
      },
      {
        condition: 'Gestação, lactação e reprodutores',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Segurança reprodutiva, transferência placentária e excreção no leite não foram adequadamente estabelecidas em cadelas e gatas.',
        clinicalAction:
          'Evitar uso eletivo; administrar apenas quando os benefícios maternos justificarem claramente os riscos potenciais.',
      },
      {
        condition: 'Anestesia com isoflurano/acepromazina e risco de refluxo gastroesofágico (RGE)',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A injeção IV pode reduzir a PA (~10–15 mmHg em cães acordados) e agravar hipotensão (<60 mmHg PAM) sob acepromazina/isoflurano; além disso, maropitant NÃO previne RGE nem reduz esvaziamento gástrico.',
        clinicalAction:
          'Infundir IV lentamente em 1–2 min monitorando PA, aplicar SC/IV 45–60 min antes de opioides emetogênicos e associar protetor/pró-cinético quando prevenção de RGE for objetivo.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Dor, desconforto ou vocalização à aplicação subcutânea',
        frequency: 'very_common',
        mechanism:
          'Dissociação termodependente do complexo maropitant–SBECD acima de 20 °C liberando fármaco livre irritante a nociceptores locais, somada à irritação do conservante metacresol (documentada em 33,9% de 133 gatos em campo: 22,6% moderada + 11,3% intensa).',
        clinicalManagement:
          'Técnica subcutânea delicada; utilizar produto refrigerado (2–8 °C) quando compatível com a bula específica do frasco e alternar locais.',
      },
      {
        effect: 'Diarreia, anorexia/hiporexia e reação no local de aplicação',
        frequency: 'common',
        mechanism:
          'Em ensaio canino com cisplatina, observaram-se diarreia (7,8%), anorexia/hiporexia (5,2%) e reação local (4%); parte pode decorrer da doença de base ou da quimioterapia associada.',
        clinicalManagement:
          'Avaliar hidratação, distinguir náusea residual de intolerância medicamentosa e inspecionar área subcutânea.',
      },
      {
        effect: 'Letargia, sonolência e hipersalivação',
        frequency: 'common',
        mechanism:
          'Letargia em 2,6% em ensaio oncológico; hipersalivação frequentemente associada ao sabor amargo oral em gatos/cães ou à dose de 8 mg/kg VO em jejum para cinetose (incluindo vômito pré-viagem).',
        clinicalManagement:
          'Oferecer comprimidos de cinetose com pequena porção alimentar; verificar perfusão e glicemia se letargia persistente.',
      },
      {
        effect: 'Hipotensão arterial transitória à injeção IV',
        frequency: 'uncommon',
        mechanism:
          'Queda transitória da pressão arterial sistólica/média (~10–15 mmHg em cães acordados; PAM <60 mmHg descrita sob acepromazina e isoflurano), por mecanismo vasodilatador ainda não totalmente elucidado.',
        clinicalManagement:
          'Nunca realizar bolus IV rápido; administrar em 1–2 minutos com monitoramento hemodinâmico contínuo no paciente anestesiado.',
      },
      {
        effect: 'Alteração discreta de QTc (cães saudáveis) e bloqueio de canais de potássio',
        frequency: 'uncommon',
        mechanism:
          'Estudo prospectivo de 2025 documentou variação discreta do QT corrigido em uma das fórmulas sem taquiarritmias/bradiarritmias em cães saudáveis após 1 mg/kg SC.',
        clinicalManagement:
          'Não requer ECG rotineiro em pacientes hígidos, mas exige cautela em cardiopatias, distúrbios eletrolíticos ou uso de antiarrítmicos.',
      },
      {
        effect: 'Ataxia, tremores, convulsões, dispneia, recumbência e anafilaxia',
        frequency: 'rare',
        mechanism:
          'Relatos de farmacovigilância pós-comercialização (causalidade nem sempre comprovada) e reações de hipersensibilidade sistêmica (edema facial, urticária). Também descrita depressão leve a moderada do SNC em cães com mutação MDR1.',
        clinicalManagement:
          'Suspender o fármaco, estabilizar vias aéreas/hemodinâmica e investigar causas neurológicas ou metabólicas paralelas.',
      },
      {
        effect: 'Hipoplasia de medula óssea (filhotes jovens) e hemólise (altas doses felinas)',
        frequency: 'overdose',
        mechanism:
          'Hipoplasia medular dose-dependente observada histologicamente em filhotes <11 semanas sob altas doses (ausente ≥16 semanas). Doses muito elevadas em gatos foram associadas a risco de hemólise.',
        clinicalManagement:
          'Não existe antídoto específico; suspender exposição, monitorar hemograma/eletrólitos/ECG e instituir suporte intensivo. Não induzir êmese indiscriminadamente após superdosagem.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'DRC IRIS Estágios 1, 2 e 3',
        recommendedAdjustment: 'Sem redução percentual padronizada necessária.',
        physiologicalRationale:
          'Menos de 1% da dose é excretada inalterada pelos rins; há ensaio controlado de 14 dias em gatos IRIS 2–3 estáveis com 4 mg/gato VO q24h.',
      },
      {
        clinicalCondition: 'DRC IRIS Estágio 4 e Lesão Renal Aguda (LRA)',
        recommendedAdjustment: 'Sem percentual validado de ajuste; monitorar paciente globalmente.',
        physiologicalRationale:
          'A depuração é hepática, porém pacientes em IRIS 4 ou LRA possuem maior instabilidade hemodinâmica, comorbidades e hipoperfusão hepática potencial.',
      },
      {
        clinicalCondition: 'Hepatopatia compensada ou descompensada',
        recommendedAdjustment: 'Individualizar dose/intervalo com cautela (sem corte automático fixo de -50%).',
        physiologicalRationale:
          'Embora uma referência farmacológica sugira considerar redução empírica de ~50% na disfunção hepática, não existem ensaios suficientes validando esse corte universal para ambas as espécies e todos os graus hepáticos.',
      },
      {
        clinicalCondition: 'Hipoalbuminemia severa e Caquexia',
        recommendedAdjustment: 'Não há ajuste quantitativo validado; vigiar tolerabilidade.',
        physiologicalRationale:
          'Ligação proteica muito alta (~99–99,5% à albumina e α1-glicoproteína ácida); redução proteica e de massa magra pode elevar transitoriamente a fração livre.',
      },
      {
        clinicalCondition: 'Pacientes geriátricos e Obesidade',
        recommendedAdjustment: 'Sem redução automática por idade ou regra validada de peso ideal.',
        physiologicalRationale:
          'A idade isolada não substitui avaliação hepática/cardíaca; não há estudos validando cálculo sistemático por peso ideal em obesos.',
      },
      {
        clinicalCondition: 'Neonatos/pediátricos (<8–16 semanas) e Gestação/Lactação',
        recommendedAdjustment: 'Respeitar idade mínima de bula e evitar uso eletivo na prenhez.',
        physiologicalRationale:
          'Risco de alterações medulares em cães muito jovens sob doses altas e ausência de estudos conclusivos de segurança reprodutiva.',
      },
      {
        clinicalCondition: 'Hipovolemia/choque e Tratamento prolongado (>5 dias)',
        recommendedAdjustment: 'Estabilizar perfusão antes de IV e reavaliar necessidade em uso contínuo.',
        physiologicalRationale:
          'Baixo débito compromete depuração hepática e potencializa hipotensão; cursos >5 dias exigem investigação diagnóstica contínua (intervalo de 72 h entre ciclos descrito em bula europeia).',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Pantoprazol sódico (mesma linha IV / equipo em Y)',
        severity: 'major',
        clinicalEffect: 'Formação imediata de precipitado insolúvel com obstrução de cateter ou falha de infusão.',
        pharmacologicalMechanism: 'Incompatibilidade físico-química direta em solução compartilhada.',
      },
      {
        drugOrClass: 'Bloqueadores de canais de cálcio (Amlodipino, Diltiazem, Verapamil)',
        severity: 'major',
        clinicalEffect: 'Advertência em bulas europeias para evitar associação; possível somação hipotensora/eletrofisiológica.',
        pharmacologicalMechanism: 'Afinidade descrita do maropitant por canais de cálcio com potencial interação farmacodinâmica (evidência clínica direta ainda limitada).',
      },
      {
        drugOrClass: 'Agentes que prolongam QT (Sotalol, Quinidina, Cisaprida, Domperidona)',
        severity: 'major',
        clinicalEffect: 'Risco potencial aditivo de prolongamento da repolarização ventricular em pacientes predispostos.',
        pharmacologicalMechanism: 'Possível efeito somatório sobre canais de potássio cardíacos (IKr/repolarização); monitorar ECG e eletrólitos.',
      },
      {
        drugOrClass: 'Anestésicos inalatórios (Isoflurano) e Acepromazina (com maropitant IV)',
        severity: 'moderate',
        clinicalEffect: 'Redução significativa da pressão arterial (PAM <60 mmHg transitória relatada durante injeção IV).',
        pharmacologicalMechanism: 'Somação de vasodilatação α1-adrenolítica/anestésica com efeito hipotensor agudo do maropitant intravenoso.',
      },
      {
        drugOrClass: 'Inibidores de CYP3A / CYP2D (Cetoconazol, Itraconazol, Eritromicina, Fluoxetina, Terbinafina, Cimetidina)',
        severity: 'moderate',
        clinicalEffect: 'Interação teórica com elevação potencial da exposição ao maropitant (pouco comprovada clinicamente em cães/gatos).',
        pharmacologicalMechanism: 'Inibição das isoformas hepáticas CYP2D15, CYP3A12, CYP1A ou CYP3A. Espaçar cimetidina oral em 2 horas por precaução.',
      },
      {
        drugOrClass: 'Fármacos altamente ligados a proteínas plasmáticas (AINEs, Varfarina, Rivaroxabana, Sulfonamidas)',
        severity: 'informational',
        clinicalEffect: 'Deslocamento transitório teórico da fração livre plasmática sem toxicidade sustentada esperada após equilíbrio de clearance.',
        pharmacologicalMechanism: 'Competição por sítios de ligação à albumina e α1-glicoproteína ácida (ligação do maropitant ~99,5%).',
      },
      {
        drugOrClass: 'Associações úteis e interferência em testes (Ondansetrona, Opioides, Procinéticos, IDT)',
        severity: 'minor',
        clinicalEffect: 'Ondansetrona (5-HT₃) e procinéticos atuam em vias complementares; maropitant previne êmese por opioides (45–60 min antes), mas antagoniza eméticos (apomorfina/ropinirol) e pode alterar reatividade em teste intradérmico canino.',
        pharmacologicalMechanism: 'Antagonismo NK₁ independente de 5-HT₃, D₂ e receptores μ; redução da resposta inflamatória neurogênica cutânea ou alteração vascular em testes alérgicos.',
      },
    ],
  },

  practicalWeightTable: {
    standardDoseText:
      'Conversão matemática para solução 10 mg/mL (1 mg/kg = 0,1 mL/kg) e doses-alvo matemáticas orais caninas (2 mg/kg e 8 mg/kg). ATENÇÃO: as bulas de comprimidos usam doses MÍNIMAS (≥2 mg/kg e ≥8 mg/kg) — não arredondar para baixo da dose mínima nem presumir divisão em 1/4 ou 1/8 fora da ranhura autorizada (ex.: cão de 5 kg tem alvo 10 mg, mas 1 comprimido de 16 mg entrega 3,2 mg/kg, compatível com a bula). Nunca aplicar 2 ou 8 mg/kg por via injetável.',
    headers: [
      'Peso',
      'Dose Parenteral 1 mg/kg',
      'Volume Injetável 10 mg/mL',
      'Cão: Alvo 2 mg/kg VO',
      'Cão: Alvo 8 mg/kg VO (Cinetose)',
    ],
    rows: [
      { weight: '2 kg', totalDose: '2 mg', col1: '0,20 mL', col2: '4 mg', col3: '16 mg (1 comp 16 mg)' },
      { weight: '4 kg', totalDose: '4 mg', col1: '0,40 mL', col2: '8 mg (1/2 comp 16 mg)', col3: '32 mg (2 comp 16 mg)' },
      { weight: '5 kg', totalDose: '5 mg', col1: '0,50 mL', col2: '10 mg (1 comp 16 mg = 3,2 mg/kg)', col3: '40 mg (2 comp 24 mg = 48 mg)' },
      { weight: '10 kg', totalDose: '10 mg', col1: '1,00 mL', col2: '20 mg (1 comp 24 mg = 24 mg)', col3: '80 mg' },
      { weight: '15 kg', totalDose: '15 mg', col1: '1,50 mL', col2: '30 mg (1/2 comp 60 mg)', col3: '120 mg (2 comp 60 mg)' },
      { weight: '20 kg', totalDose: '20 mg', col1: '2,00 mL', col2: '40 mg (2 comp 24 mg = 48 mg)', col3: '160 mg (1 comp 160 mg)' },
      { weight: '30 kg', totalDose: '30 mg', col1: '3,00 mL', col2: '60 mg (1 comp 60 mg)', col3: '240 mg (1,5 comp 160 mg)' },
      { weight: '40 kg', totalDose: '40 mg', col1: '4,00 mL', col2: '80 mg (1/2 comp 160 mg)', col3: '320 mg (2 comp 160 mg)' },
    ],
  },

  monitoringParameters: [
    'Frequência e características dos vômitos (em todos os pacientes — principal desfecho de eficácia).',
    'Sinais de náusea residual (ptialismo, lambedura labial, deglutições repetidas) e interesse alimentar voluntário: ausência de vômito não exclui náusea.',
    'Peso corporal e ingestão calórica real em internações ou doenças crônicas (como DRC felina).',
    'Enzimas hepáticas (ALT, AST, ALP), bilirrubinas e albumina em hepatopatias, uso prolongado ou doença sistêmica associada.',
    'Ureia, creatinina e SDMA em pacientes renais (para acompanhar a nefropatia primária, não como toxicidade típica do maropitant).',
    'Eletrólitos (potássio, magnésio, cálcio) em vômitos intensos, cardiopatias ou risco de prolongamento de QT.',
    'Hemograma em filhotes jovens de risco, superdosagens ou tratamentos atípicos prolongados (não exigido em cursos curtos usuais).',
    'ECG e pressão arterial em cardiopatas, choque, interações relevantes (bloqueadores de Ca²⁺/QT) e infusão IV sob anestesia; SpO₂/EtCO₂ durante anestesia geral.',
    'Dor, edema ou vocalização no local da injeção SC.',
  ],

  clientInformation: [
    'Para prevenção de enjoo de viagem (cinetose) em cães, administrar aproximadamente 2 horas antes do deslocamento com uma pequena porção de alimento (evitar refeição completa antes de viajar), por no máximo 2 dias seguidos.',
    'Não embrulhar os comprimidos firmemente em massas espessas ou petiscos densos, pois isso pode impedir a liberação adequada do medicamento no estômago.',
    'Se utilizar metade de um comprimido, envolver imediatamente a porção restante no próprio alumínio/embalagem protetora longe de umidade, crianças e animais.',
    'Não administrar a filhotes abaixo da idade recomendada (especialmente cães <8 semanas) e avisar imediatamente o médico-veterinário caso ocorra prostração intensa, dor abdominal, piora ou retorno dos vômitos, diarreia, hipersalivação ou reação alérgica (inchaço facial/urticária).',
    'A exposição tópica acidental em humanos pode desencadear alergia cutânea: lavar a pele com água e sabão; em contato ocular, enxaguar com água por 15 minutos e buscar atendimento médico.',
  ],

  clinicalFoundationsData: [
    {
      id: 'maro-foundation-1',
      title: 'A eficácia antiemética é robusta em cães e gatos, mas depende do desfecho avaliado (vômito vs náusea)',
      narrative:
        'Ensaios clínicos de campo em cães e uma metanálise felina de 2026 confirmam elevada redução absoluta e relativa na incidência de vômitos. Contudo, estudos prospectivos de sedação/pré-medicação e quimioterapia demonstram que abolir o reflexo motor emético não equivale a extinguir a náusea nem garantir melhora de todos os sinais gastrointestinais.',
      narrativeHighlights: ['RR 0,20 (IC 95% 0,08–0,55) em gatos', '0% vômito vs 74,2% náusea residual (2026)'],
      referenceIds: ['ref-maropitant-dogs-rct-2008', 'ref-maro-ersoz-2026', 'ref-maro-shin-2026'],
      studies: [
        {
          citation: 'Ramsey DS et al. J Vet Pharmacol Ther. 2008;31(6):538–543.',
          referenceId: 'ref-maropitant-dogs-rct-2008',
          sourceType: 'Ensaio clínico randomizado multicêntrico',
          summaryText:
            'Em análise de 199 cães de campo, o vômito ocorreu em 31/145 (21,4%) animais tratados vs 27/54 (50%) no grupo placebo (redução absoluta ~28,6 pontos percentuais).',
          summaryHighlights: ['n = 199 cães', '21,4% vs 50%'],
          metrics: ['n = 199 cães (145 tratados vs 54 placebo)'],
          clinicalConclusion:
            'Forte suporte para controle do vômito agudo em múltiplas etiologias, sem dispensar terapia específica da causa.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/19000277/',
        },
        {
          citation: 'Revisão sistemática e metanálise felina. Vet Med Sci. 2026; DOI: 10.1002/vms3.71172.',
          referenceId: 'ref-maro-ersoz-2026',
          sourceType: 'Revisão sistemática e meta-análise',
          summaryText:
            'Cinco estudos controlados reuniram 141 gatos tratados e 152 controles (principalmente êmese induzida/perioperatória): 11 vs 70 episódios, com risco relativo de 0,20 (IC 95%: 0,08–0,55; ~80% de redução relativa).',
          summaryHighlights: ['5 estudos controlados', '293 gatos', 'RR = 0,20'],
          metrics: ['141 tratados vs 152 controles'],
          clinicalConclusion:
            'Evidência sólida para redução do vômito nos contextos estudados, respeitando heterogeneidade entre cenários clínicos.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/42599757/',
        },
        {
          citation: 'Shin CW, Ambros B. Vet Anaesth Analg. 2026.',
          referenceId: 'ref-maro-shin-2026',
          sourceType: 'Ensaio clínico randomizado cego',
          summaryText:
            'Preveniu 100% dos vômitos após hidromorfona/dexmedetomidina em cães (0/31 vs 32,1% controle), mas 74,2% dos tratados ainda apresentaram sinais de náusea moderada a severa (sialorreia, lambedura labial).',
          summaryHighlights: ['0% êmese', '74,2% náusea residual'],
          metrics: ['31 cães tratados'],
          clinicalConclusion:
            'Provas clínicas de dissociação entre controle emético e controle da náusea.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/42208176/',
        },
      ],
    },
    {
      id: 'maro-foundation-2',
      title: 'Maropitant vs ondansetrona e uso na DRC felina: escolhas baseadas em vias distintas',
      narrative:
        'Na enterite por parvovírus canino, maropitant (NK₁) e ondansetrona (5-HT₃) demonstraram desempenho hospitalar semelhante em amostra pequena (n = 22), sem superioridade universal automática. Na DRC felina IRIS 2–3, o bloqueio NK₁ controlou vômitos, mas não corrigiu hiporexia ou peso corporal.',
      narrativeHighlights: ['Parvovirose: sem diferença p > 0,36 (n=22)', 'DRC felina: p < 0,01 vômito, sem ganho ponderal'],
      referenceIds: ['ref-maro-sullivan-2018', 'ref-maropitant-ckd-cats-rct-2015'],
      studies: [
        {
          citation: 'Sullivan LA et al. J Am Anim Hosp Assoc. 2018; DOI: 10.5326/JAAHA-MS-6650.',
          referenceId: 'ref-maro-sullivan-2018',
          sourceType: 'Ensaio clínico prospectivo randomizado cego',
          summaryText:
            'Comparou maropitant 1 mg/kg IV q24h (n = 11) vs ondansetrona 0,5 mg/kg IV q8h (n = 11) na parvovirose: hospitalização (3,36 vs 2,73 dias, p = 0,36), resgate antiemético (3/11 vs 5/11, p = 0,66), dias com vômito (5 vs 4, p = 0,65) e retorno à alimentação (2 vs 1,5 dia, p = 1,0).',
          summaryHighlights: ['n = 22 cães', 'p = 0,36–1,0'],
          metrics: ['22 cães (11 vs 11)'],
          clinicalConclusion:
            'A escolha ou eventual associação em casos refratários deve basear-se em perfil de náusea, acesso IV e resposta individual, não em prescrição dupla automática.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/30272481/',
        },
        {
          citation: 'Quimby JM et al. J Feline Med Surg. 2015;17(8):692–697.',
          referenceId: 'ref-maropitant-ckd-cats-rct-2015',
          sourceType: 'Ensaio clínico randomizado cego placebo-controlado',
          summaryText:
            '41 gatos com DRC IRIS 2–3 estáveis randomizados (33 concluíram: 21 tratados com 4 mg/gato VO q24h × 14 dias vs 12 placebo). Houve redução significativa dos vômitos (p < 0,01), sem melhora de apetite, peso, atividade ou creatinina.',
          summaryHighlights: ['41 randomizados (33 concluíram)', '4 mg/gato VO × 14d', 'p < 0,01 vômito'],
          metrics: ['21 tratados vs 12 placebo'],
          clinicalConclusion:
            'Excelente para vômito urêmico felino em IRIS 2–3, mas não atua como estimulante de apetite.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/25336450/',
        },
      ],
    },
    {
      id: 'maro-foundation-3',
      title: 'Potencial poupador de anestésicos (CAM), segurança cardíaca e aplicações experimentais',
      narrative:
        'A redução da fração expirada de anestésicos inalatórios em modelos experimentais não demonstrou equivalência analgésica clínica pós-operatória suficiente para substituir opioides. Na cardiologia experimental, alteração discreta de QTc em cães saudáveis não causou arritmias, mas não isenta cardiopatas de cautela. Em vias aéreas e pele, melhora de tosse ou prurido não comprova efeito anti-inflamatório ou eficácia controlada.',
      narrativeHighlights: ['Redução 14,2% sevoflurano (UFMG 2025) sem benefício analgésico pós-op', 'Sem redução inflamatória no LBA'],
      referenceIds: ['ref-maro-silva-2025', 'ref-maro-sullivan-qt-2025', 'ref-maro-grobman-2016', 'ref-maro-maina-2019'],
      studies: [
        {
          citation: 'Silva AKE et al. Vet Res Commun. 2025; DOI: 10.1007/s11259-025-10966-8.',
          referenceId: 'ref-maro-silva-2025',
          sourceType: 'Ensaio clínico randomizado cirúrgico',
          summaryText:
            '45 cadelas submetidas à OVH receberam bolus 1 mg/kg IV + CRI de 50, 75, 100 ou 200 µg/kg/h vs salina. Fração expirada de sevoflurano caiu de 2,11 ± 0,07% para 1,81% nos grupos de 50 e 100 µg/kg/h (~14,2%), porém sem benefício significativo nos escores de dor pós-operatória.',
          summaryHighlights: ['45 cadelas', 'Sevoflurano 2,11% → 1,81%', 'Sem ganho analgésico pós-op'],
          metrics: ['5 grupos (n = 45)'],
          clinicalConclusion:
            'Poupança de anestésico inalatório não autoriza classificar o maropitant como analgésico de primeira linha.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/41174265/',
        },
        {
          citation: 'Sullivan KE, Reader RCT, Yang VK. J Vet Emerg Crit Care. 2025; DOI: 10.1111/vec.13476.',
          referenceId: 'ref-maro-sullivan-qt-2025',
          sourceType: 'Estudo prospectivo eletrocardiográfico',
          summaryText:
            '27 cães saudáveis avaliados (20 concluíram) antes e 35–65 min após 1 mg/kg SC. Detectou-se variação discreta do QTc significativa em apenas uma das três fórmulas, sem taquiarritmias ou bradiarritmias.',
          summaryHighlights: ['n = 20 concluintes', 'Sem arritmias em cães saudáveis'],
          metrics: ['1 mg/kg SC; ECG 35–65 min'],
          clinicalConclusion:
            'Improvável relevância clínica em cães hígidos, mas não comprova segurança equivalente em cardiopatias ou polifarmácia antiarrítmica.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/40522750/',
        },
        {
          citation: 'Grobman M, Reinero CR. J Vet Intern Med. 2016; DOI: 10.1111/jvim.13935 & Maina E et al. JFMS. 2019.',
          referenceId: 'ref-maro-grobman-2016',
          sourceType: 'Estudos clínicos exploratórios não controlados',
          summaryText:
            'Na bronquite crônica canina (n = 8; 2 mg/kg VO q48h × 14d), houve melhora da tosse relatada pelos tutores sem queda de neutrófilos ou eosinófilos no lavado broncoalveolar. No prurido felino (n = 12; 2 mg/kg VO q24h × 4 semanas), estudo piloto aberto careceu de grupo controle.',
          summaryHighlights: ['n = 8 cães (tosse)', 'n = 12 gatos (prurido, aberto)'],
          metrics: ['Estudos piloto não controlados'],
          clinicalConclusion:
            'Permanecem indicações experimentais de evidência limitada; não substituem anti-inflamatórios das vias aéreas ou imunomoduladores dermatológicos.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/26995558/',
        },
      ],
    },
  ],

  clinicalStudiesCommented: [
    {
      referenceId: 'ref-maro-benchaoui-2007',
      title: 'Farmacocinética não linear e biodisponibilidade comparada em cães',
      authorsYear: 'Benchaoui HA et al. (2007)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics',
      studyDesign: 'Estudo farmacocinético experimental em cães',
      sampleSize: 'Cães adultos avaliados por vias IV, SC e VO',
      mainFindings:
        'Estabeleceu biodisponibilidade SC ~91%, aumento da biodisponibilidade oral de ~24% (2 mg/kg) para ~37% (8 mg/kg) por saturação hepática de primeira passagem e excreção renal inalterada <1%.',
      clinicalTakeaway:
        'Explica por que a dose oral canina (2 mg/kg) dobra em relação à SC (1 mg/kg) e quadruplica na cinetose (8 mg/kg).',
    },
    {
      referenceId: 'ref-maro-hickman-2008',
      title: 'Segurança, farmacocinética e prevenção de êmese em gatos',
      authorsYear: 'Hickman MA et al. (2008)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics',
      studyDesign: 'Estudo farmacocinético e experimental em felinos',
      sampleSize: 'Gatos tratados por vias IV, SC e VO',
      mainFindings:
        'Caracterizou biodisponibilidade oral felina próxima de 50%, meia-vida prolongada e eficácia antiemética frente à xilazina e ao estímulo cinemático (com estimativa histórica SC de 117% ajustada para ~91% em dados regulatórios posteriores).',
      clinicalTakeaway:
        'Base científica para a dose felina de 1 mg/kg por via parenteral ou oral extrabula.',
    },
    {
      referenceId: 'ref-maro-shin-2026',
      title: 'Dissociação entre prevenção do vômito e persistência de náusea em cães',
      authorsYear: 'Shin CW, Ambros B (2026)',
      journal: 'Veterinary Anaesthesia and Analgesia',
      studyDesign: 'Ensaio clínico randomizado cego pré-operatório',
      sampleSize: 'Cães saudáveis sedados com hidromorfona e dexmedetomidina',
      mainFindings:
        'Preveniu 100% dos vômitos (0/31 cães vs 32,1% controle), mas 74,2% dos animais tratados com maropitant mantiveram náusea moderada a severa (sialorreia e lambedura labial).',
      clinicalTakeaway:
        'Parar de vomitar não garante alívio da náusea; considerar ondansetrona quando persistirem sinais de enjoo.',
    },
    {
      referenceId: 'ref-maropitant-ckd-cats-rct-2015',
      title: 'Uso crônico na Doença Renal Crônica felina estável IRIS 2–3',
      authorsYear: 'Quimby JM et al. (2015)',
      journal: 'Journal of Feline Medicine and Surgery 17(8):692–697',
      studyDesign: 'Ensaio clínico randomizado, cego e placebo-controlado',
      sampleSize: '41 gatos randomizados (33 concluíram: 21 tratados vs 12 placebo)',
      mainFindings:
        'Dose fixa de 4 mg/gato VO q24h por 14 dias reduziu significativamente os vômitos (p < 0,01), sem alterar apetite, peso corporal, atividade ou creatinina sérica.',
      clinicalTakeaway:
        'Trata o vômito urêmico em IRIS 2–3, mas NÃO funciona como estimulante do apetite.',
    },
    {
      referenceId: 'ref-maro-sullivan-2018',
      title: 'Maropitant vs ondansetrona na enterite por parvovírus canino',
      authorsYear: 'Sullivan LA et al. (2018)',
      journal: 'Journal of the American Animal Hospital Association',
      studyDesign: 'Ensaio clínico prospectivo randomizado cego',
      sampleSize: '22 cães hospitalizados com parvovirose (11 por grupo)',
      mainFindings:
        'Hospitalização (3,36 vs 2,73 d; p = 0,36), resgate (3/11 vs 5/11; p = 0,66), dias de vômito (5 vs 4; p = 0,65) e retorno alimentar (2 vs 1,5 d; p = 1,0) sem diferença estatística significativa.',
      clinicalTakeaway:
        'Não há superioridade universal; individualizar escolha conforme náusea, acesso venoso e resposta clínica.',
    },
    {
      referenceId: 'ref-maro-silva-2025',
      title: 'Infusão contínua de maropitant na ovario-histerectomia canina',
      authorsYear: 'Silva AKE et al. (2025)',
      journal: 'Veterinary Research Communications',
      studyDesign: 'Ensaio clínico prospectivo randomizado (UFMG)',
      sampleSize: '45 cadelas em cinco grupos (controle vs 50, 75, 100, 200 µg/kg/h)',
      mainFindings:
        'Redução relativa de ~14,2% na fração expirada de sevoflurano nos grupos 50 e 100 µg/kg/h (2,11% → 1,81%), porém sem diferença estatística na dor pós-operatória ou supressão autonômica.',
      clinicalTakeaway:
        'Efeito poupador de inalatório não autoriza substituir opioides ou analgesia multimodal.',
    },
  ],

  clinicalStructuredBlocks: [
    {
      kind: 'clinicalCallout',
      variant: 'brazil',
      title: 'Exemplo didático de prescrição hospitalar (adaptar ao paciente e à bula)',
      body: 'Paciente: Canino, 10 kg | Indicação: Controle de vômito agudo. Citrato de maropitant solução injetável 10 mg/mL: administrar 1 mg/kg, equivalente a 10 mg = 1,0 mL, por via subcutânea (SC), a cada 24 horas, por até 5 dias, conforme evolução clínica. Monitorizar frequência de vômitos, náusea residual, tolerância alimentar, hidratação e reação no local de aplicação. Reavaliar a causa da êmese se houver persistência ou recorrência.',
    },
    {
      kind: 'clinicalCallout',
      variant: 'info',
      title: 'Matriz de evidência clínica para tomada de decisão no plantão',
      body: 'Forte (regime principal): vômito agudo em cães, vômito agudo em gatos (aviso regulatório brasileiro), cinetose em cães e prevenção de êmese induzida por quimioterápicos/opioides. Moderada (extrabula): vômito na DRC felina IRIS 2–3 (4 mg/gato). Limitada/Experimental: antinocicepção/CAM, tosse na bronquite crônica canina e prurido atópico felino. Insuficiente: CRI antiemética de rotina e corte percentual automático na calculadora para DRC ou hepatopatia.',
    },
  ],

  clinicalNotesRichText:
    'Síntese de plantão (12 pontos essenciais): (1) Antagonista NK₁ que bloqueia substância P; (2) Amplo espectro em estímulos centrais e periféricos; (3) Não é procinético (não resolve íleo ou obstrução); (4) Não trata etiologia primária; (5) Em cães, 1 mg/kg SC ≠ 2 mg/kg VO; (6) Cinetose canina exige ≥8 mg/kg VO; (7) Gatos têm bula FDA para SC/IV ≥4 meses, mas verificar registro brasileiro por marca; (8) Na DRC felina reduz vômitos, não necessariamente melhora apetite; (9) Aplicação SC pode causar dor (menor com produto refrigerado quando previsto em bula); (10) Hepatopatia, QT prolongado e bloqueadores de Ca²⁺ exigem individualização sem redução automática na calculadora; (11) Não misturar com pantoprazol na mesma linha IV; (12) CRI antinociceptiva permanece experimental.',

  references: [
    {
      id: 'ref-book-foundations-plumbs-maropitant',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley-Blackwell, 2023. Monograph: Maropitant Citrate (pp. 799–802) & Appendix MDR1 (p. 1489).",
      sourceType: 'Formulário farmacológico veterinário',
    },
    {
      id: 'ref-book-foundations-bsava-maropitant',
      citationText:
        'Allerton F (ed.). BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. BSAVA, 2020. Monograph: Maropitant (pp. 244–245) & Cimetidine (p. 84).',
      sourceType: 'Formulário farmacológico veterinário',
    },
    {
      id: 'ref-book-maro-lumb-jones',
      citationText:
        "Lamont L, Grimm K, Robertson S, Love L, Schroeder C (eds.). Lumb and Jones' Veterinary Anesthesia and Analgesia. 6th ed. Wiley-Blackwell. Cap. 25: Anesthetic and Analgesic Adjunctive Drugs — Maropitant (pp. 425–427).",
      sourceType: 'Livro-texto de anestesiologia e analgesia veterinária',
    },
    {
      id: 'ref-book-maro-nelson-couto',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier. Cap. 28: General Therapeutic Principles — Antiemetics (pp. 435–438) & Cap. 37: The Exocrine Pancreas (pp. 632–633, 645).',
      sourceType: 'Livro-texto de clínica médica veterinária',
    },
    {
      id: 'ref-book-maro-ettinger',
      citationText:
        "Côté E, Ettinger SJ, Feldman EC (eds.). Ettinger's Textbook of Veterinary Internal Medicine. 9th ed. Elsevier, 2024. Cap. 48: Regurgitation and Vomiting (pp. 228–232).",
      sourceType: 'Livro-texto de medicina interna veterinária',
    },
    {
      id: 'ref-book-maro-bsava-gastro-nephro',
      citationText:
        'Hall EJ, Williams DA, Kathrani A (eds.). BSAVA Manual of Canine and Feline Gastroenterology, 3rd ed. (pp. 130–131); Elliott J, Grauer GF, Westropp JL (eds.). BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd ed. (p. 271).',
      sourceType: 'Manuais clínicos especializados BSAVA',
    },
    {
      id: 'ref-maro-benchaoui-2007',
      citationText:
        'Benchaoui HA, Cox SR, Schneider RP, Boucher JF, Clemence RG. The pharmacokinetics of maropitant, a novel neurokinin type-1 receptor antagonist, in dogs. J Vet Pharmacol Ther. 2007;30(4):336–344.',
      sourceType: 'Estudo farmacocinético fundamental',
      doi: '10.1111/j.1365-2885.2007.00877.x',
      pmid: '17610407',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17610407/',
    },
    {
      id: 'ref-maro-hickman-2008',
      citationText:
        'Hickman MA, Cox SR, Mahabir S, et al. Safety, pharmacokinetics and use of the novel NK-1 receptor antagonist maropitant (Cerenia) for the prevention of emesis and motion sickness in cats. J Vet Pharmacol Ther. 2008;31(3):220–229.',
      sourceType: 'Estudo farmacocinético e experimental felino',
      doi: '10.1111/j.1365-2885.2008.00952.x',
      pmid: '18471143',
      url: 'https://pubmed.ncbi.nlm.nih.gov/18471143/',
    },
    {
      id: 'ref-maropitant-dogs-rct-2008',
      citationText:
        'Ramsey DS, Kincaid K, Watkins JA, Boucher JF, Conder GA, Eagleson JS, Clemence RG. Safety and efficacy of injectable and oral maropitant, a selective neurokinin 1 receptor antagonist, in a randomized clinical trial for treatment of vomiting in dogs. J Vet Pharmacol Ther. 2008;31(6):538–543.',
      sourceType: 'Ensaio clínico randomizado multicêntrico',
      doi: '10.1111/j.1365-2885.2008.00992.x',
      pmid: '19000277',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19000277/',
    },
    {
      id: 'ref-maro-vail-2007',
      citationText:
        'Vail DM, Rodabaugh HS, Conder GA, Boucher JF, Mathur S. Efficacy of injectable maropitant (Cerenia) in a randomized clinical trial for prevention and treatment of cisplatin-induced emesis in dogs presented as veterinary patients. Vet Comp Oncol. 2007;5(1):38–46.',
      sourceType: 'Ensaio clínico randomizado placebo-controlado',
      pmid: '19754800',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19754800/',
    },
    {
      id: 'ref-maropitant-ckd-cats-rct-2015',
      citationText:
        'Quimby JM, Brock WT, Moses K, Bolotin D, Patricelli K. Chronic use of maropitant for the management of vomiting and inappetence in cats with chronic kidney disease: a blinded, placebo-controlled clinical trial. J Feline Med Surg. 2015;17(8):692–697.',
      sourceType: 'Ensaio clínico randomizado duplo-cego controlado',
      doi: '10.1177/1098612X14555441',
      pmid: '25336450',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25336450/',
    },
    {
      id: 'ref-maro-grobman-2016',
      citationText:
        'Grobman M, Reinero CR. Investigation of Neurokinin-1 Receptor Antagonism as a Novel Treatment for Chronic Bronchitis in Dogs. J Vet Intern Med. 2016;30(3):847–852.',
      sourceType: 'Estudo clínico exploratório',
      doi: '10.1111/jvim.13935',
      pmid: '26995558',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26995558/',
    },
    {
      id: 'ref-maro-sullivan-2018',
      citationText:
        'Sullivan LA, Lenberg JP, Boscan P, Hackett TB, Twedt DC. Assessing the Efficacy of Maropitant Versus Ondansetron in the Treatment of Dogs with Parvoviral Enteritis. J Am Anim Hosp Assoc. 2018;54(6):338–343.',
      sourceType: 'Ensaio clínico prospectivo randomizado cego',
      doi: '10.5326/JAAHA-MS-6650',
      pmid: '30272481',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30272481/',
    },
    {
      id: 'ref-maro-maina-2019',
      citationText:
        'Maina E, Fontaine J. Use of maropitant for the control of pruritus in non-flea, non-food-induced feline hypersensitivity dermatitis: an open-label, uncontrolled pilot study. J Feline Med Surg. 2019;21(10):967–972.',
      sourceType: 'Estudo piloto aberto não controlado',
      doi: '10.1177/1098612X18811372',
      pmid: '30427273',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30427273/',
    },
    {
      id: 'ref-maro-niyom-2013',
      citationText:
        'Niyom S, Boscan P, Twedt DC, Monnet E, Eickhoff JC. Effect of maropitant, a neurokinin-1 receptor antagonist, on the minimum alveolar concentration of sevoflurane during stimulation of the ovarian ligament in cats. Vet Anaesth Analg. 2013;40(4):425–431.',
      sourceType: 'Estudo experimental prospectivo cruzado',
      doi: '10.1111/vaa.12017',
      pmid: '23387358',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23387358/',
    },
    {
      id: 'ref-maro-silva-2025',
      citationText:
        'Silva AKE, et al. Evaluation of the antinociceptive effect of NK-1 antagonist - maropitant, in different doses in dogs undergoing ovariohysterectomy - a prospective randomized clinical study. Vet Res Commun. 2025.',
      sourceType: 'Ensaio clínico prospectivo randomizado',
      doi: '10.1007/s11259-025-10966-8',
      pmid: '41174265',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41174265/',
    },
    {
      id: 'ref-maro-sullivan-qt-2025',
      citationText:
        'Sullivan KE, Reader RCT, Yang VK. Evaluation of Maropitant-Induced Changes in the Electrocardiogram of Healthy Dogs and Comparison of Three Methods for QT Interval Correction. J Vet Emerg Crit Care. 2025.',
      sourceType: 'Estudo eletrocardiográfico prospectivo',
      doi: '10.1111/vec.13476',
      pmid: '40522750',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40522750/',
    },
    {
      id: 'ref-maro-ersoz-2026',
      citationText:
        'Ersöz U, Özkalipci Ç. Receptor-Targeted Antiemetic Strategies in Cats: A Systematic Review and Intervention-Specific Meta-Analysis. Vet Med Sci. 2026.',
      sourceType: 'Revisão sistemática e meta-análise',
      doi: '10.1002/vms3.71172',
      pmid: '42599757',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42599757/',
    },
    {
      id: 'ref-maro-shin-2026',
      citationText:
        'Shin CW, Ambros B. Effectiveness of dimenhydrinate and maropitant in preventing preoperative emesis and nausea in healthy dogs sedated with hydromorphone and dexmedetomidine: a randomized, blinded trial. Vet Anaesth Analg. 2026.',
      sourceType: 'Ensaio clínico randomizado cego',
      pmid: '42208176',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42208176/',
    },
    {
      id: 'ref-maro-icatcare-2026',
      citationText:
        '2026 iCatCare consensus guidelines on the diagnosis and management of chronic kidney disease in cats. J Feline Med Surg. 2026.',
      sourceType: 'Consenso internacional',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13554608/',
    },
    {
      id: 'ref-maro-fda-2025',
      citationText:
        'FDA / DailyMed. Cerenia (maropitant citrate) injectable solution and tablets — Prescribing Information (atualizada em agosto de 2025).',
      sourceType: 'Bula regulatória oficial (FDA)',
      url: 'https://dailymed.nlm.nih.gov/',
    },
    {
      id: 'ref-maro-zoetis-bula',
      citationText:
        'Zoetis Brasil. Cerenia® Comprimidos e Cerenia® Solução Injetável — Bula e documentação técnica oficial.',
      sourceType: 'Bula oficial do fabricante (Brasil)',
      url: 'https://www.zoetis.com.br/cerenia-solucao-injetavel.aspx',
    },
    {
      id: 'ref-maro-botupharma-marovet',
      citationText:
        'Botupharma PET Brasil. Marovet® 10 mg/mL Solução Injetável — Página oficial e bula técnica.',
      sourceType: 'Bula oficial do fabricante (Brasil)',
      url: 'https://botupharma.com.br/produtos/marovet',
    },
  ],
};
