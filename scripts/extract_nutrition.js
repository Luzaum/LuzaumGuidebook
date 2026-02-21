const fs = require('fs');

const inputFile = 'CalculadoraEnergetica.tsx';
let data = fs.readFileSync(inputFile, 'utf8');
const lines = data.split('\n');

// Extrair factors (linhas 9-36 approx, let's just find by string)
// Extract helper functions
// Extract predefinedFoods
// Extract knowledgeBase

const factorsStart = lines.findIndex(l => l.includes('const factors = {'));
const factorsEnd = lines.findIndex((l, i) => i > factorsStart && l === '};');

const getCalStart = lines.findIndex(l => l.includes('function getCaloriesPerGramOrMl('));
const getCalEnd = lines.findIndex((l, i) => i > getCalStart && l === '}');

const detNutrStart = lines.findIndex(l => l.includes('function determineNutritionProfile('));
const detNutrEnd = lines.findIndex((l, i) => i > detNutrStart && l === '}');

const detCompStart = lines.findIndex(l => l.includes('function determineIsCompleteAndBalanced('));
const detCompEnd = lines.findIndex((l, i) => i > detCompStart && l === '}');

const detReqStart = lines.findIndex(l => l.includes('function determineRequiresVetSupervision('));
const detReqEnd = lines.findIndex((l, i) => i > detReqStart && l === '}');

const getNutrStart = lines.findIndex(l => l.includes('function getNutritionProfileBadge('));
const getNutrEnd = lines.findIndex((l, i) => i > getNutrStart && l === '}');

const prefStart = lines.findIndex(l => l.includes('const predefinedFoods = ['));
const prefEnd = lines.findIndex((l, i) => i > prefStart && l === '];');

const knowStart = lines.findIndex(l => l.includes('const knowledgeBase = {'));
const knowEnd = lines.findIndex((l, i) => i > knowStart && l === '};');

// Combine into utils/nutritionUtils.ts
const utilsContent = `import type { CommercialFood } from '../data/types/commercialFood';
import type { FoodItem, NutritionProfile, CaloriesInfo } from '../data/types/foodTypes';

${lines.slice(factorsStart, factorsEnd + 1).join('\n')}
export { factors };

${lines.slice(getCalStart, getCalEnd + 1).join('\n').replace('function', 'export function')}

${lines.slice(detNutrStart, detNutrEnd + 1).join('\n').replace('function', 'export function')}

${lines.slice(detCompStart, detCompEnd + 1).join('\n').replace('function', 'export function')}

${lines.slice(detReqStart, detReqEnd + 1).join('\n').replace('function', 'export function')}

${lines.slice(getNutrStart, getNutrEnd + 1).join('\n').replace('function', 'export function')}
`;

fs.writeFileSync('utils/nutritionUtils.ts', utilsContent);

// Combine into data/foodsPredefined.ts
const predefContent = `import type { FoodItem } from './types/foodTypes';

export ${lines.slice(prefStart, prefEnd + 1).join('\n')}
`;
fs.writeFileSync('data/foodsPredefined.ts', predefContent);

// Combine into data/nutritionKnowledge.ts
const knowContent = `export ${lines.slice(knowStart, knowEnd + 1).join('\n')}
`;
fs.writeFileSync('data/nutritionKnowledge.ts', knowContent);

// Replace in CalculadoraEnergetica.tsx
// From factorsStart to knowEnd+1
const before = lines.slice(0, factorsStart);
const after = lines.slice(knowEnd + 1);

const imports = [
    "import { factors, getCaloriesPerGramOrMl, determineNutritionProfile, determineIsCompleteAndBalanced, determineRequiresVetSupervision, getNutritionProfileBadge } from './utils/nutritionUtils';",
    "import { predefinedFoods } from './data/foodsPredefined';",
    "import { knowledgeBase } from './data/nutritionKnowledge';"
];

const newContent = [...before, ...imports, ...after].join('\n');
fs.writeFileSync('CalculadoraEnergetica.tsx', newContent);

console.log('Extraction complete!');
