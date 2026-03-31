import { digitsOnly } from './rxInputMasks'

export interface BrazilStateOption {
  uf: string
  name: string
  cities: string[]
}

export interface CepLookupAddress {
  cep: string
  street: string
  district: string
  city: string
  state: string
  complement: string
}

export const BRAZIL_STATES: BrazilStateOption[] = [
  { uf: 'AC', name: 'Acre', cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'] },
  { uf: 'AL', name: 'Alagoas', cities: ['Maceio', 'Arapiraca', 'Palmeira dos Indios'] },
  { uf: 'AP', name: 'Amapa', cities: ['Macapa', 'Santana', 'Laranjal do Jari'] },
  { uf: 'AM', name: 'Amazonas', cities: ['Manaus', 'Parintins', 'Itacoatiara'] },
  { uf: 'BA', name: 'Bahia', cities: ['Salvador', 'Feira de Santana', 'Vitoria da Conquista'] },
  { uf: 'CE', name: 'Ceara', cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'] },
  { uf: 'DF', name: 'Distrito Federal', cities: ['Brasilia', 'Taguatinga', 'Ceilandia'] },
  { uf: 'ES', name: 'Espirito Santo', cities: ['Vitoria', 'Vila Velha', 'Serra'] },
  { uf: 'GO', name: 'Goias', cities: ['Goiania', 'Aparecida de Goiania', 'Anapolis'] },
  { uf: 'MA', name: 'Maranhao', cities: ['Sao Luis', 'Imperatriz', 'Caxias'] },
  { uf: 'MT', name: 'Mato Grosso', cities: ['Cuiaba', 'Varzea Grande', 'Rondonopolis'] },
  { uf: 'MS', name: 'Mato Grosso do Sul', cities: ['Campo Grande', 'Dourados', 'Tres Lagoas'] },
  { uf: 'MG', name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlandia', 'Contagem'] },
  { uf: 'PA', name: 'Para', cities: ['Belem', 'Ananindeua', 'Santarem'] },
  { uf: 'PB', name: 'Paraiba', cities: ['Joao Pessoa', 'Campina Grande', 'Patos'] },
  { uf: 'PR', name: 'Parana', cities: ['Curitiba', 'Londrina', 'Maringa'] },
  { uf: 'PE', name: 'Pernambuco', cities: ['Recife', 'Jaboatao dos Guararapes', 'Caruaru'] },
  { uf: 'PI', name: 'Piaui', cities: ['Teresina', 'Parnaiba', 'Picos'] },
  { uf: 'RJ', name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niteroi', 'Nova Iguacu'] },
  { uf: 'RN', name: 'Rio Grande do Norte', cities: ['Natal', 'Mossoro', 'Parnamirim'] },
  { uf: 'RS', name: 'Rio Grande do Sul', cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas'] },
  { uf: 'RO', name: 'Rondonia', cities: ['Porto Velho', 'Ji-Parana', 'Ariquemes'] },
  { uf: 'RR', name: 'Roraima', cities: ['Boa Vista', 'Rorainopolis', 'Caracarai'] },
  { uf: 'SC', name: 'Santa Catarina', cities: ['Florianopolis', 'Joinville', 'Blumenau'] },
  { uf: 'SP', name: 'Sao Paulo', cities: ['Sao Paulo', 'Campinas', 'Santos'] },
  { uf: 'SE', name: 'Sergipe', cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'] },
  { uf: 'TO', name: 'Tocantins', cities: ['Palmas', 'Araguaina', 'Gurupi'] },
]

export const BRAZIL_STATE_OPTIONS = BRAZIL_STATES.map((entry) => ({
  value: entry.uf,
  label: `${entry.uf} - ${entry.name}`
}))

export const BRAZIL_STATE_SUGGESTIONS = BRAZIL_STATE_OPTIONS.map(opt => opt.label)

export function normalizeStateInput(value: string): string {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const upper = raw.toUpperCase()
  const byUf = BRAZIL_STATES.find((entry) => entry.uf === upper)
  if (byUf) return byUf.uf
  const byLabel = BRAZIL_STATES.find((entry) => `${entry.uf} - ${entry.name}`.toLowerCase() === raw.toLowerCase())
  if (byLabel) return byLabel.uf
  const byName = BRAZIL_STATES.find((entry) => entry.name.toLowerCase() === raw.toLowerCase())
  if (byName) return byName.uf
  return upper.slice(0, 2)
}

export function stateLabelFromUf(uf: string): string {
  const normalized = normalizeStateInput(uf)
  const found = BRAZIL_STATES.find((entry) => entry.uf === normalized)
  if (!found) return uf
  return `${found.uf} - ${found.name}`
}

export function citySuggestionsForState(stateInput: string): string[] {
  const normalized = normalizeStateInput(stateInput)
  const found = BRAZIL_STATES.find((entry) => entry.uf === normalized)
  if (found) return found.cities
  return Array.from(new Set(BRAZIL_STATES.flatMap((entry) => entry.cities)))
}

export async function lookupAddressByCep(cep: string): Promise<CepLookupAddress | null> {
  const digits = digitsOnly(cep).slice(0, 8)
  if (digits.length !== 8) return null
  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
    if (!response.ok) return null
    const payload = (await response.json()) as {
      erro?: boolean
      cep?: string
      logradouro?: string
      bairro?: string
      localidade?: string
      uf?: string
      complemento?: string
    }
    if (payload.erro) return null
    return {
      cep: payload.cep || `${digits.slice(0, 5)}-${digits.slice(5)}`,
      street: payload.logradouro || '',
      district: payload.bairro || '',
      city: payload.localidade || '',
      state: normalizeStateInput(payload.uf || ''),
      complement: payload.complemento || '',
    }
  } catch {
    return null
  }
}
