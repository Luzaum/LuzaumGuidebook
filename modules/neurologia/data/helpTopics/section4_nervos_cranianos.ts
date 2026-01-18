import type { HelpTopic } from '../../types/helpTopics'

export const section4NervosCranianos: HelpTopic[] = [
  {
    id: 's4-nervos-cranianos-geral',
    title: 'Nervos cranianos (visão geral)',
    whatItAssesses:
      'Integração sensorial e motora entre receptores periféricos (olho, face, faringe) e núcleos de nervos cranianos no tronco encefálico, além de conexões com prosencéfalo e cerebelo. Déficits de nervos cranianos ajudam a diferenciar lesões periféricas (ex.: facial) de lesões centrais (tronco encefálico) e, quando combinados à mentação, refinam neurolocalização (prosencéfalo vs tronco encefálico).',
    neuroanatomy:
      'Núcleos dos nervos cranianos localizam-se majoritariamente no tronco encefálico (mesencéfalo/ponte/bulbo). A via de ameaça envolve retina→II→tálamo/córtex visual (prosencéfalo) e eferência pelo VII. PLR envolve II aferente e III parassimpático (Edinger–Westphal) e gânglio ciliar. Testes misturam reflexos (PLR) e respostas com componente cortical/aprendido (ameaça). A interpretação exige separar aferência, integração central e eferência.',
    howToPerform:
      'Realizar em ambiente calmo, com boa iluminação. Sempre comparar lados (E/D). Registrar lateralidade e consistência. Correlacionar com mentação, marcha e reações posturais.',
    interpretation:
      'Múltiplos déficits de NC + mentação alterada = forte suspeita de tronco encefálico. Ameaça ausente com PLR normal sugere disfunção cortical/cegueira sem falha pupilar. Achados vestibulares (nistagmo/estrabismo/head tilt) podem ser periféricos ou centrais, e mentação é um dos melhores discriminadores.',
    pitfalls:
      'Não comparar lados; confundir reflexo com resposta cortical; ignorar doenças oculares/medicações (atropina/opioides) e interpretar como lesão neurológica central.',
    tags: ['nervos-cranianos', 'tronco-encefalico', 'prosencefalo', 'II', 'III', 'VII', 'VIII', 'IX', 'X'],
    severityWeight: 2,
    localizationHint: ['tronco-encefalico', 'prosencefalo', 'periferico'],
    diagnosticWeight: 2,
    neuroLocalization: ['brainstem', 'forebrain', 'peripheral_nerve'],
    suggestedTests: ['MRI', 'CSF'],
  },
  {
    id: 's4-ameaca-oquee',
    title: 'Ameaça (Menace) — o que avalia e como interpretar',
    whatItAssesses:
      'Resposta de piscar/retirada da cabeça diante de um gesto ameaçador. Avalia visão funcional e processamento cortical, com eferência motora facial. Ajuda a diferenciar cegueira/lesão cortical (prosencéfalo) de alterações da via pupilar (II/III). É essencial em queixas como "cegueira" ou alterações comportamentais.',
    neuroanatomy:
      'Aferência: retina→nervo óptico (II)→trato óptico→núcleo geniculado lateral/tálamo→córtex visual. Integração: córtex visual e conexões cerebelares de modulação. Eferência: nervo facial (VII) para piscar. Não é reflexo puro: exige componente cortical e aprendizado. Pode falhar em filhotes e em animais muito ansiosos/letárgicos.',
    howToPerform:
      'Cobrir um olho. Fazer gesto rápido em direção ao outro sem deslocar ar (não assoprar). Observar piscar (orbicular do olho) e/ou retração da cabeça. Repetir no outro lado.',
    interpretation:
      'Ameaça ausente com PLR normal: suspeitar de cegueira cortical/lesão do prosencéfalo ou doença retiniana que preserve PLR. Ameaça ausente com PLR alterado: suspeitar de retina/II/via pupilar. Se o animal enxerga mas não pisca, considerar lesão do VII.',
    pitfalls:
      'Assoprar (ativa reflexos não visuais), tocar vibrissas, avaliar em filhote muito jovem, ignorar catarata/uveíte/dor ocular.',
    tags: ['ameaca', 'menace', 'visao', 'II', 'VII', 'prosencefalo', 'cortico'],
    severityWeight: 2,
    localizationHint: ['prosencefalo', 'retina', 'II', 'VII'],
    diagnosticWeight: 2,
    neuroLocalization: ['forebrain', 'cerebellum'],
    cranialNerves: [2, 7],
    clinicalAlerts: ['Menace ausente com PLR preservado sugere lesão cortical ou cerebelar (não cegueira retiniana).'],
  },
  {
    id: 's4-ameaca-olho-esquerdo',
    title: 'Ameaça (Menace) — Olho esquerdo',
    whatItAssesses:
      'Função visual e integração cortical associada ao olho esquerdo, com resposta motora facial (piscar). Permite lateralizar déficit visual/cortical e cruzar com PLR e exame ocular.',
    neuroanatomy: 'Aferência via II; processamento cortical; eferência pelo VII (piscar). Depende de percepção visual e resposta aprendida; pode ser inconsistente em estresse ou letargia.',
    howToPerform:
      'Cobrir o olho direito e aplicar gesto sem deslocar ar no campo visual do olho esquerdo. Observar piscar/retração. Repetir 2–3 vezes.',
    interpretation:
      'Ausência unilateral com PLR normal sugere lesão cortical contralateral ao olho testado ou cegueira funcional; ausência com PLR alterado sugere via óptica/pupilar. Presença sugere via funcional, mas não exclui déficits sutis.',
    pitfalls: 'Interpretar como visão normal sem correlacionar com comportamento visual e PLR.',
    diagnosticWeight: 2,
    neuroLocalization: ['forebrain'],
    cranialNerves: [2, 7],
  },
  {
    id: 's4-ameaca-olho-direito',
    title: 'Ameaça (Menace) — Olho direito',
    whatItAssesses:
      'Função visual e integração cortical associada ao olho direito, com eferência facial. Avalia simetria visual e auxilia na suspeita de lesão cortical lateralizada.',
    neuroanatomy: 'II (aferente) → córtex; VII (eferente). Resposta com componente cortical, variável com estresse/sedação.',
    howToPerform: 'Cobrir o olho esquerdo e aplicar gesto sem deslocar ar no olho direito. Repetir 2–3 vezes.',
    interpretation:
      'Mesma lógica do olho esquerdo: PLR normal + menace ausente sugere cortical/cegueira; PLR alterado sugere retina/II/III.',
    pitfalls: 'Não isolar o olho contralateral e induzir resposta por outros estímulos.',
    diagnosticWeight: 2,
    neuroLocalization: ['forebrain'],
    cranialNerves: [2, 7],
  },
  {
    id: 's4-plr-oquee',
    title: 'Reflexo pupilar à luz (PLR) — o que avalia',
    whatItAssesses:
      'Constrição pupilar diante de luz. Avalia principalmente a via pupilar: aferência (II), integração (pré-tectal/Edinger–Westphal) e eferência parassimpática (III → gânglio ciliar). Diferencia lesões da via pupilar (retina/II/III) de cegueira cortical. É crucial em cegueira aguda, anisocoria e suspeita de herniação/lesão de tronco encefálico.',
    neuroanatomy:
      'Retina→II→núcleo pré-tectal→Edinger–Westphal (mesencéfalo)→III→gânglio ciliar→músculo esfíncter da pupila. Reflexo autonômico. Não exige córtex. Portanto PLR pode estar normal mesmo com cegueira cortical.',
    howToPerform:
      'Em ambiente com pouca luz, iluminar um olho com lanterna. Observar constrição direta (e, se desejar, consensual). Classificar: normal, lento, ausente. Repetir no outro olho.',
    interpretation:
      'PLR ausente indica problema aferente (retina/II) ou eferente (III/parassimpático) ou doença ocular grave. PLR normal com menace ausente sugere lesão cortical/cegueira sem falha pupilar.',
    pitfalls: 'Ignorar drogas (atropina/tropicamida), glaucoma/uveíte, dor ocular, luz ambiente forte e distância variável.',
    diagnosticWeight: 2,
    neuroLocalization: ['brainstem', 'forebrain'],
    cranialNerves: [2, 3],
  },
  {
    id: 's4-plr-olho-esquerdo',
    title: 'PLR — Olho esquerdo (normal/lento/ausente)',
    whatItAssesses:
      'Integridade da via pupilar do olho esquerdo. Em conjunto com menace e comportamento visual, ajuda a localizar falha ocular/óptica vs cortical vs tronco encefálico.',
    neuroanatomy: 'II aferente esquerdo, integração mesencefálica, III parassimpático. Reflexo autonômico (não cortical).',
    howToPerform: 'Iluminar o olho esquerdo e observar constrição. Classificar. Comparar com direito.',
    interpretation:
      'Lento sugere comprometimento parcial (ocular/II/III). Ausente é red flag (retina/II/III/doença ocular grave). Normal não garante visão normal (menace pode estar ausente em cegueira cortical).',
    pitfalls: 'Avaliar com luz ambiente alta ou após colírios midriáticos.',
    diagnosticWeight: 2,
    neuroLocalization: ['brainstem'],
    cranialNerves: [2, 3],
  },
  {
    id: 's4-plr-olho-direito',
    title: 'PLR — Olho direito (normal/lento/ausente)',
    whatItAssesses:
      'Integridade da via pupilar do olho direito. Permite comparação lateralizada e identifica anisocoria/lesão de II/III.',
    neuroanatomy: 'II aferente direito, núcleos no mesencéfalo, III parassimpático. Reflexo autonômico independente do córtex.',
    howToPerform: 'Iluminar olho direito, observar e classificar. Comparar com esquerdo.',
    interpretation:
      'Mesma lógica do olho esquerdo: ausente é red flag, lento sugere parcial, normal não exclui cegueira cortical.',
    pitfalls: 'Não padronizar distância/intensidade da lanterna.',
    diagnosticWeight: 2,
    neuroLocalization: ['brainstem'],
    cranialNerves: [2, 3],
  },
  {
    id: 's4-nistagmo-oquee',
    title: 'Nistagmo patológico — o que avalia',
    whatItAssesses:
      'Atividade anormal do sistema vestibular gerando movimentos oculares rítmicos involuntários. É um dos sinais mais úteis para síndrome vestibular e, junto com mentação e déficits posturais, ajuda a diferenciar vestibular periférico vs central.',
    neuroanatomy:
      'Aparelho vestibular (periférico) → nervo vestibular (VIII) → núcleos vestibulares no tronco → conexões com III/IV/VI e cerebelo. Desequilíbrio vestibular gera assimetria no reflexo vestíbulo-ocular (VOR), resultando em nistagmo.',
    howToPerform:
      'Observar olhos em repouso. Se seguro, observar com mudança suave de posição da cabeça. Registrar presença/ausência (e futuramente direção).',
    interpretation:
      'Mentação normal e poucos déficits centrais sugerem periférico. Mentação alterada, déficits posturais severos e sinais adicionais de NC sugerem vestibular central. Nistagmo vertical é mais sugestivo de central.',
    pitfalls: 'Confundir nistagmo fisiológico com patológico; avaliar em rotação extrema de cabeça; ignorar sedação.',
    diagnosticWeight: 3,
    neuroLocalization: ['vestibular_peripheral', 'vestibular_central', 'brainstem'],
    cranialNerves: [8],
    urgencyFlag: true,
    suggestedTests: ['otoscopy', 'MRI'],
    clinicalAlerts: ['Nistagmo vertical ou direcionalmente variável → Frequente em lesão CENTRAL.'],
  },
  {
    id: 's4-estrabismo-oquee',
    title: 'Estrabismo — o que avalia',
    whatItAssesses:
      'Desalinhamento ocular. III (oculomotor) causa midríase, ptose e estrabismo ventrolateral. VI causa medial. Vestibular causa posicional.',
    neuroanatomy:
      'III/IV/VI (núcleos no tronco) e conexões vestibulares. Lesão do III causa midríase (falha parassimpática) + ptose + estrabismo ventrolateral. Vestibular gera estrabismo posicional.',
    howToPerform: 'Observar olhos em repouso. Se seguro, avaliar se é posicional (muda com posição da cabeça). Registrar presente/ausente.',
    interpretation:
      'Com head tilt/nistagmo sugere vestibular. Com outros déficits de NC e mentação alterada sugere tronco encefálico.',
    pitfalls: 'Não considerar estrabismo basal de raça; não correlacionar com sinais vestibulares.',
    diagnosticWeight: 2,
    neuroLocalization: ['brainstem', 'vestibular_peripheral', 'vestibular_central'],
    cranialNerves: [3, 4, 6, 8],
    clinicalAlerts: ['Midríase + Estrabismo ventrolateral = Lesão do NC III (Oculomotor).'],
  },
  {
    id: 's4-sensibilidade-facial-v',
    title: 'Sensibilidade facial (V) — o que avalia',
    whatItAssesses:
      'Aferência sensitiva da face pelo nervo trigêmeo (V). Déficits sensitivos faciais podem indicar lesões periféricas (V) ou centrais (tronco encefálico), e ajudam a localizar doença de base de crânio.',
    neuroanatomy:
      'V aferente sensitivo → núcleos do trigêmeo no tronco. Integração com respostas comportamentais/motoras. Transmissão sensorial somática; respostas dirigidas dependem de percepção e reatividade comportamental.',
    howToPerform:
      'Toque/pressão leve em regiões inervadas pelo V (focinho, face lateral, vibrissas). Observar reação (retração/evitação). Comparar lados.',
    interpretation:
      'Diminuído/ausente unilateral sugere lesão do V ipsilateral ou tronco. Associado a múltiplos déficits de NC e mentação alterada: forte suspeita de tronco encefálico.',
    pitfalls: 'Animal agressivo reage por comportamento; sedação reduz reação; estímulo inconsistente.',
    diagnosticWeight: 2,
    neuroLocalization: ['brainstem', 'forebrain', 'peripheral_nerve'],
    cranialNerves: [5],
  },
  {
    id: 's4-degluticao-ix-x',
    title: 'Reflexo de deglutição (IX/X) — o que avalia',
    whatItAssesses:
      'Função bulbar relacionada a deglutição e proteção de via aérea, envolvendo IX (glossofaríngeo) e X (vago). Disfagia é red flag por risco de aspiração e sugere lesão bulbar/tronco encefálico ou doença neuromuscular difusa.',
    neuroanatomy:
      'Núcleos bulbares no tronco (bulbo). Conexões com laringe/faringe e coordenação neuromuscular. Reflexo e padrão motor complexo; falhas aumentam risco de aspiração e pneumonia.',
    howToPerform:
      'Preferir observação funcional (engasgos, tosse pós-água, dificuldade). Evitar estímulos invasivos. Em suspeita importante, não forçar água/alimento.',
    interpretation:
      'Diminuído/ausente + mentação alterada e outros NC = alta suspeita de tronco encefálico. Mesmo isolado é emergência funcional pela aspiração.',
    pitfalls:
      'Testar oferecendo água em paciente com risco; confundir doença laríngea/obstrução com disfunção neurológica sem avaliar vias aéreas.',
    diagnosticWeight: 3,
    urgencyFlag: true,
    emergencyTriggers: ['aspiration_risk', 'bulbar_signs'],
    neuroLocalization: ['brainstem', 'peripheral_nerve', 'neuromuscular'],
    cranialNerves: [9, 10],
    suggestedTests: ['thoracic_radiograph'],
    clinicalAlerts: ['Risco imediato de aspiração. Não forçar via oral.'],
  },
]
