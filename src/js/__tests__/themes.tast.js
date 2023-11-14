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
