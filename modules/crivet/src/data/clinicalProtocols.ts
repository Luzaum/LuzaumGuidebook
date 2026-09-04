import { cite } from '../lib/acervo';

export type ProtocolCategory = 'CRI' | 'Bolus' | 'Sedacao/Pre-medicacao' | 'Emergência';

export interface ProtocolDrugLine {
  name: string;
  dose: string;
  previewDose?: string;
  notes?: string;
  drugId?: string;
}

export interface ClinicalProtocol {
  id: string;
  name: string;
  description: string;
  category: ProtocolCategory;
  drugs: ProtocolDrugLine[];
  species: ('dog' | 'cat')[];
  indications: string[];
  warnings?: string[];
  clinicalNotes?: string;
  /** Citação do acervo local (Lumb & Jones / Plumb's). */
  sources: string[];
}

/**
 * Protocolos alinhados ao acervo local (Plumb's 10ª ed., Lumb & Jones 6ª ed.).
 * Doses em unidades clínicas usuais; ver monografias para titulação.
 */
export const CLINICAL_PROTOCOLS: ClinicalProtocol[] = [
  {
    id: 'mlk',
    name: 'MLK (Morfina, Lidocaína, Cetamina)',
    description: 'CRI multimodal clássica para analgesia trans e pós-operatória em cães.',
    category: 'CRI',
    drugs: [
      {
        name: 'Morfina',
        drugId: 'morphine',
        dose: '3.3-4 mcg/kg/min',
        previewDose: '3.3 mcg/kg/min',
        notes: '≈ 0.2 mg/kg/h. Reduz MAC de isoflurano sem efeitos hemodinâmicos adversos significativos.',
      },
      {
        name: 'Lidocaína',
        drugId: 'lidocaine',
        dose: '50 mcg/kg/min',
        previewDose: '50 mcg/kg/min',
        notes: '≈ 3 mg/kg/h. Analgésico sistêmico e poupador de inalatório.',
      },
      {
        name: 'Cetamina',
        drugId: 'ketamine',
        dose: '10 mcg/kg/min',
        previewDose: '10 mcg/kg/min',
        notes: '≈ 0.6 mg/kg/h. Anti-wind-up e modulação NMDA.',
      },
    ],
    species: ['dog'],
    indications: ['Dor trans e pós-operatória', 'Trauma extenso', 'Ortopedia', 'Pancreatite severa'],
    warnings: [
      'Evitar lidocaína IV analgésica em gatos (sensibilidade ao SNC).',
      'Morfina em bolus rápido pode liberar histamina.',
    ],
    clinicalNotes: 'Misturar os três fármacos na mesma solução e administrar em bomba. Titular conforme profundidade analgésica.',
    sources: [cite.plumbs(911), cite.plumbs(721), cite.lumbJones()],
  },
  {
    id: 'flk',
    name: 'FLK (Fentanil, Lidocaína, Cetamina)',
    description: 'CRI multimodal com opioide sintético para dor severa.',
    category: 'CRI',
    drugs: [
      {
        name: 'Fentanil',
        drugId: 'fentanyl',
        dose: '3.6 mcg/kg/h',
        previewDose: '3.6 mcg/kg/h',
        notes: 'Opioide mu potente; monitorar ventilação.',
      },
      {
        name: 'Lidocaína',
        drugId: 'lidocaine',
        dose: '3 mg/kg/h',
        previewDose: '3 mg/kg/h',
        notes: 'Analgésico adjuvante e poupador de inalatório.',
      },
      {
        name: 'Cetamina',
        drugId: 'ketamine',
        dose: '0.6 mg/kg/h',
        previewDose: '0.6 mg/kg/h',
        notes: 'Equivale a 10 mcg/kg/min. Modula sensibilização central.',
      },
    ],
    species: ['dog'],
    indications: ['Dor severa', 'Laparotomias', 'Amputações', 'Ortopedia complexa'],
    warnings: [
      'Evitar lidocaína sistêmica em gatos.',
      'Depressão respiratória pelo fentanil — considerar ventilação assistida.',
    ],
    clinicalNotes: 'Protocolo descrito em estudos citados no Plumb\'s; sem dose de ataque no estudo de referência.',
    sources: [cite.plumbs(721), cite.plumbs(759), cite.lumbJones()],
  },
  {
    id: 'dmlk',
    name: 'DMLK (Dexmedetomidina, Morfina, Lidocaína, Cetamina)',
    description: 'CRI multimodal com sedação alfa-2 para analgesia hospitalar.',
    category: 'CRI',
    drugs: [
      {
        name: 'Dexmedetomidina',
        drugId: 'dexmedetomidine',
        dose: '0.5 mcg/kg/h',
        previewDose: '0.5 mcg/kg/h',
        notes: 'Sedação e analgesia; bradicardia esperada.',
      },
      {
        name: 'Morfina',
        drugId: 'morphine',
        dose: '0.2 mg/kg/h',
        previewDose: '0.2 mg/kg/h',
        notes: 'Opioide mu de base.',
      },
      {
        name: 'Lidocaína',
        drugId: 'lidocaine',
        dose: '3 mg/kg/h',
        previewDose: '3 mg/kg/h',
        notes: 'Analgésico adjuvante.',
      },
      {
        name: 'Cetamina',
        drugId: 'ketamine',
        dose: '0.6 mg/kg/h',
        previewDose: '0.6 mg/kg/h',
        notes: 'Modulação NMDA.',
      },
    ],
    species: ['dog'],
    indications: ['UTI pós-operatória', 'Dor hospitalar moderada a severa', 'Pacientes que toleram alfa-2'],
    warnings: [
      'Bradicardia e vasoconstrição periférica pela dexmedetomidina.',
      'Evitar em choque não resolvido ou bloqueio AV.',
      'Lidocaína IV analgésica contraindicada em gatos.',
    ],
    clinicalNotes: 'Administrar mistura única em fluido de manutenção via bomba.',
    sources: [cite.plumbs(721), cite.plumbs(911), cite.lumbJones()],
  },
  {
    id: 'dex-ket-sedation',
    name: 'Dexmedetomidina + Cetamina (IM)',
    description: 'Sedação profunda para procedimentos curtos (kitty magic / DKT).',
    category: 'Sedacao/Pre-medicacao',
    drugs: [
      {
        name: 'Dexmedetomidina',
        drugId: 'dexmedetomidine',
        dose: '5-15 mcg/kg',
        notes: 'Gatos: 10-25 mcg/kg IM em combinações publicadas.',
      },
      {
        name: 'Cetamina',
        drugId: 'ketamine',
        dose: '3-5 mg/kg',
        notes: 'IM associado a alfa-2 e opioide conforme protocolo escolhido.',
      },
    ],
    species: ['dog', 'cat'],
    indications: ['Contenção', 'Radiografias', 'Pequenos procedimentos'],
    warnings: ['Bradicardia e hipertensão inicial.', 'Evitar em instáveis hemodinamicamente.'],
    clinicalNotes: 'Reversível com atipamezole (volume igual ao da dexmedetomidina).',
    sources: [cite.plumbs(721), cite.lumbJones(336)],
  },
  {
    id: 'propofol-induction',
    name: 'Indução com Propofol',
    description: 'Indução IV titulada ao efeito.',
    category: 'Bolus',
    drugs: [
      {
        name: 'Propofol',
        drugId: 'propofol',
        dose: '2-6 mg/kg',
        previewDose: '4 mg/kg',
        notes: 'Titular lentamente IV; pré-oxigenar.',
      },
    ],
    species: ['dog', 'cat'],
    indications: ['Indução para intubação', 'TIVA selecionada'],
    warnings: ['Apneia e hipotensão dose-dependentes.'],
    clinicalNotes: 'Reduzir dose se pré-medicado com opioide/benzodiazepínico.',
    sources: [cite.lumbJones(), cite.plumbs()],
  },
  {
    id: 'fentanyl-bolus',
    name: 'Fentanil — analgesia perioperatória',
    description: 'Ataque + CRI ou bolus de resgate conforme Plumb\'s.',
    category: 'Bolus',
    drugs: [
      {
        name: 'Fentanil',
        drugId: 'fentanyl',
        dose: '2-10 mcg/kg',
        previewDose: '5 mcg/kg',
        notes: 'Cães: ataque 2-10 mcg/kg IV; CRI 2-10 mcg/kg/h. Gatos: 5 mcg/kg + 5 mcg/kg/h.',
      },
    ],
    species: ['dog', 'cat'],
    indications: ['Analgesia perioperatória', 'Resgate transoperatório', 'Dor severa titulada'],
    warnings: ['Rigidez torácica se bolus rápido.', 'Depressão respiratória e bradicardia.'],
    clinicalNotes: 'Manter naloxona disponível. Bolus sem CRI dura 20-30 min.',
    sources: [cite.plumbs(512), cite.lumbJones()],
  },
  {
    id: 'cpr-epinephrine',
    name: 'RCP: Epinefrina',
    description: 'Vasopressor durante parada cardiorrespiratória.',
    category: 'Emergência',
    drugs: [
      {
        name: 'Epinefrina',
        drugId: 'epinephrine',
        dose: '0.01-0.02 mg/kg',
        previewDose: '0.01 mg/kg',
        notes: 'Repetir a cada 3-5 min durante RCP. Via IV/IO preferencial.',
      },
    ],
    species: ['dog', 'cat'],
    indications: ['Parada cardiorrespiratória'],
    warnings: ['Arritmogênico.', 'Doses altas pós-ROSC podem prejudicar perfusão.'],
    clinicalNotes: 'Foco em compressões de qualidade e ventilação.',
    sources: [cite.lumbJones(), cite.plumbs()],
  },
  {
    id: 'status-epilepticus',
    name: 'Status epilepticus',
    description: 'Controle de crise convulsiva ativa.',
    category: 'Emergência',
    drugs: [
      {
        name: 'Diazepam',
        drugId: 'diazepam',
        dose: '0.5-1.0 mg/kg',
        previewDose: '0.5 mg/kg',
        notes: 'IV lento ou retal. Primeira linha.',
      },
      {
        name: 'Midazolam',
        drugId: 'midazolam',
        dose: '0.2-0.5 mg/kg',
        previewDose: '0.3 mg/kg',
        notes: 'IM ou intranasal se sem acesso IV.',
      },
      {
        name: 'Cetamina',
        drugId: 'ketamine',
        dose: '5 mg/kg',
        previewDose: '5 mg/kg',
        notes: 'Status refratário (extra-label, Plumb\'s). Associar a anticonvulsivante.',
      },
    ],
    species: ['dog', 'cat'],
    indications: ['Status epilepticus', 'Convulsões em cluster'],
    warnings: ['Monitorar ventilação.', 'Diazepam oral contraindicado em gatos.'],
    clinicalNotes: 'Cetamina 5 mg/kg IV bolus citada no Plumb\'s para status refratário.',
    sources: [cite.plumbs(721), cite.lumbJones(), cite.ettinger()],
  },
];
