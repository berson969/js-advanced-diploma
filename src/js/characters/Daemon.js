import Character from '../Character';

class Daemon extends Character {
  constructor(level) {
    super(level, 'Daemon');
    this.attack = 10;
    this.defence = 10;
    this.moveDistance = 1;
    this.attackDistance = 4;
  }
}

export default Daemon;
