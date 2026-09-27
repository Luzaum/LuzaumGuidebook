import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.miastenia-gravis.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Pneumonia Aspirativa Fulminante: A complicação mais frequente e a causa número um de mortalidade em cães com Miastenia Gravis adquirida (responsável por mais de 50% dos óbitos). A perda do tônus esofágico estriado (megaesôfago) associada à fraqueza dos reflexos de proteção da laringe e faringe permite a micro e macroaspiração ininterrupta de saliva estagnada e conteúdo gástrico para a árvore traqueobrônquica, culminando em pneumonia bacteriana necrotizante cranioventral, hipoxemia grave e choque séptico.',
      'Crise Miastênica com Falência Ventilatória Aguda: Descompensação hiperaguda caracterizada pela fraqueza profunda e paralisia dos músculos intercostais e diafragma. O paciente apresenta respiração paradoxal abdominal rápida e superficial, incapacidade de manter o volume corrente, hipercapnia severa (PaCO2 > 55–60 mmHg), acidose respiratória aguda e óbito por asfixia caso não seja prontamente instituída ventilação mecânica por pressão positiva.',
      'Crise Colinérgica Iatrogênica (Intoxicação por Piridostigmina): Ocorre quando a dose de anticolinesterásico é excessiva ou aumentada equivocadamente diante de uma piora clínica. O excesso de acetilcolina na fenda sináptica satura os receptores nicotínicos pós-sinápticos, mantendo-os em despolarização contínua e gerando fraqueza flácida paradoxal que simula a crise miastênica. Diferencia-se pela presença marcante da síndrome muscarínica SLUDDE: salivação profusa, miose pupilar, cólicas e diarreia, bradicardia sinusal severa e hipersecreção traqueobrônquica exuberante.',
      'Paralisia Laríngea e Obstrução de Vias Aéreas Superiores: A fraqueza da musculatura intrínseca da laringe (músculo cricoaritenóideo dorsal) impede a abdução fisiológica das cartilagens aritenoides durante a inspiração, gerando estridor inspiratório agudo, esforço respiratório obstrutivo e colapso dinâmico de vias aéreas.',
      'Esofagite Péptica Severa e Perfuração Esofágica: A permanência prolongada de saliva ácida, pepsina e debris alimentares estagnados no lúmen do esôfago flácido desencadeia inflamação erosiva transmural grave da mucosa esofágica, predispondo a estenoses cicatriciais secundárias ou perfuração mediastinal com pleurite séptica.',
      'Complicações Associadas ao Timoma (Síndrome Paraneoplásica): Presente em até 25% a 50% dos gatos e 3% a 5% dos cães com MG adquirida. O crescimento da massa tumoral mediastinal cranial provoca compressão mecânica de grandes vasos (síndrome da veia cava cranial com edema em cabeça e pescoço), efusão pleural e dermatite esfoliativa paraneoplásica felina.',
    ],
    prognostico:
      'O prognóstico para cães e gatos com Miastenia Gravis adquirida é altamente bimodal. Pacientes que sobrevivem ao período crítico inicial dos primeiros 2 a 3 meses (superando ou prevenindo episódios de pneumonia aspirativa) possuem prognóstico excelente, com taxas de remissão clínica e imunológica espontânea de até 85% a 90% dentro de uma média de 6 a 12 meses (Shelton & Lindstrom, 2001). Em contraste, cães com a forma fulminante aguda, megaesôfago grave com aspiração maciça ou animais com timomas invasivos inoperáveis apresentam prognóstico altamente desfavorável com sobrevida média curta.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated miastenia gravis seed!');
} else {
  console.error('Target not found or already has complications');
}
