import fs from 'node:fs';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';

const publicDir = path.join(process.cwd(), 'public', 'consulta-vet', 'brucelose-caes-gatos');
const distDir = path.join(process.cwd(), 'dist', 'consulta-vet', 'brucelose-caes-gatos');

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

function createFigure1() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  // Gradient header
  const grad = ctx.createLinearGradient(0, 0, 1200, 120);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  // Top header text
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('DISCOSPONDILITE CANINA POR BRUCELLA CANIS', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Padrao Imaginologico dos Endplates, Lesoes Hole-Punch e Analise Critica (Long et al., 2022; Moeller et al., 2025)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Left card - Radiografia e Hole-Punch
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('1. Aspecto Radiografico e Lise em "Hole-Punch"', 65, 190);

  // Radiograph mock box
  ctx.fillStyle = '#020617';
  ctx.roundRect(65, 215, 490, 220, 12);
  ctx.fill();

  // Draw vertebrae bones
  ctx.fillStyle = '#475569';
  ctx.roundRect(100, 260, 180, 120, 8);
  ctx.fill();
  ctx.roundRect(320, 260, 180, 120, 8);
  ctx.fill();

  // Endplates lytic lesions (hole-punch)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(275, 320, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(325, 320, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('Lesao litica central', 240, 250);
  ctx.fillText('("Hole-Punch")', 255, 270);

  // Text explanations
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• 86% dos caes apresentam lesoes liticas centrais bem delimitadas;', 65, 465);
  ctx.fillText('• Estreitamento do espaco intervertebral e esclerose marginal;', 65, 495);
  ctx.fillText('• Predilecao por involucao multifocal (C2-C5, T13-L1 e L7-S1);', 65, 525);
  ctx.fillText('• 94% dos pacientes tem menos de 5 anos (mediana 2,5 anos);', 65, 555);
  ctx.fillText('• Apenas 14% dos animais apresentam febre sistemica;', 65, 585);
  ctx.fillText('• Ausencia de neutrofilia e leucocitose na maioria dos casos;', 65, 615);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Alerta: caes castrados e virgens tambem desenvolvem discospondilite!', 65, 665);

  // Right card - Desmistificacao Moeller et al. 2025 & Ressonancia
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fb7185';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('2. Desmistificacao (Moeller 2025) e RM', 645, 190);

  // MRI mock box
  ctx.fillStyle = '#020617';
  ctx.roundRect(645, 215, 490, 220, 12);
  ctx.fill();

  // MRI bone edema signal
  ctx.fillStyle = '#1e3a8a';
  ctx.roundRect(680, 260, 180, 120, 8);
  ctx.fill();
  ctx.roundRect(900, 260, 180, 120, 8);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(890, 320, 35, 45, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Hiperintensidade T2 / STIR (Edema osseo)', 740, 250);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• ESTUDO MULTICENTRICO (Moeller et al., 2025):', 645, 465);
  ctx.fillText('  O aspecto "hole-punch" NAO e patognomonico de Brucella;', 645, 495);
  ctx.fillText('  Lesoes identicas ocorrem por Staphylococcus e Streptococcus;', 645, 525);
  ctx.fillText('• Ressonancia Magnetica e 37% mais sensivel que Radiografia;', 645, 555);
  ctx.fillText('• Identifica physitis precoce e infiltrado paravertebral;', 645, 585);
  ctx.fillText('• Exige confirmacao etiologica: cultura e sorologia com antigeno rough;', 645, 615);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Regra de Ouro: Notificar laboratorio antes de colher cultura (BSL-3)!', 645, 665);

  return canvas.toBuffer('image/jpeg');
}

