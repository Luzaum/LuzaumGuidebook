import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { PRODUCT_GUIDES } from '../modules/transfusao-sanguinea/data/products';
import { PRODUCT_CATEGORIES, productHelp, protocolFor } from '../modules/transfusao-sanguinea/data/productProtocols';

test('every product belongs to exactly one category and has its generated icon', () => {
  for (const product of PRODUCT_GUIDES) {
    assert.equal(PRODUCT_CATEGORIES.filter(category => (category.products as readonly string[]).includes(product.id)).length, 1);
    assert.ok(existsSync(`public/assets/transfusion/icons/${product.id}.png`));
    assert.equal(Object.keys(productHelp(product)).length, 6);
    for (const entry of Object.values(productHelp(product))) {
      assert.ok(entry.content.length > 80);
      assert.ok(entry.sources?.length);
      assert.ok(!entry.content.includes('undefined'));
    }
  }
});
test('protocol and quantity rules follow the preparation, without generic albumin dosing', () => {
  const get = (id: string) => PRODUCT_GUIDES.find(p => p.id === id)!;
  assert.match(protocolFor(get('cryo')).quantity, /200 mL/);
  assert.match(protocolFor(get('rbc')).quantity, /VG\/Ht real/);
  assert.match(protocolFor(get('platelets')).doseLabel, /plaquetário/);
  for (const id of ['human-albumin', 'canine-albumin', 'canine-albumin-cat']) {
    assert.ok(protocolFor(get(id)).albumin);
    assert.equal(get(id).dose, undefined);
    assert.match(protocolFor(get(id)).quantity, /concentração/);
  }
  assert.deepEqual(get('canine-albumin-cat').species, ['cat']);
});
