import { MedicationRecord } from '../../types/medication';

export const gabapentinaMedicationRecord: MedicationRecord = {
  id: 'med-gabapentina',
  slug: 'gabapentina',
  title: 'Gabapentina',
  activeIngredient: 'Gabapentina (ácido 1-(aminometil)ciclo-hexanoacético)',
  isControlled: true,
  controlNotice:
    'Medicamento sujeito a controle especial. No Brasil, a gabapentina é classificada na Lista C1 da Portaria SVS/MS nº 344/1998 (adicionada pelo item 80 da RDC nº 372/2020 e vigência atualizada). Exige Notificação de Receita em 2 (duas) vias branca (Receita de Controle Especial). A receita tem validade de 30 dias contados a partir da sua emissão, permitindo aquisição para até 60 dias de tratamento para dor neuropática e estresse situacional, ou até 6 meses no caso exclusivo de pacientes epilépticos em tratamento contínuo (com anotação obrigatória de anticonvulsivante na receita). A 1ª via é retida pela farmácia dispensadora e a 2ª via devolvida ao tutor carimbada. Formulações magistrais veterinárias também exigem receita em duas vias branca com retenção obrigatória da primeira via.',
  tradeNames: [
    'Neurontin 300 mg e 400 mg Cápsulas / 600 mg Comprimidos Revestidos (Pfizer — Referência Humana no Brasil)',
    'Gabapentina Genérico 300 mg e 400 mg Cápsulas (EMS, Medley, Eurofarma, Biosintética, Neo Química, Ache)',
    'Progresse 300 mg e 400 mg Cápsulas (Libbs — Humana)',
    'Gabaneurin 300 mg e 400 mg Cápsulas (Torrent — Humana)',
    'Gabapentina Cápsulas Magistrais Veterinárias Fracionadas (25 mg, 50 mg, 75 mg, 100 mg, 150 mg sob medida)',
    'Gabapentina Suspensão Oral Manipulada Veterinária Sem Xilitol (50 mg/mL e 100 mg/mL em veículo palatável seguro)',
    'Soluções Comerciais Líquidas Humanas (Neurontin Oral Solution 50 mg/mL e genéricos): ALERTA MÁXIMO — frequentemente contêm xilitol a 300 mg/mL, sendo estritamente contraindicadas para cães pelo risco fulminante de choque hipoglicêmico e necrose hepática aguda.',
  ],
  officialSiteUrl: 'https://www.drogasil.com.br/bulas/gabapentina',
  leafletUrl: 'https://consultaremedios.com.br/gabapentina/bula',
  imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/gabapentin/PNG',
  pharmacologicClass:
    'Gabapentinoide; Ligante da Subunidade Alfa-2-Delta-1 dos Canais de Cálcio Voltagem-Dependentes; Analgésico Adjuvante para Dor Neuropática e Sensibilização Central; Ansiolítico Situacional Pré-Visita Clínica e Fobia de Ruídos; Anticonvulsivante Adjuvante de Segunda Geração',
  species: ['dog', 'cat'],
  category: 'neurologia',
  tags: [
    'Gabapentina',
    'Gabapentin',
    'Neurontin',
    'Gabapentinoide',
    'Alfa-2-Delta',
    'VGCC',
    'Dor Neuropática',
    'Sensibilização Central',
    'Alodinia',
    'Hiperalgesia',
    'Wind-Up',
    'Ansiolítico Felino',
    'Pré-Visita Clínica',
    'Fear Free',
    'Fobia de Tempestade',
    'Fobia de Trovões',
    'Anticonvulsivante Adjuvante',
    'Epilepsia Refratária',
    'Doença Renal Crônica',
    'DRC Felina',
    'Alerta Xilitol',
    'Lista C1',
    'Receita 2 Vias Branca',
  ],

  plainLanguageSummary:
    'A gabapentina é um medicamento modulador do sistema nervoso amplamente empregado na rotina médica de cães e gatos, cuja principal finalidade reside no alívio de quadros de dor crônica neuropática com sensibilização medular, no relaxamento comportamental prévio a consultas clínicas e procedimentos estressantes em felinos e cães reativos, e como coadjuvante no manejo de convulsões refratárias. Embora seja um análogo estrutural do neurotransmissor inibitório GABA, ela não se liga a receptores gabaérgicos e sim à subunidade alfa-2-delta dos canais de cálcio voltagem-dependentes no sistema nervoso central, reduzindo a liberação excessiva de sinais excitatórios como glutamato e substância P que mantêm os circuitos de dor e ansiedade em hiperexcitação. Em gatos, seu uso consolidou-se mundialmente como ansiolítico de ação rápida fornecido cerca de duas horas antes da ida ao consultório veterinário para diminuir o medo e viabilizar o exame físico sem traumas, exigindo todavia redução de dose naqueles pacientes com doença renal crônica já que sua eliminação depende primordialmente dos rins. Por outro lado, a gabapentina não é um analgésico de resgate para dores inflamatórias agudas ou cirurgias imediatas e jamais deve substituir anestésicos locais, opioides ou anti-inflamatórios, além de requerer atenção máxima e veto absoluto a soluções orais humanas aromatizadas que contenham o adoçante xilitol, o qual deflagra hipoglicemia letal e insuficiência hepática fulminante em cães.',

  mechanismOfAction:
    'A gabapentina é um análogo estrutural lipofílico do neurotransmissor inibitório ácido gama-aminobutírico (GABA), porém seu mecanismo farmacológico não envolve ação direta sobre a neurotransmissão gabaérgica. Ela não se liga aos receptores GABA-A ou GABA-B, não é metabolizada em GABA, não inibe a GABA-transaminase e não altera a recaptação de GABA nas fendas sinápticas. Seu mecanismo celular de ação opera através de quatro eixos fundamentais: 1. Ligação de alta afinidade à subunidade auxiliar alfa-2-delta-1 (α2δ-1) dos canais de cálcio dependentes de voltagem (VGCCs tipos N e P/Q) expressos nos terminais pré-sinápticos do corno dorsal da medula espinhal, neocórtex, hipocampo e complexo amigdaloide. 2. Inibição do tráfego anterógrado de novos canais de cálcio para a membrana plasmática e redução do influxo iônico de cálcio desencadeado por potenciais de ação. 3. Supressão da exocitose vesicular de neurotransmissores excitatórios nociceptivos, incluindo L-glutamato, substância P, peptídeo relacionado ao gene da calcitonina (CGRP) e noradrenalina, atenuando os fenômenos de amplificação espinhal da dor conhecidos como wind-up e sensibilização central. 4. Redução da hiperexcitabilidade das redes neuronais talâmicas e límbicas envolvidas no medo aprendido e na ansiedade aguda, produzindo ansiólise situacional sem bloqueio generalizado da atividade neuronal motora basal.',

  indications: [
    'Tratamento adjuvante da dor crônica com componente neuropático (hérnia de disco intervertebral, radiculopatias, estenose lumbossacra degenerativa, dor oncológica e polineuropatias) em cães e gatos.',
    'Controle da sensibilização central, alodinia mecânica e hiperalgesia secundárias a osteoartrite crônica grave em cães e gatos, em protocolos multimodais combinados a AINEs ou anticorpos monoclonais.',
    'Ansiolítico situacional de curto prazo e sedativo leve para redução do estresse de transporte, manuseio clínico e hospitalização em gatos (protocolo pré-visita Fear Free).',
    'Tratamento da fobia a tempestades, trovões, fogos de artifício e eventos sonoros aversivos em cães.',
    'Redução da ansiedade e reatividade ao exame clínico e hospitalização em cães de difícil manejo comportamental.',
    'Terapia anticonvulsivante complementar (add-on) em cães com epilepsia idiopática refratária aos fármacos de primeira linha (fenobarbital, levetiracetam ou brometo de potássio).',
  ],

  contraindications: [
    'Hipersensibilidade conhecida à gabapentina ou a qualquer excipiente da formulação.',
    'VETO ABSOLUTO AO XILITOL: uso de soluções orais líquidas comerciais humanas formuladas com xilitol em pacientes caninos (deflagra liberação massiva de insulina com hipoglicemia severa, colapso convulsivo e necrose hepática aguda com coagulopatia fatal).',
    'Descontinuação abrupta após uso crônico: contraindicada pelo risco iminente de crises convulsivas por efeito rebote e recrudescimento súbito da dor neuropática; exige desmame gradual ao longo de 2 a 3 semanas.',
    'Monoterapia para dor cirúrgica aguda moderada a grave ou dor inflamatória aguda: a evidência clínica demonstra ineficácia como analgésico isolado; não substitui anestesia locorregional, opioides nem anti-inflamatórios.',
    'Administração por via transdérmica em gel PLO (pluronic lecithin organogel) em felinos: estudos farmacocinéticos demonstraram absorção errática, insignificante e clinicamente ineficaz, configurando falha terapêutica grave.',
  ],

  cautions: [
    'Medicamento de Controle Especial no Brasil: enquadrado na Lista C1 da Portaria SVS/MS nº 344/1998, exigindo Notificação de Receita em duas vias branca com validade de 30 dias contados da prescrição.',
    'Farmacocinética canina de meia-vida curta: a meia-vida no cão é de aproximadamente 2 a 4 horas (KuKanich & Cohen 2011), e não de 9 horas como sugerido em fontes antigas; esquemas a cada 12 horas geram flutuação plasmática excessiva, sendo o intervalo de 8 horas (q8h) farmacocineticamente superior para dor crônica.',
    'Doença Renal Crônica (DRC): a depuração da gabapentina é predominantemente renal em cães e quase exclusiva em gatos; em gatos com DRC estágios IRIS 2 a 4 a exposição sistêmica dobra ou triplica (Quimby et al. 2022), exigindo redução da dose pré-visita para aproximadamente 10 mg/kg.',
    'Sedação e ataxia motora dose-dependentes: sonolência e fraqueza proprioceptiva transitória de membros pélvicos são os efeitos mais comuns; iniciar com doses baixas e titular gradualmente para permitir tolerância farmacodinâmica.',
    'Interferência laboratorial com testes de proteinúria: a gabapentina pode gerar resultados falso-positivos de proteína em fitas reagentes urinárias convencionais (dipstick); confirmar com relação proteína:creatinina urinária (UPC) se clinicamente indicado.',
    'Associação com outros depressores centrais: potencialização de sonolência e hipotensão com opioides, trazodona, fenobarbital ou benzodiazepínicos; monitorar o paciente.',
  ],

  adverseEffects: [
    'Neurológicos e Motores: Sedação, sonolência profunda, letargia, ataxia proprioceptiva e paresia transitória de membros pélvicos (frequentes no início da terapia ou em doses altas; tendem a atenuar após 3 a 5 dias de administração contínua).',
    'Gastrintestinais: Vômitos transitórios, hiporexia esporádica e sialorreia reflexa (especialmente em gatos decorrente da manipulação ou do sabor amargo do conteúdo de cápsulas abertas).',
    'Comportamentais em Felinos: Desorientação transitória, miados graves ocasionais e comportamento de esfregar a face com euforia pré-sedativa.',
    'Metabólicos e de Longo Prazo: Polifagia e ganho progressivo de peso corporal em cães submetidos a tratamentos prolongados.',
    'Retirada / Abstinência: Hiperexcitabilidade, ansiedade de rebote e convulsões secundárias à interrupção abrupta de tratamentos crônicos.',
  ],

  interactions: [
    'Antiácidos e Quelantes de Fósforo (Hidróxido de Alumínio, Hidróxido de Magnésio): Reduzem a biodisponibilidade oral da gabapentina em aproximadamente 20% por adsorção gástrica; administrar a gabapentina com intervalo mínimo de 2 horas em relação aos antiácidos.',
    'Opioides (Morfina, Metadona, Fentanil, Buprenorfina, Tramadol): Potente sinergismo analgésico benéfico, acompanhado de somação de efeitos depressores do sistema nervoso central (sedação profunda e bradipneia); pode ser necessário reduzir as doses de um ou de ambos os fármacos.',
    'Trazodona: Sinergismo ansiolítico e sedativo muito útil para protocolo pré-visita em cães e gatos sob estresse extremo; monitorar ataxia e decúbito prolongado.',
    'Anticonvulsivantes (Fenobarbital, Levetiracetam, Brometo de Potássio): Efeito sedativo aditivo; excelente associação no manejo de convulsões refratárias sem alteração significativa no clearance metabólico hepático do fenobarbital.',
    'Benzodiazepínicos (Diazepam, Midazolam): Aumento marcante do relaxamento muscular, sonolência e perda de coordenação motora.',
    'Alfa-2 Agonistas (Dexmedetomidina, Xilazina): Potencialização profunda do efeito sedativo e hipotensor; animais previamente medicados com gabapentina necessitam de doses significativamente menores de dexmedetomidina para contenção ou pré-anestesia.',
    'Anti-inflamatórios Não Esteroidais (Meloxicam, Carprofeno, Robenacoxib) e Anti-NGF (Bedinvetmab, Frunevetmab): Sem interações farmacocinéticas adversas; combinação de eleição para controle multimodal de osteoartrite crônica grave.',
  ],

  routes: ['por via oral'],

  pillars: [
    {
      title: 'Bloqueio da Subunidade Alfa-2-Delta dos VGCC e Não Envolvimento com GABA',
      desc:
        'Mecanismo molecular de bloqueio da exocitose excitatória: Apesar de sua síntese química como análogo lipofílico do neurotransmissor inibitório GABA, a gabapentina não interage com receptores gabaérgicos, não inibe o catabolismo do GABA e não altera sua recaptação neuronal. Sua ação terapêutica decorre exclusivamente da ligação seletiva de alta afinidade à subunidade auxiliar alfa-2-delta-1 (α2δ-1) dos canais de cálcio voltagem-dependentes (VGCCs) pré-sinápticos no sistema nervoso central. Sob condições de sensibilização dolorosa ou hiperexcitabilidade, a expressão dessa subunidade aumenta expressivamente no corno dorsal da medula espinhal e nas estruturas límbicas. A gabapentina inibe o tráfego anterógrado dessas subunidades para a membrana neuronal e bloqueia o influxo de cálcio pré-sináptico, silenciando a liberação de glutamato, substância P e CGRP. Dessa forma, ela atua interrompendo o bombardeio excitatório que alimenta a sensibilização central e a dor neuropática crônica.',
    },
    {
      title: 'Desmistificação da Meia-Vida Canina (2 a 4 Horas) e Posologia Otimizada',
      desc:
        'Evidência farmacocinética versus o mito dos formulários antigos: Historicamente, manuais antigos e fichas não atualizadas citavam meia-vida canina de cerca de 9 horas para a gabapentina, recomendando administração a cada 12 horas. Contudo, os estudos farmacocinéticos primários de KuKanich & Cohen (2011) comprovaram que a meia-vida de eliminação plasmática no cão situa-se entre 3,3 e 3,4 horas tanto em doses de 10 mg/kg quanto de 20 mg/kg, com concentração máxima (Tmax) entre 1,3 e 1,5 horas. Adicionalmente, a absorção oral canina é mediada pelo carreador de aminoácidos LAT1 no intestino e apresenta saturação em doses crescentes (não proporcionalidade estrita). Em decorrência dessa meia-vida curta, a administração a cada 12 horas gera longos períodos de concentrações subterapêuticas; para controle sustentado da dor neuropática crônica, a posologia a cada 8 horas (q8h) é farmacocineticamente mandatória na espécie canina.',
    },
    {
      title: 'Ansiólise Pré-Visita Felina Consolidada e Ajuste Individual na DRC',
      desc:
        'Protocolo Fear Free validado e segurança na nefropatia crônica: A administração de gabapentina por via oral 90 a 120 minutos antes do transporte para a clínica veterinária consolidou-se como padrão-ouro internacional na medicina felina de baixo estresse (Fear Free). Ensaios clínicos randomizados duplo-cegos (van Haaften et al. 2017) demonstraram que a dose de 100 mg/gato reduz drasticamente os escores de estresse durante a viagem de carro e o exame clínico, viabilizando avaliação física complacente. No entanto, como a gabapentina é eliminada quase que 100% de forma inalterada pela filtração renal nos felinos, estudos de Quimby et al. (2022) alertam que gatos com Doença Renal Crônica (DRC estágios IRIS 2 a 4) exibem redução drástica na depuração sistêmica com risco de sedação prolongada e ataxia profunda por 12 a 24 horas. Em gatos idosos ou nefropatas crônicos, a dose pré-visita deve ser rigorosamente ajustada para 10 mg/kg (ou 50 mg/gato), reservando a dose de 100 mg apenas para gatos jovens, sadios ou sabidamente resistentes.',
    },
    {
      title: 'Alerta Toxicológico ao Xilitol e Manejo Mandatório de Desmame',
      desc:
        'Segurança contra formulações humanas líquidas e riscos de suspensão abrupta: Dois aspectos toxicológicos exigem atenção inflexível na prescrição da gabapentina: primeiro, o risco letal do xilitol presente como adoçante na quase totalidade das soluções orais líquidas comerciais de uso humano (Neurontin oral solution e similares contêm cerca de 300 mg/mL de xilitol). Nos cães, o xilitol desencadeia potente e descontrolada liberação de insulina pancreática com colapso hipoglicêmico refratário e necrose hepática fulminante em poucas horas; soluções líquidas em cães devem ser exclusivamente manipuladas em farmácias veterinárias com veículos aquosos seguros sem xilitol. Segundo, em tratamentos crônicos para epilepsia ou dor neuropática, a gabapentina nunca deve ser interrompida subitamente; a retirada abrupta pode precipitar estado de mal epiléptico ou crises convulsivas de rebote, além de alodinia intensa, impondo redução escalonada da posologia ao longo de 2 a 3 semanas.',
    },
  ],

  doses: [
    {
      id: 'dose-gaba-dog-neuropathic-start',
      species: 'dog',
      indication: 'Dor crônica neuropática ou sensibilização central — Início e titulação progressiva',
      doseMin: 5,
      doseMax: 10,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q8–12h',
      duration: 'Titular a cada 3 a 5 dias conforme tolerância e resposta clínica.',
      notes:
        'Iniciar no limite inferior de 5 mg/kg para permitir adaptação à sedação inicial. Se bem tolerado após 3 a 5 dias, elevar para a faixa de manutenção q8h. Formulações orais sólidas humanas (cápsulas 300 mg) ou cápsulas magistrais fracionadas.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-magistral',
      referenceIds: ['ref-kukanich-2011', 'ref-plumbs-10-gabapentin'],
    },
    {
      id: 'dose-gaba-dog-neuropathic-maintenance',
      species: 'dog',
      indication: 'Dor neuropática crônica estabelecida ou osteoartrite com sensibilização central',
      doseMin: 10,
      doseMax: 20,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q8h',
      duration: 'Uso contínuo crônico sob monitorização periódica; desmame gradual ao encerrar.',
      notes:
        'Devido à meia-vida canina curta de 3 a 4 horas, o regime a cada 8 horas (três vezes ao dia) é farmacocineticamente superior ao regime q12h para manter níveis séricos analgésicos constantes.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-neurontin-300',
      referenceIds: ['ref-kukanich-2011', 'ref-bsava-10-gabapentin'],
    },
    {
      id: 'dose-gaba-dog-epilepsy-adj',
      species: 'dog',
      indication: 'Epilepsia idiopática refratária canina — Anticonvulsivante adjuvante (add-on)',
      doseMin: 10,
      doseMax: 20,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q8h',
      duration: 'Terapia crônica contínua; nunca interromper abruptamente pelo risco de estado de mal epiléptico.',
      notes:
        'Adicionar aos anticonvulsivantes basais (fenobarbital, levetiracetam ou brometo). Em casos de controle parcial sem sedação limitante, a dose pode ser titulada até 30 mg/kg q8h sob supervisão de neurologista.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-neurontin-300',
      referenceIds: ['ref-platt-2006', 'ref-ettinger-9-gabapentin'],
    },
    {
      id: 'dose-gaba-dog-storm-phobia',
      species: 'dog',
      indication: 'Fobia de tempestades, trovões, fogos de artifício e eventos sonoros aversivos',
      doseMin: 25,
      doseMax: 30,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'dose única pontual administrada 90 a 120 minutos antes do evento sonoro',
      duration: 'Uso situacional pontual conforme necessidade.',
      notes:
        'Comprovado no ensaio clínico randomizado duplo-cego de Bleuer-Elsner et al. (2021). Pode ser repetido a cada 8 horas se a tempestade ou queima de fogos persistir, monitorando sedação e marcha.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-neurontin-300',
      referenceIds: ['ref-bleuer-elsner-2021'],
    },
    {
      id: 'dose-gaba-dog-previsit',
      species: 'dog',
      indication: 'Ansiedade situacional pré-visita clínica, hospitalização e manuseio estressante em cães',
      doseMin: 10,
      doseMax: 30,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'dose única administrada 90 a 120 minutos antes da consulta',
      duration: 'Uso situacional agudo.',
      notes:
        'Em animais moderadamente reativos, 10 a 20 mg/kg costumam ser suficientes; cães muito agressivos ou extremamente fóbicos podem demandar até 30 mg/kg, isoladamente ou combinados a trazodona.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-neurontin-300',
      referenceIds: ['ref-plumbs-10-gabapentin'],
    },
    {
      id: 'dose-gaba-cat-neuropathic',
      species: 'cat',
      indication: 'Dor crônica neuropática ou osteoartrite felina com componente neuropático',
      doseMin: 5,
      doseMax: 10,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'q8–12h',
      duration: 'Uso contínuo crônico sob monitoração periódica; titular para menor dose eficaz.',
      notes:
        'Iniciar com 5 mg/kg q12h e aumentar gradualmente. A sedação inicial em felinos costuma diminuir após a primeira semana de terapia contínua. Utilizar cápsulas manipuladas fracionadas.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-magistral',
      referenceIds: ['ref-guedes-2018', 'ref-bsava-10-gabapentin'],
    },
    {
      id: 'dose-gaba-cat-previsit-healthy',
      species: 'cat',
      indication: 'Ansiólise pré-visita clínica, transporte e manuseio em gatos jovens e saudáveis',
      doseMin: 50,
      doseMax: 100,
      doseUnit: 'mg/gato',
      perWeightUnit: 'dose fixa por animal',
      route: 'VO',
      frequency: 'dose única administrada 90 a 120 minutos antes de colocar o animal na caixa de transporte',
      duration: 'Uso situacional pontual.',
      notes:
        'Validado no ensaio clínico randomizado de van Haaften et al. (2017). Doses de 100 mg/gato são recomendadas para adultos saudáveis (acima de 3 kg); para gatos pequenos (< 3 kg) ou idosos, preferir 50 mg/gato.',
      calculatorEnabled: false,
      presentationId: 'pres-gaba-caps-magistral',
      referenceIds: ['ref-van-haaften-2017'],
    },
    {
      id: 'dose-gaba-cat-previsit-ckd',
      species: 'cat',
      indication: 'Ansiólise pré-visita clínica em gatos idosos ou com Doença Renal Crônica (DRC IRIS 2 a 4)',
      doseMin: 10,
      doseMax: 10,
      doseUnit: 'mg',
      perWeightUnit: 'kg',
      route: 'VO',
      frequency: 'dose única administrada cerca de 2 horas antes da consulta',
      duration: 'Uso situacional pontual sob vigilância.',
      notes:
        'Estudo PK de Quimby et al. (2022) demonstrou que gatos com DRC têm clearance renal reduzido e acumulam o fármaco; a dose padrão de 100 mg causa sedação prolongada e hipotermia nesses animais. Limitar a ~10 mg/kg.',
      calculatorEnabled: true,
      presentationId: 'pres-gaba-caps-magistral',
      referenceIds: ['ref-quimby-2022-ckd'],
    },
  ],

  presentations: [
    {
      id: 'pres-gaba-caps-magistral',
      name: 'Gabapentina Cápsulas Magistrais Veterinárias Fracionadas',
      brand: 'Farmácia de Manipulação Veterinária Autorizada',
      form: 'cápsulas orais',
      concentrationValue: 50,
      concentrationUnit: 'mg',
      concentrationOptions: [
        { id: 'opt-25mg', label: 'Cápsulas de 25 mg', concentrationValue: 25, concentrationUnit: 'mg' },
        { id: 'opt-50mg', label: 'Cápsulas de 50 mg', concentrationValue: 50, concentrationUnit: 'mg', isDefault: true },
        { id: 'opt-75mg', label: 'Cápsulas de 75 mg', concentrationValue: 75, concentrationUnit: 'mg' },
        { id: 'opt-100mg', label: 'Cápsulas de 100 mg (Dose clássica para gatos saudáveis)', concentrationValue: 100, concentrationUnit: 'mg' },
        { id: 'opt-150mg', label: 'Cápsulas de 150 mg', concentrationValue: 150, concentrationUnit: 'mg' },
      ],
      packInfo: 'Frasco plástico contendo 20, 30 ou 60 cápsulas com excipiente inerte seguro (amido/celulose)',
      route: 'por via oral',
      channel: 'compounded',
      scoringInfo: 'Não divisível; cápsula magistral acondicionada em dosagem unitária exata.',
      packageDescription:
        'Cápsulas gelatinosas contendo pó branco fino de gabapentina pura, manipuladas na concentração exata prescrita para o peso do paciente.',
    },
    {
      id: 'pres-gaba-susp-magistral',
      name: 'Gabapentina Suspensão Oral Veterinária Sem Xilitol',
      brand: 'Farmácia de Manipulação Veterinária Autorizada',
      form: 'suspensão oral',
      concentrationValue: 50,
      concentrationUnit: 'mg/mL',
      concentrationOptions: [
        { id: 'opt-susp-50', label: 'Suspensão 50 mg/mL', concentrationValue: 50, concentrationUnit: 'mg/mL', isDefault: true },
        { id: 'opt-susp-100', label: 'Suspensão 100 mg/mL', concentrationValue: 100, concentrationUnit: 'mg/mL' },
      ],
      packInfo: 'Frasco âmbar de 30 mL ou 60 mL acompanhado de seringa dosadora graduada',
      route: 'por via oral',
      channel: 'compounded',
      packageDescription:
        'Suspensão homogênea saborizada (frango, peixe ou carne) rigorosamente isenta de xilitol, álcool e propilenoglicol, segura para cães e gatos.',
    },
    {
      id: 'pres-gaba-caps-neurontin-300',
      name: 'Neurontin 300 mg Cápsulas / Gabapentina Genérico 300 mg',
      brand: 'Pfizer / Medicamentos Genéricos (EMS, Medley, Eurofarma)',
      form: 'cápsulas orais',
      concentrationValue: 300,
      concentrationUnit: 'mg',
      packInfo: 'Embalagem contendo 30 ou 60 cápsulas duras',
      route: 'por via oral',
      channel: 'human_pharmacy',
      scoringInfo: 'Cápsula gelatinosa dura não divisível; não abrir o invólucro para cães pelo sabor amargo irritante.',
      packageDescription: 'Apresentação comercial humana de referência, útil para cães de médio a grande porte (acima de 15–20 kg).',
    },
    {
      id: 'pres-gaba-caps-neurontin-400',
      name: 'Neurontin 400 mg Cápsulas / Gabapentina Genérico 400 mg',
      brand: 'Pfizer / Medicamentos Genéricos',
      form: 'cápsulas orais',
      concentrationValue: 400,
      concentrationUnit: 'mg',
      packInfo: 'Embalagem contendo 30 cápsulas duras',
      route: 'por via oral',
      channel: 'human_pharmacy',
      scoringInfo: 'Não divisível.',
      packageDescription: 'Apresentação comercial humana indicada para cães de grande porte (> 25 kg) ou doses elevadas de fobia.',
    },
    {
      id: 'pres-gaba-comp-600',
      name: 'Neurontin 600 mg Comprimidos Revestidos Divisíveis',
      brand: 'Pfizer',
      form: 'comprimidos revestidos divisíveis',
      concentrationValue: 600,
      concentrationUnit: 'mg',
      packInfo: 'Embalagem contendo 30 comprimidos revestidos com sulco',
      route: 'por via oral',
      channel: 'human_pharmacy',
      scoringInfo: 'Comprimido revestido com vinco central; permite partição em duas metades iguais de 300 mg.',
      packageDescription: 'Comprimidos revestidos brancos sulcados, permitindo ajuste posológico para cães grandes.',
    },
  ],

  pharmacokineticsData: {
    absorption:
      'Absorção rápida pelo carreador de L-aminoácidos neutros (LAT1) no intestino delgado, com biodisponibilidade de ~80% em doses baixas (10 mg/kg) e saturação não linear em doses elevadas (> 20-30 mg/kg). Em gatos, a biodisponibilidade oral atinge 89-95%. Via transdérmica em gel PLO é errática (< 15%) e ineficaz.',
    distribution:
      'Volume de distribuição de ~0,8 L/kg em cães e ~0,65 L/kg em gatos. Baixa ligação a proteínas plasmáticas (< 3%), permitindo ampla difusão tecidual e penetração liquórica (líquor atinge cerca de 20% da concentração sérica).',
    metabolism:
      'Em cães, cerca de 30% a 40% da dose sofre metabolização hepática em N-metil-gabapentina. Em gatos e seres humanos, não há metabolização hepática mensurável, dependendo quase que exclusivamente de depuração renal.',
    elimination:
      'Eliminação renal predominante por filtração glomerular e secreção tubular (60-70% inalterada em cães; quase 100% inalterada em gatos). Em gatos com DRC IRIS 2 a 4, a depuração cai acentuadamente e a meia-vida se estende para 10 a 15 horas, exigindo redução posológica.',
    halfLife:
      'Meia-vida plasmática de 3,3 a 3,4 horas no cão (impondo administração a cada 8 horas para controle contínuo da dor neuropática) e de 3,6 a 4,0 horas em gatos hígidos.',
    plasmaBinding: '< 3% (desprezível)',
    cnsPenetration: 'Boa penetração no SNC (concentração no líquor atinge cerca de 20% dos níveis plasmáticos)',
  },

  practicalWeightTable: {
    standardDoseText: 'Guia Posológico Prático de Gabapentina por Faixa de Peso e Indicação',
    headers: [
      'Peso do Paciente',
      'Dor Crônica Neuropática (q8h)',
      'Ansiólise Pré-Visita / Fobia',
      'Apresentação Sugerida',
    ],
    rows: [
      {
        weight: '2 kg (Gato Pequeno ou Cão Toy)',
        totalDose: '10 a 20 mg VO q8–12h',
        col1: '20 mg VO (gato renal) a 50 mg VO (gato hígido)',
        col2: 'Cápsula manipulada 25 mg ou suspensão veterinária 50 mg/mL (0,2 a 0,5 mL)',
      },
      {
        weight: '4 kg (Gato Padrão Adulto)',
        totalDose: '20 a 40 mg VO q8–12h',
        col1: '40 mg VO (gato renal) a 100 mg VO (gato hígido pré-visita)',
        col2: 'Cápsula magistral de 50 mg ou 100 mg / Suspensão oral 50 mg/mL (1 a 2 mL)',
      },
      {
        weight: '10 kg (Cão Pequeno a Médio)',
        totalDose: '100 a 150 mg VO q8h',
        col1: '250 a 300 mg VO dose única (fobia / tempestade)',
        col2: '1 cápsula humana genérica de 300 mg (fobia) ou cápsula manipulada 100 mg q8h',
      },
      {
        weight: '20 kg (Cão Porte Médio)',
        totalDose: '200 a 300 mg VO q8h',
        col1: '500 a 600 mg VO dose única (fobia / transporte)',
        col2: '1 cápsula humana 300 mg q8h ou 1 comprimido 600 mg divisível (fobia)',
      },
      {
        weight: '30 kg (Cão Grande Porte)',
        totalDose: '300 a 450 mg VO q8h',
        col1: '750 a 900 mg VO dose única (fobia / ruídos)',
        col2: '1 cápsula 400 mg q8h ou 1 e 1/2 comprimido 600 mg (fobia)',
      },
      {
        weight: '40 kg (Cão Gigante)',
        totalDose: '400 a 600 mg VO q8h',
        col1: '1000 a 1200 mg VO dose única (fobia severa)',
        col2: '1 comprimido 600 mg q8h (dor crônica) ou 2 comprimidos 600 mg (fobia)',
      },
    ],
  },

  samplePrescriptionText:
    'USO VETERINÁRIO — RECEITA DE CONTROLE ESPECIAL (PORTARIA SVS/MS Nº 344/1998 — LISTA C1 — 2 VIAS BRANCA)\\n\\n' +
    'MODELO 1 — ANSIÓLISE FELINA PRÉ-VISITA CLÍNICA (GATO ADULTO SAUDÁVEL 4 KG):\\n' +
    'IDENTIFICAÇÃO DO EMITENTE: Dr(a). [Nome do Médico Veterinário], CRMV-[UF] nº [XXXXX]\\n' +
    'IDENTIFICAÇÃO DO TUTOR: [Nome do Tutor], CPF: [000.000.000-00], Endereço: [Endereço Completo]\\n' +
    'IDENTIFICAÇÃO DO PACIENTE: [Nome do Felino], Espécie: Felina, Raça: SRD, Peso: 4,0 kg\\n\\n' +
    'PRESCRIÇÃO:\\n' +
    '1. Gabapentina 100 mg ---------------------------------------------------------------------------------- 2 cápsulas gelatinosas\\n' +
    '   (Manipular em cápsulas com veículo inerte em farmácia veterinária autorizada)\\n' +
    '   Posologia: Administrar 1 (uma) cápsula por via oral cerca de 90 a 120 minutos antes de colocar o paciente na caixa de transporte para o deslocamento até o hospital veterinário.\\n\\n' +
    'DADOS DA FARMÁCIA DISPENSADORA / RETENÇÃO DE VIA:\\n' +
    'Primeira via: Retenção da Farmácia / Segunda via: Orientação do Tutor.\\n' +
    'Data de emissão: [DD/MM/AAAA] — Assinatura e Carimbo do Médico Veterinário\\n\\n' +
    '------------------------------------------------------------------------------------------------------\\n\\n' +
    'MODELO 2 — DOR NEUROPÁTICA CRÔNICA POR DISCOPATIA EM CÃO (15 KG):\\n' +
    'PRESCRIÇÃO:\\n' +
    '1. Gabapentina 150 mg ---------------------------------------------------------------------------------- 90 cápsulas\\n' +
    '   (Manipulação veterinária em cápsulas fracionadas sob medida)\\n' +
    '   Posologia: Administrar 1 (uma) cápsula por via oral a cada 8 horas (três vezes ao dia), continuamente por 30 dias. Não interromper o tratamento de maneira súbita.\\n' +
    '   ATENÇÃO: Havendo necessidade de suspensão futura, a dosagem deverá ser reduzida de forma gradativa ao longo de 2 a 3 semanas sob orientação médica veterinária.',

  clinicalStudiesCommented: [
    {
      title: 'Pharmacokinetics of oral gabapentin in Greyhounds',
      authorsYear: 'KuKanich B, Cohen RL. (2011)',
      journal: 'Veterinary Journal',
      studyDesign: 'Ensaio farmacocinético prospectivo cruzado em cães saudáveis',
      sampleSize: '6 cães da raça Greyhound',
      mainFindings:
        'Demonstrou que a gabapentina administrada oralmente a 10 mg/kg e 20 mg/kg apresenta pico plasmático rápido (Tmax 1,3–1,5 horas) e meia-vida de eliminação plasmática curta de 3,3 horas (10 mg/kg) e 3,4 horas (20 mg/kg). A absorção mostrou evidência de saturação em doses crescentes. Os cães metabolizaram parte do fármaco em N-metil-gabapentina.',
      clinicalTakeaway:
        'Derrubou definitivamente o mito de meia-vida canina de 9 horas, estabelecendo que a meia-vida real no cão é de aproximadamente 3 a 4 horas e que a administração a cada 8 horas (q8h) é necessária para manter concentrações plasmáticas estáveis na dor crônica.',
      referenceId: 'ref-kukanich-2011',
    },
    {
      title: 'The pharmacokinetics of gabapentin in cats when administered orally as a solution, a capsule, or transdermally in pluronic lecithin organogel',
      authorsYear: 'Adrian D, et al. (2018)',
      journal: 'Journal of Feline Medicine and Surgery',
      studyDesign: 'Estudo farmacocinético prospectivo cruzado comparativo de vias de administração',
      sampleSize: '6 gatos adultos hígidos de laboratório',
      mainFindings:
        'A administração oral de gabapentina (solução ou cápsula) resultou em rápida absorção (Tmax ~1,0 h) e alta biodisponibilidade (89% a 95%) com meia-vida plasmática de 3,6 a 3,8 horas. Por outro lado, a formulação transdérmica em gel PLO apresentou biodisponibilidade extremamente baixa e concentrações séricas subclínicas.',
      clinicalTakeaway:
        'Comprovou que a via oral é altamente confiável e bioequivalente em gatos, mas a via transdérmica em gel PLO é ineficaz e não deve ser recomendada para uso clínico.',
      referenceId: 'ref-adrian-2018',
    },
    {
      title: 'Effects of a single preappointment dose of gabapentin on signs of stress in cats during transportation and veterinary examination',
      authorsYear: 'van Haaften KA, et al. (2017)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e controlado por placebo cruzado',
      sampleSize: '20 gatos de clientes com histórico de estresse em consultas veterinárias',
      mainFindings:
        'A administração de 100 mg de gabapentina por gato 90 minutos antes do transporte reduziu significativamente os escores de estresse durante a viagem de carro e o exame clínico (P < 0,001), aumentando a complacência e viabilizando o exame físico completo com mínima resistência.',
      clinicalTakeaway:
        'Consolidou o protocolo de 100 mg/gato como padrão-ouro de baixo estresse (Fear Free) para transporte e manuseio de gatos sadios em consultas veterinárias.',
      referenceId: 'ref-van-haaften-2017',
    },
    {
      title: 'Pharmacokinetics of gabapentin in cats with chronic kidney disease',
      authorsYear: 'Quimby JM, et al. (2022)',
      journal: 'Journal of Veterinary Internal Medicine',
      studyDesign: 'Estudo farmacocinético comparativo entre gatos jovens sadios e gatos com DRC',
      sampleSize: 'Gatos com Doença Renal Crônica estágios IRIS 2 e 3 versus controles hígidos',
      mainFindings:
        'A depuração plasmática da gabapentina diminuiu expressivamente nos gatos nefropatas, correlacionando-se com os níveis de creatinina sérica e SDMA. A exposição sistêmica normalizada pela dose aumentou substancialmente e a meia-vida foi prolongada.',
      clinicalTakeaway:
        'Justifica a redução da dose pré-visita para aproximadamente 10 mg/kg em gatos com DRC para evitar sedação excessiva, ataxia e depressão neurológica prolongada.',
      referenceId: 'ref-quimby-2022-ckd',
    },
    {
      title: 'A randomized, double-blind, placebo-controlled clinical trial of gabapentin for noise phobia in dogs',
      authorsYear: 'Bleuer-Elsner S, et al. (2021)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico randomizado prospectivo, duplo-cego e placebo-controlado',
      sampleSize: 'Cães de proprietários com fobia documentada a ruídos e tempestades',
      mainFindings:
        'Cães tratados com gabapentina na dose de 25 a 30 mg/kg administrada 90 minutos antes do evento de tempestade apresentaram redução estatisticamente significativa nos escores de ansiedade, ofegação, tremores e tentativa de fuga comparados ao placebo.',
      clinicalTakeaway:
        'Validou a eficácia e segurança do protocolo de 25 a 30 mg/kg em dose única aguda para controle situacional de fobias sonoras caninas.',
      referenceId: 'ref-bleuer-elsner-2021',
    },
    {
      title: 'Evaluation of the effects of gabapentin on osteoarthritis pain in cats: a randomized, double-blind, placebo-controlled trial',
      authorsYear: 'Guedes AGP, et al. (2018)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico randomizado prospectivo, duplo-cego e placebo-controlado',
      sampleSize: 'Gatos idosos com osteoartrite crônica confirmada por radiografia e actimetria',
      mainFindings:
        'A gabapentina na dose de 10 mg/kg q12h reduziu escores de dor articular avaliados pelos tutores; contudo, a sedação e a ataxia motora foram efeitos adversos frequentes que impactaram temporariamente a atividade espontânea dos pacientes.',
      clinicalTakeaway:
        'Demonstrou eficácia adjuvante na osteoartrite crônica felina, ressaltando a importância de titular a dose a partir de 5 mg/kg para mitigar a sedação excessiva.',
      referenceId: 'ref-guedes-2018',
    },
    {
      title: 'The effect of gabapentin on seizure frequency in dogs with refractory epilepsy: a randomized, prospective, blinded, crossover study',
      authorsYear: 'Platt SR, et al. (2006)',
      journal: 'Veterinary Journal',
      studyDesign: 'Ensaio clínico prospectivo randomizado cruzado cego',
      sampleSize: '11 cães com epilepsia idiopática refratária a fenobarbital e brometo de potássio',
      mainFindings:
        'A adição de gabapentina na dose de 10 mg/kg a cada 8 horas reduziu significativamente a frequência semanal de crises epilépticas em parte dos cães avaliados, com tolerabilidade clínica aceitável e sedação transitória leve.',
      clinicalTakeaway:
        'Sustenta o uso da gabapentina como anticonvulsivante de resgate add-on em cães epilépticos refratários aos fármacos tradicionais de primeira linha.',
      referenceId: 'ref-platt-2006',
    },
    {
      title: 'Effect of oral gabapentin on postoperative pain in dogs undergoing forelimb amputation',
      authorsYear: 'Wagner AE, et al. (2010)',
      journal: 'Journal of the American Veterinary Medical Association (JAVMA)',
      studyDesign: 'Ensaio clínico prospectivo, randomizado, duplo-cego e placebo-controlado',
      sampleSize: 'Cães submetidos a amputação cirúrgica de membro torácico',
      mainFindings:
        'A gabapentina oral administrada perioperatoriamente não reduziu os escores de dor pós-operatória aguda nem o consumo suplementar de opioides em comparação com o grupo controle sob protocolo multimodal padrão com anestesia locorregional e morfina.',
      clinicalTakeaway:
        'Evidência seminal comprovando que a gabapentina não é eficaz como analgésico de resgate para dor aguda nociceptiva/cirúrgica, reafirmando que seu nicho analgésico é restrito à dor neuropática crônica e sensibilização central.',
      referenceId: 'ref-wagner-2010',
    },
  ],

  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
    'doencas-trato-urinario-inferior-felino-dtuif',
    'doenca-renal-cronica-caes-gatos',
  ],

  references: [
    {
      id: 'ref-kukanich-2011',
      citationText: 'KuKanich B, Cohen RL. Pharmacokinetics of oral gabapentin in Greyhounds. Vet J. 2011;187(1):133-135.',
      sourceType: 'Estudo farmacocinético prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19854080/',
      notes: 'Demonstrou t1/2 canina de 3,3 a 3,4 horas e saturação de absorção, superando o mito de 9 horas.',
      evidenceLevel: 'Nível II — Estudo farmacocinético analítico rigoroso em espécie-alvo',
    },
    {
      id: 'ref-adrian-2018',
      citationText: 'Adrian D, et al. The pharmacokinetics of gabapentin in cats when administered orally as a solution, a capsule, or transdermally in pluronic lecithin organogel. J Feline Med Surg. 2018;20(8):714-722.',
      sourceType: 'Estudo farmacocinético comparativo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29058564/',
      notes: 'Biodisponibilidade oral de 95% versus ineficácia da via transdérmica em gel PLO.',
      evidenceLevel: 'Nível II — Estudo farmacocinético comparativo de formulações',
    },
    {
      id: 'ref-van-haaften-2017',
      citationText: 'van Haaften KA, et al. Effects of a single preappointment dose of gabapentin on signs of stress in cats during transportation and veterinary examination. J Am Vet Med Assoc. 2017;251(10):1175-1181.',
      sourceType: 'Ensaio clínico randomizado (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29094947/',
      notes: 'Validação da dose de 100 mg/gato para ansiólise pré-visita e transporte de felinos.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado, duplo-cego e placebo-controlado',
    },
    {
      id: 'ref-quimby-2022-ckd',
      citationText: 'Quimby JM, et al. Pharmacokinetics of gabapentin in cats with chronic kidney disease. J Vet Intern Med. 2022;36(5):1676-1682.',
      sourceType: 'Estudo clínico e farmacocinético',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36000216/',
      notes: 'Redução do clearance renal de gabapentina em gatos com DRC; recomendação de redução de dose para 10 mg/kg.',
      evidenceLevel: 'Nível II — Estudo clínico farmacocinético em população patológica',
    },
    {
      id: 'ref-bleuer-elsner-2021',
      citationText: 'Bleuer-Elsner S, et al. A randomized, double-blind, placebo-controlled clinical trial of gabapentin for noise phobia in dogs. J Am Vet Med Assoc. 2021;259(11):1293-1301.',
      sourceType: 'Ensaio clínico randomizado (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34788102/',
      notes: 'Eficácia de 25 a 30 mg/kg VO de gabapentina no controle de fobia a tempestades em cães.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado, duplo-cego e placebo-controlado',
    },
    {
      id: 'ref-guedes-2018',
      citationText: 'Guedes AGP, et al. Evaluation of the effects of gabapentin on osteoarthritis pain in cats: a randomized, double-blind, placebo-controlled trial. J Am Vet Med Assoc. 2018;253(5):579-585.',
      sourceType: 'Ensaio clínico randomizado (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30113264/',
      notes: 'Eficácia na dor por osteoartrite crônica felina e monitorização da sedação motora.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado, duplo-cego e placebo-controlado',
    },
    {
      id: 'ref-platt-2006',
      citationText: 'Platt SR, et al. The effect of gabapentin on seizure frequency in dogs with refractory epilepsy: a randomized, prospective, blinded, crossover study. Vet J. 2006;172(3):476-480.',
      sourceType: 'Ensaio clínico cruzado prospectivo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/16084749/',
      notes: 'Uso de gabapentina 10 mg/kg q8h como adjuvante em cães com epilepsia idiopática refratária.',
      evidenceLevel: 'Nível II — Ensaio clínico controlado cruzado cego em espécie-alvo',
    },
    {
      id: 'ref-wagner-2010',
      citationText: 'Wagner AE, et al. Effect of oral gabapentin on postoperative pain in dogs undergoing forelimb amputation. J Am Vet Med Assoc. 2010;236(7):751-756.',
      sourceType: 'Ensaio clínico randomizado (RCT)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/20367045/',
      notes: 'Demonstrou ineficácia da gabapentina como analgésico único em dor aguda cirúrgica por amputação.',
      evidenceLevel: 'Nível I — Ensaio clínico randomizado negativo prospectivo',
    },
    {
      id: 'ref-plumbs-10-gabapentin',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. VetMedux/Wiley-Blackwell; 2023. Monografia “Gabapentin”, pp. 568–570.',
      sourceType: 'Formulário veterinário de referência',
      url: null,
      notes: 'Monografia especializada com farmacologia, dosagens e orientações toxicológicas sobre xilitol.',
      evidenceLevel: 'Referência terciária veterinária padrão-ouro internacional',
    },
    {
      id: 'ref-bsava-10-gabapentin',
      citationText: 'Ramsey I, ed. BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. British Small Animal Veterinary Association; 2020. Monografia “Gabapentin”, pp. 179–180.',
      sourceType: 'Formulário terapêutico britânico',
      url: null,
      notes: 'Posologia de 10 a 20 mg/kg q6-8h em cães e 5 a 10 mg/kg q8-12h em gatos.',
      evidenceLevel: 'Referência terciária britânica especializada',
    },
    {
      id: 'ref-aaha-pain-2022',
      citationText: '2022 AAHA Pain Management Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2022;58(2):55-76.',
      sourceType: 'Consenso / Diretriz de prática clínica',
      url: 'https://www.aaha.org/resources/2022-aaha-pain-management-guidelines-for-dogs-and-cats/',
      notes: 'Contextualização de que eficácia não foi demonstrada para dor aguda e a evidência para dor crônica canina é modesta.',
      evidenceLevel: 'Consenso internacional de especialistas baseado em diretrizes clínicas',
    },
    {
      id: 'ref-ettinger-9-gabapentin',
      citationText: 'Ettinger SJ, Feldman EC, Côté E. Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 43 (Pain Assessment and Management) e Cap. 247 (Epilepsy and Brain Disorders), pp. 242–248, 1482–1488.',
      sourceType: 'Tratado de medicina interna veterinária',
      url: null,
      notes: 'Diretrizes de manejo para dor neuropática e terapia adjuvante em crises convulsivas refratárias.',
      evidenceLevel: 'Tratado veterinário padrão-ouro internacional de medicina interna',
    },
    {
      id: 'ref-nelson-couto-6-gabapentin',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2019. Cap. 62 (Seizures) e Cap. 64 (Pain Management), pp. 1008–1014, 1032–1038.',
      sourceType: 'Tratado de medicina interna veterinária',
      url: null,
      notes: 'Abordagem da dor crônica com componente neuropático e uso add-on em cães e gatos.',
      evidenceLevel: 'Tratado de referência clássica em clínica médica de pequenos animais',
    },
  ],
};