function createFigure2() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  const grad = ctx.createLinearGradient(0, 0, 1200, 120);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  ctx.fillStyle = '#a855f7';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('FISIOPATOLOGIA MOLECULAR: FENOTIPO ROUGH E PERSISTENCIA', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Morfologia de B. canis, Ausencia da Cadeia O-PS e Sobrevivencia Intracelular nos Macrofagos', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Column 1 - Fenótipo Rough vs Smooth
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('1. Dicotomia Estrutural: Rough vs Smooth', 65, 190);

  // Diagram LPS
  ctx.fillStyle = '#020617';
  ctx.roundRect(65, 215, 490, 200, 12);
  ctx.fill();

  // Smooth LPS
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('Brucella Smooth (B. abortus, suis, melitensis):', 85, 250);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(85, 270, 140, 20); // Lipid A + Core
  ctx.fillStyle = '#10b981';
  ctx.fillRect(225, 270, 240, 20); // O-Polysaccharide chain
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Lipideo A + Core', 105, 285);
  ctx.fillText('Cadeia O-PS (O-Antigen "Bandeira")', 245, 285);

  // Rough LPS
  ctx.font = 'bold 15px sans-serif';
  ctx.fillStyle = '#f43f5e';
  ctx.fillText('Brucella Rough (Brucella canis):', 85, 330);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(85, 350, 140, 20); // Lipid A + Core
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.strokeRect(225, 350, 240, 20);
  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('Lipideo A + Core', 105, 365);
  ctx.fillText('AUSENCIA DA CADEIA O-PS', 255, 365);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• B. canis possui lipopolissacarideo sem a cadeia O-polissacaridica;', 65, 450);
  ctx.fillText('• Testes sorologicos para Brucella smooth (bovina/suina) falham;', 65, 480);
  ctx.fillText('• Requer testes especificos com antigeno rough (CBM, 2ME-RSAT, AGID);', 65, 510);
  ctx.fillText('• Exame negativo para B. abortus NAO afasta Brucella canis;', 65, 540);
  ctx.fillText('• Causa central de subdiagnostico historico em medicina veterinaria e humana.', 65, 570);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Impacto One Health: Laboratorios humanos frequentemente falham!', 65, 640);

  // Column 2 - Sobrevivência Intracelular e Bacteremia
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('2. Sobrevivencia em Macrofagos e Disseminacao', 645, 190);

  ctx.fillStyle = '#020617';
  ctx.roundRect(645, 215, 490, 200, 12);
  ctx.fill();

  // Macrophage drawing
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(890, 315, 80, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.stroke();

  // Bacteria inside
  ctx.fillStyle = '#f43f5e';
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.arc(890 + Math.cos(angle) * 45, 315 + Math.sin(angle) * 45, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('Macrofago / Fagossomo', 815, 315);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Inibicao da fusao fagolisossomica e sobrevivencia celular;', 645, 450);
  ctx.fillText('• Disseminacao pelo sistema reticuloendotelial (linfonodos, baco, figado);', 645, 480);
  ctx.fillText('• Bacteremia celular prolongada: dura de 6 a 64 meses;', 645, 510);
  ctx.fillText('• Tropismo por tecidos ricos em eritritol e esteroides sexuais;', 645, 540);
  ctx.fillText('• Penetracao em sitios santuario (prostata, olho, disco vertebral);', 645, 570);
  ctx.fillText('• Foco intracelular e causa de recorrencia apos antibioticos.', 645, 600);

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Conceito Vital: Resposta clinica satisfatoria NAO significa esterilizacao.', 645, 650);

  return canvas.toBuffer('image/jpeg');
}

function createFigure3() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  const grad = ctx.createLinearGradient(0, 0, 1200, 120);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('SINDROME REPRODUTIVA: EPIDIDIMITE, ORQUITE E ABORTO', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Patogenese Reprodutiva no Macho e na Femea (Nelson & Couto 6e; VIN 2025)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Column 1 - Macho
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('1. Patologia no Macho Reprodutor', 65, 190);

  ctx.fillStyle = '#020617';
  ctx.roundRect(65, 215, 490, 180, 12);
  ctx.fill();

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Fase Aguda:', 85, 250);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Epididimite e orquite com aumento de volume doloroso;', 85, 275);
  ctx.fillText('• Edema e dermatite escrotal grave por lambedura obsessiva.', 85, 295);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Fase Cronica:', 85, 330);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Atrofia testicular fibrosa e formacao de granulomas;', 85, 355);
  ctx.fillText('• Anticorpos antiespermatozoides e >90% de anomalias seminais.', 85, 375);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Prostatite bacteriana cronica atua como reservatorio;', 65, 425);
  ctx.fillText('• A castracao (orquiectomia) reduz secrecoes, mas NAO cura o animal;', 65, 455);
  ctx.fillText('• Urina do macho contem de 10³ a 10⁶ bacterias/mL;', 65, 485);
  ctx.fillText('• O espermograma revela cabecas desprendidas e caudas dobradas;', 65, 515);
  ctx.fillText('• Infertilidade permanente instalada aos 2-4 meses de infeccao.', 65, 545);

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Machos castrados infectados continuam eliminando na urina!', 65, 620);

  // Column 2 - Fêmea
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('2. Patologia na Femea e Gestacao', 645, 190);

  ctx.fillStyle = '#020617';
  ctx.roundRect(645, 215, 490, 180, 12);
  ctx.fill();

  ctx.fillStyle = '#ec4899';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Aborto Tardio (45 a 60 dias de gestacao):', 665, 250);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Placentite necrotica com fetos autolisados e macerados;', 665, 275);
  ctx.fillText('• Descarga vaginal persistente marrom/verde-acinzentada (1 a 6 semanas);', 665, 295);
  ctx.fillText('• Material abortado com carga massiva: ate 10¹⁰ bacterias/mL!', 665, 315);

  ctx.fillStyle = '#a855f7';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Perda Precoce e Falsa Infertilidade:', 665, 350);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Morte embrionaria e reabsorcao (tutor relata apenas "falha de cobertura").', 665, 375);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Cio e ciclo estral permanecem perfeitamente normais;', 645, 425);
  ctx.fillText('• Natimortos ou neonatos fracos que morrem em 24 a 48 horas;', 645, 455);
  ctx.fillText('• Transmissao transplacentaria e eliminacao no leite;', 645, 485);
  ctx.fillText('• Causa primaria de perdas economicas e colapso de criatorios.', 645, 515);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Carga Maxima de Zoonose: Manipular abortamento sem EPI e extremo risco!', 645, 620);

  return canvas.toBuffer('image/jpeg');
}

