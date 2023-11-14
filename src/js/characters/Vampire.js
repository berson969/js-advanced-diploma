import Character from '../Character';

class Vampire extends Character {
  constructor(level) {
    super(level, 25, 25, 'Vampire');
    this.moveDistance = 2;
    this.attackDistance = 2;
  }
}

export default Vampire;
