export const consensoFeatureFlags = {
  // Enquanto os dados forem de seed local, não exibimos blocos editoriais para evitar "falso pronto".
  showDemoBadge: false,
  showEditorialBlocks: false,
  showUserNotes: false,

  // Preparação da próxima sprint.
  dataSource: 'local-seed' as 'local-seed' | 'supabase',
  pdfViewerMode: 'external-link' as 'external-link' | 'react-pdf',
}

