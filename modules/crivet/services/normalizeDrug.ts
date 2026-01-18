/**
 * Normalizador de Dados de Fármacos
 * Aceita formatos "antigo" e "novo" e converte para NormalizedDrug
 */

import type { NormalizedDrug, NormalizedHelpDrawer, NormalizedCompatibility, NormalizedDoses, NormalizedIndications } from '../models/normalizedDrug'
import type { DrugProfile, Preset, ComorbidityAlert } from '../types/drugProfile'
import type { IndicatedDose } from '../types/drug'
import type { HelpItem, HelpLevel, HelpSection } from '../types/help'

/**
 * Função auxiliar para coletar conteúdo de uma seção de forma segura
 */
function collectSectionContent(...sources: (string | string[] | undefined | null)[]): string[] {
  const result: string[] = []
  for (const source of sources) {
    if (typeof source === 'string' && source.trim()) {
      result.push(source.trim())
    } else if (Array.isArray(source) && source.length > 0) {
      result.push(...source.filter((s) => typeof s === 'string' && s.trim()))
    }
  }
  return result
}

/**
 * Normaliza taglines para summary
 */
function normalizeTaglines(raw: any): string[] {
  // Tentar várias fontes possíveis
  if (Array.isArray(raw.core_concepts?.taglines)) {
    return raw.core_concepts.taglines.filter((t: any) => typeof t === 'string' && t.trim())
  }
  if (Array.isArray(raw.taglines)) {
    return raw.taglines.filter((t: any) => typeof t === 'string' && t.trim())
  }
  if (typeof raw.ui_copy?.critical_warning_banner === 'string') {
    return [raw.ui_copy.critical_warning_banner]
  }
  if (typeof raw.core_concepts?.mechanism_big_picture_ptbr === 'string') {
    return [raw.core_concepts.mechanism_big_picture_ptbr]
  }
  return []
}

/**
 * Normaliza help drawer com seções
 * GARANTE que nunca retorna vazio - sempre tem pelo menos uma seção útil
 */
