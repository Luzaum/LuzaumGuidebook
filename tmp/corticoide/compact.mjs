import fs from 'node:fs'
const dir = 'modules/conversor-corticoide/'
const edit = (file, fn) => {
  const path = dir + file
  fs.writeFileSync(path, fn(fs.readFileSync(path, 'utf8').replaceAll('\r\n','\n')))
}
edit('ConversionSimulation.tsx', s => {
  s = s.replace(/import React[^\n]*\n[\s\S]*?(?=const clamp)/, "import React, { useEffect, useId, useState } from 'react'\n\nconst durationMs = 360\n")
  const start = s.indexOf('export function')
  const end = s.indexOf('  const dissolve', start)
  s = s.slice(0,start) + `export function ConversionSimulation() {
  const id = useId().replaceAll(':', '')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const started = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setProgress(0)
        return
      }
      const next = clamp((now - started) / durationMs)
      setProgress(next)
      if (next < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

` + s.slice(end)
  const header = s.indexOf('  const stage')
  const svg = s.indexOf('      <defs>', header)
  s = s.slice(0,header) + `  const paint = (name: string) => \`url(#\${id}-\${name})\`
  return (
    <svg className="cc-simulation-scene" viewBox="65 80 660 155" aria-hidden="true" focusable="false">
` + s.slice(svg)
  return s.slice(0,s.indexOf('    </svg>') + '    </svg>'.length) + '\n  )\n}\n'
})
edit('App.tsx', s => {
  s = s.replace(', ShieldCheck','')
  s = s.replace('<p>Dois fármacos. Uma comparação clara.</p>','').replace(/^        <img src="\/apps\/conversor-corticoide-navy.png".*\n/m,'')
  const start = s.indexOf('        <div className="cc-result-column">')
  const end = s.indexOf('      <details className="cc-card cc-details">',start)
  return s.slice(0,start) + `        <div className="cc-result-column">
          <section id="cc-result" className="cc-result" aria-labelledby="result-title">
            <h2 id="result-title">Resultado da conversão</h2>
            <div aria-live="polite" aria-atomic="true">
              {result !== null ? (
                <>
                  <div className="cc-result-main">
                    <div key={JSON.stringify([fromId, toId, doseValue, unit, simulationRevision])} className="cc-result-value">
                      <span className="cc-result-drug">{to.name}</span>
                      <div className="cc-number">≈ {formatDose(result)} <span>{unit}</span></div>
                      <p className="cc-equation">A partir de {dose} {unit} de {from.name.toLowerCase()}</p>
                    </div>
                    {fromId !== toId && (
                      <ConversionSimulation key={JSON.stringify([fromId, toId, doseValue, unit, simulationRevision])} />
                    )}
                  </div>
                  {unit === 'mg/kg' && (
                    <p className="cc-equation">{safeTotal !== null ? \`Total para \${weight} kg: \${formatDose(safeTotal)} mg\` : 'Informe o peso para calcular a quantidade total.'}</p>
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
` + s.slice(end)
})
