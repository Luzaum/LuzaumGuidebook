import fs from 'node:fs';

const filePath = './modules/consulta-vet/data/seed/diseasePlainLanguage.ts';
const content = fs.readFileSync(filePath, 'utf8');

const targetKey = "'bronquite-cronica-caes-gatos': {";
const startIdx = content.indexOf(targetKey);
if (startIdx === -1) {
  console.error('Target key not found!');
  process.exit(1);
}

const endKey = "'granuloma-eosinofilico-felino': {";
const endIdx = content.indexOf(endKey);
if (endIdx === -1) {
  console.error('End key not found!');
  process.exit(1);
}

const replacement = `'bronquite-cronica-caes-gatos': {
    whatIsIt:
      'A bronquite crônica em cães e gatos é uma inflamação persistente e desgastante dos brônquios (os canos que levam ar aos pulmões):\\n\\n' +
      '- Falha na esteira de limpeza: os pulmões possuem cílios microscópicos que funcionam como uma esteira rolante para expulsar poeira e muco; na bronquite crônica, essa esteira quebra, acumulando catarro grosso que o animal não consegue eliminar.\\n' +
      '- Tosse que não passa: define-se pela presença de tosse quase diária por pelo menos dois meses consecutivos, após descartar problemas de coração, vermes de pulmão e infecções.\\n' +
      '- Diferença entre cães e gatos: no cão, a doença causa tosse seca e engasgos com dano na cartilagem dos brônquios (broncomalácia); no gato, a tosse costuma ser confundida com tentativas de vomitar bolas de pelo, mas pode evoluir com crises perigosas de falta de ar.',
    keyPoints: [
      'Tosse por mais de 2 meses seguidos exige investigação completa dos pulmões e do coração antes de tomar qualquer remédio.',
      'Gato tossindo parece que vai vomitar bola de pelo: ele se agacha, estica o pescoço rente ao chão e tosse com força; isso é problema respiratório e não estomacal.',
      'A bombinha com espaçador (máscara facial) é o melhor tratamento de manutenção: o remédio vai direto para o pulmão sem causar os efeitos colaterais dos comprimidos no corpo.',
      'Antibiótico não cura bronquite crônica de rotina: a inflamação geralmente é estéril; antibióticos só devem ser usados quando exames confirmam bactérias ativas.',
      'Fumaça de cigarro, vape, incensos, velas perfumadas e poeira de areia sanitária pioram muito a doença e devem ser eliminados de casa.',
      'Cães com tosse crônica devem usar exclusivamente peitoral para passear: puxões na coleira de pescoço esmagam a traqueia e disparam crises violentas de tosse.',
    ],
    whatIs:
      'A bronquite crônica é uma inflamação contínua das vias aéreas dos pulmões com excesso de muco grosso e tosse frequente por mais de dois meses.',
    warningSigns:
      'Tosse diária que parece engasgo, esforço com a barriga para soltar o ar, chiado no peito, desmaio logo após tossir muito forte, e respiração com a boca aberta no gato (emergência grave).',
    diagnosis:
      'O diagnóstico é feito por exclusão com raio-X de tórax, ecocardiograma do coração, exames de fezes para vermes pulmonares e lavado broncoalveolar com anestesia para examinar as células do catarro ao microscópio.',
    homeCare:
      'Eliminar fumaça, perfumes e aerossóis de casa, trocar areia do gato por tipo sem pó e sem cheiro, usar peitoral em cães, manter o peso do animal magro e aplicar a bombinha inalatória com carinho e reforço positivo todos os dias.',
  },
  `;

const before = content.slice(0, startIdx);
const after = content.slice(endIdx);
const updated = before + replacement + after;

fs.writeFileSync(filePath, updated, 'utf8');
console.log('Successfully updated diseasePlainLanguage.ts');
