import assert from 'node:assert/strict';
import test from 'node:test';
import { commercialOticProductsSeed } from '../../modules/consulta-vet/data/commercialOticProducts.seed';
import {
  auditCommercialLabelDose,
  hasPracticalLabelDoseText,
  resolveCommercialLabelDose,
} from '../../modules/consulta-vet/utils/commercialLabelDose';

const STRICT_DEFERRAL_PATTERN =
  /(conforme (a )?(bula|faixa|orienta[çc][aã]o|crit[ée]rio|prescri[çc][aã]o|apresenta[çc][aã]o|esp[ée]cie|peso|idade|quadro|resposta|protocolo|r[óo]tulo|medidor)|indicado na bula|tabela.{0,20}bula|definido em bula|seguindo.{0,15}bula|bula do fabricante|ver(ificar)? (a )?bula|validar ficha|ficha t[ée]cnica|a crit[ée]rio|sob orienta[çc][aã]o|n[úu]mero de borrifadas indicado|gradua[çc][aã]o correspondente ao peso|dose do medidor\/r[óo]tulo|apresenta[çc][aã]o escolhida)/i;

test('catálogo comercial tem cobertura integral de labelDose prática', () => {
  const audits = commercialOticProductsSeed.map(auditCommercialLabelDose);
  const ok = audits.filter((item) => item.finalStatus === 'ok');
  const failing = audits.filter((item) => item.finalStatus !== 'ok').map((item) => `${item.id}:${item.finalStatus}`);
  assert.equal(ok.length, audits.length, `Produtos sem labelDose prática: ${failing.join(', ')}`);
});

test('nenhum produto comercial delega dosagem ou modo de uso para a bula ou texto genérico', () => {
  const offending: string[] = [];

  for (const product of commercialOticProductsSeed) {
    const fields: Array<[string, string | undefined]> = [
      ['dosageGuidance.labelDose', product.dosageGuidance?.labelDose],
      ['dosageGuidance.administrationNotes', product.dosageGuidance?.administrationNotes],
      ['labelDirections', product.labelDirections],
      ['prescriptionExample', product.prescriptionExample],
    ];

    for (let i = 0; i < (product.presentations?.length ?? 0); i++) {
      const pres = product.presentations[i] as string | { label?: string; notes?: string };
      if (typeof pres === 'string') {
        fields.push([`presentations[${i}]`, pres]);
      } else if (pres) {
        fields.push([`presentations[${i}].label`, pres.label]);
        fields.push([`presentations[${i}].notes`, pres.notes]);
      }
    }

    for (const [fieldName, value] of fields) {
      if (value && STRICT_DEFERRAL_PATTERN.test(value)) {
        offending.push(`${product.id}.${fieldName}: ${value}`);
      }
    }
  }

  assert.deepEqual(offending, []);
});

test('todos os endoparasiticidas, ectoparasiticidas e antiprotozoários expõem elegibilidade mínima (idade e peso)', () => {
  const parasiticides = commercialOticProductsSeed.filter(
    (product) =>
      product.commercialClass === 'parasiticide' ||
      product.commercialSubclass === 'gi_antiprotozoal' ||
      (product.commercialSubclasses ?? []).includes('gi_antiprotozoal'),
  );

  assert.ok(parasiticides.length >= 55, `Esperados >= 55 parasiticidas, encontrados ${parasiticides.length}`);

  const missing = parasiticides
    .filter((product) => !product.eligibility?.minAge?.trim() || !product.eligibility?.minWeight?.trim())
    .map((product) => product.id);

  assert.deepEqual(missing, []);
});

test('Semintra expõe dose de bula em mg/kg e mL/kg', () => {
  const semintra = commercialOticProductsSeed.find((item) => item.id === 'semintra-boehringer')!;
  const labelDose = resolveCommercialLabelDose(semintra)!;
  assert.match(labelDose, /1 mg\/kg/i);
  assert.match(labelDose, /0,25 mL\/kg/i);
  assert.ok(hasPracticalLabelDoseText(labelDose));
});

test('textos genéricos de bula continuam bloqueados', () => {
  assert.ok(!hasPracticalLabelDoseText('Semintra 4 mg/mL: dose conforme indicação registrada/local'));
  assert.ok(!hasPracticalLabelDoseText('Cães: seguir bula/apresentação veterinária'));
});

test('texto com dose prática não é bloqueado por frase genérica no mesmo campo', () => {
  const mixed =
    'Bula humana: dose individualizada. Uso veterinario extra-label: gatos 1 UI/gato SC q12h; cães 0,25-0,5 UI/kg SC q12h.';
  assert.ok(hasPracticalLabelDoseText(mixed));
});
