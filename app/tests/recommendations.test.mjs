import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import fs from 'node:fs';
import vm from 'node:vm';
function load(file) {
  const loadedModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { module: loadedModule, exports: loadedModule.exports, require: () => load('src/data/products.ts') });
  return loadedModule.exports;
}
const { recommend } = load('src/data/recommendations.ts');
const ids = (query) => Array.from(recommend(query).products, p => p.id);
test('strict and inclusive budgets respect the price boundary', () => {
  assert.deepEqual(ids('under $199'), [2]);
  assert.deepEqual(ids('up to $199'), [3, 2]);
  assert.deepEqual(ids('budget $100'), []);
});
test('type filters and occasion ranking use catalog facts', () => {
  assert.deepEqual(ids('wedding under $300'), [1, 3, 2]);
  assert.deepEqual(ids('party outfit'), [2, 3, 1]);
  assert.deepEqual(ids('saree under $300'), [3]);
  assert.deepEqual(ids('anarkali under $200'), [2]);
  assert.deepEqual(ids("men's wedding wear under $250"), []);
});
test('foreign currency is not treated as USD', () => {
  assert.equal(ids('under ₹200').length, 3);
  assert.match(recommend('under ₹200').notice, /not applied/);
});
test('explanations describe actual matches and mismatches', () => {
  const result = recommend('wedding under $200');
  assert.match(result.reason(result.products[0]), /not verified/);
  assert.match(result.reason(result.products[0]), /under your \$200/);
  assert.doesNotMatch(result.reason(result.products[0]), /daughter/);
});
