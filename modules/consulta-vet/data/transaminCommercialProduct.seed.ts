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
  labelDirections: 'A bula do fabricante é para uso humano. Consulte a monografia veterinária para os contextos e limites dos esquemas extra-bula.',
  plumbsContext: 'O Plumb descreve uso extra-bula para preservar a fibrina, com esquemas distintos conforme a indicação. A apresentação brasileira tem 50 mg/mL, enquanto o formulário também descreve ampolas internacionais de 100 mg/mL.',
  clinicalUse: 'Antifibrinolítico adjuvante em situações selecionadas. A suspeita ou confirmação de lise acelerada ajuda a explicar por que o fármaco poderia reduzir o sangramento.',
  reassessment: 'Acompanhe perfusão, perda de sangue, resposta viscoelástica quando disponível, função renal e tolerância durante a administração.',
  prescriptionExample: 'Conversão hospitalar de referência. Para um cão de 10 kg e uma dose de 10 mg/kg, aspirar 2 mL da ampola de 50 mg/mL antes da diluição. O clínico deve definir a indicação, a velocidade e a necessidade de repetir.',
  safetyAlert: 'Identifique claramente a via IV. Erro de via neuraxial pode ser fatal. Avalie risco trombótico, função renal e a possibilidade de obstrução por coágulo em hematúria de trato superior.',
  price: { averageLabel: 'Sob consulta', rangeLabel: 'Varia por apresentação e estabelecimento', sourceDate: '', notes: 'Consulte o preço da apresentação desejada.' },
  evidenceLevel: 'Bula humana para apresentações. Formulários e estudos veterinários para uso extra-bula.',
  catalogMedicationId: 'editorial:acido-tranexamico',
};
