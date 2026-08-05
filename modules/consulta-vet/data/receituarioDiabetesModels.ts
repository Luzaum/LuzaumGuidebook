import type {
  ClinicalMedicationDefinition,
  ClinicalMedicationDose,
  ClinicalRecipeModel,
  DocumentTemplate,
} from '../types/receituario';
import { getDefaultClinicalOptionKeys, renderClinicalRecipe } from '../utils/receituarioClinicalModels';
import {
  buildDiabetesAppendSections,
  DM_CANINSULIN_CAT_VET_NOTES,
  DM_DOSE_ADJUSTMENT_VET_NOTES,
  DM_GLARGINE_DOG_VET_NOTES,
  DM_TOUJEO_ADJUSTMENT_VET_NOTES,
  type DmInsulinKind,
  type DmSpeciesKind,
} from './receituarioDiabetesSharedSections';

const NOW = '2026-08-05T00:00:00.000Z';

const CANINSULIN_PRODUCTS = ['caninsulin-vetsulin-lente-u40-msd'];
const NPH_PRODUCTS = ['humulin-n-nph-u100-lilly', 'novolin-n-nph-u100-novo-nordisk'];
const GLARGINE_U100_PRODUCTS = ['lantus-glargina-u100-sanofi', 'basaglar-glargina-u100-lilly'];
const TOUJEO_PRODUCTS = ['toujeo-glargina-u300-sanofi'];

function medication(
  key: string,
  name: string,
  dose: ClinicalMedicationDose,
  prescriptionText: string,
  presentations: string[] = [],
): ClinicalMedicationDefinition {
  return {
    key,
    name,
    canonicalMedicationId: null,
    canonicalLookupName: name,
    presentationIds: presentations,
    presentationFilter: 'none',
    dose,
    doseSourceLabel: 'Modelo clínico do ConsultaVet',
    sourceReviewStatus: 'Revisão de fonte pendente',
    prescriptionText,
  };
}

function dmAppendBuilder(species: DmSpeciesKind, insulin: DmInsulinKind) {
  return (weightKg: number | null) => buildDiabetesAppendSections(species, insulin, weightKg);
}

function toujeoCatManagementSection(): string {
  return `MANEJO ESPECÍFICO DO TOUJEO

• Administrar exclusivamente com a caneta original; nunca aspirar com seringa.
• A caneta administra apenas unidades inteiras; fazer teste de fluxo antes de cada aplicação.
• Manter a agulha inserida por aproximadamente 10 segundos após pressionar o botão.
• Não agitar, diluir ou misturar; a solução deve permanecer límpida e incolor.
• O apetite deve ser observado todos os dias, mesmo que a aplicação não coincida exatamente com a refeição.`;
}

function diabetesTemplate(
  id: string,
  title: string,
  species: 'cão' | 'gato',
  model: ClinicalRecipeModel,
): DocumentTemplate {
  return {
    id,
    title,
    category: 'Endocrinologia',
    document_type: 'recipe',
    species,
    body_plain_text: renderClinicalRecipe(model, getDefaultClinicalOptionKeys(model), null),
    structured_defaults: { clinical_model: model },
    is_global: true,
    is_active: true,
    created_at: NOW,
    updated_at: NOW,
  };
}

const CANINSULIN_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'fixed',
  documentHeading: 'DIABETES MELLITUS — CÃO — CANINSULIN',
  options: [{
    key: 'caninsulin',
    label: 'Caninsulin U-40',
    medications: [medication('caninsulin-dog', 'Insulina lente suína — Caninsulin U-40', {
      min: 0.25, max: 0.5, unit: 'UI/kg', basis: 'weight', route: 'subcutânea', frequency: 'a cada 12 horas', duration: 'uso contínuo',
    }, `1. INSULINA LENTE SUÍNA — CANINSULIN U-40 — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 12 horas, de forma contínua.

Aplicar imediatamente após confirmar que o cão ingeriu a refeição programada.

MANEJO ESPECÍFICO DA CANINSULIN

• Caninsulin possui 40 unidades/mL; utilizar exclusivamente seringa U-40 ou caneta veterinária compatível.
• Antes de cada aplicação, agitar o frasco até a suspensão ficar branca e leitosa; aguardar a espuma desaparecer.
• Não utilizar se houver grumos persistentes, cristais ou alteração de cor.
• Oferecer duas refeições equivalentes separadas por cerca de 12 horas.`, CANINSULIN_PRODUCTS)],
  }],
  appendBodySectionsBuilder: dmAppendBuilder('dog', 'caninsulin-u40'),
  veterinarianNotes: DM_DOSE_ADJUSTMENT_VET_NOTES,
  diseaseRecommendations: [],
  medicationPrecautions: ['Conferir seringa U-40 antes de cada aplicação'],
  returnSigns: [],
};

