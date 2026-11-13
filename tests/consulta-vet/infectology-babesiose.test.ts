import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DiseaseSectionRenderer } from '../../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
import { DiseaseReferenceProvider } from '../../modules/consulta-vet/context/DiseaseReferenceContext';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { CONCISE_DISEASE_SUMMARIES } from '../../modules/consulta-vet/data/conciseClinicalSummaries';
import { PROGRESSIVE_SUMMARY_PREVIEWS } from '../../modules/consulta-vet/data/progressiveSummaryPreviews';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { applyDiseaseOverviewOverride } from '../../modules/consulta-vet/data/seed/diseaseOverviewOverrides';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { babesioseCaesGatosRecord } from '../../modules/consulta-vet/data/seed/diseases.babesiose-caes-gatos.seed';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { translateEditorialSubsectionKey } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';
import { sortDiagnosticSubsectionEntries } from '../../modules/consulta-vet/utils/editorialSubsectionOrder';

const SLUG = 'babesiose-caes-gatos';
const OLD_SLUG = 'babesiose-canina';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de babesiose-caes-gatos deve existir em diseasesSeed');
  return fromSeed;
}

test('exclui o registro legado babesiose-canina e registra a ficha unificada babesiose-caes-gatos', () => {
  assert.equal(diseasesSeed.some((d) => d.slug === OLD_SLUG), false, 'Slug legado nao deve existir em diseasesSeed');
  assert.equal(
    (CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(OLD_SLUG),
    false,
    'Slug legado nao deve existir no catalogo publico',
  );
  assert.equal(
    PUBLIC_CATALOG_DISEASE_CARD_STUBS.some((c) => c.slug === OLD_SLUG),
    false,
    'Slug legado nao deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS',
  );
  assert.equal(OLD_SLUG in CONCISE_DISEASE_SUMMARIES, false);
  assert.equal(OLD_SLUG in PROGRESSIVE_SUMMARY_PREVIEWS, false);
  assert.equal(OLD_SLUG in DISEASE_PLAIN_LANGUAGE, false);
  assert.equal(applyDiseaseOverviewOverride(babesioseCaesGatosRecord), babesioseCaesGatosRecord);
  assert.equal(OLD_SLUG in DISEASE_CONSENSUS_LINKS, false);

  assert.equal(babesioseCaesGatosRecord.slug, SLUG);
  assert.equal(babesioseCaesGatosRecord.id, 'disease-babesiose-caes-gatos');
  assert.ok((CONSULTA_VET_PUBLIC_DISEASE_SLUGS as readonly string[]).includes(SLUG));

  const cardStub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((c) => c.slug === SLUG);
  assert.ok(cardStub, 'Card stub de babesiose-caes-gatos deve existir');
  assert.deepEqual(cardStub.species, ['dog', 'cat']);
  assert.ok(cardStub.quickSummary.length > 150);
});

test('valida resumo integrado no card superior, remocao de previews duplicados e ausencia de marcadores **', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog', 'cat']);
  assert.equal(record.isPublished, true);
  assert.doesNotMatch(record.subtitle ?? '', /Monografia clínica avançada/i);

  // Previews paralelos foram removidos para evitar textos duplicados dentro do card verde
  assert.equal(SLUG in PROGRESSIVE_SUMMARY_PREVIEWS, false);
  assert.equal(SLUG in CONCISE_DISEASE_SUMMARIES, false);

  const rich = record.quickSummaryRich;
  assert.ok(rich, 'quickSummaryRich deve existir');
  assert.equal(rich.integratedOverview, true);
  assert.equal((rich.pillars ?? []).length, 0);
  assert.ok((rich.leadHighlights?.length ?? 0) >= 12);
  assert.equal(record.quickDecisionStrip.length, 6);
  assert.ok(rich.diagnosticFlow?.steps && rich.diagnosticFlow.steps.length >= 6);
  assert.ok(rich.treatmentFlow?.steps && rich.treatmentFlow.steps.length >= 6);

  assert.ok(record.plainLanguage, 'plainLanguage deve existir');
  assert.ok(record.plainLanguage.keyPoints.length === 3);

  const rawText = JSON.stringify(record);
  assert.equal(rawText.includes('**'), false, 'Seed nao deve conter marcadores markdown **');
  assert.equal(rawText.includes('=='), true, 'Seed deve utilizar marcadores de grifo ==...==');
});

