import Character from '../Character';

class Zombie extends Character {
  constructor(level) {
    super(level, 'Zombie');
    this.attack = 10;
    this.defence = 25;
    this.moveDistance = 1;
    this.attackDistance = 1;
  }
}

export default Zombie;
