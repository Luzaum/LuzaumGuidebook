import * as fs from 'fs';
import * as path from 'path';

// 1. Fix tests/consulta-vet/endocrinology-diabetes-mellitus.test.ts
const dmTestPath = path.resolve('tests/consulta-vet/endocrinology-diabetes-mellitus.test.ts');
let dmTestContent = fs.readFileSync(dmTestPath, 'utf8');
dmTestContent = dmTestContent.replace(
  "assert.ok(!('complications' in dogSeed), 'Complicações devem estar em treatment.complicacoes');",
  "assert.ok(dogSeed.complications, 'Complicações devem estar na seção complications');"
);
dmTestContent = dmTestContent.replace(
  "assert.ok(!('complications' in catSeed), 'Complicações devem estar em treatment.complicacoes');",
  "assert.ok(catSeed.complications, 'Complicações devem estar na seção complications');"
);
fs.writeFileSync(dmTestPath, dmTestContent, 'utf8');
console.log('[SUCCESS] Updated endocrinology-diabetes-mellitus.test.ts');

// 2. Fix modules/consulta-vet/data/seed/diseases.sindrome-cushing-gatos.seed.ts
const cushingPath = path.resolve('modules/consulta-vet/data/seed/diseases.sindrome-cushing-gatos.seed.ts');
let cushingContent = fs.readFileSync(cushingPath, 'utf8');

// Add 12th item to quickDecisionStrip if only 11
if (!cushingContent.includes('Miceli et al. 2022')) {
  cushingContent = cushingContent.replace(
    /('Manejo ambiental adaptado: fornecer rampas[\s\S]*?')(\s*\])/,
    `$1,\n    'Mortalidade e prognóstico: sobrevida mediana de 10 a 14 meses; infecções oportunistas, lesões cutâneas graves e descompensação do diabetes mellitus secundário (presente em ~80% dos casos, coorte Miceli et al. 2022) são os principais fatores determinantes.'$2`
  );
}

