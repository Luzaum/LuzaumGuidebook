import { Scale, InterpretationResult } from '../types';

export const DOG_SCALES: Scale[] = [
  {
    id: 'cmps-sf',
    name: 'Glasgow CMPS-SF',
    fullName: 'Escala de Dor Composta de Glasgow - Forma Curta (CMPS-SF)',
    species: 'dog',
    painType: 'acute',
    recommended: true,
    developer: 'Universidade de Glasgow (Reid J et al., 2007)',
    description: 'O padrão-ouro para avaliação de dor aguda pós-operatória em cães. Baseia-se em comportamentos observáveis.',
    maxScore: 24,
    rescueThreshold: 6,
    rescueLabel: '≥ 6/24 (ou ≥ 5/20 se mobilidade não avaliada)',
    references: [
      'Reid J, Nolan AM, Hughes JML, Lascelles D, Pawson P, Scott EM. Development of the short-form Glasgow Composite Measure Pain Scale (CMPS-SF) and its validation in dogs with acute pain. Animal Welfare 2007;16:97-104.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe o cão silenciosamente em seu canil por 2-3 minutos (comportamento e postura).',
      'Passo 2: Aproxime-se e interaja suavemente. Chame-o pelo nome e observe a resposta.',
      'Passo 3: Se possível, retire o cão do canil e observe sua locomoção/mobilidade.',
      'Passo 4: Pressione suavemente a área ao redor da ferida (~5cm) e avalie a reação física/vocal.'
    ],
    categories: [
      {
        id: 'vocalisation',
        name: '1. Vocalização',
        questions: [
          {
            id: 'dog_vocal',
            text: 'Selecione a opção que melhor descreve a vocalização do cão:',
            type: 'radio',
            options: [
              { score: 0, text: 'Silencioso e calmo' },
              { score: 1, text: 'Choraminga ou geme quando se move' },
              { score: 2, text: 'Chora ou geme quando tocado ou pressionado' },
              { score: 3, text: 'Geme constantemente ou grita de dor' }
            ]
          }
        ]
      },
      {
        id: 'attention_wound',
        name: '2. Atenção à Ferida / Área Dolorosa',
        questions: [
          {
            id: 'dog_wound',
            text: 'O cão está demonstrando atenção à ferida ou área dolorosa?',
            type: 'radio',
            options: [
              { score: 0, text: 'Ignora a ferida/área dolorosa' },
              { score: 1, text: 'Olha ocasionalmente para a ferida/área' },
              { score: 2, text: 'Lambe ou cheira ocasionalmente a ferida/área' },
              { score: 3, text: 'Esfrega ou morde a ferida/área' },
              { score: 4, text: 'Mutila ou tenta arrancar pontos/curativo agressivamente' }
            ]
          }
        ]
      },
      {
        id: 'mobility',
        name: '3. Mobilidade e Locomoção',
        description: 'Pule esta seção se o cão tiver fraturas múltiplas, trauma espinhal ou pélvico incapacitante.',
        questions: [
          {
            id: 'dog_mobility',
            text: 'Como o cão se comporta ao caminhar?',
            type: 'radio',
            options: [
              { score: 0, text: 'Caminha normalmente, ativo e sem claudicação' },
              { score: 1, text: 'Caminha com leve rigidez ou claudicação moderada' },
              { score: 2, text: 'Caminha com extrema dificuldade ou muita lentidão' },
              { score: 3, text: 'Recusa-se a levantar ou caminhar' },
              { score: 4, text: 'Não avaliado / Condição impeditiva (ex: trauma pélvico/espinhal)', imageDescription: 'Esta opção zera este bloco do cálculo' }
            ]
          }
        ]
      },
      {
        id: 'wound_touch',
        name: '4. Resposta ao Toque (Palpação)',
        description: 'Aplique pressão suave ao redor da ferida ou área afetada (~5cm de distância).',
        questions: [
          {
            id: 'dog_touch',
            text: 'Como o cão reage à palpação da área afetada?',
            type: 'radio',
            options: [
              { score: 0, text: 'Sem reação ou sem incômodo' },
              { score: 1, text: 'Olha ou vira a cabeça em direção ao toque' },
              { score: 2, text: 'Tensiona o corpo ou tenta se afastar' },
              { score: 3, text: 'Rosna, mostra os dentes ou tenta morder' },
              { score: 4, text: 'Vocaliza (chora, grita ou geme)' },
              { score: 5, text: 'Reação extrema combinada (foge, chora e tenta morder)' }
            ]
          }
        ]
      },
      {
        id: 'demeanor',
        name: '5. Comportamento Geral e Estado Mental',
        questions: [
          {
            id: 'dog_demeanor',
            text: 'Como está o estado mental e comportamento geral?',
            type: 'radio',
            options: [
              { score: 0, text: 'Alerta, amigável, abana a cauda ou interage' },
              { score: 1, text: 'Calmo, indiferente, pouco interessado no ambiente' },
              { score: 2, text: 'Ansioso, inquieto, treme ou parece assustado' },
              { score: 3, text: 'Deprimido, triste, apático, isola-se no fundo do canil' },
              { score: 4, text: 'Agressivo, nervoso, defensivo ao contato' }
            ]
          }
        ]
      },
      {
        id: 'posture',
        name: '6. Postura e Atividade no Canil',
        questions: [
          {
            id: 'dog_posture',
            text: 'Qual postura física o cão apresenta dentro do canil?',
            type: 'radio',
            options: [
              { score: 0, text: 'Relaxado, deitado confortavelmente de lado ou de bruços' },
              { score: 1, text: 'Sentado ou deitado, mas com tensão muscular evidente' },
              { score: 2, text: 'Encolhido, arqueado, cabeça baixa, membros sob o corpo' },
              { score: 3, text: 'Postura de prece (membros anteriores esticados, quadril elevado)' },
              { score: 4, text: 'Inquieto, muda constantemente de posição, não acha conforto' }
            ]
          }
        ]
      }
    ],
    interpretation: (answers) => {
      let total = 0;
      let mobilityAssessed = true;

      // Check if mobility is marked as skipped (score 4 in dog_mobility question)
      const mobilityVal = Number(answers['dog_mobility'] ?? 0);
      if (mobilityVal === 4) {
        mobilityAssessed = false;
      }

      Object.entries(answers).forEach(([key, val]) => {
        if (key === 'dog_mobility' && val === 4) {
          // skipped option has score value 4 but in actual score calculation it shouldn't add up
          return;
        }
        total += Number(val);
      });

      const max = mobilityAssessed ? 24 : 20;
      const threshold = mobilityAssessed ? 6 : 5;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < threshold) severity = 'mild';
      else if (total < threshold * 2) severity = 'moderate';
      else if (total < max - 3) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO INDICADO. O escore atingiu ou superou o limiar de intervenção (${total}/${max} - Limiar ≥ ${threshold}). Recomenda-se administrar analgésicos conforme o protocolo de resgate do Vetius e reavaliar em 30-60 minutos.`
        : `Escore clínico sob controle (${total}/${max}). A dor é considerada ausente ou leve. Continue monitorando e reavalie periodicamente ou a cada 2-4 horas no pós-operatório.`;

      return {
        totalScore: total,
        maxScore: max,
        displayScore: `${total}/${max}`,
        needsRescue,
        severity,
        recommendation: rec,
        subscores: [
          { name: 'Avaliação Comportamental', score: total, maxScore: max, threshold, needsRescue }
        ]
      };
    }
  },
  {
    id: 'umps',
    name: 'UMPS Melbourne',
    fullName: 'Escala de Dor da Universidade de Melbourne (UMPS)',
    species: 'dog',
    painType: 'acute',
    developer: 'Universidade de Melbourne (Firth AM & Haldane SL, 1999)',
    description: 'Avaliação abrangente que integra dados comportamentais, reações ao toque e parâmetros fisiológicos básicos.',
    maxScore: 27,
    rescueThreshold: 8,
    rescueLabel: '≥ 8/27',
    references: [
      'Firth AM, Haldane SL. Development of a scale to evaluate postoperative pain in dogs. J Am Vet Med Assoc 1999;214(5):651-659.'
    ],
    assessmentProtocol: [
      'Passo 1: Meça a frequência cardíaca (FC) e compare com a linha de base pré-operatória.',
      'Passo 2: Observe a respiração, pupilas, vocalização e postura corporal.',
      'Passo 3: Aproxime-se, faça um carinho e avalie o estado mental e atividade.',
      'Passo 4: Realize a palpação suave da ferida cirúrgica e da região abdominal.'
    ],
    categories: [
      {
        id: 'physiological',
        name: '1. Parâmetros Fisiológicos (FC e Respiração)',
        questions: [
          {
            id: 'umps_fc',
            text: 'Frequência Cardíaca comparada à linha de base:',
            type: 'radio',
            options: [
              { score: 0, text: 'Normal ou abaixo da linha de base' },
              { score: 1, text: 'Aumento de 10% a 20% acima da linha de base' },
              { score: 2, text: 'Aumento de 21% a 50% acima da linha de base' },
              { score: 3, text: 'Aumento superior a 50% ou taquicardia severa' }
            ]
          },
          {
            id: 'umps_resp',
            text: 'Padrão respiratório do paciente:',
            type: 'radio',
            options: [
              { score: 0, text: 'Respiração calma, frequência normal' },
              { score: 1, text: 'Taquipneia leve ou arfante ocasional' },
              { score: 2, text: 'Taquipneia acentuada, respiração superficial ou abdominal' }
            ]
          }
        ]
      },
      {
        id: 'palpation',
        name: '2. Resposta à Palpação da Ferida ou Área Afetada',
        questions: [
          {
            id: 'umps_palpation',
            text: 'Reação ao pressionar suavemente a ferida/área dolorosa:',
            type: 'radio',
            options: [
              { score: 0, text: 'Nenhuma resposta à palpação' },
              { score: 1, text: 'Vira a cabeça ou parece surpreso' },
              { score: 2, text: 'Retira-se, encolhe a área ou tensiona os músculos' },
              { score: 3, text: 'Chora, geme ou vocaliza' },
              { score: 4, text: 'Agressão ativa (rosna, morde ou tenta morder)' }
            ]
          }
        ]
      },
      {
        id: 'activity',
        name: '3. Atividade e Locomoção',
        questions: [
          {
            id: 'umps_activity',
            text: 'Nível de atividade espontânea do cão:',
            type: 'radio',
            options: [
              { score: 0, text: 'Dormindo ou deitado tranquilamente' },
              { score: 1, text: 'Inquieto, anda de um lado para o outro no canil' },
              { score: 2, text: 'Movimentos circulares contínuos, levanta e deita repetidamente' },
              { score: 3, text: 'Totalmente rígido, treme ou recusa-se a realizar qualquer movimento' }
            ]
          }
        ]
      },
      {
        id: 'mental_state',
        name: '4. Estado Mental e Resposta à Interação',
        questions: [
          {
            id: 'umps_mental',
            text: 'Como está o estado de consciência e humor?',
            type: 'radio',
            options: [
              { score: 0, text: 'Alerta, contente, interage positivamente' },
              { score: 1, text: 'Apreensivo, assustado ou indiferente à interação' },
              { score: 2, text: 'Muito deprimido, apático, isolado' },
              { score: 3, text: 'Delirante, desorientado ou em pânico' }
            ]
          }
        ]
      },
      {
        id: 'posture',
        name: '5. Postura Corporal',
        questions: [
          {
            id: 'umps_posture',
            text: 'Qual a postura física adotada pelo animal?',
            type: 'radio',
            options: [
              { score: 0, text: 'Deitado confortavelmente na posição lateral ou esternal' },
              { score: 1, text: 'De pé ou sentado com a cabeça erguida e corpo alinhado' },
              { score: 2, text: 'Corpo arqueado, abdômen contraído, cabeça baixa' },
              { score: 3, text: 'Postura de prece ou deitado em posição anormal de extrema rigidez' }
            ]
          }
        ]
      },
      {
        id: 'vocalisation',
        name: '6. Vocalização Espontânea',
        questions: [
          {
            id: 'umps_vocal',
            text: 'Avalie a vocalização espontânea do paciente:',
            type: 'radio',
            options: [
              { score: 0, text: 'Silencioso' },
              { score: 1, text: 'Choraminga ou geme ocasionalmente de forma suave' },
              { score: 2, text: 'Geme ou chora continuamente' },
              { score: 3, text: 'Grita, uiva ou berra de forma aguda' }
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

      const max = 27;
      const threshold = 8;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total <= 5) severity = 'mild';
      else if (total <= 13) severity = 'moderate';
      else if (total <= 21) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO INDICADO (Pontuação: ${total}/27 - Dor Moderada a Severa). O escore superou o limite recomendado de 8. Administre medicação analgésica conforme o peso e protocolo e reavalie em até 60 minutos.`
        : `Escore de dor de ${total}/27 (Dor Leve ou Ausente). Sem necessidade imediata de resgate analgésico. Mantenha a vigilância periódica.`;

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
    id: '4a-vet',
    name: '4A-VET',
    fullName: 'Escala Multidimensional 4A-VET de Dor Aguda',
    species: 'dog',
    painType: 'acute',
    developer: 'Rialland P et al. (2012)',
    description: 'Escala clínica focada na avaliação rápida pós-cirúrgica baseada em 6 características comportamentais refinadas.',
    maxScore: 18,
    rescueThreshold: 8,
    rescueLabel: '≥ 8/18',
    references: [
      'Rialland P et al. Validation of the French 4A-VET scale for acute postoperative pain assessment in dogs. Veterinary Anaesthesia and Analgesia 2012;39(4):431-443.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe a postura e interação geral do cão no box clínico.',
      'Passo 2: Avalie se há tremores, lambedura excessiva ou vocalização involuntária.',
      'Passo 3: Aplique pressão delicada na região peri-incisional e registre a resposta do animal.'
    ],
    categories: [
      {
        id: 'behaviors',
        name: 'Avaliação Comportamental e Reativa',
        questions: [
          {
            id: 'vet4a_posture',
            text: '1. Postura corporal e conforto:',
            type: 'radio',
            options: [
              { score: 0, text: 'Totalmente relaxado e em repouso natural' },
              { score: 1, text: 'Ligeiramente tenso, muda de posição raramente' },
              { score: 2, text: 'Claramente tenso, rígido ou inquieto' },
              { score: 3, text: 'Totalmente arqueado, contraído ou imóvel de dor' }
            ]
          },
          {
            id: 'vet4a_wound',
            text: '2. Reação e atenção direcionada à ferida:',
            type: 'radio',
            options: [
              { score: 0, text: 'Nenhuma atenção' },
              { score: 1, text: 'Olha ou cheira a área da ferida ocasionalmente' },
              { score: 2, text: 'Lambe ou coça a região de forma insistente' },
              { score: 3, text: 'Tenta morder, arrancar pontos ou se automutilar' }
            ]
          },
          {
            id: 'vet4a_vocal',
            text: '3. Vocalização do cão:',
            type: 'radio',
            options: [
              { score: 0, text: 'Totalmente silencioso' },
              { score: 1, text: 'Geme ou choraminga levemente quando incomodado' },
              { score: 2, text: 'Chora ou geme espontaneamente' },
              { score: 3, text: 'Geme de forma contínua ou dá gritos agudos' }
            ]
          },
          {
            id: 'vet4a_touch',
            text: '4. Reação à palpação ao redor da ferida cirúrgica:',
            type: 'radio',
            options: [
              { score: 0, text: 'Absolutamente nenhuma reação adversa' },
              { score: 1, text: 'Olha para o examinador ou vira a cabeça ao toque' },
              { score: 2, text: 'Afasta-se, contrai o abdômen ou encolhe-se' },
              { score: 3, text: 'Rosna, tenta morder ou grita imediatamente' }
            ]
          },
          {
            id: 'vet4a_demeanor',
            text: '5. Atitude geral e interação:',
            type: 'radio',
            options: [
              { score: 0, text: 'Amigável, dócil, interativo com o veterinário' },
              { score: 1, text: 'Indiferente, tímido ou pouco interessado' },
              { score: 2, text: 'Ansioso, muito assustado ou estressado' },
              { score: 3, text: 'Totalmente prostrado, apático ou extremamente agressivo' }
            ]
          },
          {
            id: 'vet4a_tension',
            text: '6. Tensão muscular geral ou tremores corporais:',
            type: 'radio',
            options: [
              { score: 0, text: 'Tônus muscular normal, sem tremores' },
              { score: 1, text: 'Musculatura ligeiramente firme ao toque' },
              { score: 2, text: 'Membros rígidos ou tremores intermitentes' },
              { score: 3, text: 'Rigidez muscular generalizada extrema ou tremores intensos contínuos' }
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

      const max = 18;
      const threshold = 8;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 4) severity = 'mild';
      else if (total < 8) severity = 'moderate';
      else if (total < 13) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ RESGATE ANALGÉSICO NECESSÁRIO (Pontuação: ${total}/18). O escore ultrapassou o limiar de segurança de 8/18 na escala 4A-VET. Providencie intervenção analgésica rápida.`
        : `Escore de ${total}/18. Dor sob controle adequado. Continue avaliando regularmente nas próximas horas.`;

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
    id: 'cbpi',
    name: 'CBPI (Dor Crônica)',
    fullName: 'Inventário de Dor Breve Canina (CBPI)',
    species: 'dog',
    painType: 'chronic',
    recommended: true,
    developer: 'Universidade da Pensilvânia (Brown DC et al., 2007)',
    description: 'Preenchido pelo tutor. Avalia a gravidade da dor crônica (osteoartrite, câncer) e a interferência nas atividades diárias.',
    maxScore: 10,
    rescueThreshold: 3,
    rescueLabel: 'Média de Gravidade ≥ 3 ou de Interferência ≥ 3',
    references: [
      'Brown DC, Boston RC, Coyne JC, Farrar JT. Development and psychometric testing of an instrument designed to measure chronic pain in dogs with osteoarthritis. Am J Vet Res 2007;68(6):631-637.'
    ],
    assessmentProtocol: [
      'Passo 1: Entregue este questionário ao tutor do cão para preenchimento.',
      'Passo 2: Instrua o tutor a dar notas de 0 a 10 com base nos comportamentos do cão na última semana.',
      'Passo 3: A última pergunta avalia a percepção geral da qualidade de vida (QoL).'
    ],
    categories: [
      {
        id: 'severity',
        name: 'Seção A: Escore de Gravidade da Dor (PSS)',
        description: 'Avalia a intensidade da dor do cão na última semana (0 = Sem Dor, 10 = Dor Extrema)',
        questions: [
          {
            id: 'cbpi_sev_worst',
            text: 'Dor do cão em seu pior momento na última semana:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Sem dor (0)',
            labelMax: 'Dor extrema (10)'
          },
          {
            id: 'cbpi_sev_least',
            text: 'Dor do cão em seu menor nível na última semana:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Sem dor (0)',
            labelMax: 'Dor extrema (10)'
          },
          {
            id: 'cbpi_sev_average',
            text: 'Dor do cão em média na última semana:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Sem dor (0)',
            labelMax: 'Dor extrema (10)'
          },
          {
            id: 'cbpi_sev_now',
            text: 'Dor que o cão sente exatamente neste momento:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Sem dor (0)',
            labelMax: 'Dor extrema (10)'
          }
        ]
      },
      {
        id: 'interference',
        name: 'Seção B: Escore de Interferência da Dor (PIS)',
        description: 'Avalia como a dor interferiu nas atividades do cão na última semana (0 = Nenhuma Interferência, 10 = Interferência Total)',
        questions: [
          {
            id: 'cbpi_int_walk',
            text: 'Interferência na habilidade de caminhar:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Normal (0)',
            labelMax: 'Impossibilitado (10)'
          },
          {
            id: 'cbpi_int_run',
            text: 'Interferência na habilidade de correr:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Normal (0)',
            labelMax: 'Impossibilitado (10)'
          },
          {
            id: 'cbpi_int_rise',
            text: 'Interferência na habilidade de se levantar a partir de uma posição deitada:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Normal (0)',
            labelMax: 'Impossibilitado (10)'
          },
          {
            id: 'cbpi_int_climb',
            text: 'Interferência na habilidade de subir escadas ou subir no sofá/carro:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Normal (0)',
            labelMax: 'Impossibilitado (10)'
          },
          {
            id: 'cbpi_int_down',
            text: 'Interferência na habilidade de descer escadas ou descer do sofá/carro:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Normal (0)',
            labelMax: 'Impossibilitado (10)'
          },
          {
            id: 'cbpi_int_play',
            text: 'Interferência no prazer de brincar e socializar com a família/outros cães:',
            type: 'slider',
            min: 0,
            max: 10,
            step: 1,
            labelMin: 'Normal (0)',
            labelMax: 'Impossibilitado (10)'
          }
        ]
      },
      {
        id: 'qol',
        name: 'Seção C: Qualidade de Vida Geral',
        questions: [
          {
            id: 'cbpi_qol',
            text: 'Como você descreveria a qualidade de vida geral do seu cão na última semana?',
            type: 'radio',
            options: [
              { score: 0, text: 'Excelente' },
              { score: 1, text: 'Muito Boa' },
              { score: 2, text: 'Boa' },
              { score: 3, text: 'Regular (Média)' },
              { score: 4, text: 'Ruim' }
            ]
          }
        ]
      }
    ],
    interpretation: (answers) => {
      // Calculate PSS (Pain Severity Score) - Mean of the first 4 questions
      const sevIds = ['cbpi_sev_worst', 'cbpi_sev_least', 'cbpi_sev_average', 'cbpi_sev_now'];
      let sevSum = 0;
      let sevCount = 0;
      sevIds.forEach((id) => {
        if (answers[id] !== undefined) {
          sevSum += Number(answers[id]);
          sevCount++;
        }
      });
      const pss = sevCount > 0 ? sevSum / sevCount : 0;

      // Calculate PIS (Pain Interference Score) - Mean of the 6 interference questions
      const intIds = ['cbpi_int_walk', 'cbpi_int_run', 'cbpi_int_rise', 'cbpi_int_climb', 'cbpi_int_down', 'cbpi_int_play'];
      let intSum = 0;
      let intCount = 0;
      intIds.forEach((id) => {
        if (answers[id] !== undefined) {
          intSum += Number(answers[id]);
          intCount++;
        }
      });
      const pis = intCount > 0 ? intSum / intCount : 0;

      const qolScore = Number(answers['cbpi_qol'] ?? 0);
      const qolLabels = ['Excelente', 'Muito Boa', 'Boa', 'Regular', 'Ruim'];

      // CBPI intervention guideline: PSS >= 3 OR PIS >= 3 suggests significant pain needing medical treatment
      const needsRescue = pss >= 3 || pis >= 3;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      const maxScore = Math.max(pss, pis);
      if (maxScore === 0) severity = 'none';
      else if (maxScore < 3) severity = 'mild';
      else if (maxScore < 6) severity = 'moderate';
      else if (maxScore < 8) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ MANEJO MÉDICO INDICADO. Médias de Gravidade (PSS: ${pss.toFixed(1)}/10) ou Interferência (PIS: ${pis.toFixed(1)}/10) estão iguais ou maiores que 3. O cão apresenta impacto clínico relevante na qualidade de vida (${qolLabels[qolScore]}). Recomenda-se iniciar ou ajustar a terapia multimodal crônica (AINEs, analgésicos adjuvantes como Gabapentina, fisioterapia, controle de peso e condroprotetores).`
        : `Paciente estável (PSS: ${pss.toFixed(1)}/10, PIS: ${pis.toFixed(1)}/10). Dor sob controle satisfatório. Qualidade de vida avaliada como: ${qolLabels[qolScore]}. Mantenha o acompanhamento veterinário e o protocolo analgésico atual.`;

      return {
        totalScore: Number(((pss + pis) / 2).toFixed(1)),
        maxScore: 10,
        displayScore: `PSS: ${pss.toFixed(1)} | PIS: ${pis.toFixed(1)}`,
        needsRescue,
        severity,
        recommendation: rec,
        subscores: [
          { name: 'Gravidade da Dor (PSS)', score: Number(pss.toFixed(1)), maxScore: 10, threshold: 3, needsRescue: pss >= 3 },
          { name: 'Interferência da Dor (PIS)', score: Number(pis.toFixed(1)), maxScore: 10, threshold: 3, needsRescue: pis >= 3 }
        ]
      };
    }
  },
  {
    id: 'qol-cancer',
    name: 'QoL Câncer (Crônica)',
    fullName: 'Escore de Qualidade de Vida para Cães com Câncer (HELEMA)',
    species: 'dog',
    painType: 'chronic',
    developer: 'Vários autores (escala adaptada de oncologia paliativa)',
    description: 'Focado em cães sob cuidados paliativos ou quimioterapia, avaliando conforto, apetite e bem-estar subjetivo.',
    maxScore: 36,
    rescueThreshold: 15,
    rescueLabel: '≥ 15/36',
    references: [
      'Villalobos A. Quality of Life Scale for Dogs and Cats (HHHHHMM Scale). Veterinary Practice News 2004.'
    ],
    assessmentProtocol: [
      'Passo 1: Responda a cada um dos 12 tópicos com base nas observações gerais do cão na última semana.',
      'Passo 2: Cada tópico possui escore de 0 (ótimo/normal) a 3 (gravemente alterado/ruim).'
    ],
    categories: [
      {
        id: 'cancer_qol_cats',
        name: 'Parâmetros de Bem-estar e Sintomas',
        questions: [
          {
            id: 'canc_hurt',
            text: '1. Dor / Desconforto (gemidos, tremores, recusa a se mover):',
            type: 'radio',
            options: [
              { score: 0, text: 'Totalmente confortável, sem sinais de dor' },
              { score: 1, text: 'Dor leve, controlada com medicamentos básicos' },
              { score: 2, text: 'Dor moderada recorrente, necessita de ajustes' },
              { score: 3, text: 'Dor crônica intensa, vocaliza ou se isola constantemente' }
            ]
          },
          {
            id: 'canc_hunger',
            text: '2. Apetite e Alimentação:',
            type: 'radio',
            options: [
              { score: 0, text: 'Come muito bem, quantidade normal com entusiasmo' },
              { score: 1, text: 'Come se estimulado, ou prefere petiscos/comida úmida' },
              { score: 2, text: 'Alimenta-se muito pouco, mesmo com incentivo' },
              { score: 3, text: 'Recusa alimentar-se (anorexia completa) há dias' }
            ]
          },
          {
            id: 'canc_hydration',
            text: '3. Hidratação:',
            type: 'radio',
            options: [
              { score: 0, text: 'Bebe água normalmente, elasticidade da pele perfeita' },
              { score: 1, text: 'Elasticidade de pele levemente reduzida' },
              { score: 2, text: 'Desidratação moderada, mucosas secas' },
              { score: 3, text: 'Desidratação severa ou necessita de fluidoterapia subcutânea constante' }
            ]
          },
          {
            id: 'canc_hygiene',
            text: '4. Higiene e Autocuidado (pelagem, controle de esfíncteres):',
            type: 'radio',
            options: [
              { score: 0, text: 'Pelo limpo, urina e fezes nos locais certos sem esforço' },
              { score: 1, text: 'Pelagem um pouco opaca ou embaraçada, mas limpo' },
              { score: 2, text: 'Suja-se ocasionalmente de urina ou fezes, dificuldade de locomoção' },
              { score: 3, text: 'Incontinente, pelo constantemente úmido ou sujo' }
            ]
          },
          {
            id: 'canc_happiness',
            text: '5. Felicidade / Interação (resposta à família, brinquedos):',
            type: 'radio',
            options: [
              { score: 0, text: 'Feliz, interage ativamente, abana a cauda' },
              { score: 1, text: 'Menos brincalhão, mas ainda interage e saúda a família' },
              { score: 2, text: 'Isolado no seu canto, responde pouco ao contato' },
              { score: 3, text: 'Apresenta depressão profunda, apatia completa ou medo inexplicável' }
            ]
          },
          {
            id: 'canc_mobility',
            text: '6. Mobilidade geral:',
            type: 'radio',
            options: [
              { score: 0, text: 'Anda livremente sem claudicação' },
              { score: 1, text: 'Rigidez ao levantar, mas caminha bem após aquecer' },
              { score: 2, text: 'Precisa de ajuda moderada para se levantar ou andar' },
              { score: 3, text: 'Incapaz de se levantar ou andar sozinho' }
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

      const max = 36;
      const threshold = 15;
      const needsRescue = total >= threshold;

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total === 0) severity = 'none';
      else if (total < 8) severity = 'mild';
      else if (total < 15) severity = 'moderate';
      else if (total < 24) severity = 'severe';
      else severity = 'extreme';

      const rec = needsRescue
        ? `⚠️ ALERTA DE QUALIDADE DE VIDA COMPROMETIDA (${total}/36). O escore superou o limite ético de 15 pontos. Indica sofrimento crônico importante. Recomenda-se realizar uma consulta de oncologia ou cuidados paliativos para intensificar a analgesia, avaliar suporte nutricional e de hidratação, e discutir honestamente o bem-estar do paciente com o tutor.`
        : `Escore de qualidade de vida de ${total}/36. A saúde geral está razoavelmente equilibrada sob tratamento. Mantenha os cuidados e a terapia atual.`;

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
    id: 'sedation-wagner',
    name: 'Sedação Abreviada (Wagner 2017)',
    fullName: 'Escala de Sedação Abreviada para Cães',
    species: 'dog',
    painType: 'acute',
    developer: 'Wagner MC et al. (2017)',
    description: 'Utilizada clinicamente para diferenciar o estado de dor da sedação/disforia no período pós-anestésico imediato.',
    maxScore: 12,
    rescueThreshold: 4,
    rescueLabel: '≥ 4/12 (indica sedação acentuada)',
    references: [
      'Wagner MC et al. Clinical evaluation of an abbreviated sedation scale in dogs. Veterinary Anaesthesia and Analgesia 2017;44(3):421-430.'
    ],
    assessmentProtocol: [
      'Passo 1: Observe a resposta do animal à abertura da porta do box clínico.',
      'Passo 2: Verifique a posição da cabeça, pálpebras e a resistência física ao ser manipulado.'
    ],
    categories: [
      {
        id: 'sedation_params',
        name: 'Parâmetros de Sedação',
        questions: [
          {
            id: 'sed_head',
            text: '1. Posição da cabeça:',
            type: 'radio',
            options: [
              { score: 0, text: 'Normal, erguida, atenta ao ambiente' },
              { score: 1, text: 'Levemente baixa, mas ergue-se com estímulo visual/sonoro' },
              { score: 2, text: 'Cabeça apoiada no chão, ergue-se com dificuldade sob estímulo táctil' },
              { score: 3, text: 'Totalmente prostrado, cabeça pesada sem resposta aos estímulos normais' }
            ]
          },
          {
            id: 'sed_eyes',
            text: '2. Pálpebras e reflexo palpebral:',
            type: 'radio',
            options: [
              { score: 0, text: 'Olhos bem abertos, reflexo normal' },
              { score: 1, text: 'Olhos semicerrados (ptose palpebral leve)' },
              { score: 2, text: 'Olhos fechados na maior parte do tempo, abrem levemente ao estímulo' },
              { score: 3, text: 'Olhos completamente fechados, pupilas mióticas, sem resposta ocular' }
            ]
          },
          {
            id: 'sed_stimulus',
            text: '3. Resposta ao chamado e abertura do box:',
            type: 'radio',
            options: [
              { score: 0, text: 'Levanta-se imediatamente ou aproxima-se' },
              { score: 1, text: 'Olha em direção ao som, mexe as orelhas mas permanece deitado' },
              { score: 2, text: 'Responde tardiamente apenas a barulho forte ou toque na pele' },
              { score: 3, text: 'Nenhuma resposta à voz ou estímulo físico suave' }
            ]
          },
          {
            id: 'sed_resistance',
            text: '4. Tônus muscular e resistência à manipulação:',
            type: 'radio',
            options: [
              { score: 0, text: 'Normal, resiste se colocado em decúbito forçado' },
              { score: 1, text: 'Resistência leve ao ser manipulado' },
              { score: 2, text: 'Flacidez muscular moderada, aceita decúbito lateral facilmente' },
              { score: 3, text: 'Totalmente flácido, aceita qualquer posicionamento passivamente' }
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
      const needsRescue = false; // This is a sedation scale, not pain rescue indicator

      let severity: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme' = 'none';
      if (total <= 2) severity = 'none';
      else if (total <= 5) severity = 'mild';
      else if (total <= 8) severity = 'moderate';
      else severity = 'severe';

      let rec = '';
      if (total <= 2) {
        rec = `Paciente ativo e alerta (${total}/12). Efeito sedativo residual desprezível. Se apresentar agitação, considere dor real ou disforia pós-anestésica.`;
      } else if (total <= 5) {
        rec = `Sedação leve (${total}/12). O paciente está calmo e responde a estímulos. Período de recuperação anestésica esperado e seguro.`;
      } else if (total <= 8) {
        rec = `Sedação moderada (${total}/12). Apresenta tônus muscular reduzido e sonolência marcante. Mantenha em monitoramento em decúbito esternal protegido para evitar aspiração.`;
      } else {
        rec = `🚨 SEDAÇÃO PROFUNDA OU PROSTRAÇÃO EXTREMA (${total}/12). Paciente flácido e irresponsivo. Monitore rigorosamente os reflexos protetores de via aérea, temperatura e saturação de oxigênio. Evite manipulação desnecessária até regressão parcial.`;
      }

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
