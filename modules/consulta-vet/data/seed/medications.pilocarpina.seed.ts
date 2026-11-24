import { MedicationRecord } from '../../types/medication';

export const pilocarpinaMedicationRecord: MedicationRecord = {
  id: 'pilocarpina',
  slug: 'pilocarpina',
  title: 'Pilocarpina (Cloridrato de Pilocarpina)',
  activeIngredient: 'Cloridrato de pilocarpina',
  isControlled: false,
  controlNotice:
    'Medicamento de uso humano (tarja vermelha — venda sob prescrição com receita simples). Não integra as listas de controle especial da Portaria SVS/MS nº 344/1998. Em Medicina Veterinária, o emprego das apresentações comerciais oftálmicas por via oral ou diluída configura uso extrabula e exige orientação expressa de fracionamento seguro.',
  tradeNames: [
    'Pilocan® 2% (Cristália)',
    'Pilocarpina® 1%, 2% e 4% (Allergan)',
    'Colírio manipulado diluído (0,05% a 0,25%)',
  ],
  officialSiteUrl:
    'https://www.cristalia.com.br/produto/solucao-oftalmica-esteril-20-mgml-20',
  leafletUrl:
    'https://img.drogasil.com.br/raiadrogasil_bula/PILOCARPINA.pdf',
  imageUrl: null,
  priceReference: null,
  pharmacologicClass:
    'Agonista colinérgico muscarínico direto (parassimpaticomimético natural; alcaloide imidazólico; miótico e secretor lacrimal)',
  species: ['dog', 'cat'],
  category: 'oftalmologia',
  tags: [
    'Pilocarpina',
    'Cloridrato de pilocarpina',
    'CCS neurogênica',
    'Ceratoconjuntivite seca',
    'Xeromicteria',
    'Olho seco neurogênico',
    'Parassimpaticomimético',
    'Agonista muscarínico',
    'Miótico',
    'Disautonomia',
    'Hipersensibilidade por desnervação',
    'Oftalmologia',
    'Glaucoma',
    'Sialorreia',
    'Titulação por gotas',
    'Toxicidade colinérgica',
  ],
  plainLanguageSummary:
    'A pilocarpina estimula diretamente receptores muscarínicos (principalmente M3 e M2), mimetizando a acetilcolina para ativar glândulas lacrimais e salivares e contrair o esfíncter da íris e o músculo ciliar. Em pequenos animais, seu papel clínico principal é restaurar a produção lacrimal na ceratoconjuntivite seca neurogênica em cães (geralmente por via oral com titulação gradual em gotas) e auxiliar no diagnóstico de desnervação parassimpática ocular e disautonomia. Uso oftálmico antiglaucomatoso hoje é restrito e perde eficácia diante de análogos de prostaglandinas e inibidores da anidrase carbônica; intoxicação colinérgica é risco real mesmo usando gotas oftálmicas por via oral.',
  mechanismOfAction:
    'Alcaloide imidazólico natural extraído de plantas do gênero Pilocarpus que atua como agonista direto não seletivo dos receptores muscarínicos pós-juncionais (M1–M5), sem depender da inibição da acetilcolinesterase. Nos receptores M3 acoplados à proteína Gq/11 (via fosfolipase C, IP₃ e DAG com mobilização de cálcio intracelular), estimula diretamente as glândulas exócrinas — especialmente lacrimais, salivares, nasais (mucosa respiratória/plano nasal) e gastrointestinais — mesmo quando há lesão pré-ganglionar ou pós-ganglionar da via parassimpática, desde que o tecido glandular permaneça viável (base para o uso na CCS neurogênica e xeromicteria). No globo ocular, o agonismo M3 promove contração do músculo esfíncter da íris (miose acentuada, útil em testes de hipersensibilidade por desnervação e na tentativa histórica de desobstruir o ângulo iridocorneal) e contração do músculo ciliar, facilitando o escoamento trabecular do humor aquoso. Em receptores M2 (proteína Gi/o), reduz AMPc e ativa canais de K⁺ em tecido nodal e atrial, explicando bradicardia ou bloqueios na toxicidade sistêmica.',
  indications: [
    'Ceratoconjuntivite seca (CCS) neurogênica em cães, frequentemente associada à xeromicteria ipsilateral (ressecamento nasal) e déficits de nervos cranianos (administração oral com titulação progressiva em gotas misturada ao alimento úmido, ou via oftálmica diluída 0,05%–0,25%).',
    'Teste diagnóstico farmacológico de hipersensibilidade por desnervação pupilar (suspeita de disautonomia canina ou felina, ou lesão pós-ganglionar do nervo oculomotor / gânglio ciliar) utilizando colírio diluído (0,05%–0,1%).',
    'Suporte paliativo lacrimal e redução de fotofobia em pacientes selecionados com disautonomia (colírio a 1% tópico ou esquema oral cauteloso em cães).',
    'Uso antiglaucomatoso oftálmico de terceira linha/histórico exclusivamente em cães com glaucoma primário de ângulo aberto (1% ou 2% tópico q8h–q12h), quando agentes modernos não estão disponíveis ou como adjuvante pontual.',
  ],
  contraindications: [
    'Uveíte anterior ativa ou glaucoma secundário à uveíte: a pilocarpina agrava a quebra da barreira hematoaquosa, induz miose intensa com risco de sinéquias posteriores, íris em tomate/seclusão pupilar e agravamento da dor ocular por espasmo ciliar.',
    'Luxação ou subluxação anterior/posterior do cristalino: a constrição pupilar pode desencadear bloqueio pupilar agudo e elevação catastrófica da pressão intraocular.',
    'Doença respiratória hiperreativa ou broncoespasmo ativo (especialmente asma felina ou bronquite grave): o estímulo colinérgico M3 promove broncoconstrição e hipersecreção mucoide das vias aéreas.',
    'Bradiarritmias significativas, bloqueio atrioventricular de alto grau ou cardiopatia descompensada sensível à hipertonia vagal (sobretudo no uso sistêmico/oral).',
    'Obstrução mecânica gastrointestinal ou urinária (risco de hipermotilidade espástica, perfuração ou agravamento da obstrução).',
    'Hipersensibilidade conhecida ao princípio ativo ou a excipientes (ex.: cloreto de benzalcônio na formulação oftálmica).',
  ],
  cautions: [
    'Uso sistêmico ou oral em cães e especialmente em gatos exige vigilância estrita quanto aos sinais da síndrome colinérgica SLUDDE (salivação, lacrimejamento excessivo, micção, defecação/diarreia, dispneia/broncoespasmo e êmese).',
    'Gatos apresentam baixa tolerância ocular local e maior suscetibilidade a efeitos sistêmicos mesmo com instilação oftálmica comercial; utilizar soluções diluídas quando indicado e monitorar de perto.',
    'Formulações oftálmicas comerciais possuem pH ácido (aproximadamente 3,5 a 5,5) para estabilidade do sal cloridrato, causando ardência, blefaroespasmo e hiperemia conjuntival transitória (especialmente nos primeiros 2 dias de terapia tópica).',
    'Na CCS neurogênica canina, iniciar obrigatoriamente com proteção corneana intensa (lubrificantes sem conservantes), porque a resposta lacrimal endógena pode levar semanas para atingir o equilíbrio.',
    'Na investigação de anisocoria ou disautonomia, excluir previamente exposição iatrogênica a midriáticos tópicos (atropina, tropicamida), além de reconhecer que o teste farmacológico com pilocarpina diluída possui sensibilidade variável para localização anatômica isolada.',
    'Pacientes com úlcera corneana profunda ou ceratomalácia concomitante: evitar irritação química por colírios ácidos não tamponados e priorizar lubrificação e terapia anticollagenase/antimicrobiana adequada.',
    'Não confundir massa de base (208,26 g/mol) com massa de cloridrato de pilocarpina (244,72 g/mol); manter todas as prescrições expressas claramente na concentração declarada do sal comercial.',
  ],
  adverseEffects: [
    'Oculares locais (muito comuns no uso tópico não diluído): hiperemia conjuntival por vasodilatação, lacrimejamento reflexo, blefaroespasmo, desconforto agudo pelo pH ácido, dor por espasmo do músculo ciliar e irite transitória nos primeiros dias.',
    'Oculares em longo prazo: miose crônica persistente/irreversível (atrofia do músculo dilatador da pupila e fibrose do esfíncter) e risco teórico de cistos irianos ou sinéquias se houver inflamação concomitante.',
    'Sistêmicos colinérgicos (frequentes durante a titulação oral até a dose máxima tolerada): ptialismo/hipersalivação, êmese, diarreia, desconforto abdominal, micção frequente.',
    'Sistêmicos graves / superdosagem: bradicardia sinusal ou bloqueios atrioventriculares, hipotensão, broncoconstrição com tosse ou dispneia, edema pulmonar, tremores musculares e hipotermia.',
  ],
  interactions: [
    'Atropina, tropicamida e demais antimuscarínicos/anticolinérgicos: antagonismo farmacodinâmico direto — anulam o efeito lacrimogênico e miótico da pilocarpina (e são os antídotos na toxicidade colinérgica aguda).',
    'Análogos de prostaglandinas tópicos (ex.: latanoprosta): associação estudada para glaucoma canino mostrou efeito aditivo na redução da PIO apenas modesto (≈ 1 a 2 mmHg), porém não é recomendada rotineiramente pela dor ciliar e risco inflamatório combinado.',
    'Agentes anti-inflamatórios não esteroidais (AINEs) sistêmicos ou cetoprofeno / tópicos: podem atenuar parcialmente a irritação uveal e o desconforto induzidos pela pilocarpina tópica.',
    'Betabloqueadores (ex.: timolol) e bloqueadores de canais de cálcio não diidropiridínicos: risco aditivo de bradicardia, bloqueio nodal e hipotensão caso ocorra absorção sistêmica relevante da pilocarpina.',
    'Inibidores da acetilcolinesterase (ex.: neostigmina, fisostigmina, organofosforados/carbamatos) e outros colinomiméticos (ex.: betanecol): somação potencial de toxicidade colinérgica grave (SLUDDE).',
    'Incompatibilidade físico-química em colírios: respeitar intervalo mínimo de 5 minutos (preferencialmente 5–10 minutos) entre a pilocarpina e outros colírios no saco conjuntival; não misturar na mesma seringa ou frasco.',
  ],
  routes: [
    'Via Oral (VO — administração extrabula de solução oftálmica a 1% ou 2% misturada diretamente a uma pequena porção de alimento úmido)',
    'Via Oftálmica tópica (colírio diluído 0,05%–0,25% para CCS ou teste pupilar; 1%–2% apenas em indicações selecionadas)',
  ],
  administration: [
    'Para CCS neurogênica canina via oral, contar meticulosamente as gotas diretamente sobre uma pequena quantidade de alimento úmido imediatamente antes da refeição principal para mascarar o sabor amargo e reduzir irritação gástrica.',
    'Escalonar a dose oral de forma lenta e registrada (incremento gradual a cada 2 a 7 dias conforme tolerância), mantendo até surgirem os primeiros sinais leves de toxicidade (salivação excessiva, náusea/êmese ou fezes amolecidas); ao atingir esse limiar, suspender por 24 horas se necessário e retomar na última dose perfeitamente tolerada.',
    'Sempre confirmar o número exato de gotas por mL do frasco comercial prescrito (Pilocan® 2% Cristália = 27 gotas/mL ≈ 0,74 mg/gota; Pilocarpina® 2% Allergan = 25 gotas/mL ≈ 0,80 mg/gota) e nunca deixar gotas pingarem diretamente na cavidade oral sem comida.',
    'Para aplicação oftálmica em CCS ou teste de desnervação, utilizar preparações diluídas (0,05% a 0,25%) manipuladas em veículo adequado, reduzindo significativamente a ardência do pH comercial ácido (3,5–5,5); respeitar intervalo mínimo de 5 minutos antes ou após qualquer outro fármaco oftálmico.',
  ],
  doses: [
    {
      id: 'pilocarpina-ccs-neurogenica-oral-canina',
      species: 'dog',
      indication:
        'Ceratoconjuntivite seca (CCS) neurogênica e xeromicteria — titulação oral (protocolo clássico 1 gota a 2% / 10 kg vs. 2 gotas / 9,1 kg)',
      doseMin: 0.074,
      doseMax: 0.16,
      doseUnit: 'mg/kg',
      perWeightUnit: 'kg',
      route: 'VO (no alimento)',
      frequency: 'q12h (com titulação gradual)',
      duration: 'Contínuo enquanto houver resposta lacrimal; reavaliar STT-I a cada 14–30 dias',
      clinicalContext:
        'Primeira linha estimulatória na CCS neurogênica canina (ex.: otite média, neuropatia facial idiopática, déficits múltiplos de nervos cranianos). Atingir resposta lacrimal clínica leva de 1 a 4 semanas, devendo manter lubrificantes tópicos e ciclosporina/tacrolimo conforme necessidade.',
      monitoring:
        'Teste Lacrimal de Schirmer tipo I (STT-I), aspecto de úlceras corneanas (fluoresceína), umedecimento da narina ipsilateral na xeromicteria e triagem diária para vômito, diarreia, hipersalivação ou letargia.',
      notes:
        'DIVERGÊNCIA NA LITERATURA: Um protocolo europeu (Galley et al., 2022; Matheis et al., 2012) inicia com 1 gota da solução a 2% por 10 kg VO q12h (≈ 0,074–0,08 mg/kg), aumentando 1 gota por dose a cada 2–3 dias até aumento do STT-I ou sinais colinérgicos leves. Outra linha norte-americana descreve início com 2 gotas da solução a 2% para cada 9,1 kg (≈ 0,16–0,18 mg/kg) VO q12h, com incrementos semanais. Para segurança clínica em pacientes sensíveis e cães pequenos, prefira iniciar pela faixa menor (1 gota a 2% / 10 kg; em cães < 5 kg usar solução a 1% ou manipulada) e progredir somente se tolerado.',
      referenceIds: ['ref-galley-2022', 'ref-matheis-2012', 'ref-plumbs-pilocarpine', 'ref-bsava-pilocarpine'],
      evidenceLevel: 'Estudos retrospectivos e consensos/formulários veterinários',
      calculatorEnabled: true,
      presentationId: 'pilocan-2-cristalia',
    },
    {
      id: 'pilocarpina-ccs-neurogenica-topica-canina',
      species: 'dog',
      indication:
        'Ceratoconjuntivite seca (CCS) neurogênica — uso oftálmico diluído (quando a via oral é intolerável ou como adjuvante)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'gota/olho',
      perWeightUnit: 'animal',
      route: 'Oftálmica tópica (manipulada 0,05% a 0,25%)',
      frequency: 'q6h a q12h no(s) olho(s) afetado(s)',
      duration: 'Contínuo conforme resposta clínica e tolerância local',
      clinicalContext:
        'Indicado quando efeitos gastrointestinais impedem a progressão da pilocarpina oral ou em associação inicial. A diluição para 0,05%–0,25% minimiza o espasmo ciliar e o desconforto pelo pH ácido das soluções comerciais a 1%–4%.',
      monitoring:
        'Avaliar conforto ocular logo após instilação (blefaroespasmo, hiperemia), STT-I seriado e sinais de uveíte reflexa.',
      notes:
        'Não pingar colírio comercial a 2% puro para CCS sem diluição prévia devido à dor ciliar e hiperemia severa. Aguardar pelo menos 5 minutos entre este colírio e lágrimas artificiais ou imunomoduladores.',
      referenceIds: ['ref-plumbs-pilocarpine', 'ref-gomez-2024'],
      evidenceLevel: 'Formulário veterinário e séries/relatos clínicos',
      calculatorEnabled: false,
      presentationId: 'pilocarpina-manipulada-diluida',
    },
    {
      id: 'pilocarpina-teste-disautonomia-pupilar',
      species: 'both',
      indication:
        'Teste farmacológico de hipersensibilidade por desnervação pupilar (suspeita de disautonomia / lesão pós-ganglionar CN III)',
      doseMin: 1,
      doseMax: 2,
      doseUnit: 'gota/olho',
      perWeightUnit: 'animal',
      route: 'Oftálmica tópica (solução diluída 0,05% a 0,1%)',
      frequency: 'Aplicação única diagnóstica em um olho (usando o contralateral ou tempo zero como referência)',
      duration: 'Avaliação pupilar seriada aos 15, 30, 45 e 60 minutos pós-instilação',
      clinicalContext:
        'Em olhos sadios ou em lesões pré-ganglionares/não parassimpáticas, concentrações de 0,05%–0,1% não induzem miose clinicamente relevante. Na disautonomia ou lesão pós-ganglionar do gânglio ciliar/nervos ciliares curtos, ocorre suprarregulação dos receptores muscarínicos e miose rápida (e retração da 3ª pálpebra) frequentemente em ≤ 30–60 minutos.',
      monitoring:
        'Diâmetro pupilar comparativo com régua/pupillômetro, posição da terceira pálpebra, desconforto ocular e exclusão prévia de atropina/tropicamida.',
      notes:
        'Sensibilidade descrita em cerca de 82% em série canina recente de disautonomia (Johnson et al., 2023) e usada em séries felinas (Kidder et al., 2008). Teste negativo não exclui disautonomia, e resultado alterado não substitui neuroimagem ou avaliação sistêmica completa quando a etiologia permanece incerta.',
      referenceIds: ['ref-johnson-2023', 'ref-kidder-2008', 'ref-delahunta-neuro'],
      evidenceLevel: 'Séries clínicas diagnósticas e tratados de neurologia veterinária',
      calculatorEnabled: false,
      presentationId: 'pilocarpina-manipulada-diluida',
    },
    {
      id: 'pilocarpina-disautonomia-suporte-lacrimal',
      species: 'both',
      indication:
        'Suporte paliativo lacrimal e fotofobia na disautonomia canina ou felina',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'gota/olho',
      perWeightUnit: 'animal',
      route: 'Oftálmica tópica (solução 1% — preferir diluída em gatos sensíveis)',
      frequency: 'q6h a q12h',
      duration: 'Enquanto durar suporte paliativo e sob vigilância sistêmica',
      clinicalContext:
        'Em pacientes com disautonomia que apresentam midríase refratária e olho seco neurogênico, a pilocarpina oftálmica reduz fotofobia por constrição iriana e estimula lacrimejamento residual.',
      monitoring:
        'Risco de efeitos colinérgicos sistêmicos mesmo por via tópica, principalmente em gatos desnutridos/desidratados. Monitorar frequência cardíaca, vômito, salivação e motilidade intestinal (íleo paralítico é frequente na disautonomia).',
      notes:
        'Evitar em gatos com comprometimento respiratório ou sinais de toxicidade sistêmica; lubrificantes oculares intensivos continuam obrigatórios.',
      referenceIds: ['ref-nelson-couto', 'ref-bsava-pilocarpine', 'ref-kidder-2008'],
      evidenceLevel: 'Opinião clínica / tratados de medicina interna',
      calculatorEnabled: false,
      presentationId: 'pilocarpina-allergan',
    },
    {
      id: 'pilocarpina-glaucoma-canino-historico',
      species: 'dog',
      indication:
        'Glaucoma primário de ângulo aberto (papel histórico / terceira linha; NÃO recomendado para uso crônico de rotina)',
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'gota/olho',
      perWeightUnit: 'animal',
      route: 'Oftálmica tópica (solução a 1% ou 2%)',
      frequency: 'q8h a q12h no olho acometido',
      duration: 'Uso pontual/temporário quando terapias de primeira linha não estão disponíveis',
      clinicalContext:
        'Superada clinicamente por inibidores da anidrase carbônica (dorzolamida, brinzolamida) e análogos de prostaglandinas (latanoprosta, travoprosta), que reduzem a PIO de forma muito mais previsível e sem o desconforto ciliar ou quebra de barreira hematoaquosa causada pela pilocarpina.',
      monitoring:
        'Tonometria seriada, pesquisa rigorosa de uveíte (flare aquoso) e integridade zonular (subluxação de cristalino). Suspender imediatamente se houver aumento paradoxal da PIO ou dor.',
      notes:
        'CONTRAINDICADO se o glaucoma for secundário à uveíte anterior ou à luxação de cristalino, pois a miose pode gerar bloqueio pupilar agudo e agravar o quadro hipertensivo.',
      referenceIds: ['ref-plumbs-pilocarpine', 'ref-bsava-pilocarpine', 'ref-sarchahi-2012'],
      evidenceLevel: 'Formulário veterinário (uso preterido / terceira linha)',
      calculatorEnabled: false,
      presentationId: 'pilocarpina-allergan',
    },
  ],
  presentations: [
    {
      id: 'pilocan-2-cristalia',
      name: 'Pilocan® 2% — Cloridrato de pilocarpina 20 mg/mL',
      brand: 'Cristália',
      form: 'Solução oftálmica estéril',
      presentation: 'Frasco plástico gotejador com 10 mL (20 mg/mL = 2%)',
      concentrationValue: 20,
      concentrationUnit: 'mg/mL',
      dropsPerMl: 27,
      route: 'Oftálmica / Oral (extrabula, em gotas no alimento)',
      packInfo:
        'Cada mL contém 20 mg de cloridrato de pilocarpina. Calibração de bula: 27 gotas/mL ≈ 0,74 mg de cloridrato por gota. Veículo com ácido bórico, citrato de sódio di-hidratado, cloreto de benzalcônio, hietelose e edetato dissódico.',
      channel: 'human_pharmacy',
      commercialProductSlug: 'pilocan-2-solucao-oftalmica',
      scoringInfo: 'Não se aplica (frasco conta-gotas calibrado em 27 gotas/mL)',
    },
    {
      id: 'pilocarpina-allergan',
      name: 'Pilocarpina® 1%, 2% e 4% — Cloridrato de pilocarpina',
      brand: 'Allergan / AbbVie',
      form: 'Solução oftálmica estéril',
      presentation: 'Frascos conta-gotas de 10 mL (10 mg/mL, 20 mg/mL ou 40 mg/mL)',
      concentrationValue: 20,
      concentrationUnit: 'mg/mL',
      concentrationOptions: [
        {
          id: 'allergan-1pct',
          label: '1% (10 mg/mL • 0,40 mg/gota)',
          concentrationValue: 10,
          concentrationUnit: 'mg/mL',
          isDefault: false,
        },
        {
          id: 'allergan-2pct',
          label: '2% (20 mg/mL • 0,80 mg/gota)',
          concentrationValue: 20,
          concentrationUnit: 'mg/mL',
          isDefault: true,
        },
        {
          id: 'allergan-4pct',
          label: '4% (40 mg/mL • 1,60 mg/gota)',
          concentrationValue: 40,
          concentrationUnit: 'mg/mL',
          isDefault: false,
        },
      ],
      dropsPerMl: 25,
      route: 'Oftálmica / Oral (extrabula, em gotas no alimento)',
      packInfo:
        'Calibração de bula: 25 gotas/mL (1% = 0,40 mg/gota; 2% = 0,80 mg/gota; 4% = 1,60 mg/gota). Excipientes incluem álcool polivinílico (veículo viscoso) e cloreto de benzalcônio. Após aberto, válido por 90 dias em temperatura ambiente (15–30 °C).',
      channel: 'human_pharmacy',
      commercialProductSlug: 'pilocarpina-cloridrato-allergan',
      scoringInfo: 'A apresentação a 1% facilita titulação inicial em cães de pequeno porte (< 5 kg)',
    },
    {
      id: 'pilocarpina-manipulada-diluida',
      name: 'Colírio ou solução diluída manipulada de cloridrato de pilocarpina',
      brand: 'Farmácia de manipulação veterinária',
      form: 'Solução oftálmica estéril tamponada diluída (0,05%, 0,1% ou 0,25%)',
      presentation: 'Frasco estéril manipulado de 5 a 10 mL em concentração personalizada',
      concentrationValue: 1,
      concentrationUnit: 'mg/mL',
      concentrationOptions: [
        {
          id: 'manip-005pct',
          label: '0,05% (0,5 mg/mL • teste disautonomia)',
          concentrationValue: 0.5,
          concentrationUnit: 'mg/mL',
          isDefault: false,
        },
        {
          id: 'manip-010pct',
          label: '0,1% (1 mg/mL • teste CN III / disautonomia)',
          concentrationValue: 1,
          concentrationUnit: 'mg/mL',
          isDefault: true,
        },
        {
          id: 'manip-025pct',
          label: '0,25% (2,5 mg/mL • CCS oftálmica tolerável)',
          concentrationValue: 2.5,
          concentrationUnit: 'mg/mL',
          isDefault: false,
        },
      ],
      dropsPerMl: 20,
      route: 'Oftálmica tópica',
      packInfo:
        'Indispensável para reduzir a dor ciliar e a irritação epitelial em aplicações tópicas de CCS neurogênica (0,25%) e para realizar o teste diagnóstico de hipersensibilidade por desnervação (0,05%–0,1%).',
      channel: 'compounded',
      scoringInfo: 'Exige manipulação em farmácia estéril veterinária com controle de pH e validade reduzida',
    },
  ],
  quickSummaryHighlights: [
    'Indicação principal na clínica de pequenos animais: ceratoconjuntivite seca (CCS) neurogênica canina, frequentemente acompanhada de xeromicteria ipsilateral.',
    'Na CCS neurogênica, a via oral com colírio comercial (1% ou 2%) misturado em alimento úmido estimula diretamente o receptor M3 glandular com resposta progressiva em 1 a 4 semanas.',
    'Intoxicação colinérgica sistêmica (SLUDDE: vômito, diarreia, ptialismo, micção, broncoespasmo, bradicardia) pode ocorrer tanto pela titulação oral quanto após instilação oftálmica, sobretudo em gatos.',
    'Calibração por fabricante importa: Pilocan® 2% libera 27 gotas/mL (≈ 0,74 mg/gota), enquanto Pilocarpina® 2% Allergan libera 25 gotas/mL (≈ 0,80 mg/gota).',
    'No glaucoma canino e felino, foi clinicamente preterida por análogos de prostaglandinas e inibidores da anidrase carbônica; é contraindicada na uveíte e na luxação de cristalino.',
    'Concentrações diluídas (0,05%–0,1%) formam a base do teste farmacológico para hipersensibilidade por desnervação pupilar (disautonomia / lesão pós-ganglionar oculomotora).',
  ],
  pillars: [
    {
      title: 'Estímulo M3 na CCS Neurogênica',
      icon: 'eye',
      desc: 'Quando há lesão parassimpática do nervo facial ou petroso maior (olho e narina secos ipsilaterais), a pilocarpina contorna o déficit neural ativando diretamente o receptor M3 dos ácinos lacrimais remanescentes.',
    },
    {
      title: 'Titulação em Gotas e Janela Terapêutica',
      icon: 'gauge',
      desc: 'A dose eficaz aproxima-se do limiar de toxicidade colinérgica. Sobe-se gradualmente a dose no alimento úmido até observar resposta do STT-I ou sinais leves (salivação/êmese), recuando para o último patamar tolerado.',
    },
    {
      title: 'Fidelidade de Calibração do Colírio',
      icon: 'droplet',
      desc: 'O volume da gota varia entre marcas (25 vs. 27 gotas/mL). O erro de interpretação entre % do rótulo, mg de cloridrato e número de gotas pode levar à superdosagem acidental — sobretudo em cães miniatura.',
    },
    {
      title: 'Uso Restrito em Glaucoma e Gatos',
      icon: 'shield-alert',
      desc: 'Não é fármaco de primeira escolha no glaucoma (pH ácido causa uveíte reflexa; miose bloqueia pupila na luxação de lente) e exige extrema cautela oftálmica/sistêmica na espécie felina.',
    },
  ],
  clinicalWarningItems: [
    {
      label: 'NUNCA PINGAR DIRETO NA BOCA SEM ALIMENTO',
      text: 'Administrar a solução a 2% pura diretamente na boca causa aversão imediata pelo amargor, salivação intensa, náusea aguda e risco de vômito/aspiração. Sempre ocultar as gotas em pequena porção de alimento úmido.',
    },
    {
      label: 'RISCO DE BLOQUEIO PUPILAR E PIORA DA UVEÍTE',
      text: 'Contraindicada no glaucoma secundário à uveíte anterior ou à luxação/subluxação de cristalino. A miose vigorosa e a quebra da barreira hematoaquosa aumentam rapidamente a pressão intraocular e favorecem sinéquias.',
    },
    {
      label: 'PRECAUÇÃO MÁXIMA EM GATOS E ASMA',
      text: 'Gatos são suscetíveis à absorção sistêmica ocular e ao broncoespasmo colinérgico. Não utilizar colírios concentrados de rotina em felinos com histórico de doença brônquica/asma ou bradiarritmias.',
    },
    {
      label: 'DIVERGÊNCIA DE DOSE ORAL INICIAL',
      text: 'Há variação entre protocolos clássicos (1 gota a 2% por 10 kg VO q12h vs. 2 gotas por 9,1 kg VO q12h). Inicie sempre pelo regime conservador e ajuste conforme tolerância e STT-I.',
    },
  ],
  practicalWeightTable: {
    standardDoseText:
      'Referência inicial conservadora para CCS neurogênica canina (protocolo 1 gota de solução a 2% por 10 kg VO q12h ≈ 0,074–0,080 mg/kg, comparada ao regime de 2 gotas por 9,1 kg ≈ 0,16 mg/kg). Em cães < 5 kg, considerar formulação a 1% (0,40 mg/gota) para precisão.',
    headers: [
      'Peso do cão',
      'Regime conservador (1 gota 2% / 10 kg)',
      'Pilocarpina® 1% (25 gotas/mL = 0,40 mg/gota)',
      'Pilocan® 2% (27 gotas/mL = 0,74 mg/gota)',
      'Observação prática de titulação',
    ],
    rows: [
      {
        weight: '2,5 kg',
        totalDose: '≈ 0,18–0,20 mg VO q12h',
        col1: '0,5 gota (preferir diluída) ou 1 gota 1% q24h–q12h sob vigília',
        col2: 'Não recomendada sem diluição (1 gota = 0,30 mg/kg)',
        col3: 'Preferir solução diluída 0,25% oftálmica ou 1% oral iniciada em dias alternados/1 gota teste',
      },
      {
        weight: '5 kg',
        totalDose: '≈ 0,37–0,40 mg VO q12h',
        col1: '1 gota (0,40 mg = 0,08 mg/kg)',
        col2: '0,5 gota — não fracionável diretamente',
        col3: 'Usar apresentação a 1% para permitir 1 gota exata sem superdosagem',
      },
      {
        weight: '10 kg',
        totalDose: '≈ 0,74–0,80 mg VO q12h',
        col1: '2 gotas (0,80 mg)',
        col2: '1 gota (0,74 mg = 0,074 mg/kg)',
        col3: 'Referência clássica; progredir 1 gota por vez até efeito no STT-I ou sinais leves de SLUDDE',
      },
      {
        weight: '20 kg',
        totalDose: '≈ 1,48–1,60 mg VO q12h',
        col1: '4 gotas (1,60 mg)',
        col2: '2 gotas (1,48 mg = 0,074 mg/kg)',
        col3: 'Regime alternativo inicia em 4 gotas a 2% (~0,15 mg/kg) — começar com 2 gotas aumenta tolerabilidade GI',
      },
      {
        weight: '30 kg',
        totalDose: '≈ 2,22–2,40 mg VO q12h',
        col1: '6 gotas (2,40 mg)',
        col2: '3 gotas (2,22 mg = 0,074 mg/kg)',
        col3: 'Misturar integralmente em colher pequena de alimento pastoso antes da refeição',
      },
    ],
    dropletCalibrator: {
      title: 'Calibrador de Gotas entre Marcas Comerciais (2%)',
      concentration: '20 mg/mL (cloridrato de pilocarpina 2%)',
      dropletRatio: 'Pilocan® (Cristália): 27 gotas/mL (≈ 0,74 mg/gota) | Pilocarpina® (Allergan): 25 gotas/mL (≈ 0,80 mg/gota)',
      practicalRule:
        'A mesma prescrição de "2 gotas" entrega ~1,48 mg com Pilocan® 2% e ~1,60 mg com Pilocarpina® 2% Allergan (+8% por gota). Nunca trocar o fabricante sem recalcular o teto de titulação em cães pequenos.',
      note: 'Não aplicar regra genérica de 20 gotas/mL em colírios comerciais humanos; respeitar sempre o gotejador específico descrito na bula oficial.',
    },
  },
  quickIndications: [
    {
      condition: 'CCS neurogênica e xeromicteria (cães) — Via Oral',
      species: 'dog',
      doseSummary: '1 gota (2%) / 10 kg q12h no alimento (ou regime 2 gotas / 9,1 kg), titular gradualmente',
      route: 'VO (extrabula, misturada ao alimento úmido)',
      duration: 'Contínuo (reavaliar STT-I a cada 2–4 semanas)',
      clinicalContext:
        'Primeira escolha para estimular glândula lacrimal privada de inervação parassimpática. Evitar pingar direto na língua; proteger córnea com lubrificante concomitante.',
    },
    {
      condition: 'CCS neurogênica (cães) — Via Oftálmica Diluída',
      species: 'dog',
      doseSummary: '1 gota (solução manipulada 0,05%–0,25%) por olho afetado',
      route: 'Oftálmica tópica (q6h–q12h)',
      duration: 'Contínuo ou adjuvante se intolerância oral',
      clinicalContext:
        'Alternativa útil quando êmese ou diarreia limitam a titulação oral; requer manipulação estéril tamponada para evitar irite por pH ácido.',
    },
    {
      condition: 'Teste de desnervação pupilar / disautonomia (cães e gatos)',
      species: 'both',
      doseSummary: '1–2 gotas de solução diluída 0,05%–0,1% em 1 olho',
      route: 'Oftálmica tópica (avaliação aos 15, 30, 45 e 60 min)',
      duration: 'Teste diagnóstico pontual',
      clinicalContext:
        'Miose acentuada e retração da terceira pálpebra com concentração sub-limiar indicam hipersensibilidade por desnervação pós-ganglionar (não é 100% sensível ou localizatória isoladamente).',
    },
    {
      condition: 'Suporte paliativo lacrimal em disautonomia',
      species: 'both',
      doseSummary: '1 gota de solução 1% por olho q6h–q12h (cautela extrema em gatos)',
      route: 'Oftálmica tópica',
      duration: 'Durante suporte clínico da síndrome',
      clinicalContext:
        'Ajuda a reduzir fotofobia e umedecer a superfície ocular; manter vigilância contra toxicidade colinérgica sistêmica (especialmente em felinos).',
    },
    {
      condition: 'Glaucoma primário de ângulo aberto (papel histórico)',
      species: 'dog',
      doseSummary: '1 gota (1% ou 2%) por olho q8h–q12h',
      route: 'Oftálmica tópica',
      duration: 'Uso restrito/terceira linha na falta de agentes modernos',
      clinicalContext:
        'Preterido frente a análogos de prostaglandinas e inibidores da anidrase carbônica. Proibido se houver uveíte ou luxação de cristalino.',
    },
  ],
  detailedIndications: [
    {
      id: 'ind-ccs-neurogenica-oral',
      indication: 'Ceratoconjuntivite seca (CCS) neurogênica e xeromicteria em cães — Terapia oral titulável',
      clinicalContext:
        'A CCS neurogênica difere da CCS imunomediada clássica porque decorre de lesão parassimpática aferente ou eferente (nervo trigêmeo, nervo facial / petroso maior, otite média ou idiopática), apresentando frequentemente início agudo unilateral e crostas/ressecamento da narina ipsilateral (xeromicteria) com teste de Schirmer frequentemente próximo de 0 mm/min.',
      species: 'dog',
      dose: '0,074–0,08 mg/kg (1 gota a 2% / 10 kg) até 0,16 mg/kg (2 gotas a 2% / 9,1 kg) no alimento, com aumento gradual',
      route: 'Oral (extrabula sobre alimento úmido)',
      frequency: 'q12h',
      duration: 'Contínuo enquanto persistir deficiência neural; alguns casos idiopáticos recuperam em 2 a 6 meses',
      mechanismOfAction:
        'Como o defeito primário na CCS neurogênica reside na perda do estímulo colinérgico parassimpático (e não inicialmente na destruição autoimune da glândula lacrimal), a pilocarpina atua como agonista muscarínico M3 direto sobre as células acinares lacrimais e glândulas da mucosa nasal, restaurando a secreção aquosa mesmo na ausência de liberação de acetilcolina pré-sináptica.',
      clinicalRationale:
        'Na série retrospectiva canina de Galley et al. (2022), 53% dos casos foram idiopáticos, 38% apresentaram neuropatia facial e 29% síndrome vestibular periférica, observando-se resposta positiva ao tratamento incluindo pilocarpina em 48% dos cães acompanhados. Matheis et al. (2012) demonstraram que cinco de onze cães puderam descontinuar a medicação após uma média de 125 dias com retorno espontâneo da inervação ou compensação clínica. Por causa da divergência entre referências na dose inicial (1 gota/10 kg vs. 2 gotas/9,1 kg q12h) e de fatores gastrointestinais dose-limitantes, recomenda-se titular lentamente até o menor nível que eleve o STT-I sem causar vômito ou hipersalivação.',
      monitoring:
        'Medir STT-I antes do tratamento e a cada 14–30 dias, inspecionar úlceras corneanas (frequentes e graves no olho seco agudo neurogênico), acompanhar umidificação da narina afetada e orientar redução imediata de 1 gota caso ocorram salivação excessiva, vômito, diarreia ou anorexia.',
      referenceIds: ['ref-galley-2022', 'ref-matheis-2012', 'ref-gomez-2024', 'ref-plumbs-pilocarpine', 'ref-bsava-pilocarpine'],
      evidenceLevel: 'Moderada — séries retrospectivas e formulários veterinários (padrão de cuidado clínico)',
      highlights: [
        'Sempre investigar otite média/interna e déficits de VII/VIII/V nervos cranianos nos casos unilaterais.',
        'Associação obrigatória nas primeiras semanas com lubrificantes intensivos, pois o efeito secretor pode demorar de 1 a 4 semanas para se estabilizar.',
        'Diferente da CCS imunomediada, muitos casos idiopáticos permitem desmame após 3–6 meses caso a função parassimpática se recupere.',
      ],
    },
    {
      id: 'ind-ccs-neurogenica-topica',
      indication: 'Ceratoconjuntivite seca neurogênica — Terapia oftálmica diluída (0,05% a 0,25%)',
      clinicalContext:
        'Opção reservada para cães que apresentam vômito, cólicas ou diarreia mesmo em doses orais baixas de pilocarpina, ou em associação inicial para alívio local controlado.',
      species: 'dog',
      dose: '1 gota da solução oftálmica manipulada (0,05% a 0,25%) por olho afetado',
      route: 'Oftálmica tópica',
      frequency: 'q6h a q12h',
      duration: 'Contínuo conforme tolerância local e STT-I',
      mechanismOfAction:
        'Difusão transcorneana e conjuntival parcial até tecidos oculares e estímulo muscarínico M3 local, além de potencial estímulo reflexo lacrimal.',
      clinicalRationale:
        'As apresentações comerciais (1%–4%, pH 3,5–5,5) produzem intensa ardência epitelial, hiperemia conjuntival, blefaroespasmo e irite dolorosa por espasmo ciliar quando pingadas puras na superfície ressecada. A manipulação estéril em concentrações baixas (0,05%–0,25%) viabiliza tolerância oftálmica local muito superior, mantendo algum efeito parassimpaticomimético. Ainda assim, sua eficácia sobre a glândula lacrimal principal é frequentemente inferior ou menos consistente que a titulação sistêmica bem tolerada.',
      monitoring:
        'Observar se o cão fecha o olho ou esfrega a face após a gota (sinal de irritação local excessiva), reavaliar STT-I e integridade epitelial corneana.',
      referenceIds: ['ref-plumbs-pilocarpine', 'ref-gomez-2024'],
      evidenceLevel: 'Baixa a moderada — uso de suporte descrito em formulários e relatos clínicos',
      highlights: [
        'Nunca pingar pilocarpina comercial a 2% ou 4% pura para CCS sem diluição prévia.',
        'Separar a instilação por pelo menos 5 minutos de lubrificantes viscosos, pomadas ou ciclosporina.',
      ],
    },
    {
      id: 'ind-teste-desnervacao',
      indication: 'Teste diagnóstico farmacológico pupilar (disautonomia e lesão pós-ganglionar do nervo oculomotor)',
      clinicalContext:
        'Aplicado na investigação de midríase fixa unilateral ou bilateral e em síndromes compatíveis com disautonomia (megaesôfago, regurgitação, retenção urinária, prolapso de 3ª pálpebra, bradicardia inapropriada, constipação).',
      species: 'both',
      dose: '1 a 2 gotas de solução diluída a 0,05%–0,1% em apenas um olho (ou olho afetado vs. controle)',
      route: 'Oftálmica tópica diagnóstica',
      frequency: 'Instilação única com leitura seriada até 60 minutos',
      duration: 'Procedimento diagnóstico agudo (avaliação 0, 15, 30, 45 e 60 min)',
      mechanismOfAction:
        'Segundo a lei de Cannon de hipersensibilidade por desnervação, a perda da fibra parassimpática pós-ganglionar (do gânglio ciliar/nervos ciliares curtos até o esfíncter da íris) provoca suprarregulação (upregulation) e aumento da afinidade dos receptores muscarínicos M3 irianos. Assim, uma concentração extremamente diluída (0,05%–0,1%), incapaz de provocar miose em olhos normais ou com lesão pré-ganglionar, gera miose rápida e acentuada e retração da terceira pálpebra no olho desnervado.',
      clinicalRationale:
        'Na série clínica de Johnson et al. (2023) com 79 cães com disautonomia, alterações oftálmicas ocorreram em 92,4% dos casos e o teste com pilocarpina diluída resultou em miose em 42 de 51 cães testados (82,4%). Em gatos com disautonomia, Kidder et al. (2008) descreveram protocolos com diluições de 0,01%, 0,05% e 0,1%. Contudo, tratados de neurologia veterinária ressaltam que testes farmacológicos pupilares não substituem o exame neurológico completo ou neuroimagem e podem gerar falsos negativos se houver exposição prévia à atropina ou danos parciais.',
      monitoring:
        'Registrar o diâmetro pupilar antes e aos 15, 30, 45 e 60 minutos sob iluminação constante; confirmar ausência prévia de colírios midriáticos (atropina dura dias; tropicamida horas).',
      referenceIds: ['ref-johnson-2023', 'ref-kidder-2008', 'ref-delahunta-neuro', 'ref-practical-neurology'],
      evidenceLevel: 'Moderada — séries diagnósticas clínicas em cães e gatos',
      highlights: [
        'Concentração de 0,05%–0,1% é essencial: concentrações altas (1%–2%) contraem até pupilas normais e anulam a especificidade do teste.',
        'Atropinização iatrogênica prévia bloqueia os receptores muscarínicos e produz falso-negativo ao teste.',
      ],
    },
    {
      id: 'ind-glaucoma-historico',
      indication: 'Glaucoma primário de ângulo aberto em cães (uso histórico / terceira linha)',
      clinicalContext:
        'Na oftalmologia veterinária contemporânea, a pilocarpina foi amplamente substituída por análogos de prostaglandinas (ex.: latanoprosta) e inibidores da anidrase carbônica (ex.: dorzolamida). Seu emprego restringe-se a cenários excepcionais em cães com glaucoma primário sem uveíte ou instabilidade lenticular.',
      species: 'dog',
      dose: '1 gota da solução a 1% ou 2%',
      route: 'Oftálmica tópica',
      frequency: 'q8h a q12h',
      duration: 'Curto prazo ou até disponibilização de terapias de primeira linha',
      mechanismOfAction:
        'Contração longitudinal do músculo ciliar traciona o esporão escleral e abre os espaços da malha trabecular/fenda ciliar, aumentando o escoamento convencional do humor aquoso e reduzindo discretamente a pressão intraocular.',
      clinicalRationale:
        'Em cães saudáveis, a combinação com latanoprosta mostrou redução adicional modesta de apenas 1 a 2 mmHg em ensaio experimental (Sarchahi et al., 2012), insuficiente para justificar uso rotineiro frente ao desconforto local, espasmo ciliar e quebra de barreira hematoaquosa. Além disso, em equinos a pilocarpina não reduz a PIO, e em qualquer espécie a constrição pupilar pode desencadear bloqueio pupilar se o cristalino estiver luxado ou houver uveíte.',
      monitoring:
        'Tonometria frequente, biomicroscopia em lâmpada de fenda (descartar flare aquoso e facodonese) e vigilância de desconforto ocular.',
      referenceIds: ['ref-plumbs-pilocarpine', 'ref-bsava-pilocarpine', 'ref-sarchahi-2012', 'ref-wilkie-1991'],
      evidenceLevel: 'Baixa/Histórica — desaconselhada como terapia crônica de primeira linha',
      highlights: [
        'Miose clínica não significa controle garantido da pressão intraocular — sempre aferir a PIO por tonometria.',
        'Absolutamente contraindicada no glaucoma secundário à uveíte anterior ou luxação anterior/posterior da lente.',
      ],
    },
  ],
  clinicalStudiesCommented: [
    {
      title: 'Neurogenic keratoconjunctivitis sicca in 34 dogs: presentation, etiology, imaging and outcome',
      authorsYear: 'Galley AP, Beltran E, Tetas Pont R (2022)',
      journal: 'Veterinary Ophthalmology (DOI: 10.1111/vop.12949 | PMID: 34870366)',
      studyDesign: 'Série clínica retrospectiva multicêntrica em cães com diagnóstico de CCS neurogênica',
      sampleSize: '34 cães acometidos (seguimento disponível em 23 cães tratados)',
      methodology:
        'Revisão de sinais clínicos, achados neurológicos, ressonância magnética/diagnóstico etiológico e resposta clínica ao tratamento com pilocarpina oral isolada ou associada a terapias oculares de suporte.',
      limitations:
        'Desenho retrospectivo sem randomização ou grupo placebo padronizado; perda parcial de seguimento e protocolos heterogêneos de lubrificação associada.',
      mainFindings:
        'Cerca de 53% dos casos tiveram etiologia idiopática; entre os déficits neurológicos associados, destacaram-se paralisia facial (38%), síndrome vestibular periférica (29%) e síndrome de Horner (15%). Aproximadamente 48% (11 de 23 cães com seguimento) responderam clinicamente recebendo pilocarpina oral isolada ou combinada.',
      clinicalTakeaway:
        'Confirma a necessidade de pesquisa neurológica completa (especialmente pares cranianos V, VII, VIII e cadeia simpática/otite média) diante de olho e narina secos, validando a pilocarpina oral como terapia de núcleo, ainda que sem resposta universal.',
      referenceId: 'ref-galley-2022',
    },
    {
      title: 'Canine neurogenic keratoconjunctivitis sicca and ipsilateral xeromycteria: clinical features and course',
      authorsYear: 'Matheis FL, Walser-Reinhardt L, Spiess BM (2012)',
      journal: 'Veterinary Ophthalmology (DOI: 10.1111/j.1463-5224.2011.00968.x | PMID: 22051024)',
      studyDesign: 'Série de casos clínica retrospectiva',
      sampleSize: '11 cães com CCS neurogênica unilateral ou bilateral associada à xeromicteria ipsilateral',
      methodology:
        'Avaliação de STT-I basal (média de 1,9 ± 2,9 mm/min), etiologia provável, resposta à titulação oral de pilocarpina e evolução clínica no longo prazo.',
      limitations:
        'Amostra pequena e ausência de grupo controle não tratado.',
      mainFindings:
        'Nove cães apresentaram forma idiopática e dois histórico traumático. Todos receberam pilocarpina oral em titulação progressiva; cinco cães puderam suspender o fármaco após média de 125 dias com recuperação satisfatória, enquanto cinco permaneceram sob terapia de manutenção com boa qualidade ocular.',
      clinicalTakeaway:
        'Demonstra que a CCS neurogênica idiopática pode ser transitória ao longo de meses e justifica tentar desmame gradual após estabilização clínica prolongada.',
      referenceId: 'ref-matheis-2012',
    },
    {
      title: 'Pharmacokinetics and salivary pharmacodynamics of intravenous pilocarpine in dogs',
      authorsYear: 'Weaver ML, Tanzer JM, Kramer PA (1992)',
      journal: 'Pharmaceutical Research (DOI: 10.1023/A:1015814730154 | PMID: 1409379)',
      studyDesign: 'Estudo farmacocinético e farmacodinâmico experimental em modelo canino',
      sampleSize: 'Cães recebendo nitrato de pilocarpina intravenoso (225 a 600 µg/kg)',
      methodology:
        'Amostragem plasmática seriada por CLAE/HPLC e mensuração concomitante do fluxo salivar para caracterizar depuração, volume de distribuição e meia-vida terminal.',
      limitations:
        'Utilizou nitrato de pilocarpina por via intravenosa em modelo experimental, não refletindo diretamente a biodisponibilidade oral ou oftálmica da solução de cloridrato comercial.',
      mainFindings:
        'Volume de distribuição no estado de equilíbrio (Vdss) de 2,30 ± 0,64 L/kg, depuração sistêmica (Cl) de 2,22 ± 0,49 L/kg/h (≈ 37 mL/kg/min) e meia-vida de eliminação terminal (t½) de aproximadamente 1,3 h, com efeito salivar agudo dose-dependente.',
      clinicalTakeaway:
        'Fornece os únicos parâmetros farmacocinéticos quantitativos robustos em cães: a pilocarpina apresenta eliminação rápida e alta distribuição tecidual, o que embasa o intervalo de administração a cada 12 horas e a ausência de acúmulo prolongado pós-suspensão.',
      referenceId: 'ref-weaver-1992',
    },
    {
      title: 'Effects of topical pilocarpine on intraocular pressure and pupil size in clinically normal cats',
      authorsYear: 'Wilkie DA, Latimer CA (1991)',
      journal: 'American Journal of Veterinary Research (DOI: 10.2460/ajvr.1991.52.03.441 | PMID: 2035919)',
      studyDesign: 'Estudo experimental controlado unilateral em gatos saudáveis',
      sampleSize: '10 gatos adultos clinicamente sadios',
      methodology:
        'Instilação unilateral de 1 gota de pilocarpina a 2% e avaliação seriada da pressão intraocular (PIO) e do diâmetro pupilar nos dois olhos ao longo de 12–24 horas.',
      limitations:
        'Avaliou gatos sadios normotensos, e não pacientes felinos com glaucoma espontâneo ou disautonomia.',
      mainFindings:
        'A redução média da PIO atingiu −15,2% no olho tratado e −9,3% no olho contralateral não tratado (tornando-se significativa a partir de ~4 horas após a aplicação). A miose teve início aos 30 minutos e persistiu por 12 horas, acompanhada de sinais locais irritativos e absorção sistêmica evidenciada pelo efeito contralateral.',
      clinicalTakeaway:
        'Comprova que mesmo uma única gota oftálmica a 2% em gatos atravessa para a circulação sistêmica (efeito consensual/contralateral na PIO) e causa miose prolongada e desconforto ocular, reforçando a necessidade de cautela e diluição na espécie felina.',
      referenceId: 'ref-wilkie-1991',
    },
    {
      title: 'Ophthalmic abnormalities and pharmacologic pupil testing in 79 dogs with dysautonomia',
      authorsYear: 'Johnson MD, Rankin AJ, Meekins JM (2023)',
      journal: 'Journal of the American Veterinary Medical Association (DOI: 10.2460/javma.23.03.0134 | PMID: 37380162)',
      studyDesign: 'Série clínica retrospectiva canina',
      sampleSize: '79 cães diagnosticados com disautonomia (51 submetidos ao teste ocular com pilocarpina diluída)',
      methodology:
        'Avaliação da prevalência de midríase, reflexos pupilares, prolapso de terceira pálpebra, CCS neurogênica e resposta ao colírio diluído de pilocarpina.',
      limitations:
        'Dados retrospectivos com diferentes examinadores e variação operacional do teste.',
      mainFindings:
        'Alterações oftálmicas estiveram presentes em 92,4% dos cães; a instilação de pilocarpina diluída induziu miose diagnóstica em 42 de 51 pacientes testados (82,4%).',
      clinicalTakeaway:
        'Confirma elevada utilidade auxiliar do teste de hipersensibilidade por desnervação na disautonomia canina, mas lembra que cerca de 17% dos casos podem não positivar ao estímulo diluído.',
      referenceId: 'ref-johnson-2023',
    },
  ],
  clinicalFoundationsData: [
    {
      id: 'found-ccs-neurogenica',
      title: 'Fisiopatologia da CCS Neurogênica, Resposta Tardia e Racional da Titulação',
      narrative:
        'Ao contrário da CCS imunomediada — em que há destruição inflamatória crônica dos ácinos lacrimais e necessidade de imunomodulação (ciclosporina/tacrolimo) —, a CCS neurogênica resulta da interrupção da via secretomotora parassimpática originada no núcleo lacrimal pontino, cursando com o nervo facial (CN VII), nervo petroso maior e gânglio pterigopalatino. Quando a lesão ocorre proximalmente à anastomose com os ramos trigeminais nasais, observa-se simultaneamente secura e hiperqueratose da narina ipsilateral (xeromicteria). Por ativar diretamente receptores M3 íntegros na superfície das células acinares, a pilocarpina consegue restabelecer a produção lacrimal e nasal mesmo sem impulso nervoso fisiológico. Como a janela terapêutica oral entre o efeito secretor ótimo e os sintomas gastrointestinais (náusea, êmese, salivação, diarreia) é estreita e varia acentuadamente de indivíduo para indivíduo, a estratégia correta consiste em titular lentamente (a cada 2–7 dias) e manter o paciente exatamente abaixo do seu limiar de intolerância. Uma vez alcançada a produção aquosa adequada — cujo ganho pleno costuma levar de 1 a 4 semanas —, muitos cães idiopáticos recuperam espontaneamente a condução neural ao longo de 3 a 6 meses.',
      narrativeHighlights: [
        'Presença de olho seco agudo unilateral + crosta na narina do mesmo lado aponta fortemente para CCS neurogênica, e não imunomediada.',
        'Sinais leves de SLUDDE durante a titulação indicam que o teto tolerado do indivíduo foi alcançado — recuar 1 gota, não abandonar definitivamente o tratamento.',
        'Lubrificantes intensivos sem conservantes são mandatórios desde o dia 1 até a resposta lacrimal de Schirmer se consolidar.',
      ],
      referenceIds: ['ref-galley-2022', 'ref-matheis-2012', 'ref-gomez-2024'],
      studies: [
        {
          citation: 'Galley AP et al., Vet Ophthalmol, 2022',
          referenceId: 'ref-galley-2022',
          sourceType: 'Estudo Retrospectivo Multicêntrico',
          summaryText:
            'Analisou 34 cães com CCS neurogênica submetidos à investigação neurológica e tratamento com pilocarpina oral associada ou não a suporte tópico.',
          summaryHighlights: [
            '53% dos casos classificados como idiopáticos',
            '38% com neuropatia facial e 29% com síndrome vestibular periférica concomitantes',
            '48% (11/23 com seguimento) responderam favoravelmente ao esquema com pilocarpina oral',
          ],
          clinicalConclusion:
            'Sempre realizar exame otoscópico e avaliação de nervos cranianos (V, VII, VIII) antes de rotular a CCS neurogênica como idiopática.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/34870366/',
        },
        {
          citation: 'Matheis FL et al., Vet Ophthalmol, 2012',
          referenceId: 'ref-matheis-2012',
          sourceType: 'Série Clínica Canina',
          summaryText:
            'Acompanhou 11 cães com CCS neurogênica e xeromicteria ipsilateral (STT-I basal médio 1,9 ± 2,9 mm/min) tratados com pilocarpina oral titulada.',
          summaryHighlights: [
            '9/11 idiopáticos e 2/11 pós-trauma',
            '5 cães suspenderam a pilocarpina após média de 125 dias com resolução duradoura',
            '5 cães mantiveram controle satisfatório sob uso contínuo',
          ],
          clinicalConclusion:
            'Em casos idiopáticos estabilizados há mais de 3–4 meses, pode-se tentar redução cautelosa para confirmar se houve reinervação espontânea.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/22051024/',
        },
      ],
    },
    {
      id: 'found-disautonomia-glaucoma',
      title: 'Hipersensibilidade por Desnervação na Disautonomia e Limitações no Glaucoma',
      narrative:
        'A base diagnóstica do teste pupilar com pilocarpina diluída (0,05%–0,1%) baseia-se na lei de Cannon: fibras parassimpáticas pós-ganglionares desnervadas promovem suprarregulação compensatória de receptores muscarínicos no esfíncter da íris, tornando-o hipersensível a doses sub-limiares incapazes de contrair uma pupila hígida. Embora útil como peça clínica complementar em suspeitas de disautonomia ou lesões pós-ganglionares do nervo oculomotor, a acurácia anatômica desse teste isolado possui limites e nunca deve substituir a investigação sistêmica ou de imagem quando indicada. Já no glaucoma, apesar de a miose induzida pela pilocarpina (1%–2%) ampliar discretamente o escoamento trabecular convencional, sua relevância clínica atual caiu drasticamente: seu pH comercial ácido irrita a superfície ocular, provoca espasmo ciliar doloroso e induz irite transitória nos primeiros dias, além de poder causar bloqueio pupilar grave caso haja uveíte prévia ou luxação do cristalino.',
      narrativeHighlights: [
        'No teste de disautonomia, usar exclusivamente diluição de 0,05%–0,1% e excluir contato recente com atropina ou tropicamida.',
        'Em gatos, até uma gota tópica a 2% gera absorção sistêmica relevante com redução contralateral de PIO e risco colinérgico.',
        'No glaucoma agudo ou secundário, prostaglandinas e inibidores da anidrase carbônica são muito superiores e mais seguros.',
      ],
      referenceIds: ['ref-johnson-2023', 'ref-wilkie-1991', 'ref-kidder-2008', 'ref-sarchahi-2012'],
      studies: [
        {
          citation: 'Johnson MD et al., JAVMA, 2023',
          referenceId: 'ref-johnson-2023',
          sourceType: 'Estudo Clínico Diagnóstico (n = 79)',
          summaryText:
            'Descreveu alterações oftalmológicas e desempenho do teste com pilocarpina diluída em 79 cães com diagnóstico clínico/histopatológico de disautonomia.',
          summaryHighlights: [
            '92,4% apresentaram alterações oculares evidentes (midríase, prolapso de 3ª pálpebra, olho seco)',
            '82,4% (42/51 testados) responderam com miose após pilocarpina diluída',
          ],
          clinicalConclusion:
            'O teste positivo apoia fortemente disautonomia/lesão pós-ganglionar, mas um resultado negativo não descarta a enfermidade.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/37380162/',
        },
        {
          citation: 'Wilkie DA & Latimer CA, Am J Vet Res, 1991',
          referenceId: 'ref-wilkie-1991',
          sourceType: 'Ensaio Experimental Felino (n = 10)',
          summaryText:
            'Avaliou instilação unilateral de 1 gota de pilocarpina a 2% em 10 gatos sadios quanto a efeitos locais, pupilares e sistêmicos.',
          summaryHighlights: [
            'Miose instalada aos 30 minutos e mantida por 12 horas',
            'Redução média de PIO de −15,2% no olho tratado e −9,3% no olho contralateral não tratado',
            'Irritação ocular local evidente e comprovação de absorção sistêmica transconjuntival',
          ],
          clinicalConclusion:
            'Reforça a maior sensibilidade felina aos colírios concentrados de pilocarpina e desencoraja seu uso oftálmico rotineiro nesta espécie.',
          url: 'https://pubmed.ncbi.nlm.nih.gov/2035919/',
        },
      ],
    },
  ],
  pharmacokineticsData: {
    absorption: [
      '• **Via Intravenosa (IV)**: Biodisponibilidade de **100%** por definição em estudos experimentais em cães (Weaver et al., 1992), alcançando início imediato do fluxo salivar; via sem uso terapêutico na rotina clínica devido ao risco agudo de intoxicação colinérgica grave.',
      '• **Via Oral (VO — extrabula em gotas)**: Biodisponibilidade oral absoluta não quantificada formalmente em cães e gatos. Na rotina clínica, administra-se a formulação oftálmica misturada ao alimento úmido para evitar repulsa gustativa; sinais gastrointestinais e de estímulo glandular evidenciam absorção intestinal consistente, embora o início do ganho lacrimal sustentado na CCS neurogênica demande de 1 a 4 semanas de titulação contínua.',
      '• **Via Oftálmica (OFT)**: Absorção sistêmica qualitativa comprovada — em gatos sadios, uma única gota oftálmica desencadeou redução de pressão intraocular contralateral e miose instalada aos 30 minutos com duração de 12 horas (Wilkie & Latimer, 1991); em cães, a miose instila-se em 10 a 15 minutos e dura de 6 a 8 horas —, porém a fração sistêmica exata (%) permanece não quantificada.',
      '• **Via Intramuscular (IM)**: Farmacocinética e biodisponibilidade não estabelecidas para cães e gatos; via parenteral inapropriada na prática clínica rotineira pela ausência de formulação comercial segura.',
      '• **Via Subcutânea (SC)**: Dados farmacocinéticos e fração absorvida não quantificados em cães e gatos; sem emprego terapêutico estabelecido para o fármaco na espécie.',
      '• **Via Transmucosa Oral (OTM)**: Absorção mucosa direta não quantificada em pequenos animais e clinicamente desaconselhada pelo gosto extremamente amargo, risco de ptialismo reflexo imediato e potencial de perda de dose ou toxicidade súbita.',
      '• **Via Transdérmica (TD)**: Absorção e formulação clínica não estabelecidas em cães e gatos.',
    ].join('\n'),
    distribution:
      'Em cães recebendo nitrato de pilocarpina por via intravenosa (Weaver et al., 1992), apresentou amplo volume de distribuição no estado de equilíbrio (Vdss de 2,30 ± 0,64 L/kg), coerente com boa penetração tecidual em glândulas exócrinas, trato gastrointestinal e tecidos oculares após passagem corneana (XLogP ≈ 1,1 e pKa ≈ 6,8 favorecendo fração não ionizada em pH fisiológico). Ligação exata às proteínas plasmáticas e razão de penetração liquórica no sistema nervoso central não foram quantificadas formalmente em cães e gatos, embora sinais de toxicidade em SNC possam ocorrer em superdosagem.',
    metabolism:
      'A via metabólica específica e as proporções exatas de hidrólise da lactona (formação do ácido pilocárpico) ou epimerização hepática/plasmática (isopilocarpina) não estão completamente caracterizadas por enzimas individuais em cães e gatos. Não há evidência clínica publicada de dependência crítica ou restrição relacionada ao polimorfismo da glicoproteína-P (gene MDR1 / ABCB1) nessa espécie.',
    elimination:
      'Na avaliação canina intravenosa (Weaver et al., 1992), exibiu depuração plasmática rápida (Cl = 2,22 ± 0,49 L/kg/h, equivalente a ≈ 37 mL/kg/min) e meia-vida de eliminação terminal (t½) curta, de aproximadamente 1,3 hora. As frações percentuais exatas excretadas na urina como fármaco inalterado versus ácido pilocárpico não foram publicadas para cães e gatos, nem existem parâmetros farmacocinéticos completos descritos para a espécie felina.',
    cnsPenetration:
      'Capaz de atravessar barreiras biológicas em doses elevadas (XLogP ≈ 1,1; pKa ≈ 6,8), podendo causar alterações neurológicas centrais na superdosagem; concentração no LCR não quantificada em cães/gatos.',
    plasmaBinding: 'Não estabelecida quantitativamente em cães e gatos.',
    halfLife: '≈ 1,3 hora (IV experimental em cães; Weaver et al., 1992). Felinos e via oral: não quantificada.',
  },
  attentionData: {
    attentionSubtitle:
      'Foco crítico em toxicidade muscarínica (SLUDDE), contraindicações oftalmológicas mecânicas/inflamatórias e vulnerabilidade felina.',
    precautions: [
      {
        condition: 'Uveíte anterior ativa ou glaucoma secundário à uveíte',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A pilocarpina intensifica o relaxamento da barreira hematoaquosa e agrava a exsudação proteica e celular na câmara anterior, além de causar miose sustentada e espasmo ciliar extremamente doloroso.',
        clinicalAction:
          'Não utilizar em nenhuma concentração tópica diante de flare aquoso, precipitados ceráticos ou hiperemia ciliar inflamatória. A miose pode evoluir rapidamente para seclusão pupilar e glaucoma secundário refratário.',
      },
      {
        condition: 'Luxação ou subluxação anterior/posterior do cristalino',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'A constrição vigorosa do esfíncter da íris ao redor de um cristalino deslocado ou do vítreo anterior aprisiona o fluxo de humor aquoso da câmara posterior para a anterior (bloqueio pupilar agudo).',
        clinicalAction:
          'Contraindicada em olhos com facodonese, iridodonese ou crescente afácico visível; a elevação abrupta da PIO pode levar à cegueira irreversível.',
      },
      {
        condition: 'Asma felina, bronquite grave ou hiperreatividade das vias aéreas',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O estímulo direto dos receptores muscarínicos M3 no músculo liso brônquico e nas glândulas submucosas desencadeia broncoespasmo intenso e hipersecreção de muco espesso.',
        clinicalAction:
          'Evitar uso oral ou oftálmico concentrado em pacientes asmáticos ou dispneicos; em emergência com broncoespasmo iatrogênico, suspender imediatamente e considerar atropina titulada e oxigenoterapia.',
      },
      {
        condition: 'Obstrução gastrointestinal mecânica ou obstrução uretral',
        alertLevel: 'contraindicated',
        physiologicalExplanation:
          'O agonismo colinérgico contrai a musculatura lisa visceral gastrointestinal e o músculo detrusor da bexiga contra uma saída fechada, gerando dor severa, regurgitação ou risco de ruptura visceral.',
        clinicalAction:
          'Confirmar permeabilidade luminal e ausência de fecaloma, corpo estranho ou obstrução urinária antes de qualquer exposição sistêmica.',
      },
      {
        condition: 'Bradiarritmias, doença do nó sinusal ou cardiopatias descompensadas',
        alertLevel: 'warning',
        physiologicalExplanation:
          'A ativação muscarínica M2 miocárdica reduz o automatismo do nó sinusal e atrasa a condução atrioventricular, predispondo a bradicardia grave, bloqueio AV e hipotensão arterial sistêmica.',
        clinicalAction:
          'Contraindicada para titulação oral sem monitoramento cardiovascular em pacientes com bradicardia basal ou bloqueios cardíacos de alto grau.',
      },
      {
        condition: 'Administração oftálmica na espécie felina',
        alertLevel: 'warning',
        physiologicalExplanation:
          'Gatos exibem menor tolerância à irritação ácida local e absorção transconjuntival/nasolacrimal eficiente, capaz de precipitar toxicidade sistêmica (salivação, vômito, bradicardia, broncoespasmo) mesmo com instilação tópica.',
        clinicalAction:
          'Reservar ao teste diagnóstico com soluções diluídas (0,05%–0,1%) ou suporte paliativo estritamente monitorado; monitorar sinais sistêmicos após cada aplicação.',
      },
      {
        condition: 'Cães de porte muito pequeno (< 5 kg) durante titulação oral de CCS',
        alertLevel: 'caution',
        physiologicalExplanation:
          'Uma única gota da solução comercial a 2% contém ≈ 0,74 a 0,80 mg, o que já excede 0,15–0,30 mg/kg em um cão de 2,5–5 kg, estreitando drasticamente a margem até vômito e diarreia.',
        clinicalAction:
          'Em pacientes abaixo de 5 kg, preferir a concentração comercial a 1% (0,40 mg/gota) ou solução manipulada de menor teor para permitir titulação segura.',
      },
    ],
    adverseEffectsDetailed: [
      {
        effect: 'Irritação ocular local, hiperemia conjuntival, blefaroespasmo e irite transitória',
        frequency: 'very_common',
        mechanism:
          'O pH ácido necessário para estabilidade do sal cloridrato (3,5–5,5), somado à vasodilatação conjuntival e ao espasmo rápido dos músculos ciliar e esfíncter pupilar, desencadeia dor e hiperemia mais intensas nas primeiras 48 horas.',
        clinicalManagement:
          'Em CCS neurogênica, preferir a via oral no alimento ou manipulações diluídas (0,05%–0,25%). Se persistir dor intensa ou flare anterior, suspender a aplicação tópica e reavaliar a câmara anterior.',
      },
      {
        effect: 'Hipersalivação, náusea, êmese, cólicas abdominais e diarreia (SLUDDE leve)',
        frequency: 'common',
        mechanism:
          'Ativação direta de receptores muscarínicos M3 nas glândulas salivares, musculatura lisa intestinal e glândulas secretoras durante a titulação oral próxima ao limiar máximo individual.',
        clinicalManagement:
          'Interromper temporariamente por 12–24 horas se houver vômito ou diarreia persistente, manter hidratação e retomar com redução de 1 gota por administração (última dose tolerada).',
      },
      {
        effect: 'Miose persistente / irreversível após uso oftálmico crônico',
        frequency: 'uncommon',
        mechanism:
          'Contração sustentada prolongada associada à atrofia do músculo dilatador e fibrose do músculo esfíncter da íris.',
        clinicalManagement:
          'Evitar terapias oftálmicas crônicas não diluídas; monitorar mobilidade pupilar nos retornos oftalmológicos.',
      },
      {
        effect: 'Bradicardia acentuada, bloqueio AV, broncoespasmo, tosse e edema pulmonar',
        frequency: 'overdose',
        mechanism:
          'Estimulação sistêmica intensa de receptores M2 cardíacos e M3 pulmonares após superdosagem oral, erro de conversão gotas/mL ou sensibilidade extrema (especialmente em gatos).',
        clinicalManagement:
          'Suspender imediatamente, fornecer oxigenoterapia e administrar antimuscarínico de resgate (atropina IV/IM titulada até reversão da bradicardia e broncoconstrição), além de suporte hidroeletrolítico.',
      },
    ],
    doseReductionGuidelines: [
      {
        clinicalCondition: 'Surgimento de hipersalivação marcada, êmese ou fezes pastosas na titulação de CCS',
        recommendedAdjustment:
          'Pular 1 a 2 doses caso haja êmese/anorexia e reduzir permanentemente em 1 gota por tomada, mantendo a maior dose completamente assintomática.',
        physiologicalRationale:
          'A resposta lacrimal ótima frequentemente ocorre imediatamente abaixo do limiar de intolerância gastrointestinal; forçar manutenção gera desidratação e rejeição alimentar.',
      },
      {
        clinicalCondition: 'Cães abaixo de 5 kg ou hepatopatia/debilidade acentuada',
        recommendedAdjustment:
          'Substituir solução a 2% pela apresentação a 1% (0,40 mg/gota) ou iniciar com intervalo a cada 24 horas antes de progredir para q12h.',
        physiologicalRationale:
          'Evita saltos bruscos de exposição em mg/kg por gota e reduz picos vagais gastrointestinais e cardiovasculares.',
      },
      {
        clinicalCondition: 'Doença renal crônica avançada ou disfunção hepatobiliar grave',
        recommendedAdjustment:
          'Não existem fatores numéricos validados de ajuste em cães/gatos; iniciar com fração mínima e espaçar incrementos para intervalos de 5–7 dias sob vigília.',
        physiologicalRationale:
          'Reduz risco de acúmulo relativo ou intolerância hemodinâmica em pacientes idosos e comprometidos.',
      },
    ],
    drugInteractionsDetailed: [
      {
        drugOrClass: 'Anticolinérgicos / Antimuscarínicos (atropina, tropicamida, glicopirrolato)',
        severity: 'major',
        clinicalEffect:
          'Bloqueio completo da eficácia lacrimogênica, secretagoga nasal e miótica da pilocarpina (ou bloqueio de falso-negativo no teste de disautonomia); reciprocamente, a atropina é o antídoto na intoxicação.',
        pharmacologicalMechanism:
          'Antagonismo competitivo reversível direto nos mesmos sítios receptores muscarínicos M1–M5.',
      },
      {
        drugOrClass: 'Betabloqueadores (ex.: timolol tópico/sistêmico, atenolol) e diltiazem',
        severity: 'moderate',
        clinicalEffect:
          'Potencialização clínica de bradicardia, bloqueios atrioventriculares, hipotensão e broncoespasmo caso haja absorção sistêmica significativa da pilocarpina.',
        pharmacologicalMechanism:
          'Efeito inotrópico/cronotrópico negativo sinérgico sobre o nó sinoatrial e atrioventricular.',
      },
      {
        drugOrClass: 'Outros colinomiméticos ou inibidores da colinesterase (betanecol, neostigmina, organofosforados)',
        severity: 'major',
        clinicalEffect:
          'Risco elevado de síndrome colinérgica grave (SLUDDE completo, fasciculações, insuficiência respiratória).',
        pharmacologicalMechanism:
          'Somação direta (agonismo muscarínico) e indireta (inibição da degradação da acetilcolina endógena).',
      },
      {
        drugOrClass: 'Análogos de prostaglandinas tópicos (latanoprosta, travoprosta)',
        severity: 'informational',
        clinicalEffect:
          'Redução adicional de PIO de apenas 1–2 mmHg em ensaio experimental canino, porém soma irritação ciliar e quebra de barreira hematoaquosa, não sendo recomendada em rotina clínica.',
        pharmacologicalMechanism:
          'Mecanismos distintos (aumento do fluxo uveoscleral vs. fluxo trabecular), mas ambos provocam miose acentuada e inflamação subclínica.',
      },
      {
        drugOrClass: 'Outros colírios tópicos administrados simultaneamente',
        severity: 'minor',
        clinicalEffect:
          'Lavagem recíproca do fundo de saco conjuntival com perda de eficácia e risco de incompatibilidade físico-química in vitro.',
        pharmacologicalMechanism:
          'Diluição de volume no filme lacrimal e diferença de pH (solução comercial de pilocarpina é ácida, pH 3,5–5,5).',
      },
    ],
  },
  generalInfoData: {
    routesDetailed: [
      {
        route: 'Via Oral (VO — administração extrabula em gotas com alimento)',
        technique:
          'Contar o número exato de gotas diretamente sobre 1 colher de chá de alimento úmido altamente palatável (patê ou sachê) e oferecer imediatamente antes da refeição principal. Nunca pingar na língua ou na boca sem alimento.',
        nursingCare:
          'Registrar diariamente em caderno/planilha a quantidade de gotas administrada por tomada, o número de evacuações, apetite, salivação e umidade da narina afetada. Confirmar o gotejador do frasco usado (25 vs. 27 gotas/mL).',
        limitations:
          'Margem estreita até sinais gastrointestinais (êmese, diarreia); inapropriada para pacientes anoréxicos com êmese incoercível ou portadores de megaesôfago grave sem suporte adequado.',
      },
      {
        route: 'Via Oftálmica Tópica (OFT — soluções diluídas 0,05%–0,25% ou comerciais 1%–2%)',
        technique:
          'Limpar delicadamente secreções mucopurulentas com solução fisiológica antes da aplicação. Instilar 1 gota no saco conjuntival inferior evitando tocar a córnea com a ponta do frasco. Aguardar mínimo de 5 minutos antes ou após qualquer outro colírio.',
        nursingCare:
          'Observar imediatamente após instilação quanto a blefaroespasmo ou esfregação facial (indicativos de ardência importante em formulações ácidas). Em gatos, vigiar mucosas, salivação e frequência cardíaca após aplicação.',
        limitations:
          'Formulações comerciais humanas (1%–4%, pH 3,5–5,5) produzem desconforto ocular intenso, irite transitória e risco sistêmico em gatos; manipulação diluída é preferida para CCS e obrigatória para o teste diagnóstico pupilar.',
      },
      {
        route: 'Vias Parenterais (IV / IM / SC)',
        technique:
          'Sem indicação ou técnica clínica de rotina em Medicina Veterinária (uso intravenoso restrito a protocolos experimentais sob controle anestésico ou laboratorial).',
        nursingCare:
          'Não tentar preparar soluções injetáveis a partir de colírios comerciais.',
        limitations:
          'Risco agudo e potencialmente fatal de crise colinérgica severa (bradicardia, bloqueio AV, broncoespasmo, edema pulmonar).',
      },
    ],
    dilutionGuide: {
      compatibleFluids: ['Dados não estabelecidos (não indicada para diluição em fluidos intravenosos de rotina).'],
      incompatibleFluids: [
        'Dados não estabelecidos — não misturar colírios de pilocarpina in vitro com outras soluções oftálmicas ou medicamentos na mesma seringa/frasco.',
      ],
      infusionRateGuidance: 'Dados não estabelecidos (não se aplica à infusão contínua intravenosa na clínica).',
      preparationNotes:
        'Para uso oftálmico diluído (teste diagnóstico 0,05%–0,1% ou CCS tópica 0,25%), priorizar manipulação em farmácia estéril veterinária com controle de pH e esterilidade. Em uso emergencial diagnóstico, respeitar estabilidade curta caso haja diluição estéril extemporânea, protegida da luz.',
      storageRequirements:
        'Armazenar entre 15 °C e 25–30 °C (conforme bula), ao abrigo da luz solar direta e da umidade; NÃO congelar. Descartar imediatamente se a solução apresentar turvação, alteração de cor ou material particulado. Para Pilocarpina® Allergan, descartar 90 dias após a abertura do frasco.',
    },
    prescriptionType: {
      category: 'Receita simples (uso humano extrabula — tarja vermelha)',
      ordinanceOrLaw: 'Não listada na Portaria SVS/MS nº 344/1998',
      retentionRequired: false,
      guidelines:
        'Prescrever em duas vias por conveniência médica ou receita simples legível, detalhando obrigatoriamente a marca ou o teor declarado em % (ex.: 2% = 20 mg/mL), o número de gotas por mL considerado para o cálculo, o modo exato de mistura no alimento úmido (quando VO) e os sinais precoces de suspensão imediata.',
    },
    pharmacologicalClassification: {
      chemicalClass: 'Alcaloide imidazólico natural com anel lactônico (extraído de Pilocarpus spp. / jaborandi)',
      chemicalClassDescription:
        'Base terciária fraca (pKa ≈ 6,8) com XLogP ≈ 1,1 (base livre 208,26 g/mol; sal cloridrato 244,72 g/mol). O sal cloridrato garante solubilidade aquosa, demandando pH ácido (3,5–5,5) para evitar hidrólise da lactona.',
      therapeuticClass: 'Agonista colinérgico muscarínico direto / Parassimpaticomimético / Miótico e secretagogo lacrimal',
      therapeuticClassDescription:
        'Ativa diretamente receptores pós-sinápticos muscarínicos sem inibir a acetilcolinesterase, restaurando secreções exócrinas desnervadas e contraindo musculatura lisa ocular e visceral.',
      atcCode: 'S01EB01 (oftalmológico) / N07AX01 (parassimpaticomimético)',
      receptorsAndSites: [
        {
          name: 'Receptor Muscarínico M3 (ácinos lacrimais, glândulas salivares, musculatura lisa ciliar/iriana e brônquica)',
          type: 'GPCR acoplado à proteína Gq/11',
          action: 'Agonista direto total/parcial conforme tecido',
          clinicalEffect:
            'Secreção aquosa lacrimal e nasal (base da CCS neurogênica/xeromicteria), miose, contração ciliar, sialorreia, aumento do peristaltismo e risco de broncoespasmo.',
        },
        {
          name: 'Receptor Muscarínico M2 (nó sinusal, átrios e nó atrioventricular)',
          type: 'GPCR acoplado à proteína Gi/o',
          action: 'Agonista direto',
          clinicalEffect:
            'Redução do AMPc e abertura de canais de K⁺ em doses tóxicas ou sensibilidade individual, gerando bradicardia e bloqueio de condução AV.',
        },
        {
          name: 'Receptores M1 / M4 / M5 (sistema nervoso central e gânglios)',
          type: 'GPCR (Gq/Gi)',
          action: 'Agonista não seletivo',
          clinicalEffect:
            'Secreção gástrica ácida aumentada e possível manifestação neurológica central em intoxicação grave.',
        },
      ],
      autonomicAndEndocrineEffects: [
        {
          system: 'Sistema Ocular e Nasolacrimal',
          effect: 'Lacrimogênico, miótico e espasmo ciliar',
          description:
            'Estímulo acinar lacrimal/nasal restaurado mesmo após lesão do nervo petroso maior ou facial; miose pronunciada e discreto incremento do escoamento trabecular.',
        },
        {
          system: 'Trato Gastrointestinal',
          effect: 'Pró-secretor e hiperperistáltico',
          description:
            'Hipersalivação, náusea, êmese e diarreia constituem os marcadores clínicos mais precoces da superação da dose tolerada durante a titulação oral.',
        },
        {
          system: 'Sistemas Cardiovascular e Respiratório',
          effect: 'Bradicardia e broncoconstrição (dose-dependentes)',
          description:
            'Na toxicidade colinérgica sistêmica (ou após colírio concentrado em gatos predispostos), podem ocorrer tosse, sibilos, edema pulmonar e bradiarritmias responsivas à atropina.',
        },
      ],
    },
    speciesPeculiarities: [
      {
        species: 'dog',
        title: 'Cães: eixo principal na CCS neurogênica com recuperação possível',
        description:
          'Constituem a principal espécie beneficiada pelo fármaco na clínica rotineira (CCS neurogênica e xeromicteria). Apresentam maior previsibilidade na titulação oral gradual com alimento úmido do que gatos, embora a margem entre dose lacrimogênica e náusea/diarreia exija ajustes individualizados e paciência clínica nas primeiras 4 semanas.',
        clinicalImplications:
          'Em cães < 5 kg, evitar começar com 2% direto (≈ 0,74–0,80 mg/gota pode ultrapassar o limiar em miniaturas); preferir 1% (0,40 mg/gota) ou manipulada. Reavaliar após 3–6 meses em idiopáticos para testar possibilidade de desmame.',
      },
      {
        species: 'cat',
        title: 'Gatos: alta sensibilidade sistêmica e irritabilidade oftálmica',
        description:
          'A pilocarpina oftálmica é raramente utilizada de rotina em gatos devido à intensa irritação epitelial/ciliar e ao risco comprovado de absorção sistêmica relevante (redução contralateral de PIO já após uma única gota a 2%). Além disso, a espécie é altamente suscetível a broncoespasmo (especialmente portadores subclínicos de doença brônquica/asma felina) e bradicardia vagal.',
        clinicalImplications:
          'Restringir ao teste farmacológico com solução diluída (0,05%–0,1%) na suspeita de disautonomia ou suporte paliativo excepcional sob monitoramento rigoroso de frequência cardíaca, padrão respiratório e vômito.',
      },
    ],
    curiositiesAndHistory: [
      'A pilocarpina foi isolada no século XIX a partir de folhas de arbustos nativos sul-americanos do gênero Pilocarpus ("jaborandi"), cuja flora é endêmica do Brasil (sobretudo Maranhão e Piauí).',
      'Foi o primeiro fármaco historicamente utilizado em larga escala no tratamento do glaucoma em humanos (introduzido em 1875), antes de ser progressivamente substituído na Medicina Veterinária moderna pelos análogos de prostaglandinas e inibidores da anidrase carbônica.',
    ],
  },
  monitoringParameters: [
    'Teste Lacrimal de Schirmer tipo I (STT-I) basal e a cada 14–30 dias durante a titulação na CCS neurogênica.',
    'Coloração por fluoresceína e biomicroscopia em todos os retornos (risco de úlceras corneanas progressivas antes da recuperação lacrimal e pesquisa de flare aquoso se houver uso tópico).',
    'Hidratação do plano nasal (narina ipsilateral) na xeromicteria associada.',
    'Vigilância diária pelo tutor durante os primeiros 30 dias para toxicidade colinérgica precoce: hipersalivação, êmese, fezes amolecidas, anorexia, tosse ou letargia.',
    'Frequência cardíaca, ausculta pulmonar e pressão arterial em qualquer paciente com suspeita de absorção sistêmica acentuada ou uso em felinos.',
    'Tonometria seriada rigorosa e pesquisa de estabilidade do cristalino se empregada por via tópica em casos excepcionais de glaucoma.',
  ],
  clinicalNotesRichText:
    '<p><strong>Diferenciação prática na rotina:</strong> Olho seco agudo de início súbito (geralmente unilateral) associado à narina ressecada e hiperqueratótica ipsilateral (xeromicteria) é a assinatura clínica da <strong>CCS neurogênica</strong>. Diferente da CCS imunomediada (tratada primariamente com ciclosporina ou tacrolimo), a terapia estimulatória central aqui é a <strong>pilocarpina</strong> associada à lubrificação corneana intensiva e investigação neurológica/otológica.</p><p><strong>Regra de ouro da segurança posológica:</strong> Sempre especifique na receita qual apresentação (<strong>1% ou 2%</strong>) e o laboratório de referência (<strong>Pilocan® 2% = 27 gotas/mL ≈ 0,74 mg/gota</strong>; <strong>Pilocarpina® 2% Allergan = 25 gotas/mL ≈ 0,80 mg/gota</strong>), lembrando que nunca se convertem automaticamente miligramas de cloridrato (PM 244,72) em miligramas de base (PM 208,26). Sempre misturar integralmente em alimento úmido e reduzir 1 gota ao menor sinal gastrointestinal persistente.</p>',
  relatedDiseaseSlugs: [
    'megaesofago-caes-gatos',
    'asma-felina',
    'arritmias-cardiacas-caes-gatos',
  ],
  references: [
    {
      id: 'ref-galley-2022',
      citationText:
        'Galley AP, Beltran E, Tetas Pont R. Neurogenic keratoconjunctivitis sicca in 34 dogs: presentation, etiology, imaging and outcome. Veterinary Ophthalmology, 2022.',
      sourceType: 'Artigo Científico',
      authors: 'Galley AP, Beltran E, Tetas Pont R',
      year: 2022,
      journal: 'Veterinary Ophthalmology',
      pmid: '34870366',
      doi: '10.1111/vop.12949',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34870366/',
      evidenceLevel: 'Série Clínica Retrospectiva',
    },
    {
      id: 'ref-matheis-2012',
      citationText:
        'Matheis FL, Walser-Reinhardt L, Spiess BM. Canine neurogenic keratoconjunctivitis sicca and ipsilateral xeromycteria: clinical features and course in 11 dogs. Veterinary Ophthalmology, 2012.',
      sourceType: 'Artigo Científico',
      authors: 'Matheis FL, Walser-Reinhardt L, Spiess BM',
      year: 2012,
      journal: 'Veterinary Ophthalmology',
      pmid: '22051024',
      doi: '10.1111/j.1463-5224.2011.00968.x',
      url: 'https://pubmed.ncbi.nlm.nih.gov/22051024/',
      evidenceLevel: 'Série Clínica',
    },
    {
      id: 'ref-weaver-1992',
      citationText:
        'Weaver ML, Tanzer JM, Kramer PA. Salivary flow induction by buccal permucosal pilocarpine in anesthetized beagle dogs / pharmacokinetics of intravenous pilocarpine in dogs. Pharmaceutical Research, 1992.',
      sourceType: 'Artigo Científico',
      authors: 'Weaver ML, Tanzer JM, Kramer PA',
      year: 1992,
      journal: 'Pharmaceutical Research',
      pmid: '1409379',
      doi: '10.1023/A:1015814730154',
      url: 'https://pubmed.ncbi.nlm.nih.gov/1409379/',
      evidenceLevel: 'Estudo Farmacocinético Experimental Canino',
    },
    {
      id: 'ref-wilkie-1991',
      citationText:
        'Wilkie DA, Latimer CA. Effects of topical administration of 2.0% pilocarpine on intraocular pressure and pupil size in cats. American Journal of Veterinary Research, 1991.',
      sourceType: 'Artigo Científico',
      authors: 'Wilkie DA, Latimer CA',
      year: 1991,
      journal: 'American Journal of Veterinary Research',
      pmid: '2035919',
      doi: '10.2460/ajvr.1991.52.03.441',
      url: 'https://pubmed.ncbi.nlm.nih.gov/2035919/',
      evidenceLevel: 'Ensaio Experimental Controlado Felino',
    },
    {
      id: 'ref-johnson-2023',
      citationText:
        'Johnson MD, Rankin AJ, Meekins JM. Ophthalmic abnormalities and pharmacologic testing with dilute pilocarpine in 79 dogs with dysautonomia. Journal of the American Veterinary Medical Association, 2023.',
      sourceType: 'Artigo Científico',
      authors: 'Johnson MD, Rankin AJ, Meekins JM',
      year: 2023,
      journal: 'Journal of the American Veterinary Medical Association',
      pmid: '37380162',
      doi: '10.2460/javma.23.03.0134',
      url: 'https://pubmed.ncbi.nlm.nih.gov/37380162/',
      evidenceLevel: 'Série Clínica Diagnóstica Canina',
    },
    {
      id: 'ref-kidder-2008',
      citationText:
        'Kidder AC, Johannes C, O\'Brien DP, Harkin KR, Marretta SM. Feline dysautonomia in the Midwestern United States: a retrospective study of nine cases. Journal of Feline Medicine and Surgery, 2008.',
      sourceType: 'Artigo Científico',
      authors: 'Kidder AC et al.',
      year: 2008,
      journal: 'Journal of Feline Medicine and Surgery',
      pmid: '17950646',
      doi: '10.1016/j.jfms.2007.08.005',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17950646/',
      evidenceLevel: 'Série Clínica Felina',
    },
    {
      id: 'ref-sarchahi-2012',
      citationText:
        'Sarchahi AA, Abbasi N, Gholipour MA. Effects of an unfixed combination of latanoprost and pilocarpine on intraocular pressure and pupil size in normal dogs. Veterinary Ophthalmology, 2012.',
      sourceType: 'Artigo Científico',
      authors: 'Sarchahi AA, Abbasi N, Gholipour MA',
      year: 2012,
      journal: 'Veterinary Ophthalmology',
      evidenceLevel: 'Ensaio Experimental Canino',
    },
    {
      id: 'ref-gomez-2024',
      citationText:
        'Gómez Villasclaras P, Malho P. Management of neurogenic keratoconjunctivitis sicca with systemic pilocarpine and intensive ocular surface support in a dog. Veterinary Record Case Reports, 2024.',
      sourceType: 'Artigo Científico',
      authors: 'Gómez Villasclaras P, Malho P',
      year: 2024,
      journal: 'Veterinary Record Case Reports',
      evidenceLevel: 'Relato de Caso Clínico',
    },
    {
      id: 'ref-plumbs-pilocarpine',
      citationText: "Plumb's Veterinary Drug Handbook — Monografia Pilocarpine Ophthalmic.",
      sourceType: 'Formulário Veterinário',
    },
    {
      id: 'ref-bsava-pilocarpine',
      citationText: 'BSAVA Small Animal Formulary, Part A: Canine and Feline — Monografia Pilocarpine.',
      sourceType: 'Formulário Veterinário',
    },
    {
      id: 'ref-nelson-couto',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine — Medicina Interna de Pequenos Animais.',
      sourceType: 'Tratado de Medicina Interna',
    },
    {
      id: 'ref-delahunta-neuro',
      citationText: 'de Lahunta A, Glass E, Kent M. Veterinary Neuroanatomy and Clinical Neurology.',
      sourceType: 'Tratado de Neurologia Veterinária',
    },
    {
      id: 'ref-practical-neurology',
      citationText: 'Dewey CW, da Costa RC. Practical Guide to Canine and Feline Neurology.',
      sourceType: 'Tratado de Neurologia Veterinária',
    },
    {
      id: 'ref-pubchem-5910',
      citationText: 'PubChem Compound Summary: Pilocarpine (CID 5910) e Cloridrato de Pilocarpina.',
      sourceType: 'Base Química Oficial',
      url: 'https://pubchem.ncbi.nlm.nih.gov/compound/5910',
    },
    {
      id: 'ref-bula-pilocan-cristalia',
      citationText: 'Cristália Produtos Químicos Farmacêuticos Ltda. Bula do profissional: Pilocan® 2% (cloridrato de pilocarpina 20 mg/mL).',
      sourceType: 'Bula Oficial Brasileira',
      url: 'https://www.cristalia.com.br/produto/solucao-oftalmica-esteril-20-mgml-20',
    },
    {
      id: 'ref-bula-pilocarpina-allergan',
      citationText: 'Allergan Produtos Farmacêuticos Ltda. Bula do medicamento: Pilocarpina® 1%, 2% e 4% solução oftálmica.',
      sourceType: 'Bula Oficial Brasileira',
      url: 'https://img.drogasil.com.br/raiadrogasil_bula/PILOCARPINA.pdf',
    },
  ],
  isPublished: true,
};