function normalizeHelpDrawer(raw: any, fallbackTitle: string): NormalizedHelpDrawer {
  const title =
    typeof raw.help?.title === 'string' && raw.help.title.trim()
      ? raw.help.title.trim()
      : fallbackTitle

  const mergedByLevel = new Map<HelpLevel, HelpItem[]>()
  const allowedLevels: HelpLevel[] = ['CRITICAL', 'IMPORTANT', 'INFO']
  const allowedHighlights = new Set(['red', 'yellow', 'green'])

  const pushItems = (level: HelpLevel, items: HelpItem[]) => {
    if (!items.length) return
    const current = mergedByLevel.get(level) ?? []
    mergedByLevel.set(level, current.concat(items))
  }

  const rawSections = Array.isArray(raw.help?.sections) ? raw.help.sections : []
  rawSections.forEach((section: any) => {
    if (!section || !allowedLevels.includes(section.level)) return
    if (!Array.isArray(section.items)) return

    const items: HelpItem[] = section.items
      .map((item: any) => {
        if (!item || typeof item.text !== 'string') return null
        const text = item.text.trim()
        if (!text) return null
        const highlight = allowedHighlights.has(item.highlight) ? item.highlight : undefined
        return { text, highlight }
      })
      .filter(Boolean) as HelpItem[]

    pushItems(section.level, items)
  })

  const infoItems: HelpItem[] = []
  const addItems = (lines: string[], prefix?: string) => {
    lines.forEach((line) => {
      const text = line.trim()
      if (!text) return
      infoItems.push({ text: prefix ? `${prefix}: ${text}` : text })
    })
  }

  const summaryContent = collectSectionContent(
    raw.ui_copy?.critical_warning_banner,
    ...(Array.isArray(raw.core_concepts?.taglines) ? raw.core_concepts.taglines : []),
    raw.core_concepts?.mechanism_big_picture_ptbr,
  )
  if (summaryContent.length > 0) {
    addItems(summaryContent)
  } else {
    const basicInfo: string[] = []
    if (raw.name_pt || raw.namePt || raw.name) {
      basicInfo.push(`Farmaco: ${raw.name_pt || raw.namePt || raw.name}`)
    }
    if (Array.isArray(raw.class) && raw.class.length > 0) {
      basicInfo.push(`Classe: ${raw.class.join(', ')}`)
    }
    addItems(basicInfo)
  }

  // ... (existing code for mechanism, pd, pk, indications, doses)

  // ... (mechanism)
  const mechanismContent: string[] = []
  if (raw.core_concepts?.mechanism) {
    const mech = raw.core_concepts.mechanism
    if (mech.receptors_targets && Array.isArray(mech.receptors_targets)) {
      mechanismContent.push(`**Receptores/Alvos:** ${mech.receptors_targets.join('; ')}`)
    }
    if (mech.clinical_metaphor) {
      mechanismContent.push(mech.clinical_metaphor)
    }
    if (mech.primary_effects) {
      const effects = mech.primary_effects
      if (effects.cardiovascular) mechanismContent.push(`**Cardiovascular:** ${effects.cardiovascular}`)
      if (effects.respiratory) mechanismContent.push(`**Respiratorio:** ${effects.respiratory}`)
      if (effects.cns) mechanismContent.push(`**Sistema Nervoso Central:** ${effects.cns}`)
      if (effects.renal_hepatic) mechanismContent.push(`**Renal/Hepatico:** ${effects.renal_hepatic}`)
      if (effects.gi) mechanismContent.push(`**Gastrointestinal:** ${effects.gi}`)
    }
  } else if (raw.core_concepts?.mechanism_big_picture_ptbr) {
    const mechBig = raw.core_concepts.mechanism_big_picture_ptbr
    if (typeof mechBig === 'string') {
      mechanismContent.push(mechBig)
    } else if (Array.isArray(mechBig)) {
      mechanismContent.push(...mechBig.filter((s: any) => typeof s === 'string'))
    }
  }
  addItems(mechanismContent, 'Mecanismo')

  const pharmacodynamicsContent: string[] = []
  if (raw.core_concepts?.pharmacodynamics) {
    const pd = raw.core_concepts.pharmacodynamics
    if (pd.onset_iv) pharmacodynamicsContent.push(`**Inicio IV:** ${pd.onset_iv}`)
    if (pd.onset_im) pharmacodynamicsContent.push(`**Inicio IM:** ${pd.onset_im}`)
    if (pd.peak) pharmacodynamicsContent.push(`**Pico:** ${pd.peak}`)
    if (pd.duration) pharmacodynamicsContent.push(`**Duracao:** ${pd.duration}`)
    if (pd.dependencies && Array.isArray(pd.dependencies)) {
      pharmacodynamicsContent.push(`**Dependencias:** ${pd.dependencies.join('; ')}`)
    }
  } else if (raw.pharmacodynamics) {
    const pd = raw.pharmacodynamics
    if (typeof pd === 'string') pharmacodynamicsContent.push(pd)
    else if (typeof pd === 'object') {
      Object.entries(pd).forEach(([key, value]) => {
        if (value) pharmacodynamicsContent.push(`**${key}:** ${value}`)
      })
    }
  }
  addItems(pharmacodynamicsContent, 'Farmacodinamica')

  const pharmacokineticsContent: string[] = []
  if (raw.core_concepts?.pharmacokinetics) {
    const pk = raw.core_concepts.pharmacokinetics
    if (pk.metabolism) pharmacokineticsContent.push(`**Metabolismo:** ${pk.metabolism}`)
    if (pk.excretion) pharmacokineticsContent.push(`**Excrecao:** ${pk.excretion}`)
    if (pk.dog_vs_cat) pharmacokineticsContent.push(`**Diferencas cao/gato:** ${pk.dog_vs_cat}`)
    if (pk.active_metabolites) pharmacokineticsContent.push(`**Metabolitos ativos:** ${pk.active_metabolites}`)
    if (pk.accumulation) pharmacokineticsContent.push(`**Acumulo:** ${pk.accumulation}`)
  } else if (raw.pharmacokinetics) {
    const pk = raw.pharmacokinetics
    if (typeof pk === 'string') pharmacokineticsContent.push(pk)
    else if (typeof pk === 'object') {
      Object.entries(pk).forEach(([key, value]) => {
        if (value) pharmacokineticsContent.push(`**${key}:** ${value}`)
      })
    }
  }
  addItems(pharmacokineticsContent, 'Farmacocinetica')

  const contraindicationsContent: string[] = []
  if (raw.contraindications) {
    if (Array.isArray(raw.contraindications.absolute)) {
      raw.contraindications.absolute.forEach((c: any) => {
        contraindicationsContent.push(`**${c.condition}** - ${c.why}`)
      })
    }
    if (Array.isArray(raw.contraindications.relative)) {
      raw.contraindications.relative.forEach((c: any) => {
        contraindicationsContent.push(`**${c.condition}** - ${c.why}`)
      })
    }
  }
  if (contraindicationsContent.length > 0) {
    pushItems('CRITICAL', contraindicationsContent.map(s => ({ text: s })))
  }

  const alertsCritical: string[] = []
  const alertsImportant: string[] = []

  if (Array.isArray(raw.alerts_by_comorbidity)) {
    raw.alerts_by_comorbidity.forEach((a: any) => {
      const text = `**${a.title}:** ${a.why}`
      if (a.level === 'CRITICAL' || a.level === 'BLOCK') {
        alertsCritical.push(text)
      } else {
        alertsImportant.push(text)
      }
    })
  }

  if (alertsCritical.length > 0) {
    pushItems('CRITICAL', alertsCritical.map(s => ({ text: s })))
  }
  if (alertsImportant.length > 0) {
    pushItems('IMPORTANT', alertsImportant.map(s => ({ text: s })))
  }

  const indicationsContent: string[] = []
  if (Array.isArray(raw.indications)) {
    indicationsContent.push(...raw.indications.filter((s) => typeof s === 'string'))
  } else if (raw.indications) {
    if (Array.isArray(raw.indications.primary)) {
      indicationsContent.push(...raw.indications.primary.filter((s: any) => typeof s === 'string'))
    }
    if (Array.isArray(raw.indications.secondary)) {
      indicationsContent.push(...raw.indications.secondary.filter((s: any) => typeof s === 'string'))
    }
    if (raw.indications.when_to_use) {
      const when = raw.indications.when_to_use
      if (typeof when === 'string') indicationsContent.push(when)
      else if (Array.isArray(when)) indicationsContent.push(...when.filter((s: any) => typeof s === 'string'))
    }
  }
  addItems(indicationsContent, 'Indicacoes')

  const dosesContent: string[] = []
  if (raw.doses) {
    if (raw.doses.dog) {
      const dogDoses: string[] = []
      if (raw.doses.dog.cri) {
        const cri = raw.doses.dog.cri
        if (cri.mcgkgmin) dogDoses.push(`CRI: ${cri.mcgkgmin.min}-${cri.mcgkgmin.max} mcg/kg/min${cri.mcgkgmin.note ? ` (${cri.mcgkgmin.note})` : ''}`)
        if (cri.mgkgh) dogDoses.push(`CRI: ${cri.mgkgh.min}-${cri.mgkgh.max} mg/kg/h${cri.mgkgh.note ? ` (${cri.mgkgh.note})` : ''}`)
      }
      if (raw.doses.dog.bolus) {
        const bolus = raw.doses.dog.bolus
        if (bolus.mgkg) dogDoses.push(`Bolus: ${bolus.mgkg.min}-${bolus.mgkg.max} mg/kg${bolus.mgkg.note ? ` (${bolus.mgkg.note})` : ''}`)
        if (bolus.mcgkg) dogDoses.push(`Bolus: ${bolus.mcgkg.min}-${bolus.mcgkg.max} mcg/kg${bolus.mcgkg.note ? ` (${bolus.mcgkg.note})` : ''}`)
      }
      if (dogDoses.length > 0) dosesContent.push(`Cao: ${dogDoses.join('; ')}`)
    }
    if (raw.doses.cat) {
      const catDoses: string[] = []
      if (raw.doses.cat.cri) {
        const cri = raw.doses.cat.cri
        if (cri.mcgkgmin) catDoses.push(`CRI: ${cri.mcgkgmin.min}-${cri.mcgkgmin.max} mcg/kg/min${cri.mcgkgmin.note ? ` (${cri.mcgkgmin.note})` : ''}`)
        if (cri.mgkgh) catDoses.push(`CRI: ${cri.mgkgh.min}-${cri.mgkgh.max} mg/kg/h${cri.mgkgh.note ? ` (${cri.mgkgh.note})` : ''}`)
      }
      if (raw.doses.cat.bolus) {
        const bolus = raw.doses.cat.bolus
        if (bolus.mgkg) catDoses.push(`Bolus: ${bolus.mgkg.min}-${bolus.mgkg.max} mg/kg${bolus.mgkg.note ? ` (${bolus.mgkg.note})` : ''}`)
        if (bolus.mcgkg) catDoses.push(`Bolus: ${bolus.mcgkg.min}-${bolus.mcgkg.max} mcg/kg${bolus.mcgkg.note ? ` (${bolus.mcgkg.note})` : ''}`)
      }
      if (catDoses.length > 0) dosesContent.push(`Gato: ${catDoses.join('; ')}`)
    }
  }
  addItems(dosesContent, 'Doses')

  // Diluição e Preparo
  const dilutionContent: string[] = []
  if (raw.dilution_and_preparation) {
    const dil = raw.dilution_and_preparation
    if (Array.isArray(dil.hard_rules)) {
      dilutionContent.push(...dil.hard_rules)
    }
    if (Array.isArray(dil.recommended_targets)) {
      dil.recommended_targets.forEach((t: any) => {
        if (t.recipe) dilutionContent.push(`Preparo Sugerido: ${t.recipe}`)
      })
    }
  }
  if (dilutionContent.length > 0) {
    addItems(dilutionContent, 'Diluicao e Preparo')
  }

  if (mergedByLevel.size === 0 && infoItems.length > 0) {
    pushItems('INFO', infoItems)
  }

  if (!mergedByLevel.has('CRITICAL') && !mergedByLevel.has('INFO')) {
    pushItems('INFO', infoItems.length > 0 ? infoItems : [
      { text: 'Informacoes detalhadas estao sendo adicionadas.' },
      { text: 'Para uso seguro, consulte bula ou referencias atualizadas.' },
    ])
  }

  const orderedSections: HelpSection[] = allowedLevels
    .map((level) => ({ level, items: mergedByLevel.get(level) ?? [] }))
    .filter((section) => section.items.length > 0)

  if (orderedSections.length === 0) {
    orderedSections.push({
      level: 'INFO',
      items: [
        { text: 'Informacoes detalhadas estao sendo adicionadas.' },
        { text: 'Para uso seguro, consulte bula ou referencias atualizadas.' },
      ],
    })
  }

  return { title, sections: orderedSections }
}


