import type { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet/diseases/coccidiose-caes-gatos';

/**
 * Cistoisosporose em cães e gatos — síntese editorial ConsultaVET.
 * Prioridade: ESCCAP GL6 2025 > CAPC 2025 > Nelson & Couto 2020 > BSAVA Gastroenterology >
 * Cunningham 2023 > Plumb's 2023 > Litster 2014 > Mitchell 2007 > Daugschies 2000 >
 * Scorza 2021 > Burlison 2022 > Morelli 2025 > Lee 2018 > Ferreira 2019 > Attia 2024 > Souza 2023.
 */
export const coccidioseCaesGatosRecord: DiseaseRecord = {
  id: 'disease-coccidiose-caes-gatos',
  slug: 'coccidiose-caes-gatos',
  title: 'Cistoisosporose em cães e gatos',
  subtitle:
    'Coccidiose intestinal por *Cystoisospora* spp. — diagnóstico coproparasitológico, triazinas e controle ambiental',
  synonyms: [
    'Cistoisosporose',
    'Isosporose',
    'Coccidiose intestinal',
    'Infecção por Cystoisospora',
    'Isospora canis',
    'Isospora felis',
    'Coccidiose por Cystoisospora',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  categories: ['infectologia', 'parasitologia'],
  tags: [
    'Cystoisospora',
    'Isospora',
    'Coccidiose',
    'Cistoisosporose',
    'Protozoo',
    'Diarreia',
    'Coproscopia',
    'Ponazuril',
    'Toltrazuril',
    'Diclazuril',
    'Sulfadimetoxina',
    'Filhotes',
    'Abrigo',
    'Oocistos',
    'ESCCAP',
  ],
  vinReferencePending: true,
  quickSummary:
    'Cistoisosporose é infecção intestinal por *Cystoisospora* spp. (sin. *Isospora*), coccídios hospedeiro-específicos de cães e gatos — não confundir com coccidioidomicose (*Coccidioides*, fungo sistêmico). Filhotes, abrigos e animais debilitados concentram doença clínica; adultos imunocompetentes frequentemente excretam oocistos sem diarreia. Diagnóstico: flutuação fecal seriada com identificação morfológica de oocistos; positivo não prova causalidade isolada em diarreia crônica. Tratamento de primeira linha prático: ponazuril 50 mg/kg VO q24h por 3 dias consecutivos (Litster 2014; ESCCAP GL6) — distinto de dose única 20 mg/kg, menos eficaz. Toltrazuril e diclazuril são alternativas conforme fonte e apresentação; sulfadimetoxina permanece opção clássica. Higiene ambiental (remoção de fezes, desinfecção, limpeza de canis/gatil) é componente terapêutico — reinfecção por oocistos esporulados mimetiza falha. (3)(4)(5)(9)',
  quickDecisionStrip: [
    'Cistoisosporose ≠ coccidioidomicose — *Cystoisospora* é protozoário intestinal; *Coccidioides* é fungo pulmonar/sistêmico sem relação coproparasitológica. (5)(7)',
    'Positivo em fezes ≠ causa única da diarreia — integrar clínica, idade, ambiente e comorbidades (Giardia, helmintos, parvovírus, IBD) antes de fechar conduta. (3)(4)(14)',
    'Filhote/abrigo com diarreia + oocistos: tratar triazina adequada + controle ambiental simultâneo — não só antiparasitário oral isolado. (3)(4)(9)',
    'Ponazuril 50 mg/kg VO q24h × 3 dias — esquema preferencial documentado (Litster 2014; ESCCAP GL6); não substituir por dose única 20 mg/kg como equivalente. (3)(9)',
    'Dose única ponazuril 50 mg/kg ou 20 mg/kg tem eficácia inferior ao esquema de 3 dias — reservar para contextos específicos, não como padrão. (9)',
    'Toltrazuril: dose varia por fonte (≈10–20 mg/kg VO; produtos combinados) — calcular mg/kg real, não “ml genérico” de bula. (3)(8)(11)',
    'Diclazuril: alerta de divergência bibliográfica — 2,5–5 mg/kg (algumas monografias) vs 25 mg/kg (extrapolações) — confirmar apresentação antes de prescrever. (8)(3)',
    'Sulfadimetoxina 50 mg/kg q24h VO por 5–10 dias é alternativa clássica, especialmente quando triazinas indisponíveis — monitorar hidratação e apetite. (5)(10)',
    'Oocistos de *Eimeria* (aves) em fezes caninas/felinas = parasitismo espúrio por ingestão de fezes de aves — não tratar como coccidiose do hospedeiro. (7)(15)',
    'Espécies hospedeiro-específicas: cães (*C. canis*, complexo *C. ohioensis*); gatos (*C. felis*, *C. rivolta*) — não cruzam entre espécies. (4)(7)',
    'PCR/float negativo não exclui infecção recente ou baixa carga — repetir amostras seriadas se alta suspeita clínica. (12)(15)',
    'Reavaliar fezes 7–14 dias pós-tratamento se diarreia persiste; melhora clínica precede negativação laboratorial. (3)(9)(14)',
    'Não tratar contactantes assintomáticos adultos indiscriminadamente — foco em filhotes sintomáticos, surtos e desinfecção ambiental. (3)(4)',
    'Diarreia hemorrágica/febre em filhote: expandir diferencial (parvovírus, coronavírus, salmonela) — coccídio isolado raramente explica quadro grave isolado. (5)(10)(14)',
  ],
  quickSummaryRich: {
    lead:
      'Cistoisosporose combina parasitologia coproparasitológica, reconhecimento morfológico de oocistos e manejo ambiental rigoroso. *Cystoisospora* spp. são coccídios intestinais hospedeiro-específicos — distintos de *Coccidioides* (coccidioidomicose) e de *Eimeria* aviária. Ponazuril 50 mg/kg por 3 dias, toltrazuril ou diclazuril conforme fonte, e sulfadimetoxina compõem arsenal terapêutico; positivo fecal exige correlação clínica. Sem controle de oocistos esporulados no ambiente, recidiva é esperada. (3)(4)(5)(9)',
    leadHighlights: ['≠ coccidioidomicose', 'ponazuril 50 mg/kg ×3 d', 'positivo ≠ culpado', 'ambiente'],
    pillars: [
      {
        title: 'Nome certo, doença certa',
        body:
          'Cistoisosporose intestinal (*Cystoisospora*) não tem relação com coccidioidomicose (*Coccidioides immitis*, fungo). Confusão terminológica gera investigação errada e ansiedade desnecessária do tutor. (5)(7)',
        highlights: ['Cystoisospora', '≠ Coccidioides', 'intestinal'],
      },
      {
        title: 'Positivo não fecha etiologia',
        body:
          'Oocistos são comuns em filhotes assintomáticos e em triagens de abrigo. Diarreia crônica exige investigação paralela de Giardia, helmintos, dietas, IBD e enteropatias virais — especialmente em filhotes não vacinados. (3)(4)(14)',
        highlights: ['eliminação subclínica', 'comorbidades', 'correlação clínica'],
      },
      {
        title: 'Ponazuril — 3 dias, não dose única',
        body:
          'Litster et al. (2014): 50 mg/kg q24h por 3 dias superou dose única 50 mg/kg e 20 mg/kg na redução de oocistos abaixo do limite de detecção. Não fundir esquemas como faixa intercambiável. (9)(3)',
        highlights: ['50 mg/kg', '3 dias', '≠ 20 mg/kg única'],
      },
      {
        title: 'Ambiente esporula o problema',
        body:
          'Oocistos esporulam em 12 h–7 dias em condições úmidas e quentes; resistem desinfecção inadequada. Remover fezes ≤24 h, desinfetar canis/gatil e banhar filhotes no último dia do tratamento — componente terapêutico, não acessório. (3)(4)(18)',
        highlights: ['esporulação', 'desinfecção', 'reinfecção'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem clínica e diferencial',
          timing: 'Primeira consulta',
          detail:
            'Idade, vacinação, ambiente (abrigo/criatório), desidratação, dor abdominal, estado nutricional. Filhote não vacinado com diarreia hemorrágica: incluir parvovírus antes de rotular “só coccídio”. (3)(5)(14)',
        },
        {
          label: 'Coproparasitológico com flutuação',
          timing: 'Amostra fresca (≤30 min ideal)',
          detail:
            'Flutuação em solução saturada (Sheather/sucrose/ZnSO₄ conforme laboratório) — método de escolha para oocistos. Identificar morfologia e medir oocistos para diferenciar espécies. (3)(4)(7)',
          reassess: 'Negativo com alta suspeita → repetir 2–3 amostras em dias alternados.',
        },
        {
          label: 'Identificação morfológica de espécie',
          timing: 'Microscopia qualificada',
          detail:
            'Cães: *C. canis* (grande, ~38–42 µm) vs complexo *C. ohioensis* (pequeno, ~23–25 µm). Gatos: *C. felis* (grande) vs *C. rivolta* (médio, ~25 µm). *Eimeria* aviária = espúrio. (7)(15)(17)',
          limitations: 'Espécies caninas pequenas podem exigir PCR/sequenciamento para diferenciação fina.',
        },
        {
          label: 'Classificação operacional de gravidade',
          timing: 'Paralelo ao exame físico',
          detail:
            'Infecção assintomática vs doença não complicada vs doença grave (desidratação, anorexia, hematoquezia, caquexia) — categorias clínicas, não estadiamento oficial. (3)(14)',
        },
        {
          label: 'Painel ampliado se diarreia persistente',
          timing: '≥2 semanas ou falha terapêutica',
          detail:
            'Giardia (ZnSO₄/ELISA), helmintos, TLI/cobalamina se esteatorreia, PCR *Tritrichomonas* (gatos jovens), parvovírus conforme indicação. (3)(5)(12)',
        },
        {
          label: 'PCR/sequenciamento se ambíguo',
          timing: 'Oocistos pequenos ou painéis moleculares positivos conflitantes',
          detail:
            'ITS1/18S rRNA diferencia *C. ohioensis* de *Cyclospora* e confirma espécie — Lee 2018 ilustra armadilha de PCR multiplex falso positivo. (15)(12)',
          limitations: 'Disponibilidade laboratorial limitada; interpretar com morfologia.',
        },
        {
          label: 'Reavaliação pós-tratamento',
          timing: '7–14 dias após fim do esquema',
          detail:
            'Nova flutuação fecal se diarreia persiste ou contexto de surto/abrigo. Melhora clínica é endpoint primário; oocistos residuais podem persistir brevemente. (3)(9)(14)',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Ponazuril — primeira linha prática',
          detail:
            '50 mg/kg VO q24h por 3 dias consecutivos (Marquis® paste reconstituída ou suspensão equivalente). Esquema com maior proporção de negativação de oocistos vs doses únicas (Litster 2014; ESCCAP GL6). (3)(9)(8)',
          dose: 'Ponazuril 50 mg/kg VO q24h × 3 dias (cão e gato).',
          duration: '3 dias consecutivos.',
          reassess: 'Reavaliar clínica e fezes em 7–14 dias; repetir ciclo apenas se persistência documentada.',
        },
        {
          label: 'Toltrazuril — alternativa por fonte',
          detail:
            '≈10–20 mg/kg VO conforme monografia/produto (Daugschies 2000; ESCCAP GL6). Apresentações combinadas (ex.: emodepsida + toltrazuril) exigem cálculo de mg/kg de toltrazuril isolado — não confundir dose do combo. (3)(11)(8)',
          dose: 'Toltrazuril 10–20 mg/kg VO (confirmar por apresentação comercial).',
          reassess: 'Filhotes muito jovens: preferir esquemas documentados em filhotes da espécie.',
        },
        {
          label: 'Diclazuril — cautela com divergência de dose',
          detail:
            'Monografias veterinárias citam 2,5–5 mg/kg; extrapolações de 25 mg/kg aparecem em literatura heterogênea — risco de sub/sobredose se não confirmar fonte. Preferir ponazuril ou toltrazuril quando possível. (8)(3)',
          dose: 'Diclazuril 2,5–5 mg/kg VO (Plumb\'s; confirmar) — NÃO assumir 25 mg/kg sem fonte verificada.',
        },
        {
          label: 'Sulfadimetoxina — alternativa clássica',
          detail:
            '50 mg/kg q24h VO por 5–10 dias quando triazinas indisponíveis ou como segunda linha. Mitchell 2007 utilizou sulfadimethoxine em cães experimentais. Monitorar apetite e hidratação. (10)(5)(8)',
          dose: 'Sulfadimetoxina 50 mg/kg q24h VO × 5–10 dias.',
        },
        {
          label: 'Terapia de suporte + controle ambiental',
          detail:
            'Fluidoterapia conforme desidratação; dieta altamente digestível; remover fezes ≤24 h; desinfetar superfícies (hipoclorito diluído, contato ≥10 min); lavar camas; banho terminal. (3)(4)(18)',
          duration: 'Durante e ≥1 semana após antiparasitário.',
        },
        {
          label: 'Falha terapêutica — checklist',
          detail:
            '1) Confirmar mg/kg real; 2) Revisar ambiente e esporulação; 3) Repetir coproscopia; 4) Investigar parvovírus, Giardia, IBD; 5) Segundo curso ponazuril 50 mg/kg ×3 d ou trocar classe (toltrazuril); 6) Encaminhar se segunda falha com ambiente controlado. (3)(9)(14)',
          reassess: 'Duas falhas documentadas → enteropatia crônica, não “resistência” automática.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable' as const,
      title: 'Decisão clínica rápida — cistoisosporose',
      headers: ['Situação', 'Conduta', 'Armadilha'],
      rows: [
        ['Filhote abrigo + oocistos + diarreia', 'Ponazuril 50 mg/kg ×3 d + higiene + suporte', 'Dose única 20 mg/kg como “equivalente”'],
        ['Adulto assintomático positivo em triagem', 'Individualizar; higiene; tratar se surto/risco', 'Tratar todo positivo reflexivamente'],
        ['Oocistos grandes felinos (*C. felis*)', 'Tratar se sintomático + ambiente', 'Confundir com *Eimeria* aviária espúria'],
        ['Oocistos pequenos caninos', 'Tratar + considerar PCR se ambíguo', 'Rotular *C. canis* sem medir'],
        ['Diarreia persistente pós-coccidiose', 'Investigar Giardia, IBD, IPE, dietas', 'Ciclos repetidos de triazina sem reavaliação'],
        ['Surto em criação/canil', 'Tratar sintomáticos + desinfecção + manejo fezes', 'Metafilia em massa sem higiene'],
        ['Triazina indisponível', 'Sulfadimetoxina 50 mg/kg ×5–10 d + ambiente', 'Subdosar ponazuril por erro de diluição'],
        ['Tutor menciona “coccidioidomicose”', 'Esclarecer: intestinal vs fungo pulmonar', 'Solicitar sorologia *Coccidioides* sem indicação'],
      ],
    },
  },

  etiology: {
    pontosChave: [
      'Agentes: *Cystoisospora* spp. (sin. *Isospora*) — coccídios apicomplexos intestinais hospedeiro-específicos; taxonomia atual usa *Cystoisospora*, não *Eimeria*. (5)(7)',
      'Cães: *C. canis* (oocistos grandes), complexo *C. ohioensis* (*C. ohioensis*, *C. burrowsi*, *C. neorivolta* — oocistos menores, morfologia sobreposta). (7)(10)',
      'Gatos: *C. felis* (oocistos grandes, 32–53 × 26–43 µm) e *C. rivolta* (médios, ~25 × 20 µm) — únicas espécies patogênicas felinas clássicas. (7)(17)',
      'Transmissão fecal-oral por ingestão de oocistos esporulados; predadores podem ingerir cistos tissulares monozoicos em hospedeiros paratênicos (roedores). (7)(16)',
      'Oocistos não esporulados são eliminados nas fezes; esporulação ocorre em 12 h–7–10 dias em ambiente úmido/quente — um gram de fezes pode conter milhões de oocistos. (3)(4)(7)',
      'Período prepatente ~3–9 dias (espécie-dependente); patente ~1–3 semanas — excreção pode ser intermitente. (7)(10)',
      'Positivo coproparasitológico ≠ diarreia causada exclusivamente por coccídio — eliminação subclínica assintomático é frequente. (3)(4)(12)',
      'Não zoonótico — *Cystoisospora* de cães/gatos não infecta humanos; distinto de *Cryptosporidium* e de *Coccidioides*. (4)(7)',
      'Filhotes, abrigos, imunossuprimidos e animais sob estresse ambiental concentram doença clínica. (3)(5)(14)',
      'Oocistos de *Eimeria* (aves) em fezes de cães/gatos indicam parasitismo espúrio — não requerem anticoccidiano para espécie do hospedeiro. (7)(15)',
      'Confusão com coccidioidomicose (*Coccidioides immitis*) é erro terminológico comum — fungo, não protozoário intestinal. (5)(7)',
      'Reinfecção ambiental explica falha terapêutica aparente mais frequentemente que resistência medicamentosa primária. (3)(9)(18)',
    ],
    especiesImportantes: {
      kind: 'clinicalTable' as const,
      title: 'Espécies de *Cystoisospora* — cães e gatos',
      headers: ['Espécie', 'Hospedeiro', 'Oocisto (µm)', 'Relevância clínica'],
      rows: [
        ['*C. canis*', 'Cão', 'Grande (~38–42 × 29–33)', 'Diarreia em filhotes; patogenicidade documentada experimentalmente. (10)(14)'],
        ['Complexo *C. ohioensis*', 'Cão', 'Pequeno (~23–25)', 'Diarreia, mau crescimento; diferenciação morfológica difícil. (7)(15)'],
        ['*C. felis*', 'Gato', 'Grande (32–53 × 26–43)', 'Comum em filhotes; diarreia mucoide/sanguinolenta possível. (17)(12)'],
        ['*C. rivolta*', 'Gato', 'Médio (~25 × 20)', 'Associada a diarreia aquosa/hemorrágica em filhotes — Morelli 2025 sugere papel patogênico relevante. (14)(17)'],
        ['*Eimeria* spp.', 'Aves (espúrio)', 'Variável', 'Não patogênica para cão/gato — achado por coprofagia/predação. (7)(15)'],
      ],
    },
    agente:
      '*Cystoisospora* spp. são coccídios intestinais com ciclo monoxênico (direto) ou envolvendo hospedeiro paratênico para estadios extraintestinais monozoicos. Desenvolvimento endógeno ocorre em enterócitos do delgado — destruição celular correlaciona-se com diarreia malabsortiva. Nomenclatura *Isospora* permanece em literatura mais antiga. (5)(7)(16)',
    cicloBiologico:
      'Ingestão de oocisto esporulado → liberação de esporozoítos no lúmen → invasão de enterócitos → merogonia (assexuada) → gametogonia → oocistos não esporulados excretados → esporulação ambiental → infectividade. Ciclo completo ~2–3 semanas. Oocistos esporulados resistem meses em ambiente favorável. (3)(7)(16)',
    alertaCoccidioidomicose:
      '⚠️ ALERTA TERMINOLÓGICO: **cistoisosporose** (coccidiose intestinal por *Cystoisospora*) NÃO é **coccidioidomicose** (doença fúngica por *Coccidioides immitis/posadasii* — pulmão, ossos, SNC). O tutor ou prontuário que menciona “coccidiose” pode referir-se a qualquer um dos dois. Confirmar contexto clínico (diarreia + oocistos fecais vs tosse/travel/endemia fúngica) antes de solicitar sorologia ou itraconazol. (5)(7)',
    alertaPositivoNaoCausa:
      '⚠️ ALERTA CLÍNICO: oocistos de *Cystoisospora* nas fezes não fecham etiologia isolada. Scorza et al. (2021) inocularam gatos adultos sem sinais clínicos apesar de excreção. Diarreia crônica exige investigação paralela de Giardia, helmintos, IBD, IPE, parvovírus (filhotes) e dietas. (12)(3)(4)(14)',
  },

  epidemiology: {
    caes:
      'Prevalência variável: 2–35% em coproparasitológicos conforme idade e setting (Morelli 2025: 11/117 cães jovens com diarreia positivos para *Cystoisospora*). Filhotes de abrigos, canis e cães debilitados concentram doença. *C. canis* e complexo *C. ohioensis* predominam; espécies não cruzam para gatos. (14)(4)(18)',
    gatos:
      'Prevalência frequentemente maior que em cães em séries com diarreia (Morelli 2025: 40/118 gatos, 33,9%). Filhotes e domicílios com vários gatos são focos. *C. felis* predomina; *C. rivolta* associada a diarreia mais grave em subset. (14)(17)(12)',
    ambiente:
      'Oocistos esporulados concentram-se em fezes, solo, caixas de areia, canis úmidos e superfícies de criação. Abrigos, pet shops e criadouros são focos cíclicos. Desinfecção com hipoclorito (1:32), remoção diária de fezes e secagem reduzem carga infectante — tão crítico quanto antiparasitário. (3)(4)(18)',
    brasil2023:
      'Souza et al. (2023) identificaram *Cystoisospora* spp. em 4,74% (17/359) de cães e gatos de Jataí-GO — prevalência moderada em clínica de companhia, com fatores de risco associados a idade, higiene e contato ambiental. Dado local, não extrapolar como taxa nacional fixa. (18)',
  },

  pathogenesisTransmission: {
    transmissao:
      'Via fecal-oral: ingestão de oocistos esporulados no ambiente, fômites ou auto-limpeza. Via paratênica: ingestão de roedores com cistos tissulares monozoicos (documentado experimentalmente para espécies caninas/felinas). Não transmissão transplacentária rotineira. (7)(16)(4)',
    cascata: [
      'Ingestão de oocisto esporulado → excistamento no lúmen delgado → esporozoítos invadem enterócitos villosos. (7)(10)',
      'Merogonia intracelular (destruição de enterócitos) → gametogonia → formação de oocistos não esporulados. (7)(10)',
      'Lise celular e inflamação mucosa → aumento de permeabilidade e disfunção absortiva → diarreia. (10)(14)',
      'Oocistos excretados nas fezes → esporulação ambiental em condições úmidas/quentes → ciclo reinfectante. (3)(4)(7)',
      'Hospedeiro paratênico (roedor) ingerido → cistos monozoicos liberam esporozoítos após digestão → infecção do predador. (16)(7)',
      'Resposta imune local controla carga em imunocompetentes adultos → eliminação subclínica subclínico ou eliminação espontânea. (5)(12)',
    ],
  },

  pathophysiology: {
    destruicaoEpitelial:
      'Eschizogonia e gametogonia destruem enterócitos da vilosidade delgada — redução da superfície absortiva e inflamação local. Mitchell 2007 documentou atrofia vilosa, dilatação de lacteals e hiperplasia de linfonodos de Peyer em cães experimentais. (10)',
    diarreiaMalabsortiva:
      'Diarreia é predominantemente malabsortiva/osmótica — fezes aquosas a semiformes, ocasionalmente mucoides ou com sangue em filhotes com carga alta (*C. felis*, *C. rivolta*). Esteatorreia isolada sugere comorbidade (IPE, IBD). (10)(14)(17)',
    desidratacaoFilhotes:
      'Filhotes têm reserva hídrica limitada e trânsito acelerado — perdas entéricas descompensam rapidamente mesmo com infecção “parasitária aparentemente benigna”. (5)(10)',
    imunossupressao:
      'Imunossupressão (FIV, quimioterapia, corticoides prolongados) pode prolongar excreção e intensificar sinais — não confundir com enteropatia primária. (5)(12)',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'gastrointestinal',
      findings: [
        {
          finding: 'Diarreia aquosa a semiforme (aguda ou subaguda)',
          mechanism:
            'Destruição de enterócitos, inflamação mucosa e malabsorção de nutrientes/eletrólitos no delgado proximal.',
          clinicalMeaning:
            'Filhotes descompensam rapidamente — priorizar hidratação; adultos podem ser assintomáticos com oocistos positivos.',
          priority: 'common',
        },
        {
          finding: 'Fezes mucoides ou com sangue (filhotes felinos especialmente)',
          mechanism:
            'Inflamação e erosão mucosa com carga parasitária alta (*C. felis*, *C. rivolta*).',
          clinicalMeaning:
            'Morelli 2025: diarreia aquosa/hemorrágica associada a *C. rivolta* em gatos — não atribuir só a “gastroenterite viral”.',
          priority: 'common',
        },
        {
          finding: 'Mau crescimento / caquexia (filhotes de criação)',
          mechanism: 'Malabsorção crônica + perdas entéricas + competição nutricional em surtos de abrigo.',
          clinicalMeaning: 'Investigar coinfecções helmínticas e parvovírus em filhotes não vacinados.',
          priority: 'common',
        },
        {
          finding: 'Vômito (ocasional)',
          mechanism: 'Inflamação proximal ou comorbidade — não patognomônico de coccidiose isolada.',
          clinicalMeaning: 'Expandir diferencial se vômito predominante sobre diarreia.',
          priority: 'uncommon',
        },
        {
          finding: 'Tenesmo / desconforto abdominal',
          mechanism: 'Inflamação colônica secundária ou diarreia de grande volume.',
          clinicalMeaning: 'Diferenciar de proctite, corpo estranho, obstrução.',
          priority: 'uncommon',
        },
        {
          finding: 'Assintomático com oocistos positivos (eliminação subclínica)',
          mechanism: 'Controle imune parcial ou carga subclínica — excreção intermitente.',
          clinicalMeaning: 'Positivo em triagem não obriga tratamento em todo adulto saudável — avaliar risco epidemiológico.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Desidratação leve a grave (filhotes)',
          mechanism: 'Perdas entéricas líquidas desproporcionais à reserva hídrica corporal.',
          clinicalMeaning: 'Fluidoterapia conforme grau — não atrasar por aguardar resultado parasitológico.',
          priority: 'emergency',
        },
        {
          finding: 'Letargia, anorexia',
          mechanism: 'Desidratação, desequilíbrio eletrolítico, caquexia em surtos.',
          clinicalMeaning: 'Sinais sistêmicos moderados-graves exigem diferencial ampliado (parvovírus, sepsis).',
          priority: 'systemic',
        },
        {
          finding: 'Febre (incomum como achado isolado)',
          mechanism: 'Improvável como efeito exclusivo de coccidiose — sugere coinfecção bacteriana/viral.',
          clinicalMeaning: 'Expandir investigação: parvovírus, salmonela, campylobacter.',
          priority: 'emergency',
        },
        {
          finding: 'Pelagem opaca, BCS baixo (casos prolongados)',
          mechanism: 'Desnutrição secundária a diarreia crônica mal manejada ou comorbidades.',
          clinicalMeaning: 'Investigar IPE, Giardia, IBD além de retratamento anticoccidiano.',
          priority: 'systemic',
        },
      ],
    },
  ],

  diagnosis: {
    diagnosticPlanStepByStep: [
      {
        stepNumber: 1,
        title: 'História clínica dirigida',
        purpose: 'Estratificar risco e diferenciais.',
        description:
          'Idade, origem (abrigo/criatório), vacinação, duração da diarreia, contactantes, predação de roedores/aves, tratamentos prévios. Esclarecer se tutor menciona “coccidioidomicose” (fúngica). (3)(5)(7)',
        interpretation: 'Filhote <16 semanas com diarreia hemorrágica → parvovírus paralelo à parasitologia.',
        limitations: 'História incompleta superestima coccídio como causa única.',
      },
      {
        stepNumber: 2,
        title: 'Exame físico e hidratação',
        purpose: 'Determinar urgência de suporte.',
        description:
          'TPC, turgor cutâneo, peso, BCS, temperatura, dor abdominal. Filhotes desidratam rapidamente. (5)(6)',
        interpretation: 'Desidratação ≥5% → fluidoterapia antes de investigação prolongada.',
        limitations: 'Exame normal não exclui enteropatia significativa em filhotes.',
      },
      {
        stepNumber: 3,
        title: 'Flutuação fecal (Sheather/sucrose)',
        purpose: 'Detectar e quantificar oocistos.',
        description:
          'Amostra fresca; flutuação com solução saturada; identificação morfológica. Método de rotina para coccídios intestinais. (3)(4)(7)',
        interpretation: 'Presença de oocistos confirma infecção/excreção; quantificação orienta gravidade relativa.',
        limitations: 'Excreção intermitente — amostra única pode ser falso negativo.',
        isGoldStandard: true,
      },
      {
        stepNumber: 4,
        title: 'Morfometria e identificação de espécie',
        purpose: 'Diferenciar espécies hospedeiro-específicas.',
        description:
          'Medir oocistos: grandes (*C. canis*, *C. felis*) vs médios/pequenos (*C. rivolta*, complexo *C. ohioensis*). Excluir *Eimeria* aviária espúria. (7)(15)(17)',
        interpretation: 'Tamanho orienta espécie provável; confirmação molecular se ambíguo.',
        limitations: 'Espécies caninas pequenas morfologicamente sobrepostas.',
      },
      {
        stepNumber: 5,
        title: 'Amostragem seriada se negativo',
        purpose: 'Maximizar sensibilidade.',
        description:
          '2–3 amostras em dias alternados se alta suspeita clínica com flutuação negativa inicial. (3)(4)(12)',
        interpretation: 'Três negativos reduzem suspeita, mas não zeram em surto de abrigo.',
        limitations: 'Custo e adesão do tutor limitam série completa.',
      },
      {
        stepNumber: 6,
        title: 'PCR ITS1/18S se necessário',
        purpose: 'Confirmar espécie e excluir diagnósticos cruzados.',
        description:
          'Útil para oocistos pequenos, painéis multiplex conflitantes (Lee 2018: falso positivo *Cyclospora*) ou pesquisa. (15)(12)',
        interpretation: 'Confirma espécie; não substitui correlação clínica.',
        limitations: 'Disponibilidade limitada; DNA residual pós-tratamento.',
      },
      {
        stepNumber: 7,
        title: 'Painel de comorbidades',
        purpose: 'Evitar rotular causa única.',
        description:
          'Giardia, helmintos, parvovírus (filhotes), TLI/cobalamina, PCR *Tritrichomonas* (gatos jovens). (3)(5)(12)(14)',
        interpretation: 'Coinfecções são comuns em abrigos — tratar conforme prioridade clínica.',
        limitations: 'Painel completo nem sempre necessário na diarreia aguda autolimitada.',
      },
      {
        stepNumber: 8,
        title: 'Reavaliação pós-tratamento',
        purpose: 'Confirmar resolução quando indicado.',
        description:
          'Nova flutuação 7–14 dias após fim do esquema se diarreia persiste ou controle de surto. (3)(9)(14)',
        interpretation: 'Melhora clínica é endpoint primário; oocistos residuais breves não exigem retratamento automático.',
        limitations: 'Negativação laboratorial pode ser tardia vs resolução clínica.',
      },
    ],
    apresentacaoClinicaTabela: {
      kind: 'clinicalTable' as const,
      title: 'Apresentação clínica — categorias (não estadiamento)',
      headers: ['Categoria', 'Perfil', 'Conduta orientadora'],
      rows: [
        [
          'Infecção / eliminação subclínica assintomático',
          'Oocistos positivos; BCS normal; fezes formadas',
          'Individualizar tratamento; higiene; monitorar filhotes contactantes. (3)(4)(12)',
        ],
        [
          'Doença não complicada',
          'Filhote/adulto jovem; diarreia leve-moderada; hidratado',
          'Ponazuril 50 mg/kg ×3 d + suporte + higiene ambiental. (3)(9)',
        ],
        [
          'Doença grave',
          'Desidratação, anorexia, hematoquezia, caquexia',
          'Fluidoterapia + anticoccidiano + investigar coinfecções (parvovírus, Giardia). (5)(10)(14)',
        ],
        [
          'Surto em abrigo/criação',
          'Múltiplos filhotes positivos; ambiente contaminado',
          'Tratar sintomáticos; desinfecção; manejo de fezes; não metafilia indiscriminada. (3)(4)(18)',
        ],
      ],
    },
    classificacaoGravidadeOperacional: {
      kind: 'clinicalTable' as const,
      title: 'Classificação operacional de gravidade (não estadiamento oficial)',
      headers: ['Grau', 'Critérios', 'Implicação prática'],
      rows: [
        [
          'Infecção',
          'Oocistos + assintomático + hidratado',
          'Tratar conforme risco epidemiológico; higiene prioritária. (3)(4)',
        ],
        [
          'Doença não complicada',
          'Diarreia sem desidratação significativa; alerta; come',
          'Anticoccidiano VO + suporte ambulatorial + ambiente. (3)(9)',
        ],
        [
          'Doença grave',
          'Desidratação ≥5%, anorexia, hematoquezia profusa, hipotermia',
          'Internação, fluidoterapia IV, diferencial ampliado urgente. (5)(6)(14)',
        ],
      ],
    },
    matrizInterpretacaoCopro: {
      kind: 'clinicalTable' as const,
      title: 'Matriz de interpretação coproparasitológica',
      headers: ['Achado', 'Significa', 'Não significa automaticamente', 'Próximo passo'],
      rows: [
        [
          'Oocistos grandes felinos',
          'Excreção de *C. felis* (provável)',
          'Diarreia causada exclusivamente por coccídio',
          'Correlacionar clínica; tratar se sintomático. (17)(12)',
        ],
        [
          'Oocistos pequenos caninos',
          'Complexo *C. ohioensis* (provável)',
          'Identificação específica sem PCR',
          'Tratar; PCR se ambíguo ou falha. (15)(7)',
        ],
        [
          'Oocistos compatíveis com *Eimeria*',
          'Parasitismo espúrio (aves)',
          'Coccidiose do cão/gato',
          'Não tratar como *Cystoisospora*; orientar higiene. (7)(15)',
        ],
        [
          'Flutuação negativa, filhote diarreico',
          'Excreção intermitente ou baixa carga',
          'Ausência de infecção',
          'Repetir série; investigar diferenciais. (12)(3)',
        ],
        [
          'Positivo pós-tratamento, assintomático',
          'Oocistos residuais ou reinfecção leve',
          'Falha terapêutica mandatória',
          'Observar clínica; revisar ambiente antes de retratar. (9)(14)',
        ],
      ],
    },
    tabelaMorfologiaOocistos: {
      kind: 'clinicalTable' as const,
      title: 'Morfologia de oocistos — guia prático',
      headers: ['Espécie', 'Formato/tamanho', 'Características', 'Espécie hospedeira'],
      rows: [
        ['*C. canis*', 'Ovoide grande (~38–42 × 29–33 µm)', 'Parede lisa; esporocistos 2', 'Cão exclusivo. (7)(10)'],
        ['*C. felis*', 'Ovoide grande (32–53 × 26–43 µm)', 'Maior oocisto felino; fácil identificação', 'Gato exclusivo. (17)(7)'],
        ['*C. rivolta*', 'Ovoide médio (~25 × 20 µm)', 'Menor que *C. felis*; patogenicidade relevante', 'Gato exclusivo. (14)(7)'],
        ['Complexo *C. ohioensis*', 'Pequeno (~23–25 µm)', 'Morfologia sobreposta entre membros', 'Cão exclusivo. (7)(15)'],
        ['*Eimeria* spp.', 'Variável (aviário)', 'Espúrio em cão/gato', 'Aves — não tratar hospedeiro. (7)(15)'],
      ],
    },
    tabelaComparacaoEimeria: {
      kind: 'clinicalTable' as const,
      title: '*Cystoisospora* vs *Eimeria* — não confundir',
      headers: ['Característica', '*Cystoisospora* (cão/gato)', '*Eimeria* (aves)'],
      rows: [
        ['Hospedeiro', 'Cão ou gato (espécie-específico)', 'Aves (galinhas, etc.)'],
        ['Patogenicidade no cão/gato', 'Sim (espécies nativas)', 'Não — achado espúrio por coprofagia'],
        ['Contexto clínico', 'Filhotes, abrigos, diarreia possível', 'Acesso a fezes de aves/ granja'],
        ['Conduta', 'Anticoccidiano + ambiente se clínico', 'Ignorar como patógeno do hospedeiro; higiene'],
        ['Referência', '(3)(4)(7)', '(7)(15)'],
      ],
    },
    sensibilidadeEspecificidadeDidatica:
      'Flutuação fecal para oocistos: sensibilidade moderada-alta quando há excreção ativa e técnica adequada; especificidade alta para presença de oocistos, mas baixa especificidade etiológica (positivo ≠ causa da diarreia). VPP de “diarreia por coccídio” depende de idade, sinais e prevalência local — em filhote de abrigo com diarreia, VPP é maior; em adulto saudável triado, VPP cai. PCR ITS1 aumenta sensibilidade vs flutuação isolada tardia (Scorza 2021: flutuação falso negativa vs PCR), mas detecta DNA residual. Repetir amostras aumenta Se do protocolo, não de um teste isolado. (12)(3)(15)',
    diferenciaisCao:
      'Parvovírus (filhotes não vacinados — prioridade se hematoquezia/febre/leucopenia), Giardia, helmintos (Ancylostoma, *Toxocara*), coronavírus enterico, AHDS, IBD, IPE, corpo estranho, oocistos espúrios (*Eimeria*, *Sarcocystis*, *Toxoplasma* em coprofagia). (5)(10)(14)(15)',
    diferenciaisGato:
      'Giardia, *Tritrichomonas foetus* (PCR — gatos jovens), helmintos, IBD, FIP (caquexia/diarreia), coronavírus felino, oocistos espúrios. *C. rivolta* vs *C. felis* — morfologia e gravidade clínica variável. (12)(14)(17)',
    figuraAttia2024: {
      kind: 'clinicalFigure' as const,
      src: `${ASSET_BASE}/attia-2024-oocistos-felis.png`,
      alt: 'Microfotografia de oocistos de Cystoisospora felis — Attia et al., 2024.',
      caption:
        'Oocistos de *C. felis* — morfologia e dimensionamento. Attia et al., BMC Vet Res 2024 (CC BY 4.0). DOI: 10.1186/s12917-024-04295-2. (17)',
      display: 'wide',
    },
    figuraFerreira2019: {
      kind: 'clinicalFigure' as const,
      src: `${ASSET_BASE}/ferreira-2019-cistos-tecido.webp`,
      alt: 'Cistos tissulares monozoicos de Cystoisospora felis em cultura celular — Ferreira et al., 2019.',
      caption:
        'Cistos tissulares monozoicos de *C. felis* in vitro — estádios extraintestinais e ciclo paratênico. Ferreira et al., Front Vet Sci 2019 (CC BY 4.0). DOI: 10.3389/fvets.2019.00361. (16)',
      display: 'wide',
    },
    algoritmoDiagnostico:
      '1) Filhote/abrigo com diarreia: flutuação fecal + morfologia + classificação de gravidade. 2) Positivo + sintomático: tratar + higiene + suporte. 3) Diarreia persistente: comorbidades (Giardia, helmintos, IBD, parvovírus). 4) Oocistos ambíguos: PCR. 5) Pós-tratamento: clínica manda; repetir teste só se sinais persistem. (3)(4)(7)(12)',
  },

  treatment: {
    ponazurilEsquemaTresDias:
      'Ponazuril 50 mg/kg VO q24h por **3 dias consecutivos** — esquema preferencial documentado em abrigos (Litster 2014: 92,9% cães e 87,5% gatos com oocistos abaixo do limite de detecção vs 68,8%/47,8% com dose única 20 mg/kg). Administrar com alimento se intolerância gástrica. Marquis® paste (15% ponazuril) requer diluição/cálculo cuidadoso de mg/kg — erro de diluição é causa frequente de subdosagem. (9)(3)(8)(13)',
    ponazurilDoseUnicaAlerta:
      '⚠️ Doses únicas de ponazuril (50 mg/kg ou 20 mg/kg) NÃO são equivalentes ao esquema de 3 dias — eficácia inferior documentada. Não prescrever 20–50 mg/kg dose única como “faixa intercambiável” com 50 mg/kg ×3 d. Reservar dose única para contextos específicos com reavaliação fecal obrigatória. (9)(3)',
    toltrazurilPorFonte:
      'Toltrazuril 10–20 mg/kg VO conforme monografia e apresentação (Daugschies 2000; ESCCAP GL6). Produtos combinados (ex.: emodepsida + toltrazuril) exigem extrair mg/kg de toltrazuril isolado — Procox® e similares têm doses de combo distintas. Eficácia documentada em filhotes naturalmente infectados. (11)(3)(8)',
    diclazurilDivergenciaAlerta:
      '⚠️ ALERTA DE DOSE — Diclazuril: Plumb\'s e monografias veterinárias citam **2,5–5 mg/kg** VO; literatura heterogênea menciona **25 mg/kg** (possível erro de ordem de magnitude ou extrapolação de outras espécies). Confirmar apresentação comercial e fonte antes de prescrever — risco de toxicidade ou falha terapêutica. Preferir ponazuril ou toltrazuril quando disponíveis. (8)(3)',
    sulfadimetoxina:
      'Sulfadimetoxina 50 mg/kg q24h VO por 5–10 dias — alternativa clássica quando triazinas indisponíveis (Mitchell 2007; Nelson & Couto). Monitorar apetite, vômito e hidratação. Associações com ormetoprim seguem monografias comerciais. (10)(5)(8)',
    terapiaSuporte: [
      'Fluidoterapia SC/IV conforme grau de desidratação — prioridade em filhotes. (5)(6)',
      'Dieta altamente digestível, fracionada, durante e após anticoccidiano. (3)(6)',
      'Probióticos adjuvantes — evidência limitada; não substituem anticoccidiano + ambiente. (6)',
      'Evitar antidiarreicos opióides de rotina — mascaram enteropatia grave (parvovírus). (6)',
      'Corrigir anemia/desnutrição se caquexia prolongada; investigar comorbidades. (14)',
    ],
    controleAmbiental: [
      'Remover fezes do ambiente ≤24 h — interrompe esporulação e reinfecção. (3)(4)',
      'Desinfetar superfícies com hipoclorito de sódio 1:32 (contato ≥10 min) ou amônia quaternária conforme superfície. (3)(4)',
      'Lavar camas, brinquedos e caixas de areia; substituir substrato contaminado em surtos. (3)(18)',
      'Banhar filhote no último dia do tratamento; tosar região perianal se contaminada. (3)(4)',
      'Separar filhotes sintomáticos; manejar contactantes conforme risco (não tratar adultos assintomáticos indiscriminadamente). (3)(4)',
      'Controlar roedores (hospedeiro paratênico) em canis rurais. (16)(7)',
    ],
    farmacos: {
      kind: 'clinicalTable' as const,
      title: 'Fármacos anticoccidianos — doses e contexto',
      headers: [
        'Fármaco',
        'Espécie',
        'Dose',
        'Via',
        'Duração',
        'Contexto',
        'Contraindicações / cautelas',
        'Monitorização',
        'Fonte',
      ],
      rows: [
        [
          'Ponazuril',
          'Cão/gato',
          '50 mg/kg q24h',
          'VO',
          '3 dias',
          'Primeira linha prática — diarreia + oocistos',
          'Calcular mg/kg da paste 15%; gestação — cautela relativa',
          'Clínica; fezes; peso',
          '(3)(9)(8)(13)',
        ],
        [
          'Ponazuril (dose única)',
          'Cão/gato',
          '50 ou 20 mg/kg ×1',
          'VO',
          '1 dia',
          'Inferior a 3 dias — não preferencial',
          'Não equivalente ao esquema 3 dias',
          'Reavaliar fezes D7–14',
          '(9)(3)',
        ],
        [
          'Toltrazuril',
          'Cão/gato',
          '10–20 mg/kg',
          'VO',
          '1–3 dias (fonte)',
          'Alternativa — confirmar apresentação',
          'Combos: extrair mg/kg de toltrazuril',
          'Clínica; fezes',
          '(3)(11)(8)',
        ],
        [
          'Diclazuril',
          'Cão/gato',
          '2,5–5 mg/kg',
          'VO',
          '1–2 dias (fonte)',
          'Alternativa — alerta divergência 25 mg/kg',
          'Confirmar fonte; preferir ponazuril',
          'Clínica',
          '(8)(3)',
        ],
        [
          'Sulfadimetoxina',
          'Cão/gato',
          '50 mg/kg q24h',
          'VO',
          '5–10 dias',
          'Alternativa clássica',
          'Desidratação; reações GI; gestação tardia',
          'Apetite; hidratação',
          '(5)(10)(8)',
        ],
        [
          'Sulfadimetoxina + ormetoprim',
          'Cão/gato',
          'Conforme bula mg/kg',
          'VO',
          '5–14 dias',
          'Apresentações comerciais',
          'Idem sulfonamidas',
          'Hemograma se prolongado',
          '(8)(5)',
        ],
      ],
    },
    errosComuns: [
      'Confundir cistoisosporose com coccidioidomicose (*Coccidioides*) — doenças distintas. (5)(7)',
      'Tratar oocistos positivos como causa única da diarreia — ignorar Giardia, parvovírus, IBD. (3)(4)(14)',
      'Prescrever ponazuril dose única 20 mg/kg como equivalente a 50 mg/kg ×3 d. (9)(3)',
      'Subdosar ponazuril por erro de diluição da paste 15% — calcular mg/kg real. (8)(9)',
      'Usar diclazuril 25 mg/kg sem confirmar fonte — risco de erro de ordem de magnitude. (8)(3)',
      'Tratar *Eimeria* aviária espúria com anticoccidiano do hospedeiro. (7)(15)',
      'Ignorar controle ambiental — reinfecção mimetiza falha terapêutica. (3)(4)(18)',
      'Tratar contactantes adultos assintomáticos indiscriminadamente — foco em ambiente. (3)(4)',
      'Rotular “resistência” na primeira recidiva sem auditar ambiente e adesão. (9)(14)',
      'Metronidazol ou fenbendazol como “anticoccidiano” — não são tratamento de *Cystoisospora*. (3)(8)',
    ],
    perolasClinicas: [
      'Ponazuril 50 mg/kg ×3 d supera doses únicas — simplificar prescrição com cálculo mg/kg da paste. (9)(3)',
      'Oocistos grandes felinos (*C. felis*) são fáceis de identificar — Attia 2024 ilustra morfologia. (17)',
      'Scorza 2021: gatos adultos inoculados excretaram sem sinais — positivo ≠ doença. (12)',
      'Lee 2018: PCR multiplex pode dar falso positivo *Cyclospora* — confirmar com morfologia/sequenciamento. (15)',
      'Mitchell 2007 provou que *C. canis* pode causar diarreia primária em filhotes — não é sempre “inocente”. (10)',
      'Morelli 2025: *C. rivolta* associada a diarreia hemorrágica em gatos — identificar tamanho do oocisto. (14)',
      'Daugschies 2000: toltrazuril eficaz em campo canino — alternativa sólida quando ponazuril indisponível. (11)',
      'Burlison 2022: farmacocinética de ponazuril em gatos — base para doses fora da bula seguras. (13)',
      'Banho terminal remove oocistos da pelagem — detalhe esquecido em abrigos. (3)(4)',
      'Souza 2023: prevalência ~4,7% em clínica BR — dado local, reforçar triagem em filhotes. (18)',
      'Ferreira 2019: cistos monozoicos explicam ciclo paratênico — controle de roedores em canis. (16)',
      'Sulfadimetoxina ainda funciona — opção quando triazinas indisponíveis ou segunda linha. (10)(5)',
    ],
    falhaTratamento: [
      '1. Confirmar dose mg/kg real administrada (não “ml de paste” sem cálculo).',
      '2. Confirmar 3 dias consecutivos completos de ponazuril (ou esquema alternativo completo).',
      '3. Revisar ambiente: fezes removidas? Desinfecção? Esporulação em substrato úmido?',
      '4. Banhar filhotes e contactantes sintomáticos; substituir substrato de caixa/ canil.',
      '5. Repetir flutuação fecal 7–14 dias pós-tratamento.',
      '6. Investigar comorbidades: parvovírus, Giardia, helmintos, IBD, IPE.',
      '7. Segundo curso ponazuril 50 mg/kg ×3 d OU trocar para toltrazuril conforme disponibilidade. (9)(11)',
      '8. Evitar escalar para diclazuril 25 mg/kg empírico — confirmar fonte ou encaminhar. (8)',
      '9. Duas falhas documentadas com ambiente controlado → enteropatia crônica, não “coccídio resistente” automático. (14)',
    ],
    prognostico:
      'Excelente em filhotes imunocompetentes tratados precocemente com anticoccidiano adequado + ambiente controlado — resolução clínica em 3–7 dias é comum. Caquexia grave, coinfecção parvoviral ou imunossupressão pioram prognóstico. eliminação subclínica assintomático em adultos tem prognóstico benigno. Recidiva por reinfecção ambiental é frequente se higiene inadequada — não indica prognóstico reservado se corrigido. (3)(5)(9)(14)',
    preclinica: [
      'Filhotes de abrigo/criatório: coproparasitológico na intake; higiene preemptiva do ambiente. (3)(4)(18)',
      'Assintomático positivo em triagem: higiene + observação; tratar se desenvolver sinais ou surto. (3)(4)(12)',
    ],
    aguda: [
      'Diarreia aguda + oocistos + filhote hidratado: ponazuril 50 mg/kg ×3 d + fluidoterapia oral se leve + higiene imediata. (3)(9)(6)',
      'Filhote desidratado: fluidoterapia IV/SC prioritária; iniciar ponazuril quando tolerando VO. (5)(6)',
      'Diarreia hemorrágica filhote: parvovírus paralelo — não atrasar suporte por aguardar anticoccidiano. (5)(10)',
    ],
    cronica: [
      'Diarreia ≥3 semanas com oocistos: tratar coccídio + investigar IBD, Giardia, IPE, *Tritrichomonas* (gatos). (3)(12)(14)',
      'Trial dietético digestível durante recuperação mucosa. (6)',
      'Enteropatia crônica refractária após coccidiose tratada e ambiente controlado → biópsia/endoscopia. (6)(14)',
    ],
  },

  prevention: {
    higiene: [
      'Remover fezes do ambiente ≤24 h — impede esporulação de oocistos. (3)(4)',
      'Desinfetar canis, gatil e superfícies (hipoclorito 1:32, contato ≥10 min). (3)(4)',
      'Manter substrato seco; evitar acúmulo de umidade favorável à esporulação. (3)(7)',
      'Banhar filhotes em surtos; lavar camas e brinquedos em água quente. (3)(4)',
      'Controlar roedores em instalações rurais (hospedeiro paratênico). (16)(7)',
      'Abrigos: protocolo de limpeza diária, separação de filhotes, amostragem de intake. (3)(4)(18)',
    ],
    criacaoCanil:
      'Criadouros e canis: metafilaxia com toltrazuril em filhotes conforme protocolo veterinário local (Daugschies 2000; ESCCAP GL6) + higiene rigorosa — metafilaxia não substitui desinfecção. (11)(3)',
    zoonose:
      '*Cystoisospora* de cães e gatos não é zoonótico — orientar tutores que cistoisosporose intestinal difere de criptosporidiose e de coccidioidomicose humana. Higiene fecal padrão (lavar mãos) permanece boa prática. (4)(7)',
    triagemFilhotes:
      'Coproparasitológico de rotina em filhotes de abrigo/ pet shop na admissão; tratar sintomáticos e reforçar ambiente antes de integração a grupos. (3)(4)(18)',
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['giardiase-caes-gatos'],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-coccidiosis-canine-2023',
      citationText: 'Reconciliação editorial interna — Coccidiose canina (2023).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-vin-coccidiosis-feline-2023',
      citationText: 'Reconciliação editorial interna — Coccidiose felina (2023).',
      sourceType: 'Reconciliação interna',
      url: null,
      evidenceLevel: null,
      notes: 'Referência interna de reconciliação editorial — não citar na UI.',
    },
    {
      id: 'ref-esccap-gl6-2025',
      citationText:
        'ESCCAP. Guideline 06: Control of Intestinal Protozoa in Dogs and Cats. 3rd ed. ESCCAP, 2025.',
      sourceType: 'Diretriz',
      url: 'https://www.esccap.org/link-document/32/',
      evidenceLevel: 'Alta',
      notes: 'Ponazuril, toltrazuril, amostragem e higiene ambiental para coccídios.',
    },
    {
      id: 'ref-capc-coccidia-2025',
      citationText: 'CAPC. Coccidia Guidelines. Companion Animal Parasite Council, 2025.',
      sourceType: 'Diretriz',
      url: 'https://capcvet.org/guidelines/coccidia/',
      evidenceLevel: 'Alta',
      notes: 'Diagnóstico, tratamento e manejo de coccidiose canina/felina.',
    },
    {
      id: 'ref-nelson-couto-ch31',
      citationText:
        'Simpson KW, Jergens AE. Gastrointestinal Parasites. In: Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier, 2020. Cap. 31.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Coccidiose — clínica, diagnóstico e tratamento.',
    },
    {
      id: 'ref-bsava-gastro-p214',
      citationText:
        'Allenspach K, Garden OA (eds.). BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. BSAVA, 2020. p. 214.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Enteropatias parasitárias incluindo coccidiose.',
    },
    {
      id: 'ref-cunningham-336',
      citationText:
        'Taylor MA, Coop RL, Wall RL. Veterinary Parasitology. 4th ed. Wiley-Blackwell (Cunningham), 2023. pp. 336–337.',
      sourceType: 'Livro-texto',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Ciclo biológico, morfologia de oocistos e espécies.',
    },
    {
      id: 'ref-plumbs-triazines',
      citationText:
        'Budde JA, McCluskey DM. Plumb\'s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley, 2023.',
      sourceType: 'Formulário',
      url: null,
      evidenceLevel: 'Alta',
      notes: 'Monografias diclazuril, ponazuril, toltrazuril — doses e cautelas.',
    },
    {
      id: 'ref-litster-2014',
      citationText:
        'Litster AL, et al. Use of ponazuril paste to treat coccidiosis in shelter-housed cats and dogs. Vet Parasitol. 2014. DOI: 10.1016/j.vetpar.2014.03.003.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1016/j.vetpar.2014.03.003',
      evidenceLevel: 'Moderada',
      notes: 'Ponazuril 50 mg/kg ×3 d vs doses únicas — eficácia comparativa.',
    },
    {
      id: 'ref-mitchell-2007',
      citationText:
        'Mitchell SM, et al. Cystoisospora canis infections in dogs: clinical signs, pathogenesis, and reproducible clinical disease. J Parasitol. 2007. DOI: 10.1645/ge-1024r.1.',
      sourceType: 'Estudo experimental',
      url: 'https://doi.org/10.1645/ge-1024r.1',
      evidenceLevel: 'Moderada',
      notes: 'Patogenicidade de C. canis; sulfadimethoxine; lesões histológicas.',
    },
    {
      id: 'ref-daugschies-2000',
      citationText:
        'Daugschies A, Mundt HC, Letková V. Toltrazuril treatment of cystoisosporosis in dogs under experimental and field conditions. Parasitol Res. 2000. DOI: 10.1007/s004360000217.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1007/s004360000217',
      evidenceLevel: 'Moderada',
      notes: 'Eficácia de toltrazuril em campo canino.',
    },
    {
      id: 'ref-scorza-2021',
      citationText:
        'Scorza AV, et al. Experimental infection of cats with Cystoisospora felis. J Vet Intern Med. 2021. DOI: 10.1111/jvim.16012.',
      sourceType: 'Estudo experimental',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7848389/',
      evidenceLevel: 'Moderada',
      notes: 'Flutuação vs PCR ITS1; ausência de sinais em gatos adultos inoculados.',
    },
    {
      id: 'ref-burlison-2022',
      citationText:
        'Burlison C, et al. Pharmacokinetics of orally administered single-dose ponazuril in cats. J Vet Pharmacol Ther. 2022. DOI: 10.1111/jvp.13047.',
      sourceType: 'Farmacocinética',
      url: 'https://doi.org/10.1111/jvp.13047',
      evidenceLevel: 'Moderada',
      notes: 'farmacocinética de ponazuril em gatos — base para doses fora da bula.',
    },
    {
      id: 'ref-morelli-2025',
      citationText:
        'Morelli S, et al. Occurrence of Cystoisospora spp. and other intestinal parasites in dogs and cats with diarrhea. Vet Parasitol. 2025. DOI: 10.1016/j.vetpar.2025.110546.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1016/j.vetpar.2025.110546',
      evidenceLevel: 'Moderada',
      notes: 'Prevalência e associação clínica C. canis / C. rivolta.',
    },
    {
      id: 'ref-lee-2018',
      citationText:
        'Lee S, et al. Identification of Cystoisospora ohioensis in a diarrheal dog in Korea. Korean J Parasitol. 2018. DOI: 10.3347/kjp.2018.56.4.371.',
      sourceType: 'Relato de caso',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6137296/',
      evidenceLevel: 'Referência',
      notes: 'PCR vs morfologia; armadilha de falso positivo Cyclospora.',
    },
    {
      id: 'ref-ferreira-2019',
      citationText:
        'Ferreira R, et al. Development of Cystoisospora felis in cell culture and in vitro formation of monozoic tissue cysts. Front Vet Sci. 2019. DOI: 10.3389/fvets.2019.00361.',
      sourceType: 'Estudo experimental',
      url: 'https://doi.org/10.3389/fvets.2019.00361',
      evidenceLevel: 'Moderada',
      notes: 'Cistos tissulares monozoicos; ciclo paratênico.',
    },
    {
      id: 'ref-attia-2024',
      citationText:
        'Attia MM, et al. Evaluation of inflammatory markers during Cystoisospora felis infection in cats. BMC Vet Res. 2024. DOI: 10.1186/s12917-024-04295-2.',
      sourceType: 'Estudo clínico',
      url: 'https://doi.org/10.1186/s12917-024-04295-2',
      evidenceLevel: 'Moderada',
      notes: 'Morfologia de oocistos C. felis; marcadores inflamatórios.',
    },
    {
      id: 'ref-souza-2023',
      citationText:
        'Souza JBB, et al. Prevalence of intestinal parasites in dog and cat populations from Goiás, Brazil. Vet Sci. 2023. DOI: 10.3390/vetsci10080492.',
      sourceType: 'Estudo epidemiológico',
      url: 'https://doi.org/10.3390/vetsci10080492',
      evidenceLevel: 'Moderada',
      notes: 'Prevalência de Cystoisospora spp. em clínica brasileira.',
    },
  ],
  isPublished: true,
  source: 'seed',
};
