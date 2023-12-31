/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, attack, defence, type = 'generic') {
    if (new.target.name === 'Character') {
      throw Error('Direct call to new Character() is not allowed');
    } else if (level < 1) {
      throw new Error('Invalid level');
    }

    this.level = level;
    this.attack = attack;
    this.defence = defence;
    this.health = 50;
    this.type = type;
    this.setLevelStats(level);
  }

  levelUp() {
    this.level++;
    this.attack = Math.floor(Math.max(this.attack, this.attack * ((80 + this.health) / 100)));
    this.health = (this.health + 30 < 100) ? this.health + 30 : 100;
  }

  setLevelStats(level) {
    this.attack = Math.floor(this.attack * (1 + (level - 1) / 10));
    this.defence = Math.floor(this.defence * (1 + (level - 1) / 10));
  }
}
