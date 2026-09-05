import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
function load(file) {
  const mod = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { module: mod, exports: mod.exports, require: name => load(path.resolve(path.dirname(file), `${name}.ts`)) });
  return mod.exports;
}
const { emptyBrief, subtotal, deliveryRisk, tripSuggestions } = load('src/data/marketplace.ts');
test('cross-store suggestions stay within inclusive merchandise budget', () => {
  const trip = tripSuggestions({ ...emptyBrief, budget: '203', size: 'M' });
  assert.equal(trip.length, 2);
  assert.equal(trip.reduce((sum,p) => sum + p.price,0), 203);
  assert.equal(new Set(trip.map(p => p.storeId)).size, 2);
  assert.equal(tripSuggestions({ ...emptyBrief, budget: '202' }).length, 1);
  assert.equal(tripSuggestions({ ...emptyBrief, budget: '100' }).length, 0);
  assert.equal(tripSuggestions({ ...emptyBrief, size: 'XL' }).length, 0);
});
test('cart subtotal counts quantities and separate size variants', () => {
  assert.equal(subtotal([{productId:1,size:'S',quantity:2},{productId:1,size:'M',quantity:1},{productId:4,size:'One size',quantity:1}]),711);
  assert.equal(subtotal([]),0);
});
test('delivery flags missing context, passed dates, and deadline boundary', () => {
  const now = new Date('2026-09-05T20:00:00Z');
  const brief = { ...emptyBrief, destination: 'Atlanta, GA', eventDate:'2026-09-15' };
  assert.match(deliveryRisk(emptyBrief,10,now), /destination/);
  assert.match(deliveryRisk({...brief,eventDate:''},10,now), /event date/);
  assert.match(deliveryRisk(brief,10,now), /At risk/);
  assert.match(deliveryRisk({...brief,eventDate:'2026-09-16'},10,now), /1 days/);
  assert.match(deliveryRisk({...brief,eventDate:'2026-09-04'},10,now), /passed/);
});
