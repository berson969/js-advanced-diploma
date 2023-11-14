import { expect, test } from '@jest/globals';
import Daemon from '../../characters/Daemon';

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
