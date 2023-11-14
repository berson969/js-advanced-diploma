import Character from '../Character';

class Undead extends Character {
  constructor(level) {
    super(level, 40, 10, 'Undead');
    this.moveDistance = 4;
    this.attackDistance = 1;
  }
}

export default Undead;
