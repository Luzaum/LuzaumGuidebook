import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRightLeft, ArrowUpRight, Check, Copy, Info, RotateCcw } from 'lucide-react'
import { corticoids, convertDose, formatDose, parsePositive } from './conversion'
import { ConversionSimulation } from './ConversionSimulation'
import './styles.css'

export default function CorticoidConverter() {
  const [fromId, setFromId] = useState('prednisolona')
  const [toId, setToId] = useState('dexametasona')
  const [dose, setDose] = useState('5')
  const [unit, setUnit] = useState('mg')
  const [weight, setWeight] = useState('')
  const [concentration, setConcentration] = useState('')
  const [species, setSpecies] = useState('cao')
  const [form, setForm] = useState('systemic')
  const [copyStatus, setCopyStatus] = useState('')
  const [simulationRevision, setSimulationRevision] = useState(0)
  const from = corticoids.find(d => d.id === fromId)!
  const to = corticoids.find(d => d.id === toId)!
  const doseValue = parsePositive(dose)
  const weightValue = parsePositive(weight)
  const concentrationValue = parsePositive(concentration)
  const allowed = Boolean(from.equivalentMg && to.equivalentMg && form === 'systemic')
  const result = allowed && doseValue ? convertDose(doseValue, from, to) : null
  const conversionKey = JSON.stringify([fromId, toId, doseValue, unit, simulationRevision])
  const total = result === null ? null : unit === 'mg' ? result : weightValue ? result * weightValue : null
  const safeTotal = total !== null && Number.isFinite(total) && total > 0 ? total : null
  const rawVolume = safeTotal !== null && concentrationValue ? safeTotal / concentrationValue : null
  const volume = rawVolume !== null && Number.isFinite(rawVolume) && rawVolume > 0 ? rawVolume : null
  const changed = () => setCopyStatus('')
  const reset = () => { setFromId('prednisolona'); setToId('dexametasona'); setDose('5'); setUnit('mg'); setWeight(''); setConcentration(''); setForm('systemic'); setSpecies('cao'); setSimulationRevision(value => value + 1); changed() }
  const swap = () => { setFromId(toId); setToId(fromId); setConcentration(''); changed() }
  const copy = async () => {
    if (result === null) return
    const text = `${from.name}: ${dose} ${unit} ≈ ${to.name}: ${formatDose(result)} ${unit}.${safeTotal !== null && unit === 'mg/kg' ? ` Total para ${weight} kg: ${formatDose(safeTotal)} mg.` : ''}${volume !== null ? ` Volume teórico: ${formatDose(volume)} mL (${concentration} mg/mL de princípio ativo).` : ''} Equivalência anti-inflamatória aproximada; não define intervalo, via, desmame ou prescrição. Não aplicável a depósito, uso local ou reposição mineralocorticoide.`
    try { await navigator.clipboard.writeText(text); setCopyStatus('Resultado copiado') } catch { setCopyStatus('Não foi possível copiar. Selecione o resultado na tela.') }
  }
  const options = <><optgroup label="Equivalência sistêmica disponível">{corticoids.filter(d => d.equivalentMg).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</optgroup><optgroup label="Sem conversão direta — consultar orientação">{corticoids.filter(d => !d.equivalentMg).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</optgroup></>
  return <div className="corticoid-app">
    <div className="cc-wrap">
      <Link to="/consulta-vet/referencias-rapidas" className="cc-back"><ArrowLeft size={16} /> Mini-apps clínicos</Link>
      <header className="cc-hero">
        <div><span className="cc-eyebrow">VETIUS · FARMACOLOGIA</span><h1>Conversor de corticóide</h1><p className="cc-muted">Equivalência anti-inflamatória para apoiar a decisão clínica em cães e gatos.</p></div>
      </header>
      <div className="cc-layout">
        <section className="cc-card cc-form" aria-labelledby="conversion-title">
          <div className="cc-section-head"><h2 id="conversion-title">Configure a conversão</h2><button className="cc-text-button" onClick={reset}><RotateCcw size={15} /> Limpar</button></div>
          <div className="cc-row cc-patient-row"><label>Paciente<select value={species} onChange={e => { setSpecies(e.target.value); changed() }}><option value="cao">Cão</option><option value="gato">Gato</option></select></label><label>Tipo de apresentação<select value={form} onChange={e => { setForm(e.target.value); changed() }}><option value="systemic">Sistêmica, sem depósito</option><option value="depot">Depósito / ação prolongada injetável</option><option value="local">Tópica, ocular, otológica ou inalatória</option></select></label></div>
          <div className="cc-drugs"><label>De<select value={fromId} onChange={e => { setFromId(e.target.value); changed() }}>{options}</select></label><button className="cc-swap" onClick={swap} aria-label="Inverter fármacos" title="Inverte os fármacos e mantém a dose informada"><ArrowRightLeft size={20} /></button><label>Para<select value={toId} onChange={e => { setToId(e.target.value); setConcentration(''); changed() }}>{options}</select></label></div>
          <div className="cc-row"><label>Dose de origem<input inputMode="decimal" value={dose} onChange={e => { setDose(e.target.value); changed() }} aria-invalid={!doseValue} aria-describedby={!doseValue ? 'dose-error' : undefined} /></label><label>Unidade<select value={unit} onChange={e => { setUnit(e.target.value); setDose(''); changed() }}><option value="mg">mg — quantidade total</option><option value="mg/kg">mg/kg — por peso</option></select></label></div>
          {!doseValue && <p id="dose-error" className="cc-error">Informe uma dose positiva. Use vírgula ou ponto para decimais, sem separador de milhar.</p>}
          <p className="cc-hint">Use a quantidade de princípio ativo da dose que deseja comparar. A frequência de administração não é convertida.</p>
          {unit === 'mg/kg' && <label>Peso do paciente (kg)<input inputMode="decimal" placeholder="Para calcular o total em mg e mL" value={weight} onChange={e => { setWeight(e.target.value); changed() }} aria-invalid={Boolean(weight) && !weightValue} />{weight && !weightValue && <span className="cc-error">Informe um peso positivo válido.</span>}</label>}
          <div className="cc-optional"><span className="cc-eyebrow">OPCIONAL · VOLUME DO DESTINO</span><label>Concentração de {to.name.toLowerCase()} (mg/mL)<input inputMode="decimal" placeholder="Confira a concentração no rótulo" value={concentration} disabled={!allowed} onChange={e => { setConcentration(e.target.value); changed() }} aria-invalid={Boolean(concentration) && !concentrationValue} /></label>{concentration && !concentrationValue && <p className="cc-error">Informe uma concentração positiva válida.</p>}<p className="cc-hint">Informe mg do princípio ativo por mL, após reconstituição quando aplicável. Não use a massa do sal nem a quantidade total do frasco.</p></div>
        </section>
        <div className="cc-result-column">
          <section id="cc-result" className="cc-result" aria-labelledby="result-title">
            <h2 id="result-title">Resultado da conversão</h2>
            <div aria-live="polite" aria-atomic="true">
              {result !== null ? (
                <>
                  <div className="cc-result-main">
                    <div key={conversionKey} className="cc-result-value">
                      <span className="cc-result-drug">{to.name}</span>
                      <div className="cc-number">≈ {formatDose(result)} <span>{unit}</span></div>
                      <p className="cc-equation">A partir de {dose} {unit} de {from.name.toLowerCase()}</p>
                    </div>
                    {fromId !== toId && (
                      <ConversionSimulation key={`scene-${conversionKey}`} />
                    )}
                  </div>
                  {unit === 'mg/kg' && (
                    <p className="cc-equation">{safeTotal !== null ? `Total para ${weight} kg: ${formatDose(safeTotal)} mg` : 'Informe o peso para calcular a quantidade total.'}</p>
                  )}
                  {volume !== null && (
                    <div className="cc-volume">
                      <strong>{formatDose(volume)} mL</strong>
                      <span>Volume teórico a {concentration} mg/mL</span>
                      <small>Confira se o volume pode ser medido com precisão na seringa.</small>
                    </div>
                  )}
                </>
              ) : (
                <div className="cc-no-result">
                  <Info size={22} />
                  <h3>{allowed ? 'Preencha a dose de origem' : 'Sem equivalência direta'}</h3>
                  {form !== 'systemic' ? (
                    <p>Selecione uma apresentação sistêmica sem depósito para usar a tabela de equivalência.</p>
                  ) : (
                    [from, ...(fromId === toId ? [] : [to])].filter(drug => !drug.equivalentMg).map(drug => (
                      <p key={drug.id}><strong>{drug.name}:</strong> {drug.note}</p>
                    ))
                  )}
                </div>
              )}
            </div>
            {result !== null && (
              <button onClick={copy} className="cc-copy">
                {copyStatus === 'Resultado copiado' ? <Check size={16} /> : <Copy size={16} />}
                {copyStatus === 'Resultado copiado' ? 'Resultado copiado' : 'Copiar resultado'}
              </button>
            )}
            <p className="cc-copy-status" role="status">{copyStatus}</p>
          </section>
          <div className="cc-facts"><div><span>Duração de origem</span><strong>{from.duration}</strong></div><ArrowRightLeft size={17} /><div><span>Duração de destino</span><strong>{to.duration}</strong></div></div>
          <p className="cc-hint">Duração biológica aproximada. Formulações de depósito podem agir por semanas.</p>
        </div>
      </div>
      <details className="cc-card cc-details"><summary>Tabela de equivalências e método de cálculo</summary><p>Base única: doses anti-inflamatórias aproximadamente equivalentes a 20 mg de hidrocortisona. A tabela não valida automaticamente a troca entre vias, formulações ou protocolos de imunossupressão.</p><div className="cc-table-scroll" role="region" aria-label="Tabela de equivalências com rolagem horizontal" tabIndex={0}><table><caption>Comparação sistêmica — não aplicável a apresentações de depósito</caption><thead><tr><th>Fármaco</th><th>Dose equivalente</th><th>Duração</th><th>Atividade mineralocorticoide</th></tr></thead><tbody>{corticoids.filter(d => d.equivalentMg).map(d => <tr key={d.id}><th scope="row">{d.name}</th><td>{formatDose(d.equivalentMg!)} mg</td><td>{d.duration}</td><td>{d.mineral}</td></tr>)}</tbody></table></div><p><strong>Cálculo:</strong> dose de origem × (dose equivalente do destino ÷ dose equivalente da origem). Volume = quantidade total em mg ÷ concentração em mg/mL. O cálculo usa os valores completos; apenas a exibição é arredondada.</p><p>As colunas de potência relativa e de dose equivalente são aproximações independentes e nem sempre coincidem. Usamos exclusivamente a coluna de dose equivalente, sem misturar fatores entre tabelas. Há divergência especialmente importante para flumetasona; confirme a adequação clínica antes de usar o resultado.</p></details>
      <details className="cc-card cc-details"><summary>Referências e limites da ferramenta</summary><p>Revisão das fontes: 23/11/2026. O catálogo reúne os principais corticosteroides sistêmicos e locais; não representa todas as marcas, sais ou apresentações comerciais. Ausência de equivalência significa ausência de cálculo, não ausência de efeito sistêmico.</p><ol><li>Plumb’s Veterinary Drug Handbook, 10ª ed. Tabela “Glucocorticoid Comparison Table”, p. 1491; dexametasona, p. 365; triancinolona, p. 1270. Fonte das doses equivalentes.</li><li>BSAVA Small Animal Formulary, Part A: Canine and Feline, 10ª ed. Dexametasona, p. 114; hidrocortisona, p. 196; prednisolona, p. 339. Conferência das relações de dose e precauções.</li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6524099/" target="_blank" rel="noreferrer">Swann et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. JVIM, 2019. DOI: 10.1111/jvim.15463. <ArrowUpRight size={13} /></a> Apoia individualização e monitorização da terapia; não estabelece conversão universal entre todos os corticoides.</li><li><a href="https://www.merckvetmanual.com/multimedia/table/relative-potencies-of-commonly-used-corticosteroids" target="_blank" rel="noreferrer">MSD/Merck Veterinary Manual. Relative Potencies of Commonly Used Corticosteroids. <ArrowUpRight size={13} /></a> Consulta comparativa: os fatores diferem da tabela adotada e não foram combinados no cálculo.</li></ol></details>
    </div>
  </div>
}


