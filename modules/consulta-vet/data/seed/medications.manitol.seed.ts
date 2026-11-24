import { MedicationRecord } from '../../types/medication';

export const manitolMedicationRecord: MedicationRecord = {
  id: 'manitol',
  slug: 'manitol',
  title: 'Manitol (D-manitol)',
  activeIngredient: 'Manitol (D-manitol)',
  tradeNames: [
    'Manitol 20% 250 mL / 500 mL Solução Injetável IV (Halex Istar, Fresenius Kabi, B. Braun, Equiplex, JP)',
    'Manitol 20% 100 mL (Minibolsa / Uso Hospitalar em Pequeno Porte)',
  ],
  pharmacologicClass:
    'Diurético osmótico; agente hiperosmolar sistêmico (poliálcool / hexitol redutor de pressão intracraniana e intraocular)',
  category: 'emergencia-intensivismo',
  species: ['dog', 'cat'],
  routes: [
    'Via Intravenosa (IV — bolus controlado em 15–20 min ou infusão lenta em acesso venoso exclusivo com filtro de 5 µm)',
    'Via Intraóssea (IO — alternativa emergencial excepcional quando o acesso venoso é impossível)',
  ],
  isControlled: false,
  plainLanguageSummary:
    'Agente hiperosmolar padrão de emergência para redução aguda da pressão intracraniana (PIC), preparo pré-durotomia e glaucoma agudo refratário. Na lesão renal aguda oligúrica/anúrica, diurese osmótica não equivale à recuperação da função renal, e o Consenso IRIS (2024) contraindica doses repetidas em anúria persistente. Soluções a 20% (~1.098 mOsm/L) cristalizam em baixas temperaturas, devendo ser completamente redissolvidas, resfriadas à temperatura corporal e infundidas através de filtro de linha de 5 µm em acesso venoso seguro.',
  tags: [
    'manitol',
    'D-manitol',
    'diurético osmótico',
    'agente hiperosmolar',
    'hipertensão intracraniana',
    'edema cerebral',
    'trauma cranioencefálico',
    'craniotomia',
    'glaucoma agudo',
    'pressão intraocular',
    'luxação anterior de lente',
    'lesão renal aguda',
    'síndrome do desequilíbrio dialítico',
    'hemodiálise',
    'gap osmolar',
    'cristalização',
    'filtro 5 µm',
    'emergência neurológica',
    'emergência oftálmica',
  ],
  relatedDiseaseSlugs: [
    'neoplasias-intracranianas-caes',
    'lesao-renal-aguda-canina',
    'lesao-renal-aguda-felina',
    'intermacao-caes-gatos',
    'doenca-renal-cronica-canina',
    'doenca-renal-cronica-felina',
    'cetoacidose-diabetica-caes-gatos',
  ],
  mechanismOfAction:
    'Poliálcool (hexitol C₆H₁₄O₆) osmoticamente ativo sem atuação em receptores específicos, com mecanismo bifásico: (1) efeito reológico imediato em minutos (expansão plasmática, queda do hematócrito e da viscosidade sanguínea, melhora do aporte de O₂ cerebral e vasoconstrição arteriolar autorregulatória reflexa que reduz o volume sanguíneo intracraniano e a PIC preservando a pressão de perfusão cerebral); (2) efeito hiperosmolar pleno em 15–30 min (gradiente intravascular extraindo água livre do encéfalo com BHE íntegra e dos humores vítreo/aquoso — seguindo PIO = K(OP_aquoso − OP_plasma) + PC — além de reduzir a taxa de produção de líquor); e (3) diurese osmótica glomerular por filtração livre sem reabsorção tubular, aumentando a excreção renal de água, Na⁺, K⁺, Cl⁻, Ca²⁺, Mg²⁺ e fosfato (com efeito scavenger experimental secundário de radicais hidroxila).',
  indications: [
    'Hipertensão intracraniana (HIC) aguda, edema cerebral vasogênico ou citotóxico e herniação cerebral iminente (trauma cranioencefálico, neoplasias intracranianas, estado de mal epiléptico refratário, infarto isquêmico ou edema pós-correção de shunt portossistêmico).',
    'Redução transoperatória do volume encefálico antes da abertura da dura-máter em craniotomia ou craniectomia eletiva/emergencial.',
    'Glaucoma agudo congestivo de emergência e preparo pré-operatório na luxação anterior do cristalino (especialmente quando análogos de prostaglandina como o latanoprost são contraindicados).',
    'Profilaxia ou tratamento da síndrome do desequilíbrio dialítico (SDD) durante ou após sessões de hemodiálise em pacientes gravemente urêmicos.',
    'Protocolos históricos selecionados e hoje restritos: tentativa única pós-reidratação em lesão renal aguda oligúrica incipiente (desaconselhada repetição em anúria pelo Consenso IRIS 2024), rabdomiólise/mioglobinúria em intermação após ressuscitação volêmica e tentativa histórica de expulsão ureteral felina (baixa eficácia e risco de sobrecarga).',
  ],
  contraindications: [
    'Desidratação grave não corrigida, hipovolemia ou choque circulatório (a diurese osmótica subsequente agrava o colapso hemodinâmico e a hipoperfusão renal/cerebral).',
    'Anúria estabelecida refratária à ressuscitação volêmica ou obstrução urinária mecânica completa não desobstruída (o manitol não excretado permanece retido no espaço intravascular, causando sobrecarga de volume, hiponatremia dilucional severa e edema pulmonar).',
    'Edema pulmonar cardiogênico ou não cardiogênico, insuficiência cardíaca congestiva ativa ou hipervolemia manifesta.',
    'Hemorragia intracraniana ativa não controlada sem indicação cirúrgica imediata (pode expandir hematoma pelo gradiente osmótico ou aumento transitório do fluxo sanguíneo encefálico; usar com critério clínico neuroemergencial).',
    'Estados hiperosmolares pré-existentes graves (osmolaridade plasmática medida > 320 mOsm/kg, gap osmolar elevado por intoxicação por etilenoglicol ou cetoacidose diabética hiperosmolar severa).',
  ],
  cautions: [
    'NUNCA administrar soluções com cristais visíveis sem redissolução térmica completa (aquecimento controlado até dissolução completa, resfriando obrigatoriamente à temperatura corporal antes da infusão) e SEMPRE utilizar filtro de linha de 5 µm.',
    'Risco de necrose tecidual grave em extravasamento (comporta-se como vesicante devido à hiperosmolaridade extrema ~1.100 mOsm/L); conferir permeabilidade rigorosa do cateter IV antes e durante a infusão.',
    'Não confundir hiponatremia pós-manitol com erro analítico isolado nem corrigir apressadamente: trata-se de hiponatremia translocacional verdadeira por desvio osmótico de água intracelular para o plasma; monitorar Na⁺, K⁺, glicose e osmolaridade sérica por depressão do ponto de congelamento.',
    'Doses cumulativas elevadas (> 2–4 g/kg/dia) ou repetidas cegamente aumentam o risco de lesão tubular renal (nefrose osmótica), disrupção progressiva da barreira hematoencefálica e edema cerebral rebote.',
    'Evitar co-administração rotineira com furosemida no traumatismo cranioencefálico: evidências neurocríticas mostram ausência de benefício adicional na redução do edema e agravamento da hipovolemia e hipotensão arterial.',
    'Em gatos com hipertireoidismo, cardiopatia oculta ou DRC prévia, a expansão plasmática aguda (~15–30% após bolus) pode precipitar edema pulmonar agudo; monitorar frequência respiratória, ausculta pulmonar e débito urinário continuamente.',
    'Interferências analíticas importantes: eleva artificialmente a densidade urinária (refractometria), pode gerar falso-positivo em testes para etilenoglicol, interfere na dosagem sérica de fósforo inorgânico e aumenta o gap osmolar plasmático.',
    'O manitol possui penetração mínima no edema intramiélinico (como na intoxicação por brometalina), com baixa eficácia clínica nessa condição.',
  ],
  adverseEffects: [
    'Expansão intravascular transitória aguda com risco de sobrecarga volêmica, congestão pulmonar e descompensação de insuficiência cardíaca congestiva (especialmente se oligúria/anúria estiver presente).',
    'Desidratação sistêmica, hipovolemia secundária, hipotensão após diurese intensa e depleção de eletrólitos (potássio, sódio, cloreto, cálcio e magnésio).',
    'Hiponatremia translocacional hiperosmolar aguda (desvio de água intracelular para o intravascular), seguida tardiamente por risco de hipernatremia se perdas de água livre excederem a reposição.',
    'Hipotensão arterial transitória se infundido rápido demais (bolus em < 5–10 min por vasodilatação periférica aguda mediada por hiperosmolaridade).',
    'Cefaleia/desconforto neurológico transitório, tremores, êmese ou edema cerebral rebote quando doses repetidas extravasam por barreira hematoencefálica lesada.',
    'Nefrose osmótica (vacuolização de túbulos proximais e queda secundária da TFG) associada a doses altas cumulativas (> 2–4 g/kg/dia) ou retenção em disfunção renal.',
    'Flebite, dor no local da venopunção e edema/necrose cutânea grave em caso de extravasamento perivascular.',
  ],
  interactions: [
    'Furosemida e outros diuréticos de alça ou tiazídicos: somação da espoliação hídrica e eletrolítica (K⁺, Na⁺, Mg²⁺, Ca²⁺); evitar associação rotineira no TCE por agravar hipovolemia sem benefício antiedema adicional.',
    'Salina hipertônica (NaCl 3% ou 7,2–7,5%): somação de hiperosmolaridade plasmática (> 320 mOsm/kg) se alternados sem monitorização; no TCE com choque circulatório, priorizar ressuscitação ou salina hipertônica.',
    'Fármacos nefrotóxicos (aminoglicosídeos, ciclosporina, AINEs, anfotericina B, cisplatina): risco aditivo de injúria tubular renal caso ocorra desidratação secundária ou nefrose osmótica.',
    'Glicosídeos cardíacos (digoxina): a hipocalemia induzida pela diurese osmótica predispõe à intoxicação digitálica e arritmias ventriculares.',
    'Lítio: o aumento do fluxo tubular renal acelera a depuração urinária do lítio.',
    'Hemocomponentes (sangue total/concentrado de hemácias) e eletrólitos concentrados na mesma linha IV: INCOMPATIBILIDADE FÍSICO-QUÍMICA — risco de aglutinação/hemólise eritrocitária e precipitação de cristais; exigir via venosa exclusiva.',
  ],
  administration: [
    'Inspecionar obrigatoriamente o frasco ou bolsa contra luz forte antes da infusão à procura de cristais; se presentes, aquecer em banho-maria controlado até dissolução completa, resfriar à temperatura corporal (~37 °C) e infundir obrigatoriamente através de filtro de linha de 5 µm.',
    'Programar infusão intravenosa controlada em 15 a 20 minutos (evitar bolus ultrarrápido < 5 min, que pode desencadear vasodilatação transitória e queda paradoxal da pressão arterial média).',
    'Conferir permeabilidade do cateter IV antes e durante toda a administração (comporta-se como vesicante se extravasar) e manter acesso venoso exclusivo durante a infusão (nunca dividir equipo com sangue ou KCl concentrado).',
    'Confirmar euvolemia ou restaurar pressão arterial média antes ou concomitantemente com cristaloides isotônicos balanceados em pacientes traumatizados/desidratados.',
  ],
  quickSummaryHighlights: [
    'Solução hospitalar a 20% = 200 mg/mL (0,2 g/mL) e ~1.098–1.100 mOsm/L (fortemente hipertônica: 0,5 g/kg = 2,5 mL/kg; 1 g/kg = 5 mL/kg).',
    'Redução bifásica da PIC: queda imediata em minutos por efeito reológico (menor viscosidade sanguínea e vasoconstrição autorregulatória) seguida por gradiente osmótico pleno em 15–30 min.',
    'Escolha preferencial sobre latanoprost no glaucoma agudo quando edema corneano impede excluir luxação anterior do cristalino.',
    'Nunca repetir doses em LRA anúrica (Consenso IRIS 2024): gerar fluxo urinário não recupera TFG e provoca sobrecarga volêmica fatal, edema pulmonar e nefrose osmótica.',
    'Filtro de linha de 5 µm obrigatório; redissolver cristais por aquecimento e resfriar antes de infundir; jamais administrar em linha com hemocomponentes.',
  ],
  pillars: [
    {
      title: 'Ação Bifásica na PIC',
      icon: 'brain',
      desc: 'Queda rápida da PIC em minutos pela redução da viscosidade sanguínea e vasoconstrição reflexa preservando perfusão, consolidada pelo gradiente osmótico em 15–30 min e menor produção de líquor.',
    },
    {
      title: 'Emergência no Glaucoma',
      icon: 'eye',
      desc: 'Drena fluido vítreo e aquoso segundo o gradiente osmótico ocular, reduzindo rapidamente a PIO sem causar miose — decisivo quando não se pode excluir luxação anterior do cristalino.',
    },
    {
      title: 'Regra Crítica na Anúria (IRIS)',
      icon: 'shield-alert',
      desc: 'Exige TFG ativa para ser eliminado. Em anúria persistente ou obstrução mecânica, permanece preso no intravascular e desencadeia edema pulmonar agudo e nefrose osmótica.',
    },
    {
      title: 'Cuidado Físico & Filtro 5 µm',
      icon: 'droplet',
      desc: 'Soluções ≥15% cristalizam facilmente no frio. Redissolver completamente com calor, resfriar à temperatura corporal, usar filtro de 5 µm e garantir cateter patente contra necrose por extravasamento.',
    },
  ],
  clinicalWarningItems: [
    {
      label: 'NUNCA REPETIR EM PACIENTE ANÚRICO (IRIS 2024)',
      text: 'Diurese osmótica não significa recuperação da filtração glomerular. Na anúria refratária à ressuscitação volêmica, doses repetidas retêm manitol no plasma e induzem sobrecarga volêmica fatal, hiponatremia severa e edema pulmonar.',
    },
    {
      label: 'SOLUÇÃO A 20% É FORTEMENTE HIPERTÔNICA (~1.098 mOsm/L)',
      text: 'Desconsidere erros tipográficos ocasionais em bulas hospitalares brasileiras que descrevem a solução como “hipotônica”. Trata-se de solução hiperosmolar intensa: comporta-se como vesicante se extravasar e provoca hemólise/aglutinação em contato direto com sangue.',
    },
    {
      label: 'CRISTALIZAÇÃO E FILTRO DE 5 µm OBRIGATÓRIOS',
      text: 'Nunca infundir se houver cristais visíveis ou turvação. Aquecer até completa dissolução, resfriar até ~37 °C e infundir obrigatoriamente com filtro de linha de 5 µm.',
    },
    {
      label: 'TCE + CHOQUE E ASSOCIAÇÃO COM FUROSEMIDA',
      text: 'Não utilizar manitol como expansor em TCE hipotenso sem estabilizar a volemia (preferir salina hipertônica ou ressuscitação prévia) e evitar co-administração rotineira com furosemida no traumatismo cranioencefálico.',
    },
  ],
  presentations: [
    {
      id: 'pres-manitol-20',
      label: 'Manitol 20% — Solução injetável IV (frasco/bolsa 250 mL ou 500 mL)',
      name: 'Manitol 20% — Solução injetável IV (frasco/bolsa 250 mL ou 500 mL)',
      brand: 'Halex Istar / Fresenius Kabi / B. Braun / Equiplex / JP (Hospitalar)',
      form: 'Solução injetável intravenosa hiperosmolar em sistema fechado',
      presentation: 'Frascos ou bolsas plásticas de 250 mL (50 g) e 500 mL (100 g) a 200 mg/mL',
      concentrationValue: 200,
      concentrationUnit: 'mg/mL',
      route: 'Via Intravenosa (IV) / Intraóssea (IO)',
      packInfo:
        'Padrão hospitalar no Brasil: 20% = 200 mg/mL = 0,2 g/mL (~1.098–1.100 mOsm/L). Conversão direta: 0,5 g/kg = 2,5 mL/kg e 1 g/kg = 5 mL/kg. Exige inspeção contra cristais e uso obrigatório de filtro de linha de 5 µm.',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-manitol-20-100',
      label: 'Manitol 20% — Minibolsa / Frasco 100 mL (pequeno volume)',
      name: 'Manitol 20% — Minibolsa / Frasco 100 mL (pequeno volume)',
      brand: 'Apresentação hospitalar de pequeno porte (100 mL)',
      form: 'Solução injetável intravenosa hiperosmolar',
      presentation: 'Frasco ou minibolsa de 100 mL contendo 20 g de D-manitol (200 mg/mL)',
      concentrationValue: 200,
      concentrationUnit: 'mg/mL',
      route: 'Via Intravenosa (IV) / Intraóssea (IO)',
      packInfo:
        'Mesma concentração padrão de 200 mg/mL (0,2 g/mL), ideal para gatos e cães pequenos reduzindo desperdício e risco de contaminação por múltiplas punções.',
      channel: 'human_pharmacy',
    },
    {
      id: 'pres-manitol-25',
      label: 'Manitol 25% — Solução concentrada (referência internacional de formulários)',
      name: 'Manitol 25% — Solução concentrada (referência internacional de formulários)',
      brand: 'Referência internacional (incomum no Brasil)',
      form: 'Solução injetável IV hiperconcentrada',
      presentation: 'Frasco-ampola de 50 mL contendo 12,5 g de D-manitol (250 mg/mL)',
      concentrationValue: 250,
      concentrationUnit: 'mg/mL',
      route: 'Via Intravenosa (IV)',
      packInfo:
        'Concentração (~1.250 nominal a 1.375 mOsm/L teórico) frequentemente citada em literatura norte-americana; apresenta cristalização ainda mais acentuada abaixo de 20 °C e exige filtro de 5 µm.',
      channel: 'human_pharmacy',
    },
  ],
  doses: [
    {
      id: 'dose-manitol-hic-emergencia',
      species: 'both',
      indication:
        'Hipertensão intracraniana aguda, edema cerebral agudo ou herniação cerebral iminente (TCE, neoplasia, estado epiléptico)',
      doseMin: 0.5,
      doseMax: 1,
      doseUnit: 'g',
      perWeightUnit: 'kg',
      route: 'IV',
      frequency:
        '— bolus lento em 15–20 min (eventuais repetições pontuais q4–8h somente se normovolêmico e Posm < 320 mOsm/kg)',
      duration: 'Doses pontuais de resgate (geralmente máximo de 2–3 doses em 24 h)',
      clinicalContext:
        'Emergência neurocrítica (TCE, edema peritumoral, estado de mal epiléptico ou herniação). Se houver choque circulatório, estabilizar a volemia ou priorizar salina hipertônica antes do manitol.',
      evidenceLevel: 'Consenso neurocrítico e formulários veterinários (padrão de emergência)',
      monitoring:
        'Pressão arterial média, exame neurológico/escala de coma de Glasgow modificada, Na⁺/K⁺, osmolaridade sérica (<320 mOsm/kg) e débito urinário.',
      notes:
        'Equivale a 2,5–5 mL/kg da solução a 20% (200 mg/mL). Infundir em 15–20 minutos com filtro de 5 µm para obter pico osmótico sem provocar vasodilatação hipotensora por bolus ultrarrápido. Pacientes com choque ou hipovolemia devem receber salina hipertônica ou ressuscitação volêmica prévia; manter reposição com cristaloides isotônicos para preservar pressão arterial média e pressão de perfusão cerebral.',
      calculatorEnabled: true,
      presentationId: 'pres-manitol-20',
    },
    {
      id: 'dose-manitol-hic-neurocirurgia-cranio',
      species: 'both',
      indication: 'Redução transoperatória do volume encefálico em craniotomia / craniectomia',
      doseMin: 0.25,
      doseMax: 1,
      doseUnit: 'g',
      perWeightUnit: 'kg',
      route: 'IV',
      frequency: '— infusão lenta em 15–30 min antes da durotomia (1,25–5 mL/kg a 20%)',
      duration: 'Dose única pré-abertura dural',
      clinicalContext:
        'Preparo neurocirúrgico eletivo ou emergencial para reduzir o volume parenquimatoso cerebral e a taxa de produção liquórica antes da abertura da dura-máter.',
      evidenceLevel: 'Neurocirurgia e anestesiologia veterinária',
      monitoring:
        'Pressão arterial invasiva/não invasiva, capnografia, pressão venosa central/perfusão, eletrólitos e débito urinário transoperatório.',
      notes:
        'Administrar antes da abertura dural para reduzir volume parenquimatoso e produção de líquor sob monitorização anestésica contínua e reposição hidroeletrolítica isotônica.',
      calculatorEnabled: true,
      presentationId: 'pres-manitol-20',
    },
    {
      id: 'dose-manitol-glaucoma-agudo',
      species: 'both',
      indication:
        'Glaucoma agudo congestivo de emergência / preparo pré-operatório na luxação anterior do cristalino',
      doseMin: 0.5,
      doseMax: 1,
      doseUnit: 'g',
      perWeightUnit: 'kg',
      route: 'IV',
      frequency:
        '— dose única lenta em 15–30 min (2,5–5 mL/kg a 20%)',
      duration: 'Dose única de resgate (efeito ocular por 3–8 h até terapia tópica ou cirurgia)',
      clinicalContext:
        'Emergência oftálmica; opção segura ao latanoprost quando edema corneano intenso impede excluir luxação anterior do cristalino, ajudando também a retrair o vítreo no pré-operatório.',
      evidenceLevel: 'Oftalmologia de emergência e formulários veterinários',
      monitoring:
        'Tonometria seriada, exame em lâmpada de fenda após clareamento corneano, ausculta pulmonar e débito urinário.',
      notes:
        'Equivale a 2,5–5 mL/kg da solução a 20%. Escolha preferencial sobre o latanoprost quando edema corneano impede descartar luxação anterior de lente (onde miose agrava o bloqueio pupilar); também reduz o volume vítreo auxiliando o reposicionamento cirúrgico da lente. Embora formulários clássicos mencionem restrição hídrica por 1–4 h pós-infusão no glaucoma, manuais de emergência contraindicam privação automática de água ou doses repetidas em animais desidratados, azotêmicos ou cardiopatas.',
      calculatorEnabled: true,
      presentationId: 'pres-manitol-20',
    },
    {
      id: 'dose-manitol-glaucoma-teto-oftalmo',
      species: 'both',
      indication:
        'Glaucoma agudo refratário — teto máximo histórico descrito (uso estritamente monitorizado)',
      doseMin: 1,
      doseMax: 2,
      doseUnit: 'g',
      perWeightUnit: 'kg',
      route: 'IV',
      frequency:
        '— dose única lenta em 20–30 min (5–10 mL/kg a 20%), restrita a paciente normovolêmico e sem cardiopatia ou nefropatia',
      duration: 'Dose única excepcional com vigilância hemodinâmica e pulmonar contínua',
      clinicalContext:
        'Faixa máxima histórica citada em oftalmologia quando 0,5–1 g/kg não controla a PIO; impõe alta carga volêmica aguda e elevado risco de edema pulmonar ou hipovolemia pós-diurética.',
      evidenceLevel: 'Protocolo oftálmico de teto superior (cautela hemodinâmica)',
      monitoring:
        'Ausculta pulmonar contínua, frequência respiratória, pressão arterial, eletrólitos (Na⁺/K⁺), tonometria e débito urinário.',
      notes:
        'Algumas referências oftálmicas citam até 1,5–2 g/kg IV (7,5–10 mL/kg da solução a 20%) em glaucoma refratário; entretanto, esse teto impõe carga volêmica aguda substancial (~10 mL/kg de fluido hipertônico) e alto risco de edema pulmonar ou diurese hipovolêmica subsequente. Calculadora desabilitada por segurança para exigir decisão clínica deliberada.',
      calculatorEnabled: false,
      presentationId: 'pres-manitol-20',
    },
    {
      id: 'dose-manitol-dds-hemodialise',
      species: 'both',
      indication:
        'Profilaxia ou resgate da síndrome do desequilíbrio dialítico (SDD) em hemodiálise',
      doseMin: 0.5,
      doseMax: 1,
      doseUnit: 'g',
      perWeightUnit: 'kg',
      route: 'IV',
      frequency:
        '— infusão lenta em 15–20 min ou fracionada ao longo da sessão dialítica (2,5–5 mL/kg a 20%)',
      duration: 'Administração pontual intradialítica nas sessões iniciais de pacientes gravemente urêmicos',
      clinicalContext:
        'Nefrologia intervencionista: previne ou atenua o edema cerebral osmótico secundário à remoção rápida de ureia plasmática durante hemodiálise em cães e gatos com azotemia severa.',
      evidenceLevel: 'Nefrologia intervencionista e terapia dialítica veterinária',
      monitoring:
        'Status neurológico durante e após a sessão, osmolaridade plasmática, sódio sérico, pressão arterial e balanço ultrafiltrado.',
      notes:
        'Previne ou trata edema cerebral osmótico secundário à remoção rápida de ureia plasmática durante sessões iniciais de hemodiálise em cães e gatos gravemente azotêmicos.',
      calculatorEnabled: true,
      presentationId: 'pres-manitol-20',
    },
    {
      id: 'dose-manitol-lra-prova-historica',
      species: 'both',
      indication:
        'Lesão renal aguda oligúrica incipiente — prova diurética histórica (NÃO recomendado repetir pelo Consenso IRIS 2024)',
      doseMin: 0.25,
      doseMax: 0.5,
      doseUnit: 'g',
      perWeightUnit: 'kg',
      route: 'IV',
      frequency:
        '— administração teste histórica em 15–30 min após reposição volêmica (1,25–2,5 mL/kg a 20%, proscrita na anúria)',
      duration: 'Dose teste única histórica (suspender imediatamente se não houver resposta diurética)',
      clinicalContext:
        'Uso restrito e desaconselhado em anúria persistente pelo Consenso IRIS LRA (2024): induzir diurese não recupera a filtração glomerular e promove sobrecarga volêmica fatal e nefrose osmótica.',
      evidenceLevel: 'Consenso IRIS LRA (2024) — uso restrito / desaconselhado na anúria',
      monitoring:
        'Ultrassonografia prévia (excluir obstrução urinária), débito urinário em sistema fechado, peso corporal, ausculta pulmonar e Na⁺/K⁺.',
      notes:
        'O Consenso IRIS (2024) enfatiza que gerar débito urinário não equivale a restaurar a TFG e contraindica administrações repetidas em pacientes anúricos pelo risco elevado de hipervolemia, edema pulmonar, hiponatremia severa e nefrose osmótica. Antes de qualquer diurético osmótico em paciente renal, excluir obstrução mecânica do trato urinário (o índice de resistividade renal aumenta após manitol na obstrução ureteral completa) e confirmar euvolemia clínica.',
      calculatorEnabled: false,
      presentationId: 'pres-manitol-20',
    },
    {
      id: 'dose-manitol-diurese-infusao-historica',
      species: 'both',
      indication:
        'Manutenção de diurese osmótica / protocolo histórico de tentativa de expulsão ureteral (uso restrito e controverso)',
      doseMin: 60,
      doseMax: 120,
      doseUnit: 'mg',
      perWeightUnit: 'kg/h',
      route: 'IV CRI',
      frequency:
        '— infusão contínua por até 24 h (0,3–0,6 mL/kg/h da solução a 20%) sob monitorização intensiva',
      duration: 'Até 24 h em ambiente de UTI (não exceder teto conservador de 2 g/kg/dia)',
      clinicalContext:
        'Protocolo histórico de baixa eficácia (~13% de sucesso em cálculos ureterais felinos) e alto risco de sobrecarga hídrica; não substitui descompressão ureteral quando indicada.',
      evidenceLevel: 'Protocolo histórico de baixa taxa de sucesso (~13% em obstrução ureteral)',
      monitoring:
        'Balanço hídrico rigoroso, peso corporal q4–6h, ausculta pulmonar, Na⁺/K⁺, osmolaridade sérica e reavaliação ultrassonográfica renal/ureteral.',
      notes:
        'Em estudos retrospectivos e protocolos históricos após bolus inicial de 0,25–1 g/kg em 15–30 min, utilizou-se infusão contínua de 60 mg/kg/h (até 1–2 mg/kg/min = 60–120 mg/kg/h). Apresentou baixa eficácia para expulsão de cálculos ureterais felinos (~13% de sucesso), não deve exceder teto diário conservador de 2 g/kg/dia e é contraindicada em anúria, obstrução ureteral completa não descomprimida ou cardiopatia.',
      calculatorEnabled: false,
      presentationId: 'pres-manitol-20',
    },
  ],
  detailedIndications: [
    {
      id: 'ind-manitol-hic-tce',
      indication:
        'Hipertensão intracraniana aguda, edema cerebral e herniação encefálica iminente',
      clinicalContext:
        'Traumatismo cranioencefálico (TCE), edema peritumoral em crise aguda, estado de mal epiléptico refratário, infarto isquêmico ou encefalopatia após correção de shunt portossistêmico em cães e gatos.',
      species: 'both',
      dose: '0,5–1 g/kg (2,5–5 mL/kg da solução a 20%)',
      route: 'IV lenta com filtro de 5 µm',
      frequency: 'Bolus controlado em 15–20 min; repetir q4–8h somente se necessário, normovolêmico e com osmolaridade <320 mOsm/kg',
      duration: 'Uso agudo pontual (geralmente máximo de 2–3 doses em 24 h)',
      mechanismOfAction:
        'Reduz a PIC em poucos minutos por efeito reológico imediato (queda da viscosidade sanguínea e vasoconstrição arteriolar autorregulatória diminuindo o volume sanguíneo cerebral), seguido em 15–30 min pelo gradiente osmótico que drena água do parênquima cerebral (BHE íntegra) e reduz a produção de líquor.',
      clinicalRationale:
        'Embora eficaz para salvar o tronco encefálico da herniação iminente, a diurese osmótica subsequente pode induzir hipovolemia e derrubar a pressão de perfusão cerebral (PPC = PAM − PIC). Em pacientes traumatizados com choque circulatório, estabilizar a volemia com cristaloides ou salina hipertônica antes/no lugar do manitol; não associar furosemida rotineiramente no TCE.',
      monitoring:
        'Pressão arterial média, avaliação neurológica seriada, Na⁺/K⁺, osmolaridade sérica (ponto de congelamento) e débito urinário com reposição volêmica proporcional.',
      highlights: [
        'Queda inicial da PIC em minutos (efeito reológico)',
        'Filtro de 5 µm + infusão em 15–20 min',
        'Evitar associação rotineira à furosemida no TCE',
      ],
      referenceIds: [
        'ref-manitol-aaha-2024',
        'ref-manitol-pigott-2021',
        'ref-manitol-dewey-neuro',
        'ref-manitol-delahunta',
      ],
      evidenceLevel: 'Forte para emergência neurocrítica e redução aguda da PIC',
    },
    {
      id: 'ind-manitol-glaucoma-lente',
      indication: 'Glaucoma agudo refratário e preparo pré-operatório na luxação anterior de lente',
      clinicalContext:
        'Emergência oftálmica com elevação aguda severa da PIO ameaçando o nervo óptico e a retina, sobretudo quando o edema corneano impede visualizar a posição do cristalino.',
      species: 'both',
      dose: '0,5–1 g/kg (2,5–5 mL/kg da solução a 20%; teto histórico citado até 1,5–2 g/kg)',
      route: 'IV lenta em 15–30 min com filtro de 5 µm',
      frequency: 'Dose única de resgate emergencial',
      duration: 'Efeito ocular de ~3 a 8 horas (ponte até terapia tópica ou cirurgia)',
      mechanismOfAction:
        'Segue a equação PIO = K(OP_aquoso − OP_plasma) + PC: ao elevar rapidamente a pressão osmótica plasmática, extrai água livre dos humores vítreo e aquoso, reduzindo agudamente o volume vítreo e a PIO.',
      clinicalRationale:
        'Diferentemente do latanoprost (que provoca miose intensa e é contraindicado se houver suspeita de luxação anterior do cristalino por risco de bloqueio pupilar), o manitol reduz a PIO de forma segura e ainda retrai o vítreo no pré-operatório. Avaliar cuidadosamente hidratação, cardiopatia e função renal antes da infusão; evitar privação hídrica cega em idosos desidratados.',
      monitoring:
        'Tonometria seriada, inspeção da câmara anterior após clareamento da córnea, ausculta pulmonar e hidratação.',
      highlights: [
        'Seguro quando não é possível excluir luxação anterior de lente',
        'Duração oftálmica de 3–8 horas',
        'Avaliar risco cardiovascular e renal antes de infundir',
      ],
      referenceIds: ['ref-manitol-lumb-jones', 'ref-manitol-bsava-10', 'ref-manitol-plumbs-10'],
      evidenceLevel: 'Estabelecida para redução emergencial de PIO em glaucoma refratário',
    },
    {
      id: 'ind-manitol-dds-lra',
      indication: 'Síndrome do desequilíbrio dialítico (SDD) vs. restrições na LRA anúrica (IRIS 2024)',
      clinicalContext:
        'Enquanto o manitol tem indicação consolidada na profilaxia/resgate da SDD durante hemodiálise em azotemia severa, seu uso para “forçar diurese” na LRA anúrica perdeu respaldo nos consensos modernos.',
      species: 'both',
      dose: '0,5–1 g/kg IV (SDD em hemodiálise) | Uso restrito/proscrito em doses repetidas na anúria',
      route: 'IV lenta com filtro de 5 µm',
      frequency: 'Conforme protocolo dialítico ou dose teste única histórica após euvolemia (sem repetir se anúrico)',
      duration: 'Intradialítico (SDD) ou uso contraindicado na ausência de resposta urinária',
      mechanismOfAction:
        'Na SDD, compensa a queda rápida da osmolaridade plasmática causada pela depuração intensa de ureia; na LRA anúrica, sem filtração glomerular para excretar o soluto, o manitol permanece retido nos vasos.',
      clinicalRationale:
        'O Consenso IRIS de LRA (2024) destaca que aumentar fluxo urinário não recupera a TFG e contraindica repetições em pacientes anúricos pelo risco de edema pulmonar agudo, hiponatremia translocacional hiperosmolar e nefrose osmótica. Excluir sempre obstrução ureteral por imagem antes de qualquer diurético (o índice de resistividade renal aumenta após manitol na obstrução completa).',
      monitoring:
        'Débito urinário, peso corporal, ausculta pulmonar, Na⁺/K⁺ e osmolaridade sérica medida.',
      highlights: [
        'Indicado na profilaxia/resgate de SDD durante hemodiálise',
        'NÃO repetir em LRA anúrica (IRIS 2024)',
        'Baixo sucesso (~13%) em expulsão ureteral felina por CRI',
      ],
      referenceIds: [
        'ref-manitol-iris-2024',
        'ref-manitol-dibartola',
        'ref-manitol-bsava-nephro',
        'ref-manitol-hoehne-2021',
      ],
      evidenceLevel: 'Consenso IRIS (2024) e nefrologia intervencionista',
    },
  ],
  clinicalStudiesCommented: [
    {
      title: 'Farmacocinética da disposição e depuração renal do manitol em cães e risco de acúmulo na disfunção renal',
      authorsYear: 'Cloyd JC et al. (1986)',
      journal: 'Journal of Pharmaceutical Sciences / Dados farmacocinéticos experimentais comparados',
      studyDesign: 'Estudo farmacocinético experimental',
      sampleSize: 'Modelo canino experimental com função renal preservada vs comprometida',
      methodology:
        'Quantificação das concentrações plasmáticas, volume de distribuição aparente, meia-vida de eliminação e recuperação urinária inalterada após administração intravenosa.',
      limitations: 'População experimental controlada sem comorbidades críticas múltiplas.',
      mainFindings:
        'Comprovou distribuição restrita ao espaço extracelular (Vd ~0,2–0,3 L/kg), ausência de metabolização significativa e eliminação primária por filtração glomerular (80–90% recuperados em 3 h quando TFG é normal; meia-vida ~60–100 min), com prolongamento dramático para horas/dias na redução acentuada da filtração glomerular.',
      clinicalTakeaway:
        'Fundamenta o intervalo q4–8h em pacientes com diurese ativa e explica por que a administração repetida em cães e gatos anúricos ou gravemente oligúricos leva inevitavelmente a acúmulo intravascular e edema pulmonar.',
      referenceId: 'ref-manitol-cloyd-1986',
    },
    {
      title: 'Terapia hiperosmolar no trauma cranioencefálico canino e felino: comparação entre manitol e salina hipertônica',
      authorsYear: 'Adamik KN et al. (2015) / Pigott A & Rudloff E (2021)',
      journal: 'Journal of Veterinary Emergency and Critical Care (JVECC) / Frontiers in Veterinary Science',
      studyDesign: 'Revisão clínica baseada em evidências e consenso terapêutico',
      sampleSize: 'Evidência comparada clínica e translacional em pequenos animais',
      methodology:
        'Avaliação dos mecanismos reológicos e osmóticos, impacto sobre pressão de perfusão cerebral (PPC), pressão arterial média e desfechos de edema cerebral em pacientes normovolêmicos vs hipovolêmicos.',
      limitations:
        'Escassez de ensaios clínicos randomizados prospectivos de grande porte comparando mortalidade direta entre os dois agentes em cães e gatos.',
      mainFindings:
        'Ambos os agentes reduzem eficientemente a PIC; o manitol inicia queda da PIC em minutos por redução da viscosidade sanguínea seguida de ação osmótica em 15–30 min, porém induz diurese osmótica subsequente que agrava hipovolemia e hipotensão. A associação rotineira com furosemida não traz benefício antiedema adicional e piora a depleção volêmica.',
      clinicalTakeaway:
        'Em cães e gatos com TCE e choque ou hipovolemia concomitante, priorizar ressuscitação volêmica e/ou salina hipertônica antes de recorrer ao manitol; evitar associação rotineira de furosemida com manitol.',
      referenceId: 'ref-manitol-pigott-2021',
    },
    {
      title: 'Consenso IRIS de manejo da lesão renal aguda (2024) e limitações da prova de diurese osmótica',
      authorsYear: 'Segev G, Cowgill LD et al. / IRIS AKI Consensus (2024)',
      journal: 'International Renal Interest Society (IRIS) Consensus & Journal of Veterinary Internal Medicine',
      studyDesign: 'Diretriz de consenso internacional veterinário',
      sampleSize: 'Painel internacional de especialistas em nefrologia veterinária',
      methodology:
        'Revisão sistemática de evidências sobre agentes diuréticos (furosemida e manitol) na prevenção e conversão da oligúria/anúria em cães e gatos com LRA.',
      limitations:
        'Protocolos pontuais de dose teste única pós-reidratação ainda persistem em relatos históricos, embora sem benefício comprovado em mortalidade.',
      mainFindings:
        'A indução farmacológica de fluxo urinário não acelera a recuperação estrutural nem melhora a sobrevida renal; o uso repetido de manitol em pacientes que permanecem oligúricos ou anúricos após correção volêmica promove expansão intravascular perigosa, edema pulmonar, hiponatremia severa e nefrose osmótica.',
      clinicalTakeaway:
        'Não utilizar manitol em doses repetidas para “forçar diurese” em paciente anúrico; a prioridade clínica absoluta é correção hemodinâmica cuidadosa, exclusão de obstrução pós-renal e encaminhamento precoce para terapia renal substitutiva quando indicada.',
      referenceId: 'ref-manitol-iris-2024',
    },
    {
      title: 'Baixa eficácia da diurese osmótica isolada na expulsão de cálculos ureterais e aumento do índice de resistividade renal na obstrução completa',
      authorsYear: 'Hoehne SN et al. (2021) / Ballocco I et al. (2019)',
      journal: 'Journal of Small Animal Practice / Veterinary Sciences & Veterinary Radiology',
      studyDesign: 'Estudo clínico retrospectivo e investigação ultrassonográfica renal',
      sampleSize: 'Coorte clínica felina com ureterolitíase e estudo Doppler renal sob desafio com manitol',
      methodology:
        'Avaliação da taxa de passagem espontânea ureteral com terapia médica (bolus + CRI 60 mg/kg/h de manitol por 24 h) em felinos e resposta hemodinâmica intrarrenal medida por Doppler (RRI) diante de obstrução completa.',
      limitations: 'Desenho retrospectivo na série clínica ureteral e necessidade de confirmação de gravidade caso a caso.',
      mainFindings:
        'A taxa de sucesso clínico na expulsão de urólitos ureterais com infusão de manitol foi baixa (~13%), com risco não desprezível de sobrecarga hídrica. Paralelamente, enquanto rins não obstruídos reduzem ou mantêm o índice de resistividade renal (RRI) após manitol, rins com obstrução ureteral completa sofrem elevação paradoxal do RRI.',
      clinicalTakeaway:
        'Desencoraja-se o uso rotineiro de CRI de manitol como substituta à descompressão cirúrgica/SUB em obstrução ureteral felina; nunca administrar diurético osmótico sem excluir obstrução urinária completa por ultrassonografia.',
      referenceId: 'ref-manitol-hoehne-2021',
    },
  ],
  pharmacokineticsData: {
    absorption: [
      '• **Via Intravenosa (IV)**: Biodisponibilidade de **100%** imediata; efeito reológico na redução da PIC inicia em poucos minutos e o gradiente osmótico pleno consolida-se em 15 a 30 minutos.',
      '• **Via Intraóssea (IO)**: Alternativa emergencial excepcional quando o acesso venoso é inviável, mantendo absorção sistêmica equivalente à via intravascular para manobras de resgate.',
      '• **Via Oral (VO)**: Baixíssima absorção gastrointestinal (~17–20%), atuando apenas como laxativo osmótico local sem qualquer efeito clínico na redução da PIC ou da PIO.',
    ].join('\n'),
    distribution:
      'Restrito ao líquido extracelular (Vd ~0,2–0,3 L/kg). Não penetra significativamente células nem atravessa a barreira hematoencefálica (BHE) íntegra, propriedade essencial para sustentar o gradiente osmótico. Em áreas com BHE rompida e após múltiplas doses repetidas, pode extravasar para o parênquima cerebral e precipitar edema rebote.',
    metabolism:
      'Metabolização sistêmica mínima (<10% no fígado para glicogênio caso haja retenção prolongada por falha renal). Molécula praticamente não ionizada no plasma em pH fisiológico 7,4.',
    elimination:
      'Excretado inalterado quase exclusivamente por filtração glomerular livre sem reabsorção nem secreção tubular expressivas (~80–90% recuperados na urina em 3 h quando a TFG é normal). Meia-vida plasmática de ~60–100 minutos no cão hígido, prolongando-se para > 6 a 36 horas na oligúria ou anúria.',
    cnsPenetration:
      'Mínima através de BHE íntegra (coeficiente de reflexão próximo de 0,9); em lesão cerebral grave com ruptura de BHE, o acúmulo intersticial pode inverter o gradiente osmótico após doses repetidas.',
    plasmaBinding: 'Desprezível / nula (molécula pequena altamente hidrofílica e livre no plasma).',
    halfLife: '≈ 60–100 minutos com função renal normal; > 6–36 horas na insuficiência renal oligúrica/anúrica.',
  },
  attentionData: {
    attentionSubtitle:
      'Solução hiperosmolar (~1.098 mOsm/L) com cristalização física no frio, risco de necrose tecidual por extravasamento e sobrecarga cardiopulmonar letal na anúria.',
    precautions: [
      {
        condition: 'Anúria estabelecida refratária à reposição volêmica ou obstrução urinária completa',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Sem filtração glomerular para excretar o manitol, o soluto altamente osmótico permanece confinado ao intravascular, puxando água do compartimento intracelular e provocando expansão volêmica sustentada.',
        clinicalAction:
          'Desaconselhada repetição conforme o Consenso IRIS (2024). Confirmar permeabilidade do trato urinário por imagem antes de administrar; em anúria persistente, priorizar hemodiálise / terapia renal substitutiva.',
      },
      {
        condition: 'Hipovolemia, desidratação grave ou choque circulatório (incluindo TCE com hipotensão)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Embora expanda brevemente o plasma logo após a infusão, a diurese osmótica intensa subsequente agrava a depleção volêmica, derruba a pressão arterial média e compromete a pressão de perfusão cerebral e renal.',
        clinicalAction:
          'Restaurar primeiramente a volemia com cristaloides isotônicos e/ou utilizar salina hipertônica no TCE acompanhado de choque.',
      },
      {
        condition: 'Edema pulmonar ativo ou insuficiência cardíaca congestiva descompensada',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O desvio agudo de água intracelular para o espaço intravascular expande bruscamente a pré-carga e eleva a pressão hidrostática capilar pulmonar.',
        clinicalAction:
          'Não utilizar; gatos com cardiomiopatia subclínica ou idosos com baixa reserva cardíaca requerem monitorização rigorosa de frequência respiratória e ausculta.',
      },
      {
        condition: 'Solução com cristais visíveis ou ausência de filtro de linha de 5 µm',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Concentrações a 20% supersaturam em temperatura inferior a ~20 °C (agravado em tubulações frias ou PVC), podendo embolizar microcristais na circulação pulmonar e encefálica.',
        clinicalAction:
          'Redissolver completamente com aquecimento controlado, resfriar obrigatoriamente à temperatura corporal (~37 °C) antes da infusão e instalar filtro de linha de 5 µm.',
      },
      {
        condition: 'Extravasamento perivascular (acesso venoso precário)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Devido à osmolaridade extrema (~1.098 mOsm/L), o extravasamento subcutâneo comporta-se como vesicante, desencadeando desidratação celular local, edema severo e necrose tecidual.',
        clinicalAction:
          'Garantir cateter IV bem posicionado e patente antes de iniciar a infusão de 15–20 min; interromper imediatamente diante de dor, endurecimento ou edema no ponto de punção.',
      },
      {
        condition: 'Administração concomitante de furosemida no traumatismo cranioencefálico',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Ao contrário de protocolos antigos, a associação rotineira não promove redução sinérgica do edema cerebral e agrava acentuadamente a hipovolemia e a hipotensão arterial sistêmica.',
        clinicalAction:
          'Evitar associação rotineira furosemida + manitol no TCE; repor perdas diuréticas com cristaloides isotônicos balanceados.',
      },
      {
        condition: 'Co-administração com sangue total / concentrado de hemácias ou KCl concentrado',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O contato direto com solução pura de manitol causa pseudoaglutinação/aglutinação e hemólise dos eritrócitos no equipo, enquanto sais concentrados aceleram cristalização do manitol.',
        clinicalAction:
          'Administrar sempre em via venosa exclusiva ou após lavagem rigorosa da linha IV com NaCl 0,9%.',
      },
      {
        condition: 'Estados hiperosmolares graves (intoxicação por etilenoglicol, CAD hiperosmolar ou Posm > 320 mOsm/kg)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Soma carga hiperosmolar ao plasma já concentrado, agrava o risco de edema pulmonar ou hipernatremia/desidratação neuronal e gera falso-positivo em testes colorimétricos para etilenoglicol.',
        clinicalAction:
          'Mensurar osmolaridade por depressão do ponto de congelamento e Na⁺ sérico; contraindicar manitol na intoxicação por etilenoglicol.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Sobrecarga volêmica aguda e edema pulmonar',
        frequency: 'common',
        mechanism:
          'Deslocamento rápido de água intracelular para o compartimento intravascular (~15–30% de aumento volêmico transitório), agravado se houver oligúria/anúria ou cardiopatia felina/canina subjacente.',
        clinicalManagement:
          'Suspender imediatamente novas doses, fornecer oxigenoterapia, posicionar em decúbito esternal e instituir suporte de terapia intensiva (diurético de alça apenas se houver função renal responsiva e conforme diagnóstico cardiovascular).',
      },
      {
        effect: 'Hiponatremia translocacional hiperosmolar e depleção de potássio/magnésio/cálcio',
        frequency: 'very_common',
        mechanism:
          'O soluto retido no intravascular puxa água livre das células diluindo o sódio sérico (com osmolaridade medida alta > 310 mOsm/kg e gap osmolar elevado), seguida de perda urinária maciça de água, Na⁺, K⁺, Cl⁻, Ca²⁺ e Mg²⁺.',
        clinicalManagement:
          'Não tentar corrigir bruscamente uma hiponatremia puramente translocacional; dosar eletrólitos seriados e osmolaridade sérica real, repondo potássio e volume isotônico após o pico diurético.',
      },
      {
        effect: 'Hipotensão arterial transitória durante infusão ultrarrápida',
        frequency: 'uncommon',
        mechanism:
          'Vasodilatação periférica mediada por hiperosmolaridade quando administrado em bolus rápido (< 5 min).',
        clinicalManagement:
          'Respeitar rigorosamente tempo de infusão de 15 a 20 minutos em bomba de infusão e monitorar pressão arterial média.',
      },
      {
        effect: 'Nefrose osmótica e edema cerebral rebote por doses repetidas',
        frequency: 'overdose',
        mechanism:
          'Doses cumulativas > 2–4 g/kg/dia causam vacuolização de células tubulares proximais e vasoconstrição renal; doses repetidas em áreas com BHE rompida invertem o gradiente osmótico.',
        clinicalManagement:
          'Limitar repetições (evitar > 2–3 doses/24 h sem osmometria < 320 mOsm/kg), hidratar com cristaloides isotônicos e monitorar creatinina, SDMA e débito urinário.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'TCE ou hipertensão intracraniana com volemia limítrofe (já reanimada)',
        recommendedAdjustment:
          'Iniciar pela extremidade inferior (0,5 g/kg IV em 15–20 min) associada à reposição isotônica ou considerar salina hipertônica como alternativa inicial.',
        physiologicalRationale:
          'Reduz a intensidade da diurese osmótica secundária e o risco de hipotensão de rebote preservando a pressão de perfusão cerebral.',
      },
      {
        clinicalCondition: 'Suspeita de cardiopatia subclínica (gatos idosos/hipertireoideos, cães com MMVD) ou DRC compensada',
        recommendedAdjustment:
          'Evitar teto de 1,5–2 g/kg; utilizar 0,25–0,5 g/kg lentamente em 20–30 min e não realizar privação hídrica automática prolongada.',
        physiologicalRationale:
          'Minimiza o pico agudo de pré-carga intravascular e previne desidratação renal iatrogênica após a diurese.',
      },
      {
        clinicalCondition: 'Osmolaridade sérica ≥ 320 mOsm/kg, gap osmolar elevado ou anúria',
        recommendedAdjustment:
          'Suspender novas administrações de manitol; não existem ajustes seguros de manutenção em anúria persistente.',
        physiologicalRationale:
          'Exposição adicional sem excreção renal resulta diretamente em acúmulo intravascular contínuo e edema pulmonar.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Furosemida (diuréticos de alça)',
        severity: 'major',
        clinicalEffect:
          'Depleção severa de volume intravascular, hipocalemia, hiponatremia e hipotensão sistêmica; não reduz adicionalmente o edema cerebral no TCE.',
        pharmacologicalMechanism:
          'Bloqueio sinérgico da reabsorção de água e eletrólitos na alça de Henle e túbulo proximal.',
      },
      {
        drugOrClass: 'Sangue total, concentrado de hemácias e soluções concentradas de eletrólitos (mesmo acesso IV)',
        severity: 'major',
        clinicalEffect:
          'Aglutinação eritrocitária, hemólise no equipo ou precipitação visível de cristais na linha venosa.',
        pharmacologicalMechanism:
          'Incompatibilidade físico-química direta por força iônica e hiperosmolaridade extrema.',
      },
      {
        drugOrClass: 'Salina hipertônica (NaCl 3% ou 7,2–7,5%)',
        severity: 'moderate',
        clinicalEffect:
          'Risco aditivo de hiperosmolaridade (> 320 mOsm/kg), hipernatremia e alterações reológicas se administrados sequencialmente sem intervalo/dosagem sérica.',
        pharmacologicalMechanism:
          'Somação de solutos osmoticamente ativos no compartimento extracelular.',
      },
      {
        drugOrClass: 'Nefrotóxicos (aminoglicosídeos, anfotericina B, cisplatina, AINEs)',
        severity: 'moderate',
        clinicalEffect:
          'Potencialização de injúria renal aguda se o paciente evoluir com hipovolemia pós-diurética.',
        pharmacologicalMechanism:
          'Hipoperfusão renal associada à vacuolização tubular osmótica e toxicidade celular direta.',
      },
      {
        drugOrClass: 'Digoxina e lítio',
        severity: 'moderate',
        clinicalEffect:
          'Aumento do risco de toxicidade digitálica (por hipocalemia) e redução dos níveis séricos de lítio (por depuração aumentada).',
        pharmacologicalMechanism:
          'Espoliação urinária de potássio e aumento do clearance osmótico tubular.',
      },
    ],
  },
  generalInfoData: {
    routesDetailed: [
      {
        route: 'Via Intravenosa (IV — via padrão exclusiva)',
        technique:
          'Inspecionar contra a luz (se houver cristais, aquecer até dissolução completa e resfriar até ~37 °C). Instalar filtro de linha de 5 µm em cateter IV patente e exclusivo, infundindo ao longo de 15 a 20 minutos.',
        nursingCare:
          'Monitorar continuamente o local da venopunção contra dor, edema ou infiltração (vesicante). Acompanhar pressão arterial, ausculta pulmonar, débito urinário e Na⁺/K⁺ séricos.',
        limitations:
          'Nunca infundir sem filtro de 5 µm se houver risco de microcristais; incompatível na mesma linha com sangue total e concentrados eletrolíticos.',
      },
      {
        route: 'Via Intraóssea (IO — alternativa emergencial excepcional)',
        technique:
          'Utilizar apenas em emergência crítica com colapso vascular em que o acesso venoso é impossível, mantendo as mesmas regras de redissolução térmica, filtro de 5 µm e infusão em 15–20 min.',
        nursingCare:
          'Vigiar pressão local intraóssea e migração para via IV periférica ou central assim que a perfusão periférica for restabelecida.',
        limitations:
          'Menor volume de fluxo contínuo em cateteres pequenos; transicionar para acesso IV seguro tão logo possível.',
      },
      {
        route: 'Via Oral (VO) / Via Subcutânea (SC)',
        technique:
          'Não utilizar para controle de PIC ou PIO. A via oral não promove absorção sistêmica útil (atua apenas como catártico osmótico local) e a via subcutânea provoca necrose tecidual grave.',
        nursingCare: 'Proscrever qualquer administração subcutânea ou acidental perivascular.',
        limitations: 'Ineficaz por via oral para urgências neurológicas/oftálmicas; vesicante no subcutâneo.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Administrar preferencialmente puro na formulação comercial a 20% (200 mg/mL) em via venosa exclusiva com filtro de linha de 5 µm.',
        'Após o término da infusão, lavar a linha venosa com NaCl 0,9% estéril.',
      ],
      incompatibleFluids: [
        'Sangue total e concentrado de hemácias (provoca aglutinação e hemólise direta — nunca infundir no mesmo equipo).',
        'Cloreto de potássio (KCl) concentrado ou soluções eletrolíticas concentradas adicionadas diretamente ao frasco de manitol (precipitam cristais).',
        'Cefepima, imipeném/cilastatina, filgrastim e soluções fortemente alcalinas/bicarbonato (incompatibilidades descritas em mistura Y/frasco).',
      ],
      infusionRateGuidance:
        'Bolus terapêutico padrão de emergência (0,5–1 g/kg = 2,5–5 mL/kg a 20%): infundir em 15 a 20 minutos (até 30 min em pacientes com reserva cardíaca limítrofe). Evitar infusão ultrarrápida (< 5 min).',
      preparationNotes:
        'Concentrações ≥ 15% supersaturam facilmente abaixo de ~20 °C (agravado em PVC ou frascos riscados). Caso haja cristalização: aquecer em banho-maria controlado (protocolos hospitalares citam 37–60 °C e bulas industriais 60–80 °C com agitação suave até dissolução cristalina total), resfriar obrigatoriamente até ~37 °C antes de administrar e empregar sempre filtro de linha de 5 µm.',
      storageRequirements:
        'Armazenar em temperatura ambiente controlada (15–30 °C), ao abrigo do congelamento e de correntes frias de ar-condicionado. Nunca colocar na geladeira. Descartar sobras após punção única (risco microbiológico e recristalização).',
    },
    prescriptionType: {
      category: 'Uso hospitalar / prescrição veterinária simples (sem receita especial)',
      ordinanceOrLaw: 'Não listada na Portaria SVS/MS nº 344/1998',
      retentionRequired: false,
      guidelines:
        'Atenção à rotulagem comercial brasileira: algumas bulas hospitalares contêm erro de redação chamando a solução a 20% de “hipotônica” apesar de informarem corretamente osmolaridade de ~1.098 mOsm/L (~3,5× a plasmática).',
    },
    pharmacologicalClassification: {
      chemicalClass: 'Poliálcool / Hexitol com seis grupos hidroxila (C₆H₁₄O₆ | 182,17 g/mol)',
      chemicalClassDescription:
        'Álcool de açúcar altamente hidrofílico, não ionizado no pH fisiológico sanguíneo (~7,4), com lipofilicidade muito baixa e tendência física à supersaturação/cristalização em soluções ≥15% sob resfriamento (<20 °C). Nota físico-química: compêndios analíticos atribuem pKa ~13,5 aos grupos álcool, enquanto referência clínica secundária pontual cita valor discrepante de 3,4 — sem repercussão na ionização plasmática.',
      therapeuticClass: 'Diurético osmótico e agente hiperosmolar sistêmico',
      therapeuticClassDescription:
        'Agente físico-osmótico utilizado na redução emergencial da pressão intracraniana, no preparo neurocirúrgico pré-durotomia, no glaucoma agudo refratário e na profilaxia/resgate da síndrome do desequilíbrio dialítico.',
      atcCode: 'B05BC01',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Farmacocinética de referência e cautela hemodinâmica em TCE canino',
        description:
          'Principal espécie caracterizada farmacocineticamente (Vd ~0,2–0,3 L/kg; meia-vida normal ~60–100 min; ~80–90% excretados inalterados em 3 h quando há TFG preservada). Infusões muito rápidas (<5 min) podem provocar queda transitória da pressão arterial média; nunca substituir a estabilização volêmica inicial do TCE com choque.',
        clinicalImplications:
          'Preferir administração em 15–20 min com cristaloides isotônicos balanceados paralelos para sustentar pressão de perfusão cerebral.',
      },
      {
        species: 'cat',
        title: 'Alta sensibilidade à sobrecarga volêmica e baixa eficácia em obstrução ureteral',
        description:
          'Menor volemia plasmática relativa e alta prevalência de cardiomiopatias subclínicas e DRC oculta tornam felinos particularmente propensos a edema pulmonar agudo após bolus repetidos ou doses elevadas (1,5–2 g/kg). Na ureterolitíase felina, CRI de 60 mg/kg/h apresentou taxa de sucesso de apenas ~13%.',
        clinicalImplications:
          'Monitorar frequência respiratória e ausculta pulmonar continuamente; excluir obstrução urinária completa por imagem antes de qualquer diurético osmótico e evitar doses repetidas em anúria (IRIS 2024).',
      },
    ],
  },
  practicalWeightTable: {
    standardDoseText:
      'Manitol 20% (200 mg/mL = 0,2 g/mL) — Bolus padrão 0,5 a 1 g/kg IV em 15–20 min com filtro de 5 µm',
    headers: ['Peso', 'Dose total (0,5–1 g/kg)', 'Volume 0,5 g/kg (2,5 mL/kg)', 'Volume 1,0 g/kg (5,0 mL/kg)'],
    rows: [
      { weight: '3 kg', totalDose: '1,5 – 3,0 g', col1: '7,5 mL', col2: '15 mL' },
      { weight: '5 kg', totalDose: '2,5 – 5,0 g', col1: '12,5 mL', col2: '25 mL' },
      { weight: '10 kg', totalDose: '5,0 – 10,0 g', col1: '25 mL', col2: '50 mL' },
      { weight: '20 kg', totalDose: '10,0 – 20,0 g', col1: '50 mL', col2: '100 mL' },
      { weight: '30 kg', totalDose: '15,0 – 30,0 g', col1: '75 mL', col2: '150 mL' },
    ],
  },
  monitoringParameters: [
    'Pressão arterial média (PAM), frequência cardíaca, status neurológico (escala de coma de Glasgow modificada) e perfusão periférica antes e após a infusão.',
    'Sódio, potássio, cloreto e osmolaridade sérica medida por depressão do ponto de congelamento (evitar ultrapassar 320 mOsm/kg; vigiar gap osmolar >10 mOsm/kg e hiponatremia translocacional).',
    'Débito urinário (mensurar mL/kg/h e permeabilidade ureteral/uretral prévia), peso corporal e ausculta pulmonar contínua para flagrar edema pulmonar precoce.',
    'Inspeção contínua do cateter IV contra extravasamento (vesicante/necrose) e observação visual da bolsa e filtro de 5 µm contra recristalização em salas frias.',
  ],
  clientInformation: [
    'Medicamento de uso estritamente hospitalar sob monitoramento intensivo; não existe administração domiciliar oral ou subcutânea segura para emergências neurológicas ou oculares.',
    'Os tutores devem ser avisados sobre o risco de piora súbita caso haja disfunção renal grave ou cardiopatia prévia e sobre a necessidade de reavaliação seriada neurológica/oftálmica e de exames de eletrólitos.',
  ],
  clinicalStructuredBlocks: [
    {
      kind: 'clinicalCallout',
      variant: 'brazil',
      title: 'BLOCO A/E — Discrepância de bula brasileira, pKa e preparo de cristais com filtro de 5 µm',
      body: 'Manitol 20% contém 200 mg/mL (0,2 g/mL) e ~1.098–1.100 mOsm/L: algumas bulas hospitalares nacionais classificam-no erroneamente como “hipotônico” no texto apesar da osmolaridade declarada (~3,5× o plasma). Soluções ≥15% cristalizam abaixo de ~20 °C (agravado em PVC ou vidros riscados); antes de infundir, aquecer sob controle até dissolução completa (manuais citam 37–60 °C; bulas industriais 60–80 °C), resfriar obrigatoriamente até ~37 °C e infundir sempre com filtro de linha de 5 µm em acesso venoso patente exclusivo (vesicante se extravasar; aglutinação/hemólise em contato com sangue). Referências analíticas registram pKa ~13,5 vs valor discrepante de 3,4 em compêndio clínico secundário — ambos sem ionização em pH 7,4.',
    },
    {
      kind: 'clinicalCallout',
      variant: 'info',
      title: 'BLOCO B — Mecanismo bifásico na PIC e vantagem na luxação anterior do cristalino',
      body: 'Nos primeiros minutos após bolus IV (0,5–1 g/kg em 15–20 min), reduz a viscosidade sanguínea e desencadeia vasoconstrição arteriolar reflexa (fase reológica imediata), consolidando o gradiente osmótico em 15–30 min com redução da produção de líquor (duração de 2–5 h; até 3–8 h na PIO pela equação PIO = K(OP_aquoso − OP_plasma) + PC). No glaucoma agudo em que edema corneano impede excluir luxação anterior do cristalino, latanoprost é contraindicado pela miose intensa, tornando o manitol IV (com inibidor da anidrase carbônica) escolha segura que ainda retrai o vítreo no pré-operatório.',
    },
    {
      kind: 'clinicalCallout',
      variant: 'caution',
      title: 'BLOCOS C/F/G — Consenso IRIS 2024 na LRA anúrica, armadilhas laboratoriais e associação com furosemida',
      body: 'O Consenso IRIS LRA (2024) contraindica doses repetidas em anúria persistente: produzir diurese não recupera a filtração glomerular e o manitol retido precipita sobrecarga volêmica letal, edema pulmonar, hiponatremia translocacional hiperosmolar (gap osmolar >10 mOsm/kg; <120 mEq/L sugere outra etiologia associada) e nefrose osmótica (>2–4 g/kg/dia). Excluir obstrução urinária por ultrassom antes de administrar (RRI sobe paradoxalmente na obstrução completa). No TCE, evitar associação rotineira à furosemida e usar osmometria por depressão do ponto de congelamento (lembrar falso-positivo para etilenoglicol, falsa elevação de densidade urinária refratométrica e interferência em fósforo sérico).',
    },
  ],
  clinicalNotesRichText:
    'Manitol (D-manitol) é um hexitol hidrofílico osmoticamente ativo, não ionizado em pH fisiológico (~182,17 g/mol; solução hospitalar a 20% = 200 mg/mL, ~1.098 mOsm/L). Reduz rapidamente a PIC em minutos por mecanismo reológico (redução da viscosidade sanguínea e vasoconstrição arteriolar cerebral reflexa preservando perfusão), seguido de gradiente osmótico pleno em 15–30 min com redução também da produção de líquor (duração de 2–5 h; até 3–8 h na PIO). A dose padrão de emergência neurológica e oftálmica é 0,5–1 g/kg IV em 15–20 min (2,5–5 mL/kg a 20%), sempre após aquecimento e dissolução de eventuais cristais (resfriando a ~37 °C) e através de filtro de linha de 5 µm em acesso venoso patente exclusivo (risco grave de necrose em extravasamento e hemólise/aglutinação com sangue). Na LRA anúrica persistente, o Consenso IRIS (2024) contraindica doses repetidas pelo risco de hipervolemia fatal, edema pulmonar, hiponatremia translocacional hiperosmolar e nefrose osmótica; na obstrução ureteral felina, protocolos em infusão contínua mostraram baixa eficácia (~13%). Nunca associar furosemida rotineiramente no TCE nem substituir a correção do choque circulatório pelo manitol.',
  references: [
    {
      id: 'ref-manitol-plumbs-10',
      citationText:
        "Budde JA, McCluskey DM. Plumb's Veterinary Drug Handbook. 10th ed. Wiley-Blackwell / VetMedux; 2023. Monografia “Mannitol”, pp. 793–795.",
      sourceType: 'Formulário veterinário internacional',
      notes:
        'Farmacologia, contraindicações, dosagens em cães e gatos, interferências laboratoriais (fósforo, osmolaridade, etilenoglicol) e cuidados de cristalização/filtração.',
      evidenceLevel: 'Referência terciária de farmacologia clínica veterinária',
    },
    {
      id: 'ref-manitol-bsava-10',
      citationText:
        'Allerton F (ed.). BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia “Mannitol”, pp. 241–242.',
      sourceType: 'Formulário veterinário internacional',
      notes:
        'Indicações neurocríticas e oftalmológicas, faixas de dose IV (0,25–2 g/kg), duração de efeito intraocular (3–8 h) e recomendações de restrição/monitoração hídrica.',
      evidenceLevel: 'Referência terciária britânica',
    },
    {
      id: 'ref-manitol-lumb-jones',
      citationText:
        'Grimm KA, Lamont LA, Tranquilli WJ, Greene SA, Robertson SA (eds.). Veterinary Anesthesia and Analgesia: The Fifth Edition of Lumb and Jones. Wiley-Blackwell; 2015. pp. 60, 67–69; Cap. 67 (Ophthalmic Patients), pp. 1330, 1333.',
      sourceType: 'Tratado de anestesiologia veterinária',
      notes:
        'Efeito sobre pressão de perfusão cerebral, equação da pressão intraocular, uso em glaucoma/luxação de lente e cuidados transoperatórios em craniotomia.',
      evidenceLevel: 'Tratado de referência em anestesiologia',
    },
    {
      id: 'ref-manitol-essentials-anesth',
      citationText:
        'Grimm KA, Tranquilli WJ, Lamont LA (eds.). Essentials of Small Animal Anesthesia and Analgesia. 2nd ed. Wiley-Blackwell; 2011. Seções neurocirúrgica, oftálmica e renal.',
      sourceType: 'Manual de anestesiologia e analgesia veterinária',
      notes:
        'Doses perioperatórias de 0,25–1 g/kg antes da abertura dural, limitação em paciente hipovolêmico e manejo intraoperatório da pressão intracraniana.',
      evidenceLevel: 'Referência especializada em anestesiologia',
    },
    {
      id: 'ref-manitol-dibartola',
      citationText:
        'DiBartola SP (ed.). Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. Elsevier Saunders; 2012. Capítulos de osmolaridade, sódio/potássio, fósforo, LRA e hemodiálise.',
      sourceType: 'Tratado de fluidoterapia e distúrbios hidroeletrolíticos',
      notes:
        'Diferenciação entre hiponatremia translocacional hiperosmolar e pseudohipernatremia, cálculo do gap osmolar (>10 mOsm/kg), interferência em fósforo sérico, depleção eletrolítica e síndrome do desequilíbrio dialítico.',
      evidenceLevel: 'Tratado de referência em fisiologia renal e fluidoterapia',
    },
    {
      id: 'ref-manitol-dewey-neuro',
      citationText:
        'Dewey CW, da Costa RC (eds.). Practical Guide to Canine and Feline Neurology. 3rd ed. Wiley-Blackwell; 2016. pp. 62, 174, 214, Cap. 8 (Head Trauma) pp. 242–248, 316.',
      sourceType: 'Tratado de neurologia veterinária',
      notes:
        'Mecanismo bifásico reológico e osmótico, janela de 15–30 min e 2–5 h, limitação de doses repetidas, associação desaconselhada com furosemida no TCE e uso pré-punção ou pós-shunt.',
      evidenceLevel: 'Tratado clínico de neurologia de pequenos animais',
    },
    {
      id: 'ref-manitol-delahunta',
      citationText:
        "de Lahunta A, Glass E, Kent M. de Lahunta's Veterinary Neuroanatomy and Clinical Neurology. 5th ed. Elsevier; 2021. Cap. 4 (Cerebrospinal Fluid and Hydrocephalus), pp. 79–80.",
      sourceType: 'Tratado de neuroanatomia e neurologia clínica',
      notes:
        'Sensibilidade da taxa de produção do líquido cefalorraquidiano às variações da pressão osmótica plasmática e redução macroscópica do edema parenquimatoso.',
      evidenceLevel: 'Tratado de neuroanatomia clínica',
    },
    {
      id: 'ref-manitol-ettinger-9',
      citationText:
        "Côté É, Ettinger SJ, Feldman EC (eds.). Ettinger's Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 125 (Neurologic Crisis, Fig. 125.1 p. 655), Cap. 130 (Heatstroke/Rhabdomyolysis p. 678) e p. 2062.",
      sourceType: 'Tratado de medicina interna veterinária',
      notes:
        'Fluxo decisório de crise neurológica com TCE, rabdomiólise associada à intermação e interferência analítica na densidade urinária refratométrica.',
      evidenceLevel: 'Tratado internacional de medicina interna',
    },
    {
      id: 'ref-manitol-bsava-nephro',
      citationText:
        'Elliott J, Grauer GF, Westropp JL (eds.). BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA; 2017. pp. 10, 12, 43, 47, 252, 308.',
      sourceType: 'Manual especializado em nefrologia veterinária',
      notes:
        'Limites da diurese osmótica na LRA, teto de toxicidade tubular (>2–4 g/kg/dia), índice de resistividade renal após manitol e prevenção da síndrome do desequilíbrio dialítico.',
      evidenceLevel: 'Manual técnico de especialidade',
    },
    {
      id: 'ref-manitol-ecc-manuals',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski E, Silverstein DC (eds.). Feline Emergency and Critical Care Medicine (2nd ed.) & Manual of Small Animal Emergency and Critical Care Medicine (2nd ed.). Wiley-Blackwell.',
      sourceType: 'Manuais de medicina veterinária intensiva e emergência',
      notes:
        'Protocolos de emergência neurológica, riscos em felinos cardiopatas, manejo da cristalização e uso de filtro de 5 µm, escolha entre manitol e latanoprost no glaucoma e cautela hídrica.',
      evidenceLevel: 'Referências terciárias de emergência crítica',
    },
    {
      id: 'ref-manitol-iris-2024',
      citationText:
        'Segev G, Cowgill LD, et al. International Renal Interest Society (IRIS) Consensus Guidelines: Management of Acute Kidney Injury in Dogs and Cats (2024).',
      sourceType: 'Consenso internacional',
      notes:
        'Contraindica administrações repetidas de manitol em pacientes com anúria/oligúria persistente após reposição volêmica; diurese não implica melhora da taxa de filtração glomerular.',
      evidenceLevel: 'Consenso internacional de nefrologia veterinária',
    },
    {
      id: 'ref-manitol-aaha-2024',
      citationText:
        'Pardo M, Spencer E, Odunayo A, et al. 2024 AAHA Fluid Therapy Guidelines for Dogs and Cats. Journal of the American Animal Hospital Association. 2024;60(4):131–163.',
      sourceType: 'Diretriz de associação clínica',
      notes:
        'Seleção de fluidos hiperosmolares em TCE (manitol vs salina hipertônica), prevenção de hipovolemia pós-diurética e manutenção da pressão de perfusão encefálica.',
      evidenceLevel: 'Diretriz clínica internacional (AAHA 2024)',
    },
    {
      id: 'ref-manitol-pigott-2021',
      citationText:
        'Pigott A, Rudloff E. Traumatic brain injury—A review of intravenous fluid therapy. Frontiers in Veterinary Science / JVECC clinical evidence (2021).',
      sourceType: 'Revisão clínica baseada em evidências',
      notes:
        'Comparação hemodinâmica entre salina hipertônica e manitol no traumatismo cranioencefálico e contraindicação de associação rotineira à furosemida.',
      evidenceLevel: 'Revisão especializada de neuroemergência',
    },
    {
      id: 'ref-manitol-cloyd-1986',
      citationText:
        'Cloyd JC, Snyder BD, Cleeremans B, Bundlie SR. Mannitol pharmacokinetics and serum osmolality in dogs and humans. J Pharmacol Exp Ther. 1986.',
      sourceType: 'Estudo farmacocinético experimental',
      notes:
        'Demonstração de distribuição extracelular, depuração glomerular e meia-vida plasmática de ~60–100 min em cães.',
      evidenceLevel: 'Estudo farmacocinético clássico',
    },
    {
      id: 'ref-manitol-hoehne-2021',
      citationText:
        'Hoehne SN, et al. Retrospective evaluation of mannitol continuous rate infusion for medical management of feline ureteral obstruction (2021) & Ballocco I, et al. Renal resistive index response to mannitol challenge (2019).',
      sourceType: 'Estudos clínicos veterinários',
      notes:
        'Baixo sucesso clínico (~13%) da CRI de 60 mg/kg/h na expulsão de urólitos ureterais em gatos e elevação do RRI após manitol na obstrução ureteral completa.',
      evidenceLevel: 'Estudos clínicos observacionais / diagnósticos',
    },
    {
      id: 'ref-manitol-bula-br',
      citationText:
        'Fresenius Kabi Brasil / Halex Istar / B. Braun Brasil. Solução de Manitol 20% (200 mg/mL). Bulas hospitalares do fabricante.',
      sourceType: 'Bula do fabricante',
      notes:
        'Concentração 200 mg/mL, osmolaridade nominal 1.098 mOsm/L, orientações de aquecimento controlado (60–80 °C) para dissolução de cristais e registro de divergência tipográfica em bula nacional.',
      evidenceLevel: 'Documentação regulatória técnica (ANVISA)',
    },
  ],
};
