const fs = require('fs');
const path = require('path');

const drugsFilePath = path.join(__dirname, '../modules/crivet/data/drugs.ts');
const drugsDir = path.join(__dirname, '../modules/crivet/data/drugs');
const registryPath = path.join(__dirname, '../modules/crivet/utils/drugProfileRegistry.ts');

const drugsContent = fs.readFileSync(drugsFilePath, 'utf8');

// Regex simplificado para extrair objetos de drugs
// Procura por id: '...', name: '...', category: '...', hasCRI: ..., concentrations: [...]
const drugRegex = /{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',[\s\S]*?hasCRI:\s*(true|false),[\s\S]*?concentrations:\s*\[([^\]]*)\],/g;

let match;
const allDrugs = [];

while ((match = drugRegex.exec(drugsContent)) !== null) {
    const [_, id, name, category, hasCRIStr, concentrationsStr] = match;
    const concentrations = concentrationsStr.split(',').map(s => s.trim()).filter(s => s.length > 0).map(Number);

    allDrugs.push({
        id,
        name,
        category,
        hasCRI: hasCRIStr === 'true',
        concentrations
    });
}

console.log(`Encontrados ${allDrugs.length} fármacos no drugs.ts`);

const newFiles = [];

allDrugs.forEach(drug => {
    const variableName = `${drug.id.replace(/-./g, x => x[1].toUpperCase())}Profile`; // camelCase
    const fileName = `${drug.id}.profile.ts`;
    const filePath = path.join(drugsDir, fileName);

    if (fs.existsSync(filePath)) {
        console.log(`Profile já existe para ${drug.id}, pulando.`);
        return;
    }

    console.log(`Criando: ${fileName}`);

    const concentrationsArray = drug.concentrations.map(c => `{ concentration: ${c}, unit: 'mg/ml' }`).join(',\n    ');

    const content = `import type { DrugProfile } from '../../types/drugProfile'

export const ${variableName}: DrugProfile = {
  drug_id: '${drug.id}',
  name_pt: '${drug.name}',
  name_en: '',
  class: ['${drug.category}'],
  
  core_concepts: {
    taglines: [],
    mechanism: {
      receptors_targets: [],
      primary_effects: {}
    },
    pharmacodynamics: {
      onset_iv: '',
      peak: '',
      duration: ''
    },
    pharmacokinetics: {
      metabolism: '',
      excretion: '',
      dog_vs_cat: ''
    }
  },

  indications: {
    primary: [],
    secondary: [],
    when_to_use: ''
  },
  
  contraindications: {
    absolute: [],
    relative: []
  },

  doses: {
    unit_standard_cri: '${drug.hasCRI ? "mcg/kg/min" : ""}',
    dog: {
      ${drug.hasCRI ? 'cri: {\n        mcgkgmin: { min: 0, max: 0, note: "" },\n        mgkgh: { min: 0, max: 0, note: "" }\n      },' : ''}
      bolus: {
        mgkg: { min: 0, max: 0, note: "" }
      }
    },
    cat: {
      ${drug.hasCRI ? 'cri: {\n        mcgkgmin: { min: 0, max: 0, note: "" },\n        mgkgh: { min: 0, max: 0, note: "" }\n      },' : ''}
      bolus: {
        mgkg: { min: 0, max: 0, note: "" }
      }
    }
  },

  presentations: [
    ${concentrationsArray}
  ],

  dilution_and_preparation: {
    diluents_allowed: ['NaCl 0,9%', 'Ringer Lactato', 'Glicose 5%'],
    recommended_targets: [],
    max_concentration: '${drug.concentrations[0] ? drug.concentrations[0] + " mg/ml" : ""}'
  },

  compatibility: {
    incompatible: [],
    avoid_same_syringe_or_precipitation_risk: []
  },

  alerts_by_comorbidity: [],
  
  presets: [],
  
  references: []
}
`;

    fs.writeFileSync(filePath, content);
    newFiles.push({ id: drug.id, variableName, fileName });
});

// Agora atualizar o registry
if (newFiles.length > 0) {
    console.log('\n--- ATUALIZAÇÃO NECESSÁRIA NO REGISTRY ---');
    console.log('Adicione estas importações em modules/crivet/utils/drugProfileRegistry.ts:');
    newFiles.forEach(f => {
        console.log(`import { ${f.variableName} } from '../data/drugs/${f.fileName.replace('.ts', '')}'`);
    });

    console.log('\nE adicione ao objeto DRUG_PROFILE_REGISTRY:');
    newFiles.forEach(f => {
        console.log(`  ${f.id}: ${f.variableName} as Partial<DrugProfile>,`);
    });
} else {
    console.log('\nNenhum perfil novo criado.');
}
