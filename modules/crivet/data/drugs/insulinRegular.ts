import type { IndicatedDose } from '../../types/drug'

export const insulinRegularPresentations = [
  { label: 'Insulina Regular 100 U/mL (frasco 10 mL)', mgPerMl: 100 },
  { label: 'Insulina Regular 100 U/mL (frasco 3 mL)', mgPerMl: 100 },
  { label: 'Insulina diluída 1 U/mL (preparo)', mgPerMl: 1 },
  { label: 'Insulina diluída 0.5 U/mL (preparo)', mgPerMl: 0.5 },
]

export const insulinRegularRecommendedUnit = 'U/kg/h'
export const insulinRegularRecommendedUnitWhy = [
  'Unidade padrão para insulina em CRI para tratamento de cetoacidose diabética (CAD).',
  'Dose é em UNIDADES por kg por hora (U/kg/h), não mg/kg/h.',
  'Permite titulação fina conforme resposta glicêmica seriada.',
  'Meta: reduzir glicemia gradualmente (50–75 mg/dL/h).',
  'IMPORTANTE: Frasco comercial tem 100 U/mL — SEMPRE diluir antes de usar IV.',
]

export const insulinRegularIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão - CAD
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'U/kg/h',
    range: { min: 0.05, max: 0.1 },
    purpose: 'Cetoacidose diabética (CAD) - Dose inicial/padrão',
    note: 'CRI contínua é o padrão ouro para CAD. Iniciar com 0.05–0.1 U/kg/h. Reavaliar glicemia a cada 1–2 h. Meta: reduzir glicemia 50–75 mg/dL/h. Titular ±0.02–0.05 U/kg/h conforme resposta. Monitorar potássio sérico seriado (hipocalemia é comum). Diluir frasco 100 U/mL para 1 U/mL (1 mL + 99 mL NaCl) antes do uso.',
  },
  // CRI - Cão - CAD dose alta
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'U/kg/h',
    range: { min: 0.1, max: 0.2 },
    purpose: 'CAD - Dose alta se resistência à insulina',
    note: 'Usar apenas se dose inicial (0.05–0.1 U/kg/h) não reduz glicemia após 2–4 h. Reavaliar causas de resistência (infecção, estresse, medicações). Teto máximo: 0.2 U/kg/h. Continuar monitoramento glicemia e potássio seriado.',
  },
  // CRI - Gato - CAD
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'U/kg/h',
    range: { min: 0.025, max: 0.05 },
    purpose: 'CAD - Gatos (mais sensíveis)',
    note: 'Gatos são mais sensíveis a insulina. Iniciar com 0.025–0.05 U/kg/h. Reavaliar glicemia a cada 1–2 h. Titular ±0.01–0.02 U/kg/h conforme resposta. Risco alto de hipoglicemia — monitorar rigorosamente. Teto: 0.1 U/kg/h. Diluir frasco 100 U/mL para 0.5 U/mL (0.5 mL + 99.5 mL NaCl) antes do uso.',
  },
  // Bolus IM - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'U/kg',
    range: { min: 0.1, max: 0.2 },
    purpose: 'IM intermitente (alternativa quando não há bomba)',
    note: 'Alternativa quando não há bomba de infusão disponível. Aplicar IM a cada 4–6 h. Monitorar glicemia a cada 2–4 h e ajustar próximo bolus conforme resposta. Preferir CRI sempre que possível.',
  },
  // Bolus IM - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'U/kg',
    range: { min: 0.05, max: 0.1 },
    purpose: 'IM intermitente (uso com cautela)',
    note: 'Uso com cautela em gatos — risco alto de hipoglicemia. Aplicar IM a cada 4–6 h. Monitorar glicemia rigorosamente. Preferir CRI sempre que possível para maior segurança.',
  },
]
