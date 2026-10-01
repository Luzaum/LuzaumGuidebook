import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { medicationsSeed } from '../../modules/consulta-vet/data/seed/medications.seed';
import { PROGRESSIVE_SUMMARY_PREVIEWS as previews } from '../../modules/consulta-vet/data/progressiveSummaryPreviews';
import { DiseaseQuickSummaryPanel } from '../../modules/consulta-vet/components/disease/DiseaseQuickSummaryPanel';
import { MedicationQuickSummaryPanel } from '../../modules/consulta-vet/components/medication/MedicationQuickSummaryPanel';
import { QuickDecisionStrip } from '../../modules/consulta-vet/components/disease/QuickDecisionStrip';
import { SummaryPreview } from '../../modules/consulta-vet/components/shared/SummaryPreview';
const text = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/\s+/g,' ').trim();
const words = (s: string) => s.trim().split(/\s+/).length;
test('introduções editoriais existentes permanecem concisas', () => {
  for (const record of [...diseasesSeed, ...medicationsSeed]) {
    const preview=previews[record.slug]; if (!preview) continue;
    assert.ok(words(preview.simple)<=55,record.slug);
    const pillars='quickSummaryRich' in record ? record.quickSummaryRich?.pillars : 'pillars' in record ? record.pillars : [];
    for(const pillar of pillars??[]) {assert.ok(preview.pillars[pillar.title],`${record.slug}: ${pillar.title}`);assert.ok(words(preview.pillars[pillar.title])<=28,record.slug);}
  }
});
test('doenças mantêm abas e todos os textos originais para aprofundamento', () => {
  for(const d of diseasesSeed) {
    if(!d.quickSummaryRich) continue;
    const before=JSON.stringify(d);
    const html=renderToStaticMarkup(<DiseaseQuickSummaryPanel data={d.quickSummaryRich} slug={d.slug} plainLanguage={d.plainLanguage}/>);
    const rendered=text(html);
    assert.doesNotMatch(html, /<details|<summary/, `${d.slug}: explicação escondida`);
    if (previews[d.slug]) assert.ok(rendered.includes(previews[d.slug].simple),d.slug);
    for(const original of [d.quickSummaryRich.lead,...(d.quickSummaryRich.pillars??[]).map(p=>p.body),d.plainLanguage?.whatIsIt,...(d.plainLanguage?.keyPoints??[])]) if(original) assert.ok(rendered.includes(original.replace(/\s+/g,' ').trim()),`${d.slug}: texto perdido`);
    for(const title of ['Visão Geral','Plano diagnóstico','Plano de tratamento']) assert.ok(rendered.includes(title));
    assert.equal(JSON.stringify(d),before);
  }
});
test('medicamentos preservam indicações, doses, vias, duração, mecanismos e avisos completos', () => {
  for(const m of medicationsSeed) {
    const before=JSON.stringify(m);
    const html=renderToStaticMarkup(<MedicationQuickSummaryPanel medication={m}/>);const rendered=text(html);
    assert.doesNotMatch(html, /<details|<summary/, `${m.slug}: explicação escondida`);
    if (previews[m.slug]) assert.ok(rendered.includes(previews[m.slug].simple),m.slug);
    const originals=[m.plainLanguageSummary,...(m.pillars??[]).map(p=>p.desc),...(m.quickIndications??[]).flatMap(i=>[i.condition,i.clinicalContext,i.doseSummary,i.route,i.duration]),...(m.clinicalWarningItems??[]).flatMap(i=>[i.label,i.text])];
    for(const original of originals) if(original) assert.ok(rendered.includes(original.replace(/\s+/g,' ').trim()),`${m.slug}: ${original.slice(0,60)}`);
    assert.equal(JSON.stringify(m),before);
  }
});
test('orientações completas preservam todas as notas, inclusive além da quinta',()=>{
  for(const d of diseasesSeed){const rendered=text(renderToStaticMarkup(<QuickDecisionStrip slug={d.slug} items={d.quickDecisionStrip}/>));for(const note of d.quickDecisionStrip) assert.ok(rendered.includes(note.replace(/\s+/g,' ').trim()),d.slug);}
});
test('introdução e explicação integral aparecem diretamente, sem controle de expansão',()=>{
  const html=renderToStaticMarkup(<SummaryPreview preview="Prévia curta."><p>Explicação integral com condições e ressalvas.</p></SummaryPreview>);
  assert.doesNotMatch(html,/<details|<summary|<button/);
  assert.match(html,/Explicação integral com condições e ressalvas/);
  assert.ok(html.indexOf('Prévia curta.')<html.indexOf('Explicação integral'));
  const fallback=renderToStaticMarkup(<SummaryPreview><p>Texto sem prévia editorial.</p></SummaryPreview>);assert.match(fallback,/Texto sem prévia editorial/);assert.doesNotMatch(fallback,/<details/);
});
