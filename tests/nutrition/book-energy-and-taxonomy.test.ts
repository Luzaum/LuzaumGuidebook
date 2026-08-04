import assert from 'node:assert/strict'
import test from 'node:test'
import {
  BOOK_RER_CONSTANT,
  BOOK_RER_EXPONENT,
  calculateBookProfileEnergy,
  calculateBookRER,
  calculateEnergyGoalFromBcs,
  calculateMaintenanceEnergyFromProfile,
  getBookEnergyProfiles,
  getDefaultBookEnergyProfile,
  getSelectableBookEnergyProfiles,
} from '../../modules/energia-vet/lib/bookEnergy'
import { BOOK_FOOD_CATEGORIES, classifyFoodByBook } from '../../modules/energia-vet/lib/foodTaxonomy'
import { getFoodById } from '../../modules/energia-vet/lib/genutriData'

test('perfis energéticos dos livros cobrem cão e gato', () => {
  assert.ok(getBookEnergyProfiles('dog').length >= 18)
  assert.ok(getBookEnergyProfiles('cat').length >= 13)
})

test('perfil automático respeita idade e castração já informadas', () => {
  assert.equal(getDefaultBookEnergyProfile({ species: 'dog', ageMonths: 3, isNeutered: false }), 'dog_puppy_0_4')
  assert.equal(getDefaultBookEnergyProfile({ species: 'dog', ageMonths: 36, isNeutered: true }), 'dog_adult_neutered')
  assert.equal(getDefaultBookEnergyProfile({ species: 'cat', ageMonths: 36, isNeutered: true }), 'cat_adult_neutered')
})

test('RER canônico do livro — 70 × kg^0,75 para cães e gatos', () => {
  const dogRer = calculateBookRER(15)
  const catRer = calculateBookRER(4.5)
  assert.equal(BOOK_RER_CONSTANT, 70)
  assert.equal(BOOK_RER_EXPONENT, 0.75)
  assert.equal(Math.round(dogRer), 534)
  assert.equal(Math.round(catRer), 216)
})

test('cão adulto castrado usa 1,6 vezes o RER do livro (Tabela 3.1 / Box 3.1)', () => {
  const profile = getBookEnergyProfiles('dog').find((item) => item.id === 'dog_adult_neutered')!
  const result = calculateBookProfileEnergy({ weightKg: 15, profile })
  assert.equal(result.factor, 1.6)
  assert.equal(Math.round(result.kcal), 854)
})

test('cão inativo NRC direto — 95 × kg^0,75 (Tabela 3.1)', () => {
  const profile = getBookEnergyProfiles('dog').find((item) => item.id === 'dog_nrc_inactive')!
  const result = calculateBookProfileEnergy({ weightKg: 15, profile })
  assert.equal(Math.round(result.kcal), 724)
})

test('gato magro NRC direto — 100 × kg^0,67 (Tabela 3.2)', () => {
  const profile = getBookEnergyProfiles('cat').find((item) => item.id === 'cat_nrc_lean')!
  const result = calculateBookProfileEnergy({ weightKg: 4.5, profile })
  assert.equal(Math.round(result.kcal), 274)
})

test('perfis selecionáveis excluem NRC direto e Clínico da etapa Energia', () => {
  const cat = getSelectableBookEnergyProfiles('cat')
  assert.ok(cat.every((p) => p.group !== 'NRC direto' && p.group !== 'Clínico'))
  assert.ok(cat.some((p) => p.id === 'cat_adult_inactive'))
  assert.equal(cat.find((p) => p.id === 'cat_weight_loss'), undefined)
})

test('manutenção e meta por ECC usam energia coerente', () => {
  const maintenance = calculateMaintenanceEnergyFromProfile({ weightKg: 5, profileId: 'cat_adult_inactive' })
  assert.equal(Math.round(maintenance), 234)
  const target = calculateEnergyGoalFromBcs({
    species: 'cat',
    currentWeightKg: 5,
    targetWeightKg: 4.25,
    goal: 'weight_loss',
    maintenanceEnergyKcal: maintenance,
  })
  assert.equal(Math.round(target), 166)
  const diffPct = ((target - maintenance) / maintenance) * 100
  assert.ok(diffPct > -35 && diffPct < -25)
})

test('meta de perda de peso — cão 1,0 × RER no peso-alvo (Tabela 3.1)', () => {
  const targetRer = calculateBookRER(10)
  assert.equal(Math.round(targetRer), 394)
  assert.equal(Math.round(targetRer * 1.0), 394)
})

test('taxonomia dos livros preserva categorias clínicas e classifica o catálogo', () => {
  assert.ok(BOOK_FOOD_CATEGORIES.includes('Dietas comerciais completas'))
  assert.ok(BOOK_FOOD_CATEGORIES.includes('Carnes, vísceras, ovos e pescados'))
  const food = getFoodById('rc-medium-adult')
  if (food) assert.ok(BOOK_FOOD_CATEGORIES.includes(classifyFoodByBook(food)))
})
