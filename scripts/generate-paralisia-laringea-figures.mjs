import fs from 'node:fs';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';

const publicDir = path.join(process.cwd(), 'public', 'consulta-vet', 'paralisia-laringea-caes-gatos');
const distDir = path.join(process.cwd(), 'dist', 'consulta-vet', 'paralisia-laringea-caes-gatos');

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

function createFigure1() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  // Gradient header
  const grad = ctx.createLinearGradient(0, 0, 1200, 130);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  // Top header text
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('ANATOMIA LARINGEA E FISIOPATOLOGIA DA ABDUCAO GLOTICA', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Papel Exclusivo do CAD, Dinamica Normal vs Movimento Paradoxal (Nelson & Couto, VIN 2025)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Left card - Normal
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('1. Dinamica Inspiratoria Normal', 65, 190);

  // Normal diagram box
  ctx.fillStyle = '#020617';
  ctx.roundRect(65, 215, 490, 220, 12);
  ctx.fill();

  // Draw Normal Larynx Schema (Open glottis)
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  // Thyroid ring
  ctx.beginPath();
  ctx.arc(310, 325, 80, 0.4 * Math.PI, 1.6 * Math.PI, false);
  ctx.stroke();

  // Epiglottis wedge
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(310, 240);
  ctx.lineTo(285, 275);
  ctx.lineTo(335, 275);
  ctx.closePath();
  ctx.fill();

  // Abducted Arytenoids (wide opening)
  ctx.fillStyle = '#10b981';
  // Left arytenoid
  ctx.beginPath();
  ctx.ellipse(260, 325, 24, 45, -0.4, 0, 2 * Math.PI);
  ctx.fill();
  // Right arytenoid
  ctx.beginPath();
  ctx.ellipse(360, 325, 24, 45, 0.4, 0, 2 * Math.PI);
  ctx.fill();

  // CAD muscle arrows pulling lateral
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 3;
  // Arrow left
  ctx.beginPath();
  ctx.moveTo(250, 335);
  ctx.lineTo(210, 350);
  ctx.stroke();
  // Arrow right
  ctx.beginPath();
  ctx.moveTo(370, 335);
  ctx.lineTo(410, 350);
  ctx.stroke();

  // Wide lumen
  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('RIMA GLOTTIDIS AMPLA', 215, 410);

  // Normal bullet points
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Nervo Laringeo Recorrente (RLN) intacto via nervo vago (NC X)', 65, 470);
  ctx.fillText('• m. cricoarytenoideus dorsalis (CAD) e o UNICO abdutor ativo', 65, 500);
  ctx.fillText('• Na inspiracao: CAD contrai -> aritenoides abduzem ativamente', 65, 530);
  ctx.fillText('• Na expiracao: CAD relaxa -> aritenoides aduzem passivamente', 65, 560);
  ctx.fillText('• Resistencia ao fluxo minima: passagem de ar laminar sem stridor', 65, 590);
  ctx.fillText('• Protecao de via aerea perfeita durante degluticao e reflexos', 65, 620);
  ctx.fillText('• Laringoscopia: sincronismo perfeito abre na inspiracao / fecha', 65, 650);

  // Right card - Paralysis & Paradoxical
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('2. Paralisia Laringea e Colapso Paradoxal', 645, 190);

  // Paralysis diagram box
  ctx.fillStyle = '#020617';
  ctx.roundRect(645, 215, 490, 220, 12);
  ctx.fill();

  // Draw Paralysis Larynx Schema (Closed/Collapsing glottis)
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(890, 325, 80, 0.4 * Math.PI, 1.6 * Math.PI, false);
  ctx.stroke();

  // Epiglottis wedge
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(890, 240);
  ctx.lineTo(865, 275);
  ctx.lineTo(915, 275);
  ctx.closePath();
  ctx.fill();

  // Flaccid/Collapsing Arytenoids (narrow slit)
  ctx.fillStyle = '#ef4444';
  // Left arytenoid medialized
  ctx.beginPath();
  ctx.ellipse(875, 325, 22, 45, 0.1, 0, 2 * Math.PI);
  ctx.fill();
  // Right arytenoid medialized
  ctx.beginPath();
  ctx.ellipse(905, 325, 22, 45, -0.1, 0, 2 * Math.PI);
  ctx.fill();

  // Suction arrows pointing inward (Negative pressure)
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(840, 325);
  ctx.lineTo(865, 325);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(940, 325);
  ctx.lineTo(915, 325);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('COLAPSO MEDIAL INSPIRATORIO (STRIDOR)', 725, 410);

  // Paralysis bullet points
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Denervacao/degeneracao do CAD: nenhum musculo substitui a funcao', 645, 470);
  ctx.fillText('• Inspiracao: pressao intraluminal negativa suga cartilagens medialmente', 645, 500);
  ctx.fillText('• Expiracao: pressao positiva empurra aritenoides passivamente para fora', 645, 530);
  ctx.fillText('• ARMADILHA: movimento paradoxal pode ser confundido com abertura!', 645, 560);
  ctx.fillText('• Turbulencia severa e estridor inspiratorio audivel de alta frequencia', 645, 590);
  ctx.fillText('• Ciclo vicioso: esforco -> pressao negativa -> edema -> colapso total', 645, 620);
  ctx.fillText('• Hipertermia critica por incapacidade de resfriamento evaporativo (panting)', 645, 650);

  const buf = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'fisiopatologia-laringea-abducao-normal-vs-paradoxal-cad.jpg'), buf);
  fs.writeFileSync(path.join(distDir, 'fisiopatologia-laringea-abducao-normal-vs-paradoxal-cad.jpg'), buf);
  console.log('Figure 1 created.');
}

