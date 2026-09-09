import type { Disease } from '../../types'
import {
  PNEUMONIA_PATHOPHYSIOLOGY_FULL,
  PNEUMONIA_PATHOPHYSIOLOGY_VISUAL,
} from '../pathophysiologyPneumonia'
import {
  PIOTHORAX_PATHOPHYSIOLOGY_FULL,
  PIOTHORAX_PATHOPHYSIOLOGY_VISUAL,
} from '../pathophysiologyPiothorax'

export const respiratorioDiseases: Disease[] = [
  {
    name: 'Infecção Aguda de Vias Aéreas Superiores / Rinite Aguda (<10 dias)',
    pathogens:
      'Predomínio inicial de etiologia viral: FHV-1 (Herpesvírus Felino), FCV (Calicivírus Felino) em gatos; CPIV (Parainfluenza Canina), CAV-2 (Adenovírus tipo 2) em cães. Colonização secundária por Bordetella bronchiseptica, Mycoplasma spp. e Chlamydia felis.',
    firstLine: {
      title: 'Manejo Inicial de Suporte / Stewardhip Antimicrobiano',
      presentation:
        'A imensa maioria dos quadros agudos (< 10 dias) com espirros e secreção serosa a mucoide é viral e autolimitante. Antimicrobianos sistêmicos de rotina NÃO são indicados.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Doxiciclina',
              rationale:
                'NÃO USAR ANTIMICROBIANOS de rotina nos primeiros 10 dias. Terapia de suporte (inalação com solução fisiológica morna, limpeza e desobstrução nasal, hidratação e estímulo com alimento aquecido altamente palatável). INDICAÇÃO FORMAL DE ANTIBIÓTICO APENAS se secreção mucopurulenta espessa acompanhada de febre persistente (> 39,5 °C), prostração marcante ou anorexia com risco de broncopneumonia: prescrever Doxiciclina como 1ª escolha.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (intolerância gástrica / falha comprovada)',
      presentation:
        'Aminopenicilinas com inibidor de beta-lactamase quando houver intolerância ou contraindicação à doxiciclina.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Opção de espectro direcionado para flora bacteriana secundária em cães ou gatos tolerantes a beta-lactâmicos.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Espectro ampliado para bactérias produtoras de betalactamases secundárias da cavidade nasal.',
            },
          ],
        },
      ],
    },
    duration:
      'Suporte sem antibiótico nos primeiros 10 dias. Se indicado por febre/purulência: 7 a 10 dias (reavaliar precocemente em 48-72h).',
    notes:
      'ALERTA FELINO OBRIGATÓRIO: A administração oral de comprimidos ou cápsulas secas de Doxiciclina em gatos causa retenção esofágica, esofagite erosiva grave e estenose esofágica cicatricial irreversível. SEMPRE administrar suspensão líquida manipulada ou, se comprimido, acompanhar com pelo menos 5 a 6 mL de água via seringa ou misturado em pasta úmida/patê. Fluoroquinolonas NÃO são recomendadas como 1ª escolha em IVAS agudas.',
  },
  {
    name: 'Infecção Crônica de Vias Aéreas Superiores / Rinite Crônica (>10 dias)',
    pathogens:
      'Bordetella bronchiseptica, Mycoplasma cynos / Mycoplasma felis, Pasteurella multocida, Streptococcus spp., Pseudomonas aeruginosa, anaeróbios, ou etiologia fúngica (Aspergillus fumigatus em cães; Cryptococcus neoformans em gatos).',
    firstLine: {
      title: '1ª linha (após investigação diagnóstica de base)',
      presentation:
        'Terapia empírica oral com alta atividade em bactérias atípicas intracelulares e patógenos respiratórios crônicos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Doxiciclina',
              rationale:
                'Fármaco de escolha para rinite crônica bacteriana não-fúngica. Excelente penetração na mucosa nasal e eficácia contra Mycoplasma e Bordetella.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Alternativa de primeira linha com ampla cobertura para bactérias anaeróbias oronasais e produtores de beta-lactamases.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (guiada por cultura e lavado nasal)',
      presentation:
        'Reservar para casos recalcitrantes com identificação laboratorial ou histopatológica.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Azitromicina',
              rationale:
                'Macrolídeo com alta concentração tecidual e acúmulo intracelular em fagócitos da submucosa respiratória.',
            },
            {
              name: 'Pradofloxacina',
              rationale:
                'Fluoroquinolona veterinária de 3ª geração segura em gatos (sem toxicidade retiniana na dose recomendada) e com boa atividade contra anaeróbios.',
            },
          ],
        },
      ],
    },
    duration:
      'Manter por pelo menos 7 dias após a remissão clínica completa dos sinais (habitualmente 14 a 28 dias).',
    notes:
      'CONDUTA INVESTIGATIVA: Rinite crônica (> 10-14 dias) raramente é infecção bacteriana primária. É MANDATÓRIO realizar rinoscopia, tomografia computadorizada de crânio e radiografia dentária para excluir: 1) Corpo estranho intranasal (arestas de grama, fragmentos vegetais); 2) Neoplasias (adenocarcinoma nasal, linfoma); 3) Fístula oronasal e abscessos periapicais de caninos/pré-molares; 4) Aspergilose sinonasal canina; 5) Pólipo nasofaríngeo em felinos jovens. Cefalosporinas de 3ª geração e fluoroquinolonas NÃO demonstraram superioridade sobre a doxiciclina em ensaios clínicos controlados.',
  },
  {
    name: 'Traqueobronquite Infecciosa Canina / Tosse dos Canis',
    pathogens:
      'Bordetella bronchiseptica, Mycoplasma cynos, Vírus da Parainfluenza Canina (CPIV), Adenovírus Canino tipo 2 (CAV-2), Herpesvírus Canino (CHV-1).',
    firstLine: {
      title: 'Manejo Inicial: Quadro Brando vs. Tosse Complicada',
      presentation:
        'Cães alertas, ativos e sem febre não devem receber antimicrobianos sistêmicos.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Doxiciclina',
              rationale:
                'QUADRO BRANDÃO / AUTOLIMITANTE: NÃO USAR ANTIMICROBIANOS. Apenas repouso, substituição de coleira de pescoço por peitoral, nebulização com SF 0,9% e controle ambiental. INDICAÇÃO DE ANTIMICROBIANO: Apenas em casos moderados a graves com febre, secreção purulenta, apatia ou risco iminente de broncopneumonia em filhotes/imunossuprimidos: prescrever Doxiciclina.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (casos moderados refratários / intolerância)',
      presentation:
        'Alternativas com boa difusão brônquica e perfil de espectro respiratório.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Cobertura segura em filhotes jovens com infecção bacteriana secundária em vias aéreas.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Alternativa oral com boa concentração nas secreções brônquicas para Bordetella bronchiseptica.',
            },
          ],
        },
      ],
    },
    duration:
      'Casos leves: ZERO dias. Casos com indicação clínica de antibiótico: 7 a 10 dias.',
    notes:
      'STEWARDSHIP: A tosse seca paroxística aguda com engasgo após passeios ou contato com outros cães costuma ser viral/autolimitante e resolve espontaneamente em 7 a 14 dias sem antibiótico. O uso indiscriminado seleciona cepas de Bordetella multirresistentes. Isolar o paciente de outros cães.',
  },
  {
    name: 'Pneumonia Bacteriana Comunitária',
    pathogens:
      'Bordetella bronchiseptica, Streptococcus zooepidemicus, Pasteurella multocida, Escherichia coli, Klebsiella pneumoniae, Staphylococcus pseudintermedius e Mycoplasma spp.',
    pathophysiologyFull: PNEUMONIA_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: PNEUMONIA_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha (ambulatorial estável vs. internado estável)',
      presentation:
        'Estratificação rigorosa pelo estado hemodinâmico e escore de insuficiência respiratória.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Doxiciclina',
              rationale:
                'Ambulatorial estável (sem hipoxemia, alerta, hidratado): monoterapia oral cobrindo Bordetella, Mycoplasma e patógenos respiratórios comuns.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Ambulatorial estável: alternativa oral de amplo espectro bactericida com excelente tolerabilidade.',
            },
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Internado estável: monoterapia intravenosa inicial segura enquanto se aguarda melhora ou resultado de cultura de lavado.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (grave / sepse pulmonar / hipoxemia severa)',
      presentation:
        'Associação intravenosa combinada de 4 quadrantes para pacientes críticos, taquipneicos, cianóticos ou com choque séptico.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base beta-lactâmica intravenosa para Gram-positivos e anaeróbios orofaríngeos.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona potente com alta penetração no parênquima pulmonar e atividade contra enterobactérias Gram-negativas.',
            },
          ],
        },
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'Alternativa parenteral para Gram-positivos e anaeróbios, com excelente difusão tecidual no pulmão consolidado.',
            },
            {
              name: 'Amicacina (parenteral)',
              rationale:
                'Aminoglicosídeo bactericida de reforço contra Gram-negativos multirresistentes (usar apenas em pacientes hemodinamicamente estáveis e bem hidratados com função renal monitorada).',
            },
          ],
        },
      ],
    },
    duration:
      'Habitualmente 2 a 4 semanas. Reavaliar por radiografias de tórax a cada 10 a 14 dias; manter a antibioticoterapia por pelo menos 1 semana após a resolução clínica E radiográfica completa das consolidações.',
    notes:
      'SUPORTE CRÍTICO OBRIGATÓRIO: Oxigenoterapia umidificada se SpO2 < 94%, fluidoterapia venosa para manter hidratação das secreções brônquicas, nebulização contínua com solução salina a cada 4-6h e tapotagem/fisioterapia respiratória. CONTRAINDICADOS antitussígenos e broncodilatadores sem broncoespasmo confirmado (o reflexo da tosse é o mecanismo protetor primário de clareamento mucociliar). Lavado traqueal ou broncoalveolar é o padrão ouro diagnóstico.',
  },
  {
    name: 'Pneumonia Aspirativa',
    pathogens:
      'Flora polimicrobiana mista: bactérias comensais orofaríngeas (Streptococcus, Pasteurella, Staphylococcus, anaeróbios Peptostreptococcus, Bacteroides, Fusobacterium) associadas a enterobactérias translocadas do conteúdo gástrico aspirado (Escherichia coli, Klebsiella).',
    firstLine: {
      title: '1ª linha (paciente estável hemodinamicamente)',
      presentation:
        'Beta-lactâmico com inibidor de beta-lactamase para cobertura de microbiota orofaríngea mista e anaeróbios.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Paciente estável tolerando medicação oral ou início parenteral; cobre adequadamente anaeróbios orais e Gram-positivos.',
            },
            {
              name: 'Ampicilina + Sulbactam',
              rationale:
                'Opção intravenosa excelente para pacientes internados na fase aguda de aspiração com risco infeccioso.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (quadro grave / sepse / aspiração maciça)',
      presentation:
        'Terapia intravenosa de espectro amplo combinado em 4 quadrantes para pacientes em ventilação assistida ou hipoxemia progressiva.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base bactericida contra cocos Gram-positivos e anaeróbios estritos.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Reforço imediato para enterobactérias coliformes de origem gástrica e flora enteral translocada.',
            },
          ],
        },
      ],
    },
    duration:
      '4 a 6 semanas (controlar por radiografia de tórax e saturação de O2; manter até 7 a 14 dias após a limpeza radiográfica total).',
    notes:
      'DISTINÇÃO CLÍNICA: A fase ultra-aguda (primeiras 24-48h pós-êmese ou megaesôfago) é frequentemente uma PNEUMONITE QUÍMICA inflamatória estéril causada pelo ácido clorídrico gástrico e enzimas pancreáticas. O antibiótico é indicado quando há febre, piora progressiva, consolidação alveolar radiográfica cranioventral ou leucocitose com desvio à esquerda. Manter cabeceira elevada a 30°, procinéticos e antieméticos.',
  },
  {
    name: 'Piotórax / Pleurite Purulenta',
    pathogens:
      'Pasteurella multocida (especialmente em gatos pós-mordeduras e brigas), anaeróbios estritos orais (Bacteroides spp., Fusobacterium spp., Peptostreptococcus spp.), Actinomyces spp., Nocardia spp. e bacilos Gram-negativos entéricos (E. coli, Klebsiella).',
    pathophysiologyFull: PIOTHORAX_PATHOPHYSIOLOGY_FULL,
    pathophysiologyVisual: PIOTHORAX_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha de emergência (combinada com drenagem)',
      presentation:
        'Terapia intravenosa combinada imediata de 4 quadrantes associada obrigatoriamente a dreno torácico.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base bactericida parenteral contra Pasteurella multocida, Streptococcus e flora anaeróbia pleural.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona de penetração rápida no espaço pleural com alta atividade contra coliformes Gram-negativos.',
            },
          ],
        },
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Opção de amplo espectro após estabilização inicial ou durante desospitalização.',
            },
            {
              name: 'Metronidazol',
              rationale:
                'Reforço anaerobicida bactericida potente contra espécies resistentes de Bacteroides e Fusobacterium.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (guiada por cultura ou infecções especiais)',
      presentation:
        'Esquemas modificados conforme identificação microbiológica de Actinomyces, Nocardia ou bactérias nosocomiais multirresistentes.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Clindamicina',
              rationale:
                'Excelente penetração tecidual e pleural, atividade anti-anaeróbia vigorosa e alternativa em alergia a beta-lactâmicos.',
            },
            {
              name: 'Amicacina (parenteral)',
              rationale:
                'Reserva hospitalar para Gram-negativos multirresistentes (monitorar débito urinário e creatinina sérica).',
            },
          ],
        },
      ],
    },
    duration:
      '4 a 6 semanas ininterruptas (em infecções por Actinomyces ou Nocardia, manter o tratamento por pelo menos 12 a 16 semanas).',
    notes:
      'EMERGÊNCIA MÉDICA: Toracocentese de alívio e colocação imediata de DRENO TORÁCICO (frequentemente bilateral) com lavagens pleurais aquecidas periódicas (10 a 20 mL/kg de solução fisiológica a 37 °C) e drenagem sob pressão negativa. O ANTIMICROBIANO ISOLADO SEM DRENAGEM TORÁCICA TEM TAXA DE MORTALIDADE PRÓXIMA DE 100%. Realizar citologia de emergência e cultura aeróbia/anaeróbia do exsudato purulento antes da primeira dose.',
  },
]
