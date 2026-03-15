export const consensoFeatureFlags = {
  // Recursos não integrados nesta sprint continuam ocultos para evitar aparência de "falso pronto".
  showDemoBadge: false,
  showEditorialBlocks: true,
  showUserNotes: false,

  dataSource: 'supabase' as 'local-seed' | 'supabase',
  pdfViewerMode: 'react-pdf' as 'external-link' | 'react-pdf',
};
