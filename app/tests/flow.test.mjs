import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import fs from 'node:fs';
import vm from 'node:vm';
const loaded = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/data/flow.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { module: loaded, exports: loaded.exports });
const { assessDelivery, initialJourney } = loaded.exports;
const now = new Date('2026-09-05T18:00:00Z');
test('missing inputs never imply delivery confidence', () => {
  assert.equal(assessDelivery('', 'Atlanta', initialJourney, now).risk, 'Unknown');
  assert.equal(assessDelivery('2026-09-20', '', initialJourney, now).risk, 'Unknown');
  assert.equal(assessDelivery('invalid', 'Atlanta', initialJourney, now).risk, 'Unknown');
});
test('deadline risk accounts for uncertainty and buffer', () => {
  assert.equal(assessDelivery('2026-09-13', 'Atlanta', initialJourney, now).risk, 'High risk');
  assert.equal(assessDelivery('2026-09-17', 'Atlanta', initialJourney, now).risk, 'Tight window');
  assert.equal(assessDelivery('2026-09-25', 'Atlanta', initialJourney, now).risk, 'More buffer');
  assert.equal(assessDelivery('2026-09-05', 'Atlanta', initialJourney, now).risk, 'Event passed / today');
});
test('delay and expedite scenarios adjust ranges, never promise arrival', () => {
  const base = assessDelivery('2026-09-15', 'Atlanta', initialJourney, now);
  const delayed = assessDelivery('2026-09-15', 'Atlanta', { ...initialJourney, delayDays: 2 }, now);
  const expedited = assessDelivery('2026-09-15', 'Atlanta', { ...initialJourney, expedited: true }, now);
  assert.equal(delayed.high, base.high + 2);
  assert.equal(expedited.high, base.high - 2);
  assert.match(base.recommendation, /cannot guarantee/);
});
test('delivered scenario clears remaining time despite prior delays', () => {
  const result = assessDelivery('2026-09-20', 'Atlanta', { ...initialJourney, stage: 7, delayDays: 6 }, now);
  assert.equal(result.low, 0);
  assert.equal(result.high, 0);
  assert.equal(result.risk, 'Delivered in simulation');
});
