import type { DiseaseRecord } from '../../types/disease';

export const cardiomiopatiaDilatadaRecord: DiseaseRecord = {
  id: 'disease-cardiomiopatia-dilatada',
  slug: 'cardiomiopatia-dilatada-caes-gatos',
  title: 'Cardiomiopatia dilatada (CMD)',
  synonyms: ['CMD', 'Cardiomiopatia dilatada canina', 'Cardiomiopatia dilatada felina', 'CMD oculta'],
  species: ['dog', 'cat'],
  category: 'cardiologia',
  tags: ['CMD', 'Dobermann', 'Pimobendan', 'Holter', 'Insuficiência cardíaca', 'Arritmia ventricular', 'Taurina'],
  quickSummary:
    'A cardiomiopatia dilatada (CMD) é um fenótipo de disfunção sistólica miocárdica com dilatação ventricular, baixa contratilidade e, frequentemente, arritmias. Em cães, predomina em raças grandes e gigantes, com forte importância em Dobermann; pode existir uma longa fase oculta detectável por ecocardiografia e Holter antes da insuficiência cardíaca. Em gatos, tornou-se incomum após correção da deficiência de taurina em dietas comerciais, mas ainda ocorre por deficiência nutricional, toxicidade, miocardite, taquicardia persistente ou causa idiopática. O exame de referência é a ecocardiografia, complementada por eletrocardiograma, Holter e investigação de causas reversíveis. Pimobendan retarda a descompensação em Dobermanns com CMD pré-clínica e integra o tratamento da insuficiência cardíaca; diurético, modulação do sistema renina–angiotensina–aldosterona, controle de arritmias e correção nutricional são adicionados conforme o estágio.',
  quickDecisionStrip: [
    'Raça de risco pode ter CMD silenciosa: ecocardiograma e Holter detectam doença antes da insuficiência cardíaca.',
    'Ecocardiografia confirma dilatação e disfunção; radiografia confirma congestão, não a etiologia.',
    'Pimobendan tem evidência pré-clínica em Dobermann e benefício na CMD com insuficiência cardíaca.',
    'Taquiarritmia pode ser causa, consequência ou ambas; controlar frequência pode reverter parte do fenótipo.',
    'Investigue dieta, taurina e carnitina sem assumir que toda CMD é “nutricional”.',
    'Dispneia, hipotensão ou arritmia sustentada exigem estabilização hospitalar.',
  ],
  quickSummaryRich: {
    lead:
      'Na CMD, a bomba perde força. O volume residual aumenta, as câmaras dilatam, as valvas passam a regurgitar por estiramento do anel e a perfusão efetiva cai. O organismo tenta compensar com simpático e RAAS, mas a retenção de sódio e a vasoconstrição aumentam ainda mais a carga do coração. Tratar bem significa reconhecer a fase: rastrear a doença oculta, aliviar congestão quando aparece e controlar arritmias que podem matar antes mesmo do edema.',
    leadHighlights: ['perde força', 'RAAS', 'doença oculta', 'arritmias'],
    pillars: [
      {
        title: 'Fenótipo com várias causas',
        body:
          'Genética é central em algumas raças, mas deficiência de taurina ou carnitina, dietas desequilibradas, doxorrubicina, miocardite e taquicardia sustentada podem gerar ou agravar o mesmo fenótipo.',
        highlights: ['várias causas', 'taurina', 'doxorrubicina'],
      },
      {
        title: 'Fase oculta importa',
        body:
          'Dobermanns podem apresentar ectopia ventricular no Holter antes de dilatação inequívoca; rastreio combinado aumenta a chance de detectar CMD pré-clínica.',
        highlights: ['Holter', 'pré-clínica'],
      },
      {
        title: 'Congestão e perfusão',
        body:
          'Furosemida controla o excesso de líquido; pimobendan melhora o desempenho cardíaco e reduz a pós-carga; inibidores da enzima conversora de angiotensina e antagonistas de aldosterona modulam a ativação neuro-hormonal, sempre com vigilância renal.',
        highlights: ['Furosemida', 'pimobendan', 'vigilância renal'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo clínico',
      steps: [
        {
          label: '1. Defina se há emergência',
          detail:
            'Dispneia, edema, choque, síncope ou taquiarritmia sustentada: oxigênio, eletrocardiograma, ultrassonografia à beira do leito e estabilização antes do estadiamento completo.',
        },
        {
          label: '2. Confirme disfunção sistólica',
          detail:
            'Ecocardiografia com medidas normalizadas, volumes e função sistólica; avaliar regurgitação funcional, átrios e pressão pulmonar.',
        },
        {
          label: '3. Quantifique arritmia',
          detail:
            'ECG identifica ritmo atual; Holter de 24 h é mais sensível para ectopia intermitente e rastreio de Dobermann.',
        },
        {
          label: '4. Procure causa modificável',
          detail:
            'História dietética detalhada, taurina plasmática e sanguínea total quando pertinente, carnitina em raças selecionadas, T4, troponina e investigação de toxinas/miocardite.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Tratamento por fase',
      steps: [
        {
          label: 'Pré-clínica com disfunção',
          detail:
            'Pimobendan; plano de Holter/eco seriado. Arritmia ventricular relevante exige protocolo individual.',
        },
        {
          label: 'Insuficiência cardíaca aguda',
          detail:
            'Oxigênio, furosemida IV titulada, pimobendan quando via oral for segura; dobutamina se choque por baixo débito.',
        },
        {
          label: 'Insuficiência cardíaca crônica',
          detail:
            'Pimobendan + furosemida; IECA se perfusão e rim permitirem; considerar espironolactona e controle de frequência/ritmo.',
        },
        {
          label: 'Causa reversível',
          detail:
            'Corrigir dieta e suplementar taurina/carnitina quando indicado; controlar taquiarritmia e retirar toxina. Reavaliar remodelamento.',
        },
      ],
    },
  },
  etiology: {
    genetica:
      'Predisposição familiar é bem documentada em Dobermann, Lébrel Irlandês, Dogue Alemão, Boxer e outras raças grandes, embora mecanismos e genes variem. Em Dobermann, alterações como PDK4 e TTN explicam apenas parte dos casos e não substituem o rastreio fenotípico.',
    secundaria: [
      'Deficiência de taurina: causa clássica de CMD felina e descrita em alguns cães; a resposta depende de quão cedo o dano é reconhecido.',
      'Deficiência de L-carnitina: relevante em subset de Boxers e outras famílias, mas não é explicação universal.',
      'Cardiotoxicidade por doxorrubicina: lesão cumulativa por radicais livres; monitore a função cardíaca e a dose total recebida.',
      'Miocardite infecciosa ou imunomediada, sepse, hipotireoidismo verdadeiro e distúrbios metabólicos podem produzir disfunção secundária.',
      'Cardiomiopatia induzida por taquicardia: frequência rápida persistente aumenta consumo, reduz enchimento e deprime contratilidade; pode melhorar após controle do ritmo.',
    ],
    dieta:
      'Freeman et al. (2020) revisaram os relatos de CMD associada à dieta e concluíram que a relação é heterogênea e provavelmente multifatorial. Avalie fórmulação, fabricante, digestibilidade, aminoácidos e resposta à troca dietética; o rótulo “sem grãos” não é diagnóstico.',
  },
  epidemiology: {
    caes:
      'Predomina em cães adultos de porte grande ou gigante. Dobermanns frequentemente desenvolvem doença na meia-idade; machos tendem a descompensar mais cedo em algumas coortes. Cocker Spaniels podem apresentar associação com deficiência de taurina.',
    gatos:
      'A CMD felina primária é hoje rara com dietas completas contendo taurina. Quando ocorrer, revise dieta caseira, alimentação formulada para outra espécie, má absorção, fórmulação inadequada, miocardite e taquicardia.',
    prognostico:
      'O prognóstico piora com insuficiência cardíaca congestiva, síncope, taquiarritmia ventricular, fibrilação atrial, dilatação intensa e disfunção renal. Morte súbita pode ser o primeiro desfecho em Dobermann.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Perda de contratilidade aumenta volume sistólico final e reduz volume ejetado.',
      'Sobrecarga de volume dilata ventrículos e anéis valvares, gerando regurgitação mitral/tricúspide funcional.',
      'Baixo débito ativa simpático, RAAS e vasopressina; vasoconstrição e retenção hídrica sustentam pressão no curto prazo, mas elevam pré e pós-carga.',
      'Pressão de enchimento esquerda causa edema pulmonar; pressão direita causa ascite, efusão e congestão hepática.',
      'Estiramento e fibrose criam substrato para fibrilação atrial e arritmias ventriculares.',
    ],
    transmissao:
      'Não é contagiosa. Formas genéticas justificam rastreio familiar e orientação reprodutiva.',
  },
  pathophysiology:
    'A CMD combina falência sistólica e remodelamento excêntrico. Pela lei de Laplace, o aumento do raio ventricular eleva a tensão de parede e o custo energético; a contração enfraquece ainda mais. A taquicardia reduz enchimento e perfusão coronariana, enquanto a regurgitação funcional desperdiça parte do volume sistólico. Quando o débito renal cai, o sistema renina–angiotensina–aldosterona retém sódio e água, favorecendo congestão. Essa mesma compensação explica por que a diurese agressiva alivia o pulmão, mas pode precipitar azotemia se reduzir demais a pré-carga.',
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        'Taquipneia, dispneia, ortopneia e crepitações: aumento de pressão atrial esquerda causa edema pulmonar.',
        'Efusão pleural, mais frequente em gatos e falência biventricular, limita expansão pulmonar e abafa sons.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Pulso fraco e déficit de pulso: baixo volume sistólico e batimentos ectópicos sem ejeção eficaz.',
        'Sopro apical: dilatação do anel produz regurgitação funcional, não doença valvar primária.',
        'Ritmo irregular/taquicardia: fibrilação atrial em câmaras dilatadas ou ectopia ventricular por miocárdio doente.',
        'Síncope ou morte súbita: taquiarritmia ventricular ou queda abrupta do débito cerebral.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Intolerância ao exercício, fraqueza e perda muscular: baixo débito e ativação catabólica da insuficiência cardíaca.',
        'Hiporexia e perda de peso: congestão visceral, náusea urêmica/medicamentosa e caquexia cardíaca.',
      ],
    },
    {
      system: 'hepatic',
      findings: [
        'Ascite, hepatomegalia e jugulares distendidas: elevação de pressão venosa direita.',
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Ecocardiografia com Doppler',
      description:
        'Exame de referência: demonstra dilatação ventricular, aumento dos volumes sistólico e diastólico, baixa fração de encurtamento ou ejeção e regurgitação funcional. As medidas devem ser normalizadas ao tamanho corporal e interpretadas por raça.',
      isGoldStandard: true,
    },
    {
      stepNumber: 2,
      title: 'ECG e Holter de 24 horas',
      description:
        'O eletrocardiograma diagnostica fibrilação atrial e arritmia presente durante o exame. Holter é essencial quando a ectopia é intermitente, em síncope e no rastreio de Dobermann; um eletrocardiograma curto normal não exclui a fase oculta.',
    },
    {
      stepNumber: 3,
      title: 'Radiografia torácica',
      description:
        'Usar para documentar cardiomegalia e, sobretudo, edema/efusão. Não diferencia CMD de outras causas de coração aumentado sem ecocardiografia.',
    },
    {
      stepNumber: 4,
      title: 'Biomarcadores',
      description:
        'NT-proBNP apoia triagem e prognóstico; troponina I sugere lesão miocárdica e pode ajudar em miocardite ou toxicidade. Sensibilidade e especificidade variam com raça e estágio, portanto não substituem ecocardiograma e Holter.',
    },
    {
      stepNumber: 5,
      title: 'Causas reversíveis e comorbidades',
      description:
        'Solicite hemograma, bioquímica, eletrólitos e urina; T4 total, T4 livre e TSH apenas quando houver suspeita endócrina real. Obtenha história dietética completa e meça taurina e, eventualmente, carnitina. Em uso de doxorrubicina, revise a dose cumulativa, a troponina e o ecocardiograma.',
    },
    {
      stepNumber: 6,
      title: 'Rastreio de raças de risco',
      description:
        'Dobermanns: ecocardiografia e Holter anuais a partir da idade recomendada pelo cardiologista/programa racial. Teste genético isolado não exclui doença.',
    },
  ],
  treatment: {
    preclinica: [
      'Summerfield et al. (2012), no ensaio PROTECT com 76 Dobermanns e controle por placebo, estudaram pimobendan na CMD pré-clínica. A mediana até insuficiência cardíaca ou morte súbita foi 718 dias com pimobendan e 441 dias com placebo; a sobrevida mediana foi 623 versus 466 dias. A dose prática é 0,25–0,3 mg/kg por via oral a cada 12 horas.',
      'Arritmia ventricular relevante: sotalol, mexiletina combinada a atenolol ou outro protocolo conforme morfologia, carga de ectopia, função e raça. Antiarrítmico pode provocar novas arritmias; oriente a escolha e o ajuste pelo Holter.',
    ],
    aguda: [
      'Insuficiência cardíaca pulmonar: oxigênio e furosemida intravenosa de 1–4 mg/kg titulada à resposta. Budde e McCluskey (2023) descrevem, no edema grave canino, 2 mg/kg por via intravenosa ou intramuscular, com repetição horária até resposta ou limite clínico, sempre monitorando perfusão.',
      'Use pimobendan assim que a via oral for segura; reserve dobutamina para choque cardiogênico ou baixo débito refratário, com eletrocardiograma e pressão arterial contínuos.',
      'Fibrilação atrial rápida: diltiazem e/ou digoxina; evitar reduzir frequência de forma cega em paciente hipotenso.',
    ],
    cronica: [
      'Pimobendan: 0,5 mg/kg/dia dividido a cada 12 horas; melhora sinais e sobrevida na CMD canina com insuficiência cardíaca congestiva.',
      'Furosemida na menor dose que mantém conforto; ponto de partida comum em cães é 2 mg/kg por via oral a cada 12 horas, ajustado pela congestão e função renal. Em gatos, use 1–2 mg/kg por via oral a cada 8–12 horas, de forma individualizada.',
      'IECA como benazepril quando pressão, perfusão e função renal permitem; checar creatinina e potássio após início/ajuste.',
      'Espironolactona 1–2 mg/kg por via oral a cada 12–24 horas como adjuvante na insuficiência cardíaca canina; monitore eletrólitos e função renal. A evidência felina é limitada.',
      'Taurina e L-carnitina quando deficiência, dieta ou raça justificarem; troque para dieta completa formulada por fabricante com controle nutricional. Suplementação não substitui a terapia da insuficiência cardíaca.',
    ],
    monitoramento: [
      'Frequência respiratória dormindo, peso, apetite e tolerância ao exercício.',
      'Ureia, creatinina e eletrólitos 3–7 dias após intensificação de diurético/RAAS e periodicamente.',
      'Eco a cada 3–6 meses conforme estágio; Holter para resposta antiarrítmica e progressão.',
      'Pressão arterial e ECG durante terapia intensiva ou quando houver síncope/fraqueza.',
    ],
  },
  prevention: {
    genetica:
      'Rastrear reprodutores e parentes de primeiro grau em raças de risco com eco e Holter; retirar da reprodução animais afetados conforme orientação do programa racial.',
    nutricional:
      'Usar dieta completa e balanceada adequada à espécie e fase de vida. Dieta caseira exige fórmulação por nutricionista veterinário; revisar dietas não tradicionais em todo caso de CMD.',
    iatrogenica:
      'Antes e durante o uso de doxorrubicina, registre dose cumulativa, fatores raciais e função cardíaca; realize ecocardiograma em cardiopatas e avaliação seriada a cada incremento cumulativo relevante.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['hipotireoidismo-canino'],
  relatedMedicationSlugs: ['pimobendan', 'benazepril'],
  references: [
    {
      id: 'ref-nelson-couto-dcm',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 7–8, Myocardial Diseases of the Dog and Cat; PDF anexado, pp. 171–202.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-plumbs-dcm',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Monografias Pimobendan, Furosemide, Benazepril, Spironolactone, Diltiazem e Doxorubicin.',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-protect',
      citationText:
        'Summerfield NJ, et al. Efficacy of pimobendan in prevention of CHF or sudden death in Dobermann Pinschers with preclinical DCM: PROTECT Study. JVIM. 2012;26:1337–1349.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.1111/j.1939-1676.2012.01026.x',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-pimobendan-dcm-2002',
      citationText:
        'Luis Fuentes V, et al. Double-blind randomized placebo-controlled study of pimobendan in dogs with DCM. JVIM. 2002;16:255–261.',
      sourceType: 'Ensaio randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12041654/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-diet-dcm-review',
      citationText:
        'Freeman LM, et al. Review of canine dilated cardiomyopathy in the wake of diet-associated concerns. J Anim Sci. 2020;98:skaa209.',
      sourceType: 'Revisão científica',
      url: 'https://doi.org/10.1093/jas/skaa209',
      notes: 'Relação dieta–CMD é multifatorial; não autoriza inferência causal por um ingrediente isolado.',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-taurine-cocker-2021',
      citationText:
        'Freeman LM, et al. Low plasma taurine levels in English Cocker Spaniels diagnosed with DCM. J Small Anim Pract. 2021.',
      sourceType: 'Série clínica',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33594697/',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
