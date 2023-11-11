import { expect, test } from '@jest/globals';
import Character from '../Character';

test('error is thrown for direct instantiation', () => {
  expect(() => new Character(1)).toThrow(
    'Direct call to new Character() is not allowed',
  );
});