test('valida algoritmos interativos de diagnostico e tratamento, reordenacao clinica e remocoes pedidas', () => {
  const record = getRecord();

  // Sinais clinicos por sistema em primeiro na secao 5
  const sec5Keys = Object.keys(record.clinicalSignsPathophysiology as Record<string, unknown>);
  assert.equal(sec5Keys[0], 'sinaisClinicosPorSistema');

  // Secao 6 comeca pelo algoritmo diagnostico interativo e NAO tem casosClinicosAplicados
  const diag = record.diagnosis as Record<string, unknown>;
  assert.equal('casosClinicosAplicados' in diag, false, 'casosClinicosAplicados deve ser removido');
  const sortedDiagKeys = sortDiagnosticSubsectionEntries(Object.entries(diag)).map(([k]) => k);
  assert.equal(sortedDiagKeys[0], 'algoritmoDiagnostico');
  const diagAlgo = diag.algoritmoDiagnostico as { kind: string; mode: string; steps: Array<{ details: unknown[] }> };
  assert.equal(diagAlgo.kind, 'interactiveAlgorithm');
  assert.equal(diagAlgo.mode, 'diagnosis');
  assert.equal(diagAlgo.steps.length, 6);
  for (const step of diagAlgo.steps) {
    assert.ok(step.details.length >= 1, 'Cada etapa diagnostica precisa de detalhes expansivos');
  }

  // Secao 7 comeca pelo algoritmo terapeutico interativo (sem ordemDePrioridade hijacking)
  const treat = record.treatment as Record<string, unknown>;
  assert.equal('ordemDePrioridade' in treat, false);
  const treatKeys = Object.keys(treat);
  assert.equal(treatKeys[0], 'algoritmoTerapeuticoBabesiose');
  const treatAlgo = treat.algoritmoTerapeuticoBabesiose as { kind: string; mode: string; steps: Array<{ details: unknown[] }> };
  assert.equal(treatAlgo.kind, 'interactiveAlgorithm');
  assert.equal(treatAlgo.mode, 'treatment');
  assert.equal(treatAlgo.steps.length, 6);
  for (const step of treatAlgo.steps) {
    assert.ok(step.details.length >= 1, 'Cada etapa terapeutica precisa de detalhes expansivos');
  }

  // Secao 8 focada apenas em complicacoes e prognostico (sem revisao bibliografica deslocada)
  const comp = record.complications as Record<string, unknown>;
  assert.equal('analiseCriticaDosPrincipaisEstudos' in comp, false);
  assert.equal('tabelaEvidenciasCriticas' in comp, false);
  assert.ok('tabelaComplicacoesECondutaUti' in comp);

  // Secao 9 sem tabelaMapaLivrosAcervo e sem checklistPraticoDePlantao
  const prev = record.prevention as Record<string, unknown>;
  assert.equal('tabelaMapaLivrosAcervo' in prev, false, 'tabelaMapaLivrosAcervo deve ser removido');
  assert.equal('checklistPraticoDePlantao' in prev, false, 'checklistPraticoDePlantao deve ser removido');
});

