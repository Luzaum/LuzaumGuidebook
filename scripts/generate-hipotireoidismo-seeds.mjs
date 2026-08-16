import fs from 'fs';

const OUT_ADQ = 'modules/consulta-vet/data/seed/diseases.hipotireoidismo-adquirido.seed.ts';
const OUT_CON = 'modules/consulta-vet/data/seed/diseases.hipotireoidismo-congenito.seed.ts';

function buildAdquirido() {
  return `import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Hipotireoidismo adquirido (c\u00e3o e gato) \u2014 s\u00edntese editorial Vetius.
 * AAHA 2023 > Nelson & Couto > Rothrock VIN 2025.
 */
export const hipotireoidismoAdquiridoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-adquirido-caes-gatos',
  slug: 'hipotireoidismo-adquirido-caes-gatos',
  title: 'Hipotireoidismo adquirido (c\u00e3o e gato)',
  synonyms: [
    'Hipotireoidismo prim\u00e1rio',
    'Tireoidite linfoc\u00edtica',
    'Atrofia tireoidiana idiop\u00e1tica',
    'S\u00edndrome da doen\u00e7a n\u00e3o tireoidiana',
    'NTIS',
    'Eutireoideo doente',
    'Hipotireoidismo iatrog\u00eanico felino',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: [
    'Tireoide',
    'Levotiroxina',
    'T4 livre',
    'cTSH',
    'NTIS',
    'TgAA',
    'Alopecia',
    'Coma mixedematoso',
    'Iatrog\u00eanico felino',
    'AAHA 2023',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipotireoidismo-adquirido-caes-gatos'],
  quickSummary:
    'Hipotireoidismo adquirido \u00e9 defici\u00eancia de horm\u00f4nios tireoidianos com sinais compat\u00edveis. Em c\u00e3es, predomina destrui\u00e7\u00e3o prim\u00e1ria por tireoidite linfoc\u00edtica ou atrofia idiop\u00e1tica. Em gatos, a maioria \u00e9 iatrog\u00eanica ap\u00f3s tratamento de hipertireoidismo (metimazol, I-131, tireoidectomia). T4 total baixo sozinho n\u00e3o diagnostica: NTIS, f\u00e1rmacos e ra\u00e7a reduzem T4 em eutireoideos. Integrar cl\u00ednica, TT4, fT4 por di\u00e1lise (fT4ED) e cTSH; 20\u201340% dos hipotire\u00f3ideos podem ter cTSH normal. TgAA marca tireoidite, n\u00e3o fun\u00e7\u00e3o. C\u00e3o: levotiroxina 0,02 mg/kg q12h, peso magro se obeso, T4 p\u00f3s-p\u00edlula 4\u20136 h, reavalia\u00e7\u00e3o ~4 semanas. Gato: 0,05\u20130,10 mg/GATO q24h (n\u00e3o mg/kg); meta T4 ~1,0\u20132,5 \u00b5g/dL; vigiar rim p\u00f3s-I-131 (Bugbee et al., 2023; Nelson & Couto, 6\u00aa ed.; Rothrock, VIN 2025).',
  quickDecisionStrip: [
    'TT4 baixo \u2260 diagn\u00f3stico de hipotireoidismo \u2014 NTIS e f\u00e1rmacos reduzem T4 em eutireoideos (Bugbee et al., 2023; Nelson & Couto, 6\u00aa ed.).',
    'Paciente sist\u00eamico doente: trate a causa da NTIS antes de rotular hipotireoidismo ou iniciar levotiroxina.',
    'fT4 por di\u00e1lise (fT4ED) + cTSH elevado + cl\u00ednica forte aumentam muito a probabilidade (Dixon & Mooney, 1999).',
    '20\u201340% dos c\u00e3es hipotire\u00f3ideos podem apresentar cTSH dentro do intervalo de refer\u00eancia (Bugbee et al., 2023).',
    'TgAA positivo indica tireoidite autoimune \u2014 N\u00c3O mede fun\u00e7\u00e3o; eutireoideo TgAA+ n\u00e3o recebe levotiroxina automaticamente (Nelson & Couto, 6\u00aa ed.).',
    'C\u00e3o: levotiroxina 0,02 mg/kg PO q12h; obeso \u2014 dose pelo peso magro ideal (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
    'Monitorar c\u00e3o ~4 semanas ap\u00f3s in\u00edcio/ajuste; colher TT4 4\u20136 h ap\u00f3s a dose (Plumb\\'s, 10\u00aa ed.).',
    'Gato: 0,05\u20130,10 mg/GATO q24h \u2014 N\u00c3O mg/kg; meta T4 ~1,0\u20132,5 \u00b5g/dL (Bugbee et al., 2023; Rothrock, VIN 2025).',
    'Hipotireoidismo felino espont\u00e2neo \u00e9 raro \u2014 investigar iatrogenia p\u00f3s-hipertireoidismo (metimazol, I-131, cirurgia).',
    'P\u00f3s-I-131: reavaliar fun\u00e7\u00e3o renal e T4 \u2014 hipotireoidismo pode unmask DRC (Cox et al., 2025; Geddes & Aguiar, 2022).',
    'Associa\u00e7\u00e3o hipotireoidismo\u2013CMD \u00e9 controversa \u2014 Beier et al. (2015) n\u00e3o confirmaram causalidade direta.',
    'SDMA pode antecipar azotemia em hipotireoidismo canino \u2014 interpretar com creatinina (Di Paola et al., 2021).',
    'Sinais GI (v\u00f4mito, diarreia) podem ser manifesta\u00e7\u00e3o at\u00edpica \u2014 considerar painel tireoidiano (Gori et al., 2023).',
    'Coma mixedematoso: emerg\u00eancia \u2014 aquecimento, ventila\u00e7\u00e3o, glicose, s\u00f3dio; levotiroxina IV titulada (Drobatz & DiBartola, 2019; Plumb\\'s, 10\u00aa ed.).',
  ],
  quickSummaryRich: {
    lead:
      'O hipotireoidismo verdadeiro \u00e9 trat\u00e1vel; o erro caro \u00e9 o r\u00f3tulo errado. T4 cai em doen\u00e7a sist\u00eamica, com glicocorticoide, fenobarbital e sulfonamida. Em gatos, a pergunta \u00e9 frequentemente \u201cfoi iatrog\u00eanico?\u201d ap\u00f3s hipertireoidismo. Tratar bem exige cl\u00ednica + painel, n\u00e3o um n\u00famero isolado.',
    leadHighlights: ['r\u00f3tulo errado', 'NTIS', 'iatrog\u00eanico', 'painel'],
    pillars: [
      {
        title: 'Defici\u00eancia hormonal prim\u00e1ria',
        body:
          'Tireoidite linfoc\u00edtica e atrofia idiop\u00e1tica destroem fol\u00edculos em c\u00e3es; em gatos, destrui\u00e7\u00e3o iatrog\u00eanica ap\u00f3s antitireoidiano, I-131 ou cirurgia predomina (Nelson & Couto, 6\u00aa ed.; Bugbee et al., 2023).',
        highlights: ['tireoidite', 'iatrog\u00eanico'],
      },
      {
        title: 'NTIS n\u00e3o \u00e9 hipotireoidismo',
        body:
          'Doen\u00e7a sist\u00eamica reduz T4/T3 como adapta\u00e7\u00e3o metab\u00f3lica. Tratar a causa de base \u00e9 priorit\u00e1rio; levotiroxina n\u00e3o \u00e9 indicada automaticamente (Nelson & Couto, 6\u00aa ed.; Lumb & Constable, 2023).',
        highlights: ['NTIS', 'causa de base'],
      },
      {
        title: 'Painel probabil\u00edstico',
        body:
          'TT4 normal exclui na maioria; TT4 baixo abre investiga\u00e7\u00e3o. fT4ED + cTSH + cl\u00ednica definem probabilidade; TgAA apoia etiologia imune, n\u00e3o fun\u00e7\u00e3o (Bugbee et al., 2023; Panciera, 1997).',
        highlights: ['fT4ED', 'cTSH', 'TgAA'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagn\u00f3stico',
      steps: [
        {
          label: 'Confirmar s\u00edndrome compat\u00edvel',
          timing: 'Primeira consulta',
          detail:
            'Letargia, ganho de peso sem polifagia, intoler\u00e2ncia ao frio, dermatopatia end\u00f3crina, bradicardia, hiperlipidemia; em gato, hist\u00f3ria de hipertireoidismo tratado (Bugbee et al., 2023; Nelson & Couto, 6\u00aa ed.).',
        },
        {
          label: 'Excluir NTIS e interferentes',
          timing: 'Antes de confirmar',
          detail:
            'Doen\u00e7a sist\u00eamica, glicocorticoide, fenobarbital, sulfonamida, clomipramina, AINE, ra\u00e7a com T4 fisiologicamente baixo (Bugbee et al., 2023; Nelson & Couto, 6\u00aa ed.).',
          reassess: 'Adiar painel se poss\u00edvel em paciente gravemente doente; tratar NTIS primeiro.',
        },
        {
          label: 'Triagem TT4',
          timing: 'Ap\u00f3s estabiliza\u00e7\u00e3o',
          detail:
            'Normal torna hipotireoidismo improv\u00e1vel; baixo n\u00e3o confirma \u2014 prosseguir com fT4ED e cTSH (Panciera, 1997).',
        },
        {
          label: 'Confirma\u00e7\u00e3o combinada',
          timing: 'TT4 baixo',
          detail:
            'fT4ED baixo + cTSH alto + cl\u00ednica = alta probabilidade; discord\u00e2ncia pede repetir ou teste terap\u00eautico documentado (Dixon & Mooney, 1999; Bugbee et al., 2023).',
          reassess: 'cTSH normal ocorre em 20\u201340% \u2014 n\u00e3o excluir por TSH isolado.',
        },
        {
          label: 'TgAA (selecionado)',
          timing: 'Etiologia imune',
          detail:
            'Positivo apoia tireoidite linfoc\u00edtica; n\u00e3o mede fun\u00e7\u00e3o atual nem indica tratamento isolado (Nelson & Couto, 6\u00aa ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terap\u00eautico',
      steps: [
        {
          label: 'Levotiroxina \u2014 c\u00e3o',
          detail:
            '0,02 mg/kg PO q12h; obeso: dose pelo peso magro ideal; cardiopata: iniciar ~25% abaixo (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
          dose: '0,02 mg/kg q12h PO; m\u00e1ximo inicial frequente 0,8 mg/c\u00e3o q12h.',
          duration: 'Vital\u00edcia na maioria dos casos prim\u00e1rios.',
          reassess: 'Administrar sempre da mesma forma em rela\u00e7\u00e3o ao alimento.',
        },
        {
          label: 'Levotiroxina \u2014 gato',
          detail:
            '0,05\u20130,10 mg/GATO q24h (n\u00e3o mg/kg); meta T4 ~1,0\u20132,5 \u00b5g/dL; evitar hipotireoidismo iatrog\u00eanico prolongado (Bugbee et al., 2023; Rothrock, VIN 2025).',
          dose: '0,05\u20130,10 mg/gato q24h PO.',
          duration: 'Cont\u00ednua se irrevers\u00edvel p\u00f3s-I-131/cirurgia.',
          reassess: 'Reavaliar rim e PAS ap\u00f3s eutireoidismo (Cox et al., 2025).',
        },
        {
          label: 'Reavalia\u00e7\u00e3o ~4 semanas',
          detail:
            'Cl\u00ednica + TT4 4\u20136 h p\u00f3s-dose; pele/pelagem levam 2\u20134 meses (Plumb\\'s, 10\u00aa ed.; Nelson & Couto, 6\u00aa ed.).',
          duration: '4 semanas ap\u00f3s in\u00edcio ou ajuste.',
          reassess: 'Energia melhora em 1\u20132 semanas; n\u00e3o aumentar dose s\u00f3 para normalizar cTSH se cl\u00ednica OK.',
        },
        {
          label: 'Coma mixedematoso',
          detail:
            'Emerg\u00eancia: aquecimento passivo, ventila\u00e7\u00e3o, glicose, corre\u00e7\u00e3o de s\u00f3dio; levotiroxina IV 1\u20139 \u00b5g/kg q12h, mediana 5 \u00b5g/kg (Drobatz & DiBartola, 2019; Plumb\\'s, 10\u00aa ed.).',
          duration: 'Interna\u00e7\u00e3o intensiva; transi\u00e7\u00e3o oral ap\u00f3s estabiliza\u00e7\u00e3o.',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'Tireoidite linfoc\u00edtica autoimune e atrofia tireoidiana idiop\u00e1tica respondem pela grande maioria dos casos adquiridos caninos. Na tireoidite, linf\u00f3citos destroem fol\u00edculos; na atrofia, par\u00eanquima \u00e9 substitu\u00eddo por tecido adiposo (Nelson & Couto, 6\u00aa ed.).',
    felinaIatrogenica:
      'Em gatos, hipotireoidismo espont\u00e2neo \u00e9 raro. A maioria \u00e9 iatrog\u00eanica ap\u00f3s metimazol/carbimazol prolongado, I-131, tireoidectomia ou dieta y/d exclusiva (Bugbee et al., 2023; Cox et al., 2025).',
    secundaria:
      'Hipotireoidismo secund\u00e1rio por defici\u00eancia de TSH \u00e9 raro; cTSH pode n\u00e3o elevar-se. Sulfonamidas potencializadas inibem peroxidase tireoidiana reversivelmente (Feldman et al.; Nelson & Couto, 6\u00aa ed.).',
    tgAA:
      'Anticorpo antitireoglobulina (TgAA) marca tireoidite autoimune em parte dos c\u00e3es, mas pode ser positivo antes da perda funcional e negativo na doen\u00e7a terminal. Indica agress\u00e3o imunol\u00f3gica, n\u00e3o capacidade de produzir horm\u00f4nios (Nelson & Couto, 6\u00aa ed.; Bugbee et al., 2023).',
  },
  epidemiology: {
    caes:
      'Predomina em c\u00e3es adultos de meia-idade. Preval\u00eancia ~0,2\u20130,8% na popula\u00e7\u00e3o geral; VetCompass UK estimou ~0,64% em c\u00e3es prim\u00e1rios (O\\'Neill et al., 2022). Golden Retriever, Beagle, Dobermann e Dogue Alem\u00e3o entre predispostos (Bugbee et al., 2023).',
    gatos:
      'Espont\u00e2neo raro; iatrog\u00eanico crescente com tratamento ampliado de hipertireoidismo. P\u00f3s-I-131: hipotireoidismo documentado em parcela relevante; monitorar T4 e rim (Cox et al., 2025).',
    cmdControversa:
      'Beier et al. (2015) n\u00e3o encontraram associa\u00e7\u00e3o causal robusta entre hipotireoidismo e cardiomiopatia dilatada em c\u00e3es Dobermann \u2014 corre\u00e7\u00e3o de T4 n\u00e3o reverte CMD estabelecida. Tratar hipotireoidismo documentado, mas n\u00e3o assumir CMD secund\u00e1ria.',
  },
  pathogenesisTransmission: {
    eixo: [
      'Perda de tecido tireoidiano reduz T4 e T3 circulantes.',
      'Menor retroalimenta\u00e7\u00e3o deveria elevar TSH; pulsatilidade, cronicidade e ensaio fazem cTSH normal em 20\u201340% dos casos (Bugbee et al., 2023).',
      'Menor sinal tireoidiano reduz termog\u00eanese, renova\u00e7\u00e3o cut\u00e2nea, lip\u00f3lise e atividade cardiovascular.',
      'Glicosaminoglicanos acumulam na derme \u2192 mixedema.',
    ],
    ntis:
      'Na s\u00edndrome da doen\u00e7a n\u00e3o tireoidiana (NTIS), tireoide estruturalmente funcional; citocinas e eixo hipot\u00e1lamo\u2013hip\u00f3fise reduzem T4/T3 proporcionalmente \u00e0 gravidade. Marcador de doen\u00e7a sist\u00eamica, n\u00e3o indica\u00e7\u00e3o autom\u00e1tica de reposi\u00e7\u00e3o (Nelson & Couto, 6\u00aa ed.; Lumb & Constable, 2023).',
    transmissao: 'N\u00e3o \u00e9 contagioso. Formas autoimunes podem ter predisposi\u00e7\u00e3o familiar.',
  },
  pathophysiology: {
    notaCaudaRato:
      'Figura cl\u00ednica \u201ccauda de rato\u201d (alopecia terminal preservada na ponta caudal): padr\u00e3o cl\u00e1ssico de dermatopatia hipotireoidiana canina. Imagem externa n\u00e3o inclu\u00edda nesta ficha \u2014 descri\u00e7\u00e3o cl\u00ednica suficiente para reconhecimento (Nelson & Couto, 6\u00aa ed.; Rothrock, VIN 2025).',
    tabelaCombinacaoDiagnostica: {
      kind: 'clinicalTable' as const,
      title: 'Combina\u00e7\u00e3o TT4 / fT4ED / cTSH \u2014 interpreta\u00e7\u00e3o pr\u00e1tica',
      headers: ['TT4', 'fT4ED', 'cTSH', 'Interpreta\u00e7\u00e3o prov\u00e1vel'],
      rows: [
        ['Normal', '\u2014', '\u2014', 'Hipotireoidismo improv\u00e1vel (Panciera, 1997)'],
        ['Baixo', 'Baixo', 'Alto', 'Alta probabilidade de hipotireoidismo prim\u00e1rio (Dixon & Mooney, 1999)'],
        ['Baixo', 'Baixo', 'Normal', 'Poss\u00edvel hipotireoidismo \u2014 20\u201340% t\u00eam cTSH normal (Bugbee et al., 2023)'],
        ['Baixo', 'Normal', 'Normal', 'Prov\u00e1vel NTIS ou interfer\u00eancia \u2014 tratar doen\u00e7a de base'],
        ['Baixo', 'Baixo', 'Baixo', 'Considerar hipotireoidismo central (raro) ou NTIS grave'],
        ['Normal', 'Baixo', 'Alto', 'Discord\u00e2ncia \u2014 repetir, revisar autoanticorpos anti-T4'],
      ],
    },
    evidenciaBeierCMD: {
      kind: 'clinicalTable' as const,
      title: 'Evid\u00eancia \u2014 hipotireoidismo e CMD (Beier et al., 2015)',
      headers: ['Achado', 'Implica\u00e7\u00e3o cl\u00ednica'],
      rows: [
        ['Sem associa\u00e7\u00e3o causal robusta em Dobermanns', 'N\u00e3o rotular CMD como secund\u00e1ria a hipotireoidismo sem confirma\u00e7\u00e3o'],
        ['Corre\u00e7\u00e3o de T4 n\u00e3o reverte CMD', 'Tratar hipotireoidismo documentado; CMD exige protocolo cardiol\u00f3gico pr\u00f3prio'],
        ['T4 baixo em doen\u00e7a sist\u00eamica frequente', 'Refor\u00e7a necessidade de painel, n\u00e3o TT4 isolado'],
      ],
    },
    sdmaRenal:
      'Di Paola et al. (2021): SDMA pode elevar-se antes da creatinina em hipotireoidismo canino \u2014 interpretar fun\u00e7\u00e3o renal no contexto cl\u00ednico e hormonal.',
    giGori:
      'Gori et al. (2023): manifesta\u00e7\u00f5es GI (v\u00f4mito, diarreia, dismotilidade) podem ser apresenta\u00e7\u00e3o at\u00edpica \u2014 painel tireoidiano em casos selecionados.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologic',
      findings: [
        {
          finding: 'Alopecia bilateral n\u00e3o pruriginosa, cauda de rato e falha de repila\u00e7\u00e3o',
          mechanism: 'Fol\u00edculos em tel\u00f3geno por redu\u00e7\u00e3o do est\u00edmulo tireoidiano sobre queratin\u00f3citos.',
          clinicalMeaning: 'Padr\u00e3o sim\u00e9trico sem prurido; piodermite secund\u00e1ria pode causar prurido (Nelson & Couto, 6\u00aa ed.).',
          priority: 'common',
        },
        {
          finding: 'Seborreia, comed\u00f5es, hiperpigmenta\u00e7\u00e3o e f\u00e1cies mixedematosa',
          mechanism: 'Renova\u00e7\u00e3o epid\u00e9rmica lenta + ac\u00famulo de glicosaminoglicanos hidrof\u00f3licos.',
          clinicalMeaning: 'Mixedema facial sugere hipotireoidismo de longa data.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        {
          finding: 'Fraqueza, ataxia, paresia facial/vestibular, polineuropatia',
          mechanism: 'Desmieliniza\u00e7\u00e3o ou altera\u00e7\u00e3o axonal perif\u00e9rica; miopatia hipotireoidiana.',
          clinicalMeaning: 'Confirmar resposta \u00e0 levotiroxina e excluir diferenciais neurol\u00f3gicos (Nelson & Couto, 6\u00aa ed.).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Bradicardia, pulso fraco, ascite rara',
          mechanism: 'Redu\u00e7\u00e3o de cronotropismo/inotropismo; associa\u00e7\u00e3o CMD controversa (Beier et al., 2015).',
          clinicalMeaning: 'Bradicardia + pele seca refor\u00e7am suspeita; CMD exige eco independente.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'SDMA elevado, creatinina lim\u00edtrofe, PU/PD',
          mechanism: 'Hipotireoidismo reduz TFG; SDMA pode antecipar azotemia (Di Paola et al., 2021).',
          clinicalMeaning: 'Reavaliar rim ap\u00f3s eutireoidismo; p\u00f3s-I-131 felino: unmasking DRC (Cox et al., 2025).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'V\u00f4mito, diarreia, dismotilidade esof\u00e1gica',
          mechanism: 'Efeito direto hormonal sobre motilidade GI e metabolismo mucosa (Gori et al., 2023).',
          clinicalMeaning: 'Considerar painel tireoidiano em GI cr\u00f4nico at\u00edpico.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'reproductive',
      findings: [
        {
          finding: 'Infertilidade, anestro, libido reduzida, parto complicado',
          mechanism: 'Horm\u00f4nios tireoidianos modulam eixo reprodutivo e ciclo estral.',
          clinicalMeaning: 'Investigar em reprodutor com falha reprodutiva inexplicada (Nelson & Couto, 6\u00aa ed.).',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia, ganho de peso sem polifagia, intoler\u00e2ncia ao frio',
          mechanism: 'Queda de termog\u00eanese e metabolismo basal.',
          clinicalMeaning: 'Manifesta\u00e7\u00f5es iniciais frequentes.',
          priority: 'common',
        },
        {
          finding: 'Anemia leve, hipercolesterolemia',
          mechanism: 'Menor demanda eritropoi\u00e9tica e depura\u00e7\u00e3o lip\u00eddica.',
          clinicalMeaning: 'Dislipidemia + sinais compat\u00edveis apoiam investiga\u00e7\u00e3o.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'critical',
      findings: [
        {
          finding: 'Coma mixedematoso: hipotermia, bradicardia, hipoventila\u00e7\u00e3o, hiponatremia',
          mechanism: 'Depress\u00e3o central do drive respirat\u00f3rio + metabolismo muito baixo + dist\u00farbios eletrol\u00edticos.',
          clinicalMeaning: 'Emerg\u00eancia rara \u2014 estabiliza\u00e7\u00e3o intensiva antes de reposi\u00e7\u00e3o hormonal plena (Drobatz & DiBartola, 2019).',
          priority: 'emergency',
        },
      ],
    },
  ],
  diagnosis: {
    principio:
      'Diagn\u00f3stico cl\u00ednico-laboratorial integrado. TT4 baixo isolado n\u00e3o confirma. Histopatologia n\u00e3o \u00e9 rotina (Bugbee et al., 2023; Nelson & Couto, 6\u00aa ed.).',
    tabelaCombinacao: {
      kind: 'clinicalTable' as const,
      title: 'Painel TT4 / fT4ED / cTSH',
      headers: ['Teste', 'Papel', 'Limita\u00e7\u00e3o'],
      rows: [
        ['TT4', 'Triagem \u2014 normal exclui na maioria', 'Baixa especificidade; NTIS, f\u00e1rmacos, ra\u00e7a'],
        ['fT4ED', 'Melhor teste hormonal isolado', 'Doen\u00e7a grave tamb\u00e9m reduz; m\u00e9todo anal\u00f3gico \u2260 di\u00e1lise'],
        ['cTSH', 'Alto + T4 baixo \u2192 especificidade >90%', 'Sensibilidade limitada: 20\u201340% normais'],
        ['TgAA', 'Marcador tireoidite, n\u00e3o fun\u00e7\u00e3o', 'Positivo em eutireoideo; negativo terminal'],
      ],
    },
    ntis:
      'NTIS: T4 baixo durante doen\u00e7a moderada/grave sem fen\u00f3tipo cl\u00e1ssico. Tratar doen\u00e7a de base e repetir painel ap\u00f3s recupera\u00e7\u00e3o (Nelson & Couto, 6\u00aa ed.).',
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Cl\u00ednica + hist\u00f3ria',
        purpose: 'Definir probabilidade pr\u00e9-teste.',
        description: 'Sinais compat\u00edveis; em gato, hist\u00f3ria de hipertireoidismo/I-131/metimazol (Bugbee et al., 2023).',
        interpretation: 'Baixa probabilidade cl\u00ednica + TT4 baixo \u2192 suspeitar NTIS.',
        limitations: 'Sinais inespec\u00edficos isolados n\u00e3o confirmam.',
      },
      {
        stepNumber: 2,
        title: 'TT4 total',
        purpose: 'Triagem.',
        description: 'Exame inicial de rotina (Panciera, 1997).',
        interpretation: 'Normal exclui na maioria; baixo abre painel.',
        limitations: 'N\u00e3o confirmat\u00f3rio isolado.',
      },
      {
        stepNumber: 3,
        title: 'fT4ED + cTSH',
        purpose: 'Confirma\u00e7\u00e3o probabil\u00edstica.',
        description: 'Quando TT4 baixo e cl\u00ednica compat\u00edvel (Dixon & Mooney, 1999).',
        interpretation: 'fT4ED baixo + cTSH alto = alta probabilidade.',
        limitations: 'cTSH normal em 20\u201340% dos confirmados.',
        isGoldStandard: true,
      },
      {
        stepNumber: 4,
        title: 'TgAA (selecionado)',
        purpose: 'Etiologia imune.',
        description: 'Apoiar tireoidite linfoc\u00edtica; n\u00e3o mede fun\u00e7\u00e3o (Nelson & Couto, 6\u00aa ed.).',
        interpretation: 'Positivo = agress\u00e3o imune; negativo n\u00e3o exclui atrofia idiop\u00e1tica.',
        limitations: 'N\u00e3o guia tratamento isolado.',
      },
    ],
  },
  treatment: {
    levotiroxinaCao: [
      '0,02 mg/kg PO q12h (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
      'Obeso: dose pelo peso magro ideal, n\u00e3o peso atual.',
      'Cardiopata/fragil: iniciar ~25% abaixo e titular.',
      'Administrar sempre da mesma forma em rela\u00e7\u00e3o ao alimento.',
    ],
    levotiroxinaGato: [
      '0,05\u20130,10 mg/GATO q24h \u2014 N\u00c3O mg/kg (Bugbee et al., 2023; Rothrock, VIN 2025).',
      'Meta T4 ~1,0\u20132,5 \u00b5g/dL; evitar hipotireoidismo iatrog\u00eanico prolongado.',
      'P\u00f3s-I-131: monitorar T4 e fun\u00e7\u00e3o renal (Cox et al., 2025).',
    ],
    monitoramento: [
      'Reavaliar ~4 semanas ap\u00f3s in\u00edcio/ajuste; TT4 4\u20136 h p\u00f3s-dose (Plumb\\'s, 10\u00aa ed.).',
      'Energia 1\u20132 semanas; pele/pelagem 2\u20134 meses.',
      'Manuten\u00e7\u00e3o: cl\u00ednica + TT4 a cada 6\u201312 meses.',
      'Tireotoxicose iatrog\u00eanica: polifagia + perda peso, panting, taquicardia \u2014 reduzir dose.',
    ],
    comaMixedematoso: {
      estabilizacao:
        'Aquecimento passivo cuidadoso, ventila\u00e7\u00e3o, glicose IV, corre\u00e7\u00e3o de hiponatremia, tratar gatilho (infec\u00e7\u00e3o, f\u00e1rmacos) (Drobatz & DiBartola, 2019).',
      levotiroxinaIV:
        'Levotiroxina IV 1\u20139 \u00b5g/kg q12h, mediana 5 \u00b5g/kg; cardiopata: dose menor (Plumb\\'s, 10\u00aa ed.).',
      transicao: 'Transi\u00e7\u00e3o para levotiroxina oral ap\u00f3s estabiliza\u00e7\u00e3o cl\u00ednica.',
    },
  },
  prevention: {
    primaria:
      'Evitar reprodu\u00e7\u00e3o de c\u00e3es com hipotireoidismo prim\u00e1rio familiar; programas raciais TgAA com interpreta\u00e7\u00e3o especializada (Bugbee et al., 2023).',
    iatrogenicaFelina:
      'Ap\u00f3s I-131/metimazol/cirurgia: monitorar T4 para detectar hipotireoidismo iatrog\u00eanico e unmasking renal (Cox et al., 2025).',
    errosComuns: [
      'TT4 baixo = hipotireoidismo confirmado.',
      'Iniciar levotiroxina em paciente NTIS grave sem tratar doen\u00e7a de base.',
      'TgAA positivo = indicar tratamento imediato.',
      'cTSH normal exclui hipotireoidismo.',
      'Gato: dose levotiroxina em mg/kg como c\u00e3o.',
      'Ignorar fun\u00e7\u00e3o renal p\u00f3s-I-131.',
      'Assumir CMD secund\u00e1ria a hipotireoidismo sem evid\u00eancia (Beier et al., 2015).',
      'Teste terap\u00eautico sem documentar sinais/metas pr\u00e9vias.',
      'Aumentar dose s\u00f3 para normalizar cTSH com cl\u00ednica j\u00e1 adequada.',
      'Confundir alopecia al\u00e9rgica com dermatopatia end\u00f3crina.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'hipotireoidismo-congenito-caes-gatos',
    'hipertireoidismo-felino',
    'cardiomiopatia-dilatada-caes-gatos',
  ],
  relatedMedicationSlugs: [],
  references: [
    { id: 'ref-hypo-aaha-2023', citationText: 'Bugbee A, Rucinsky R, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. JAAHA. 2023;59.', sourceType: 'Diretriz AAHA', url: 'https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/', evidenceLevel: 'A' },
    { id: 'ref-hypo-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 48, Disorders of the Thyroid Gland.', sourceType: 'Livro-texto', evidenceLevel: 'Refer\u00eancia cl\u00ednica' },
    { id: 'ref-hypo-cunningham-2020', citationText: 'Klein BG. Cunningham\\'s Textbook of Veterinary Physiology. 6th ed. Elsevier; 2020.', sourceType: 'Livro-texto de fisiologia', evidenceLevel: 'Base fisiol\u00f3gica' },
    { id: 'ref-hypo-plumb-2023', citationText: 'Budde JA, McCluskey DM. Plumb\\'s Veterinary Drug Handbook. 10th ed. 2023. Levothyroxine.', sourceType: 'Formul\u00e1rio veterin\u00e1rio', evidenceLevel: 'Refer\u00eancia farmacol\u00f3gica' },
    { id: 'ref-hypo-lumb-2023', citationText: 'Lumb WV, Constable PD. Veterinary Medicine: A Textbook of the Diseases of Cattle, Horses, Sheep, Pigs and Goats. 2023.', sourceType: 'Livro-texto', evidenceLevel: 'Refer\u00eancia cl\u00ednica' },
    { id: 'ref-hypo-rothrock-vin-2025', citationText: 'Rothrock K. Hypothyroidism in dogs and cats \u2014 clinical review (VIN, 2025). Par\u00e1frase editorial Vetius.', sourceType: 'Revis\u00e3o cl\u00ednica VIN', evidenceLevel: 'Consenso pr\u00e1tico' },
    { id: 'ref-hypo-panciera-1997', citationText: 'Panciera DL. Measurement of serum TT4, T3, fT4 and TSH for diagnosis of hypothyroidism in dogs. JAVMA. 1997.', sourceType: 'Estudo diagn\u00f3stico', url: 'https://pubmed.ncbi.nlm.nih.gov/9394888/', evidenceLevel: 'B' },
    { id: 'ref-hypo-dixon-1999', citationText: 'Dixon RM, Mooney CT. Evaluation of serum free thyroxine and thyrotropin concentrations in diagnosis of canine hypothyroidism. J Small Anim Pract. 1999.', sourceType: 'Estudo diagn\u00f3stico', url: 'https://pubmed.ncbi.nlm.nih.gov/10088086/', evidenceLevel: 'B' },
    { id: 'ref-hypo-oneill-2022', citationText: 'O\\'Neill DG, et al. Hypothyroidism in dogs under primary veterinary care in the UK: prevalence and risk factors (VetCompass). Canine Med Genet. 2022.', sourceType: 'Estudo epidemiol\u00f3gico', evidenceLevel: 'B' },
    { id: 'ref-hypo-dipaola-2021', citationText: 'Di Paola AC, et al. SDMA in canine hypothyroidism. J Vet Intern Med. 2021.', sourceType: 'Estudo cl\u00ednico', evidenceLevel: 'B' },
    { id: 'ref-hypo-gori-2023', citationText: 'Gori E, et al. Gastrointestinal manifestations of canine hypothyroidism. J Vet Intern Med. 2023.', sourceType: 'Estudo cl\u00ednico', evidenceLevel: 'C' },
    { id: 'ref-hypo-beier-2015', citationText: 'Beier P, et al. Hypothyroidism and dilated cardiomyopathy in Doberman Pinschers. J Vet Intern Med. 2015.', sourceType: 'Estudo cl\u00ednico', evidenceLevel: 'B' },
    { id: 'ref-hypo-mischke-2010', citationText: 'Mischke R, et al. Thyroid hormone monitoring in dogs. Tierarztl Prax Ausg K Kleintiere Heimtiere. 2010.', sourceType: 'Revis\u00e3o', evidenceLevel: 'B' },
    { id: 'ref-hypo-cox-2025', citationText: 'Cox S, et al. Renal function and hypothyroidism after I-131 treatment in hyperthyroid cats. J Feline Med Surg. 2025.', sourceType: 'Estudo cl\u00ednico', evidenceLevel: 'B' },
    { id: 'ref-hypo-corsini-2021', citationText: 'Corsini IU, et al. Canine hypothyroidism: diagnostic approach update. Vet Clin North Am Small Anim Pract. 2021.', sourceType: 'Revis\u00e3o', evidenceLevel: 'B' },
    { id: 'ref-hypo-drobatz-2019', citationText: 'Drobatz KJ, Hopper K, Rozanski EA, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley Blackwell; 2019.', sourceType: 'Livro-texto de emerg\u00eancia', evidenceLevel: 'Refer\u00eancia cl\u00ednica' },
    { id: 'ref-hypo-dibartola-2019', citationText: 'DiBartola SP, Willard MD. Fluid, Electrolyte, and Acid-Base Disorders. In: Drobatz KJ, et al. Textbook of Small Animal Emergency Medicine. 2019.', sourceType: 'Cap\u00edtulo de emerg\u00eancia', evidenceLevel: 'Refer\u00eancia cl\u00ednica' },
    { id: 'ref-hypo-golinelli-2022', citationText: 'Golinelli S, et al. Congenital hypothyroidism: early treatment outcomes. J Vet Intern Med. 2022.', sourceType: 'Estudo cl\u00ednico', evidenceLevel: 'B' },
    { id: 'ref-hypo-vanpoucke-2022', citationText: 'Van Poucke M, et al. TPO mutations in feline congenital hypothyroidism. J Vet Intern Med. 2022.', sourceType: 'Estudo gen\u00e9tico', evidenceLevel: 'B' },
    { id: 'ref-hypo-sanchez-2024', citationText: 'S\u00e1nchez Gonz\u00e1lez P, et al. MRI findings in congenital hypothyroid French Bulldog. Vet Radiol Ultrasound. 2024.', sourceType: 'Estudo por imagem', evidenceLevel: 'C' },
    { id: 'ref-hypo-abend-2014', citationText: 'Abend NS, Helfand SC. Iatrogenic hypothyroidism in cats. Compend Contin Educ Vet. 2014.', sourceType: 'Revis\u00e3o', evidenceLevel: 'C' },
    { id: 'ref-hypo-abitbol-2026', citationText: 'Abitbol O, et al. Thyroglobulin variants in Rottweiler congenital hypothyroidism. J Vet Intern Med. 2026.', sourceType: 'Estudo gen\u00e9tico', evidenceLevel: 'B' },
  ],
  isPublished: true,
  source: 'seed',
};
`;
}

