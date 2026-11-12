import React, { useRef } from 'react';

export function ArdsReferenceTables() {
  return <section className="sara-panel sara-controls">
    <h2>Critérios ARDSVet</h2>
    <p className="sara-muted">Tabela adaptada para cães e gatos, na organização do consenso de 2025.</p>
    <div className="sara-table-scroll sara-paper"><table>
      <caption>Definições ARDSVet — critérios comuns e categorias de oxigenação</caption>
      <tbody>
        <tr><th colSpan={4}>Critérios aplicáveis a todas as categorias</th></tr>
        <tr><th>Fator de risco</th><td colSpan={3}>Agressão aguda predisponente conhecida ou suspeita.</td></tr>
        <tr><th>Origem do edema</th><td colSpan={3}>Excluir insuficiência cardíaca esquerda e sobrecarga volêmica como causas dos infiltrados. Integrar ecocardiografia/POCUS, radiografia, histórico e exame físico.</td></tr>
        <tr><th>Temporalidade</th><td colSpan={3}>Desconforto respiratório novo ou agravado em até 7 dias da agressão.</td></tr>
        <tr><th>Imagem torácica</th><td colSpan={3}>Infiltrados pulmonares difusos em radiografia, tomografia ou ultrassonografia. Preferir RX/TC; ultrassom requer operador treinado.</td></tr>
        <tr><th>Fluido de vias aéreas</th><td colSpan={3}><em>Suporte opcional:</em> inflamação neutrofílica e proteínas elevadas em lavado traqueal ou broncoalveolar.</td></tr>
        <tr><th colSpan={4}>Critérios específicos por categoria</th></tr>
        <tr><th>Domínio</th><th>Gravidade</th><th>Ventilação invasiva</th><th>Não intubado</th></tr>
        <tr><th rowSpan={5}>Oxigenação</th><td>Condições de medida</td><td>Intubação e ventilação mecânica com PEEP ≥5 cmH₂O.</td><td>Oxigênio suplementar: alto fluxo &gt;1 L/kg/min ou &gt;30 L/min total, OU FiO₂ conhecida.</td></tr>
        <tr><th rowSpan={2}>Leve/moderada</th><td colSpan={2}>PaO₂/FiO₂ &gt;100 e ≤300</td></tr>
        <tr><td colSpan={2}>OU SpO₂/FiO₂ &gt;150 e ≤315</td></tr>
        <tr><th rowSpan={2}>Grave</th><td colSpan={2}>PaO₂/FiO₂ ≤100</td></tr>
        <tr><td colSpan={2}>OU SpO₂/FiO₂ ≤150</td></tr>
      </tbody>
    </table></div>
    <p className="sara-muted">S/F: somente SpO₂ ≤97%, sinal confiável e sem suspeita de dis-hemoglobinemia. Acima de 1.000 m: relação × pressão barométrica/760. A FiO₂ no denominador é uma fração (40% = 0,40).</p>
    <a className="sara-source" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12491761/" target="_blank" rel="noreferrer">ARDSVet 2025 · Tabela 3 ↗</a>
  </section>;
}

export function Fio2ReferenceButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button type="button" className="apple-action" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Tabela de FiO2 vs Suplementação O2</button>
    <dialog className="apple-help-dialog sara-fio-dialog" ref={dialog} aria-labelledby="sara-fio2-title">
      <button type="button" className="apple-action sara-fio-close" onClick={() => dialog.current?.close()} aria-label="Fechar tabela de FiO₂">Fechar ×</button>
    <h2 id="sara-fio2-title">Tabela de FiO₂ vs Suplementação O₂</h2>
    <p className="sara-muted">Faixas de referência, não uma conversão de L/min para FiO₂. A concentração efetivamente inspirada varia com vedação, ventilação e respiração pela boca. Não preenchemos a calculadora com estas estimativas.</p>
    <div className="sara-table-scroll"><table><caption>Referência de oxigenoterapia em pequenos animais</caption><thead><tr><th>Método</th><th>FiO₂ de referência</th><th>Como interpretar</th></tr></thead><tbody>
      <tr><th>Ar ambiente</th><td>21%</td><td>Sem suplementação.</td></tr>
      <tr><th>Flow-by</th><td>≈25–40%</td><td>Descrita com 2–3 L/min perto das narinas; muito variável com a distância.</td></tr>
      <tr><th>Cateter nasal</th><td>≈40–60%</td><td>Faixa descrita com 50–100 mL/kg/min de O₂ umidificado; não garante a FiO₂ individual.</td></tr>
      <tr><th>Máscara</th><td>Variável</td><td>Depende de vedação e entrada de ar ambiente; não atribuir valor fixo.</td></tr>
      <tr><th>Gaiola de oxigênio</th><td>Usar concentração medida</td><td>A abertura da porta reduz a concentração. Monitorar também temperatura, umidade e CO₂.</td></tr>
      <tr><th>Alto fluxo nasal</th><td>Ajustável, até 100%</td><td>Usar a concentração ajustada com fluxo adequado aos critérios ARDSVet.</td></tr>
      <tr><th>Ventilação invasiva</th><td>Usar FiO₂ do equipamento</td><td>Registrar a concentração entregue e a PEEP no momento da coleta.</td></tr>
    </tbody></table></div>
    <a className="sara-source" href="https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2023.1070881/full" target="_blank" rel="noreferrer">Whitney & Keir, 2023 · métodos de oxigenação e alto fluxo ↗</a>
    <a className="sara-source" href="https://www.merckvetmanual.com/emergency-medicine-and-critical-care/evaluation-and-initial-treatment-of-small-animal-emergency-patients/initial-triage-and-resuscitation-of-small-animal-emergency-patients" target="_blank" rel="noreferrer">Merck Veterinary Manual · suplementação de oxigênio ↗</a>
    </dialog>
  </>;
}
