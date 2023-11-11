import Character from '../Character';

class Undead extends Character {
  constructor(level) {
    super(level, 'Undead');
    this.attack = 40;
    this.defence = 10;
    this.moveDistance = 4;
    this.attackDistance = 1;
  }
}

export default Undead;
