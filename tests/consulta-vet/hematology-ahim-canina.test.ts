import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';

const SLUG = 'anemia-hemolitica-imunomediada-canina';

function getRecord() {
  const record = diseasesSeed.find((disease) => disease.slug === SLUG);
  assert.ok(record, 'A ficha canonica de AHIM deve existir no diseasesSeed');
  return record;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  const records = diseasesSeed.filter((disease) => disease.slug === SLUG);
  const cards = PUBLIC_CATALOG_DISEASE_CARD_STUBS.filter((card) => card.slug === SLUG);

  assert.equal(records.length, 1, 'Deve existir exatamente 1 registro canonico de AHIM');
  assert.equal(cards.length, 1, 'Deve existir exatamente 1 card stub publico de AHIM');
  assert.equal(records[0].id, cards[0].id);
  assert.ok(CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG), 'Slug de AHIM deve constar no catalogo publico');
  assert.ok(cards[0].quickSummary.length < 1500, 'O cartao deve ser objetivo e conciso');
});

test('valida metadados, especie canina estrita e faixa de decisao rapida', () => {
  const record = getRecord();

  assert.equal(record.title, 'Anemia Hemolítica Imunomediada em Cães (AHIM / IMHA)');
  assert.deepEqual(record.species, ['dog'], 'AHIM canina deve ter especie estritamente dog');
  assert.equal(record.category, 'hematologia');
  assert.ok(record.categories?.includes('urgencia-emergencia'));
  assert.ok(record.categories?.includes('imunologia'));
  assert.equal(record.quickDecisionStrip.length, 5, 'Deve conter exatamente 5 pilares de decisao rapida');

  const textDecision = JSON.stringify(record.quickDecisionStrip);
  assert.match(textDecision, /tríade diagnóstica do ACVIM 2019/i);
  assert.match(textDecision, /trombose venosa/i);
  assert.match(textDecision, /Agnoli et al\. \(2024\)/i);
  assert.match(textDecision, /teste de aglutinação salina \(SAT\)/i);
});

test('valida pilares conceituais e fluxos estruturados do resumo rico', () => {
  const record = getRecord();
  const rich = record.quickSummaryRich;
  assert.ok(rich, 'quickSummaryRich deve estar presente');
  assert.equal(rich.pillars?.length, 3, 'Deve conter 3 pilares estruturados');

  const pillarsText = JSON.stringify(rich.pillars);
  assert.match(pillarsText, /Tríade Diagnóstica Consensual/i);
  assert.match(pillarsText, /Doença Tromboinflamatória e Hipofibrinólise/i);
  assert.match(pillarsText, /Imunossupressão Racional e Individualizada/i);

  assert.equal(rich.diagnosticFlow?.steps.length, 4, 'Fluxo diagnostico deve ter 4 etapas');
  assert.equal(rich.treatmentFlow?.steps.length, 5, 'Fluxo terapeutico deve ter 5 fases');
});

test('valida a triade diagnostica fundamental do Consenso ACVIM 2019', () => {
  const record = getRecord();
  const diagnosis = record.diagnosis as Record<string, unknown>;
  const text = JSON.stringify(diagnosis);

  assert.match(text, /tríade.*Consenso ACVIM 2019/i);
  assert.match(text, /Confirmação de Anemia/i);
  assert.match(text, /Destruição Imunomediada/i);
  assert.match(text, /Hemólise Ativa/i);
  assert.match(text, /pelo menos 2 marcadores/i);
  assert.match(text, /lavagem.*(?:tripla|salina)/i);
  assert.ok(diagnosis.tabelaTriadeDiagnosticaAcvim, 'Tabela da triade diagnostica deve existir');
});

test('valida acuracia de esferocitos e protocolo SAT 1:4 vs rouleaux', () => {
  const record = getRecord();
  const text = JSON.stringify(record.diagnosis);

  assert.match(text, />=5 esferócitos por campo/i);
  assert.match(text, /sensibilidade de 63% e especificidade elevada de 95%/i);
  assert.match(text, /proporção 1:4/i);
  assert.match(text, /1 gota de sangue.*4 gotas/i);
  assert.match(text, /rouleaux/i);
  assert.match(text, /lavagem eritrocitária tripla/i);
});

