import type { DiseaseRecord } from '../types/disease';
import type { MedicationRecord } from '../types/medication';

/**
 * Metadados mínimos para listagens do catálogo público — evita importar diseases.seed/medications.seed (~260 kB gzip) só para montar cartões.
 * Manter em sincronia com `CONSULTA_VET_PUBLIC_*` em `constants/publicCatalog.ts`.
 */
function diseaseListCard(
  partial: Pick<
    DiseaseRecord,
    'id' | 'slug' | 'title' | 'synonyms' | 'species' | 'category' | 'tags' | 'quickSummary'
  >
): DiseaseRecord {
  return {
    ...partial,
    quickDecisionStrip: [],
    etiology: '',
    epidemiology: '',
    pathogenesisTransmission: '',
    pathophysiology: '',
    clinicalSignsPathophysiology: [],
    diagnosis: '',
    treatment: '',
    prevention: '',
    relatedConsensusSlugs: [],
    relatedMedicationSlugs: [],
  };
}

function medicationListCard(
  partial: Pick<
    MedicationRecord,
    | 'id'
    | 'slug'
    | 'title'
    | 'activeIngredient'
    | 'tradeNames'
    | 'pharmacologicClass'
    | 'species'
    | 'category'
    | 'tags'
    | 'indications'
  >
): MedicationRecord {
  return {
    ...partial,
    mechanismOfAction: '',
    contraindications: [],
    cautions: [],
    adverseEffects: [],
    interactions: [],
    routes: [],
    doses: [],
    presentations: [],
    clinicalNotesRichText: '',
    relatedDiseaseSlugs: [],
  };
}

