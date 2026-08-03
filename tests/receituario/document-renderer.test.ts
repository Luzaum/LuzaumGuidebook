import assert from 'node:assert/strict';
import test from 'node:test';
import type { ReceituarioDocumentData } from '../../modules/consulta-vet/types/receituario';
import { buildDocumentPlainText, getDocumentSignatureBoxes, hasLegacyPlaceholders, paginateDocument, sanitizeIssuedText, stripTextSignatureSection } from '../../modules/consulta-vet/utils/receituarioDocument';
import { createReceituarioPdf } from '../../modules/consulta-vet/utils/receituarioPdf';

const document = (bodyPlainText: string): ReceituarioDocumentData => ({
  title: 'Termo clínico com acentuação', documentType: 'term',
  identification: { patientName: '', responsibleName: '', species: 'Cão', breed: '', sex: '', age: '', weightKg: '4' },
  header: { clinicName: 'Clínica São Francisco', veterinarianName: 'Dra. Lívia', crmv: '12345', documentDate: '01/08/2026', location: '', time: '' },
  bodyPlainText,
});

test('campos vazios viram A PREENCHER sem chaves ou colchetes', () => {
  const text = buildDocumentPlainText(document('Conduta: {{conduct}}\nRisco: [DESCREVER]'));
  assert.match(text, /A PREENCHER/);
  assert.equal(hasLegacyPlaceholders(text), false);
  assert.equal(/[{}\[\]]/.test(text), false);
});

test('preview curto ocupa uma página e PDF usa a mesma quantidade', () => {
  const value = document('ORIENTAÇÕES\n\nTexto curto com acentuação: cão, reação e órgão.');
  const pages = paginateDocument(value);
  const pdf = createReceituarioPdf(value);
  assert.equal(pages.length, 1);
  assert.equal(pdf.getNumberOfPages(), pages.length);
});

test('texto longo gera duas ou mais folhas A4 e PDF mantém a contagem', () => {
  const body = Array.from({ length: 70 }, (_, index) => `${index + 1}. Linha longa de orientação veterinária com palavras suficientes para testar a quebra automática e evitar vazamento.`).join('\n');
  const value = document(body);
  const pages = paginateDocument(value);
  assert.ok(pages.length >= 2);
  assert.equal(createReceituarioPdf(value).getNumberOfPages(), pages.length);
});

test('a primeira página de receita reserva espaço para identificação e rodapé', () => {
  const value = { ...document(Array.from({ length: 42 }, (_, index) => `Linha ${index + 1} da receita.`).join('\n')), documentType: 'recipe' as const };
  const pages = paginateDocument(value);
  assert.ok(pages.length >= 2);
  assert.ok(pages[0].lines.length <= 36);
  assert.ok(pages.slice(1).every((page) => page.lines.length <= 41));
});

test('assinaturas textuais antigas viram quatro quadros estruturados', () => {
  const prefix = Array.from({ length: 39 }, () => 'Texto clínico de preenchimento.').join('\n');
  const value = document(`${prefix}\n\nRESPONSÁVEL PELO ANIMAL\nNome: A PREENCHER\nCPF: A PREENCHER\nAssinatura: A PREENCHER`);
  const pages = paginateDocument(value);
  assert.equal(pages.some((page) => page.lines.some((line) => line.text.includes('RESPONSÁVEL PELO ANIMAL'))), false);
  assert.equal(getDocumentSignatureBoxes(value).length, 4);
  assert.equal(stripTextSignatureSection(value.bodyPlainText), prefix);
});

test('quadros de assinatura usam identificação editável do termo', () => {
  const value = document('Texto do termo.');
  value.identification = {
    ...value.identification,
    responsibleName: 'Maria Responsável',
    responsibleCpf: '000.000.000-00',
    witness1Name: 'Testemunha Um',
    witness1Cpf: '111.111.111-11',
    witness2Name: 'Testemunha Dois',
    witness2Cpf: '222.222.222-22',
  };
  value.header.veterinarianName = 'Dr. Luís Veterinário';
  value.header.crmv = 'MG 12345';

  const boxes = getDocumentSignatureBoxes(value);
  assert.deepEqual(boxes.map((box) => [box.nameLabel, box.registrationLabel]), [
    ['Maria Responsável', 'CPF: 000.000.000-00'],
    ['Dr. Luís Veterinário', 'CRMV: MG 12345'],
    ['Testemunha Um', 'CPF: 111.111.111-11'],
    ['Testemunha Dois', 'CPF: 222.222.222-22'],
  ]);
  const plainText = buildDocumentPlainText(value);
  assert.match(plainText, /RESPONSÁVEL PELO ANIMAL: Maria Responsável/);
  assert.match(plainText, /TESTEMUNHA 2: Testemunha Dois/);
});

test('sanitização preserva quebras e remove marcadores legados', () => {
  assert.equal(sanitizeIssuedText('A\n\n{{x}}\n[PERÍODO]'), 'A\n\nA PREENCHER\nA PREENCHER');
});
