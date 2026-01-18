export type RichTextSpan =
  | { type: 'text'; value: string }
  | { type: 'highlight'; color: 'yellow' | 'red' | 'green' | 'orange' | 'blue'; value: string }
  | { type: 'underline'; value: string }
  | { type: 'bold'; value: string }

export type RichContent = {
  type: 'paragraph' | 'bullet'
  content: RichTextSpan[]
}

export type HelpTopic = {
  id: string
  title: string
  whatItAssesses: string | RichContent[]
  neuroanatomy: string | RichContent[]
  howToPerform: string | RichContent[]
  interpretation: string | RichContent[]
  pitfalls: string | RichContent[]
  imageSlot?: {
    enabled: boolean
    caption: string
  }
  // Campos lógicos/metadados para o motor diagnóstico
  neuroLocalization?: (
    | 'forebrain'
    | 'cerebellum'
    | 'brainstem'
    | 'vestibular_peripheral'
    | 'vestibular_central'
    | 'C1_C5'
    | 'C6_T2'
    | 'T3_L3'
    | 'L4_S3'
    | 'peripheral_nerve'
    | 'neuromuscular'
  )[]
  neuronType?: ('UMN' | 'LMN' | 'mixed')[]
  cranialNerves?: number[] // ex: [5], [7], [8], [9,10]
  diagnosticWeight?: 1 | 2 | 3 // 1 = baixo, 2 = moderado, 3 = alto
  urgencyFlag?: boolean
  emergencyTriggers?: (
    | 'coma'
    | 'status_epilepticus'
    | 'respiratory_failure'
    | 'bulbar_signs'
    | 'acute_plegia'
    | 'severe_spinal_pain'
    | 'aspiration_risk'
  )[]
  mimics?: ('metabolic' | 'toxic' | 'orthopedic' | 'behavioral' | 'drug_effect')[]
  suggestedTests?: (
    | 'bloodwork'
    | 'electrolytes'
    | 'CK'
    | 'radiography'
    | 'CT'
    | 'MRI'
    | 'CSF'
    | 'EMG'
    | 'AChR_Ab'
    | 'thoracic_radiograph'
    | 'otoscopy'
  )[]
  clinicalAlerts?: string[]

  // Deprecated/Legacy fields (manter compatibilidade se necessário, mas preferir os novos)
  tags?: string[]
  severityWeight?: 1 | 2 | 3
  localizationHint?: string[]
}
