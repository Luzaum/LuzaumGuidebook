import type { ClinicalQuickGuide, ClinicalQuickGuideBlock as Block } from '../../types/clinicalQuickGuide';

// Helper constructors para blocos do guia clínico
const h = (text: string, level: 2 | 3 | 4 = 2): Block => ({ type: 'heading', level, text });
const p = (text: string): Block => ({ type: 'paragraph', text });
const box = (variant: 'info' | 'warning' | 'tip', title: string, text: string): Block => ({ type: 'callout', variant, title, text });
const list = (items: string[], checklist = false): Block => ({ type: 'list', items, checklist });
const steps = (title: string, items: string[]): Block => ({ type: 'steps', title, items });
const table = (caption: string, headers: string[], rows: string[][]): Block => ({ type: 'table', caption, headers, rows });
const fig = (file: string, alt: string, caption: string): Block => ({
  type: 'figure',
  src: `/consulta-vet/clinical-guides/esofagostomia/${file}.svg`,
  alt,
  caption,
  width: 900,
  height: 650,
});
const yt = (videoId: string, title: string, caption?: string): Block => ({
  type: 'youtubeEmbed',
  videoId,
  title,
  caption,
});
const photo = (file: string, alt: string, caption: string, width: number, height: number): Block => ({
  type: 'figure',
  src: `/consulta-vet/clinical-guides/esofagostomia/${file}`,
  alt,
  caption,
  width,
  height,
});

