import { expect, test } from '@jest/globals';
import Daemon from '../../characters/Daemon';

test('create-Daemon', () => {
  expect(new Daemon(4)).toEqual({
    attack: 10,
    attackDistance: 4,
    defence: 10,
    health: 50,
    level: 4,
    moveDistance: 1,
    type: 'Daemon',
  });
});