function createFigure2() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  // Header
  const grad = ctx.createLinearGradient(0, 0, 1200, 130);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('O COMPLEXO GOLPP: POLINEUROPATIA PROGRESSIVA GERIATRICA', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Axonopatia Dependente de Comprimento e Disfuncao Multissistemica (Stanley 2010, AAHA 2023)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Top banner - Key Concept
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 140, 1120, 95, 12);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('CONCEITO CARDINAL: A PARALISIA LARINGEA NAO E UMA DOENCA ISOLADA', 65, 172);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px sans-serif';
  ctx.fillText('Em caes idosos (>9 anos, Labradores, Goldens), a paralisia laringea e a manifestacao clinica mais precoce e evidente de uma', 65, 200);
  ctx.fillText('polineuropatia axonal difusa progressiva de neuronio motor inferior que atinge prioritariamente os axônios mais longos do corpo.', 65, 222);

  // 3 Columns: Progression Steps
  // Col 1: Laryngeal stage
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 255, 355, 490, 14);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('Fase 1: Via Aerea Superior', 60, 290);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Nervo Laringeo Recorrente (RLN)', 60, 315);

  ctx.fillStyle = '#0f172a';
  ctx.roundRect(55, 335, 325, 110, 8);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Trajeto longo toracocervical do RLN', 65, 360);
  ctx.fillText('• Latido rouco / perda vocal (disfonia)', 65, 385);
  ctx.fillText('• Estridor inspiratorio progressivo', 65, 410);
  ctx.fillText('• Intolerancia marcante ao calor/exercicio', 65, 435);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Manifestacoes Iniciais:', 60, 470);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('Tutor nota "ofego ruidoso" e cansaço fácil.', 60, 495);
  ctx.fillText('Frequentemente confundido com "idade avancada",', 60, 520);
  ctx.fillText('obesidade ou osteoartrite incipiente.', 60, 545);
  ctx.fillText('Risco agudo: crise asfixica em dias quentes.', 60, 570);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Intervencao: Cirurgia UAL (Tie-back)', 60, 620);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('Restaura o lumen da via aerea superior,', 60, 645);
  ctx.fillText('mas NAO interrompe a neuropatia sistemica.', 60, 670);

  // Col 2: Esophageal stage
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(420, 255, 355, 490, 14);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('Fase 2: Disfuncao Esofagica', 440, 290);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Ramos Pararrecurrentes e Faringe', 440, 315);

  ctx.fillStyle = '#0f172a';
  ctx.roundRect(435, 335, 325, 110, 8);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Ramos esofagicos do vago e RLN', 445, 360);
  ctx.fillText('• Dismotilidade faringoesofagica', 445, 385);
  ctx.fillText('• Retencao de liquidos e saliva', 445, 410);
  ctx.fillText('• Megaesofago adquirido concomitante', 445, 435);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Evidencia Stanley et al. (2010):', 440, 470);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('100% dos caes com LP acompanhados', 440, 495);
  ctx.fillText('apresentaram disfuncao esofagica em', 440, 520);
  ctx.fillText('esofagograma trifasico (P < 0,0001).', 440, 545);
  ctx.fillText('Pneumonia aspirativa cumulativa em', 440, 570);
  ctx.fillText('31,8% em 3 anos (Wilson & Monnet 2016).', 440, 595);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Risco: Pneumonia Aspirativa Severa', 440, 630);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('Exige alimentacao vertical e cuidado com agua.', 440, 655);

  // Col 3: Neurological stage
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(800, 255, 360, 490, 14);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('Fase 3: Fraqueza Generalizada', 820, 290);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Nervo Ciatico e Membros Pelvicos', 820, 315);

  ctx.fillStyle = '#0f172a';
  ctx.roundRect(815, 335, 330, 110, 8);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Axonopatia atinge nervos ciatico/tibial', 825, 360);
  ctx.fillText('• Paraparesia flacida progressiva', 825, 385);
  ctx.fillText('• Deficits proprioceptivos (knuckling)', 825, 410);
  ctx.fillText('• Atrofia muscular neurogenica caudal', 825, 435);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('Evolucao a Longo Prazo:', 820, 470);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('31% ja apresentam deficits motores ao', 820, 495);
  ctx.fillText('diagnostico inicial; a maioria progride', 820, 520);
  ctx.fillText('em 12 a 24 meses mesmo com laringe patente.', 820, 545);
  ctx.fillText('Bookbinder (2016): comorbidade neuro', 820, 570);
  ctx.fillText('aumenta complicacoes (OR 4,04).', 820, 595);

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Suporte: Reabilitacao e Piso Antiderrapante', 820, 630);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText('Fisioterapia, controle de peso e auxilio motor.', 820, 655);

  const buf = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'golpp-polineuropatia-progressao-e-mecanismo-axonopatia.jpg'), buf);
  fs.writeFileSync(path.join(distDir, 'golpp-polineuropatia-progressao-e-mecanismo-axonopatia.jpg'), buf);
  console.log('Figure 2 created.');
}

