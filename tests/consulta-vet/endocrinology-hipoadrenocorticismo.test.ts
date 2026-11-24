import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { hipoadrenocorticismoAddisonRecord } from '../../modules/consulta-vet/data/seed/diseases.hipoadrenocorticismo.seed';
import { DiseaseSectionRenderer } from '../../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
import { DiseaseReferenceProvider } from '../../modules/consulta-vet/context/DiseaseReferenceContext';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

test('registra hipoadrenocorticismo-addison no catalogo com especies caes e gatos, tag unica e visao integrada', () => {
  const found = diseasesSeed.find((d) => d.slug === 'hipoadrenocorticismo-addison');
  assert.ok(found, 'hipoadrenocorticismo-addison deve estar registrada em diseasesSeed');
  assert.equal(found.id, 'disease-hipoadrenocorticismo-addison');
  assert.deepEqual(found.species, ['dog', 'cat']);
  assert.deepEqual(found.tags, ['Cães e Gatos']);
  assert.ok(found.plainLanguage?.whatIsIt.includes('cães ou gatos'));
  assert.ok(found.plainLanguage?.warningSigns?.includes('Vômitos'));
  assert.ok(found.quickSummaryRich?.integratedOverview);
});

test('valida figuras clinicas CC BY 4.0 em public/ e ausencia de **, checklist e secao figures', () => {
  assert.equal((hipoadrenocorticismoAddisonRecord as { figures?: unknown }).figures, undefined);
  const serialized = JSON.stringify(hipoadrenocorticismoAddisonRecord);
  assert.equal(/\*\*/.test(serialized), false, 'nao deve conter marcadores **');
  assert.equal(/Checklist clínico/i.test(serialized), false);

  const figPaths = [
    '/consulta-vet/hipoadrenocorticismo/pasca-2025-ecg-bav3.png',
    '/consulta-vet/hipoadrenocorticismo/pasca-2025-usg-adrenais.png',
    '/consulta-vet/hipoadrenocorticismo/pasca-2025-ecg-reversao-24h.png',
  ];
  for (const rel of figPaths) {
    const abs = path.resolve(process.cwd(), 'public', rel.replace(/^\//, ''));
    assert.ok(fs.existsSync(abs), `Arquivo de imagem ausente: ${abs}`);
    assert.ok(serialized.includes(rel), `Figura deve estar referenciada no seed: ${rel}`);
  }
});

test('valida todas as citacoes {{ref:...}} e traducoes explicitas de subsecoes haco*', () => {
  const refIds = new Set(hipoadrenocorticismoAddisonRecord.references?.map((r) => r.id) ?? []);
  const serialized = JSON.stringify(hipoadrenocorticismoAddisonRecord);
  const matches = [...serialized.matchAll(/\{\{ref:([a-z0-9-]+)\}\}/g)].map((m) => m[1]);
  assert.ok(matches.length >= 20, 'deve conter citacoes {{ref:...}} ao longo das secoes');
  for (const id of matches) {
    assert.ok(refIds.has(id), `Referencia citada sem entrada em references: ${id}`);
  }

  const keys = [
    ...Object.keys(hipoadrenocorticismoAddisonRecord.etiology ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.epidemiology ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.pathogenesisTransmission ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.pathophysiology ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.diagnosis ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.treatment ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.prevention ?? {}),
    ...Object.keys(hipoadrenocorticismoAddisonRecord.complications ?? {}),
  ];
  for (const k of keys) {
    const label = translateEditorialSubsectionKey(k);
    assert.ok(!label.startsWith('Haco'), `Chave sem traducao explicita: ${k} -> ${label}`);
  }
});

test('renderizacao SSR integral nao expoe == literais nem {{ref:}} e exibe comparativo Caes/Gatos', () => {
  const sections = [
    ['etiology', hipoadrenocorticismoAddisonRecord.etiology],
    ['epidemiology', hipoadrenocorticismoAddisonRecord.epidemiology],
    ['pathogenesisTransmission', hipoadrenocorticismoAddisonRecord.pathogenesisTransmission],
    ['pathophysiology', hipoadrenocorticismoAddisonRecord.pathophysiology],
    ['clinicalSignsPathophysiology', hipoadrenocorticismoAddisonRecord.clinicalSignsPathophysiology],
    ['diagnosis', hipoadrenocorticismoAddisonRecord.diagnosis],
    ['treatment', hipoadrenocorticismoAddisonRecord.treatment],
    ['prevention', hipoadrenocorticismoAddisonRecord.prevention],
    ['complications', hipoadrenocorticismoAddisonRecord.complications],
  ] as const;

  const html = renderToStaticMarkup(
    React.createElement(
      DiseaseReferenceProvider,
      { references: hipoadrenocorticismoAddisonRecord.references ?? [] },
      React.createElement(
        MemoryRouter,
        null,
        React.createElement(
          'div',
          null,
          ...sections.map(([sectionKey, sec]) =>
            React.createElement(DiseaseSectionRenderer, {
              key: sectionKey,
              id: sectionKey,
              title: sectionKey,
              data: sec,
            })
          )
        )
      )
    )
  );

  assert.equal(html.includes('=='), false, 'HTML final nao deve expor == literais');
  assert.equal(html.includes('{{ref:'), false, 'HTML final nao deve expor {{ref:}} nao resolvidos');
  assert.ok(html.includes('consulta-vet-readable-highlight'), 'deve renderizar marca-texto em blocos e tabelas');
  assert.ok(html.includes('>Cães<') && html.includes('>Gatos<'), 'deve renderizar badges comparativos de Cães e Gatos');
  assert.ok(html.includes('pasca-2025-ecg-bav3.png'), 'deve renderizar figura de ECG');
  assert.ok(html.includes('pasca-2025-usg-adrenais.png'), 'deve renderizar figura de ultrassom adrenal');
  assert.ok(html.includes('pasca-2025-ecg-reversao-24h.png'), 'deve renderizar figura de reversao ao ritmo sinusal');
});
