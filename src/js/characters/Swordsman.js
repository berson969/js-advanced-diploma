import Character from '../Character';

class Swordsman extends Character {
  constructor(level) {
    super(level, 40, 10, 'Swordsman');
    this.moveDistance = 4;
    this.attackDistance = 1;
  }
}

export default Swordsman;
