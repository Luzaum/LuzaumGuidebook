import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, X, Copy, Printer, RotateCcw, Check, Cat, Dog } from 'lucide-react';
import { ARDS_CRITERIA, ARDS_SOURCES, ArdsInput, Answer, evaluateArds, initialArds } from '../../data/ardsVet';
import { ARDS_HELP } from '../../data/ardsVetHelp';
import './appleScore.css';
import './ardsVet.css';
import { ArdsReferenceTables, Fio2ReferenceButton } from './ArdsReferenceTables';

const answerLabel = (value: Answer) => value === 'yes' ? 'Sim' : value === 'no' ? 'Não' : 'Pendente';
const supportLabels = { '': 'Não informado', imv: 'Ventilação invasiva', hfno: 'Alto fluxo nasal', oxygen: 'Oxigênio convencional', air: 'Ar ambiente' };
export function ArdsVetPage() {
  const [input, setInput] = useState<ArdsInput>(initialArds);
  const [help, setHelp] = useState<string | null>(null);
  const [copied, setCopied] = useState('');
  const [lavage, setLavage] = useState<Answer>('');
  const dialog = useRef<HTMLDialogElement>(null);
  const result = evaluateArds(input);
  const info = help ? ARDS_HELP[help] : null;
  useEffect(() => { if (help && !dialog.current?.open) dialog.current?.showModal(); }, [help]);
  function update<K extends keyof ArdsInput>(key: K, value: ArdsInput[K]) { setInput(old => ({ ...old, [key]: value })); setCopied(''); }
  const Help = ({ id }: { id: string }) => <button type="button" className="sara-help" aria-label={`Ajuda: ${ARDS_HELP[id].title}`} onClick={() => setHelp(id)}><HelpCircle size={17} /></button>;
  const choices = (value: Answer, change: (value: Answer) => void) => <div className="sara-answers">{(['yes', 'no', ''] as const).map(option => <button type="button" key={option} aria-pressed={value === option} onClick={() => change(option)}>{answerLabel(option)}</button>)}</div>;
  const number = (key: 'pao2' | 'spo2' | 'fio2' | 'peep' | 'flow' | 'pressure', label: string, placeholder: string) => <label className="sara-field"><span>{label}</span><input inputMode="decimal" value={input[key]} placeholder={placeholder} onChange={event => update(key, event.target.value)} /></label>;
  const summary = [
    `SARA / ARDSVet · ${input.species === 'dog' ? 'Cão' : input.species === 'cat' ? 'Gato' : 'Espécie pendente'}`,
    result.status, `Suporte: ${supportLabels[input.support]}; método: ${input.method.toUpperCase()}`,
    `PaO₂: ${input.pao2 || 'não informada'} mmHg; SpO₂: ${input.spo2 || 'não informada'}%; FiO₂: ${input.support === 'air' ? '21' : input.fio2 || 'não informada'}%`,
    `FiO₂ conhecida: ${answerLabel(input.fioKnown)}; oximetria confiável: ${answerLabel(input.reliable)}`,
    `PEEP: ${input.peep || 'não informada'} cmH₂O; alto fluxo: ${input.flow || 'não informado'} ${input.flowUnit === 'total' ? 'L/min' : 'L/kg/min'}`,
    `Altitude: ${input.altitude === 'high' ? '>1.000 m' : input.altitude === 'low' ? '≤1.000 m' : 'pendente'}; pressão: ${input.pressure || 'não informada'} mmHg`,
    `${input.method.toUpperCase()}: ${result.ratio === null ? 'indisponível' : result.ratio.toFixed(1)}${input.altitude === 'high' ? ' (corrigida para altitude)' : ''}`,
    ...ARDS_CRITERIA.map(([id, title]) => `${title}: ${answerLabel(input.criteria[id])}`),
    `Lavado de suporte (opcional): ${answerLabel(lavage)}`, ...result.blockers, ...result.notes,
    'Classificação clínica, sem estimativa de mortalidade ou inferência automática de sepse.', ARDS_SOURCES[0][1],
  ].join('\n');
  async function copy() { try { await navigator.clipboard.writeText(summary); setCopied('Resumo copiado.'); } catch { setCopied('Não foi possível copiar. Use a opção de impressão.'); } }

  return <div className="apple-app sara-app mx-auto w-full max-w-[1440px] space-y-6 p-4 md:p-8">
    <Link className="apple-back inline-flex items-center gap-2 text-sm text-muted-foreground" to="/consulta-vet/referencias-rapidas"><ArrowLeft size={16} /> Mini-apps</Link>
    <header className="apple-hero"><img className="apple-icon" src="/consulta-vet/reference-apps/sara-lungs.png" alt="Pulmões com uma metade doente e arroxeada" /><div><h1>SARA <span>/ SDRA</span></h1><p className="apple-hero-description">Critérios respiratórios ARDSVet em cães e gatos.</p></div></header>
    <ArdsReferenceTables />
    <section className="sara-panel sara-controls"><div className="sara-heading"><div><p className="apple-eyebrow">01 · PACIENTE E SUPORTE</p><h2>Contexto da avaliação</h2></div><button className="apple-action" type="button" onClick={() => { setInput(initialArds()); setLavage(''); setCopied(''); }}><RotateCcw size={15} /> Limpar</button></div>
      <div className="sara-columns"><fieldset><legend>Espécie</legend><div className="apple-choice-grid">{(['dog', 'cat'] as const).map(species => <button className="apple-choice" type="button" key={species} aria-label={species === 'dog' ? 'Cão' : 'Gato'} aria-pressed={input.species === species} onClick={() => { setInput({ ...initialArds(), species }); setLavage(''); setCopied(''); }}>{species === 'dog' ? <Dog /> : <Cat />}<strong>{species === 'dog' ? 'Cão' : 'Gato'}</strong>{input.species === species && <Check size={16} />}</button>)}</div></fieldset>
      <div><label className="sara-field"><span>Suporte respiratório <Help id="support" /></span><select aria-label="Suporte respiratório" value={input.support} onChange={event => { setInput(old => ({ ...old, support: event.target.value as ArdsInput['support'], fio2: '', fioKnown: '', peep: '', flow: '', noHypercapnia: '' })); setCopied(''); }}>{Object.entries(supportLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div></div>
      {input.support === 'imv' && number('peep', 'PEEP (cmH₂O)', 'Ex.: 5')}
      {input.support === 'hfno' && <div className="sara-columns">{number('flow', 'Fluxo nasal', 'Ex.: 1,5')}<label className="sara-field"><span>Unidade do fluxo</span><select value={input.flowUnit} onChange={e => update('flowUnit', e.target.value as 'total' | 'weight')}><option value="weight">L/kg/min</option><option value="total">L/min total</option></select></label></div>}
    </section>
    <section className="sara-panel sara-controls"><div className="sara-heading"><div><p className="apple-eyebrow">02 · OXIGENAÇÃO</p><h2>Calcule a relação</h2></div><Help id="oxygen" /></div>
      <div className="sara-columns"><fieldset><legend>Método de avaliação</legend><div className="sara-answers">{(['pf', 'sf'] as const).map(method => <button type="button" key={method} aria-pressed={input.method === method} onClick={() => update('method', method)}>{method === 'pf' ? 'P/F · Gasometria arterial' : 'S/F · Oximetria'}</button>)}</div></fieldset><p className="sara-muted">Prefira gasometria arterial quando disponível. Os valores precisam corresponder ao mesmo suporte respiratório.</p></div>
      <div className="sara-columns">{input.method === 'pf' && number('pao2', 'PaO₂ arterial (mmHg)', 'Ex.: 80')}{number('spo2', `SpO₂ (%)${input.method === 'pf' ? ' · opcional para risco' : ''}`, 'Ex.: 93')}{input.support !== 'air' ? <div>{number('fio2', 'FiO₂ (%) · não L/min', 'Ex.: 40')}<Fio2ReferenceButton /></div> : <p className="sara-air">Ar ambiente: FiO₂ = 21% (0,21)</p>}</div>
      {input.support !== 'air' && <fieldset className="sara-question"><legend>FiO₂ conhecida / medida de forma confiável? <Help id="oxygen" /></legend>{choices(input.fioKnown, value => update('fioKnown', value))}<p className="sara-muted">No alto fluxo acima do limiar, informe a concentração ajustada. Cateter convencional a 2 L/min não permite estimar uma FiO₂.</p></fieldset>}
      {(input.method === 'sf' || input.spo2 !== '') && <fieldset className="sara-question"><legend>Oximetria confiável, sem suspeita de dis-hemoglobinemia? <Help id="saturation" /></legend>{choices(input.reliable, value => update('reliable', value))}</fieldset>}
      {input.support === 'air' && input.method === 'pf' && <fieldset className="sara-question"><legend>Hipercapnia excluída na gasometria?</legend>{choices(input.noHypercapnia, value => update('noHypercapnia', value))}</fieldset>}
      <div className="sara-columns"><label className="sara-field"><span>Altitude do local <Help id="altitude" /></span><select aria-label="Altitude do local" value={input.altitude} onChange={e => update('altitude', e.target.value as ArdsInput['altitude'])}><option value="">Selecione</option><option value="low">Até 1.000 m</option><option value="high">Acima de 1.000 m</option></select></label>{input.altitude === 'high' && number('pressure', 'Pressão barométrica local (mmHg)', 'Ex.: 650')}</div>
      <div className="sara-live" aria-live="polite"><span>{input.method.toUpperCase()} = {input.method === "pf" ? "PaO₂" : "SpO₂"} ÷ (FiO₂ / 100)</span><strong>{result.ratio === null ? "—" : result.ratio.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}</strong><span>{result.band ? result.band === "fora" ? "Acima dos limites de hipoxemia da tabela" : `Faixa de hipoxemia ${result.band}` : "Informe os valores e as condições de medida acima."}</span><small>Atualiza ao digitar. A confirmação de SARA depende dos critérios clínicos abaixo.</small></div>
    </section>
    <section className="sara-panel sara-controls"><div className="sara-heading"><div><p className="apple-eyebrow">03 · CRITÉRIOS CLÍNICOS</p><h2>Verifique cada domínio</h2></div><Help id="physiology" /></div><p className="sara-muted">Deixe pendente o que ainda não foi avaliado. Nenhum critério é preenchido automaticamente.</p>
      <div className="sara-criteria">{ARDS_CRITERIA.map(([id, title, text], index) => <fieldset className="sara-criterion" key={id}><legend><span className="apple-step">{index + 1}</span> {title} <Help id={id} /></legend><p>{text}</p>{choices(input.criteria[id], value => update('criteria', { ...input.criteria, [id]: value }))}</fieldset>)}</div>
      <details className="sara-optional"><summary>Achado de suporte opcional: lavado de vias aéreas</summary><div><p>Inflamação neutrofílica e proteínas elevadas <Help id="lavage" /></p>{choices(lavage, value => { setLavage(value); setCopied(''); })}</div></details>
    </section>
    <section className={`sara-panel sara-result ${result.confirmed ? 'sara-positive' : ''}`} aria-labelledby="sara-result-title"><p className="apple-eyebrow">INTERPRETAÇÃO</p><h2 id="sara-result-title" role="status">{result.status}</h2><div className="sara-result-grid"><div><span className="sara-muted">Relação {input.method === 'pf' ? 'PaO₂/FiO₂' : 'SpO₂/FiO₂'}</span><p className="sara-ratio">{result.ratio === null ? '—' : result.ratio.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</p><p>{result.band && (result.band === 'fora' ? 'Fora dos limites da tabela' : `Faixa de hipoxemia ${result.band}`)}</p>{input.altitude === 'high' && result.ratio !== null && <p className="sara-muted">Sem correção: {result.raw?.toFixed(1)} · fator: {input.pressure}/760</p>}</div><div><h3>Conferência clínica</h3>{result.missing.length ? <ul>{result.missing.map(([id, title]) => <li key={id}>{title}: <strong>{answerLabel(input.criteria[id])}</strong></li>)}</ul> : <p>Todos os critérios clínicos informados como preenchidos.</p>}</div></div>
      {result.blockers.length > 0 && <div className="sara-blockers"><h3>O que impede a classificação completa</h3><ul>{result.blockers.map(text => <li key={text}>{text}</li>)}</ul></div>}{result.notes.map(text => <p className="sara-note" key={text}>{text}</p>)}
      <p className="sara-note">A relação de oxigenação isolada não confirma SARA. Estes critérios não fornecem pontuação prognóstica, mortalidade ou indicação automática de tratamento.</p>
      <details className="sara-summary"><summary>Resumo para prontuário</summary><pre>{summary}</pre></details>
      <div className="apple-result-actions"><button type="button" className="apple-action apple-action-primary" onClick={copy}><Copy size={16} /> Copiar avaliação</button><button type="button" className="apple-action" onClick={() => window.print()}><Printer size={16} /> Imprimir</button><span role="status">{copied}</span></div>
      <div className="sara-print-summary">{summary}</div>
    </section>
    <section className="sara-panel sara-controls"><div className="sara-heading"><h2>Entenda os mecanismos</h2><Help id="physiology" /></div><div className="sara-pathway">{['Agressão aguda', 'Inflamação alveolocapilar', 'Edema rico em proteínas', 'Perda de surfactante e aeração', 'Desequilíbrio V/Q e shunt', 'Hipoxemia'].map((text, i) => <button type="button" key={text} onClick={() => setHelp('physiology')}><span>{i + 1}</span>{text}</button>)}</div><p className="sara-muted">SARA e sepse: interprete a disfunção respiratória no contexto da infecção e das causas alternativas. <Help id="sepsis" /></p>
      <div className="sara-table-scroll"><table><caption>Limites de oxigenação · usar somente com as condições de medida atendidas</caption><thead><tr><th>Faixa</th><th>P/F</th><th>S/F · SpO₂ ≤97%</th></tr></thead><tbody><tr><td>Leve/moderada</td><td>&gt;100 a 300</td><td>&gt;150 a 315</td></tr><tr><td>Grave</td><td>≤100</td><td>≤150</td></tr><tr><td>Acima do limite</td><td>&gt;300</td><td>&gt;315</td></tr></tbody></table></div>
      <h3>Referências</h3>{ARDS_SOURCES.map(([title, url]) => <a className="sara-source" key={url} href={url} target="_blank" rel="noreferrer">{title} ↗</a>)}
    </section>
    <dialog className="apple-help-dialog" ref={dialog} onClose={() => setHelp(null)} aria-labelledby="sara-help-title">{info && <><div className="apple-dialog-heading"><h2 id="sara-help-title">{info.title}</h2><button type="button" className="apple-action" aria-label="Fechar ajuda" onClick={() => dialog.current?.close()}><X size={18} /></button></div><h3>Como avaliar</h3><p>{info.assess}</p><h3>Entenda o mecanismo</h3><p>{info.mechanism}</p><h3>Cuidados na interpretação</h3><p>{info.caveat}</p></>}</dialog>
  </div>;
}
