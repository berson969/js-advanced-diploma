import { expect, test } from '@jest/globals';
import { characterGenerator, generateTeam } from '../generators';

test('generates a character with the correct level', () => {
  const allowedTypes = ['Undead', 'Daemon', 'Vampire', 'Zombie'];
  const maxLevel = 4;
  const character = characterGenerator(allowedTypes, maxLevel).next().value;
  expect(character.level).toBeGreaterThanOrEqual(1);
  expect(character.level).toBeLessThanOrEqual(maxLevel);
  expect(allowedTypes).toContain(character.type);
});

test('generates a team with the correct number of characters', () => {
  const allowedTypes = ['Bowman', 'Swordsman', 'Magician'];
  const maxLevel = 3;
  const characterCount = 3;
  const team = generateTeam(allowedTypes, maxLevel, characterCount);
  expect(team.members.size).toBe(3);
  expect(team.toArray().every((character) => allowedTypes.includes(character.type))).toBe(true);
});
