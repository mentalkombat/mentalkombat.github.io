import Entity from './Entity.js';


export default class GameSpell extends Entity {
    constructor(positionOnCanvas, sprite) {
        super(positionOnCanvas, sprite);
    }

    addSpellCastAnimation(direction, sprite) {
        this.spellCastAnimation = new Entity([0, 0], sprite);
        this.direction = direction;
    }
}

