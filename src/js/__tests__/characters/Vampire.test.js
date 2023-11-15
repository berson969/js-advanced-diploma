import { expect, test } from '@jest/globals';
import Vampire from '../../characters/Vampire';

test('create-Vampire', () => {
  const vampire = new Vampire(4);
  vampire.health = 50;
  expect(vampire).toEqual({
    attack: 32,
    attackDistance: 2,
    defence: 32,
    health: 50,
    level: 4,
    moveDistance: 2,
    type: 'Vampire',
  });
});
