import type { EditorialReference } from '../types/common';
import type { MedicationDose, MedicationRecord } from '../types/medication';

interface PlumbsMonographAudit {
  title: string;
  printedPage: number;
  pdfPage: number;
  doseIds: readonly string[];
}

const PLUMBS_CITATION = 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. ISBN 9781394172207.';

/** Páginas conferidas no exemplar PDF fornecido pelo usuário em 14/08/2026. */
export const PLUMBS_10_MONOGRAPH_AUDIT: Record<string, PlumbsMonographAudit> = {
  prednisolona: { title: 'PrednisoLONE/Prednisone/PrednisoLONE Sodium Succinate', printedPage: 1058, pdfPage: 1085, doseIds: ['dose-pred-dog-anti', 'dose-pred-cat-anti', 'dose-pred-dog-imuno', 'dose-pred-cat-imuno', 'dose-pred-reposicao', 'dose-pred-cat-reposicao', 'dose-pred-dog-onc'] },
  'sulfametoxazol-trimetoprima': { title: 'Sulfa-/Trimethoprim', printedPage: 1193, pdfPage: 1220, doseIds: ['dose-tmp-smx-dog-geral', 'dose-tmp-smx-dog-geral-grave', 'dose-tmp-smx-dog-foliculite', 'dose-tmp-smx-dog-cistite-nc', 'dose-tmp-smx-dog-cistite-c', 'dose-tmp-smx-cat-uti', 'dose-tmp-smx-cat-uti-complicated', 'dose-tmp-smx-dog-coccidia', 'dose-tmp-smx-dog-coccidia-over4', 'dose-tmp-smx-cat-coccidia', 'dose-tmp-smx-dog-toxo', 'dose-tmp-smx-dog-neospora', 'dose-tmp-smx-dog-pneumocystis'] },
  'amoxicilina-clavulanato': { title: 'Amoxicillin/Clavulanate', printedPage: 70, pdfPage: 97, doseIds: ['dose-amox-clav-dog-geral', 'dose-amox-clav-dog-cistite', 'dose-amox-clav-cat-nelson', 'dose-amox-clav-cat-plumbs', 'dose-amox-clav-cat-uti'] },
  pregabalina: { title: 'Pregabalin', printedPage: 1064, pdfPage: 1091, doseIds: ['dose-preg-dog-epilepsy', 'dose-preg-dog-neuro', 'dose-preg-dog-periop', 'dose-preg-dog-ortho', 'dose-preg-cat-epi', 'dose-preg-cat-neuro', 'dose-preg-cat-transport'] },
  maropitant: { title: 'Maropitant', printedPage: 799, pdfPage: 826, doseIds: ['dose-maro-dog-sc', 'dose-maro-dog-po', 'dose-maro-dog-motion', 'dose-maro-cat-vomito', 'dose-maro-cat-po', 'dose-maro-cat-drc'] },
  benazepril: { title: 'Benazepril', printedPage: 123, pdfPage: 150, doseIds: ['dose-benza-dog', 'dose-benza-dog-proteinuria-titration', 'dose-benza-cat'] },
  pimobendan: { title: 'Pimobendan', printedPage: 1026, pdfPage: 1053, doseIds: ['dose-pimo-dog-chf', 'dose-pimo-cat'] },
  'same-sadenosilmetionina': { title: 'S-Adenosyl-Methionine (SAMe)', printedPage: 1137, pdfPage: 1164, doseIds: ['dose-same-dog-primary', 'dose-same-cat-primary'] },
  'acido-ursodesoxicolico': { title: 'Ursodiol', printedPage: 1287, pdfPage: 1314, doseIds: ['dose-udca-both-primary'] },
  'n-acetilcisteina': { title: 'Acetylcysteine', printedPage: 12, pdfPage: 39, doseIds: ['dose-nac-intox-attack', 'dose-nac-intox-maintenance'] },
  ondansetron: { title: 'Ondansetron', printedPage: 956, pdfPage: 983, doseIds: ['dose-ondansetron-dog-iv-nausea', 'dose-ondansetron-dog-iv-alt', 'dose-ondansetron-cat-iv-sc'] },
  dipirona: { title: 'Dipyrone / Metamizole', printedPage: 413, pdfPage: 440, doseIds: ['dose-dipirona-dog-iv-standard', 'dose-dipirona-cat-iv'] },
  'ampicilina-sulbactam': { title: 'Ampicillin/Sulbactam', printedPage: 82, pdfPage: 109, doseIds: ['dose-amp-sulb-dog-iv-standard', 'dose-amp-sulb-cat-iv'] },
  ampicilina: { title: 'Ampicillin', printedPage: 78, pdfPage: 105, doseIds: ['dose-ampicilina-dog-iv-general', 'dose-ampicilina-cat-iv-general', 'dose-ampicilina-dog-lepto'] },
  budesonida: { title: 'Budesonide', printedPage: 142, pdfPage: 169, doseIds: ['dose-budesonida-dog-dye-weight-bands', 'dose-budesonida-dog-pietra-m2', 'dose-budesonida-cat-enteropathy'] },
  clorambucil: { title: 'Chlorambucil', printedPage: 243, pdfPage: 270, doseIds: ['dose-chlorambucil-dog-immunosuppression-plumbs', 'dose-chlorambucil-cat-imd-over4', 'dose-chlorambucil-cat-imd-under4', 'dose-chlorambucil-cat-small-cell-lymphoma', 'dose-chlorambucil-cat-pemphigus-ge'] },
  'desoxicorticosterona-pivalato': { title: 'Desoxycorticosterone Pivalate (DOCP)', printedPage: 355, pdfPage: 382, doseIds: ['dose-docp-zycortal-fda-label'] },
  metimazol: { title: 'Methimazole', printedPage: 849, pdfPage: 876, doseIds: ['dose-metimazol-fda-label', 'dose-metimazol-transdermal'] },
  'levotiroxina-sodica': { title: 'Levothyroxine', printedPage: 749, pdfPage: 776, doseIds: ['dose-levothyroxine-dog-thyro-tabs-label', 'dose-levothyroxine-cat-nelson'] },
  diltiazem: { title: 'Diltiazem', printedPage: 396, pdfPage: 423, doseIds: ['dose-dilt-dog-svt-iv-plumb', 'dose-dilt-dog-svt-iv-alt', 'dose-dilt-dog-cri', 'dose-dilt-dog-fa-er', 'dose-dilt-cat-svt-iv'] },
  digoxina: { title: 'Digoxin', printedPage: 392, pdfPage: 419, doseIds: ['dose-dig-dog-fa-emergency'] },
  atenolol: { title: 'Atenolol', printedPage: 103, pdfPage: 130, doseIds: ['dose-ateno-dog-plumb', 'dose-ateno-dog-arvc', 'dose-ateno-cat-fixed', 'dose-ateno-cat-hyperthyroid'] },
  propranolol: { title: 'Propranolol', printedPage: 1086, pdfPage: 1113, doseIds: ['dose-prop-dog-vo', 'dose-prop-cat-vo'] },
  esmolol: { title: 'Esmolol', printedPage: 477, pdfPage: 504, doseIds: ['dose-esmo-emergency', 'dose-esmo-cat'] },
  sotalol: { title: 'Sotalol', printedPage: 1169, pdfPage: 1196, doseIds: ['dose-sot-dog-plumb', 'dose-sot-dog-arvc', 'dose-sot-dog-arvc-combo'] },
  atropina: { title: 'Atropine', printedPage: 112, pdfPage: 139, doseIds: ['dose-atrop-anesth', 'dose-atrop-cpr-recover', 'dose-atrop-test-iv', 'dose-atrop-op', 'dose-atrop-cat-brady', 'dose-atrop-cpr-cat'] },
  lidocaina: { title: 'Lidocaine, Local Anesthetic / Lidocaine (Intravenous; Systemic)', printedPage: 752, pdfPage: 779, doseIds: ['dose-lido-dog-vt-bolus', 'dose-lido-dog-vt-cri-plumb', 'dose-lido-cat-vt-bolus', 'dose-lido-dog-local', 'dose-lido-cat-local'] },
};

