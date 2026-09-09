import type { Disease } from '../../types'
import {
  CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_FULL,
  CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_VISUAL,
  CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_FULL,
  CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_VISUAL,
} from '../pathophysiologyCystitis'
import {
  PIELONEFRITE_PATHOPHYSIOLOGY_FULL,
  PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL,
} from '../pathophysiologyPielonefrite'

export const urinarioDiseases: Disease[] = [
  {
    name: 'Bacteriúria Subclínica',
    pathogens:
      'Isolamento de bactérias em urocultura (geralmente Escherichia coli, Proteus mirabilis, Klebsiella pneumoniae, Enterococcus faecalis, Staphylococcus pseudintermedius) em paciente SEM NENHUM sinal clínico de afecção do trato urinário inferior (sem estrangúria, sem disúria, sem polaquiúria e sem hematúria macroscópica).',
    firstLine: {
      title: 'Conduta Primária em População Geral: NÃO TRATAR',
      presentation:
        'A presença de bactérias na urina sem sintomas clínicos é colonização bacteriana benéfica e NÃO UMA INFECÇÃO ATIVA.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'CONDUTA PADRÃO OURO: **NÃO TRATAR COM ANTIMICROBIANOS**. Estudos científicos consolidados comprovaram que o tratamento com antibióticos NÃO previne episódios sintomáticos futuros, seleciona cepas bacterianas resistentes e elimina bactérias comensais vesicais de baixa virulência que competem com patógenos virulentos.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'As 4 Exceções Clínicas Obrigatórias de Tratamento',
      presentation:
        'Indicação de tratamento estritamente restrita a 4 cenários com alto risco de dano parenquimatoso ou descompensação sistêmica grave.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'EXCEÇÕES FORMAIS DE TRATAMENTO: 1) Cães diabéticos com urocultura positiva (risco de pielonefrite subclínica e cetoacidose descompensada); 2) Presença de urólitos por estruvita ou bactérias produtoras de urease (Proteus, Staphylococcus, Klebsiella); 3) Pacientes com Doença Renal Crônica (DRC) e perda súbita inexplicada de função renal; 4) Pacientes sob quimioterapia ou imunossupressão grave profunda. Nesses casos, prescrever Amoxicilina ou Trimetoprim-Sulfa por 3 a 5 dias.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Alternativa oral com alta concentração urinária para as exceções clínicas citadas.',
            },
          ],
        },
      ],
    },
    duration:
      'População geral: ZERO dias. Nas 4 exceções clínicas obrigatórias: 3 a 5 dias.',
    notes:
      'STEWARDSHIP ANTIMICROBIANO: A urocultura não deve ser realizada rotineiramente como exame de "check-up" ou rastreio em animais sem sintomas urinários. Se uma urocultura positiva for descoberta acidentalmente em animal assintomático, RESISTA ao impulso de prescrever antibióticos, exceto se o paciente se enquadrar em uma das 4 exceções listadas.',
  },
  {
    name: 'Cistite Esporádica (ITU Não Complicada)',
    pathogens:
      'Escherichia coli uropatogênica (UPEC) (> 75-80% dos casos), Staphylococcus pseudintermedius, Proteus mirabilis, Klebsiella pneumoniae, Streptococcus spp.',
    pathophysiologyFull: CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: CYSTITIS_SPORADIC_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha de escolha (Cursos Ultracurtos de 3 a 5 dias)',
      presentation:
        'Monoterapia oral de primeira escolha combinada obrigatoriamente a analgesia com anti-inflamatório nas primeiras 48 a 72 horas.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Primeira escolha de eleição mundial (ISCAID): atinge altíssima concentração ativa na urina (frequentemente > 100x a concentração sérica), sendo bactericida contra a maioria das cepas de E. coli e Gram-positivos urinários.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Opção de primeira linha de amplo espectro com excelente eliminação urinária ativa e custo acessível.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (após resultado de cultura ou falha inicial)',
      presentation:
        'Reservar para casos em que o antibiograma demonstrar resistência às opções de primeira linha.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Espectro ampliado para bactérias produtoras de beta-lactamases quando demonstrado em antibiograma.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'Cefalosporina de 1ª geração com excelente tolerância e eliminação renal.',
            },
          ],
        },
      ],
    },
    duration:
      '**3 A 5 DIAS** (Cursos curtos de 3 a 5 dias curam com a mesma eficácia de cursos antigos de 10 a 14 dias, gerando menos efeitos colaterais e prevenindo resistência). Melhora clínica visível em 48 horas.',
    notes:
      'REGRAS DE OURO DA ITU ESPORÁDICA:\n1. NÃO REALIZAR urocultura de controle de cura após o término do tratamento se os sinais clínicos desaparecerem completamente.\n2. ANALGESIA: O desconforto vesical é imediato; prescrever anti-inflamatório não esteroidal (AINE como Meloxicam ou Firocoxib) por 3 dias para alívio rápido da dor e disúria.\n3. GATOS JOVENS: Em gatos com menos de 10 anos de idade apresentando disúria e hematúria, mais de 95% dos casos são causados por Cistite Idiopática Felina (FIC) — uma doença neuroendócrina estéril associada ao estresse — e NÃO POR INFECÇÃO BACTERIANA. NUNCA prescrever antibióticos em gatos jovens com problemas urinários sem urocultura prévia positiva por cistocentese!',
  },
  {
    name: 'Cistite Recorrente',
    pathogens:
      'Bactérias persistentes de episódios anteriores (foco protegido, biofilme) ou novas infecções ascendentes por Escherichia coli, Enterococcus faecalis, Klebsiella pneumoniae, Proteus spp. e Pseudomonas aeruginosa.',
    pathophysiologyFull: CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: CYSTITIS_RECURRENT_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: 'Terapia Guiada Exclusivamente por Urocultura',
      presentation:
        'DEFINIÇÃO: 3 ou mais episódios em 12 meses, ou 2 ou mais episódios em 6 meses. O tratamento empírico repetido às cegas é estritamente contraindicado.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'UROCULTURA OBRIGATÓRIA antes de qualquer novo ciclo. Se o paciente estiver muito desconfortável, iniciar empiricamente com Amoxicilina ou Sulfa-TMP e AJUSTAR assim que o resultado do antibiograma estiver disponível.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Alternativa empírica inicial aguardando antibiograma.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Opções Guiadas por Antibiograma e Tratamento de Persistência',
      presentation:
        'Fármacos de segunda linha ou nitrofurano direcionados pelo antibiograma do paciente.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Indicado se o isolamento comprovar produção de betalactamases.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Apenas se indicado no laudo laboratorial frente a Gram-negativos com resistência a beta-lactâmicos.',
            },
            {
              name: 'Nitrofurantoína',
              rationale:
                'Excelente opção para cistite baixa causada por bactérias multirresistentes (ESBL, Enterococcus). CONTRAINDICADA em pielonefrite.',
            },
          ],
        },
      ],
    },
    duration:
      'Reinfecção (cura prévia com nova bactéria): 3 a 5 dias. Persistência bacteriana / recaída do mesmo germe: 7 a 14 dias com investigação simultânea da causa anatômica ou sistêmica.',
    notes:
      'INVESTIGAÇÃO DA CAUSA SUBJACENTE (Obrigatória!):\nCistite recorrente é quase sempre consequência de uma alteração anatômica ou imunológica subjacente. É imperativo investigar: 1) Conformação vulvar (vulva infantil, recessa ou encapuzada que predispõe a dermatite e ITU ascendente); 2) Urólitos vesicais ou renais por ultrassom/radiografia; 3) Divertículo de úraco ou pólipos vesicais; 4) Doenças endócrinas (Hiperadrenocorticismo, Diabetes Mellitus); 5) Doença prostática crônica em machos intactos.',
  },
  {
    name: 'Infecções Urinárias Associadas a Urolitíases',
    pathogens:
      'Bactérias produtoras de urease que alcalinizam a urina promovendo precipitação de estruvita (fosfato de magnésio e amônio): Staphylococcus pseudintermedius, Proteus mirabilis, Klebsiella pneumoniae, Pseudomonas aeruginosa, Serratia spp.',
    firstLine: {
      title: '1ª linha durante dissolução médica ou pré/pós-cirúrgica',
      presentation:
        'O antimicrobiano deve ser administrado conjuntamente ao protocolo de dissolução dietética de estruvita ou na remoção cirúrgica por cistotomia.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Fármaco de escolha primária por sua alta concentração urinária contínua e eficácia contra estafilococos e proteus.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Alternativa de escolha se houver suspeita de produção de beta-lactamases.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (guiada por cultura do cálculo ou urina)',
      presentation:
        'Amostragem e cultura da parede da bexiga e do núcleo do urólito durante a cirurgia.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Opção de espectro ampliado com boa penetração vesical.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'Alternativa oral com perfil seguro em animais com sobrecarga metabólica.',
            },
          ],
        },
      ],
    },
    duration:
      'Dissolucão dietética de estruvita: MANTER DURANTE TODO O PERÍODO DE DISSOLUÇÃO e por mais 7 dias após o desaparecimento radiográfico completo dos cálculos. Pós-cistotomia cirúrgica: 5 a 7 dias pós-operatórios.',
    notes:
      'MECANISMO FISIOPATOLÓGICO: A enzima urease sintetizada por Staphylococcus e Proteus cliva a ureia em duas moléculas de amônia, elevando o pH urinário para valores > 7,5-8,0 e precipitando cristais de estruvita. A bactéria fica abrigada no interior do próprio cálculo mineralizado, onde os antibióticos NÃO conseguem penetrar. A CURA DEFINITIVA É IMPOSSÍVEL sem a dissolução dietética total ou extração cirúrgica dos urólitos.',
  },
  {
    name: 'Infecções no Trato Urinário Superior / Pielonefrite',
    pathogens:
      'Escherichia coli uropatogênica (UPEC) portadora de fímbrias P e adesinas de ascensão tubular, Klebsiella pneumoniae, Proteus mirabilis, Enterobacter spp., Pseudomonas aeruginosa, Enterococcus faecalis.',
    pathophysiologyFull: PIELONEFRITE_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: PIELONEFRITE_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha de escolha (Fluoroquinolonas de penetração renal)',
      presentation:
        'A pielonefrite é uma infecção parenquimatosa renal bacteriana aguda e requer fármacos lipofílicos com alta penetração no córtex e na medula renal.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Enrofloxacina',
              rationale:
                'Primeira escolha recomendada por consensos internacionais (ISCAID): alta penetração tecidual na medula e na pelve renal inflamada, com rápida ação bactericida contra enterobactérias coliformes.',
            },
            {
              name: 'Marbofloxacina',
              rationale:
                'Fluoroquinolona de excelente tolerabilidade e distribuição renal.',
            },
            {
              name: 'Pradofloxacina',
              rationale:
                'Opção de escolha em felinos (maior margem de segurança sem risco de degeneração retiniana em gatos nas doses preconizadas).',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Alternativa oral lipofílica eficaz com boa concentração no parênquima renal quando há contraindicação ao uso de quinolonas.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Pielonefrite com Sepse / Paciente Instável em UTI)',
      presentation:
        'Terapia parenteral combinada em pacientes hipotensos, com dor lombar severa, vômitos e injúria renal aguda (IRA).',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ceftriaxona (IV)',
              rationale:
                'Cefalosporina de 3ª geração parenteral bactericida potente para sepse urológica.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Opção oral/parenteral de segunda linha se houver sensibilidade documentada em urocultura.',
            },
          ],
        },
      ],
    },
    duration:
      '**10 A 14 DIAS** (Diretrizes modernas ISCAID reduziram o tempo de tratamento de antigas 4-6 semanas para 10 a 14 dias quando há rápida resposta clínica favorável e recuperação funcional).',
    notes:
      'EMERGÊNCIA MÉDICA NEFROLÓGICA:\n1. DIAGNÓSTICO: Dor à palpação renal lombar, febre, leucocitose, dilatação da pelve renal ao ultrassom abdominal (> 2-3 mm) e piora súbita da creatinina/ureia.\n2. UROCULTURA: Coleta de urina por cistocentese é OBRIGATÓRIA antes de iniciar a primeira dose.\n3. CONTROLE DE CURA: É OBRIGATÓRIO repetir a urocultura 7 a 14 dias APÓS O TÉRMINO do tratamento para comprovar a erradicação bacteriana definitiva.',
  },
  {
    name: 'Cistite Nosocomial (Infecção Hospitalar) e Cateter Urinário',
    pathogens:
      'Bactérias hospitalares oportunistas multirresistentes formadoras de biofilme nos cateteres de Foley: Pseudomonas aeruginosa, Klebsiella pneumoniae (ESBL/KPC), Enterococcus faecium, Enterobacter cloacae, Acinetobacter baumannii, Staphylococcus aureus (MRSA).',
    firstLine: {
      title: 'Prevenção e Manejo do Cateter Urinário de Demora',
      presentation:
        'A profilaxia antimicrobiana para sondagem uretral de demora é formalmente contraindicada.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'PROFILAXIA EM CATETER URINÁRIO: **NÃO USAR ANTIMICROBIANOS**. O uso profilático durante a sondagem de demora NÃO previne colonização e apenas substitui bactérias sensíveis por bactérias hospitalares pan-resistentes. Se o paciente desenvolver febre, dor vesical ou sinais de sepse associados à sonda: coletar urocultura da via coletora estéril e iniciar como ITU esporádica até o antibiograma.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Terapia Guiada pelo Antibiograma Hospitalar',
      presentation:
        'Utilizar antimicrobianos direcionados estritamente pelo antibiograma após remoção ou substituição imediata da sonda urinária.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Nitrofurantoína',
              rationale:
                'Excelente opção para infecções vesicais baixas por cepas ESBL e Enterococcus multirresistente (ATENÇÃO: não utilizar em pielonefrite pois não atinge níveis terapêuticos no parênquima renal).',
            },
            {
              name: 'Amicacina (parenteral)',
              rationale:
                'Aminoglicosídeo de reserva para enterobactérias hospitalares sensíveis (monitorar creatinina e densidade urinária diariamente).',
            },
            {
              name: 'Piperacilina + Tazobactam (IV)',
              rationale:
                'Opção intravenosa para infecções nosocomiais complicadas com risco sistêmico.',
            },
          ],
        },
      ],
    },
    duration:
      '3 a 5 dias após a remoção da sonda urinária de demora.',
    notes:
      'MEDIDAS DE CONTROLE DE INFECÇÃO HOSPITALAR (CCIH):\n1. Manter SEMPRE o sistema de drenagem urinária FECHADO e gravitacional (a bolsa deve permanecer sempre em plano inferior à bexiga do animal para evitar refluxo).\n2. NUNCA desconectar o circuito para lavagens vesicais de rotina.\n3. REMOVER A SONDA o mais precocemente possível (cada dia adicional de cateterismo eleva o risco de bacteriúria em 10 a 20%).\n4. Jamais trocar a sonda apenas porque a urina está turva ou com odor fétido sem sinais clínicos de infecção sistêmica.',
  },
]
