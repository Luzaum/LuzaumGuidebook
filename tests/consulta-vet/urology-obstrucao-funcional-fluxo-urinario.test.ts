import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CONSULTA_VET_PUBLIC_DISEASE_SLUGS } from '../../modules/consulta-vet/constants/publicCatalog';
import { PUBLIC_CATALOG_DISEASE_CARD_STUBS } from '../../modules/consulta-vet/data/publicCatalogCardStubs';
import { DISEASE_CONSENSUS_LINKS } from '../../modules/consulta-vet/data/seed/diseaseConsensusLinks';
import { DISEASE_PLAIN_LANGUAGE } from '../../modules/consulta-vet/data/seed/diseasePlainLanguage';
import { diseasesSeed } from '../../modules/consulta-vet/data/seed/diseases.seed';
import { obstrucaoFuncionalFluxoUrinarioRecord } from '../../modules/consulta-vet/data/seed/diseases.obstrucao-funcional-fluxo-urinario-caes.seed';
import { FULL_KEY_LABELS } from '../../modules/consulta-vet/utils/editorialSubsectionLabels';

const SLUG = 'obstrucao-funcional-fluxo-urinario-caes';

function getRecord() {
  const fromSeed = diseasesSeed.find((d) => d.slug === SLUG);
  assert.ok(fromSeed, 'Registro de obstrucao-funcional-fluxo-urinario-caes deve existir em diseasesSeed');
  return fromSeed;
}

test('mantem ficha canonica unica e cartao publico sincronizado', () => {
  assert.equal(obstrucaoFuncionalFluxoUrinarioRecord.slug, SLUG);
  assert.equal(obstrucaoFuncionalFluxoUrinarioRecord.id, 'disease-obstrucao-funcional-fluxo-urinario-caes');
  assert.ok(
    CONSULTA_VET_PUBLIC_DISEASE_SLUGS.includes(SLUG),
    'Slug deve constar em CONSULTA_VET_PUBLIC_DISEASE_SLUGS'
  );

  const stub = PUBLIC_CATALOG_DISEASE_CARD_STUBS.find((s) => s.slug === SLUG);
  assert.ok(stub, 'Card stub deve existir em PUBLIC_CATALOG_DISEASE_CARD_STUBS');
  assert.equal(stub.id, 'disease-obstrucao-funcional-fluxo-urinario-caes');
  assert.equal(stub.category, 'nefrologia-urologia');
});

test('valida metadados, especie canina estrita e faixa de decisao rapida', () => {
  const record = getRecord();
  assert.deepEqual(record.species, ['dog'], 'Especie deve ser estritamente canina');
  assert.equal(record.category, 'nefrologia-urologia');
  assert.ok(record.categories?.includes('urgencia-emergencia'));
  assert.ok(record.tags?.includes('FOO'));
  assert.ok(record.tags?.includes('ACVIM 2024'));
  assert.ok(record.tags?.includes('PVRV'));

  assert.ok(record.quickDecisionStrip && record.quickDecisionStrip.length >= 5);
  const stripText = JSON.stringify(record.quickDecisionStrip);
  assert.match(stripText, /PVRV > 3/i);
  assert.match(stripText, /Tamsulosina/i);
  assert.match(stripText, /Betanecol/i);
});

test('valida pilares conceituais e fluxos estruturados do resumo rico', () => {
  const record = getRecord();
  assert.ok(record.quickSummaryRich, 'quickSummaryRich deve existir');
  const rich = record.quickSummaryRich;

  assert.match(rich.lead, /FOO idiopática/i);
  assert.match(rich.lead, /dissinergia reflexa/i);
  assert.equal(rich.pillars?.length, 4);

  assert.ok(rich.diagnosticFlow, 'diagnosticFlow deve existir');
  assert.equal(rich.diagnosticFlow.steps.length, 4);

  assert.ok(rich.treatmentFlow, 'treatmentFlow deve existir');
  assert.equal(rich.treatmentFlow.steps.length, 5);

  assert.ok(rich.tabelaDecisaoClinicaRapida, 'tabelaDecisaoClinicaRapida deve existir');
});

