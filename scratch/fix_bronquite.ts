import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.bronquite-cronica.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Bronquiectasia Irreversível e Broncopneumonia Secundária: A inflamação neutrofílica perene e a degranulação contínua de proteases (elastase neutrofílica) e espécies reativas de oxigênio destroem as fibras elásticas e a cartilagem de sustentação da parede dos brônquios. Ocorre ectasia brônquica cilíndrica ou sacular permanente com perda do aparelho mucociliar, acúmulo de secreção purulenta estagnada e episódios repetidos de broncopneumonia bacteriana bacteriana por Bordetella bronchiseptica, Pseudomonas aeruginosa e coliformes.',
      'Broncomalácia Dinâmica e Colapso de Vias Aéreas Inferiores: A perda progressiva da integridade estrutural das cartilagens brônquicas resulta em flacidez e colapso dinâmico das vias aéreas intratorácicas durante a fase expiratória da respiração. Manifesta-se com tosse seca paroxística em grasno ("goose honk") de difícil controle e dispneia expiratória progressiva, frequentemente coexistindo com colapso traqueal cervical.',
      'Síncope Pós-Tússica (Tussive Syncope): Paroxismos violentos e ininterruptos de tosse aumentam exponencialmente a pressão positiva intratorácica, colabando as veias cavas cranial e caudal e interrompendo o retorno venoso para o átrio direito. A queda imediata do débito cardíaco sistêmico gera hipoperfusão cerebral transitória com perda súbita da consciência e flacidez postural imediatamente após um acesso de tosse intensa.',
      'Hipertensão Pulmonar Secundária e Cor Pulmonale Crônico: A hipoventilação alveolar crônica induzida pelo espessamento brônquico e estase de muco deflagra vasoconstrição arterial pulmonar hipóxica contínua. Com a evolução para remodelamento hipertrófico da camada muscular das arteríolas pulmonares, desenvolve-se hipertensão pré-capilar grave, sobrecarga sistólica do ventrículo direito e eventual insuficiência cardíaca congestiva direita com ascite e distensão de veias jugulares.',
      'Fadiga Muscular Ventilatória e Insuficiência Respiratória Tipo II: O trabalho ventilatório crônico excessivo exigido para vencer a resistência expiratória das vias condutoras estreitadas consome grandes quantidades de energia metabólica, culminando em exaustão da musculatura diafragmática e intercostal, hipoventilação alveolar e acidose respiratória hipercapnica.',
    ],
    prognostico:
      'O prognóstico para cães e gatos com bronquite crônica é moderado a favorável quanto à sobrevida, mas reservado quanto à cura completa, visto que a doença é invariavelmente progressiva e incurável. O objetivo clínico primário é o controle do ciclo tosse-inflamação-tosse e a prevenção de bronquiectasias irreversíveis. A presença de broncomalácia extensa de brônquios lobares, hipertensão arterial pulmonar documentada ao ecocardiograma ou episódios frequentes de síncope pós-tússica confere prognóstico reservado a desfavorável.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated bronquite cronica seed!');
} else {
  console.error('Target not found or already has complications');
}
