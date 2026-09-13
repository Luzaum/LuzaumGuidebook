import type { MedicationRecord } from '../../types/medication';

/**
 * Monografia Padrão-Ouro: Dipirona (Metamizol)
 * Baseada nas fontes primárias veterinárias:
 * - Plumb's Veterinary Drug Handbook 10ª edição (pp. 413–415)
 * - BSAVA Small Animal Formulary, Part A: Canine and Feline, 10ª edição
 * - Nelson & Couto, Medicina Interna de Pequenos Animais 6ª edição
 * - Ettinger's Textbook of Veterinary Internal Medicine, 9ª edição 2024
 * - Estudos farmacocinéticos e clínicos em cães e gatos (Giorgi et al., Ferreira et al., Teixeira et al.)
 */

export const dipironaMedicationRecord: MedicationRecord = {
  id: 'med-dipirona',
  slug: 'dipirona',
  title: 'Dipirona (metamizol)',
  activeIngredient: 'Dipirona monoidratada (metamizol sódico; noramidopirina metanossulfonato sódico)',
  isControlled: false,
  tradeNames: [
    'Novalgina Gotas 500 mg/mL (Opella / Sanofi)',
    'Novalgina Comprimidos 500 mg e 1.000 mg (Opella)',
    'Dipirona Gotas 500 mg/mL (Genéricos Medley, EMS, Neo Química)',
    'D-500 Injetável 500 mg/mL (Zoetis Saúde Animal)',
    'Analgésico Calbos Injetável 500 mg/mL',
    'Febrefrix Injetável 500 mg/mL (Jofadel)',
  ],
  officialSiteUrl: 'https://www.novalgina.com.br/',
  leafletUrl: 'https://www.novalgina.com.br/bulas/solucao-oral-gotas-500mg.pdf',
  imageUrl: 'https://www.novalgina.com.br/dam/jcr:cdf4c305-d4c4-4fde-adaa-b4ba85ab8245/Gotas%20Kids.webp',
  pharmacologicClass: 'Analgésico, antipirético e antiespasmódico não-opioide (derivado pirazolônico; AINE atípico)',
  species: ['dog', 'cat'],
  category: 'terapeutica-geral',
  tags: [
    'Dipirona',
    'Metamizol',
    'Analgesia multimodal',
    'Antipirético',
    'Antiespasmódico',
    'Dor visceral',
    'Pós-operatório',
    'Novalgina',
    'Plumbs 10ª ed.',
  ],

  plainLanguageSummary:
    'A dipirona é um analgésico e antitérmico consagrado na medicina veterinária brasileira e mundial. É um pró-fármaco que se transforma rapidamente no organismo em metabólitos ativos que bloqueiam a percepção da dor no cérebro e na medula, relaxam espasmos dolorosos do estômago e intestino e baixam a febre alta sem agredir o estômago com a mesma intensidade que os anti-inflamatórios comuns. Em gatos, seu uso exige cautela com doses menores e intervalos maiores devido à metabolização hepática peculiar dos felinos.',

  mechanismOfAction:
    'A dipirona (metamizol) atua como um pró-fármaco que sofre hidrólise pré-sistêmica imediata em 4-metilaminoantipirina (4-MAA), seu metabólito ativo predominante. Seu perfil farmacodinâmico é multifacetado e atípico em comparação aos AINEs carboxílicos tradicionais: (1) Inibição central e periférica seletiva da ciclo-oxigenase, com alta afinidade pelas isoformas centrais (incluindo a variante COX-3/COX-1b expressa no sistema nervoso central) e menor inibição periférica de COX-1 constitutiva tecidual; (2) Ativação do sistema endocanabinoide através da formação de metabólitos conjugados com ácido araquidônico (análogos a anandamida) que atuam como agonistas nos receptores CB1 centrais e modulam as vias descendentes inibitórias da dor na substância cinzenta periaquedutal; (3) Ação antiespasmódica visceral potente decorrente da inibição do influxo intracelular de cálcio sensível a voltagem e supressão da hiper-reatividade da musculatura lisa induzida por bradicinina e substância P; e (4) Antipirese hipotalâmica central direta mediada pela supressão da síntese de PGE2 no órgão vascular da lâmina terminal (OVLT), reajustando o termostato do centro pré-óptico hipotalâmico para a normotermia.',

  indications: [
    'Controle da dor visceral aguda e espasmos da musculatura lisa em pancreatite aguda, gastroenterite, cólica intestinal e obstruções ureterais parciais.',
    'Analgesia pós-operatória multimodal somática e ortopédica em cães e gatos (associada a opioides ou AINEs seletivos).',
    'Tratamento sintomático da pirexia (febre) grave e refratária decorrente de doenças infecciosas, sepse ou inflamação sistêmica.',
    'Analgesia adjuvante e poupadora de opioides em traumas musculoesqueléticos, dor paravertebral e doença do disco intervertebral (DDIV).',
    'Alívio do espasmo e dor inflamatória do trato urinário inferior (DTUIF e cistites não infecciosas e obstrutivas).',
  ],

  contraindications: [
    'Hipersensibilidade conhecida à dipirona, aminopirina, fenazona ou a outros derivados pirazolônicos.',
    'Hipotensão arterial grave, choque distributivo, endotoxemia descompensada ou hipovolemia não corrigida (risco de vasodilatação e colapso circulatório por relaxamento vascular mediado por óxido nítrico em injeção intravenosa).',
    'Discrasias sanguíneas preexistentes, anemia aplástica, trombocitopenia severa ou hipoplasia de medula óssea.',
    'Insuficiência hepática fulminante ou cirrose hepática descompensada (clearance de 4-MAA reduzido dramaticamente com acúmulo tóxico).',
    'Insuficiência renal anúrica ou oligúrica aguda descompensada.',
  ],

  cautions: [
    'Em gatos: usar doses conservadoras (10 a 12,5 mg/kg) e intervalos estendidos (q12h a q24h), limitando o uso preferencialmente a 48–72 horas contínuas. Monitorar mucosas quanto a palidez ou cianose (potencial de formação de corpúsculos de Heinz ou meta-hemoglobinemia em superdosagem prolongada).',
    'Sialorreia reflexa profusa e intensa em gatos quando administrada por via oral na forma de gotas humanas comuns não veiculadas em cápsulas, devido ao sabor amargo extremo da substância.',
    'Administração intravenosa deve ser SEMPRE lenta (em pelo menos 2 a 5 minutos) e preferencialmente diluída em solução cristaloide (SF 0,9% ou SG 5%), para prevenir hipotensão arterial aguda transitória.',
    'Evitar associação com outros AINEs no mesmo momento sem intervalo ou avaliação criteriosa, embora a literatura suporte combinações multimodais sob monitoramento, a inibição combinada de tromboxano pode prolongar o tempo de sangramento.',
    'Não administrar concomitantemente com fenotiazínicos (acepromazina ou clorpromazina) pelo alto risco de hipotermia grave e desregulação térmica central.',
    'Pacientes desidratados devem receber reposição volêmica antes ou durante a terapia.',
  ],

  adverseEffects: [
    'Hipotensão arterial transitória por injeção intravenosa rápida (vasodilatação periférica direta e liberação local de óxido nítrico).',
    'Sialorreia (ptialismo intenso) em felinos por estimulação dos botões gustativos pelo amargor na via oral líquida.',
    'Náusea, desconforto epigástrico transitório, êmese e diarreia autolimitada em animais com sensibilidade gástrica.',
    'Dor e reação inflamatória transitória no local da injeção intramuscular (especialmente com formulações concentradas de 500 mg/mL).',
    'Inibição leve e reversível da agregação plaquetária via bloqueio transitório da COX-1 plaquetária (duração proporcional à presença de 4-MAA circulante, sem o efeito irreversível da aspirina).',
    'Hipotermia grave quando combinada com sedativos fenotiazínicos (acepromazina).',
    'Agranulocitose ou mielossupressão idiossincrática (extrapolada historicamente de humanos; clinicamente raríssima em cães e gatos sob doses recomendadas).',
  ],

  interactions: [
    'Fenotiazínicos (acepromazina, clorpromazina): hipotermia profunda e hipotensão aditiva decorrentes do bloqueio combinado termorregulador central e vasodilatação alfa-1 adrenérgica.',
    'AINEs convencionais (meloxicam, carprofeno, firocoxib, flunixin): inibição cumulativa da síntese de tromboxano com potencial aumento do tempo de sangramento e maior risco renal em pacientes hipovolêmicos.',
    'Corticosteroides (prednisolona, dexametasona): maior risco cumulativo de estresse e erosão da mucosa gastroduodenal.',
    'Anticoagulantes e antiplaquetários (heparinas, clopidogrel, varfarina): risco potencializado de hemorragia devido à inibição funcional transitória das plaquetas.',
    'Fenobarbital e indutores do citocromo P450: aceleração do metabolismo hepático da dipirona e redução moderada da meia-vida de 4-MAA.',
    'Ciclosporina: relatos em medicina humana e experimental de redução das concentrações plasmáticas de ciclosporina, exigindo monitoramento.',
    'Medicamentos nefrotóxicos (aminoglicosídeos, anfotericina B): monitorar creatinina e taxa de filtração glomerular pelo risco de somação de estresse hemodinâmico renal.',
  ],

  routes: [
    'Intravenosa lenta (IV) — 2 a 5 minutos; preferencialmente diluída em 10–20 mL de SF 0,9%',
    'Intramuscular profunda (IM) — aplicar em musculatura volumosa (quadríceps ou epaxial)',
    'Oral (VO) — gotas diluídas ou comprimidos/cápsulas administrados com pequenas porções de alimento',
  ],

  doses: [
    {
      id: 'dose-dipirona-cao-pos-op',
      species: 'dog',
      indication: 'Analgesia pós-operatória e dor aguda somática/visceral',
      doseMin: 25,
      doseMax: 25,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou VO',
      frequency: 'A cada 8 horas (TID)',
      duration: '1 a 3 dias (fase inflamatória aguda pós-cirúrgica)',
      clinicalContext: 'Pós-operatório de tecidos moles, OSH, orquiectomia ou trauma agudo',
      notes:
        'Administrar a primeira dose IV no perioperatório e dar continuidade por via oral a cada 8h. Em cães com dor moderada a intensa, combinar com opioides (metadona/tramadol) dentro de protocolo multimodal.',
      monitoring: 'Eficácia analgésica por escala de dor (Glasgow), pressão arterial e apetite.',
      maximumDose: '50 mg/kg/dose (não recomendada rotineiramente; dose padrão de livro é 25 mg/kg).',
      evidenceLevel: 'Consenso Plumb\'s 10ª ed., BSAVA 10ª ed. e ensaios clínicos (Teixeira et al., 2013).',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-teixeira-2013'],
      calculatorEnabled: false,
    },
    {
      id: 'dose-dipirona-cao-febre',
      species: 'dog',
      indication: 'Controle de febre refratária (hipertermia por pirexia)',
      doseMin: 20,
      doseMax: 25,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou VO',
      frequency: 'A cada 8 a 12 horas conforme temperatura',
      duration: 'Enquanto persistir pirexia clínica (>39,5 °C); suspender na normotermia',
      clinicalContext: 'Sepse, pneumonias, processos infecciosos agudos ou piometra',
      notes:
        'Reduz o ponto de regulação do centro térmico pré-óptico. Não usar em insolação térmica (onde a causa é física e não mediada por pirógenos). Hidratar antes da administração.',
      monitoring: 'Curva térmica retal a cada 2 a 4 horas; hidratar e avaliar perfusão periférica.',
      evidenceLevel: 'Plumb\'s 10ª ed., Ettinger 9ª ed. 2024.',
      referenceIds: ['ref-plumb-10', 'ref-ettinger-2024'],
      calculatorEnabled: false,
    },
    {
      id: 'dose-dipirona-cao-colica',
      species: 'dog',
      indication: 'Dor visceral, espasmos digestivos e pancreatite aguda',
      doseMin: 25,
      doseMax: 25,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou IM profunda',
      frequency: 'A cada 8 horas',
      duration: '24 a 72 horas',
      clinicalContext: 'Pancreatite, gastroenterite aguda, gastrite espasmódica ou cólica biliar',
      notes:
        'Combina analgesia central com ação antiespasmódica na musculatura lisa entérica sem paralisia de motilidade espontânea.',
      monitoring: 'Postura corporal de prece, palpação abdominal seriada, vômito e hidratação.',
      evidenceLevel: 'Plumb\'s 10ª ed., BSAVA Formulary 10ª ed.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10'],
      calculatorEnabled: false,
    },
    {
      id: 'dose-dipirona-gato-pos-op',
      species: 'cat',
      indication: 'Analgesia pós-operatória e dor visceral em felinos',
      doseMin: 10,
      doseMax: 12.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou VO em cápsula',
      frequency: 'A cada 12 horas (BID) ou 25 mg/kg a cada 24 horas (SID)',
      duration: '48 a 72 horas (evitar tratamentos contínuos prolongados)',
      clinicalContext: 'Pós-cirúrgico de OSH, cistite idiopática felina obstrutiva e dor visceral',
      notes:
        'A dosagem de 12,5 mg/kg q12h oferece melhor estabilidade de alívio que doses elevadas espaçadas. Evitar soluções orais puras na boca do gato devido a salivação profusa imediata decorrente do amargor extremo.',
      monitoring: 'Coloração de mucosas, apetite, temperatura, sialorreia e grau de sedação/conforto.',
      maximumDose: '25 mg/kg/dia total.',
      evidenceLevel: 'Plumb\'s 10ª ed., Giorgi et al. (2018), Ferreira et al. (2019).',
      referenceIds: ['ref-plumb-10', 'ref-giorgi-2018', 'ref-ferreira-2019'],
      calculatorEnabled: false,
    },
    {
      id: 'dose-dipirona-gato-febre',
      species: 'cat',
      indication: 'Pirexia (febre infecciosa/inflamatória) em felinos',
      doseMin: 10,
      doseMax: 12.5,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'IV lenta ou VO',
      frequency: 'A cada 12 a 24 horas',
      duration: 'Apenas até retorno à normotermia (máximo 48 horas consecutivas)',
      clinicalContext: 'Febre refratária de origem indeterminada, complexo respiratório ou abscesso',
      notes:
        'Nunca associar a acepromazina pelo risco catastrófico de hipotermia felina. Garantir hidratação com fluidoterapia adequada.',
      monitoring: 'Temperatura corporal a cada 2 horas até estabilização em 38–39,2 °C.',
      evidenceLevel: 'Plumb\'s 10ª ed., Ettinger 9ª ed. 2024.',
      referenceIds: ['ref-plumb-10', 'ref-ettinger-2024'],
      calculatorEnabled: false,
    },
  ],

  presentations: [
    {
      id: 'pres-novalgina-gotas-500',
      label: 'Novalgina® Gotas 500 mg/mL (solução oral — uso humano)',
      form: 'Solução oral em gotas',
      concentrationValue: 500,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frascos gotejadores de 10 mL ou 20 mL com gotejador de 20 gotas/mL',
      route: 'Oral',
      dropsPerMl: 20,
      scoringInfo: '1 mL = 20 gotas. 1 gota = 25 mg de dipirona monoidratada. Corresponde exatamente a 1 gota/kg para a dose de 25 mg/kg.',
      channel: 'human_pharmacy',
      commercialProductSlug: 'novalgina-gotas-500',
    },
    {
      id: 'pres-novalgina-comprimido-500',
      label: 'Novalgina® Comprimidos 500 mg (uso humano)',
      form: 'Comprimido simples',
      concentrationValue: 500,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Blísteres com 10, 30 ou 100 comprimidos sulcados',
      route: 'Oral',
      scoringInfo: 'Comprimido birranhurado: 1 comprimido = 20 kg (na dose de 25 mg/kg); 1/2 comprimido (250 mg) = 10 kg; 1/4 comprimido (125 mg) = 5 kg.',
      channel: 'human_pharmacy',
      commercialProductSlug: 'novalgina-comprimidos-500-1000',
    },
    {
      id: 'pres-novalgina-comprimido-1000',
      label: 'Novalgina® Comprimidos 1.000 mg / 1 g (uso humano)',
      form: 'Comprimido simples',
      concentrationValue: 1000,
      concentrationUnit: 'mg/comprimido',
      packInfo: 'Blísteres com 10, 20 ou 100 comprimidos sulcados',
      route: 'Oral',
      scoringInfo: '1 comprimido = 40 kg (na dose de 25 mg/kg); 1/2 comprimido (500 mg) = 20 kg. Recomendado para cães de grande e gigante porte.',
      channel: 'human_pharmacy',
      commercialProductSlug: 'novalgina-comprimidos-500-1000',
    },
    {
      id: 'pres-dipirona-injetavel-vet-500',
      label: 'Dipirona Veterinária Injetável 500 mg/mL (D-500 Zoetis, Calbos, Febrefrix)',
      form: 'Solução injetável estéril',
      concentrationValue: 500,
      concentrationUnit: 'mg/mL',
      packInfo: 'Frasco-ampola com 50 mL ou 100 mL',
      route: 'Intravenosa lenta ou Intramuscular profunda',
      scoringInfo: '500 mg/mL (0,05 mL/kg para dose de 25 mg/kg). Administrar IV lenta em pelo menos 2 a 5 minutos, preferencialmente diluída em SF 0,9%.',
      channel: 'veterinary',
    },
  ],

  clinicalNotesRichText: `
    <p>A dipirona (metamizol) é um dos analgésicos e antipiréticos mais amplamente utilizados na rotina de pequenos animais na América Latina e Europa. Apesar de sua classificação histórica como fármaco semelhante aos AINEs, a dipirona distingue-se criticamente por sua baixíssima gastrotoxicidade e segurança renal superior quando utilizada em cursos agudos (1 a 5 dias), tornando-se um dos pilares mais valiosos da analgesia multimodal moderna.</p>
    <p>Sua rápida hidrólise em 4-metilaminoantipirina (4-MAA) confere início de ação analgésica em menos de 30 minutos por via parenteral e 45–60 minutos por via oral. Na clínica hospitalar, a administração intravenosa deve ser rigorosamente lenta, uma vez que o bólus rápido pode induzir queda transitória da pressão arterial média secundária ao relaxamento da musculatura lisa vascular endotelial.</p>
    <p>Na espécie felina, a farmacocinética é caracterizada por menor depuração e meia-vida discretamente prolongada; no entanto, pesquisas recentes confirmam que regimes de 10 a 12,5 mg/kg a cada 12 horas ou 25 mg/kg a cada 24 horas por até 3 dias são seguros, desmistificando o receio histórico de toxicidade medular quando respeitadas as posologias e a hidratação clínica do paciente.</p>
  `,

  relatedDiseaseSlugs: [
    'coagulacao-intravascular-disseminada-caes-gatos',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
  ],

  references: [
    {
      id: 'ref-plumb-10',
      citationText:
        'Plumb DC. Dipyrone / Metamizole Monograph. In: Plumb\'s Veterinary Drug Handbook. 10th ed. Ames, Iowa: Wiley-Blackwell; 2024:413-415.',
      sourceType: 'Livro-texto de farmacologia veterinária',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook%2C+10th+Edition-p-9781119747942',
      evidenceLevel: 'Padrão-ouro de referência terapêutica internacional',
    },
    {
      id: 'ref-bsava-10',
      citationText:
        'Ramsey I, ed. Metamizole / Butylscopolamine. In: BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. Gloucester, UK: British Small Animal Veterinary Association; 2020:55-56.',
      sourceType: 'Guia terapêutico de referência da associação britânica',
      url: 'https://www.bsavalibrary.com/content/chapter/10.22233/9781910443682.chap4',
      evidenceLevel: 'Diretriz clínica e posologia internacional',
    },
    {
      id: 'ref-nelson-couto-6',
      citationText:
        'Nelson RW, Couto CG. Manifestações Clínicas e Analgesia na Dor Aguda. In: Medicina Interna de Pequenos Animais. 6ª ed. Rio de Janeiro: Guanabara Koogan / Elsevier; 2021:Cap. 87 e seções de dor aguda.',
      sourceType: 'Livro-texto de clínica médica de pequenos animais',
      url: 'https://shop.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
      evidenceLevel: 'Tratado de referência em clínica médica',
    },
    {
      id: 'ref-ettinger-2024',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E, eds. Acute Pain Management and Fever Control in Dogs and Cats. In: Textbook of Veterinary Internal Medicine. 9th ed. St. Louis: Elsevier; 2024:Cap. 170-172.',
      sourceType: 'Tratado de medicina interna veterinária',
      url: 'https://shop.elsevier.com/books/textbook-of-veterinary-internal-medicine/ettinger/978-0-323-76462-9',
      evidenceLevel: 'Tratado de referência médica avançada',
    },
    {
      id: 'ref-giorgi-2017',
      citationText:
        'Giorgi M, Del Carlo S, Łebkowska-Wieruszewska B, Kowalski CJ, Saccomanni G. Pharmacokinetics of metamizole in dogs after intravenous, intramuscular, and oral administration. J Vet Pharmacol Ther. 2017;40(5):472-478.',
      sourceType: 'Ensaio farmacocinético cruzado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28164319/',
      evidenceLevel: 'Nível A (estudo farmacocinético rigoroso)',
    },
    {
      id: 'ref-giorgi-2018',
      citationText:
        'Giorgi M, Aupanun S, Lee HK, Poapolathep A, Rychshanik D, Łebkowska-Wieruszewska B. Pharmacokinetics and metabolism of metamizole in healthy cats. J Feline Med Surg. 2018;20(8):720-726.',
      sourceType: 'Ensaio farmacocinético felino',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29082787/',
      evidenceLevel: 'Nível A (validação farmacocinética felina)',
    },
    {
      id: 'ref-ferreira-2019',
      citationText:
        'Ferreira CG, Steagall PV, Pelligand L, et al. Antinociceptive and hemodynamic effects of dipyrone in conscious cats. J Vet Med Sci. 2019;81(9):1321-1327.',
      sourceType: 'Ensaio clínico farmacodinâmico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/31341103/',
      evidenceLevel: 'Nível B (estudo antinociceptivo e hemodinâmico controlado)',
    },
    {
      id: 'ref-teixeira-2013',
      citationText:
        'Teixeira R, Trindade PH, Monteiro BP, Steagall PV. Postoperative analgesia with metamizole alone or in combination with meloxicam in dogs undergoing ovariohysterectomy. Vet Anaesth Analg. 2013;40(5):541-549.',
      sourceType: 'Ensaio clínico prospectivo randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23714249/',
      evidenceLevel: 'Nível A (ensaio clínico cego e randomizado)',
    },
    {
      id: 'ref-steagall-2020',
      citationText:
        'Steagall PV, Monteiro BP, Taylor PM. Feline Pain Management: Guidelines and Clinical Review. J Feline Med Surg / AAHA. 2020;22(3):215-228.',
      sourceType: 'Diretriz de consenso internacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/32102602/',
      evidenceLevel: 'Consenso de especialistas e diretriz oficial',
    },
    {
      id: 'ref-imagawa-2011',
      citationText:
        'Imagawa VH, Fantoni DT, Tatarunas AC, et al. The effect of metamizole, tramadol or their combination on the minimum alveolar concentration of sevoflurane in dogs. Vet Anaesth Analg. 2011;38(4):303-310.',
      sourceType: 'Ensaio clínico controlado de analgesia e CAM anestésica',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21627732/',
      evidenceLevel: 'Nível A (ensaio clínico prospectivo de analgesia cirúrgica)',
    },
    {
      id: 'ref-giorgi-repeated-2018',
      citationText:
        'Giorgi M, Łebkowska-Wieruszewska B, Lisowski A, et al. Pharmacokinetics and safety of repeated doses of metamizole in dogs. J Vet Pharmacol Ther. 2018;41(4):534-541.',
      sourceType: 'Ensaio farmacocinético e de segurança de doses repetidas',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29577327/',
      evidenceLevel: 'Nível A (estudo farmacocinético e de tolerância em doses múltiplas)',
    },
  ],

  // --------------------------------------------------------------------------
  // NOVOS CAMPOS ESTRUTURADOS PADRÃO-OURO PARA NAVEGAÇÃO POR ABAS
  // --------------------------------------------------------------------------

  quickIndications: [
    {
      condition: 'Dor pós-operatória somática e visceral',
      species: 'both',
      doseSummary: '25 mg/kg em cães | 10–12,5 mg/kg em gatos',
      route: 'IV lenta (2–5 min) ou Oral',
      duration: '1 a 3 dias na janela inflamatória aguda',
      clinicalContext: 'Pós-cirúrgico de tecidos moles, OSH, ortopedia ou trauma',
    },
    {
      condition: 'Espasmos viscerais digestivos e pancreatite',
      species: 'both',
      doseSummary: '25 mg/kg q8h em cães | 12,5 mg/kg q12h em gatos',
      route: 'IV lenta diluída ou Oral',
      duration: '24 a 72 horas conforme resposta clínica',
      clinicalContext: 'Pancreatite, gastroenterite aguda e dor abdominal tipo cólica',
    },
    {
      condition: 'Pirexia e febre alta refratária',
      species: 'both',
      doseSummary: '20–25 mg/kg q8–12h cães | 10–12,5 mg/kg q12–24h gatos',
      route: 'IV lenta ou Oral',
      duration: 'Apenas até retorno à normotermia',
      clinicalContext: 'Febre infecciosa ou inflamatória grave com T > 39,5 °C',
    },
    {
      condition: 'Trauma musculoesquelético e afecções espinhais (DDIV)',
      species: 'both',
      doseSummary: '25 mg/kg q8h cães | 12,5 mg/kg q12h gatos',
      route: 'Oral ou IV lenta',
      duration: '3 a 5 dias associada a repouso e analgesia multimodal',
      clinicalContext: 'Dor paravertebral aguda, hérnia de disco e contusões',
    },
    {
      condition: 'Espasmo e dor do trato urinário (DTUIF e cistites)',
      species: 'both',
      doseSummary: '25 mg/kg q8h cães | 10–12,5 mg/kg q12h gatos',
      route: 'IV lenta ou Oral em cápsula',
      duration: '24 a 48 horas no pós-desobstrução ou fase hiperálgica',
      clinicalContext: 'Alívio do espasmo uretral pós-sondagem e dor vesical aguda',
    },
  ],

  detailedIndications: [
    {
      id: 'det-dor-pos-op',
      indication: 'Analgesia pós-operatória somática e visceral',
      clinicalContext: 'Procedimentos cirúrgicos de tecidos moles (OSH, orquiectomia, gastrotomia, enterotomia) e cirurgias ortopédicas.',
      species: 'both',
      dose: 'Cães: 25 mg/kg | Gatos: 10 a 12,5 mg/kg (ou 25 mg/kg SID)',
      route: 'IV lenta (infundir em 2 a 5 minutos) ou VO',
      frequency: 'Cães: a cada 8 horas (q8h) | Gatos: a cada 12 horas (q12h)',
      duration: '24 a 72 horas (janela de dor inflamatória aguda pós-operatória).',
      mechanismOfAction:
        'Ação central inibitória da COX-3 e atenuação da sensibilização medular espinhal no corno dorsal (wind-up nociceptivo). O metabólito 4-MAA ativa receptores canabinoides CB1 e estimula vias descendentes inibitórias mediadas por peptídeos opioides endógenos, proporcionando analgesia preemptiva e sinérgica sem depressão respiratória.',
      clinicalRationale:
        'A dipirona atua como um potente poupador de opioides e de AINEs tradicionais no perioperatório imediato. Em cães, o ensaio de Teixeira et al. (2013) demonstrou que a associação de dipirona (25 mg/kg) com meloxicam garantiu excelente analgesia pós-OSH com escores de dor significativamente inferiores e menor necessidade de resgate analgésico.',
      monitoring: 'Avaliação seriada de escores de dor (Glasgow ou Colorado), pressão arterial sistêmica média e apetite.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-teixeira-2013', 'ref-ferreira-2019'],
      evidenceLevel: 'Nível A (ensaios clínicos prospectivos randomizados e Plumb\'s 10ª ed.)',
    },
    {
      id: 'det-dor-visceral',
      indication: 'Dor visceral aguda, espasmos digestivos e pancreatite',
      clinicalContext: 'Pancreatite aguda necrosante ou edematosa, gastroenterites infecciosas, colite espasmódica e obstruções gastrointestinais parciais.',
      species: 'both',
      dose: 'Cães: 25 mg/kg | Gatos: 12,5 mg/kg',
      route: 'IV lenta (diluída em 10–20 mL de SF 0,9%) ou VO',
      frequency: 'Cães: a cada 8 horas (q8h) | Gatos: a cada 12 horas (q12h)',
      duration: '24 a 72 horas, ajustando conforme retorno do apetite e cessação da dor.',
      mechanismOfAction:
        'Efeito antiespasmódico direto nas células musculares lisas do trato gastrointestinal via inibição do influxo de íons cálcio através dos canais sensíveis a voltagem e supressão da despolarização induzida por bradicinina e citocinas inflamatórias. Não altera o tônus simpático basal e não causa o íleo paralítico associado a doses elevadas de opioides puros.',
      clinicalRationale:
        'A dor visceral da pancreatite e de quadros espasmódicos tem componente neuroinflamatório e hipercinético da musculatura lisa. A dipirona alivia a cólica sem deprimir a motilidade propulsiva fisiológica nem causar a estase gástrica provocada pela morfina. Em associação com antieméticos (maropitant), forma um protocolo de conforto de primeira linha.',
      monitoring: 'Palpação da parede abdominal, presença de postura em prece, náusea e frequência de evacuação.',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-nelson-couto-6'],
      evidenceLevel: 'Consenso de emergência e terapia intensiva (Plumb\'s 10ª ed. e BSAVA 10ª ed.)',
    },
    {
      id: 'det-hipertermia',
      indication: 'Pirexia e controle de febre refratária de causa infecciosa ou inflamatória',
      clinicalContext: 'Sepse, pneumonias bacterianas, piometra, peritonite séptica, abcessos profundos e febre de origem indeterminada com T > 39,5 °C.',
      species: 'both',
      dose: 'Cães: 20 a 25 mg/kg | Gatos: 10 a 12,5 mg/kg',
      route: 'IV lenta ou VO',
      frequency: 'A cada 8 a 12 horas em cães; a cada 12 a 24 horas em gatos, conforme curva térmica.',
      duration: 'Administrar estritamente enquanto a temperatura retal exceder 39,5 °C e houver prostração febril; suspender após normotermia sustentada.',
      mechanismOfAction:
        'Bloqueio potente da biossíntese de prostaglandina E2 (PGE2) mediada por COX microvascular no órgão vascular da lâmina terminal (OVLT) e área pré-óptica hipotalâmica anterior. A supressão de PGE2 desativa o gatilho intracelular de AMPc nas células termorreguladoras, rebaixando imediatamente o setpoint térmico para a faixa fisiológica sem induzir hipotermia se usada isoladamente.',
      clinicalRationale:
        'A febre alta consome reservas metabólicas, acelera o catabolismo proteico e eleva a demanda miocárdica de oxigênio em pacientes graves. A dipirona é mais eficaz e rápida como antipirético do que AINEs convencionais como carprofeno ou meloxicam. ATENÇÃO: Contraindicada em intermação física (golpe de calor), onde a elevação térmica é puramente ambiental e a dipirona agrava a perfusão renal.',
      monitoring: 'Curva térmica retal horária nas primeiras 4 horas; hidratação e pressão arterial.',
      referenceIds: ['ref-plumb-10', 'ref-ettinger-2024', 'ref-nelson-couto-6'],
      evidenceLevel: 'Tratados de Medicina Interna (Ettinger 9ª ed. 2024 e Plumb\'s 10ª ed.)',
    },
    {
      id: 'det-trauma-ddiv',
      indication: 'Analgesia adjuvante em afecções da coluna vertebral (DDIV) e trauma',
      clinicalContext: 'Doença do disco intervertebral estágios I e II, espondilose, contratura muscular paravertebral e contusões por atropelamento ou queda.',
      species: 'both',
      dose: 'Cães: 25 mg/kg | Gatos: 12,5 mg/kg',
      route: 'VO ou IV lenta',
      frequency: 'A cada 8 horas em cães; a cada 12 horas em gatos',
      duration: '3 a 5 dias durante a crise álgica aguda inicial, associada a repouso rigoroso.',
      mechanismOfAction:
        'Supressão da sensibilização central medular nas sinapses de corno dorsal espinhal estimuladas por receptores de NMDA e substância P. A combinação de analgesia somática e efeito relaxante sobre o espasmo muscular reflexo paravertebral alivia a compressão radicular associada.',
      clinicalRationale:
        'Em cães e gatos com discopatia aguda, a dor neuropática e mecânica é intensa. A dipirona atua de forma sinérgica com gabapentina ou pregabalina, viabilizando uma analgesia multimodal balanceada sem os riscos de sedação excessiva ou retenção urinária associados a doses altas de opioides.',
      monitoring: 'Evolução do exame neurológico (reflexos espinhais, propriocepção consciente e tônus vesical), escore de dor à palpação epaxial.',
      referenceIds: ['ref-plumb-10', 'ref-nelson-couto-6', 'ref-bsava-10'],
      evidenceLevel: 'Guias de conduta clínica e consensos neurológicos',
    },
    {
      id: 'det-espasmo-urinario',
      indication: 'Espasmo uretral e dor do trato urinário inferior (DTUIF e cistites)',
      clinicalContext: 'Pós-desobstrução uretral em felinos machos, cistite idiopática felina obstrutiva e não obstrutiva, e cistite litiásica em cães.',
      species: 'both',
      dose: 'Cães: 25 mg/kg | Gatos: 10 a 12,5 mg/kg',
      route: 'IV lenta diluída ou VO (em cápsula para evitar ptialismo)',
      frequency: 'A cada 8 horas em cães; a cada 12 horas em gatos',
      duration: '24 a 48 horas nas primeiras fases pós-desobstrução.',
      mechanismOfAction:
        'Redução do espasmo da musculatura lisa do esfíncter uretral interno e trígono vesical mediada por antagonismo de bradicinina e modulação nociceptiva visceral pélvica.',
      clinicalRationale:
        'O reespasmo uretral após a remoção da sonda urinária em felinos desobstruídos é uma das principais causas de reobstrução precoce. A dipirona alivia a disúria e o tenesmo vesical, facilitando a micção espontânea sem provocar a hipotensão intensa frequentemente induzida por bloqueadores alfa-1 puros.',
      monitoring: 'Débito urinário horário, coloração da urina, palpação de vesícula urinária e função renal (ureia/creatinina).',
      referenceIds: ['ref-plumb-10', 'ref-bsava-10', 'ref-ferreira-2019'],
      evidenceLevel: 'Prática de emergência e diretrizes de manejo felino',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'A dipirona comporta-se como um pró-fármaco quase desprovido de atividade intrínseca direta; após administração oral ou intravenosa, sofre hidrólise não enzimática quase instantânea no trato gastrointestinal e plasma para 4-metilaminoantipirina (4-MAA). A biodisponibilidade da 4-MAA após administração oral em cães atinge aproximadamente 85%, com concentração plasmática de pico (Cmax) alcançada entre 1,5 e 2 horas após a ingestão. Por via intramuscular, a absorção é rápida, atingindo o pico plasmático em cerca de 35 a 40 minutos (0,6 h). Em gatos saudáveis, a absorção oral é extensa, mas a concentração máxima de 4-MAA é mais tardia, ocorrendo por volta de 5 a 6 horas após a dosagem oral.',
    distribution:
      'A 4-MAA exibe ampla distribuição tecidual hidrofílica e lipofílica moderada, com volume de distribuição aparente no estado de equilíbrio (Vss) de 5,0 a 7,5 L/kg em cães e cerca de 1,0 a 1,4 L/kg em gatos. A taxa de ligação às proteínas plasmáticas é relativamente baixa a moderada (aproximadamente 50% a 58%), diferindo marcadamente dos AINEs tradicionais (como meloxicam e carprofeno, que se ligam em >99% à albumina), o que reduz drasticamente o risco de deslocamento de outros fármacos e propicia rápida penetração tecidual e penetração livre na barreira hematoencefálica.',
    metabolism:
      'No fígado, o metabólito ativo primário 4-MAA sofre desmetilação oxidativa mediada pelo complexo do citocromo P450 para 4-aminoantipirina (4-AA), que também possui discreta atividade analgésica em humanos, embora em concentrações muito menores em animais. Subsequentemente, a 4-AA é acetilada pela N-acetiltransferase para 4-acetilaminoantipirina (4-AAA, inativa) e oxidada para 4-formilaminoantipirina (4-FAA, inativa). Na espécie felina, a capacidade de glicuronidação limitada não restringe a eliminação da dipirona como ocorre com o paracetamol, uma vez que sua via catabólica central é dependente de desmetilação e acetilação enzimática; no entanto, o clearance hepático é mais lento que no cão.',
    elimination:
      'A meia-vida de eliminação plasmática terminal (t1/2) da 4-MAA é de aproximadamente 4,5 a 6 horas em cães saudáveis, com taxa de depuração plasmática sistêmica (clearance) de 552 a 921 mL/kg/h. Em gatos, a meia-vida é discretamente maior (cerca de 6,0 a 7,5 horas) e a depuração significativamente menor (92 a 131 mL/kg/h), justificando plenamente o regime posológico felino mais conservador (intervalos de 12 a 24 horas). A excreção final é predominantemente renal (cerca de 90% da dose eliminada na urina na forma de metabólitos inativos conjugados e hidroxilados).',
    cnsPenetration:
      'Alta permeabilidade liquórica: concentrações efetivas de 4-MAA são detectadas no líquido cefalorraquidiano em níveis suficientes para inibir a COX-3 central e modular a liberação medular de neurotransmissores álgicos dentro de 30 minutos pós-injeção.',
    plasmaBinding: '50% a 58% (baixo a moderado; não compete agressivamente por sítios de ligação da albumina).',
    halfLife: 'Cães: ~6 horas | Gatos: ~6 a 7,5 horas.',
  },

  generalInfoData: {
    routesDetailed: [
      {
        route: 'Intravenosa (IV lenta)',
        technique:
          'Infundir SEMPRE de forma lenta ao longo de pelo menos 2 a 5 minutos. É altamente recomendável diluir a dose calculada em 10 a 20 mL de Solução Fisiológica (NaCl 0,9%) ou Glicose a 5%.',
        nursingCare:
          'NUNCA aplicar em bólus rápido ("em jato" de 2 segundos). A injeção intravenosa rápida pode induzir vasodilatação periférica reflexa e queda abrupta da pressão arterial média (PAM), provocando tontura transitória, fraqueza, náusea e síncope em animais hipovolêmicos.',
        limitations: 'Evitar em cateteres venosos com refluxo sanguíneo inadequado ou periféricos muito tromboflebíticos.',
      },
      {
        route: 'Intramuscular (IM profunda)',
        technique:
          'Utilizar agulha de calibre apropriado e realizar injeção profunda em massas musculares amplas, preferencialmente no músculo quadríceps femoral ou na musculatura epaxial lombar.',
        nursingCare:
          'Soluções injetáveis concentradas (500 mg/mL) possuem pH ligeiramente ácido e hiperosmolaridade local, podendo provocar dor e desconforto passageiro na picada. Dividir o volume se a dose ultrapassar 2 a 3 mL por ponto de injeção em cães de médio porte.',
        limitations: 'Contraindicada em pacientes com coagulopatias severas ou suspeita de trombocitopenia imunomediada (risco de hematoma intramuscular).',
      },
      {
        route: 'Oral (VO)',
        technique:
          'Comprimidos podem ser administrados diretamente na base da língua ou envoltos em petisco úmido. Em gatos, se for utilizada a solução líquida, é imperativo o envase em cápsulas gelatinosas ou diluição em veículo palatável.',
        nursingCare:
          'A dipirona líquida tem sabor excessivamente amargo. Em felinos, o contato direto da solução pura com a mucosa oral desencadeia ptialismo profuso de estresse que pode assustar o tutor e inviabilizar o tratamento.',
        limitations: 'Em pacientes com vômitos frequentes ou estase gástrica aguda, preferir a via parenteral inicial.',
      },
    ],
    pharmacologicalClassification: {
      chemicalClass: 'Derivado pirazolônico (noramidopirina metanossulfonato sódico / sulfonato de metilaminoantipirina).',
      therapeuticClass: 'Analgésico periférico e central, antipirético de ação rápida e antiespasmódico não-opioide (AINE atípico).',
      atcCode: 'QN02BB02',
      receptorTargets: ['Ciclo-oxigenase central (COX-3 / COX-1b)', 'Receptores Canabinoides CB1 centrais', 'Canais de cálcio dependentes de voltagem em músculo liso'],
      detailedTargets: [
        {
          target: 'Ciclo-oxigenase Central (COX-3 / variante funcional COX-1b)',
          action: 'Inibição seletiva da síntese central de prostaglandina E2 (PGE2) no hipotálamo e corno dorsal medular em ambiente com baixas concentrações de hidroperóxidos lipídicos.',
          clinicalSignificance: 'Gera potente analgesia e antipirese central sem desencadear as lesões ulcerogênicas gástricas e a toxicidade tubular renal típicas dos AINEs clássicos periféricos.',
        },
        {
          target: 'Sistema Endocanabinoide e Receptores CB1 Espinhais',
          action: 'O metabólito primário 4-MAA é conjugado pela enzima FAAH ao ácido araquidônico, gerando metabólito bioativo que atua como agonista de receptores canabinoides CB1 e ativador de canais TRPA1.',
          clinicalSignificance: 'Amplifica a via inibitória descendente da dor na substância cinzenta periaquedutal (PAG) e corno dorsal medular, conferindo analgesia multimodal sinérgica independente de opioides.',
        },
        {
          target: 'Canais de Cálcio Dependentes de Voltagem em Musculatura Lisa Visceral',
          action: 'Inibição direta do influxo de cálcio extracelular e redução da liberação intracelular mediada por fosfolipase C / IP3 nas células musculares lisas de órgãos ocos.',
          clinicalSignificance: 'Proporciona relaxamento espasmolítico imediato em cólicas gastrointestinais, biliares e espasmos uretrais/vesicais, sem paralisar a motilidade fisiológica basal.',
        },
      ],
    },
    prescriptionType: {
      category: 'Receita Médica Veterinária Simples (Sem retenção de receita)',
      ordinanceOrLaw: 'Legislação MAPA (Instrução Normativa nº 35/2017) e RDC ANVISA para especialidades farmacêuticas de uso humano.',
      retentionRequired: false,
      guidelines:
        'A dipirona é um medicamento de venda sob prescrição veterinária, mas não se enquadra na Portaria SVS/MS nº 344/1998 nem no controle de substâncias psicotrópicas. Não exige notificação de receita nem retenção obrigatória de via na farmácia, sendo prescrita em receituário simples (via única para o tutor ou 2 vias para controle de prontuário).',
    },
    dilutionGuide: {
      compatibleFluids: [
        'Solução Fisiológica (Cloreto de Sódio 0,9% - SF 0,9%) — DILUENTE DE ESCOLHA',
        'Solução de Glicose a 5% (SG 5%)',
        'Solução de Glico-Fisiológica (Dextrose 5% + NaCl 0,9%)',
        'Solução de Ringer Simples',
        'Solução de Ringer com Lactato (SRL) — compatível fisicamente',
      ],
      incompatibleFluids: [
        'Soluções fortemente alcalinas (como Bicarbonato de Sódio 8,4%) — risco de degradação e alteração química',
        'Soluções com pH excessivamente ácido ou soluções oxidantes',
        'Emulsões lipídicas de nutrição parenteral e Propofol — risco de quebra da emulsão e precipitação',
        'Não associar ou misturar na MESMA SERINGA com antibióticos (especialmente ampicilina, cefalosporinas) ou com outros analgésicos antes da infusão',
      ],
      infusionRateGuidance:
        'A infusão intravenosa deve ser SEMPRE LENTA. Recomenda-se aspirar a dose calculada de dipirona injetável (500 mg/mL) e diluir em uma seringa de 10 mL ou 20 mL contendo SF 0,9%, administrando de forma gradual ao longo de 2 a 5 minutos (ou em bolsa de 50–100 mL de infusão contínua em 15 minutos). NUNCA administrar em bólus intravenoso rápido em menos de 10 segundos, sob risco de vasodilatação periférica transitória, tontura e hipotensão arterial aguda.',
      preparationNotes:
        'A solução injetável de 500 mg/mL é clara, límpida, transparente ou ligeiramente amarelada. Não utilizar frascos com precipitação, turbidez ou alteração evidente de coloração. Descartar sobras de frascos multi-dose conforme as normas da CCIH hospitalar.',
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Cães: excelente tolerância clínica e ampla margem posológica',
        description:
          'Cães toleram a dipirona extraordinariamente bem em protocolos agudos (1 a 5 dias). Sua capacidade hepática de desmetilação e oxidação de 4-MAA garante clearance eficiente (552–921 mL/kg/h). A incidência de úlceras gástricas é infinitamente menor do que com AINEs clássicos não esteroidais (como aspirina, cetoprofeno ou piroxicam). Em doses de até 25 mg/kg q8h, os efeitos sobre a integridade da barreira gastrointestinal e função glomerular são desprezíveis em pacientes normovolêmicos.',
        clinicalImplications:
          'Fármaco de escolha para compor a base analgésica em pós-operatório hospitalar e ambulatorial em cães de todas as idades, isolado ou associado a opioides e paracetamol veterinário.',
      },
      {
        species: 'cat',
        title: 'Gatos: amargor extremo, ptialismo reflexo e metabolismo mais lento',
        description:
          'Diferente do mito popular de que "dipirona é proibida para gatos", a droga NÃO é contraindicada na espécie felina quando utilizada nas doses e intervalos corretos. O gato metaboliza a dipirona por desmetilação e acetilação (não sendo dependente estrita da glicuronidação, deficiente na espécie). Contudo, o clearance da 4-MAA em gatos é cerca de 5 a 6 vezes menor que no cão (92–131 mL/kg/h), e a meia-vida é mais longa (~7 horas). Além disso, os eritrócitos felinos possuem hemoglobina rica em grupos sulfidrila (-SH), tornando-os mais vulneráveis a estresse oxidativo com risco de corpúsculos de Heinz ou meta-hemoglobinemia se doses supraterapêuticas ou tratamentos crônicos forem administrados.',
        clinicalImplications:
          'Regra de ouro felina: limitar a dose a 10–12,5 mg/kg a cada 12 horas ou 25 mg/kg a cada 24 horas, durante no máximo 48 a 72 horas consecutivas. NUNCA gotejar Novalgina gotas direto na boca do gato: o amargor causa salivação espumosa desesperadora. Prescrever em cápsula ou forma injetável hospitalar.',
      },
    ],
    curiositiesAndHistory: [
      'Origem e síntese: A dipirona foi sintetizada inicialmente em 1920 pela indústria alemã Hoechst AG e introduzida na medicina mundial em 1922 com o nome comercial Novalgin®, transformando o tratamento da febre e dor nas décadas seguintes.',
      'A controvérsia do FDA de 1977: O FDA baniu a dipirona para humanos nos Estados Unidos em 1977 após relatos associando o uso a casos de agranulocitose (neutropenia grave fatal). No entanto, o monumental estudo internacional multicêntrico "Boston Study" (International Agranulocytosis and Aplastic Anemia Study) demonstrou subsequentemente que o risco em humanos é extremamente baixo, estimado em apenas 1,1 caso por milhão de semanas de uso, explicando por que permanece como o analgésico de primeira linha mais vendido no Brasil, Alemanha, Espanha e em grande parte da América Latina e Europa.',
      'Aprovação histórica da FDA para equinos (Zimeta®): Em novembro de 2019 / janeiro de 2020, o FDA aprovou formalmente a primeira apresentação injetável de dipirona nos Estados Unidos para uso veterinário (Zimeta® - NADA 141-513), aprovada especificamente para controle de febre em equinos, confirmando a relevância clínica do princípio ativo.',
      'Ausência de agranulocitose em cães e gatos: A agranulocitose associada a pirazolonas é uma reação idiossincrática imunomediada humana dependente de HLA genético; não existem relatos comprovados de agranulocitose epidêmica em cães e gatos sob dosagens clínicas recomendadas.',
    ],
  },

  attentionData: {
    precautions: [
      {
        condition: 'Hipotensão arterial sistêmica, choque distributivo e hipovolemia descompensada',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Em animais hipovolêmicos ou em choque séptico/hemorrágico, o tônus vasomotor arteriolar depende criticamente de mecanismos compensatórios neuroendócrinos e prostaglandinas vasodilatadoras de preservação de leitos nobres. A injeção de dipirona (especialmente se rápida) promove bloqueio dos canais de cálcio vasculares e liberação de óxido nítrico endotelial, induzindo vasodilatação imediata da capacitância venosa e arteriolar. Em animais sem pré-carga adequada, a pressão arterial média colapsa, resultando em choque hemodinâmico secundário e isquemia cerebral/miocárdica aguda.',
        clinicalAction:
          'Contraindicada em pacientes com hipotensão não corrigida. Realizar ressuscitação volêmica prévia com cristaloides por metas antes da administração analgésica.',
      },
      {
        condition: 'Intermação térmica física (golpe de calor / insolação grave)',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A hipertermia do golpe de calor não é uma febre mediada por citocinas hipotalâmicas e PGE2, mas sim uma sobrecarga física exógena de ganho térmico ambiental sem alteração do setpoint hipotalâmico. A dipirona é totalmente inútil para dissipar calor mecânico e, por promover potencial estresse endotelial e renal em pacientes já acometidos por rabdomiólise e CID, é estritamente contraindicada.',
        clinicalAction:
          'O manejo do golpe de calor exige resfriamento físico ativo (água em temperatura ambiente, ar forçado) e fluidoterapia com cristaloides; NUNCA administrar antipiréticos.',
      },
      {
        condition: 'Discrasias hematológicas primárias e mielossupressão grave',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'Embora a mielotoxicidade direta seja rara em pequenos animais, derivados pirazolônicos podem exibir toxicidade oxidativa ou citotoxicidade idiossincrática sobre precursores granulocíticos e eritroides em medulas ósseas já comprometidas ou hipoplásicas.',
        clinicalAction:
          'Não prescrever em pacientes com pancitopenia idiopática, anemia aplástica ou suspeita de mielodisplasia primária.',
      },
      {
        condition: 'Insuficiência renal aguda (LRA) ou Doença renal crônica (DRC) em estágios avançados (IRIS 3 e 4)',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Embora a dipirona tenha perfil nefroprotetor muito superior aos AINEs carboxílicos clássicos, seus metabólitos sofrem eliminação primariamente renal (cerca de 90%). Em rins hipoperfundidos ou com perda maciça de néfrons funcionais, o clearance de 4-MAA e de seus derivados polares reduz sensivelmente, gerando acúmulo sistêmico e sobrecarga de eliminação tubular.',
        clinicalAction:
          'Em nefropatas compensados, espaçar o intervalo de administração para q12h ou q24h; assegurar hidratação contínua e monitorar débito urinário e creatinina sérica.',
      },
      {
        condition: 'Hepatopatias graves, falência hepática ou cirrose avançada',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A dipirona depende estritamente do metabolismo microssomal hepático para a conversão de pró-fármaco em 4-MAA e desta em metabólitos terminais inativos. Em pacientes cirróticos ou com insuficiência funcional de hepatócitos, a depuração de 4-MAA decai em mais de 50%, prolongando a meia-vida e elevando as concentrações de pico.',
        clinicalAction:
          'Reduzir a dose em 30% a 50% ou dobrar o intervalo de administração. Monitorar enzimas hepáticas e bilirrubinas.',
      },
      {
        condition: 'Pacientes cardiopatas com ICC descompensada e restrição severa de sódio',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A dipirona sódica comercial contém aproximadamente 34 mg de sódio elementar por grama de princípio ativo. Em cardiopatas congestivos graves que requerem restrição estrita de sódio para controle de edema pulmonar ou ascite, a sobrecarga de sódio parenteral pode contribuir para retenção hídrica.',
        clinicalAction:
          'Monitorar equilíbrio hidroeletrolítico e sinais de congestão venosa; priorizar formas magnésicas se disponíveis ou ajustar diuréticos conforme avaliação cardiológica.',
      },
      {
        condition: 'Sedação concomitante com fenotiazínicos sem suporte térmico',
        alertLevel: 'caution',
        physiologicalExplanation:
          'A combinação de bloqueio de termorregulação central pela dipirona com a vasodilatação alfa-1 adrenérgica periférica da acepromazina predispõe a rápida perda de calor corporal em ambientes frios.',
        clinicalAction:
          'Prover monitorização contínua de temperatura corpórea, colchão térmico e evitar ambientes frios durante o período perianestésico.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Ptialismo reflexo severo (salivação espumosa) em gatos',
        frequency: 'common',
        mechanism:
          'Desencadeado pela estimulação gustativa imediata de papilas linguais pelo sabor excessivamente amargo e persistente das gotas líquidas de dipirona, ativando os centros parassimpáticos salivares e estresse adrenérgico agudo.',
        clinicalManagement:
          'Não forçar a deglutição de gotas líquidas puras na mucosa felina. Prescrever manipulação em cápsulas gelatinosas gastrorresistentes ou utilizar a via parenteral em regime internado.',
      },
      {
        effect: 'Inibição transitória e reversível da agregação plaquetária',
        frequency: 'common',
        mechanism:
          'Bloqueio reversível da ciclo-oxigenase 1 (COX-1) nas plaquetas enquanto o metabólito 4-MAA estiver em circulação, reduzindo temporariamente a síntese de tromboxano A2 (TXA2). Ao contrário da aspirina (que acetila irreversivelmente a COX-1 plaquetária), a função hemostática normaliza-se à medida que os níveis séricos do fármaco declinam.',
        clinicalManagement:
          'Suspender o uso com antecedência caso o paciente vá ser submetido a cirurgias com alto risco hemorrágico ou se houver diátese hemorrágica manifesta.',
      },
      {
        effect: 'Hipotensão arterial sistêmica e vasodilatação periférica transitória',
        frequency: 'uncommon',
        mechanism:
          'Ocorre primariamente quando a administração intravenosa é realizada em bólus veloz (<30 segundos). O excesso transitório de princípio ativo no leito vascular estimula a via endotelial L-arginina/óxido nítrico e o relaxamento direto dos canais de cálcio da musculatura lisa arterial.',
        clinicalManagement:
          'Infundir a solução sempre lentamente em 2 a 5 minutos, preferencialmente diluída em 10–20 mL de SF 0,9%. Em caso de hipotensão documentada, interromper a infusão e administrar um pequeno bólus volêmico cristaloide (5–10 mL/kg).',
      },
      {
        effect: 'Dor e inflamação no sítio de injeção intramuscular ou subcutânea',
        frequency: 'uncommon',
        mechanism:
          'Hiperosmolaridade da solução 500 mg/mL associada ao conservante (álcool benzílico) provocando irritação tecidual mecânico-química transitória nas fáscias musculares e tecido subcutâneo.',
        clinicalManagement:
          'Utilizar técnica de injeção intramuscular profunda em grande massa muscular e massagear levemente. Em animais de pequeno porte, fracionar em dois sítios anatômicos se volume > 1,5 mL.',
      },
      {
        effect: 'Sedação leve transitória ou letargia pós-administração',
        frequency: 'uncommon',
        mechanism:
          'Ação central decorrente da penetração de metabólitos lipofílicos no SNC e modulação de receptores canabinoides CB1 espinhais e supraespinhais envolvidos na modulação nociceptiva.',
        clinicalManagement:
          'Efeito autolimitado sem repercussão hemodinâmica ou respiratória importante; orientar o tutor sobre a sonolência passageira.',
      },
      {
        effect: 'Hipotermia transitória (especialmente sob sedação ou animais febris)',
        frequency: 'rare',
        mechanism:
          'Queda abrupta do setpoint termorregulador hipotalâmico aliada a leve vasodilatação cutânea em pacientes com massa corporal reduzida ou sob ação concomitante de sedativos.',
        clinicalManagement:
          'Monitorar temperatura corpórea, manter o paciente em ambiente aquecido e fornecer suporte térmico passivo (cobertores aquecidos).',
      },
      {
        effect: 'Êmese, náusea aguda ou fezes amolecidas transitórias',
        frequency: 'rare',
        mechanism:
          'Irritação gástrica direta por doses orais elevadas em jejum ou estimulação vagal quimiorreceptora reflexa.',
        clinicalManagement:
          'Administrar após refeições ou associar a protetor de mucosa caso ocorra desconforto gástrico.',
      },
      {
        effect: 'Reações de hipersensibilidade cutânea e prurido transitório',
        frequency: 'rare',
        mechanism:
          'Reações pseudoalérgicas anafilactoides decorrentes de desgranulação de mastócitos não mediada por IgE ou reações de hipersensibilidade tipo I a derivados pirazolônicos.',
        clinicalManagement:
          'Suspender a medicação imediatamente; caso haja urticária, angioedema ou prurido intenso, administrar anti-histamínicos (difenidramina) e corticoide de ação rápida se necessário.',
      },
      {
        effect: 'Corpúsculos de Heinz e estresse oxidativo eritrocitário (gatos sob doses elevadas)',
        frequency: 'very_rare',
        mechanism:
          'Oxidação dos grupamentos sulfidrila da hemoglobina felina provocada por metabólitos oxidantes intermediários em tratamentos com doses supraterapêuticas (>30 mg/kg/dia) ou por períodos contínuos superiores a 5 dias.',
        clinicalManagement:
          'Respeitar estritamente a janela terapêutica de 10 a 12,5 mg/kg q12h por no máximo 48–72h em felinos. Acompanhar hemograma e esfregaço sanguíneo.',
      },
      {
        effect: 'Mielossupressão / Agranulocitose transitória idiossincrática',
        frequency: 'very_rare',
        mechanism:
          'Reação imunomediada raríssima descrita em mamíferos domésticos, decorrente de geração de autoanticorpos contra neutrófilos e precursores mieloides desencadeada por haptenos pirazolônicos.',
        clinicalManagement:
          'Interromper imediatamente o tratamento e instituir suporte com isolamento reverso, antibioticoterapia profilática e acompanhamento seriado do leucograma.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Doença Renal Crônica (DRC) — Estágios IRIS 3 e 4',
        recommendedAdjustment: 'Espaçar o intervalo de administração para cada 12 a 24 horas em cães e cada 24 horas em gatos, assegurando hidratação contínua.',
        physiologicalRationale:
          'Embora a metabolização inicial ocorra no fígado, cerca de 90% dos metabólitos polares ativos e inativos (4-MAA, 4-AA, 4-FAA, 4-AAA) dependem exclusivamente de filtração glomerular e secreção tubular para depuração corporal. Com a perda maciça de néfrons viáveis, a retenção de metabólitos prolonga a meia-vida sérica.',
      },
      {
        clinicalCondition: 'Insuficiência Hepática Crônica, Shunt Portossistêmico e Cirrose',
        recommendedAdjustment: 'Reduzir a dose habitual em 30% a 50% ou dobrar o intervalo terapêutico (q12h em cães, q24h em gatos). Evitar doses repetidas superiores a 48h.',
        physiologicalRationale:
          'A conversão do pró-fármaco em metabólito ativo 4-MAA e a subsequente metabolização pelas isoenzimas microssomais hepáticas do CYP450 sofrem drástica lentificação. Pacientes com insuficiência hepatocelular exibem clearance reduzido em mais de 50%, aumentando as concentrações séricas de pico.',
      },
      {
        clinicalCondition: 'Pacientes Geriátricos Debilitados ou com Caquexia Severa',
        recommendedAdjustment: 'Adotar posologia no limite inferior (20 mg/kg em cães e 10 mg/kg em gatos) com intervalo estendido de 12 horas.',
        physiologicalRationale:
          'Geriátricos apresentam declínio senil fisiológico da taxa de filtração glomerular (TFG), redução da massa muscular e da perfusão esplâncnica, associado à hipoalbuminemia que pode aumentar ligeiramente a fração livre farmacologicamente ativa.',
      },
      {
        clinicalCondition: 'Espécie Felina (Protocolo Adaptado à Espécie)',
        recommendedAdjustment: 'Limitar a 10–12,5 mg/kg a cada 12 horas ou 25 mg/kg a cada 24 horas, não ultrapassando 48 a 72 horas consecutivas.',
        physiologicalRationale:
          'O clearance plasmático da 4-MAA em gatos é cerca de 5 vezes menor que no cão (92–131 mL/kg/h) e a hemoglobina felina possui 8 grupamentos sulfidrila reativos altamente suscetíveis à oxidação por metabólitos intermediários.',
      },
      {
        clinicalCondition: 'Pacientes Neonatos e Pediátricos (< 8 semanas de vida)',
        recommendedAdjustment: 'Utilizar doses conservadoras (15–20 mg/kg em cães e 10 mg/kg em gatos) com intervalo de 12 horas, apenas se estritamente necessário.',
        physiologicalRationale:
          'Imaturidade dos sistemas enzimáticos microssomais hepáticos do citocromo P450 e taxa de filtração glomerular renal ainda em desenvolvimento funcional pleno.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Fenotiazínicos (Acepromazina, Clorpromazina)',
        severity: 'contraindicated',
        clinicalEffect: 'Hipotermia profunda grave, hipotensão arterial e colapso termorregulador.',
        pharmacologicalMechanism:
          'Ocorre somação desreguladora no centro termorregulador hipotalâmico: a dipirona bloqueia a produção de PGE2 enquanto a acepromazina bloqueia os receptores dopaminérgicos centrais da termogênese e promove vasodilatação periférica alfa-1 bloqueadora maciça, impedindo a vasoconstrição de resposta ao frio.',
      },
      {
        drugOrClass: 'AINEs Convencionais (Meloxicam, Cetoprofeno, Carprofeno, Flunixin)',
        severity: 'major',
        clinicalEffect: 'Inibição antiplaquetária cumulativa e risco potencial de sobrecarga hemodinâmica renal.',
        pharmacologicalMechanism:
          'A dupla inibição de COX-1 plaquetária pela dipirona e pelo AINE clássico bloqueia completamente a síntese de tromboxano A2 (TXA2). Embora ensaios em cães (Teixeira et al., 2013) demonstrem excelente tolerância analgésica sob monitoramento na cirurgia limpa, o uso concomitante indiscriminado em animais hipovolêmicos pode precipitar insuficiência renal aguda por queda abrupta da perfusão capilar renal.',
      },
      {
        drugOrClass: 'Corticosteroides (Prednisolona, Dexametasona, Triancinolona)',
        severity: 'major',
        clinicalEffect: 'Maior risco cumulativo de erosão, gastrite e úlcera gastroduodenal.',
        pharmacologicalMechanism:
          'Apesar do perfil gástrico benéfico da dipirona, os corticosteroides inibem a fosfolipase A2 e esgotam o muco e o bicarbonato protetores da barreira epitelial gástrica. A associação deve ser criteriosamente justificada e acompanhada de gastroprotetores.',
      },
      {
        drugOrClass: 'Anticoagulantes e Antiplaquetários (Heparina, Varfarina, Clopidogrel)',
        severity: 'major',
        clinicalEffect: 'Prolongamento do tempo de sangramento e potencial diátese hemorrágica.',
        pharmacologicalMechanism:
          'A dipirona inibe temporariamente a agregação plaquetária primária; associada à anticoagulação secundária (heparina/varfarina) ou inibição do receptor P2Y12 (clopidogrel), amplifica significativamente a tendência a sangramento em napa.',
      },
      {
        drugOrClass: 'Fenobarbital e outros Indutores de CYP450',
        severity: 'moderate',
        clinicalEffect: 'Aceleração do metabolismo da dipirona e encurtamento da duração da analgesia.',
        pharmacologicalMechanism:
          'O fenobarbital induz as enzimas hepáticas microssomais responsáveis pela desmetilação de 4-MAA, reduzindo sua meia-vida de eliminação e diminuindo o tempo de alívio da dor.',
      },
      {
        drugOrClass: 'Ciclosporina',
        severity: 'moderate',
        clinicalEffect: 'Possível redução das concentrações séricas de ciclosporina.',
        pharmacologicalMechanism:
          'Relatos em medicina humana e farmacologia comparada indicam redução dos níveis plasmáticos de ciclosporina por interferência na absorção e depuração, recomendando-se controle de níveis terapêuticos.',
      },
    ],
    dilutionGuide: {
      compatibleFluids: [
        'Solução Fisiológica (Cloreto de Sódio 0,9% - SF 0,9%) — DILUENTE DE ESCOLHA',
        'Solução de Glicose a 5% (SG 5%)',
        'Solução de Glico-Fisiológica (Dextrose 5% + NaCl 0,9%)',
        'Solução de Ringer Simples',
        'Solução de Ringer com Lactato (SRL) — compatível fisicamente',
      ],
      incompatibleFluids: [
        'Soluções fortemente alcalinas (como Bicarbonato de Sódio 8,4%) — risco de degradação e alteração química',
        'Soluções com pH excessivamente ácido ou soluções oxidantes',
        'Emulsões lipídicas de nutrição parenteral e Propofol — risco de quebra da emulsão e precipitação',
        'Não associar ou misturar na MESMA SERINGA com antibióticos (especialmente ampicilina, cefalosporinas) ou com outros analgésicos antes da infusão',
      ],
      infusionRateGuidance:
        'A infusão intravenosa deve ser SEMPRE LENTA. Recomenda-se aspirar a dose calculada de dipirona injetável (500 mg/mL) e diluir em uma seringa de 10 mL ou 20 mL contendo SF 0,9%, administrando de forma gradual ao longo de 2 a 5 minutos (ou em bolsa de 50–100 mL de infusão contínua em 15 minutos). NUNCA administrar em bólus intravenoso rápido em menos de 10 segundos, sob risco de vasodilatação periférica transitória, tontura e hipotensão arterial aguda.',
      preparationNotes:
        'A solução injetável de 500 mg/mL é clara, límpida, transparente ou ligeiramente amarelada. Não utilizar frascos com precipitação, turbidez ou alteração evidente de coloração. Descartar sobras de frascos multi-dose conforme as normas da CCIH hospitalar.',
    },
  },

  clinicalStudiesCommented: [
    {
      title: 'Eficácia analgésica comparativa no pós-operatório canino de OSH',
      authorsYear: 'Teixeira R, Trindade PH, Monteiro BP, Steagall PV (2013)',
      journal: 'Veterinary Anaesthesia and Analgesia',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego em 30 cadelas submetidas a ovarioisterectomia eletiva.',
      sampleSize: '30 cadelas saudáveis divididas em grupos (Meloxicam isolado vs. Dipirona isolada vs. Combinação Meloxicam + Dipirona).',
      mainFindings:
        'A dipirona (25 mg/kg IV no transoperatório e a cada 8h PO) ofereceu alívio analgésico pós-operatório comparável ao meloxicam nas primeiras 24 horas. A associação de dipirona e meloxicam resultou nos menores escores de dor pós-operatória de toda a coorte e minimizou a necessidade de analgesia de resgate com opioides.',
      clinicalTakeaway:
        'Demonstra que a dipirona é altamente eficaz como pilar de analgesia multimodal pós-operatória em cães, e que sua associação planejada com meloxicam é clinicamente segura e benéfica em animais hemodinamicamente estáveis.',
      referenceId: 'ref-teixeira-2013',
    },
    {
      title: 'Farmacocinética e caracterização dos metabólitos em cães saudáveis',
      authorsYear: 'Giorgi M, Del Carlo S, Łebkowska-Wieruszewska B, et al. (2017)',
      journal: 'Journal of Veterinary Pharmacology and Therapeutics',
      studyDesign: 'Ensaio farmacocinético cruzado de doses únicas (25 mg/kg) pelas vias intravenosa, intramuscular e oral em cães.',
      sampleSize: '6 cães beagles sadios em delineamento cruzado (crossover 3x3).',
      mainFindings:
        'A dipirona não foi detectada no plasma, comprovando hidrólise pré-sistêmica imediata no metabólito ativo 4-MAA. A biodisponibilidade oral foi de 85% e a intramuscular de 97%. A meia-vida de eliminação plasmática foi de cerca de 5,8 horas, sustentando concentrações inibitórias de COX por 8 a 12 horas.',
      clinicalTakeaway:
        'Valida rigorosamente o intervalo de administração de 8 em 8 horas (TID) para a dose de 25 mg/kg em cães, confirmando excelente absorção oral e intramuscular.',
      referenceId: 'ref-giorgi-2017',
    },
    {
      title: 'Farmacocinética, metabolização e segurança na espécie felina',
      authorsYear: 'Giorgi M, Aupanun S, Lee HK, et al. (2018)',
      journal: 'Journal of Feline Medicine and Surgery',
      studyDesign: 'Ensaio farmacocinético de doses únicas pelas vias oral e intravenosa em gatos saudáveis.',
      sampleSize: 'Gatos domésticos adultos saudáveis avaliados por cromatografia líquida de alta resolução (HPLC).',
      mainFindings:
        'Gatos demonstraram metabolização ativa de 4-MAA por vias alternativas à glicuronidação. A meia-vida foi de 6,9 horas, mas o clearance foi sensivelmente menor (cerca de 100 mL/kg/h) do que no cão, indicando menor velocidade de depuração plasmática.',
      clinicalTakeaway:
        'Fornece a justificativa farmacológica definitiva para a prescrição felina a cada 12 ou 24 horas (em vez de q8h), prevenindo o acúmulo sistêmico e garantindo segurança terapêutica.',
      referenceId: 'ref-giorgi-2018',
    },
    {
      title: 'Efeitos antinociceptivos e estabilidade hemodinâmica em felinos conscientes',
      authorsYear: 'Ferreira CG, Steagall PV, Pelligand L, et al. (2019)',
      journal: 'Journal of Veterinary Medical Science',
      studyDesign: 'Estudo experimental antinociceptivo cruzado e avaliação hemodinâmica não invasiva em gatos conscientes.',
      sampleSize: '8 gatos adultos avaliados por nocicepção térmica e mecânica com registro contínuo de pressão arterial.',
      mainFindings:
        'A dipirona (25 mg/kg IV lenta) produziu antinocicepção significativa e sustentada contra estímulos álgicos térmicos e mecânicos por até 12 horas. Quando infundida lentamente em 2 minutos, não causou alterações deletérias na frequência cardíaca ou pressão arterial média.',
      clinicalTakeaway:
        'Comprova que a dipirona possui efeito antinociceptivo mensurável e potente em felinos sem provocar instabilidade hemodinâmica quando administrada por infusão lenta.',
      referenceId: 'ref-ferreira-2019',
    },
  ],
};
