import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.hipotireoidismo-adquirido.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Coma Mixedematoso (Emergência Endócrina Crítica): Descompensação metabólica extrema e com risco iminente de óbito, precipitada por infecções intercorrentes, trauma ou uso de sedativos em pacientes com hipotireoidismo grave não tratado. Caracteriza-se por hipotermia profunda refratária (< 35,5°C) que não responde ao aquecimento externo ativo, bradicardia extrema (< 40–50 bpm), edema cutâneo mucinoso facial intumescente ("fácies trágica" com pregueamento frontal excessivo), hipoventilação alveolar com acidose respiratória hipercapnica, hiponatremia dilucional severa, estupor e coma irreversível.',
      'Neuropatias Periféricas e Síndromes de Pares Cranianos: A deposição contínua de glicosaminoglicanos (mucopolissacarídeos ácidos) nas bainhas neurais e a redução do transporte axonal provocam compressão e degeneração axonal distal. Manifesta-se classicamente com paralisia unilateral ou bilateral do nervo facial (lagoftalmia, ptose palpebral e lábio caído), síndrome vestibular periférica aguda com nistagmo e head tilt, disfunção laríngea (paralisia de laringe) e megaesôfago com alto risco de pneumonia por aspiração.',
      'Aterosclerose Sistêmica e Dislipidemia Acentuada: A carência de T4 e T3 inibe a expressão de receptores hepáticos de LDL e suprime a atividade da lipase lipoproteica tecidual, gerando hipercolesterolemia grave (> 500 a 1.000 mg/dL) e hipertrigliceridemia com soro lactescente. A longo prazo, favorece a deposição endotelial de placas de ateroma lipídicas em artérias coronárias, mesentéricas e renais, predispondo a eventos tromboembólicos e infartos isquêmicos.',
      'Disfunção Renal Hemodinâmica e Desmascaramento de DRC (Eixo Renotireoidiano): A ausência dos efeitos inotrópicos e vasodilatadores intrarrenais dos hormônios tireoidianos reduz o fluxo sanguíneo renal cortical e diminui a taxa de filtração glomerular em 25% a 40%, elevando precocemente o SDMA sérico. Em gatos tratados com I-131 ou metimazol em doses excessivas, o hipotireoidismo iatrogênico deflagra azotemia renal aguda e desmascara doença renal crônica oculta, duplicando a taxa de mortalidade caso a reposição com levotiroxina não seja instituída.',
      'Piodermite Bacteriana Recorrente e Malasseziose Generalizada: A atrofia acinar das glândulas sebáceas e a depleção da imunidade celular cutânea reduzem os ácidos graxos antimicrobianos da epiderme, transformando a pele em meio hiperqueratótico suscetível a piodermites profundas recidivantes por Staphylococcus pseudintermedius e dermatite esfoliativa gordurosa por Malassezia pachydermatis.',
      'Distúrbios Reprodutivos e Infertilidade: Fêmeas hipotireóideas desenvolvem anestro persistente, ciclos estrais silenciosos ou irregulares, falha de fixação embrionária, reabsorção fetal precoce, abortamento e mumificação fetal; em machos, ocorre atrofia testicular, redução acentuada da libido e azoospermia.',
    ],
    prognostico:
      'O prognóstico para cães com hipotireoidismo primário adquirido é excelente com a administração diária correta de levotiroxina sódica. A melhora da atitude mental, nível de energia e disposição física ocorre precocemente em 7 a 14 dias; o peso corporal e as alterações metabólicas corrigem-se em 4 a 8 semanas; e as lesões dermatológicas e pelagem levam de 3 a 6 meses para regeneração completa. Em casos de coma mixedematoso, o prognóstico imediato é altamente reservado, exigindo terapia intensiva em ambiente de UTI.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated hipotireoidismo adquirido seed!');
} else {
  console.error('Target not found or already has complications');
}