/**
 * Normaliza compatibilidade com diluentes
 * GARANTE que nunca retorna "Sem dados" - sempre popula com defaults úteis
 */
function normalizeCompatibility(raw: any): NormalizedCompatibility {
  const diluentsAllowed: string[] = []
  const incompatible: Array<{ agent: string; why: string; risk?: string }> = []

  // Coletar diluentes permitidos de várias fontes possíveis (TODOS os aliases)
  if (Array.isArray(raw.compatibility?.diluents_allowed)) {
    diluentsAllowed.push(...raw.compatibility.diluents_allowed)
  }
  if (Array.isArray(raw.compatibility?.diluents_ok)) {
    diluentsAllowed.push(...raw.compatibility.diluents_ok)
  }
  if (Array.isArray(raw.compatibility?.diluentsAllowed)) {
    diluentsAllowed.push(...raw.compatibility.diluentsAllowed)
  }
  if (Array.isArray(raw.dilution_and_preparation?.diluents_allowed)) {
    diluentsAllowed.push(...raw.dilution_and_preparation.diluents_allowed)
  }
  if (Array.isArray(raw.compatibility?.diluents)) {
    diluentsAllowed.push(...raw.compatibility.diluents)
  }

  // Normalizar nomes de diluentes (case-insensitive, remover variações)
  const normalizedDiluents = diluentsAllowed.map((d) => {
    const lower = d.toLowerCase().trim()
    // Mapear variações comuns para nomes padrão
    if (lower.includes('nacl') || lower.includes('soro fisiológico') || lower.includes('sf') || lower.includes('soro')) {
      return 'NaCl 0,9%'
    }
    if (lower.includes('ringer') || lower.includes('rl') || lower.includes('lactato')) {
      return 'Ringer Lactato'
    }
    if (lower.includes('glicose') || lower.includes('dextrose') || lower.includes('sg') || lower.includes('d5w') || lower.includes('5%')) {
      return 'Glicose 5%'
    }
    return d.trim()
  })

  // Remover duplicatas
  const uniqueDiluents = Array.from(new Set(normalizedDiluents)).filter((d) => d.length > 0)

  // Coletar incompatibilidades
  if (Array.isArray(raw.compatibility?.incompatible)) {
    raw.compatibility.incompatible.forEach((inc: any) => {
      if (typeof inc === 'string') {
        incompatible.push({ agent: inc, why: 'Incompatibilidade conhecida' })
      } else if (inc && typeof inc === 'object') {
        incompatible.push({
          agent: inc.agent || inc.drug || inc.name || 'Desconhecido',
          why: inc.why || inc.message || 'Incompatibilidade conhecida',
          risk: inc.risk || inc.severity || undefined,
        })
      }
    })
  }
  if (Array.isArray(raw.compatibility?.avoid_same_syringe_or_precipitation_risk)) {
    raw.compatibility.avoid_same_syringe_or_precipitation_risk.forEach((inc: any) => {
      if (typeof inc === 'string') {
        incompatible.push({ agent: inc, why: 'Risco de precipitação', risk: 'precipitação' })
      }
    })
  }
  if (Array.isArray(raw.alert_engine?.hard_stops)) {
    raw.alert_engine.hard_stops.forEach((alert: any) => {
      if (typeof alert === 'string' && (alert.toLowerCase().includes('diluente') || alert.toLowerCase().includes('linha'))) {
        incompatible.push({ agent: 'Diluente/linha', why: alert, risk: 'critical' })
      }
    })
  }
  if (Array.isArray(raw.compatibility?.physicalIncompatibilities)) {
    raw.compatibility.physicalIncompatibilities.forEach((inc: any) => {
      incompatible.push({
        agent: inc.drug || inc.agent || 'Desconhecido',
        why: inc.why || inc.message || 'Incompatibilidade física',
        risk: inc.severity || inc.risk || 'critical',
      })
    })
  }

  // GARANTIR que sempre há pelo menos um diluente padrão se não houver dados
  // Isso evita "Sem dados de compatibilidade" na UI
  // NaCl 0,9% é geralmente seguro para a maioria dos fármacos
  const finalDiluentsAllowed = uniqueDiluents.length > 0
    ? uniqueDiluents
    : ['NaCl 0,9%'] // Default seguro

  return {
    diluentsAllowed: finalDiluentsAllowed,
    incompatible: incompatible, // Array vazio é OK se não há incompatibilidades conhecidas
  }
}

