import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateBookProfileEnergy, getBookEnergyProfiles, getDefaultBookEnergyProfile } from '../../modules/energia-vet/lib/bookEnergy'
import { BOOK_FOOD_CATEGORIES, classifyFoodByBook } from '../../modules/energia-vet/lib/foodTaxonomy'
import { calculateRER } from '../../modules/energia-vet/lib/nutrition'
import { getFoodById } from '../../modules/energia-vet/lib/genutriData'

test('perfis energéticos dos livros cobrem cão e gato', () => {
  assert.ok(getBookEnergyProfiles('dog').length >= 10)
  assert.ok(getBookEnergyProfiles('cat').length >= 7)
})

test('perfil automático respeita idade e castração já informadas', () => {
  assert.equal(getDefaultBookEnergyProfile({ species: 'dog', ageMonths: 3, isNeutered: false }), 'dog_puppy_0_4')
  assert.equal(getDefaultBookEnergyProfile({ species: 'dog', ageMonths: 36, isNeutered: true }), 'dog_adult_neutered')
  assert.equal(getDefaultBookEnergyProfile({ species: 'cat', ageMonths: 36, isNeutered: true }), 'cat_adult_neutered')
})

test('cão adulto castrado usa 1,6 vezes o RER do livro', () => {
  const profile = getBookEnergyProfiles('dog').find((item) => item.id === 'dog_adult_neutered')!
  const rer = calculateRER(15, 'dog')
  const result = calculateBookProfileEnergy({ rer, profile })
  assert.equal(result.factor, 1.6)
  assert.ok(Math.abs(result.kcal - rer * 1.6) < 0.001)
})

test('taxonomia dos livros preserva categorias clínicas e classifica o catálogo', () => {
  assert.ok(BOOK_FOOD_CATEGORIES.includes('Dietas comerciais completas'))
  assert.ok(BOOK_FOOD_CATEGORIES.includes('Carnes, vísceras, ovos e pescados'))
  const food = getFoodById('rc-medium-adult')
  if (food) assert.ok(BOOK_FOOD_CATEGORIES.includes(classifyFoodByBook(food)))
})