// ============================================================================
// GUIA COMPLETO EM FLUXO VERTICAL ÚNICO (SEM ABAS / SEM DIVISÃO DE PÁGINAS)
// ORDEM DE CONSULTA CLÍNICA: INDICAÇÃO → ANATOMIA → MATERIAIS → TÉCNICA PASSO A PASSO
// → RADIOGRAFIA → FIXAÇÃO → ALIMENTAÇÃO/REALIMENTAÇÃO → ESTOMA/COMPLICAÇÕES → RETIRADA E ALTA
// ============================================================================
const sections: Block[] = [
  // --------------------------------------------------------------------------
  // PARTE 1: FUNDAMENTOS, INDICAÇÕES E CONTRAINDICAÇÕES
  // --------------------------------------------------------------------------
  h('1. O que é uma Sonda de Esofagostomia? (E-tube / O-tube)', 2),
  p(
    'Neste guia, **sonda esofágica** refere-se exclusivamente à **sonda de esofagostomia cervical para nutrição enteral** (conhecida na literatura internacional como *oesophagostomy tube*, *O-tube* ou *E-tube*), e não a sondas nasoesofágicas (NO), nasogástricas (NG) ou oroesofágicas temporárias de descompressão.'
  ),
  p(
    'Trata-se de um tubo biocompatível introduzido através da pele da região cervical média esquerda → atravessa a musculatura e a fáscia cervical → penetra a parede lateral do esôfago → avança pelo lúmen esofágico torácico, com sua extremidade alimentar posicionada estrategicamente no **terço distal do esôfago torácico** (imediatamente cranial ao esfíncter esofágico inferior / cárdia).'
  ),
  box(
    'info',
    'Princípio biomecânico fundamental',
    '**A sonda de esofagostomia contorna a boca e a faringe, mas não contorna o esôfago.**\n' +
      'Isso explica com clareza cristalina quase todas as suas indicações e contraindicações:\n' +
      '• Doença oral ou dor maxilofacial severa? → Ótima opção (desvio completo da cavidade oral);\n' +
      '• Fratura de mandíbula/maxila ou neoplasia oral? → Excelente indicação;\n' +
      '• Gengivoestomatite crônica felina dolorosa? → Excelente indicação;\n' +
      '• Megaesôfago ou dismotilidade esofágica grave? → **Péssima opção / Contraindicado**;\n' +
      '• Estenose ou esofagite erosiva grave? → **Contraindicado** (o tubo agride a mucosa lesada);\n' +
      '• Regurgitação persistente? → Inadequada (alimento permanecerá retido no esôfago).'
  ),
  p(
    'A esofagostomia permite a administração de dietas completas homogeneizadas ou líquidas, água para hidratação e diversos medicamentos. Pode permanecer confortavelmente por **semanas a meses**. O consenso do ISFM 2022 (diretrizes de manejo do gato hospitalizado com inapetência) considera a O-tube extremamente bem tolerada, adequada para internação e manejo domiciliar pelo tutor, podendo ser utilizada imediatamente após a recuperação anestésica assim que a posição for confirmada por radiografia [1–4].'
  ),

  h('2. Quando Indicar: O Limiar do Déficit Calórico', 2),
  p(
    'A decisão de instalar uma sonda nunca deve ser um ato impulsivo de "o animal parou de comer hoje → passa a sonda". Ela deve seguir um raciocínio fisiológico rigoroso baseado na capacidade funcional do trato gastrointestinal (TGI) e na duração da ingestão insuficiente.'
  ),
  p(
    'De acordo com as diretrizes da AAHA 2021 (diretrizes de nutrição e controle de peso), a nutrição enteral assistida por tubo deve ser instituída quando o paciente permanece consumindo **≤ 1/3 do seu RER (Requisito Energético de Repouso) por cerca de 72 horas**, contabilizando obrigatoriamente os dias de hiporexia anteriores à internação hospitalar. **A alimentação oral forçada por seringa não é recomendada**, pois induz forte aversão alimentar aprendida e eleva drasticamente o risco de falsa via e pneumonia por aspiração [5].'
  ),
  p(
    'O comitê de nutrição da WSAVA (diretrizes do Comitê Global de Nutrição) adota critério concordante: em pacientes hospitalizados, com **5 dias de hiporexia/anorexia**, o suporte enteral assistido é obrigatório; entre **3 a 4 dias**, já deve ser fortemente considerado — especialmente se o paciente será anestesiado para outro procedimento (ex.: exames de imagem, debridamento de feridas, odontologia). Pacientes já desnutridos ou caquéticos devem receber intervenção mais precoce, assim que estabilizados hemodinamicamente.'
  ),

  h('3. Candidatos Clássicos e Indicações Frequentes', 2),
  table(
    'Principais indicações clínicas para colocação de E-tube em cães e gatos [1–4]',
    ['Condição Clínica', 'Por que a E-tube é a melhor escolha?', 'Particularidades Clínicas'],
    [
      [
        'Lipidose Hepática Felina',
        'Necessita de suporte enteral hipercalórico prolongado por semanas. Anorexia persistente perpetua o catabolismo periférico e acúmulo de triglicerídeos nos hepatócitos.',
        'Investigar coagulopatia prévia (vitamina K₁) e monitorar eletrólitos pelo altíssimo risco de Síndrome de Realimentação.'
      ],
      [
        'Gengivoestomatite Crônica Felina (GECF)',
        'Bypass total da cavidade oral extremamente inflamada e ulcerada, garantindo aporte calórico e analgésicos sem manipular a boca dolorosa.',
        'Permite recuperação tecidual no pós-operatório de extrações dentárias totais ou subfaringectomia.'
      ],
      [
        'Trauma Maxilofacial e Fraturas de Mandíbula',
        'Mantém a mandíbula imobilizada ou com cerclagens/resina sem necessidade de abertura da boca para alimentar.',
        'Pode ser instalada no mesmo tempo cirúrgico da redução e fixação das fraturas faciais.'
      ],
      [
        'Cirurgias Orais e Neoplasias Orofaringeanas',
        'Evita deiscência de suturas em glossectomias parciais, maxilectomias e mandibulectomias, protegendo feridas orais.',
        'Pode permanecer durante todo o protocolo quimioterápico ou radioterápico.'
      ],
      [
        'Doença Dentária Grave / Abscessos',
        'Ponte nutricional segura durante o período de dor intensa, infecção e recuperação pós-operatória.',
        'Reduz o estresse agudo da alimentação voluntária forçada.'
      ],
      [
        'Politrauma com TGI Funcional',
        'Paciente com esôfago, estômago e intestinos íntegros, porém incapaz de se alimentar espontaneamente devido a fraturas, contusões ou decúbito.',
        'Garante balanço nitrogenado positivo para cicatrização tecidual rápida.'
      ],
      [
        'Pancreatite Aguda com Anorexia Prolongada',
        'A nutrição enteral precoce mantém a barreira mucosa intestinal, previne translocação bacteriana e reduz a morbimortalidade.',
        'Iniciar em pequenos volumes administrados lentamente; suspender temporariamente se houver vômitos incoercíveis ou dor abdominal refratária.'
      ],
      [
        'Doença Renal Crônica (DRC) e Hepatopatias',
        'Permite administração precisa de fluidos orais para controle hídrico, quelantes de fósforo, protetores gástricos e dietas específicas.',
        'Excelente para manutenção a longo prazo em ambiente domiciliar com o tutor treinado.'
      ],
      [
        'Paciente Oncológico com Hiporexia',
        'Previne caquexia tumoral e permite a administração de medicações de suporte sem estresse repetido ao paciente.',
        'Monitorar estoma com cautela redobrada se o paciente fizer uso de imunossupressores ou quimioterápicos.'
      ]
    ]
  ),

  h('4. Comparação Entre as Vias de Suporte Enteral', 2),
  table(
    'Comparação das vias de suporte enteral em pequenos animais [1–3]',
    ['Via de Acesso', 'Tamanho Usual', 'Vantagens', 'Limitações Principais'],
    [
      [
        'Nasoesofágica / Nasogástrica (NO/NG)',
        '3,5 a 8 Fr',
        'Não requer anestesia geral (apenas anestésico tópico local); rápida instalação para suporte emergencial curto.',
        'Apenas dietas líquidas industriais ultra-filtradas; desconforto nasal (colar elizabetano obrigatório); duração curta (máx 5–7 dias).'
      ],
      [
        'Esofagostomia Cervical (E-tube)',
        '12 a 20 Fr',
        'Excelente tolerância; permite dietas úmidas comerciais batidas e liquidificadas; dura semanas a meses; tutor administra em casa.',
        'Requer anestesia geral curta e intubação traqueal; contraindicada se houver doença esofágica primária.'
      ],
      [
        'Gastrostomia Percutânea (PEG / Cirúrgica)',
        '16 a 24 Fr',
        'Contorna completamente boca, faringe e esôfago; excelente para estenoses esofágicas e megaesôfago.',
        'Requer endoscopia ou laparotomia; exige obrigatoriamente 10–14 dias para maturação da aderência gástrica antes da retirada (risco de peritonite).'
      ],
      [
        'Jejunostomia (J-tube)',
        '5 a 8 Fr',
        'Contorna esôfago, estômago, duodeno e pâncreas; ideal para vômitos gástricos incoercíveis e pancreatite necrotizante grave.',
        'Apenas infusão contínua em bomba; dietas líquidas elementares; alto risco de complicações se houver extravasamento peritoneal.'
      ]
    ]
  ),

  h('5. Contraindicações e Quando NÃO Colocar', 2),
  box(
    'warning',
    'Contraindicações Absolutas — Entenda a Lógica Fisiopatológica',
    '**1. Megaesôfago e Dismotilidade Esofágica Severa:** O esôfago perdeu o tônus e a peristalse propulsiva. Ao infundir alimento no esôfago distal, ele não será transportado eficientemente para o estômago; acumular-se-á no lúmen esofágico flácido, causando refluxo, regurgitação maciça e pneumonia aspirativa fulminante.\n' +
      '**2. Esofagite Erosiva Grave e Estenose Esofágica:** O tubo e o alimento permanecem em contato direto com a mucosa friável, provocando dor excruciante, ulceração, necrose de pressão e possível perfuração. Em estenoses, o tubo não consegue transpor a luz luminal.\n' +
      '**3. Vômito ou Regurgitação Persistente Incoercível:** O aumento da pressão intra-abdominal e o refluxo antiperistáltico provocam a retroflexão da sonda, fazendo com que sua ponta seja vomitada para fora da boca ou se dobre sobre si mesma.\n' +
      '**4. Incapacidade de Proteger a Via Aérea:** Coma, disfunção laríngea/faríngea severa ou paralisia que impeça o reflexo de tosse e fechamento glótico aumentam desproporcionalmente o risco de aspiração do refluxo.\n' +
      '**5. Tosse Grave e Pneumonia Ativa Não Controlada:** Citadas expressamente por Hackett & Mazzaferro (2025) e BSAVA (2024) como critérios de adiamento, pois o esforço tussígeno contínuo desloca o tubo e agrava o quadro ventilatório [1, 2].'
  ),
  p(
    '**Contraindicações Relativas / Condições que Exigem Estabilização Prévia:**\n' +
      '• Coagulopatia grave não corrigida (trombocitopenia < 30.000/µL, tempo de protrombina prolongado) — risco de hemorragia cervical incontrolável;\n' +
      '• Instabilidade hemodinâmica, choque hipovolêmico ou séptico;\n' +
      '• Infecção ou celulite extensa na região cervical esquerda (risco de mediastinite por disseminação bacteriana profunda);\n' +
      '• Risco anestésico ASA IV/V descompensado — estabilize primeiramente ou use sonda nasoesofágica temporária até o paciente ganhar condições cirúrgicas.'
  ),

  h('6. Fluxograma de Decisão Clínica', 2),
  p('Ponto de partida: ingestão ≤ 1/3 do RER por mais de 72 horas ou caquexia. Percorra as decisões abaixo na ordem indicada.'),
  table(
    'Escolha da via de suporte nutricional',
    ['Decisão', 'Se sim', 'Se não'],
    [
      ['1. Paciente hemodinamicamente estável?', 'Avançar para a decisão 2.', 'Estabilizar volemia, eletrólitos e choque; reavaliar a decisão 1.'],
      ['2. Trato gastrointestinal funcional?', 'Avançar para a decisão 3.', 'Considerar nutrição parenteral (NPT/NPP).'],
      ['3. Disfunção ou estenose esofágica, ou vômito refratário?', 'Considerar gastrostomia (PEG) ou jejunostomia.', 'Avançar para a decisão 4.'],
      ['4. Suporte previsto por mais de 5–7 dias e anestesia viável?', 'Considerar esofagostomia cervical.', 'Considerar sonda nasoesofágica/nasogástrica temporária.'],
    ]
  ),

  // --------------------------------------------------------------------------
  // PARTE 2: ANATOMIA, SONDAS, CALIBRES E MATERIAIS
  // --------------------------------------------------------------------------
  h('7. Anatomia Cirúrgica Cervical: Relação Estrita com a Jugular 🧠', 2),
  p(
    'A esofagostomia é realizada preferencialmente pelo **lado esquerdo do pescoço**, com o animal posicionado em decúbito lateral direito. No terço cervical médio, o esôfago desvia-se anatomicamente para o lado esquerdo da traqueia, tornando seu acesso cirúrgico direto e seguro através de uma dissecção tecidual mínima.'
  ),
  fig(
    'anatomia',
    'Esquema anatômico do acesso cervical esquerdo mostrando esôfago, traqueia e veia jugular externa.',
    'Relações anatômicas conceituais do pescoço: a Carmalt projeta a parede esofágica lateralmente. A incisão deve ser rigorosamente DORSAL à veia jugular externa para preservar o leito vascular [1–3].'
  ),
  box(
    'warning',
    'A Regra de Ouro Anatômica: Ponta da Pinça DORSAL à Veia Jugular',
    'A veia jugular externa percorre a fáscia superficial ventrolateralmente no sulco jugular. Ao introduzir a pinça Carmalt e deslocar a parede do esôfago contra a pele do pescoço, o cirurgião DEVE palpar e visualizar a jugular e garantir que as pontas da pinça estejam posicionadas **DORSALMENTE À VEIA JUGULAR EXTERNA** antes de qualquer incisão!\n\n' +
      'Estruturas nobres profundas que exigem técnica atraumática e divulsão romba delicada:\n' +
      '• Veia jugular externa e ramos tributários linguofaciais e maxilares;\n' +
      '• Bainha carotídea (artéria carótida comum e veia jugular interna);\n' +
      '• Tronco vagossimpático (risco de neuropraxia causando Síndrome de Horner);\n' +
      '• Nervos laríngeos recorrentes (risco de disfunção laríngea/paralisia de pregas vocais);\n' +
      '• Traqueia (localizada imediatamente medial e ventral ao esôfago cervical).'
  ),
  p(
    'Hackett & Mazzaferro (2025) enfatizam: "Palpe e delimite a veia jugular externa ocluindo-a temporariamente na entrada torácica. Mantenha o dedo indicador sobre a ponta de metal da Carmalt, assegurando que o ponto de punção esteja situado dorsal à jugular. Se você não palpar com extrema nitidez o metal sob a pele, nunca faça a incisão" [2, pp. 159–160].'
  ),

  h('8. Diferenças Entre Cães e Gatos', 2),
  table(
    'Diferenças cirúrgicas e clínicas na colocação de E-tube: cão versus gato [1–4]',
    ['Parâmetro', 'Gato (Felinos)', 'Cão (Caninos)'],
    [
      ['Lado de acesso habitual', 'Esquerdo (decúbito lateral direito)', 'Esquerdo (decúbito lateral direito)'],
      ['Calibre de referência (ISFM / BSAVA)', '12 a 14 Fr (14 Fr é o calibre ouro para o gato adulto)', '14 a 20 Fr (conforme porte corporal)'],
      ['Comprimento típico do tubo', '23 a 38 cm (ou tubo de 45–60 cm ajustado)', '45 a 60 cm (ou mais em raças gigantes)'],
      [
        'Histologia da musculatura esofágica',
        'Terço cranial e médio: músculo estriado. **Terço distal: músculo liso.**',
        'Esôfago predominantemente composto por **músculo estriado** em toda a sua extensão.'
      ],
      [
        'Risco metabólico específico',
        'Altíssimo risco de **Lipidose Hepática** com anorexia e de **Síndrome de Realimentação** fatal.',
        'Metabolismo adaptativo diferente; caquexia crônica também exige cautela.'
      ],
      [
        'Tolerância a curativos',
        'Costuma tolerar muito bem colares de tecido acolchoado ou faixas leves.',
        'Cães ativos e de grande porte exigem colar elizabetano rígido e proteção robusta.'
      ]
    ]
  ),

  h('9. Seleção de Calibres French (Fr)', 2),
  p(
    'A escala French mede o **diâmetro externo** do tubo. A relação matemática é direta:\n' +
      '**Diâmetro externo (mm) = calibre (Fr) ÷ 3.**\n**1 Fr ≈ 0,33 mm.**'
  ),
  table(
    'Conversão da escala French para milímetros e indicação por espécie/porte',
    ['French (Fr)', 'Diâmetro Externo (mm)', 'Indicação Clínica Típica'],
    [
      ['10 Fr', '3,3 mm', 'Gatos filhotes (< 1,5–2 kg) ou cães de porte miniatura diminutos.'],
      ['12 Fr', '4,0 mm', 'Gatos jovens ou adultos pequenos (2 a 3 kg); cães de porte miniatura (ex.: Pinscher, Chihuahua).'],
      ['14 Fr', '4,7 mm', '==Calibre-padrão ouro para o gato adulto comum== (≥ 3–4 kg) e cães pequenos (4 a 8 kg).'],
      ['16 Fr', '5,3 mm', 'Cães de porte pequeno a médio (8 a 15 kg).'],
      ['18 Fr', '6,0 mm', 'Cães de porte médio a grande (15 a 25 kg).'],
      ['20 Fr', '6,7 mm', 'Cães grandes e gigantes (> 25–30 kg).']
    ]
  ),
  box(
    'tip',
    'A Controvérsia dos Calibres em Gatos: Por que 14 Fr é a Escolha Ideal',
    'O consenso do ISFM 2022 e o BSAVA 2024 preconizam calibres de 12 a 14 Fr para gatos adultos. Embora Tolbert et al. (2025) tenham discutido o uso de sondas ≥ 18 Fr em gatos > 2 kg, a vasta experiência clínica veterinária demonstra que tubos de 18 Fr geram estomas cervicais desnecessariamente volumosos, maior reação tecidual e desconforto cervical em gatos, sem ganho clínico que justifique seu uso rotineiro. **A sonda de 14 Fr é o equilíbrio perfeito**: permite a passagem livre de rações úmidas completas batidas com água, sem risco excessivo de obstrução e com trauma cervical mínimo [1, 3, 4].'
  ),

  h('10. Qual Sonda Usar no Brasil? 🇧🇷 (Dispositivos Comerciais)', 2),
  p(
    'A medicina veterinária brasileira evoluiu significativamente. Não há mais qualquer justificativa técnica para improvisar sondas uretrais ou sondas nasogástricas humanas de PVC como primeira escolha para esofagostomias que permanecerão por semanas.'
  ),
  box(
    'info',
    '🥇 Opção Veterinária Dedicada Nacional: Sonda Esofágica em Silicone (Tradevet Biomateriais)',
    'A Tradevet Biomateriais comercializa no Brasil a **Sonda Esofágica em Silicone – Uso Veterinário**, nos calibres **12, 14, 16, 18 e 20 Fr**.\n' +
      '• **Material:** Silicone grau médico 100% biocompatível, ultra-flexível e macio, não endurece com o tempo;\n' +
      '• **Características:** Linha radiopaca integral em toda a extensão para confirmação por raios X; ponta aberta arredondada e atraumática com 2 orifícios laterais alternados; marcações centimétricas nítidas;\n' +
      '• **Conector:** Conexão proximal Luer Lock com tampa vedante, facilitando o acoplamento de seringas sem vazamentos;\n' +
      '• **Dimensões:** Tubo de 12 Fr com 45 cm; 14 a 20 Fr com 60 cm (comprimento ajustável na inserção);\n' +
      '• **Esterilização:** Esterilizada em óxido de etileno (ETO), pronta para uso cirúrgico.'
  ),
  photo(
    'sonda-tradevet.jpg',
    'Fotografia da sonda esofágica de silicone Tradevet, com marcações de comprimento e conector com tampa azul.',
    '**Sonda veterinária de silicone — Tradevet.** Observe as marcações centimétricas no tubo e a conexão proximal com tampa. A graduação ajuda a documentar a profundidade e acompanhar mudanças na marca externa. Foto: Tradevet Biomateriais.',
    1000, 1000
  ),
  box(
    'info',
    '🥈 Padrão Ouro Internacional: Sonda MILA em Poliuretano',
    'Fabricada pela MILA International, representa a referência global de dispositivos dedicados de esofagostomia veterinária:\n' +
      '• Confeccionada em poliuretano termossensível (amolece à temperatura corporal, reduzindo trauma na mucosa esofágica);\n' +
      '• Ponta cônica aberta atraumática com múltiplos orifícios laterais projetados para evitar entupimento;\n' +
      '• Conector em "Y" removível (porta dupla para alimento e lavagem/medicação) e asa de sutura deslizante;\n' +
      '• Disponível nos tamanhos 10 Fr, 14 Fr e 18 Fr, compatível com os tunelizadores/introdutores cirúrgicos ETUN14 e ETUN18.'
  ),
  photo(
    'sonda-mila.jpg',
    'Fotografia da sonda de esofagostomia MILA em poliuretano transparente com conexão proximal em Y.',
    '**Sonda veterinária de poliuretano — MILA.** A fotografia mostra o tubo transparente e o conector em Y, que permite acesso para dieta, medicamentos e lavagem. A foto ilustra o modelo; confirme calibre e comprimento na embalagem. Foto: MILA International.',
    887, 584
  ),
  p(
    '**Alternativas Hospitalares Humanas no Brasil (Uso Sob Cautela):**\n' +
      '• **Sondas Enterais em Poliuretano (ex.: Biobase TPU):** Calibres variáveis conforme o modelo. *Atenção:* foram desenhadas para uso nasoentérico humano e frequentemente vêm com fio-guia metálico interno e peso distal metálico. Se usadas em esofagostomia veterinária, exigem avaliação criteriosa da ponta, nunca deixando pesos soltos no lúmen;\n' +
      '• **Linha Freka (Fresenius Kabi Brasil):** Poliuretano de excelente biocompatibilidade, radiopaca, com conexões ENFit nos calibres CH/Fr 10 a 15.'
  ),
  photo(
    'sonda-biobase.webp',
    'Fotografia da sonda de nutrição enteral Biobase, com conector em Y, fio-guia e peso distal visíveis.',
    '**Sonda enteral humana — Biobase.** Observe o conector em Y, o fio-guia e a ogiva distal. Esse dispositivo é diferente de uma sonda veterinária dedicada de esofagostomia; o peso e o guia exigem avaliação específica. Foto: Biobase.',
    1200, 1200
  ),
  photo(
    'sonda-freka.jpg',
    'Fotografia da sonda enteral transnasal Freka com conexão em Y e guia no interior do tubo.',
    '**Sonda enteral transnasal — Freka.** A fotografia mostra o tubo longo e a conexão proximal em Y. Trata-se de um dispositivo para acesso transnasal humano; não deve ser confundido com uma E-tube veterinária dedicada. Foto: Fresenius Kabi.',
    600, 600
  ),
  box(
    'warning',
    'Dispositivos que DEVEM SER EVITADOS como Primeira Escolha',
    '**1. Sonda Nasogástrica de Levine em PVC:** Embora comum e de baixo custo, o PVC enrijece rapidamente em contato com os sucos gástricos e o calor corporal (geralmente após 7 a 10 dias), tornando-se duro, quebradiço e altamente ulcerogênico para o esôfago. Além disso, possui 125 cm de comprimento, sobrando metros de tubo fora do paciente.\n' +
      '**2. Cateteres Uretrais (Borracha Vermelha / Látex ou PVC):** Desenvolvidos para drenagem vesical. O látex degrada-se rapidamente no trato digestório, apresenta alta citotoxicidade tecidual e pode provocar reações inflamatórias estomacais severas e ruptura do tubo.'
  ),

  h('11. Checklist Completo de Materiais de Bancada', 2),
  steps('Bandeja Cirúrgica de Esofagostomia (Checklist Obrigatório)', [
    '**Sonda e Conexões:** Sonda dedicada de esofagostomia em silicone ou poliuretano (12 ou 14 Fr para gatos; 14 a 20 Fr para cães), conector luer lock / tampa de três vias e marcador permanente para marca externa.',
    '**Instrumental Cirúrgico:** Pinça Rochester-Carmalt curva longa (idealmente ≥ 20 cm para alcançar o esôfago cervical médio com folga); cabo de bisturi nº 3; lâmina de bisturi nº 11 ou nº 15 (permitindo incisão pontual e milimétrica sobre a pinça, sem cortes amplos); pinça anatômica Adson ou dissecção delicada; tesoura Metzenbaum; porta-agulhas Mayo-Hegar; pinças de campo (Backhaus).',
    '**Visualização Oral:** Laringoscópio com lâmina reta (Miller) ou curva (Macintosh) testado com iluminação funcional, gaze estéril longa para tração lingual.',
    '**Antissepsia e Paramentação:** Máquina de tosa com lâmina 40; clorexidina degermante 2% e alcoólica 0,5% para o preparo pré-operatório; campo cirúrgico fenestrado estéril; luvas cirúrgicas estéreis (mínimo de 2 pares por cirurgião para troca pós-manipulação oral).',
    '**Fixação e Sutura:** Fio cirúrgico monofilamentar não absorvível (Nylon ou Polipropileno 2-0 ou 3-0 em gatos/cães pequenos; 2-0 ou 0 em cães grandes). Fita adesiva médica para confecção de asa de fixação ("borboleta") se a sonda não possuir asa pré-fabricada.',
    '**Curativo Protetor:** Compressa de gaze estéril fendida em "Y"; gaze acolchoada ou algodão ortopédico macio; atadura elástica autoaderente (Coban / Vetrap) aplicada sem compressão; colar de tecido acolchoado ou colar elizabetano rígido.',
    '**Segurança e Imagem:** Acesso venoso periférico patente; equipamento de anestesia inalatória com circuito adequado; tubo orotraqueal com balonete testado e íntegro; aspirador cirúrgico de sucção montado; aparelho de radiografia disponível para checagem imediata.'
  ]),

  // --------------------------------------------------------------------------
  // PARTE 3: TÉCNICA CIRÚRGICA DETALHADA PASSO A PASSO E MANOBRA DO FLIP
  // --------------------------------------------------------------------------
  h('12. Técnica Cirúrgica Passo a Passo (Técnica Retrógrada com Carmalt)', 2),
  p(
    'A técnica de acesso cirúrgico por pequena incisão retrógrada com pinça Rochester-Carmalt curva longa é o **padrão ouro de rotina na clínica veterinária**. Ela combina simplicidade instrumental, altíssima previsibilidade e custo acessível, dispensando equipamentos endoscópicos ou tunelizadores caros [1, 2].'
  ),
  fig(
    'sequencia-tecnica',
    'Sequência técnica da colocação com Carmalt em seis etapas ilustradas.',
    'Infográfico passo a passo: introdução oral → projeção lateral dorsal à jugular → mini-incisão sobre o metal → captura da ponta → tração retrógrada → manobra do flip.'
  ),
  steps('Protocolo Operatório Detalhado', [
    '**Passo 0: Estabilização e Verificação Prévia.** Confirmar indicação e estabilidade hemodinâmica. No paciente desidratado ou em jejum prolongado, corrigir déficits hídricos e eletrólitos antes do procedimento. Ter à mão dosagens basais de fósforo, potássio, magnésio, glicemia, ureia, creatinina e hematócrito.',
    '**Passo 1: Estimativa e Marcação do Comprimento da Sonda.** Com o paciente ainda posicionado lateralmente, estenda a sonda ao longo do pescoço e tórax: meça a distância do local pretendido do estoma (terço médio cervical esquerdo) até o **8º espaço intercostal (ISFM) ou 9ª costela (BSAVA)**. Faça uma marca visual no tubo com caneta dermográfica ou marcador cirúrgico. Essa marca representa o limite de inserção para que a ponta termine no terço distal do esôfago torácico, antes da cárdia.',
    '**Passo 2: Anestesia Geral e Intubação Traqueal Rigorosa.** O procedimento deve ser realizado SEMPRE sob anestesia geral e com o paciente intubado com tubo endotraqueal com balonete adequadamente insuflado. Isso impede que secreções orais ou sangue aspirem para a árvore respiratória e protege a via aérea durante a manipulação transoral da pinça e da sonda.',
    '**Passo 3: Posicionamento Cirúrgico.** Posicione o paciente em **decúbito lateral direito**, expondo amplamente o hemitórax e o lado esquerdo do pescoço. Em cães grandes ou de pescoço musculoso, coloque uma toalha enrolada ou coxim macio sob a face ventral do pescoço para elevar e estabilizar o esôfago lateralmente.',
    '**Passo 4: Tricotomia Ampla e Antissepsia.** Tose amplamente desde o ramo horizontal da mandíbula cranialmente até a entrada torácica e escápula caudalmente; e da linha média dorsal do pescoço até a linha média ventral. Realize degermação cirúrgica com clorexidina e posicione os campos cirúrgicos estéreis fenestrados.',
    '**Passo 5: Identificação da Veia Jugular Externa.** Palpe e comprima levemente a base do pescoço na entrada torácica para ingurgitar a veia jugular externa. Localize com exatidão o seu trajeto ventrolateral. Todo o restante do procedimento cirúrgico ocorrerá estritamente DORSAL a este vaso.',
    '**Passo 6: Introdução da Pinça Carmalt.** Com o auxiliar tracionando delicadamente a língua e mantendo a boca aberta com um abridor oral ou compressa de gaze, introduza a pinça Rochester-Carmalt curva longa fechada pela comissura labial esquerda, ultrapasse a orofaringe e adentre o esôfago cervical até atingir o terço médio do pescoço.',
    '**Passo 7: Projeção Lateral do Esôfago.** Gire o cabo da Carmalt de modo que suas pontas curvas apontem lateralmente e ligeiramente dorsais em direção à pele do pescoço. Pressione a ponta da pinça contra a parede esofágica lateral. Você deve palpar e visualizar uma saliência nítida e arredondada do metal sob a pele, garantindo que ela esteja DORSAL à jugular externa. Se não palpar o metal com absoluta certeza, não corte: reposicione a pinça.',
    '**Passo 8: Incisão Cirúrgica Controlada.** Com lâmina nº 11 ou nº 15, faça uma pequena incisão de 5 a 10 mm diretamente sobre a ponta palpável da pinça, cortando apenas pele e tecido subcutâneo. Realize divulsão romba delicada com tesoura ou pinça hemostática até atingir a parede externa do esôfago. Faça uma abertura mínima na muscular esofágica sobre o metal da Carmalt. *Regra crítica:* A lâmina deve tocar metal seguro da pinça, sem efetuar golpes cegos em tecidos profundos.',
    '**Passo 9: Exteriorização das Pontas da Carmalt.** Abra ligeiramente as pontas da pinça e projete-as suavemente através da incisão cirúrgica, exteriorizando-as apenas o suficiente (cerca de 1 a 2 cm) para permitir o pinçamento da sonda. Não alargue o estoma além do calibre do tubo.',
    '**Passo 10: Pinçamento da Extremidade Distal da Sonda.** Abra as mandíbulas da Carmalt exteriorizada e capture com firmeza EXCLUSIVAMENTE a extremidade distal (ponta alimentar) da sonda esofágica. ⚠️ Cuidado absoluto para NÃO prender bordas de pele, fáscia muscular ou a parede do esôfago junto à articulação da pinça.',
    '**Passo 11: Tração Retrógrada Transoral.** Puxe a pinça Carmalt de volta pelo esôfago, trazendo a ponta distal da sonda para dentro do lúmen esofágico, subindo pela faringe e saindo para fora da boca. Ao mesmo tempo, um auxiliar deve segurar firmemente a porção externa da sonda no pescoço para impedir que todo o tubo seja acidentalmente puxado para dentro do animal.',
    '**Passo 12: A Manobra do "FLIP" 🔄 (Redirecionamento Caudal).** A sonda agora forma uma alça contínua: entra pelo estoma cervical, sobe pelo esôfago cranial e sai pela cavidade oral. Solte a ponta da sonda das mandíbulas da pinça. Curve a ponta da sonda para dentro da boca em direção caudal (faringe). Enquanto avança a ponta em direção ao esôfago distal com uma pinça ou com os dedos, tracione suave e simultaneamente a porção externa da sonda no pescoço. Ocorre uma súbita e suave inversão anatômica (o "flip"), desfazendo a alça oral e alinhando todo o tubo retilíneo em direção ao tórax.',
    '**Passo 13: Teste de Deslizamento Livre.** O cirurgião deve ser capaz de movimentar a sonda alguns centímetros para frente e para trás através do estoma com **resistência zero**. Se houver qualquer atrito, resistência ou bloqueio, pare imediatamente! Inspecione a orofaringe com laringoscópio: a sonda pode estar enroscada na epiglote, presa no tubo endotraqueal ou dobrada em "cotovelo" no estoma.',
    '**Passo 14: Avanço até a Marca Pré-Medida.** Avance a sonda suavemente até que a marcação centimétrica feita no Passo 1 atinja a pele do estoma cervical. Nunca force a sonda para alcançar a marca se houver resistência mecânica.',
    '**Passo 15: Inspeção Orofaringeana com Laringoscópio.** Com lâmina de laringoscópio e boa iluminação, examine toda a cavidade oral, palato mole, base da língua e laringe. Certifique-se visualmente de que nenhuma alça da sonda sobrou na boca e de que o tubo endotraqueal e seu cadarço de fixação estão completamente livres.',
    '**Passo 16: Recuperação da Assepsia Cirúrgica.** A sonda percorreu a cavidade oral contaminada. Antes de fixar o tubo ao pescoço, o cirurgião e o assistente DEVEM trocar as luvas cirúrgicas contaminadas por luvas estéreis novas, reaplicar antisséptico na pele cervical e usar instrumental limpo para a sutura.'
  ]),

  h('13. Vídeo Demonstrativo 1: Colocação Cirúrgica no Gato (ISFM)', 3),
  p(
    'Assista abaixo à gravação em vídeo oficial produzida pelo **International Cat Care / ISFM**, demonstrando em detalhes a dissecção cervical, a passagem da pinça Carmalt, a tração retrógrada e a execução da manobra do flip:'
  ),
  yt(
    'MiNvX2pF6to',
    'Vídeo Oficial ISFM: Técnica de Colocação da Sonda de Esofagostomia no Gato',
    'Demonstração passo a passo da técnica cirúrgica retrógrada com Carmalt e realização do flip pelo International Cat Care / ISFM.'
  ),

  h('14. A Manobra do "FLIP" Explicada Geometricamente 🔄', 3),
  fig(
    'flip',
    'Esquema do flip da sonda em três fases: saída pela boca, redirecionamento e trajeto final caudal.',
    'Geometria do flip: da tração cranial à inversão caudal suave. A alça oral deve desfazer-se completamente sem exigir força [1–3].'
  ),
  table(
    'Comportamento das duas pontas da sonda durante as 3 fases do Flip',
    ['Fase Operatória', 'Ponta Distal (Alimentar)', 'Segmento Externo (Cervical)'],
    [
      ['1. Tração Retrógrada', 'É capturada pelo estoma e puxada pela Carmalt até sair pela boca.', 'Permanece do lado de fora do pescoço, controlada manualmente pelo assistente.'],
      ['2. Redirecionamento Oral', 'É desprendida da pinça, curvada na boca e guiada caudalmente na faringe.', 'Recebe tração suave e contínua para engolir a alça cervical.'],
      ['3. Alinhamento Final', 'Desce livremente pelo esôfago torácico em direção à 9ª costela.', 'Alinha-se perpendicularmente ou levemente oblíqua ao pescoço, pronta para fixação.']
    ]
  ),

  // --------------------------------------------------------------------------
  // PARTE 4: CONFIRMAÇÃO RADIOGRÁFICA, TRAJETOS E FIXAÇÃO
  // --------------------------------------------------------------------------
  h('15. Confirmação Radiográfica Obrigatória Antes de Alimentar 🩻', 2),
  p(
    'A confirmação radiográfica imediata da posição da sonda é um **mandato absoluto de segurança do paciente**. Nunca, sob nenhuma circunstância, infunda qualquer líquido, alimento ou medicamento pela sonda antes de inspecionar a imagem radiográfica com a ponta identificada.'
  ),
  box(
    'warning',
    'Por que Lavagens de Água e Ausculta NÃO Comprovam Posicionamento?',
    'A injeção de 5 mL de água ou ar e a ausculta de ruídos borbulhantes no abdome ou a ausência de tosse NÃO confirmam que a sonda está no esôfago distal! Uma sonda inadvertidamente inserida na traqueia de um animal anestesiado ou com reflexos deprimidos pode não provocar tosse imediata; da mesma forma, um tubo alojado em falso trajeto cervical ou retroflexionado na orofaringe pode receber líquidos sem resistência aparente. **Apenas a imagem radiográfica garante a segurança da vida do paciente [1, 2].**'
  ),
  fig(
    'posicao',
    'Esquema comparativo entre posicionamento radiográfico correto e trajetos anormais perigosos.',
    'Comparação visual: correto no terço distal esofágico torácico / alça cranial na boca / via aérea respiratória / penetração transcardial gástrica.'
  ),
  p(
    '**Como Obter a Radiografia Ideal:**\n' +
      '• Projeção radiográfica lateral abrangente que inclua desde a região cervical média/laringe até todo o tórax, cúpula diafragmática e abdome cranial (estômago);\n' +
      '• A linha radiopaca da sonda deve ser acompanhada continuamente ao longo do mediastino dorsal, correndo DORSALMENTE à traqueia e à carina brônquica;\n' +
      '• **Alvo anatômico correto:** A ponta do tubo e todos os seus orifícios laterais devem terminar no **terço distal do esôfago torácico**, no nível do 7º ao 9º espaço intercostal, cranialmente à junção gastroesofágica (cárdia).'
  ),
  box(
    'warning',
    'Por que a Sonda NÃO Deve Ficar Dentro do Estômago?',
    'Ao contrário do que muitos imaginam, a ponta de uma sonda de esofagostomia convencional **NÃO deve ultrapassar o cárdia e entrar no estômago**. A presença do tubo transpondo permanentemente a junção gastroesofágica mantém o esfíncter esofágico inferior incontinente, promovendo refluxo gastroesofágico crônico, esofagite ácida grave, dor retroesternal, erosão mucosa e risco aumentado de estenose cicatricial tardia. O objetivo da E-tube é entregar o bolo alimentar no esôfago distal para que a peristalse residual e o esfíncter funcionem naturalmente [1, 2, 4].'
  ),

  h('16. Radiografias comentadas', 2),
  p(
    'Vila Cabaleiro et al. (2026), em estudo multicêntrico conduzido pelo Royal Veterinary College (RVC) publicado no *Veterinary Radiology & Ultrasound*, validaram critérios radiográficos para distinguir sondas **nasoesofágicas e nasogástricas** corretamente posicionadas de sondas inseridas na traqueia. A acurácia aumentou de 82,1% para 95,8% [6]. O estudo não validou o posicionamento da ponta de sondas de esofagostomia.'
  ),
  p('**Como aplicar a distinção no guia:** nas radiografias de sondas nasais, a laringe e a carina ajudam a diferenciar o trajeto esofágico do respiratório. Na esofagostomia, acompanhe o trajeto desde o estoma cervical e identifique a ponta e os orifícios laterais no esôfago distal, antes da cárdia. Uma imagem de sonda nasogástrica com ponta no estômago não representa o alvo de uma E-tube convencional.'),
  photo(
    'rvc-infografico-radiografico.png',
    'Infográfico original do Royal Veterinary College com radiografias de cães e gatos comparando sondas nasais no esôfago e na traqueia.',
    '**Visão geral — infográfico original do RVC.** Os quadros verdes mostram trajeto esofágico; os vermelhos mostram inserção traqueal. As imagens foram importadas do PDF enviado, com as marcações originais preservadas. Fonte: Royal Veterinary College; Vila Cabaleiro et al., 2026 [6].',
    2400, 1794
  ),
  list([
    '**Ponto 1 — laringe:** em sondas nasais, procure a passagem dorsal à lâmina da cartilagem cricoide, indicada pela seta roxa no infográfico.',
    '**Ponto 2 — traqueia:** acompanhe todo o tubo. No trajeto esofágico, pelo menos parte dele pode ser distinguida do lúmen traqueal; a sobreposição completa favorece inserção respiratória.',
    '**Ponto 3 — carina:** quando a sonda alcança esse nível, observe se passa dorsal à parede dorsal da carina, indicada pela seta branca. Se o tubo termina antes, esse ponto não pode ser avaliado.',
  ]),
  h('Cão: trajeto esofágico', 3),
  photo(
    'rvc-cao-esofago.jpg',
    'Figura 1 do artigo: radiografia lateral de cão com sonda nasoesofágica no esôfago e dois cortes de tomografia da cartilagem cricoide.',
    '**Figura 1 — cão, posicionamento esofágico.** Em A, a sonda nasal está no esôfago. B e C são cortes de tomografia que ilustram a lâmina da cartilagem cricoide. Fonte: Vila Cabaleiro et al., 2026, p. 3 [6].',
    2050, 1157
  ),
  p('**O que observar:** a seta roxa aponta a lâmina da cricoide mineralizada; o tubo passa dorsalmente a ela. No tórax, o tubo não fica inteiramente sobreposto ao lúmen traqueal e passa dorsal à carina, assinalada pela seta branca. Os cortes de tomografia à direita ajudam a reconhecer o marco anatômico; não são exames exigidos para a conferência rotineira.'),
  h('Gato: trajeto esofágico', 3),
  photo(
    'rvc-gato-esofago.png',
    'Figura 2 do artigo: radiografia lateral de gato com sonda nasoesofágica no esôfago e cortes tomográficos da cartilagem cricoide.',
    '**Figura 2 — gato, posicionamento esofágico.** A mostra o trajeto da sonda nasal; B e C apresentam a cricoide em tomografia. Fonte: Vila Cabaleiro et al., 2026, p. 4 [6].',
    2000, 1360
  ),
  p('**O que observar:** neste gato, a cricoide não está mineralizada, mas a seta roxa indica sua posição. O tubo passa dorsal à laringe e pode ser separado do lúmen traqueal ao longo do trajeto. A seta branca identifica a carina, com a sonda dorsal a ela. Esse exemplo confirma o trajeto esofágico de uma sonda nasal; não define a profundidade ideal de uma sonda de esofagostomia.'),
  h('Cão: inserção na traqueia', 3),
  photo(
    'rvc-cao-traqueia.png',
    'Figura 3 do artigo: sonda nasal inserida na traqueia de um cão, atravessando a laringe e seguindo um trajeto brônquico.',
    '**Figura 3 — cão, posicionamento traqueal incorreto.** A sonda percorre a via aérea e segue um trajeto brônquico após alcançar a carina. Fonte: Vila Cabaleiro et al., 2026, p. 5 [6].',
    1500, 1052
  ),
  p('**Por que está incorreto:** a seta roxa mostra a passagem pelo lúmen da laringe, em vez de um trajeto dorsal a ela. A sonda fica sobreposta à traqueia, alcança a carina indicada pela seta branca e continua por um brônquio em direção caudodorsal. Acompanhar somente a ponta pode ocultar esse erro; é necessário seguir o percurso desde o pescoço. **Não administrar dieta, água ou medicamentos por uma sonda posicionada na via aérea.**'),
  h('Gato: ponta antes da carina', 3),
  photo(
    'rvc-gato-traqueia.png',
    'Figura 4 do artigo: sonda nasal na traqueia de um gato, com a ponta terminando antes da carina.',
    '**Figura 4 — gato, posicionamento traqueal com sonda curta.** A ponta não alcança a carina. Fonte: Vila Cabaleiro et al., 2026, p. 6 [6].',
    1500, 1427
  ),
  p('**O que resolve a dúvida:** a seta roxa evidencia a passagem pelo lúmen laríngeo e o restante do tubo se sobrepõe ao lúmen traqueal. A carina está marcada pela seta branca, mas a ponta termina cranialmente a ela; por isso, o terceiro critério não pode ser aplicado. Neste caso, incluir a laringe na radiografia é especialmente útil para identificar a inserção respiratória. Uma ponta curta não torna o posicionamento seguro.'),
  h('Gato: laringe fora do campo', 3),
  photo(
    'rvc-gato-sem-laringe.jpg',
    'Figura 5 do artigo: radiografia de gato sem visualização da laringe, mostrando sonda nasal incorretamente inserida na traqueia.',
    '**Figura 5 — gato, inserção traqueal sem a laringe visível.** A seta branca marca a carina; a ponta ultrapassa discretamente esse nível. Fonte: Vila Cabaleiro et al., 2026, p. 7 [6].',
    1500, 919
  ),
  p('**Armadilha de interpretação:** na entrada do tórax, a sonda pode parecer dorsal, mas permanece sobreposta ao lúmen traqueal. No estudo, esse exemplo gerou avaliações de posição incerta antes da apresentação dos critérios. Não decida pela aparência de um pequeno trecho do tubo: avalie o trajeto completo e os marcos disponíveis. Quando o campo não permite esclarecer a posição, obtenha uma projeção adequada antes de usar a sonda.'),
  box('info', 'Aplicação à esofagostomia', 'As figuras acima são de **sondas nasoesofágicas**, introduzidas pelo nariz. A sonda de esofagostomia entra diretamente pelo estoma cervical e não percorre a região laríngea da mesma forma. Para a E-tube, confirme o trajeto esofágico, a ausência de alças e a ponta com os orifícios no esôfago torácico distal, antes da cárdia, conforme o capítulo de confirmação radiográfica.'),

  h('17. Fixação e curativo cervical', 2),
  p(
    'A estabilização mecânica adequada da sonda no estoma cervical é crucial para evitar tanto o deslocamento precoce (saída acidental) quanto a isquemia tecidual por estrangulamento.'
  ),
  steps('Sequência de Fixação por Ponto Sanduíche / Sutura Entrelaçada', [
    '**Ponto de Ancoragem Cutâneo:** Realize um ponto simples ou bolsa de tabaco frouxa na pele peri-estomal com fio monofilamentar não absorvível 2-0 ou 3-0. *Regra crítica:* O nó cutâneo deve aproximar as bordas cutâneas suavemente contra o tubo, SEM NUNCA apertar excessivamente. Ponto apertado causa isquemia da pele, necrose de pressão e deiscência rápida.',
    '**Confecção da sutura entrelaçada de fixação:** Com as duas pontas longas do fio de sutura que sobram do nó cutâneo, inicie laçadas entrecruzadas ao redor do corpo da sonda. Cruze as pontas por trás do tubo e dê um nó cirúrgico simples na frente; cruze novamente e dê outro nó. Repita por 4 a 6 repetições, criando um trançado com cerca de 1,5 a 2 cm de comprimento ao longo do tubo.',
    '**Nó de Finalização:** Finalize o trançado de fixação com 4 a 5 seminós firmes. Essa estrutura mecânica distribui qualquer tração externa ao longo de todo o segmento da sonda: quanto mais a sonda for tracionada para fora, mais o trançado se aperta uniformemente sem cortar o tubo ou rasgar a pele.',
    '**Fixação com Asa / Borboleta (Opcional):** Em sondas que possuem asa de fixação de silicone (ou com borboleta de esparadrapo impermeável confeccionada na sonda), a asa pode ser suturada à pele com pontos simples separados adicionais para reforço contra rotação.',
    '**Registro da "Marca Zero":** Com caneta permanente indelével, faça um traço nítido na sonda EXATAMENTE na interface com a pele do estoma. Anote no prontuário o número da graduação centimétrica que coincide com a pele (ex.: "E-tube 14 Fr — fixada na marca de 18 cm na pele").',
    '**Aplicação do Curativo e TESTE DOS DOIS DEDOS:** Proteja o estoma com gaze estéril fendida em "Y", acomode o tubo suavemente ao longo do pescoço e envolva com atadura e Coban. Insira confortavelmente dois dedos deitado entre a bandagem e a pele do pescoço. Se entrar apertado, afrouxe imediatamente! Curativos compressivos causam estase venosa jugular e edema de cabeça [3, 4].'
  ]),

  // --------------------------------------------------------------------------
  // PARTE 5: ALIMENTAÇÃO, REALIMENTAÇÃO E MANEJO DE FLUIDOS
  // --------------------------------------------------------------------------
  h('18. Protocolo Alimentar: Quando e Como Iniciar', 2),
  p(
    'Ao contrário das sondas de gastrostomia (que exigem aguardar a formação de aderência peritoneal fibrosa estável), **a sonda de esofagostomia NÃO precisa de maturação tecidual**. Ela pode ser utilizada imediatamente assim que o paciente estiver plenamente desperto e recuperado da anestesia geral, com estabilidade hemodinâmica e posicionamento confirmado radiograficamente [1, 2].'
  ),
  fig(
    'checklist',
    'Fluxograma de segurança antes de cada alimentação pela sonda.',
    'Algoritmo de checagem obrigatório: conforto do paciente → exame do estoma → marca externa inalterada → lavagem suave → infusão em 10–15 min → lavagem final.'
  ),
  steps('Protocolo Operatório Antes de CADA Refeição (9 Passos)', [
    '**1. Inspecione o Paciente:** Avalie se o animal está confortável, alerta, sem náusea (ausência de sialorreia, lambedura excessiva ou ânsia) e sem taquipneia.',
    '**2. Inspecione o Estoma:** Afaste o curativo e examine a pele peri-estomal procurando eritema, edema, calor, dor ou qualquer secreção purulenta.',
    '**3. Verifique a Marca Externa:** A linha desenhada na sonda coincide perfeitamente com a pele? Se a marca mudou (sonda saiu alguns centímetros), **PARE! NÃO ALIMENTE!** Investigue por radiografia.',
    '**4. Teste de Pressão Negativa / Desobstrução:** Conecte uma seringa limpa de 5 mL e aspire suavemente. Uma leve resistência elástica de pressão negativa indica que o tubo está desobstruído e no lúmen esofágico.',
    '**5. Estimule a Ingestão Espontânea Oral:** SEMPRE ofereça uma pequena porção do alimento altamente palatável pela boca ANTES de infundir pela sonda. O paciente deve ser incentivado a comer voluntariamente;',
    '**6. Lavagem Inicial de Água Morna:** Injete suavemente de 3 a 5 mL (gatos) ou 5 a 10 mL (cães) de água morna filtrada para umedecer a parede luminal da sonda e conferir livre passagem;',
    '**7. Infusão Lenta da Dieta:** Conecte a seringa com a dieta previamente homogeneizada e aquecida à temperatura ambiente/corporal (~37°C). Administre o volume prescrito muito lentamente, ao longo de **10 a 15 minutos**;',
    '**8. Lavagem Final de Limpeza:** Imediatamente após a refeição, injete mais 3 a 5 mL (gatos) ou 5 a 10 mL (cães) de água morna para limpar todos os resíduos alimentares da luz da sonda;',
    '**9. Oclusão e Proteção:** Feche a tampa luer-lock da sonda e recoloque o colar protetor.'
  ]),

  h('19. Vídeo Demonstrativo 2: Cuidados, Curativo e Alimentação (ISFM)', 3),
  p(
    'Assista abaixo ao vídeo institucional do **ISFM** com as orientações práticas de higienização do estoma, técnica de alimentação lenta em pequenas porções e lavagem:'
  ),
  yt(
    'UsLcTZ8u8Gk',
    'Vídeo Oficial ISFM: Cuidados, Curativo e Alimentação pela Sonda Esofágica',
    'Guia prático do ISFM para preparo da dieta, administração lenta da porção, técnica de lavagem e manutenção do estoma.'
  ),

  h('20. Cálculo Energético: Do RER ao Volume de Dieta', 2),
  p(
    'O cálculo da quantidade de alimento diário baseia-se no Requisito Energético de Repouso (RER). A fórmula alométrica exponencial é o padrão ouro para cães e gatos de qualquer porte:'
  ),
  {
    type: 'callout',
    variant: 'info',
    title: 'Cálculo do RER e do volume diário',
    text:
      'FÓRMULA ALOMÉTRICA DO RER:\n' +
      'RER (kcal/dia) = 70 × (peso corporal em kg elevado a 0,75)\n\n' +
      'PROGRESSÃO CALÓRICA PADRÃO (Paciente Estável):\n' +
      '• Dia 1: 33% do RER total (dividido em 4 a 6 refeições)\n' +
      '• Dia 2: 66% do RER total (dividido em 4 a 6 refeições)\n' +
      '• Dia 3: 100% do RER total (dividido em 4 a 6 refeições)\n\n' +
      'CÁLCULO DO VOLUME DE DIETA:\n' +
      'Volume Diário (mL) = [RER Prescrito (kcal) - Ingestão Oral (kcal)] ÷ Densidade Energética da Mistura (kcal/mL)\n' +
      'Volume por Refeição (mL) = Volume Diário (mL) ÷ Número de Refeições Diárias',
  },
  table(
    'Valores de referência de RER para pesos corporais comuns em cães e gatos',
    ['Peso do Animal (kg)', 'RER Total (kcal/dia)', 'Dia 1 (33%)', 'Dia 2 (66%)', 'Dia 3 (100%)'],
    [
      ['2,0 kg', '118 kcal', '39 kcal', '78 kcal', '118 kcal'],
      ['3,0 kg', '160 kcal', '53 kcal', '105 kcal', '160 kcal'],
      ['4,0 kg', '198 kcal', '65 kcal', '131 kcal', '198 kcal'],
      ['5,0 kg', '234 kcal', '77 kcal', '155 kcal', '234 kcal'],
      ['10,0 kg', '394 kcal', '130 kcal', '260 kcal', '394 kcal'],
      ['20,0 kg', '662 kcal', '218 kcal', '437 kcal', '662 kcal'],
      ['30,0 kg', '897 kcal', '296 kcal', '592 kcal', '897 kcal']
    ]
  ),
  box(
    'tip',
    'Cuidado ao Diluir a Dieta: A Densidade Energética Real (kcal/mL)',
    'Uma lata comercial de suporte crítico (ex.: Hill\'s a/d, Royal Canin Recovery, Premier Nutrição Clínica Recovery) contém tipicamente cerca de **1,0 a 1,2 kcal/mL** no produto puro. Ao acrescentar água para que a mistura flua livremente pela sonda, o volume se expande e a densidade calórica diminui!\n\n' +
      '*Exemplo Prático:* Se você bate uma lata de 150 g (~170 kcal) com 50 mL de água, obtém cerca de 200 mL de sopa homogeneizada. A densidade energética real final passa a ser:\n' +
      '**Densidade energética = 170 kcal ÷ 200 mL = 0,85 kcal/mL.**\n' +
      'Nunca calcule o volume de alimentação usando a densidade original da lata se o alimento foi diluído com água!'
  ),

  h('21. Síndrome de realimentação ⚠️', 2),
  box(
    'warning',
    'Fisiopatologia Fatal da Síndrome de Realimentação em Felinos e Caninos Caquéticos',
    'Em animais submetidos a jejum prolongado, inanição crônica ou desnutrição grave, o organismo sobrevive oxidando gorduras e proteínas corporais com níveis basais muito baixos de insulina. Os estoques corpóreos totais de fósforo, potássio e magnésio estão gravemente exauridos, mesmo que os níveis séricos pareçam normais no exame inicial.\n\n' +
      '**A Cascata da Catástrofe:**\n' +
      '1. A introdução abrupta de calorias (principalmente carboidratos) provoca um pico maciço de secreção de **insulina** pelo pâncreas;\n' +
      '2. A insulina induz o transporte imediato de glicose, **fósforo (P), potássio (K) e magnésio (Mg)** para dentro das células para síntese de ATP e glicólise;\n' +
      '3. Isso causa uma **queda súbita, severa e fulminante dos níveis séricos extracelulares de P, K e Mg** nas primeiras 24 a 72 horas;\n' +
      '4. **Consequências Clínicas:**\n' +
      '   • **Hipofosfatemia aguda (< 2,0 mg/dL):** Falência na síntese de ATP nos eritrócitos → **anemia hemolítica intravascular aguda**, fragilidade eritrocitária, fraqueza muscular grave, parada respiratória por fadiga diafragmática e óbito;\n' +
      '   • **Hipocalemia severa:** Ventroflexão cervical em gatos, fraqueza neuromuscular generalizada e arritmias cardíacas;\n' +
      '   • **Hipomagnesemia:** Hiperexcitabilidade neuromuscular, convulsões e refratariedade à correção do potássio.'
  ),
  p(
    '**Protocolo ISFM 2022 de Prevenção da Síndrome de Realimentação em Pacientes de Alto Risco:**\n' +
      '• **Critérios de Alto Risco:** Gatos com lipidose hepática, jejum total > 5–7 dias, animais caquéticos com perda de escore muscular severo (escore 1/9) ou com fósforo/potássio basais limítrofes baixos;\n' +
      '• **Meta Inicial Restrita:** Iniciar com **no máximo 20% do RER no primeiro dia** (e não 33%);\n' +
      '• **Progressão Lenta:** Aumentar gradualmente ao longo de **4 a 10 dias** até atingir 100% do RER, condicionado à estabilidade laboratorial;\n' +
      '• **Monitorização Seriada:** Dosar fósforo, potássio, magnésio, hematócrito e glicemia a cada 12–24 horas nos primeiros 3 a 5 dias;\n' +
      '• **Suplementação de Tiamina (Vitamina B₁):** Administrar tiamina parenteral antes e durante a realimentação para prevenir encefalopatia e disfunção mitocondrial [3, 4].'
  ),

  h('22. Balanço Hídrico das Lavagens e Medicamentos pela Sonda', 2),
  p(
    '**A Água das Lavagens Entra no Balanço Hídrico Total!**\n' +
      'Um erro clínico frequente é esquecer de contabilizar o volume de água das lavagens da sonda. Em um gato de 3 kg com doença renal ou cardiopatia hipertrófica recebendo 5 mL de água antes e 5 mL após cada refeição em 6 ofertas diárias:\n' +
      '**Água das lavagens = 10 mL × 6 refeições = 60 mL/dia.**\n' +
      'Se o clínico estiver administrando 100 mL de fluidoterapia intravenosa em bomba e mais a água da dieta diluída, esse paciente receberá facilmente mais de 200–250 mL/dia de fluidos, entrando rapidamente em **sobrecarga volêmica e edema pulmonar agudo**. Toda água da sonda deve ser subtraída da fluidoterapia intravenosa!'
  ),
  p(
    '**Regras de Segurança Para Medicações Pela Sonda:**\n' +
      '• Confirmar previamente se o medicamento pode ser macerado e administrado por via enteral;\n' +
      '• **NUNCA triturar:** Comprimidos de liberação prolongada/controlada (ex.: formulações Retard, XR, CR) e comprimidos com revestimento entérico (risco de superdosagem tóxica aguda ou inativação gástrica pelo pH ácido);\n' +
      '• Administrar medicamentos preferencialmente em apresentações líquidas orais ou triturados finamente e dissolvidos em 2 a 3 mL de água morna;\n' +
      '• Administrar cada medicamento separadamente, realizando um lavagem de 2 mL de água entre fármacos diferentes para prevenir precipitação química intraluminal;\n' +
      '• Nunca misturar medicações diretamente dentro de todo o pote de comida.'
  ),

  // --------------------------------------------------------------------------
  // PARTE 6: ESTOMA, COMPLICAÇÕES E TROUBLESHOOTING
  // --------------------------------------------------------------------------
  h('23. Inspeção Diária do Estoma: Saudável / Infecção', 2),
  p(
    'A esofagostomia é um procedimento cirúrgico seguro e bem tolerado, mas não isento de complicações. Dois estudos retrospectivos de grande porte definem a epidemiologia contemporânea dessas ocorrências:'
  ),
  box(
    'info',
    'Evidências Epidemiológicas em 473 Animais (Nathanson 2019 e Breheny 2019)',
    '• **Nathanson et al. 2019 (225 casos: 102 cães e 123 gatos):** Complicações gerais ocorreram em 44,4% (maioria leve/moderada). Infecção de estoma em **17,8% dos gatos** e **13,7% dos cães**. Extravasamento alimentar pelo estoma ocorreu em 7 cães e 1 gato. PMC6766496;\n' +
      '• **Breheny et al. 2019 (248 gatos):** Deslocamento mecânico em 14,5% e infecção do estoma em 12,1%. Uso de **glicocorticoides ou quimioterápicos elevou em 3,91 vezes as chances de infecção de estoma** (OR 3,91; IC 95% 1,14–13,44). Tempo de permanência e alta para casa não aumentaram o risco de complicações. PMC6524112.'
  ),
  fig(
    'estoma',
    'Avaliação visual do estoma cervical: estoma saudável / irritação serosa / celulite bacteriana / abscesso/necrose por tensão.',
    'Guia médico ilustrado para inspeção em 360° do estoma cervical: diferenciar irritação serosa fisiológica de celulite grave e necrose tecidual isquêmica.'
  ),
  table(
    'Diagnóstico diferencial e manejo das alterações peri-estomais',
    ['Grau de Alteração', 'Sinais Clínicos Locais', 'Conduta Terapêutica Recomendada'],
    [
      [
        'Estoma Saudável',
        'Bordas róseas, secas, justapostas à sonda. Ausência de dor ou odor. Suturas íntegras sem tensão.',
        'Limpeza suave diária com solução fisiológica estéril 0,9%. Manter curativo frouxo e seco.'
      ],
      [
        'Irritação Leve / Secreção Serosa',
        'Discreto halo eritematoso (< 5 mm); pequena quantidade de secreção serosa clara sem pus.',
        'Intensificar a higiene local e troca de compressas. Não iniciar antibiótico sistêmico de rotina.'
      ],
      [
        'Celulite Bacteriana',
        'Eritema expansivo (> 10–15 mm), edema endurecido e túrgido, aumento de temperatura local e dor à palpação.',
        'Avaliar se a sutura está estrangulando o tecido. Coleta para cultura e antibiograma. Antimicrobiano sistêmico dirigido.'
      ],
      [
        'Abscesso / Extravasamento Alimentar',
        'Flutuação purulenta, drenagem de pus fétido ou resíduos de ração pela incisão; tecido necrótico isquêmico.',
        '**SUSPENDER A ALIMENTAÇÃO PELA SONDA IMEDIATAMENTE!** Remover a sonda sob sedação, debridar e lavar abundantemente.'
      ]
    ]
  ),
  box(
    'warning',
    'Por que NÃO Prescrever Antibiótico Profilático Sistêmico na Colocação?',
    'A revisão clínica de Tolbert et al. (2025) e as diretrizes do ISFM recomendam expressamente **NÃO prescrever antimicrobianos sistêmicos profiláticos empíricos de rotina** apenas pelo fato de uma E-tube ter sido colocada. O uso indiscriminado de antibióticos seleciona cepas hospitalares multirresistentes (ex.: *Staphylococcus pseudintermedius* meticilina-resistente - MRSP, *Pseudomonas* e enterobactérias). A melhor prevenção é a técnica asséptica, divulsão limpa, troca de luvas cirúrgicas antes da fixação e suturas que não causem isquemia tecidual [3, 4, 7].'
  ),

  h('24. Obstrução da Sonda e a Física da Seringa 🔬', 2),
  p(
    'A obstrução do lúmen é uma complicação frustrante, porém quase sempre evitável com lavagens adequados antes e após cada uso.'
  ),
  box(
    'warning',
    'Atenção à Física da Pressão: Nunca Use Seringas Pequenas (1 a 3 mL) para Desobstruir!',
    'A pressão hidráulica exercida sobre as paredes internas da sonda é inversamente proporcional à área transversal do êmbolo da seringa:\n' +
      '**Pressão = força aplicada ÷ área transversal do êmbolo.**\n' +
      'Ao aplicar a mesma força manual (F) em uma seringa de 1 mL ou 3 mL, você gera uma **pressão intraluminal colossal (frequentemente > 50–100 psi)**, capaz de estourar a sonda, romper orifícios laterais ou provocar falso trajeto esofágico!\n\n' +
      '**A Técnica Correta de Desobstrução:**\n' +
      '1. Utilize SEMPRE uma **seringa de grande volume (20 mL a 60 mL)** acoplada diretamente à sonda;\n' +
      '2. Aspire cerca de 10 a 15 mL de **água morna filtrada**;\n' +
      '3. Realize movimentos suaves e repetidos de tração e compressão ("vai-e-vem"), aproveitando o amolecimento térmico do tampão alimentar pelo calor da água;\n' +
      '4. Tolbert et al. (2025) recomendam seringa de 60 mL como a ferramenta mais segura para desobstrução intraluminal [7].'
  ),
  p(
    '**E o refrigerante de cola?** O uso de refrigerante à base de cola é uma prática empírica histórica conhecida, porém **não é recomendada como primeira escolha**. Bebidas ácidas carbonatadas contêm ácido fosfórico com pH ~2,5, o que pode provocar a desnaturação e precipitação imediata de proteínas lácteas e hidrolisados de dietas enterais, piorando o entupimento. Soluções enzimáticas com pancreatina ativada em bicarbonato de sódio ou simplesmente água morna sob tração suave são amplamente superiores e mais seguras.'
  ),

  h('25. Manejo Imediato de Deslocamentos, Vômitos e Intercorrências', 2),
  table(
    'Guia de condutas de emergência para intercorrências da E-tube',
    ['Intercorrência', 'Mecanismo Fisiopatológico', 'Conduta Imediata no Plantão'],
    [
      [
        'Marca externa mudou de posição',
        'A sonda foi tracionada ou deslizou para fora do estoma por afrouxamento da sutura.',
        '**NÃO ALIMENTE E NÃO LAVE!** Realize exame oral para descartar laços e faça radiografia torácica lateral imediata para checar a ponta.'
      ],
      [
        'Sonda saindo pela boca após vômito (Retroflexão)',
        'O esforço antiperistáltico do vômito inverteu o tubo, exteriorizando a ponta pela cavidade oral.',
        '**NUNCA tente empurrar a sonda de volta pelo pescoço!** Suspenda tudo, vede o tubo para não ser mastigado, sede o paciente, recupere o tubo via oral e reposicione ou substitua.'
      ],
      [
        'Sonda removida totalmente pelo paciente',
        'Auto-tração com as patas posteriores ou mordedura.',
        'O estoma cervical contrai-se em minutos. **NÃO tente empurrar uma nova sonda às cegas pelo orifício** (risco imenso de falso trajeto no tecido subcutâneo cervical!). Repita a técnica cirúrgica sob sedação.'
      ],
      [
        'Edema de cabeça e pescoço ("Cabeça inchada")',
        'Curativo cervical excessivamente apertado ocluindo o retorno venoso das veias jugulares.',
        '**Corte e afrouxe o curativo cervical IMEDIATAMENTE.** O edema costuma remitir em poucas horas após o alívio da pressão mecânica.'
      ],
      [
        'Hemorragia cervical ativa ou hematoma expansivo',
        'Laceração da veia jugular externa ou de ramos da carótida durante a incisão ou manipulação intempestiva.',
        'Aplique compressão hemostática digital direta com compressas estéreis. Se expansivo, reexplore cirurgicamente sob anestesia geral.'
      ],
      [
        'Síndrome de Horner (Miose, ptose, enoftalmia)',
        'Neuropraxia ou lesão cirúrgica do tronco vagossimpático cervical durante a passagem da Carmalt.',
        'Exame neurológico completo. Se decorrente de neuropraxia e estiramento, costuma regredir espontaneamente em dias a semanas.'
      ]
    ]
  ),

  // --------------------------------------------------------------------------
  // PARTE 7: RETIRADA, ALTA HOSPITALAR E ERROS CAPITAIS
  // --------------------------------------------------------------------------
  h('26. Técnicas Alternativas (Tunelizador MILA e Normógrada)', 2),
  table(
    'Abordagens cirúrgicas alternativas para esofagostomia em cães e gatos [2, 8]',
    ['Técnica', 'Princípio Operatório', 'Vantagens e Limitações'],
    [
      [
        'Técnica com Introdutor / Tunelizador Dedicado (MILA ETUN)',
        'A sonda é inserida transoralmente no esôfago; o introdutor entra pela boca, perfura a parede esofágica de dentro para fora, acopla a ponta proximal da sonda e a exterioriza pelo pescoço.',
        '**Vantagens:** Movimento padronizado e limpo, sem necessidade de pinçar a sonda com Carmalt.\n**Limitações:** Requer introdutor específico proprietário (ex.: ETUN14, ETUN18).'
      ],
      [
        'Técnica Normógrada Percutânea (Formaggini 2009)',
        'Técnica minimamente invasiva descrita em 19 gatos traumatizados: Carmalt intraluminal protege a parede esofágica enquanto um cateter guia punciona percutaneamente o esôfago em direção caudal.',
        '**Limitações:** Amostra pequena sem grupo controle; exige cateteres/sondas de diâmetro menor que restringem dietas viscosas.'
      ],
      [
        'Faringostomia (Obsoleta)',
        'Acesso realizado proximalmente na parede lateral da faringe, cranial ao osso hioide.',
        '**ABANDONADA:** Apresenta alto índice de engasgo, tosse crônica, obstrução parcial da laringe e aspiração. Foi completamente substituída pela esofagostomia cervical.'
      ]
    ]
  ),

  h('27. Quando e Como Remover a Sonda (Cicatrização por 2ª Intenção)', 2),
  p(
    'O momento da retirada do tubo baseia-se na recuperação clínica e na capacidade do paciente em sustentar seu peso e requerimento energético de forma voluntária.'
  ),
  box(
    'tip',
    'O Critério Clínico de Retirada do ISFM 2022',
    'De acordo com o consenso internacional do ISFM, a sonda de esofagostomia está pronta para ser retirada quando o paciente:\n' +
      '• **Consome voluntariamente pela boca entre 75% a 100% do seu RER diário**, por **3 a 5 dias consecutivos**;\n' +
      '• Mantém ou ganha peso corporal estável;\n' +
      '• Não requer mais a sonda para administração mandatória de medicamentos ou fluidos orais [4].'
  ),
  steps('Protocolo de Retirada em Segunda Intenção', [
    'Remova completamente o curativo protetor cervical e realize antissepsia cuidadosa da pele e do estoma com clorexidina alcoólica;',
    'Corte todos os fios da sutura de fixação (nó cutâneo e sutura entrelaçada de fixação), garantindo que nenhum fragmento de fio permaneça aderido ao tubo ou sob a pele;',
    'Segure a sonda firmemente junto à pele e aplique uma **tração contínua, suave e retilínea**. A sonda deslizará pelo estoma sem resistência;',
    'Inspecione a sonda removida e certifique-se de que sua ponta distal e orifícios laterais saíram perfeitamente íntegros;',
    'Limpe delicadamente o orifício cutâneo residual com solução fisiológica estéril;',
    '**NÃO SUTURE O ESTOMA!** O consenso internacional e os tratados cirúrgicos enfatizam que o estoma esofágico deve cicatrizar por **SEGUNDA INTENÇÃO**. O orifício muscular e cutâneo fecha-se espontaneamente por contração tecidual e granulação em 24 a 48 horas. Suturar um estoma contaminado retém bactérias e propicia formação de celulite ou abscesso cervical;',
    'Aplique uma compressa de gaze com curativo leve não oclusivo por apenas 12 a 24 horas. Mantenha o animal sem comer por 2 a 4 horas pós-retirada.'
  ]),

  h('28. Orientações de Alta Hospitalar e Treinamento do Tutor', 2),
  p(
    'A alta médica de um paciente com sonda de esofagostomia só deve ser liberada após o cuidador passar por um treinamento prático no hospital e **realizar com sucesso ao menos uma refeição completa supervisionada pela equipe veterinária**.'
  ),
  {
    type: 'callout',
    variant: 'info',
    title: 'Orientação domiciliar individualizada',
    text:
      'MODELO DE RECEITUÁRIO E GUIA DE ORIENTAÇÃO DOMICILIAR:\n\n' +
      'Paciente: ________________________  Peso: ____ kg   Data da Colocação: __/__/____\n' +
      'Dispositivo: Sonda Esofágica ____ Fr   Marca de Referência na Pele: ______ cm\n\n' +
      '1. PREPARO DA DIETA:\n' +
      '   • Ração: ________________________ (lata de suporte nutricional)\n' +
      '   • Diluição: 1 lata batida no liquidificador com ____ mL de água morna filtrada.\n' +
      '   • Volume por refeição: ____ mL | Frequência: ____ vezes ao dia (a cada ____ horas).\n\n' +
      '2. PROTOCOLO DE ADMINISTRAÇÃO:\n' +
      '   • Passo A: Ofereça um pouco de comida pela boca. Se comer, anote o quanto comeu!\n' +
      '   • Passo B: Verifique a linha da sonda na pele (deve estar em ____ cm). Se mudou, NÃO ALIMENTE!\n' +
      '   • Passo C: Injete ____ mL de água morna suavemente (Lavagem inicial);\n' +
      '   • Passo D: Conecte a seringa de alimento e injete LENTAMENTE em 10 a 15 minutos;\n' +
      '   • Passo E: Injete ____ mL de água morna suavemente (Lavagem final de limpeza);\n' +
      '   • Passo F: Feche a tampa e mantenha o animal calmo.\n\n' +
      '3. SINAIS DE ALARME (CONTATAR O HOSPITAL IMEDIATAMENTE):\n' +
      '   • A sonda saiu parcialmente ou mudou de posição na pele;\n' +
      '   • Animal apresentou tosse, engasgo, vômito ou salivação excessiva;\n' +
      '   • Saída de pus, inchaço grande, dor ou vermelhidão no pescoço;\n' +
      '   • Dificuldade para injetar o alimento (sonda entupida). NUNCA FORCE!',
  },

  h('29. Os 15 Erros Fatais Que o Veterinário Deve Evitar 🚨', 2),
  list([
    '**1. Improvisar "qualquer sonda":** Usar sondas de Levine em PVC que endurecem em dias ou sondas uretrais citotóxicas em vez de sondas dedicadas de silicone ou poliuretano.',
    '**2. Cortar tecidos profundos sem palpar metal:** Fazer incisões cegas no pescoço sem delimitar nitidamente as pontas da Carmalt sob a pele.',
    '**3. Não localizar a veia jugular externa:** Incisar ventralmente à jugular, provocando laceração vascular com hemorragia catastrófica.',
    '**4. Fazer uma incisão cutânea ampla demais:** Estoma largo propicia vazamento de saliva e alimento, celulite cervical e migração da sonda.',
    '**5. Pinçar tecidos vizinhos na Carmalt:** Prender esôfago, pele ou músculo nas mandíbulas da pinça ao agarrar a sonda, lacerando os tecidos na tração retrógrada.',
    '**6. Não realizar o "flip" corretamente:** Deixar uma alça da sonda retida na orofaringe ou enrolada ao redor do tubo endotraqueal.',
    '**7. Iniciar a alimentação antes da confirmação radiográfica:** Supor que ausculta ou injeção de ar confirmam trajeto intraluminal.',
    '**8. Deixar a ponta da sonda dentro do estômago:** Ultrapassar o cárdia, provocando refluxo gastroesofágico crônico e esofagite ácida severa.',
    '**9. Apertar excessivamente o ponto de fixação:** Estrangular a pele com o nó cirúrgico, provocando isquemia cutânea, necrose e perda precoce do dispositivo.',
    '**10. Fazer curativo cervical compressivo:** Causar estase jugular bilateral e edema maciço da cabeça e da face do paciente.',
    '**11. Não registrar a marca externa da pele:** Ficar impossibilitado de saber se a sonda migrou para fora durante o internamento.',
    '**12. Não contabilizar a água das lavagens no balanço hídrico:** Provocar sobrecarga circulatória e edema agudo de pulmão em felinos e cardiopatas.',
    '**13. Iniciar com 100% do RER em paciente desnutrido:** Desencadear Síndrome de Realimentação fulminante por hipofosfatemia aguda.',
    '**14. Desobstruir com seringas de 1 a 3 mL:** Romper a sonda por excesso de pressão hidráulica (pressão = força ÷ área do êmbolo). Use sempre seringas de 20 a 60 mL com água morna.',
    '**15. Suturar o estoma cirurgicamente após a remoção:** Fechar uma ferida contaminada, retendo exsudato e provocando celulite cervical ou abscesso.'
  ]),

  h('30. Referências Bibliográficas e Diretrizes Clínicas Oficiais', 2),
  list([
    '**[1] Bexfield N, Riggs J, eds. BSAVA Guide to Procedures in Small Animal Practice. 3ª ed. British Small Animal Veterinary Association; 2024.** *Oesophagostomy tube placement*, pp. 223–226. Acesso institucional BSAVA Library.',
    '**[2] Hackett TB, Mazzaferro EM. Veterinary Emergency and Critical Care Procedures. 3ª ed. John Wiley & Sons; 2025.** Cap. 5: *Nutritional Support and Orogastric Lavage — Esophagostomy Tubes*, pp. 157–166.',
    '**[3] Chan DL. Nutritional Support for the Critically Ill Feline Patient. In: Drobatz KJ, Reineke E, Costello MF, Culp WTN, eds. Feline Emergency and Critical Care Medicine. 2ª ed. Wiley-Blackwell; 2023.** Cap. 9, pp. 83–89.',
    '**[4] Taylor S, Chan DL, Villaverde C, et al. 2022 ISFM Consensus Guidelines on Management of the Inappetent Hospitalised Cat.** *Journal of Feline Medicine and Surgery*, 24(7):614–640, 2022. DOI: 10.1177/1098612X221106353. Texto completo de acesso aberto no PMC.',
    '**[5] AAHA. 2021 AAHA Nutrition and Weight Management Guidelines for Dogs and Cats: Feeding Plans for Hospitalized Patients.** Diretriz Oficial AAHA.',
    '**[6] Vila Cabaleiro A, et al. Introduction and Validation of Radiographic Guidelines for Identification of Nasoesophageal and Nasogastric Tube Position in Dogs and Cats.** *Veterinary Radiology & Ultrasound*, 67:e70138, 2026. DOI: 10.1111/vru.70138. PubMed.',
    '**[7] Tolbert MK, Self A, Secoura P. Minimizing Small Animal Esophageal Feeding Tube Complications.** *Today\'s Veterinary Practice*, Jul/Aug 2025.',
    '**[8] Formaggini L. Normograde, minimally invasive technique for oesophagostomy in cats.** *Journal of Feline Medicine and Surgery*, 11(6):481–486, 2009. DOI: 10.1016/j.jfms.2008.11.004. PMC.',
    '**[9] Nathanson O, et al. Esophagostomy tube complications in dogs and cats: retrospective review of 225 cases.** *Journal of Veterinary Internal Medicine*, 33(5):2014–2019, 2019. DOI: 10.1111/jvim.15563. Acesso aberto no PMC.',
    '**[10] Breheny CR, et al. Esophageal feeding tube placement and the associated complications in 248 cats.** *Journal of Veterinary Internal Medicine*, 33(3):1306–1314, 2019. DOI: 10.1111/jvim.15496. Acesso aberto no PMC.',
    '**[11] WSAVA Global Nutrition Committee. Feeding Guide for Hospitalized Dogs and Cats.** Diretriz Oficial WSAVA (PDF).'
  ]),
];

