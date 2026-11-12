export type Answer = '' | 'yes' | 'no';
export const ARDS_CRITERIA = [
  ['insult', 'Agressão aguda conhecida ou suspeita', 'Sepse, aspiração, pancreatite, trauma ou outra agressão compatível.'],
  ['timing', 'Início ou piora em até 7 dias', 'Desconforto respiratório novo ou agravado após a agressão.'],
  ['imaging', 'Infiltrados pulmonares difusos', 'Documentados em radiografia, tomografia ou ultrassom torácico.'],
  ['heart', 'Causa cardíaca esquerda descartada', 'Insuficiência cardíaca esquerda excluída como causa dos infiltrados.'],
  ['overload', 'Sobrecarga volêmica descartada', 'Sobrecarga de volume excluída como causa dos infiltrados.'],
] as const;
export type Criterion = typeof ARDS_CRITERIA[number][0];
export type ArdsInput = {
  species: '' | 'dog' | 'cat'; support: '' | 'imv' | 'hfno' | 'oxygen' | 'air';
  method: 'pf' | 'sf'; criteria: Record<Criterion, Answer>;
  fio2: string; fioKnown: Answer; pao2: string; spo2: string; reliable: Answer;
  peep: string; flow: string; flowUnit: 'total' | 'weight'; altitude: '' | 'low' | 'high'; pressure: string;
  noHypercapnia: Answer;
};
export const initialArds = (): ArdsInput => ({ species: '', support: '', method: 'pf', criteria: { insult: '', timing: '', imaging: '', heart: '', overload: '' }, fio2: '', fioKnown: '', pao2: '', spo2: '', reliable: '', peep: '', flow: '', flowUnit: 'weight', altitude: '', pressure: '', noHypercapnia: '' });
export const ARDS_SOURCES = [
  ['Balakrishnan et al., 2025 · Definições ARDSVet', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12491761/'],
  ['Goggs et al., 2026 · Consenso de sepse', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13490290/'],
  ['Stastny et al., 2025 · Aplicações clínicas', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12491756/'],
] as const;
export function numeric(value: string): number | null {
  if (!value.trim()) return null;
  const n = Number(value.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}
export function evaluateArds(input: ArdsInput) {
  const blockers: string[] = [];
  const notes: string[] = [];
  const fio = input.support === 'air' ? 21 : numeric(input.fio2);
  const pa = numeric(input.pao2), sp = numeric(input.spo2), peep = numeric(input.peep), flow = numeric(input.flow), pressure = numeric(input.pressure);
  const goodSp = sp !== null && sp > 0 && sp <= 100 && input.reliable === 'yes';
  const adequateFlow = input.support === 'hfno' && flow !== null && flow > (input.flowUnit === 'weight' ? 1 : 30);
  const known = input.support === 'air' || input.fioKnown === 'yes' || adequateFlow;
  if (!input.species) blockers.push('Selecione cão ou gato.');
  if (!input.support) blockers.push('Informe o suporte respiratório.');
  if (!known) blockers.push('FiO₂ desconhecida: não é possível calcular uma relação válida. Fluxo convencional não determina FiO₂.');
  if (fio === null || fio < 21 || fio > 100) blockers.push('Informe FiO₂ entre 21 e 100%, na unidade indicada.');
  if (!input.altitude) blockers.push('Informe a faixa de altitude.');
  const altitudeValid = input.altitude === 'low' || (input.altitude === 'high' && pressure !== null && pressure > 0 && pressure <= 760);
  if (input.altitude === 'high' && !altitudeValid) blockers.push('Acima de 1.000 m, informe pressão barométrica local válida em mmHg (0 < pressão ≤ 760).');
  if (input.method === 'pf' && (pa === null || pa <= 0 || pa > 760)) blockers.push('Informe PaO₂ arterial válida em mmHg (0 < PaO₂ ≤ 760).');
  if (input.method === 'sf' && (!goodSp || sp! > 97)) blockers.push('S/F exige SpO₂ entre 0 e 97%, medida confiável e ausência de suspeita de dis-hemoglobinemia.');
  const validNumerator = input.method === 'pf' ? pa !== null && pa > 0 && pa <= 760 : goodSp && sp! <= 97;
  const raw = known && fio !== null && fio >= 21 && fio <= 100 && validNumerator ? (input.method === 'pf' ? pa! : sp!) / (fio / 100) : null;
  const ratio = raw !== null && altitudeValid ? raw * (input.altitude === 'high' ? pressure! / 760 : 1) : null;
  let supportValid = !!input.support;
  if (input.support === 'imv' && (peep === null || peep < 5 || peep > 50)) { supportValid = false; blockers.push('Classificação invasiva exige PEEP ≥5 cmH₂O (informe valor válido).'); }
  if (input.support === 'air') { supportValid = false; blockers.push('Em ar ambiente, este módulo avalia hipoxemia/risco; a categoria não intubada da Tabela 3 para cães e gatos requer oxigênio suplementar.'); }
  if (input.support === 'air' && input.method === 'pf' && input.noHypercapnia !== 'yes') blockers.push('Em ar ambiente, exclua hipercapnia para atribuir a alteração de P/F ao critério de hipoxemia.');
  const missing = ARDS_CRITERIA.filter(([id]) => input.criteria[id] !== 'yes');
  const band = ratio === null ? null : ratio <= (input.method === 'pf' ? 100 : 150) ? 'grave' : ratio <= (input.method === 'pf' ? 300 : 315) ? 'leve/moderada' : 'fora';
  const pfRisk = input.method === 'pf' && ratio !== null && ratio <= 300 && (input.support !== 'air' || input.noHypercapnia === 'yes');
  const risk = missing.length > 0 && (pfRisk || (goodSp && sp! < 88));
  const confirmed = !!input.species && !!input.support && supportValid && missing.length === 0 && ratio !== null && band !== 'fora';
  const status = confirmed ? `Critérios compatíveis com SARA ${band}` : risk && input.species ? 'Paciente em risco de SARA' : 'Critérios insuficientes ou não preenchidos';
  if (input.species === 'cat' && input.method === 'sf') notes.push('S/F em gatos: os limites são os do consenso, mas faltam estudos clínicos de correlação específicos em felinos. Prefira gasometria arterial quando disponível.');
  if (band === 'fora') notes.push('Relação fora dos limites de hipoxemia da tabela; isso não exclui doença respiratória nem outras causas de insuficiência respiratória.');
  if (risk) notes.push('Categoria de risco por P/F ≤300 ou SpO₂ <88%, com outros critérios ainda não atendidos. Não equivale a diagnóstico de SARA.');
  return { status, confirmed, risk, ratio, raw, band, blockers, missing, notes };
}
