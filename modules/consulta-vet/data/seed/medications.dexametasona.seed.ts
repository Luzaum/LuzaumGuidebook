import { MedicationRecord } from '../../types/medication';

export const dexametasonaMedicationRecord: MedicationRecord = {
  id: 'med-dexametasona',
  slug: 'dexametasona',
  title: 'Dexametasona',
  activeIngredient:
    'Dexametasona base / Fosfato dissódico de dexametasona / Acetato de dexametasona (C₂₂H₂₉FO₅)',
  isControlled: false,
  tradeNames: [
    'Azium® Solução Injetável 2 mg/mL (MSD Saúde Animal — Veterinário)',
    'Azium® 0,5 mg Comprimidos (MSD Saúde Animal — Veterinário)',
    'Dexagard® 0,5 mg Comprimidos (Pearson Saúde Animal — Veterinário)',
    'Isacort® 0,5 mg Comprimidos (Pearson Saúde Animal — Veterinário)',
    'Decadron® Injetável 2 mg/mL e 4 mg/mL (Aché — Linha Humana / Referência Hospitalar)',
    'Dexametasona Genérico Solução Injetável e Comprimidos (Eurofarma, EMS, Teuto, Hipolabor)',
  ],
  officialSiteUrl: 'https://www.msd-saude-animal.com.br/produto/azium-solucao/',
  leafletUrl: 'https://www.msd-saude-animal.com.br/produto/azium-comprimidos/',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/dexamethasone/PNG',
  priceReference: {
    amountBrl: 42.0,
    label:
      'Azium® Solução Injetável 2 mg/mL (frasco 10 mL): R$ 38,00 a R$ 56,00 | Azium® 0,5 mg (blíster c/ 10 comp): R$ 18,00 a R$ 28,00 | Dexagard® 0,5 mg (cx c/ 20 comp): R$ 22,00 a R$ 35,00 | Decadron® Injetável 2 mg/mL (ampola 1 mL): R$ 12,00 a R$ 18,00 | Decadron® Injetável 4 mg/mL (FA 2,5 mL): R$ 24,00 a R$ 38,00 | Genérico Injetável 4 mg/mL: R$ 8,00 a R$ 15,00',
    presentation: 'Azium® Solução Injetável 2 mg/mL frasco-ampola com 10 mL (MSD Saúde Animal)',
    sourceName: 'Varejo Veterinário Especializado / Distribuidores Hospitalares ANVISA',
    sourceUrl: 'https://www.msd-saude-animal.com.br',
    checkedAt: '2026-10-06',
    notes:
      'Medicamento veterinário devidamente registrado no MAPA e apresentações humanas registradas na ANVISA de uso extralabel comum. Venda sob prescrição veterinária simples (não sujeito a controle especial pela Portaria 344/98).',
  },
  pharmacologicClass:
    'Glicocorticoide sintético fluorinado de longa ação biológica (desprovido de atividade mineralocorticoide); potente anti-inflamatório, imunossupressor, linfolítico e modulador transcricional nuclear',
  species: ['dog', 'cat'],
  category: 'terapeutica-geral',
  tags: [
    'Dexametasona',
    'Fosfato de Dexametasona',
    'Azium',
    'Dexagard',
    'Decadron',
    'Glicocorticoide',
    'Anti-inflamatório Esteroidal',
    'Imunossupressor',
    'ACVIM IMHA 2019',
    'Addison Emergencial',
    'AAHA 2023',
    'Edema Cerebral Peritumoral',
    'LDDST',
    'HDDST',
    'RECOVER 2026',
    'Contraindicado com AINE',
    'Receituário Simples',
  ],

  indications: [
    'Terapia anti-inflamatória parenteral ou enteral de curto prazo em afecções alérgicas, dermatológicas, oftálmicas e musculoesqueléticas agudas severas.',
    'Tratamento imunossupressor emergencial de resgate na Anemia Hemolítica Imunomediada (IMHA) e Trombocitopenia Imunomediada canina quando o paciente apresenta vômitos ou incapacidade de tolerar prednisolona oral (Consenso ACVIM 2019).',
    'Suporte glicocorticoide emergencial na suspeita de Crise Addisoniana aguda (hipoadrenocorticismo) antes ou durante a realização do teste de estimulação com ACTH (não interfere na dosagem de cortisol sérico; Diretriz AAHA 2023).',
    'Redução de edema vasogênico peritumoral cerebral em neoplasias intracranianas primárias ou metastáticas em cães (Poirier et al. 2025).',
    'Testes diagnósticos funcionais do eixo hipotálamo-hipófise-adrenal: Teste de Supressão por Baixa Dose de Dexametasona (LDDST) e por Alta Dose (HDDST) em cães e gatos com suspeita de Hiperadrenocorticismo (Síndrome de Cushing).',
    'Componente linfolítico de protocolos quimioterápicos antineoplásicos (mieloma múltiplo, linfoma resistente); NUNCA administrar antes da biópsia ou citometria confirmatória de linfoma.',
  ],

  relatedDiseaseSlugs: [
    'anemia-hemolitica-imunomediada-canina-imha',
    'hipoadrenocorticismo-caes-addison',
    'sindrome-cushing-caes',
    'linfoma-canino',
    'mastocitoma-canino',
  ],

  attentionSubtitle:
    'Glicocorticoide fluorinado de alta potência (~7–7,5× mais potente que a prednisolona; ~30× hidrocortisona) e longa duração biológica (24–48+ horas). Alertas Críticos ConsultaVET: 1) DISSOCIAÇÃO MEIA-VIDA vs EFEITO: a meia-vida plasmática canina é de apenas 2–5 h, mas a reprogramação gênica persiste por 24 a 48+ h; evitar repetições frequentes desnecessárias (risco severo de atrofia adrenal e toxicidade sistêmica); 2) ASSOCIAÇÃO COM AINEs FORMALMENTE PROIBIDA: potencializa dramaticamente o risco de erosão, hemorragia e perfuração gastrointestinal fatal (especialmente perfuração colônica no cão); 3) MUDANÇAS DE PARADIGMA RECOVER 2026 & ACVIM: contraindicado o uso empírico rotineiro na anafilaxia (a prioridade absoluta que salva vidas é ADRENALINA; corticoide é lento e atua por síntese proteica), contraindicado no traumatismo cranioencefálico (TCE) e contraindicado na fase aguda da extrusão de disco intervertebral (IVDD); 4) CRISE ADDISONIANA: fármaco de escolha pré-teste porque NÃO cruza no ensaio imunoenzimático de cortisol sérico; 5) GATOS E DIABETES: gatos têm alta suscetibilidade à hiperglicemia e resistência insulínica; monitorar glicemia de perto; 6) NUNCA administrar ésteres insolúveis de acetato por via intravenosa (usar exclusivamente fosfato dissódico hidrossolúvel).',

  plainLanguageSummary:
    'A dexametasona (famosa por marcas veterinárias como Azium® e Dexagard®, e humana como Decadron®) é um dos anti-inflamatórios esteroidais (corticoides) mais potentes da medicina. Ela é cerca de 7 vezes mais forte que a prednisolona e 30 vezes mais forte que o cortisol natural. Além de muito potente, a dexametasona tem uma característica que exige muito respeito: mesmo sumindo do sangue em poucas horas, ela altera o funcionamento das células por 24 a 48 horas inteiras (efeito biológico prolongado).\n\nJustamente por sua enorme potência e duração, os consensos veterinários modernos (2024–2026) alertam para mudanças fundamentais no seu uso: Primeiro, ela NUNCA deve ser misturada com anti-inflamatórios não esteroidais (AINEs como meloxicam, carprofeno ou dipirona em doses inflamatórias), pois essa combinação destrói a proteção do estômago e intestino, podendo causar úlceras perfuradas e hemorragias fatais em cães. Segundo, na anafilaxia (choque alérgico grave), a nova diretriz internacional de emergência (RECOVER 2026) orienta NÃO usar corticoide como salvador imediato: o remédio que salva a vida do animal em minutos é a Adrenalina! O corticoide é lento porque depende de fabricar novas proteínas nas células e não resolve o colapso respiratório ou circulatório agudo.\n\nPor outro lado, a dexametasona brilha em situações especiais: quando um cão chega em crise de falta de cortisol (crise Addisoniana) e precisa de socorro imediato, a dexametasona pode ser injetada na veia sem atrapalhar o exame de sangue confirmatório (teste de ACTH), pois ela não se confunde quimicamente com o cortisol no laboratório. Nos gatos, o uso deve ser muito cauteloso porque eles desenvolvem resistência à insulina e diabetes com muita facilidade sob corticoides potentes.',

  pillars: [
    {
      title: 'Reprogramação Genômica e Transrepressão Inflamatória',
      icon: 'Zap',
      desc: 'Liga-se ao receptor citosólico de glicocorticoide (GR/NR3C1), promovendo translocação nuclear. Induz Anexina A1 (que bloqueia a fosfolipase A2 no topo da cascata) e transreprime diretamente os fatores NF-κB e AP-1, silenciando a transcrição de citocinas inflamatórias (TNF-α, IL-1β, IL-6), COX-2 e iNOS.',
    },
    {
      title: 'Dissociação Farmacocinética/Farmacodinâmica (Longa Duração)',
      icon: 'Activity',
      desc: 'Enquanto a meia-vida plasmática no cão é de apenas 2 a 5 horas, a modificação transcricional intracelular perdura por 24 a 48+ horas. Essa dissociação orienta que o intervalo posológico deve ser espaçado (q24h a q48h) e que repetições precipitadas acumulam toxicidade biológica desastrosa.',
    },
    {
      title: 'Superioridade Diagnóstica no Eixo HPA (Não Interfere no Cortisol)',
      icon: 'ShieldCheck',
      desc: 'Diferente da prednisolona e hidrocortisona, a dexametasona não apresenta reatividade cruzada na maioria dos imunoensaios de cortisol. Pode ser administrada imediatamente para estabilização de cães em choque addisoniano sem invalidar a dosagem do teste de estimulação com ACTH.',
    },
    {
      title: 'Quebra de Paradigmas Clínicos (Consensos RECOVER & ACVIM 2026)',
      icon: 'AlertTriangle',
      desc: 'Abandono do uso empírico na anafilaxia (prioridade absoluta é adrenalina; RECOVER 2026), abandono de doses de choque na sepse e TCE (sem neuroproteção comprovada), contraindicação na fase aguda da IVDE (ACVIM 2022) e proibição absoluta de associação concomitante com AINEs.',
    },
  ],

  clinicalFoundationsData: [
    {
      id: 'found-dex-farmacologia-potencia',
      title: 'Farmacodinâmica Molecular, Equivalência de Potência e Dissociação PK/PD',
      narrative:
        'A dexametasona (9α-flúor-16α-metilprednisolona) é um glicocorticoide sintético de longa ação biológica pertencente à família dos esteroides pregnanos fluorados. A adição de um átomo de flúor na posição C9 e de um grupamento metila na posição C16 confere duas propriedades estruturais cruciais: potencializa dramaticamente a afinidade pelo receptor intracelular de glicocorticoide (GR / NR3C1) e elimina quase que integralmente qualquer afinidade mineralocorticoide pelo receptor de aldosterona (MR). De acordo com os tratados clássicos de farmacologia (Plumb’s 10ª ed., pp. 361–366; BSAVA 10ª ed., pp. 114–115), a dexametasona é cerca de 30 vezes mais potente que a hidrocortisona e aproximadamente 7 a 7,5 vezes mais potente que a prednisolona. Na prática clínica veterinária, adota-se a regra de conversão de dividir a dose requerida de prednisolona por 7 (ex.: 1 mg/kg de prednisolona equivale a ~0,14 mg/kg de dexametasona). Molecularmente, o complexo ativado DEX-GR exerce dois mecanismos fundamentais: (1) Transativação Gênica: ligação a elementos de resposta a glicocorticoides (GREs) no DNA, estimulando a síntese de proteínas reguladoras como a Anexina A1 (lipocortina-1), que inibe a fosfolipase A2 (PLA2), impedindo a liberação de ácido araquidônico dos fosfolipídios de membrana e bloqueando conjuntamente as vias da ciclooxigenase (COX) e lipoxigenase (LOX); (2) Transrepressão Gênica: interação direta com os fatores de transcrição pró-inflamatórios nucleares NF-κB (fator nuclear kappa B) e AP-1 (proteína ativadora 1), silenciando a expressão de citocinas inflamatórias sistêmicas (TNF-α, IL-1β, IL-6), quimiocinas, óxido nítrico sintase induzível (iNOS) e moléculas de adesão leucocitária (ICAM-1). Essa cascata genômica explica o fenômeno fundamental da dissociação farmacocinética/farmacodinâmica: a depuração plasmática do fármaco ocorre rapidamente (meia-vida sérica de 2 a 5 horas no cão), porém as proteínas sintetizadas e reprimidas mantêm o silenciamento celular por 24 a 48 horas ou mais. Desta forma, a meia-vida sérica nunca deve orientar o intervalo de administração, sob pena de gerar acúmulo biológico, atrofia profunda do córtex adrenal e catabolismo destrutivo.',
      narrativeHighlights: [
        'Potência glicocorticoide ~7–7,5× superior à prednisolona; atividade mineralocorticoide praticamente nula.',
        'Inibe a cascata inflamatória a montante (PLA2 via Anexina-1) e transreprime NF-κB e AP-1.',
        'Meia-vida plasmática de 2–5 horas vs duração biológica tecidual sustentada de 24 a 48+ horas.',
      ],
      studies: [
        {
          citation:
            'Greco DS, Brown SA, Gauze JJ, Weise DW, Buck JM. Dexamethasone pharmacokinetics in clinically normal dogs during low- and high-dose dexamethasone suppression testing. Am J Vet Res 1993; 54(4):580–585.',
          referenceId: 'ref-greco-1993',
          sourceType: 'Ensaio clínico prospectivo farmacocinético',
          summaryText:
            'Estudo farmacocinético rigoroso em 10 cães hígidos submetidos a doses intravenosas de 0,01 mg/kg e 0,1 mg/kg de fosfato dissódico de dexametasona. A disposição do fármaco seguiu modelo aberto bicompartimental, revelando que a elevação da dose causou aumentos não proporcionais na área sob a curva (AUC), tempo médio de residência (MRT) e meia-vida aparente de eliminação, sugerindo saturação de sítios de ligação proteica plasmática e disposição parcialmente não linear em doses elevadas.',
          clinicalConclusion:
            'A farmacocinética da dexametasona é dose-dependente em cães; dobrar a dose pode prolongar desproporcionalmente o tempo de exposição sistêmica tecidual.',
        },
      ],
    },
    {
      id: 'found-dex-consensos-imha-addison',
      title: 'Aplicações Específicas Baseadas em Consensos: Resgate na IMHA e Diagnóstico na Crise Addisoniana',
      narrative:
        'A prescrição de dexametasona na medicina interna deve ser estritamente indicação-específica, superando tabelas empíricas arcaicas. No Consenso ACVIM para o Tratamento da Anemia Hemolítica Imunomediada (IMHA) Canina (Swann et al. 2019), a droga de primeira escolha para indução imunossupressora é a prednisolona oral na dose de 2 a 3 mg/kg/dia (ou 50–60 mg/m²/dia em cães >25 kg). Entretanto, em pacientes criticamente doentes que se apresentam com vômitos profusos, regurgitação, náusea intensa ou intolerância absoluta à via enteral, o consenso recomenda formalmente o uso temporário de fosfato dissódico de dexametasona na dose de 0,2 a 0,4 mg/kg/dia IV. O consenso enfatiza que a via intravenosa com dexametasona não confere superioridade clínica sobre a prednisolona oral e deve ser convertida para a via oral assim que o trato digestivo estiver permeável. No que tange à Crise Addisoniana aguda (hipoadrenocorticismo primário), a dexametasona desempenha um papel singular de extrema relevância clínica: ao contrário da hidrocortisona e da prednisolona — que exibem alta reatividade cruzada nos imunoensaios de cortisol e falseiam os resultados —, a dexametasona não é detectada como cortisol sérico nos testes laboratoriais de rotina. Conforme consolidado nas Diretrizes AAHA de Endocrinopatias (2023) e por Nelson & Couto (6ª ed.), em cães em colapso circulatório com suspeita de crise addisoniana em que a estabilização glicocorticoide não pode aguardar o término do protocolo diagnóstico, administra-se fosfato dissódico de dexametasona na dose de 0,1 a 0,2 mg/kg IV lenta, procedendo-se à coleta basal e à estimulação com ACTH sintético nas horas subsequentes sem contaminação do resultado laboratorial.',
      narrativeHighlights: [
        'Na IMHA canina grave com intolerância oral, o Consenso ACVIM recomenda 0,2 a 0,4 mg/kg/dia IV temporariamente.',
        'Na suspeita de crise addisoniana aguda, a dose de 0,1 a 0,2 mg/kg IV (AAHA 2023) fornece glicocorticoide vital sem cruzar no ensaio de cortisol sérico.',
        'Converter para terapia oral com prednisolona assim que o paciente estabilizar hemodinamicamente.',
      ],
      studies: [
        {
          citation:
            'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med 2019; 33(3):1141–1172.',
          referenceId: 'ref-acvim-imha-2019',
          sourceType: 'Declaração de Consenso de Especialistas ACVIM',
          summaryText:
            'Painel internacional de consenso que padronizou os regimes imunossupressores na IMHA canina. Definiu o fosfato dissódico de dexametasona na dose de 0,2 a 0,4 mg/kg/dia IV como protocolo parenteral de escolha exclusivo para pacientes que não toleram prednisolona oral, recomendando a transição precoce para a via enteral.',
          clinicalConclusion:
            'A dexametasona intravenosa é reservada para resgate temporário na IMHA com disfunção gastrointestinal, com nível de recomendação forte.',
        },
        {
          citation:
            'Glebocka MJ, Boag A. Hypoadrenocorticism in cats: a 40-year update. J Feline Med Surg 2024; 26(10):1098612X241248381.',
          referenceId: 'ref-glebocka-2024',
          sourceType: 'Revisão sistemática de coorte multicêntrica felina',
          summaryText:
            'Revisão de todos os casos documentados de hipoadrenocorticismo felino nas últimas 4 décadas (~40 casos descritos). Na crise emergencial com desidratação e choque distributivo, a fluidoterapia agressiva associada à dexametasona 0,1 a 0,2 mg/kg IV ou IM permitiu estabilização com taxa de sobrevivência hospitalar superior a 85%.',
          clinicalConclusion:
            'Apresenta protocolo padronizado e seguro de dexametasona na estabilização inicial do raro paciente felino addisoniano.',
        },
      ],
    },
    {
      id: 'found-dex-mudancas-recover-neurologia',
      title: 'Quebra de Paradigmas: RECOVER 2026 na Anafilaxia, Edema Peritumoral e Riscos Gastrointestinais',
      narrative:
        'As práticas veterinárias históricas de empregar dexametasona rotineiramente para anafilaxia aguda, traumatismo craniano e paralisia espinhal foram profundamente reformuladas pela medicina baseada em evidências. Em 2026, as diretrizes de emergência do RECOVER (First Aid & Acute Allergy and Anaphylaxis in Dogs and Cats; Burkitt-Creedon et al.) estabeleceram uma recomendação FORTE CONTRA o uso rotineiro de glicocorticoides sistêmicos no manejo da anafilaxia hospitalar em cães e gatos. A fisiopatologia da anafilaxia envolve broncoconstrição maciça mediada por histamina, vasodilatação sistêmica fulminante e extravasamento microvascular com choque distributivo em minutos. Os glicocorticoides dependem de transcrição gênica e tradução proteica, levando horas para exercer efeito perceptível; portanto, o fármaco de primeira linha inegociável que salva a vida do paciente é a ADRENALINA (epinefrina), sendo o corticoide inútil na fase hiperaguda. No âmbito neurológico, o Consenso ACVIM para Extrusão Aguda de Disco Intervertebral Toracolombar (Olby et al. 2022) contraindica formalmente o uso de glicocorticoides de rotina, demonstrando que eles não conferem neuroproteção e duplicam o risco de morbidades gastrointestinais graves. Da mesma forma, no traumatismo cranioencefálico (TCE), ensaios clínicos humanos e veterinários demonstraram que glicocorticoides pioram a isquemia e a mortalidade. Em contraste, no EDEMA PERITUMORAL CEREBRAL (edema vasogênico ao redor de neoplasias intracranianas), a dexametasona é altamente eficaz: Poirier et al. (2025) comprovaram que a terapia esteroidal reduziu significativamente o volume mediano do edema peritumoral de 0,83 para 0,40 cm³ em cães com tumores extra-axiais. Por fim, o risco de ulceração e perfuração gastrointestinal fatal no cão é exacerbado pela associação concomitante de dexametasona com anti-inflamatórios não esteroidais (AINEs), combinação que deve ser permanentemente bloqueada na prática clínica.',
      narrativeHighlights: [
        'Diretriz RECOVER 2026: recomendação forte contra o uso rotineiro de corticoide na anafilaxia aguda (adrenalina é o pilar vital imediato).',
        'Contraindicado em TCE e na fase aguda da IVDE (ACVIM 2022).',
        'Eficácia comprovada no edema cerebral vasogênico peritumoral (Poirier et al. 2025).',
        'Associação de dexametasona com AINEs é formalmente contraindicada pelo risco extremo de perfuração gastrointestinal fatal.',
      ],
      studies: [
        {
          citation:
            'Burkitt-Creedon JM, et al. RECOVER Guidelines: First Aid — Acute Allergy and Anaphylaxis in Dogs and Cats. J Vet Emerg Crit Care 2026; 36(Suppl 1):S63–S89.',
          referenceId: 'ref-recover-anaphylaxis-2026',
          sourceType: 'Diretriz Internacional de Consenso de Emergência e Cuidados Intensivos',
          summaryText:
            'Consenso internacional baseado no método GRADE avaliando o manejo de choque anafilático em cães e gatos. Recomendou formalmente contra o uso rotineiro de glicocorticoides na anafilaxia hospitalar aguda, consolidando a epinefrina precoce intramuscular ou intravenosa titulada como único pilar farmacológico primordial que reverte o colapso hemodinâmico e o choque.',
          clinicalConclusion:
            'A dexametasona não tem indicação na ressuscitação anafilática hiperaguda; a prioridade absoluta imediata é adrenalina.',
        },
        {
          citation:
            'Poirier VJ, et al. Peritumoral Edema in Canine Extra-Axial Brain Tumours: Effect of Steroids. Vet Comp Oncol 2025; 23(1):73–81.',
          referenceId: 'ref-poirier-2025',
          sourceType: 'Ensaio clínico prospectivo observacional em neuro-oncologia canina',
          summaryText:
            'Avaliação de 44 cães com neoplasias intracranianas extra-axiais apresentando edema vasogênico peri-lesional. O tratamento com dexametasona/glicocorticoides reduziu o volume mediano de edema peritumoral de 0,83 cm³ para 0,40 cm³ (p = 0,048), com melhora clínica neurológica em mais de 50% dos pacientes avaliados por ressonância magnética seriada.',
          clinicalConclusion:
            'Confirma o papel terapêutico específico da dexametasona na redução do edema vasogênico associado a neoplasias encefálicas.',
        },
        {
          citation:
            'Maga I, et al. Dose and Duration of Upfront Steroid Administration Have no Prognostic Impact in Dogs With Multicentric Diffuse Large B-Cell Lymphoma. Vet Comp Oncol 2025; 23(4):509–517.',
          referenceId: 'ref-maga-2025',
          sourceType: 'Estudo de coorte multicêntrico oncológico canino (n = 273)',
          summaryText:
            'Análise de 273 cães com linfoma difuso de grandes células B (DLBCL). A administração prévia de esteroides antes da confirmação diagnóstica reduziu significativamente o rendimento diagnóstico e a viabilidade celular na citometria de fluxo (p = 0,042) e associou-se a menor tempo até progressão da doença (TTP: 143 vs 223 dias).',
          clinicalConclusion:
            'Jamais iniciar glicocorticoide antes da coleta tecidual e imunofenotipagem em pacientes com suspeita de linfoma.',
        },
      ],
    },
  ],

  clinicalWarningItems: [
    {
      label: 'DIRETRIZ RECOVER 2026: NÃO USAR ROTINEIRAMENTE NA ANAFILAXIA AGUDA',
      text: 'O consenso internacional RECOVER 2026 estabelece recomendação forte contra o emprego rotineiro de glicocorticoides na anafilaxia aguda hospitalar em cães e gatos. O colapso circulatório e a broncoconstrição anafilática ocorrem em minutos por liberação maciça de histamina e mediadores pré-formados. Os corticoides dependem de transcrição gênica e tradução de proteínas (levando horas para agir), sendo completamente ineficazes para resgatar o choque imediato. A droga que salva vidas é a ADRENALINA (epinefrina precoce IM ou IV titulada).',
    },
    {
      label: 'ASSOCIAÇÃO FORMALMENTE PROIBIDA COM AINEs (PERFURAÇÃO GI FATAL)',
      text: 'A administração concomitante de dexametasona com anti-inflamatórios não esteroidais (meloxicam, carprofeno, firocoxib, robenacoxib, cetoprofeno, aspirina etc.) multiplica exponencialmente a toxicidade gastrointestinal por suprimir conjuntamente a síntese de prostaglandinas protetoras e o reparo da mucosa. Em cães, essa associação está classicamente ligada a úlceras gástricas perfuradas e perfuração colônica aguda letal. Respeitar período de washout adequado.',
    },
    {
      label: 'CONTRAINDICADO EM TRAUMATISMO CRANIOENCEFÁLICO (TCE) E NA IVDE AGUDA',
      text: 'O uso de glicocorticoides de longa ação no trauma cranioencefálico fechado não confere neuroproteção e aumenta comprovadamente a mortalidade e hiperglicemia tecidual. Na extrusão aguda de disco intervertebral toracolombar (IVDE), o Consenso ACVIM 2022 contraindica o uso rotineiro de corticoides na fase aguda por demonstrar ausência de benefício funcional e duplicação das complicações viscerais graves.',
    },
    {
      label: 'DISSOCIAÇÃO PK/PD: AÇÃO BIOLÓGICA DE 24 A 48+ HORAS',
      text: 'A meia-vida plasmática canina é de apenas 2 a 5 horas, mas a reprogramação gênica e celular persiste por 24 a 48+ horas. Repetir administrações em intervalos curtos sem indicação estrita deflagra acúmulo biológico devastador, atrofia adrenal profunda, atrofia muscular e imunodeficiência secundária severa.',
    },
    {
      label: 'GATOS: ALTO RISCO DE HIPERGLICEMIA E DIABETES MELLITUS SECUNDÁRIO',
      text: 'Os felinos exibem suscetibilidade metabólica pronunciada aos efeitos gliconeogênicos e anti-insulínicos dos glicocorticoides potentes. A dexametasona pode desencadear resistência periférica grave à insulina, hiperglicemia e precipitar diabetes mellitus clínico em gatos com sobrepeso ou pré-diabéticos. Monitorar glicemia seriada.',
    },
    {
      label: 'NUNCA INICIAR ANTES DO DIAGNÓSTICO CITOLÓGICO/HISTOLÓGICO DE LINFOMA',
      text: 'A dexametasona exerce potente citotoxicidade linfolítica aguda sobre células tumorais linfoides. Administrar corticoide previamente à biópsia ou citometria de fluxo induz apoptose em massa e necrose, reduz o rendimento diagnóstico (p = 0,042; Maga et al. 2025) e pode prejudicar o tempo até a progressão sob quimioterapia futura (CHOP).',
    },
    {
      label: 'SEGURANÇA DE FORMULAÇÕES: NUNCA ADMINISTRAR ÉSTERES DE ACETATO POR VIA IV',
      text: 'Apenas sais altamente hidrossolúveis como o fosfato dissódico de dexametasona (DSP) são seguros para injeção intravenosa. Formulações contendo ésteres insolúveis de acetato são suspensões microcristalinas depot exclusivas para via IM ou intra-articular; a injeção IV acidental de acetato acarreta microembolismo e colapso circulatório imediato.',
    },
  ],

  mechanismOfAction:
    'A dexametasona é um glicocorticoide sintético fluorado de longa duração de ação (tiazolosteróide de alta potência, cerca de 7 a 7,5 vezes mais potente que a prednisolona e 30 vezes mais potente que a hidrocortisona). É completamente desprovida de atividade mineralocorticoide clinicamente relevante em doses terapêuticas habituais. Por ser uma molécula lipofílica de baixo peso molecular, a fração livre de dexametasona difunde-se passivamente através da bicamada lipídica da membrana celular e liga-se com altíssima afinidade ao receptor citosólico de glicocorticoides (GR / NR3C1), o qual se encontra ancorado a um complexo multiprotéico chaperona contendo Hsp90, Hsp70 e imunofilinas. A ligação hormonal deflagra uma alteração conformacional estereoquímica no domínio de ligação ao ligante do receptor, promovendo a dissociação imediata das proteínas de choque térmico e expondo o sinal de localização nuclear do receptor. O complexo ativado DEX-GR dimeriza-se e transloca-se rapidamente para o interior do núcleo celular, onde atua por meio de dois mecanismos moleculares complementares: (1) Transativação Gênica Direta: o dímero DEX-GR liga-se a sequências palindrômicas específicas de DNA denominadas Elementos de Resposta a Glicocorticoides (GREs) presentes nas regiões promotoras de genes-alvo. Dentre os genes transcritos com maior relevância anti-inflamatória destaca-se a Anexina A1 (lipocortina-1). A Anexina A1 inibe enzimaticamente a fosfolipase A2 membranar (PLA2), impedindo a clivagem e liberação de ácido araquidônico a partir dos fosfolipídios de membrana celular. Como consequência direta, toda a cascata dos eicosanoides a montante é desativada, bloqueando simultaneamente a via da ciclooxigenase (suprimindo a síntese de prostaglandinas e tromboxanos) e a via da 5-lipoxigenase (suprimindo leucotrienos pró-inflamatórios e quimiotáticos como LTB4 e LTC4); (2) Transrepressão Gênica Indireta: no núcleo, monômeros do receptor ativado interagem diretamente, por antagonismo protéico-proteico (cross-talk), com subunidades ativadas dos principais fatores de transcrição pró-inflamatórios celulares, em particular o NF-κB (fator nuclear kappa B, subunidade p65) e o AP-1 (proteína ativadora 1, complexo heterodimérico c-Jun/c-Fos). Essa interação impede a ligação desses fatores ao DNA genômico e recruta desacetilases de histonas (HDAC2), suprimindo a transcrição de um amplo painel de mediadores inflamatórios: citocinas pró-inflamatórias (TNF-α, IL-1β, IL-2, IL-6, IFN-γ), quimiocinas (IL-8, MCP-1), óxido nítrico sintase induzível (iNOS) e moléculas de adesão endotelial (ICAM-1, VCAM-1 e selectinas). Adicionalmente, a dexametasona exerce potente ação linfolítica através da indução de genes pró-apoptóticos em linfócitos T imaturos e blastos neoplásicos, além de promover redistribuição leucocitária marcante (leucograma de estresse caracterizado por neutrofilia madura por desmarginação endotelial, linfopenia por recirculação linfonodal e apoptose, e eosinopenia). No metabolismo intermediário, promove gliconeogênese hepática e antagoniza o transporte periférico de glicose dependente de insulina (resistência insulínica, catabolismo protéico muscular e lipólise com redistribuição adiposa). Sua atividade no eixo hipotálamo-hipófise-adrenal (HPA) promove supressão retrógrada profunda da secreção de CRH e ACTH, levando à atrofia do córtex adrenal sob uso prolongado.',

  doses: [
    {
      id: 'dose-dex-dog-antiinflamatorio-curto',
      species: 'dog',
      indication: 'Terapia anti-inflamatória sistêmica de curto prazo em afecções agudas caninas',
      doseMin: 0.07,
      doseMax: 0.14,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO, IV lenta ou IM',
      frequency: 'a cada 24 a 48 horas (q24–48h)',
      duration: '3 a 5 dias; reavaliar antes de prolongar',
      notes:
        'Dose de referência dos formulários internacionais (Plumb’s 10ª ed., p. 364; BSAVA 10ª ed., p. 114). Regra prática: dose de prednisolona dividida por 7. Devido à duração biológica estendida (24 a 48+ horas), priorizar intervalos a cada 48 horas quando o curso for estendido além de 3 dias. Empregar estritamente a menor dose efetiva pelo menor tempo possível. Se necessário tratamento crônico, transicionar para prednisolona. NUNCA associar com AINEs.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1b — Plumb’s Veterinary Drug Handbook 10ª ed. e BSAVA Small Animal Formulary 10ª ed.',
    },
    {
      id: 'dose-dex-cat-antiinflamatorio-curto',
      species: 'cat',
      indication: 'Terapia anti-inflamatória sistêmica de curto prazo em felinos',
      doseMin: 0.14,
      doseMax: 0.28,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO, IV lenta ou IM',
      frequency: 'a cada 24 a 48 horas (q24–48h)',
      duration: '3 a 5 dias',
      notes:
        'Gatos apresentam menor afinidade e densidade de receptores de glicocorticoides em relação aos cães, necessitando frequentemente do dobro da dose anti-inflamatória (Plumb’s 10ª ed.: 0,14 a 0,28 mg/kg; faixa conservadora descrita em outras fontes: 0,07 a 0,2 mg/kg). Cuidado redobrado com o perfil metabólico: felinos têm extrema suscetibilidade à hiperglicemia e resistência insulínica, com risco de precipitar diabetes mellitus.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1b — Plumb’s 10ª ed. e BSAVA 10ª ed.',
    },
    {
      id: 'dose-dex-dog-acvim-imha',
      species: 'dog',
      indication: 'Anemia Hemolítica Imunomediada (IMHA) Canina — resgate parenteral temporário (Consenso ACVIM 2019)',
      doseMin: 0.2,
      doseMax: 0.4,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta',
      frequency: 'a cada 24 horas (q24h)',
      duration: 'Apenas até o paciente tolerar medicação enteral (máximo de 2 a 4 dias consecutivos)',
      notes:
        'Protocolo validado na Declaração de Consenso do ACVIM (Swann et al. 2019) exclusivamente para cães com IMHA ou trombocitopenia imunomediada com vômitos profusos, regurgitação ou impossibilidade de receber prednisolona oral. Usar exclusivamente fosfato dissódico de dexametasona IV. Assim que a via oral estiver viável, converter imediatamente para prednisona/prednisolona oral (2–3 mg/kg/dia). Alerta VIN 2026: pela longa duração celular, muitos consultores sugerem espaçar para q48h se a terapia parenteral durar mais de 48h.',
      calculatorEnabled: true,
      presentationId: 'pres-decadron-inj-2mg-1ml',
      evidenceLevel: 'Nível 1a — Consenso Internacional ACVIM sobre Tratamento da IMHA (Swann et al. 2019)',
    },
    {
      id: 'dose-dex-dog-aaha-addison-pre-acth',
      species: 'dog',
      indication: 'Crise Addisoniana Emergencial pré-diagnóstica — suporte glicocorticoide sem interferência no teste de ACTH',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta',
      frequency: 'dose única inicial emergencial; se necessário, seguir com 0,05 a 0,1 mg/kg IV q12h até tolerar VO',
      duration: 'Fase aguda hospitalar até a conclusão do teste confirmatório',
      notes:
        'Recomendação oficial da Diretriz AAHA 2023 de Endocrinopatias e Plumb’s 10ª ed. Grande vantagem farmacológica: a dexametasona NÃO é quantificada como cortisol na imensa maioria dos ensaios de imunoensaio de cortisol sérico, permitindo instituir suporte glicocorticoide emergencial vital e colher o teste de estimulação com ACTH nas horas subsequentes sem contaminação analítica. Associar fluidoterapia volêmica agressiva para reposição eletrolítica.',
      calculatorEnabled: true,
      presentationId: 'pres-decadron-inj-2mg-1ml',
      evidenceLevel: 'Nível 1a — Diretrizes de Endocrinopatias da AAHA (2023) e Plumb’s 10ª ed.',
    },
    {
      id: 'dose-dex-cat-addison-emergencia',
      species: 'cat',
      indication: 'Hipoadrenocorticismo felino agudo emergencial (estabilização inicial de choque distributivo)',
      doseMin: 0.1,
      doseMax: 0.2,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou IM',
      frequency: 'dose única inicial (pode repetir q12–24h sob monitorização)',
      duration: '1 a 3 dias na fase de descompensação aguda',
      notes:
        'Afecção rara em felinos (~40 casos documentados na literatura; Glebocka & Boag 2024). Doses de 0,1 a 0,2 mg/kg IV (podendo atingir 0,2 a 0,4 mg/kg em choque refratário) conferem suporte glicocorticoide essencial enquanto se corrige a desidratação e a hipercalemia por fluidoterapia.',
      calculatorEnabled: true,
      presentationId: 'pres-decadron-inj-2mg-1ml',
      evidenceLevel: 'Nível 2 — Plumb’s 10ª ed. e Revisão de Coorte Glebocka & Boag (2024)',
    },
    {
      id: 'dose-dex-dog-edema-peritumoral-cerebral',
      species: 'dog',
      indication: 'Edema vasogênico peritumoral cerebral em cães com neoplasias intracranianas primárias ou secundárias',
      doseMin: 0.1,
      doseMax: 0.3,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou SC',
      frequency: 'a cada 12 a 24 horas (q12–24h) na fase de indução, reduzindo para menor dose tolerada',
      duration: 'Conforme planejamento oncológico / radioterápico',
      notes:
        'Demonstrado recentemente por Poirier et al. (2025) com redução do volume mediano de edema peritumoral de 0,83 para 0,40 cm³ (p = 0,048) em cães com tumores extra-axiais. Reduz a permeabilidade da barreira hematoencefálica mediada por VEGF tumoral. ATENÇÃO: NÃO EXTRAPOLAR PARA TRAUMA CRANIOENCEFÁLICO (TCE), no qual corticoides são contraindicados.',
      calculatorEnabled: true,
      presentationId: 'pres-decadron-inj-2mg-1ml',
      evidenceLevel: 'Nível 1b — Ensaio clínico prospectivo (Poirier et al. 2025) e BSAVA 10ª ed.',
    },
    {
      id: 'dose-dex-dog-lddst',
      species: 'dog',
      indication: 'Teste de Supressão por Baixa Dose de Dexametasona (LDDST) — screening de Hiperadrenocorticismo Canino',
      doseMin: 0.01,
      doseMax: 0.015,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV estrita',
      frequency: 'dose única diagnóstica',
      duration: 'Procedimento laboratorial de 8 horas',
      notes:
        'Protocolo padrão-ouro para triagem de Síndrome de Cushing canina: colher amostra de sangue basal para cortisol sérico; injetar exatamente 0,01 a 0,015 mg/kg de fosfato dissódico de dexametasona IV; colher amostras de cortisol exatamente às 4 horas e às 8 horas pós-injeção. Utilizar seringa de insulina (100 UI) para garantir precisão absoluta na microdose (0,05 mL de solução 2 mg/mL para um cão de 10 kg = 0,01 mg/kg). Cães saudáveis suprimem o cortisol sérico para <1,0–1,4 µg/dL às 8 horas. Não realizar em pacientes com doença não adrenal crítica ativa.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1a — Plumb’s 10ª ed., Consenso ACVIM de Hiperadrenocorticismo e Diretrizes AAHA',
    },
    {
      id: 'dose-dex-dog-hddst',
      species: 'dog',
      indication: 'Teste de Supressão por Alta Dose de Dexametasona (HDDST) — diferenciação de HAC Canino',
      doseMin: 0.1,
      doseMax: 0.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV estrita',
      frequency: 'dose única diagnóstica',
      duration: 'Procedimento laboratorial de 8 horas',
      notes:
        'Teste de diferenciação exclusivo para cães com diagnóstico já confirmado de Hiperadrenocorticismo (não serve para rastreio primário): colher cortisol basal; aplicar 0,1 mg/kg de fosfato de dexametasona IV; colher às 4h e 8h pós-injeção. Supressão às 4h ou 8h sugere doença hipófise-dependente (PDH); ausência de supressão pode indicar tumor adrenal funcional ou macroadenoma hipofisário.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1a — Plumb’s 10ª ed. e Tratados de Endocrinologia',
    },
    {
      id: 'dose-dex-cat-lddst',
      species: 'cat',
      indication: 'Teste de Supressão por Baixa Dose de Dexametasona Felino (LDDST Felino) — triagem de HAC em gatos',
      doseMin: 0.1,
      doseMax: 0.1,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV estrita',
      frequency: 'dose única diagnóstica',
      duration: 'Procedimento laboratorial de 8 horas',
      notes:
        'PARTICULARIDADE FELINA CRÍTICA: gatos necessitam de DEZ VEZES a dose canina para triagem diagnóstica (0,1 mg/kg IV vs 0,01 mg/kg no cão), devido à menor sensibilidade e rápida depuração do eixo HPA felino. Amostras colhidas no tempo basal, 4 horas e 8 horas pós-injeção. Cortisol sérico às 8h <1,0 µg/dL descarta HAC.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1a — Plumb’s 10ª ed. e Tratados de Endocrinologia Felina',
    },
    {
      id: 'dose-dex-cat-hddst',
      species: 'cat',
      indication: 'Teste de Supressão por Alta Dose de Dexametasona Felino (HDDST Felino) — diferenciação de HAC em gatos',
      doseMin: 1.0,
      doseMax: 1.0,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV estrita',
      frequency: 'dose única diagnóstica',
      duration: 'Procedimento laboratorial de 8 horas',
      notes:
        'Teste de diferenciação felino: 1,0 mg/kg IV (10× a dose do HDDST canino). Coletas no tempo 0, 4h e 8h.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1b — Plumb’s 10ª ed.',
    },
    {
      id: 'dose-dex-dog-cat-recover-alergia',
      species: 'dog',
      indication: 'Reações alérgicas agudas não complicadas (urticária, edema angioneurótico facial leve a moderado)',
      doseMin: 0.07,
      doseMax: 0.07,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta, IM ou VO',
      frequency: 'a cada 24 horas (q24h)',
      duration: '1 a 3 dias no máximo',
      notes:
        'Diretriz RECOVER 2026: em reações alérgicas não complicadas sem colapso sistêmico, preconiza-se dose de corticoide equivalente a ≤0,5 mg/kg de prednisolona (convertendo por ÷7 = ~0,07 mg/kg de dexametasona) por ≤5 dias. LEMBRETE VITAL: se houver choque anafilático com hipotensão, edema de glote ou colapso, o tratamento de escolha imediato é ADRENALINA (epinefrina) e não glicocorticoide.',
      calculatorEnabled: true,
      presentationId: 'pres-azium-solucao-inj-2mg',
      evidenceLevel: 'Nível 1b — Diretriz Internacional RECOVER (Burkitt-Creedon et al. 2026)',
    },
  ],

  presentations: [
    {
      id: 'pres-azium-solucao-inj-2mg',
      brand: 'Azium Solução (MSD Saúde Animal)',
      name: 'Azium Solução Injetável 2 mg/mL',
      form: 'Solução injetável estéril',
      concentrationValue: 2.0,
      concentrationUnit: 'mg/mL',
      route: 'IV ou IM',
      channel: 'veterinary',
      commercialProductSlug: 'azium-msd-solucao-inj-2mg',
      packageDescription: 'Frasco-ampola de vidro âmbar contendo 10 mL (20 mg de dexametasona base total)',
      calculatedMlPerKgFormula: 'mL = peso_kg * dose_mg_kg / 2.0',
    },
    {
      id: 'pres-azium-comp-0-5mg',
      brand: 'Azium Comprimidos (MSD Saúde Animal)',
      name: 'Azium 0,5 mg',
      form: 'Comprimido simples',
      concentrationValue: 0.5,
      concentrationUnit: 'mg',
      route: 'Oral',
      channel: 'veterinary',
      commercialProductSlug: 'azium-msd-comp-0-5mg',
      packageDescription: 'Blíster com 10 ou 20 comprimidos de 0,5 mg de dexametasona acetato',
      scoringInfo: 'Comprimido sulcado simples — permite partição ao meio (0,25 mg)',
    },
    {
      id: 'pres-dexagard-comp-0-5mg',
      brand: 'Dexagard (Pearson Saúde Animal)',
      name: 'Dexagard 0,5 mg',
      form: 'Comprimido simples',
      concentrationValue: 0.5,
      concentrationUnit: 'mg',
      route: 'Oral',
      channel: 'veterinary',
      commercialProductSlug: 'dexagard-pearson-comp-0-5mg',
      packageDescription: 'Cartucho contendo 20 comprimidos de 0,5 mg de dexametasona',
      scoringInfo: 'Comprimido sulcado',
    },
    {
      id: 'pres-decadron-inj-2mg-1ml',
      brand: 'Decadron Injetável (Aché)',
      name: 'Decadron 2 mg/mL',
      form: 'Solução injetável estéril',
      concentrationValue: 2.0,
      concentrationUnit: 'mg/mL',
      route: 'IV lenta ou IM',
      channel: 'human_pharmacy',
      commercialProductSlug: 'decadron-ache-inj-2mg-1ml',
      packageDescription: 'Ampola de vidro contendo 1 mL de fosfato dissódico de dexametasona (2 mg/mL)',
      calculatedMlPerKgFormula: 'mL = peso_kg * dose_mg_kg / 2.0',
    },
    {
      id: 'pres-decadron-inj-4mg-2-5ml',
      brand: 'Decadron Injetável Hospitalar (Aché)',
      name: 'Decadron 4 mg/mL',
      form: 'Solução injetável estéril',
      concentrationValue: 4.0,
      concentrationUnit: 'mg/mL',
      route: 'IV lenta ou IM',
      channel: 'human_pharmacy',
      commercialProductSlug: 'decadron-ache-inj-4mg-2-5ml',
      packageDescription: 'Frasco-ampola contendo 2,5 mL de fosfato dissódico de dexametasona (total de 10 mg de dexametasona equivalente)',
      calculatedMlPerKgFormula: 'mL = peso_kg * dose_mg_kg / 4.0',
    },
  ],

  practicalWeightTable: {
    standardDoseText:
      'Tabela prática de cálculo volumétrico para Dexametasona Solução Injetável 2 mg/mL (Azium® / Decadron®) baseada na dose anti-inflamatória de referência de 0,1 mg/kg (fórmula: mL = peso × 0,05). Observar que para cães grandes, comprimidos de 0,5 mg tornam-se logisticamente impraticáveis, sendo a prednisolona preferível.',
    headers: ['Peso do Paciente (kg)', 'Dose Alvo (0,1 mg/kg)', 'Volume Injetável 2 mg/mL (mL)', 'Equivalente em Comprimidos 0,5 mg'],
    rows: [
      {
        weight: '1 kg',
        totalDose: '0,10 mg',
        col1: '0,05 mL (usar seringa de insulina)',
        col2: '0,2 comp (impraticável; usar solução)',
      },
      {
        weight: '2 kg',
        totalDose: '0,20 mg',
        col1: '0,10 mL',
        col2: '0,4 comp (impraticável)',
      },
      {
        weight: '3 kg',
        totalDose: '0,30 mg',
        col1: '0,15 mL',
        col2: '1/2 comprimido (~0,25 mg)',
      },
      {
        weight: '4 kg',
        totalDose: '0,40 mg',
        col1: '0,20 mL',
        col2: '1/2 comprimido (~0,25 mg)',
      },
      {
        weight: '5 kg',
        totalDose: '0,50 mg',
        col1: '0,25 mL',
        col2: '1 comprimido inteiro de 0,5 mg',
      },
      {
        weight: '10 kg',
        totalDose: '1,00 mg',
        col1: '0,50 mL',
        col2: '2 comprimidos de 0,5 mg',
      },
      {
        weight: '15 kg',
        totalDose: '1,50 mg',
        col1: '0,75 mL',
        col2: '3 comprimidos de 0,5 mg',
      },
      {
        weight: '20 kg',
        totalDose: '2,00 mg',
        col1: '1,00 mL',
        col2: '4 comprimidos de 0,5 mg',
      },
      {
        weight: '30 kg',
        totalDose: '3,00 mg',
        col1: '1,50 mL',
        col2: '6 comp (preferir prednisolona oral)',
      },
      {
        weight: '40 kg',
        totalDose: '4,00 mg',
        col1: '2,00 mL',
        col2: '8 comp (preferir prednisolona oral)',
      },
    ],
  },

  samplePrescriptionText:
    'RECEITUÁRIO VETERINÁRIO DE CONTROLE SIMPLES\n\nPaciente: Canino (Cão) | Raça: Buldogue Francês | Peso: 10 kg\nDiagnóstico: Reação Alérgica Aguda Grave / Urticária Facial Extensa\n\nUSO VETERINÁRIO — VIA ORAL\n\n1. DEXAGARD® 0,5 mg (Pearson) ------------------------------------------------ 1 Cartucho c/ 20 comprimidos\n   Administrar 2 (dois) comprimidos por via oral (dose total de 1,0 mg = 0,1 mg/kg), a cada 24 horas, durante 3 (três) dias consecutivos, junto à alimentação.\n\nORIENTAÇÕES DE SEGURANÇA AO TUTOR:\n- Oferecer o medicamento junto a uma refeição completa para atenuar desconforto estomacal.\n- É comum e esperado o animal apresentar aumento temporário de sede (polidipsia), maior volume urinário (poliúria) e aumento do apetite durante o tratamento.\n- NUNCA administrar anti-inflamatórios como dipirona em doses altas, cetoprofeno, meloxicam ou aspirina concomitantemente com este medicamento (risco altíssimo de úlcera e hemorragia estomacal grave).\n- Interromper a administração e entrar em contato com o médico-veterinário imediatamente se notar febre, prostração, vômitos, fezes escuras tipo borra de café ou sangue vivo.\n- Após os 3 dias recomendados, suspender o medicamento conforme prescrito.',

  pharmacokineticsData: {
    absorption:
      'Glicocorticoides são rapidamente absorvidos após administração oral e parenteral de sais hidrossolúveis. Na espécie canina, o tempo para atingir o pico plasmático (Tmax) de fosfato dissódico de dexametasona IV/IM ocorre em aproximadamente 20 a 38 minutos, com meia-vida de absorção de 0,13 a 0,5 h. Por outro lado, suspensões contendo ésteres de acetato apresentam absorção lenta e sustentada a partir do depósito tecidual IM/SC. Importante ressaltar que o pico plasmático não coincide com o efeito biológico anti-inflamatório máximo, o qual requer translocação nuclear e síntese de proteínas (latência de várias horas).',
    distribution:
      'Apresenta ampla distribuição tecidual, com volume de distribuição aparente (Vd) em cães variando de 1,1 a 1,85 L/kg em doses baixas (0,01 mg/kg) e elevando-se para 6,4 L/kg em doses maiores (0,1 mg/kg), refletindo saturação da ligação proteica plasmática (Greco et al. 1993). A dexametasona liga-se à albumina plasmática com menor afinidade pela transcortina (CBG) em comparação ao cortisol endógeno. A fração lipofílica livre cruza a barreira hematoencefálica e a barreira placentária, além de ser excretada no leite.',
    metabolism:
      'Metabolismo primariamente hepático por hidroxilação microssomal oxidativa e conjugação a glicuronídeos e sulfatos polares inativos. A administração concomitante de indutores enzimáticos (fenobarbital, rifampicina) acelera sua degradação hepática, encurtando o tempo de permanência.',
    elimination:
      'Os metabólitos polares inativos são excretados majoritariamente pela urina e, em menor grau, pela via biliar fecal. A meia-vida de eliminação plasmática (t½) no cão é relativamente curta, variando entre 2 e 5 horas (Greco et al. 1993). Em gatos, a supressão do cortisol endógeno persiste por 24 a 32 horas após doses parenterais ou orais. Não há correlação entre acidificação/alcalinização urinária e clearance do fármaco ativo.',
  },

  attentionData: {
    precautions: [
      {
        condition: 'Associação concomitante com AINEs (anti-inflamatórios não esteroidais)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A inibição sinérgica das prostaglandinas protetoras gástricas e a supressão do reparo celular transmural deflagram lesões ulcerativas graves e perfuração intestinal aguda fatal (especialmente colônica em cães).',
        clinicalAction:
          'Proibição absoluta de uso simultâneo com AINEs (meloxicam, carprofeno, firocoxib, robenacoxib etc.). Exigir intervalo de washout.',
      },
      {
        condition: 'Anafilaxia aguda e choque distributivo (RECOVER 2026)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A anafilaxia é um colapso hiperagudo de vasodilatação e broncoespasmo; corticoides dependem de reprogramação gênica (horas de latência) e não revertem o choque imediato.',
        clinicalAction:
          'Não utilizar como terapia de primeira linha na anafilaxia. O medicamento vital imediato é Adrenalina (Epinefrina). Reservar corticoide para fase tardia se indicado.',
      },
      {
        condition: 'Traumatismo Cranioencefálico (TCE) e Extrusão de Disco Aguda (IVDE)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'No TCE e na IVDE aguda, altas doses de corticoides agravam a hiperglicemia tecidual, aumentam o estresse oxidativo, duplicam morbidades digestivas e elevam a mortalidade sem conferir neuroproteção comprovada.',
        clinicalAction:
          'Contraindicado o uso rotineiro em TCE (VIN 2026) e na fase aguda da IVDE (Consenso ACVIM 2022).',
      },
      {
        condition: 'Diabetes Mellitus e obesidade em gatos',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Potente efeito hiperglicemiante via estímulo da gliconeogênese hepática e forte inibição do transporte de glicose periférico dependente de insulina.',
        clinicalAction:
          'Evitar em felinos pré-diabéticos, obesos ou diabéticos em remissão. Se indispensável, monitorar glicemia e preparar ajuste de dose de insulina.',
      },
      {
        condition: 'Suspeita de Linfoma antes do diagnóstico citopatológico ou histopatológico',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Ação linfolítica direta induz apoptose maciça de linfoblastos tumorais, induzindo remissão parcial transitória que mascara o diagnóstico e prejudica a sensibilidade da citometria de fluxo (Maga et al. 2025).',
        clinicalAction:
          'Não administrar dexametasona antes de coletar citologia, biópsia ou imunofenotipagem para diagnóstico conclusivo de linfoma.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Poliúria, Polidipsia e Polifagia (PU/PD/PP)',
        frequency: 'common',
        mechanism: 'Interferência com a ação do hormônio antidiurético (ADH) nos túbulos coletores renais, aumento da taxa de filtração e estímulo central do apetite.',
        clinicalManagement: 'Orientar o tutor que é um efeito transitório esperado; fornecer água fresca à vontade sem restrição hídrica para evitar desidratação.',
      },
      {
        effect: 'Ulceração gastrointestinal, gastrite, melena e perfuração colônica',
        frequency: 'uncommon',
        mechanism: 'Inibição da síntese de muco protetor, bicarbonato e prostaglandinas citoprotetoras mucosas; diminuição da taxa de renovação epitelial.',
        clinicalManagement: 'Suspender imediatamente se houver vômito escuro, fezes negras ou hematêmese. Associar inibidor de bomba de prótons (omeprazol) e sucralfato.',
      },
      {
        effect: 'Hiperglicemia acentuada e resistência insulínica',
        frequency: 'common',
        mechanism: 'Aumento da gliconeogênese e redução da captação de glicose mediada por GLUT4 em músculo e tecido adiposo.',
        clinicalManagement: 'Monitorar glicemia sérica e glicosúria, particularmente na espécie felina.',
      },
      {
        effect: 'Elevação marcante da Fosfatase Alcalina (ALP induzida por esteroide no cão)',
        frequency: 'common',
        mechanism: 'Indução transcricional direta da isoenzima hepática específica de ALP pelo glicocorticoide em cães (não ocorre da mesma forma em felinos).',
        clinicalManagement: 'Interpretar com sobriedade: elevação de ALP isolada em cão sob dexametasona reflete indução enzimática farmacológica e não colestase mecânica primária.',
      },
      {
        effect: 'Atrofia cortical adrenal e hipoadrenocorticismo iatrogênico secundário à retirada',
        frequency: 'common',
        mechanism: 'Supressão retrógrada prolongada do eixo hipotálamo-hipófise-adrenal (CRH e ACTH suprimidos).',
        clinicalManagement: 'Em tratamentos sistêmicos com duração superior a 14 dias, realizar desmame gradual escalonado ao longo de semanas.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Anti-inflamatórios não esteroidais (meloxicam, carprofeno, firocoxib, etc.)',
        severity: 'contraindicated',
        clinicalEffect: 'Risco altíssimo de úlceras pépticas graves, hemorragia gastrointestinal maciça e perfuração intestinal aguda.',
        pharmacologicalMechanism: 'Duplo bloqueio da produção e reparo mucoso mediado por prostaglandinas e renovação celular.',
      },
      {
        drugOrClass: 'Insulina e hipoglicemiantes orais',
        severity: 'major',
        clinicalEffect: 'Redução da eficácia hipoglicemiante e perda de controle glicêmico.',
        pharmacologicalMechanism: 'Antagonismo farmacodinâmico direto por indução de resistência periférica à insulina e neoglicogênese.',
      },
      {
        drugOrClass: 'Fenobarbital e indutores microssomais hepáticos',
        severity: 'moderate',
        clinicalEffect: 'Diminuição da concentração plasmática e da duração clínica da dexametasona.',
        pharmacologicalMechanism: 'Aceleração do metabolismo hepático oxidativo mediado por enzimas do citocromo P450.',
      },
      {
        drugOrClass: 'Diuréticos depletores de potássio (furosemida, hidroclorotiazida)',
        severity: 'moderate',
        clinicalEffect: 'Aumento do risco de hipocalemia grave e arritmias cardíacas associadas.',
        pharmacologicalMechanism: 'Efeito aditivo de perda tubular de potássio.',
      },
    ],
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa (IV lenta)',
        technique: 'Usar exclusivamente a apresentação de fosfato dissódico de dexametasona (límpida e hidrossolúvel). Administrar lentamente ao longo de 1 a 2 minutos.',
        nursingCare: 'NUNCA administrar ésteres de acetato ou suspensões microcristalinas por via IV.',
        limitations: 'Algumas formulações contendo propilenoglicol podem induzir hipotensão se infundidas rapidamente.',
      },
      {
        route: 'Oral (comprimidos simples)',
        technique: 'Administrar junto com uma refeição completa.',
        nursingCare: 'Não administrar em jejum estrito para mitigar irritação direta da mucosa gástrica.',
        limitations: 'Para cães de médio a grande porte, o uso de comprimidos de 0,5 mg exige grande número de unidades, sendo preferível prednisolona.',
      },
      {
        route: 'Intramuscular (IM)',
        technique: 'Injeção estéril no quadríceps ou musculatura epaxial.',
        nursingCare: 'Observar que o fosfato é rapidamente absorvido, enquanto o acetato forma depósito de liberação prolongada.',
      },
    ],
    pharmacologicalClassification: {
      chemicalClass: 'Glicocorticoide fluorinado sintético (pregnano)',
      chemicalClassDescription: '9α-flúor-16α-metilprednisolona com alta lipofilicidade e seletividade esteroidal.',
      therapeuticClass: 'Anti-inflamatório esteroidal e imunossupressor sistêmico',
      therapeuticClassDescription: 'Agente imunomodulador de longa ação que suprime a transcrição de citocinas inflamatórias e bloqueia a fosfolipase A2.',
      detailedTargets: [
        {
          target: 'Receptor de Glicocorticoide Nuclear (GR / NR3C1)',
          action: 'Agonista pleno de altíssima afinidade',
          clinicalSignificance: 'Regula transcrição gênica, induz Anexina A1 e transreprime NF-κB e AP-1.',
        },
      ],
    },
    prescriptionType: {
      category: 'Medicamento Veterinário de Receita Simples',
      ordinanceOrLaw: 'MAPA — Não sujeito à Portaria SVS/MS 344/98',
      retentionRequired: false,
      guidelines: 'Prescrição em receituário simples veterinário com advertência explícita sobre proibição de uso conjunto com AINEs.',
    },
  },

  contraindications: [
    'Uso concomitante com anti-inflamatórios não esteroidais (AINEs).',
    'Infecções fúngicas sistêmicas profundas (criptococose, histoplasmose, blastomicose, aspergilose).',
    'Úlceras gastrointestinais ativas ou histórico recente de hemorragia digestiva.',
    'Úlcera de córnea ativa ou ceratite ulcerativa (contraindicação absoluta para uso tópico/oftálmico e sistêmico não monitorado).',
    'Traumatismo cranioencefálico agudo (TCE) e extrusão de disco aguda (IVDE).',
    'Uso rotineiro em choque séptico ou na ressuscitação hiperaguda da anafilaxia.',
    'Gatas e cadelas gestantes (risco de teratogenicidade, fenda palatina, abortamento ou indução prematura de parto).',
  ],

  cautions: [
    'Risco de indução de diabetes mellitus secundário em felinos obesos ou predispostos.',
    'Monitorar função gastrointestinal em cães: PU/PD/PP é esperado, mas vômito escuro ou melena exige interrupção imediata.',
    'Tratamentos superiores a 2 semanas exigem desmame gradual para permitir recuperação do córtex adrenal.',
    'Realizar urocultura periódica em pacientes imunossuprimidos crônicos devido ao risco de infecção urinária oculta oligossintomática.',
  ],

  adverseEffects: [
    'Poliúria, polidipsia e polifagia (muito comum em cães).',
    'Gastrite, ulceração gástrica, melena e perfuração colônica.',
    'Elevação maciça de fosfatase alcalina (ALP) induzida por esteroide no cão.',
    'Hiperglicemia e resistência insulínica (comum em felinos).',
    'Atrofia muscular, fraqueza, letargia e abdômen pendular por catabolismo crônico.',
    'Alopecia, pele fina e calcinose cutânea no uso prolongado.',
  ],

  routes: ['VO', 'IV', 'IM', 'SC'],
  administration: [
    'Via Oral: administrar com alimento para reduzir náusea gástrica.',
    'Via Intravenosa: utilizar exclusivamente fosfato dissódico de dexametasona; infundir lentamente.',
    'Via Intramuscular: aplicar em massa muscular volumosa.',
  ],

  monitoringParameters: [
    'Avaliação de sinais gastrointestinais: apetite, vômitos, consistência fecal e presença de melena.',
    'Glicemia sérica e urinálise (glicosúria e densidade urinária USG).',
    'Hemograma completo: observar leucograma de estresse.',
    'Perfil hepático: dosar ALT, ALP (cão) e bilirrubinas.',
    'Pressão arterial sistólica por Doppler vascular.',
    'Urocultura em tratamentos prolongados.',
  ],

  clientInformation: [
    'É esperado que o animal beba muito mais água, urine mais vezes e sinta mais fome durante o uso.',
    'NUNCA administre anti-inflamatórios como meloxicam, carprofeno ou aspirina junto com este remédio pelo perigo gravíssimo de úlceras e furos no estômago.',
    'Se notar vômito escuro (com aspecto de pó de café), diarreia preta ou fraqueza severa, suspenda o remédio e procure o veterinário na hora.',
    'Não interrompa o tratamento de forma brusca se o animal estiver tomando o remédio há mais de duas semanas seguidas sem orientação profissional.',
  ],
};
