import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { colangiteParasitariaCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.colangite-parasitaria.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DiseaseSectionRenderer } from '../../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
import { DiseaseReferenceProvider } from '../../modules/consulta-vet/context/DiseaseReferenceContext';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

test('registra colangite-parasitaria-caes-gatos no catalogo publico para caes e gatos', () => {
  const found = diseasesSeed.find((d) => d.slug === 'colangite-parasitaria-caes-gatos');
  assert.ok(found, 'colangite-parasitaria-caes-gatos deve estar registrada em diseasesSeed');
  assert.equal(found.id, 'disease-colangite-parasitaria-caes-gatos');
  assert.deepEqual(found.species, ['dog', 'cat']);
  assert.deepEqual(found.tags, ['Cães e Gatos']);
  assert.ok(found.plainLanguage?.whatIsIt.includes('ductos biliares'));
  assert.ok(found.plainLanguage?.warningSigns?.includes('amarelada'));
  assert.ok(found.quickSummaryRich?.integratedOverview);

  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes('colangite-parasitaria-caes-gatos'),
    'Slug deve estar em CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
  );
  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === 'colangite-parasitaria-caes-gatos');
  assert.ok(stub, 'Stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.deepEqual(stub.species, ['dog', 'cat']);
  assert.deepEqual(stub.tags, ['Cães e Gatos']);
});

test('valida figuras clinicas CC BY 4.0 inline em public/ e ausencia de **, checklist ou top-level figures', () => {
  assert.equal((colangiteParasitariaCaesGatosRecord as { figures?: unknown }).figures, undefined);
  const serialized = JSON.stringify(colangiteParasitariaCaesGatosRecord);
  assert.equal(/\*\*/.test(serialized), false, 'nao deve conter marcadores **');
  assert.equal(/Checklist clínico/i.test(serialized), false);

  const figPaths = [
    '/consulta-vet/platinosomose-felina/parasito-adulto-platynosomum-lathroum2018.png',
    '/consulta-vet/platinosomose-felina/painel-clinico-colecistocentese-sousa2025.jpg',
    '/consulta-vet/platinosomose-felina/comparacao-laboratorial-eosinofilos-chantawong2024.png',
    '/consulta-vet/platinosomose-felina/ovos-platynosomum-fezes-chantawong2024.png',
  ];
  for (const rel of figPaths) {
    const abs = path.resolve(process.cwd(), 'public', rel.replace(/^\//, ''));
    assert.ok(fs.existsSync(abs), `Arquivo de imagem ausente: ${abs}`);
    assert.ok(serialized.includes(rel), `Figura deve estar referenciada no seed: ${rel}`);
  }
});

test('valida todas as citacoes {{ref:...}} e traducoes explicitas de subsecoes cp*', () => {
  const refIds = new Set(colangiteParasitariaCaesGatosRecord.references?.map((r) => r.id) ?? []);
  const serialized = JSON.stringify(colangiteParasitariaCaesGatosRecord);
  const matches = [...serialized.matchAll(/\{\{ref:([a-z0-9-]+)\}\}/g)].map((m) => m[1]);
  assert.ok(matches.length >= 20, 'deve conter citacoes {{ref:...}}');
  for (const id of matches) {
    assert.ok(refIds.has(id), `Referencia citada sem entrada em references: ${id}`);
  }

  const keys = [
    ...Object.keys(colangiteParasitariaCaesGatosRecord.etiology ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.epidemiology ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.pathogenesisTransmission ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.pathophysiology ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.diagnosis ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.treatment ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.prevention ?? {}),
    ...Object.keys(colangiteParasitariaCaesGatosRecord.complications ?? {}),
  ];
  for (const k of keys) {
    const label = translateEditorialSubsectionKey(k);
    assert.ok(!label.startsWith('Cp'), `Chave sem traducao explicita: ${k} -> ${label}`);
  }
});

test('renderizacao SSR integral nao expoe == literais nem {{ref:}} e exibe comparativo Caes/Gatos', () => {
  const sections = [
    ['etiology', colangiteParasitariaCaesGatosRecord.etiology],
    ['epidemiology', colangiteParasitariaCaesGatosRecord.epidemiology],
    ['pathogenesisTransmission', colangiteParasitariaCaesGatosRecord.pathogenesisTransmission],
    ['pathophysiology', colangiteParasitariaCaesGatosRecord.pathophysiology],
    ['clinicalSignsPathophysiology', colangiteParasitariaCaesGatosRecord.clinicalSignsPathophysiology],
    ['diagnosis', colangiteParasitariaCaesGatosRecord.diagnosis],
    ['treatment', colangiteParasitariaCaesGatosRecord.treatment],
    ['prevention', colangiteParasitariaCaesGatosRecord.prevention],
    ['complications', colangiteParasitariaCaesGatosRecord.complications],
  ] as const;

  const html = renderToStaticMarkup(
    React.createElement(
      DiseaseReferenceProvider,
      { references: colangiteParasitariaCaesGatosRecord.references ?? [] },
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
  assert.ok(html.includes('parasito-adulto-platynosomum-lathroum2018.png'));
  assert.ok(html.includes('painel-clinico-colecistocentese-sousa2025.jpg'));
  assert.ok(html.includes('comparacao-laboratorial-eosinofilos-chantawong2024.png'));
  assert.ok(html.includes('ovos-platynosomum-fezes-chantawong2024.png'));
});
