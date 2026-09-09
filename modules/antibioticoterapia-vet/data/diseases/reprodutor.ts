import type { Disease } from '../../types'
import { PIOMETRA_PATHOPHYSIOLOGY_VISUAL } from '../pathophysiologyPiometra'
import { PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN } from '../pathophysiologySources'

const PIOMETRA_PATHOPHYSIOLOGY = `
## Definição, epidemiologia e complexo CEH–piometra

A **piometra** é uma infecção uterina potencialmente fatal que resulta do acúmulo de exsudato purulento na cavidade uterina sob estímulo de progesterona endógena (fase lútea/diestro) ou progestágenos exógenos, acometendo fêmeas intactas de meia-idade a idosas. Na fisiopatologia descreve-se o **complexo Hiperplasia Endometrial Cística (HEC) - Piometra**: a progesterona induz hipertrofia e dilatação cística das glândulas endometriais com aumento de muco e estase, facilitando a colonização bacteriana ascendente da microbiota comensal vaginal e perineal durante o estro.

## Mecanismos sistêmicos: endotoxemia, sepse e hemostasia

O patógeno predominante é a **Escherichia coli** (> 70-80% dos casos), frequentemente uropatogênica e expressando fatores de virulência como adesinas e lipopolissacarídeo (LPS). A absorção transmural de endotoxinas da parede uterina distendida leva a uma resposta inflamatória sistêmica (SIRS) exuberante, com liberação massiva de TNF-α, IL-1 e IL-6, ativação endotelial, vasoplegia, choque distributivo e risco de coagulação intravascular disseminada (CIVD). A lesão de glomerulonefrite mediada por imunocomplexos e hipoperfusão sistêmica induz insuficiência renal aguda ou piora da doença renal crônica.

## Apresentação clínica: aberta vs. fechada

- **Cérvix Aberta**: Corrimento vaginal fétido, mucopurulento ou sanguinolento. Os sinais sistêmicos podem ser inicialmente brandos devido à drenagem contínua.
- **Cérvix Fechada**: Sem drenagem vaginal visível. O útero distende-se rapidamente, elevando a pressão intraluminal com risco iminente de necrose miometrial, ruptura uterina e peritonite séptica aguda. Pacientes frequentemente chegam toxêmicas, hipotensas e desidratadas.

## Diagnóstico e conduta

O exame ultrassonográfico abdominal confirma cornos uterinos globulares distendidos por conteúdo anecogênico a heterogêneo espesso. O tratamento de eleição, padrão ouro e curativo é a **Ovariohisterectomia (OHE)** de emergência após prévia estabilização hemodinâmica com fluidoterapia venosa e antibioticoterapia bactericida parenteral. A terapia médica conservadora tem indicação extremamente restrita e jamais deve ser tentada em fêmeas com cérvix fechada ou choque.

${PATHOPHYSIOLOGY_LITERATURE_NOTE_MARKDOWN}
`.trim()