export const guiaEsofagostomia: ClinicalQuickGuide = {
  id: 'cqg-esofagostomia-001',
  slug: 'sonda-esofagica-esofagostomia-caes-gatos',
  title: 'Sonda esofágica em cães e gatos (Esofagostomia)',
  subtitle:
    'Guia completo e aprofundado: anatomia cirúrgica cervical, seleção de sondas (silicone / poliuretano), técnica retrógrada com Carmalt, manobra do flip, confirmação radiográfica, cálculo de RER, protocolo de realimentação, manejo de complicações e cuidados domiciliares',
  summary:
    'Manual clínico-cirúrgico exaustivo de esofagostomia cervical (E-tube/O-tube) em cães e gatos, baseado no BSAVA 2024, Hackett & Mazzaferro 2025, Feline Emergency 2023 e consenso ISFM 2022. Contempla técnica com Carmalt passo a passo, a manobra do flip, confirmação radiográfica do terço distal, fixação por sutura entrelaçada, prevenção da síndrome de realimentação, estudos de 473 casos e imagens e vídeos demonstrativos oficiais em fluxo vertical contínuo.',
  category: 'procedimentos',
  species: ['dog', 'cat'],
  searchKeywords: [
    'sonda esofágica',
    'esofagostomia',
    'esofagostomia cervical',
    'E-tube',
    'O-tube',
    'Carmalt',
    'flip',
    'nutrição enteral',
    'alimentação enteral',
    'lipidose hepática',
    'síndrome de realimentação',
    'refeeding syndrome',
    'estoma',
    'chinese sutura entrelaçada',
    'Tradevet',
    'MILA',
    'suporte nutricional',
    'anorexia felina'
  ],
  youtubeVideoId: null, // Sem vídeo fixo no cabeçalho: os vídeos são organizados contextualmente no corpo vertical
  heroImageSrc: '/consulta-vet/clinical-guides/esofagostomia/anatomia.svg',
  heroImageAlt: 'Esquema anatômico do acesso cervical esquerdo para colocação de sonda de esofagostomia em cães e gatos.',
  quickBullets: [
    '**Princípio cirúrgico:** A esofagostomia desvia o alimento da boca e da faringe, mas exige esôfago funcional (contraindicada em megaesôfago e esofagite grave).',
    '**Momento de indicar:** Ingestão ≤ 1/3 do RER por > 72h (AAHA) ou 3–5 dias de hiporexia (WSAVA); nunca forçar alimentação oral com seringa.',
    '**Anatomia de segurança:** Acesso cervical esquerdo em decúbito lateral direito; pinça Carmalt e incisão SEMPRE DORSAL à veia jugular externa.',
    '**Sondas recomendadas:** Silicone dedicado veterinário nacional (Tradevet 12–20 Fr) ou poliuretano (MILA); evitar sondas de PVC (Levine) e uretrais.',
    '**Calibres de ouro:** Gatos 12–14 Fr (14 Fr é a referência ideal para gatos adultos); cães 14–20 Fr conforme porte corporal.',
    '**A Manobra do Flip:** Redirecionamento caudal transoral da ponta com tração cervical coordenada até o tubo deslizar livremente sem resistência.',
    '**Confirmação por imagem:** Radiografia torácica lateral completa obrigatória antes do uso; ponta no terço distal do esôfago (NÃO no estômago!).',
    '**Prevenção de Realimentação:** Gatos caquéticos iniciam com ≤ 20% do RER no Dia 1, progredindo em 4 a 10 dias com monitorização seriada de P, K e Mg.',
    '**Balanço hídrico das lavagens:** 5 a 10 mL de água antes e depois de cada porção somam 60 a 120 mL/dia; subtrair da fluidoterapia intravenosa!',
    '**Retirada e cicatrização:** Retirar após 3–5 dias comendo 75–100% do RER voluntariamente; cicatrização por segunda intenção (NÃO suturar o estoma!).'
  ],
  sections,
  richText: true,
  showTableOfContents: true,
  isPublished: true,
};