export const PUBLIC_CATALOG_DISEASE_CARD_STUBS: DiseaseRecord[] = [
  diseaseListCard({
    id: 'disease-fistula-perianal',
    slug: 'fistula-perianal-furunculose-anal',
    title: 'Fístula perianal / furunculose anal',
    synonyms: ['Furunculose anal', 'Fístulas perianais', 'Anal furunculosis', 'Perianal fistula'],
    species: ['dog'],
    category: 'dermatologia',
    tags: ['Períneo', 'Imunomediada', 'Pastor alemão', 'Disquesia', 'Ciclosporina'],
    quickSummary:
      'A furunculose anal / fístula perianal é doença imunomediada crônica da região perianal e pararretal em que a resposta inflamatória desregulada destrói a arquitetura tecidual normal, gerando ulcerações dolorosas, tratos fistulosos e, nos casos avançados, estenose ou incontinência. Classicamente sobredimensionada em Pastor Alemão, mas descrita em outros grandes; não é “abscesso de saco anal simples” — embora saculite possa coexistir ou mimetizar. O diagnóstico permanece fundamentalmente clínico: inspeção após tosa e limpeza, palpação digital e toque retal sob sedação/analgesia quando a dor impede exame consciente. Exames de imagem ou histopatologia entram em casos atípicos. O tratamento contemporâneo ancora-se na ciclosporina (consenso 2025 e estudos clássicos), com suporte local, analgesia multimodal, controle de infecção secundária quando documentada e dieta de eliminação em subset de pacientes com componente gastrointestinal. Cirurgia deixou de ser primeira linha e reserva-se a fibrose, estenose ou falha terapêutica documentada após curso médico adequado.',
  }),
  diseaseListCard({
    id: 'disease-hiperadrenocorticismo-cushing',
    slug: 'hiperadrenocorticismo-sindrome-cushing',
    title: 'Hiperadrenocorticismo (síndrome de Cushing)',
    synonyms: ['Síndrome de Cushing', 'HAC', 'Hipercortisolismo', 'Hyperadrenocorticism', 'Cushingoid'],
    species: ['dog', 'cat'],
    category: 'endocrinologia',
    tags: ['Cortisol', 'PDH', 'ADH', 'Trilostano', 'LDDST', 'ACTH', 'PU/PD', 'Diabetes felino'],
    quickSummary:
      'Síndrome por exposição crônica a excesso de cortisol: hipófise estimulando demais as adrenais (forma hipófise-dependente, PDH), tumor adrenal autônomo (forma adrenal dependente, ADH) ou glicocorticoide exógeno em excesso. Em cães é relativamente comum (meia-idade a idosos; na maioria a forma hipófise-dependente). Em gatos é rara, costuma ser hipófise-dependente e frequentemente coexiste com diabetes mellitus e pele extremamente frágil. O diagnóstico exige combinação de história, clínica, banco mínimo e teste endócrino apropriado, depois diferenciação entre PDH e ADH. Tratamento moderno: trilostano como base em muitos casos, cirurgia selecionada e monitoramento cuidadoso para evitar hipocortisolismo iatrogênico.',
  }),
  diseaseListCard({
    id: 'disease-leishmaniose-visceral-canina',
    slug: 'leishmaniose-visceral-canina',
    title: 'Leishmaniose visceral canina (leishmaniose canina por L. infantum)',
    synonyms: [
      'LCan',
      'LV canina',
      'Leishmaniose canina',
      'Leishmaniose visceral em cães',
      'Canine visceral leishmaniasis',
      'Leishmania infantum (cão)',
    ],
    species: ['dog'],
    category: 'infecciosas',
    tags: [
      'Leishmania infantum',
      'Flebotomíneo',
      'Zoonose',
      'Brasileish',
      'Miltefosina',
      'Marbofloxacina',
      'Alopurinol',
      'Estadiamento I–VI',
    ],
    quickSummary:
      'A leishmaniose visceral canina por Leishmania infantum é zoonose de ciclo vetorial cujo principal elo urbano e periurbano no Brasil são flebotomíneos (ex.: Lutzomyia longipalpis), com transmissão secundária documentada por transfusão, vertical e venérea em cães. O espectro clínico vai do cão infectado assintomático (importante reservatório parasitológico) ao quadro multissistêmico com dermatopatia, uveíte, linfadenomegalia, anemia, proteinúria e insuficiência renal progressiva — nefropatia e IRIS avançado são determinantes centrais de morbimortalidade. Não existe sinal patognomônico isolado: a sorologia indica exposição e memória humoral, mas positividade cruzada, vacinas e tratamentos prévios exigem confirmação direta (amastigotas em citologia/histologia) ou molecular (PCR) com interpretação integrada ao estádio clínico-laboratorial. O estadiamento I–VI (Brasileish e adaptações clínicas) organiza leishmanicidas registrados no país (miltefosina, associações com marbofloxacina conforme bula), leishmaniostáticos como alopurinol e imunomodulação quando indicada, sempre com monitorização renal, hematológica e oftálmica. Prevenção combina produtos com efeito comprovado contra flebotomíneos, manejo ambiental (reduzir criadouros), testagem em áreas endêmicas e educação sobre limites de vacinas e sorologia em campanhas.',
  }),
  diseaseListCard({
    id: 'disease-erliquiose-monocitica-canina',
    slug: 'erliquiose-monocitica-canina',
    title: 'Erliquiose monocítica canina (Ehrlichia canis)',
    synonyms: ['CME', 'Canine monocytic ehrlichiosis', 'Erliquiose por E. canis', 'Ehrlichiose canina'],
    species: ['dog'],
    category: 'infecciosas',
    tags: ['Carrapato', 'Rhipicephalus sanguineus', 'Trombocitopenia', 'Doxiciclina', 'PCR', 'Coinfecção'],
    quickSummary:
      'A erliquiose monocítica canina (CME) é riquetsiose sistêmica transmitida sobretudo pelo carrapato marrom Rhipicephalus sanguineus: Ehrlichia canis infecta monócitos, replica no sistema fagocítico mononuclear e evolui em três grandes fases — aguda (febre, linfadenomegalia, trombocitopenia marcada), subclínica (animal aparentemente saudável com laboratório oculto ou sorologia/PCR positivas) e crônica (pancitopenia, hemorragias, proteinúria, uveíte, poliartrite, sinais neurológicos). A trombocitopenia é o achado hematológico mais lembrado, mas o sangramento pode ser desproporcional à contagem por vasculite, disfunção plaquetária e hiperglobulinemia. O diagnóstico não se resume a um exame: integra contexto epidemiológico, hemograma seriado, visualização de mórulas (quando presente), sorologia com interpretação temporal e PCR em sangue antes do antibiótico. A doxiciclina 10 mg/kg SID VO por pelo menos 28 dias é tratamento de primeira linha com base em consenso ACVIM; cursos curtos podem melhorar a clínica sem eliminar o risco de persistência e transmissão vetorial. Suporte transfusional, controle de dor hemorrágica e triagem de doadores (sorologia e PCR) são medidas de segurança essenciais.',
  }),
  diseaseListCard({
    id: 'disease-colapso-traqueal-canino',
    slug: 'colapso-traqueal-canino',
    title: 'Colapso traqueal e traqueobroncomalácia (cão)',
    synonyms: ['Traqueobroncomalácia', 'Tracheal collapse', 'TBM', 'Tosse em grasnado de ganso'],
    species: ['dog'],
    category: 'respiratorio',
    tags: ['Toy', 'Tosse', 'Fluoroscopia', 'Broncoscopia', 'Stent', 'Hidrocodona'],
    quickSummary:
      'O colapso traqueal e a traqueobroncomalácia (TBM) são manifestações de perda de rigidez da parede traqueobrônquica: anéis cartilaginosos em C amolecidos e membrana dorsal redundante passam a invaginar com as variações de pressão transpulmonar — na inspiração predomina colapso cervical (pressão intratraqueal mais negativa que pleural), na expiração e na tosse predomina colapso intratorácico e brônquico (pressão pleural positiva). O resultado clínico é tosse seca em “honking”, piora com excitação, calor, umidade e tração de coleira, às vezes síncope por reflexo vagal ou hipóxia. Toy breeds e miniaturas são o epicentro epidemiológico; obesidade e comorbidades respiratórias (bronquite, BOAS, cardiomegalia comprimindo brônquio esquerdo) são agravantes massivos. A radiografia é triagem estática que frequentemente subestima o grau funcional; a fluoroscopia mostra o comportamento dinâmico; a broncoscopia gradua severidade (escalas ACVS) e permite BAL quando seguro. O manejo conservador (perda de peso, peitoral, antitussígenos, corticoide curto sistêmico ou inalado) deve esgotar-se antes de stent ou anéis — intervenções têm complicações frequentes (tosse pós-stent, granuloma, infecção, fratura de stent em proporções alarmantes nas revisões sistemáticas recentes).',
  }),
  diseaseListCard({
    id: 'disease-micoplasmoses-hemotropicas',
    slug: 'micoplasmoses-hemotropicas',
    title: 'Micoplasmoses hemotrópicas (hemoplasmas) em pequenos animais',
    synonyms: [
      'Hemoplasma',
      'Hemoplasmosis',
      'Mycoplasma haemofelis',
      'Mycoplasma haemocanis',
      'Anemia infecciosa felina',
    ],
    species: ['cat', 'dog'],
    category: 'infecciosas',
    tags: ['PCR', 'Doxiciclina', 'Anemia hemolítica', 'Transfusão', 'Doador', 'FeLV', 'FIV'],
    quickSummary:
      'Os hemoplasmas (micoplasmas hemotrópicos) são bactérias sem parede que aderem à membrana eritrocitária e alteram o destino da hemácia no baço e no fígado: predomina hemólise extravascular com anemia regenerativa, esplenomegalia e, no gato com Mycoplasma haemofelis, quadro agudo potencialmente fulminante (febre, icterícia, queda rápida do hematócrito). Candidatus M. haemominutum e Candidatus M. turicensis costumam ser menos dramáticos. No cão, M. haemocanis e agentes relacionados frequentemente permanecem subclínicos enquanto o baço remove parasitados “silenciosamente”; a doença franca aparece com asplenia congênita ou cirúrgica, imunossupressão, coinfecções (babesiose, erliquiose) ou iatrogenia transfusional. O diagnóstico contemporâneo privilegia PCR em sangue (EDTA), pois o esfregaco tem sensibilidade limitada e a parasitemia oscila. O tratamento de primeira linha é doxiciclina com técnica segura em felinos (evitar pílula “seca”); alternativas incluem marbofloxacina ou esquemas com pradofloxacina em refratários. Transfusão quando há hipóxia ou anemia vitalmente baixa; triagem PCR de doadores é pilar de biossegurança.',
  }),
  diseaseListCard({
    id: 'disease-drc-caes-gatos',
    slug: 'doenca-renal-cronica-caes-gatos',
    title: 'Doença renal crônica (DRC)',
    synonyms: [
      'DRC',
      'CKD',
      'Insuficiência renal crônica',
      'Nefropatia crônica',
      'Chronic kidney disease',
      'Insuficiência renal felina',
      'CKD felina',
    ],
    species: ['dog', 'cat'],
    category: 'nefrologia-urologia',
    tags: [
      'IRIS 2023',
      'SDMA',
      'UPC',
      'Proteinúria',
      'Hipertensão',
      'Dieta renal',
      'Fósforo',
      'Creatinina',
      'Azotemia',
      'PU/PD',
    ],
    quickSummary:
      'A doença renal crônica (DRC) é síndrome de perda irreversível e progressiva de massa nefronal funcional: com menos néfrons eficazes, o rim deixa de concentrar urina precocemente (poliúria/polidipsia), acumula solutos azotados quando a taxa de filtração cai, perturba equilíbrio ácido-base e mineral (hiperfosfatemia, desregulação do eixo PTH/FGF23), produz menos eritropoietina (anemia não regenerativa) e perde resiliência frente a insultos agudos (AKI sobreposta). Em pequenos animais, define-se clinicamente por alterações estruturais ou funcionais persistentes por pelo menos cerca de três meses — número operacional, não dogma absoluto. O estadiamento IRIS (creatinina e SDMA em sangue, proteinúria urinária e pressão arterial como substadiamentos) só deve aplicar-se com animal euvolêmico, estável e sem descompensação aguda mascarando números. O tratamento longitudinal combina nutrição renal, metas de fósforo, bloqueio do RAAS quando há proteinúria clinicamente relevante, controle pressórico (amlodipino muito utilizado em gatos), correção de hipocalemia felina, fluidoterapia subcutânea domiciliar quando indicada, antieméticos e mimetizantes de apetite, além de gestão honesta de qualidade de vida nos estádios avançados.',
  }),
  diseaseListCard({
    id: 'disease-hipertensao-sistemica',
    slug: 'hipertensao-arterial-sistemica-caes-gatos',
    title: 'Hipertensão arterial sistêmica (HAS)',
    synonyms: [
      'HAS',
      'Hipertensão sistêmica',
      'Systemic hypertension',
      'Pressão alta',
      'Hipertensão secundária',
      'Hipertensão essencial (idiopática felina)',
    ],
    species: ['dog', 'cat'],
    category: 'cardiologia',
    tags: [
      'Pressão arterial',
      'Amlodipino',
      'IECA',
      'BRA',
      'DRC',
      'Lesão-orgão-alvo',
      'Ocular',
      'Renal',
      'IRIS',
    ],
    quickSummary:
      'A HAS é definida clinicamente pela elevação sustentada da pressão arterial sistêmica (PAS) com capacidade de lesar órgãos-alvo — retina, encéfalo, rins e coração — ou pela coexistência de PAS elevada com doença renal crônica (DRC) estadiada pela IRIS, onde a pressão entra no subestadiamento. Não basta um número isolado: o diagnóstico exige repetição de medições em condições padronizadas (animal acalmado, manguito correto, técnica consistente) ou evidência de lesão atribuível à pressão. Em gatos, a hipertensão secundária à DRC e ao hipertireoidismo é frequente; existe ainda um grupo com hipertensão idiopática (diagnóstico de exclusão após investigação). Em cães, a HAS “essencial” idiopática é incomum — desconfie de causas secundárias (renal, endócrinas, iatrogenia, feocromocitoma). O tratamento combina reversão de fatores precipitantes, bloqueio do canal de cálcio (muito utilizado em felinos), modulação do RAAS (IECA/BRA) quando indicado, e metas pressóricas alinhadas às guidelines IRIS na DRC.',
  }),
  diseaseListCard({
    id: 'disease-dmvd-caes',
    slug: 'doenca-valvar-mitral-degenerativa-caes',
    title: 'Doença valvar mitral degenerativa (DMVD / endocardiose)',
    synonyms: [
      'DMVD',
      'Endocardiose degenerativa',
      'Doença da valva mitral',
      'Myxomatous mitral valve disease',
      'MMVD',
      'Insuficiência mitral degenerativa',
    ],
    species: ['dog'],
    category: 'cardiologia',
    tags: ['Murmúrio', 'Regurgitação mitral', 'Pimobendan', 'IECA', 'ACVIM', 'Cão pequeno', 'Arritmia'],
    quickSummary:
      'A DMVD (endocardiose mixomatosa da valva mitral) é a cardiopatia adquirida mais frequente em cães de pequeno porte: as folhetos mitrais tornam-se espessados, encurtados e incompetentes, permitindo regurgitação sistólica da câmara esquerda para o átrio esquerdo. Com o tempo, aumenta o volume regurgitante, a sobrecarga de volume do ventrículo esquerdo (VE) e a pressão no leito capilar pulmonar — primeiro com remodelação compensatória (hipertrofia excêntrica, aumento diastólico), depois com disfunção sistólica, taquiarritmias (especialmente fibrilação atrial) e insuficiência cardíaca congestiva (ICC). O sopro sistólico em foco mitral esquerdo é o achado mais comum, mas a intensidade do ruído não traduz de forma linear a gravidade hemodinâmica. O estadiamento ACVIM (A–D) integra presença de lesão, grau de remodelação ao ecocardiograma e presença de sinais de ICC; em B2, quando critérios ecocardiográficos de remodelação relevante são atingidos, há base de evidência e consenso para considerar pimobendan antes do aparecimento de ICC clínica (estudo EPIC e diretriz ACVIM). O tratamento da ICC congestiva combina diuréticos, inodilatação (pimobendan), modulação do sistema renina–angiotensina–aldosterona (RAAS) quando tolerado, controle de frequência em taquiarritmias e manejo de comorbidades; a monitorização de creatinina e eletrólitos é obrigatória ao associar IECA, diurético e baixo débito.',
  }),
];

