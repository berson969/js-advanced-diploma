import { test, expect } from '@jest/globals';
import { calcTileType } from '../utils';

test('top-left', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});
test('top-right', () => {
  expect(calcTileType(7, 8)).toBe('top-right');
});
test('bottom-left', () => {
  const type = calcTileType(56, 8);
  expect(type).toBe('bottom-left');
});
test('bottom-right', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});
test('top', () => {
  const type = calcTileType(2, 8);
  expect(type).toBe('top');
});
test('left', () => {
  expect(calcTileType(8, 8)).toBe('left');
});
test('right', () => {
  expect(calcTileType(23, 8)).toBe('right');
});
test('bottom', () => {
  expect(calcTileType(58, 8)).toBe('bottom');
});
test('center', () => {
  expect(calcTileType(50, 8)).toBe('center');
});
test('bottom-6', () => {
  expect(calcTileType(33, 6)).toBe('bottom');
});
test('left-9', () => {
  expect(calcTileType(18, 9)).toBe('left');
});
