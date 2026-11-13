export const miniAppLoaders = {
  '/calculadora-energetica': () => import('./energia-vet/App'),
  '/fluidoterapia-vet': () => import('./fluidoterapia-vet'),
  '/antibioticoterapia': () => import('./antibioticoterapia-vet'),
  '/transfusao-sanguinea': () => import('../pages/TransfusaoSanguineaPage').then((m) => ({ default: m.TransfusaoSanguineaPage })),
  '/neurologia': () => import('../pages/NeurologiaPage').then((m) => ({ default: m.NeurologiaPage })),
  '/dor': () => import('./escalas-dor/App'),
  '/consulta-vet/referencias-rapidas/oncologia': () => import('./consulta-vet/pages/quickReferences/OncologyReferencePage').then((m) => ({ default: m.OncologyReferencePage })),
  '/consulta-vet/referencias-rapidas/vhs': () => import('./consulta-vet/pages/quickReferences/VhsReferencePage').then((m) => ({ default: m.VhsReferencePage })),
  '/consulta-vet/referencias-rapidas/ultrassom': () => import('./consulta-vet/pages/quickReferences/UltrasoundReferencePage').then((m) => ({ default: m.UltrasoundReferencePage })),
  '/consulta-vet/referencias-rapidas/apple': () => import('./consulta-vet/pages/quickReferences/AppleScorePage').then((m) => ({ default: m.AppleScorePage })),
  '/consulta-vet/referencias-rapidas/sara': () => import('./consulta-vet/pages/quickReferences/ArdsVetPage').then((m) => ({ default: m.ArdsVetPage })),
}

export function preloadMiniApp(route: string) {
  const load = miniAppLoaders[route as keyof typeof miniAppLoaders]
  // A speculative load failure should not interrupt the catalog.
  if (load) void load().catch(() => {})
}
