import React, { useMemo, useState } from 'react';
import { AnalysisResult, AnalyzerInputs, BOOK_REFERENCES, DEFAULT_INPUTS, analyzeFromBook, formatRange } from './hemogasometryBookEngine';

const NAV_SECTIONS = [
  { id: 'overview', label: 'Visão geral', icon: 'space_dashboard' },
  { id: 'analyzer-form', label: 'Parâmetros', icon: 'science' },
  { id: 'analysis-results', label: 'Resultados', icon: 'monitor_heart' },
  { id: 'collection-guide', label: 'Boas práticas', icon: 'menu_book' },
];

const sectionClassName = 'rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-sky-500/15 dark:bg-[#06090f] dark:shadow-[0_24px_80px_-45px_rgba(56,189,248,0.24)]';
const inputClassName = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-sky-500/15 dark:bg-[#0b111a] dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-400/20';
const labelClassName = 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-sky-200/70';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Field({ label, id, value, onChange, step = '0.1' }: { label: string; id: keyof AnalyzerInputs; value: string; onChange: (id: keyof AnalyzerInputs, value: string) => void; step?: string }) {
  return <label><span className={labelClassName}>{label}</span><input className={inputClassName} type="number" step={step} value={value} onChange={(event) => onChange(id, event.target.value)} /></label>;
}

