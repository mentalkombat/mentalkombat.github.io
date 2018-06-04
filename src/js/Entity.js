import Sprite from './Sprite.js';
import PlayerAttackSprite from '../img/player-attack-sprite.png';

class Entity {
	constructor(positionOnCanvas, activeSprite) {
		this.positionOnCanvas = positionOnCanvas;
		this.activeSprite = activeSprite;
	}


	changeActiveSprite(sprite) {
		this.activeSprite = sprite;
	}


	attack() {
		let spriteOptions = {
			url: this.activeSprite.url,
			positionOnImg: this.activeSprite.positionOnImg,
			sizeOnImg: this.activeSprite.sizeOnImg,
			frames: this.activeSprite.frames
		};

		this.changeActiveSprite(new Sprite(PlayerAttackSprite, [0, 0], [540, 456], 5, [0, 1, 2, 3, 4, 0]));
		// this.positionOnCanvas = [74, 23];
		this.activeSprite.state = this.activeSprite.index;
		this.activeSprite.newSpriteFramesNumber = 6;

		this.activeSprite.oldSpriteOptions = spriteOptions;
	}
}

export default Entity;