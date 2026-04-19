export type NeuroFindingEntry = {
  id: string
  slug: string
  title: string
  synonyms: string[]
  category: string
  summary: string
  neuroanatomia: string
  neurofisiologia: string
  localizacao: string
  diferenciais: string[]
  /** Epidemiologia / raças / idade — texto livre */
  populacoes: string
  /** Causas e fatores predisponentes (quando aplicável) */
  etiologia?: string
  /** Alterações estruturais / histológicas típicas */
  patologia?: string
  /** Mecanismos de dano em nível de sistema (pode complementar neurofisiologia) */
  patofisiologia?: string
  /** Epidemiologia explícita; se vazio, usar `populacoes` */
  epidemiologia?: string
  /** Placeholder ou URL em /public quando disponível */
  images?: { src?: string; alt: string; caption: string }[]
  referencias?: string[]
}
