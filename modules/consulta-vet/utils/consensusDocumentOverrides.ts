type ConsensusDocumentOverride = {
  year?: number;
  description?: string;
  filePath: string;
  fileUrl: string;
  fileName: string;
};

const BUNDLED_CONSENSUS_DOCUMENTS: Record<string, ConsensusDocumentOverride> = {
  'icatcare-dtuif-felina-2025': {
    description:
      'Consenso iCatCare 2025 para diagnóstico e manejo das doenças do trato urinário inferior em gatos.',
    filePath: 'documents/consulta-vet/consensos/icatcare-dtuif-felina-2025.pdf',
    fileUrl: '/documents/consulta-vet/consensos/icatcare-dtuif-felina-2025.pdf',
    fileName: 'icatcare-dtuif-felina-2025.pdf',
  },
  'leishmaniose-brasileiro-2020': {
    year: 2025,
    description:
      'Diretrizes Brasileish 2025 para diagnóstico, tratamento e prevenção da leishmaniose canina na América Latina.',
    filePath: 'documents/consulta-vet/consensos/brasileish-leishmaniose-canina-2025.pdf',
    fileUrl: '/documents/consulta-vet/consensos/brasileish-leishmaniose-canina-2025.pdf',
    fileName: 'brasileish-leishmaniose-canina-2025.pdf',
  },
};

export function getConsensusDocumentOverride(
  slug: string
): ConsensusDocumentOverride | null {
  return BUNDLED_CONSENSUS_DOCUMENTS[slug] || null;
}
