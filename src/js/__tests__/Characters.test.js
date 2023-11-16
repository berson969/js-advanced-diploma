import { expect, test } from '@jest/globals';
import Character from '../Character';
import Bowman from '../characters/Bowman';

test('error is thrown for direct instantiation', () => {
  expect(() => new Character(1)).toThrow(
    'Direct call to new Character() is not allowed',
  );
});

test('levelUp', () => {
  const bowman = new Bowman(1);
  bowman.levelUp();
  expect(bowman).toEqual(
    {
      attack: 32,
      attackDistance: 2,
      defence: 25,
      health: 100,
      level: 2,
      moveDistance: 2,
      type: 'Bowman',
    },
  );
});

test('setLevelStats', () => {
  expect(new Bowman(4)).toEqual({
    attack: 32,
    attackDistance: 2,
    defence: 32,
    health: 50,
    level: 4,
    moveDistance: 2,
    type: 'Bowman',
  });
});