function createFigure4() {
  const canvas = createCanvas(1200, 800);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 1200, 800);

  const grad = ctx.createLinearGradient(0, 0, 1200, 120);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(1, '#1e293b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 130);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('ALGORITMO DIAGNOSTICO E PROTOCOLO ONE HEALTH', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Triagem Sorologica com Antigeno Rough, Confirmacao, Biosseguranca BSL-3 e Conduta Clinica', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Step 1 Box
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 260, 580, 12);
  ctx.fill();
  ctx.strokeStyle = '#3b82f6';
  ctx.stroke();

  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('1. SUSPEITA CLINICA', 55, 185);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Aborto tardio / falhas', 55, 220);
  ctx.fillText('• Epididimite / orquite', 55, 245);
  ctx.fillText('• Discospondilite jovem', 55, 270);
  ctx.fillText('• Uveite / coriorretinite', 55, 295);
  ctx.fillText('• Canis e abrigos', 55, 320);
  ctx.fillText('• Cuidado: cao castrado', 55, 345);
  ctx.fillText('  ou afebril pode estar', 55, 365);
  ctx.fillText('  infectado!', 55, 385);

  // Step 2 Box
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(325, 150, 260, 580, 12);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('2. TRIAGEM ROUGH', 340, 185);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• CBM (Multiplex Cornell):', 340, 220);
  ctx.fillText('  Sensibilidade >95%', 340, 240);
  ctx.fillText('• 2ME-RSAT (slide aglut.):', 340, 270);
  ctx.fillText('  Remove IgM inespecifica', 340, 290);
  ctx.fillText('• Janela Imunologica:', 340, 320);
  ctx.fillText('  Soroconversao em 3-12 sem', 340, 340);
  ctx.fillText('• Se screening positivo:', 340, 370);
  ctx.fillText('  EXIGE CONFIRMACAO!', 340, 390);

  // Step 3 Box
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(610, 150, 260, 580, 12);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('3. CONFIRMACAO', 625, 185);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• AGID II (CPAg):', 625, 220);
  ctx.fillText('  Especif. proxima de 100%', 625, 240);
  ctx.fillText('• PCR (sangue/semen/disco):', 625, 270);
  ctx.fillText('  Detecta DNA bacteriano', 625, 290);
  ctx.fillText('• CULTURA BACTERIOLOGICA:', 625, 320);
  ctx.fillText('  Padrao-ouro definitivo', 625, 340);
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('  ALERTA OBRIGATORIO:', 625, 370);
  ctx.fillText('  Avisar laboratorio (BSL-3)', 625, 390);

  // Step 4 Box
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(895, 150, 265, 580, 12);
  ctx.fill();
  ctx.strokeStyle = '#ec4899';
  ctx.stroke();

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('4. CONDUTA CLINICA', 910, 185);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Afastar da reproducao;', 910, 220);
  ctx.fillText('• OSH / Orquiectomia com EPI;', 910, 245);
  ctx.fillText('• Esquema Combinado:', 910, 275);
  ctx.fillText('  Doxiciclina + Gentamicina', 910, 295);
  ctx.fillText('  ou Doxi + Enrofloxacina', 910, 315);
  ctx.fillText('• Duracao: 4 a 12 semanas', 910, 340);
  ctx.fillText('• Acompanhamento semestral', 910, 365);
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('• CDC: cura microbiologica', 910, 400);
  ctx.fillText('  nao pode ser garantida!', 910, 420);

  return canvas.toBuffer('image/jpeg');
}

const figures = [
  { name: 'discospondilite-lise-endplates-hole-punch-brucelose.jpg', buffer: createFigure1() },
  { name: 'fisiopatologia-brucella-canis-rough-lps-macrofago.jpg', buffer: createFigure2() },
  { name: 'orquite-epididimite-dermatite-escrotal-brucelose-canina.jpg', buffer: createFigure3() },
  { name: 'algoritmo-diagnostico-manejo-one-health-brucelose.jpg', buffer: createFigure4() },
];

for (const fig of figures) {
  const pubPath = path.join(publicDir, fig.name);
  const distPath = path.join(distDir, fig.name);
  fs.writeFileSync(pubPath, fig.buffer);
  fs.writeFileSync(distPath, fig.buffer);
  console.log(`Generated ${fig.name}: size = ${fig.buffer.length} bytes`);
}