const DOSE_PATCHES: Record<string, Partial<MedicationDose>> = {
  'dose-pred-reposicao': { species: 'dog', indication: 'Reposição glicocorticoide — hipoadrenocorticismo canino', doseMin: 0.1, doseMax: 0.22, frequency: 'q24h', notes: 'Dose inicial; reduzir à menor dose que controle sinais. Aumentar temporariamente em situações de estresse.' },
  'dose-tmp-smx-dog-geral': { doseMin: 30, doseMax: 30, frequency: 'q24h', indication: 'Infecção bacteriana sistêmica sensível — dose rotulada da associação total', notes: 'Dose da soma sulfonamida + trimetoprima. Em infecção grave, usar o regime separado de 15 mg/kg q12h.' },
  'dose-tmp-smx-cat-uti': { doseMin: 15, doseMax: 15, indication: 'Cistite bacteriana não complicada', frequency: 'q12h', duration: '3 dias em casos selecionados; cultura conforme risco e evolução.', notes: 'Dose da associação total.' },
  'dose-tmp-smx-dog-coccidia': { doseMin: 15, doseMax: 30, indication: 'Coccidiose — cães com menos de 4 kg', frequency: 'q12–24h', notes: 'Dose da associação total; esta faixa não deve ser aplicada a cães acima de 4 kg.' },
  'dose-amox-clav-dog-geral': { indication: 'Pele, tecidos moles e doença periodontal — dose rotulada', doseMin: 13.75, doseMax: 13.75, frequency: 'q12h', notes: 'Dose da combinação total (amoxicilina + clavulanato), não apenas do componente amoxicilina.', calculatorEnabled: false },
  'dose-amox-clav-dog-synulox': { indication: 'Pele, tecidos moles, trato urinário e respiratório — bula Synulox® Brasil', notes: '10 mg/kg do componente amoxicilina + 2,5 mg/kg de clavulanato na proporção fixa do produto (12,5 mg/kg da associação total).', referenceIds: ['ref-zoetis-synulox-br'] },
  'dose-amox-clav-cat-plumbs': { indication: 'Doença de vias aéreas superiores com componente bacteriano', doseMin: 12.5, doseMax: 12.5, frequency: 'q12h', duration: 'Conforme foco, cultura e resposta.', notes: 'Dose da combinação total.', calculatorEnabled: false },
  'dose-amox-clav-cat-uti': { indication: 'Cistite bacteriana esporádica — quando a associação estiver indicada', doseMin: 12.5, doseMax: 25, frequency: 'q8–12h', duration: '3–5 dias', notes: 'Dose da combinação total. Amoxicilina sem clavulanato é preferida para terapia empírica quando apropriado.', calculatorEnabled: false },
  'dose-maro-cat-vomito': { indication: 'Tratamento do vômito — regime parenteral rotulado', route: 'SC ou IV lenta', frequency: 'q24h', duration: 'Até 5 dias' },
  'dose-benza-dog': { doseMin: 0.5, doseMax: 0.5, indication: 'Proteinúria associada à doença renal crônica — dose inicial', frequency: 'q24h', notes: 'Dose inicial do Plumb’s; titular somente com reavaliação de UPC, creatinina, potássio e pressão arterial.' },
  'dose-pimo-cat': { doseMin: 0.25, doseMax: 0.25, notes: 'Uso extra-label felino, especialmente quando há disfunção sistólica; evidência inferior à canina.' },
  'dose-same-dog-cat-support': { doseMin: 20, doseMax: 20, frequency: 'q24h em jejum', notes: 'Usar produto de fabricante confiável e com biodisponibilidade demonstrada; administrar pelo menos 1 hora antes do alimento.' },
  'dose-udca-both': { frequency: 'q24h ou dose diária dividida q12h, com alimento' },
  'dose-ondansetron-cat-iv-sc': { doseMin: 0.1, doseMax: 1, route: 'IV lenta, SC ou IM', frequency: 'q6–12h', notes: 'Faixa do Plumb’s para vômito agudo felino. A via oral tem biodisponibilidade menor e permanece em entrada separada.' },
  'dose-dipirona-cat-iv': { doseMin: 25, doseMax: 25, frequency: 'q24h', notes: 'Plumb’s também descreve 12,5 mg/kg IV q12h como regime pós-operatório alternativo.' },
  'dose-amp-sulb-dog-iv-standard': { doseMin: 22, doseMax: 30, frequency: 'q6–8h', notes: 'Dose da associação total ampicilina + sulbactam. Ajustar a cultura, MIC, gravidade e função renal.' },
  'dose-amp-sulb-cat-iv': { doseMin: 22, doseMax: 30, frequency: 'q6–8h', notes: 'Dose da associação total; evidência clínica felina mais limitada.' },
  'dose-ampicilina-dog-iv-general': { doseMin: 20, doseMax: 40, frequency: 'q6–8h' },
  'dose-ampicilina-cat-iv-general': { doseMin: 20, doseMax: 40, frequency: 'q6–8h' },
  'dose-ampicilina-dog-lepto': { doseMin: 20, doseMax: 20, frequency: 'q6h', notes: 'Fase parenteral quando doxiciclina não é tolerada; completar a eliminação renal com doxiciclina conforme consenso vigente.' },
  'dose-budesonida-dog-dye-weight-bands': { indication: 'Enteropatia inflamatória crônica — faixas por peso corporal', frequency: 'q24h', notes: '3–7 kg: 1 mg; 7,1–15 kg: 2 mg; 15,1–30 kg: 3 mg; >30 kg: 5 mg por cão. Não converter esta faixa fixa em mg/kg.', calculatorEnabled: false },
  'dose-budesonida-cat-enteropathy': { doseMin: 0.5, doseMax: 0.75, perWeightUnit: 'por gato', frequency: 'q24h', notes: 'Dose fixa por gato; alternativa descrita no Plumb’s: 3 mg/m² q24h. Não usar 1 mg q8h.', calculatorEnabled: false },
  'dose-docp-zycortal-fda-label': { frequency: 'q25d inicialmente; individualizar por sinais e Na/K' },
  'dose-levothyroxine-cat-nelson': { doseMin: 0.05, doseMax: 0.15, notes: 'Faixa do Plumb’s: 50–150 µg por gato q24h; ajustar TT4 e TSH a cada 4–8 semanas.' },
  'dose-dig-dog-fa-emergency': { referenceIds: [] },
  'dose-esmo-emergency': { species: 'both', indication: 'Taquiarritmia — ataque IV', notes: 'Plumb’s: 0,25–0,5 mg/kg IV em 2–5 min; iniciar CRI de 10–200 µg/kg/min em entrada/protocolo separado.' },
  'dose-sot-dog-plumb': { species: 'both', indication: 'Taquiarritmias ventriculares ± supraventriculares — Plumb’s' },
  'dose-atrop-anesth': { species: 'both', indication: 'Adjuvante pré-anestésico', notes: 'Considerar 0,01 mg/kg em pacientes geriátricos ou debilitados.' },
  'dose-atrop-test-iv': { frequency: 'ECG basal; repetir ECG 15 min após a dose', notes: 'Teste de resposta à atropina descrito no Plumb’s. Se a resposta for incompleta, o protocolo pode ser repetido com monitorização eletrocardiográfica.', referenceIds: [] },
  'dose-atrop-op': { species: 'both', doseMin: 0.2, doseMax: 0.2, notes: 'Administrar 1/4 da dose IV e o restante IM ou SC; repetir conforme recorrência dos sinais muscarínicos. Não reverte efeitos nicotínicos nem convulsões.' },
};

