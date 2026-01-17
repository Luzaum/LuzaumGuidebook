import type { HelpTopic } from '../../types/helpTopics'

export const section4NervosCranianos: HelpTopic[] = [
  {
    id: 'sec4-intro-nervos-cranianos',
    title: 'Nervos cranianos: visão geral',
    whatItAssesses:
      'Avaliação de funções sensoriais e motoras associadas aos nervos cranianos e suas conexões no tronco encefálico, prosencéfalo e cerebelo.',
    neuroanatomy:
      'Muitos nervos cranianos têm núcleos no tronco encefálico. Déficits de NC associados a alteração de mentação aumentam suspeita de tronco encefálico/SRAA. Alguns testes (ameaça) dependem também de córtex (prosencéfalo).',
    howToPerform:
      'Realize o exame com o animal calmo e em ambiente com boa iluminação. Compare sempre esquerda vs direita. Documente lateralidade e consistência. Evite repetir estímulos de forma exagerada para não dessensibilizar.',
    interpretation:
      'Déficits múltiplos de nervos cranianos com mentação alterada frequentemente indicam lesão de tronco encefálico. Ameaça ausente com PLR normal sugere deficiência cortical/visual, não necessariamente III.',
    pitfalls:
      'Olho seco, dor ocular, catarata, cegueira prévia e sedação podem interferir. Sempre correlacione com exame oftálmico básico e histórico. Quando aparece: Lesões centrais (tronco/prosencéfalo), síndrome vestibular central, neuropatias cranianas periféricas (ex.: facial).',
  },
  {
    id: 'sec4-menace-oquee',
    title: 'Ameaça (Menace): o que avalia',
    whatItAssesses:
      'Resposta de piscar/retirar a cabeça diante de um gesto ameaçador. Avalia via visual e processamento cortical, com componente motor facial.',
    neuroanatomy:
      'Via aferente: retina → nervo óptico (II) → tratos ópticos → córtex visual (prosencéfalo). Via eferente: córtex/cerebelo modulam → nervo facial (VII) para piscar. Não é um reflexo puro; exige integridade cortical e aprendizado.',
    howToPerform:
      'Cubra um olho e faça um gesto rápido em direção ao outro sem deslocar ar (evite soprar). Observe piscar e/ou retração da cabeça. Repita do outro lado.',
    interpretation:
      'Menace ausente com PLR normal sugere lesão cortical/visual (prosencéfalo) ou cegueira, não necessariamente lesão do III. Menace ausente + PLR alterado sugere lesão mais anterior (retina/II) ou via pupilar.',
    pitfalls:
      'Filhotes podem não ter menace plenamente desenvolvido. Animais ansiosos podem fechar olhos por medo. Doença ocular dolorosa reduz resposta. Quando aparece: Lesões prosencefálicas, cegueira, doenças retinianas, lesões do VII (se piscar ausente).',
  },
  {
    id: 'sec4-menaceE-presente',
    title: 'Ameaça (Menace) olho esquerdo: Presente',
    whatItAssesses: 'Resposta de ameaça preservada no olho esquerdo.',
    neuroanatomy: 'Sugere integridade funcional do sistema visual cortical associado e do nervo facial (piscar) do lado testado.',
    howToPerform: 'Teste com o olho direito coberto e gesto sem deslocar ar. Confirme consistência em 2–3 tentativas.',
    interpretation:
      'Ajuda a excluir cegueira cortical/ocular significativa no lado testado, mas deve ser correlacionado com PLR e exame ocular.',
    pitfalls:
      'Resposta pode ser "aprendida" e variar. Não use isoladamente para concluir visão normal. Quando aparece: Normalidade ou lesões não envolvendo via visual/cortical relevante.',
  },
  {
    id: 'sec4-menaceE-ausente',
    title: 'Ameaça (Menace) olho esquerdo: Ausente',
    whatItAssesses: 'Ausência de piscar/retirada diante de ameaça no olho esquerdo.',
    neuroanatomy:
      'Pode refletir cegueira (retina/II), lesão cortical contralateral (prosencéfalo), disfunção cerebelar (modulação) ou lesão do VII (se não pisca).',
    howToPerform: 'Garanta que não há deslocamento de ar. Repita e compare com o outro olho. Correlacione com PLR esquerdo e exame ocular básico.',
    interpretation:
      'Se PLR normal e menace ausente, suspeite de deficiência cortical/visual (prosencéfalo) ou cegueira não pupilar. Se PLR também alterado, priorize retina/II ou via pupilar.',
    pitfalls:
      'Catarata, uveíte, dor ocular e filhote muito jovem interferem. Verifique reflexo palpebral (quando disponível) e exame ocular. Quando aparece: Lesões prosencefálicas, cegueira, doença retiniana, lesão do VII.',
  },
  {
    id: 'sec4-menaceD-presente',
    title: 'Ameaça (Menace) olho direito: Presente',
    whatItAssesses: 'Resposta de ameaça preservada no olho direito.',
    neuroanatomy: 'Integridade funcional da via visual cortical associada e eferência facial para piscar.',
    howToPerform: 'Cubra o olho esquerdo e faça gesto sem deslocar ar. Confirme consistência.',
    interpretation: 'Sugere função visual cortical preservada no lado testado, mas correlacione com PLR e exame ocular.',
    pitfalls: 'Pode variar com estresse. Use em conjunto com outros testes. Quando aparece: Normalidade.',
  },
  {
    id: 'sec4-menaceD-ausente',
    title: 'Ameaça (Menace) olho direito: Ausente',
    whatItAssesses: 'Ausência de resposta de ameaça no olho direito.',
    neuroanatomy: 'Pode ser lesão da via visual (retina/II), prosencéfalo contralateral, cerebelo (modulação) ou VII (eferente).',
    howToPerform: 'Evite deslocar ar. Compare com olho esquerdo. Integre com PLR direito e exame ocular.',
    interpretation:
      'Menace ausente + PLR normal favorece problema cortical/visual. Menace ausente + PLR alterado favorece retina/II/via pupilar.',
    pitfalls: 'Doença ocular/filhote/ansiedade. Não concluir sem correlação. Quando aparece: Lesões prosencefálicas, cegueira, lesão VII.',
  },
  {
    id: 'sec4-plr-oquee',
    title: 'Reflexo pupilar à luz (PLR): o que avalia',
    whatItAssesses:
      'Constrição pupilar diante de luz. Avalia integridade da via pupilar (II aferente, III parassimpático e vias centrais associadas).',
    neuroanatomy:
      'Aferência: retina → nervo óptico (II). Integração: área pré-tectal → núcleo de Edinger–Westphal. Eferência: nervo oculomotor (III) → gânglio ciliar → músculo esfíncter da pupila.',
    howToPerform:
      'Em ambiente com pouca luz, ilumine um olho com lanterna e observe constrição direta e consensual (se você optar por avaliar). Registre como normal/lento/ausente.',
    interpretation:
      'PLR ausente sugere falha aferente (retina/II) ou eferente (III/parassimpático), ou lesão ocular grave. PLR preservado com menace ausente favorece lesão cortical/visual (prosencéfalo) ou cegueira não pupilar.',
    pitfalls:
      'Atropina, opioides, uveíte, sinequias, glaucoma e dor ocular alteram PLR. Avalie pupilas e contexto medicamentoso. Quando aparece: Útil em diferenciar cegueira cortical vs ocular/II/III.',
  },
  {
    id: 'sec4-plrE-normal',
    title: 'PLR olho esquerdo: Normal',
    whatItAssesses: 'Constrição pupilar normal no olho esquerdo ao estímulo luminoso.',
    neuroanatomy: 'Sugere via pupilar funcional (II e III) no circuito avaliado.',
    howToPerform: 'Ilumine o olho esquerdo e observe constrição direta. Compare com o outro olho.',
    interpretation:
      'Se menace está ausente com PLR normal, isso aumenta suspeita de lesão cortical/visual (prosencéfalo) ou cegueira não pupilar.',
    pitfalls: 'PLR normal não garante visão normal (menace/córtex). Correlacione com comportamento visual. Quando aparece: Normalidade ou lesões fora da via pupilar.',
  },
  {
    id: 'sec4-plrE-lento',
    title: 'PLR olho esquerdo: Lento',
    whatItAssesses: 'Constrição pupilar mais lenta ou incompleta no olho esquerdo.',
    neuroanatomy: 'Pode indicar comprometimento parcial da aferência (retina/II) ou eferência (III/parassimpático), ou alterações oculares.',
    howToPerform: 'Padronize intensidade de luz e distância. Compare com o outro olho. Observe se há anisocoria em repouso.',
    interpretation:
      'PLR lento unilateral deve ser correlacionado com visão, pupilas, dor ocular e histórico medicamentoso. Se associado a mentação alterada e outros déficits de NC, aumenta suspeita de tronco.',
    pitfalls:
      'Iluminação ambiente e estresse alteram avaliação. Repetir em condições padronizadas. Quando aparece: Uveíte, neuropatia óptica parcial, disfunção autonômica, compressões.',
  },
  {
    id: 'sec4-plrE-ausente',
    title: 'PLR olho esquerdo: Ausente',
    whatItAssesses: 'Ausência de constrição pupilar no olho esquerdo ao estímulo luminoso.',
    neuroanatomy: 'Pode ser falha aferente (retina/II), falha eferente (III/parassimpático) ou doença ocular severa.',
    howToPerform: 'Confirme com luz adequada. Avalie também a pupila em repouso e, se possível, resposta consensual no outro olho.',
    interpretation:
      'PLR ausente é red flag oftálmica/neurológica. Se associado a alteração de mentação e outros déficits de NC, considere tronco encefálico. Se isolado, priorize avaliação ocular/II/III.',
    pitfalls:
      'Atropina/tropicamida e dor ocular podem confundir. Checar história e exame ocular. Quando aparece: Descolamento de retina, neuropatia óptica grave, compressão do III, glaucoma severo, midríase farmacológica.',
  },
  {
    id: 'sec4-plrD-normal',
    title: 'PLR olho direito: Normal',
    whatItAssesses: 'Constrição pupilar normal no olho direito ao estímulo luminoso.',
    neuroanatomy: 'Via pupilar funcional do lado avaliado.',
    howToPerform: 'Ilumine o olho direito e observe constrição direta. Compare com esquerdo.',
    interpretation: 'Menace ausente com PLR normal sugere problema cortical/visual e não necessariamente via pupilar.',
    pitfalls: 'PLR preservado não confirma visão. Avalie comportamento visual. Quando aparece: Normalidade.',
  },
  {
    id: 'sec4-plrD-lento',
    title: 'PLR olho direito: Lento',
    whatItAssesses: 'Constrição pupilar lenta/incompleta no olho direito.',
    neuroanatomy: 'Disfunção parcial da via pupilar aferente/eferente ou doença ocular.',
    howToPerform: 'Repetir com luz padronizada, comparar com olho esquerdo e observar anisocoria.',
    interpretation:
      'Se acompanhado por outros déficits de NC e mentação alterada, aumenta suspeita de tronco encefálico; se isolado, priorize avaliação ocular/II/III.',
    pitfalls: 'Ambiente claro e estresse interferem. Ajuste iluminação. Quando aparece: Uveíte, neuropatia óptica parcial, disfunção autonômica.',
  },
  {
    id: 'sec4-plrD-ausente',
    title: 'PLR olho direito: Ausente',
    whatItAssesses: 'Ausência de PLR no olho direito.',
    neuroanatomy: 'Falha do II (aferente), III/parassimpático (eferente) ou doença ocular grave.',
    howToPerform: 'Confirmar com luz adequada e correlacionar com pupila em repouso e outros sinais oculares/neurológicos.',
    interpretation:
      'Red flag. Se combinado a múltiplos déficits de NC e alteração de mentação, considerar tronco encefálico/herniação; se isolado, priorizar oftálmico.',
    pitfalls:
      'Fármacos midriáticos e dor ocular. Verificar histórico. Quando aparece: Descolamento de retina, neuropatia óptica grave, compressão do III, glaucoma severo, midríase farmacológica.',
  },
  {
    id: 'sec4-nistagmo-presente',
    title: 'Nistagmo patológico: Presente',
    whatItAssesses:
      'Movimento rítmico involuntário dos olhos. Quando patológico, sugere síndrome vestibular (periférica ou central).',
    neuroanatomy:
      'O nistagmo decorre de desequilíbrio vestibular. Núcleos vestibulares no tronco e conexões cerebelares modulam reflexos oculomotores.',
    howToPerform:
      'Observe em repouso e com mudança de posição da cabeça (quando seguro). Descreva direção (horizontal/vertical/rotatório) se você optar por detalhar no futuro.',
    interpretation:
      'Nistagmo + mentação normal tende a periférico; nistagmo com mentação alterada e déficits posturais importantes sugere central. Nistagmo vertical é mais sugestivo de central.',
    pitfalls:
      'Nistagmo fisiológico pode ocorrer com rotação extrema da cabeça. Avalie em posição neutra. Quando aparece: Otite interna, vestibular idiopático, AVC/encefalite de tronco, lesões cerebelares.',
  },
  {
    id: 'sec4-nistagmo-ausente',
    title: 'Nistagmo patológico: Ausente',
    whatItAssesses: 'Não há nistagmo visível durante o exame.',
    neuroanatomy: 'Ausência de nistagmo não exclui vestibular (pode ser episódico ou compensado).',
    howToPerform: 'Observe olhos em repouso e durante movimentos suaves de cabeça (se seguro).',
    interpretation:
      'Se há head tilt/ataxia vestibular mas sem nistagmo, ainda pode haver síndrome vestibular compensada ou fase tardia.',
    pitfalls: 'Ambiente muito iluminado e estresse podem dificultar observar nistagmo sutil. Quando aparece: Normalidade ou vestibular compensado.',
  },
  {
    id: 'sec4-estrabismo-presente',
    title: 'Estrabismo: Presente',
    whatItAssesses:
      'Desalinhamento ocular (um olho desvia). Pode estar associado a vestibular, paresia de nervos oculomotores ou lesões centrais.',
    neuroanatomy:
      'O controle ocular envolve nervos III, IV e VI (núcleos no tronco) e modulação vestibular. Estrabismo posicional é comum em vestibular.',
    howToPerform: 'Observe posição ocular em repouso. Avalie simetria. Se no futuro você incluir movimentos oculares (III/IV/VI), correlacione.',
    interpretation:
      'Estrabismo com head tilt/nistagmo sugere vestibular. Estrabismo com outros déficits de NC e mentação alterada sugere tronco.',
    pitfalls:
      'Algumas raças têm estrabismo basal. Compare com histórico e com posição habitual. Quando aparece: Otite interna, vestibular central, lesões oculomotoras, trauma.',
  },
  {
    id: 'sec4-estrabismo-ausente',
    title: 'Estrabismo: Ausente',
    whatItAssesses: 'Não há desalinhamento ocular evidente.',
    neuroanatomy: 'Ausência não exclui vestibular ou lesões oculomotoras sutis.',
    howToPerform: 'Observe olhos em repouso e em diferentes posições (quando seguro).',
    interpretation: 'Use em conjunto com nistagmo/head tilt e demais nervos cranianos.',
    pitfalls: 'Estrabismo pode ser intermitente/posicional. Quando aparece: Normalidade ou vestibular sem estrabismo.',
  },
  {
    id: 'sec4-sensfacial-normal',
    title: 'Sensibilidade facial (V): Normal',
    whatItAssesses: 'Resposta apropriada ao toque/pinçamento leve na face, com reação simétrica.',
    neuroanatomy:
      'O nervo trigêmeo (V) conduz sensibilidade facial e tem núcleos no tronco encefálico. A via aferente integra-se a respostas motoras e percepção consciente.',
    howToPerform:
      'Toque suavemente regiões inervadas pelo trigêmeo (V) — focinho, face lateral, vibrissas — e observe retração/evitação. Seja delicado para não induzir aversão.',
    interpretation: 'Normalidade reduz suspeita de lesão do V/tronco, mas não exclui lesões centrais pequenas.',
    pitfalls: 'Animais agressivos podem reagir por comportamento. Avalie simetria e consistência. Quando aparece: Normalidade.',
  },
  {
    id: 'sec4-sensfacial-diminuido',
    title: 'Sensibilidade facial (V): Diminuído',
    whatItAssesses: 'Resposta reduzida ao toque/dor leve na face.',
    neuroanatomy: 'Sugere disfunção do V (periférica) ou dos núcleos/feixes no tronco encefálico.',
    howToPerform: 'Compare lados com estímulo igual. Observe se há assimetria e associe a outros déficits de NC.',
    interpretation:
      'Déficit facial sensitivo + outros déficits de NC e mentação alterada aumenta suspeita de tronco encefálico. Se isolado, pode ser neuropatia periférica do V.',
    pitfalls:
      'Dor severa pode levar o paciente a evitar contato, confundindo avaliação. Use estímulos padronizados e delicados. Quando aparece: Lesões de tronco, neuropatias cranianas, neoplasias de base de crânio.',
  },
  {
    id: 'sec4-sensfacial-ausente',
    title: 'Sensibilidade facial (V): Ausente',
    whatItAssesses: 'Ausência de resposta ao estímulo sensitivo na face (com técnica adequada).',
    neuroanatomy: 'Indica disfunção importante do trigêmeo ou tronco encefálico.',
    howToPerform: 'Confirme com estímulo leve e moderado, evitando lesão. Compare lados. Correlacione com outros NC e mentação.',
    interpretation:
      'Déficit grave sugere lesão significativa e frequentemente acompanha outros sinais de tronco. Priorize investigação central quando houver mentação alterada.',
    pitfalls:
      'Sedação e estupor/coma reduzem responsividade global. Não interpretar isoladamente. Quando aparece: Lesões de tronco extensas, neuropatia trigeminal severa, massas de base craniana.',
  },
  {
    id: 'sec4-degluticao-normal',
    title: 'Reflexo de deglutição (IX/X): Normal',
    whatItAssesses:
      'Deglutição eficaz sem engasgos e resposta apropriada ao estímulo orofaríngeo (quando avaliado de forma segura).',
    neuroanatomy:
      'Nervos IX (glossofaríngeo) e X (vago) coordenam parte do reflexo de deglutição; núcleos localizam-se no tronco encefálico. Disfunção pode indicar lesão bulbar.',
    howToPerform:
      'Observe ingestão de água/alimento (se permitido). Inspecione sinais de tosse/engasgo. Evite estímulos invasivos em pacientes de alto risco. Se houver suspeita, priorize avaliação funcional e segurança.',
    interpretation:
      'Normalidade reduz suspeita de lesão bulbar/tronco. Se houver alteração de mentação e outros déficits de NC, ainda pode haver risco.',
    pitfalls:
      'Sedação, dor oral e doenças laríngeas podem confundir. Avalie risco de aspiração antes de testar agressivamente. Quando aparece: Normalidade.',
  },
  {
    id: 'sec4-degluticao-diminuido',
    title: 'Reflexo de deglutição (IX/X): Diminuído',
    whatItAssesses: 'Disfagia, engasgos, deglutição fraca ou atrasada; risco aumentado de aspiração.',
    neuroanatomy:
      'Sugere disfunção bulbar (tronco encefálico) envolvendo IX/X, ou doença neuromuscular que comprometa musculatura faríngea/laríngea.',
    howToPerform:
      'Priorize segurança: observe deglutição espontânea e sinais de tosse/engasgo. Se necessário, encaminhe para avaliação de deglutição/laringe. Não force água em pacientes com suspeita.',
    interpretation:
      'Déficit de deglutição + mentação alterada e outros déficits de NC é altamente sugestivo de tronco encefálico. Mesmo isolado, é red flag respiratória por aspiração.',
    pitfalls:
      'Dor oral/lesões dentárias e doença laríngea podem causar disfagia sem lesão neurológica central. Sempre correlacionar com exame da cavidade oral e vias aéreas. Quando aparece: Lesões de tronco, polineuropatias, miastenia gravis, botulismo, massas faríngeas.',
  },
  {
    id: 'sec4-degluticao-ausente',
    title: 'Reflexo de deglutição (IX/X): Ausente',
    whatItAssesses: 'Incapacidade de deglutir, com risco extremo de aspiração e comprometimento de via aérea.',
    neuroanatomy: 'Indica disfunção grave bulbar (tronco encefálico) ou falência neuromuscular severa.',
    howToPerform:
      'Não ofertar líquidos/alimento. Avaliar necessidade de proteção de via aérea e suporte. Encaminhar para emergência/UTI se necessário.',
    interpretation:
      'Red flag máximo. Priorize estabilização e investigação urgente. Na neurolocalização, pesa fortemente para tronco encefálico/bulbo ou doença neuromuscular difusa grave.',
    pitfalls:
      'Sedação profunda pode abolir reflexos. Reavalie se há histórico de fármacos e nível de consciência. Quando aparece: Lesões bulbares extensas, botulismo grave, miastenia grave, trauma craniano/herniação.',
  },
]