test('valida achados de Coombs (DAT) e limites de sensibilidade', () => {
  const record = getRecord();
  const text = JSON.stringify(record.diagnosis);

  assert.match(text, /antiglobulina direta/i);
  assert.match(text, /Coombs direto/i);
  assert.match(text, /sensibilidade entre 61% e 82%/i);
  assert.match(text, /especificidade elevada entre 94% e 100%/i);
  assert.match(text, /JAMAIS descarta AHIM/i);
  assert.match(text, /citometria de fluxo/i);
});

test('valida distincao entre hemolise extravascular e intravascular', () => {
  const record = getRecord();
  const pathphys = record.pathophysiology as Record<string, unknown>;
  const text = JSON.stringify(pathphys);

  assert.match(text, /hemólise extravascular/i);
  assert.match(text, /hemólise intravascular/i);
  assert.match(text, /cordões esplênicos e sinusoides hepáticos/i);
  assert.match(text, /complexo de ataque/i);
  assert.match(text, /MAC C5b-9/i);
  assert.match(text, /haptoglobina/i);
  assert.match(text, /hemoglobinemia/i);
  assert.match(text, /hemoglobinúria/i);
  assert.ok(pathphys.tabelaComparativaHemolise, 'Tabela comparativa de hemolise deve existir');
});

