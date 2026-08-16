import fs from 'fs';

const OUT_CAES = 'modules/consulta-vet/data/seed/diseases.sindrome-cushing-caes.seed.ts';
const OUT_GATOS = 'modules/consulta-vet/data/seed/diseases.sindrome-cushing-gatos.seed.ts';

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function lines(items, indent = '    ') {
  return items.map((item) => `${indent}'${esc(item)}',`).join('\n');
}

function ref(id, citationText, sourceType, evidenceLevel, url = null, notes = null) {
  const urlPart = url ? `url: '${esc(url)}', ` : '';
  const notesPart = notes ? `notes: '${esc(notes)}', ` : '';
  return `    { id: '${id}', citationText: '${esc(citationText)}', sourceType: '${esc(sourceType)}', ${urlPart}${notesPart}evidenceLevel: '${esc(evidenceLevel)}' },`;
}

const CAES_QUICK_STRIP = [
  'Fosfatase alcalina (ALP) elevada \u2260 Cushing \u2014 n\u00e3o triar s\u00f3 por enzima hep\u00e1tica (Bugbee et al., 2023; Niessen et al., 2025).',
  'Solicitar teste end\u00f3crino apenas com \u22652 sinais cl\u00ednicos compat\u00edveis (AAHA/Behrend, 2022).',
  'C\u00e3o est\u00e1vel espont\u00e2neo: LDDST 0,01 mg/kg IV \u00e9 triagem preferencial (Behrend, VIN 2022; Bugbee et al., 2023).',
  'Suspeita de iatrog\u00eania ou comorbidade grave: ACTHST \u00e9 o padr\u00e3o-ouro para corticoide ex\u00f3geno (Behrend, VIN 2022).',
  'UCCR: excelente para EXCLUIR, n\u00e3o para CONFIRMAR \u2014 urina domiciliar 2 dias ap\u00f3s consulta (Behrend, VIN 2022).',
  'Cortisol basal N\u00c3O \u00e9 exame de triagem \u2014 baixa sensibilidade e especificidade (Bugbee et al., 2023).',
  '~35% dos PDH N\u00c3O suprimem no LDDST (escape) \u2014 aus\u00eancia de supress\u00e3o n\u00e3o confirma ADH isoladamente (Behrend, VIN 2022).',
  'ACTHST falso-negativo at\u00e9 ~41% em ADH \u2014 n\u00e3o descarta hiperadrenocorticismo espont\u00e2neo (Bugbee et al., 2023).',
  'Washout glicocorticoide 2\u20134 semanas antes de testar espont\u00e2neo quando iatrog\u00eania \u00e9 poss\u00edvel (Behrend, VIN 2022).',
  'eACTH: plasma resfriado, centrifugar e congelar imediatamente \u2014 ACTH baixo favorece ADH (Bugbee et al., 2023).',
  'Tamanho da massa adrenal \u2260 malignidade \u2014 carcinoma pode ser pequeno; adenoma pode ser grande (van Bokhorst et al., 2023).',
  'Trilostano: 1 mg/kg q12h OU 2 mg/kg q24h COM alimento \u2014 sinais cl\u00ednicos guiam ajuste, n\u00e3o n\u00famero isolado (Bugbee et al., 2023; Plumb\'s, 10\u00aa ed.).',
  'N\u00c3O aumentar trilostano automaticamente aos 14 dias se cl\u00ednica j\u00e1 melhorou (BSAVA trilostane guidance; Macfarlane et al.).',
  'ACTHST monitoramento: 1 mcg/kg IV, cortisol 3\u20135 h p\u00f3s-p\u00edlula \u2014 N\u00c3O \u00e9 teste diagn\u00f3stico inicial (Bugbee et al., 2023).',
  'Cortisol pr\u00e9-p\u00edlula \u00e9 auxiliar, n\u00e3o universal \u2014 n\u00e3o substitui cl\u00ednica + ACTHST seriado (Macfarlane et al.).',
  'Red flags para suspender trilostano: anorexia, v\u00f4mito, letargia, diarreia, colapso \u2014 risco de hipoadrenocorticismo iatrog\u00eanico (Plumb\'s, 10\u00aa ed.).',
  'Mitotano \u00e9 alternativa especializada, N\u00c3O primeira linha de rotina (Bugbee et al., 2023).',
  'Selegilina e cetoconazol N\u00c3O s\u00e3o tratamento de rotina atual (Bugbee et al., 2023).',
];

const GATOS_QUICK_STRIP = [
  'Cushing felino \u00e9 RARO \u2014 suspeitar em gato diab\u00e9tico dif\u00edcil + pele fr\u00e1gil (Miceli et al., 2022).',
  'PDH ~80\u201385%, ADH ~15\u201320% \u2014 semelhante ao c\u00e3o, mas apresenta\u00e7\u00e3o distinta (Miceli et al., 2022).',
  '~80% dos gatos com Cushing t\u00eam ou desenvolvem diabetes mellitus (Miceli et al., 2022).',
  'Fragilidade cut\u00e2nea (pele de papel) \u00e9 sinal cardinal \u2014 calcinosis cutis N\u00c3O \u00e9 t\u00edpica (Hardy et al.; Boland et al., 2017).',
  'ALP frequentemente NORMAL no gato \u2014 n\u00e3o h\u00e1 isoforma ester\u00f3ide como no c\u00e3o (Boland et al., 2017).',
  'USG urin\u00e1rio frequentemente >1,020 \u2014 diferente do c\u00e3o hiposten\u00faurico (Valentin et al., 2014).',
  'LDDST felino: 0,1 mg/kg IV \u2014 N\u00c3O usar dose canina 0,01 mg/kg (Valentin et al., 2014; Boland et al., 2017).',
  'ACTHST \u00e9 pobre triagem felina (~33\u201360% sensibilidade) \u2014 preferir LDDST (Valentin et al., 2014).',
  'Cosintropina 125 mcg/gato (n\u00e3o mg/kg) para ACTHST (Keith et al., 2013).',
  'Trilostano extra-label ~1 mg/kg q12h; coorte Miceli: m\u00e9dia 1,3 mg/kg inicial, 1,9 mg/kg final (Miceli et al., 2022).',
  'Monitorar insulina de perto \u2014 risco de hipoglicemia quando Cushing \u00e9 controlado (Miceli et al., 2022).',
  'Subdiagn\u00f3stico (subclinical CS) existe \u2014 nem todo hipercortisolismo exige tratamento imediato (Niessen et al., 2025).',
  'Tumores secretores de progesterona podem mimetizar Cushing \u2014 considerar em f\u00eamea intacta (Boland et al., 2017).',
  'Radioterapia hipofis\u00e1ria \u00e9 op\u00e7\u00e3o em macroadenoma (Yayoshi et al.).',
  'Pneumoperit\u00f4nio p\u00f3s-trilostano: relato Kelly 2026 \u2014 farmacovigil\u00e2ncia, causalidade N\u00c3O comprovada (Kelly et al., 2026).',
  'N\u00c3O aplicar algoritmo canino integralmente ao gato \u2014 ver ficha canina para compara\u00e7\u00e3o.',
];

