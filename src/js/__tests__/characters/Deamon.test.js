import { expect, jest, test } from '@jest/globals';
import Daemon from '../../characters/Daemon';

jest.mock('../../characters/Daemon', () => jest.fn().mockImplementation((level) => {
  if (level < 1) {
    throw new Error('Invalid level');
  }
  return {
    level,
    attack: 10,
    attackDistance: 4,
    defence: 10,
    health: 50,
    moveDistance: 1,
    type: 'Daemon',
  };
}));
test('create-Daemon', () => {
  expect(new Daemon(1)).toEqual({
    attack: 10,
    attackDistance: 4,
    defence: 10,
    health: 50,
    level: 1,
    moveDistance: 1,
    type: 'Daemon',
  });
});

test('invalid-level', () => {
  expect(() => new Daemon(-1)).toThrow(
    'Invalid level',
  );
});
