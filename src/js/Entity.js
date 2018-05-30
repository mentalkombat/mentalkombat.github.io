class Entity {
	constructor(positionOnCanvas, activeSprite) {
		this.positionOnCanvas = positionOnCanvas;
		this.activeSprite = activeSprite;
		// this.sprites = [];
		// this.sprites.push(this.activeSprite);
	}


	changeActiveSprite(sprite) {
		this.activeSprite = sprite;
	}
}

export default Entity;