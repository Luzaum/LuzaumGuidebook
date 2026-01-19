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
    note: '🔴 **FISIOLOGIA**: O alvo na CAD é **parar a cetogênese**, não normalizar a glicemia imediatamente. A insulina permite o uso da glicose pela célula, mas também desloca **Potássio (K+)** e Fósforo para dentro dela — risco de arritmias se não houver reposição.\n\n⚠️ **SEGURANÇA**: A queda da glicemia deve ser **GRADUAL (50–75 mg/dL/h)**. Se cair muito rápido, há risco de edema cerebral.\n\n🟢 **PROTOCOLO**: Use CRI IV ou protocolo de "Bolsa de 250 mL". Quando a glicemia baixar de **250 mg/dL**, NÃO PARE A INSULINA! Adicione **dextrose** ao fluido do paciente para continuar tratando a cetose sem causar hipoglicemia.',
  },
  // CRI - Gato - CAD
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'U/kg/h',
    range: { min: 0.0125, max: 0.05 },
    purpose: 'CAD/HHS — Gatos (mais sensíveis)',
    note: '🔴 **FISIOLOGIA**: Gatos têm menor reserva e maior sensibilidade. Hipoglicemia silenciosa é risco real. O alvo é reverter a cetose com segurança.\n\n⚠️ **SEGURANÇA**: Cautela com doses > 0.05 U/kg/h. Gatos são muito sensíveis a shifts de **Potássio (K+)**. Monitorar eletrólitos é lei.\n\n🟢 **PROTOCOLO**: Use doses conservadoras (comece com ~1.1 U/kg na bolsa de 250 mL). Quando a glicemia baixar de **250 mg/dL**, inicie dextrose. Ajuste pela tabela (sliding-scale) com rigor.',
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
import type { UnitSafetyBlock } from '../../types/drug'

export const insulinSafetyBlocks: UnitSafetyBlock[] = [
  {
    block_if_unit: ['mcg/kg/h', 'mg/kg/h', 'mcg/kg/min'],
    message: 'Insulina regular é sempre em U/kg/h (nunca em massa).',
  },
]
