import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { SEEDED_TEMPLATES } from '../modules/consulta-vet/data/receituarioSeed';
import type { ReceituarioDocumentData } from '../modules/consulta-vet/types/receituario';
import { normalizeLegacyDocumentBody } from '../modules/consulta-vet/utils/receituarioDocument';
import { createReceituarioPdf } from '../modules/consulta-vet/utils/receituarioPdf';

const template = SEEDED_TEMPLATES.find((item) => item.id === 'term-geral-recusa');
if (!template) throw new Error('Modelo de termo geral de recusa não encontrado.');

const bodyPlainText = normalizeLegacyDocumentBody(template.body_plain_text).replace(
  'A PREENCHER',
  'Internação veterinária com fluidoterapia e monitorização contínua',
);
const document: ReceituarioDocumentData = {
  title: template.title,
  documentType: 'term',
  identification: {
    patientName: 'Paciente exemplo', responsibleName: 'Responsável exemplo', species: 'Cão',
    breed: 'Sem raça definida', sex: 'Macho', age: '8 anos', weightKg: '10',
  },
  header: {
    clinicName: 'Clínica Veterinária', veterinarianName: 'Dr(a). Exemplo', crmv: '00000',
    documentDate: '01/08/2026', location: 'Belo Horizonte - MG', time: '14:30',
  },
  bodyPlainText,
};

const output = resolve('output/pdf/receituario-termo-recusa-sample.pdf');
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, Buffer.from(createReceituarioPdf(document).output('arraybuffer')));
console.log(output);
