import fs from 'node:fs'
const path = 'modules/conversor-corticoide/styles.css'
let css = fs.readFileSync(path, 'utf8').replaceAll('\r\n','\n')
css = css.split('\n').filter(line => !/^\s*\.cc-(simulation|guidance|result-footer|result-column|hero img|hero > div|footer)/.test(line)).join('\n')
css = css.replace(', .cc-guidance-grid > *','').replace(', .cc-guidance h2','').replace('.cc-guidance p, ','').replaceAll('.cc-form, .cc-guidance, .cc-details, .cc-simulation','.cc-form, .cc-details').replace('  .cc-result { grid-column: 1; grid-row: 1; }\n','').replace('  .cc-facts, .cc-result-column > .cc-hint { grid-column: 1; }\n','')
css = css.replace(' .cc-row, .cc-guidance-grid { grid-template-columns: minmax(0, 1fr); } .cc-hero img { width: 64px; }',' .cc-row { grid-template-columns: minmax(0, 1fr); }')
css = css.replace('font-weight: 500; margin-top: 16px; overflow-wrap: anywhere;', 'font-weight: 650; margin-bottom: 18px; overflow-wrap: anywhere;').replace('font-size: clamp(38px, 5vw, 65px)', 'font-size: clamp(33px, 4.4vw, 58px)').replace('margin: 12px 0; overflow-wrap: anywhere;', 'margin: 2px 0 5px; overflow-wrap: anywhere; font-variant-numeric: tabular-nums;')
const pos = css.indexOf('/* Use the actual')
css = css.slice(0,pos) + `.cc-result-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(68px, 24%, 130px);
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.cc-result-drug { color: #c9dce3; font-size: 15px; font-weight: 600; overflow-wrap: anywhere; }
.cc-result-value { animation: cc-reveal-result 180ms ease-out both; }
.cc-simulation-scene { display: block; width: 100%; height: auto; pointer-events: none; }
.cc-copy { transition: background-color 150ms ease; }
.cc-copy:hover { background-color: #fff; }
.cc-copy-status { font-size: 12px; color: #c9dce3; margin-top: 8px; }
.cc-copy-status:empty { display: none; }
@keyframes cc-reveal-result {
  from { opacity: .72; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}
` + css.slice(pos)
css = css.replace('  .cc-number { font-size: 44px; }','  .cc-number { font-size: 33px; }')
fs.writeFileSync(path, css)
const app = 'modules/conversor-corticoide/App.tsx'
fs.writeFileSync(app, fs.readFileSync(app,'utf8').replace(/^      <footer className="cc-footer".*\n/m,''))
