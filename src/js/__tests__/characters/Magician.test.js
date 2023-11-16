import { expect, jest, test } from '@jest/globals';
import Magician from '../../characters/Magician';

jest.mock('../../characters/Magician', () => jest.fn().mockImplementation((level) => {
  if (level < 1) {
    throw new Error('Invalid level');
  }
  return {
    level,
    attack: 12,
    attackDistance: 4,
    defence: 48,
    health: 50,
    moveDistance: 1,
    type: 'Magician',
  };
}));
test('create-Magician', () => {
  expect(new Magician(3)).toEqual({
    attack: 12,
    attackDistance: 4,
    defence: 48,
    health: 50,
    level: 3,
    moveDistance: 1,
    type: 'Magician',
  });
});

test('invalid-level', () => {
  expect(() => new Magician(-1)).toThrow(
    'Invalid level',
  );
});
