import fs from 'fs';

const filePath = 'modules/consulta-vet/data/seed/diseases.asma-felina.seed.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const target = '  prevention: {';
const complicationsBlock = `  complications: {
    principais: [
      'Crise Asmática Aguda Fulminante e Status Asthmaticus: Broncoespasmo hiperagudo refratário e obstrução luminal mecânica difusa por rolhas espessas de muco glicoproteico e exsudato eosinofílico. O paciente desenvolve dispneia expiratória extrema, respiração de boca aberta, cianose de mucosas, fadiga diafragmática rápida com hipercapnia grave (PaCO2 > 60 mmHg), colapso ventilatório e parada cardiorrespiratória por asfixia em minutos se não houver oxigenoterapia e broncodilatação parenteral imediatas.',
      'Atelectasia do Lobo Pulmonar Médio Direito: O brônquio que ventila o lobo médio direito possui trajeto anatômico descendente e estreito, predispondo à oclusão mecânica completa por tampões de muco aderente ("mucus plugging"). O colapso alveolar do lobo gera shunt pulmonar direita-esquerda (perfusão sem ventilação) com hipoxemia grave sustentada e perda permanente de volume aéreo lobar visível na radiografia e tomografia.',
      'Pneumotórax e Pneumomediastino Espontâneos por Barotrauma: O mecanismo de válvula unidirecional nas vias aéreas distais permite a entrada de ar durante a inspiração mas bloqueia a saída na expiração, gerando hiperinsuflação e aprisionamento aéreo alveolar (air trapping). O aumento excessivo da pressão intra-alveolar provoca ruptura de alvéolos e bolhas subpleurais, com extravasamento de ar para o interstício perivascular e espaço pleural, gerando pneumotórax hipertensivo agudo.',
      'Remodelamento Brônquico Crônico e Bronquiectasia Irreversível: A inflamação crônica mediada por citocinas Th2 (IL-4, IL-5, IL-13) induz fibrose peribrônquica progressiva, hiperplasia de células caliciformes e hipertrofia irreversível da camada muscular lisa bronquiolar. Com o tempo, a perda de elasticidade da parede brônquica culmina em bronquiectasia cilíndrica ou sacular permanente, convertendo a via aérea em reservatório estagnado para infecções bacterianas oportunistas secundárias (ex.: Mycoplasma felis, Pasteurella multocida).',
      'Hipertensão Arterial Pulmonar Secundária e Cor Pulmonale: A hipoxemia alveolar crônica regional deflagra vasoconstrição reflexa contínua das arteríolas pulmonares (vasoconstrição pulmonar hipóxica) e hipertrofia da camada média vascular. A elevação persistente da resistência vascular pulmonar sobrecarrega o ventrículo direito, resultando em dilatação e hipertrofia concêntrica direita com risco de insuficiência cardíaca congestiva direita.',
      'Diabetes Mellitus e Infecções Oportunistas por Corticoterapia Sistêmica Crônica: A dependência prolongada de glicocorticoides sistêmicos orais ou injetáveis de depósito induz forte resistência insulínica periférica com exaustão de células beta pancreáticas e diabetes iatrogênico em gatos, justificando a transição mandatória para formulações inalatórias tópicas (fluticasona ou budesonida).',
    ],
    prognostico:
      'O prognóstico para gatos com asma é geralmente favorável a bom quando a inflamação de base é controlada precocemente com glicocorticoides inalatórios e rigoroso manejo dos irritantes ambientais domiciliares. A maioria dos pacientes atinge excelente qualidade de vida e expectativa de vida normal com baixa frequência de crises. Por outro lado, gatos com episódios frequentes de status asthmaticus refratário, comorbidade com HARD (dirofilariose) ou desenvolvimento de bronquiectasias fibróticas avançadas possuem prognóstico reservado a desfavorável, exigindo monitoramento intensivo da frequência respiratória de sono.',
  },\n`;

if (content.includes(target) && !content.includes('complications: {')) {
  content = content.replace(target, complicationsBlock + target);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated asma felina seed!');
} else {
  console.error('Target not found or already has complications');
}
