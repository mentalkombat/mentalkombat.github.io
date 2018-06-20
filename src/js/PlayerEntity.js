import Entity from './Entity.js';


class PlayerEntity extends Entity {
	constructor(positionOnCanvas, sprite, name) {
		super(positionOnCanvas, sprite);
		this.name = name;
		this.isHpReducing = false;
		this.currentHP = 100;
		this.newHP = 100;
		this.maxHP = 100;
	}

	changesprite(attackSprite) {
		let spriteOptions = {
			img: this.sprite.img,
			positionOnImg: this.sprite.positionOnImg,
			sizeOnImg: this.sprite.sizeOnImg,
			sizeOnCanvas: this.sprite.sizeOnCanvas,
			speed: this.sprite.speed,
			frames: this.sprite.frames
		};

		super.changesprite(attackSprite);
		this.sprite.state = this.sprite.index;
		this.sprite.newSpriteFramesNumber = attackSprite.frames.length;

		this.sprite.oldSpriteOptions = spriteOptions;
	}

}

export default PlayerEntity;