function buildCaes() {
  return `import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * S\u00edndrome de Cushing canina \u2014 s\u00edntese editorial Vetius.
 * ALIVE 2025 > AAHA/Behrend 2022\u20132023 > Nelson & Couto.
 */
export const sindromeCushingCaesRecord: DiseaseRecord = {
  id: 'disease-sindrome-cushing-caes',
  slug: 'sindrome-cushing-caes',
  title: 'S\u00edndrome de Cushing \u2014 C\u00e3o',
  synonyms: [
    'Hiperadrenocorticismo',
    'HAC',
    'Hipercortisolismo',
    'PDH',
    'ADH',
    'Hyperadrenocorticism',
    'Cushingoid',
    'Doen\u00e7a de Cushing canina',
  ],
  species: ['dog'],
  category: 'endocrinologia',
  tags: [
    'Cortisol',
    'PDH',
    'ADH',
    'Trilostano',
    'LDDST',
    'ACTHST',
    'PU/PD',
    'ALIVE 2025',
    'AAHA 2023',
    'ALP',
    'Calcinose cutis',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-cushing-caes'],
  quickSummary:
    'S\u00edndrome de Cushing canina: exposi\u00e7\u00e3o cr\u00f4nica a cortisol em excesso por PDH (~80\u201385%), ADH (~15\u201320%), iatrog\u00eania, ACTH ect\u00f3pico ou receptores aberrantes. Diagn\u00f3stico exige \u22652 sinais cl\u00ednicos + teste confirmat\u00f3rio (LDDST 0,01 mg/kg IV em c\u00e3o est\u00e1vel; ACTHST se iatrog\u00eania). Tratamento m\u00e9dico de rotina: trilostano 1 mg/kg q12h ou 2 mg/kg q24h com alimento; cl\u00ednica guia ajuste. Mitotano \u00e9 alternativa especializada. Hipofisectomia (Tanaka et al., 2025) e adrenalectomia (van Bokhorst et al., 2023) em casos selecionados (Niessen et al., 2025; Bugbee et al., 2023).',
  quickDecisionStrip: [
${lines(CAES_QUICK_STRIP)}
  ],
  quickSummaryRich: {
    lead:
      'Excesso cr\u00f4nico de cortisol com apresenta\u00e7\u00e3o multissist\u00eamica. ALIVE padroniza terminologia: t\u00edtulo principal \u00e9 S\u00edndrome de Cushing; hiperadrenocorticismo \u00e9 sin\u00f4nimo de busca. O erro caro \u00e9 testar sem cl\u00ednica ou tratar sem diferenciar PDH, ADH e iatrog\u00eania.',
    leadHighlights: ['PDH', 'ADH', 'LDDST', 'trilostano', 'ALIVE'],
    pillars: [
      {
        title: 'Classifica\u00e7\u00e3o ALIVE',
        body:
          'PDH 80\u201385%, ADH 15\u201320%, iatrog\u00eanico, subdiagn\u00f3stico, ACTH ect\u00f3pico e receptores aberrantes. Evitar r\u00f3tulo \u201cHAC at\u00edpico\u201d \u2014 usar terminologia ALIVE (Niessen et al., 2025).',
        highlights: ['PDH', 'ADH', 'subdiagn\u00f3stico'],
      },
      {
        title: 'Triagem inteligente',
        body:
          'LDDST 0,01 mg/kg IV em c\u00e3o est\u00e1vel; UCCR para excluir; ACTHST se iatrog\u00eania; cortisol basal n\u00e3o tria (Bugbee et al., 2023; Behrend, VIN 2022).',
        highlights: ['LDDST', 'UCCR', 'ACTHST'],
      },
      {
        title: 'Tratamento guiado por cl\u00ednica',
        body:
          'Trilostano com alimento; monitorar 10\u201314 d, 30 d, 90 d e q3\u20136 mo; ACTHST 3\u20135 h p\u00f3s-dose s\u00f3 para monitoramento (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
        highlights: ['trilostano', 'cl\u00ednica', 'monitoramento'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo diagn\u00f3stico',
      steps: [
        {
          label: 'Confirmar indica\u00e7\u00e3o cl\u00ednica',
          timing: 'Primeira consulta',
          detail:
            '\u22652 sinais AAHA: PU/PD, polifagia, abd\u00f4men pendular, alopecia sim\u00e9trica, panting, fraqueza, pele fina, calcinose (8\u201315%) (Bugbee et al., 2023; Behrend, VIN 2022). ALP \u2260 triagem isolada.',
        },
        {
          label: 'Excluir iatrog\u00eania',
          timing: 'Antes de testar',
          detail:
            'Anamnese minuciosa: oral, t\u00f3pico, otol\u00f3gico, oft\u00e1lmico, injet\u00e1vel. Washout 2\u20134 semanas se poss\u00edvel. ACTHST confirma iatrog\u00eania quando cortisol p\u00f3s-ACTH suprimido (Behrend, VIN 2022).',
        },
        {
          label: 'Banco m\u00ednimo',
          detail:
            'Bioqu\u00edmica, urin\u00e1lise, hematologia; protein\u00fauria em >50% (Milenkovic et al., 2026); PAS se indicado. Investigar ITU subcl\u00ednica (ISCAID).',
        },
        {
          label: 'Triagem end\u00f3crina',
          detail:
            'C\u00e3o est\u00e1vel: LDDST 0,01 mg/kg IV, cortisol basal, 4 h e 8 h. UCCR domiciliar para EXCLUIR. ACTHST se comorbidade ou iatrog\u00eania (Bugbee et al., 2023).',
        },
        {
          label: 'Confirmar hipercortisolismo',
          detail:
            'LDDST: cortisol 8 h acima do ponto de corte confirma. ACTHST: resposta exagerada confirma espont\u00e2neo; supress\u00e3o + cl\u00ednica = iatrog\u00eanico (Behrend, VIN 2022).',
        },
        {
          label: 'Diferenciar PDH vs ADH',
          timing: 'P\u00f3s-confirma\u00e7\u00e3o',
          detail:
            'Supress\u00e3o parcial LDDST favorece PDH (~60%), mas ~35% PDH n\u00e3o suprimem. eACTH alto/normal = PDH; baixo = ADH. US: bilateral sim\u00e9trica vs unilateral + atr\u00f3fia contralateral. HDDST limitado (Bugbee et al., 2023).',
        },
        {
          label: 'Imagem e estadiamento',
          detail:
            'US abdominal adrenais; RM/TC hip\u00f3fise se macroadenoma/neurol\u00f3gico. Tamanho \u2260 malignidade (van Bokhorst et al., 2023).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Algoritmo terap\u00eautico',
      steps: [
        {
          label: 'Trilostano \u2014 dose inicial',
          dose: '1 mg/kg PO q12h OU 2 mg/kg PO q24h com alimento',
          duration: 'Reavaliar em 10\u201314 dias',
          detail:
            'Primeira linha m\u00e9dica na maioria dos PDH e ADH n\u00e3o oper\u00e1veis (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
        },
        {
          label: 'Ajuste por cl\u00ednica',
          reassess: 'PU/PD, apetite, panting, pele, infec\u00e7\u00f5es \u2014 Cushing Clinical Score ALIVE (0\u201315)',
          detail:
            'Sinais cl\u00ednicos s\u00e3o prim\u00e1rios para ajuste. N\u00c3O aumentar automaticamente aos 14 dias se cl\u00ednica j\u00e1 melhorou (BSAVA trilostane guidance; Macfarlane et al.).',
        },
        {
          label: 'Monitoramento laboratorial',
          timing: '10\u201314 d / 30 d / 90 d / q3\u20136 mo',
          detail:
            'ACTHST 1 mcg/kg IV, cortisol 3\u20135 h p\u00f3s-p\u00edlula \u2014 s\u00f3 monitoramento, n\u00e3o diagn\u00f3stico. Cortisol pr\u00e9-p\u00edlula auxiliar, n\u00e3o universal (Bugbee et al., 2023; Macfarlane et al.).',
        },
        {
          label: 'Red flags \u2014 suspender trilostano',
          detail:
            'Anorexia, v\u00f4mito, letargia, diarreia, colapso, hiponatremia \u2014 suspender e ACTHST urgente; risco hipoadrenocorticismo iatrog\u00eanico (Plumb\\'s, 10\u00aa ed.).',
        },
        {
          label: 'Alternativas cir\u00fargicas/especializadas',
          detail:
            'Adrenalectomia ADH oper\u00e1vel (van Bokhorst et al., 2023). Hipofisectomia PDH selecionado (Tanaka et al., 2025). Mitotano: alternativa experiente, n\u00e3o rotina. Selegilina/cetoconazol: n\u00e3o rotina (Bugbee et al., 2023).',
        },
        {
          label: 'Iatrog\u00eanico',
          detail:
            'Desmame gradual glicocorticoide; N\u00c3O trilostano de rotina. Suporte insufici\u00eancia adrenal relativa (Behrend, VIN 2022).',
        },
      ],
    },
  },
  etiology: {
    classificacaoALIVE: {
      kind: 'clinicalTable' as const,
      title: 'Classifica\u00e7\u00e3o ALIVE \u2014 formas de hiperadrenocorticismo canino',
      headers: ['Forma', 'Mecanismo', 'Frequ\u00eancia', 'Notas ALIVE'],
      rows: [
        ['PDH (hip\u00f3fise-dependente)', 'Adenoma hipofis\u00e1rio \u2192 ACTH \u2191 \u2192 cortisol', '~80\u201385% espont\u00e2neos', 'Termo preferido ALIVE; adrenais bilaterais hiperpl\u00e1sicas (Niessen et al., 2025)'],
        ['ADH (adrenal-dependente)', 'Tumor adrenal aut\u00f4nomo secreta cortisol', '~15\u201320% espont\u00e2neos', 'ACTH suprimido; adrenal unilateral aumentada (Niessen et al., 2025)'],
        ['Iatrog\u00eanico', 'Glicocorticoide ex\u00f3geno cr\u00f4nico', 'Vari\u00e1vel', 'Categoria aparte; desmame, n\u00e3o trilostano rotineiro (Behrend, VIN 2022)'],
        ['Subdiagn\u00f3stico', 'Hipercortisolismo bioqu\u00edmico sem sinais completos', 'Incerto', 'Termo ALIVE; nem todo caso exige tratamento imediato (Niessen et al., 2025)'],
        ['ACTH ect\u00f3pico', 'Secre\u00e7\u00e3o ACTH fora da hip\u00f3fise', 'Raro', 'Neoplasia n\u00e3o hipofis\u00e1ria; progn\u00f3stico reservado (Bugbee et al., 2023)'],
        ['Receptores aberrantes', 'Estimula\u00e7\u00e3o adrenal por horm\u00f4nios n\u00e3o-ACTH', 'Raro', 'Ex.: receptores de gonadotrofinas; investigar em casos at\u00edpicos (Niessen et al., 2025)'],
      ],
    },
    eixoHPA:
      'Eixo hipot\u00e1lamo\u2013hip\u00f3fise\u2013adrenal: CRH \u2192 ACTH \u2192 cortisol com retroalimenta\u00e7\u00e3o negativa. No Cushing, o freio falha \u2014 por tumor hipofis\u00e1rio (PDH), adrenal aut\u00f4nomo (ADH) ou supress\u00e3o iatrog\u00eanica do eixo (Cunningham, 6\u00aa ed.; Nelson & Couto, 6\u00aa ed.).',
  },
  epidemiology: {
    prevalencia:
      'Endocrinopatia comum em c\u00e3es de meia-idade a idosos (~7\u201312 anos). PDH predomina (~80\u201385%); ADH ~15\u201320% (Niessen et al., 2025; Bugbee et al., 2023).',
    racas:
      'PDH: Poodle miniatura, Dachshund, Boxer, Boston Terrier, Beagle citados. ADH: predile\u00e7\u00e3o relativa por c\u00e3es maiores; algumas s\u00e9ries citam f\u00eameas em ADH (Nelson & Couto, 6\u00aa ed.).',
    iatrogenico:
      'Propor\u00e7\u00e3o crescente conforme uso de glicocorticoides na popula\u00e7\u00e3o \u2014 incluir t\u00f3picos e otol\u00f3gicos na anamnese (Behrend, VIN 2022).',
  },
  pathogenesisTransmission: {
    transmissao: 'N\u00e3o contagioso. Cada caso reflete neoplasia end\u00f3crina ou exposi\u00e7\u00e3o a glicocorticoide (Niessen et al., 2025).',
    patogenesePDH: 'Adenoma hipofis\u00e1rio secreta ACTH \u2192 hiperplasia zona fasciculada \u2192 cortisol cr\u00f4nico elevado com feedback inadequado (Cunningham, 6\u00aa ed.).',
    patogeneseADH: 'Tumor adrenal aut\u00f4nomo \u2192 cortisol \u2191 \u2192 ACTH \u2193 \u2192 adrenal contralateral atr\u00f3fica (Nelson & Couto, 6\u00aa ed.).',
    mucoceleAssociacao:
      'Associa\u00e7\u00e3o estat\u00edstica ves\u00edcula biliar/mucocele em Cushing \u2014 N\u00c3O causal comprovada; monitorar ultrassom (Bugbee et al., 2023).',
  },
  pathophysiology: {
    metabolismo:
      'Cortisol cr\u00f4nico \u2192 catabolismo proteico (fraqueza, atrofia muscular, abd\u00f4men pendular), resist\u00eancia insul\u00ednica, hiperlipidemia, hepatomegalia vacuolar (Cunningham, 6\u00aa ed.).',
    renal:
      'Reduz sensibilidade a ADH \u2192 poli\u00fauria/polidipsia; USG frequentemente <1,020 no c\u00e3o (Nelson & Couto, 6\u00aa ed.).',
    dermatologico:
      'Pele fina, alopecia sim\u00e9trica, comed\u00f5es, calcinosis cutis 8\u201315%, falha crescimento p\u00f3s-tosa. ALP ester\u00f3ide (isoforma induzida) em 85\u201395% (Bugbee et al., 2023).',
    renalProteinuria:
      'Protein\u00faria presente em >50% dos c\u00e3es; monitorar UPC \u2014 Milenkovic et al. (2026) descrevem impacto progn\u00f3stico. Clopidogrel N\u00c3O \u00e9 recomendado universalmente (Milenkovic et al., 2026).',
    coagulacao:
      'Hipercoagulabilidade relativa descrita; tromboembolismo poss\u00edvel. Associa\u00e7\u00e3o mucocele biliar \u2014 vigil\u00e2ncia, n\u00e3o causalidade (Bugbee et al., 2023).',
    tabelaLDDST: {
      kind: 'clinicalTable' as const,
      title: 'Interpreta\u00e7\u00e3o LDDST (0,01 mg/kg IV dexametasona)',
      headers: ['Resultado', 'Interpreta\u00e7\u00e3o', 'Pr\u00f3ximo passo'],
      rows: [
        ['Cortisol 8 h acima do corte', 'Confirma hiperadrenocorticismo', 'Diferenciar PDH vs ADH (eACTH, US, HDDST)'],
        ['Supress\u00e3o parcial 4 h ou 8 h', 'Favorece PDH (~60%)', 'Confirmar com eACTH/US; ~35% PDH n\u00e3o suprimem'],
        ['Sem supress\u00e3o', 'PDH ou ADH', 'eACTH + ultrassom abdominal (Behrend, VIN 2022)'],
        ['Normal', 'Exclui na maioria', 'Repetir se cl\u00ednica persistente; considerar UCCR'],
      ],
    },
    tabelaACTHST: {
      kind: 'clinicalTable' as const,
      title: 'Interpreta\u00e7\u00e3o ACTHST (5 \u00b5g/kg IV, m\u00e1x. 250 \u00b5g)',
      headers: ['Contexto', 'Cortisol p\u00f3s-ACTH', 'Interpreta\u00e7\u00e3o'],
      rows: [
        ['Triagem espont\u00e2neo', 'Exagerado/acima corte', 'Confirma hiperadrenocorticismo (sensibilidade ~85% PDH)'],
        ['Triagem espont\u00e2neo', 'Normal', 'Falso-negativo poss\u00edvel at\u00e9 ~41% ADH \u2014 considerar LDDST (Bugbee et al., 2023)'],
        ['Suspeita iatrog\u00eania', 'Suprimido/baixo + cl\u00ednica', 'Confirma iatrog\u00eanico (padr\u00e3o-ouro)'],
        ['Monitoramento trilostano', '3\u20135 h p\u00f3s-p\u00edlula, 1 mcg/kg', 'Auxiliar ajuste \u2014 N\u00c3O diagn\u00f3stico inicial (Bugbee et al., 2023)'],
      ],
    },
    tabelaCushingClinicalScore: {
      kind: 'clinicalTable' as const,
      title: 'Cushing Clinical Score (ALIVE) \u2014 5 dom\u00ednios, 0\u20133 cada, total 0\u201315',
      headers: ['Dom\u00ednio', '0', '1', '2', '3'],
      rows: [
        ['PU/PD', 'Ausente', 'Leve', 'Moderado', 'Marcado'],
        ['Pele/pelagem', 'Normal', 'Alopecia leve', 'Alopecia moderada + pele fina', 'Calcinose/francamente alterada'],
        ['Abd\u00f4men/musculatura', 'Normal', 'Leve pendular', 'Moderado pendular/fraqueza', 'Atrofia marcada'],
        ['Apetite/panting', 'Normal', 'Polifagia ou panting ocasional', 'Polifagia + panting frequente', 'Polifagia extrema + panting constante'],
        ['Complica\u00e7\u00f5es', 'Nenhuma', 'ITU/piodermite leve', 'Protein\u00fauria/DM secund\u00e1rio', 'Tromboembolismo/crise'],
      ],
    },
  },
  clinicalSignsPathophysiology: [
    {
      system: 'renal',
      findings: [{
        finding: 'Poli\u00fauria e polidipsia',
        mechanism: 'Cortisol antagoniza ADH renal \u2192 incapacidade de concentrar urina.',
        clinicalMeaning: 'USG <1,020 frequente; investigar ITU concomitante (ISCAID).',
        priority: 'common',
      }],
    },
    {
      system: 'metabolic',
      findings: [{
        finding: 'Polifagia e resist\u00eancia insul\u00ednica',
        mechanism: 'Cortisol aumenta gliconeog\u00eanese e antagoniza insulina.',
        clinicalMeaning: 'Diabetes secund\u00e1rio poss\u00edvel; investigar comorbidades (Bugbee et al., 2023).',
        priority: 'common',
      }],
    },
    {
      system: 'dermatologic',
      findings: [
        {
          finding: 'Alopecia sim\u00e9trica, pele fina, comed\u00f5es',
          mechanism: 'Catabolismo de col\u00e1geno e tel\u00f3geno prolongado.',
          clinicalMeaning: 'Falha p\u00f3s-tosa refor\u00e7a suspeita end\u00f3crina.',
          priority: 'common',
        },
        {
          finding: 'Calcinosis cutis (8\u201315%)',
          mechanism: 'Mineraliza\u00e7\u00e3o cut\u00e2nea por altera\u00e7\u00e3o do metabolismo do c\u00e1lcio.',
          clinicalMeaning: 'Quase exclusiva do c\u00e3o; rara no gato (Niessen et al., 2025).',
          priority: 'common',
        },
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [{
        finding: 'Abd\u00f4men pendular, fraqueza, panting',
        mechanism: 'Catabolismo muscular + redistribui\u00e7\u00e3o adiposa abdominal.',
        clinicalMeaning: 'Tr\u00edade cl\u00e1ssica com PU/PD e alopecia.',
        priority: 'common',
      }],
    },
    {
      system: 'hepatic',
      findings: [{
        finding: 'ALP marcadamente elevada (isoforma ester\u00f3ide)',
        mechanism: 'Indu\u00e7\u00e3o enzim\u00e1tica hep\u00e1tica por cortisol cr\u00f4nico.',
        clinicalMeaning: 'ALP \u2260 diagn\u00f3stico isolado \u2014 requer cl\u00ednica (Bugbee et al., 2023).',
        priority: 'common',
      }],
    },
    {
      system: 'renal',
      findings: [{
        finding: 'Protein\u00faria',
        mechanism: 'Glomerulopatia por hipercortisolismo cr\u00f4nico.',
        clinicalMeaning: 'UPC seriado; clopidogrel N\u00c3O universal (Milenkovic et al., 2026).',
        priority: 'systemic',
      }],
    },
    {
      system: 'neurologic',
      findings: [{
        finding: 'Sinais neurol\u00f3gicos (macrotumor)',
        mechanism: 'Compress\u00e3o do par\u00eanquima hipofis\u00e1rio por macroadenoma.',
        clinicalMeaning: 'Indica RM/TC hip\u00f3fise; discutir RT ou hipofisectomia (Tanaka et al., 2025).',
        priority: 'emergency',
      }],
    },
  ],
  diagnosis: {
    abordagem:
      'Integrar hist\u00f3ria (\u22652 sinais), exame f\u00edsico e banco m\u00ednimo antes de testes end\u00f3crinos. N\u00e3o testar por ALP isolada (Bugbee et al., 2023; Behrend, VIN 2022).',
    tabelaLDDST: {
      kind: 'clinicalTable' as const,
      title: 'LDDST \u2014 protocolo e interpreta\u00e7\u00e3o',
      headers: ['Etapa', 'Detalhe'],
      rows: [
        ['Dose', 'Dexametasona 0,01 mg/kg IV (c\u00e3o)'],
        ['Colheitas', 'Cortisol basal, 4 h e 8 h p\u00f3s-dose'],
        ['Positivo', 'Cortisol 8 h acima do ponto de corte laboratorial'],
        ['Supress\u00e3o parcial', 'Favorece PDH; ~35% PDH n\u00e3o suprimem (Behrend, VIN 2022)'],
        ['Limita\u00e7\u00e3o', 'Especificidade ~50%; doen\u00e7a n\u00e3o-adrenal e estresse interferem'],
      ],
    },
    tabelaACTHST: {
      kind: 'clinicalTable' as const,
      title: 'ACTHST \u2014 triagem e monitoramento',
      headers: ['Uso', 'Protocolo', 'Interpreta\u00e7\u00e3o'],
      rows: [
        ['Iatrog\u00eania', '5 \u00b5g/kg IV cosintropina; cortisol 60 min', 'P\u00f3s-ACTH suprimido = iatrog\u00eanico (padr\u00e3o-ouro)'],
        ['Triagem espont\u00e2neo', 'Idem', 'Resposta exagerada confirma; FN at\u00e9 41% ADH'],
        ['Monitoramento trilostano', '1 mcg/kg IV; cortisol 3\u20135 h p\u00f3s-p\u00edlula', 'Auxiliar ajuste \u2014 N\u00c3O diagn\u00f3stico (Bugbee et al., 2023)'],
      ],
    },
    tabelaEACTH: {
      kind: 'clinicalTable' as const,
      title: 'ACTH end\u00f3geno (eACTH)',
      headers: ['Resultado', 'Interpreta\u00e7\u00e3o'],
      rows: [
        ['Normal ou elevado', 'PDH'],
        ['Baixo/indetect\u00e1vel', 'ADH'],
        ['Pr\u00e9-anal\u00edtico', 'Tubo EDTA resfriado; centrifugar e congelar imediatamente (Bugbee et al., 2023)'],
      ],
    },
    tabelaHDDST: {
      kind: 'clinicalTable' as const,
      title: 'HDDST \u2014 limites pr\u00e1ticos',
      headers: ['Aspecto', 'Detalhe'],
      rows: [
        ['Dose', '0,1 mg/kg IV dexametasona'],
        ['Utilidade', 'Discriminar PDH vs ADH quando LDDST n\u00e3o suprime'],
        ['Limita\u00e7\u00e3o', 'Menos usado atualmente; ~25\u201330% PDH resistentes \u00e0 supress\u00e3o (Behrend, VIN 2022)'],
        ['Alternativa', 'eACTH + ultrassom abdominal preferidos (Bugbee et al., 2023)'],
      ],
    },
    imagem:
      'Ultrassom: adrenais bilaterais sim\u00e9tricas (PDH) vs unilateral + contralateral pequena (ADH). Tamanho da massa \u2260 malignidade \u2014 carcinoma pode ser pequeno (van Bokhorst et al., 2023). RM/TC hip\u00f3fise se macroadenoma ou neurol\u00f3gico.',
    washout:
      'Suspender glicocorticoide ex\u00f3geno 2\u20134 semanas antes de testar espont\u00e2neo quando seguro clinicamente (Behrend, VIN 2022).',
  },
  treatment: {
    trilostano: {
      dose: '1 mg/kg PO q12h OU 2 mg/kg PO q24h COM alimento (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
      ajuste: 'Sinais cl\u00ednicos prim\u00e1rios; Cushing Clinical Score ALIVE (0\u201315). N\u00c3O auto-aumentar aos 14 dias se cl\u00ednica OK (Macfarlane et al.; BSAVA trilostane guidance).',
      monitoramento: [
        '10\u201314 dias ap\u00f3s in\u00edcio/ajuste',
        '30 dias, 90 dias, depois q3\u20136 meses',
        'ACTHST 1 mcg/kg IV, cortisol 3\u20135 h p\u00f3s-p\u00edlula',
        'Cortisol pr\u00e9-p\u00edlula: auxiliar, n\u00e3o universal (Macfarlane et al.)',
        'Eletr\u00f3litos, bioqu\u00edmica, urin\u00e1lise seriados',
      ],
      redFlags: 'Anorexia, v\u00f4mito, letargia, diarreia, colapso \u2192 suspender trilostano imediatamente (Plumb\\'s, 10\u00aa ed.).',
    },
    mitotano:
      'Alternativa especializada, N\u00c3O rotina. Adrenocorticol\u00edtico \u2014 indu\u00e7\u00e3o ~50 mg/kg/dia dividido q12h com alimento; manuten\u00e7\u00e3o semanal. Exige experi\u00eancia e monitoramento intensivo (Bugbee et al., 2023; Plumb\\'s, 10\u00aa ed.).',
    selegilinaCetoconazol:
      'Selegilina e cetoconazol N\u00c3O s\u00e3o tratamento de rotina atual \u2014 efic\u00e1cia imprevis\u00edvel e efeitos adversos (Bugbee et al., 2023).',
    cirurgia: {
      adrenalectomia:
        'ADH unilateral oper\u00e1vel \u2014 primeira linha quando equipe preparada. Perioperat\u00f3rio: hipertens\u00e3o, hipocalemia (van Bokhorst et al., 2023).',
      hipofisectomia:
        'PDH selecionado em centro especializado; evid\u00eancia crescente (Tanaka et al., 2025). Frequentemente ainda requer trilostano transit\u00f3rio.',
      radioterapia:
        'Macroadenoma com sinais neurol\u00f3gicos \u2014 prolonga sobrevida; trilostano paralelo para controle sist\u00eamico (Bugbee et al., 2023).',
    },
    iatrogenico:
      'Desmame gradual glicocorticoide; suporte insufici\u00eancia adrenal relativa. N\u00c3O trilostano de rotina (Behrend, VIN 2022).',
    metaAnalise2025:
      'Meta-an\u00e1lise 2025 (Hanson/Meij) confirma trilostano como base terap\u00eautica com perfil favor\u00e1vel vs mitotano na maioria dos cen\u00e1rios.',
  },
  prevention: {
    deteccaoPrecoce:
      'N\u00e3o banalizar PU/PD, panting cr\u00f4nico e alopecia sim\u00e9trica em c\u00e3os de meia-idade. Forma espont\u00e2nea n\u00e3o tem profilaxia; iatrog\u00eania: menor dose eficaz e menor tempo de glicocorticoide (Bugbee et al., 2023).',
    errosComuns: [
      'ALP elevada = Cushing confirmado.',
      'Testar sem \u22652 sinais cl\u00ednicos compat\u00edveis.',
      'Usar cortisol basal como triagem.',
      'UCCR elevado = diagn\u00f3stico confirmado (UCCR exclui, n\u00e3o confirma).',
      'Confundir iatrog\u00eanico com espont\u00e2neo sem washout/anamnese.',
      'Aus\u00eancia de supress\u00e3o LDDST = ADH automaticamente (~35% PDH n\u00e3o suprimem).',
      'ACTHST normal exclui ADH (FN at\u00e9 41%).',
      'Assumir malignidade adrenal pelo tamanho da massa.',
      'Iniciar trilostano antes de diferenciar PDH/ADH/iatrog\u00eanico.',
      'Aumentar trilostano automaticamente aos 14 dias sem avaliar cl\u00ednica.',
      'Usar ACTHST diagn\u00f3stico como monitoramento ou vice-versa.',
      'Mitotano como primeira linha de rotina.',
      'Prescrever selegilina/cetoconazol como padr\u00e3o.',
      'Clopidogrel universal em todo Cushing protein\u00faurico (Milenkovic et al., 2026).',
      'Ignorar red flags de hipocortisolismo medicamentoso.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'sindrome-cushing-gatos',
    'diabetes-mellitus-canina',
    'hipoadrenocorticismo-addison',
    'hipertensao-arterial-sistemica-caes-gatos',
  ],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
${[
  ref('ref-cush-alive-2025', "Niessen SJM et al. ALIVE: Cushing's Syndrome and Hypoadrenocorticism. Vet Sci. 2025;12:761.", 'Consenso ALIVE', 'A \u2014 terminologia'),
  ref('ref-cush-behrend-vin-2022', 'Behrend EN. Diagnosis of canine hyperadrenocorticism (VIN, 2022).', 'Revis\u00e3o cl\u00ednica VIN', 'A \u2014 diagn\u00f3stico'),
  ref('ref-cush-bugbee-aaha-2023', 'Bugbee A et al. 2023 AAHA Selected Endocrinopathies Guidelines. JAAHA. 2023;59.', 'Diretriz AAHA', 'A', 'https://doi.org/10.5326/JAAHA-MS-7297'),
  ref('ref-cush-nelson-2020', 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 50.', 'Livro-texto', 'Refer\u00eancia cl\u00ednica'),
  ref('ref-cush-cunningham-2020', "Klein BG. Cunningham's Textbook of Veterinary Physiology. 6th ed. 2020.", 'Fisiologia', 'Base fisiol\u00f3gica'),
  ref('ref-cush-milenkovic-2026', 'Milenkovic D et al. Proteinuria in canine hyperadrenocorticism. J Vet Intern Med. 2026.', 'Estudo cl\u00ednico', 'B'),
  ref('ref-cush-iscaid', 'ISCAID guidelines \u2014 urinary tract infections in companion animals.', 'Diretriz ISCAID', 'B'),
  ref('ref-cush-vanbokhorst-2023', 'van Bokhorst R et al. Adrenalectomy outcomes in dogs with adrenal-dependent HAC. J Vet Intern Med. 2023.', 'Estudo cl\u00ednico', 'B'),
  ref('ref-cush-bsava-trilostane', 'BSAVA Manual \u2014 trilostane monitoring guidance.', 'Manual BSAVA', 'Refer\u00eancia pr\u00e1tica'),
  ref('ref-cush-plumb-2023', "Plumb's Veterinary Drug Handbook. 10th ed. 2023. Trilostane, Mitotane.", 'Formul\u00e1rio', 'Refer\u00eancia farmacol\u00f3gica'),
  ref('ref-cush-macfarlane', 'Macfarlane L et al. Pre-pill cortisol monitoring in trilostane-treated dogs.', 'Estudo cl\u00ednico', 'B'),
  ref('ref-cush-meta-2025', 'Hanson/Meij meta-analysis 2025 \u2014 trilostane vs mitotane in canine HAC.', 'Meta-an\u00e1lise', 'A'),
  ref('ref-cush-tanaka-2025', 'Tanaka H et al. Transsphenoidal hypophysectomy outcomes in canine PDH. 2025.', 'Estudo cl\u00ednico', 'B'),
  ref('ref-cush-garcia-2022', 'Garc\u00eda San Jos\u00e9 C et al. Monitoring trilostane-treated dogs. J Vet Intern Med. 2022.', 'Estudo cl\u00ednico', 'B'),
].join('\n')}
  ],
  isPublished: true,
  source: 'seed',
};
`;
}