test('valida evidencia de hipofibrinolise, TAFI, PAI-1 e TEG (Goggs et al., 2025)', () => {
  const record = getRecord();
  const pathotext = JSON.stringify(record.pathogenesisTransmission);

  assert.match(pathotext, /Goggs, Davis & Brooks \(2025/i);
  assert.match(pathotext, /resistência à fibrinólise/i);
  assert.match(pathotext, /hipofibrinólise/i);
  assert.match(pathotext, /PAI-1/i);
  assert.match(pathotext, /TAFI/i);
  assert.match(pathotext, /NETose/i);
  assert.match(pathotext, /tromboelastografia/i);
});

test('valida diretrizes CURATIVE de tromboprofilaxia e veto a aspirina isolada', () => {
  const record = getRecord();
  const treatment = record.treatment as Record<string, unknown>;
  const text = JSON.stringify(treatment);

  assert.match(text, /CURATIVE/i);
  assert.match(text, /Rivaroxabana/i);
  assert.match(text, /1 a 2 mg\/kg VO/i);
  assert.match(text, /Enoxaparina/i);
  assert.match(text, /Dalteparina/i);
  assert.match(text, /Clopidogrel/i);
  assert.match(text, /1,1 a 4 mg\/kg VO/i);
  assert.match(text, /monoterapia com aspirina/i);
  assert.match(text, /desaconselhada/i);
  assert.ok(treatment.tabelaProtocoloTromboprofilaxia, 'Tabela de tromboprofilaxia deve existir');
});

test('valida corticoterapia de 1ª linha com calculo por superficie para caes grandes', () => {
  const record = getRecord();
  const treatment = record.treatment as Record<string, unknown>;
  const text = JSON.stringify(treatment);

  assert.match(text, /Prednisona ou Prednisolona/i);
  assert.match(text, /2 a 3 mg\/kg\/dia/i);
  assert.match(text, />25 kg/i);
  assert.match(text, /50 a 60 mg\/m/i);
  assert.match(text, /dexametasona.*0,15 a 0,3 mg\/kg/i);
  assert.match(text, /desmame gradual/i);
  assert.match(text, /20% a 25% a cada 2 a 4 semanas/i);
});

test('valida analise critica do segundo imunossupressor (Agnoli et al., 2024)', () => {
  const record = getRecord();
  const treatment = record.treatment as Record<string, unknown>;
  const text = JSON.stringify(treatment);

  assert.match(text, /Agnoli et al\. \(2024, JVIM\)/i);
  assert.match(text, /não aumentou a taxa de remissão hematológica aguda/i);
  assert.match(text, /Ciclosporina/i);
  assert.match(text, /Micofenolato de Mofetil/i);
  assert.match(text, /Azatioprina/i);
  assert.match(text, /Leflunomida/i);
  assert.match(text, /Ciclofosfamida/i);
  assert.match(text, /CONTRAINDICADA DE ROTINA/i);
  assert.ok(treatment.tabelaImunossupressoresSegundaLinha, 'Tabela de segundo imunossupressor deve existir');
});

test('valida estrategia transfusional com pRBC e compatibilidade DEA 1', () => {
  const record = getRecord();
  const treatment = record.treatment as Record<string, unknown>;
  const text = JSON.stringify(treatment);

  assert.match(text, /concentrado de hemácias \(pRBC\)/i);
  assert.match(text, /10 a 15 mL\/kg/i);
  assert.match(text, /sinais clínicos e hemodinâmicos de hipóxia tecidual/i);
  assert.match(text, /armazenado por <=7 a 10 dias/i);
  assert.match(text, /Tipagem DEA 1/i);
  assert.match(text, /crossmatch maior/i);
  assert.ok(treatment.tabelaDecisaoTransfusional, 'Tabela de decisao transfusional deve existir');
});

test('valida esclarecimentos sobre pancreatite (Gianesini 2023) e vacinas (Sparrow 2024)', () => {
  const record = getRecord();
  const complText = JSON.stringify(record.complications);
  const prevText = JSON.stringify(record.prevention);

  assert.match(complText, /Gianesini et al\. \(2023/i);
  assert.match(complText, /RR 2,54/i);
  assert.match(complText, /hemoglobina livre intravascular/i);
  assert.match(complText, />=0,08 g\/dL/i);

  assert.match(prevText, /Sparrow et al\. \(2024\)/i);
  assert.match(prevText, /73 cães/i);
  assert.match(prevText, /11% aos 12 meses e 18% aos 24 meses/i);
  assert.match(prevText, /não aumenta o risco de recaídas/i);
});

test('valida imagens clinicas Open Access salvas em disco em public e dist', () => {
  const record = getRecord();
  const fullText = JSON.stringify(record);

  const images = [
    'esferocitose-esfregaco-sanguineo.jpg',
    'teste-aglutinacao-salina-sat.jpg',
    'teste-coombs-direto-dat.png',
    'teg-hipercoagulabilidade-goggs-2025.jpg',
    'biomarcadores-pai1-tafi-goggs-2025.jpg',
  ];

  for (const img of images) {
    assert.match(fullText, new RegExp(img), 'Imagem deve estar citada no seed: ' + img);
    const pubPath = resolve('public/consulta-vet/ahim-canina', img);
    const distPath = resolve('dist/consulta-vet/ahim-canina', img);
    assert.ok(existsSync(pubPath), 'Imagem deve existir em public: ' + pubPath);
    assert.ok(existsSync(distPath), 'Imagem deve existir em dist: ' + distPath);
    assert.ok(statSync(pubPath).size > 10000, 'Arquivo nao pode estar vazio ou corrompido: ' + img);
  }
});

test('valida integridade de vinculos de consenso e linguagem simples para tutores', () => {
  const record = getRecord();

  assert.ok(record.relatedConsensusSlugs?.includes('acvim-ahim-diagnostico-caes-gatos-2019'));
  assert.ok(record.relatedConsensusSlugs?.includes('acvim-ahim-tratamento-canino-2019'));
  assert.ok(record.relatedConsensusSlugs?.includes('curative-risco-trombotico-2022'));

  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'Linguagem simples para tutores deve existir em DISEASE_PLAIN_LANGUAGE');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 3);
  assert.ok(record.plainLanguage);
  assert.equal(record.plainLanguage?.whatIsIt, plain.whatIsIt);
});

test('valida referencias completas com acervo e consensos vigentes', () => {
  const record = getRecord();
  const refs = record.references ?? [];
  const refIds = new Set(refs.map((r) => r.id));

  const expectedIds = [
    'ref-acvim-diag-2019',
    'ref-acvim-treat-2019',
    'ref-curative-2019-2022',
    'ref-goggs-2025',
    'ref-agnoli-2024',
    'ref-weng-2023',
    'ref-sparrow-2024',
    'ref-gianesini-2023',
    'ref-nelson-couto-6e',
    'ref-plumbs-10e',
    'ref-bsava-10e',
  ];

  for (const id of expectedIds) {
    assert.ok(refIds.has(id), 'Referencia esperada ausente: ' + id);
  }
});

test('assegura ausencia absoluta de asteriscos duplos (ZERO **)', () => {
  const record = getRecord();
  const json = JSON.stringify(record);
  assert.doesNotMatch(json, /\*\*/, 'A ficha de AHIM nao deve conter asteriscos duplos em nenhum campo.');
});
