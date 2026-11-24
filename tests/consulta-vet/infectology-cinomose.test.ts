import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { cinomoseCaninaRecord } from '../../modules/consulta-vet/data/seed/diseases.cinomose-canina.seed';
import { DiseaseSectionRenderer } from '../../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
import { DiseaseReferenceProvider } from '../../modules/consulta-vet/context/DiseaseReferenceContext';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

test('registra cinomose-canina no catalogo publico com metadados e linguagem simples', () => {
  const found = diseasesSeed.find((d) => d.slug === 'cinomose-canina');
  assert.ok(found, 'cinomose-canina deve estar registrada em diseasesSeed');
  assert.deepEqual(found.species, ['dog']);
  assert.deepEqual(found.tags, ['Cães']);
  assert.ok(found.plainLanguage?.whatIsIt.includes('vírus da cinomose canina'));
  assert.ok(found.quickSummaryRich?.integratedOverview);
});

test('valida figuras cientificas inline em public/ e ausencia de marcadores ** ou checklist duplicado', () => {
  assert.equal((cinomoseCaninaRecord as { figures?: unknown }).figures, undefined);
  const serialized = JSON.stringify(cinomoseCaninaRecord);
  assert.equal(/\*\*/.test(serialized), false, 'nao deve conter marcadores **');
  assert.equal(/Checklist clínico de 10 pontos/i.test(serialized), false);

  const figPaths = [
    '/consulta-vet/cinomose/verdes-2024-cerebelo-lfb.jpg',
    '/consulta-vet/cinomose/nuhoglu-2026-astrocitos-gfap-cdv.jpg',
    '/consulta-vet/cinomose/iribarnegaray-2024-ddpcr.jpg',
  ];
  for (const rel of figPaths) {
    const abs = path.resolve(process.cwd(), 'public', rel.replace(/^\//, ''));
    assert.ok(fs.existsSync(abs), `Arquivo de imagem ausente: ${abs}`);
    assert.ok(serialized.includes(rel), `Figura deve estar referenciada no seed: ${rel}`);
  }
});

test('valida todas as citacoes {{ref:...}} e traducoes de subsecoes cdv*', () => {
  const refIds = new Set(cinomoseCaninaRecord.references?.map((r) => r.id) ?? []);
  const serialized = JSON.stringify(cinomoseCaninaRecord);
  const matches = [...serialized.matchAll(/\{\{ref:([a-z0-9-]+)\}\}/g)].map((m) => m[1]);
  assert.ok(matches.length > 15, 'deve conter citacoes {{ref:...}}');
  for (const id of matches) {
    assert.ok(refIds.has(id), `Referencia citada sem entrada em references: ${id}`);
  }

  const keys = [
    ...Object.keys(cinomoseCaninaRecord.etiology ?? {}),
    ...Object.keys(cinomoseCaninaRecord.epidemiology ?? {}),
    ...Object.keys(cinomoseCaninaRecord.pathogenesisTransmission ?? {}),
    ...Object.keys(cinomoseCaninaRecord.pathophysiology ?? {}),
    ...Object.keys(cinomoseCaninaRecord.diagnosis ?? {}),
    ...Object.keys(cinomoseCaninaRecord.treatment ?? {}),
    ...Object.keys(cinomoseCaninaRecord.prevention ?? {}),
    ...Object.keys(cinomoseCaninaRecord.complications ?? {}),
  ];
  for (const k of keys) {
    const label = translateEditorialSubsectionKey(k);
    assert.ok(!label.startsWith('Cdv'), `Chave sem traducao explicita: ${k} -> ${label}`);
  }
});

test('renderizacao SSR integral da cinomose nao expoe == literais nem {{ref:}} e renderiza badges Cao/Gato', () => {
  const sections = [
    ['etiology', cinomoseCaninaRecord.etiology],
    ['epidemiology', cinomoseCaninaRecord.epidemiology],
    ['pathogenesisTransmission', cinomoseCaninaRecord.pathogenesisTransmission],
    ['pathophysiology', cinomoseCaninaRecord.pathophysiology],
    ['clinicalSignsPathophysiology', cinomoseCaninaRecord.clinicalSignsPathophysiology],
    ['diagnosis', cinomoseCaninaRecord.diagnosis],
    ['treatment', cinomoseCaninaRecord.treatment],
    ['prevention', cinomoseCaninaRecord.prevention],
    ['complications', cinomoseCaninaRecord.complications],
  ] as const;
  const html = renderToStaticMarkup(
    React.createElement(
      DiseaseReferenceProvider,
      { references: cinomoseCaninaRecord.references ?? [] },
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
  assert.equal(html.includes('=='), false, 'SSR nao deve conter == literais');
  assert.equal(html.includes('{{ref:'), false, 'SSR nao deve conter {{ref:}} cru');
  assert.ok(html.includes('consulta-vet-readable-highlight'), 'SSR deve renderizar destaques <mark>');
  assert.ok(html.includes('>Cães<') && html.includes('>Gatos<'), 'SSR deve exibir cards de Caes e Gatos');
});
