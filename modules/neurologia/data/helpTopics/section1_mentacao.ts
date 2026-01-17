import type { HelpTopic } from '../../types/helpTopics'

export const section1Mentacao: HelpTopic[] = [
  {
    id: 'help_s1_consciencia_alerta',
    title: 'Nível de Consciência: Alerta',
    whatItAssesses: 'Avalia estado de vigília e responsividade apropriada ao ambiente (SRAA e córtex).',
    neuroanatomy:
      'A vigília depende do Sistema Reticular Ativador Ascendente (SRAA) no tronco encefálico e de conexões tálamo-corticais. Alterações podem indicar lesão difusa prosencefálica, tronco encefálico (SRAA) ou causas metabólicas/toxicas sistêmicas.',
    howToPerform:
      'Observar postura espontânea, interação, resposta a estímulos auditivos/visuais/táteis. Confirmar se o animal mantém atenção, acompanha o examinador e reage de forma apropriada.',
    interpretation:
      'Alerta sugere SRAA e córtex funcionalmente preservados. Se houver déficits focais (posturais/NC) com alerta, reforça lesão focal e não encefalopatia difusa.',
    pitfalls:
      'Dor, medo, sedação, hipoglicemia e hipóxia podem modular responsividade sem lesão neurológica estrutural. Interpretar junto do histórico e sinais vitais.',
    imageSlot: { enabled: true, caption: 'Foto/vídeo exemplo de responsividade normal.' },
  },
  {
    id: 'help_s1_consciencia_deprimido',
    title: 'Nível de Consciência: Deprimido',
    whatItAssesses:
      'Redução leve/moderada de atenção e interação (encefalopatia leve, dor, sedação ou doença sistêmica).',
    neuroanatomy:
      'Pode ocorrer por disfunção prosencefálica difusa (córtex/tálamo), alterações metabólicas/toxicas (hipoglicemia, disionias, hepato/uremia), inflamação sistêmica, ou efeitos farmacológicos.',
    howToPerform:
      'Comparar com baseline do tutor. Avaliar se responde prontamente a chamado, toque e estímulos; verificar se mantém deambulação e postura espontânea.',
    interpretation:
      'Depressão com déficits neurológicos focais favorece lesão intracraniana. Depressão sem lateralização e com sinais sistêmicos favorece encefalopatia metabólica/tóxica.',
    pitfalls:
      'Sedativos/analgésicos, pós-ictal, hipertermia/hipotermia, dor e dispneia podem mimetizar depressão.',
    imageSlot: { enabled: true, caption: 'Exemplo de resposta lenta ao chamado.' },
  },
  {
    id: 'help_s1_consciencia_estupor',
    title: 'Nível de Consciência: Estupor',
    whatItAssesses: 'Responsividade apenas a estímulos intensos; estado crítico neurológico.',
    neuroanatomy:
      'Sugere comprometimento significativo do SRAA no tronco encefálico e/ou disfunção prosencefálica difusa grave. Pode ocorrer em edema cerebral, hemorragia, herniação, intoxicações graves, encefalites, status epilepticus pós-ictal profundo.',
    howToPerform:
      'Avaliar resposta a estímulo auditivo alto, pressão digital firme, estímulo nociceptivo apropriado. Monitorar via ABC (via aérea, ventilação, perfusão).',
    interpretation:
      'Estupor é red flag. Se associado a alterações pupilares/respiratórias → suspeitar tronco encefálico/herniação e priorizar estabilização e neuroimagem.',
    pitfalls: 'Não confundir com sedação profunda iatrogênica; checar medicações recentes e parâmetros vitais.',
    imageSlot: { enabled: true, caption: 'Fluxo de avaliação em paciente estuporoso.' },
  },
  {
    id: 'help_s1_consciencia_coma',
    title: 'Nível de Consciência: Coma',
    whatItAssesses: 'Ausência de resposta consciente; emergência neurológica imediata.',
    neuroanatomy:
      'Geralmente envolve disfunção grave do tronco encefálico (SRAA) e/ou prosencéfalo bilateral/difuso. Pode ocorrer em hemorragias extensas, edema severo, intoxicações, encefalites graves, distúrbios metabólicos profundos.',
    howToPerform:
      'Avaliar reflexos de tronco (PLR, reflexos oculocefálicos se aplicável), padrão respiratório, sinais de herniação. Priorizar suporte ventilatório/perfusão antes de testes prolongados.',
    interpretation:
      'Coma + alterações pupilares assimétricas/respiração irregular → suspeitar herniação e hipertensão intracraniana. Exigir plano diagnóstico emergencial.',
    pitfalls:
      'Paralisia/curarização e sedação extrema podem mascarar resposta motora; avaliar reflexos e contexto farmacológico.',
    imageSlot: { enabled: true, caption: 'Checklist de coma e sinais de herniação.' },
  },
  {
    id: 'help_s1_comportamento_desorientado',
    title: 'Comportamento: Desorientado',
    whatItAssesses: 'Integração cortical e percepção ambiental (prosencéfalo).',
    neuroanatomy:
      'Desorientação é típica de disfunção prosencefálica (córtex/tálamo), mas também pode ocorrer em encefalopatias metabólicas/tóxicas difusas.',
    howToPerform:
      'Observar interação com ambiente (paredes, cantos), resposta a comandos simples, reconhecimento do tutor, padrão de exploração.',
    interpretation:
      'Desorientação + déficits posturais contralaterais reforça lesão prosencefálica focal. Desorientação sem lateralização reforça causa difusa/metabólica.',
    pitfalls: 'Déficit visual, dor, ansiedade, ambiente estressante e senilidade podem confundir.',
  },
  {
    id: 'help_s1_comportamento_agressivo',
    title: 'Comportamento: Agressivo',
    whatItAssesses: 'Mudança comportamental/controle inibitório (córtex frontal e sistema límbico).',
    neuroanatomy:
      'Lesões prosencefálicas (especialmente frontal/temporal) podem alterar limiar reativo e respostas límbicas; também pode ser dor, medo ou disfunção sistêmica.',
    howToPerform:
      'Priorizar segurança. Avaliar se agressividade é contextual (medo/dor) ou desproporcional/inapropriada; correlacionar com outros sinais focais.',
    interpretation:
      'Agressividade com outros sinais prosencefálicos favorece lesão intracraniana. Sem outros sinais, considerar dor/estresse.',
    pitfalls: 'Não rotular como neurológico sem excluir dor e fatores ambientais.',
  },
  {
    id: 'help_s1_comportamento_vocalizacao',
    title: 'Comportamento: Vocalização',
    whatItAssesses: 'Dor, disforia, alteração prosencefálica, síndrome vestibular, ou resposta a estímulo.',
    neuroanatomy:
      'Vocalização pode ser nociceptiva (coluna, meninges), disforia por prosencéfalo, ou estresse. Em algumas encefalopatias pode haver vocalização sem estímulo aparente.',
    howToPerform:
      'Correlacionar com palpação, postura, gatilhos, resposta a analgesia, e presença de déficits neurológicos.',
    interpretation:
      'Vocalização + dor espinhal sugere componente nociceptivo. Vocalização sem dor e com alteração de mentação pode sugerir intracraniano/encefalopatia.',
    pitfalls: 'Ansiedade e ambiente hospitalar frequentemente causam vocalização.',
  },
  {
    id: 'help_s1_postura_cabeca_headtilt',
    title: 'Postura da Cabeça: Head Tilt',
    whatItAssesses: 'Função vestibular (periférico ou central).',
    neuroanatomy:
      'Head tilt ocorre por assimetria no tônus vestibular: aparelho vestibular periférico (orelha interna/nervo VIII) ou central (núcleos vestibulares no tronco encefálico/cerebelo).',
    howToPerform:
      'Observar inclinação persistente em repouso e durante marcha. Procurar nistagmo, ataxia vestibular, estrabismo posicional.',
    interpretation:
      'Head tilt + déficits de propriocepção/paresia sugere vestibular central. Head tilt isolado com sinais de orelha pode sugerir periférico.',
    pitfalls: 'Dor cervical e alterações ortopédicas podem alterar postura da cabeça.',
  },
  {
    id: 'help_s1_postura_cabeca_opistotono',
    title: 'Postura da Cabeça: Opistótono',
    whatItAssesses: 'Postura extensora anormal (lesões graves de SNC) — emergência.',
    neuroanatomy:
      'Pode estar associado a rigidez extensora por lesões intracranianas graves, disfunções do tronco encefálico, cerebelo (descerebelar) ou hipertensão intracraniana. Diferenciar de dor/rigidez muscular.',
    howToPerform:
      'Observar extensão de pescoço e membros, nível de consciência, reflexos de tronco e padrão respiratório.',
    interpretation:
      'Opistótono + alteração de consciência sugere lesão intracraniana grave e risco de herniação; priorizar estabilização e neuroimagem.',
    pitfalls: 'Tetania/metabolismo (hipocalcemia) pode simular rigidez; correlacionar com exames e outros sinais.',
  },
  {
    id: 'help_s1_postura_cabeca_cabeca_baixa',
    title: 'Postura da Cabeça: Cabeça Baixa',
    whatItAssesses: 'Dor cervical, fraqueza, ou alteração postural/neuromuscular.',
    neuroanatomy:
      'Pode ocorrer em dor cervical (meningite, IVDD cervical), fraqueza de musculatura cervical (doença neuromuscular) ou depressão importante.',
    howToPerform:
      'Palpar coluna cervical com cuidado, avaliar amplitude de movimento, observar se há paresia, atrofia, intolerância ao movimento.',
    interpretation:
      'Cabeça baixa + dor à palpação sugere componente cervical. Cabeça baixa + fraqueza generalizada sugere neuromuscular/metabólico.',
    pitfalls: 'Ansiedade/submissão podem parecer cabeça baixa; correlacionar com dor e exame completo.',
  },
  {
    id: 'opt_conscious_alert',
    title: 'Alerta',
    whatItAssesses: 'Estado de vigília normal e responsividade apropriada.',
    neuroanatomy: 'Requere SRAA e córtex preservados.',
    howToPerform: 'Confirmar resposta a chamado e estímulos ambientais.',
    interpretation: 'Normal.',
    pitfalls: 'Dor ou medo podem alterar comportamento sem ser neurológico.',
  },
  {
    id: 'opt_conscious_depressed',
    title: 'Deprimido',
    whatItAssesses: 'Redução leve/moderada de atenção e interação.',
    neuroanatomy: 'Pode ser prosencéfalo, metabólico, ou sistêmico.',
    howToPerform: 'Comparar com baseline; avaliar resposta a estímulos.',
    interpretation: 'Requer correlação com outros achados para localizar.',
    pitfalls: 'Sedação, dor, ou doença sistêmica podem mimetizar.',
  },
  {
    id: 'opt_conscious_stupor',
    title: 'Estupor',
    whatItAssesses: 'Responsividade apenas a estímulos intensos.',
    neuroanatomy: 'SRAA ou prosencéfalo gravemente comprometidos.',
    howToPerform: 'Testar resposta a estímulo intenso; monitorar ABC.',
    interpretation: 'Red flag. Priorizar estabilização.',
    pitfalls: 'Sedação profunda iatrogênica pode mimetizar.',
  },
  {
    id: 'opt_conscious_coma',
    title: 'Coma',
    whatItAssesses: 'Ausência de resposta consciente.',
    neuroanatomy: 'Disfunção grave de tronco ou prosencéfalo bilateral.',
    howToPerform: 'Avaliar reflexos de tronco; priorizar suporte vital.',
    interpretation: 'Emergência. Suspeitar herniação se alterações pupilares.',
    pitfalls: 'Paralisia ou sedação extrema podem mascarar.',
  },
  {
    id: 'opt_behavior_normal',
    title: 'Normal',
    whatItAssesses: 'Comportamento apropriado para espécie e contexto.',
    neuroanatomy: 'Prosencéfalo funcionando normalmente.',
    howToPerform: 'Observar interação e resposta ao ambiente.',
    interpretation: 'Normal.',
    pitfalls: 'Alterações sutis podem ser perdidas sem baseline.',
  },
  {
    id: 'opt_behavior_disoriented',
    title: 'Desorientado',
    whatItAssesses: 'Déficit de integração cortical/ambiental.',
    neuroanatomy: 'Disfunção prosencefálica (córtex/tálamo).',
    howToPerform: 'Observar interação com ambiente e reconhecimento.',
    interpretation: 'Sugere lesão prosencefálica focal ou difusa.',
    pitfalls: 'Déficit visual ou ansiedade podem confundir.',
  },
  {
    id: 'opt_behavior_aggressive',
    title: 'Agressivo',
    whatItAssesses: 'Mudança comportamental/inibitória.',
    neuroanatomy: 'Pode ser prosencefálico (frontal/temporal) ou contexto.',
    howToPerform: 'Priorizar segurança; avaliar se contextual.',
    interpretation: 'Requer correlação com outros sinais neurológicos.',
    pitfalls: 'Dor e estresse podem causar agressividade sem lesão.',
  },
  {
    id: 'opt_behavior_vocalization',
    title: 'Vocalização',
    whatItAssesses: 'Dor, disforia, ou resposta a estímulo.',
    neuroanatomy: 'Pode ser nociceptiva, prosencefálica, ou estresse.',
    howToPerform: 'Correlacionar com palpação e déficits neurológicos.',
    interpretation: 'Interpretar junto de outros achados.',
    pitfalls: 'Ambiente hospitalar frequentemente causa vocalização.',
  },
  {
    id: 'opt_headposture_normal',
    title: 'Normal',
    whatItAssesses: 'Postura espontânea apropriada.',
    neuroanatomy: 'Função vestibular e cervical normais.',
    howToPerform: 'Observar postura em repouso e durante movimento.',
    interpretation: 'Normal.',
    pitfalls: 'Nenhuma.',
  },
  {
    id: 'opt_headposture_headtilt',
    title: 'Head Tilt',
    whatItAssesses: 'Função vestibular (periférico ou central).',
    neuroanatomy: 'Assimetria vestibular periférica ou central.',
    howToPerform: 'Observar inclinação persistente; procurar nistagmo.',
    interpretation: 'Sugere lesão vestibular; central se déficits posturais.',
    pitfalls: 'Dor cervical pode alterar postura sem ser vestibular.',
  },
  {
    id: 'opt_headposture_opisthotonus',
    title: 'Opistótono',
    whatItAssesses: 'Postura extensora anormal — emergência.',
    neuroanatomy: 'Lesões graves de tronco/cerebelo ou hipertensão intracraniana.',
    howToPerform: 'Observar extensão; avaliar consciência e reflexos.',
    interpretation: 'Red flag. Priorizar estabilização e neuroimagem.',
    pitfalls: 'Hipocalcemia pode simular rigidez extensora.',
  },
  {
    id: 'opt_headposture_headlow',
    title: 'Cabeça Baixa',
    whatItAssesses: 'Dor cervical, fraqueza, ou alteração postural.',
    neuroanatomy: 'Dor cervical, doença neuromuscular, ou depressão.',
    howToPerform: 'Palpar cervical; avaliar amplitude de movimento.',
    interpretation: 'Correlacionar com palpação e déficits neurológicos.',
    pitfalls: 'Ansiedade/submissão podem parecer cabeça baixa.',
  },
]
