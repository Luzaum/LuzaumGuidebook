/**
 * Vínculos editoriais doença → consenso quando o seed individual está vazio ou incompleto.
 * Mescla com relatedConsensusSlugs já definidos no registro (sem duplicar).
 */
export const DISEASE_CONSENSUS_LINKS: Record<string, string[]> = {
  'doenca-renal-cronica-caes-gatos': ['iris-lra-2026', 'isfm-drc-felina-2016', 'consenso-cardiorrenal-2015'],
  'hipertireoidismo-felino': [
    'aafp-hipertireoidismo-felino-2016',
    'alive-tireoide-cycle-3-2026',
    'aaha-endocrinopatias-caes-gatos-2023',
  ],
  'hipertensao-arterial-sistemica-caes-gatos': ['hipertensao-sistemica', 'consenso-cardiorrenal-2015'],
  'doenca-valvar-mitral-degenerativa-caes': ['acvim-mmvd-canina-2019', 'acvim-valvular-canina-2009'],
  'cardiomiopatia-hipertrofica-caes-gatos': ['acvim-cardiomiopatias-felinas-2020', 'curative-risco-trombotico-2022'],
  'cardiomiopatia-dilatada-caes-gatos': ['esvc-dcm-canina-2003', 'dcm-screening-caes-2022'],
  'cardiomiopatia-restritiva-felina': ['acvim-cardiomiopatias-felinas-2020'],
  'arritmias-cardiacas-caes-gatos': ['acvim-cardiomiopatias-felinas-2020'],
  'sindrome-cushing-caes': ['acvim-hipercortisolismo-canino-2012', 'alive-adrenais-cycle-2-2025'],
  'sindrome-cushing-gatos': ['alive-adrenais-cycle-2-2025', 'aaha-endocrinopatias-caes-gatos-2023'],
  'hipoadrenocorticismo-addison': ['alive-adrenais-cycle-2-2025', 'aaha-endocrinopatias-caes-gatos-2023'],
  'diabetes-mellitus-canina': ['aaha-diabetes-caes-gatos-2018-2022', 'alive-diabetes-cycle-1-2022'],
  'diabetes-mellitus-felina': [
    'aaha-diabetes-felino-2026',
    'icatcare-diabetes-felino-2025',
    'isfm-diabetes-felino-2015',
  ],
  'cetoacidose-diabetica-caes-gatos': ['aaha-diabetes-felino-2026', 'aaha-diabetes-caes-gatos-2018-2022'],
  'hipotireoidismo-adquirido-caes-gatos': ['alive-tireoide-cycle-3-2026', 'aaha-endocrinopatias-caes-gatos-2023'],
  'hipotireoidismo-congenito-caes-gatos': ['alive-tireoide-cycle-3-2026'],
  'doencas-trato-urinario-inferior-felino-dtuif': [
    'icatcare-dtuif-felina-2025',
    'acvim-urolitiase-caes-gatos-2016',
    'iscaid-itu-caes-gatos-2019',
  ],
  'peritonite-infecciosa-felina': ['abcd-fip-2023', 'abcd-fip-tratamento-2026', 'aafp-fip-diagnostico-2022'],
  'leucemia-viral-felina': ['aafp-retrovirus-felino-2020'],
  'imunodeficiencia-felina-fiv': ['aafp-retrovirus-felino-2020'],
  'giardiase-caes-gatos': ['acvim-cie-caes-2026'],
  'insuficiencia-pancreatica-exocrina-caes-gatos': ['acvim-cie-caes-2026'],
  'micoplasmoses-hemotropicas': ['veccs-sepse-definicao-caes-gatos-2026'],
  'babesiose-canina': ['veccs-sepse-definicao-caes-gatos-2026'],
  'erliquiose-monocitica-canina': ['veccs-sepse-definicao-caes-gatos-2026'],
  'mastite-caes-gatos': ['veccs-sepse-definicao-caes-gatos-2026'],
  'hiperparatireoidismo-caes-gatos': ['aaha-endocrinopatias-caes-gatos-2023'],
  'doenca-do-disco-intervertebral-caes': ['acvim-ivdd-canina-2022'],
  'dermatite-atopica-canina': ['icada-dermatite-atopica-canina-2015'],
  'sindrome-cutanea-atopica-felina': ['icada-sindrome-cutanea-atopica-felina-2021'],
  'leishmaniose-visceral-canina': ['leishmaniose-brasileiro-2020'],
};

export function mergeConsensusSlugsForDisease(slug: string, existing: string[] = []): string[] {
  const extra = DISEASE_CONSENSUS_LINKS[slug] ?? [];
  return [...new Set([...existing, ...extra])];
}