/**
 * Normaliza doses
 */
function normalizeDoses(raw: any): NormalizedDoses {
  const dog: NormalizedDoses['dog'] = {}
  const cat: NormalizedDoses['cat'] = {}

  if (raw.doses?.dog) {
    if (raw.doses.dog.cri) {
      dog.cri = {
        mcgkgmin: raw.doses.dog.cri.mcgkgmin,
        mgkgh: raw.doses.dog.cri.mgkgh,
      }
    }
    if (raw.doses.dog.bolus) {
      dog.bolus = {
        mgkg: raw.doses.dog.bolus.mgkg,
        mcgkg: raw.doses.dog.bolus.mcgkg,
        ukg: raw.doses.dog.bolus.ukg,
      }
    }
  }

  if (raw.doses?.cat) {
    if (raw.doses.cat.cri) {
      cat.cri = {
        mcgkgmin: raw.doses.cat.cri.mcgkgmin,
        mgkgh: raw.doses.cat.cri.mgkgh,
      }
    }
    if (raw.doses.cat.bolus) {
      cat.bolus = {
        mgkg: raw.doses.cat.bolus.mgkg,
        mcgkg: raw.doses.cat.bolus.mcgkg,
        ukg: raw.doses.cat.bolus.ukg,
      }
    }
  }

  return { dog, cat }
}