function buildGatos() {
  return `import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * S\u00edndrome de Cushing felina \u2014 s\u00edntese editorial Vetius.
 * Miceli 2022 > Boland 2017 > ALIVE 2025 > Nelson & Couto.
 */
export const sindromeCushingGatosRecord: DiseaseRecord = {
  id: 'disease-sindrome-cushing-gatos',
  slug: 'sindrome-cushing-gatos',
  title: 'S\u00edndrome de Cushing \u2014 Gato',
  synonyms: [
    'Hiperadrenocorticismo felino',
    'HAC felino',
    'Hipercortisolismo felino',
    'PDH felino',
    'ADH felino',
    'Feline hyperadrenocorticism',
    'Cushing felino',
  ],
  species: ['cat'],
  category: 'endocrinologia',
  tags: [
    'Cortisol',
    'PDH',
    'ADH',
    'Trilostano',
    'LDDST',
    'Diabetes felino',
    'Pele fr\u00e1gil',
    'ALIVE 2025',
    'Miceli 2022',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-cushing-gatos'],
  quickSummary:
    'S\u00edndrome de Cushing felina: doen\u00e7a RARA com PDH ~80\u201385% e ADH ~15\u201320%. ~80% dos gatos t\u00eam ou desenvolvem diabetes mellitus (Miceli et al., 2022). Fragilidade cut\u00e2nea \u00e9 cardinal; calcinosis cutis N\u00c3O \u00e9 t\u00edpica. ALP frequentemente normal; USG >1,020 comum. LDDST 0,1 mg/kg IV (N\u00c3O dose canina). Trilostano extra-label ~1 mg/kg q12h; monitorar insulina (risco hipoglicemia). Comparar com ficha canina (Hardy et al.; Boland et al., 2017; Miceli et al., 2022).',
  quickDecisionStrip: [
${lines(GATOS_QUICK_STRIP)}
  ],
  quickSummaryRich: {
    lead:
      'Cushing no gato \u00e9 exce\u00e7\u00e3o end\u00f3crina, n\u00e3o miniatura do c\u00e3o. Tr\u00edade: diabetes dif\u00edcil + pele de papel + caquexia. ALIVE usa S\u00edndrome de Cushing como t\u00edtulo principal; hiperadrenocorticismo \u00e9 sin\u00f4nimo de busca.',
    leadHighlights: ['raro', 'DM', 'pele fr\u00e1gil', 'LDDST 0,1 mg/kg'],
    pillars: [
      {
        title: 'Epidemiologia felina',
        body:
          'PDH 80\u201385%, ADH 15\u201320%; DM ~80% (Miceli et al., 2022). Idade m\u00e9dia >10 anos; sem predile\u00e7\u00e3o racial forte.',
        highlights: ['PDH', 'DM 80%'],
      },
      {
        title: 'Diferen\u00e7as vs c\u00e3o',
        body:
          'Pele fr\u00e1gil sim; calcinosis N\u00c3O; ALP normal; USG >1,020; LDDST 0,1 mg/kg; ACTHST pobre triagem (Boland et al., 2017).',
        highlights: ['pele fr\u00e1gil', 'ALP normal'],
      },
      {
        title: 'Tratamento extra-label',
        body:
          'Trilostano ~1 mg/kg q12h; coorte Miceli: 1,3 mg/kg inicial, 1,9 mg/kg final. Vigiar hipoglicemia ao controlar Cushing (Miceli et al., 2022).',
        highlights: ['trilostano', 'hipoglicemia'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo diagn\u00f3stico felino',
      steps: [
        {
          label: 'Suspeita cl\u00ednica',
          timing: 'Primeira consulta',
          detail:
            'Gato diab\u00e9tico insulinorresistente + pele extremamente fr\u00e1gil + caquexia/m\u00e1 cicatriza\u00e7\u00e3o (Hardy et al.; Boland et al., 2017).',
        },
        {
          label: 'Excluir mimics',
          detail:
            'Tumor secretor de progesterona em f\u00eamea intacta; iatrog\u00eania por glicocorticoide t\u00f3pico/sist\u00eamico (Boland et al., 2017).',
        },
        {
          label: 'Banco m\u00ednimo',
          detail:
            'Glicemia, frutosamina, bioqu\u00edmica (ALP frequentemente normal), urin\u00e1lise (USG >1,020 comum), UPC se indicado.',
        },
        {
          label: 'Triagem end\u00f3crina',
          detail:
            'LDDST 0,1 mg/kg IV dexametasona \u2014 N\u00c3O 0,01 mg/kg canina (Valentin et al., 2014). ACTHST: sensibilidade ~33\u201360% \u2014 pobre triagem.',
        },
        {
          label: 'Confirmar e diferenciar',
          detail:
            'eACTH + ultrassom abdominal (PDH bilateral vs ADH unilateral). Subdiagn\u00f3stico: hipercortisolismo bioqu\u00edmico sem sinais completos \u2014 nem todo caso exige tratamento (Niessen et al., 2025).',
        },
        {
          label: 'Imagem hipofis\u00e1ria selecionada',
          detail:
            'Macroadenoma: radioterapia hipofis\u00e1ria \u00e9 op\u00e7\u00e3o (Yayoshi et al.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Algoritmo terap\u00eautico felino',
      steps: [
        {
          label: 'Trilostano extra-label',
          dose: '~1 mg/kg PO q12h inicial (Miceli: m\u00e9dia 1,3 mg/kg \u2192 1,9 mg/kg final)',
          duration: 'Reavaliar 10\u201314 dias',
          detail:
            'Extra-label; melhora cl\u00ednica e controle glic\u00eamico em parte dos casos (Miceli et al., 2022; Keith et al., 2013).',
        },
        {
          label: 'Ajuste insulina',
          reassess: 'Reduzir insulina conforme glicemia \u2014 risco hipoglicemia ao controlar Cushing',
          detail:
            'Monitoramento domiciliar de glicemia; curvas/CGM quando dispon\u00edvel (Miceli et al., 2022).',
        },
        {
          label: 'Manejo pele fr\u00e1gil',
          detail:
            'Minimizar manipula\u00e7\u00e3o, evitar pun\u00e7\u00f5es desnecess\u00e1rias, proteger ambiente dom\u00e9stico (Hardy et al.).',
        },
        {
          label: 'Alternativas',
          detail:
            'Adrenalectomia unilateral ADH; radioterapia macroadenoma (Yayoshi et al.); hipofisectomia em centro especializado.',
        },
        {
          label: 'Farmacovigil\u00e2ncia',
          detail:
            'Kelly et al. (2026): pneumoperit\u00f4nio p\u00f3s-trilostano relatado \u2014 causalidade N\u00c3O comprovada; informar tutor.',
        },
      ],
    },
  },
  etiology: {
    classificacao:
      'PDH ~80\u201385% (adenoma hipofis\u00e1rio); ADH ~15\u201320% (tumor adrenal aut\u00f4nomo). Iatrog\u00eanico por glicocorticoide t\u00f3pico/sist\u00eamico. Subdiagn\u00f3stico (ALIVE). Tumores secretores de progesterona mimics em f\u00eameas intactas (Niessen et al., 2025; Boland et al., 2017).',
    progesterona:
      'Tumor ovariano/progesterona pode induzir hipercortisolismo funcional \u2014 ovariohisterectomia pode resolver (Boland et al., 2017).',
  },
  epidemiology: {
    raridade:
      'Muito menos frequente que no c\u00e3o. Idade m\u00e9dia >10 anos; sem predile\u00e7\u00e3o racial definida (Miceli et al., 2022).',
    diabetes:
      '~80% dos gatos com Cushing t\u00eam ou desenvolvem diabetes mellitus \u2014 remodela apresenta\u00e7\u00e3o e conduta (Miceli et al., 2022).',
    distribuicao:
      'PDH 80\u201385%, ADH 15\u201320% \u2014 propor\u00e7\u00e3o semelhante ao c\u00e3o, mas apresenta\u00e7\u00e3o cl\u00ednica distinta (Miceli et al., 2022).',
  },
  pathogenesisTransmission: {
    transmissao: 'N\u00e3o contagioso. Neoplasia end\u00f3crina ou iatrog\u00eania (Niessen et al., 2025).',
    peleFragil:
      'Cortisol cr\u00f4nico \u2192 catabolismo col\u00e1geno d\u00e9rmico acentuado \u2192 pele de papel, equimoses, m\u00e1 cicatriza\u00e7\u00e3o (Hardy et al.; Boland et al., 2017).',
    subdiagnostico:
      'Hipercortisolismo documentado com sinais incompletos \u2014 ALIVE reconhece subdiagn\u00f3stico; conduta individualizada (Niessen et al., 2025).',
  },
  pathophysiology: {
    tabelaComparacaoCaoGato: {
      kind: 'clinicalTable' as const,
      title: 'Compara\u00e7\u00e3o c\u00e3o vs gato \u2014 S\u00edndrome de Cushing',
      headers: ['Aspecto', 'C\u00e3o', 'Gato'],
      rows: [
        ['Frequ\u00eancia', 'Relativamente comum', 'Raro (Miceli et al., 2022)'],
        ['PDH / ADH', '80\u201385% / 15\u201320%', '80\u201385% / 15\u201320%'],
        ['Diabetes mellitus', 'Poss\u00edvel', '~80% dos casos (Miceli et al., 2022)'],
        ['Calcinosis cutis', '8\u201315%', 'N\u00c3O t\u00edpica (Boland et al., 2017)'],
        ['Fragilidade cut\u00e2nea', 'Menos marcante', 'Cardinal (Hardy et al.)'],
        ['ALP', '85\u201395% elevada (isoforma ester\u00f3ide)', 'Frequentemente normal (Boland et al., 2017)'],
        ['USG urin\u00e1rio', 'Frequentemente <1,020', 'Frequentemente >1,020 (Valentin et al., 2014)'],
        ['LDDST dose', '0,01 mg/kg IV', '0,1 mg/kg IV (Valentin et al., 2014)'],
        ['ACTHST triagem', 'Sensibilidade ~85% PDH', 'Sensibilidade ~33\u201360% (Valentin et al., 2014)'],
        ['Cosintropina', '5 \u00b5g/kg IV (m\u00e1x. 250 \u00b5g)', '125 mcg/gato (Keith et al., 2013)'],
        ['Trilostano', '1 mg/kg q12h ou 2 mg/kg q24h', 'Extra-label ~1 mg/kg q12h (Miceli et al., 2022)'],
      ],
    },
    diabetes:
      'Resist\u00eancia insul\u00ednica por cortisol cr\u00f4nico \u2192 diabetes dif\u00edcil de controlar apesar de doses elevadas de insulina (Miceli et al., 2022).',
    dermatologico:
      'Pele extremamente fina, equimoses espont\u00e2neas, m\u00e1 cicatriza\u00e7\u00e3o. Calcinosis cutis N\u00c3O \u00e9 manifesta\u00e7\u00e3o t\u00edpica felina (Boland et al., 2017).',
    hepatico:
      'ALP frequentemente normal \u2014 gato n\u00e3o induz isoforma ester\u00f3ide como c\u00e3o (Boland et al., 2017).',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'dermatologic',
      findings: [{
        finding: 'Fragilidade cut\u00e2nea extrema (pele de papel)',
        mechanism: 'Catabolismo acentuado de col\u00e1geno d\u00e9rmico e capilares fr\u00e1geis.',
        clinicalMeaning: 'Sinal cardinal; calcinosis N\u00c3O t\u00edpica (Hardy et al.; Boland et al., 2017).',
        priority: 'common',
      }],
    },
    {
      system: 'metabolic',
      findings: [{
        finding: 'Diabetes mellitus insulinorresistente',
        mechanism: 'Cortisol antagoniza insulina perif\u00e9rica.',
        clinicalMeaning: '~80% dos casos; tratar Cushing pode reduzir necessidade de insulina (Miceli et al., 2022).',
        priority: 'common',
      }],
    },
    {
      system: 'general',
      findings: [{
        finding: 'Caquexia / emagrecimento',
        mechanism: 'Catabolismo proteico cr\u00f4nico apesar de polifagia poss\u00edvel.',
        clinicalMeaning: 'Contraste com obesidade abdominal canina.',
        priority: 'common',
      }],
    },
    {
      system: 'renal',
      findings: [{
        finding: 'USG frequentemente >1,020',
        mechanism: 'Menor impacto na concentra\u00e7\u00e3o urin\u00e1ria que no c\u00e3o.',
        clinicalMeaning: 'PU/PD pode existir sem hiposten\u00fauria marcada (Valentin et al., 2014).',
        priority: 'common',
      }],
    },
    {
      system: 'hepatic',
      findings: [{
        finding: 'ALP normal ou discretamente elevada',
        mechanism: 'Aus\u00eancia de isoforma ALP ester\u00f3ide induzida.',
        clinicalMeaning: 'ALP normal N\u00c3O exclui Cushing felino (Boland et al., 2017).',
        priority: 'common',
      }],
    },
    {
      system: 'neurologic',
      findings: [{
        finding: 'Sinais neurol\u00f3gicos (macroadenoma)',
        mechanism: 'Compress\u00e3o hipofis\u00e1ria.',
        clinicalMeaning: 'Discutir radioterapia (Yayoshi et al.).',
        priority: 'emergency',
      }],
    },
  ],
  diagnosis: {
    abordagem:
      'Suspeitar em gato diab\u00e9tico dif\u00edcil + pele fr\u00e1gil. LDDST 0,1 mg/kg IV \u00e9 preferencial; ACTHST \u00e9 pobre triagem (Valentin et al., 2014; Boland et al., 2017).',
    tabelaLDDST: {
      kind: 'clinicalTable' as const,
      title: 'LDDST felino \u2014 0,1 mg/kg IV (NAO dose canina)',
      headers: ['Etapa', 'Detalhe'],
      rows: [
        ['Dose', 'Dexametasona 0,1 mg/kg IV'],
        ['Colheitas', 'Cortisol basal, 4 h e 8 h'],
        ['Interpretacao', 'Cortisol 8 h acima do corte confirma'],
        ['Nota', 'Dose canina 0,01 mg/kg e inadequada no gato (Valentin et al., 2014)'],
      ],
    },
    tabelaACTHST: {
      kind: 'clinicalTable' as const,
      title: 'ACTHST felino \u2014 limitacoes',
      headers: ['Aspecto', 'Detalhe'],
      rows: [
        ['Dose cosintropina', '125 mcg/gato IV/IM (Keith et al., 2013)'],
        ['Sensibilidade triagem', '~33\u201360% \u2014 pobre triagem (Valentin et al., 2014)'],
        ['Uso principal', 'Monitoramento trilostano; iatrogenia'],
        ['NAO usar', 'Como unico teste de triagem quando LDDST disponivel'],
      ],
    },
    subdiagnostico:
      'Subdiagnostico ALIVE: hipercortisolismo bioquimico sem sinais completos. Nem todo caso exige tratamento imediato \u2014 individualizar (Niessen et al., 2025).',
    progesterona:
      'Femea intacta: considerar tumor secretor de progesterona antes de rotular Cushing (Boland et al., 2017).',
  },
  treatment: {
    trilostano: {
      dose: 'Extra-label ~1 mg/kg PO q12h inicial (Miceli et al., 2022; Keith et al., 2013).',
      coorteMiceli: 'Media 1,3 mg/kg dose inicial, 1,9 mg/kg dose final na coorte Miceli 2022.',
      monitoramento: [
        'Clinica + glicemia seriada (risco hipoglicemia)',
        'ACTHST 125 mcg/gato para monitoramento',
        'Ajustar insulina conforme controle do Cushing',
        '10\u201314 dias apos inicio/ajuste',
      ],
    },
    diabetes:
      'Reduzir insulina proativamente quando glicemia cai apos controle do Cushing. Monitoramento domiciliar essencial (Miceli et al., 2022).',
    peleFragil:
      'Minimizar trauma; proteger ambiente; evitar cateteres e punções repetidas quando possivel (Hardy et al.).',
    radioterapia:
      'Macroadenoma hipofisario: radioterapia e opcao (Yayoshi et al.).',
    adrenalectomia:
      'ADH unilateral operavel em centro especializado.',
    farmacovigilancia:
      'Kelly et al. (2026): pneumoperitoneo pos-trilostano relatado \u2014 farmacovigilancia, causalidade NAO comprovada.',
  },
  prevention: {
    deteccaoPrecoce:
      'Gato diab\u00e9tico insulinorresistente: investigar Cushing antes de escalar insulina indefinidamente (Miceli et al., 2022).',
    errosComuns: [
      'Aplicar algoritmo canino integralmente (LDDST 0,01 mg/kg, ACTHST como triagem).',
      'ALP normal exclui Cushing felino.',
      'Esperar calcinosis cutis como sinal cardinal.',
      'Ignorar fragilidade cut\u00e2nea em gato diab\u00e9tico.',
      'Nao ajustar insulina ao controlar Cushing (risco hipoglicemia).',
      'Usar dose canina de cosintropina (5 mcg/kg) em vez de 125 mcg/gato.',
      'Confundir tumor secretor de progesterona com Cushing.',
      'Tratar subdiagnostico sem criterio clinico (Niessen et al., 2025).',
      'Assumir causalidade do pneumoperitoneo pos-trilostano (Kelly et al., 2026).',
      'Nao cross-linkar com ficha canina para comparacao.',
    ],
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'sindrome-cushing-caes',
    'diabetes-mellitus-felina',
    'hipoadrenocorticismo-addison',
    'hipertensao-arterial-sistemica-caes-gatos',
  ],
  relatedMedicationSlugs: ['prednisolona'],
  references: [
${[
  ref('ref-cush-fel-miceli-2022', 'Miceli DD et al. Trilostane in feline hyperadrenocorticism: multicentre study. J Feline Med Surg. 2022.', 'Estudo multic\u00e9ntrico', 'B', 'https://doi.org/10.1177/1098612X211069123'),
  ref('ref-cush-fel-alive-2025', "Niessen SJM et al. ALIVE: Cushing's Syndrome and Hypoadrenocorticism. Vet Sci. 2025;12:761.", 'Consenso ALIVE', 'A \u2014 terminologia'),
  ref('ref-cush-fel-hardy', 'Hardy BT et al. Feline skin fragility syndrome in hyperadrenocorticism.', 'S\u00e9rie de casos', 'B/C'),
  ref('ref-cush-fel-boland-2017', 'Boland LA et al. Peculiarities of feline hyperadrenocorticism. JFMS. 2017.', 'Revis\u00e3o tem\u00e1tica', 'B', 'https://doi.org/10.1177/1098612X17723245'),
  ref('ref-cush-fel-valentin-2014', 'Valentin SY et al. Spontaneous feline hyperadrenocorticism: 30 cases. JVIM. 2014.', 'Serie retrospectiva', 'B', 'https://doi.org/10.1111/jvim.12298'),
  ref('ref-cush-fel-keith-2013', 'Keith AMM et al. Trilostane therapy in cats with spontaneous HAC. JVIM. 2013.', 'Estudo clinico', 'B/C', 'https://doi.org/10.1111/jvim.12178'),
  ref('ref-cush-fel-yayoshi', 'Yayoshi et al. Radiotherapy for feline pituitary macroadenoma.', 'Estudo clinico', 'B/C'),
  ref('ref-cush-fel-kelly-2026', 'Kelly S et al. Pneumoperitoneum following trilostane in a cat. 2026.', 'Relato farmacovigilancia', 'C \u2014 causalidade nao comprovada'),
  ref('ref-cush-fel-nelson-2020', 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 50.', 'Livro-texto', 'Referencia clinica'),
  ref('ref-cush-fel-cook-2021', 'Cook AK, Evans JB. Cushingoid diabetic cat. JFMS. 2021.', 'Revis\u00e3o narrativa', 'B', 'https://doi.org/10.1177/1098612X20979507'),
  ref('ref-cush-fel-plumb-2023', "Plumb's Veterinary Drug Handbook. 10th ed. 2023. Trilostane.", 'Formul\u00e1rio', 'Refer\u00eancia farmacol\u00f3gica'),
  ref('ref-cush-fel-behrend-vin-2022', 'Behrend EN. Canine/feline hyperadrenocorticism (VIN, 2022).', 'Revis\u00e3o VIN', 'B'),
].join('\n')}
  ],
  isPublished: true,
  source: 'seed',
};
`;
}

fs.writeFileSync(OUT_CAES, buildCaes(), 'utf8');
fs.writeFileSync(OUT_GATOS, buildGatos(), 'utf8');

const caesLines = fs.readFileSync(OUT_CAES, 'utf8').split('\n').length;
const gatosLines = fs.readFileSync(OUT_GATOS, 'utf8').split('\n').length;
console.log(`Wrote ${OUT_CAES} (${caesLines} lines)`);
console.log(`Wrote ${OUT_GATOS} (${gatosLines} lines)`);