const NPH_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'fixed',
  documentHeading: 'DIABETES MELLITUS — CÃO — INSULINA NPH',
  options: [{
    key: 'nph',
    label: 'Insulina NPH U-100',
    medications: [medication('nph-dog', 'Insulina NPH U-100', {
      min: 0.25, max: 0.5, unit: 'UI/kg', basis: 'weight', route: 'subcutânea', frequency: 'a cada 12 horas', duration: 'uso contínuo',
    }, `1. INSULINA NPH U-100 — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 12 horas, de forma contínua.

MANEJO ESPECÍFICO DA NPH

• NPH possui 100 unidades/mL; utilizar exclusivamente seringa U-100.
• Preferir seringa de 0,3 mL para doses pequenas, com marcação de meia unidade quando possível.
• Suspensão turva: rolar delicadamente entre as mãos e inverter lentamente até ficar uniformemente turvo; não agitar vigorosamente.
• Não utilizar se permanecerem aglomerados, cristais ou alterações importantes de aparência.
• Duas refeições semelhantes com cerca de 12 horas de intervalo; aplicar após confirmar que o cão comeu.`, NPH_PRODUCTS)],
  }],
  appendBodySectionsBuilder: dmAppendBuilder('dog', 'nph-u100'),
  veterinarianNotes: DM_DOSE_ADJUSTMENT_VET_NOTES,
  diseaseRecommendations: [],
  medicationPrecautions: ['Usar exclusivamente seringa U-100'],
  returnSigns: [],
};

const GLARGINE_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'fixed',
  documentHeading: 'DIABETES MELLITUS — CÃO — GLARGINA U-100',
  options: [{
    key: 'glargine',
    label: 'Glargina U-100',
    medications: [medication('glargine-dog', 'Insulina glargina U-100', {
      min: 0.25, max: 0.5, unit: 'UI/kg', basis: 'weight', route: 'subcutânea', frequency: 'a cada 12 horas', duration: 'uso contínuo',
    }, `1. INSULINA GLARGINA U-100 — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 12 horas, de forma contínua.

MANEJO ESPECÍFICO DA GLARGINA U-100

• Glargina U-100 possui 100 unidades/mL; utilizar seringa U-100 ou caneta compatível.
• Para doses pequenas, preferir seringa U-100 de 0,3 mL com meia unidade.
• Solução límpida e incolor: não agitar, não rolar, não diluir e não misturar na mesma seringa.
• Descartar se turva, com partículas ou alteração de cor.
• Duas refeições semelhantes em horários regulares; aplicar após confirmar que o cão comeu.`, GLARGINE_U100_PRODUCTS)],
  }],
  appendBodySectionsBuilder: dmAppendBuilder('dog', 'glargina-u100'),
  veterinarianNotes: [...DM_DOSE_ADJUSTMENT_VET_NOTES, ...DM_GLARGINE_DOG_VET_NOTES],
  diseaseRecommendations: [],
  medicationPrecautions: ['Não agitar o frasco de glargina'],
  returnSigns: [],
};