test('valida a virada conceitual do Consenso ACVIM 2024 e superacao de dissinergia reflexa', () => {
  const record = getRecord();
  const text = JSON.stringify(record.etiology);

  assert.match(text, /Kendall et al\., 2024/i);
  assert.match(text, /Functional Outflow Obstruction|FOO/i);
  assert.match(text, /dissinergia reflexa/i);
  assert.match(text, /diagnóstico de exclusão/i);
  assert.match(text, /porta automática/i);
});

test('valida neuroanatomia funcional da miccao (Hipogastrico, Pelvico, Pudendo / Onuf)', () => {
  const record = getRecord();
  const text = JSON.stringify(record.etiology);

  assert.match(text, /Hipogástrico.*L1.*L4.*simpático/i);
  assert.match(text, /beta-3.*alfa-1/i);
  assert.match(text, /Pélvico.*S1.*S3.*parassimpático/i);
  assert.match(text, /M3.*detrusor/i);
  assert.match(text, /Pudendo.*núcleo.*Onuf/i);
  assert.match(text, /esfíncter.*estriado/i);

  const etio = record.etiology as Record<string, unknown>;
  assert.ok(etio.tabelaComparativaInervacaoMiccao, 'Tabela 1 de inervacao deve existir');
});

test('valida diferenciacao patologica entre caes e gatos (veto a extrapolacao para FLUTD/FIC)', () => {
  const record = getRecord();
  const text = JSON.stringify(record.etiology);

  assert.match(text, /extrapolar.*felina/i);
  assert.match(text, /FLUTD|FIC/i);
  assert.match(text, /prazosina.*gato/i);

  const etio = record.etiology as Record<string, unknown>;
  assert.ok(etio.tabelaComparativaCaesVsGatosFoo, 'Tabela 2 de comparacao caes x gatos deve existir');
});

test('valida semiologia do padrao miccional e mensuracao do PVRV', () => {
  const record = getRecord();
  const signs = JSON.stringify(record.clinicalSignsPathophysiology);
  const diag = JSON.stringify(record.diagnosis);

  assert.match(signs, /spurts|jatos interrompidos/i);
  assert.match(signs, /overflow|transbordamento/i);
  assert.match(signs, /atonia.*detrusor/i);

  assert.match(diag, /PVRV/i);
  assert.match(diag, /0,2.*1,0 mL\/kg/i);
  assert.match(diag, /> 3.*mL\/kg/i);
  assert.match(diag, /0,52/i);
});

test('valida falso negativo da passagem de cateter uretral e exclusao anatomica', () => {
  const record = getRecord();
  const text = JSON.stringify(record.diagnosis);

  assert.match(text, /NÃO descarta estenoses parciais|não exclui estenose/i);
  assert.match(text, /cistouretrografia retrógrada/i);
  assert.match(text, /uretrocistoscopia/i);

  const diag = record.diagnosis as Record<string, unknown>;
  assert.ok(diag.tabelaTestesDiagnosticosComparados, 'Tabela 3 de testes deve existir');
  assert.ok(diag.tabelaDiagnosticoDiferencialObstrutivo, 'Tabela 4 de diferenciais deve existir');
});

test('valida alfa-1 bloqueadores de 1ª linha (Tamsulosina e Prazosina)', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /Tamsulosina/i);
  assert.match(text, /0,4 a 0,8 mg/i);
  assert.match(text, /Prazosina/i);
  assert.match(text, /0,5 a 3,0 mg/i);

  const treat = record.treatment as Record<string, unknown>;
  assert.ok(treat.tabelaGuiaFarmacologicoFoo, 'Tabela 5 de farmacoterapia deve existir');
});

