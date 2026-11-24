import type { CommercialMedicationProduct } from '../types/commercialMedication';
import { TRANSAMIN_LEAFLET_URL, TRANSAMIN_PRODUCT_URL } from './seed/medications.acido-tranexamico.seed';

export const transaminCommercialProductSeed: CommercialMedicationProduct = {
  id: 'transamin-zydus',
  slug: 'transamin-zydus',
  name: 'Transamin® (ácido tranexâmico)',
  manufacturer: 'Zydus Nikkho',
  commercialClass: 'emergency',
  commercialSubclass: 'emergency_antifibrinolytic',
  species: ['dog', 'cat'],
  productPageUrl: TRANSAMIN_PRODUCT_URL,
  labelUrl: TRANSAMIN_LEAFLET_URL,
  presentations: ['Solução injetável 50 mg/mL, 5 ampolas de 5 mL', 'Comprimido revestido de 250 mg, caixa com 12'],
  activeComponents: ['Ácido tranexâmico'],
  searchAliases: ['TXA', 'tranexamico', 'transamin', 'antifibrinolítico'],
  labelCompositionSummary: 'Cada ampola contém 250 mg em 5 mL. Cada comprimido revestido contém 250 mg.',
  labelDirections: 'Uso extra-bula em cães e gatos. Cães: 10 mg/kg IV por infusão lenta a cada 8 h (ou VO estável: 15 a 20 mg/kg a cada 8 h; em choque/hiperfibrinólise em estudo: ataque 20 mg/kg IV em 20 min seguido de 2,5 mg/kg/h por 8 h). Gatos (séries clínicas): 10 mg/kg IV a cada 6 h sob reavaliação.',
  dosageGuidance: {
    labelDose: 'Cães (extra-bula): 10 mg/kg IV lento q8h (0,2 mL/kg da ampola 50 mg/mL) ou 15 a 20 mg/kg VO q8h. Gatos: 10 mg/kg IV lento q6h.',
    plumbs: {
      dog: [
        { title: 'Hiperfibrinólise / sangramento agudo', dose: '10 mg/kg IV lento q8h (ou ataque 10–20 mg/kg IV em 15–20 min + CRI 2,5–10 mg/kg/h)', note: 'Ampola 50 mg/mL = 0,2 mL/kg para 10 mg/kg. Monitorar perfusão, TEG/ROTEM e função renal.' },
        { title: 'Manutenção oral em cão estável', dose: '15 a 20 mg/kg VO q8h', note: 'Comprimido de 250 mg dificulta fracionamento preciso em cães de pequeno porte.' },
      ],
      cat: [
        { title: 'Hemorragia em paciente hospitalizado', dose: '10 mg/kg IV lento q6h', note: 'Reavaliar antes de repetir; cautela com risco trombótico em cardiopatas.' },
      ],
    },
  },
  plumbsContext: 'Uso extra-bula para preservar a fibrina, com esquemas distintos conforme a indicação. A apresentação brasileira tem 50 mg/mL, existindo apresentações internacionais de 100 mg/mL.',
  clinicalUse: 'Antifibrinolítico adjuvante em situações selecionadas. A suspeita ou confirmação de lise acelerada ajuda a explicar por que o fármaco poderia reduzir o sangramento.',
  reassessment: 'Acompanhe perfusão, perda de sangue, resposta viscoelástica quando disponível, função renal e tolerância durante a administração.',
  prescriptionExample: 'Transamin® 50 mg/mL (hospitalar): administrar 10 mg/kg (0,2 mL/kg; ex.: cão de 10 kg = 2 mL) por via IV lenta em 15 a 20 minutos a cada 8 horas (ou 15–20 mg/kg VO q8h na transição oral em cães estáveis).',
  safetyAlert: 'Identifique claramente a via IV. Erro de via neuraxial pode ser fatal. Avalie risco trombótico, função renal e a possibilidade de obstrução por coágulo em hematúria de trato superior.',
  price: { averageLabel: 'Sob consulta', rangeLabel: 'Varia por apresentação e estabelecimento', sourceDate: '', notes: 'Consulte o preço da apresentação desejada.' },
  evidenceLevel: 'Bula humana para apresentações. Formulários e estudos veterinários para uso extra-bula.',
  catalogMedicationId: 'editorial:acido-tranexamico',
};
