import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Cat, Check, Copy, Dog, HelpCircle, Printer, RotateCcw, X, Zap } from 'lucide-react';
import { APPLE_MODELS, APPLE_SOURCES, AppleSelections, AppleSpecies, AppleVersion, calculateApple } from '../../data/appleScore';
import { APPLE_HELP } from '../../data/appleHelp';
import './appleScore.css';

const speciesName = { dog: 'Cão', cat: 'Gato' };

export function AppleScorePage() {
  const [species, setSpecies] = useState<AppleSpecies | null>(null);
  const [version, setVersion] = useState<AppleVersion | null>(null);
  const [selections, setSelections] = useState<AppleSelections>({});
  const [units, setUnits] = useState<Record<string, number>>({});
  const [help, setHelp] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const tableScroll = useRef<HTMLDivElement>(null);
  const model = species && version ? APPLE_MODELS[`${species}-${version}`] : null;
  const result = model ? calculateApple(model, selections) : null;
  const helpVariable = model?.variables.find((item) => item.id === help);
  const helpContent = help ? APPLE_HELP[help] : null;

  useEffect(() => {
    if (help && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [help]);

  useEffect(() => {
    const table = tableScroll.current;
    if (table && table.clientWidth < 700) table.scrollLeft = Math.max(0, 425 - table.clientWidth / 2);
  }, [model?.id]);

  function reset() {
    setSelections({}); setUnits({}); setHelp(null); setCopyStatus('');
  }

  function rowValues(item: NonNullable<typeof model>['variables'][number]) {
    const alternate = item.alternateUnits?.[(units[item.id] ?? 0) - 1];
    return { unit: alternate?.unit ?? item.unit, labels: alternate?.labels ?? item.ranges.map((range) => range.label) };
  }

  async function copyResult() {
    if (!model || !result?.complete || !species) return;
    const text = [
      `APPLE ${model.version.toUpperCase()} · ${speciesName[species]}: ${result.total}/${model.max}`,
      'Protocolo de referência: primeiras 24 h; mentação na admissão.',
      ...model.variables.map((item) => {
        const values = rowValues(item);
        const index = selections[item.id];
        return `${item.name}: ${values.labels[index]} (${values.unit}) → ${item.ranges[index].points} pontos`;
      }),
      `Risco histórico estimado de não sobrevivência: ${result.risk!.toFixed(1).replace('.', ',')}%.`,
      'Estimativa populacional; não é uma previsão individual nem critério isolado para eutanásia. APPLE não diagnostica sepse.',
      `Fonte: ${model.source}`,
    ].join('\n');
    try { await navigator.clipboard.writeText(text); setCopyStatus('Resumo copiado.'); }
    catch { setCopyStatus('Não foi possível copiar. Use a impressão para salvar o resumo.'); }
  }

  return (
    <div className="apple-app mx-auto w-full max-w-[1440px] space-y-6 p-4 md:p-8">
      <Link to="/consulta-vet/referencias-rapidas" className="apple-back inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Mini-apps</Link>

      <header className="apple-hero">
        <img src="/consulta-vet/reference-apps/apple.png" alt="Bactéria verde brava mordendo uma maçã vermelha" className="apple-icon" />
        <div className="min-w-0">
          <h1>APPLE <span>Score</span></h1>
          <p className="apple-hero-description">Avaliação de gravidade hospitalar em cães e gatos.</p>
        </div>
      </header>

      <section className="apple-setup" aria-label="Configuração do escore">
        <fieldset>
          <legend><span className="apple-step">01</span> Escolha a espécie</legend>
          <div className="apple-choice-grid">
            {(['dog', 'cat'] as const).map((value) => {
              const Icon = value === 'dog' ? Dog : Cat;
              return <button type="button" key={value} aria-pressed={species === value} className="apple-choice" onClick={() => { if (species !== value) { setSpecies(value); reset(); } }}><Icon size={24} /><span><strong>{speciesName[value]}</strong><small>{value === 'dog' ? 'Modelo canino' : 'Modelo felino'}</small></span>{species === value && <Check size={16} className="ml-auto" />}</button>;
            })}
          </div>
        </fieldset>
        <fieldset disabled={!species}>
          <legend><span className="apple-step">02</span> Escolha a versão</legend>
          <div className="apple-choice-grid">
            {(['fast', 'full'] as const).map((value) => <button type="button" key={value} aria-pressed={version === value} className="apple-choice" onClick={() => { if (version !== value) { setVersion(value); reset(); } }}>
              {value === 'fast' ? <Zap size={23} /> : <BookOpen size={23} />}<span><strong>APPLE {value.toUpperCase()}</strong><small>{value === 'fast' ? 'Rápido · 5 parâmetros' : `Completo · ${species === 'cat' ? 8 : 10} parâmetros`}</small></span>{version === value && <Check size={16} className="ml-auto" />}
            </button>)}
          </div>
        </fieldset>
      </section>

      {!model && <div className="apple-empty"><span className="apple-step">03</span><h2>Monte o escore do seu paciente</h2><p>Escolha a espécie e a versão para abrir a tabela interativa.</p><p>Os quadrinhos seguem a ordem das figuras originais, com zero pontos na coluna central.</p></div>}

      {model && result && <>
        <section className="apple-panel" aria-labelledby="apple-table-title">
          <div className="apple-panel-heading">
            <div><p className="apple-eyebrow">03 · SELECIONE OS ACHADOS</p><h2 id="apple-table-title">{speciesName[model.species]} · APPLE {model.version.toUpperCase()}</h2><p>Clique em uma faixa por linha. O número no canto indica os pontos.</p></div>
            <button type="button" className="apple-action" onClick={reset}><RotateCcw size={15} /> Limpar</button>
          </div>
          <div className="apple-protocol"><strong>Janela de avaliação</strong><p>Mentação na admissão, antes de sedação; demais parâmetros com os valores mais anormais das primeiras 24 h. Não escolha simplesmente a faixa com mais pontos.</p></div>
          <div className="apple-table-toolbar"><span><span className="apple-selected-key" /> Faixa selecionada</span><span>Coluna central = 0 pontos, não necessariamente normalidade</span><span className="apple-scroll-hint">Deslize a tabela <ArrowRight size={14} /></span></div>
          <div ref={tableScroll} className="apple-table-scroll" role="region" aria-label="Tabela de pontuação APPLE com rolagem horizontal" tabIndex={0}>
            <div className="apple-table">
              {model.variables.map((item) => {
                const zeroIndex = item.ranges.findIndex((range) => range.points === 0);
                const values = rowValues(item);
                return <div className="apple-score-row" key={item.id} role="group" aria-label={`${item.name} (${values.unit})`}>
                  {item.ranges.map((range, index) => {
                    const central = index === zeroIndex;
                    const active = selections[item.id] === index;
                    return <div key={index} style={{ gridColumn: 5 + index - zeroIndex }} className={`apple-cell-wrap${central ? ' apple-central' : ''}`}>
                      {central && <div className="apple-variable"><span>{item.name}<small>{values.unit}</small></span><button type="button" className="apple-help" aria-label={`Ajuda: ${item.name}`} onClick={() => setHelp(item.id)}><HelpCircle size={16} /></button></div>}
                      <button type="button" className={`apple-cell${central ? ' apple-zero' : ''}`} aria-pressed={active} aria-label={`${item.name}: ${values.labels[index]} ${values.unit}, ${range.points} pontos`} onClick={() => { setSelections((current) => ({ ...current, [item.id]: index })); setCopyStatus(''); }}>
                        <span className="apple-points">{range.points}<span> pts</span></span><span className="apple-range">{values.labels[index]}</span>{active && <Check className="apple-cell-check" size={13} aria-hidden />}
                      </button>
                    </div>;
                  })}
                </div>;
              })}
            </div>
          </div>
          {model.variables.filter((item) => item.alternateUnits).map((item) => <label className="apple-unit-picker" key={item.id}>Unidade de {item.name}<select value={units[item.id] ?? 0} onChange={(event) => { setUnits((current) => ({ ...current, [item.id]: Number(event.target.value) })); setCopyStatus(''); }}><option value={0}>{item.unit}</option>{item.alternateUnits?.map((unit, index) => <option key={unit.unit} value={index + 1}>{unit.unit}</option>)}</select><span>Ureia em mg/dL ÷ 2,14 ≈ BUN em mg/dL. Não use o valor de ureia diretamente como BUN.</span></label>)}
          {model.id === 'dog-full' && <p className="apple-unit-note">Lactato no FULL canino: mg/dL, conforme a figura original em unidades americanas. Para converter: mmol/L × 9,01 ≈ mg/dL.</p>}
          <p className="apple-table-caption">Faixas na ordem publicada, alinhadas à coluna de zero pontos. Respeite a precisão e a unidade indicadas; confira resultados entre limites na figura original antes de arredondar. <a href={model.source} target="_blank" rel="noreferrer">Consultar artigo ↗</a></p>
        </section>

        <section className="apple-result" aria-labelledby="apple-result-title">
          <div className="apple-result-top"><div><p className="apple-eyebrow">RESULTADO</p><h2 id="apple-result-title">{result.complete ? 'Escore APPLE' : 'Complete a avaliação'}</h2></div><span className="apple-completion" role="status">{result.answered}/{model.variables.length} parâmetros</span></div>
          <div className="apple-progress" role="progressbar" aria-label="Parâmetros preenchidos" aria-valuemin={0} aria-valuemax={model.variables.length} aria-valuenow={result.answered}><div style={{ width: `${100 * result.answered / model.variables.length}%` }} /></div>
          {!result.complete ? <p className="apple-pending">Faltam: {model.variables.filter((item) => !item.ranges[selections[item.id]]).map((item) => item.name).join(', ')}. O total será exibido após selecionar todas as faixas.</p> : <>
            <div className="apple-results-grid" aria-live="polite"><div><span className="apple-result-label">{speciesName[model.species]} · {model.version.toUpperCase()}</span><p className="apple-total">{result.total}<span>/{model.max}</span></p><p>Soma dos {model.variables.length} parâmetros</p></div><div className="apple-risk"><span className="apple-result-label">Risco histórico de não sobrevivência</span><p className="apple-risk-number">{result.risk!.toFixed(1).replace('.', ',')}<span>%</span></p><p>Regressão logística do estudo original</p></div></div>
            <div className="apple-summary"><h3>Resumo da seleção</h3><dl>{model.variables.map((item) => { const values = rowValues(item); return <div key={item.id}><dt>{item.name} <span>{values.labels[selections[item.id]]} {values.unit}</span></dt><dd>{item.ranges[selections[item.id]].points} pts</dd></div>; })}</dl></div>
          </>}
          <div className="apple-interpretation"><strong>Como interpretar</strong><p>O APPLE estratifica gravidade hospitalar; não diagnostica sepse. A estimativa reflete a população original, não uma previsão individual. Não há faixas universais de leve, moderado e grave. Considere doença de base, resposta ao tratamento e limitações de calibração; não use isoladamente para decidir eutanásia.</p></div>
          <div className="apple-result-actions"><button type="button" className="apple-action apple-action-primary" disabled={!result.complete} onClick={copyResult}><Copy size={16} /> Copiar resumo</button><button type="button" className="apple-action" disabled={!result.complete} onClick={() => window.print()}><Printer size={16} /> Imprimir</button><span role="status">{copyStatus}</span></div>
        </section>
      </>}

      <details className="apple-references"><summary><BookOpen size={16} /> Método e referências</summary><div><p>Os modelos canino e felino são independentes. FAST usa cinco variáveis; FULL usa dez em cães e oito em gatos. Os pesos derivam de regressão multivariável e podem parecer contraintuitivos. Zero pontos em uma faixa não exclui doença grave.</p><p>Use as primeiras 24 horas de internação, com mentação na admissão. Dados anteriores ao fechamento dessa janela produzem apenas uma pontuação preliminar. Exames ausentes não recebem zero automaticamente.</p><p>Probabilidade histórica: P = 1 / (1 + exp(−R)). Cão FULL: R = 0,237 × escore − 8,294; FAST: 0,249 × escore − 7,020. Gato FULL: 0,213 × escore − 9,472; FAST: 0,203 × escore − 6,142.</p><a href={APPLE_SOURCES.dog} target="_blank" rel="noreferrer">Hayes et al., 2010 · APPLE canino · JVIM 24:1034–1047 ↗</a><a href={APPLE_SOURCES.cat} target="_blank" rel="noreferrer">Hayes et al., 2011 · APPLE felino · JVIM 25:26–38 ↗</a></div></details>

      <dialog ref={dialog} className="apple-help-dialog" onClose={() => setHelp(null)} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }} aria-labelledby="apple-help-title">
        {helpContent && <><div className="apple-dialog-heading"><h2 id="apple-help-title">{helpVariable?.name}</h2><button type="button" className="apple-action" aria-label="Fechar ajuda" onClick={() => dialog.current?.close()}><X size={18} /></button></div><h3>Como avaliar</h3><p>{helpContent.assess}</p><h3>Por que importa</h3><p>{helpContent.physiology}</p><h3>Armadilhas de interpretação</h3><p>{helpContent.pitfalls}</p></>}
      </dialog>
    </div>
  );
}
