import fs from 'node:fs/promises';
import { parseImportPayload } from './modules/consulta-vet/services/import/importNormalizers.ts';
import { runValidation } from './modules/consulta-vet/services/import/importValidators.ts';
const raw = await fs.readFile('./examples/medication.import.example.json', 'utf8');
const items = parseImportPayload(raw);
const result = runValidation(items, 'medications');
console.log(JSON.stringify({ valid: result.validItems.length, invalid: result.invalidItems.length, errors: result.allErrors }, null, 2));
