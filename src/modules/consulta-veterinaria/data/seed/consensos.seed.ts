import { demonstrativeContentFlag } from '../mocks/contentFlags'
import { cinomoseReferenceSeed } from './references.seed'
import type { ConsensusRecord } from '../../types/consenso'

const now = '2026-03-07T12:00:00.000Z'

export const consensosSeed: ConsensusRecord[] = [
  {
    ...demonstrativeContentFlag,
    id: 'consensus-cinomose-demo',
    slug: 'consenso-cinomose-canina-demo',
    title: 'Consenso Demonstrativo de Abordagem Clínica da Cinomose Canina',
    shortTitle: 'Consenso Cinomose Demo',
    category: 'infectologia',
    subcategory: 'neurologia-infecciosa',
    species: 'dog',
    sourceOrganization: 'VETIUS Clinical Review',
    year: 2026,
    authors: ['Equipe VETIUS', 'Curadoria demonstrativa'],
    tags: ['cinomose', 'cdv', 'infectologia', 'pdf', 'demo'],
    summary: 'PDF demonstrativo para validar leitura, favoritos, progresso e ligação bidirecional com doença e medicamentos.',
    articleSummaryRichText: `
      <p><strong>Conteúdo demonstrativo.</strong> Este resumo interno prova a estrutura editorial do módulo antes da curadoria definitiva.</p>
      <h4>Visão geral</h4>
      <ul>
        <li>Enfatiza suspeita clínica em pacientes jovens e não vacinados.</li>
        <li>Organiza suporte intensivo, monitorização e interpretação de exames.</li>
        <li>Relaciona manejo neurológico, suporte GI e infecções secundárias.</li>
      </ul>
      <h4>Principais recomendações</h4>
      <ul>
        <li>Priorizar suporte e isolamento quando a síndrome multissistêmica estiver presente.</li>
        <li>Usar o contexto clínico junto de testes diretos e indiretos.</li>
        <li>Monitorar progressão neurológica e perfusão com reavaliações seriadas.</li>
      </ul>
    `,
    adminNotesRichText: `
      <p><strong>Nota global do administrador.</strong> Seed local criado para provar o leitor de PDF e o fluxo de estudo guiado.</p>
      <ul>
        <li>Substituir o PDF por consenso oficial assim que a curadoria estiver pronta.</li>
        <li>Manter destaque para interpretação clínica e limitações diagnósticas.</li>
      </ul>
    `,
    pdfUrl: '/consulta-veterinaria/consenso-cinomose-demo.pdf',
    pdfFileName: 'consenso-cinomose-canina-demo.pdf',
    relatedDiseaseSlugs: ['cinomose-canina'],
    relatedMedicationSlugs: ['diazepam-demo', 'maropitant-demo', 'amoxicilina-clavulanato-demo'],
    references: cinomoseReferenceSeed,
    isDraft: false,
    createdAt: now,
    updatedAt: now,
  },
]

