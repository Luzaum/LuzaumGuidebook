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
    range: { min: 0.025, max: 0.1 },
    purpose: 'Cetoacidose diabética (CAD) / Síndrome hiperglicêmica hiperosmolar (HHS)',
    note: '🔴 FISIOLOGIA: Em CAD/HHS, o objetivo primário é reverter a cetogênese e reduzir glicose de forma GRADUAL (~50–75 mg/dL/h), NÃO normalizar rapidamente. A queda rápida aumenta risco de edema cerebral (HHS) e hipocalemia/hipofosfatemia por shift eletrolítico. A insulina promove captação celular de glicose, mas também desloca K+, P e Mg para o intracelular. Sem fluidoterapia adequada e correção eletrolítica, a insulina pode piorar perfusão. Em CAD, a meta é resolver cetose mantendo glicose suficiente (200–250 mg/dL) para continuar infundindo insulina. Em HHS, a dose é ~50% menor e pode ser postergada até hidratação adequada para evitar queda rápida de osmolalidade. 🟢 PROTOCOLO: CRI IV é preferível (ou IM intermitente se não houver bomba). Preparar diluição 1 U/mL (1 mL U-100 + 99 mL NaCl) ou protocolo "bolsa 250 mL" (2,2 U/kg em 250 mL, iniciar 10 mL/h). Prime ~50 mL para saturar adsorção ao plástico. Monitorar glicemia q1–2h inicialmente e K+/P/Mg seriados. Iniciar dextrose no fluido quando BG < 250 mg/dL para manter insulina e resolver cetose.',
  },
  // CRI - Gato - CAD
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'U/kg/h',
    range: { min: 0.0125, max: 0.05 },
    purpose: 'CAD/HHS — Gatos (mais sensíveis)',
    note: '🔴 FISIOLOGIA: Gatos têm menor reserva gliconeogênica e maior sensibilidade a insulina comparado a cães. O risco de hipoglicemia silenciosa é maior, especialmente com doses > 0.05 U/kg/h. A resposta varia mais entre indivíduos. Protocolos conservadores (0.0125–0.05 U/kg/h inicial) são seguros e efetivos. Gatos tendem a receber menos insulina efetiva quando se usa sliding-scale ajustado por glicemia. Alguns protocolos usam preparo "bolsa 250 mL" com 1,1 U/kg total (vs 2,2 U/kg em cães). 🟢 PROTOCOLO: Preparar bolsa com 1,1 U/kg em 250 mL NaCl, prime 50 mL, iniciar 5–10 mL/h e ajustar por sliding-scale. Ou diluir para 0.5 U/mL (0.5 mL U-100 + 99.5 mL NaCl). Monitorar glicemia q1–2h rigorosamente. Iniciar dextrose quando BG < 250 mg/dL. Teto: 0.1 U/kg/h.',
  },
  // Bolus IM - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'U/kg',
    range: { min: 0.2, max: 0.25 },
    purpose: 'IM intermitente (alternativa quando não há bomba)',
    note: 'ALTERNATIVA se não há bomba: 0,2–0,25 U/kg IM inicial, depois 0,1 U/kg IM q2–4h (ajustar ±25%). Evitar SC no início se desidratado/hipotenso. Preferir CRI sempre que possível.',
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