function createFigure3() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  // Header
  const grad = ctx.createLinearGradient(0, 0, 1200, 130);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('ALGORITMO DIAGNOSTICO E PADRAO-OURO LARINGOSCOPICO', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Laringoscopia sob Plano Leve, Sincronismo Respiratorio e Indices de Natsume 2025', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Left card: Step-by-step diagnostic workflow
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 145, 540, 595, 14);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Sequencia Diagnostica Padronizada', 65, 185);

  const steps = [
    { num: '1', title: 'Triagem e Localizacao Respiratoria', desc: 'Confirmar stridor inspiratorio de via aerea superior; diferenciar de stertor nasofaringeo e colapso traqueal.' },
    { num: '2', title: 'Exame Neurologico Detalhado', desc: 'Avaliar propriocepcao e forca dos membros pelvicos; rastrear sinais sistemicos de GOLPP e pares cranianos.' },
    { num: '3', title: 'Radiografia Cervical e Toracica', desc: 'Excluir pneumonia aspirativa, megaesofago e massas. Avaliar distensao traqueal de Natsume 2025 (CD:3R >= 2,3).' },
    { num: '4', title: 'Laringoscopia Funcional (Padrao-Ouro)', desc: 'Visualizacao direta sob plano anestesico leve (propofol) com respiracao espontanea preservada.' },
    { num: '5', title: 'Sincronizacao de Fases e Doxapram', desc: 'Auxiliar verbaliza INSPIRA/EXPIRA. Usar doxapram (1-2,2 mg/kg IV) se respiracao superficial.' },
    { num: '6', title: 'Teste de Mobilidade Passiva', desc: 'Palpar cartilagens com sonda romba para descartar anquilose cricoaritenoide mecanica.' }
  ];

  let yOffset = 220;
  steps.forEach(st => {
    ctx.fillStyle = '#0f172a';
    ctx.roundRect(65, yOffset, 490, 75, 8);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`${st.num}. ${st.title}`, 80, yOffset + 26);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '13px sans-serif';
    ctx.fillText(st.desc, 80, yOffset + 50);

    yOffset += 83;
  });

  // Right card: Technical Highlights & Pitfalls
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 145, 540, 595, 14);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Armadilhas e Atualizacoes Tecnicas', 645, 185);

  // Box 1: Anesthetic depth pitfall
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(645, 215, 490, 160, 10);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('ALERTA: O RISCO DE ANESTESIAR DEMAIS', 665, 245);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Plano profundo deprime drive motor e imobiliza laringe NORMAL', 665, 275);
  ctx.fillText('• Gera falso positivo: cartilagens sem movimento parecem paralisadas', 665, 300);
  ctx.fillText('• Pan et al. (2022): alfaxalona reduz movimento glotico mais que propofol', 665, 325);
  ctx.fillText('• Doxapram e facilitador ventilatorio diagnostico; NAO e tratamento!', 665, 350);

  // Box 2: Tracheal Indices (Natsume 2025)
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(645, 395, 490, 160, 10);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('INDICES TRAQUEAIS RADIOGRAFICOS (NATSUME ET AL., 2025)', 665, 425);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Esforco inspiratorio cronico gera pressao negativa intratoracica macica', 665, 455);
  ctx.fillText('• CD:3R (Carina Distension vs 3a costela) >= 2,3 (AUC = 0,97)', 665, 480);
  ctx.fillText('• TT:3R (Traqueia Toracica) >= 1,9 (AUC = 0,98)', 665, 505);
  ctx.fillText('• Sinal auxiliar promissor no raio-X simples antes da laringoscopia', 665, 530);

  // Box 3: Feline Differences
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(645, 575, 490, 140, 10);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('PARTICULARIDADES FELINAS NA LARINGOSCOPIA', 665, 605);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Perda do ronronar (loss of purring) e miado alterado sao marcantes', 665, 635);
  ctx.fillText('• Doenca unilateral e comum (predilecao esquerda pelo trajeto do RLN)', 665, 660);
  ctx.fillText('• Investigar causas secundarias: neoplasia (linfoma, carcinoma), trauma', 665, 685);

  const buf = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'algoritmo-diagnostico-laringoscopia-leve-indices-traqueais.jpg'), buf);
  fs.writeFileSync(path.join(distDir, 'algoritmo-diagnostico-laringoscopia-leve-indices-traqueais.jpg'), buf);
  console.log('Figure 3 created.');
}