const REMOVED_DOSE_IDS = new Set([
  'dose-nac-intox',
  'dose-benzfib-cat',
  'dose-budesonida-dog-bsava-small',
  'dose-budesonida-dog-bsava-large',
  'dose-pred-dog-paliativo',
  'dose-pred-cat-paliativo',
  'dose-amox-clav-emerg-pneumo',
  'dose-ondansetron-dog-sc',
]);

const ADDED_DOSES: Record<string, MedicationDose[]> = {
  prednisolona: [{ id: 'dose-pred-cat-reposicao', species: 'cat', indication: 'Reposição glicocorticoide — hipoadrenocorticismo felino', doseMin: 0.2, doseMax: 0.2, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'q24h', notes: 'Baseado nos relatos felinos compilados no monógrafo de DOCP; individualizar e monitorar.', calculatorEnabled: true }],
  'sulfametoxazol-trimetoprima': [
    { id: 'dose-tmp-smx-dog-geral-grave', species: 'dog', indication: 'Infecção bacteriana sistêmica sensível — regime para infecção grave', doseMin: 15, doseMax: 15, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'q12h', notes: 'Dose da associação total; alternativa ao regime rotulado de 30 mg/kg q24h.', calculatorEnabled: true, presentationId: 'pres-tmp-smx-susp-br' },
    { id: 'dose-tmp-smx-cat-uti-complicated', species: 'cat', indication: 'Cistite bacteriana complicada', doseMin: 15, doseMax: 30, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'q12h', duration: 'Conforme cultura, complicação e resposta.', notes: 'Dose da associação total.', calculatorEnabled: true, presentationId: 'pres-tmp-smx-susp-br' },
    { id: 'dose-tmp-smx-dog-coccidia-over4', species: 'dog', indication: 'Coccidiose — cães acima de 4 kg', doseMin: 30, doseMax: 60, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'q24h', notes: 'Dose da associação total; não aplicar esta faixa a cães com menos de 4 kg.', calculatorEnabled: false, presentationId: 'pres-tmp-smx-susp-br' },
  ],
  'amoxicilina-clavulanato': [{ id: 'dose-amox-clav-dog-cistite', species: 'dog', indication: 'Cistite bacteriana esporádica — quando a associação estiver indicada', doseMin: 12.5, doseMax: 25, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'q8–12h', duration: '3–5 dias', notes: 'Dose da combinação total. Amoxicilina sem clavulanato é preferida para terapia empírica quando apropriado.', calculatorEnabled: false }],
  maropitant: [{ id: 'dose-maro-cat-po', species: 'cat', indication: 'Prevenção de vômito — uso oral extra-label', doseMin: 1, doseMax: 1, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO', frequency: 'dose única antes do estímulo emético', notes: 'Uso extra-label; não apresentar como regime parenteral rotulado.', calculatorEnabled: true }],
  benazepril: [{ id: 'dose-benza-dog-proteinuria-titration', species: 'dog', indication: 'Proteinúria persistente — titulação especializada', doseMin: 0.5, doseMax: 2, doseUnit: 'mg', perWeightUnit: 'kg/dia', route: 'VO', frequency: 'q24h ou dose diária dividida q12h', notes: 'Aumentar em incrementos de 0,5 mg/kg/dia somente após reavaliação; não é uma faixa para escolha aleatória na primeira prescrição.', calculatorEnabled: false }],
  'n-acetilcisteina': [
    { id: 'dose-nac-oxidative-iv-loading', species: 'both', indication: 'Hepatotoxicidade oxidativa — ataque IV', doseMin: 140, doseMax: 180, doseUnit: 'mg', perWeightUnit: 'kg', route: 'IV lenta', frequency: 'dose de ataque única', notes: 'Diluir a 5%, usar filtro de 0,2 µm e infundir em 15–20 min.', calculatorEnabled: true },
    { id: 'dose-nac-oxidative-po-loading', species: 'both', indication: 'Hepatotoxicidade oxidativa — ataque oral', doseMin: 280, doseMax: 280, doseUnit: 'mg', perWeightUnit: 'kg', route: 'VO por sonda gástrica', frequency: 'dose de ataque única', notes: 'Preferir IV em intoxicação grave ou vômito não controlado.', calculatorEnabled: true },
    { id: 'dose-nac-oxidative-maintenance', species: 'both', indication: 'Hepatotoxicidade oxidativa — manutenção após ataque', doseMin: 70, doseMax: 70, doseUnit: 'mg', perWeightUnit: 'kg', route: 'IV lenta ou VO', frequency: 'q6h', duration: 'Mínimo de 7 administrações; grandes exposições podem exigir até 17.', calculatorEnabled: true },
  ],
  clorambucil: [{ id: 'dose-chlorambucil-dog-immunosuppression-plumbs', species: 'dog', indication: 'Imunossupressão — guia geral do Plumb’s', doseMin: 1.95, doseMax: 4.5, doseUnit: 'mg', perWeightUnit: 'm²', route: 'VO', frequency: 'q24h inicialmente', notes: 'Guia geral, não protocolo automático. Reduzir para dias alternados após remissão e usar a menor dose eficaz. Requer oncologista/internista e hemogramas seriados.', calculatorEnabled: false }],
  lidocaina: [{ id: 'dose-lido-cat-local', species: 'cat', indication: 'Anestesia local — infiltração tecidual', doseMin: 2, doseMax: 4, doseUnit: 'mg', perWeightUnit: 'kg', route: 'Infiltração/bloqueio', frequency: 'dose total do procedimento', notes: 'Somar a dose de todos os pontos de infiltração. Não confundir com dose IV antiarrítmica.', calculatorEnabled: true, presentationId: 'pres-lido-inj-2' }],
};

function plumbsReference(slug: string, monograph: PlumbsMonographAudit): EditorialReference {
  return {
    id: `ref-plumbs-10-audit-${slug}`,
    citationText: `${PLUMBS_CITATION} Monografia “${monograph.title}”, seção Dosages, p. ${monograph.printedPage}.`,
    sourceType: 'Formulário veterinário',
    url: null,
    notes: `Conferência visual no exemplar local: página ${monograph.pdfPage} do PDF.`,
    evidenceLevel: 'Referência terciária especializada; individualizar por indicação, espécie, via e monitorização',
  };
}

export function applyPlumbs10MedicationAudit(medication: MedicationRecord): MedicationRecord {
  const monograph = PLUMBS_10_MONOGRAPH_AUDIT[medication.slug];
  const referenceId = monograph ? `ref-plumbs-10-audit-${medication.slug}` : null;
  const auditedDoseIds = new Set(monograph?.doseIds || []);

  const doses = medication.doses
    .filter((dose) => !REMOVED_DOSE_IDS.has(dose.id))
    .map((dose) => {
      const patched = { ...dose, ...(DOSE_PATCHES[dose.id] || {}) };
      if (!referenceId || !auditedDoseIds.has(patched.id)) return patched;
      return { ...patched, referenceIds: [...new Set([...(patched.referenceIds || []), referenceId])] };
    });

  for (const added of ADDED_DOSES[medication.slug] || []) {
    doses.push(referenceId && auditedDoseIds.has(added.id)
      ? { ...added, referenceIds: [...new Set([...(added.referenceIds || []), referenceId])] }
      : added);
  }

  const references = medication.references?.filter((reference) => reference.id !== referenceId) || [];
  if (monograph) references.push(plumbsReference(medication.slug, monograph));

  if (medication.slug === 'benzafibrato') {
    return {
      ...medication,
      species: ['dog'],
      doses: doses.map((dose) => dose.id === 'dose-benzfib-dog'
        ? {
            ...dose,
            doseMin: 4,
            doseMax: 10,
            duration: '30 dias no estudo prospectivo; uso prolongado exige reavaliações seriadas.',
            notes: 'Faixa estudada em 46 cães. O Plumb’s 10ª edição não possui monografia de bezafibrato; não extrapolar para gatos.',
            referenceIds: [...new Set([...(dose.referenceIds || []), 'ref-bezafibrate-dogs-trial-2017', 'ref-bezafibrate-dogs-long-term-2026'])],
          }
        : dose),
      references: references.filter((reference) => reference.id !== 'ref-plumb-fibrates'),
    };
  }

  return { ...medication, doses, references };
}
