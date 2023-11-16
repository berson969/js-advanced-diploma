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

test('create-Daemon-with-another-props', () => {
  const daemon = new Daemon(1);
  daemon.health = 100;
  daemon.moveDistance = 2;
  daemon.attackDistance = 2;
  daemon.attack = 20;
  expect(daemon).toEqual({
    attack: 20,
    attackDistance: 2,
    defence: 10,
    health: 100,
    level: 1,
    moveDistance: 2,
    type: 'Daemon',
  });
});

test('invalid-level', () => {
  expect(() => new Daemon(-1)).toThrow(
    'Invalid level',
  );
});