function createFigure4() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  // Header
  const grad = ctx.createLinearGradient(0, 0, 1200, 130);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('EMERGENCIA E TRATAMENTO CIRURGICO: TIE-BACK E CONDUTA', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Lateralizacao Unilateral (UAL), Manejo de Crise e Prevencao de Broncoaspiracao', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Left card: Emergency protocol
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 145, 540, 595, 14);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('1. Protocolo de Crise Asfixica e Hipertermia', 65, 185);

  const emergSteps = [
    { title: 'MINIMO ESTRESSE (Hands-off)', desc: 'Nao forcar contencao ou exames estressantes; colocar em ambiente calmo e climatizado.' },
    { title: 'OXIGENOTERAPIA IMEDIATA', desc: 'Fluxo livre, mascara ou caixa de O2 sem lutar. Lembrar: O2 nao atravessa glote ocluida!' },
    { title: 'SEDACAO TITULADA SALVADORA', desc: 'Butorfanol 0,2-0,4 mg/kg associado a Acepromazina 0,02-0,05 mg/kg IV para quebrar ciclo de panico.' },
    { title: 'RESFRIAMENTO ATIVO SE > 40,5 C', desc: 'Ducha morna/fria, ventilador e toalhas umidas; PARAR resfriamento aos 39,5 C para evitar hipotermia.' },
    { title: 'CORTICOIDE DE RESGATE', desc: 'Dexametasona 0,1-0,5 mg/kg IV para atenuar edema laringeo secundario; nao cura a desnervacao.' },
    { title: 'INTUBACAO OROTRAQUEAL / TRAQUEO', desc: 'Se exaustao, cianose ou hipercapnia: induzir propofol e intubar. Traqueostomia se via inviavel.' }
  ];

  let ey = 220;
  emergSteps.forEach(st => {
    ctx.fillStyle = '#0f172a';
    ctx.roundRect(65, ey, 490, 75, 8);
    ctx.fill();

    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(st.title, 80, ey + 26);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '13px sans-serif';
    ctx.fillText(st.desc, 80, ey + 50);

    ey += 83;
  });

  // Right card: Surgical UAL & Long-Term Care
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 145, 540, 595, 14);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('2. Lateralizacao Unilateral (UAL) e Cuidados', 645, 185);

  // UAL schema diagram box
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(645, 215, 490, 175, 10);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('POR QUE TIE-BACK E UNILATERAL E NAO BILATERAL?', 665, 245);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.fillText('• O objetivo cirurgico e o MENOR aumento de rima suficiente para respirar', 665, 275);
  ctx.fillText('• Abertura unilateral preserva fechamento parcial na degluticao', 665, 300);
  ctx.fillText('• Bilateralizacao gera perda total da protecao glotica -> broncoaspiracao macica', 665, 325);
  ctx.fillText('• Drudi et al. (2022): cricoaritenoide (CAL) e tireoaritenoide (TAL) sao eficazes', 665, 350);
  ctx.fillText('• Gatos: nova aritenoidectomia parcial endoscopica (Forni et al., 2026)', 665, 375);

  // Box 2: Long term aspiration pneumonia
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(645, 405, 490, 160, 10);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('RISCO VITALICIO DE PNEUMONIA ASPIRATIVA (AP)', 665, 435);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Wilson & Monnet (2016): AP cumulativa em 18,6% em 1 ano e 31,8% em 3-4 anos', 665, 465);
  ctx.fillText('• Megaesofago pos-operatorio eleva risco de AP em 2,58 vezes (HR 2,58)', 665, 490);
  ctx.fillText('• Metoclopramida NAO preveniu AP (HR 0,94; IC 0,67-1,37)', 665, 515);
  ctx.fillText('• Doxepina: RCT de Rishniw (2021) provou NAO haver beneficio clinico!', 665, 540);

  // Box 3: Golden Rules of Post-Op
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(645, 580, 490, 135, 10);
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('REGRAS DE OURO POS-OPERATORIAS', 665, 608);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '13px sans-serif';
  ctx.fillText('• NUNCA DEIXAR NADAR: proibicao absoluta e vitalicia de natacao (afogamento)', 665, 635);
  ctx.fillText('• Usar peitoral em vez de coleira cervical para sempre', 665, 660);
  ctx.fillText('• Alimentar com alimento umido em almôndegas e evitar beber grandes volumes', 665, 685);

  const buf = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'emergencia-e-manejo-cirurgico-tie-back-ual-pos-operatorio.jpg'), buf);
  fs.writeFileSync(path.join(distDir, 'emergencia-e-manejo-cirurgico-tie-back-ual-pos-operatorio.jpg'), buf);
  console.log('Figure 4 created.');
}

createFigure1();
createFigure2();
createFigure3();
createFigure4();
console.log('All 4 laryngeal paralysis figures generated successfully.');
