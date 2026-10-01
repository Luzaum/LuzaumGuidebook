import fs from 'node:fs';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';

const publicDir = path.join(process.cwd(), 'public', 'consulta-vet', 'megaesofago-caes-gatos');
const distDir = path.join(process.cwd(), 'dist', 'consulta-vet', 'megaesofago-caes-gatos');

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
  ctx.fillText('ANATOMIA COMPARADA E FISIOPATOLOGIA DO MEGAESOFAGO', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Musculatura Cao vs Gato, Farmacologia do LES e Ciclo de Retencao (Nelson & Couto, VIN 2025, BSAVA)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Left card - Cao
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('1. Esofago Canino: 100% Musculo Estriado', 65, 190);

  // Diagram box
  ctx.fillStyle = '#020617';
  ctx.roundRect(65, 215, 490, 220, 12);
  ctx.fill();

  // Schematic esophagus tube
  ctx.strokeStyle = '#e0e7ff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(140, 325, 45, Math.PI * 0.5, Math.PI * 1.5, false);
  ctx.lineTo(460, 280);
  ctx.arc(460, 325, 45, Math.PI * 1.5, Math.PI * 0.5, false);
  ctx.lineTo(140, 370);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Musculo Estriado (Esquelético) em toda a extensao', 100, 330);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Controle neural: Fibras eferentes somaticas do Nervo Vago (X).', 65, 465);
  ctx.fillText('• Falha na transmissao neuromuscular: Miastenia Gravis adquirida', 65, 495);
  ctx.fillText('  e a causa secundaria mais comum (~28% das series caninas).', 65, 525);
  ctx.fillText('• Armadilha Procinetica: Metoclopramida e Cisaprida atuam em', 65, 560);
  ctx.fillText('  musculo liso e NAO restauram motilidade no esofago canino.', 65, 590);
  ctx.fillText('• Risco farmaco-dinamico: Podem elevar o tonus do LES e criar', 65, 625);
  ctx.fillText('  barreira mecanica funcional a saida para o estomago!', 65, 655);

  // Right card - Gato
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('2. Esofago Felino: Estriado Proximal + Liso Distal', 645, 190);

  // Diagram box
  ctx.fillStyle = '#020617';
  ctx.roundRect(645, 215, 490, 220, 12);
  ctx.fill();

  // Schematic esophagus tube - 2 parts
  ctx.strokeStyle = '#e0e7ff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(720, 325, 45, Math.PI * 0.5, Math.PI * 1.5, false);
  ctx.lineTo(940, 280);
  ctx.lineTo(940, 370);
  ctx.lineTo(720, 370);
  ctx.stroke();

  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(940, 280);
  ctx.lineTo(1040, 280);
  ctx.arc(1040, 325, 45, Math.PI * 1.5, Math.PI * 0.5, false);
  ctx.lineTo(940, 370);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Proximal 2/3: Estriado', 740, 320);
  ctx.fillStyle = '#34d399';
  ctx.fillText('Distal 1/3: Liso', 950, 320);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Padrao anatomico em "espinha de peixe" na radiografia e mucosa.', 645, 465);
  ctx.fillText('• Diferencial Terapeutico: Procineticos (Cisaprida) possuem', 645, 495);
  ctx.fillText('  plausibilidade biologica apenas no segmento liso distal.', 645, 525);
  ctx.fillText('• Disautonomia Felina (Key-Gaskell): Causa critica (midriase,', 645, 560);
  ctx.fillText('  KCS, boca seca, obstipacao, bradicardia, retencao urinaria).', 645, 590);
  ctx.fillText('• Condicoes Reversíveis: Obstrucao laringea/nasofaringea, hernia', 645, 625);
  ctx.fillText('  hiatal e esofagite devem ser exaustivamente investigadas.', 645, 655);

  // Footer bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 740, 1120, 45);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('Principio Fisiologico Central: Megaesofago e uma sindrome de falha do transporte esofagico. Tratar o mecanismo celular, nao a imagem.', 60, 768);

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'fisiopatologia-esofago-cao-vs-gato-musculatura-les.jpg'), buffer);
  fs.writeFileSync(path.join(distDir, 'fisiopatologia-esofago-cao-vs-gato-musculatura-les.jpg'), buffer);
  console.log('Figura 1 gerada com sucesso.');
}

