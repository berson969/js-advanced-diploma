import { expect, test } from '@jest/globals';
import themes from '../themes';

test('themes', () => {
  expect(themes).toEqual({
    arctic: 'arctic',
    desert: 'desert',
    mountain: 'mountain',
    prairie: 'prairie',
  });
});

test('get-fifth-theme', () => {
  const level = 5;
  expect(Object.values(themes)[(level - 1) % 4]).toBe(
    'prairie',
  );
});

test('get-second-theme', () => {
  const level = 2;
  expect(Object.values(themes)[(level - 1) % 4]).toBe(
    'desert',
  );
});

test('get-third-theme', () => {
  const level = 3;
  expect(Object.values(themes)[(level - 1) % 4]).toBe(
    'arctic',
  );
});

test('get-fourth-theme', () => {
  const level = 4;
  expect(Object.values(themes)[(level - 1) % 4]).toBe(
    'mountain',
  );
});
