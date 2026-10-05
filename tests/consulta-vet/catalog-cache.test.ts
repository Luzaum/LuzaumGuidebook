import assert from 'node:assert/strict';
import test from 'node:test';
import { CatalogCache } from '../../modules/consulta-vet/services/catalogCache';

test('concurrent navigation shares a catalog request and reuses its result', async () => {
  const cache = new CatalogCache<string[]>();
  let calls = 0;
  let finish!: (data: string[]) => void;
  const loader = () => {
    calls++;
    return new Promise<string[]>((resolve) => { finish = resolve; });
  };
  const first = cache.load(false, loader);
  const second = cache.load(false, loader);
  assert.equal(first, second);
  await Promise.resolve();
  finish(['catalog']);
  assert.deepEqual(await first, ['catalog']);
  assert.deepEqual(await cache.load(false, loader), ['catalog']);
  assert.equal(calls, 1);
});

test('public and editorial requests stay separate, and saves invalidate both', async () => {
  const cache = new CatalogCache<string[]>();
  await cache.load(true, async () => ['draft']);
  assert.deepEqual(await cache.load(false, async () => ['published']), ['published']);
  cache.clear();
  assert.deepEqual(await cache.load(true, async () => ['updated']), ['updated']);
  assert.deepEqual(await cache.load(false, async () => ['new published']), ['new published']);
});

test('failed loads can be retried', async () => {
  const cache = new CatalogCache<string[]>();
  await assert.rejects(cache.load(false, async () => { throw new Error('offline'); }));
  assert.deepEqual(await cache.load(false, async () => ['recovered']), ['recovered']);
});

test('expiration starts after completion; invalidated requests cannot overwrite fresh data', async (context) => {
  context.mock.timers.enable({ apis: ['Date'], now: 1000 });
  const cache = new CatalogCache<string[]>(100);
  let finish!: (data: string[]) => void;
  const pending = cache.load(false, () => new Promise((resolve) => { finish = resolve; }));
  await Promise.resolve();
  context.mock.timers.setTime(2000);
  finish(['old']);
  await pending;
  context.mock.timers.setTime(2099);
  assert.deepEqual(await cache.load(false, async () => ['too early']), ['old']);
  context.mock.timers.setTime(2100);
  assert.deepEqual(await cache.load(false, async () => ['expired']), ['expired']);

  cache.clear();
  const oldRequest = cache.load(false, () => new Promise((resolve) => { finish = resolve; }));
  await Promise.resolve();
  cache.clear();
  await cache.load(false, async () => ['fresh']);
  finish(['obsolete']);
  await oldRequest;
  assert.deepEqual(await cache.load(false, async () => ['unexpected']), ['fresh']);
});
