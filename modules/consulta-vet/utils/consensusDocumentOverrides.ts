type ConsensusDocumentOverride = {
  year?: number;
  description?: string;
  filePath: string;
  fileUrl: string;
  fileName: string;
};

type ConsensusDocumentMetadata = Omit<
  ConsensusDocumentOverride,
  'filePath' | 'fileUrl' | 'fileName'
>;

function bundledConsensusPdf(
  fileName: string,
  metadata: ConsensusDocumentMetadata = {}
): ConsensusDocumentOverride {
  const filePath = `documents/consulta-vet/consensos/${fileName}`;
  return {
    ...metadata,
    filePath,
    fileUrl: `/${filePath}`,
    fileName,
  };
}

const BUNDLED_CONSENSUS_DOCUMENTS: Record<string, ConsensusDocumentOverride> = {
  'icatcare-dtuif-felina-2025': bundledConsensusPdf('icatcare-dtuif-felina-2025.pdf', {
    description:
      'Consenso iCatCare 2025 para diagnóstico e manejo das doenças do trato urinário inferior em gatos.',
  }),
  'leishmaniose-brasileiro-2020': bundledConsensusPdf(
    'brasileish-leishmaniose-canina-2025.pdf',
    {
      year: 2025,
      description:
        'Diretrizes Brasileish 2025 para diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina.',
    }
  ),

  'acvim-mmvd-canina-2019': bundledConsensusPdf('acvim-mmvd-canina-2019.pdf'),
  'acvim-cardiomiopatias-felinas-2020': bundledConsensusPdf(
    'acvim-cardiomiopatias-felinas-2020.pdf'
  ),
  'acvim-hipertensao-pulmonar-canina-2020': bundledConsensusPdf(
    'acvim-hipertensao-pulmonar-canina-2020.pdf'
  ),
  'esvc-dcm-canina-2003': bundledConsensusPdf('esvc-dcm-canina-2003.pdf'),
  'esvc-dcm-dobermann-2017': bundledConsensusPdf('esvc-dcm-dobermann-2017.pdf'),
  'curative-risco-trombotico-2022': bundledConsensusPdf(
    'curative-risco-trombotico-2022.pdf'
  ),
  'consenso-cardiorrenal-2015': bundledConsensusPdf('consenso-cardiorrenal-2015.pdf'),
  'acvim-valvular-canina-2009': bundledConsensusPdf('acvim-valvular-canina-2009.pdf'),
  'hipertensao-sistemica': bundledConsensusPdf('acvim-hipertensao-sistemica-2018.pdf'),

  'aaha-diabetes-felino-2026': bundledConsensusPdf('aaha-diabetes-felino-2026.pdf'),
  'icatcare-diabetes-felino-2025': bundledConsensusPdf(
    'icatcare-diabetes-felino-2025.pdf'
  ),
  'aafp-hipertireoidismo-felino-2016': bundledConsensusPdf(
    'aafp-hipertireoidismo-felino-2016.pdf'
  ),
  'acvim-hipercortisolismo-canino-2012': bundledConsensusPdf(
    'acvim-hipercortisolismo-canino-2012.pdf'
  ),
  'alive-diabetes-cycle-1-2022': bundledConsensusPdf('alive-diabetes-cycle-1-2022.pdf'),
  'alive-adrenais-cycle-2-2025': bundledConsensusPdf('alive-adrenais-cycle-2-2025.pdf'),
  'alive-tireoide-cycle-3-2026': bundledConsensusPdf('alive-tireoide-cycle-3-2026.pdf'),
  'isfm-diabetes-felino-2015': bundledConsensusPdf('isfm-diabetes-felino-2015.pdf'),

  'iris-lra-2026': bundledConsensusPdf('iris-lra-2026.pdf'),
  'iscaid-itu-caes-gatos-2019': bundledConsensusPdf('iscaid-itu-caes-gatos-2019.pdf'),
  'acvim-urolitiase-caes-gatos-2016': bundledConsensusPdf(
    'acvim-urolitiase-caes-gatos-2016.pdf'
  ),
  'acvim-incontinencia-urinaria-canina-2024': bundledConsensusPdf(
    'acvim-incontinencia-urinaria-canina-2024.pdf'
  ),
  'iris-doenca-glomerular-canina-2013': bundledConsensusPdf(
    'iris-doenca-glomerular-canina-2013.pdf'
  ),
  'isfm-drc-felina-2016': bundledConsensusPdf('isfm-drc-felina-2016.pdf'),
  'acvim-proteinuria-caes-gatos-2005': bundledConsensusPdf(
    'acvim-proteinuria-caes-gatos-2005.pdf'
  ),
  'iris-drc-2023': bundledConsensusPdf('iris-drc-2026.pdf'),
};

export function getConsensusDocumentOverride(
  slug: string
): ConsensusDocumentOverride | null {
  return BUNDLED_CONSENSUS_DOCUMENTS[slug] || null;
}