export const reprodutorDiseases: Disease[] = [
  {
    name: 'Piometra',
    pathogens:
      'Flora bacteriana ascendente; predomínio marcante de **Escherichia coli** (>70-80% dos isolados); outros bacilos Gram-negativos (Klebsiella, Proteus), Streptococcus spp., Staphylococcus spp. e bactérias anaeróbias estritas.',
    pathophysiologyFull: PIOMETRA_PATHOPHYSIOLOGY,
    pathophysiologyVisual: PIOMETRA_PATHOPHYSIOLOGY_VISUAL,
    firstLine: {
      title: '1ª linha de tratamento perioperatório',
      presentation:
        '**Opções excludentes** de monoterapia perioperatória bactericida parenteral ou oral (escolher uma única opção conforme a estabilidade hemodinâmica e acesso venoso). A OHE é o tratamento definitivo e não deve ser adiada desnecessariamente.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Beta-lactâmico parenteral bactericida para estabilização hemodinâmica pré e perioperatória. Alta segurança sistêmica em fêmeas toxêmicas e com sobrecarga hepatorrenal inicial.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Excelente distribuição tecidual no trato reprodutor e concentração lútea. Opção oral indicada quando o animal tolera via oral e não há azotemia grave prévia.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (quadros graves / choque endotóxico / sepse)',
      presentation:
        'Indicado em fêmeas com sepse grave, choque endotóxico, hipotensão, suspeita de peritonite por microperfuração ou falha aos esquemas de primeira linha.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Amplo espectro bactericida com cobertura reforçada para Gram-positivos e bacilos Gram-negativos produtores de beta-lactamases e anaeróbios.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Fluoroquinolona potente com alta atividade contra enterobactérias coliformes. Usar via IV/SC durante a estabilização; atentar para toxicidade retiniana em gatos (máx. 5 mg/kg/dia) e hidratação rigorosa.',
            },
          ],
        },
      ],
    },
    duration:
      '5 a 6 dias pós-operatórios em cadelas e gatas submetidas à OHE completa. Na terapia médica conservadora (exclusiva para fêmeas jovens de alto valor zootécnico com cérvix aberta e clinicamente estáveis): manter até a remissão ultrassonográfica completa (10 a 14 dias) associada a Aglepristone e PGF2α.',
    notes:
      'QUANDO USAR: OHE imediata é a conduta primária curativa. O antimicrobiano é terapia de suporte perioperatória adjuvante.\nQUANDO NÃO USAR TERAPIA MÉDICA: CONTRAINDICADA em piometra com cérvix fechada, cadelas deprimidas, instáveis, com peritonite ou com cistos ovarianos/tumores. A terapia médica com Aglepristone (10 mg/kg SC nos dias 1, 2 e 7) + PGF2α traz alto risco de ruptura uterina em cérvix fechada e recidiva em até 70% dos cios seguintes.',
  },
  {
    name: 'Vaginite Infantil e em Adultas',
    pathogens:
      'Microbiota vaginal indígena e comensal perineal: Streptococcus spp., Staphylococcus pseudintermedius, Escherichia coli e Mycoplasma spp.',
    firstLine: {
      title: 'Conduta Primária / Manejo Tópico',
      presentation:
        'Distinção mandatória entre filhotes pré-púberes e fêmeas adultas. Na vaginite juvenil o uso de antibióticos sistêmicos é estritamente contraindicado.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'Vaginite Juvenil (pré-púbere): NÃO ADMINISTRAR ANTIBIÓTICO SISTÊMICO. Trata-se de condição autolimitante na imensa maioria das cadelas, curando espontaneamente no primeiro estro. Realizar apenas higienização da comissura vulvar com solução antisséptica de clorexidina 0,1% a 0,2% ou lenços umedecidos sem álcool.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Vaginite em Fêmeas Adultas com Infecção Secundária',
      presentation:
        'Indicação restrita: fêmeas adultas com corrimento abundante, desconforto, polaquiúria e após investigação diagnóstica de causas subjacentes (estenose vestíbulo-vaginal, corpo estranho, incontinência urinária, cistocefalovaginite).',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Terapia sistêmica empírica inicial se houver desconforto clínico e inflamação importante, devendo ser confirmada por citologia vaginal profunda e urocultura.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Alternativa oral com boa difusão no trato genital inferior e atividade contra enterobactérias e estreptococos.',
            },
          ],
        },
      ],
    },
    duration:
      'Vaginite infantil: ZERO dias de antibiótico (apenas higiene tópica até a resolução espontânea no primeiro cio). Vaginite em adultas com infecção comprovada: 7 a 14 dias.',
    notes:
      'STEWARDSHIP / USO RACIONAL: Antibióticos orais ou injetáveis em cadelas com vaginite infantil são ineficazes, eliminam a flora protetora e selecionam cepas multirresistentes. A cultura vulvar superficial é inútil pois sempre isola flora comensal. Em adultas refratárias pós-castração, investigar estenose vaginal ou vaginite atrófica (responsiva a estriol tópico).',
  },
  {
    name: 'Metrite Aguda Puerperal',
    pathogens:
      'Escherichia coli, Streptococcus canis, Staphylococcus spp., Proteus spp., anaeróbios estritos (Bacteroides, Clostridium) secundários a retenção de placenta, fetos macerados ou parto distócico.',
    firstLine: {
      title: '1ª linha (quadro estável / ambulatorial)',
      presentation:
        'Monoterapia oral ou parenteral com aminopenicilina potencializada ou sulfonamida com boa excreção uterina.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Primeira escolha em fêmeas estáveis no pós-parto imediato. Espectro excelente para enterobactérias e flora mista puerperal, com baixa passagem em concentrações tóxicas para o leite materno.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Opção oral de ampla penetração uterina em fêmeas sem hipovolemia ou desidratação.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (sepse puerperal / fêmea toxêmica)',
      presentation:
        'Terapia intravenosa imediata com associação bactericida de 4 quadrantes para prevenir choque séptico e falência orgânica.',
      regimes: [
        {
          mode: 'combinacao_simultanea',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base parenteral para Gram-positivos e anaeróbios da cavidade uterina inflamada.',
            },
            {
              name: 'Enrofloxacina',
              rationale:
                'Cobertura vigorosa para bacilos Gram-negativos coliformes endotóxicos. ATENÇÃO: separar imediatamente os neonatos para amamentação artificial.',
            },
          ],
        },
      ],
    },
    duration:
      '5 a 7 dias em casos puerperais leves a moderados; até 14 dias se houver necrose tecidual ou febre persistente.',
    notes:
      'CONDUTA CLÍNICA OBRIGATÓRIA: Emergência pós-parto. Realizar ultrassonografia abdominal para investigar retenção de conceptos ou restos placentários. Evacuação uterina médica com Ocitocina (0,5 a 2 UI/fêmea SC nas primeiras 24-48h pós-parto) ou Dinoprost/PGF2α em doses baixas fracionadas. Desmame artificial imediato dos filhotes se a mãe estiver toxêmica ou em uso de fluoroquinolonas/sulfas.',
  },
  {
    name: 'Endometrite',
    pathogens:
      'Escherichia coli, Streptococcus spp., Staphylococcus spp., Klebsiella pneumoniae, Pseudomonas aeruginosa e anaeróbios.',
    firstLine: {
      title: '1ª linha empírica',
      presentation:
        'Terapia oral com espectro direcionado para patógenos endometriais mais frequentes.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Cobre adequadamente coliformes e bactérias produtoras de betalactamases na mucosa uterina.',
            },
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Excelente biodisponibilidade no endométrio e no muco genital.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (casos refratários ou guiados por cultura)',
      presentation:
        'Reservar para insucesso de primeira linha ou isolamento microbiológico de Gram-negativo resistente.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Enrofloxacina',
              rationale:
                'Apenas com comprovação de sensibilidade no antibiograma em fêmeas reprodutoras adultas.',
            },
          ],
        },
      ],
    },
    duration:
      'Aguda pós-cobertura/parto: 5 a 7 dias. Crônica ou subclínica (causa de infertilidade / falha de concepção): 14 dias guiada por biópsia e cultura endometrial.',
    notes:
      'DIAGNÓSTICO: Coleta de swab transcervical estéril com espéculo ou lavado uterino para citologia e cultura. Evitar ciclos repetidos empíricos sem diagnóstico definitivo em fêmeas com falhas reprodutivas.',
  },
  {
    name: 'Prostatite Aguda e Crônica',
    pathogens:
      'Flora coliforme e comensal uretral ascendente: Escherichia coli (>70%), Proteus mirabilis, Klebsiella pneumoniae, Pseudomonas aeruginosa, Staphylococcus spp., Streptococcus spp. e Brucella canis.',
    firstLine: {
      title: '1ª linha (alta penetração tecidual lipofílica)',
      presentation:
        'A barreira hemato-prostática impede a passagem da maioria dos antibióticos polares. Exige moléculas lipofílicas com pKa básico que se ionizam e se concentram no fluido prostático.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Fármaco de escolha primária. Apresenta alta lipossolubilidade e difusão no parênquima prostático inflamado e crônico.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Fluoroquinolonas de penetração tecidual)',
      presentation:
        'Fluoroquinolonas veterinárias de alta eficácia bactericida e concentração prostática superior às concentrações séricas.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Enrofloxacina',
              rationale:
                'Excelente difusão em abscessos e tecido prostático crônico. NÃO utilizar ciprofloxacina oral humana em cães devido à absorção errática e baixa biodisponibilidade (< 30-40%).',
            },
            {
              name: 'Marbofloxacina',
              rationale:
                'Alternativa com farmacocinética favorável e menor risco de toxicidade celular.',
            },
          ],
        },
      ],
    },
    duration:
      'Prostatite Aguda: 4 semanas (28 dias). Prostatite Crônica: 4 a 6 semanas (28 a 42 dias). Interrupções precoces resultam invariavelmente em recidiva infecciosa e formação de microabscessos.',
    notes:
      'CONDUTA INTEGRADA: Aminopenicilinas, cefalosporinas e aminoglicosídeos NÃO penetram adequadamente na próstata crônica ou não-inflamada e NÃO devem ser prescritos para prostatite. A orquiectomia (castração) é intervenção complementar indispensável para induzir a involução do tecido glandular prostático e acelerar a cura. Realizar ultrassonografia para descartar abscesso prostático volumoso (que requer drenagem guiada ou cirúrgica). Solicitar sorologia para Brucella canis.',
  },
  {
    name: 'Mastite',
    pathogens:
      'Escherichia coli, Staphylococcus pseudintermedius, Staphylococcus aureus, Streptococcus canis.',
    firstLine: {
      title: '1ª linha (mastite catarral / supurativa aguda)',
      presentation:
        'Terapia oral com antibióticos de baixo risco para a prole e boa difusão no parênquima mamário inflamado.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Primeira linha segura. Boa passagem tecidual e cobertura bactericida completa para estreptococos, estafilococos e coliformes.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'Cefalosporina oral de 1ª geração com excelente eficácia contra Staphylococcus e Streptococcus na glândula mamária.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (mastite séptica / gangrenosa / mãe prostrada)',
      presentation:
        'Terapia parenteral de emergência em cadelas e gatas toxêmicas, com glândulas arroxeadas, necróticas ou frias.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Base bactericida parenteral em fêmeas internadas com hipoperfusão ou vômitos associados.',
            },
            {
              name: 'Clindamicina',
              rationale:
                'Opção indicada em infecções profundas com suspeita de anaeróbios e bactérias formadoras de toxinas tissulares.',
            },
          ],
        },
      ],
    },
    duration:
      '5 a 7 dias em mastites agudas sem necrose; até 14 dias em mastites supurativas crônicas ou com desbridamento.',
    notes:
      'MANEJO DA LACTAÇÃO: A ordenha manual delicada e a aplicação de compressas mornas a cada 6 horas são fundamentais para aliviar a pressão intraluminal. Se a mãe estiver clinicamente bem e as glândulas afetadas não tiverem leite pútrido/sanguinolento, os filhotes podem mamar nas mamas sadias. Se houver mastite gangrenosa, desidratação materna severa ou uso de fármacos incompatíveis, desmamar imediatamente e realizar nutrição artificial da ninhada.',
  },
  {
    name: 'Cesariana',
    pathogens:
      'Microbiota comensal cutânea (Staphylococcus) e vaginal ascendente (Enterobactérias, Streptococcus).',
    firstLine: {
      title: 'Cesariana Eletiva Limpa',
      presentation:
        'Cirurgia eletiva limpa em cadela hígida não requer antibioticoterapia sistêmica.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cefazolina (IV)',
              rationale:
                'Cesariana Eletiva Limpa: NÃO INDICADO antimicrobiano profilático de rotina. Se houver contaminação acidental ou tempo cirúrgico prolongado (> 90 min): administrar dose única pré-operatória de Cefazolina (30 mg/kg IV) na indução anestésica e descontinuar ao fim da cirurgia.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Cesariana Complicada / Distocia / Feto Macerado / Ruptura Uterina',
      presentation:
        'Tratamento terapêutico pleno quando há quebra infecciosa prévia, manipulação obstétrica vaginal excessiva ou contaminação peritoneal franca.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Fase hospitalar imediata em fêmeas instáveis ou pós-cirurgia de emergência com fetos mortos.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Opção oral pós-estabilização cirúrgica com cobertura segura durante a lactação.',
            },
          ],
        },
      ],
    },
    duration:
      'Eletiva: ZERO a 1 dose pré-incisão. Complicada/Distócica: 5 dias de antimicrobiano.',
    notes:
      'USO RACIONAL: O uso rotineiro de antimicrobianos no pós-operatório de cesarianas limpas eletivas é um erro frequente que desequilibra a colonização do microbioma dos filhotes e da mãe. Reservar tratamento apenas para partos complicados ou distocias com contaminação evidente.',
  },
  {
    name: 'Balanopostite',
    pathogens:
      'Microbiota comensal prepucial: Escherichia coli, Staphylococcus pseudintermedius, Streptococcus canis, Pseudomonas aeruginosa e anaeróbios.',
    firstLine: {
      title: 'Tratamento Exclusivamente Tópico / Antisséptico',
      presentation:
        'A presença de exsudato prepucial mucóide a purulento leve é achado comum e fisiológico em cães machos não castrados.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Clorexidina (Tópico)',
              rationale:
                'NÃO USAR ANTIBIÓTICO SISTÊMICO. Lavagem prepucial tópica com Solução Fisiológica ou Clorexidina aquosa a 0,1% a 0,2% uma a duas vezes ao dia por 5 a 7 dias.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Casos Graves com Celulite Prepucial / Dor Intensa',
      presentation:
        'Indicação restrita: acometimento do tecido peniano profundo, edema severo, dor ou sinais sistêmicos associados.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cefalexina',
              rationale:
                'Antimicrobiano sistêmico oral indicado apenas se houver celulite cutânea do estojo prepucial ou ulceração com linfadenite inguinal.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Alternativa oral bactericida com boa cobertura para Gram-positivos e anaeróbios.',
            },
          ],
        },
      ],
    },
    duration:
      'Higienização tópica por 5 a 7 dias. Antibiótico oral (apenas com celulite): 7 dias.',
    notes:
      'ALERTA CLÍNICO: A antibioticoterapia sistêmica isolada nunca cura a balanopostite comensal e sempre recidiva após a suspensão, gerando apenas seleção de cepas resistentes. A orquiectomia eletiva reduz o estímulo androgênico glandular e diminui expressivamente a secreção prepucial na maioria dos machos.',
  },
  {
    name: 'Orquite e Epididimite',
    pathogens:
      'Escherichia coli, Staphylococcus pseudintermedius, Streptococcus spp., Proteus mirabilis, Mycoplasma canis e Brucella canis.',
    firstLine: {
      title: '1ª linha (difusão nos túbulos seminíferos)',
      presentation:
        'Antibióticos lipofílicos capazes de cruzar a barreira hemato-testicular em inflamações agudas.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Trimetoprim + Sulfa',
              rationale:
                'Primeira escolha oral com excelente concentração nos túbulos seminíferos e epidídimo.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: '2ª linha (Fluoroquinolonas / Suspeita de Brucella)',
      presentation:
        'Fluoroquinolonas ou tetraciclinas de alta penetração em casos de dor testicular severa ou suspeita de brucelose.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Enrofloxacina',
              rationale:
                'Elevada atividade bactericida em coliformes e boa difusão em abscessos epididimários.',
            },
            {
              name: 'Doxiciclina',
              rationale:
                'Indicação de escolha se houver confirmação sorológica ou isolamento de Brucella canis.',
            },
          ],
        },
      ],
    },
    duration:
      'Mínimo de 4 semanas (28 dias). O tratamento encurtado leva à atrofia testicular fibrosa crônica e infecção persistente.',
    notes:
      'CONDUTA CIRÚRGICA E EPIDEMIOLÓGICA: A orquiectomia bilateral é a conduta curativa recomendada na maioria dos casos, especialmente em animais sem valor reprodutivo ou com necrose/abscesso testicular. SEMPRE solicitar sorologia por soroaglutinação rápida para Brucella canis (zoonose com risco de infecção crônica incurável e indicação de eutanásia ou castração compulsória com vigilância sanitária).',
  },
  {
    name: 'Diretrizes para Infecções em Fêmeas Gestantes',
    pathogens:
      'Variados conforme o sítio infeccioso (trato respiratório, urinário, cutâneo ou digestivo).',
    firstLine: {
      title: 'Antimicrobianos Seguros na Gestação (Categoria B)',
      presentation:
        'Fármacos de escolha com amplo histórico de segurança teratogênica em cães e gatos prenhes.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Amoxicilina',
              rationale:
                'Penicilina de segurança fetal comprovada. Primeira escolha para infecções bacterianas suscetíveis em fêmeas gestantes.',
            },
            {
              name: 'Amoxicilina + Clavulanato',
              rationale:
                'Segura durante todos os trimestres gestacionais para infecções por patógenos produtores de beta-lactamases.',
            },
            {
              name: 'Ampicilina (IV)',
              rationale:
                'Opção parenteral bactericida segura para gestantes internadas com sepse ou infecção grave.',
            },
            {
              name: 'Cefalexina',
              rationale:
                'Cefalosporina oral de 1ª geração de alta segurança para infecções cutâneas ou urinárias em gestantes.',
            },
          ],
        },
      ],
    },
    secondLine: {
      title: 'Alternativas Parenterais / Hospitalares Seguras',
      presentation:
        'Cefalosporinas injetáveis ou macrolídeos quando houver indicação hospitalar específica.',
      regimes: [
        {
          mode: 'opcoes_exclusivas',
          drugs: [
            {
              name: 'Cefazolina (IV)',
              rationale:
                'Cefalosporina parenteral de escolha para profilaxia e infecções estafilocócicas em gestantes.',
            },
            {
              name: 'Eritromicina',
              rationale:
                'Macrolídeo com perfil de segurança aceitável na gestação para infecções respiratórias ou entéricas.',
            },
          ],
        },
      ],
    },
    duration:
      'Conforme a afecção de base, utilizando sempre o menor tempo clinicamente eficaz documentado em consenso.',
    notes:
      'FARMACOVIGILÂNCIA NA GESTAÇÃO - CONTRAINDICAÇÕES FORMAIS:\n1. FLUOROQUINOLONAS (Enrofloxacina, Marbofloxacina): induzem erosão da cartilagem articular e artropatias nos fetos em crescimento.\n2. TETRACICLINAS (Doxiciclina): quelam cálcio, causam hipoplasia do esmalte dentário com pigmentação amarelada permanente e inibição do crescimento ósseo fetal.\n3. AMINOGLICOSÍDEOS (Gentamicina, Amicacina): risco documentado de nefrotoxicidade e ototoxicidade irreversível no feto.\n4. METRONIDAZOL: contraindicado no primeiro terço da gestação devido a potencial teratogênico e toxicidade sobre a organogênese embrionária.',
  },
]