const TOUJEO_DOG: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'fixed',
  documentHeading: 'DIABETES MELLITUS — CÃO — TOUJEO U-300',
  incompleteProtocolWarning: 'Protocolo avançado — exige monitoramento contínuo (FreeStyle Libre ou equivalente) no início e durante ajustes.',
  options: [{
    key: 'toujeo',
    label: 'Toujeo U-300',
    medications: [medication('toujeo-dog', 'Insulina glargina U-300 — Toujeo', {
      min: 0.5, unit: 'UI/kg', basis: 'weight', route: 'subcutânea', frequency: 'a cada 24 horas', duration: 'uso contínuo',
    }, `1. INSULINA GLARGINA U-300 — TOUJEO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 24 horas, de forma contínua.

Calcular com base no peso corporal ideal, especialmente em sobrepeso ou obesidade. Arredondar para dose administrável pela caneta, preferencialmente para baixo no início.

MANEJO ESPECÍFICO DO TOUJEO

• Toujeo possui 300 unidades/mL; utilizar exclusivamente a caneta original do fabricante.
• O número no visor corresponde às unidades reais administradas.
• Agulha nova a cada aplicação; teste de fluxo antes de cada dose; manter agulha cerca de 10 segundos após o visor retornar a zero.
• Não agitar, diluir ou misturar; solução límpida e incolor.`, TOUJEO_PRODUCTS)],
  }],
  appendBodySectionsBuilder: dmAppendBuilder('dog', 'toujeo-u300'),
  veterinarianNotes: [...DM_DOSE_ADJUSTMENT_VET_NOTES, ...DM_TOUJEO_ADJUSTMENT_VET_NOTES],
  diseaseRecommendations: [],
  medicationPrecautions: ['Nunca aspirar Toujeo U-300 com seringa convencional'],
  returnSigns: [],
};

const GLARGINE_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'fixed',
  documentHeading: 'DIABETES MELLITUS — GATO — GLARGINA U-100',
  options: [{
    key: 'glargine',
    label: 'Glargina U-100',
    medications: [medication('glargine-cat', 'Insulina glargina U-100', {
      min: 1, max: 2, unit: 'UI/animal', basis: 'per_animal', route: 'subcutânea', frequency: 'a cada 12 horas', duration: 'uso contínuo',
    }, `1. INSULINA GLARGINA U-100 — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 12 horas, de forma contínua.

Para a maioria dos gatos, iniciar com 1 unidade por gato a cada 12 horas.

MANEJO ESPECÍFICO DA GLARGINA U-100

• Utilizar seringa U-100 ou dispositivo compatível; preferir seringa 0,3 mL com meia unidade para doses pequenas.
• Solução límpida e incolor: não agitar, rolar, diluir ou misturar.
• Aplicar a cada 12 horas em horários consistentes; preferível confirmar alimentação antes da aplicação.
• Observar apetite e comportamento nos primeiros meses, pois a necessidade de insulina pode diminuir.`, GLARGINE_U100_PRODUCTS)],
  }],
  appendBodySectionsBuilder: dmAppendBuilder('cat', 'glargina-u100'),
  veterinarianNotes: DM_DOSE_ADJUSTMENT_VET_NOTES,
  diseaseRecommendations: [],
  medicationPrecautions: ['Não agitar o frasco de glargina'],
  returnSigns: [],
};

const TOUJEO_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'single',
  selectorLabel: 'Esquema inicial de Toujeo U-300',
  defaultOptionKey: 'weight-based',
  incompleteProtocolWarning: 'Escolha apenas um esquema. Exige monitoramento contínuo desde o início.',
  options: [
    {
      key: 'weight-based',
      label: 'Por peso — 0,5 UI/kg a cada 24 h',
      medications: [medication('toujeo-cat-weight', 'Insulina glargina U-300 — Toujeo', {
        min: 0.5, unit: 'UI/kg', basis: 'weight', route: 'subcutânea', frequency: 'a cada 24 horas', duration: 'uso contínuo',
      }, `1. INSULINA GLARGINA U-300 — TOUJEO — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 24 horas, de forma contínua.

Calcular com base no peso corporal ideal ou massa magra.`, TOUJEO_PRODUCTS)],
    },
    {
      key: 'fixed-dose',
      label: 'Dose fixa — 2 UI/gato a cada 24 h',
      medications: [medication('toujeo-cat-fixed', 'Insulina glargina U-300 — Toujeo', {
        min: 2, unit: 'UI/animal', basis: 'per_animal', route: 'subcutânea', frequency: 'a cada 24 horas', duration: 'uso contínuo',
      }, `1. INSULINA GLARGINA U-300 — TOUJEO — APRESENTAÇÃO A SELECIONAR

Administrar 2 unidades por gato, por via subcutânea, a cada 24 horas, de forma contínua.`, TOUJEO_PRODUCTS)],
    },
  ],
  appendBodySectionsBuilder: (weightKg) => [toujeoCatManagementSection(), ...buildDiabetesAppendSections('cat', 'toujeo-u300', weightKg)],
  veterinarianNotes: [...DM_DOSE_ADJUSTMENT_VET_NOTES, ...DM_TOUJEO_ADJUSTMENT_VET_NOTES],
  diseaseRecommendations: [],
  medicationPrecautions: ['Nunca aspirar Toujeo U-300 com seringa convencional'],
  returnSigns: [],
};

