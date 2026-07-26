export const HOME_ICON_STORAGE_KEY = 'receituario-vet:home-icon:v1'

export interface HomeIconOption {
  id: string
  name: string
  description: string
  src: string
}

export const HOME_ICON_OPTIONS: HomeIconOption[] = [
  {
    id: 'v1',
    name: 'Receita com cruz',
    description: 'Documento com canto dobrado e selo de adição.',
    src: '/apps/receita-neon-v1.png',
  },
  {
    id: 'v2',
    name: 'Duas vias com selo',
    description: 'Duas folhas com selo de ação no canto.',
    src: '/apps/receita-neon-v2.png',
  },
  {
    id: 'v3',
    name: 'Prancheta com confirmação',
    description: 'Visual clínico com check de validação.',
    src: '/apps/receita-neon-v3.png',
  },
  {
    id: 'v4',
    name: 'Receita com escudo',
    description: 'Documento com selo de segurança especial.',
    src: '/apps/receita-neon-v4.png',
  },
  {
    id: 'v5',
    name: 'Receita minimalista',
    description: 'Forma simples com foco no simbolo Rx.',
    src: '/apps/receita-neon-v5.png',
  },
]

export function readHomeIconSelection(): HomeIconOption {
  try {
    const savedId = (localStorage.getItem(HOME_ICON_STORAGE_KEY) || '').trim()
    const match = HOME_ICON_OPTIONS.find((item) => item.id === savedId)
    if (match) return match
  } catch {
    // noop
  }
  return HOME_ICON_OPTIONS[0]
}

export function saveHomeIconSelection(iconId: string): HomeIconOption {
  const match = HOME_ICON_OPTIONS.find((item) => item.id === iconId) || HOME_ICON_OPTIONS[0]
  try {
    localStorage.setItem(HOME_ICON_STORAGE_KEY, match.id)
  } catch {
    // noop
  }
  return match
}
