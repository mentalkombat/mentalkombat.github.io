import Sprite from './Sprite.js';


class Entity {
	constructor(positionOnCanvas, sprite) {
		this.positionOnCanvas = positionOnCanvas;
		this.sprite = sprite;
	}
	changesprite(sprite) {
		this.sprite = sprite;
	}
}

export default Entity;