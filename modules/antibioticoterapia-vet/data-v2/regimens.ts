import type { AntibioticRegimen } from '../model/types'

export const ANTIBIOTIC_REGIMENS: Record<string, AntibioticRegimen> = {
  reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole: {
    id: 'reg_piometra_iv_beta_lactam_aminoglycoside_metronidazole',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_gentamicin', 'mol_metronidazole'],
    label: 'Esquema empírico hospitalar (ex.: beta-lactâmico IV + aminoglicosídeo + anaeróbio)',
    route: 'parenteral',
    settingNote: 'Uso típico em internação; ajuste conforme estabilidade, função renal e cultura.',
    dosingNotes: {
      dog: 'Ajuste de aminoglicosídeo obrigatório com função renal; monitorização.',
      cat: 'Ajuste de aminoglicosídeo obrigatório com função renal; cautela felina.',
    },
    referenceKey: 'ref_placeholders.v2_piometra_inpatient',
  },
  reg_piometra_iv_clinda_enro: {
    id: 'reg_piometra_iv_clinda_enro',
    moleculeIds: ['mol_clindamycin', 'mol_enrofloxacin'],
    label: 'Alternativa empírica (ex.: clindamicina + fluoroquinolona) — conforme protocolo institucional',
    route: 'parenteral',
    settingNote: 'Reservar para cenários sem aminoglicosídeo ou conforme sensibilidade esperada.',
    referenceKey: 'ref_placeholders.v2_piometra_alt',
  },
  reg_piometra_oral_amox_clav_metronidazole: {
    id: 'reg_piometra_oral_amox_clav_metronidazole',
    moleculeIds: ['mol_amoxicillin_clavulanate', 'mol_metronidazole'],
    label: 'VO pós-estabilização / transição (não substitui estabilização se instável)',
    route: 'oral',
    settingNote: 'Ambulatorial só se equipe definir estabilidade; piometra costuma exigir internação.',
    referenceKey: 'ref_placeholders.v2_piometra_transition',
  },
  reg_cistite_simples_amox_clav: {
    id: 'reg_cistite_simples_amox_clav',
    moleculeIds: ['mol_amoxicillin_clavulanate'],
    label: 'Primeira linha típica (ITU inferior não complicada) — aminopenicilina + inibidor',
    route: 'oral',
    dosingNotes: {
      dog: 'Preferir espectro adequado à uropatia comum; revisar com cultura.',
      cat: 'ITU felina: interpretação de urocultura pode ser desafiadora; ver notas.',
    },
    referenceKey: 'ref_placeholders.v2_uti_simple',
  },
  reg_cistite_fq_alt: {
    id: 'reg_cistite_fq_alt',
    moleculeIds: ['mol_marbo'],
    label: 'Alternativa (fluoroquinolona) — stewardship: reservar quando indicado',
    route: 'oral',
    settingNote: 'Não primeira escolha de stewardship para ITU simples sem indicação específica.',
    referenceKey: 'ref_placeholders.v2_uti_fq',
  },
  reg_cistite_complicated_iv: {
    id: 'reg_cistite_complicated_iv',
    moleculeIds: ['mol_ampicillin_sulbactam'],
    label: 'Cenário complicado / internado — beta-lactâmico IV até definição',
    route: 'parenteral',
    settingNote: 'Pielonefrite / sepse / obstrução: internação e cultura guiam descalonamento.',
    referenceKey: 'ref_placeholders.v2_uti_complicated',
  },
  reg_pneumo_outpatient_doxy: {
    id: 'reg_pneumo_outpatient_doxy',
    moleculeIds: ['mol_doxycycline'],
    label: 'Ambulatorial estável (ex.: doxiciclina) — conforme suspeita de patógenos típicos',
    route: 'oral',
    referenceKey: 'ref_placeholders.v2_pneumo_out',
  },
  reg_pneumo_outpatient_amox_clav: {
    id: 'reg_pneumo_outpatient_amox_clav',
    moleculeIds: ['mol_amoxicillin_clavulanate'],
    label: 'Alternativa ambulatorial (amoxicilina + clavulanato)',
    route: 'oral',
    referenceKey: 'ref_placeholders.v2_pneumo_out',
  },
  reg_pneumo_inpatient_iv_beta_lactam: {
    id: 'reg_pneumo_inpatient_iv_beta_lactam',
    moleculeIds: ['mol_ampicillin_sulbactam'],
    label: 'Internado — beta-lactâmico IV empírico até cultura / estabilização',
    route: 'parenteral',
    referenceKey: 'ref_placeholders.v2_pneumo_in',
  },
  reg_pneumo_septic_combo: {
    id: 'reg_pneumo_septic_combo',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_enrofloxacin'],
    label: 'Grave / séptico — ampliação empírica (ex.: beta-lactâmico + fluoroquinolona) conforme protocolo',
    route: 'parenteral',
    settingNote: 'Sepse: amostras antes de ATB quando possível; suporte e reavaliação precoce.',
    referenceKey: 'ref_placeholders.v2_pneumo_septic',
  },

  reg_pyelo_iv_amp_sulb_enro: {
    id: 'reg_pyelo_iv_amp_sulb_enro',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_enrofloxacin'],
    label: 'Pielonefrite grave / internado — esquema IV amplo até cultura (ex.: beta-lactâmico + fluoroquinolona conforme protocolo)',
    route: 'parenteral',
    settingNote: 'Ajustar por função renal; hemocultura e urinocultura guiam descalonamento.',
    referenceKey: 'ref_placeholders.v2_pyelo',
  },

  reg_pyothorax_iv_amp_sulb_metronidazole: {
    id: 'reg_pyothorax_iv_amp_sulb_metronidazole',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_metronidazole'],
    label: 'Piotórax — drenagem + empírico IV (anaeróbios e flora mista) até cultura do líquido pleural',
    route: 'parenteral',
    settingNote: 'Drenagem efetiva é central; ATB adjuvante conforme sensibilidade.',
    referenceKey: 'ref_placeholders.v2_pyothorax',
  },

  reg_sepsis_iv_broad_gn_anaerobe: {
    id: 'reg_sepsis_iv_broad_gn_anaerobe',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_metronidazole', 'mol_enrofloxacin'],
    label: 'Sepse (foco não definido inicialmente) — IV amplo (beta-lactâmico + anaeróbio + opção GN) conforme protocolo institucional',
    route: 'parenteral',
    settingNote: 'Hemocultura antes de ATB quando possível; reavaliação em 48–72 h; descalonar com identificação.',
    referenceKey: 'ref_placeholders.v2_sepsis',
  },

  reg_sepsis_iv_amp_gent_met: {
    id: 'reg_sepsis_iv_amp_gent_met',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_gentamicin', 'mol_metronidazole'],
    label: 'Alternativa séptica — beta-lactâmico + aminoglicosídeo + anaeróbio (cautela renal)',
    route: 'parenteral',
    settingNote: 'Aminoglicosídeo: monitorização e ajuste obrigatórios com comorbidade renal.',
    referenceKey: 'ref_placeholders.v2_sepsis_alt',
  },

  reg_periop_clean_no_systemic: {
    id: 'reg_periop_clean_no_systemic',
    moleculeIds: [],
    label:
      'Profilaxia antimicrobiana sistêmica não indicada de rotina para cirurgia limpa eletiva sem fatores de risco de infecção (definir localmente por protocolo).',
    route: 'mixed',
    settingNote: 'Se houver implante, procedimento prolongado ou fatores de risco, o protocolo institucional pode indicar profilaxia — não substitui julgamento clínico.',
    referenceKey: 'ref_placeholders.v2_periop_none',
  },

  reg_periop_single_dose_cefazolin: {
    id: 'reg_periop_single_dose_cefazolin',
    moleculeIds: ['mol_cefazolin'],
    label: 'Profilaxia perioperatória típica: dose única de cefalosporina 1ª geração no momento adequado (ex.: pré-incisão)',
    route: 'parenteral',
    settingNote: 'Repetir conforme duração/sangramento apenas se protocolo local previr; MRSA/colonização: adaptar.',
    referenceKey: 'ref_placeholders.v2_periop_prophy',
  },

  reg_periop_contaminated_amp_sulb_met: {
    id: 'reg_periop_contaminated_amp_sulb_met',
    moleculeIds: ['mol_ampicillin_sulbactam', 'mol_metronidazole'],
    label: 'Cirurgia contaminada/infectada: terapia antimicrobiana guiada por cultura até definição do foco',
    route: 'parenteral',
    settingNote: 'Controle cirúrgico do foco é determinante; duração conforme resposta.',
    referenceKey: 'ref_placeholders.v2_periop_contam',
  },

  reg_bacteriuria_subclinical_no_antibiotic: {
    id: 'reg_bacteriuria_subclinical_no_antibiotic',
    moleculeIds: [],
    label:
      'Bacteriúria assintomática (subclínica): antimicrobiano sistêmico não é rotina; monitorar e tratar só com critério clínico ou protocolo local (ex.: procedimento urológico planejado).',
    route: 'oral',
    settingNote:
      'Diferenciar contaminação de amostra vs colonização persistente; exceções gestacionais/cirúrgicas seguem instituição.',
    referenceKey: 'ref_placeholders.v2_bacter_subclin',
  },

  reg_fcgs_first_line_non_antibiotic: {
    id: 'reg_fcgs_first_line_non_antibiotic',
    moleculeIds: [],
    label:
      'FCGS: eixo multifatorial (avaliação odontológica, analgesia, controle inflamatório). Antimicrobiano reservado para sobreinfeção com critério ou conduta de especialista.',
    route: 'mixed',
    settingNote:
      'Ciclos antibióticos repetidos sem controle de foco pioram stewardship; considerar doxiciclina como opção contextual, não como “padrão único”.',
    referenceKey: 'ref_placeholders.v2_fcgs',
  },

  reg_oral_clindamycin_monotherapy: {
    id: 'reg_oral_clindamycin_monotherapy',
    moleculeIds: ['mol_clindamycin'],
    label:
      'Alternativa oral (clindamicina) quando beta-lactâmico não é opção — ponderar MRSP/resistência local e amostra quando possível.',
    route: 'oral',
    settingNote: 'Útil em alguns quadros periodontais; não substitui limpeza/odontologia.',
    referenceKey: 'ref_placeholders.v2_dental_clinda',
  },
}
