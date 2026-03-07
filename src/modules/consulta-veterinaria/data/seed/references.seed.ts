import type { ReferenceItem } from '../../types/reference'

export const cinomoseReferenceSeed: ReferenceItem[] = [
  {
    id: 'ref-cinomose-book-demo',
    citationText: 'Livro texto de medicina interna e infectologia veterinária. Conteúdo demonstrativo usado como placeholder de referência.',
    sourceType: 'book',
    notes: 'Substituir por edição e autores reais na curadoria final.',
  },
  {
    id: 'ref-cinomose-vacina-demo',
    citationText: 'Guideline de vacinação canina e felina. Conteúdo demonstrativo usado para validar a arquitetura de referências.',
    sourceType: 'consensus',
    notes: 'Atualizar com guideline oficial utilizado pela equipe.',
  },
  {
    id: 'ref-cinomose-site-demo',
    citationText: 'Resumo clínico demonstrativo do módulo Consulta Veterinária VETIUS.',
    sourceType: 'website',
    url: '/consulta-veterinaria/consensos/consenso-cinomose-canina-demo',
  },
]

export const medicationReferenceSeed: ReferenceItem[] = [
  {
    id: 'ref-medication-demo-1',
    citationText: 'Bulário veterinário demonstrativo para testes de layout. Não usar como única fonte terapêutica.',
    sourceType: 'book',
  },
  {
    id: 'ref-medication-demo-2',
    citationText: 'Resumo de doses demonstrativas vinculado ao seed local do módulo.',
    sourceType: 'website',
  },
]
