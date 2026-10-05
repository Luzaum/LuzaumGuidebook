import { MedicationRecord } from '../../types/medication';

export const metoclopramidaMedicationRecord: MedicationRecord = {
  id: 'med-metoclopramida',
  slug: 'metoclopramida',
  title: 'Metoclopramida',
  activeIngredient: 'Cloridrato de metoclopramida (R-4168)',
  isControlled: false,
  tradeNames: [
    'Nausetrat® 5 mg/mL Solução Oral Frasco 20 mL com Conta-gotas (UCBVET — Veterinário Brasil)',
    'Nausetrat® Injetável 5 mg/mL Frasco-ampola 10 mL (UCBVET — Veterinário Brasil)',
    'Emeprid® 5 mg/mL Solução Injetável e 1 mg/mL Solução Oral (Ceva Santé Animale — Europa)',
    'Plasil® 10 mg Comprimidos e 1 mg/mL Solução Oral (Sanofi / Eurofarma — Humano no Brasil)',
    'Plasil® 4 mg/mL Gotas Pediátricas Frasco 20 mL (Sanofi / Eurofarma — 21 gotas/mL; 1 gota ≈ 0,19 mg)',
    'Plasil® 5 mg/mL Solução Injetável Ampolas 2 mL com 10 mg (Sanofi — Humano no Brasil)',
    'Cloridrato de Metoclopramida Genérico 10 mg comp., 4 mg/mL gotas e 5 mg/mL injetável (EMS, Eurofarma, Teuto, Medley)',
  ],
  officialSiteUrl: 'https://ucbvet.com/produto/nausetrat-solucao-oral/',
  leafletUrl: 'https://ucbvet.com/wp-content/uploads/2024/11/IS12A790-Bula-Nausetrat-Oral-Encartuchadeira-curvas.pdf',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/metoclopramide/PNG',
  priceReference: {
    amountBrl: 24.0,
    label:
      'Nausetrat® Oral 5 mg/mL (20 mL): R$ 22,00 a R$ 32,00 | Nausetrat® Injetável (10 mL): R$ 18,00 a R$ 28,00 | Plasil® Genérico Humano Gotas 4 mg/mL: R$ 8,00 a R$ 14,00 | Comprimidos 10 mg (cx 20): R$ 6,00 a R$ 12,00',
    presentation: 'Nausetrat® 5 mg/mL solução oral frasco 20 mL (UCBVET Brasil)',
    sourceName: 'Comércio Veterinário e Farmácias Comerciais Brasileiras',
    sourceUrl: 'https://ucbvet.com',
    checkedAt: '2026-10-04',
    notes:
      'Medicamento não sujeito a controle especial pela Portaria SVS/MS nº 344/98 e nem pelo MAPA no Brasil. Prescrição em Receituário Simples de uso veterinário em 1 via. Disponível amplamente em apresentações comerciais veterinárias registradas no MAPA e genéricos humanos.',
  },
  pharmacologicClass:
    'Antagonista dos receptores dopaminérgicos D2 e D3; agonista dos receptores serotoninérgicos 5-HT4; antagonista fraco de 5-HT3; antiemético de ação na CRTZ; estimulante da motilidade gastrintestinal proximal (pró-cinético do estômago, duodeno e jejuno)',
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  tags: [
    'Metoclopramida',
    'Metoclopramide',
    'Nausetrat',
    'Plasil',
    'Emeprid',
    'Antiemético',
    'Pró-cinético',
    'Antagonista D2',
    'Agonista 5-HT4',
    'CRTZ',
    'Área Postrema',
    'Esvaziamento Gástrico',
    'CRI',
    'Dose de Ataque 2026',
    'Refluxo Gastroesofágico',
    'Efeitos Extrapiramidais',
    'Difenidramina',
    'Parvovirose',
    'Receituário Simples',
  ],

  plainLanguageSummary:
    'A metoclopramida é um dos medicamentos mais tradicionais da rotina veterinária, combinando duas ações: combate náuseas e vômitos (antiemético) e estimula as contrações do início do aparelho digestivo, como estômago e intestino delgado inicial (pró-cinético). No entanto, a medicina moderna revelou que ela não é igualmente eficaz para todas as situações: funciona muito melhor em cães do que em gatos, porque o cérebro dos gatos depende muito menos da dopamina para disparar o vômito. Além disso, ela praticamente não tem efeito sobre o intestino grosso (cólon), sendo inútil para constipação ou megacólon felino. O medicamento atua bloqueando a dopamina e ativando a serotonina 5-HT4 no estômago, mas ao penetrar no cérebro pode provocar tremores musculares, rigidez, andar compulsivo ou agitação (efeitos extrapiramidais), que revertem com difenidramina. Dois alertas fundamentais de 2026: 1) NUNCA deve ser aplicada em bolus intravenoso rápido ou em dose alta (1 mg/kg IV rápido causou parada cardíaca em relatos recentes); em internação, a infusão contínua (CRI) de 1 a 2 mg/kg/dia deve receber doses de ataque muito pequenas (0,05 a 0,1 mg/kg); 2) É terminantemente proibida se houver suspeita de corpo estranho ou intestino entupido, pois forçar o trânsito contra uma barreira mecânica pode romper o estômago ou intestino.',

  mechanismOfAction:
    'A metoclopramida (4-amino-5-cloro-N-[2-(dietilamino)etil]-2-metoxibenzamida) é uma benzamida substituída (ortopramida) que atua simultaneamente sobre múltiplos receptores dopaminérgicos e serotoninérgicos centrais e periféricos:\n' +
    '1. ANTAGONISMO DOPAMINÉRGICO D2 CENTRAL (EFEITO ANTIEMÉTICO): Na zona de gatilho quimiorreceptora (CRTZ — área postrema, desprovida de barreira hematoencefálica contínua), a metoclopramida bloqueia os receptores D2 acoplados à proteína Gi/o. Ao suprimir a inibição da adenilato ciclase induzida por dopamina circulante (toxinas urêmicas, apomorfina, endotoxinas), diminui os estímulos aferentes transmitidos ao centro emético bulbar. Como o reflexo de vômito no cão possui forte dependência de receptores D2 na CRTZ, sua ação antiemética central é convincente na espécie canina; em contrapartida, gatos apresentam expressão e densidade muito reduzidas de receptores D2 na área postrema, tornando a metoclopramida substancialmente menos eficaz e imprevisível como antiemético central em felinos.\n' +
    '2. AGONISMO SEROTONINÉRGICO 5-HT4 E FACILITAÇÃO COLINÉRGICA ENTÉRICA (EFEITO PRÓ-CINÉTICO): No plexo mioentérico entérico do trato digestivo proximal (esôfago distal, antro gástrico, duodeno e jejuno), a metoclopramida atua como potente agonista de receptores 5-HT4 pré-sinápticos acoplados à proteína Gs. Essa ativação eleva o cAMP e estimula a exocitose sináptica de acetilcolina (ACh) pelos neurônios motores pós-ganglionares. A ACh liberada ativa receptores muscarínicos M3 na camada muscular lisa circular e longitudinal, aumentando o tônus basal do esfíncter esofágico inferior (EEI), a amplitude das contrações antrais e a coordenação gastroduodenal, promovendo o relaxamento receptivo do esfíncter pilórico. Fármacos antimuscarínicos (como atropina e escopolamina) bloqueiam esse efeito por antagonismo farmacodinâmico direto.\n' +
    '3. ANTAGONISMO D2 NO PLEXO MIOENTÉRICO: A dopamina atua perifericamente exercendo um freio inibitório sobre a liberação de acetilcolina entérica. A metoclopramida remove esse freio dopaminérgico periférico, somando-se ao agonismo 5-HT4 para otimizar o peristaltismo gastroduodenal e acelerar o esvaziamento de líquidos e semissólidos.\n' +
    '4. ANTAGONISMO SEROTONINÉRGICO 5-HT3 RELATIVAMENTE FRACO: Em concentrações séricas e teciduais elevadas, a metoclopramida exerce bloqueio competitivo fraco nos canais iônicos catiônicos 5-HT3 em aferentes vagais periféricos e no núcleo do trato solitário. Contudo, essa afinidade é dezenas de vezes inferior à da ondansetrona, não sendo suficiente para abortar êmese severa altamente serotoninérgica (como induzida por cisplatina ou quimioterápicos citotóxicos).\n' +
    '5. ANTAGONISMO D2 TUBEROINFUNDIBULAR E HIPERPROLACTINEMIA: Bloqueia os receptores D2 nos lactotrofos adeno-hipofisários, removendo o controle inibidor tônico da dopamina hipotalâmica (fator PIF) e provocando aumento agudo e sustentado de prolactina plasmática, com potenciais efeitos galactagogos e exacerbação de pseudociese em cadelas.',

  pillars: [
    {
      title: 'Antagonismo D₂ Central no Circuito Emético',
      icon: '🧠',
      desc: 'Bloqueia receptores D2 na CRTZ (área postrema), interrompendo o reflexo de vômito deflagrado por toxinas urêmicas e estímulos dopaminérgicos. É significativamente mais eficaz no cão do que no gato devido à menor densidade de D2 felina.',
    },
    {
      title: 'Pró-cinese Proximal via Agonismo 5-HT₄ e Liberação de ACh',
      icon: '🌀',
      desc: 'Estimula receptores 5-HT4 e remove o freio D2 entérico, amplificando a liberação de acetilcolina no estômago, duodeno e jejuno. Eleva o tônus do EEI e relaxa o piloro; efeito é anulado por antimuscarínicos (atropina).',
    },
    {
      title: 'Não é Pró-cinético Distal nem de Cólon',
      icon: '🚦',
      desc: 'O gradiente de receptores 5-HT4 e D2 decai acentuadamente ao longo do trato digestivo. A metoclopramida possui ação insignificante sobre o íleo terminal e o cólon, sendo ineficaz para megacólon, constipação crônica e cólon hipotônico (cisaprida é a droga de escolha).',
    },
    {
      title: 'Eficácia e Toxicidade Nascem do Mesmo Alvo D₂',
      icon: '⚠️',
      desc: 'O bloqueio D2 na via nigroestriatal gera reações extrapiramidais (distonia, tremores, acatisia, agitação paradoxal), reversíveis por difenidramina (2,2 mg/kg IV). O bloqueio adeno-hipofisário eleva prolactina, agravando pseudociese.',
    },
  ],

  quickSummaryHighlights: [
    'Uso clínico duplo clássico: antiemético central na CRTZ e estimulante da motilidade gastrintestinal proximal (estômago, duodeno e jejuno).',
    'Atualização Crítica de Segurança 2026: NUNCA administrar bolus IV rápido de 1 mg/kg; dois estudos recentes (Rolfi & Chesnel 2026) reportaram bradicardia extrema, assistolia e parada cardiorrespiratória imediatas em cães.',
    'Novo Protocolo de Infusão Contínua (CRI) 2026: a modelagem farmacocinética moderna (Martin-Flores et al. 2026) preconiza CRI de 1 a 2 mg/kg/dia (0,042 a 0,083 mg/kg/h) precedida por dose de ataque baixa de 0,05 mg/kg IV (para 1 mg/kg/dia) ou 0,1 mg/kg IV (para 2 mg/kg/dia), atingindo o equilíbrio em minutos sem risco arritmogênico.',
    'Divergência entre Espécies: é um antiemético confiável no cão, mas fraco e imprevisível em gatos (menor participação de D2 no centro emético felino); maropitant e ondansetrona são vastamente superiores em felinos.',
    'Contraindicação Absoluta de Rotina: obstrução mecânica gastrintestinal, corpo estranho e perfuração; forçar o peristaltismo contra barreira mecânica acarreta risco de rotura gástrica ou intestinal.',
    'Reações Extrapiramidais Centrais: tremores, rigidez postural, ataxia e agitação paradoxal decorrem do bloqueio D2 nos gânglios da base; revertem rapidamente com difenidramina (2,2 mg/kg IV ou IM).',
  ],

  quickIndications: [
    {
      condition: 'Vômitos Agudos e Gastroparesia Funcional (Cães)',
      species: 'dog',
      doseSummary: '0,2 a 0,5 mg/kg VO, SC, IM ou IV lenta a cada 6 a 8 horas (reduzir 50% em DRC avançada)',
      route: 'Oral (30–60 min antes da refeição) ou parenteral lento em 5–10 min',
      duration: '3 a 5 dias conforme resolução do quadro emético',
      clinicalContext: 'Êmese urêmica, toxicidade medicamentosa leve ou estase gastroduodenal',
    },
    {
      condition: 'Íleo Paralítico e Estase Digestiva em UTI / Infusão Contínua (Cães)',
      species: 'dog',
      doseSummary: 'CRI: 1,0 a 2,0 mg/kg/dia IV (ataque lento de 0,05 a 0,1 mg/kg; nunca usar bolus de 1 mg/kg)',
      route: 'Intravenosa contínua (CRI) em bomba de infusão volumétrica',
      duration: '24 a 48 horas sob ausculta de borborigmos e monitoramento',
      clinicalContext: 'Recuperação de motilidade pós-cirúrgica e suporte pró-cinético em UTI',
    },
    {
      condition: 'Refluxo Gastroesofágico e Esofagite Erosiva (Cães)',
      species: 'dog',
      doseSummary: '0,2 a 0,4 mg/kg VO ou SC a cada 8 horas antes da alimentação',
      route: 'Via Oral (VO) ou Subcutânea (SC)',
      duration: '5 a 14 dias associada a inibidores de bomba de prótons',
      clinicalContext: 'Aumento da pressão basal do EEI e aceleração da depuração ácida gastroduodenal',
    },
    {
      condition: 'Gastroenterite Viral por Parvovírus Canino (Cães)',
      species: 'dog',
      doseSummary: '0,5 mg/kg IV lenta a cada 8 horas associada a fluidoterapia intensiva',
      route: 'Intravenosa lenta (5 a 10 min diluída em NaCl 0,9%)',
      duration: '3 a 5 dias durante a fase de êmese ativa',
      clinicalContext: 'Protocolo validado em ensaio clínico randomizado (Yalcin & Keser 2017)',
    },
    {
      condition: 'Distúrbios Motores Digestivos e Vômitos em Felinos (Gatos)',
      species: 'cat',
      doseSummary: '0,17 a 0,33 mg/kg VO, SC ou IV lenta a cada 8 horas (ou 0,25 a 0,5 mg/kg q12h)',
      route: 'Oral, Subcutânea ou Intravenosa lenta',
      duration: '2 a 4 dias sob rigorosa vigilância neurocomportamental',
      clinicalContext: 'Menor eficácia antiemética no gato; contraindicada em megacólon felino',
    },
  ],

  detailedIndications: [
    {
      id: 'ind-metoclo-dog-emesis',
      indication: 'Controle de vômitos agudos e estimulação de motilidade em gastroparesia funcional',
      clinicalContext: 'Êmese de origem periférica (gástrica, duodenal), uremia leve e hipomotilidade antral',
      species: 'dog',
      dose: '0,2 a 0,5 mg/kg (Nausetrat gotas: 2 a 5 gotas/kg)',
      route: 'VO, SC, IM ou IV lenta',
      frequency: 'a cada 6 a 8 horas',
      duration: '3 a 5 dias',
      mechanismOfAction: 'Bloqueio de receptores dopaminérgicos D2 na CRTZ e ativação pré-sináptica de 5-HT4 no plexo mioentérico promovendo liberação de acetilcolina.',
      clinicalRationale: 'Reduz a náusea central e acelera o esvaziamento gastroduodenal sem efeito sobre o cólon.',
      monitoring: 'Manifestações extrapiramidais (tremores, distonia), frequência cardíaca e função renal.',
      referenceIds: ['ref-metoclo-plumbs-10ed', 'ref-metoclo-bsava-10ed'],
      evidenceLevel: 'Nível 1a — Consensos de medicina interna e formulários canônicos (Plumb’s e BSAVA)',
    },
    {
      id: 'ind-metoclo-dog-cri',
      indication: 'Íleo funcional pós-cirúrgico e estase gastrointestinal em terapia intensiva',
      clinicalContext: 'Pacientes críticos pós-laparotomia, peritonite ou torção gástrica estabilizada',
      species: 'dog',
      dose: '1,0 a 2,0 mg/kg/dia IV contínua (0,042 a 0,083 mg/kg/h) com ataque conservador de 0,05 a 0,1 mg/kg IV',
      route: 'IV contínua (CRI)',
      frequency: 'infusão ininterrupta em 24 horas',
      duration: '24 a 48 horas',
      mechanismOfAction: 'Manutenção de níveis plasmáticos estáveis de 100 ng/mL garantindo tônus colinérgico contínuo na musculatura lisa.',
      clinicalRationale: 'Evita flutuações de pico e vale da administração intermitente e restaura motilidade propulsiva.',
      monitoring: 'Ritmo cardíaco contínuo, pressão arterial e ausculta de motilidade gastrintestinal.',
      referenceIds: ['ref-metoclo-martin-flores-2026', 'ref-metoclo-rolfi-2026'],
      evidenceLevel: 'Nível 1b — Modelagem farmacocinética e farmacodinâmica prospectiva (Martin-Flores et al. 2026)',
    },
    {
      id: 'ind-metoclo-dog-reflux',
      indication: 'Tratamento adjuvante do refluxo gastroesofágico e esofagite erosiva',
      clinicalContext: 'Cães com regurgitação, tosse pós-prandial ou esofagite confirmada por endoscopia',
      species: 'dog',
      dose: '0,2 a 0,4 mg/kg',
      route: 'VO ou SC',
      frequency: 'a cada 8 horas (30 min antes da refeição)',
      duration: '5 a 14 dias',
      mechanismOfAction: 'Aumento da pressão de repouso do EEI e estímulo da depuração peristáltica esofágica.',
      clinicalRationale: 'Reduz o tempo de contato do suco gástrico ácido e biliar com a mucosa do esôfago distal.',
      monitoring: 'Episódios de regurgitação, sialorreia e dor à deglutição.',
      referenceIds: ['ref-metoclo-plumbs-10ed', 'ref-metoclo-ettinger-9ed'],
      evidenceLevel: 'Nível 2a — Tratados de medicina interna veterinária (Ettinger 2024)',
    },
  ],

  clinicalWarningItems: [
    {
      label: 'ALERTA DE SEGURANÇA CARDIOVASCULAR 2026: ABANDONO DO BOLUS IV DE 1 mg/kg',
      text: 'Publicações de farmacovigilância e relatos de caso em 2026 (Rolfi & Chesnel 2026; British Veterinary Association 2026) documentaram bradicardia extrema (<4 bpm), assistolia miocárdica e parada cardiorrespiratória imediatamente após a injeção em bolus intravenoso de 1 mg/kg de metoclopramida em cães sob anestesia. O mecanismo envolve bloqueio agudo de canais de sódio/potássio miocárdicos somado a reflexos vagais colinérgicos. O bolus empírico de 1 mg/kg NÃO DEVE SER UTILIZADO na rotina clínica ou anestésica. Em infusões contínuas (CRI), utilizar a nova dose de ataque de 0,05 a 0,1 mg/kg IV lenta.',
    },
    {
      label: 'CONTRAINDICAÇÃO ABSOLUTA: OBSTRUÇÃO, CORPO ESTRANHO E PERFURAÇÃO GASTRINTESTINAL',
      text: 'A administração de metoclopramida em pacientes com obstrução mecânica intraluminal (corpo estranho obstrutivo, intussuscepção, estenose pilórica) ou suspeita de perfuração de víscera oca é expressamente contraindicada. A desinibição colinérgica e o aumento da força contrátil antral contra um obstáculo fixo geram hipertensão intraluminal severa, isquemia parietal, deiscência de suturas cirúrgicas e risco catastrófico de perfuração gastrointestinal com peritonite séptica.',
    },
    {
      label: 'INEFICÁCIA EM MOTILIDADE DO CÓLON E LIMITAÇÃO EM GATOS',
      text: 'A metoclopramida praticamente não possui densidade funcional de receptores 5-HT4 no intestino grosso; não promove contrações propulsivas no cólon e não deve ser prescrita para megacólon felino, constipação crônica ou atonia colônica (situações em que a cisaprida é a droga de escolha). Em gatos com êmese crônica (doença inflamatória intestinal, pancreatite, lipidose), a menor densidade de receptores D2 na CRTZ reduz a confiabilidade da metoclopramida, devendo-se priorizar antagonistas NK1 (maropitant) ou 5-HT3 (ondansetrona).',
    },
    {
      label: 'SÍNDROME EXTRAPIRAMIDAL E REDUÇÃO DO LIMIAR CONVULSIVO',
      text: 'Por atravessar livremente a barreira hematoencefálica, o antagonismo D2 na via nigroestriatal rompe o equilíbrio dopamina-acetilcolina nos núcleos da base, induzindo tremores musculares, rigidez, distonia cervical, vocalização e agitação frenética acatisia-like. Em animais epilépticos, reduz o limiar convulsivo e pode deflagrar crises epilépticas em salvas, devendo ser evitada em pacientes neurológicos. Em caso de crise extrapiramidal, administrar difenidramina 2,2 mg/kg IV lenta.',
    },
    {
      label: 'AJUSTE MANDATÓRIO NA DOENÇA RENAL CRÔNICA AVANÇADA (IRIS 3 E 4)',
      text: 'A metoclopramida é eliminada primariamente por depuração renal (cerca de 65% a 70% da dose é excretada na urina em 24 horas como fármaco inalterado e metabólitos conjugados). Em pacientes com taxa de filtração glomerular substancialmente reduzida (IRIS 3 e 4, ou insuficiência renal aguda oligoanúrica), a meia-vida sérica prolonga-se de ~1 h para até 6 a 12 horas, levando a acúmulo sérico e precipitação de neurotoxicidade extrapiramidal. Recomenda-se reduzir a dose diária total em 50% ou espaçar os intervalos.',
    },
    {
      label: 'ATENÇÃO CRÍTICA À CALIBRAÇÃO DE GOTAS: NAUSETRAT vs PLASIL',
      text: 'Nunca prescrever "gotas por kg" sem especificar a marca comercial: o produto veterinário Nausetrat® 5 mg/mL possui conta-gotas calibrado em 1 gota ≈ 0,1 mg (dose rotulada de 1 a 4 gotas/kg correspondendo a 0,1 a 0,4 mg/kg), enquanto o produto humano Plasil® Gotas 4 mg/mL possui 21 gotas/mL, onde 1 gota equivale a aproximadamente 0,19 mg (quase o dobro da concentração por gota!). Erros de conversão empírica provocam superdosagens agudas graves.',
    },
  ],

  indications: [
    'Tratamento e controle sintomático de vômitos agudos em cães de origem infecciosa (gastroenterite viral, parvovirose), alimentar ou induzida por fármacos de ação central dopaminérgica.',
    'Tratamento de gastroparesia funcional leve a moderada, estase gástrica pós-traumática ou pós-operatória, dilatação gástrica hipotônica não obstrutiva e neuropatia autonômica digestiva.',
    'Manejo de refluxo gastroesofágico e esofagite erosiva em cães e gatos, atuando na elevação da pressão de fechamento do esfíncter esofágico inferior (EEI) e na aceleração do clearance ácido gástrico.',
    'Suporte pró-cinético em íleo paralítico funcional pós-cirúrgico ou secundário a peritonite/pancreatite sob infusão contínua (CRI) em unidade de terapia intensiva.',
    'Adjuvante no posicionamento e progressão de sondas enterais pós-pilóricas (nasojejunais) através do estímulo contrátil gastroduodenal.',
    'Indução galactagoga em cadelas com agalactia ou hipogalactia pós-parto através da elevação transitória de prolactina adeno-hipofisária.',
  ],

  contraindications: [
    'Obstrução mecânica do trato gastrointestinal confirmada ou suspeita (corpo estranho intraluminal, intussuscepção, volvo gástrico, hérnia encarcerada ou estenose estenosante).',
    'Perfuração ou hemorragia digestiva ativa em qualquer segmento do estômago ou intestino.',
    'Epilepsia idiopática, histórico de convulsões ou distúrbios neurológicos com lesão intracraniana expansiva (redução do limiar convulsivo).',
    'Feocromocitoma: o bloqueio dopaminérgico e a estimulação colinérgica podem precipitar desgranulação massiva de catecolaminas pelas células cromafins tumorais, deflagrando crise hipertensiva fatal.',
    'Hipersensibilidade conhecida à metoclopramida ou a qualquer derivado das benzamidas e ortopramidas.',
    'Uso concomitante com outros bloqueadores dopaminérgicos centrais potentes (acepromazina, clorpromazina) pelo risco aditivo extremo de colapso extrapiramidal.',
    'Megacólon, constipação colônica ou obstipação distal em felinos (ausência total de eficácia sobre a musculatura lisa colônica).',
  ],

  cautions: [
    'Administração intravenosa rápida (bolus IV rápido): deve ser terminantemente evitada pelo risco de hipotensão súbita, bradicardia extrema, assistolia e exacerbação de manifestações extrapiramidais. Administrar sempre em infusão lenta diluída em pelo menos 10 a 15 minutos ou via CRI.',
    'Doença Renal Crônica avançada (IRIS estágios 3 e 4) e Injúria Renal Aguda: monitorar estreitamente sonolência, tremores e distonia; reduzir a dose em 50% em pacientes oligúricos ou azotêmicos acentuados.',
    'Insuficiência hepática com perda de função sintética: o metabolismo hepático microssomal encontra-se deprimido; considerar reduções posológicas cautelosas em hepatopatas graves.',
    'Cadelas com histórico de pseudogestação (pseudociese): a elevação da prolactina pode desencadear ou agravar o comportamento materno anômalo, aumento mamário e galactorreia indesejada.',
    'Pacientes sob anestesia geral: evitar bolus em anestesiados, especialmente em braquicefálicos ou animais instáveis, mantendo monitoração eletrocardiográfica e pressórica contínua.',
    'Náusea associada a quimioterapia altamente emetogênica (cisplatina, doxorrubicina): a metoclopramida exibe eficácia antiemética e antináusea muito inferior à ondansetrona e maropitant.',
  ],

  adverseEffects: [
    'Sinais neurológicos e extrapiramidais (bloqueio nigroestriatal D2): agitação psicomotora, desorientação, vocalização, ataxia, tremores de cabeça e membros, rigidez muscular extensora e distonia postural (especialmente comum em gatos ou após injeções rápidas).',
    'Efeitos cardiovasculares emergentes (bloqueio iônico e tônus vagal): bradicardia profunda, hipotensão transitória após injeção IV rápida, bloqueio atrioventricular, assistolia e parada cardiorrespiratória documentadas em bolus de 1 mg/kg (Rolfi & Chesnel 2026).',
    'Alterações comportamentais paradoxais: sedação profunda e letargia alternadas com episódios de hiperexcitabilidade, inquietação e comportamento frenético.',
    'Efeitos endócrinos por hiperprolactinemia: aumento de volume da cadeia mamária, galactorreia não puerperal, exacerbação de pseudociese e alterações no ciclo reprodutivo.',
    'Distúrbios gastrintestinais paradoxais: cólicas abdominais tipo espasmo decorrentes de hiperperistaltismo gástrico súbito, fezes amolecidas e diarreia aquosa transitória.',
  ],

  administration: [
    'Vias autorizadas: oral (VO), subcutânea (SC), intramuscular (IM) e intravenosa (IV lenta ou CRI).',
    'Via oral (VO): para maximizar o efeito pró-cinético e o esvaziamento gástrico das refeições, administrar preferencialmente 30 a 60 minutos ANTES da alimentação. Se o fármaco provocar náusea em jejum, fornecer com uma porção mínima de alimento úmido.',
    'Via subcutânea (SC): excelente alternativa para pacientes que estejam vomitando ativamente e ainda não possuam acesso venoso cateterizado; absorção rápida com pico plasmático em 15 a 30 minutos.',
    'Via intravenosa (IV): administrar LENTAMENTE (infusão fracionada ao longo de 5 a 15 minutos). NUNCA administrar em bolus rápido não diluído pelo risco cardiovascular e extrapiramidal.',
    'Infusão Contínua (CRI) em Bomba de Infusão: diluir a dose diária calculada (1 a 2 mg/kg/dia) em solução de NaCl 0,9%, Ringer Lactato ou SG 5%. Recomendado administrar em via venosa ou bomba de seringa dedicada para não vincular a taxa do fármaco às alterações da taxa de reposição hemodinâmica do paciente.',
    'Dose de Ataque para CRI (Modelagem Farmacocinética 2026): administrar dose de ataque lenta de 0,05 mg/kg IV (para CRI de 1 mg/kg/dia) ou 0,1 mg/kg IV (para CRI de 2 mg/kg/dia) imediatamente antes de iniciar a bomba, eliminando a janela de atraso de 3,25 horas até o steady state.',
    'Proteção contra a luz: proteger equipos e frascos de CRI da luz solar direta ou lâmpadas fototerápicas em infusões prolongadas (acima de 24 horas).',
  ],

  doses: [
    {
      id: 'dose-metoclo-dog-emesis-intermittent',
      species: 'dog',
      indication: 'Controle de vômitos agudos e gastroparesia funcional — regime intermitente hospitalar/ambulatorial',
      doseMin: 0.2,
      doseMax: 0.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO, SC, IM ou IV lenta',
      frequency: 'a cada 6 a 8 horas (ou q8–12h conforme gravidade)',
      duration: '3 a 5 dias conforme resolução do quadro emético',
      notes:
        'Dose de referência internacional do Plumb’s 10ª ed. (0,2 a 0,5 mg/kg) e BSAVA 10ª ed. (0,25 a 0,5 mg/kg q12h ou 0,17 a 0,33 mg/kg q8h). Administrar via oral 30 a 60 minutos antes da alimentação. Na administração IV, injetar estritamente de forma lenta em 5 a 10 minutos. Em cães com doença renal crônica avançada (IRIS 3–4), reduzir a dose em 50%.',
      calculatorEnabled: true,
      presentationId: 'pres-nausetrat-oral-5mgml',
      evidenceLevel: 'Plumb’s 10ª ed.; BSAVA 10ª ed.; Bula oficial Emeprid 2025',
    },
    {
      id: 'dose-metoclo-dog-cri-standard',
      species: 'dog',
      indication: 'Íleo funcional, gastroparesia e estase digestiva pós-cirúrgica — Infusão Contínua (CRI)',
      doseMin: 1.0,
      doseMax: 2.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg/dia',
      route: 'IV contínua (CRI)',
      frequency: 'infusão contínua em 24 horas (0,042 a 0,083 mg/kg/hora)',
      duration: '24 a 48 horas (reavaliar motilidade e ausculta de borborigmos)',
      notes:
        'Protocolo padrão ouro em terapia intensiva canina. Taxa horária: 1 mg/kg/dia equivale a 0,042 mg/kg/h; 2 mg/kg/dia equivale a 0,083 mg/kg/h. Para evitar o atraso de ~3,25 horas até o equilíbrio plasmático, administrar dose de ataque lenta imediatamente antes: 0,05 mg/kg IV (para CRI de 1 mg/kg/dia) ou 0,1 mg/kg IV (para CRI de 2 mg/kg/dia) segundo a modelagem PK de Martin-Flores et al. (2026). NUNCA usar ataque de 1 mg/kg pelo risco de assistolia.',
      calculatorEnabled: true,
      presentationId: 'pres-nausetrat-inj-5mgml',
      evidenceLevel: 'Modelagem Farmacocinética Martin-Flores et al. 2026; Coorte multicêntrica 2025 (n=300)',
    },
    {
      id: 'dose-metoclo-dog-parvovirus',
      species: 'dog',
      indication: 'Gastroenterite viral por Parvovírus canino (PVE) — protocolo de ensaio clínico',
      doseMin: 0.5,
      doseMax: 0.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta',
      frequency: 'a cada 8 horas (q8h)',
      duration: 'durante a fase de êmese ativa (3 a 5 dias)',
      notes:
        'Regime avaliado no ensaio clínico randomizado prospectivo de Yalcin & Keser (2017). Demonstrou redução significativa da gravidade dos vômitos comparável à ondansetrona e maropitant no modelo de parvovirose. Administrar sempre associado à fluidoterapia intensiva e correção hidroeletrolítica (especialmente potássio e glicose).',
      calculatorEnabled: false,
      evidenceLevel: 'Ensaio clínico prospectivo randomizado (Yalcin & Keser 2017)',
    },
    {
      id: 'dose-metoclo-dog-reflux-esophagitis',
      species: 'dog',
      indication: 'Refluxo gastroesofágico e esofagite erosiva — adjuvante de motilidade do EEI',
      doseMin: 0.2,
      doseMax: 0.4,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO ou SC',
      frequency: 'a cada 8 horas (q8h)',
      duration: '5 a 14 dias associado a inibidores de bomba de prótons',
      notes:
        'Atua elevando a pressão de repouso do esfíncter esofágico inferior (EEI) e acelerando a depuração ácida gastroduodenal. Administrar 30 minutos antes das refeições. Em esofagite grave, combinar com omeprazol/pantoprazol e sucralfato (separado em 1–2 horas). A evidência perioperatória em cirurgias de BOAS é conflitante (Rovatti et al. 2024 e Fraser 2026 não demonstraram benefício isolado).',
      calculatorEnabled: false,
      evidenceLevel: 'Plumb’s 10ª ed.; BSAVA 10ª ed.; Revisão crítica BOAS 2026',
    },
    {
      id: 'dose-metoclo-dog-lactation',
      species: 'dog',
      indication: 'Agalactia ou hipogalactia pós-parto em cadelas (estimulação de lactação via prolactina)',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'SC ou VO',
      frequency: 'a cada 12 horas (q12h)',
      duration: '5 a 7 dias até estabelecimento do fluxo lácteo',
      notes:
        'Indicação endócrina respaldada no bloqueio D2 adeno-hipofisário que remove a inibição da secreção de prolactina. Monitorar ativamente as glândulas mamárias para prevenir o desenvolvimento de mastite séptica ou estagnante. Garantir sucção vigorosa e suporte hidroeletrolítico e nutricional à nutriz.',
      calculatorEnabled: false,
      evidenceLevel: 'Plumb’s 10ª ed.; Papich 2020',
    },
    {
      id: 'dose-metoclo-cat-general',
      species: 'cat',
      indication: 'Vômitos, estase gástrica e refluxo em felinos — regime intermitente com monitoramento',
      doseMin: 0.17,
      doseMax: 0.33,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO, SC ou IV lenta',
      frequency: 'a cada 8 horas (ou 0,25 a 0,5 mg/kg q12h)',
      duration: '2 a 4 dias sob avaliação',
      notes:
        'Posologia oficial das diretrizes da BSAVA (10ª ed.) e bula europeia Emeprid 2025. ALERTA DE ESPÉCIE: o efeito antiemético central é significativamente menos confiável no gato do que no cão devido à baixa densidade de receptores D2 na CRTZ felina. Em gatos com pancreatite, DRC ou enteropatia, maropitant e ondansetrona são de primeira escolha. Monitorar rigorosamente manifestações neurocomportamentais (agitação e vocalização). NUNCA usar para megacólon felino.',
      calculatorEnabled: true,
      presentationId: 'pres-nausetrat-oral-5mgml',
      evidenceLevel: 'BSAVA 10ª ed.; Bula Emeprid 2025; Revisão fisiológica felina PMC10816764',
    },
    {
      id: 'dose-metoclo-cat-xylazine-exp',
      species: 'cat',
      indication: 'Êmese induzida por alfa-2 agonistas (xilazina) em felinos — modelo experimental',
      doseMin: 0.2,
      doseMax: 0.4,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IM',
      frequency: 'dose única administrada 45 a 60 minutos antes da xilazina',
      duration: 'dose pontual profilática',
      notes:
        'Avaliado no estudo experimental de Kolahian & Jarolmasjed (2010), comprovando que doses de 0,2 a 1,0 mg/kg IM reduzem significativamente a frequência de êmese induzida por alfa-2 agonistas em gatos saudáveis, demonstrando que a droga é capaz de modular vias eméticas periféricas/autonômicas específicas na espécie.',
      calculatorEnabled: false,
      evidenceLevel: 'Ensaio farmacológico controlado (Kolahian & Jarolmasjed 2010)',
    },
  ],

  presentations: [
    {
      id: 'pres-nausetrat-oral-5mgml',
      name: 'Nausetrat® 5 mg/mL Solução Oral Frasco 20 mL com Conta-gotas (UCBVET)',
      brand: 'Nausetrat® (UCBVET Saúde Animal)',
      form: 'solução oral',
      concentrationValue: 5,
      concentrationUnit: 'mg/mL',
      packInfo:
        'Frasco plástico conta-gotas contendo 20 mL de solução oral límpida incolor a amarelada. Calibração oficial da bula UCBVET: 1 gota ≈ 0,1 mg de metoclopramida (1 mL = cerca de 50 gotas).',
      route: 'VO',
      dropsPerMl: 50,
      channel: 'veterinary',
      commercialProductSlug: 'nausetrat-oral-ucbvet',
      commercialType: 'Veterinário registrado no MAPA',
      packageDescription:
        'Cada 100 mL contém cloridrato de metoclopramida 500 mg (5 mg/mL) e veículo q.s.p. 100 mL. Bula rotulada para cães e gatos.',
      calculatedMlPerKgFormula: '0.05 mL/kg para dose de 0,25 mg/kg (ou 1 a 4 gotas/kg q8h)',
    },
    {
      id: 'pres-nausetrat-inj-5mgml',
      name: 'Nausetrat® Injetável 5 mg/mL Frasco-ampola 10 mL (UCBVET)',
      brand: 'Nausetrat® Injetável (UCBVET Saúde Animal)',
      form: 'solução injetável',
      concentrationValue: 5,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco-ampola de vidro âmbar contendo 10 mL de solução injetável estéril a 5 mg/mL.',
      route: 'SC, IM ou IV lenta / CRI',
      channel: 'veterinary',
      commercialProductSlug: 'nausetrat-injetavel-ucbvet',
      commercialType: 'Veterinário registrado no MAPA',
      packageDescription:
        'Cada 1 mL contém 5 mg de cloridrato de metoclopramida. Indicado para uso parenteral hospitalar em cães e gatos.',
      calculatedMlPerKgFormula: '0.05 mL/kg para dose de 0,25 mg/kg; 0,1 mL/kg para 0,5 mg/kg',
    },
    {
      id: 'pres-plasil-comp-10mg',
      name: 'Plasil® / Metoclopramida 10 mg Comprimidos Revestidos (Sanofi / Genéricos)',
      brand: 'Plasil® (Sanofi) / Genéricos Eurofarma, EMS, Medley',
      form: 'comprimido',
      concentrationValue: 10,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Blísteres com 20 comprimidos brancos sulcados.',
      route: 'VO',
      channel: 'human_pharmacy',
      commercialType: 'Uso Humano Extrabula no Brasil',
      packageDescription: 'Cada comprimido contém 10 mg de cloridrato de metoclopramida anidro.',
      scoringInfo: 'Comprimido sulcado; permite divisão em metades de 5 mg para cães de médio e grande porte.',
    },
    {
      id: 'pres-plasil-gotas-4mgml',
      name: 'Plasil® Gotas Pediátricas 4 mg/mL Frasco 20 mL (Sanofi / Genéricos)',
      brand: 'Plasil® Gotas (Sanofi / Genéricos)',
      form: 'solução gotas oral',
      concentrationValue: 4,
      concentrationUnit: 'mg/mL',
      packInfo:
        'Frasco conta-gotas de 20 mL a 4 mg/mL. ATENÇÃO À CALIBRAÇÃO HUMANA: 21 gotas equivalem a 1 mL (1 gota ≈ 0,19 mg de metoclopramida).',
      route: 'VO',
      dropsPerMl: 21,
      channel: 'human_pharmacy',
      commercialType: 'Uso Humano Extrabula no Brasil',
      packageDescription:
        'Solução oral contendo 4 mg de cloridrato de metoclopramida por mL. Quase o dobro de concentração por gota comparado ao Nausetrat veterinário.',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção gastrintestinal rápida e quase completa no cão e gato após administração oral, alcançando concentrações plasmáticas máximas (Tmax) entre 1 e 2 horas em cães em jejum (bula Nausetrat® cita ~2 horas para formulação líquida). Contudo, a biodisponibilidade oral absoluta (F) situa-se em torno de 50% em cães (faixa de 45% a 55%), decorrente de extenso metabolismo pré-sistêmico de primeira passagem hepático e intestinal. Pela via subcutânea (SC) e intramuscular (IM), a absorção é rápida e altamente previsível, atingindo Cmax em aproximadamente 15 a 30 minutos em pequenos animais.',
    distribution:
      'Volume de distribuição aparente amplo em pequenos animais (Vd estimado de 1,5 a 3,5 L/kg em carnívoros domésticos), indicando ampla captação tecidual extravascular em órgãos parenquimatosos, mucosa gastrintestinal e bile. A taxa de ligação a proteínas plasmáticas é relativamente baixa (inferior a 20% a 30% em humanos e mamíferos). Por ser uma base lipofílica fraca (pKa ~9,3, LogP ~2,6), a metoclopramida ultrapassa prontamente a barreira hematoencefálica (BHE) e atinge concentrações ativas no parênquima cerebral, líquido cefalorraquidiano, substância negra e gânglios da base, além de transpassar livremente a barreira placentária e ser excretada no leite materno.',
    metabolism:
      'Biotransformação predominantemente hepática dependente de enzimas microssomais do citocromo P450 (incluindo CYP2D) e vias de conjugação tecidual, sofrendo N-desalquilação oxidativa, hidrólise e conjugação secundária com glicuronídeo e sulfato, gerando metabólitos polares inativos (incluindo monodesetilmetoclopramida). Na espécie felina, o metabolismo hepático é conservado e não exibe toxicidade peculiar dependente de deficiência de glicuronidação específica para essa molécula.',
    elimination:
      'A eliminação corporal é majoritariamente renal. Em cães com função renal normal, cerca de 65% a 70% da dose administrada é excretada pela urina nas primeiras 24 horas, distribuída entre fármaco inalterado livre (cerca de 20% a 30%) e metabólitos conjugados polares. A depuração biliar/fecal responde pelos 15% a 20% restantes. A meia-vida de eliminação plasmática terminal (t1/2) em cães e gatos é muito curta, oscilando entre 0,8 e 2,0 horas (média de 0,87 ± 0,17 h em Beagles por Kenward et al. 2017). Essa eliminação rápida justifica a necessidade de dosagens frequentes (q6–8h) ou infusão intravenosa contínua (CRI). Em pacientes nefropatas (IRIS 3–4), a depuração diminui substancialmente e a meia-vida pode quadriplicar, exigindo redução posológica obrigatória.',
    cnsPenetration:
      'Elevada penetração transmembrana na barreira hematoencefálica e distribuição livre na CRTZ e gânglios da base, explicando a eficácia antiemética e a vulnerabilidade a distonias extrapiramidais.',
    halfLife: 'Cães: 0,87 a 2,0 horas (~1 h); Gatos: aproximadamente 0,9 a 2,2 horas.',
    plasmaBinding: 'Baixa ligação proteica (estimada em <30% em mamíferos).',
  },

  practicalWeightTable: {
    standardDoseText:
      'Calibrador prático para a dose padrão de 0,25 mg/kg (dose intermediária entre 0,2 e 0,5 mg/kg q8h). Fórmula para solução veterinária 5 mg/mL (Nausetrat®): Peso (kg) × 0,05 = Volume em mL. Regra do conta-gotas Nausetrat (1 gota ≈ 0,1 mg): Peso (kg) × 2,5 = Número de gotas por tomada (ou 1 a 4 gotas/kg conforme bula).',
    headers: [
      'Peso Corporal',
      'Dose (0,25 mg/kg)',
      'Nausetrat 5 mg/mL (mL)',
      'Nausetrat Gotas (~0,1 mg/g)',
      'Plasil Gotas 4 mg/mL (~0,19 mg/g)',
      'Comprimidos 10 mg',
    ],
    rows: [
      {
        weight: '2 kg',
        totalDose: '0,5 mg',
        col1: '0,1 mL',
        col2: '5 gotas',
        col3: '2 a 3 gotas',
        col4: 'Inviável (usar gotas)',
      },
      {
        weight: '3 kg',
        totalDose: '0,75 mg',
        col1: '0,15 mL',
        col2: '7 a 8 gotas',
        col3: '4 gotas',
        col4: 'Inviável (usar gotas)',
      },
      {
        weight: '4 kg',
        totalDose: '1,0 mg',
        col1: '0,2 mL',
        col2: '10 gotas',
        col3: '5 gotas',
        col4: 'Inviável (usar gotas)',
      },
      {
        weight: '5 kg',
        totalDose: '1,25 mg',
        col1: '0,25 mL',
        col2: '12 a 13 gotas',
        col3: '6 a 7 gotas',
        col4: 'Inviável (usar gotas)',
      },
      {
        weight: '7,5 kg',
        totalDose: '1,88 mg',
        col1: '0,38 mL',
        col2: '18 a 19 gotas',
        col3: '10 gotas',
        col4: 'Inviável (usar gotas)',
      },
      {
        weight: '10 kg',
        totalDose: '2,5 mg',
        col1: '0,5 mL',
        col2: '25 gotas',
        col3: '13 gotas',
        col4: '1/4 comprimido de 10 mg',
      },
      {
        weight: '15 kg',
        totalDose: '3,75 mg',
        col1: '0,75 mL',
        col2: '37 a 38 gotas',
        col3: '20 gotas',
        col4: 'Usar solução oral líquida',
      },
      {
        weight: '20 kg',
        totalDose: '5,0 mg',
        col1: '1,0 mL',
        col2: '50 gotas (1 mL)',
        col3: '26 gotas',
        col4: '1/2 comprimido de 10 mg',
      },
      {
        weight: '30 kg',
        totalDose: '7,5 mg',
        col1: '1,5 mL',
        col2: '75 gotas (1,5 mL)',
        col3: '40 gotas',
        col4: '3/4 comp. ou solução',
      },
      {
        weight: '40 kg',
        totalDose: '10,0 mg',
        col1: '2,0 mL',
        col2: '100 gotas (2 mL)',
        col3: '52 gotas',
        col4: '1 comprimido inteiro de 10 mg',
      },
    ],
    dropletCalibrator: {
      title: 'Diferença Crítica entre Gotejadores de Metoclopramida',
      concentration: 'Nausetrat 5 mg/mL (50 gts/mL) vs Plasil 4 mg/mL (21 gts/mL)',
      dropletRatio: 'Nausetrat = ~0,1 mg por gota | Plasil = ~0,19 mg por gota',
      practicalRule:
        'Para administrar 2,5 mg (cão de 10 kg na dose de 0,25 mg/kg): prescrevem-se 25 gotas de Nausetrat OU apenas 13 gotas de Plasil. Confundir os frascos dobra a dose do animal.',
      note: 'Sempre prescrever o volume em mililitros e indicar o nome comercial específico para evitar erros de dispensação.',
    },
  },

  samplePrescriptionText:
    'RECEITUÁRIO SIMPLES DE USO VETERINÁRIO (MEDICAMENTO NÃO CONTROLADO)\n' +
    'EMITIDO EM 1 VIA PARA DISPENSAÇÃO EM FARMÁCIA VETERINÁRIA OU COMERCIAL\n\n' +
    'CLÍNICA VETERINÁRIA [NOME DA CLÍNICA] — Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\n' +
    'Endereço: [Logradouro, Bairro, Cidade, UF] — Tel: [(XX) XXXXX-XXXX]\n\n' +
    'PACIENTE: [Nome do Cão/Gato], Espécie: [Canina/Felina], Raça: [Raça], Sexo: [M/F], Peso: [10,0 kg]\n' +
    'TUTOR: [Nome Completo do Tutor], CPF: [000.000.000-00], Endereço: [Logradouro, Cidade, UF]\n\n' +
    'PRESCRIÇÃO:\n' +
    'OPÇÃO 1 (PRODUTO VETERINÁRIO LÍQUIDO — NAUSETRAT 5 mg/mL):\n' +
    '1. NAUSETRAT® 5 mg/mL solução oral --------------------------------------- 1 frasco conta-gotas de 20 mL\n' +
    '   Posologia: Administrar 0,5 mL (ou 25 gotas do frasco original, equivalente a 2,5 mg na dose de 0,25 mg/kg) por via oral a cada 8 horas, preferencialmente 30 a 45 minutos antes das refeições, durante 3 a 5 dias consecutivos.\n\n' +
    'OPÇÃO 2 (INFUSÃO CONTÍNUA HOSPITALAR CRI EM CÃO DE 10 kg — DOSE 2 mg/kg/dia):\n' +
    '1. CLORIDRATO DE METOCLOPRAMIDA 5 mg/mL injetável ------------------------- 1 ampola de 10 mL\n' +
    '   Protocolo de Infusão Hospitalar:\n' +
    '   a) Dose de Ataque Lenta (0,1 mg/kg): aspirar 0,2 mL (1,0 mg) e infundir por via intravenosa estritamente lenta ao longo de 10 minutos.\n' +
    '   b) Taxa de Manutenção em Bomba de Seringa (2 mg/kg/dia = 0,833 mg/h): infundir a solução concentrada a 0,167 mL/h (equivalente a 20 mg em 24 horas), em equipo protegido da luz.\n\n' +
    'OPÇÃO 3 (COMPRIMIDOS HUMANOS DE 10 mg PARA CÃES ACIMA DE 20 kg):\n' +
    '1. PLASIL® (ou Metoclopramida Genérica) 10 mg comprimidos ----------------- 1 caixa com 20 comprimidos\n' +
    '   Posologia (para cão de 20 kg): Fornecer 1/2 comprimido (5,0 mg na dose de 0,25 mg/kg) por via oral a cada 8 horas, 30 minutos antes do alimento, por 3 a 5 dias.\n\n' +
    'ALERTAS OBRIGATÓRIOS AO PROPRIETÁRIO:\n' +
    '- Não administrar caso haja suspeita de que o animal tenha engolido ossos, brinquedos, pedras ou outros corpos estranhos.\n' +
    '- Se o animal apresentar tremores musculares, inquietação intensa, andar compulsivo, rigidez de pescoço ou agitação, suspender a medicação imediatamente e retornar ao hospital veterinário.\n' +
    '- Não redosar caso o animal vomite imediatamente após a administração sem orientação veterinária.\n\n' +
    '[Localidade - UF], [Data do Atendimento]\n' +
    '________________________________________________________\n' +
    'Dr(a). [Nome do Médico Veterinário] — CRMV-[UF] nº [XXXXX]',

  clinicalStudiesCommented: [
    {
      title:
        'Comparative efficacy of maropitant and selected drugs in preventing emesis induced by centrally or peripherally acting emetogens in dogs',
      authorsYear: 'Sedlacek et al. (2008)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics',
      studyDesign: 'Ensaio clínico cruzado experimental controlado em cães Beagle',
      sampleSize: 'Cães Beagle saudáveis desafiados com emetógenos centrais e periféricos',
      mainFindings:
        'Avaliou a eficácia antiemética de maropitant, metoclopramida, clorpromazina e ondansetrona diante de estímulos periféricos viscerais (sulfato de cobre oral) e estímulos centrais na CRTZ (apomorfina). O maropitant bloqueou 100% dos vômitos centrais e periféricos. A metoclopramida demonstrou proteção razoável contra estímulos dopaminérgicos centrais da apomorfina, porém falhou significativamente no controle de vômitos intensos por irritação mucosal visceral periférica.',
      clinicalTakeaway:
        'Comprova que a metoclopramida não é um antiemético universal de amplo espectro; pacientes que continuam vomitando sob metoclopramida frequentemente sofrem de estímulos vagais/serotoninérgicos viscerais que exigem antagonistas NK1 ou 5-HT3.',
      referenceId: 'ref-meto-sedlacek-2008',
    },
    {
      title:
        'Comparative efficacy of metoclopramide, ondansetron and maropitant in preventing parvoviral enteritis-induced emesis in dogs',
      authorsYear: 'Yalcin & Keser (2017)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics',
      studyDesign: 'Ensaio clínico prospectivo randomizado controlado',
      sampleSize: '32 cães filhotes acometidos por enterite parvoviral aguda (8 animais por grupo)',
      mainFindings:
        'Comparou metoclopramida (0,5 mg/kg IV q8h), ondansetrona (0,5 mg/kg IV q8h), maropitant (1 mg/kg SC q24h) e controle. Os três agentes antieméticos ativos promoveram reduções estatisticamente significativas nos escores de gravidade e frequência diária de vômito a partir do 1º e 3º dias de internação, sem diferença significativa de eficácia global entre os três fármacos ativos naquele modelo clínico específico.',
      clinicalTakeaway:
        'Sustenta a metoclopramida como uma alternativa terapêutica de baixo custo e legítima no manejo antiemético hospitalar da parvovirose canina, embora maropitant e ondansetrona ofereçam maior facilidade posológica e ausência de risco extrapiramidal.',
      referenceId: 'ref-meto-yalcin-2017',
    },
    {
      title:
        'Anti-nausea effects and pharmacokinetics of ondansetron, maropitant and metoclopramide in a low-dose cisplatin model of nausea and vomiting in the dog: a blinded crossover study',
      authorsYear: 'Kenward et al. (2017)',
      journal: 'BMC Veterinary Research',
      studyDesign: 'Estudo experimental randomizado, cruzado (crossover), cego e controlado',
      sampleSize: '8 cães da raça Beagle submetidos a desafio emetogênico por cisplatina',
      mainFindings:
        'Investigou separadamente os desfechos de vômito e náusea comportamental induzidos por cisplatina em cães tratados com metoclopramida (0,5 mg/kg), ondansetrona (0,5 mg/kg), maropitant (1 mg/kg) ou placebo. Enquanto ondansetrona e maropitant preveniram completamente os episódios de vômito (0 vômitos vs média de 7 no placebo), a metoclopramida NÃO reduziu significativamente nem a frequência de êmese nem os escores de náusea. A ondansetrona reduziu a área sob a curva (AUC) da náusea em 90% e o maropitant em 25%.',
      clinicalTakeaway:
        'Demonstra categoricamente que interromper o vômito não equivale a tratar a náusea subjetiva, e que a metoclopramida é ineficaz para náusea e êmese decorrentes de quimioterapia altamente citotóxica mediada por serotonina.',
      referenceId: 'ref-meto-kenward-2017',
    },
    {
      title:
        'A comparison between maropitant and metoclopramide for the prevention of morphine-induced nausea and vomiting in dogs',
      authorsYear: 'Lorenzutti et al. (2017)',
      journal: 'Canadian Veterinary Journal',
      studyDesign: 'Ensaio clínico prospectivo randomizado duplo-cego',
      sampleSize: '63 cães saudáveis recebendo premedicação anestésica com morfina',
      mainFindings:
        'Os cães receberam maropitant (1 mg/kg SC), metoclopramida (0,5 mg/kg SC) ou placebo 45 minutos antes da morfina. A incidência de vômito foi de 71% no grupo placebo, 38% no grupo metoclopramida e 0% no grupo maropitant. A metoclopramida atenuou a frequência de êmese frente ao controle, porém o maropitant demonstrou superioridade absoluta e estatisticamente significativa na prevenção da êmese induzida por opioides.',
      clinicalTakeaway:
        'Mostra que a metoclopramida possui atividade contra êmese por morfina, mas é clinicamente superada pelo bloqueio de substância P/NK1 do maropitant.',
      referenceId: 'ref-meto-lorenzutti-2017',
    },
    {
      title: 'Influence of metoclopramide on gastroesophageal reflux in anesthetized dogs',
      authorsYear: 'Wilson et al. (2006)',
      journal: 'American Journal of Veterinary Research',
      studyDesign: 'Ensaio prospectivo controlado em cães sob anestesia geral inalatória',
      sampleSize: '52 cães submetidos a cirurgias ortopédicas eletivas',
      mainFindings:
        'Avaliou a ocorrência de refluxo gastroesofágico (GER) monitorado por sensor de pH esofágico contínuo. Apenas o regime de alta dose (bolus IV de 1,0 mg/kg seguido de CRI de 1,0 mg/kg/h) reduziu significativamente o risco relativo de refluxo ácido esofágico em 54%. Doses baixas habituais não promoveram proteção estatisticamente significativa.',
      clinicalTakeaway:
        'Estudo histórico seminal que embasou o uso de altas doses perioperatórias; contudo, à luz dos relatos de 2026 de assistolia e bradicardia severa por bolus de 1 mg/kg, o protocolo em bolus alto deve ser evitado na rotina contemporânea.',
      referenceId: 'ref-meto-wilson-2006',
    },
    {
      title:
        'Addition of a metoclopramide constant rate infusion to prevent ptyalism, regurgitation and vomiting in brachycephalic dogs undergoing spinal surgery',
      authorsYear: 'Rovatti et al. (2024)',
      journal: 'Veterinary Anaesthesia and Analgesia',
      studyDesign: 'Ensaio clínico randomizado, controlado por placebo, cego',
      sampleSize: '43 cães de raças braquicefálicas submetidos a cirurgia de coluna vertebral',
      mainFindings:
        'Todos os cães receberam protocolo padrão com maropitant e pantoprazol; metade recebeu adicionalmente CRI de metoclopramida (2 mg/kg/dia) e a outra metade placebo salino. A incidência de regurgitação pós-operatória foi idêntica (3 cães em cada grupo; OR 0,76; p = 0,76), assim como a taxa de vômito e ptialismo.',
      clinicalTakeaway:
        'Comprova a ausência de benefício clínico da adição empírica de CRI de metoclopramida na prevenção de refluxo e regurgitação em cães braquicefálicos que já recebem terapia com maropitant e inibidor de bomba de prótons.',
      referenceId: 'ref-meto-rovatti-2024',
    },
    {
      title:
        'Bolus and infusions of metoclopramide: insights on benefits and risks from pharmacokinetic modelling',
      authorsYear: 'Martin-Flores, Lorenzutti & Pelligand (2026)',
      journal: 'Journal of Small Animal Practice',
      studyDesign: 'Modelagem farmacocinética e simulação populacional avançada em cães',
      sampleSize: 'População simulada baseada em perfis de disposição de ensaios caninos validados',
      mainFindings:
        'Demonstrou que a infusão contínua (CRI) de metoclopramida iniciada sem dose de ataque demora aproximadamente 3,25 horas para alcançar a concentração plasmática mínima eficaz. Simulações computacionais revelaram que doses de ataque conservadoras e seguras de 0,05 mg/kg IV (para CRI de 1 mg/kg/dia) e 0,1 mg/kg IV (para CRI de 2 mg/kg/dia) produzem níveis terapêuticos estáveis imediatos sem atingir picos supraterapêuticos associados a arritmias.',
      clinicalTakeaway:
        'Mudança de paradigma fundamental para 2026: permite o início rápido e eficaz da CRI hospitalar eliminando o atraso de mais de 3 horas, sem a necessidade perigosa de administrar bolus históricos de 0,4 a 1,0 mg/kg.',
      referenceId: 'ref-meto-martin-flores-2026',
    },
    {
      title: 'Severe bradycardia and asystole in a dog after intravenous metoclopramide injection',
      authorsYear: 'Rolfi & Chesnel (2026)',
      journal: 'Veterinary Anaesthesia and Analgesia',
      studyDesign: 'Relato de caso clínico de farmacovigilância e revisão mecanística',
      sampleSize: 'Cão da raça Bulldog Inglês, 5 meses de idade, anestesiado',
      mainFindings:
        'Descreve o desenvolvimento súbito de bradicardia extrema (<4 bpm) culminando em assistolia ventricular e parada cardiorrespiratória imediatamente após a administração de um bolus intravenoso de metoclopramida de 1 mg/kg. O animal recuperou a circulação espontânea após manobras imediatas de RCP e administração de atropina.',
      clinicalTakeaway:
        'Sinal de alerta emergente que contraindica terminantemente a injeção em bolus rápido de 1 mg/kg em pequenos animais, especialmente sob anestesia ou em raças braquicefálicas com alto tônus vagal basal.',
      referenceId: 'ref-meto-rolfi-2026',
    },
    {
      title: 'Effects of metoclopramide on emesis in cats sedated with xylazine hydrochloride',
      authorsYear: 'Kolahian & Jarolmasjed (2010)',
      journal: 'Journal of Feline Medicine and Surgery',
      studyDesign: 'Ensaio farmacológico experimental prospectivo controlado em felinos',
      sampleSize: 'Gatos domésticos saudáveis desafiados com xilazina',
      mainFindings:
        'Avaliou doses intramusculares de 0,2; 0,4; 0,6; 0,8 e 1,0 mg/kg de metoclopramida administradas 60 minutos antes da xilazina. Todas as doses testadas reduziram de forma estatisticamente significativa a incidência e o número de episódios eméticos nos felinos em comparação com o grupo controle.',
      clinicalTakeaway:
        'Evidencia que, embora a metoclopramida seja menos confiável contra estímulos centrais espontâneos no gato, possui capacidade de bloquear vias eméticas viscerais periféricas induzidas por agonistas alfa-2 adrenérgicos.',
      referenceId: 'ref-meto-kolahian-2010',
    },
  ],

  attentionData: {
    attentionSubtitle:
      'Alerta cardiovascular contra bolus rápido de 1 mg/kg, contraindicação formal em obstrução GI mecânica, reações extrapiramidais e ajustes na insuficiência renal avançada',
    precautions: [
      {
        condition: 'Administração intravenosa em bolus rápido ou doses elevadas (>= 1 mg/kg IV)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A injeção intravenosa rápida promove pico plasmático agudo com bloqueio de canais iônicos miocárdicos e hiperestimulação parassimpática vagal mediada por acetilcolina e reflexos serotoninérgicos, podendo deflagrar bradicardia profunda, hipotensão acentuada, assistolia e parada cardiorrespiratória (Rolfi & Chesnel 2026).',
        clinicalAction:
          'NUNCA administrar em bolus rápido. Administrar sempre diluído e infundido lentamente em pelo menos 10 a 15 minutos, ou por infusão contínua (CRI) com dose de ataque de no máximo 0,05 a 0,1 mg/kg IV lenta.',
      },
      {
        condition: 'Obstrução gastrointestinal mecânica, corpo estranho ou intussuscepção',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Ao ativar receptores 5-HT4 e desinibir a liberação de acetilcolina entérica, a metoclopramida amplifica a força das contrações peristálticas antrais e duodenais. Contra uma estenose ou obstrução luminal fixa, o aumento da pressão hidrostática intraluminal pode precipitar isquemia da parede visceral, necrose transmural e rotura intestinal com peritonite séptica.',
        clinicalAction:
          'Descartar obrigatoriamente obstruções mecânicas por palpação minuciosa, ultrassonografia abdominal ou radiografia contrastada antes de administrar o fármaco.',
      },
      {
        condition: 'Epilepsia idiopática e distúrbios neurológicos convulsivos',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A metoclopramida penetra eficientemente no SNC e antagoniza receptores dopaminérgicos centrais D2 no corpo estriado e córtex, alterando o limiar epileptogênico e predispondo a crises convulsivas e exacerbação de descargas paroxísticas.',
        clinicalAction:
          'Evitar o uso em animais epilépticos ou com histórico de crises; optar por antieméticos centrais seguros sem efeito pró-convulsivante como maropitant ou ondansetrona.',
      },
      {
        condition: 'Doença Renal Crônica avançada (IRIS 3 e 4) e Injúria Renal Aguda (IRA)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Aproximadamente 65% a 70% do fármaco e seus metabólitos são depurados por via renal. A queda acentuada da taxa de filtração glomerular prolonga a meia-vida sérica de ~1 h para até 8 a 12 horas, gerando acúmulo contínuo e precipitando discinesias extrapiramidais e prostração.',
        clinicalAction:
          'Reduzir a dose diária total em 50% ou ampliar o intervalo entre administrações (q12h ou q24h) em cães e gatos com insuficiência renal acentuada.',
      },
      {
        condition: 'Animais da espécie felina recebendo a medicação por via parenteral',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Gatos são mais vulneráveis a distúrbios neurocomportamentais induzidos pelo bloqueio D2 central, manifestando inquietação, vocalização estridente, miados contínuos e desorientação acatisia-like.',
        clinicalAction:
          'Utilizar as menores doses eficazes (0,17 a 0,33 mg/kg) e monitorar o comportamento; caso ocorra agitação extrema, suspender o medicamento e intervir com difenidramina.',
      },
    ],

    drugInteractionsDetailed: [
      {
        drugOrClass: 'Fármacos anticolinérgicos e antimuscarínicos (Atropina, Escopolamina, Glicopirrolato)',
        severity: 'major',
        clinicalEffect:
          'Anulação completa do efeito pró-cinético da metoclopramida sobre o estômago e intestino delgado.',
        pharmacologicalMechanism:
          'Antagonismo farmacodinâmico direto: a metoclopramida atua liberando acetilcolina que estimula receptores muscarínicos M3; os antimuscarínicos bloqueiam competitivamente esses receptores na musculatura lisa.',
      },
      {
        drugOrClass: 'Sedativos fenotiazínicos (Acepromazina, Clorpromazina)',
        severity: 'contraindicated',
        clinicalEffect:
          'Potencialização extrema de reações extrapiramidais, tremores musculares intensos, ataxia, hipotensão e colapso psicomotor.',
        pharmacologicalMechanism:
          'Bloqueio dopaminérgico D2 sinérgico e aditivo nos gânglios da base e na via nigroestriatal do SNC.',
      },
      {
        drugOrClass: 'Opioides agonistas mu (Morfina, Metadona, Fentanil, Meperidina)',
        severity: 'moderate',
        clinicalEffect:
          'Antagonismo do efeito pró-cinético gastrintestinal e potencialização da depressão do sistema nervoso central.',
        pharmacologicalMechanism:
          'Os opioides diminuem o peristaltismo gastrintestinal e aumentam a resistência esfincteriana, exercendo efeito oposto à metoclopramida.',
      },
      {
        drugOrClass: 'Mirtazapina e Antidepressivos Inibidores da Recaptação de Serotonina (ISRS)',
        severity: 'major',
        clinicalEffect:
          'Aumento substancial do risco de distonias extrapiramidais e potencial deflagração de Síndrome Serotoninérgica.',
        pharmacologicalMechanism:
          'Interações complexas em vias serotoninérgicas e dopaminérgicas estriatais; associação frequente em gatos inapetentes que exige cautela redobrada.',
      },
      {
        drugOrClass: 'Tramadol',
        severity: 'major',
        clinicalEffect:
          'Redução acentuada do limiar convulsivo com aumento do risco de crises epilépticas e mioclonias.',
        pharmacologicalMechanism:
          'Efeito inibitório conjunto sobre vias dopaminérgicas e inibição da recaptação de monoaminas pelo tramadol.',
      },
      {
        drugOrClass: 'Agonistas dopaminérgicos (Cabergolina, Bromocriptina)',
        severity: 'contraindicated',
        clinicalEffect:
          'Neutralização mútua dos efeitos terapêuticos de ambos os fármacos.',
        pharmacologicalMechanism:
          'Competição antagônica recíproca pelos mesmos sítios de ligação nos receptores D2 periféricos e hipofisários.',
      },
      {
        drugOrClass: 'Insulina regular ou de ação intermediária/lenta',
        severity: 'minor',
        clinicalEffect:
          'Alteração no tempo de absorção de carboidratos e pico de glicemia pós-prandial.',
        pharmacologicalMechanism:
          'A aceleração do esvaziamento gástrico antecipa a chegada dos nutrientes ao duodeno, podendo exigir reajuste no sincronismo da aplicação da insulina.',
      },
    ],

    adverseEffectsDetailed: [
      {
        effect: 'Reações extrapiramidais (distonia, tremores, rigidez e acatisia)',
        frequency: 'uncommon',
        mechanism:
          'Bloqueio competitivo D2 nos receptores dopaminérgicos dos gânglios da base com predomínio colinérico relativo na via nigroestriatal.',
        clinicalManagement:
          'Suspender o fármaco imediatamente. Administrar difenidramina na dose de 2,2 mg/kg IV lenta ou IM para restaurar o equilíbrio colinérgico central; ambiente calmo e escuro.',
      },
      {
        effect: 'Bradicardia extrema e parada cardiorrespiratória por bolus IV rápido',
        frequency: 'rare',
        mechanism:
          'Bloqueio súbito de canais iônicos de sódio miocárdicos e hiperestimulação parassimpática vagal colinérgica (Rolfi & Chesnel 2026).',
        clinicalManagement:
          'Iniciar imediatamente suporte de RCP; administrar atropina (0,02 a 0,04 mg/kg IV) e suporte ventilatório.',
      },
      {
        effect: 'Agitação comportamental e vocalização em felinos',
        frequency: 'common',
        mechanism:
          'Efeito paradoxal no SNC por modulação monoaminérgica em gatos sensíveis.',
        clinicalManagement:
          'Suspender a medicação. Se necessário, intervir com suporte sedativo leve ou difenidramina.',
      },
      {
        effect: 'Cólicas abdominais, borborigmos e diarreia transitória',
        frequency: 'common',
        mechanism:
          'Aumento agudo da atividade contrátil propulsiva gastroduodenal mediado por facilitação colinérgica.',
        clinicalManagement:
          'Administrar junto a uma pequena quantidade de alimento e reduzir a velocidade de injeção parenteral.',
      },
    ],

    doseReductionGuidelines: [
      {
        clinicalCondition: 'Doença Renal Crônica Estágios IRIS 3 e 4 ou Oligúria',
        recommendedAdjustment:
          'Reduzir a dose diária total em 50% ou ampliar o intervalo posológico para a cada 12 a 24 horas.',
        physiologicalRationale:
          'Depuração renal acentuadamente comprometida; cerca de 70% do fármaco é eliminado inalterado ou como metabólitos ativos pela urina, gerando meia-vida prolongada e risco neurológico.',
      },
      {
        clinicalCondition: 'Insuficiência Hepática Grave com Perda de Função Sintética',
        recommendedAdjustment:
          'Reduzir a dose em 25% a 50% e monitorar sedação.',
        physiologicalRationale:
          'Diminuição da taxa de biotransformação microssomal e do clearance de primeira passagem hepático.',
      },
      {
        clinicalCondition: 'Pacientes Idosos Geriátricos com Comorbidades Múltiplas',
        recommendedAdjustment:
          'Iniciar na faixa inferior de dose (0,2 mg/kg q8h) e titular conforme resposta e monitoramento de hidratação.',
        physiologicalRationale:
          'Declínio fisiológico senil na filtração glomerular e massa hepática funcional.',
      },
    ],
  },

  generalInfoData: {
    pharmacologicalClassification: {
      chemicalClass: 'Benzamida substituída / ortopramida',
      chemicalClassDescription:
        'Derivado do ácido benzóico substituído contendo grupos amino e cloro com cadeia lateral dietilaminoetilamida, conferindo caráter básico (pKa ~9,3) e lipofilicidade moderada (LogP ~2,6).',
      therapeuticClass: 'Antiemético central e estimulante da motilidade gastrointestinal (pró-cinético)',
      atcCode: 'A03FA01',
      receptorTargets: [
        'Receptor Dopaminérgico D2 (antagonista)',
        'Receptor Dopaminérgico D3 (antagonista)',
        'Receptor Serotoninérgico 5-HT4 (agonista)',
        'Receptor Serotoninérgico 5-HT3 (antagonista fraco)',
      ],
    },
    prescriptionType: {
      category: 'Medicamento de Venda sob Prescrição Veterinária (Receituário Simples)',
      ordinanceOrLaw: 'Sem enquadramento em listas de controle especial MAPA ou Portaria SVS/MS nº 344/98.',
      retentionRequired: false,
      guidelines:
        'Prescrever em receituário simples em via única para aquisição em farmácias veterinárias ou humanas.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Excelente resposta antiemética central e dependência da dopamina',
        description:
          'A CRTZ canina possui alta densidade de receptores D2, tornando a metoclopramida um antiemético confiável para êmese de origem urêmica ou tóxica; contudo, bolus IV de 1 mg/kg acarreta risco de assistolia.',
        clinicalImplications:
          'Manter doses baixas em bolus e titular em CRI de 1 a 2 mg/kg/dia com dose de ataque de 0,05 a 0,1 mg/kg IV.',
      },
      {
        species: 'cat',
        title: 'Menor eficácia antiemética central e risco aumentado de agitação',
        description:
          'O centro emético felino depende menos de D2 do que o cão; além disso, gatos apresentam maior propensão a inquietação e reações comportamentais paradoxais.',
        clinicalImplications:
          'Priorizar maropitant ou ondansetrona para êmese felina; reservar metoclopramida para hipomotilidade proximal.',
      },
    ],
    curiositiesAndHistory: [
      'A metoclopramida foi sintetizada na França na década de 1960 pelo Dr. Justin-Besançon e colaboradores, revolucionando a medicina humana como um dos primeiros fármacos pró-cinéticos que aceleravam o esvaziamento gástrico sem produzir diarreia colônica.',
      'Durante muitos anos, foi o antiemético mais prescrito do mundo em medicina veterinária de pequenos animais, até a introdução dos antagonistas 5-HT3 (ondansetrona) e dos antagonistas seletivos dos receptores de neurocinina-1 (maropitant), que demonstraram espectro antiemético e antináusea vastamente superiores.',
      'A distinção crucial entre antiêmese e antináusea foi demonstrada de forma elegante em cães tratados com metoclopramida: o animal pode parar de vomitar mas continuar com sinais evidentes de náusea e mal-estar digestivo.',
    ],
  },

  monitoringParameters: [
    'Frequência e características do vômito, náusea comportamental (ptialismo, lambedura labial frequente) e apetite.',
    'Exame físico abdominal: ausculta de borborigmos, palpação para distensão gástrica, dor à palpação ou sinais de peritonite.',
    'Avaliação neurológica contínua: monitorar rigidez postural, tremores de cabeça, agitação psicomotora, desorientação e distonia extrapiramidal.',
    'Função renal e hidratação: ureia, creatinina sérica, SDMA e débito urinário em pacientes hospitalizados (ajuste posológico em IRIS 3–4).',
    'Painel eletrolítico: monitorar rigorosamente potássio sérico (K+); a hipocalemia causa atonia intestinal e anula o benefício pró-cinético.',
    'Eletrocardiograma contínuo e pressão arterial: obrigatórios durante infusões intravenosas rápidas ou em animais anestesiados/críticos sob CRI.',
  ],

  clientInformation: [
    'A metoclopramida é um remédio utilizado para controlar vômitos e ajudar o estômago do seu animal a esvaziar o alimento de forma mais rápida.',
    'Forneça o medicamento preferencialmente cerca de 30 a 45 minutos antes das refeições para que ele comece a agir antes do animal comer.',
    'ATENÇÃO À SEGURANÇA: Se o seu cão ou gato começar a apresentar tremores no corpo, rigidez nas patas ou pescoço, andar sem parar, nervosismo exagerado ou agitação, pare o medicamento imediatamente e avise o veterinário. Esse efeito reverte com um antídoto injetável.',
    'NUNCA administre este medicamento se houver suspeita de que o animal tenha engolido ossos, meias, brinquedos ou pedras, pois o remédio força o estômago e pode romper o intestino se houver um objeto trancado.',
    'Se o animal vomitar logo após tomar o remédio, não dê outra dose em seguida sem antes falar com o médico veterinário.',
  ],

  relatedDiseaseSlugs: [],
};
