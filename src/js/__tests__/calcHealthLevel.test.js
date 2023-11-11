import { expect, test } from '@jest/globals';
import { calcHealthLevel } from '../utils';

test('health-level-critical', () => {
  expect(calcHealthLevel(12)).toBe('critical');
});
test('health-level-normal', () => {
  expect(calcHealthLevel(32)).toBe('normal');
});
test('health-level-high', () => {
  expect(calcHealthLevel(99)).toBe('high');
});