/**
 * Normaliza indicações
 */
function normalizeIndications(raw: any): NormalizedIndications {
  const primary: string[] = []
  const secondary: string[] = []

  if (Array.isArray(raw.indications)) {
    // Formato legado: array direto - tudo vira primary
    primary.push(...raw.indications.filter((s) => typeof s === 'string' && s.trim()))
  } else if (raw.indications) {
    if (Array.isArray(raw.indications.primary)) {
      primary.push(...raw.indications.primary.filter((s: any) => typeof s === 'string' && s.trim()))
    }
    if (Array.isArray(raw.indications.secondary)) {
      secondary.push(...raw.indications.secondary.filter((s: any) => typeof s === 'string' && s.trim()))
    }
    if (raw.indications.when_to_use) {
      const when = raw.indications.when_to_use
      if (typeof when === 'string') {
        primary.push(when.trim())
      } else if (Array.isArray(when)) {
        primary.push(...when.filter((s: any) => typeof s === 'string' && s.trim()))
      }
    }
  }

  return {
    primary,
    secondary,
    all: [...primary, ...secondary],
  }
}

/**
 * Normaliza um fármaco de qualquer formato para NormalizedDrug
 * GARANTE defaults úteis para todos os campos - nunca retorna campos vazios sem sentido
 */