test('valida figuras cientificas inline com shortCaption, existencia fisica em public/ e referencias limpas sem paginas de livros', () => {
  const record = getRecord();
  assert.equal(record.figures, undefined, 'Secao duplicada figures no topo deve ser omitida');
  const figs = [
    ...((record.etiology as Record<string, unknown>).figurasMorfologiaEspecie as Array<{ src: string; alt: string; shortCaption?: string; caption?: string }>),
    ...((record.epidemiology as Record<string, unknown>).figurasVetoresECiclo as Array<{ src: string; alt: string; shortCaption?: string; caption?: string }>),
  ];
  assert.equal(figs.length, 7, 'Deve conter 7 figuras cientificas inline nas secoes');

  for (const fig of figs) {
    assert.ok(fig.src.startsWith('/consulta-vet/babesiose/'));
    assert.ok(fig.alt.length > 20);
    assert.ok((fig.shortCaption?.length ?? 0) >= 25 && (fig.shortCaption?.length ?? 0) <= 110);
    assert.ok((fig.caption?.length ?? 0) > 60);

    const diskPath = path.join(process.cwd(), 'public', fig.src.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Imagem deve existir em disco: ${diskPath}`);
    assert.ok(fs.statSync(diskPath).size > 5000, `Imagem nao pode estar corrompida/vazia: ${diskPath}`);
  }

  for (const ref of record.references ?? []) {
    if (ref.sourceType?.includes('Livro') || ref.sourceType?.includes('Formulário')) {
      assert.equal(Boolean(ref.pages), false, `Referencia de livro (${ref.id}) nao deve listar paginas`);
      assert.doesNotMatch(ref.title ?? '', /Chapter|Cap\.|Monographs/i);
    }
  }
});

test('valida alertas farmacologicos criticos, fisiopatogenia e impacto dos estudos essenciais', () => {
  const record = getRecord();
  const full = JSON.stringify(record);

  assert.match(full, /85 mg\/mL.*121,15 mg\/mL/i);
  assert.match(full, /0,02–0,05 mg\/kg.*0,5 mg\/kg/i);
  assert.match(full, /1 mg de fosfato.*0,57 mg/i);
  assert.match(full, />\s*1 mg\/kg.*fatais|potencial FATAL/i);
  assert.match(full, /metoclopramida.*tetraciclinas/i);
  assert.match(full, /M121I/i);
  assert.match(full, /permetrina/i);
  assert.match(full, /CaO₂|CaO2/);
  assert.match(full, /Goddard.*2026/i);
  assert.match(full, /Zygner.*2023/i);
  assert.match(full, /Baneth.*2024|Babesia galileei/i);
  assert.match(full, /Oliveira.*2022/i);
  assert.match(full, /Punia.*2026/i);
  assert.match(full, /Rangelia vitalii/i);
  assert.match(full, /filtro de 170/i);
  assert.match(full, /\{\{ref:ref-goddard-2026\}\}/);
});

test('valida traducoes de todas as chaves de subsecao em portugues acentuado', () => {
  const record = getRecord();
  const sections = [
    record.etiology,
    record.epidemiology,
    record.pathogenesisTransmission,
    record.pathophysiology,
    record.clinicalSignsPathophysiology,
    record.diagnosis,
    record.treatment,
    record.complications,
    record.prevention,
  ];

  for (const section of sections) {
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue;
    for (const key of Object.keys(section)) {
      const label = translateEditorialSubsectionKey(key);
      assert.ok(label && label.length > 0, `Chave ${key} deve possuir traducao valida`);
      assert.notEqual(label.toLowerCase(), key.toLowerCase(), `Chave ${key} nao deve vazar sem traducao editorial`);
    }
  }
});

test('renderizacao SSR integral nao expoe == literais, codigos {{ref:}}, titulos repetidos de tabelas ou perda de badges Cao/Gato', () => {
  const record = getRecord();
  const sections = [
    ['etiology', record.etiology],
    ['epidemiology', record.epidemiology],
    ['pathogenesisTransmission', record.pathogenesisTransmission],
    ['pathophysiology', record.pathophysiology],
    ['clinicalSignsPathophysiology', record.clinicalSignsPathophysiology],
    ['diagnosis', record.diagnosis],
    ['treatment', record.treatment],
    ['complications', record.complications],
    ['prevention', record.prevention],
  ] as const;

  const html = renderToStaticMarkup(
    React.createElement(
      DiseaseReferenceProvider,
      { references: record.references ?? [] },
      React.createElement(
        'div',
        null,
        sections.map(([id, data]) =>
          React.createElement(DiseaseSectionRenderer, {
            key: id,
            id,
            title: id,
            data,
          })
        )
      )
    )
  );

  assert.equal(html.includes('=='), false, 'HTML renderizado nao pode vazar marcadores ==');
  assert.equal(html.includes('{{ref:'), false, 'HTML renderizado nao pode vazar tokens {{ref:...}}');
  assert.ok(html.includes('consulta-vet-readable-highlight'), 'Destaques <mark> devem estar presentes no HTML');
  assert.ok(html.includes('>Cães<'), 'Badge visual de caes deve renderizar nas particularidades');
  assert.ok(html.includes('>Gatos<'), 'Badge visual de gatos deve renderizar nas particularidades');
});
