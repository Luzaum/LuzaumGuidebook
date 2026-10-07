/** Prévias editoriais; os textos originais permanecem integralmente disponíveis. */
export interface ProgressiveSummaryPreview { simple: string; clinical?: string; attention?: string; indications?: string; pillars: Record<string, string>; }
export const PROGRESSIVE_SUMMARY_PREVIEWS: Record<string, ProgressiveSummaryPreview> = {
  "intermacao-caes-gatos": {
    simple: "O corpo acumula calor demais e começa a sofrer lesões. É uma emergência: mesmo depois de esfriar, o animal pode apresentar complicações e precisa de acompanhamento.",
    clinical: "A lesão pelo calor pode comprometer circulação, coagulação e órgãos; a normalização da temperatura não encerra o risco.",
    attention: "Iniciar resfriamento e atendimento rapidamente. Reavaliar circulação e acompanhar possíveis complicações renais e de coagulação, mesmo após a temperatura cair.",
    pillars: {
      "Pilar 1 — Mudança de Paradigma: Resfriamento Ativo e RECOVER 2026": "O resfriamento precisa começar cedo e ser monitorado para evitar queda excessiva da temperatura.",
      "Pilar 2 — Fisiopatologia Térmico-Endotelial e MODS Dinâmico": "O calor lesa células e vasos e pode comprometer vários órgãos.",
      "Pilar 3 — Ressuscitação Hemodinâmica Racional (AAHA 2024) e Vasopressores": "O suporte circulatório exige reavaliação frequente para evitar sobrecarga e corrigir hipotensão persistente.",
      "Pilar 4 — Janela Oculta de 12 a 24h e Monitoramento Seriado": "Complicações podem surgir depois da melhora inicial; exames seriados ajudam a reconhecê-las."
    }
  },
  "babesiose-canina": {
    "simple": "É uma infecção, geralmente transmitida por carrapatos, que destrói células do sangue e pode deixar o cão fraco e anêmico.",
    "pillars": {
      "Pilar 1: Duplo Mecanismo de Hemólise e Trombocitopenia": "Pode causar anemia e queda das plaquetas.",
      "Pilar 2: Estratificação Morfológica e Terapêutica Guiada por Espécie": "Identificar a espécie de Babesia ajuda a escolher o tratamento.",
      "Pilar 3: Monitoramento de Órgãos-Alvo e Complicações Sistêmicas": "Casos graves exigem acompanhar rins, circulação e necessidade de transfusão."
    }
  },
  "doencas-trato-urinario-inferior-felino-dtuif": {
    "simple": "É um nome para diferentes problemas da bexiga e do canal da urina dos gatos. Eles podem causar dor e dificuldade para urinar.",
    "pillars": {
      "Nome correto": "Sinais semelhantes podem ter causas e tratamentos diferentes.",
      "Emergência": "Tentar urinar sem conseguir é uma emergência.",
      "Longo prazo": "Água, alimentação e ambiente ajudam a prevenir novos episódios."
    }
  },
  "fistula-perianal-furunculose-anal": {
    "simple": "É uma inflamação que forma feridas dolorosas ao redor do ânus e pode dificultar a evacuação.",
    "pillars": {
      "Pilar 1: Etiopatogenia Imunomediada e Genética": "A resposta imune e a predisposição genética participam da doença.",
      "Pilar 2: Diagnóstico Clínico e Diferenciação Cuidadosa": "O exame diferencia fístulas de problemas dos sacos anais e outras lesões.",
      "Pilar 3: Terapia Médica Multimodal e Dieta Hidrolisada": "O manejo combina controle da inflamação, cuidados locais e avaliação alimentar."
    }
  },
  "sindrome-cushing-caes": {
    "simple": "O organismo fica exposto a cortisol demais por muito tempo. O cão pode beber e urinar mais, perder músculos e apresentar alterações na pele.",
    "pillars": {
      "Classificação ALIVE": "Distinguir a origem espontânea da causada por medicamentos orienta a investigação.",
      "Triagem inteligente": "Testes hormonais devem partir de uma suspeita clínica consistente.",
      "Tratamento guiado por clínica": "A resposta clínica e os exames orientam os ajustes do tratamento."
    }
  },
  "sindrome-cushing-gatos": {
    "simple": "É uma doença rara em que há cortisol em excesso. Pode deixar a pele muito frágil e dificultar o controle do diabetes.",
    "pillars": {
      "Pilar 1: Tríade Fisiopatológica Felina": "Diabetes, resistência à insulina e pele frágil são pistas importantes.",
      "Pilar 2: Particularidades do Diagnóstico Laboratorial": "Os testes precisam considerar as particularidades dos gatos.",
      "Pilar 3: Manejo com Trilostano e Dessensibilização à Insulina": "Ao controlar o cortisol, a necessidade de insulina pode diminuir."
    }
  },
  "leishmaniose-visceral-canina": {
    "simple": "É uma infecção transmitida principalmente pela picada do mosquito-palha. Pode afetar pele, sangue e órgãos, especialmente os rins.",
    "pillars": {
      "Vetor e risco": "Prevenir a picada do vetor faz parte do controle.",
      "Confirmar antes de rotular": "Um teste positivo deve ser interpretado junto dos sinais e exames.",
      "Renal e IRIS": "Avaliar os rins ajuda a definir gravidade e acompanhamento."
    }
  },
  "erliquiose-monocitica-canina": {
    "simple": "É uma infecção transmitida por carrapatos que pode alterar o sangue e causar febre, fraqueza e sangramentos.",
    "pillars": {
      "O que mais entrega": "Queda de plaquetas, febre e sangramentos ajudam a levantar a suspeita.",
      "Onde a prova e a clínica confundem": "Sorologia e PCR têm significados diferentes conforme a fase da infecção.",
      "Quando preocupar mais": "Alterações graves no sangue exigem atenção ao comprometimento da medula."
    }
  },
  "colapso-traqueal-canino": {
    "simple": "A traqueia, tubo que leva o ar aos pulmões, perde firmeza e se estreita durante a respiração. Isso pode causar tosse e falta de ar.",
    "pillars": {
      "Defina o fenótipo clínico": "A intensidade dos sinais e as doenças associadas orientam a avaliação.",
      "Empregue imagem funcional dinâmica": "Exames dinâmicos mostram quando e onde a via aérea se estreita.",
      "Atenue a sobrecarga ventilatória": "Reduzir esforço respiratório e fatores agravantes são prioridades."
    }
  },
  "asma-felina": {
    "simple": "Os pequenos canais de ar dos pulmões ficam inflamados e podem se fechar temporariamente, causando tosse e dificuldade para respirar.",
    "pillars": {
      "Mecanismo": "Inflamação e estreitamento das vias aéreas explicam as crises.",
      "População": "Outras doenças também podem causar tosse e falta de ar.",
      "Conduta imediata": "Na crise, estabilizar a respiração vem antes da investigação completa."
    }
  },
  "bronquite-cronica-caes-gatos": {
    "simple": "É uma inflamação brônquica crônica caracterizada por tosse persistente por mais de dois meses em cães e gatos, exigindo controle ambiental e terapia inalatória.",
    "pillars": {
      "Pilar 1: Conceito Temporal e Diferenciação Canina vs Felina": "Critério de dois meses no cão e distinção estrita entre bronquite neutrofílica e asma alérgica felina.",
      "Pilar 2: Dinâmica Mecânica, Lei de Poiseuille e Ciclo Vicioso": "Estenose luminal eleva exponencialmente a resistência aérea e precipita colapso dinâmico das vias condutoras.",
      "Pilar 3: Diagnóstico Fenotípico e Padrão-Ouro (BAL e Imagem)": "Lavado broncoalveolar com contagem diferencial e imagem avançada após estabilização clínica.",
      "Pilar 4: Farmacoterapia de Precisão, Terapias Inalatórias e Stewardship": "Fluticasona inalatória prioritária, broncodilatador restrito a resgate e veto a antibióticos empíricos."
    }
  },
  "granuloma-eosinofilico-felino": {
    "simple": "São lesões inflamatórias na pele ou na boca dos gatos, muitas vezes ligadas a alergias. Podem aparecer como feridas, placas ou inchaços.",
    "pillars": {
      "Definição": "O nome descreve um padrão de lesão, não uma causa única.",
      "Causa mais comum": "A investigação procura alergias e doenças semelhantes.",
      "Conduta imediata": "Controlar a inflamação e seu desencadeante ajuda a prevenir recidivas."
    }
  },
  "micoplasmoses-hemotropicas": {
    "simple": "São infecções por microrganismos que se associam às células vermelhas do sangue e podem causar anemia.",
    "pillars": {
      "Pilar 1: Patogenicidade Diferenciada entre Espécies": "A gravidade varia conforme o agente e o paciente.",
      "Pilar 2: Diagnóstico Molecular vs Limitações da Citologia": "O exame molecular é mais confiável que o esfregaço isolado.",
      "Pilar 3: Terapêutica Racional e Biossegurança Esofágica": "O tratamento exige cuidado ao administrar comprimidos, especialmente em gatos."
    }
  },
  "doenca-renal-cronica-canina": {
    "simple": "Os rins caninos perdem progressivamente a capacidade de filtração e concentração. O acompanhamento IRIS 2026 guia nutrição, controle do fósforo e renoproteção.",
    "pillars": {
      "Pilar 1: Novo Estadiamento IRIS 2026 e Discordância Cr/SDMA": "Estágio 2 expandido e valorização do SDMA na sarcopenia.",
      "Pilar 2: Renoproteção Antiproteinúrica e Tromboprofilaxia": "Telmisartana como primeira linha e controle do risco trombótico.",
      "Pilar 3: Manejo Mineral-Ósseo (CKD-MBD) e Metas de Fósforo": "Quelantes entéricos com a comida para frear o hiperparatireoidismo.",
      "Pilar 4: Anemia Precoce, Acidose e Terapias de Fronteira": "Tratar anemia com HCT <30% e corrigir acidose mais cedo."
    }
  },
  "doenca-renal-cronica-felina": {
    "simple": "A perda progressiva de néfrons afeta idosos. Rastreamento a partir dos 7 anos, controle estrito de fósforo, manejo de cálcio ionizado e bloqueio do SRAA preservam a sobrevida.",
    "pillars": {
      "Pilar 1: Paradigma iCatCare 2026 e Rastreamento Precoce (>=7 Anos)": "Rastreio sistemático a partir dos 7 anos, monitoramento de perda de peso insidiosa e sarcopenia mascarando a creatinina.",
      "Pilar 2: Fisiopatologia do Néfron Remanescente, P e Hipercalcemia (iCa)": "Hiperfiltração glomerular por angiotensina II, impacto do fósforo na sobrevida e risco de hipercalcemia ionizada pós-dieta.",
      "Pilar 3: Estadiamento IRIS Estável, Subestadiamento e Diagnóstico": "Estadiamento exclusivo em paciente euvolêmico e hidratado, subestadiamento rigoroso de proteinúria (UPC) e controle pressórico.",
      "Pilar 4: Terapia de Precisão, Manejo Nutricional e Stewardship Antimicrobiano": "Protagonismo da dieta renal, molidustat para anemia e veto estrito a antibióticos na bacteriúria assintomática."
    }
  },
  "hipertensao-arterial-sistemica-caes-gatos": {
    "simple": "É a pressão do sangue persistentemente alta. Pode prejudicar olhos, rins, coração e cérebro, mesmo sem sinais óbvios no começo.",
    "pillars": {
      "Por que medir mal equivale a tratar mal": "Técnica adequada e medidas repetidas reduzem erros por estresse.",
      "Gato vs cão (lógica clínica)": "Investigação e tratamento consideram as particularidades da espécie.",
      "Integração IRIS": "Pressão, lesão renal e dano a outros órgãos são avaliados juntos."
    }
  },
  "doenca-valvar-mitral-degenerativa-caes": {
    "simple": "Uma válvula do coração deixa de fechar bem e parte do sangue volta para trás. Alguns cães passam anos sem sintomas; outros desenvolvem falta de ar.",
    "pillars": {
      "Por que o sopro engana": "Sopro, sozinho, não define insuficiência cardíaca.",
      "Estádios A–D decidem a conduta": "O estágio determina quando tratar e como acompanhar.",
      "Três eixos na prática": "Tamanho cardíaco, congestão e sinais clínicos orientam a conduta."
    }
  },
  "cardiomiopatia-hipertrofica-caes-gatos": {
    "simple": "A parede do coração fica mais grossa e pode ter dificuldade para relaxar e receber sangue. A gravidade varia entre os animais.",
    "pillars": {
      "Fenótipo, não causa única": "O espessamento exige investigar causas e condições associadas.",
      "Risco guiado pelo átrio": "O aumento do átrio ajuda a avaliar congestão e trombose.",
      "Tratamento por estágio": "O manejo muda conforme sintomas e complicações."
    }
  },
  "cardiomiopatia-dilatada-caes-gatos": {
    "simple": "O coração se dilata e perde força para bombear o sangue. Pode causar cansaço, desmaios ou dificuldade para respirar.",
    "pillars": {
      "Fenótipo com várias causas": "O mesmo padrão cardíaco pode ter causas diferentes.",
      "Fase oculta importa": "A doença pode existir antes de surgirem sinais visíveis.",
      "Congestão e perfusão": "O tratamento considera congestão e capacidade de manter a circulação."
    }
  },
  "arritmias-cardiacas-caes-gatos": {
    "simple": "São alterações no ritmo do coração. Algumas são pouco importantes; outras podem causar fraqueza, desmaios ou risco de morte.",
    "pillars": {
      "Arritmia não significa automaticamente doença cardíaca primária": "A causa pode estar no coração ou em outra doença.",
      "ECG curto pode perder a doença": "Alterações intermitentes podem exigir monitoramento prolongado.",
      "A repercussão hemodinâmica é decisiva": "O efeito sobre a circulação ajuda a definir a urgência.",
      "Antiarrítmicos também podem causar arritmias": "Antiarrítmicos precisam de escolha e monitoramento cuidadosos."
    }
  },
  "cardiomiopatia-restritiva-felina": {
    "simple": "O coração fica mais rígido e não recebe sangue normalmente entre os batimentos. Isso pode causar acúmulo de líquido e dificuldade respiratória.",
    "pillars": {
      "Pilar 1: Duas Formas Anatomopatológicas (Fox 2004)": "Há diferentes formas de comprometimento do tecido cardíaco.",
      "Pilar 2: Fisiologia Restritiva e Paradoxo Sistólico": "O enchimento pode estar prejudicado mesmo com contração preservada.",
      "Pilar 3: Manejo Emergencial da Congestão e Trombose": "Congestão e coágulos estão entre as complicações prioritárias."
    }
  },
  "hipoadrenocorticismo-addison": {
    "simple": "As glândulas adrenais produzem menos hormônios do que o organismo precisa. Pode causar fraqueza, vômitos e crises graves de circulação.",
    "pillars": {
      "Mecanismo primário": "A deficiência hormonal afeta a resposta ao estresse e os eletrólitos.",
      "Tríade de emergência": "Choque e alterações metabólicas tornam a crise uma emergência.",
      "Desafio diagnóstico": "Os sinais imitam outras doenças; a confirmação depende de testes."
    }
  },
  "diabetes-mellitus-canina": {
    "simple": "O corpo não consegue usar bem o açúcar do sangue por falta de ação da insulina. O cão pode beber e urinar mais e emagrecer mesmo comendo.",
    "pillars": {
      "Fisiopatologia & Catabolismo": "Sem ação adequada da insulina, o organismo utiliza gordura e músculo.",
      "Conduta Terapêutica Inicial": "Insulina, alimentação e rotina precisam ser ajustadas em conjunto.",
      "Prevenção & Diestro": "O ciclo reprodutivo pode dificultar o controle em fêmeas não castradas."
    }
  },
  "diabetes-mellitus-felina": {
    "simple": "O açúcar fica alto porque a insulina não age como deveria. Com tratamento e acompanhamento, alguns gatos conseguem entrar em remissão.",
    "pillars": {
      "Remissão & Glicotoxicidade": "Controlar a glicose pode favorecer a recuperação da função pancreática.",
      "Insulinoterapia vs SGLT2": "A escolha entre insulina e outras opções exige seleção cuidadosa.",
      "Monitoramento Sem Estresse": "Monitorar em casa reduz a interferência do estresse nos resultados."
    }
  },
  "hipertireoidismo-felino": {
    "simple": "A tireoide produz hormônios em excesso e acelera o organismo. O gato pode emagrecer apesar de comer bem e ficar mais agitado.",
    "pillars": {
      "Pilar 1: Diagnóstico Laboratorial Estruturado e Armadilhas": "Interpretar exames hormonais junto dos sinais e doenças associadas.",
      "Pilar 2: Inter-relação Nefrorrenal (DRC Mascarada)": "O tratamento pode revelar doença renal antes mascarada.",
      "Pilar 3: Cardiomiopatia Tireotóxica e Risco Vascular": "Pressão arterial e coração merecem avaliação.",
      "Pilar 4: Escolha Terapêutica Racional (Curativa vs Manutenção)": "Há opções de controle contínuo e tratamentos com intenção curativa."
    }
  },
  "hipotireoidismo-adquirido-caes-gatos": {
    "simple": "A tireoide passa a produzir menos hormônios. Isso pode deixar o animal mais lento e causar ganho de peso e alterações na pele.",
    "pillars": {
      "Deficiência hormonal primária": "A deficiência hormonal precisa ser diferenciada de outras doenças.",
      "NTIS não é hipotireoidismo": "Hormônios baixos nem sempre significam hipotireoidismo.",
      "Painel probabilístico": "Exames combinados e sinais clínicos valem mais que um resultado isolado."
    }
  },
  "hipotireoidismo-congenito-caes-gatos": {
    "simple": "O filhote nasce com dificuldade para produzir ou utilizar hormônios da tireoide. Sem tratamento, seu crescimento e desenvolvimento podem ser prejudicados.",
    "pillars": {
      "Pilar 1: Etiopatogenia — Disgenesia vs Disormonogênese": "O defeito pode envolver a formação da glândula ou a produção hormonal.",
      "Pilar 2: Esqueleto e Sistema Nervoso — Efeitos da Falência Hormonal": "Ossos e sistema nervoso dependem desses hormônios durante o crescimento.",
      "Pilar 3: Diagnóstico e Reposição Pediátrica com Levotiroxina": "Diagnóstico e reposição precoces ajudam a limitar consequências permanentes."
    }
  },
  "tumores-mamarios-caes-gatos": {
    "simple": "São nódulos nas mamas que podem ser benignos ou malignos. Precisam ser avaliados mesmo quando pequenos ou sem dor.",
    "pillars": {
      "Cão e gato não são iguais": "O comportamento dos tumores varia entre cães e gatos.",
      "Padrão ouro é tecido": "A análise do tecido confirma o tipo de tumor.",
      "Linfonodo é parte do tumor": "Avaliar linfonodos ajuda a conhecer a extensão da doença."
    }
  },
  "mastite-caes-gatos": {
    "simple": "É uma inflamação das mamas, frequentemente causada por infecção durante a amamentação. Pode afetar a mãe e os filhotes.",
    "pillars": {
      "Diagnóstico Citológico Imediato": "A análise do leite ajuda a identificar infecção.",
      "Esvaziamento e Termoterapia": "Cuidados locais e esvaziamento dependem da condição da glândula.",
      "Segurança Farmacológica Materno-Fetal": "O tratamento considera a passagem dos medicamentos para o leite.",
      "Manejo Neonatal Intensivo": "Filhotes podem precisar de suporte e outra forma de alimentação."
    }
  },
  "miastenia-gravis-caes-gatos": {
    "simple": "A comunicação entre nervos e músculos falha, causando fraqueza que pode piorar com o esforço. O esôfago também pode ser afetado.",
    "pillars": {
      "Classificação moderna": "Distinguir as formas adquiridas e congênitas orienta a investigação.",
      "Três apresentações": "A fraqueza pode ser localizada, generalizada ou muito grave.",
      "Conduta imediata": "Dificuldade para engolir e risco de aspiração exigem atenção."
    }
  },
  "sindromes-miastenicas-congenitas-caes-gatos": {
    "simple": "São doenças genéticas em que o sinal do nervo não chega adequadamente ao músculo. Costumam causar fraqueza desde cedo.",
    "pillars": {
      "Pilar 1: Três Compartimentos da Junção Neuromuscular": "A falha pode ocorrer em diferentes partes da junção neuromuscular.",
      "Pilar 2: Diagnóstico Diferencial com Miastenia Gravis Adquirida": "É necessário diferenciar a doença hereditária da forma adquirida.",
      "Pilar 3: Terapêutica Racional por Subtipo Molecular": "O tratamento depende do defeito específico."
    }
  },
  "leucemia-viral-felina": {
    "simple": "É uma infecção viral que pode enfraquecer as defesas, alterar o sangue e favorecer tumores. Nem todo gato infectado evolui da mesma forma.",
    "pillars": {
      "Quatro desfechos": "A infecção tem diferentes desfechos e padrões de persistência.",
      "Diagnóstico": "Os testes podem precisar de confirmação e repetição.",
      "Tratamento": "O cuidado considera doenças associadas e acompanhamento contínuo."
    }
  },
  "peritonite-infecciosa-felina": {
    "simple": "É uma doença inflamatória grave ligada ao coronavírus felino. Pode afetar vários órgãos e causar líquido no tórax ou no abdômen.",
    "pillars": {
      "Fenótipos": "Há apresentações com e sem acúmulo de líquido.",
      "Diagnóstico tijolo a tijolo": "O diagnóstico reúne sinais, exames e análise de amostras.",
      "Tratamento GS": "O tratamento antiviral exige acompanhamento da resposta e das complicações."
    }
  },
  "imunodeficiencia-felina-fiv": {
    "simple": "É uma infecção viral que pode enfraquecer as defesas do gato ao longo do tempo. Muitos vivem bem por anos com acompanhamento.",
    "pillars": {
      "Transmissão": "Mordidas estão entre as principais formas de transmissão.",
      "Interpretação do teste": "Idade, histórico e contexto influenciam o significado do teste.",
      "Tratamento e manejo": "O manejo prioriza prevenção e tratamento de doenças associadas."
    }
  },
  "insuficiencia-pancreatica-exocrina-caes-gatos": {
    "simple": "O pâncreas não libera enzimas suficientes para digerir a comida. O animal pode emagrecer mesmo comendo e produzir fezes volumosas ou alteradas.",
    "pillars": {
      "Diagnóstico por imunorreatividade tipo tripsina (TLI)": "O teste TLI é central na confirmação.",
      "Tratamento PERT + cobalamina": "Enzimas digestivas e avaliação da vitamina B12 integram o manejo.",
      "Cão × Gato": "Causas e apresentações variam entre cães e gatos."
    }
  },
  "giardiase-caes-gatos": {
    "simple": "É uma infecção intestinal que pode causar diarreia. Alguns animais carregam Giardia sem apresentar doença.",
    "pillars": {
      "Positivo não é sinônimo de culpado": "Encontrar Giardia não prova que ela explique todos os sintomas.",
      "Diagnóstico = amostragem + método": "Amostras e métodos complementares melhoram a detecção.",
      "Fenbendazol como primeira linha": "O tratamento depende do quadro clínico.",
      "Ambiente manda na reinfecção": "Higiene e controle ambiental reduzem reinfecções."
    }
  },
  "coccidiose-caes-gatos": {
    "simple": "É uma infecção intestinal por pequenos parasitas que pode causar diarreia, sobretudo em filhotes.",
    "pillars": {
      "Nome certo, doença certa": "Identificar o parasita ajuda a interpretar sua importância.",
      "Positivo não fecha etiologia": "O exame positivo precisa ser relacionado aos sinais.",
      "Ponazuril — 3 dias, não dose única": "Não presumir que uma única dose complete o tratamento.",
      "Ambiente esporula o problema": "Limpeza e manejo ambiental ajudam a interromper a transmissão."
    }
  },
  "hiperparatireoidismo-caes-gatos": {
    "simple": "As paratireoides produzem hormônio em excesso e alteram o equilíbrio de cálcio e fósforo. A causa pode estar na glândula, nos rins ou na alimentação.",
    "pillars": {
      "PHPT — secreção autônoma": "Na forma primária, a glândula secreta hormônio inadequadamente.",
      "CKD-MBD — compensação renal": "Na doença renal, o problema integra o desequilíbrio mineral.",
      "NSHP — dieta desequilibrada": "Dietas desequilibradas também podem desencadear a doença.",
      "Interpretação relacional PTH × iCa": "Interpretar o hormônio junto do cálcio ionizado é essencial."
    }
  },
  "insulinoma-caes-gatos": {
    "simple": "É um tumor que libera insulina em excesso e baixa o açúcar do sangue. Pode causar fraqueza, tremores ou convulsões.",
    "pillars": {
      "Fisiopatologia — excesso de insulina": "O excesso de insulina mantém a glicose inadequadamente baixa.",
      "Diagnóstico relacional glicose × insulina": "Glicose e insulina devem ser avaliadas em conjunto.",
      "Estadiamento e imagem": "A imagem ajuda a localizar e estadiar o tumor.",
      "Tratamento escalonado": "O manejo combina controle da hipoglicemia e tratamento tumoral."
    }
  },
  "cetoacidose-diabetica-caes-gatos": {
    "simple": "É uma complicação grave do diabetes em que o organismo acumula ácidos e perde água e sais. Exige tratamento hospitalar.",
    "pillars": {
      "1. Regra de Ouro & Definições (ALIVE 2026)": "A avaliação reúne cetose, acidose e contexto diabético.",
      "2. Pontos de Corte BHB por Espécie": "Interpretar cetonas conforme a espécie e o método.",
      "3. eDKA Felina & Inibidores de SGLT2": "Em certos gatos, a emergência ocorre sem glicose muito elevada.",
      "4. BHB Sanguíneo POC vs Fita Urinária": "Cetonas sanguíneas e fitas urinárias não oferecem a mesma informação."
    }
  },
  "prostatite-caes-gatos": {
    "simple": "É uma inflamação da próstata, geralmente por infecção. Pode causar dor, febre e dificuldade para urinar ou evacuar.",
    "pillars": {
      "Aguda × crônica": "As formas aguda e crônica podem ter sinais diferentes.",
      "Diagnóstico": "Cultura, exames e imagem ajudam a confirmar a origem.",
      "Tratamento": "O tratamento considera penetração prostática e possíveis abscessos."
    }
  },
  "gengivoestomatite-cronica-felina": {
    "simple": "É uma inflamação persistente e muito dolorosa na boca. Pode dificultar a alimentação e causar salivação e mau hálito.",
    "pillars": {
      "Diagnóstico odontológico": "O exame odontológico completo orienta o tratamento.",
      "PME × FME": "A extensão das extrações depende da avaliação individual.",
      "Refratários": "Casos persistentes precisam de reavaliação e medidas complementares."
    }
  },
  "doenca-periodontal-caes": {
    "simple": "É a inflamação e perda dos tecidos que sustentam os dentes. Pode causar dor, mau hálito e perda dentária.",
    "pillars": {
      "Modelo da Disbiose": "Placa bacteriana e inflamação participam da destruição dos tecidos.",
      "Triagem vs Estadiamento": "A triagem acordada não substitui o exame odontológico completo.",
      "Stewardship Antimicrobiano": "Antibiótico não substitui o tratamento do foco dentário."
    }
  },
  "doenca-periodontal-gatos": {
    "simple": "É uma doença dos tecidos que seguram os dentes. A dor pode passar despercebida mesmo quando as lesões são importantes.",
    "pillars": {
      "Tríade de Diferenciação Felina": "Distinguir doença periodontal, reabsorção dentária e inflamação oral muda a conduta.",
      "Dor Felina Silenciosa": "Gatos podem continuar comendo apesar da dor.",
      "Raízes Retidas e RX Obrigatório": "Radiografias revelam lesões e raízes não visíveis no exame."
    }
  },
  "dermatite-atopica-canina": {
    "simple": "É uma doença alérgica da pele que causa coceira e costuma precisar de controle contínuo. Infecções podem piorar as crises.",
    "pillars": {
      "Barreira & Disbiose": "A barreira cutânea e os microrganismos locais influenciam as crises.",
      "Eixo IL-31 & Vias JAK": "Diferentes tratamentos atuam nos sinais inflamatórios da coceira.",
      "Manejo Estruturado de Crises": "Controle da crise e manutenção são etapas complementares."
    }
  },
  "sindrome-cutanea-atopica-felina": {
    "simple": "É uma doença alérgica que pode causar coceira, feridas ou perda de pelo por lambedura. Outras causas precisam ser excluídas.",
    "pillars": {
      "Os 4 Padrões Reacionais Felinos": "Gatos apresentam diferentes padrões de lesão alérgica.",
      "Imunoterapia & Terapia Sistêmica": "O controle pode combinar tratamento sistêmico e imunoterapia.",
      "Vigilância Imunológica": "As terapias exigem atenção ao estado imunológico e a infecções."
    }
  },
  "doenca-do-disco-intervertebral-caes": {
    "simple": "Um disco entre as vértebras se altera e pode comprimir a medula ou os nervos. Pode causar dor, dificuldade para andar ou paralisia.",
    "pillars": {
      "Genética & Hansen Tipo I vs II": "Existem diferentes formas de degeneração e deslocamento do disco.",
      "Graduação Neurológica & Prognóstico": "O exame neurológico orienta a avaliação de gravidade.",
      "Consenso ACVIM 2022 & Terapias": "Manejo clínico ou cirurgia dependem da apresentação."
    }
  },
  "doenca-do-disco-intervertebral-gatos": {
    "simple": "Uma alteração nos discos da coluna pode causar dor e prejudicar os movimentos. É menos comum em gatos e pode parecer outra doença.",
    "pillars": {
      "Epidemiologia & Biomecânica Felina": "A apresentação felina tem particularidades próprias.",
      "Diagnósticos Diferenciais Críticos": "Investigar outras causas de dor e dificuldade locomotora é importante.",
      "Farmacologia & Prognóstico": "Tratamento e prognóstico dependem da localização e da gravidade."
    }
  },
  "coagulacao-intravascular-disseminada-caes-gatos": {
    "simple": "A coagulação fica desregulada por uma doença grave. O animal pode formar pequenos coágulos e também apresentar sangramentos.",
    "pillars": {
      "Condição estritamente secundária": "É uma complicação de outra doença, que precisa ser tratada.",
      "Bifurcação fenotípica fibrinolítica": "O equilíbrio entre formação e dissolução de coágulos varia.",
      "Painel de 6 marcadores seriados": "Exames seriados ajudam a acompanhar a evolução.",
      "Conduta fenotípica sem dogmas": "O suporte considera sangramento, trombose e disfunção de órgãos."
    }
  },
  "sindrome-mielodisplasica-caes-gatos": {
    "simple": "A medula produz células do sangue de forma defeituosa. Mesmo trabalhando, pode não manter quantidades adequadas na circulação.",
    "pillars": {
      "Paradoxo de produção ineficaz": "A produção pode ser intensa, mas pouco eficaz.",
      "Dismielopoiese secundária vs MDS": "Diferenciar alterações secundárias da medula é necessário.",
      "Fronteira prática de 20% de blasts": "A proporção de células imaturas ajuda na classificação.",
      "Suporte clínico e quimioterapia seletiva": "O manejo considera suporte e tratamentos específicos selecionados."
    }
  },
  "linfoma-cutaneo-caes-gatos": {
    "simple": "É um câncer de células de defesa que aparece na pele. Pode causar manchas, feridas ou nódulos parecidos com outras doenças.",
    "pillars": {
      "Epiteliotrópico vs Não Epiteliotrópico": "A localização das células na pele ajuda a classificar o tumor.",
      "Variante Citotóxica de Interface (2026)": "Existem variantes com padrões próprios de lesão.",
      "PARR e Limites da Clonabilidade": "Clonabilidade complementa, mas não substitui, a análise do tecido.",
      "Conduta Terapêutica Estratificada": "O tratamento depende do tipo, extensão e condições do paciente."
    }
  },
  "megacolon-caes-gatos": {
    "simple": "O intestino grosso fica dilatado e perde força para empurrar as fezes. Provoca prisão de ventre persistente e pode exigir cirurgia.",
    "pillars": {
      "Espécies e Comportamento Biológico": "Causas e frequência variam entre as espécies.",
      "Métrica Radiográfica MCD/L5": "Radiografias ajudam a avaliar a dilatação do cólon.",
      "Eixo Farmacológico Racional": "Medicamentos dependem da capacidade de movimentação intestinal.",
      "Paradoxo da Fibra na Atonia": "Quantidade e tipo de fibra precisam ser individualizados."
    }
  },
  "linfoma-mediastinal-caes-gatos": {
    "simple": "É um câncer que forma uma massa dentro do tórax. Pode dificultar a respiração e causar acúmulo de líquido perto dos pulmões.",
    "pillars": {
      "Biologia Celular e a Grande Encruzilhada: Linfoma vs Timoma": "Diferenciar linfoma de timoma e outras massas muda a conduta.",
      "Fisiopatogenia Mecânica, Efusão Pleural e Síndrome Precaval": "Massa e líquido podem comprimir estruturas importantes.",
      "Eixo Paraneoplásico: Hipercalcemia de Malignidade e PTHrP": "O cálcio sanguíneo pode aumentar e precisa ser acompanhado.",
      "Pilares Farmacológicos: Quimioterapia Multiagente e Segurança": "A quimioterapia exige diagnóstico e avaliação do paciente."
    }
  },
  "piotorax-caes-gatos": {
    "simple": "É o acúmulo de pus ao redor dos pulmões. A infecção dificulta a respiração e pode comprometer todo o organismo.",
    "pillars": {
      "Fisiopatologia de Espaço Fechado e Restrição Pleural": "O líquido impede a expansão adequada dos pulmões.",
      "Emergência na Admissão: Toracocentese Pré-Radiográfica": "Em pacientes instáveis, aliviar a respiração pode vir antes da radiografia.",
      "Controle Mecânico de Foco (Source Control) e Lavagem Pleural": "Drenagem e controle do foco são fundamentais.",
      "Antimicrobianoterapia Racional de Quatro Quadrantes e Suporte Séptico": "Antibióticos e suporte acompanham a gravidade e os resultados das amostras."
    }
  },
  "quilotorax-caes-gatos": {
    "simple": "Um líquido chamado quilo se acumula ao redor dos pulmões e dificulta a respiração. É preciso aliviar o acúmulo e procurar sua causa.",
    "pillars": {
      "Quebra de Paradigma Etiológico em Felinos": "Investigar causas cardíacas, linfáticas e torácicas orienta o manejo.",
      "Emergência na Admissão: Regra Hands-Off e Descompressão": "Falta de ar exige pouco manuseio e alívio do líquido.",
      "Diagnóstico Bioquímico Padrão Ouro": "A análise do líquido confirma sua natureza.",
      "Cirurgia Precoce e Prevenção de Pleurite Fibrosante": "Casos persistentes podem exigir cirurgia e atenção à inflamação pleural."
    }
  },
  "cistite-enfisematosa-caes-gatos": {
    "simple": "É uma infecção da bexiga em que bactérias produzem gás. Pode estar ligada a diabetes ou dificuldade para esvaziar a bexiga.",
    "pillars": {
      "Microbiologia e Fermentação": "A atividade bacteriana pode produzir gás.",
      "Ambiente do Hospedeiro e Estase": "Doenças associadas e retenção urinária favorecem a infecção.",
      "Diagnóstico por Imagem e Triagem": "A imagem reconhece o gás e ajuda a excluir outras causas.",
      "Terapia Direcionada e Controle de Base": "Tratar a infecção e os fatores predisponentes é essencial."
    }
  },
  "trombocitopenia-caes-gatos": {
    "simple": "Há menos plaquetas, células que ajudam a conter sangramentos. É preciso investigar a causa, mesmo quando não há sangramento visível.",
    "pillars": {
      "Fisiopatologia e Mecanismos Centrais": "Plaquetas podem ser destruídas, consumidas ou pouco produzidas.",
      "Reconhecimento Clínico e Escore DOGiBAT": "A intensidade do sangramento ajuda a avaliar gravidade.",
      "Terapêutica Racional e Evidências ACVIM": "O tratamento depende da causa e da repercussão clínica."
    }
  },
  "anemia-caes-gatos": {
    "simple": "Há menos células vermelhas para levar oxigênio aos tecidos. O animal pode ficar pálido, fraco e respirar mais rápido.",
    "pillars": {
      "Pilar 1: Fisiologia do DO2 e Gravidade Hemodinâmica": "A gravidade depende da repercussão sobre circulação e oxigenação.",
      "Pilar 2: Eixo Medular e Cinética de Regeneração": "A resposta da medula ajuda a classificar a anemia.",
      "Pilar 3: As Três Vias Etiopatogênicas Fundamentais": "Investigar perda, destruição ou produção insuficiente de hemácias.",
      "Pilar 4: Hemoterapia e Conduta Farmacológica Racional": "Transfusão e medicamentos dependem da condição clínica e da causa."
    }
  },
  "leishmaniose-caes-gatos": {
    "simple": "É uma infecção por um parasita que pode afetar a pele e vários órgãos. Um teste positivo não significa, sozinho, que o animal esteja doente.",
    "pillars": {
      "Pilar 1: Mudança Conceitual CLWG 2026 — Infecção versus Doença Ativa": "Infecção e doença ativa precisam ser diferenciadas.",
      "Pilar 2: Imunopatogenia e o Rim como Órgão Sentinela": "A resposta imune pode contribuir para lesão renal.",
      "Pilar 3: Diagnóstico Integrado e Padrão Ouro Citológico": "O diagnóstico combina sinais e pesquisa do agente.",
      "Pilar 4: Terapêutica Racional, Legislação e Manejo da Xantinúria": "O manejo considera espécie, órgãos afetados e cuidados do tratamento."
    }
  },
  "cistite-idiopatica-felina": {
    "simple": "É uma condição dolorosa da bexiga, ligada também à resposta ao estresse. Pode causar tentativas frequentes de urinar e urina fora da caixa.",
    "pillars": {
      "Pilar 1: Modelo Fisiopatológico Bidirecional (Top-Down e Bottom-Up)": "Bexiga e resposta ao estresse participam do problema.",
      "Pilar 2: Diagnóstico Rigoroso por Exclusão e Triagem Imediata de Obstrução": "Excluir outras causas e verificar obstrução são prioridades.",
      "Pilar 3: Modificação Ambiental Multimodal (MEMO) e Recursos Espaciais": "Água, caixas de areia e previsibilidade integram o manejo.",
      "Pilar 4: Racionalização Farmacológica e Fim de Condutas Empíricas": "Medicamentos precisam de indicação; antibiótico não é rotina."
    }
  },
  "discinesia-paroxistica-caes-gatos": {
    "simple": "São episódios de movimentos ou posturas involuntárias, geralmente sem perda de consciência. Eles nem sempre são convulsões.",
    "pillars": {
      "Fisiopatologia do Gating Extrapiramidal": "O problema envolve o controle dos movimentos.",
      "Semiologia e Vídeo como Padrão Ouro": "Vídeos ajudam a diferenciar outras crises.",
      "Painel Etiológico e Particularidades de Raça": "Raça, gatilhos e exames orientam a busca da causa.",
      "Neurofarmacologia e Terapia Direcionada": "O tratamento depende do subtipo e do impacto dos episódios."
    }
  },
  "platinosomose-felina": {
    "simple": "É uma infecção por vermes nas vias da bile. Pode causar falta de apetite, vômitos e olhos amarelados.",
    "pillars": {
      "Ciclo Biológico e Vias de Infecção Atualizadas": "A infecção envolve animais que participam do ciclo do parasita.",
      "Fisiopatologia dos Ductos Biliares e Colestase": "A inflamação pode prejudicar a passagem da bile.",
      "Desafios Diagnósticos Propedêuticos: Fezes vs Bile": "Exame fecal negativo não descarta a infecção.",
      "Terapêutica Antiparasitária e Suporte Crítico": "Além do antiparasitário, pode ser necessário tratar obstrução e complicações."
    }
  },
  "triade-felina": {
    "simple": "É a inflamação conjunta do intestino, do pâncreas e das vias da bile. Cada órgão pode contribuir de forma diferente para os sintomas.",
    "pillars": {
      "Anatomia Confluente e Microbiologia Duodenal": "A anatomia felina favorece a relação entre esses órgãos.",
      "Os 4 Modelos Fisiopatológicos Integrados": "Mais de um mecanismo pode participar do quadro.",
      "A Terceira Perna: LPE vs Linfoma de Baixo Grau (LGITL)": "É importante diferenciar inflamação intestinal e linfoma quando indicado.",
      "Farmacoterapia Fenotípica e Nutrição Enteral Precoce": "Nutrição, analgesia e tratamento de cada componente são prioridades."
    }
  },
  "anemia-hemolitica-imunomediada-canina": {
    "simple": "O sistema de defesa destrói as próprias células vermelhas do sangue. Isso pode causar anemia grave e aumentar o risco de coágulos.",
    "pillars": {
      "Tríade Diagnóstica Consensual (ACVIM 2019)": "Demonstrar anemia, hemólise e mecanismo imune sustenta o diagnóstico.",
      "Doença Tromboinflamatória e Hipofibrinólise": "Inflamação e trombose fazem parte dos riscos.",
      "Imunossupressão Racional e Individualizada": "O tratamento equilibra controle imune, suporte e monitoramento."
    }
  },
  "sepse-canina": {
    "simple": "Uma infecção provoca uma reação descontrolada e começa a prejudicar os órgãos. É uma emergência que exige tratamento rápido.",
    "pillars": {
      "A Grande Mudança Conceitual de 2026": "A disfunção de órgãos é central na avaliação.",
      "Definição Atualizada de Choque Séptico": "Choque séptico envolve comprometimento circulatório importante.",
      "Fisiopatologia Celular e Tromboinflamação": "Inflamação e coagulação contribuem para a lesão celular.",
      "Ressuscitação e Terapia Vasoativa Racional": "Fluidos e medicamentos circulatórios exigem reavaliação frequente."
    }
  },
  "obstrucao-funcional-fluxo-urinario-caes": {
    "simple": "O cão não esvazia bem a bexiga porque os mecanismos da micção não trabalham juntos, mesmo sem um bloqueio físico identificado.",
    "pillars": {
      "Virada Terminológica do Consenso ACVIM 2024": "Distinguir disfunção funcional de bloqueio mecânico orienta a avaliação.",
      "Assinatura Miccional e PVRV > 3 mL/kg": "Observar o jato e medir a urina residual ajuda no diagnóstico.",
      "Diagnóstico de Exclusão Anatômica e Neurológica": "É necessário excluir causas anatômicas e neurológicas.",
      "Farmacoterapia Direcionada e Proteção do Detrusor": "Facilitar o esvaziamento sem forçar a bexiga contra uma saída obstruída."
    }
  },
  "sepse-felina": {
    "simple": "Uma infecção prejudica o funcionamento dos órgãos. O gato pode ficar muito quieto e frio, mesmo sem febre ou coração acelerado.",
    "pillars": {
      "Superação do Paradigma Infecção + SIRS": "A avaliação não depende apenas dos sinais inflamatórios clássicos.",
      "O Fenótipo Frio / Hipodinâmico": "Temperatura baixa e circulação fraca podem indicar gravidade.",
      "Baixa Tolerância Volêmica (AAHA 2024)": "Fluidos precisam de ajuste cuidadoso para evitar sobrecarga.",
      "Norepinefrina e Source Control Precoce": "Controlar o foco e sustentar a circulação são prioridades."
    }
  },
  "lesao-renal-aguda-felina": {
    "simple": "Os rins perdem a capacidade de funcionar rapidamente. O gato pode parar de comer, vomitar e urinar menos; reconhecer a causa cedo pode ajudar na recuperação.",
    "pillars": {
      "Fim do Mito de \"Lavar o Rim\" (AAHA 2024 / IRIS)": "Soro em excesso não recupera o rim e pode causar sobrecarga.",
      "Cinética da Creatinina e Estadiamento IRIS 2026": "A evolução da creatinina ajuda a detectar e classificar a lesão.",
      "Débito Urinário Horário e Regra In = Out": "Urina produzida e perdas orientam o ajuste de fluidos.",
      "Terapias Extracorpóreas e Intervenção Ágil": "Complicações resistentes ao tratamento podem exigir diálise ou outra intervenção."
    }
  },
  "pielonefrite-caes-gatos": {
    "simple": "É uma infecção bacteriana nos rins. Pode causar febre, dor e alterações na urina, mas alguns animais têm sinais discretos.",
    "pillars": {
      "Nova Terminologia Consensual (Delphi 2026)": "A infecção renal precisa ser diferenciada de outros problemas urinários.",
      "Apresentação Clínica Frustra e Falso-Negativo em Gatos": "Sinais discretos e exames negativos não excluem todos os casos.",
      "Mandamento Farmacológico: Breakpoints Plasmáticos": "O antibiótico deve atingir o tecido renal adequadamente.",
      "Pielonefrose e Descompressão de Urgência (Source Control)": "Infecção com obstrução pode exigir drenagem urgente."
    }
  },
  "lesao-renal-aguda-canina": {
    "simple": "Os rins deixam de funcionar bem de repente. O cão pode vomitar, ficar abatido e mudar a quantidade de urina. O tratamento procura a causa e controla as complicações.",
    "pillars": {
      "Fim da Diurese Forçada e Regra de Ins & Outs": "Soro corrige a falta de líquido, mas o excesso pode piorar o quadro.",
      "Cinética da Creatinina e Estadiamento IRIS 2026": "A evolução da creatinina ajuda a detectar e classificar a lesão.",
      "Identificação Etiológica: Leptospirose e Toxinas": "Leptospirose e intoxicações estão entre as causas investigadas.",
      "Controle da Hipercalemia e Suporte Dialítico Ágil": "Potássio elevado e outras complicações podem exigir tratamento intensivo e diálise."
    }
  },
  "acetilcisteina": {
    "simple": "Ajuda o organismo a combater certas intoxicações e pode tornar secreções mais fluidas. O modo de usar depende do problema tratado.",
    "pillars": {
      "Reposição de Glutationa & Detoxificação de NAPQI": "Repõe componentes da defesa antioxidante na intoxicação por paracetamol.",
      "Proteção Eritrocitária contra Metemoglobinemia": "Ajuda a limitar danos oxidativos às células do sangue.",
      "Mucólise Química por Ruptura Dissulfeto": "Rompe ligações do muco, tornando-o menos espesso.",
      "Inibição de Metaloproteinases Corneanas (Antimelting)": "Tem uso local em situações específicas de lesão da córnea."
    }
  },
  "amantadina": {
    "simple": "Pode ajudar na dor persistente quando o sistema nervoso fica mais sensível. Costuma ser usada junto de outros analgésicos.",
    "pillars": {
      "Redução do Ganho Central & Modulação NMDA": "Reduz mecanismos que amplificam a percepção dolorosa.",
      "Terapia Multimodal & Sinergismo Analgésico": "É uma opção complementar no plano de analgesia.",
      "Janela de Latência Clínica & Remodelação (7 a 21 dias)": "O benefício pode levar dias ou semanas para aparecer.",
      "Depuração Renal Predominante & Cautela na DRC": "Como a eliminação depende dos rins, doença renal exige reavaliar o esquema."
    }
  },
  "amitriptilina": {
    "indications": "Usada em situações selecionadas de dor persistente, ansiedade e alguns casos refratários de cistite felina. A indicação depende da avaliação individual.",
    "attention": "Pode causar sedação, retenção urinária e efeitos cardíacos. Avaliar interações e não esperar efeito imediato.",
    "simple": "Atua no sistema nervoso e pode ajudar em problemas selecionados de comportamento e dor persistente. Seu efeito não é imediato.",
    "pillars": {
      "Inibição Pré-Sináptica de NET & SERT": "Altera neurotransmissores envolvidos em comportamento e dor.",
      "Fortalecimento da Via Descendente Inibitória da Dor": "Reforça mecanismos nervosos que reduzem a percepção dolorosa.",
      "Antagonismo H1 Sedativo & Antialérgico": "A ação sobre histamina contribui para sedação e outros efeitos.",
      "Farmacologia Anticolinérgica, Alfa-1 & Canais de Na+": "Exige cuidados ligados ao coração, à pressão e aos efeitos anticolinérgicos."
    }
  },
  "amoxicilina-clavulanato": {
    "simple": "É um antibiótico associado a uma substância que protege sua ação contra algumas defesas das bactérias. Não trata toda infecção.",
    "pillars": {
      "Ataque à Parede": "A amoxicilina interfere na parede bacteriana.",
      "Proteção Beta-Lactâmica": "O clavulanato bloqueia algumas enzimas que inativam o antibiótico.",
      "Tempo Acima da MIC (fT>MIC)": "Os intervalos ajudam a manter a exposição necessária.",
      "Use Só Quando Acrescentar Valor": "A associação deve trazer vantagem para a indicação escolhida."
    }
  },
  "ampicilina-sulbactam": {
    "simple": "É um antibiótico combinado com uma substância que protege sua ação. Pode integrar o tratamento hospitalar de infecções por bactérias sensíveis.",
    "pillars": {
      "Quebre a Parede": "A ampicilina age na parede das bactérias.",
      "Proteja o Beta-Lactâmico": "O sulbactam protege contra algumas enzimas bacterianas.",
      "Tempo Acima da MIC (fT>MIC)": "Os intervalos fazem parte da eficácia.",
      "Controle de Foco é Soberano": "Corrigir ou drenar a origem da infecção pode ser indispensável."
    }
  },
  "betanecol": {
    "simple": "Estimula a contração da bexiga em situações específicas. Só deve ser considerado depois de verificar se a urina tem passagem livre.",
    "pillars": {
      "Agonismo Muscarínico M3 Direto no Detrusor Vesical": "Estimula receptores ligados à contração da bexiga.",
      "Princípio da Patência Uretral Antes da Potência Detrusora": "A saída da urina precisa estar livre.",
      "Seletividade em Detrusor Recrutável & Lesão Parcial": "Nem toda bexiga enfraquecida responde ao medicamento.",
      "Posologia Fixa por Paciente & Titulação Funcional": "O ajuste considera resposta funcional e efeitos adversos."
    }
  },
  "buprenorfina": {
    "simple": "É um analgésico opioide usado para aliviar dor. A resposta depende da espécie, da via e do tipo de dor.",
    "pillars": {
      "Alta Afinidade Mu e Dissociação Lenta": "Liga-se fortemente aos receptores opioides e se desprende lentamente.",
      "Agonismo Parcial com Teto Analgésico": "Pode atender à dor leve a moderada; dor intensa geralmente exige outras estratégias.",
      "Alta Lipofilicidade e Absorção Transmucosa Oral (OTM)": "Em gatos, a absorção pela mucosa bucal permite uso sem injeções em situações selecionadas.",
      "Marcada Histerese Farmacodinâmica": "A resposta deve ser avaliada por sinais e escalas de dor, não apenas pela concentração sanguínea."
    }
  },
  "capromorelina": {
    "simple": "Estimula a vontade de comer. Pode ajudar em casos selecionados, mas não substitui a investigação da falta de apetite.",
    "pillars": {
      "Drive Orexigênico Direto": "Ativa mecanismos relacionados à fome.",
      "Eixo Somatotrófico GH-IGF-1": "Também age sobre o eixo do hormônio do crescimento.",
      "Ação Farmacológica Específica": "Seu principal benefício é estimular o apetite.",
      "Trate a Causa de Base Sempre": "A causa da perda de apetite precisa ser tratada."
    }
  },
  "ceftriaxona": {
    "simple": "É um antibiótico injetável para infecções por bactérias sensíveis. Exige indicação cuidadosa e atenção ao preparo e à administração.",
    "pillars": {
      "Mecanismo Bactericida e Lise Osmótica": "Interfere na parede bacteriana e provoca morte de agentes sensíveis.",
      "Ação Tempo-Dependente (fT > MIC) e Meia-Vida Curta": "A exposição ao longo do tempo influencia a eficácia.",
      "Incompatibilidade Absoluta com Cálcio e Ringer Lactato": "Soluções com cálcio exigem atenção à incompatibilidade.",
      "Antimicrobial Stewardship e Classificação WOAH": "O uso criterioso ajuda a limitar resistência bacteriana."
    }
  },
  "ciclosporina": {
    "simple": "Diminui uma parte da resposta de defesa do organismo. É usada em algumas alergias e doenças em que essa resposta causa lesões.",
    "pillars": {
      "Inibição Específica da Calcineurina & Bloqueio da Interleucina-2 (IL-2)": "Reduz a ativação de linfócitos por bloqueio da calcineurina.",
      "Ausência de Mielossupressão Citotóxica & Preservação Medular": "Seu mecanismo difere dos citotóxicos que afetam a medula.",
      "Formulação Microemulsificada versus Oleosa & Variabilidade Farmacocinética": "A formulação influencia a absorção e não deve ser trocada sem avaliação.",
      "Toxoplasmose Felina & Cuidados Espécie-Específicos de Manejo": "Em gatos, toxoplasmose e outras infecções exigem cuidados específicos."
    }
  },
  "clindamicina": {
    "simple": "É um antibiótico usado em algumas infecções, inclusive dentárias e ósseas, e em situações específicas de toxoplasmose.",
    "pillars": {
      "Bloqueio Ribossomal 50S": "Interfere na produção de proteínas do agente sensível.",
      "Anaeróbios e Gram-Positivos": "Cobre diversos gram-positivos e anaeróbios, com aplicações em infecções de pele, boca e abscessos.",
      "Distribuição Óssea Profunda": "Penetra no tecido ósseo, sendo uma opção em osteomielite por agentes sensíveis.",
      "Ação no Apicoplasto": "Bloqueia a produção de proteínas em uma estrutura de Toxoplasma e Neospora."
    }
  },
  "clorambucil": {
    "simple": "É usado em alguns cânceres e doenças de defesa exagerada do organismo. Precisa de acompanhamento do sangue durante o tratamento.",
    "pillars": {
      "Alquilação Bifuncional & Grampeamento Covalente do DNA": "Danifica o DNA e limita a multiplicação das células-alvo.",
      "A Medula Paga o Preço: Mielossupressão Limitante & Cumulativa": "Pode reduzir a produção de células sanguíneas.",
      "Pequenas Células, Grandes Respostas: O Grande Nicho Felino": "Tem aplicação importante em alguns linfomas felinos.",
      "Quimioterapia Metronômica & Modulação Imunológica Lenta": "Resposta e efeitos adversos exigem acompanhamento ao longo do tempo."
    }
  },
  "diazepam": {
    "simple": "Age rapidamente no sistema nervoso e pode controlar convulsões, relaxar músculos e causar sedação. A forma de uso muda muito sua segurança.",
    "pillars": {
      "Modulação Alostérica Positiva do Receptor GABA-A": "Reforça sinais inibitórios do sistema nervoso.",
      "Transposição Ultrarrápida da Barreira Hematoencefálica": "A chegada rápida ao cérebro favorece o uso emergencial.",
      "Relaxamento Muscular Central e Ação Pré-Anestésica Sinergista": "Pode complementar relaxamento muscular e anestesia.",
      "Fármaco de Resgate Agudo com Limitação em Manutenção": "Resgate agudo e uso contínuo têm limitações diferentes."
    }
  },
  "dipirona": {
    "simple": "Ajuda a aliviar dor e febre. Pode integrar um tratamento combinado, conforme o paciente e a intensidade dos sintomas.",
    "pillars": {
      "Pró-Fármaco de Conversão Pré-Sistêmica": "O organismo a transforma em substâncias ativas.",
      "Ação Analgésica Multimodal & Central": "Age por mais de um mecanismo relacionado à dor.",
      "Antipirético de Referência & Termorregulação": "Reduz febre por ação na regulação da temperatura.",
      "Espasmólise em Músculo Liso Visceral": "Também age sobre espasmos da musculatura lisa."
    }
  },
  "enrofloxacina": {
    "indications": "Infecções selecionadas por bactérias sensíveis, incluindo focos urinários e prostáticos. A escolha deve considerar cultura, local da infecção e alternativas.",
    "simple": "É um antibiótico para infecções por bactérias sensíveis. Em gatos, a exposição excessiva pode lesionar a visão.",
    "pillars": {
      "Bactericidia Concentração-Dependente": "A eficácia depende da concentração atingida; subdosagem pode favorecer resistência.",
      "Penetração Tecidual Ampla e Intracelular": "Penetra em rins, próstata, pulmões e pele, conforme a indicação.",
      "Espectro Gram-Negativo Potente com Lacunas Críticas": "Atua contra gram-negativos sensíveis, mas não cobre anaeróbios estritos e tem lacunas contra alguns gram-positivos.",
      "Teto Posológico Felino Inegociável (5 mg/kg/dia)": "Respeitar a exposição em gatos é essencial para proteger a retina."
    }
  },
  "hidroxido-de-aluminio": {
    "simple": "Reduz a absorção do fósforo da comida. Pode ser usado quando o fósforo do sangue está alto, especialmente na doença renal.",
    "pillars": {
      "Capturar antes de Absorver": "Liga-se ao fósforo ainda no intestino.",
      "Refeição é Parte do Mecanismo": "A administração com alimento faz parte da ação.",
      "Titulação por Metas IRIS 2026": "O ajuste depende do fósforo sanguíneo e do contexto renal.",
      "Alumínio Não é Inerte": "Constipação e acúmulo de alumínio exigem acompanhamento."
    }
  },
  "levetiracetam": {
    "simple": "Ajuda a controlar convulsões. Os horários, a formulação e a função dos rins influenciam seu uso.",
    "pillars": {
      "Modulação Pré-Sináptica da Proteína Vesicular SV2A": "Modula uma proteína da liberação de sinais entre neurônios.",
      "Ação Rápida e Previsível com Pico Plasmático em Menos de 2 Horas": "A absorção rápida é útil em determinados esquemas.",
      "Mínima Sobrecarga Hepática e Independência do Citocromo P450": "Depende pouco do metabolismo hepático.",
      "Depuração e Eliminação Renal Previsível com Baixa Ligação Proteica": "A eliminação pelos rins exige atenção a pacientes com função renal comprometida."
    }
  },
  "marbofloxacina": {
    "simple": "É um antibiótico para infecções selecionadas por bactérias sensíveis. A escolha considera o local da infecção e os exames.",
    "pillars": {
      "Ação Concentração-Dependente (q24h)": "A eficácia depende da exposição adequada.",
      "Biodisponibilidade Completa e Ampla Penetração": "Distribui-se em diferentes tecidos.",
      "Antimicrobial Stewardship Rigoroso": "Reservar para indicações justificadas por cultura e sensibilidade, evitando uso indiscriminado em infecções simples.",
      "Segurança Ocular Diferenciada em Felinos": "Nas doses terapêuticas, não apresenta a mesma associação com lesão retiniana da enrofloxacina; manter cautela de classe."
    }
  },
  "meloxicam": {
    "simple": "É um anti-inflamatório que alivia dor e pode melhorar o movimento. A segurança depende da hidratação, das doenças associadas e da espécie.",
    "pillars": {
      "Inibição Preferencial de COX-2 e Supressão de PGE2": "Reduz a produção de mediadores inflamatórios.",
      "Atenuação da Sensibilização Nociceptiva Periférica e Central": "Diminui mecanismos de sensibilização dolorosa.",
      "Restauração da Mobilidade e Conforto Sinovial na Osteoartrite": "Pode melhorar conforto e mobilidade na doença articular.",
      "Efeito Antipirético Hipotalâmico de Ação Central": "Também reduz febre, sem substituir a investigação da causa."
    }
  },
  "metadona": {
    "simple": "É um analgésico opioide para dores moderadas a intensas. Precisa de avaliação da resposta e monitoramento, especialmente com outros sedativos.",
    "pillars": {
      "Agonismo Mu-Opioide Pleno e Potente": "Atua fortemente em receptores opioides ligados à analgesia.",
      "Antagonismo NMDA e Modulação Monoaminérgica": "Também modula outras vias da dor.",
      "Efeito Poupador de Anestésicos e Perfil Hemodinâmico": "Pode reduzir a necessidade de anestésicos, com acompanhamento circulatório.",
      "Mínima Emetogênese e Alta Titulabilidade": "A administração pode ser ajustada à resposta clínica."
    }
  },
  "micofenolato-mofetila": {
    "simple": "Reduz a multiplicação de algumas células de defesa. Pode ajudar quando o sistema imune ataca o próprio organismo.",
    "pillars": {
      "Inibição Seletiva da IMPDH-II & Bloqueio Linfocitário de Purinas": "Limita uma via necessária à multiplicação dos linfócitos.",
      "Pró-Fármaco MMF versus Ácido Micofenólico Ativo (MPA)": "É convertido no organismo em sua forma ativa.",
      "Variabilidade Farmacocinética & Recirculação Entero-Hepática": "Exposição e interações variam entre pacientes.",
      "Toxicidade Gastrointestinal como Fator Dose-Limitante": "Efeitos digestivos, especialmente diarreia, podem limitar o tratamento."
    }
  },
  "fenobarbital": {
    "simple": "É usado para prevenir convulsões. O tratamento precisa de horários regulares, exames e ajustes acompanhados.",
    "pillars": {
      "Padrão Ouro Internacional na Epilepsia": "É uma opção consolidada para controle da epilepsia.",
      "Monitoramento Sérico Obrigatório (TDM)": "A concentração sanguínea ajuda a orientar o tratamento.",
      "Autoindução Enzimática em Cães": "O metabolismo pode mudar durante o uso em cães.",
      "Risco de Abstinência & Desmame Lento": "A retirada deve ser planejada, nunca abrupta."
    }
  },
  "pradofloxacina": {
    "simple": "É um antibiótico para algumas infecções por bactérias sensíveis. Sua escolha precisa ser justificada pelo caso.",
    "pillars": {
      "Duplo Bloqueio das Topoisomerases": "Age em enzimas essenciais à multiplicação bacteriana.",
      "Bactericidia Concentração-Dependente": "A exposição influencia a eficácia.",
      "Ampla Distribuição Tissular e Acúmulo Leucocitário": "Distribui-se nos tecidos e em células de defesa.",
      "Segurança Retiniana Felina Comprovada": "O perfil retiniano difere da enrofloxacina, mas isso não autoriza extrapolar doses ou indicações."
    }
  },
  "prednisolona": {
    "simple": "É um corticoide que reduz inflamação e a resposta imune. A dose e o tempo de uso dependem da doença.",
    "pillars": {
      "Freio Inflamatório Transcricional (NF-kB e Eicosanoides)": "Diminui sinais que sustentam a inflamação.",
      "Imunossupressão Celular e Downregulation de Receptores Fc": "Em determinados esquemas, reduz a resposta imune.",
      "Reposição Endócrina no Hipoadrenocorticismo": "Pode repor ação hormonal em situações específicas.",
      "Ação Linfolítica e Adjuvância Antineoplásica": "Também participa de alguns tratamentos oncológicos."
    }
  },
  "pronefra": {
    "simple": "É um suplemento usado como apoio em alguns pacientes com doença renal. Precisa de acompanhamento e não substitui o tratamento principal.",
    "pillars": {
      "Captura Mineral de Fósforo (CaCO3 + MgCO3)": "Componentes minerais ligam-se ao fósforo intestinal.",
      "Adsorção Entérica de Toxinas (Quitosana Fúngica)": "A formulação inclui um componente adsorvente intestinal.",
      "Administração Obrigatória com as Refeições": "A relação com as refeições faz parte da proposta de uso.",
      "Vigilância Estrita de Cálcio e Fósforo (IRIS 2026)": "Cálcio e fósforo devem ser acompanhados."
    }
  },
  "sucralfato": {
    "simple": "Forma uma camada protetora sobre algumas feridas do esôfago e do estômago. Age no local e pode atrapalhar a absorção de outros remédios.",
    "pillars": {
      "Curativo Químico Seletivo por Carga Eletrostática": "Adere às áreas lesionadas da mucosa.",
      "Bloqueio de H+, Pepsina e Sais Biliares Regurgitados": "Protege a lesão do contato com substâncias irritantes.",
      "Preservação de Fatores Tróficos (EGF) & Reparo Tecidual": "A proteção local pode favorecer o reparo.",
      "Ação Intraluminal Estrita & Quelação de Outros Fármacos": "Separar outros medicamentos conforme orientação evita interações de absorção."
    }
  },
  "sulfametoxazol-trimetoprima": {
    "simple": "É uma associação que combate agentes sensíveis ao dificultar sua multiplicação. Pode causar efeitos adversos e exige indicação cuidadosa.",
    "pillars": {
      "Duplo Bloqueio do Folato": "Bloqueia etapas complementares da produção de folato.",
      "Eficácia Tempo-Dependente": "Manter o esquema faz parte da eficácia.",
      "Alta Concentração Urinária": "A eliminação urinária importa em algumas indicações.",
      "Aprisionamento Prostático": "A distribuição prostática influencia a escolha em casos selecionados."
    }
  },
  "tramadol": {
    "simple": "É um analgésico cuja resposta varia entre cães e gatos. O alívio precisa ser reavaliado, sem presumir que seja suficiente sozinho.",
    "pillars": {
      "O M1 Decide a Força Opioide": "Parte do efeito depende de um metabólito ativo.",
      "Analgesia Descendente Monoaminérgica": "Também age em vias nervosas que modulam a dor.",
      "No Cão, o Metabolismo Trabalha Contra": "Cães produzem pouco metabólito ativo; o uso oral não deve ser presumido eficaz como única analgesia.",
      "No Gato, a Farmacologia é Outra": "Gatos formam mais metabólito ativo; o sabor amargo pode dificultar a administração."
    }
  },
  "trazodona": {
    "simple": "É um modulador serotoninérgico (SARI) calmante para estresse situacional, viagens e visitas veterinárias. A sedação não equivale necessariamente a alívio total do medo e a resposta varia muito entre indivíduos.",
    "pillars": {
      "Modulação Serotoninérgica SARI (5-HT2A + SERT)": "Inibe recaptação de serotonina e bloqueia receptores 5-HT2A, direcionando a transmissão para circuitos ansiolíticos 5-HT1A.",
      "Atenuação do Arousal Adrenérgico e Bloqueio Alfa-1": "Bloqueia receptores alfa-1 adrenérgicos, reduzindo o estado de vigília e reatividade, com risco de hipotensão arterial transitória.",
      "O Paradoxo Farmacológico do Metabólito mCPP": "Metabólito ativo agonista não seletivo de serotonina pode desencadear agitação paradoxal e desinibição comportamental atípica.",
      "Sedação ≠ Ansiólise & Variabilidade Farmacocinética": "A tranquilização motora não assegura extinção do medo subjetivo; requer dose-teste prévia e técnicas de manejo Fear Free."
    }
  },
  "miltefosina": {
    "simple": "É um leishmanicida oral multialvo que destrói Leishmania infantum desestruturando membranas e mitocôndrias. Não produz cura esterilizante, tem meia-vida de quase uma semana e exige controle vetorial contínuo.",
    "pillars": {
      "Leishmanicida, Não Esterilizante": "Reduz drasticamente a carga parasitária tecidual e alivia sintomas, mas não elimina o parasita do organismo canino.",
      "Mecanismo Biofísico Multialvo": "Desestabiliza membranas fosfolipídicas, inibe biossíntese de fosfatidilcolina e colapsa a integridade mitocondrial do protozoário.",
      "Permanência Ultra-Prolongada (t½ ~6,9 dias)": "Meia-vida de quase uma semana promove acúmulo contínuo até o 28º dia do ciclo de tratamento oral.",
      "A Cauda Farmacocinética e Risco de Resistência": "Eliminação lenta gera cauda subterapêutica por semanas, exigindo controle vetorial rigoroso para prevenir seleção de cepas resistentes."
    }
  },
  "domperidona": {
    "simple": "É um antagonista da dopamina periférico com baixa penetração no cérebro. Seu uso principal atual em cães é a imunomodulação preventiva da leishmaniose em áreas endêmicas.",
    "pillars": {
      "Antagonismo D₂ Periférico e Baixa Passagem na BHE": "Age fora do cérebro na CRTZ e trato gastrintestinal, com efluxo ativo pela P-glicoproteína que previne efeitos extrapiramidais.",
      "Eixo Hipofisário e Hiperprolactinemia Imunomoduladora": "Estimula a liberação de prolactina pela adeno-hipófise, ativando macrófagos e direcionando a resposta celular Th1 protetora contra Leishmania.",
      "Bloqueio hERG/Kv11.1 e Risco Eletrocardiográfico de QTc": "Bloqueia canais de potássio IKr com aumento comprovado do QTc em cães; contraindicada com azólicos, macrolídeos e antiarrítmicos.",
      "Prevenção vs Tratamento: Divergência Crítica (WAVD 2025 vs CLWG 2026)": "Eficácia preventiva comprovada em cães soronegativos (WAVD 2025), mas não recomendada como monoterapia na doença instalada."
    }
  },
  "metoclopramida": {
    "simple": "É um antiemético e estimulante da motilidade gastroduodenal (pró-cinético). Atua bloqueando a dopamina e ativando a serotonina 5-HT4. Em 2026, seu uso intravenoso foi atualizado: o bolus rápido de 1 mg/kg foi formalmente abandonado pelo risco de parada cardíaca, adotando-se doses de ataque conservadoras (0,05 a 0,1 mg/kg) antes da infusão contínua.",
    "pillars": {
      "Antagonismo D₂ Central no Circuito Emético": "Bloqueia receptores D2 na zona de gatilho do vômito (CRTZ) e centro emético, conferindo eficácia antiemética no cão.",
      "Pró-cinese Proximal via Agonismo 5-HT₄ e Liberação de ACh": "Ativa receptores 5-HT4 mioentéricos, estimulando liberação de acetilcolina e acelerando esvaziamento de estômago e duodeno.",
      "Não é Pró-cinético Distal nem de Cólon": "Ação motora restrita ao trato gastrointestinal superior; não estimula motilidade colônica nem alivia constipação distal.",
      "Eficácia e Toxicidade Nascem do Mesmo Alvo D₂": "Bloqueio dopaminérgico central pode produzir sedação ou reações extrapiramidais agudas, prontamente revertidas com difenidramina."
    }
  },
  "molidustat": {
    "simple": "É um medicamento oral inovador aprovado exclusivamente para gatos com anemia não regenerativa por doença renal crônica. Age enganando as células renais para produzirem sua própria eritropoietina nativa felina, eliminando o perigo de anticorpos e aplasia de medula dos tratamentos humanos antigos.",
    "pillars": {
      "Pseudo-Hipóxia Molecular Controlada": "Inibe enzimas prolil-hidroxilases (PHD), estabilizando o fator HIF-2α e simulando hipóxia para estimular síntese de EPO.",
      "Reativação da EPO Felina Autóloga (Sem PRCA)": "Estimula produção de eritropoietina nativa felina, eliminando o risco de anticorpos neutralizantes e aplasia pura da medula.",
      "Eritropoiese Fisiológica e Ordenada": "Promove elevação gradual e fisiológica da massa eritrocitária em gatos com anemia crônica não regenerativa por DRC.",
      "Ciclos Monitorados de até 28 Dias": "Uso restrito a ciclos de 28 dias com monitoramento semanal de hematócrito e pausa obrigatória de pelo menos 7 dias."
    }
  },
  "maropitant": {
    "simple": "É um antiemético de amplo espectro que bloqueia a via final comum do reflexo do vômito (receptores NK1) no cérebro e trato digestivo. Controla o vômito em cães e gatos, mas não elimina a náusea nem estimula o apetite. A injeção subcutânea deve ser refrigerada para diminuir a dor.",
    "pillars": {
      "Bloqueio da Via Final Comum da Êmese (NK₁ Central e Periférico)": "Antagoniza receptores NK1 e impede que a substância P ative centros eméticos centrais e fibras vagais periféricas.",
      "Diferenciação Crítica: Antiêmese Não Significa Antináusea": "Bloqueia eficazmente o reflexo motor do vômito, mas não extingue necessariamente a sensação neurovegetativa de náusea.",
      "Modulação Antinociceptiva Visceral e Poupança de Anestésico (MAC)": "A modulação de substância P reduz nocicepção visceral e proporciona redução demonstrada de 15% a 24% na CAM anestésica.",
      "Farmacocinética Não Linear Canina e Eliminação Não Renal (<1%)": "Metabolismo saturável de primeira passagem hepática por CYP2D15; excreção renal ínfima dispensa corte de dose na DRC."
    }
  },
  "ondansetrona": {
    "simple": "É um potente antináusea e antiemético que bloqueia receptores 5-HT3 no intestino e cérebro, aliviando o enjoo e a salivação. Em cães, a via subcutânea tem biodisponibilidade muito superior à oral (~85% vs ~5%). Em gatos, é segura na doença renal crônica sem necessidade de ajuste por IRIS.",
    "pillars": {
      "Bloqueio Rápido do Canal Iônico 5-HT₃ (Periférico e Central)": "Canal iônico regulado por ligante que bloqueia instantaneamente a despolarização vagal entérica e da área postrema.",
      "Potente Ação Antináusea & Sinergismo com Maropitant": "Reduz náusea, salivação e lambedura labial; age sinergicamente com o maropitant no controle emético completo.",
      "Quebra de Paradigma Farmacocinético Canino 2026 (SC 85% vs VO 5%)": "Baixíssima absorção oral (~5%) em cães; via subcutânea atinge 85% de biodisponibilidade em 15 minutos.",
      "Depuração Hepática Sem Corte de Dose em DRC Felina (iCatCare 2026)": "Excreção renal menor que 5%; consenso dispensa corte de dose em gatos com DRC, exigindo cautela hepatobiliar."
    }
  },
  "metimazol": {
    "simple": "É o principal fármaco para hipertireoidismo felino, bloqueando a síntese de novos hormônios tireoidianos (T4 e T3). Controla a sobrecarga metabólica e cardíaca, mas não destrói o adenoma. Requer monitoramento renal para dosar sem desmascarar azotemia grave nem induzir hipotireoidismo iatrogênico.",
    "pillars": {
      "Inibição Seletiva da Tireoperoxidase (TPO)": "Bloqueia a síntese de novos hormônios tireoidianos nas etapas de oxidação e acoplamento, sem destruir o tecido tireoidiano.",
      "Reversibilidade Farmacológica e Caráter \"Trial\" Renal": "Permite avaliar com segurança se a reversão da tireotoxicose desmascara insuficiência renal crônica subjacente antes de terapias definitivas.",
      "Controle da Tireotoxicose Sem Cura Estrutural": "Controla os sinais clínicos hormonais, mas o tecido adenomatoso continua crescendo com o tempo, sem cura estrutural.",
      "Titulação Fina e Prevenção do Hipotireoidismo Iatrogênico": "O alvo é TT4 entre 1,0–2,5 µg/dL; hipotireoidismo iatrogênico reduz filtração glomerular, agrava azotemia e piora sobrevida."
    }
  },
  "dexametasona": {
    "simple": "É um glicocorticoide sintético de alta potência (~30x hidrocortisona) e longa ação (24–48h), sem retenção de sódio. Contraindicada com AINEs e no trauma cranioencefálico agudo. No choque anafilático, adrenalina é a prioridade vital, pois dexametasona leva horas para iniciar ação genômica.",
    "pillars": {
      "Reprogramação Genômica e Transrepressão Inflamatória": "Inibe transcrição de citocinas inflamatórias (NF-κB e AP-1) com potência ~30x superior à hidrocortisona e sem ação mineralocorticoide.",
      "Dissociação Farmacocinética/Farmacodinâmica (Longa Duração)": "Meia-vida plasmática curta (2–5 horas no cão), mas reprogramação transcricional e efeito biológico sustentado por 24 a 48 horas.",
      "Superioridade Diagnóstica no Eixo HPA (Não Interfere no Cortisol)": "Fármaco de escolha na suspeita de Addison em crise por não reagir com ensaios de cortisol, e padrão nos testes de supressão.",
      "Quebra de Paradigmas Clínicos (Consensos RECOVER & ACVIM 2026)": "Contraindicada no trauma de crânio e coluna; na anafilaxia grave, adrenalina é o pilar imediato enquanto corticoides têm papel tardio."
    }
  }
};
