// src/lib/drug-sources/sectionSourceGuide.ts
import type { SourceId } from './catalog'

export type SectionKey =
    | 'core_concepts'
    | 'species_notes'
    | 'indications'
    | 'contraindications'
    | 'doses'
    | 'presentations'
    | 'dilution_and_preparation'
    | 'compatibility'
    | 'administration_and_titration'
    | 'adverse_effects_and_toxicity'
    | 'alerts_by_comorbidity'
    | 'presets'
    | 'calculation_templates'
    | 'how_we_got_here_block'
    | 'protocol_integrations'
    | 'clinical_flowcharts'
    | 'ui_copy'
    | 'references'

export const SECTION_PREFERRED_SOURCES: Record<SectionKey, SourceId[]> = {
    core_concepts: ['plumbs_vdh_10', 'lumb_jones_6', 'nelson_couto_6'],
    species_notes: ['plumbs_vdh_10', 'nelson_couto_6'],
    indications: ['nelson_couto_6', 'bsava_ecc_3', 'plumbs_vdh_10'],
    contraindications: ['plumbs_vdh_10', 'lumb_jones_6', 'bsava_ecc_3'],
    doses: ['plumbs_vdh_10', 'lumb_jones_6'],
    presentations: ['plumbs_vdh_10'],
    dilution_and_preparation: ['plumbs_vdh_10', 'bsava_ecc_3'],
    compatibility: ['plumbs_vdh_10', 'bsava_ecc_3'],
    administration_and_titration: ['lumb_jones_6', 'bsava_ecc_3', 'nelson_couto_6'],
    adverse_effects_and_toxicity: ['plumbs_vdh_10', 'lumb_jones_6', 'nelson_couto_6'],
    alerts_by_comorbidity: ['plumbs_vdh_10', 'nelson_couto_6', 'bsava_ecc_3'],
    presets: ['plumbs_vdh_10'],
    calculation_templates: ['plumbs_vdh_10'],
    how_we_got_here_block: ['plumbs_vdh_10'],
    protocol_integrations: ['bsava_ecc_3', 'nelson_couto_6', 'lumb_jones_6'],
    clinical_flowcharts: ['bsava_ecc_3', 'nelson_couto_6'],
    ui_copy: ['bsava_ecc_3', 'lumb_jones_6'],
    references: ['plumbs_vdh_10', 'lumb_jones_6', 'bsava_ecc_3', 'nelson_couto_6'],
}
