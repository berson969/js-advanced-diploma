import { expect, test } from '@jest/globals';
import PositionedCharacter from '../PositionedCharacter';
import Bowman from '../characters/Bowman';

test('open-positionedCharacter', () => {
  const character = new Bowman(1);
  expect(new PositionedCharacter(character, 1)).toEqual({
    character: {
      attack: 25,
      attackDistance: 2,
      defence: 25,
      health: 50,
      level: 1,
      moveDistance: 2,
      type: 'Bowman',
    },
    position: 1,
  });
});

test('open-with-wrong-position', () => {
  const character = new Bowman(1);
  expect(() => new PositionedCharacter(character, 'Bowman')).toThrow(
    'position must be a number',
  );
});

test('open-with-wrong-Character', () => {
  expect(() => new PositionedCharacter('character', 1)).toThrow(
    'character must be instance of Character or its children',
  );
});
