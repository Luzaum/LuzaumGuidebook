import type { IndicatedDose } from '../../types/drug'

export const insulinRegularPresentations = [
  { label: 'Insulina Regular 100 U/mL (frasco 10 mL)', mgPerMl: 100 },
  { label: 'Insulina Regular 100 U/mL (frasco 3 mL)', mgPerMl: 100 },
  { label: 'Insulina diluÃ­da 1 U/mL (preparo)', mgPerMl: 1 },
  { label: 'Insulina diluÃ­da 0.5 U/mL (preparo)', mgPerMl: 0.5 },
],

export const insulinRegularRecommendedUnit = 'U/kg/h'
export const insulinRegularRecommendedUnitWhy = [
  'Unidade padrÃ£o para insulina em CRI para tratamento de cetoacidose diabÃ©tica (CAD).',
  'Dose Ã© em UNIDADES por kg por hora (U/kg/h), nÃ£o mg/kg/h.',
  'Permite titulaÃ§Ã£o fina conforme resposta glicÃªmica seriada.',
  'Meta: reduzir glicemia gradualmente (50â€“75 mg/dL/h).',
  'IMPORTANTE: Frasco comercial tem 100 U/mL â€” SEMPRE diluir antes de usar IV.',
],

export const insulinRegularIndicatedDoses: IndicatedDose[], = [
  // CRI - CÃ£o - CAD
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'U/kg/h',
    range: { min: 0.025, max: 0.1 },
    purpose: 'Cetoacidose diabÃ©tica (CAD) / SÃ­ndrome hiperglicÃªmica hiperosmolar (HHS)',
    note: 'ðŸ”´ **FISIOLOGIA**: O alvo na CAD Ã© **parar a cetogÃªnese**, nÃ£o normalizar a glicemia imediatamente. A insulina permite o uso da glicose pela cÃ©lula, mas tambÃ©m desloca **PotÃ¡ssio (K+)** e FÃ³sforo para dentro dela â€” risco de arritmias se nÃ£o houver reposiÃ§Ã£o.\n\nâš ï¸ **SEGURANÃ‡A**: A queda da glicemia deve ser **GRADUAL (50â€“75 mg/dL/h)**. Se cair muito rÃ¡pido, hÃ¡ risco de edema cerebral.\n\nðŸŸ¢ **PROTOCOLO**: Use CRI IV ou protocolo de "Bolsa de 250 mL". Quando a glicemia baixar de **250 mg/dL**, NÃƒO PARE A INSULINA! Adicione **dextrose** ao fluido do paciente para continuar tratando a cetose sem causar hipoglicemia.',
  },
  // CRI - Gato - CAD
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'U/kg/h',
    range: { min: 0.0125, max: 0.05 },
    purpose: 'CAD/HHS â€” Gatos (mais sensÃ­veis)',
    note: 'ðŸ”´ **FISIOLOGIA**: Gatos tÃªm menor reserva e maior sensibilidade. Hipoglicemia silenciosa Ã© risco real. O alvo Ã© reverter a cetose com seguranÃ§a.\n\nâš ï¸ **SEGURANÃ‡A**: Cautela com doses > 0.05 U/kg/h. Gatos sÃ£o muito sensÃ­veis a shifts de **PotÃ¡ssio (K+)**. Monitorar eletrÃ³litos Ã© lei.\n\nðŸŸ¢ **PROTOCOLO**: Use doses conservadoras (comece com ~1.1 U/kg na bolsa de 250 mL). Quando a glicemia baixar de **250 mg/dL**, inicie dextrose. Ajuste pela tabela (sliding-scale) com rigor.',
  },
  // Bolus IM - CÃ£o
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'U/kg',
    range: { min: 0.2, max: 0.25 },
    purpose: 'IM intermitente (alternativa quando nÃ£o hÃ¡ bomba)',
    note: 'ALTERNATIVA se nÃ£o hÃ¡ bomba: 0,2â€“0,25 U/kg IM inicial, depois 0,1 U/kg IM q2â€“4h (ajustar Â±25%). Evitar SC no inÃ­cio se desidratado/hipotenso. Preferir CRI sempre que possÃ­vel.',
  },
  // Bolus IM - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'U/kg',
    range: { min: 0.05, max: 0.1 },
    purpose: 'IM intermitente (uso com cautela)',
    note: 'Uso com cautela em gatos â€” risco alto de hipoglicemia. Aplicar IM a cada 4â€“6 h. Monitorar glicemia rigorosamente. Preferir CRI sempre que possÃ­vel para maior seguranÃ§a.',
  },
],