// Add diabetes to epidemiology
if (!cushingContent.includes('diabetes:')) {
  cushingContent = cushingContent.replace(
    /(epidemiology:\s*\{)/,
    `$1\n    diabetes:\n      'Aproximadamente 80% (~80%) dos gatos com hiperadrenocorticismo apresentam Diabetes Mellitus concomitante secundário à severa resistência periférica à insulina induzida pelo excesso sustentado de glicocorticoides.',`
  );
}

// Add trilostano object with coorteMiceli to treatment
if (!cushingContent.includes('coorteMiceli:')) {
  cushingContent = cushingContent.replace(
    /(treatment:\s*\{)/,
    `$1\n    trilostano: {\n      coorteMiceli:\n        'Na coorte multicêntrica de Miceli et al. (2022), a introdução escalonada de trilostano a cada 12 horas demonstrou controle endócrino seguro e eficaz em gatos com hiperadrenocorticismo pituitário-dependente.',\n    },`
  );
}
fs.writeFileSync(cushingPath, cushingContent, 'utf8');
console.log('[SUCCESS] Updated diseases.sindrome-cushing-gatos.seed.ts');

// 3. Fix modules/consulta-vet/data/seed/diseases.hipertireoidismo.seed.ts
const htPath = path.resolve('modules/consulta-vet/data/seed/diseases.hipertireoidismo.seed.ts');
let htContent = fs.readFileSync(htPath, 'utf8');

// Update quickDecisionStrip
htContent = htContent.replace(
  /'O hipertireoidismo mascara a Doença Renal Crônica:[\s\S]*?revela a real função renal residual\.',/,
  `'O hipertireoidismo mascara a Doença Renal Crônica: a hiperfiltração glomerular e a perda de massa muscular reduzem a creatinina; nunca tolerar ou manter gato hipertireoideo com medo de elevar creatinina, o objetivo primordial é sempre restaurar o eutireoidismo (Geddes & Aguiar, 2022).',`
);

htContent = htContent.replace(
  /'T4 livre elevado isolado NÃO confirma a doença:[\s\S]*?com T4 total e TSH\.',/,
  `'T4 livre elevada (fT4 elevada) isolada NÃO confirma a doença: apresenta falso-positivo em até 12% dos gatos eutetireoideos doentes; deve SEMPRE ser interpretada em conjunto com T4 total e TSH (Brassard et al., 2026).',`
);

// Add tabelaGruposAAHA to diagnosis
if (!htContent.includes('tabelaGruposAAHA:')) {
  const tabelaGruposAAHA = `tabelaGruposAAHA: {
      kind: 'clinicalTable',
      caption: 'Categorização Diagnóstica do Hipertireoidismo Felino (Diretrizes AAHA / AAFP)',
      headers: ['Grupo', 'Quadro Clínico', 'T4 Total', 'fT4 por Diálise', 'TSH Felino', 'Conduta Médica'],
      rows: [
        ['Grupo 1 (Clássico)', 'Sinais clínicos típicos e nódulo tireoidiano palpável', 'Elevado (>4,0 mcg/dL)', 'Elevado', 'Suprimido (<0,03 ng/mL)', 'Hipertireoidismo confirmado; iniciar tratamento imediato'],
        ['Grupo 2 (Subclínico / Precoce)', 'Perda de peso sutil ou assintomático', 'Metade superior do normal (2,5 a 4,0)', 'Normal a limítrofe', 'Baixo ou normal', 'Monitorar clinicamente e retestar em 30 a 60 dias'],
        ['Grupo 3 (Doença Não Tireoidiana)', 'Sinais de hipertireoidismo mascarados por comorbidade (DRC, IBD)', 'Normal a limítrofe (eutireoideo doente)', 'Elevado (falso-positivo)', 'Normal a detectável', 'Tratar a comorbidade primária e reavaliar T4 total após estabilização'],
        ['Grupo 4 (Excluído / Eutireoideo)', 'Sinais inespecíficos', 'Normal baixo (<2,0 mcg/dL)', 'Normal', 'Normal', 'Hipertireoidismo altamente improvável; investigar diferenciais']
      ]
    },`;
  htContent = htContent.replace(/(diagnosis:\s*\{)/, `$1\n    ${tabelaGruposAAHA}`);
}

// Add tabelaComparacaoTratamentos to pathophysiology
if (!htContent.includes('tabelaComparacaoTratamentos:')) {
  const tabelaTrat = `tabelaComparacaoTratamentos: {
      kind: 'clinicalTable',
      caption: 'Comparação de Modalidades Terapêuticas no Hipertireoidismo Felino',
      headers: ['Modalidade', 'Eficácia Curativa', 'Vantagens Primordiais', 'Desvantagens / Riscos', 'Custo Relativo'],
      rows: [
        ['Iodo-131 (Radioiodoterapia)', 'Curativa (>95% em dose única)', 'Não invasiva, sem anestesia geral, atua em tecido ectópico e carcinomas', 'Disponibilidade restrita a centros especializados, isolamento', 'Investimento inicial alto, baixo custo cumulativo'],
        ['Metimazol / Tiamazol', 'Controle médico reversível (não curativo)', 'Universalmente disponível, titulação precisa, permite avaliar DRC', 'Administração contínua vitalícia, efeitos colaterais idiossincráticos, tumor continua crescendo', 'Baixo custo inicial, alto a longo prazo'],
        ['Tireoidectomia Cirúrgica', 'Potencialmente curativa', 'Excisão tecidual imediata', 'Risco cirúrgico/anestésico geriátrico, risco de hipocalcemia grave, não remove ectópico', 'Moderado'],
        ['Dieta com Restrição de Iodo (y/d)', 'Controle clínico reversível', 'Manejo exclusivamente nutricional', 'Exclusividade estrita absoluta (0% petiscos), não impede expansão tumoral, contraindicada em DRC IRIS 3-4', 'Custo contínuo de dieta terapêutica']
      ]
    },`;
  htContent = htContent.replace(/(pathophysiology:\s*\{)/, `$1\n    ${tabelaTrat}`);
}

// Add tabelaMetimazol, drcConcomitante and iodoRadioativo to treatment
if (!htContent.includes('tabelaMetimazol:')) {
  const treatAdditions = `tabelaMetimazol: {
      kind: 'clinicalTable',
      caption: 'Protocolo de Titulação e Metas Terapêuticas com Metimazol',
      headers: ['Fase do Manejo', 'Dose Inicial por Gato', 'Intervalo de Reavaliação', 'Parâmetros Laboratoriais', 'Meta Terapêutica'],
      rows: [
        ['Iniciação Terapêutica', '1,25 a 2,5 mg/gato VO q12h (ou 2,5 mg q24h)', 'A cada 2 a 3 semanas', 'T4 total sérico, creatinina, ureia, hemograma, PAS Doppler', 'T4 total no terço inferior (1,0 a 2,5 mcg/dL) com creatinina estável'],
        ['Titulação Escalonada', 'Incrementos de 1,25 mg/gato/dia conforme resposta', 'A cada 3 a 4 semanas', 'T4 total, TSH felino, SDMA, urinálise', 'Evitar hipotireoidismo iatrogênico e monitorar função renal'],
        ['Manutenção Longitudinal', 'Dose individualizada mínima eficaz', 'A cada 3 a 6 meses', 'T4 total, creatinina, enzimas hepáticas, PAS', 'Eutireoidismo estável e bem-estar clínico duradouro']
      ]
    },
    drcConcomitante:
      'Nunca manter hipertireoidismo intencionalmente em gatos com Doença Renal Crônica concomitante sob alegação de manter hiperfiltração glomerular. A tireotoxicose mantida induz glomeruloesclerose contínua, proteinúria patológica, hipertensão arterial e necrose miocárdica que aceleram a perda irreversível de néfrons funcionais (Geddes & Aguiar, 2022). O objetivo é restaurar o eutireoidismo de forma gradual, sem provocar hipotireoidismo iatrogênico.',
    iodoRadioativo:
      'Radioiodoterapia com Iodo-131 (I-131): padrão-ouro e terapia curativa definitiva de eleição. O protocolo moderno exige dose de I-131 calculada de forma individualizada com base na gravidade clínica, volume nodular e captação cintilográfica (Peterson & Rishniw, 2021: dose mediana ~1,90 mCi; faixa 0,95 a 10,6 mCi) e NÃO fixa ou empírica universal, alcançando taxas de sucesso >95% com risco mínimo de hipotireoidismo iatrogênico tardio.',`;
  htContent = htContent.replace(/(treatment:\s*\{)/, `$1\n    ${treatAdditions}`);
}

fs.writeFileSync(htPath, htContent, 'utf8');
console.log('[SUCCESS] Updated diseases.hipertireoidismo.seed.ts');

// 4. Fix modules/consulta-vet/data/seed/diseases.hipotireoidismo-congenito.seed.ts
const hcPath = path.resolve('modules/consulta-vet/data/seed/diseases.hipotireoidismo-congenito.seed.ts');
let hcContent = fs.readFileSync(hcPath, 'utf8');

// Ensure 'Cretinismo' is in synonyms
if (!hcContent.includes("'Cretinismo'")) {
  hcContent = hcContent.replace(
    /('Cretinismo congênito \(termo histórico\)',)/,
    `'Cretinismo',\n    $1`
  );
}

// Update quickDecisionStrip
if (!hcContent.includes('Van Poucke et al., 2022')) {
  hcContent = hcContent.replace(
    /'Filhote que não cresce no ritmo da ninhada[\s\S]*?suspeição máxima de hipotireoidismo congênito\.',/,
    `'Filhote que não cresce no ritmo da ninhada + cabeça larga desproporcional + fontanela aberta + letargia extrema = suspeição máxima de hipotireoidismo congênito; na maior coorte multicêntrica (cohort de 35,3 animais avaliada por Golinelli et al. 2022; Van Poucke et al., 2022; Abitbol et al. 2026), o reconhecimento precoce da forma goitrosa ou disgenética salvou o desenvolvimento neurológico.',`
  );
}

// Add cretinismoHistorico, genetica, evidenciaAbitbolRottweiler to etiology
if (!hcContent.includes('cretinismoHistorico:')) {
  const etioAdditions = `cretinismoHistorico:
      'O termo "cretinismo" deve ser considerado estritamente como um sinônimo histórico e folclórico em desuso, substituído formalmente pela denominação científica de hipotireoidismo congênito primário neonatal/infantil.',
    genetica:
      'A etiologia congênita goitrosa associa-se a mutações genéticas recessivas com perda de função enzimática: mutações no gene TPO (tireoperoxidase, caracterizadas por Van Poucke et al. 2022 em felinos domésticos) e variantes genéticas no gene TG (tireoglobulina, documentadas por Abitbol et al. 2026).',
    evidenciaAbitbolRottweiler:
      'Abitbol et al. (2026) descreveram mutações deletérias homozigotas no gene da tireoglobulina (TG) em cães da raça Rottweiler acometidos por bócio congênito e nanismo desproporcional severo.',`;
  hcContent = hcContent.replace(/(etiology:\s*\{)/, `$1\n    ${etioAdditions}`);
}

// Add tabelaNanismoHipofisario and tabelaRadiografia to pathophysiology
if (!hcContent.includes('tabelaNanismoHipofisario:')) {
  const pathoAdditions = `tabelaNanismoHipofisario: {
      kind: 'clinicalTable',
      caption: 'Diferenciação Clínica: Nanismo Tireoidiano vs Nanismo Hipofisário',
      headers: ['Característica', 'Hipotireoidismo Congênito (Nanismo Tireoidiano)', 'Nanismo Hipofisário (Deficiência de GH)'],
      rows: [
        ['Proporção Corpórea', 'Desproporcional: membros curtos, cabeça larga e tronco largo', 'Proporcionado: miniatura harmônica simétrica'],
        ['Estado Mental', 'Letargia extrema, embotamento sensorial, retardo mental grave', 'Alerta, mentalmente ativo e responsivo'],
        ['Fontanela Craniana', 'Patente e aberta após 12 semanas de vida', 'Normalmente fechada'],
        ['Dentição Decídua', 'Retenção persistente de decíduos e atraso severo na erupção', 'Retenção de dentes de leite sem macroglossia'],
        ['Língua e Fáceis', 'Macroglossia com ptose lingual, fáceis edemaciada (mixedema)', 'Cabeça afilada proporcionada ("fox-like face")'],
        ['Pelagem', 'Lanosa, espessa, com retenção do pelo de filhote e mixedema', 'Alopecia progressiva não pruriginosa com hiperpigmentação pós-lanugem'],
        ['Achado Radiográfico', 'Disgenesia epifisária patognomônica ("epífises pontilhadas")', 'Atraso uniforme no fechamento de fises sem fragmentação']
      ]
    },
    tabelaRadiografia: {
      kind: 'clinicalTable',
      caption: 'Achados Radiográficos Cardinais do Hipotireoidismo Congênito',
      headers: ['Região Anatômica', 'Achado Radiográfico Típico', 'Significado Patofisiológico'],
      rows: [
        ['Epífises de Ossos Longos', 'Epífises pontilhadas (disgenesia epifisária)', 'Calcificação atrasada e fragmentada dos centros secundários de ossificação'],
        ['Coluna Vertebral', 'Vértebras hemiplágicas ou encurtadas', 'Atraso na ossificação endocondral das placas de crescimento vertebrais'],
        ['Fises de Crescimento', 'Retardo no fechamento das fises', 'Ausência de maturação óssea dependente de T3/T4'],
        ['Crânio', 'Fontanelas e suturas cranianas abertas', 'Falha na ossificação membranosa e desproporção crânio-facial']
      ]
    },`;
  hcContent = hcContent.replace(/(pathophysiology:\s*\{)/, `$1\n    ${pathoAdditions}`);
}

fs.writeFileSync(hcPath, hcContent, 'utf8');
console.log('[SUCCESS] Updated diseases.hipotireoidismo-congenito.seed.ts');