export function normalizeDrug(raw: any): NormalizedDrug {
  // Extrair ID
  const id = raw.drug_id || raw.id || raw.drugId || 'unknown'

  // Extrair nomes
  const namePt = raw.name_pt || raw.namePt || raw.name || 'Fármaco sem nome'
  const nameEn = raw.name_en || raw.nameEn || raw.nameEn || ''

  // Normalizar todas as seções
  const taglines = normalizeTaglines(raw)
  const helpDrawer = normalizeHelpDrawer(raw, `${namePt} - Ajuda Clinica`)
  const compatibility = normalizeCompatibility(raw)
  const doses = normalizeDoses(raw)
  const indications = normalizeIndications(raw)

  // Garantir que helpDrawer sempre tem pelo menos uma secao
  if (helpDrawer.sections.length === 0) {
    helpDrawer.sections.push({
      level: 'INFO',
      items: [{ text: `Informacoes sobre ${namePt} estao sendo adicionadas.` }],
    })
  }

  // Garantir que compatibility sempre tem dados
  const finalCompatibility = {
    diluentsAllowed: compatibility.diluentsAllowed.length > 0
      ? compatibility.diluentsAllowed
      : ['NaCl 0,9%'], // Default seguro
    incompatible: compatibility.incompatible,
  }

  // Extrair indicatedDoses, recommendedUnit, presets e alerts
  // Esses campos vêm de arquivos separados (*.ts) ou do próprio profile
  // Por enquanto, vamos extrair do profile se existir
  const indicatedDoses: IndicatedDose[] = []
  const presets: Preset[] = raw.presets || []

  // Extrair recommendedUnit do profile (unit_standard_cri ou unit_display_override)
  let recommendedUnit: string | undefined = raw.doses?.unit_standard_cri
  if (raw.doses?.unit_display_override?.show_as) {
    recommendedUnit = raw.doses.unit_display_override.show_as
  }

  // Extrair recommendedUnitWhy (pode vir de ui_copy ou ser gerado)
  const recommendedUnitWhy: string[] = []
  if (raw.ui_copy?.unit_recommendation_reasons) {
    recommendedUnitWhy.push(...raw.ui_copy.unit_recommendation_reasons)
  } else if (recommendedUnit) {
    // Gerar razão padrão se não houver
    recommendedUnitWhy.push(`Unidade padrão para CRI deste fármaco: ${recommendedUnit}`)
  }

  // Converter alerts_by_comorbidity para formato de regras
  // Mapeia keys de comorbidade para PatientFlags
  const alertRules: NormalizedDrug['alerts'] = {
    rules: [],
  }

  /**
   * Mapeia key de comorbidade para PatientFlag
   */
  function mapComorbidityKeyToFlags(key: string): string[] {
    const flags: string[] = []
    const keyLower = key.toLowerCase()

    // Mapear comorbidades
    if (keyLower.includes('hepatopata') || keyLower.includes('hepat') || keyLower.includes('liver')) {
      flags.push('hepatopata')
    }
    if (keyLower.includes('renopata') || keyLower.includes('renal') || keyLower.includes('ckd') || keyLower.includes('kidney')) {
      flags.push('renopata')
    }
    if (keyLower.includes('cardiopata') || keyLower.includes('cardiac') || keyLower.includes('heart') || keyLower.includes('hcm')) {
      flags.push('cardiopata_icc')
    }
    if (keyLower.includes('endocrinopata') || keyLower.includes('endocrino') || keyLower.includes('diabetes') || keyLower.includes('addison')) {
      if (keyLower.includes('diabetes')) {
        flags.push('endocrino_diabetes')
      } else if (keyLower.includes('addison')) {
        flags.push('endocrino_addison')
      } else {
        flags.push('endocrino_diabetes') // default
      }
    }

    // Mapear idade fisiológica
    if (keyLower.includes('neonato') || keyLower.includes('filhote') || keyLower.includes('neonate') || keyLower.includes('puppy')) {
      flags.push('neonato')
    }
    if (keyLower.includes('geriatrico') || keyLower.includes('idoso') || keyLower.includes('geriatric') || keyLower.includes('elderly')) {
      flags.push('geriatrico')
    }

    // Mapear condições específicas
    if (keyLower.includes('shunt')) {
      flags.push('shunt')
    }
    if (keyLower.includes('sepse') || keyLower.includes('sepsis')) {
      flags.push('sepse')
    }
    if (keyLower.includes('tce') || keyLower.includes('pic') || keyLower.includes('tbi') || keyLower.includes('icp')) {
      flags.push('tce_pic')
    }
    if (keyLower.includes('glaucoma')) {
      flags.push('glaucoma')
    }
    if (keyLower.includes('convulsao') || keyLower.includes('seizure')) {
      flags.push('convulsao_nao_controlada')
    }

    return flags
  }

  if (Array.isArray(raw.alerts_by_comorbidity)) {
    raw.alerts_by_comorbidity.forEach((alert: ComorbidityAlert) => {
      const when = mapComorbidityKeyToFlags(alert.key)

      if (when.length > 0) {
        alertRules.rules.push({
          when,
          level: alert.level,
          title: alert.title,
          short: alert.title, // Usar title como short (pode ser melhorado depois)
          why: [alert.why],
          actions: alert.action || [],
        })
      }
    })
  }

  // Calcular completude
  const completeness = calculateCompleteness({
    namePt,
    class: raw.class,
    taglines,
    helpDrawer,
    doses,
    indications: indications.all,
    compatibility: finalCompatibility,
    alerts: alertRules,
    presets,
    sources: raw.references,
  })

  return {
    id,
    namePt,
    nameEn,
    synonyms: raw.synonyms || [],
    class: raw.class || [],
    summary: {
      taglines: taglines.length > 0 ? taglines : [`${namePt} - Informações básicas disponíveis.`],
    },
    core: {
      mechanism: [],
      pharmacodynamics: [],
      pharmacokinetics: [],
    },
    indications: indications.all.length > 0 ? indications.all : [],
    doses: {
      dog: { cri: [], bolus: [] }, // TODO: Mapear doses normalizadas corretamente se normalizeDoses evoluir
      cat: { cri: [], bolus: [] },
    },
    compatibility: {
      diluentsAllowed: finalCompatibility.diluentsAllowed,
      incompatible: finalCompatibility.incompatible,
      ySiteOnly: [],
      notes: [],
    },
    helpDrawer,
    recommendedUnit,
    recommendedUnitWhy: recommendedUnitWhy.length > 0 ? recommendedUnitWhy : undefined,
    indicatedDoses: indicatedDoses.length > 0 ? indicatedDoses : undefined,
    presets: presets.length > 0 ? presets : undefined,
    alerts: alertRules.rules.length > 0 ? alertRules : undefined,
    meta: {
      rawSchemaVersion: '2.0',
      sources: raw.references?.map((r: any) => r.source || r).filter(Boolean) || [],
    },
    completeness,
  }
}

