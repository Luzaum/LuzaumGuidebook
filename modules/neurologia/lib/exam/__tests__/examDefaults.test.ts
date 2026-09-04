import {
  applyNormalExamDefaults,
  getUnfilledExamFieldDetails,
  resolveExamDefault,
} from '../examDefaults'

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message)
}

export const testExamDefaults = () => {
  console.log('[TEST] examDefaults')

  const empty = resolveExamDefault('mentation', {})
  assert(empty.value === 'Alerta', 'Mentação basal deve ser Alerta')

  const fromGait = resolveExamDefault('ambulation', {
    gait_thoracic: 'Plegia',
    gait_pelvic: 'Normal',
  })
  assert(fromGait.value === 'Plegia' && fromGait.inferred, 'Deambulação deve inferir plegia')

  const fromAmbulation = resolveExamDefault('gait_pelvic', { ambulation: 'Com Apoio' })
  assert(fromAmbulation.value === 'Paresia' && fromAmbulation.inferred, 'Marcha pélvica deve inferir paresia')

  const ataxiaFromGait = resolveExamDefault('ataxia_type', {
    gait_thoracic: 'Ataxia',
    head_posture: 'Head Tilt',
  })
  assert(ataxiaFromGait.value === 'Vestibular', 'Ataxia vestibular inferida com head tilt')

  const mirroredMenace = resolveExamDefault('menace_right', { menace_left: 'Presente' })
  assert(mirroredMenace.value === 'Presente' && mirroredMenace.inferred, 'Menace espelha lado normal')

  const filled = applyNormalExamDefaults({
    gait_thoracic: 'Paresia',
  })
  assert(filled.ambulation === 'Com Apoio', 'Defaults aplicados devem coerir com marcha')
  assert(filled.mentation === 'Alerta', 'Demais campos permanecem basais')

  const details = getUnfilledExamFieldDetails({ mentation: 'Deprimido' })
  assert(details.every((d) => d.assumedValue && d.assumedHint), 'Detalhes devem incluir valor e hint')
  assert(!details.some((d) => d.key === 'mentation'), 'Campos preenchidos não entram na lista')

  console.log('[TEST] examDefaults - OK')
}
