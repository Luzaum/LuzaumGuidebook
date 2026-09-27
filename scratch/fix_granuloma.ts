import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.granuloma-eosinofilico-felino.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Disfagia Grave, Obstrução de Vias Aéreas e Anorexia com Risco de Lipidose Hepática: Granulomas eosinofílicos exuberantes localizados na cavidade oral (palato duro, palato mole, língua ou faringe) provocam dor excruciante ao mastigar, sialorreia profusa, estridor respiratório obstrutivo e disfagia completa. O jejum forçado por anorexia prolongada superior a 48–72 horas em gatos com sobrepeso precipita mobilização lipídica aguda com lipidose hepática fulminante.',
      'Transformação Maligna para Carcinoma Espinocelular (CEC): Úlceras indolentes (úlceras de lábio superior) crônicas, hiperplásicas e refratárias submetidas a ciclos incessantes de inflamação e reparo tecidual defeituoso podem sofrer metaplasia e transformação maligna secundária em carcinoma espinocelular de comportamento biológico agressivo e invasivo.',
      'Deformação Labial Fibrótica Irreversível e Fístula Oronasal: Lesões ulcerativas profundas e necrosantes do lábio superior corroem a epiderme e a musculatura labial, causando fibrose cicatricial mutilante e defeitos cosméticos permanentes; em casos extremos, a necrose tecidual profunda desgasta a cartilagem e osso incisivo, estabelecendo fístula oronasal com aspiração alimentar e rinite crônica bacteriana secundária.',
      'Infecção Bacteriana Secundária Grave e Celulite Exsudativa: A perda da barreira cutânea em placas eosinofílicas abdominais ou coxins plantares somada ao autotrauma por lambedura contínua abre portas para infecções estafilocócicas e estreptocócicas profundas, evoluindo para celulite purulenta, necrose focal da pele e linfadenite reativa regional severa.',
      'Pododermatite Eosinofílica e Perda de Mobilidade: Envolvimento edematoso e ulcerativo dos coxins digitais e metacarpianos/metatarsianos com exsudação serossanguinolenta que impede o apoio das patas no solo, gerando claudicação acentuada e incapacidade funcional de acesso à caixa de areia sanitária.',
      'Complicações Metabólicas Iatrogênicas de Injeções de Depósito: A administração frequente e cumulativa de esteroides de depósito (acetato de metilprednisolona) como terapia de atalho ambulatorial induz resistência insulínica maciça com diabetes mellitus felino permanente, atrofia cutânea e predisposição a dermatofitose generalizada por Microsporum canis.',
    ],
    prognostico:
      'O prognóstico para gatos com Complexo do Granuloma Eosinofílico é geralmente favorável a excelente, desde que a causa alérgica de base (DAPP, hipersensibilidade alimentar ou dermatite atópica felina) seja rigorosamente identificada e controlada. A grande maioria das lesões regride completamente em 2 a 4 semanas com corticoterapia ou ciclosporina oral. O prognóstico torna-se reservado em animais com lesões mutilantes destrutivas oronasais, disfagia mecânica faríngea refratária ou em casos com suspeita de degeneração neoplásica para carcinoma espinocelular.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated granuloma eosinofilico seed!');
} else {
  console.error('Target not found or already has complications');
}