test('valida relaxante de esfincter estriado (Diazepam 30 min pre-miccao)', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /Diazepam/i);
  assert.match(text, /30 minutos antes do passeio/i);
  assert.match(text, /esfíncter.*estriado/i);
});

test('valida alerta toxico e mecanico maximo: contraindicacao formal ao Betanecol precoce', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /Betanecol/i);
  assert.match(text, /CONTRAINDICAD[AO]|proscrito/i);
  assert.match(text, /resistência.*elevada/i);
  assert.match(text, /ruptura vesical/i);
});

test('valida descompressao vesical, tubo de cistostomia (Greenfield 2025) e uretrostomia (Picon 2024)', () => {
  const record = getRecord();
  const text = JSON.stringify(record.treatment);

  assert.match(text, /cateterização.*intermitente/i);
  assert.match(text, /Greenfield et al\., 2025/i);
  assert.match(text, /cistostomia percutânea.*pigtail/i);
  assert.match(text, /Picón et al\., 2024/i);
  assert.match(text, /uretrostomia perineal/i);

  const treat = record.treatment as Record<string, unknown>;
  assert.ok(treat.tabelaManejoEscalonadoUti, 'Tabela 6 de manejo escalonado deve existir');
});

test('valida complicacoes, atonia irreversivel e 10 erros fatais', () => {
  const record = getRecord();
  const text = JSON.stringify(record.complications);

  assert.match(text, /atonia detrusora irreversível/i);
  assert.match(text, /dez erros/i);
  assert.match(text, /superdistensão/i);
});

test('valida protocolo de plantao em 10 passos e monitoramento/desmame', () => {
  const record = getRecord();
  const text = JSON.stringify(record.prevention);

  assert.match(text, /protocolo de plantão/i);
  assert.match(text, /10 passos/i);
  assert.match(text, /desmame/i);
  assert.match(text, /55%/i);
});

