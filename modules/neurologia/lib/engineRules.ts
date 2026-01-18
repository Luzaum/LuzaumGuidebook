export const EXAM_TO_TOPIC_MAP: Record<string, Record<string, string>> = {
    // SEÇÃO 1: MENTAÇÃO
    mentation: {
        Alerta: 's1-nivel-consciencia-alerta',
        Deprimido: 's1-nivel-consciencia-deprimido',
        Estupor: 's1-nivel-consciencia-estupor',
        Coma: 's1-nivel-consciencia-coma',
    },
    behavior: {
        Normal: 's1-comportamento-normal',
        Desorientado: 's1-comportamento-desorientado',
        Agressivo: 's1-comportamento-agressivo',
        Vocalização: 's1-comportamento-vocalizacao',
    },
    head_posture: {
        Normal: 's1-postura-cabeca-normal',
        'Head Tilt': 's1-postura-cabeca-headtilt',
        Opistótono: 's1-postura-cabeca-opistotono',
        'Cabeça Baixa': 's1-postura-cabeca-cabeca-baixa',
    },

    // SEÇÃO 2: MARCHA
    ambulation: {
        Ambulatório: 's2-capacidade-ambulatorio',
        'Com Apoio': 's2-capacidade-com-apoio',
        'Não Ambulatório': 's2-capacidade-nao-ambulatorio',
        Plegia: 's2-capacidade-plegia',
    },
    gait_thoracic: {
        Normal: 's2-membros-toracicos-normal',
        Ataxia: 's2-membros-toracicos-ataxia',
        Paresia: 's2-membros-toracicos-paresia',
        Plegia: 's2-membros-toracicos-plegia',
    },
    gait_pelvic: {
        Normal: 's2-membros-pelvicos-normal',
        Ataxia: 's2-membros-pelvicos-ataxia',
        Paresia: 's2-membros-pelvicos-paresia',
        Plegia: 's2-membros-pelvicos-plegia',
    },
    ataxia_type: {
        Ausente: 's2-tipo-ataxia-ausente',
        Proprioceptiva: 's2-tipo-ataxia-proprioceptiva',
        Vestibular: 's2-tipo-ataxia-vestibular',
        Cerebelar: 's2-tipo-ataxia-cerebelar',
    },

    // SEÇÃO 3: PROPRIOCEPÇÃO
    // Note: Values typically Normal, Diminuído, Ausente.
    // The Data IDs are for the *concept* of the member deficit.
    // Logic: any abnormal value triggers the topic.
    proprioception_thoracic_left: {
        Diminuído: 's3-toracico-esquerdo',
        Ausente: 's3-toracico-esquerdo',
    },
    proprioception_thoracic_right: {
        Diminuído: 's3-toracico-direito',
        Ausente: 's3-toracico-direito',
    },
    proprioception_pelvic_left: {
        Diminuído: 's3-pelvico-esquerdo',
        Ausente: 's3-pelvico-esquerdo',
    },
    proprioception_pelvic_right: {
        Diminuído: 's3-pelvico-direito',
        Ausente: 's3-pelvico-direito',
    },

    // SEÇÃO 4: NERVOS CRANIANOS
    menace_left: {
        Ausente: 's4-ameaca-olho-esquerdo',
    },
    menace_right: {
        Ausente: 's4-ameaca-olho-direito',
    },
    plr_left: {
        Lento: 's4-plr-olho-esquerdo',
        Ausente: 's4-plr-olho-esquerdo',
    },
    plr_right: {
        Lento: 's4-plr-olho-direito',
        Ausente: 's4-plr-olho-direito',
    },
    nystagmus: {
        Presente: 's4-nistagmo-oquee',
    },
    strabismus: {
        Presente: 's4-estrabismo-oquee',
    },
    cn_facial_sensation: {
        Diminuído: 's4-sensibilidade-facial-v',
        Ausente: 's4-sensibilidade-facial-v',
    },
    cn_swallowing: {
        Diminuído: 's4-degluticao-ix-x',
        Ausente: 's4-degluticao-ix-x',
    },

    // SEÇÃO 5: REFLEXOS
    reflex_patellar_left: {
        Normal: 's5-patelar-esq-normal',
        Aumentado: 's5-patelar-esq-aumentado',
        Diminuído: 's5-patelar-esq-diminuido',
        Ausente: 's5-patelar-esq-ausente',
    },
    reflex_patellar_right: {
        Normal: 's5-patelar-dir-normal',
        Aumentado: 's5-patelar-dir-aumentado',
        Diminuído: 's5-patelar-dir-diminuido',
        Ausente: 's5-patelar-dir-ausente',
    },
    reflex_withdrawal_left_thoracic: {
        Normal: 's5-retirada-toracico-esq-normal',
        Aumentado: 's5-retirada-toracico-esq-aumentado',
        Diminuído: 's5-retirada-toracico-esq-diminuido',
        Ausente: 's5-retirada-toracico-esq-ausente',
    },
    reflex_withdrawal_right_thoracic: {
        Normal: 's5-retirada-toracico-dir-normal',
        Aumentado: 's5-retirada-toracico-dir-aumentado',
        Diminuído: 's5-retirada-toracico-dir-diminuido',
        Ausente: 's5-retirada-toracico-dir-ausente',
    },
    reflex_panniculus: {
        Normal: 's5-panniculus-normal',
        Cutoff: 's5-panniculus-cutoff',
        Ausente: 's5-panniculus-ausente',
    },

    // SEÇÃO 6: DOR
    deep_pain: {
        Presente: 's6-dor-profunda-presente',
        Ausente: 's6-dor-profunda-ausente',
        Duvidoso: 's6-dor-profunda-duvidoso',
    },
    pain_cervical: {
        Ausente: 's6-dor-coluna-cervical-ausente',
        Leve: 's6-dor-coluna-cervical-leve',
        Moderada: 's6-dor-coluna-cervical-moderada',
        Severa: 's6-dor-coluna-cervical-severa',
    },
    pain_thoracolumbar: {
        Ausente: 's6-dor-coluna-toracolombar-ausente',
        Leve: 's6-dor-coluna-toracolombar-leve',
        Moderada: 's6-dor-coluna-toracolombar-moderada',
        Severa: 's6-dor-coluna-toracolombar-severa',
    },
    pain_lumbosacral: {
        Ausente: 's6-dor-coluna-lombossacra-ausente',
        Leve: 's6-dor-coluna-lombossacra-leve',
        Moderada: 's6-dor-coluna-lombossacra-moderada',
        Severa: 's6-dor-coluna-lombossacra-severa',
    },
}