const CANINSULIN_CAT: ClinicalRecipeModel = {
  schemaVersion: 1,
  careSetting: 'ambulatorial',
  categoryPath: 'Endocrinologia > Diabetes mellitus',
  selectionMode: 'fixed',
  documentHeading: 'DIABETES MELLITUS — GATO — CANINSULIN',
  options: [{
    key: 'caninsulin',
    label: 'Caninsulin U-40',
    medications: [medication('caninsulin-cat', 'Insulina lente suína — Caninsulin U-40', {
      min: 1, max: 2, unit: 'UI/animal', basis: 'per_animal', route: 'subcutânea', frequency: 'a cada 12 horas', duration: 'uso contínuo',
    }, `1. INSULINA LENTE SUÍNA — CANINSULIN U-40 — APRESENTAÇÃO A SELECIONAR

Administrar A PREENCHER por via subcutânea, a cada 12 horas, de forma contínua.

MANEJO ESPECÍFICO DA CANINSULIN

• Utilizar apenas seringa U-40 ou caneta veterinária compatível.
• Agitar até suspensão uniforme branca e leitosa; não utilizar se houver aglomerados persistentes.
• Aplicar após confirmar que o gato está se alimentando; manter quantidade diária de alimento controlada.
• Acompanhar glicemia em casa ou com sensor, conforme orientação da clínica.`, CANINSULIN_PRODUCTS)],
  }],
  appendBodySectionsBuilder: dmAppendBuilder('cat', 'caninsulin-u40'),
  veterinarianNotes: [...DM_DOSE_ADJUSTMENT_VET_NOTES, ...DM_CANINSULIN_CAT_VET_NOTES],
  diseaseRecommendations: [],
  medicationPrecautions: ['Conferir seringa U-40 antes de cada aplicação'],
  returnSigns: [],
};

export const RECEITUARIO_DIABETES_MODELS: DocumentTemplate[] = [
  diabetesTemplate('seed-dm-cao-caninsulin', 'Diabetes mellitus — Cão — Caninsulin', 'cão', CANINSULIN_DOG),
  diabetesTemplate('seed-dm-cao-nph', 'Diabetes mellitus — Cão — Insulina NPH', 'cão', NPH_DOG),
  diabetesTemplate('seed-dm-cao-glargina-u100', 'Diabetes mellitus — Cão — Glargina U-100', 'cão', GLARGINE_DOG),
  diabetesTemplate('seed-dm-cao-toujeo-u300', 'Diabetes mellitus — Cão — Toujeo U-300', 'cão', TOUJEO_DOG),
  diabetesTemplate('seed-dm-gato-glargina-u100', 'Diabetes mellitus — Gato — Glargina U-100', 'gato', GLARGINE_CAT),
  diabetesTemplate('seed-dm-gato-toujeo-u300', 'Diabetes mellitus — Gato — Toujeo U-300', 'gato', TOUJEO_CAT),
  diabetesTemplate('seed-dm-gato-caninsulin', 'Diabetes mellitus — Gato — Caninsulin', 'gato', CANINSULIN_CAT),
];