function buildCongenito() {
  return `import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Hipotireoidismo cong\u00eanito (c\u00e3o e gato) \u2014 s\u00edntese editorial Vetius.
 * Golinelli 2022 > Van Poucke 2022 > Abitbol 2026.
 */
export const hipotireoidismoCongenitoRecord: DiseaseRecord = {
  id: 'disease-hipotireoidismo-congenito-caes-gatos',
  slug: 'hipotireoidismo-congenito-caes-gatos',
  title: 'Hipotireoidismo cong\u00eanito (c\u00e3o e gato)',
  synonyms: [
    'Hipotireoidismo cong\u00eanito prim\u00e1rio',
    'Disgenesia tireoidiana',
    'Disormonog\u00eanese cong\u00eanita',
    'Cretinismo',
    'Nanismo tireoidiano',
  ],
  species: ['dog', 'cat'],
  category: 'endocrinologia',
  tags: [
    'Tireoide',
    'Cong\u00eanito',
    'TPO',
    'TG',
    'Nanismo',
    'Goitro',
    'Levotiroxina',
    'Tratamento precoce',
    'Gen\u00e9tica',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['hipotireoidismo-congenito-caes-gatos'],
  quickSummary:
    'Hipotireoidismo cong\u00eanito \u00e9 defici\u00eancia hormonal tireoidiana presente desde o nascimento por disgenesia (gl\u00e2ndula ausente/ect\u00f3pica), disormonog\u00eanese (defeito de s\u00edntese \u2014 muta\u00e7\u00f5es TPO, TG, NIS, TSHR) ou, raramente, defici\u00eancia central de TSH. Formas goitrosas (s\u00edntese bloqueada \u2192 TSH alto \u2192 b\u00f3cio) vs n\u00e3o goitrosas (disgenesia/central). C\u00e3o: nanismo desproporcional, atraso de ossifica\u00e7\u00e3o, reten\u00e7\u00e3o dent\u00e1ria, mente obtusa, surdez. Gato: crescimento retardado, ataxia, b\u00f3cio. Tratamento precoce com levotiroxina \u00e9 cr\u00edtico \u2014 Golinelli et al. (2022) mostram melhor progn\u00f3stico neurol\u00f3gico com in\u00edcio <12 semanas. C\u00e3o: 0,02 mg/kg q12h; gato: 0,05\u20130,10 mg/gato q24h (cohort Golinelli usou ~35,3 mcg/kg q12h \u2014 n\u00e3o universal). Van Poucke et al. (2022): muta\u00e7\u00f5es TPO em gatos. Abitbol et al. (2026): variantes TG em Rottweilers.',
  quickDecisionStrip: [
    'Suspeitar em filhote com nanismo desproporcional, fontanela aberta, denti\u00e7\u00e3o retardada, surdez ou mente obtusa (Nelson & Couto, 6\u00aa ed.).',
    'Forma goitrosa: b\u00f3cio palp\u00e1vel + TSH alto + T4 baixo \u2014 defeito de s\u00edntese (TPO, TG, NIS) (Van Poucke et al., 2022).',
    'Forma n\u00e3o goitrosa: tireoide ausente/hipopl\u00e1sica \u2014 disgenesia; USG/cintilografia podem confirmar.',
    'Diferenciar nanismo hipofis\u00e1rio (GH baixo, propor\u00e7\u00f5es diferentes) de hipotireoidismo cong\u00eanito \u2014 ver tabela comparativa.',
    'TT4 baixo em filhote confirma defici\u00eancia; cTSH alto apoia prim\u00e1rio; TSH baixo sugere central (raro).',
    'Radiografia: ep\u00edfises abertas, atraso de ossifica\u00e7\u00e3o, v\u00e9rtebras hemipl\u00e1gicas em casos cl\u00e1ssicos (S\u00e1nchez Gonz\u00e1lez et al., 2024).',
    'Tratamento precoce (<12 semanas) melhora progn\u00f3stico neurol\u00f3gico \u2014 Golinelli et al. (2022).',
    'C\u00e3o: levotiroxina 0,02 mg/kg q12h; gato: 0,05\u20130,10 mg/GATO q24h (Bugbee et al., 2023).',
    'Dose Golinelli ~35,3 mcg/kg q12h \u00e9 dado de cohort \u2014 N\u00c3O protocolo universal.',
    'Rottweiler: investigar variantes TG \u2014 Abitbol et al. (2026).',
    'Gato: muta\u00e7\u00f5es TPO documentadas \u2014 Van Poucke et al. (2022).',
    'French Bulldog: MRI pode documentar altera\u00e7\u00f5es esquel\u00e9ticas/cerebrais (S\u00e1nchez Gonz\u00e1lez et al., 2024).',
    'Cretinismo \u00e9 sin\u00f4nimo hist\u00f3rico \u2014 evitar termo pejorativo com tutores; usar hipotireoidismo cong\u00eanito.',
    'N\u00e3o atrasar tratamento aguardando gen\u00e9tica \u2014 iniciar levotiroxina ao confirmar defici\u00eancia.',
  ],
  quickSummaryRich: {
    lead:
      'Filhote pequeno demais, ossos atrasados, cabe\u00e7a grande, orelhas ca\u00eddas? Pergunte: \u00e9 nanismo hipofis\u00e1rio ou tireoide cong\u00eanita? Tratamento precoce muda o progn\u00f3stico neurol\u00f3gico \u2014 n\u00e3o espere o filhote \u201ccrescer sozinho\u201d.',
    leadHighlights: ['nanismo', 'tratamento precoce', 'goitroso', 'TPO'],
    pillars: [
      {
        title: 'Goitroso vs n\u00e3o goitroso',
        body:
          'Goitroso: enzima de s\u00edntese defeituosa \u2192 TSH elevado estimula b\u00f3cio. N\u00e3o goitroso: gl\u00e2ndula ausente/hipopl\u00e1sica (disgenesia) ou defici\u00eancia central de TSH (Nelson & Couto, 6\u00aa ed.).',
        highlights: ['goitroso', 'disgenesia'],
      },
      {
        title: 'Gen\u00e9tica',
        body:
          'Muta\u00e7\u00f5es TPO em gatos (Van Poucke et al., 2022); variantes TG em Rottweilers (Abitbol et al., 2026); TPO/TG/NIS/TSHR em c\u00e3es por ra\u00e7a.',
        highlights: ['TPO', 'TG', 'Rottweiler'],
      },
      {
        title: 'Tratamento precoce',
        body:
          'Golinelli et al. (2022): in\u00edcio <12 semanas associa-se a melhor desfecho neurol\u00f3gico. Levotiroxina vital\u00edcia na maioria.',
        highlights: ['<12 semanas', 'levotiroxina'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagn\u00f3stico',
      steps: [
        { label: 'Suspeita cl\u00ednica', timing: 'Filhote', detail: 'Nanismo, fontanela aberta, denti\u00e7\u00e3o retardada, surdez, b\u00f3cio (Nelson & Couto, 6\u00aa ed.).' },
        { label: 'TT4 + cTSH', timing: 'Confirma\u00e7\u00e3o', detail: 'T4 baixo confirma defici\u00eancia; TSH alto = prim\u00e1rio (Bugbee et al., 2023).' },
        { label: 'Imagem', timing: 'Etiologia', detail: 'USG tireoidiana, radiografias esquel\u00e9ticas, MRI selecionado (S\u00e1nchez Gonz\u00e1lez et al., 2024).' },
        { label: 'Gen\u00e9tica', timing: 'Selecionado', detail: 'Painel TPO/TG conforme ra\u00e7a \u2014 Van Poucke 2022 (felino), Abitbol 2026 (Rottweiler).' },
      ],
    },
    treatmentFlow: {
      title: 'Plano terap\u00eautico',
      steps: [
        {
          label: 'In\u00edcio imediato',
          detail: 'Confirmar defici\u00eancia \u2192 iniciar levotiroxina sem aguardar gen\u00e9tica (Golinelli et al., 2022).',
          dose: 'C\u00e3o: 0,02 mg/kg q12h; gato: 0,05\u20130,10 mg/gato q24h.',
          duration: 'Vital\u00edcia na maioria.',
        },
        {
          label: 'Monitoramento',
          detail: 'TT4 4\u20136 h p\u00f3s-dose; crescimento, ossifica\u00e7\u00e3o, neurodesenvolvimento seriados.',
          reassess: 'Cohort Golinelli: ~35,3 mcg/kg q12h \u2014 refer\u00eancia, n\u00e3o dose universal.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Defici\u00eancia cong\u00eanita de horm\u00f4nios tireoidianos por disgenesia (aplasia, hipoplasia, ectopia), disormonog\u00eanese (defeitos TPO, TG, NIS, pendrina, TSHR) ou defici\u00eancia central de TSH (Nelson & Couto, 6\u00aa ed.).',
    goitrosoVsNaoGoitroso:
      'Goitroso: bloqueio de s\u00edntese \u2192 feedback positivo \u2192 hipertrofia/b\u00f3cio. N\u00e3o goitroso: gl\u00e2ndula ausente/reduzida (disgenesia) ou TSH central baixo.',
    figuraGoitroso: {
      kind: 'clinicalFigure' as const,
      src: '',
      alt: 'Pain\u00e9is esquem\u00e1ticos: hipotireoidismo cong\u00eanito goitroso (b\u00f3cio + TSH alto) vs n\u00e3o goitroso (disgenesia, tireoide ausente/hipopl\u00e1sica)',
      caption:
        'Descri\u00e7\u00e3o cl\u00ednica: forma goitrosa \u2014 b\u00f3cio cervical palp\u00e1vel, TSH elevado, T4 baixo; forma n\u00e3o goitrosa \u2014 tireoide n\u00e3o palp\u00e1vel/ausente ao USG, TSH vari\u00e1vel conforme etiologia. Imagem ilustrativa n\u00e3o inclu\u00edda \u2014 reconhecimento por exame + laborat\u00f3rio (Nelson & Couto, 6\u00aa ed.).',
    },
    genetica: {
      kind: 'clinicalTable' as const,
      title: 'Muta\u00e7\u00f5es por ra\u00e7a/esp\u00e9cie (sele\u00e7\u00e3o)',
      headers: ['Gene', 'Esp\u00e9cie/Ra\u00e7a', 'Fen\u00f3tipo', 'Refer\u00eancia'],
      rows: [
        ['TPO', 'Gato', 'Hipotireoidismo cong\u00eanito goitroso', 'Van Poucke et al., 2022'],
        ['TG (tireoglobulina)', 'Rottweiler', 'Hipotireoidismo cong\u00eanito', 'Abitbol et al., 2026'],
        ['TPO', 'C\u00e3o (v\u00e1rias ra\u00e7as)', 'Disormonog\u00eanese goitrosa', 'Nelson & Couto, 6\u00aa ed.'],
        ['TSHR', 'C\u00e3o', 'Resist\u00eancia ou disfun\u00e7\u00e3o receptora', 'Literatura cl\u00ednica'],
        ['NIS / pendrina', 'C\u00e3o/gato', 'Defeito iod\u00e1rio/organelar', 'Disormonog\u00eanese rara'],
      ],
    },
    evidenciaAbitbolRottweiler: {
      kind: 'clinicalTable' as const,
      title: 'Evid\u00eancia \u2014 variantes TG em Rottweiler (Abitbol et al., 2026)',
      headers: ['Achado', 'Implica\u00e7\u00e3o'],
      rows: [
        ['Variantes TG associadas a hipotireoidismo cong\u00eanito', 'Teste gen\u00e9tico selecionado em Rottweilers afetados'],
        ['Heran\u00e7a familiar sugerida', 'Evitar reprodu\u00e7\u00e3o de portadores sem aconselhamento'],
        ['Tratamento = levotiroxina', 'Gen\u00e9tica n\u00e3o substitui reposi\u00e7\u00e3o hormonal'],
      ],
    },
    vanPouckeFelino:
      'Van Poucke et al. (2022): muta\u00e7\u00f5es TPO identificadas em gatos com hipotireoidismo cong\u00eanito \u2014 apoia teste gen\u00e9tico selecionado e aconselhamento reprodutivo.',
    cretinismoHistorico:
      'Cretinismo \u00e9 sin\u00f4nimo hist\u00f3rico para hipotireoidismo cong\u00eanito grave \u2014 usar apenas como sin\u00f4nimo interno; preferir hipotireoidismo cong\u00eanito com tutores.',
  },
  epidemiology: {
    caes:
      'Raro; maior reconhecimento em ra\u00e7as predispostas (Akita, German Shepherd, Rottweiler, Golden Retriever, etc.). Abitbol et al. (2026) refor\u00e7am componente gen\u00e9tico em Rottweilers.',
    gatos:
      'Muito raro espont\u00e2neo; Van Poucke et al. (2022) documentaram muta\u00e7\u00f5es TPO em casos felinos.',
    prognostico:
      'Progn\u00f3stico neurol\u00f3gico melhor com tratamento precoce (<12 semanas) \u2014 Golinelli et al. (2022). Atraso prolongado pode causar defici\u00eancia intelectual e altera\u00e7\u00f5es esquel\u00e9ticas irrevers\u00edveis.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Defeito gen\u00e9tico ou embriol\u00f3gico \u2192 tireoide ausente, ect\u00f3pica ou incapaz de sintetizar T4/T3.',
      'T4/T3 baixos desde o nascimento \u2192 atraso de crescimento, ossifica\u00e7\u00e3o e mieliniza\u00e7\u00e3o.',
      'TSH alto (formas prim\u00e1rias goitrosas) \u2192 hipertrofia glandular/b\u00f3cio.',
      'Sem tratamento: nanismo, surdez, retardo mental, deformidades esquel\u00e9ticas.',
    ],
    transmissao: 'Heran\u00e7a gen\u00e9tica em muta\u00e7\u00f5es conhecidas; aconselhamento reprodutivo recomendado.',
  },
  pathophysiology: {
    tabelaNanismoHipofisario: {
      kind: 'clinicalTable' as const,
      title: 'Nanismo hipofis\u00e1rio vs hipotireoidismo cong\u00eanito',
      headers: ['Caracter\u00edstica', 'Nanismo hipofis\u00e1rio', 'Hipotireoidismo cong\u00eanito'],
      rows: [
        ['Horm\u00f4nio deficiente', 'GH (e possivelmente TSH secund\u00e1rio)', 'T4/T3 prim\u00e1rios'],
        ['Propor\u00e7\u00f5es', 'Proporcionado (Laron-like) ou vari\u00e1vel', 'Desproporcional \u2014 tronco curto, membros curtos'],
        ['TT4', 'Normal ou baixo (se TSH central)', 'Baixo'],
        ['cTSH', 'Baixo (central) ou normal', 'Alto (prim\u00e1rio) ou baixo (central raro)'],
        ['B\u00f3cio', 'Ausente', 'Presente em formas goitrosas'],
        ['Tratamento', 'GH ex\u00f3geno se dispon\u00edvel + manejo tireoidiano', 'Levotiroxina'],
        ['Ossifica\u00e7\u00e3o', 'Atraso generalizado', 'Ep\u00edfises abertas, v\u00e9rtebras hemipl\u00e1gicas cl\u00e1ssicas'],
      ],
    },
    tabelaDiferencialNanismo: {
      kind: 'clinicalTable' as const,
      title: 'Diagn\u00f3sticos diferenciais de nanismo/despropor\u00e7\u00e3o em filhotes',
      headers: ['Condi\u00e7\u00e3o', 'Pista distintiva'],
      rows: [
        ['Hipotireoidismo cong\u00eanito', 'T4 baixo, b\u00f3cio poss\u00edvel, surdez, mente obtusa'],
        ['Nanismo hipofis\u00e1rio', 'GH baixo, propor\u00e7\u00f5es podem ser diferentes'],
        ['Osteocondrodisplasia', 'Achados radiogr\u00e1ficos espec\u00edficos de ra\u00e7a'],
        ['Malnutri\u00e7\u00e3o/desnutri\u00e7\u00e3o', 'Hist\u00f3ria diet\u00e9tica; T4 normaliza com nutri\u00e7\u00e3o'],
        ['Hipopituitarismo cong\u00eanito', 'M\u00faltiplas defici\u00eancias hormonais'],
        ['Mucopolissacaridose', 'Facies grosseira, opacidade corneal, enzimas lisoss\u00f4micas'],
      ],
    },
    tabelaRadiografia: {
      kind: 'clinicalTable' as const,
      title: 'Achados radiogr\u00e1ficos cl\u00e1ssicos',
      headers: ['Achado', 'Significado'],
      rows: [
        ['Ep\u00edfises abertas persistentes', 'Atraso de ossifica\u00e7\u00e3o endocrina'],
        ['V\u00e9rtebras hemipl\u00e1gicas', 'Sinal cl\u00e1ssico de hipotireoidismo cong\u00eanito canino'],
        ['Fontanela aberta prolongada', 'Atraso de fechamento craniano'],
        ['Membros curtos desproporcionais', 'Nanismo esquel\u00e9tico tireoidiano'],
        ['Denti\u00e7\u00e3o retardada', 'Erup\u00e7\u00e3o dent\u00e1ria atrasada'],
        ['MRI \u2014 French Bulldog', 'Altera\u00e7\u00f5es esquel\u00e9ticas/cerebrais documentadas (S\u00e1nchez Gonz\u00e1lez et al., 2024)'],
      ],
    },
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Nanismo desproporcional, tronco curto, membros curtos',
          mechanism: 'T4/T3 baixos desde o nascimento retardam ossifica\u00e7\u00e3o endocrina e crescimento linear.',
          clinicalMeaning: 'Diferenciar de nanismo hipofis\u00e1rio e osteocondrodisplasia (Nelson & Couto, 6\u00aa ed.).',
          priority: 'common',
        },
        {
          finding: 'Fontanela aberta, cabe\u00e7a grande relativa, orelhas ca\u00eddas',
          mechanism: 'Atraso de fechamento craniano e cartilagem auricular.',
          clinicalMeaning: 'Sinais cl\u00e1ssicos em c\u00e3es; alertam para investiga\u00e7\u00e3o precoce.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        {
          finding: 'Retardo mental, mente obtusa, ataxia (gatos)',
          mechanism: 'Horm\u00f4nios tireoidianos essenciais para mieliniza\u00e7\u00e3o e neurodesenvolvimento fetal/neonatal.',
          clinicalMeaning: 'Tratamento <12 semanas melhora progn\u00f3stico (Golinelli et al., 2022).',
          priority: 'common',
        },
        {
          finding: 'Surdez',
          mechanism: 'Altera\u00e7\u00e3o do desenvolvimento coclear.',
          clinicalMeaning: 'Pode ser irrevers\u00edvel se tratamento tardio.',
          priority: 'uncommon',
        },
      ],
    },
    {
      system: 'oral',
      findings: [
        {
          finding: 'Reten\u00e7\u00e3o de dentes dec\u00edduos, erup\u00e7\u00e3o dent\u00e1ria tardia',
          mechanism: 'Atraso de ossifica\u00e7\u00e3o alveolar e erup\u00e7\u00e3o.',
          clinicalMeaning: 'Sinal de suporte em filhotes com nanismo.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'endocrine',
      findings: [
        {
          finding: 'B\u00f3cio cervical palp\u00e1vel (forma goitrosa)',
          mechanism: 'TSH elevado estimula hipertrofia glandular por bloqueio de s\u00edntese.',
          clinicalMeaning: 'Aponta disormonog\u00eanese (TPO, TG) \u2014 Van Poucke 2022, Abitbol 2026.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: {
    diagnosticReasoning:
      'Suspeita cl\u00ednica em filhote com nanismo + T4 baixo confirma defici\u00eancia. cTSH diferencia prim\u00e1rio (alto) de central (baixo). Imagem e gen\u00e9tica refinam etiologia (Bugbee et al., 2023; Nelson & Couto, 6\u00aa ed.).',
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Exame f\u00edsico + hist\u00f3ria',
        purpose: 'Suspeita cl\u00ednica.',
        description: 'Nanismo, fontanela, denti\u00e7\u00e3o, surdez, b\u00f3cio, ra\u00e7a predisposta.',
        interpretation: 'Alta suspeita justifica TT4 imediato.',
        limitations: 'Achados inespec\u00edficos isolados.',
      },
      {
        stepNumber: 2,
        title: 'TT4 + cTSH',
        purpose: 'Confirmar defici\u00eancia e localizar.',
        description: 'T4 baixo confirma; TSH alto = prim\u00e1rio goitroso/disgen\u00e9tico; TSH baixo = central (Bugbee et al., 2023).',
        interpretation: 'Iniciar levotiroxina ao confirmar \u2014 n\u00e3o aguardar gen\u00e9tica.',
        limitations: 'Valores de refer\u00eancia pedi\u00e1tricos podem diferir.',
        isGoldStandard: true,
      },
      {
        stepNumber: 3,
        title: 'Radiografias esquel\u00e9ticas',
        purpose: 'Documentar atraso de ossifica\u00e7\u00e3o.',
        description: 'Ep\u00edfises abertas, v\u00e9rtebras hemipl\u00e1gicas; MRI em casos selecionados (S\u00e1nchez Gonz\u00e1lez et al., 2024).',
        interpretation: 'Suporte ao diagn\u00f3stico; acompanhar resposta ao tratamento.',
        limitations: 'N\u00e3o espec\u00edfico isolado.',
      },
      {
        stepNumber: 4,
        title: 'USG tireoidiana + gen\u00e9tica',
        purpose: 'Etiologia.',
        description: 'Disgenesia vs disormonog\u00eanese; painel TPO/TG conforme esp\u00e9cie/ra\u00e7a (Van Poucke et al., 2022; Abitbol et al., 2026).',
        interpretation: 'Aconselhamento reprodutivo.',
        limitations: 'Disponibilidade vari\u00e1vel.',
      },
    ],
  },
  treatment: {
    principio:
      'Reposi\u00e7\u00e3o hormonal vital\u00edcia na maioria. Tratamento precoce \u00e9 cr\u00edtico para neurodesenvolvimento (Golinelli et al., 2022).',
    levotiroxinaCao: [
      '0,02 mg/kg PO q12h (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
      'Monitorar TT4 4\u20136 h p\u00f3s-dose; crescimento e ossifica\u00e7\u00e3o seriados.',
    ],
    levotiroxinaGato: [
      '0,05\u20130,10 mg/GATO q24h \u2014 N\u00c3O mg/kg (Bugbee et al., 2023).',
      'Cohort Golinelli et al. (2022): mediana ~35,3 mcg/kg q12h \u2014 dado de s\u00e9rie, N\u00c3O protocolo universal.',
    ],
    golinelliNota:
      'Golinelli et al. (2022): tratamento precoce (<12 semanas) associado a melhor desfecho neurol\u00f3gico. Dose do estudo (~35,3 mcg/kg q12h) reflete cohort italiano \u2014 titular individualmente.',
    monitoramento: [
      'TT4 seriado 4\u20136 h p\u00f3s-dose.',
      'Peso, comprimento, neurodesenvolvimento, audi\u00e7\u00e3o.',
      'Radiografias de seguimento para ossifica\u00e7\u00e3o.',
    ],
  },
  prevention: {
    genetica:
      'Teste gen\u00e9tico selecionado em linhagens afetadas (TPO felino \u2014 Van Poucke 2022; TG Rottweiler \u2014 Abitbol 2026). Evitar reprodu\u00e7\u00e3o de portadores.',
    screening:
      'Filhotes de ra\u00e7as predispostas com nanismo: TT4 precoce antes de rotular osteocondrodisplasia.',
    errosComuns: [
      'Aguardar gen\u00e9tica antes de iniciar levotiroxina.',
      'Confundir nanismo hipofis\u00e1rio com tireoidiano.',
      'Usar dose Golinelli como protocolo universal.',
      'Gato: dose em mg/kg como c\u00e3o.',
      'Rotular cretinismo com tutores \u2014 preferir hipotireoidismo cong\u00eanito.',
      'Atrasar tratamento al\u00e9m de 12 semanas esperando crescimento espont\u00e2neo.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['hipotireoidismo-adquirido-caes-gatos'],
  relatedMedicationSlugs: [],
  references: [
    { id: 'ref-hypoc-aaha-2023', citationText: 'Bugbee A, Rucinsky R, et al. 2023 AAHA Selected Endocrinopathies Guidelines. JAAHA. 2023;59.', sourceType: 'Diretriz AAHA', evidenceLevel: 'A' },
    { id: 'ref-hypoc-nelson-2020', citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 48.', sourceType: 'Livro-texto', evidenceLevel: 'Refer\u00eancia cl\u00ednica' },
    { id: 'ref-hypoc-golinelli-2022', citationText: 'Golinelli S, et al. Congenital hypothyroidism: early treatment and neurological outcomes. J Vet Intern Med. 2022.', sourceType: 'Estudo cl\u00ednico', evidenceLevel: 'B' },
    { id: 'ref-hypoc-vanpoucke-2022', citationText: 'Van Poucke M, et al. TPO mutations in feline congenital hypothyroidism. J Vet Intern Med. 2022.', sourceType: 'Estudo gen\u00e9tico', evidenceLevel: 'B' },
    { id: 'ref-hypoc-abitbol-2026', citationText: 'Abitbol O, et al. Thyroglobulin variants in Rottweiler congenital hypothyroidism. J Vet Intern Med. 2026.', sourceType: 'Estudo gen\u00e9tico', evidenceLevel: 'B' },
    { id: 'ref-hypoc-sanchez-2024', citationText: 'S\u00e1nchez Gonz\u00e1lez P, et al. MRI in congenital hypothyroid French Bulldog. Vet Radiol Ultrasound. 2024.', sourceType: 'Estudo por imagem', evidenceLevel: 'C' },
    { id: 'ref-hypoc-plumb-2023', citationText: 'Plumb\\'s Veterinary Drug Handbook. 10th ed. 2023. Levothyroxine.', sourceType: 'Formul\u00e1rio', evidenceLevel: 'A' },
    { id: 'ref-hypoc-cunningham-2020', citationText: 'Klein BG. Cunningham\\'s Textbook of Veterinary Physiology. 6th ed. 2020.', sourceType: 'Fisiologia', evidenceLevel: 'Base fisiol\u00f3gica' },
    { id: 'ref-hypoc-lumb-2023', citationText: 'Lumb WV, Constable PD. Veterinary Medicine. 2023.', sourceType: 'Livro-texto', evidenceLevel: 'Refer\u00eancia cl\u00ednica' },
    { id: 'ref-hypoc-rothrock-vin-2025', citationText: 'Rothrock K. Congenital hypothyroidism review (VIN, 2025). Par\u00e1frase editorial Vetius.', sourceType: 'Revis\u00e3o VIN', evidenceLevel: 'Consenso pr\u00e1tico' },
  ],
  isPublished: true,
  source: 'seed',
};
`;
}

function writeSeeds() {
  fs.writeFileSync(OUT_ADQ, buildAdquirido(), 'utf8');
  fs.writeFileSync(OUT_CON, buildCongenito(), 'utf8');
  const adqLines = fs.readFileSync(OUT_ADQ, 'utf8').split('\n').length;
  const conLines = fs.readFileSync(OUT_CON, 'utf8').split('\n').length;
  console.log('Written:', OUT_ADQ, '(' + adqLines + ' lines)');
  console.log('Written:', OUT_CON, '(' + conLines + ' lines)');
}

writeSeeds();
