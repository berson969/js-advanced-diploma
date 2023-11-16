import Character from '../Character';

class Bowman extends Character {
  constructor(level) {
    super(level, 25, 25, 'Bowman');
    this.moveDistance = 2;
    this.attackDistance = 2;
  }
}

export default Bowman;
