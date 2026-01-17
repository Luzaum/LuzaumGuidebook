import type { HelpTopic } from '../../types/helpTopics'

export const section1Mentacao: HelpTopic[] = [
  {
    id: 'sec1-mentacao-alerta',
    title: 'Mentação: Alerta',
    whatItAssesses:
      'Estado de consciência e responsividade preservados: o paciente interage adequadamente com o ambiente, acompanha estímulos e responde de forma apropriada.',
    neuroanatomy:
      'A mentação depende principalmente do sistema reticular ativador ascendente (SRAA) no tronco encefálico e de conexões talamocorticais. Lesões no tronco encefálico (SRAA) e/ou disfunções metabólicas difusas reduzem mentação; lesões focais em prosencéfalo alteram comportamento e consciência de forma variável.',
    howToPerform:
      'Observe o paciente antes de manipular: postura, atenção ao ambiente, resposta ao seu chamado/voz, exploração olfativa/visual, interação social. Em seguida, aplique estímulos leves (palma, ruído moderado) e avalie orientação e resposta.',
    interpretation:
      'Mentação normal reduz (não exclui) lesões centrais graves do tronco encefálico. Em síndromes vestibulares periféricas, a mentação tende a permanecer normal. Se houver sinais neurológicos relevantes com mentação intacta, procure pistas de lesão focal (ex.: déficits posturais/NC) ou periférica.',
    pitfalls:
      'Sedação, dor intensa, hipotermia, hipoglicemia, choque e hipoxemia podem simular alteração de mentação. Avalie sempre sinais vitais e contexto clínico antes de concluir neurolocalização. Quando aparece: Condição normal ou quadros neurológicos periféricos (ex.: vestibular periférico), e muitas lesões medulares puras sem acometimento encefálico.',
  },
  {
    id: 'sec1-mentacao-deprimido',
    title: 'Mentação: Deprimido',
    whatItAssesses:
      'Redução do nível de alerta: o paciente responde a estímulos, mas com lentidão, menor interesse e menor interação. Ainda é despertável com facilidade.',
    neuroanatomy:
      'Pode ocorrer por disfunção difusa encefálica (metabólica/tóxica), envolvimento do SRAA (tronco encefálico) ou aumento de pressão intracraniana. Lesões prosencefálicas também podem reduzir responsividade, especialmente se extensas ou bilaterais.',
    howToPerform:
      'Compare a resposta a estímulos auditivos (voz/palmas), visuais (movimento) e táteis (toque). Note latência de resposta, atenção sustentada e capacidade de orientar-se.',
    interpretation:
      'Se depressão vem acompanhada de déficits de nervos cranianos (ex.: PLR alterado, deglutição diminuída) ou sinais vestibulares centrais, aumente peso para tronco encefálico. Se depressão + déficits posturais contralaterais sem múltiplos NC, favorece prosencéfalo.',
    pitfalls:
      'Dor, febre, desidratação e sedativos/analgésicos podem reduzir interação. Diferencie de "quieto por medo" observando se há orientação e respostas consistentes. Quando aparece: Encefalopatias metabólicas (hepática/urêmica/hipoglicemia), encefalites/meningoencefalites, AVC, trauma craniano, hipertensão intracraniana.',
  },
  {
    id: 'sec1-mentacao-estupor',
    title: 'Mentação: Estupor',
    whatItAssesses:
      'Estado de consciência severamente reduzido: o paciente só responde a estímulos intensos (dor) e tende a retornar rapidamente ao estado não responsivo.',
    neuroanatomy:
      'Indica disfunção importante do SRAA no tronco encefálico e/ou disfunção cerebral difusa grave (metabólica, tóxica, edema difuso, hipertensão intracraniana).',
    howToPerform:
      'Aplique estímulos graduais: voz alta, palmas, toque firme e, por fim, estímulo nociceptivo apropriado (ex.: pressão digital em dígitos). Observe abertura ocular, vocalização, retirada e resposta dirigida.',
    interpretation:
      'É um red flag. Priorize estabilização e triagem metabólica (glicemia, eletrólitos, gasometria/oxigenação, PA) antes de assumir lesão focal. Se houver sinais focais concomitantes (anisocoria, déficits de NC), pense em herniação/lesão de tronco.',
    pitfalls:
      'Pós-ictal pode simular estupor. Diferencie por história de crise recente e melhora progressiva em horas. Sedação profunda/anestésicos também confundem. Quando aparece: Trauma cranioencefálico grave, intoxicações, encefalites graves, edema cerebral difuso, crises prolongadas (pós-ictal profundo), hipoglicemia severa.',
  },
  {
    id: 'sec1-mentacao-coma',
    title: 'Mentação: Coma',
    whatItAssesses:
      'Inconsciência: ausência de resposta a estímulos, inclusive nociceptivos, exceto reflexos espinhais automáticos.',
    neuroanatomy:
      'Coma resulta de disfunção grave do SRAA (tronco encefálico) ou disfunção encefálica difusa bilateral (prosencéfalo) por causas metabólicas/tóxicas ou aumento crítico de pressão intracraniana.',
    howToPerform:
      'Confirme ausência de resposta dirigida à dor (não confundir com reflexos). Avalie sinais vitais, padrão respiratório, reflexos de tronco (PLR, movimentos oculares, reflexo corneano se você incluir futuramente) e postura (decerebração/descerebelação).',
    interpretation:
      'Red flag máximo. A prioridade é ABC, glicemia imediata, oxigenação, PA e suspeita de hipertensão intracraniana. Neurolocalização pode ser impossível sem dados adicionais.',
    pitfalls:
      'Anestesia/sedação profunda e hipotermia podem mimetizar coma. Sempre correlacione com histórico medicamentoso e temperatura. Quando aparece: Intoxicações severas, hipoglicemia extrema, edema cerebral, herniação, hemorragia intracraniana, encefalites fulminantes.',
  },
  {
    id: 'sec1-comportamento-normal',
    title: 'Comportamento: Normal',
    whatItAssesses:
      'Interação, orientação, reatividade e padrão de resposta compatíveis com o esperado para espécie/indivíduo no ambiente clínico.',
    neuroanatomy:
      'O comportamento é modulado por circuitos corticais (prosencéfalo), sistema límbico e conexões talâmicas. Alterações focais podem causar mudanças sutis mesmo com mentação preservada.',
    howToPerform:
      'Observe espontaneamente e durante manipulação leve: busca por tutor, resposta a comandos, exploração e postura. Compare com relato do tutor.',
    interpretation: 'Comportamento normal reduz probabilidade de prosencéfalo difusamente acometido, mas não exclui lesões focais pequenas.',
    pitfalls:
      'Ansiedade e ambiente hospitalar alteram comportamento sem lesão neurológica. Utilize o "baseline" do tutor. Quando aparece: Normalidade ou doença neurológica restrita a medula/periférico.',
  },
  {
    id: 'sec1-comportamento-desorientado',
    title: 'Comportamento: Desorientado',
    whatItAssesses:
      'Dificuldade de reconhecer ambiente/estímulos; pode haver andar em círculos, ficar preso em cantos, resposta inadequada a comandos e alteração de interação.',
    neuroanatomy:
      'Sugere disfunção cortical/subcortical do prosencéfalo (integração sensorial, consciência do ambiente). Também pode ocorrer em encefalopatias metabólicas difusas.',
    howToPerform:
      'Observe marcha espontânea no consultório, resposta ao tutor, orientação espacial (evitar obstáculos) e resposta a estímulos auditivos/visuais.',
    interpretation:
      'Desorientação com déficits posturais contralaterais aumenta suspeita de lesão prosencefálica focal. Desorientação com sinais sistêmicos e sem lateralização forte pode ser metabólico/tóxico.',
    pitfalls:
      'Déficit visual pode simular desorientação. Correlacione com testes de visão/ameaça e PLR. Quando aparece: Prosencéfalo (tumor, AVC, encefalite), encefalopatias metabólicas (hepática/urêmica), pós-ictal.',
  },
  {
    id: 'sec1-comportamento-agressivo',
    title: 'Comportamento: Agressivo',
    whatItAssesses:
      'Resposta agressiva desproporcional ao estímulo/ambiente, podendo representar dor, medo ou disfunção encefálica (desinibição).',
    neuroanatomy:
      'Agressividade por disfunção neurológica pode ocorrer por envolvimento do sistema límbico e áreas frontotemporais (prosencéfalo), alterando limiar de resposta e inibição.',
    howToPerform:
      'Avalie contexto (dor, manipulação), gatilhos e se há mudança recente relatada pelo tutor. Garanta contenção segura e considere analgesia/sedação quando necessário.',
    interpretation:
      'Se agressividade é nova e acompanhada de outros sinais centrais (convulsões, desorientação, déficits posturais), aumenta suspeita de prosencéfalo. Se associada a dor espinhal/otite, pode ser reatividade por dor.',
    pitfalls:
      'Muitos animais são agressivos por medo/ansiedade. Não neurolocalize apenas por agressividade sem outros achados. Quando aparece: Dor intensa, encefalopatias, tumores/encefalites, pós-ictal.',
  },
  {
    id: 'sec1-comportamento-vocalizacao',
    title: 'Comportamento: Vocalização',
    whatItAssesses:
      'Vocalização anormal (gemido/latido/miado) sem estímulo claro, podendo indicar dor, disforia ou alteração encefálica.',
    neuroanatomy:
      'Vocalização pode ser expressão de dor (nocicepção), disforia por encefalopatia ou alterações do prosencéfalo (comportamento).',
    howToPerform:
      'Avalie se ocorre ao manipular coluna, cabeça, orelhas ou abdômen. Observe se cessa com analgesia/sedação e associe a postura corporal.',
    interpretation:
      'Vocalização com dor espinhal localizável reforça coluna/medula. Vocalização + desorientação/alteração de mentação pode sugerir encefalopatia.',
    pitfalls:
      'Ansiedade e ambiente hospitalar podem aumentar vocalização. Sempre correlacione com dor e sinais vitais. Quando aparece: Dor discal/trauma, meningite, otite interna, encefalopatias.',
  },
  {
    id: 'sec1-cabeca-normal',
    title: 'Postura da cabeça: Normal',
    whatItAssesses: 'Cabeça alinhada ao tronco, sem inclinação, hiperextensão ou flexão persistente.',
    neuroanatomy:
      'A postura da cabeça depende de controle vestibular, cerebelar e vias motoras cervicais. Normalidade sugere ausência de síndrome vestibular evidente naquele momento.',
    howToPerform: 'Observe em repouso e durante marcha. Compare com posição habitual relatada pelo tutor.',
    interpretation:
      'Não exclui vestibular episódico ou discreto. Se há nistagmo/ataxia vestibular sem head tilt, ainda pode haver vestibular.',
    pitfalls:
      'Dor cervical pode levar a postura antálgica discreta. Avalie palpação cervical. Quando aparece: Normalidade ou síndromes não vestibulares.',
  },
  {
    id: 'sec1-cabeca-headtilt',
    title: 'Postura da cabeça: Head tilt (inclinação)',
    whatItAssesses:
      'Inclinação lateral da cabeça, tipicamente associada à síndrome vestibular (central ou periférica).',
    neuroanatomy:
      'O sistema vestibular (orelha interna, nervo VIII, núcleos vestibulares no tronco encefálico e conexões cerebelares) mantém equilíbrio e posição da cabeça. Head tilt ocorre por assimetria vestibular.',
    howToPerform:
      'Observe cabeça em repouso e na marcha. Note direção do tilt e se há queda para um lado, nistagmo ou estrabismo concomitantes.',
    interpretation:
      'Head tilt + mentação normal favorece vestibular periférico. Head tilt + mentação alterada e/ou déficits posturais importantes favorece vestibular central (tronco/cerebelo).',
    pitfalls:
      'Dor cervical pode simular inclinação. Diferencie por presença de nistagmo/ataxia vestibular e pela resposta à palpação cervical. Quando aparece: Otite média/interna, vestibular idiopático, lesões de tronco encefálico, cerebelo.',
  },
  {
    id: 'sec1-cabeca-opistotono',
    title: 'Postura da cabeça: Opistótono',
    whatItAssesses:
      'Hiperextensão rígida de cabeça/pescoço e, por vezes, extensão do tronco. É um sinal neurológico grave.',
    neuroanatomy:
      'Pode refletir lesões do tronco encefálico/cerebelo (desinibição/extensão postural) ou estados de hipertensão intracraniana. Posturas anormais (decerebração/descerebelação) são marcadores de acometimento central importante.',
    howToPerform:
      'Observe postura em repouso. Diferencie de extensão por dor. Verifique mentação, padrão respiratório e outros sinais de tronco.',
    interpretation:
      'É red flag. Aumenta peso para lesão central grave e necessidade de estabilização e imagem urgente quando possível.',
    pitfalls:
      'Rigidez por dor/espasmo pode confundir; porém opistótono costuma vir com outros sinais centrais e alteração de mentação. Quando aparece: Trauma craniano grave, encefalites severas, herniação, lesões cerebelares/tronco.',
  },
  {
    id: 'sec1-cabeca-cabecabaixa',
    title: 'Postura da cabeça: Cabeça baixa',
    whatItAssesses:
      'Flexão sustentada do pescoço ou manter a cabeça abaixo do nível habitual, podendo indicar dor cervical, fraqueza cervical ou letargia.',
    neuroanatomy:
      'Dor cervical pode advir de meningite/meningoencefalite, doença discal cervical ou lesões musculoesqueléticas. Fraqueza cervical pode ocorrer em doenças neuromusculares.',
    howToPerform:
      'Observe em repouso e ao caminhar. Palpe suavemente musculatura e coluna cervical. Verifique se o animal evita extensão/flexão.',
    interpretation:
      'Se associada a dor cervical à palpação e rigidez, aumenta suspeita de doença cervical/meníngea. Se sem dor e com fraqueza generalizada, considere neuromuscular/metabólico.',
    pitfalls:
      'Postura antálgica por otite ou dor torácica pode alterar posição da cabeça. Correlacione com exame geral. Quando aparece: Doença discal cervical, meningite, dor muscular cervical, fraqueza neuromuscular.',
  },
]
