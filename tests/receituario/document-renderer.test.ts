import assert from 'node:assert/strict';
import test from 'node:test';
import type { ReceituarioDocumentData } from '../../modules/consulta-vet/types/receituario';
import { buildDocumentPlainText, hasLegacyPlaceholders, paginateDocument, sanitizeIssuedText } from '../../modules/consulta-vet/utils/receituarioDocument';
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

test('blocos curtos de assinatura não vazam da página', () => {
  const prefix = Array.from({ length: 39 }, () => 'Texto clínico de preenchimento.').join('\n');
  const pages = paginateDocument(document(`${prefix}\n\nRESPONSÁVEL PELO ANIMAL\nNome: A PREENCHER\nCPF: A PREENCHER\nAssinatura: A PREENCHER`));
  const signaturePage = pages.find((page) => page.lines.some((line) => line.text.includes('RESPONSÁVEL PELO ANIMAL')));
  assert.ok(signaturePage);
  assert.ok(signaturePage!.lines.some((line) => line.text.includes('Assinatura')));
});

test('sanitização preserva quebras e remove marcadores legados', () => {
  assert.equal(sanitizeIssuedText('A\n\n{{x}}\n[PERÍODO]'), 'A\n\nA PREENCHER\nA PREENCHER');
});
