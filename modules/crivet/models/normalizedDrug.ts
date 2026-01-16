/**
 * Modelo Normalizado de Fármaco para UI
 * Contrato único interno que aceita dados de formatos diferentes
 */

export interface HelpDrawerSection {
  title: string
  content: string[] // Array de strings para renderizar como parágrafos ou lista
}

export interface NormalizedHelpDrawer {
  sections: HelpDrawerSection[]
}

export interface NormalizedCompatibility {
  diluentsAllowed: string[] // Lista de diluentes compatíveis
  incompatible: Array<{
    agent: string
    why: string
    risk?: string
  }>
}

export interface NormalizedDose {
  cri?: {
    mcgkgmin?: { min: number; max: number; note?: string }
    mgkgh?: { min: number; max: number; note?: string }
  }
  bolus?: {
    mgkg?: { min: number; max: number; note?: string }
    mcgkg?: { min: number; max: number; note?: string }
    ukg?: { min: number; max: number; note?: string }
  }
}

export interface NormalizedDoses {
  dog: NormalizedDose
  cat: NormalizedDose
}

export interface NormalizedIndications {
  primary: string[]
  secondary: string[]
  all: string[] // Concatenação de primary + secondary para facilitar exibição
}

/**
 * Contrato único interno para UI
 * Todos os campos são obrigatórios para garantir que a UI nunca caia no fallback
 */
export interface NormalizedDrug {
  // Identidade (obrigatórios)
  id: string
  namePt: string
  nameEn: string

  // Summary (taglines para exibição rápida)
  summary: {
    taglines: string[]
  }

  // Help Drawer (conteúdo do botão "?")
  helpDrawer: NormalizedHelpDrawer

  // Compatibilidade
  compatibility: NormalizedCompatibility

  // Doses
  doses: NormalizedDoses

  // Indicações (obrigatório para UI)
  indications: NormalizedIndications
}
