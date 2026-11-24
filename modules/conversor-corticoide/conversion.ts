export interface Corticoid {
  id: string
  name: string
  equivalentMg?: number
  duration: string
  mineral: string
  note: string
}

// Equivalent-dose column, not the independently rounded potency column.
// Plumb 10th ed., printed p.1491 (PDF p.1518); see clinical-sources.md.
export const corticoids: Corticoid[] = [
  { id: 'prednisolona', name: 'Prednisolona', equivalentMg: 5, duration: '12–36 h', mineral: 'Presente', note: 'Em gatos, preferir prednisolona à prednisona. A equivalência não incorpora diferenças de biodisponibilidade.' },
  { id: 'prednisona', name: 'Prednisona', equivalentMg: 5, duration: 'Intermediária após ativação', mineral: 'Presente', note: 'Pró-fármaco que depende de conversão à prednisolona. Em gatos, a exposição após administração oral é menos previsível; prefira prednisolona.' },
  { id: 'dexametasona', name: 'Dexametasona', equivalentMg: 0.75, duration: '36–54 h', mineral: 'Ausente', note: 'Ação prolongada. Não manter automaticamente o intervalo da prednisolona. Conferir se o rótulo expressa dexametasona base ou seu sal.' },
  { id: 'metilprednisolona', name: 'Metilprednisolona', equivalentMg: 4, duration: '12–36 h', mineral: 'Desprezível', note: 'Esta equivalência não se aplica à liberação prolongada do acetato injetável. Não converter protocolos de pulsoterapia por esta tabela.' },
  { id: 'hidrocortisona', name: 'Hidrocortisona (cortisol)', equivalentMg: 20, duration: '8–12 h', mineral: 'Presente', note: 'Ação curta e atividade mineralocorticoide. A equivalência anti-inflamatória não estabelece reposição adrenal ou velocidade de infusão.' },
  { id: 'betametasona', name: 'Betametasona', equivalentMg: 0.6, duration: '36–54 h', mineral: 'Ausente', note: 'Ação prolongada. Associações de fosfato com dipropionato ou outras formulações de depósito não permitem esta troca direta.' },
  { id: 'triancinolona', name: 'Triancinolona', equivalentMg: 4, duration: '24–48 h', mineral: 'Desprezível', note: 'Comparação sistêmica teórica. Acetonida injetável pode agir por semanas; não aplicar o cálculo às apresentações de depósito ou intra-articulares.' },
  { id: 'flumetasona', name: 'Flumetasona', equivalentMg: 1.5, duration: 'Não estabelecida na tabela adotada', mineral: 'Não informada', note: 'Há divergência expressiva de potência entre tabelas. Este resultado segue apenas a dose equivalente de 1,5 mg da tabela adotada; confirmar a monografia e o produto antes de qualquer troca.' },
  { id: 'isoflupredona', name: 'Isoflupredona', duration: 'Depende da formulação', mineral: 'Relevante', note: 'A tabela adotada não fornece dose anti-inflamatória equivalente. Não estimar a troca a partir de uma potência isolada; avaliar também os efeitos eletrolíticos.' },
  { id: 'cortisona', name: 'Cortisona', duration: 'Depende da formulação', mineral: 'Presente', note: 'Sem dose equivalente veterinária validada nas tabelas adotadas para este conversor. Não extrapolar automaticamente tabelas humanas.' },
  { id: 'deflazacorte', name: 'Deflazacorte', duration: 'Depende da formulação', mineral: 'Não comparada', note: 'Sem equivalência clínica validada para cães e gatos nas fontes adotadas. A relação utilizada em humanos não é uma validação veterinária.' },
  { id: 'budesonida', name: 'Budesonida', duration: 'Depende da formulação', mineral: 'Não comparada', note: 'Ação local, formulação e metabolismo de primeira passagem impedem equivalência direta com corticosteroides sistêmicos. Pode causar supressão adrenal.' },
  { id: 'fludrocortisona', name: 'Fludrocortisona', duration: 'Depende do regime', mineral: 'Elevada', note: 'Usada para reposição mineralocorticoide. Não substituir por uma dose anti-inflamatória de outro corticoide; ajustar conforme eletrólitos e resposta clínica.' },
  { id: 'docp', name: 'Desoxicorticosterona (DOCP)', duration: 'Prolongada', mineral: 'Predominante', note: 'Reposição mineralocorticoide, sem substituição da necessidade de glicocorticoide. Não existe conversão anti-inflamatória para prednisolona ou dexametasona.' },
  ...['Fluticasona', 'Beclometasona', 'Mometasona', 'Ciclesonida', 'Clobetasol', 'Fluocinolona', 'Hidrocortisona aceponato'].map((name): Corticoid => ({ id: name.toLowerCase().replaceAll(' ', '-'), name, duration: 'Depende da via e do produto', mineral: 'Não comparada', note: 'Corticoide de uso predominantemente local ou inalatório. Deposição, veículo e absorção impedem uma conversão direta em mg para tratamento sistêmico.' })),
]

export function parsePositive(value: string): number | null {
  if (!/^\d+(?:[.,]\d+)?$/.test(value.trim())) return null
  const parsed = Number(value.trim().replace(',', '.'))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

export function convertDose(dose: number, from: Corticoid, to: Corticoid): number | null {
  if (!Number.isFinite(dose) || dose <= 0 || !from.equivalentMg || !to.equivalentMg) return null
  const result = dose * (to.equivalentMg / from.equivalentMg)
  return Number.isFinite(result) && result > 0 ? result : null
}

export function formatDose(value: number): string {
  if (value < 0.001 || value >= 1e7) return value.toExponential(3).replace('.', ',')
  return value.toLocaleString('pt-BR', { maximumSignificantDigits: 5 })
}
