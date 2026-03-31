import { QuizCase } from '../types';

export const quizCases: QuizCase[] = [
  {
    id: 'case_1',
    title: 'Vômitos Incessantes',
    scenario: 'Cão, Boxer, 4 anos. Histórico de vômitos profusos contínuos há 3 dias. Animal prostrado e severamente desidratado (turgor alterado, olhos fundos). Exame ultrassonográfico revela corpo estranho gástrico obstrutivo.\n\nGasometria Venosa:\npH: 7.55\npCO2: 48 mmHg\nHCO3: 38 mEq/L\nCl: 85 mEq/L\nNa: 142 mEq/L\nK: 2.8 mEq/L',
    data: { pH: 7.55, pCO2: 48, HCO3: 38, Cl: 85, Na: 142, K: 2.8, sampleType: 'venous', species: 'canine' },
    questions: [
      {
        id: 'q1',
        text: 'Qual é o distúrbio ácido-base primário deste paciente?',
        options: ['Acidose Metabólica', 'Alcalose Metabólica', 'Acidose Respiratória', 'Alcalose Respiratória'],
        correctAnswerIndex: 1,
        explanation: 'O pH está alto (7.55), indicando alcalemia. O bicarbonato (HCO3) está alto (38), o que explica a alcalemia perfeitamente. Trata-se de uma alcalose metabólica clássica por perda de HCl gástrico.'
      },
      {
        id: 'q2',
        text: 'Como interpretar o pCO2 de 48 mmHg neste caso?',
        options: ['Indica uma acidose respiratória primária concomitante.', 'É uma resposta fisiológica compensatória esperada para deter a alcalemia.', 'É um erro de leitura da máquina.', 'A hipoventilação é devido à dor abdominal severa apenas.'],
        correctAnswerIndex: 1,
        explanation: 'O corpo está retendo CO2 (hipoventilando levemente) com PCO2 subindo para tentar "acidificar" o sangue e se opor à monstruosa alcalose metabólica. Esta é a compensação respiratória típica.'
      },
      {
        id: 'q3',
        text: 'Este quadro é conhecido como?',
        options: ['Alcalose metabólica hiperclorêmica', 'Acidose Láctica', 'Alcalose metabólica hipoclorêmica e hipocalêmica', 'Acidose de Anion Gap Alto'],
        correctAnswerIndex: 2,
        explanation: 'A perda de suco gástrico arrasta Ácido Clorídrico (H+ e Cl-), levando a hipocloremia severa (Cl = 85). A hipovolemia ativa a aldosterona, que retém Na e excreta K+, gerando a hipocalemia agressiva.'
      },
      {
        id: 'q4',
        text: 'Qual o fluido de eleição para reverter este quadro agudamente antes da cirurgia?',
        options: ['Ringer Lactato', 'NaCl 0.9% associado a Cloreto de Potássio (KCl)', 'Plasmalyte 148', 'Glicofisiológico'],
        correctAnswerIndex: 1,
        explanation: 'O NaCl 0.9% é o "soro acidificante" ideal aqui. Ele fornece generosas quantias de Sódio e CLORETO (154 mEq/L), exatamente o que o paciente precisa para corrigir a hipocloremia que mantêm os rins doentes retendo HCO3. A reposição de K+ deve ser agressiva e contínua.'
      }
    ]
  },
  {
    id: 'case_2',
    title: 'Parvovirose Desidratada',
    scenario: 'Cão, Pitbull, 3 meses. 4 dias de diarreia sanguinolenta (Diarreia grave perde bicarbonato). Desidratação 10%. Mucosas pálidas e pulso fraco.\n\nGasometria Venosa:\npH: 7.22\npCO2: 30 mmHg\nHCO3: 12 mEq/L\nCl: 121 mEq/L\nNa: 140 mEq/L\nK: 3.5 mEq/L\nLactato: 4.5 mmol/L',
    data: { pH: 7.22, pCO2: 30, HCO3: 12, Cl: 121, Na: 140, K: 3.5, lactate: 4.5, sampleType: 'venous', species: 'canine' },
    questions: [
      {
        id: 'q1',
        text: 'Qual é a leitura do quadro primário?',
        options: ['Alcalose metabólica', 'Acidose Mista', 'Acidose Metabólica Severa', 'Acidose Respiratória Descompensada'],
        correctAnswerIndex: 2,
        explanation: 'pH baixíssimo (7.22) = Acidemia profunda. HCO3 muito baixo (12) apontando para o problema como uma severa Acidose Metabólica primária.'
      },
      {
        id: 'q2',
        text: 'Há compensação respiratória e porque ocorreu a queda do pCO2?',
        options: ['Sim, a queda do pCO2 (30) reflete hiperventilação compensatória em resposta ao pH baixo do sangue periférico sensoriado pelo centro respiratório.', 'Não, o animal tem patologia pulmonar.', 'PCO2 em 30 é normal para cães de pequeno porte.', 'PCO2 não interfere na homeostase de filhotes.'],
        correctAnswerIndex: 0,
        explanation: 'Perfeito. Para cada queda de 1 mEq no HCO3, a PCO2 deveria cair aproximadamente 0.7 mmHg. A hiperventilação compensatória (respiração de Kussmaul sutil) atirou o CO2 de 40 para 30.'
      },
      {
        id: 'q3',
        text: 'As origens da Acidose neste paciente englobam mecanismos mistos? Se sim calcule o tipo.',
        options: ['É apenas acidose hiperclorêmica pura (diarreia).', 'É apenas acidose lática de Anion Gap Elevado (choque).', 'Há um componente misto! Ele perdeu bases pelas fezes (Cl está alto = 121, hipercloremia) MAS também formou novo ácido orgânico com lactato alto (4.5) pelo choque.', 'Esse padrão chama-se acidose paradoxal.'],
        correctAnswerIndex: 2,
        explanation: 'Exatamente. Esse paciente vomita (alcalose hipocloremica sutil) e defeca sangue (perda rica de HCO3 -> acidose hiperclorêmica do Cl 121). Mas ele também está hipotenso e chocando com lactato alto (acidose lática = aumento gap).'
      }
    ]
  },
  {
    id: 'case_3',
    title: 'Gato Urêmico Obstruído (DTUIF)',
    scenario: 'Gato, Pelo Curto, 6 anos. Obstrução uretral há cerca de 36 horas. Letárgico extremo, bradicardia acentuada (FC 100). Bexiga túrgida gigantesca à palpação abdominal firme.\n\nGasometria Venosa:\npH: 7.15\npCO2: 31 mmHg\nHCO3: 10 mEq/L\nCl: 112 mEq/L\nNa: 146 mEq/L\nK: 9.2 mEq/L\nCa++ (iCa): 0.95 mmol/L',
    data: { pH: 7.15, pCO2: 31, HCO3: 10, Cl: 112, Na: 146, K: 9.2, iCa: 0.95, sampleType: 'venous', species: 'feline' },
    questions: [
      {
        id: 'q1',
        text: 'Qual o achado mais fatalmente iminente dessa gasometria para ser tratado no próximo 1 minuto?',
        options: ['A acidose metabólica grave (pH 7.15), devendo fazer bicarbonato bólus rápido.', 'A hipocalcemia (iCa 0.95), devendo administrar cálcio para aliviar fraturas musculares.', 'A hipercalemia monstruosa (K 9.2) que causará fibrilação ou parada em sístole/assistolia associada à bradicardia perigosa.', 'O sódio borderline alto (146).'],
        correctAnswerIndex: 2,
        explanation: 'O K em 9.2 com letargia e bradicardia no gato aponta hipercalemia tóxica agressiva por ausência de excreção renal obstrutiva. O miocárdio está em risco enorme e iminente de colapso.'
      },
      {
        id: 'q2',
        text: 'Como a acidemia severa ajuda a perpetuar e piorar a leitura do Potássio?',
        options: ['O ácido do sangue queima potássio circulante por dissociação osmótica.', 'O pH ácido inibe a eliminação fecal de K.', 'No sangue muito ácido, para tentar subir o pH, as células corporais captam H+ circulante e devolvem K+ celular para fora (shift transcelular), elevando ainda mais o K livre.', 'Acidose não afeta níveis séricos de K.'],
        correctAnswerIndex: 2,
        explanation: 'Perfeito. Todo animal com acidose severa terá K sérico alto por "shift" celular para fora. Isso é fisiologia clássica. Quando aliviamos a acidose as células retomam seu K+ e o valor no visor cai.'
      },
      {
        id: 'q3',
        text: 'No que consiste o manejo medicamentoso heroico AGUDO deste paciente cardiotóxico além da desobstrução (que exige sedação arriscada nessa condição)?',
        options: ['Gluconato de Cálcio 10% IV LENTO protetor cardíaco + Insulina/Glicose para shiftar K+ + Bicarbonato com grande parcimônia se tudo o mais falhar para alcalinizar.', 'Dar Kcl IV e corrigir o Cloro na bomba de cálcio e administrar Lactulona profilática oral.', 'Não usar cálcio antes de desobstruir para não gerar calcificação das vias aéreas intra-renais.', 'Fluidoterapia subcutânea com Ringer.'],
        correctAnswerIndex: 0,
        explanation: 'O Gluconato de cálcio eleva a voltagem limiar do miocárdio, comprando de 15 a 30 minutos vitais de proteção sem abaixar o K sérico. A terapia Insulina Regular/Glicose IV ativa a bomba Na/K/ATPase que literalmente chuta o K desolá fora de volta para dentro das células, o tirando do perigo vascular.'
      }
    ]
  },
  {
    id: 'case_4',
    title: 'Gato Diabético Ofegante (DKA Clássica)',
    scenario: 'Gata, 12 anos. Não castrada. PU/PD massiva, perda de peso crônica, hoje apática e decúbito lateral. Hino-ofegância (panting). Hálito de acetona marcante.\n\nGasometria Venosa:\npH: 7.08\nPCO2: 24 mmHg\nHCO3: 7 mEq/L\nCl: 105 mEq/L\nNa: 135 mEq/L\nK: 2.8 mEq/L\nGlicose: 560 mg/dL',
    data: { pH: 7.08, pCO2: 24, HCO3: 7, Cl: 105, Na: 135, K: 2.8, glucose: 560, sampleType: 'venous', species: 'feline' },
    questions: [
      {
        id: 'q1',
        text: 'Qual distúrbio impera nesta gasometria?',
        options: ['Acidose Respiratória Crônica', 'Acidose Metabólica Fulminante', 'Alcalose Respiratória por ofegância', 'Misto de compensações normais'],
        correctAnswerIndex: 1,
        explanation: 'Acidemia tremenda (pH 7.08) amarrada à depressão cataclísmica de HCO3 (7 mEq/L). Acidose metabólica gravíssima gerada por consumo intenso dos tampões pelos cetoácidos não mensurados (Acido beta-hidroxibutírico e ácido acetoacético).'
      },
      {
        id: 'q2',
        text: 'O que você achou do sódio em 135? O gato parece hiponatrêmico real ou tem pegadinha?',
        options: ['Hiponatremia franca, precisa repor NaCl a 3%.', 'É um sódio falsamente reduzido pela elevação tremenda de lipídeos plasmáticos (pseudo-hiponatremia).', 'É sódio falsamente baixado pela força osmótica da glicose que atrai água celular intracelular e dilui o Na (hiponatremia dilucional do diabetes).', 'Sódio totalmente irrelevante agora.'],
        correctAnswerIndex: 2,
        explanation: 'Isso é crucial. Quando a glicose vai a níveis brutais (560), o sangue se torna xarope denso osmótico e chupa água da célula diluindo o espaço vascular. O Sódio de 135 "diluído" ali é falso. A cada 100 de glicose acima de 100, devemos somar 1.6 de sódio ao cálculo. O Na real corrigido é em torno de 142.'
      },
      {
        id: 'q3',
        text: 'Atenção. Você vai colocar Insulina regular IV lenta para derrubar a glicose, e hidratar massivamente com Ringer. Como o Potássio (K = 2.8 agora) vai reagir à sua atitude num cenário assim?',
        options: ['O K permanecerá instável em 2.8 por dias independentemente da insulina.', 'Vai elevar-se massivamente ao limite (8.0) por conta do retorno da função renal.', 'O K despencará ao abismo (1.0 ou menos), gerando paralisia e parada fatal respiratória nas próximas horas se não suplementado.', 'As células mortas devolverão K à circulação mantendo-o ótimo.'],
        correctAnswerIndex: 2,
        explanation: 'A insulina arrasta o K para DENTRO da célula agressivamente, junto com a glicose. Resolver um pH de 7.08 com soro dilucional também cessa o shift transcelular, sugando de volta com fúria. E o gato já partiu de 2.8. O potássio sumirá. Nunca inicie Insulina em gato DKA com K baixo antes de encher o soro de cloreto de potássio na reposição principal de horas.'
      }
    ]
  },
  {
    id: 'case_5',
    title: 'A "Ofegante Falsa" na Sedação',
    scenario: 'Cão geriátrico sedado para RX espinhal com metadona alta dose + dexmedetomidina de gatinho. Animal roncando profundo na mesa, peito move muito mal (bradypneic) e FR é de 4/min com volume corrente raso. Gengiva discretamente cianótica (Amostra Arterial solicitada p/ conferir ventilação primária).\n\nGasometria Arterial:\npH: 7.21\npCO2: 65 mmHg\npO2: 60 mmHg (Ar ambiente)\nHCO3: 25 mEq/L',
    data: { pH: 7.21, pCO2: 65, pO2: 60, HCO3: 25, sampleType: 'arterial', species: 'canine' },
    questions: [
      {
        id: 'q1',
        text: 'Determine o distúrbio ácido-base reinante.',
        options: ['Acidose Láctica Severa Metabólica.', 'Acidose Respiratória Aguda Descompensada.', 'Hipoxemia pura sem consequências de pH.', 'Alcalose de resgate.'],
        correctAnswerIndex: 1,
        explanation: 'Observe a hipercapnia retentora (CO2 estourando em 65 mmHg). Como a FR é de 4, ele parou de exalar o gás carbônico dos tecidos (H2CO3 de acúmulo). O sangue acidifica rápido. O HCO3 em 25 mEq/L não variou da norma ainda, confirmando a agudicidade que o rim não teve tempo de compensar (dia 1).'
      },
      {
        id: 'q2',
        text: 'A hipoxemia deste cão (pO2 de 60 mmHg no ar ambiente 21%) tem qual mecanismo gerador principal visível neste momento?',
        options: ['Tromboembolismo alveolar severo.', 'Edema de pulmão cardiogênico da dexmedetomidina fulminante.', 'A simples Hipoventilação alveolar. O ar não entra, logo não leva O2 novo nem tira CO2.', 'Anestésicos colabam maciçamente as moléculas de H2O pulmonar.'],
        correctAnswerIndex: 2,
        explanation: 'O PO2 despencou para 60 essencialmente porque pCO2 explodiu para 65 ocupando espaço e por falta de renovação gasosa. A Equação dos Gases Alveolares prova isso perfeitamente: Quando o PCO2 bate 65 em hipoventilacao de ar ambiente, por matemática básica do ar alveolar, o PaO2 sobra caindo para menos de 65 inevitavelmente.'
      },
      {
        id: 'q3',
        text: 'Se ofertarmos O2 a 100% de Fluxo livre para ele (mascára), o animal resolverá os dois componentes alterados de imediato e estará a salvo?',
        options: ['Sim, a anestesia vai dissipar e a oxigenoterapia quebra o pH ruim imediatamente.', 'Não. O O2 a 100% resolve espetacularmente a hipoxemia (PO2 vai bater 300+ de face), MAS o problema é ventilatório! O CO2 continuará aprisionado piorando seu nível mental e seu pH continuará péssimo a ponto fatal.', 'Parcialmente sim, se der soro. O O2 resolverá o CO2 instantaneamente se for na máscara certa.', 'O oxigênio puro piorará o CO2.'],
        correctAnswerIndex: 1,
        explanation: 'Regra de ouro Intensiva: O2 não resolve ventilação e CO2! O2 só recheia as hemácias passando por quem não foi obstruído. O que limpa o CO2 e levanta o pH é MEXER O PEITO. O cão precisa ser intubado e ventilado mecânica/manualmente com urgência (ou reverter anestesia com atipamezole/naloxona urgente).'
      }
    ]
  },
  {
    id: 'case_6',
    title: 'Edema Pulmonar Fulminante (ICC)',
    scenario: 'Cão Chihuahua de 11 anos, tosse cardíaca com grave sopro holosistólico, em franca angústia respiratória (Taquipneia a 80 irpm) batendo boca atrás de oxigênio com líquido espumoso tingido de sangue pela narina. Ficado em box de O2 a 40% (FiO2 0.40).\n\nGasometria Arterial colhida no susto:\npH: 7.47\npCO2: 25 mmHg\npO2: 52 mmHg (na câmara a 40% FiO2!)\nHCO3: 18 mEq/L',
    data: { pH: 7.47, pCO2: 25, pO2: 52, HCO3: 18, fio2: 0.40, sampleType: 'arterial', species: 'canine' },
    questions: [
      {
        id: 'q1',
        text: 'Avalie primeiro a oxigenação pO2 de 52 mmHg com atenção extrema ao FiO2. É preocupante?',
        options: ['Tranquilo, um P/F ratio disso seria bom.', 'Isso é uma falha catastrófica de trocas casuais pulmonares. A FiO2 a 40% deveria empurrar uma pO2 de quase 200 mmHg no vaso saudável. Obter meros 52 de pO2 atesta shunt massivo pelo alvéolo cheio de edema d´água maciça.', 'Simples de resolver com apenas lasix VO.' , 'Padrão basal em chihuahua.'],
        correctAnswerIndex: 1,
        explanation: 'Um PaO2 de 52 já é uma baita hipoxemia e é hipóxia tissular pura no limite do cianótico (SatO2 <85% nesta pO2). Ao amarrar isso a quem TÁ INSPIRANDO 40% de poço fechado? Estupidez total de falência - P/F (52/0.4) = 130! SDRA severa, no caso do cardiogênico, inundação de afogamento pulmonar.'
      },
      {
        id: 'q2',
        text: 'Se o paciente não consegue trocar O2 porque o pulmão está úmido com água pura nos sacos alveolares, como explicar o CO2 super BAIXO (25 mmHg)? Ele não deveria estar falhando de trocar os O2 e o CO2 juntos?!',
        options: ['A máquina lê o CO2 errado quando a glicose tá baixa.', 'A amostra não é arterial verdadeira.', 'O CO2 difunde cerca de 20 VEZES MAIS RÁPIDO através do líquido do edema que o O2 pesado. O esforço gigantesco da FR de 80 mpm expele todo CO2 da área salva, lavando o gás e gerando alcalose.', 'A insuficiência cardíaca atua no ducto de troca.'],
        correctAnswerIndex: 2,
        explanation: 'Fisiopatologia de livro: Hipoxemia gera forte esforço e resposta bulbar compensatória. O afogado se debate, a respiração explode, a área de troca "sã" limpa muito CO2 solúvel porque é mega rápido no líquido do edema, MAS o O2 travado empírico bate contra a "lagoa" pesada do alvéolo cheio e recua.'
      },
      {
        id: 'q3',
        text: 'Qual o diagnóstico Ácido Base puro?',
        options: ['Alcalose respiratória primária (pCO2 25 -> pH 7.47) pela hiperventilação de angústia respiratória da hipoxemia.', 'Acidose da insuficiência orgânica e falência reno-pulmonar.', 'Razoável compensação mista da sedação contínua.', 'Acidose láctica pura.'],
        correctAnswerIndex: 0,
        explanation: 'O pH em 7.47 e pCO2 afogada revelam: ele ventila demais lavando o pCO2 tentando desesperadamente captar um O2 que não cruza a barreira. HCO3 já está caindo de leve (18) iniciando minúscula compensação renal de excreção bases ao urinar no estresse (Levarah dias pra curar se ficar assim).'
      }
    ]
  },
  {
    id: 'case_7',
    title: 'A "Ofegância Canina Inocente" e o Susto de pO2',
    scenario: 'Você coleta uma VENOSA FEMORAL errando a veia de um Pastor Alemão jovem (1 ano) recitando choro de medo no RX após entorse da pata. \n\nGasometria (sangue venoso safeno): \npH: 7.50\npCO2: 26 mmHg\npO2: 60 mmHg\nHCO3: 20 mEq/L\nSatO2%: 88%',
    data: { pH: 7.50, pCO2: 26, pO2: 60, HCO3: 20, sampleType: 'venous', species: 'canine' },
    questions: [
      {
        id: 'q1',
        text: 'Sua estagiária olha para esse pO2 de 60 e chora acreditando numa falência pulmonar fatal e Sat O2 de 88%. Como você a ensina agora com o sangue que tem na mão?',
        options: ['Ela está certa! Ele precisa de tubo!', 'Esse sangue foi coletado ERRADO e não quer dizer nada sobre a patologia e pulmão. Sangue Venoso reflete que a O2 de 40 a 50 na Vênula após os tecidos gastarem ele do outro lado capilar é NORMAL! Assim como a saturação 70-80% do retorno.', 'Ela deve ignorar, cães suportam baixas pO2 bem com pulso lento.', 'Não há resposta lógica pra isso.'],
        correctAnswerIndex: 1,
        explanation: 'Fisiologia 101. A veia leva de volta um sangue sugado. A pO2 arterial saudável é 90 a 100. A célula morde e puxa, o sangue segue pra veia no platô baixo devolvendo míseros 40 a 50 mmHg de força e 75% restou do baú (SO2Venosa). Então ver 60 PO2 na veia não sinaliza desastre - talvez só medo! Diga isso firme!'
      },
      {
        id: 'q2',
        text: 'E a Alcalemia Forte (7.50 com pCO2 26), é assustadora? Requer medicação Base em emergência?',
        options: ['Sim, Alcalemia severa requer cloreto de amônio urgente.', 'Não. O Pastor de 1 ano está apenas fazendo de conta. Estresse pontual no chorinho com FR alta e hiperventilação limpa o CO2 lavando a base rapidamente in-loco (na sala). Deixe ele calmar que isso normalize o pH e as trocas minadas pelo estresse.', 'Apenas usar O2 por sonda nasal cura.', 'Só uma cirurgia gástrica com exploração.'],
        correctAnswerIndex: 1,
        explanation: 'É o clássico da prancheta do estresse no PA. Cuidado com terapias estúpidas num pH 7.5 de perro que não está internado por vômito nem sofrendo de úlcera com fezes pretas. Esse sangue foi corrompido puramente pela fúria aguda do exame.'
      }
    ]
  },
  {
    id: 'case_8',
    title: 'A Síndrome do Triplo Disastre',
    scenario: 'Paciente politraumatizado chocado e atropelado na chuva faz pouca horas e agora trazido vomitando sangue prostrado, oligúrico anêmico.\nGasometria Arterial: \npH: 7.42 \npCO2: 15 mmHg \nHCO3: 9 mEq/L \nLactato: 8.5 \nCl: 110',
    data: { pH: 7.42, pCO2: 15, HCO3: 9, lactate: 8.5, Cl: 110, sampleType: 'arterial', species: 'canine' },
    questions: [
      {
        id: 'q1',
        text: 'Analise e escolha a pérola ensinamento sobre um monstro como esse "Triplo Disastre" com um aparente e falso pH em 7.42!',
        options: ['Não dá para resolver a matemática aqui na fase aguda das coisas.', 'Temos um lactato maciço que sugere acidose. O HCO3 em 9 diz existir acidose pura esmagadora. Se o pCO2 caiu brutalmente ao fundo a ponto de superar em velocidade o equilíbrio e "lavar" até empatar no 7.4? Não o pCO2 caiu além do Winters. Ele é misto grave disfarçado de equilibrado orgânico pelo cérebro do animal chocado que despirocou hiperventilando pelo trauma cefalo além das vias metabólicas falhas simultâneas!', 'A resposta à medicação foi completa antes da coleta e por isso ele está em 7.42 e curado do susto com lactato não interpretável.', 'O pH comanda absoluto, a máquina esta desregulada.'],
        correctAnswerIndex: 1,
        explanation: 'Esta pérola intensiva rara ensina uma arte negra gasométrica. Se pH está NORMAL, MAS seu pCO2 sumiu abaixo das placas e seu HCO3 foi comido vivo até abaixo de 12 e LACTATO explode no Teto? Você tem DOIS DISTÚRBIOS MATORES empurrando com tamanha força desproporcional - uma gigantesca Alcalose e uma Maciça Acidose, guerreando num choque frontal mascarado, com mortalidade > 95%. Responda rápido, ventile as áreas se o lactato se fixar na causa raiz!'
      }
    ]
  }
];
// Add remaining 10 cases here