test('valida 4 imagens clinicas reais Open Access em public e dist', () => {
  const record = getRecord();
  const etio = record.etiology as Record<string, any>;

  const expectedImages = [
    {
      key: 'figuraCistostomiaPercutaneaPigtail',
      file: 'cistostomia-percutanea-pigtail-radiografia.webp',
    },
    {
      key: 'figuraCistouretrografiaRetrograda',
      file: 'cistouretrografia-retrograda-fluoroscopia.webp',
    },
    {
      key: 'figuraPosicionamentoFluoroscopia',
      file: 'posicionamento-cateter-cistostomia-fluoroscopia.webp',
    },
    {
      key: 'figuraAnatomiaTratoUrinarioCateter',
      file: 'anatomia-trato-urinario-cateter-bexiga.webp',
    },
  ];

  for (const item of expectedImages) {
    const fig = etio[item.key];
    assert.ok(fig, 'Figura deve existir em etiology: ' + item.key);
    assert.ok(fig.url.includes(item.file), 'URL da figura deve conter ' + item.file);

    const relUrl = fig.url.replace(/^\//, '');
    const publicPath = path.join(process.cwd(), 'public', relUrl);
    const distPath = path.join(process.cwd(), 'dist', relUrl);

    assert.ok(fs.existsSync(publicPath), 'Arquivo em public/ deve existir: ' + publicPath);
    assert.ok(fs.existsSync(distPath), 'Arquivo em dist/ deve existir: ' + distPath);
    assert.ok(fs.statSync(publicPath).size > 10000, 'Tamanho do arquivo em public deve ser > 10KB');
  }
});

test('valida rotulos editoriais mapeados em editorialSubsectionLabels.ts', () => {
  const expectedKeys = [
    'explicacaoDidaticaPortaAutomatica',
    'atualizacaoTerminologicaAcvim2024',
    'neuroanatomiaControleMiccao',
    'tabelaComparativaInervacaoMiccao',
    'etiologiaIdiopaticaEHipoteses',
    'epidemiologiaPerfilPredisposicao',
    'diferenciacaoCriticaCaesVsGatos',
    'tabelaComparativaCaesVsGatosFoo',
    'figuraCistostomiaPercutaneaPigtail',
    'figuraCistouretrografiaRetrograda',
    'figuraPosicionamentoFluoroscopia',
    'figuraAnatomiaTratoUrinarioCateter',
    'transmissaoInfecciosaInexistente',
    'patogeneseDescoordenacaoVesicoesfincterica',
    'mecanismoFisiopatologicoResistenciaUretral',
    'cascataDeSuperdistensaoEAtonia',
    'jatoInicialNormalSeguidoDeInterrupcaoSpurts',
    'stranguriaEDisuriaEsforcoProlongado',
    'bexigaGrandeFirmeDificilExpressao',
    'incontinenciaPorTransbordamentoOverflow',
    'atoniaDetrusoraSecundariaSuperdistensao',
    'azotemiaPosRenalEHipercalemiaEmergencial',
    'cistiteEstaseUrinariaEItuSecundaria',
    'rastreamentoNeurologicoObrigatorioMns',
    'avaliacaoPadraoMiccionalEPalpacao',
    'afericaoPvrvUltrassom',
    'exclusaoObstrucoesMecanicasCistouretrografia',
    'exameNeurologicoEUrodinamica',
    'tabelaTestesDiagnosticosComparados',
    'tabelaDiagnosticoDiferencialObstrutivo',
    'pilaresTerapeuticosConsensuaisFoo',
    'alfa1BloqueadoresTamsulosinaVsPrazosina',
    'relaxantesDeMusculoEstriadoDiazepam',
    'tabelaGuiaFarmacologicoFoo',
    'alertaMaximoContraindicacaoBetanecolPrecoce',
    'cateterizacaoIntermitenteVsCateterPermanente',
    'descompressaoPorTuboDeCistostomiaGreenfield2025',
    'uretrostomiaPerinealDeSalvamentoPicon2024',
    'tabelaManejoEscalonadoUti',
    'atoniaDetrusoraIrreversivel',
    'ituSecundariaERupturaUretralIatrogenica',
    'dezErrosMataisManejoFoo',
    'protocoloPlantaoFoo10Passos',
    'monitoramentoSeriadoEDesmameGradual',
  ];

  for (const key of expectedKeys) {
    assert.ok(
      FULL_KEY_LABELS[key],
      'Rotulo editorial ausente em editorialSubsectionLabels.ts para a chave: ' + key
    );
  }
});

test('valida integridade de vinculos de consenso e linguagem simples para tutores', () => {
  assert.ok(
    DISEASE_CONSENSUS_LINKS[SLUG]?.includes('acvim-incontinencia-foo-caes-2024'),
    'Link de consenso deve incluir acvim-incontinencia-foo-caes-2024'
  );

  const plain = DISEASE_PLAIN_LANGUAGE[SLUG];
  assert.ok(plain, 'Linguagem simples para tutores deve existir');
  assert.ok(plain.whatIsIt.length > 100);
  assert.ok(plain.keyPoints.length >= 5);
  assert.ok(plain.warningSigns && plain.warningSigns.length > 50);
});

test('valida referencias completas com acervo e consensos vigentes', () => {
  const record = getRecord();
  assert.ok(record.references && record.references.length >= 8);

  const refText = JSON.stringify(record.references);
  assert.match(refText, /Kendall/i);
  assert.match(refText, /Greenfield/i);
  assert.match(refText, /Picón/i);
  assert.match(refText, /Mathews/i);
  assert.match(refText, /Stilwell/i);
  assert.match(refText, /Nelson/i);
  assert.match(refText, /Plumb/i);
  assert.match(refText, /BSAVA/i);
});

test('assegura ausencia absoluta de asteriscos duplos (ZERO marcadores duplos)', () => {
  const record = getRecord();
  const raw = JSON.stringify(record);
  assert.ok(
    !raw.includes('**'),
    'Nenhum texto na ficha de FOO canina pode conter asteriscos duplos (**)'
  );
});
