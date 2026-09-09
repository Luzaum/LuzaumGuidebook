import type { Disease } from '../../types'

export const dermatoOrtopedicoDiseases: Disease[] = [
  {
    name: 'Artrite Séptica',
    pathogens:
      'Staphylococcus pseudintermedius (> 50-60% dos casos), Streptococcus canis, Pasteurella multocida, Escherichia coli, Pseudomonas aeruginosa, Mycoplasma spp. e anaeróbios estritos pós-trauma ou cirurgia ortopédica.',
    firstLine: {
      title: '1ª linha empírica pós-artrocentese',
      presentation:
        'Terapia com excelente penetração na membrana e no fluido sinovial com cobertura estafilocócica.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cefalexina',
              rationale:
                'Cefalosporina de 1ª geração com excelente penetração na cápsula articular inflamada e atividade contra Staphylococcus e Streptococcus.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Primeira linha alternativa oral/parenteral com ampla cobertura para bactérias produtoras de betalactamases e Pasteurella.',
            },
            {
              name: 'Clindamicina',
              rationale:
                'Opção oral/injetável com excelente acúmulo no líquido sinovial e no osso subcondral.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Infecção Hospitalar Pós-Artroscopia / Choque)',
      presentation:
        'Terapia intravenosa potente associada a drenagem cirúrgica e lavagem articular de emergência.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ceftriaxona (IV)',
              rationale:
                'Cefalosporina parenteral de amplo espectro para infecções graves ou suspeita de Gram-negativos.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Reforço de ação bactericida para bacilos Gram-negativos e Pseudomonas.',
            },
          ],
        },
      ],
    },
    duration:
      'Mínimo de 3 a 4 semanas (21 a 28 dias). Manter o tratamento por pelo menos 1 a 2 semanas após a resolução clínica completa da claudicação, calor e efusão articular.',
    notes:
      'CONDUTA DE EMERGÊNCIA ORTOPÉDICA:\n1. ARTROCENTESE COM CITOLOGIA E CULTURA: Deve ser realizada OBRIGATORIAMENTE antes de prescrever qualquer antibiótico. A presença de neutrófilos degenerados repletos de bactérias fagocitadas confirma a infecção séptica.\n2. LAVAGEM ARTICULAR (Artrotomia ou Artroscopia com grande volume de solução salina 0,9% estéril morna): Remove debris necróticos, fibrina e proteases lisossomais liberadas por neutrófilos que destroem a cartilagem articular em 24 a 48 horas.',
  },
  {
    name: 'Osteomielite',
    pathogens:
      'Staphylococcus pseudintermedius, Staphylococcus aureus (incluindo MRSP/MRSA), Streptococcus spp., Escherichia coli, Proteus mirabilis, Pseudomonas aeruginosa e anaeróbios associados a fraturas expostas ou implantes ortopédicos metálicos (biofilme).',
    firstLine: {
      title: '1ª linha (alta penetração na matriz óssea cortical)',
      presentation:
        'Antimicrobianos capazes de atingir concentrações bactericidas terapêuticas no tecido ósseo trabecular e compacto.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'FÁRMACO DE ESCOLHA PRIMÁRIA: Penetra ativamente na matriz óssea cortical e no líquido intersticial trabecular, mantendo níveis bactericidas superiores à concentração sérica contra Staphylococcus spp.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'Cefalosporina oral de 1ª geração de escolha para osteomielites agudas pós-traumáticas não complicadas.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Osteomielite Crônica com Biofilme / Resistência)',
      presentation:
        'Terapia direcionada por antibiograma de biópsia óssea profunda, com atividade contra biofilme microbiano.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Espectro ampliado em infecções ósseas mistas com enterobactérias.',
            },
            {
              name: 'Doxiciclina',
              rationale:
                'Tetraciclina com afinidade química por cálcio e apatita óssea, útil em infecções crônicas ou biofilmes.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona potente para osteomielite causada por bacilos Gram-negativos resistentes (E. coli, Pseudomonas).',
            },
          ],
        },
      ],
    },
    duration:
      'Osteomielite Aguda: 3 a 4 semanas. Osteomielite Crônica com implante / sequestro ósseo: 6 a 12 semanas (ou mais).',
    notes:
      'TRATAMENTO CIRÚRGICO INDISPENSÁVEL: Na osteomielite crônica, nenhum antibiótico cura o animal isoladamente se houver sequestro ósseo avascularizado ou implante instável com biofilme bacteriano. A cirurgia ortopédica para desbridamento, curetagem de osso necrótico, lavagem abundante e remoção de placas/parafusos frouxos é mandatória para a cura. Coletar fragmento de osso e tecido profundo para cultura e antibiograma durante o procedimento.',
  },
  {
    name: 'Infecções de Feridas, Tecidos Moles e Abscessos',
    pathogens:
      'Staphylococcus pseudintermedius, Streptococcus canis, Pasteurella multocida, Escherichia coli, Pseudomonas aeruginosa e anaeróbios estritos (Bacteroides, Clostridium, Fusobacterium).',
    firstLine: {
      title: 'Abordagem Primária de Abscessos Localizados: DRENAGEM',
      presentation:
        'Abscessos subcutâneos flutuantes circunscritos sem repercussão sistêmica NÃO REQUEREM antimicrobianos sistêmicos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'CONDUTA PADRÃO OURO: TRATAMENTO É DRENAGEM CIRÚRGICA AMPLA, debridamento e lavagem contínua abundante com Solução Fisiológica morna e Clorexidina a 0,2%. O antimicrobiano sistêmico é INEFICAZ no interior de coleções purulentas avasculares e acelera a seleção de resistência.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Indicação em Feridas Graves com Celulite / Febre',
      presentation:
        'Antimicrobianos sistêmicos indicados quando há celulite invasiva perilesional, calor, enfisema subcutâneo, linfadenite satélite ou febre.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Primeira linha oral/parenteral para tecidos moles com excelente cobertura para estafilococos, estreptococos e anaeróbios.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'Alternativa oral com ampla margem de segurança para celulite bacteriana em cães.',
            },
          ],
        },
      ],
    },
    duration:
      'Abscesso drenado simples: ZERO dias de antibiótico oral. Feridas infectadas com celulite ou febre: 7 a 10 dias.',
    notes:
      'REGRA DE OURO DA CIRURGIA: "Ubi pus, ibi evacua" (Onde houver pus, drene). O meio purulento é ácido, hipóxico e repleto de detritos celulares que inativam a maioria dos antimicrobianos sistêmicos. A cura de feridas infectadas depende de limpeza mecânica, irrigação, desbridamento cirúrgico de tecido desvitalizado e curativos úmidos adequados.',
  },
  {
    name: 'Piodermite de Superfície (Dermatite das Dobras / Intertrigo / Hot Spot)',
    pathogens:
      'Supercrescimento de microbiota comensal cutânea: Staphylococcus pseudintermedius associado à levedura Malassezia pachydermatis na camada córnea da pele.',
    firstLine: {
      title: 'Tratamento Exclusivamente Tópico / Antisséptico',
      presentation:
        'TODAS as diretrizes dermatológicas mundiais (WAVD) CONTRAINDICAM formalmente o uso de antibióticos orais ou injetáveis para piodermites de superfície.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'CONDUTA PADRÃO OURO: **NÃO USAR ANTIMICROBIANOS SISTÊMICOS**. Tratamento tópico com xampu, lenços ou solução antisséptica de Clorexidina a 2% a 4% uma a duas vezes ao dia. Em lesões úmidas agudas ("hot spot"), realizar tricotomia ampla ao redor da lesão, limpeza e secagem com compressas.',
            },
            {
              name: 'Ácido Fusídico (Tópico)',
              rationale:
                'Pomada ou gel tópico com alta penetração na camada córnea e atividade seletiva antiestafilocócica em dermatites úmidas agudas localizadas.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Manejo das Causas de Base e Corticoide Tópico Suave',
      presentation:
        'O sucesso depende da correção do microclima úmido da dobra cutânea e controle da coceira/prurido de base.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'Manutenção antisséptica periódica (2 a 3 vezes por semana) em dobras labiais, nasais ou perivulvares de raças braquicefálicas para prevenir recidivas.',
            },
          ],
        },
      ],
    },
    duration:
      'Tratamento tópico por 7 a 14 dias até a remissão completa da vermelhidão e exsudação. Antibiótico sistêmico: ZERO DIAS.',
    notes:
      'STEWARDSHIP DERMATOLÓGICO: A colonização bacteriana na dermatite das dobras e no intertrigo é estritamente superficial, restrita à camada córnea externa da epiderme. A administração de antibióticos orais expõe todo o organismo do animal a pressões seletivas desnecessárias, causando disbiose intestinal e selecionando cepas de MRSP resistentes a todos os beta-lactâmicos.',
  },
  {
    name: 'Piodermite Superficial Canina (Foliculite Bacteriana)',
    pathogens:
      'Staphylococcus pseudintermedius colonizando o interior dos folículos pilosos (pápulas, pústulas foliculares, colaretes epidérmicos e crostas).',
    firstLine: {
      title: '1ª linha de escolha (TRATAMENTO TÓPICO PREFERENCIAL)',
      presentation:
        'O tratamento tópico exclusivo é a intervenção de PRIMEIRA ESCOLHA segundo o consenso internacional de dermatologia veterinária.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'PRIMEIRA ESCOLHA PREFERENCIAL: Banhos com xampu de Clorexidina a 2% a 4% (ou associação Clorexidina + Miconazol) de 2 a 3 vezes por semana, com tempo de contato mínimo de 10 minutos antes do enxágue. Eficácia clínica idêntica aos antibióticos orais, sem efeitos adversos sistêmicos.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'ANTIBIÓTICO ORAL DE ESCOLHA (apenas quando o tutor é incapaz de realizar banhos ou em lesões muito extensas): Cefalosporina de 1ª geração com excelente índice terapêutico para Staphylococcus pseudintermedius.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Alternativa oral bactericida de primeira linha com alta tolerância clínica.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha oral (intolerância ou guiada por cultura)',
      presentation:
        'Lincosamidas ou cefalosporinas de geração avançada reservadas para falha terapêutica ou intolerância aos de 1ª linha.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'Excelente opção oral para cães com sensibilidade digestiva a penicilinas.',
            },
            {
              name: 'Cefpodoxima',
              rationale:
                'Cefalosporina de 3ª geração oral com comodidade de dose única diária (SID), reservada para casos de difícil administração oral.',
            },
          ],
        },
      ],
    },
    duration:
      'Tratamento tópico: até a resolução clínica + 7 dias adicionais. Antibiótico oral: habitualmente 3 a 4 semanas (MANTER OBRIGATORIAMENTE POR 7 DIAS APÓS O DESAPARECIMENTO TOTAL de todas as pápulas, pústulas e colaretes epidérmicos).',
    notes:
      'REGRA DE OURO DO TEMPO DE TRATAMENTO DERMATOLÓGICO: Nunca interromper a antibioticoterapia oral assim que a pele "parecer bonita". A interrupção antes de 7 dias após a cura clínica microscópica/macroscópica deixa bactérias residuais no fundo dos folículos pilosos, gerando recidiva rápida e seleção de MRSP. Sempre investigar causas subjacentes de prurido (Dermatite Atópica, DAPP, Alergia Alimentar ou Hipotireoidismo). FLUOROQUINOLONAS SÃO CONTRAINDICADAS como 1ª linha em piodermites superficiais.',
  },
  {
    name: 'Piodermite Profunda Canina (Furunculose / Celulite Cutânea)',
    pathogens:
      'Staphylococcus pseudintermedius com ruptura da parede folicular e infecção secundária profunda por bacilos Gram-negativos: Pseudomonas aeruginosa, Proteus mirabilis, Escherichia coli e Streptococcus canis.',
    firstLine: {
      title: '1ª linha sistêmica + banhos antissépticos adjuvantes',
      presentation:
        'A piodermite profunda rompe a derme e a hipoderme (fístulas, drenagem de sangue e pus, edema e dor). EXIGE antibioticoterapia sistêmica prolongada + cultura.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cefalexina',
              rationale:
                'Base oral de primeira linha para cobertura antiestafilocócica em piodermites profundas, associada a banhos antissépticos com xampu de Clorexidina 3-4% duas vezes por semana.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Opção de amplo espectro eficaz contra bactérias dérmicas produtoras de betalactamases.',
            },
            {
              name: 'Clindamicina',
              rationale:
                'Lincosamida de escolha para furunculose interdigital e lesões profundas com boa penetração tecidual.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Fluoroquinolonas guiadas por Antibiograma)',
      presentation:
        'Indicadas estritamente se houver isolamento de Pseudomonas aeruginosa ou Gram-negativos refratários em antibiograma.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Marbofloxacina',
              rationale:
                'Fluoroquinolona potente com alta eficácia comprovada contra Pseudomonas em pele.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Opção bactericida para bactérias Gram-negativas dérmicas profundas.',
            },
          ],
        },
      ],
    },
    duration:
      'Mínimo de **4 a 6 semanas** (MANTER OBRIGATORIAMENTE POR 14 DIAS APÓS A RESOLUÇÃO CLÍNICA COMPLETA de todos os trajetos fistulosos, crostas, nódulos e edema dérmico).',
    notes:
      'EXIGÊNCIA MICROBIOLÓGICA: Na piodermite profunda, a coleta de material por swab estéril de trajeto fistuloso após assepsia prévia superficial é OBRIGATÓRIA para cultura e antibiograma. A taxa de Staphylococcus resistente à meticilina (MRSP) é expressiva em cães que já receberam múltiplos ciclos prévios de antibióticos. Tratamentos curtos (< 4 semanas) resultam invariavelmente em falha terapêutica e fibrose cicatricial crônica.',
  },
  {
    name: 'Feridas por Mordedura',
    pathogens:
      'Flora comensal oral mista aeróbia e anaeróbia de cães e gatos inoculada sob alta pressão no tecido subcutâneo: Pasteurella multocida, Staphylococcus pseudintermedius, Streptococcus canis, Corynebacterium spp., Bacteroides spp., Fusobacterium spp. e Clostridium perfringens.',
    firstLine: {
      title: '1ª linha empírica de emergência',
      presentation:
        'Feridas por mordeduras são classificadas como contaminadas ou infectadas no momento da ocorrência devido à inoculação bacteriana da saliva.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'ANTIBIÓTICO DE ESCOLHA PRIMÁRIA: Cobre com excelência Pasteurella multocida, Staphylococcus, Streptococcus e bactérias anaeróbias orais estritas inoculadas pela mordedura.',
            },
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Opção parenteral intravenosa imediata na primeira hora para animais internados com feridas extensas ou choque séptico associado.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (casos refratários / celulite necrosante difusa)',
      presentation:
        'Terapia combinada de amplo espectro quando há necrose tecidual acelerada ou contaminação grosseira com corpos estranhos.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base beta-lactâmica contra Pasteurella e anaeróbios orais.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Reforço de ação rápida contra bacilos Gram-negativos endotóxicos.',
            },
          ],
        },
      ],
    },
    duration:
      'Feridas limpas e debridadas precocemente (< 6h do trauma): 5 a 7 dias. Lesões graves com esmagamento muscular extenso ou celulite: 7 a 14 dias.',
    notes:
      'FENÔMENO DO "ICEBERG" NAS MORDEDURAS:\nAs marcas de dentes na pele frequentemente aparentam ser pequenos furos puntiformes inocentes, mas as forças de cisalhamento e tração da mordedura causam descolamento subcutâneo maciço ("espaço morto"), laceração de fáscias musculares e inoculação de anaeróbios no tecido desvascularizado.\nCONDUTA OBRIGATÓRIA: Exploração cirúrgica sob anestesia, drenagem de hematomas, debridamento de todo o tecido desvitalizado, lavagem sob pressão com solução salina estéril em abundância e obliteração de espaços mortos (com drenos de Penrose se necessário).',
  },
]
