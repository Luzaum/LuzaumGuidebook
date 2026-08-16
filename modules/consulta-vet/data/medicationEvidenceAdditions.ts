import type { EditorialReference } from '../types/common';

/** Artigos com link público adicionados ao acervo para sustentar uso, dose e duração. */
export const MEDICATION_EVIDENCE_ADDITIONS: Record<string, EditorialReference[]> = {
  ondansetron: [
    {
      id: 'ref-ondansetron-sotelo-2022',
      citationText: 'Sotelo CS et al. Pharmacokinetics and anti-nausea effects of intravenous ondansetron in hospitalized dogs exhibiting clinical signs of nausea. J Vet Pharmacol Ther. 2022.',
      sourceType: 'Ensaio clínico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35899472/',
      notes: 'Regime de referência 0,5 mg/kg IV q8h em cães hospitalizados.',
      evidenceLevel: 'Alta',
    },
  ],
  dipirona: [
    {
      id: 'ref-dipirona-cats-pereira-2021',
      citationText: 'Pereira MAA et al. Analgesic efficacy of dipyrone at different doses in cats after ovariohysterectomy. Vet Anaesth Analg. 2021;48:7–16.',
      sourceType: 'Ensaio clínico felino',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33257279/',
      evidenceLevel: 'Moderada',
    },
  ],
  'ampicilina-sulbactam': [
    {
      id: 'ref-amp-sulb-critical-dogs-2025',
      citationText: 'Goggs R et al. Intravenous Ampicillin/Sulbactam in Critically Ill Dogs has Variable Pharmacokinetics. J Vet Pharmacol Ther. 2025.',
      sourceType: 'Estudo PK',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40511602/',
      evidenceLevel: 'Alta',
    },
  ],
  ampicilina: [
    {
      id: 'ref-ampicilina-azotemic-dogs-2021',
      citationText: 'Monaghan KN et al. Ampicillin pharmacokinetics in azotemic and healthy dogs. JVIM. 2021.',
      sourceType: 'Estudo PK',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33474795/',
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-sykes-lepto-2023',
      citationText: 'Sykes JE et al. Updated ACVIM consensus statement on leptospirosis in dogs. JVIM. 2023.',
      sourceType: 'Consenso ACVIM',
      url: 'https://pubmed.ncbi.nlm.nih.gov/37861061/',
      evidenceLevel: 'Alta',
    },
  ],
  'sulfametoxazol-trimetoprima': [
    {
      id: 'ref-tmp-smx-cystitis-rct-2014',
      citationText: 'Clare S et al. Short- and long-term cure rates of short-duration trimethoprim-sulfamethoxazole treatment in female dogs with uncomplicated bacterial cystitis. J Vet Intern Med. 2014;28(3):818-826.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24673608/',
      notes: 'Avaliou TMP-SMX 15 mg/kg VO q12h por 3 dias em cadelas com cistite bacteriana não complicada.',
      evidenceLevel: 'Alta para o cenário estudado',
    },
    {
      id: 'ref-iscaid-uti-2019',
      citationText: 'Weese JS et al. ISCAID guidelines for bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8–25.',
      sourceType: 'Diretriz ISCAID',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30971357/',
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-tmp-smx-thyroid-2005',
      citationText: 'Frank LA et al. Effects of sulfamethoxazole-trimethoprim on thyroid function in dogs. AJVR. 2005;66:256–259.',
      sourceType: 'Estudo experimental',
      url: 'https://pubmed.ncbi.nlm.nih.gov/15757124/',
      evidenceLevel: 'Moderada',
    },
    {
      id: 'ref-tmp-smx-kcs-vetcompass-2026',
      citationText: 'Hardefeldt LY et al. Trimethoprim-sulfonamide-associated keratoconjunctivitis sicca: VetCompass Australia study. JVIM. 2026.',
      sourceType: 'Estudo observacional',
      url: 'https://academic.oup.com/jvim/article/40/1/aalaf013/8429714',
      evidenceLevel: 'Moderada',
    },
    {
      id: 'ref-tmp-smx-adverse-review-2026',
      citationText: 'Ekstrand C et al. Adverse events of trimethoprim-sulphonamide treatment of cats and dogs: a systematic review. 2026.',
      sourceType: 'Revisão sistemática',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41880081',
      evidenceLevel: 'Moderada',
    },
  ],
  'amoxicilina-clavulanato': [
    {
      id: 'ref-amox-clav-uti-rct-1995',
      citationText: 'Passmore CA et al. Comparative study of marbofloxacin and amoxicillin-clavulanic acid in the treatment of urinary tract infections in dogs. J Small Anim Pract. 1995;36(6):245-250.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/8558866/',
      notes: 'Amoxicilina-clavulanato 12,5 mg/kg VO BID por 10 ou 28 dias conforme o diagnóstico no protocolo estudado; durações atuais devem seguir o tipo de ITU e a diretriz vigente.',
      evidenceLevel: 'Moderada; estudo antigo e duração dependente do diagnóstico',
    },
    {
      id: 'ref-iscaid-pyoderma-2025',
      citationText: 'Loeffler A et al. Antimicrobial use guidelines for canine pyoderma by ISCAID. Veterinary Dermatology. 2025;36:234–282.',
      sourceType: 'Diretriz ISCAID',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12058580/',
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-clavamox-fda',
      citationText: 'FDA/CVM — CLAVAMOX prescribing information. 6,25 mg/lb BID cães; 62,5 mg/gato BID.',
      sourceType: 'Bula FDA',
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=d342d015-0775-4f4a-98fe-e792b9895596',
      evidenceLevel: 'Alta (rótulo)',
    },
  ],
  pregabalina: [
    {
      id: 'ref-pregabalin-cm-sm-rct-2019',
      citationText: 'Sanchis-Mora S et al. Pregabalin for the treatment of syringomyelia-associated neuropathic pain in dogs: a randomised, placebo-controlled, double-masked clinical trial. Vet J. 2019;250:55-62.',
      sourceType: 'Ensaio clínico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/31383420/',
      notes: 'Sustenta eficácia em dor neuropática associada a malformação de Chiari/siringomielia em cães; consultar o protocolo do artigo para titulação e duração.',
      evidenceLevel: 'Moderada; amostra pequena e indicação específica',
    },
    {
      id: 'ref-pregabalin-cats-dose-rct-2024',
      citationText: 'Effect of oral administration of pregabalin on physiological and echocardiographic variables in healthy cats. J Feline Med Surg. 2024.',
      sourceType: 'Ensaio randomizado cruzado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39073981/',
      notes: 'Comparou dose única de 2,5, 5 e 10 mg/kg em gatos e documentou sedação e efeitos fisiológicos.',
      evidenceLevel: 'Moderada para dose única em gatos saudáveis',
    },
  ],
  maropitant: [
    {
      id: 'ref-maropitant-dogs-rct-2008',
      citationText: 'Ramsey DS et al. Safety and efficacy of injectable and oral maropitant in a randomized clinical trial for treatment of vomiting in dogs. J Vet Pharmacol Ther. 2008;31(6):538-543.',
      sourceType: 'Ensaio clínico multicêntrico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19000277/',
      notes: 'Avaliou 1 mg/kg SC inicialmente e, nos dias 1-4 seguintes, SC ou pelo menos 2 mg/kg VO a cada 24 horas conforme necessidade.',
      evidenceLevel: 'Alta para vômito agudo em cães',
    },
    {
      id: 'ref-maropitant-ckd-cats-rct-2015',
      citationText: 'Quimby JM et al. Chronic use of maropitant for the management of vomiting and inappetence in cats with chronic kidney disease: a blinded, placebo-controlled clinical trial. J Feline Med Surg. 2015;17(8):692-697.',
      sourceType: 'Ensaio clínico randomizado e cego',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25336450/',
      notes: 'Avaliou 4 mg por gato VO q24h por 2 semanas em gatos com DRC IRIS II-III e demonstrou redução do vômito.',
      evidenceLevel: 'Moderada para gatos com DRC estável',
    },
  ],
  benazepril: [
    {
      id: 'ref-benazepril-ckd-cats-rct-2006',
      citationText: 'King JN et al. Tolerability and efficacy of benazepril in cats with chronic kidney disease. J Vet Intern Med. 2006;20(5):1054-1064.',
      sourceType: 'Ensaio clínico multicêntrico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17063696/',
      notes: 'Avaliou 0,5-1,0 mg/kg VO q24h por até 1.119 dias; reduziu proteinúria, sem benefício global de sobrevida renal na população completa.',
      evidenceLevel: 'Alta para efeito antiproteinúrico no cenário estudado',
    },
  ],
  pimobendan: [
    {
      id: 'ref-pimobendan-epic-rct-2016',
      citationText: 'Boswood A et al. Effect of Pimobendan in Dogs with Preclinical Myxomatous Mitral Valve Disease and Cardiomegaly: The EPIC Study. J Vet Intern Med. 2016;30(6):1765-1779.',
      sourceType: 'Ensaio clínico multicêntrico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27678080/',
      notes: 'Avaliou 0,4-0,6 mg/kg/dia divididos em duas administrações em cães com DMVD pré-clínica e cardiomegalia; prolongou o período até o desfecho clínico.',
      evidenceLevel: 'Alta para cães que atendem aos critérios do estágio B2 estudado',
    },
  ],
  benzafibrato: [
    {
      id: 'ref-bezafibrate-dogs-trial-2017',
      citationText: 'De Marco V et al. Therapy of Canine Hyperlipidemia with Bezafibrate. J Vet Intern Med. 2017;31(3):717-722.',
      sourceType: 'Ensaio clínico prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28382723/',
      notes: 'Avaliou 4-10 mg/kg VO q24h por 30 dias em 46 cães com hiperlipidemia primária ou secundária.',
      evidenceLevel: 'Moderada; estudo não controlado',
    },
    {
      id: 'ref-bezafibrate-dogs-long-term-2026',
      citationText: 'Castonguay-Poirier M et al. Long-term safety and efficacy of oral bezafibrate use in dogs with hypertriglyceridemia. J Vet Intern Med. 2026;40(2):aalag041.',
      sourceType: 'Estudo retrospectivo longitudinal',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41818730/',
      notes: 'Uso prolongado com mediana inicial de 5,5 mg/kg VO q24h; acompanhamentos incluíram 1, 3, 6, 12 e mais de 18 meses.',
      evidenceLevel: 'Moderada; retrospectivo',
    },
  ],
  'same-sadenosilmetionina': [
    {
      id: 'ref-same-prednisolone-dogs-2005',
      citationText: 'Center SA et al. Evaluation of the influence of S-adenosylmethionine on systemic and hepatic effects of prednisolone in dogs. Am J Vet Res. 2005;66(2):330-341.',
      sourceType: 'Estudo experimental controlado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/15757136/',
      notes: 'Avaliou SAMe 20 mg/kg/dia divididos em duas doses por 42 dias durante exposição prolongada à prednisolona.',
      evidenceLevel: 'Moderada; cães saudáveis e modelo experimental',
    },
  ],
  'suplementos-hepaticos-silimarina': [
    {
      id: 'ref-silybin-dogs-hepatopathy-2021',
      citationText: 'Silybin supplementation and liver function indices in dogs. BMC Vet Res. 2021;17:228.',
      sourceType: 'Estudo clínico veterinário',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34174886/',
      notes: 'Avaliou silibina pura e hepatoprotetor comercial; documentou tolerabilidade e alterações de marcadores hepáticos, com limitações para extrapolar entre formulações.',
      evidenceLevel: 'Moderada; formulação e população específicas',
    },
    {
      id: 'ref-filburn-silybin-pk-2007',
      citationText: 'Filburn CR et al. Silybin-phosphatidylcholine PK in dogs. J Vet Pharmacol Ther. 2007.',
      sourceType: 'PK',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17348898/',
      evidenceLevel: 'Alta',
    },
  ],
  'acido-ursodesoxicolico': [
    {
      id: 'ref-udca-gbm-dogs-2025',
      citationText: 'Evaluation of Hepatoprotectants in the Management of Subclinical Gallbladder Mucocele in Dogs. Animals. 2025;15(20):3002.',
      sourceType: 'Estudo clínico randomizado',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41153929/',
      notes: 'Comparou UDCA, SAMe+silymarina e terapia combinada com avaliações em 30, 60, 180 e 365 dias em cães com mucocele subclínica.',
      evidenceLevel: 'Moderada; indicação específica e publicação recente',
    },
  ],
  'n-acetilcisteina': [
    {
      id: 'ref-nac-acetaminophen-cats-1980',
      citationText: 'St Omer VV, McKnight ED. Acetylcysteine for treatment of acetaminophen toxicosis in the cat. J Am Vet Med Assoc. 1980;176(9):911-913.',
      sourceType: 'Estudo experimental veterinário',
      url: 'https://pubmed.ncbi.nlm.nih.gov/7400022/',
      notes: 'Avaliou 140 mg/kg VO seguido de repetições a cada 8 horas em gatos intoxicados; protocolos contemporâneos devem ser confirmados em toxicologia veterinária.',
      evidenceLevel: 'Baixa a moderada; estudo antigo e experimental',
    },
  ],
  budesonida: [
    {
      id: 'ref-dye-budesonide-2013',
      citationText: 'Dye TL et al. Randomized, Controlled Trial of Budesonide and Prednisone for IBD in Dogs. JVIM. 2013;27:1385–1391.',
      sourceType: 'RCT',
      url: 'https://doi.org/10.1111/jvim.12195',
      evidenceLevel: 'Moderada',
    },
    {
      id: 'ref-coates-budesonide-2023',
      citationText: 'Coates VA. Budesonide vs prednisolone for chronic enteropathy — evidence review. Veterinary Evidence. 2023;8(4).',
      sourceType: 'Revisão PICO',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42004557/',
      evidenceLevel: 'Moderada',
    },
  ],
  clorambucil: [
    {
      id: 'ref-pope-chlorambucil-2015',
      citationText: 'Pope KV et al. Outcome and toxicity of feline small cell lymphoma: 56 cases. Vet Med Sci. 2015.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1002/vms3.9',
      evidenceLevel: 'Moderada',
    },
  ],
  'desoxicorticosterona-pivalato': [
    {
      id: 'ref-vincent-docp-2021',
      citationText: 'Vincent AM et al. Low-dose DOCP treatment of hypoadrenocorticism in dogs: RCT. JVIM. 2021.',
      sourceType: 'RCT',
      url: 'https://doi.org/10.1111/jvim.16195',
      evidenceLevel: 'Alta',
    },
    {
      id: 'ref-langlois-docp-2026',
      citationText: 'Langlois DK et al. PK/PD of DOCP in dogs with hypoadrenocorticism. JVIM. 2026.',
      sourceType: 'Estudo PK/PD',
      url: 'https://doi.org/10.1093/jvimsj/aalaf003',
      evidenceLevel: 'Alta',
    },
  ],
  metimazol: [
    {
      id: 'ref-fda-felanorm-2024',
      citationText: 'FDA CVM. FDA Approves First Generic Methimazole for Cats — Felanorm® 5 mg/mL. 2024.',
      sourceType: 'Regulatório FDA',
      url: 'https://www.fda.gov/animal-veterinary/cvm-updates/fda-approves-first-generic-methimazole-treating-hyperthyroidism-cats',
      evidenceLevel: 'Alta',
    },
  ],
  'levotiroxina-sodica': [
    {
      id: 'ref-thyro-tabs-label',
      citationText: 'FDA/DailyMed. Thyro-Tabs® Canine — levothyroxine sodium tablets, USP.',
      sourceType: 'Bula FDA',
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=38005382-289a-4293-b58e-b1cda8bc2288',
      evidenceLevel: 'Alta',
    },
  ],
  diltiazem: [
    { id: 'ref-gelzer-digoxin-diltiazem-2009', citationText: 'Gelzer ARM et al. Digoxin + diltiazem for FA in dogs. JVIM. 2009.', sourceType: 'RCT', url: 'https://doi.org/10.1111/j.1939-1676.2009.0301.x', evidenceLevel: 'Alta' },
    { id: 'ref-orca-fa-2023', citationText: 'Pedro B et al. ORCA — optimized rate control in canine FA. JVIM. 2023.', sourceType: 'Estudo clínico', url: 'https://doi.org/10.1111/jvim.16666', evidenceLevel: 'Alta' },
  ],
  digoxina: [
    { id: 'ref-gelzer-digoxin-diltiazem-2009', citationText: 'Gelzer ARM et al. Digoxin + diltiazem for FA in dogs. JVIM. 2009.', sourceType: 'RCT', url: 'https://doi.org/10.1111/j.1939-1676.2009.0301.x', evidenceLevel: 'Alta' },
  ],
  atenolol: [
    { id: 'ref-schober-atenolol-hcm-2013', citationText: 'Schober KE et al. Atenolol in preclinical HCM cats. J Vet Cardiol. 2013.', sourceType: 'Estudo', url: 'https://doi.org/10.1016/j.jvc.2013.03.003', evidenceLevel: 'Moderada' },
  ],
  atropina: [
    { id: 'ref-recover-cpr-2024', citationText: 'Burkitt-Creedon JM et al. 2024 RECOVER Guidelines — CPR. JVECC. 2024.', sourceType: 'Guideline', url: 'https://doi.org/10.1111/vec.13391', evidenceLevel: 'Alta' },
  ],
  selegilina: [
    { id: 'ref-campbell-selegilina-2001', citationText: 'Campbell S et al. Open-label selegiline in CDS. Vet Ther. 2001.', sourceType: 'Estudo clínico', url: 'https://pubmed.ncbi.nlm.nih.gov/19753696/', evidenceLevel: 'Moderada' },
  ],
  fluoxetina: [
    { id: 'ref-hart-fluoxetina-marking-2005', citationText: 'Hart BL et al. Long-term fluoxetine for urine marking in cats. JAVMA. 2005.', sourceType: 'Estudo clínico', url: 'https://pubmed.ncbi.nlm.nih.gov/15702686/', evidenceLevel: 'Moderada' },
  ],
  amitriptilina: [
    { id: 'ref-kruger-amit-fic-2003', citationText: 'Kruger JM et al. Short-term amitriptyline in acute feline LUTD — negative RCT. JAVMA. 2003.', sourceType: 'RCT negativo', url: 'https://pubmed.ncbi.nlm.nih.gov/12675297/', evidenceLevel: 'Alta' },
  ],
  amantadina: [
    { id: 'ref-caterino-amantadina-2025', citationText: 'Caterino C et al. Amantadine for lumbosacral stenosis. BMC Vet Res. 2025.', sourceType: 'Estudo clínico', url: 'https://pubmed.ncbi.nlm.nih.gov/40671053/', evidenceLevel: 'Moderada' },
  ],
};

