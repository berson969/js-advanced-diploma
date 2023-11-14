import Character from '../Character';

class Daemon extends Character {
  constructor(level) {
    super(level, 10, 10, 'Daemon');
    this.moveDistance = 1;
    this.attackDistance = 4;
  }
}

export default Daemon;