function Sidebar({ inputs, stale, onReset, onBack, onNavigate }: { inputs: AnalyzerInputs; stale: boolean; onReset: () => void; onBack: () => void; onNavigate: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className={sectionClassName}>
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500 text-slate-950"><span className="material-symbols-outlined">science</span></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-sky-200/70">Vetius</p><h2 className="text-lg font-bold">HemogasometriaVET</h2></div>
        </div>
        <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:border-sky-500/15 dark:bg-[#0b111a] dark:text-sky-100/75">{stale ? 'Há parâmetros novos não interpretados.' : 'Resultado sincronizado com a tela.'}</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <InfoTile title="Espécie" value={inputs.species === 'dog' ? 'Cão' : 'Gato'} />
          <InfoTile title="Amostra" value={inputs.sampleType === 'arterial' ? 'Arterial' : 'Venosa'} />
        </div>
        <button type="button" onClick={onReset} className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-[22px] border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-sky-500/15 dark:bg-[#0b111a] dark:text-slate-100 dark:hover:bg-[#0f1622]">Recarregar valores normais</button>
      </div>
      <div className="space-y-2">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Navegação</p>
        {NAV_SECTIONS.map((section) => <button key={section.id} type="button" onClick={() => onNavigate(section.id)} className="flex w-full items-center justify-between rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-left transition hover:bg-slate-50 dark:border-sky-500/15 dark:bg-[#06090f] dark:hover:bg-[#0b111a]"><span className="flex items-center gap-3"><span className="material-symbols-outlined text-slate-500 dark:text-sky-300">{section.icon}</span><span className="font-medium">{section.label}</span></span><span className="material-symbols-outlined text-slate-400 dark:text-sky-300/70">chevron_right</span></button>)}
      </div>
      <button type="button" onClick={onBack} className="mt-auto flex min-h-[56px] w-full items-center justify-center rounded-[22px] bg-sky-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400">Voltar ao hub</button>
    </div>
  );
}

function InfoTile({ title, value }: { title: string; value: string }) {
  return <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-3 dark:border-sky-500/15 dark:bg-[#0b111a]"><div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-sky-200/70">{title}</div><div className="mt-2 text-lg font-bold">{value}</div></div>;
}

function ResultCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return <div className={sectionClassName}><div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">{title}</div><div className="mt-3 text-xl font-bold text-slate-900 dark:text-sky-300">{value}</div><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p></div>;
}

export default function HemogasometriaAnalyzerV2({ onBack }: { onBack: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputs, setInputs] = useState<AnalyzerInputs>(DEFAULT_INPUTS.dog);
  const [submitted, setSubmitted] = useState<AnalyzerInputs>(DEFAULT_INPUTS.dog);
  const analysis = useMemo<AnalysisResult>(() => analyzeFromBook(submitted), [submitted]);
  const stale = useMemo(() => JSON.stringify(inputs) !== JSON.stringify(submitted), [inputs, submitted]);
  const ref = BOOK_REFERENCES[inputs.species];

  const setField = (id: keyof AnalyzerInputs, value: string) => setInputs((current) => ({ ...current, [id]: value }));
  const setSpecies = (species: 'dog' | 'cat') => { setInputs(DEFAULT_INPUTS[species]); setSubmitted(DEFAULT_INPUTS[species]); };
  const handleAnalyze = (event: React.FormEvent) => { event.preventDefault(); setSubmitted(inputs); window.setTimeout(() => scrollToId('analysis-results'), 60); };
  const handleReset = () => { setInputs(DEFAULT_INPUTS[inputs.species]); setSubmitted(DEFAULT_INPUTS[inputs.species]); };

  return (
    <div className="flex min-h-full w-full bg-slate-50 text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_26%),linear-gradient(180deg,_#02050a_0%,_#050910_100%)] dark:text-slate-100">
      {sidebarOpen ? <div className="fixed inset-0 z-50 xl:hidden"><button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu" /><aside className="absolute inset-y-0 left-0 w-[min(86vw,340px)] overflow-y-auto border-r border-sky-500/15 bg-white p-4 dark:bg-[#05080d]"><Sidebar inputs={inputs} stale={stale} onReset={handleReset} onBack={onBack} onNavigate={(id) => { setSidebarOpen(false); scrollToId(id); }} /></aside></div> : null}
      <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-white/95 p-4 xl:block dark:border-sky-500/15 dark:bg-[#05080d]/95"><div className="sticky top-6"><Sidebar inputs={inputs} stale={stale} onReset={handleReset} onBack={onBack} onNavigate={scrollToId} /></div></aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6">
          <section id="overview" className={sectionClassName}>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setSidebarOpen(true)} className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 xl:hidden dark:border-sky-500/15 dark:bg-[#0b111a]" aria-label="Abrir menu"><span className="material-symbols-outlined">menu</span></button>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"><span className="material-symbols-outlined">science</span></div>
                  <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Engine nova do zero</p><h1 className="text-3xl font-bold tracking-tight">Hemogasometria Veterinária</h1></div>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-300">Analisador reconstruído com base no <em>Guia Prático de Hemogasometria de Cães e Gatos (2023)</em>: foco em pH, PCO2, HCO3, PO2, compensação, Δ(A-a)O2, BE e ânion gap corrigido.</p>
                <div className="mt-5 grid gap-3 md:grid-cols-3"><InfoTile title="Espécie" value={inputs.species === 'dog' ? 'Canino' : 'Felino'} /><InfoTile title="Amostra" value={inputs.sampleType === 'arterial' ? 'Arterial' : 'Venosa'} /><InfoTile title="Status" value={stale ? 'Aguardando nova análise' : 'Resultado sincronizado'} /></div>
              </div>
              <div className="xl:w-[320px]"><button type="submit" form="hemogasometry-form" className="flex min-h-[62px] w-full items-center justify-center rounded-[22px] bg-sky-500 px-5 py-4 text-base font-bold text-slate-950 transition hover:bg-sky-400 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.18),0_18px_45px_-22px_rgba(56,189,248,0.55)]">Analisar resultados</button></div>
            </div>
          </section>

          <form id="hemogasometry-form" onSubmit={handleAnalyze} className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
            <section id="analyzer-form" className={`${sectionClassName} space-y-5`}>
              <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Parâmetros da amostra</p><h2 className="mt-1 text-2xl font-bold">Entrada clínica</h2></div><div className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-sky-500/15 dark:bg-[#0b111a] dark:text-slate-300">Dark mode preto + azul claro</div></div>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className={sectionClassName}>
                  <h3 className="mb-4 text-lg font-bold">Paciente e coleta</h3>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setSpecies('dog')} className={`rounded-[22px] border px-4 py-4 text-left transition ${inputs.species === 'dog' ? 'border-sky-400 bg-sky-50 dark:border-sky-400 dark:bg-[#08111c]' : 'border-slate-200 bg-slate-50 dark:border-sky-500/15 dark:bg-[#0b111a]'}`}><span className="block text-sm font-bold">Cão</span></button>
                      <button type="button" onClick={() => setSpecies('cat')} className={`rounded-[22px] border px-4 py-4 text-left transition ${inputs.species === 'cat' ? 'border-sky-400 bg-sky-50 dark:border-sky-400 dark:bg-[#08111c]' : 'border-slate-200 bg-slate-50 dark:border-sky-500/15 dark:bg-[#0b111a]'}`}><span className="block text-sm font-bold">Gato</span></button>
                    </div>
                    <label><span className={labelClassName}>Tipo de amostra</span><select className={inputClassName} value={inputs.sampleType} onChange={(event) => setField('sampleType', event.target.value as AnalyzerInputs['sampleType'])}><option value="arterial">Arterial</option><option value="venous">Venosa</option></select></label>
                    <Field label="Temperatura (°C)" id="temperature" value={inputs.temperature} onChange={setField} />
                    <Field label="FiO2 (%)" id="fio2" value={inputs.fio2} onChange={setField} step="1" />
                    <Field label="Pressão barométrica (mmHg)" id="barometricPressure" value={inputs.barometricPressure} onChange={setField} step="1" />
                  </div>
                </div>
                <div className={sectionClassName}>
                  <h3 className="mb-4 text-lg font-bold">Gasometria</h3>
                  <div className="grid gap-3">
                    <Field label={`pH | ref ${formatRange(ref.pH[inputs.sampleType])}`} id="ph" value={inputs.ph} onChange={setField} step="0.01" />
                    <Field label={`PCO2 | ref ${formatRange(ref.pco2[inputs.sampleType])}`} id="pco2" value={inputs.pco2} onChange={setField} />
                    <Field label={`PO2 | ref ${ref.po2[inputs.sampleType] ? formatRange(ref.po2[inputs.sampleType]!) : 'usar PO2 arterial'}`} id="po2" value={inputs.po2} onChange={setField} />
                    <Field label={`HCO3 | ref ${formatRange(ref.hco3[inputs.sampleType])}`} id="hco3" value={inputs.hco3} onChange={setField} />
                    <Field label={`SO2 | ref ${formatRange(ref.so2)}`} id="so2" value={inputs.so2} onChange={setField} />
                    <Field label="BE | ref -4 a +4" id="be" value={inputs.be} onChange={setField} />
                  </div>
                </div>
                <div className={sectionClassName}>
                  <h3 className="mb-4 text-lg font-bold">Ânion gap e apoio</h3>
                  <div className="grid gap-3">
                    <Field label="Na+" id="na" value={inputs.na} onChange={setField} />
                    <Field label="K+" id="k" value={inputs.k} onChange={setField} />
                    <Field label="Cl-" id="cl" value={inputs.cl} onChange={setField} />
                    <Field label="Albumina (g/dL)" id="albumin" value={inputs.albumin} onChange={setField} />
                    <Field label="Lactato (mmol/L)" id="lactate" value={inputs.lactate} onChange={setField} />
                    <Field label="Glicose (mg/dL)" id="glucose" value={inputs.glucose} onChange={setField} />
                    <Field label="cTCO2 (mmol/L)" id="tco2" value={inputs.tco2} onChange={setField} />
                  </div>
                </div>
              </div>
            </section>

            <aside className={`${sectionClassName} space-y-4`}>
              <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Leitura rápida</p><h2 className="mt-1 text-2xl font-bold">Análise atual</h2></div>
              <InfoTile title="pH" value={analysis.acidBaseLabel} />
              <InfoTile title="Distúrbio primário" value={analysis.primaryDisorder} />
              <InfoTile title="Compensação" value={analysis.compensationLabel} />
              <InfoTile title="AG corrigido" value={`${analysis.correctedAnionGap.toFixed(1)} mEq/L`} />
              <button type="submit" className="flex min-h-[60px] w-full items-center justify-center rounded-[22px] bg-slate-900 px-5 py-4 text-base font-bold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">Aplicar análise</button>
              <button type="button" onClick={handleReset} className="flex min-h-[56px] w-full items-center justify-center rounded-[22px] border border-slate-200 px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-sky-500/15 dark:bg-[#0b111a] dark:text-slate-100 dark:hover:bg-[#0f1622]">Recarregar valores normais</button>
            </aside>
          </form>

          <section id="analysis-results" className="grid gap-4 xl:grid-cols-2">
            <ResultCard title="Status ácido-base" value={analysis.acidBaseLabel} detail={analysis.primaryDisorder} />
            <ResultCard title="Compensação" value={analysis.compensationLabel} detail={analysis.compensationExpected} />
            <ResultCard title="Oxigenação" value={analysis.oxygenationLabel} detail={analysis.oxygenationDetail} />
            <ResultCard title="Ânion gap" value={analysis.anionGapLabel} detail={`AG medido ${analysis.anionGapValue.toFixed(1)} | AG corrigido ${analysis.correctedAnionGap.toFixed(1)} mEq/L`} />
            <div className={`${sectionClassName} xl:col-span-2`}><div className="grid gap-4 xl:grid-cols-3"><ResultCard title="Amostra" value="Compatibilidade" detail={analysis.sampleComment} /><ResultCard title="Base excess" value="Leitura metabólica" detail={analysis.beComment} /><div className={sectionClassName}><div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Diferenciais</div><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{analysis.differentials.map((item) => <li key={item}>• {item}</li>)}</ul></div></div></div>
            <div className={`${sectionClassName} xl:col-span-2`}><div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Alertas do cálculo</p><h2 className="mt-1 text-2xl font-bold">Sinais de atenção</h2></div><div className="grid gap-3">{analysis.alerts.length ? analysis.alerts.map((alert) => <div key={alert} className="rounded-[22px] border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-slate-700 dark:border-sky-500/15 dark:bg-[#08111c] dark:text-slate-200">{alert}</div>) : <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-sky-500/15 dark:bg-[#08111c] dark:text-slate-200">Sem alertas adicionais com os parâmetros atuais.</div>}</div></div>
          </section>

          <section id="collection-guide" className={sectionClassName}>
            <div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-sky-200/70">Livro de referência</p><h2 className="mt-1 text-2xl font-bold">Guia de coleta de sangue arterial</h2></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-sky-500/15 dark:bg-[#0b111a]"><h3 className="mb-3 text-lg font-bold">Passo a passo</h3><ul className="space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300"><li>• Localize a artéria e prepare o campo de forma asséptica.</li><li>• A punção pode ser em cerca de 45° sob o dedo ou 90° entre dois dedos.</li><li>• O sangue arterial deve pulsar para dentro da seringa heparinizada.</li><li>• Após coletar o volume indicado, comprima o local por pelo menos 20 minutos.</li></ul></div>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-sky-500/15 dark:bg-[#0b111a]"><h3 className="mb-3 text-lg font-bold">Cuidados pré-analíticos</h3><ul className="space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300"><li>• Expulse todo o ar da seringa imediatamente após a coleta.</li><li>• Tampe a seringa para evitar contato com o ar ambiente.</li><li>• Analise a amostra imediatamente; no gelo, no máximo até uma hora.</li><li>• Excesso de heparina, sangue venoso e atraso na análise distorcem a interpretação.</li></ul></div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
