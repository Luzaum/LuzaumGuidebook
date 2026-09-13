import fs from 'node:fs';

const filePath = 'modules/consulta-vet/data/publicCatalogCardStubs.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const marker = 'export const PUBLIC_CATALOG_MEDICATION_CARD_STUBS: MedicationRecord[] = [';
const idx = content.indexOf(marker);
if (idx === -1) {
  console.error('Marker not found!');
  process.exit(1);
}

const before = content.slice(0, idx);

const newStub = `export const PUBLIC_CATALOG_MEDICATION_CARD_STUBS: MedicationRecord[] = [
  medicationListCard({
    id: 'med-dipirona',
    slug: 'dipirona',
    title: 'Dipirona (metamizol)',
    activeIngredient: 'Dipirona monoidratada (metamizol sódico)',
    tradeNames: [
      'Novalgina Gotas 500 mg/mL (Opella / Sanofi)',
      'Novalgina Comprimidos 500 mg e 1.000 mg (Opella)',
      'Dipirona Gotas 500 mg/mL (Genéricos Medley, EMS, Neo Química)',
      'D-500 Injetável 500 mg/mL (Zoetis)',
      'Analgésico Calbos Injetável 500 mg/mL',
    ],
    pharmacologicClass: 'Analgésico, antipirético e antiespasmódico não-opioide (AINE atípico)',
    species: ['dog', 'cat'],
    category: 'terapeutica-geral',
    tags: ['Dipirona', 'Metamizol', 'Analgesia multimodal', 'Antipirético', 'Dor visceral', "Plumb's 10ª ed."],
    indications: [
      'Controle de dor pós-operatória somática e visceral em cães e gatos.',
      'Alívio da dor visceral aguda e espasmos da musculatura lisa (pancreatite, cólica gastrointestinal).',
      'Controle sintomático da pirexia (febre) refratária de origem infecciosa ou inflamatória.',
      'Analgesia adjuvante em trauma musculoesquelético e afecções espinhais (DDIV).',
      'Alívio do espasmo uretral e dor vesical aguda em felinos (DTUIF) e cães.',
    ],
  }),
];
`;

fs.writeFileSync(filePath, before + newStub, 'utf-8');
console.log('Successfully updated publicCatalogCardStubs.ts');
