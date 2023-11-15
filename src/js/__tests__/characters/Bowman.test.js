import { expect, jest, test } from '@jest/globals';
import Bowman from '../../characters/Bowman';

jest.mock('../../characters/Bowman', () => jest.fn().mockImplementation((level) => {
  if (level < 1) {
    throw new Error('Invalid level');
  }
  return {
    level,
    attack: 30,
    attackDistance: 2,
    defence: 30,
    health: 50,
    moveDistance: 2,
    type: 'Bowman',
  };
}));

test('create-Bowman', () => {
  expect(new Bowman(3)).toEqual({
    attack: 30,
    attackDistance: 2,
    defence: 30,
    health: 50,
    level: 3,
    moveDistance: 2,
    type: 'Bowman',
  });
});

test('invalid-level', () => {
  expect(() => new Bowman(-1)).toThrow(Error);
});
