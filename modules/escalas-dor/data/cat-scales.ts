import { Scale, InterpretationResult } from '../types';

export const CAT_SCALES: Scale[] = [
  {
    id: 'unesp-botucatu',
    name: 'UNESP-Botucatu Completa',
    fullName: 'Escala Multidimensional UNESP-Botucatu para Dor Aguda em Gatos',
    species: 'cat',
    painType: 'acute',
    recommended: true,
    developer: 'FMVZ/UNESP-Botucatu (Brondani JT, Luna SPL et al., 2011)',
    description: 'A escala multidimensional padrão-ouro no Brasil para dor aguda em gatos. Integra parâmetros psicomotores, expressões de dor e variáveis fisiológicas.',
    maxScore: 30,
    rescueThreshold: 8,
    rescueLabel: '≥ 8/30',
    references: [
      'Brondani JT, Luna SPL, Padovani CR. Refinement and initial validation of a multidimensional composite scale for assessing acute postoperative pain in cats. American Journal of Veterinary Research 2011;72(2):174-183.',
      'Luna SPL et al. Multidimensional composite scale for assessing postoperative pain in cats. Veterinary Anaesthesia and Analgesia 2013;40(6):e37-e48.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe o gato sem perturbá-lo por 3-5 minutos. Avalie a postura, conforto e atividade espontânea no box clínico.',
      'Passo 2: Observe as reações gerais, expressão facial e interações sutis com o ambiente.',
      'Passo 3: Aproxime-se e interaja, realizando a palpação gentil da ferida cirúrgica e palpação abdominal.',
      'Passo 4: Verifique a Pressão Arterial Sistólica (PAS) e se há interesse por alimento.'
    ],
    categories: [
      {
        id: 'psychomotor',
        name: 'Dimensão 1: Alteração Psicomotora (Limiar Subescala: ≥ 4)',
        questions: [
          {
            id: 'unesp_posture',
            text: '1. Postura corporal do felino:',
            type: 'radio',
            options: [
              { score: 0, text: 'Deitado confortavelmente de lado (decúbito lateral) ou enrolado' },
              { score: 1, text: 'Sentado (esternal) ou em pé, relaxado e com tônus normal' },
              { score: 2, text: 'Encolhido, tenso, membros sob o tronco, cabeça apoiada ou baixa' },
              { score: 3, text: 'Corpo excessivamente contraído, arqueado ou posições corporais atípicas' }
            ]
          },
          {
            id: 'unesp_comfort',
            text: '2. Sinais de conforto/desconforto:',
            type: 'radio',
            options: [
              { score: 0, text: 'Parece calmo, relaxado e muito confortável' },
              { score: 1, text: 'Muda de posição raramente, ligeiramente inquieto' },
              { score: 2, text: 'Claramente desconfortável, move-se constantemente sem achar posição' },
              { score: 3, text: 'Gira constantemente, deita e levanta agitado ou está totalmente paralisado de dor' }
            ]
          },
          {
            id: 'unesp_activity',
            text: '3. Nível de atividade espontânea:',
            type: 'radio',
            options: [
              { score: 0, text: 'Atividade normal, explora o ambiente ou dorme calmamente' },
              { score: 1, text: 'Atividade ligeiramente reduzida, mais quieto que o normal' },
              { score: 2, text: 'Muito hipoativo, recusa-se a movimentar-se a menos que forçado' },
              { score: 3, text: 'Imóvel, prostrado ou em estado hiperativo de fuga desesperada' }
            ]
          },
          {
            id: 'unesp_attitude',
            text: '4. Atitude/temperamento:',
            type: 'radio',
            options: [
              { score: 0, text: 'Amigável, dócil, ronrona ou busca carinho' },
              { score: 1, text: 'Indiferente, calmo mas menos dócil que o habitual' },
              { score: 2, text: 'Medroso, assustado, tenta se esconder no fundo do box' },
              { score: 3, text: 'Muito agressivo, ataca ativamente ou rosna ao mínimo contato' }
            ]
          }
        ]
      },
      {
        id: 'pain_expression',
        name: 'Dimensão 2: Expressão de Dor (Limiar Subescala: ≥ 3)',
        questions: [
          {
            id: 'unesp_misc_behav',
            text: '5. Comportamentos diversos (tremores, lamber ferida, fechar os olhos):',
            type: 'radio',
            options: [
              { score: 0, text: 'Nenhum comportamento anormal observado' },
              { score: 1, text: 'Tremores esporádicos ou piscar de olhos lento' },
              { score: 2, text: 'Lambe ou morde a ferida com frequência, espasmos dorsais' },
              { score: 3, text: 'Automutilação da ferida cirúrgica ou tremores intensos constantes' }
            ]
          },
          {
            id: 'unesp_wound_palp',
            text: '6. Reação à palpação da ferida cirúrgica:',
            type: 'radio',
            options: [
              { score: 0, text: 'Sem qualquer reação ao toque na ferida ou região' },
              { score: 1, text: 'Olha em direção à ferida ou vira a cabeça ao toque' },
              { score: 2, text: 'Encolhe-se, retira o membro ou contrai a pele' },
              { score: 3, text: 'Rosna, sopra, tenta morder ou foge imediatamente com pânico' }
            ]
          },
          {
            id: 'unesp_abd_palp',
            text: '7. Reação à palpação abdominal suave:',
            type: 'radio',
            options: [
              { score: 0, text: 'Abdômen macio, sem qualquer reação' },
              { score: 1, text: 'Contração abdominal muito sutil, vira a cabeça' },
              { score: 2, text: 'Contração abdominal evidente, tenta afastar a mão' },
              { score: 3, text: 'Abdômen rígido (defesa muscular), vocaliza ou ataca a mão' }
            ]
          },
          {
            id: 'unesp_vocal',
            text: '8. Vocalização espontânea:',
            type: 'radio',
            options: [
              { score: 0, text: 'Silencioso ou ronrona' },
              { score: 1, text: 'Mia esporadicamente ou faz sons curtos de incômodo' },
              { score: 2, text: 'Geme ou rosna continuamente' },
              { score: 3, text: 'Grita ou berra agudamente espontaneamente' }
            ]
          }
        ]
      },
      {
        id: 'physiological',
        name: 'Dimensão 3: Variáveis Fisiológicas',
        questions: [
          {
            id: 'unesp_pas',
            text: '9. Pressão Arterial Sistólica (PAS):',
            type: 'radio',
            options: [
              { score: 0, text: 'Normal (PAS < 140 mmHg ou dentro da linha de base)' },
              { score: 1, text: 'Elevação leve (PAS entre 140 - 159 mmHg)' },
              { score: 2, text: 'Elevação moderada (PAS entre 160 - 179 mmHg)' },
              { score: 3, text: 'Elevação grave (PAS ≥ 180 mmHg ou crise hipertensiva por dor)' }
            ]
          },
          {
            id: 'unesp_appetite',
            text: '10. Interesse por comida / Apetite:',
            type: 'radio',
            options: [
              { score: 0, text: 'Come com avidez e entusiasmo' },
              { score: 1, text: 'Cheira o alimento, lambe ou come muito pouca quantidade' },
              { score: 2, text: 'Cheira a comida mas recusa-se a ingerir' },
              { score: 3, text: 'Recusa total a se aproximar ou cheirar a comida' }
            ]
          }
        ]
      }
    ],
    interpretation: (answers) => {
      let d1 = 0;
      let d2 = 0;
      let d3 = 0;

      const d1Keys = ['unesp_posture', 'unesp_comfort', 'unesp_activity', 'unesp_attitude'];
      const d2Keys = ['unesp_misc_behav', 'unesp_wound_palp', 'unesp_abd_palp', 'unesp_vocal'];
      const d3Keys = ['unesp_pas', 'unesp_appetite'];

      Object.entries(answers).forEach(([key, val]) => {
        const score = Number(val);
        if (d1Keys.includes(key)) d1 += score;
        if (d2Keys.includes(key)) d2 += score;
        if (d3Keys.includes(key)) d3 += score;
      });

      const total = d1 + d2 + d3;
      const max = 30;
      const threshold = 8;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 8) severity = 'mild';
      else if (total < 16) severity = 'moderate';
      else if (total < 24) severity = 'severe';
      else severity = 'extreme';

      const d1Rescue = d1 >= 4;
      const d2Rescue = d2 >= 3;

      const subscores = [
        { name: 'Dimensão 1: Alterações Psicomotoras', score: d1, maxScore: 12, threshold: 4, needsRescue: d1Rescue },
        { name: 'Dimensão 2: Expressão de Dor', score: d2, maxScore: 12, threshold: 3, needsRescue: d2Rescue },
        { name: 'Dimensão 3: Variáveis Fisiológicas', score: d3, maxScore: 6 }
      ];

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO INDICADO (Pontuação Global: ${total}/30 - Limiar ≥ 8). As alterações psicomotoras (D1: ${d1}/12) ou a expressão física da dor (D2: ${d2}/12) estão com escore elevado. Administre o protocolo de analgesia para felinos e reavalie rigorosamente a cada 30 minutos.`
        : `Escore de dor geral de ${total}/30. A dor é classificada como leve ou ausente. O animal demonstra boa adaptação pós-operatória. Continue monitorando regularmente.`;

      return {
        totalScore: total,
        maxScore: max,
        displayScore: `${total}/${max}`,
        needsRescue,
        severity,
        recommendation: rec,
        subscores
      };
    }
  },
  {
    id: 'ufeps-sf',
    name: 'UNESP-Botucatu Simplificada (UFEPS-SF)',
    fullName: 'Escala Multidimensional UNESP-Botucatu Simplificada (UFEPS-SF)',
    species: 'cat',
    painType: 'acute',
    developer: 'FMVZ/UNESP-Botucatu (Belli M et al., 2021)',
    description: 'Versão reduzida e otimizada baseada em 4 parâmetros puramente comportamentais para uso rápido e sem manipulação complexa.',
    maxScore: 12,
    rescueThreshold: 4,
    rescueLabel: '≥ 4/12',
    references: [
      'Belli M, Luna SPL et al. Validation of an abbreviated multidimensional composite pain scale for assessing acute postoperative pain in cats. Journal of Feline Medicine and Surgery 2021;23(12):1124-1132.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe a postura do gato no canil.',
      'Passo 2: Avalie o nível de atividade e a atitude dele.',
      'Passo 3: Toque gentilmente as proximidades da ferida cirúrgica e registre a resposta.'
    ],
    categories: [
      {
        id: 'ufeps_params',
        name: 'Parâmetros Comportamentais',
        questions: [
          {
            id: 'ufeps_posture',
            text: '1. Postura corporal:',
            type: 'radio',
            options: [
              { score: 0, text: 'Deitado de lado ou enrolado de forma relaxada' },
              { score: 1, text: 'Sentado/esternal ou de pé, relaxado e atento' },
              { score: 2, text: 'Encolhido, membros rígidos sob o corpo, cabeça baixa' },
              { score: 3, text: 'Corpo extremamente contraído, de bruços com espasmos de dor' }
            ]
          },
          {
            id: 'ufeps_activity',
            text: '2. Nível de atividade espontânea:',
            type: 'radio',
            options: [
              { score: 0, text: 'Ativo, explora ou dorme tranquilamente' },
              { score: 1, text: 'Ligeiramente hipoativo, move-se pouco' },
              { score: 2, text: 'Hipoativo, apático, isola-se no box' },
              { score: 3, text: 'Imóvel, prostrado ou hiperativo/agitado tentando fugir' }
            ]
          },
          {
            id: 'ufeps_attitude',
            text: '3. Atitude geral e interação:',
            type: 'radio',
            options: [
              { score: 0, text: 'Amigável, dócil, aceita contato' },
              { score: 1, text: 'Indiferente, calmo mas sem entusiasmo' },
              { score: 2, text: 'Medroso, assustado, tenta se esconder' },
              { score: 3, text: 'Agressivo, rosna ou bufa ao se aproximar' }
            ]
          },
          {
            id: 'ufeps_touch',
            text: '4. Reação à palpação da ferida:',
            type: 'radio',
            options: [
              { score: 0, text: 'Nenhuma reação adversa' },
              { score: 1, text: 'Olha ou vira a cabeça ao toque' },
              { score: 2, text: 'Encolhe-se ou contrai a musculatura local' },
              { score: 3, text: 'Agressivo, tenta morder, morde ou foge assustado' }
            ]
          }
        ]
      }
    ],
    interpretation: (answers) => {
      let total = 0;
      Object.values(answers).forEach((val) => {
        total += Number(val);
      });

      const max = 12;
      const threshold = 4;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 4) severity = 'mild';
      else if (total < 7) severity = 'moderate';
      else if (total < 10) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO RECOMENDADO (Escore: ${total}/12 - Dor Moderada a Severa). O limite de intervenção foi ultrapassado (Limiar ≥ 4). Forneça analgesia adequada pós-operatória de imediato.`
        : `Escore de ${total}/12. Dor ausente ou controlada. Continue observando periodicamente o paciente.`;

      return {
        totalScore: total,
        maxScore: max,
        displayScore: `${total}/${max}`,
        needsRescue,
        severity,
        recommendation: rec
      };
    }
  },
  {
    id: 'fgs',
    name: 'Grimace Scale (FGS Faciais)',
    fullName: 'Escala de Careta Felina - Feline Grimace Scale (FGS)',
    species: 'cat',
    painType: 'acute',
    developer: 'Université de Montréal (Evangelista MC et al., 2019)',
    description: 'Escore de dor aguda baseado em 5 unidades de ação facial (caretas). Rápido, não invasivo e muito sensível.',
    maxScore: 10,
    rescueThreshold: 4,
    rescueLabel: '≥ 4/10 (ou média ≥ 0.8 de 2)',
    references: [
      'Evangelista MC, Watanabe R, Szabo AM, et al. Feline Grimace Scale: development and validation of an objective tool for pain assessment in cats. Scientific Reports 2019;9:13028.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe a face do gato de frente, sem incomodá-lo, por cerca de 30 segundos.',
      'Passo 2: Avalie a posição das orelhas, tensão dos olhos, focinho, bigodes e a postura da cabeça.',
      'Passo 3: Pontue cada uma das 5 unidades de ação como: 0 (ausente), 1 (moderada) ou 2 (marcada).'
    ],
    categories: [
      {
        id: 'fgs_units',
        name: 'Unidades de Ação Facial (FGS)',
        questions: [
          {
            id: 'fgs_ears',
            text: '1. Posição das Orelhas:',
            type: 'grimace',
            imageDescription: 'Foto da orelha: Orelhas voltadas para frente (0) vs. Levemente afastadas (1) vs. Rotacionadas para fora / achatadas (2)',
            options: [
              { score: 0, text: 'Ausente (0): Orelhas eretas e voltadas para frente' },
              { score: 1, text: 'Moderada (1): Orelhas levemente afastadas ou inclinadas lateralmente' },
              { score: 2, text: 'Marcada (2): Orelhas muito espaçadas, rotacionadas para fora ou achatadas contra a cabeça' }
            ]
          },
          {
            id: 'fgs_eyes',
            text: '2. Tensão Orbital (Olhos):',
            type: 'grimace',
            imageDescription: 'Foto dos olhos: Olhos bem abertos e redondos (0) vs. Parcialmente semicerrados (1) vs. Totalmente fechados / semicerrados marcantes (2)',
            options: [
              { score: 0, text: 'Ausente (0): Olhos abertos, redondos e alerta' },
              { score: 1, text: 'Moderada (1): Olhos parcialmente semicerrados (fenda palpebral evidente)' },
              { score: 2, text: 'Marcada (2): Olhos muito semicerrados ou completamente fechados' }
            ]
          },
          {
            id: 'fgs_muzzle',
            text: '3. Tensão do Focinho:',
            type: 'grimace',
            imageDescription: 'Foto do focinho: Focinho relaxado e redondo (0) vs. Levemente tenso/oval (1) vs. Muito tenso, pontudo ou esticado lateralmente (2)',
            options: [
              { score: 0, text: 'Ausente (0): Focinho relaxado, macio e arredondado' },
              { score: 1, text: 'Moderada (1): Tensão sutil, focinho parece ligeiramente ovalado' },
              { score: 2, text: 'Marcada (2): Focinho muito tensionado, pontudo ou estendido lateralmente' }
            ]
          },
          {
            id: 'fgs_whiskers',
            text: '4. Posição dos Bigodes (Vibrissas):',
            type: 'grimace',
            imageDescription: 'Foto dos bigodes: Bigodes relaxados e curvados (0) vs. Levemente retos ou agrupados (1) vs. Bigodes retos, apontados para frente ou abertos (2)',
            options: [
              { score: 0, text: 'Ausente (0): Bigodes soltos, relaxados e curvados para baixo' },
              { score: 1, text: 'Moderada (1): Bigodes ligeiramente esticados ou apontados para frente' },
              { score: 2, text: 'Marcada (2): Bigodes retos, tensos, abertos em leque ou projetados para frente' }
            ]
          },
          {
            id: 'fgs_head',
            text: '5. Posição da Cabeça:',
            type: 'grimace',
            imageDescription: 'Foto da cabeça: Cabeça erguida (0) vs. Alinhada ao ombro (1) vs. Cabeça muito baixa, queixo próximo ao peito ou inclinada (2)',
            options: [
              { score: 0, text: 'Ausente (0): Cabeça erguida com pescoço relaxado, acima da linha do dorso' },
              { score: 1, text: 'Moderada (1): Cabeça alinhada ou ligeiramente abaixo da linha do ombro' },
              { score: 2, text: 'Marcada (2): Cabeça muito baixa, encostada no chão ou com queixo no peito' }
            ]
          }
        ]
      }
    ],
    interpretation: (answers) => {
      let total = 0;
      Object.values(answers).forEach((val) => {
        total += Number(val);
      });

      const max = 10;
      const threshold = 4;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 3) severity = 'mild';
      else if (total < 6) severity = 'moderate';
      else if (total < 8) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO INDICADO (FGS: ${total}/10 - Equivalente a uma média de facial grimace ≥ 0.8). O gato apresenta fortes manifestações de expressão de dor facial. Ajuste a terapia analgésica imediatamente.`
        : `Escore facial estável (${total}/10). Sem indicação imediata de resgate. Continue a avaliação e preste atenção a possíveis mudanças.`;

      return {
        totalScore: total,
        maxScore: max,
        displayScore: `${total}/${max}`,
        needsRescue,
        severity,
        recommendation: rec
      };
    }
  },
  {
    id: 'cmps-feline',
    name: 'Glasgow CMPS-Feline',
    fullName: 'Escala de Dor Composta de Glasgow para Gatos (CMPS-Feline)',
    species: 'cat',
    painType: 'acute',
    developer: 'Universidade de Glasgow / NewMetrica',
    description: 'Excelente ferramenta clínica para avaliação de dor pós-operatória baseada em interações estruturadas tutor-gato.',
    maxScore: 20,
    rescueThreshold: 5,
    rescueLabel: '≥ 5/20',
    references: [
      'Calvo G et al. Development of a behavior-based composite measure pain scale for cats. Journal of Small Animal Practice 2014;55(5):244-250.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe a postura do gato no canil.',
      'Passo 2: Aproxime-se lentamente, abra a porta e observe sua expressão facial.',
      'Passo 3: Acaricie-o nas costas e pressione levemente as bordas da incisão/ferida para registrar a resposta táctil.'
    ],
    categories: [
      {
        id: 'interaction',
        name: 'Parâmetros Clínicos e de Resposta',
        questions: [
          {
            id: 'cmpsf_silent',
            text: '1. Comportamento espontâneo do gato:',
            type: 'radio',
            options: [
              { score: 0, text: 'Tranquilo, relaxado ou dormindo suavemente' },
              { score: 1, text: 'Parece ligeiramente apreensivo ou cauteloso' },
              { score: 2, text: 'Muito inquieto, circula no box ou está muito acuado' },
              { score: 3, text: 'Totalmente irresponsivo, deprimido ou apático' }
            ]
          },
          {
            id: 'cmpsf_wound',
            text: '2. Reação ao olhar para a área da ferida:',
            type: 'radio',
            options: [
              { score: 0, text: 'Nenhuma atenção direcionada' },
              { score: 1, text: 'Olha rapidamente ou mexe as orelhas ao olhar' },
              { score: 2, text: 'Lambe ou toca a ferida de forma constante' }
            ]
          },
          {
            id: 'cmpsf_ears',
            text: '3. Formato/posição das orelhas:',
            type: 'radio',
            options: [
              { score: 0, text: 'Orelhas erguidas e normais' },
              { score: 1, text: 'Orelhas ligeiramente abertas lateralmente' },
              { score: 2, text: 'Orelhas completamente achatadas ou rotacionadas para trás' }
            ]
          },
          {
            id: 'cmpsf_touch',
            text: '4. Resposta ao toque gentil da ferida cirúrgica:',
            type: 'radio',
            options: [
              { score: 0, text: 'Sem qualquer reação' },
              { score: 1, text: 'Afasta o corpo ou vira a cabeça ao toque' },
              { score: 2, text: 'Sopra, bufa ou vocaliza levemente' },
              { score: 3, text: 'Ataca, rosna vigorosamente ou tenta morder' }
            ]
          },
          {
            id: 'cmpsf_demeanor',
            text: '5. Atitude com o examinador:',
            type: 'radio',
            options: [
              { score: 0, text: 'Amigável, dócil, aceita carinho' },
              { score: 1, text: 'Indiferente ou evita o contato suavemente' },
              { score: 2, text: 'Nervoso, assustado ou foge para o fundo do canil' },
              { score: 3, text: 'Defensivo, agressivo ou cospe' }
            ]
          }
        ]
      }
    ],
    interpretation: (answers) => {
      let total = 0;
      Object.values(answers).forEach((val) => {
        total += Number(val);
      });

      const max = 20;
      const threshold = 5;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 5) severity = 'mild';
      else if (total < 10) severity = 'moderate';
      else if (total < 15) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO NECESSÁRIO (Glasgow Feline: ${total}/20). O escore ultrapassou o limiar de 5 pontos. Aplique o protocolo analgésico de resgate.`
        : `Escore de ${total}/20. Dor felina sob controle adequado. Continue monitorando periodicamente.`;

      return {
        totalScore: total,
        maxScore: max,
        displayScore: `${total}/${max}`,
        needsRescue,
        severity,
        recommendation: rec
      };
    }
  },
  {
    id: 'fmpi',
    name: 'FMPI (Dor Crônica)',
    fullName: 'Índice de Dor Musculoesquelética Felina (FMPI)',
    species: 'cat',
    painType: 'chronic',
    recommended: true,
    developer: 'NC State University (Lascelles BDX et al., 2007)',
    description: 'Preenchido pelo tutor. Avalia o impacto da dor osteoarticular crônica nas atividades comportamentais e físicas diárias do gato.',
    maxScore: 32,
    rescueThreshold: 12,
    rescueLabel: 'Escore de impacto ≥ 12/32',
    references: [
      'Lascelles BDX et al. Initial evaluation of a feline musculoskeletal pain index (FMPI) for assessment of chronic pain. New Zealand Veterinary Journal 2007;55(6):321-330.'
    ],
    assessmentProtocol: [
      'Passo 1: Entregue esta escala simplificada ao tutor do gato para avaliação de dor crônica por osteoartrite.',
      'Passo 2: Cada comportamento avalia a facilidade do gato em realizar a atividade física nas últimas semanas (0 = Sem dificuldade/normal, 4 = Impossibilitado).'
    ],
    categories: [
      {
        id: 'fmpi_behaviors',
        name: 'Avaliação das Atividades do Gato',
        questions: [
          {
            id: 'fmpi_jump_up',
            text: '1. Habilidade de pular para cima (ex: sofás, mesas, cadeiras):',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_jump_down',
            text: '2. Habilidade de pular para baixo de locais altos:',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_run',
            text: '3. Habilidade de correr rapidamente quando motivado:',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_stairs_up',
            text: '4. Subir escadas ou planos inclinados:',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_stairs_down',
            text: '5. Descer escadas ou planos inclinados:',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_play',
            text: '6. Vontade e facilidade de brincar com brinquedos/tutores:',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_grooming',
            text: '7. Facilidade de realizar a própria higiene (autolimpagem):',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Sem dificuldade (0)',
            labelMax: 'Totalmente incapaz (4)'
          },
          {
            id: 'fmpi_temper',
            text: '8. Temperamento geral (irritabilidade ou isolamento):',
            type: 'slider',
            min: 0,
            max: 4,
            step: 1,
            labelMin: 'Normal/Dócil (0)',
            labelMax: 'Muito irritado/Isolado (4)'
          }
        ]
      }
    ],
    interpretation: (answers) => {
      let total = 0;
      Object.values(answers).forEach((val) => {
        total += Number(val);
      });

      const max = 32;
      const threshold = 12;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 8) severity = 'mild';
      else if (total < 16) severity = 'moderate';
      else if (total < 24) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ TRATAMENTO DE DOR CRÔNICA INDICADO (Escore FMPI: ${total}/32 - Impacto Moderado a Severo). A osteoartrite ou distúrbio articular está afetando ativamente o bem-estar do felino. Recomenda-se iniciar o manejo médico com AINEs altamente seletivos para gatos (ex: Meloxicam em dose de manutenção crônica, ou anticorpos monoclonais como o Frunevetmab/Solensia), além de controle de peso e enriquecimento ambiental com rampas.`
        : `Escore FMPI de ${total}/32. Dor articular crônica sob controle aceitável. Continue com as medidas de suporte físico e reavalie mensalmente com o tutor.`;

      return {
        totalScore: total,
        maxScore: max,
        displayScore: `${total}/${max}`,
        needsRescue,
        severity,
        recommendation: rec
      };
    }
  }
];
