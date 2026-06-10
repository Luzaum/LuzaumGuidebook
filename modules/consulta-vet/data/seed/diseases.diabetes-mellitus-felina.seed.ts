import { DiseaseRecord } from '../../types/disease';

/** Diabetes mellitus felina - ficha editorial para ConsultaVET. */
export const diabetesMellitusFelinaRecord: DiseaseRecord = {
  id: 'disease-diabetes-mellitus-felina',
  slug: 'diabetes-mellitus-felina',
  title: 'Diabetes Mellitus em Gatos',
  synonyms: ['Diabetes felina', 'DM felina', 'Diabetes mellitus felina', 'Feline diabetes mellitus'],
  species: ['cat'],
  category: 'endocrinologia',
  tags: [
    'Insulina',
    'Glargina',
    'PZI',
    'SGLT2i',
    'Remissão',
    'CGM',
    'Hiperglicemia',
    'Cetoacidose',
    'Hipersomatotropismo',
    'Hiperglicemia de estresse',
  ],
  quickSummary:
    'Diabetes mellitus felina é uma síndrome endócrino-metabólica caracterizada por hiperglicemia sustentada causada por resistência à insulina, disfunção de células beta ou ambos. Em muitos gatos o fenótipo se aproxima do diabetes tipo 2 humano: obesidade, sedentarismo, inflamação, pancreatopatia, hipersomatotropismo, hiperadrenocorticismo, doença renal, hipertireoidismo, infecção, dor e glicocorticoides podem aumentar resistência insulinica. A hiperglicemia persistente causa glicosúria, diurese osmótica, poliúria/polidipsia, perda de peso e, quando a deficiência de ação insulinica é maior, cetose ou cetoacidose. Diferentemente do cão, remissão diabética é possível quando a toxicidade glicêmica e a resistência insulinica são revertidas cedo. O tratamento moderno integra insulina apropriada ou SGLT2i em gatos selecionados, dieta individualizada, controle de peso, monitoramento domiciliar/CGM, vigilância de cetonas e manejo ativo de comorbidades.',
  quickDecisionStrip: [
    'Diagnóstico: sinais clínicos + evidência de hiperglicemia sustentada; confirmar com glicosúria/fructosamina/CGM ou dados domiciliares quando houver estresse.',
    'Exames iniciais: CBC, bioquímica com colesterol/triglicerídeos/eletrólitos, urinálise com sedimento, cetonas e T4 total em gatos maduros/idosos.',
    'Insulina inicial comum: glargina U-100 ou PZI, tipicamente 1 U/gato SC a cada 12 h; evitar NPH como escolha rotineira.',
    'SGLT2i: apenas em gato recém-diagnosticado, não cetótico, comendo, hidratado e sem contraindicações; monitorar beta-hidroxibutirato.',
    'Remissão: euglicemia por >4 semanas sem insulina ou hipoglicemiante; comum o suficiente para ser meta, mas recaída é possível.',
  ],
  quickSummaryRich: {
    lead:
      'Diabetes mellitus felina é uma doença de hiperglicemia sustentada por resistência insulinica e/ou falência beta. A fisiopatologia felina permite remissão em parte dos casos, mas também torna perigoso confundir hiperglicemia de estresse com diabetes real ou usar SGLT2i em gato cetótico. A abordagem clínica integra confirmação de hiperglicemia persistente, escolha entre insulina e SGLT2i, metas laboratoriais, controle de comorbidades e monitoramento de cetonas.',
    leadHighlights: ['hiperglicemia sustentada', 'remissão', 'hiperglicemia de estresse', 'SGLT2i'],
    pillars: [
      {
        title: 'Definição clínica',
        body: 'Sinais compatíveis com hiperglicemia persistente e glicosúria: PU/PD, perda de peso, polifagia, pelagem ruim, letargia ou neuropatia diabética.',
        highlights: ['PU/PD', 'glicosúria', 'neuropatia diabética'],
      },
      {
        title: 'Alvos úteis',
        body: 'Controle de sinais, ganho/estabilização de peso, ausência de cetonas, ausência de hipoglicemia e redução gradual de fructosamina/glicemia conforme monitoramento.',
        highlights: ['ausência de cetonas', 'ausência de hipoglicemia', 'fructosamina'],
      },
      {
        title: 'Particularidade felina',
        body: 'Remissão depende de recuperar função beta e reverter resistência insulinica/toxicidade glicêmica; hipersomatotropismo, obesidade e glicocorticoides reduzem a chance.',
        highlights: ['função beta', 'resistência insulinica', 'hipersomatotropismo'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico felino',
      steps: [
        {
          label: '1. Suspeitar pela síndrome',
          detail: 'PU/PD, perda de peso, polifagia, letargia, pelagem ruim, postura plantígrada, obesidade prévia ou uso de glicocorticoide/progestágeno.',
        },
        {
          label: '2. Provar hiperglicemia sustentada',
          detail: 'Usar sinais + glicosúria; se a consulta for estressante, confirmar com fructosamina, CGM, glicemia domiciliar ou urina coletada em casa.',
        },
        {
          label: '3. Checar cetonas e gravidade',
          detail: 'Beta-hidroxibutirato ou cetonúria, hidratação, apetite, vômito, acidose e eletrólitos definem se é ambulatorial ou emergência.',
        },
        {
          label: '4. Mapear comorbidades',
          detail: 'T4 total, rim/urina, pressão arterial, pancreatite, infecção, dor oral; se dose alta/controle ruim, pesquisar IGF-1 para hipersomatotropismo.',
        },
        {
          label: '5. Escolher terapia',
          detail: 'Insulina para a maioria; SGLT2i somente se recém-diagnosticado, não cetótico e com cuidador capaz de monitorar sinais e cetonas.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico felino',
      steps: [
        {
          label: '1. Gato doente ou cetótico',
          detail: 'Internar se houver anorexia, vômito, desidratação, depressão ou cetonas significativas; DKA exige insulina mesmo se a glicemia não estiver muito alta.',
        },
        {
          label: '2. Insulina',
          detail: 'Glargina U-100 ou PZI são opções iniciais comuns; dose inicial típica 1 U/gato q12h, com reavaliação em 5–7 dias.',
        },
        {
          label: '3. Dieta',
          detail: 'Preferir dieta úmida, alta em proteína e baixa em carboidratos quando apropriada; transição exige monitoramento porque a necessidade de insulina pode cair.',
        },
        {
          label: '4. SGLT2i',
          detail: 'Bexagliflozina ou velagliflozina conforme disponibilidade/regulação local; usar apenas com triagem rigorosa e monitoramento de BHB.',
        },
        {
          label: '5. Remissão',
          detail: 'Monitorar de perto nos primeiros 3–6 meses; reduzir insulina com segurança quando glicemias caem e sinais resolvem.',
        },
      ],
    },
  },
  etiology: {
    mecanismos:
      'A DM felina surge de resistência insulinica sustentada, falência beta variável e toxicidade glicêmica. Muitos gatos ainda têm reserva pancreática no diagnóstico; por isso, corrigir rapidamente hiperglicemia e fatores de resistência pode permitir remissão.',
    fatoresPredisponentes: [
      'Obesidade, baixa atividade física e dieta com excesso calórico aumentam resistência insulinica.',
      'Pancreatite, doença pancreática crônica e inflamação sistêmica podem reduzir secreção de insulina.',
      'Hipersomatotropismo é causa relevante de diabetes difícil e de altas doses de insulina.',
      'Hiperadrenocorticismo felino é raro, mas importante em diabético mal controlado com pele frágil, fraqueza e caquexia.',
      'Glicocorticoides, progestágenos, doença dental, infecção urinária, DRC, hipertireoidismo e dor podem perpetuar hiperglicemia.',
      'Raças como Burmese, Tonkinese, Norwegian Forest Cat, Russian Blue e Abyssinian são citadas em algumas populações; gatos >4 kg têm maior risco em séries clínicas.',
    ],
  },
  epidemiology: {
    perfil:
      'Afeta gatos adultos a idosos, frequentemente machos castrados, obesos ou previamente obesos. Pode aparecer como quadro ambulatorial de PU/PD e emagrecimento ou como emergência por DKA.',
    remissao:
      'Remissão é majoritariamente um fenômeno felino. Diretrizes AAHA 2026 citam média aproximada de 30% nos EUA, com parte das remissões ocorrendo nos primeiros 2–3 meses e a maioria dentro de 6 meses em gatos que entram em remissão.',
  },
  pathogenesisTransmission: {
    patogenese: [
      'Resistência insulinica aumenta demanda secretória das células beta.',
      'Hiperglicemia crônica causa toxicidade glicêmica, reduzindo ainda mais secreção de insulina.',
      'Glicosúria provoca diurese osmótica, PU/PD e desidratação.',
      'Perda calórica urinária e catabolismo causam perda de peso e sarcopenia.',
      'Deficiência insulinica relativa/absoluta permite lipólise e cetogênese; SGLT2i pode mascarar hiperglicemia e favorecer DKA euglicêmica se insulina endógena for insuficiente.',
      'Neuropatia diabética causa fraqueza de membros pélvicos, dificuldade de salto e postura plantígrada.',
    ],
    transmissao:
      'Não é contagiosa nem zoonótica. É doença metabólica influenciada por adiposidade, hormônios, pâncreas, inflamação, medicamentos e comorbidades.',
  },
  pathophysiology:
    'A resistência à insulina e a disfunção beta mantêm glicose elevada. A hiperglicemia sustentada gera toxicidade glicêmica, piorando a secreção pancreática e perpetuando o ciclo. Quando há glicosúria, a perda osmótica de água causa poliúria e polidipsia; a perda de glicose pela urina causa emagrecimento mesmo com apetite aumentado. Se a ação insulinica é insuficiente para bloquear lipólise e cetogênese, surgem cetonas, acidose, desidratação, distúrbios de potássio/fósforo e cetoacidose. Em gatos, a recuperação parcial da função beta é possível, mas a reserva pancreática permanece limitada e recaídas são comuns.',
  clinicalSignsPathophysiology: [
    {
      system: 'metabolic',
      findings: [
        'Poliúria/polidipsia por glicosúria e diurese osmótica.',
        'Perda de peso, sarcopenia e pelagem opaca por catabolismo e perda calórica.',
        'Polifagia pode ocorrer, mas gatos doentes, pancreáticos ou cetóticos podem estar hiporéticos/anoréticos.',
      ],
    },
    {
      system: 'neurologic',
      findings: [
        'Neuropatia diabética: postura plantígrada, fraqueza de membros pélvicos e dificuldade de saltar.',
        'Hipoglicemia por excesso de insulina ou remissão não reconhecida: fraqueza, ataxia, tremores, convulsão ou coma.',
      ],
    },
    {
      system: 'emergency',
      findings: [
        'DKA: anorexia, vômitos, desidratação, depressão, taquipneia, dor abdominal e cetonas.',
        'DKA euglicêmica em SGLT2i: o gato pode estar cetótico/acidemico sem hiperglicemia proporcional.',
      ],
    },
    {
      system: 'comorbidities',
      findings: [
        'Hipersomatotropismo: dose alta de insulina, ganho de peso paradoxal, organomegalia/tecidos moles, estridor ou cardiomiopatia.',
        'Hiperadrenocorticismo: pele frágil, equimoses, má cicatrização, fraqueza, diabetes difícil.',
      ],
    },
  ],
  diagnosis: {
    criterios:
      'A AAHA 2026 recomenda evidência de hiperglicemia sustentada para diagnosticar DM felina: fructosamina ou HbA1c aumentadas quando disponíveis/adequadas, hiperglicemia ou glicosúria documentadas em mais de uma ocasião em ambiente não estressante ou domiciliar. Em gatos, hiperglicemia de estresse pode ser intensa; por isso, integrar sinais clínicos, glicosúria, fructosamina, CGM e dados de casa.',
    examesIniciais: [
      'Hemograma completo.',
      'Bioquímica com colesterol, triglicerídeos e eletrólitos.',
      'Urinálise com sedimento, densidade, glicose e cetonas.',
      'T4 total em gatos maduros/idosos.',
      'Fructosamina como média dos últimos 7–10 dias, lembrando que hipertireoidismo e doenças perdedoras de proteína podem reduzi-la.',
      'Beta-hidroxibutirato sanguíneo quando há anorexia, vômito, depressão, SGLT2i ou qualquer suspeita de DKA.',
    ],
    metasTabela: {
      kind: 'clinicalTable' as const,
      headers: ['Parâmetro', 'Meta prática', 'Uso clínico'],
      rows: [
        ['Sinais clínicos', 'PU/PD e polifagia melhoram, peso estabiliza/sobe se estava magro.', 'Meta principal junto com qualidade de vida.'],
        ['Hipoglicemia', 'Ausente; qualquer sinal ou leitura baixa exige revisão.', 'Remissão não reconhecida pode causar hipoglicemia grave.'],
        ['Cetonas/BHB', 'Negativas em paciente ambulatorial; BHB >1,0 mmol/L em gato diabético sugere estágio mais complicado.', 'Essencial antes e durante SGLT2i e em gato doente.'],
        ['Insulina', 'Muitos gatos regulam com <4 U q12h.', 'Doses altas pedem auditoria e pesquisa de resistência.'],
        ['Fructosamina', 'Redução progressiva compatível com melhora, sem substituir sinais/CGM.', 'Afetada por proteína, hipertireoidismo e doenças concomitantes.'],
        ['Remissão', 'Euglicemia >4 semanas sem insulina ou hipoglicemiante.', 'Manter vigilância por risco de recaída.'],
      ],
    },
    tabelaDecisao: {
      kind: 'clinicalTable' as const,
      headers: ['Cenário', 'Interpretação', 'Conduta'],
      rows: [
        ['Glicemia alta + PU/PD + glicosúria', 'DM provável.', 'Checar cetonas, exames iniciais e iniciar tratamento.'],
        ['Glicemia alta sem glicosúria/sinais claros', 'Possível estresse.', 'Fructosamina, CGM, glicemia/urina domiciliar e reavaliação.'],
        ['Cetonas + anorexia/vômitos/depressão', 'DKA até prova em contrário.', 'Internar, medir BHB/acidose/eletrólitos e iniciar protocolo.'],
        ['Dose >4 U/gato q12h ou resposta pobre', 'Resistência, técnica ou comorbidade.', 'Auditar aplicação/dieta; pesquisar IGF-1, HAC, pancreatite, DRC, hipertireoidismo e infecção.'],
        ['Glicemias caindo com sinais resolvidos', 'Possível aproximação de remissão.', 'Reduzir insulina com monitoramento; não suspender sem critério.'],
      ],
    },
  },
  treatment: {
    objetivo:
      'Controlar sinais clínicos, evitar hipoglicemia e cetose, preservar massa magra, melhorar qualidade de vida e buscar remissão quando possível.',
    insulinoterapia: [
      'Glargina U-100 ou PZI são escolhas iniciais comuns; AAHA 2026 sugere dose inicial típica de 1 U/gato SC a cada 12 h para a maioria dos gatos.',
      'Calcular doses ponderais pelo peso ideal quando houver obesidade; evitar iniciar acima de 2 U/gato sem justificativa forte.',
      'Reavaliar em 5–7 dias após início com sinais clínicos, peso e glicemia/CGM; não aumentar se houver hipoglicemia.',
      'NPH não é considerada escolha aceitável rotineira em gatos por duração muito curta; lente tem uso, mas não é primeira escolha preferida por muitos especialistas.',
    ],
    insulinasTabela: {
      kind: 'clinicalTable' as const,
      headers: ['Opção', 'Papel', 'Cuidados'],
      rows: [
        ['Glargina U-100', 'Primeira linha comum; associada a bom controle e remissão.', 'Usar seringa U-100; ajustar por sinais, CGM/curva e hipoglicemia.'],
        ['PZI', 'Insulina veterinária aprovada para gatos; q12h.', 'Boa opção quando glargina não é viável; monitorar nadir/duração.'],
        ['Glargina U-300', 'Basal possível em protocolos recentes.', 'Não é simplesmente “3x glargina U-100”; usar caneta e orientação específica.'],
        ['Lente', 'Pode funcionar em alguns gatos.', 'Duração menor; não é primeira escolha preferida em muitos protocolos atuais.'],
        ['NPH', 'Evitar como rotina.', 'Duração frequentemente <8 h em gatos.'],
      ],
    },
    dieta: [
      'Preferir dieta úmida, rica em proteína e com baixo carboidrato quando não houver contraindicação individual.',
      'A troca para dieta baixa em carboidrato pode reduzir rapidamente necessidade de insulina; monitorar de perto.',
      'Obesos: perda de peso gradual, preservando proteína e massa magra.',
      'Magros, sarcopênicos ou pós-DKA: primeiro estabilizar ingestão calórica e hidratação; não impor restrição agressiva.',
    ],
    sglt2i: {
      selecao:
        'SGLT2i são opção para gatos recém-diagnosticados, caso estejam clinicamente bem, comendo, hidratados, sem cetose e sem comorbidade que contraindique. Agem aumentando glicosúria e melhorando sinais, mas dependem de insulina endógena suficiente para prevenir cetose.',
      criteriosMinimos: [
        'Recém-diagnosticado e não tratado previamente com insulina, conforme diretriz/bula local.',
        'Apetite preservado, hidratação adequada e ausência de vômito/doença sistêmica relevante.',
        'Sem cetonúria/cetonemia; idealmente BHB basal normal.',
        'Cuidador capaz de observar hiporexia, vômito, letargia e testar cetonas quando orientado.',
      ],
      naoUsarOuSuspender: [
        'Cetonas positivas, DKA atual/prévia recente, anorexia, vômitos, desidratação ou pancreatite ativa.',
        'Doença renal/hepática ou sistêmica descompensada conforme avaliação clínica.',
        'Qualquer piora sistêmica durante uso: suspender e checar BHB/acidose, mesmo se glicose não estiver muito alta.',
      ],
    },
    monitoramento: [
      'Primeira checagem em 5–7 dias após iniciar glargina/PZI; avaliar sinais, peso e glicose/CGM.',
      'Glucose monitoring em 5–14 dias após início ou qualquer ajuste, sempre que sinais retornarem e quando hipoglicemia for suspeita.',
      'CGM é preferido quando disponível; identifica hipoglicemia silenciosa e padrões de duração/nadir. Confirmar leituras baixas com glicosímetro se houver discordância.',
      'BGC: medir glicose antes da refeição/insulina e a cada 2 h por até 10–12 h quando CGM não estiver disponível.',
      'Em SGLT2i: monitorar cetonas/BHB conforme protocolo, especialmente nas primeiras semanas e sempre que houver hiporexia, vômito ou letargia.',
    ],
    ajusteDose: [
      'Aumentar dose apenas se sinais persistem e dados mostram hiperglicemia sustentada sem hipoglicemia.',
      'Reduzir dose se houver hipoglicemia, queda acentuada no CGM/curva, melhora rápida após mudança de dieta ou sinais de remissão.',
      'Se dose chega a 4 U/gato q12h sem controle, não apenas subir: investigar técnica, dieta, acromegalia/IGF-1, HAC, pancreatite, DRC, hipertireoidismo, infecção e dor.',
    ],
    remissao:
      'Remissão é euglicemia por mais de 4 semanas sem insulina ou hipoglicemiante. Ela exige recuperação de função beta e reversão de resistência insulinica/toxicidade glicêmica. O gato em remissão não está curado; manter peso, dieta e monitoramento periódico. Se remissão não for reconhecida, a manutenção da insulina pode causar hipoglicemia grave.',
    hipoglicemia: {
      kind: 'clinicalTable' as const,
      headers: ['Situação', 'Conduta'],
      rows: [
        ['Consciente e comendo', 'Oferecer alimento; reavaliar glicose e contatar veterinário para ajuste.'],
        ['Sintomático ou não consegue comer', 'Aplicar glicose/mel na mucosa oral e encaminhar como emergência.'],
        ['Após episódio', 'Reduzir insulina, revisar dieta recente, perda de peso, técnica, CGM/curva e possibilidade de remissão.'],
      ],
    },
    dka:
      'DKA felina é emergência. Diagnóstico: sinais sistêmicos em gato diabético + cetose e acidose; se acidose não puder ser medida, gato doente e cetótico deve ser tratado como DKA. Insulina é necessária mesmo na DKA euglicêmica por SGLT2i. Prioridades: fluidoterapia, eletrólitos, potássio/fósforo, antiemético/analgesia, insulina regular ou protocolo com glargina U-100 em casos selecionados, monitoramento de BHB/glicose/acidose e tratamento de precipitantes como pancreatite, infecção, hipercortisolismo e doença renal.',
  },
  prevention:
    'Prevenção e redução de recorrência dependem de escore corporal adequado, atividade, dieta apropriada, evitar glicocorticoides/progestágenos desnecessários, tratar doença dental/infecção/dor, controlar DRC/hipertireoidismo/pancreatite e monitorar gatos em remissão. Em gatos obesos de risco, perda de peso gradual e acompanhamento de PU/PD e peso são as medidas mais úteis.',
  relatedDiseaseSlugs: [
    'hipertireoidismo-felino',
    'hiperadrenocorticismo-sindrome-cushing',
    'doenca-renal-cronica-caes-gatos',
    'hipertensao-arterial-sistemica-caes-gatos',
  ],
  relatedMedicationSlugs: [],
  relatedConsensusSlugs: [],
  references: [
    {
      id: 'ref-icatcare-feline-dm-2025',
      citationText:
        'Taylor S et al. 2025 iCatCare consensus guidelines on the diagnosis and management of diabetes mellitus in cats. Journal of Feline Medicine and Surgery, 2025.',
      sourceType: 'Consenso iCatCare',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12612538/',
      notes: 'Consenso felino atual: ALIVE, diagnóstico, insulina, SGLT2i, CGM, comorbidades, DKA e educação.',
      evidenceLevel: 'A - consenso especializado',
    },
    {
      id: 'ref-aaha-cat-dm-2026',
      citationText: 'Cook AK et al. 2026 AAHA Diabetes Management Guidelines for Cats. JAAHA, 2026.',
      sourceType: 'Diretriz AAHA',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/',
      notes: 'Diretriz felina específica, incluindo SGLT2i, insulina, dieta, remissão, DKA e monitoramento.',
      evidenceLevel: 'A - diretriz',
    },
    {
      id: 'ref-aaha-cat-diagnosis-2026',
      citationText: 'AAHA. 2026 Diabetes Management Guidelines for Cats, Section 3: Diagnosing DM in Cats.',
      sourceType: 'Diretriz AAHA',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-3-diagnosing-dm-in-cats/',
      notes: 'Critérios de hiperglicemia sustentada, fructosamina, CGM, glicosúria domiciliar e BHB.',
      evidenceLevel: 'A - diretriz',
    },
    {
      id: 'ref-aaha-cat-insulin-2026',
      citationText: 'AAHA. 2026 Diabetes Management Guidelines for Cats, Section 7: Insulin Treatment and Monitoring.',
      sourceType: 'Diretriz AAHA',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-7-insulin-treatment-and-monitoring/',
      notes: 'Glargina, PZI, dose inicial, monitoramento e troubleshooting de doses altas.',
      evidenceLevel: 'A - diretriz',
    },
    {
      id: 'ref-aaha-cat-sglt2-2026',
      citationText: 'AAHA. 2026 Diabetes Management Guidelines for Cats, Section 6: SGLT2 Inhibitor Treatment and Monitoring.',
      sourceType: 'Diretriz AAHA',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-6-sglt2-inhibitor-treatment-and-monitoring/',
      notes: 'Seleção de candidatos, contraindicações e monitoramento de cetose/BHB.',
      evidenceLevel: 'A - diretriz',
    },
    {
      id: 'ref-aaha-cat-remission-2026',
      citationText: 'AAHA. 2026 Diabetes Management Guidelines for Cats, Section 9: Diabetic Remission.',
      sourceType: 'Diretriz AAHA',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-9-diabetic-remission/',
      notes: 'Definição, frequência e risco de hipoglicemia por remissão não reconhecida.',
      evidenceLevel: 'A - diretriz',
    },
    {
      id: 'ref-merck-dm-dogs-cats-feline',
      citationText: 'Merck Veterinary Manual. Diabetes Mellitus in Dogs and Cats. Reviewed/Revised May 2024; Modified May 2025.',
      sourceType: 'Revisão clínica',
      url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats',
      notes: 'Insulinas, dieta, SGLT2i, DKA e monitoramento.',
      evidenceLevel: 'B - referência prática',
    },
    {
      id: 'ref-vin-feline-dm',
      citationText: 'VIN. Feline Diabetes Mellitus / Feline Diabetes, VIN clinical content and proceedings.',
      sourceType: 'VIN / revisão clínica',
      url: 'https://www.vin.com/apputil/content/defaultadv1.aspx?id=3847280',
      notes: 'Conteúdo VIN pode exigir autenticação; usar como referência de apoio quando acessível.',
      evidenceLevel: 'B/C - revisão especializada',
    },
    {
      id: 'ref-monitoring-dm-pmc-feline',
      citationText: 'Cook AK. Monitoring methods for dogs and cats with diabetes mellitus. J Diabetes Sci Technol. 2012.',
      sourceType: 'Artigo de revisão',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3440050/',
      notes: 'Monitoramento glicêmico e interpretação de curvas/fructosamina.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-nelson-couto-feline-dm',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Disorders of the Endocrine Pancreas.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Base fisiopatológica e clínica para DM felina.',
      evidenceLevel: 'Referência secundária',
    },
  ],
  isPublished: true,
  source: 'seed',
};
