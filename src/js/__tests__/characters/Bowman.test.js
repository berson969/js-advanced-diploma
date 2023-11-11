import { expect, test } from '@jest/globals';
import Bowman from '../../characters/Bowman';

test('create-Bowman', () => {
  expect(new Bowman(3)).toEqual({
    attack: 25,
    attackDistance: 2,
    defence: 25,
    health: 50,
    level: 3,
    moveDistance: 2,
    type: 'Bowman',
  });
});

test('invalid-level', () => {
  expect(() => Bowman(-1)).toThrow(Error);
});