export const PUBLIC_CATALOG_MEDICATION_CARD_STUBS: MedicationRecord[] = [
  medicationListCard({
    id: 'med-prednisolona',
    slug: 'prednisolona',
    title: 'Prednisolona',
    activeIngredient: 'Prednisolona',
    tradeNames: [
      'Preni (Eurofarma)',
      'Fosfato sódico de prednisolona — Aché',
      'Prelone gotas (Aché)',
      'Prediderm (Ourofino Saúde Animal)',
      'Predivet (Mundo Animal)',
    ],
    pharmacologicClass: 'Glicocorticoide sintético (ação intermediária)',
    species: ['dog', 'cat'],
    category: 'endocrinologia',
    tags: ['Corticoide', 'Anti-inflamatório', 'Imunossupressor', 'Reposição', 'Oncologia'],
    indications: [
      'Reposição fisiológica (hipoadrenocorticismo) e ajuste em estresse.',
      'Uso anti-inflamatório: dermatites alérgicas, algumas otites, asma felina, algumas EII/enteropatias, colangite linfocítica felina, etc.',
      'Uso imunossupressor: AHAI, ITP, poliartrite imunomediada, miosite mastigatória, pênfigo foliáceo, algumas glomerulopatias, etc.',
      'Oncologia e paliativo: linfoma, redução de edema/inflamação tumoral, estímulo de apetite, conforto (sempre risco-benefício).',
      'Componente adjuvante/ponte em protocolos (ex.: furunculose anal com imunomoduladores de base).',
    ],
  }),
  medicationListCard({
    id: 'med-sulfametoxazol-trimetoprima',
    slug: 'sulfametoxazol-trimetoprima',
    title: 'Sulfametoxazol + trimetoprima',
    activeIngredient: 'Sulfametoxazol + trimetoprima (cotrimoxazol; TMP-SMX)',
    tradeNames: [
      'Bactrim / similar — uso humano (suspensão e comprimidos)',
      'Co-trimoxazole (TMP-SMX) vs co-trimazine (TMP + sulfadiazina) — classe “sulfa/trimetoprima” no Plumb’s',
    ],
    pharmacologicClass: 'Sulfonamida potencializada (associação; inibição sequencial do folato; tempo-dependente)',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: ['UTI', 'Sulfa', 'Trimetoprima', 'Coccidiose', 'Stewardship', 'Hipotireoidismo induzido'],
    indications: [
      'Infecções bacterianas sensíveis (urinária, respiratória, pele/tecidos moles, GI) — dose por produto combinado total (Plumb’s).',
      'Cistite canina não complicada e complicada; cistite felina (com cautela a tolerabilidade).',
      'Foliculite bacteriana superficial (cão) — só primeira linha para Staphylococcus pseudintermedius se susceptibilidade regional conhecida.',
      'Prostatite bacteriana por gram-negativos (penetração prostática da trimetoprima; doses práticas nas faixas da classe).',
      'Piometra / sepse: esquema empírico possível com ajuste por cultura (Nelson).',
      'Coccidiose; toxoplasmose (cão: posologia explícita no Plumb’s; gato: classe citada, posologia felina menos destrinchada nas fontes — individualizar).',
      'Neosporose (protocolo com pirimetamina); pneumocistose; hepatozoonose americana (protocolo triplo com clindamicina e pirimetamina/ponazuril).',
    ],
  }),
  medicationListCard({
    id: 'med-amoxicilina-clavulanato',
    slug: 'amoxicilina-clavulanato',
    title: 'Amoxicilina + ácido clavulânico',
    activeIngredient: 'Amoxicilina + clavulanato de potássio',
    tradeNames: [
      'Synulox® Comprimidos Palatáveis — Zoetis Brasil (50 mg e 250 mg totais; proporção 4:1 amoxicilina:clavulanato)',
      'Apresentações veterinárias clássicas no Plumb’s: 62,5 / 125 / 250 / 375 mg totais (4:1)',
      'Formas humanas (proporções variáveis 2:1 a 7:1; rotulagem frequentemente só em amoxicilina)',
    ],
    pharmacologicClass: 'Aminopenicilina potencializada (inibidor de beta-lactamase; bactericida tempo-dependente)',
    species: ['dog', 'cat'],
    category: 'infectologia',
    tags: ['Beta-lactâmico', 'Pele', 'UTI', 'Odontologia', 'Stewardship', 'Synulox'],
    indications: [
      'Piodermite superficial/profunda, abscessos, feridas infectadas, tecidos moles, doença periodontal (cão/gato).',
      'Componente bacteriano do complexo respiratório infeccioso canino; pneumonia bacteriana estável ambulatorial (doses em textos de emergência).',
      'Colangite / colangiohepatite bacteriana felina (August’s: 4–8 sem com resposta; combinações em casos graves).',
      'Hepatobiliar canino empírico enquanto aguarda cultura (Watson 2024).',
      'Otite média/interna; osteomielite / discospondilite como opção empírica com cultura.',
      'UTI complicada ou perfil de resistência — não como reflexo automático para cistite esporádica simples (August’s; BSAVA).',
    ],
  }),
  medicationListCard({
    id: 'med-pregabalina',
    slug: 'pregabalina',
    title: 'Pregabalina',
    activeIngredient: 'Pregabalina',
    tradeNames: [
      'Lyrica® e similares (uso humano; cápsulas)',
      'Dorene® — solução oral 25 mg/mL (Brasil; confirmar rótulo)',
      'Sem produto veterinário rotulado de referência no Plumb’s 2023',
    ],
    pharmacologicClass:
      'Ligante da subunidade α2δ de canais de cálcio dependentes de voltagem; anticonvulsivante, analgésico (neuropático), ansiolítico',
    species: ['dog', 'cat'],
    category: 'anestesia-dor',
    tags: ['Neuropática', 'Epilepsia', 'Ansiedade transporte', 'Extra-label', 'Função renal'],
    indications: [
      'Epilepsia refratária em cães (adjuvante; não monoterapia de primeira linha isolada na prática habitual).',
      'Dor neuropática central ou periférica; compressão/lesão nervosa; componente associado a siringomielia (literatura citada no Plumb’s).',
      'Adjuvante perioperatório em esquemas descritos no Plumb’s (não substitui analgesia multimodal com opioides, AINE, local, etc.).',
      'Tremor ortostático (cão) — indicação mais de nicho.',
      'Gatos: epilepsia adjuvante, dor neuropática; ansiedade/transporte em faixas publicadas (estudo com solução oral; interpretar com cautela fora desse desenho).',
    ],
  }),
  medicationListCard({
    id: 'med-maropitant',
    slug: 'maropitant',
    title: 'Maropitant (Cerenia®)',
    activeIngredient: 'Maropitant (citrato)',
    tradeNames: ['Cerenia® — Zoetis (comprimidos; solução injetável 10 mg/mL, frasco 20 mL no material BR citado)'],
    pharmacologicClass: 'Antagonista do receptor de neurocinina 1 (NK1); antiemético de amplo espectro (via final comum da emese)',
    species: ['dog', 'cat'],
    category: 'gastroenterologia',
    tags: ['Antiemético', 'NK1', 'Pancreatite', 'Cinemática', 'Extra-label felino BR'],
    indications: [
      'Vômito agudo (cão; gato muito usado com base em literatura — checar rotulagem BR atual para felinos).',
      'Pancreatite: antiemético de escolha em muitos protocolos (efeito não pró-cinético como metoclopramida em destaque).',
      'Enjoo de movimento (cão): doses mais elevadas por via oral, curso limitado.',
      'Prevenção de vômito perioperatório / induzido por opioide em esquemas descritos.',
      'Náusea/vômito associados à doença renal crónica no gato (dose fixa extra-label em referências).',
    ],
  }),
  medicationListCard({
    id: 'med-benazepril',
    slug: 'benazepril',
    title: 'Benazepril',
    activeIngredient: 'Cloridrato de benazepril',
    tradeNames: [
      'Benazecor® e genéricos (uso humano — extra-label em medicina veterinária)',
      'Fortekor® / Cardalis® (vet — disponibilidade regional)',
    ],
    pharmacologicClass: 'Inibidor da enzima conversora da angiotensina (IECA)',
    species: ['dog', 'cat'],
    category: 'cardiologia',
    tags: ['IECA', 'RAAS', 'Cardiologia', 'Nefrologia', 'Proteinúria', 'HAS'],
    indications: [
      'Insuficiência cardíaca congestiva (como componente de protocolo com outros fármacos).',
      'Proteinúria glomerular / nefropatia com componente anti-proteinúrico (conforme consenso e tolerância).',
      'Hipertensão sistêmica secundária: como adjuvante em alguns protocolos (combinar com outros anti-hipertensivos conforme caso).',
    ],
  }),
  medicationListCard({
    id: 'med-pimobendan',
    slug: 'pimobendan',
    title: 'Pimobendan',
    activeIngredient: 'Pimobendan',
    tradeNames: ['Vetmedin® (Boehringer Ingelheim — comprimidos mastigáveis)', 'Genéricos veterinários regionais'],
    pharmacologicClass: 'Inodilatador (inotrópico positivo + vasodilatador)',
    species: ['dog', 'cat'],
    category: 'cardiologia',
    tags: ['ICC', 'DMVD', 'DCM', 'Inotrópico', 'Pre-clinical MVD'],
    indications: [
      'Insuficiência cardíaca congestiva por degeneração valvar mitral ou cardiomiopatia dilatada (cão).',
      'Estádios pré-clínicos de DMVD em cães que preenchem critérios ecocardiográficos (conforme protocolo e evidência).',
      'Outros cenários cardíacos apenas com critério especializado.',
    ],
  }),
  medicationListCard({
    id: 'med-benzafibrato',
    slug: 'benzafibrato',
    title: 'Bezafibrato (fibrato)',
    activeIngredient: 'Bezafibrato',
    tradeNames: [
      'Bezalip® e genéricos (INN bezafibrato; verificar grafia no rótulo — não confundir com gemfibrozil/fenofibrato)',
    ],
    pharmacologicClass: 'Agonista PPAR — fármaco hipolipemiante',
    species: ['dog', 'cat'],
    category: 'hepatologia-pancreas',
    tags: ['Hiperlipidemia', 'Triglicéridos', 'Pancreatite', 'Extra-label'],
    indications: [
      'Hipertrigliceridemia severa ou persistente quando dieta e manejo de causa de base foram otimizados.',
      'Componente adjuvante em síndromes de lipoproteínas anómalas (com critério especializado).',
    ],
  }),
];