function createFigure2() {
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

  // Header text
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('BIOMECANICA DA CADEIRA DE BAILEY E MANEJO POSTURAL', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Substituicao do Peristaltismo pela Forca Gravitacional e Prevencao de Aspiracao (Haines et al., 2022; VIN)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Left card - Erro: Pote Elevado
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Erro Fatal: "Apenas Elevar o Pote no Chao"', 65, 190);

  // Box
  ctx.fillStyle = '#020617';
  ctx.roundRect(65, 215, 490, 220, 12);
  ctx.fill();

  // Diagram of horizontal dog
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(100, 360);
  ctx.lineTo(380, 360);
  ctx.lineTo(440, 310);
  ctx.stroke();

  // Food puddle in horizontal esophagus
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(200, 350, 160, 18);
  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Eixo Esofagico Quase Horizontal (0 a 30 graus)', 120, 270);
  ctx.fillText('Retencao intraluminal macica e refluxo passivo', 120, 300);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px sans-serif';
  ctx.fillText('• O que ocorre: Apenas o pescoco fica discretamente elevado.', 65, 465);
  ctx.fillText('• A coluna e o torax permanecem paralelos ao chao.', 65, 495);
  ctx.fillText('• Alimento e saliva formam pocos na luz do esofago hipotetico.', 65, 525);
  ctx.fillText('• Quando o animal deita ou abaixa a cabeca, o conteudo reflui', 65, 560);
  ctx.fillText('  passivamente para faringe e laringe.', 65, 590);
  ctx.fillText('• Consequencia: Alto indice de PNEUMONIA ASPIRATIVA!', 65, 625);
  ctx.fillText('• "Tigela alta" NAO substitui alimentacao vertical verdadeira.', 65, 655);

  // Right card - Cadeira de Bailey correta
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 580, 16);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Posicionamento Correto: Eixo Vertical a 90°', 645, 190);

  // Box
  ctx.fillStyle = '#020617';
  ctx.roundRect(645, 215, 490, 220, 12);
  ctx.fill();

  // Diagram of vertical dog in chair
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 5;
  ctx.beginPath();
  // Chair outline
  ctx.strokeRect(740, 230, 180, 190);
  // Vertical dog torso
  ctx.moveTo(830, 400);
  ctx.lineTo(830, 250);
  ctx.stroke();

  // Arrows of gravity
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('↓  ↓  ↓', 800, 310);
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('FORCA DA GRAVIDADE (90°)', 710, 345);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px sans-serif';
  ctx.fillText('• Cadeira de Bailey: Paciente sentado ereto a 80-90 graus.', 645, 465);
  ctx.fillText('• A coluna vertebral fica perpendicular ao chao durante a refeicao.', 645, 495);
  ctx.fillText('• Tempo de permanencia: 10 a 20 minutos apos o termino!', 645, 525);
  ctx.fillText('• A gravidade compensa a ausencia de ondas peristalticas,', 645, 560);
  ctx.fillText('  guiando o bolo ate a abertura hidrostatica do LES.', 645, 590);
  ctx.fillText('• Manejo de Agua: Gelatina hidrica, caldos espessados ou agua', 645, 625);
  ctx.fillText('  ofertada exclusivamente na posicao vertical na cadeira.', 645, 655);

  // Footer bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 740, 1120, 45);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('Evidencia Clinica (Haines et al., 2022): Individualizar consistencia e tempo vertical reduz regurgitacao em >50% dos caes.', 60, 768);

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'posicionamento-cadeira-bailey-gravidade-esvaziamento.jpg'), buffer);
  fs.writeFileSync(path.join(distDir, 'posicionamento-cadeira-bailey-gravidade-esvaziamento.jpg'), buffer);
  console.log('Figura 2 gerada com sucesso.');
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

  ctx.fillStyle = '#a855f7';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('ALGORITMO DIAGNOSTICO ETIOLOGICO DO MEGAESOFAGO', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Da Triagem Clinica a Videofluoroscopia VFSS e Exclusao de Causas Reversiveis (VIN 2025; Nelson & Couto)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // Step 1: Regurgitacao vs Vomito
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 340, 160, 12);
  ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('1. Regurgitacao vs Vomito', 60, 185);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Processo passivo, sem nauseas', 60, 215);
  ctx.fillText('• Sem contracao abdominal ativa', 60, 240);
  ctx.fillText('• Alimento nao digerido, pH neutro', 60, 265);
  ctx.fillText('• Atencao: Tutores confundem com vomito!', 60, 290);

  // Arrow 1 -> 2
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(380, 230);
  ctx.lineTo(430, 230);
  ctx.stroke();

  // Step 2: Imagem Inicial (RX Torax + Cervical)
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(430, 150, 340, 160, 12);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('2. Radiografia Simples (3 Vistas)', 450, 185);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Esofago visivel com gas/liquido', 450, 215);
  ctx.fillText('• Rastreio de PNEUMONIA ASPIRATIVA', 450, 240);
  ctx.fillText('• Buscar massa mediastinal cranial (Timoma)', 450, 265);
  ctx.fillText('• Diferenciar dilatacao generalizada vs focal', 450, 290);

  // Arrow 2 -> 3
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(770, 230);
  ctx.lineTo(820, 230);
  ctx.stroke();

  // Step 3: Classificacao Anatomo-Funcional
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(820, 150, 340, 160, 12);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('3. Padrao de Dilatacao', 840, 185);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Cranial a base cardiaca: PRAA / Anel', 840, 215);
  ctx.fillText('• Focal / Segmentar: Corpo estranho,', 840, 240);
  ctx.fillText('  estenose cicatricial, neoplasia', 840, 265);
  ctx.fillText('• Generalizada: Falha neuromuscular / sistêmica', 840, 290);

  // Step 4: Investigacao Etiologica Aprofundada
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 350, 1120, 370, 16);
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('4. Rastreio Etiologico de Causas Trataveis e Reversiveis', 65, 390);

  // 4 columns inside
  // Col 1: Miastenia Gravis
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(65, 415, 250, 280, 10);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Miastenia Gravis (MG)', 80, 445);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Dosagem de AChR-Ab (ouro).', 80, 475);
  ctx.fillText('• Forma Focal: apenas esofago,', 80, 500);
  ctx.fillText('  sem fraqueza apendicular!', 80, 520);
  ctx.fillText('• Timoma associado (RX/TC).', 80, 545);
  ctx.fillText('• Resposta a anticolinesterasico.', 80, 570);

  // Col 2: Endocrino / Sistemico
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(335, 415, 250, 280, 10);
  ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Endocrino & Toxinas', 350, 445);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Hipoadrenocorticismo (Addison):', 350, 475);
  ctx.fillText('  Sodio/Potassio, Cortisol/ACTH.', 350, 495);
  ctx.fillText('• Hipotireoidismo: Raro como', 350, 520);
  ctx.fillText('  causa isolada (nao confundir', 350, 540);
  ctx.fillText('  com sindrome do eutireoideo).', 350, 560);
  ctx.fillText('• Toxinas: Chumbo, botulismo.', 350, 585);

  // Col 3: Neuromuscular Felino
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(605, 415, 250, 280, 10);
  ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Etiologias Felinas', 620, 445);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Disautonomia (Key-Gaskell):', 620, 475);
  ctx.fillText('  pupilas midriaticas, KCS.', 620, 495);
  ctx.fillText('• Laringomucocele / Polipo:', 620, 520);
  ctx.fillText('  obstrucao da via aerea (2024).', 620, 540);
  ctx.fillText('• Hernia de hiato dinamica.', 620, 565);
  ctx.fillText('• Distrofia muscular / miosite.', 620, 590);

  // Col 4: Funcional / LES-AS
  ctx.fillStyle = '#0f172a';
  ctx.roundRect(875, 415, 260, 280, 10);
  ctx.fill();
  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('VFSS & Sindrome LES-AS', 890, 445);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px sans-serif';
  ctx.fillText('• Videofluoroscopia (VFSS):', 890, 475);
  ctx.fillText('  estudo dinamico da degluticao.', 890, 495);
  ctx.fillText('• Acalasia-like (LES-AS):', 890, 520);
  ctx.fillText('  falha no relaxamento do LES.', 890, 540);
  ctx.fillText('• Indicacao para Sildenafila', 890, 565);
  ctx.fillText('  ou Miotomia de Heller.', 890, 585);

  // Footer bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 740, 1120, 45);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('Regra de Ouro: Megaesofago e um sintoma/sindrome clinica, JAMAIS um diagnostico etiológico definitivo isolado.', 60, 768);

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'algoritmo-diagnostico-etiologico-megaesofago-vfss.jpg'), buffer);
  fs.writeFileSync(path.join(distDir, 'algoritmo-diagnostico-etiologico-megaesofago-vfss.jpg'), buffer);
  console.log('Figura 3 gerada com sucesso.');
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

  ctx.fillStyle = '#ec4899';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('MANEJO TERAPEUTICO MULTIMODAL E QUALIDADE DE VIDA', 40, 50);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px sans-serif';
  ctx.fillText('Sildenafila no LES-AS, Sonda de Gastrostomia, Pneumonia e Sustentabilidade Familiar (JAVMA 2026)', 40, 85);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 115);
  ctx.lineTo(1160, 115);
  ctx.stroke();

  // 4 Cards layout (2x2 grid)
  // Card 1: Sildenafila & Fenotipagem Farmacologica
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 150, 540, 270, 14);
  ctx.fill();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('1. Sildenafila e Relaxamento do LES', 65, 185);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Mecanismo: Inibicao de PDE-5 -> Aumento de GMPc muscular.', 65, 215);
  ctx.fillText('• Acao Primaria: Relaxa o musculo liso do esfincter (LES).', 65, 240);
  ctx.fillText('• Quintavalla et al. (2017): Eficaz em filhotes com doenca congenita.', 65, 265);
  ctx.fillText('• Mehain et al. (2022): Beneficio limitado em ME generalizado idiopatico.', 65, 290);
  ctx.fillText('• Diretriz 2026: Reservar para fenotipo comprovado de LES-AS!', 65, 315);
  ctx.fillText('• Posologia: 0,5 a 1 mg/kg VO a cada 12h (suspensao ou comprimido).', 65, 340);

  // Card 2: Sonda de Gastrostomia (G-Tube)
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 150, 540, 270, 14);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('2. Sonda de Gastrostomia: Potencial & Limites', 645, 185);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Indicacao: Caquexia grave, falha no ganho de peso, estresse postural.', 645, 215);
  ctx.fillText('• Vantagem: Administracao segura de agua, calorias e medicamentos.', 645, 240);
  ctx.fillText('• Alerta Nelson & Couto: G-tube NAO impede aspiracao de saliva!', 645, 265);
  ctx.fillText('• O animal continua produzindo saliva que se acumula no esofago.', 645, 290);
  ctx.fillText('• Refluxo gastroesofagico pode persistir se houver gastrite associada.', 645, 315);
  ctx.fillText('• Resgate extremo: Succao esofagica intermitente via sonda (JVIM).', 645, 340);

  // Card 3: Pneumonia Aspirativa - O Maior Inimigo
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(40, 445, 540, 275, 14);
  ctx.fill();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('3. Pneumonia Aspirativa: Manejo Hospitalar', 65, 480);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Incidencia: Presente em ate 38% dos caes no momento do diagnostico.', 65, 510);
  ctx.fillText('• McBrearty et al. (2011): Principal determinante negativo de sobrevida.', 65, 535);
  ctx.fillText('• Nao usar antibiotico preventivo sem evidencia clinico-radiografica!', 65, 560);
  ctx.fillText('• Tratamento ativo: Oxigenioterapia, nebulizacao salina, coupage,', 65, 585);
  ctx.fillText('  e terapia antimicrobiana parenteral de amplo espectro.', 65, 610);
  ctx.fillText('• Controle da fonte: Esvaziamento esofagico e jejum supervisionado.', 65, 635);

  // Card 4: Qualidade de Vida e Sustentabilidade Familiar
  ctx.fillStyle = '#1e293b';
  ctx.roundRect(620, 445, 540, 275, 14);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('4. Qualidade de Vida dos Tutores (JAVMA 2026)', 645, 480);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '14px sans-serif';
  ctx.fillText('• Sinha et al. (2025/2026): Estudo multicentrico com 262 tutores.', 645, 510);
  ctx.fillText('• Principais queixas: Impossibilidade de oferecer petiscos,', 645, 535);
  ctx.fillText('  restricao de viagens, medo continuo de perda de peso e sufocacao.', 645, 560);
  ctx.fillText('• Sobrevida Real: O numero "90 dias" e um corte historico;', 645, 585);
  ctx.fillText('  com adesao da familia, animais vivem anos com otima funcao.', 645, 610);
  ctx.fillText('• Acolhimento da Equipe: Adaptar a rotina alimentar a realidade da casa.', 645, 635);

  // Footer bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(40, 740, 1120, 45);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 14px sans-serif';
  ctx.fillText('Meta Terapeutica: Prevenir pneumonia aspirativa, garantir estabilidade nutricional e assegurar a sustentabilidade do manejo familiar.', 60, 768);

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'manejo-multimodal-sildenafil-nutricao-g-tube.jpg'), buffer);
  fs.writeFileSync(path.join(distDir, 'manejo-multimodal-sildenafil-nutricao-g-tube.jpg'), buffer);
  console.log('Figura 4 gerada com sucesso.');
}

createFigure1();
createFigure2();
createFigure3();
createFigure4();