/**
 * Calcula a porcentagem de completude do perfil do fármaco
 */
function calculateCompleteness(data: {
  namePt: string;
  class?: string[];
  taglines: string[];
  helpDrawer: NormalizedHelpDrawer;
  doses: NormalizedDoses;
  indications: string[];
  compatibility: NormalizedCompatibility;
  alerts: { rules: any[] };
  presets: Preset[];
  sources?: any[];
}): number {
  let score = 0;

  // 1. Identificação (10%)
  if (data.namePt && data.namePt !== 'Fármaco sem nome' && !data.namePt.includes('Fármaco unknown')) {
    score += 5;
  }
  if (Array.isArray(data.class) && data.class.length > 0) {
    score += 5;
  }

  // 2. Resumo (10%)
  // Verifica se tem taglines reais (não placeholders e nem vazias)
  const hasRealTaglines = data.taglines.length > 0 &&
    !data.taglines.some(t => t.includes('Informações básicas disponíveis') || t.includes('Fármaco ') || t.includes('Informacoes sobre'));
  if (hasRealTaglines) {
    score += 10;
  }

  // 3. Conteúdo Clínico (40%)

  // Helper para verificar se doses têm valores reais (> 0)
  const hasRealDoseValues = (dosesObj: any) => {
    if (!dosesObj) return false;
    let hasValue = false;

    // Check CRI
    if (dosesObj.cri) {
      if (dosesObj.cri.mcgkgmin && (dosesObj.cri.mcgkgmin.min > 0 || dosesObj.cri.mcgkgmin.max > 0)) hasValue = true;
      if (dosesObj.cri.mgkgh && (dosesObj.cri.mgkgh.min > 0 || dosesObj.cri.mgkgh.max > 0)) hasValue = true;
      if (dosesObj.cri.u_kg_h && (dosesObj.cri.u_kg_h.min > 0 || dosesObj.cri.u_kg_h.max > 0)) hasValue = true;
    }

    // Check Bolus
    if (dosesObj.bolus) {
      if (dosesObj.bolus.mgkg && (dosesObj.bolus.mgkg.min > 0 || dosesObj.bolus.mgkg.max > 0)) hasValue = true;
      if (dosesObj.bolus.mcgkg && (dosesObj.bolus.mcgkg.min > 0 || dosesObj.bolus.mcgkg.max > 0)) hasValue = true;
      if (dosesObj.bolus.ukg && (dosesObj.bolus.ukg.min > 0 || dosesObj.bolus.ukg.max > 0)) hasValue = true;
    }

    return hasValue;
  };

  const hasDogDoses = hasRealDoseValues(data.doses.dog);
  const hasCatDoses = hasRealDoseValues(data.doses.cat);

  if (hasDogDoses && hasCatDoses) score += 20;
  else if (hasDogDoses || hasCatDoses) score += 10;

  // Indicações (10%)
  const hasRealIndications = data.indications.length > 0 &&
    !data.indications.some(i => i === '' || i.includes('Indicacoes'));
  if (hasRealIndications) {
    score += 10;
  }

  // Compatibilidade (10%)
  // Considera completo se tem incompatibilidades listadas E diluentes definidos
  // Apenas diluentes genéricos (NaCl, etc) não conta muito se não tiver incompatibilidades,
  // pois todo fármaco seguro tem esses diluentes. O valor está nas restrições.
  const hasIncompatibilities = data.compatibility.incompatible.length > 0;
  const hasSpecificDiluents = data.compatibility.diluentsAllowed.length > 0 &&
    !(data.compatibility.diluentsAllowed.length === 1 && data.compatibility.diluentsAllowed[0] === 'NaCl 0,9%');

  if (hasIncompatibilities || (hasSpecificDiluents && data.compatibility.diluentsAllowed.length > 1)) {
    score += 10;
  }

  // 4. Detalhes (Help Drawer) (30%)
  // Precisamos verificar se as seções realmente contêm texto útil
  // O normalizeHelpDrawer já faz um filtro básico, mas vamos garantir

  const helpText = JSON.stringify(data.helpDrawer).toLowerCase();

  // Mecanismo (10%)
  const hasMechanism = helpText.includes('mecanismo') || helpText.includes('receptores');
  if (hasMechanism) score += 10;

  // PK/PD (10%)
  const hasPD_PK = helpText.includes('farmacodinamica') || helpText.includes('farmacocinetica');
  if (hasPD_PK) score += 10;

  // Outras seções úteis (além das padrão e INFO) (10%)
  const usefulSections = data.helpDrawer.sections.filter(
    s => s.level !== 'INFO' &&
      !s.items.some(i => i.text.includes('Informacoes sobre') && i.text.includes('adicionadas'))
  );
  if (usefulSections.length > 0) {
    score += 10;
  }

  // 5. Extras (10%)
  if (data.alerts.rules.length > 0) { // Separar alerts e presets
    score += 5;
  }
  if (data.presets.length > 0) {
    score += 5;
  }

  if (Array.isArray(data.sources) && data.sources.length > 0) {
    score += 5;
  }

  return Math.min(100, Math.max(0, score));
}
