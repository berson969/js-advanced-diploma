import Team from './Team';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const randomType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const randLevel = Math.ceil(Math.random() * maxLevel);
  const CharacterClass = require(`./characters/${randomType}`).default;
  yield new CharacterClass(randLevel);
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде -
 * characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const characters = Array.from(
    { length: characterCount },
    () => characterGenerator(allowedTypes, maxLevel).next().value,
  );
  return new Team(characters);
}
