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

	attack(attackSprite) {
		let spriteOptions = {
			url: this.sprite.url,
			positionOnImg: this.sprite.positionOnImg,
			sizeOnImg: this.sprite.sizeOnImg,
			frames: this.sprite.frames
		};

		super.changesprite(attackSprite);
		this.sprite.state = this.sprite.index;
		this.sprite.newSpriteFramesNumber = attackSprite.frames.length;

		this.sprite.oldSpriteOptions = spriteOptions;
	}

}

export default PlayerEntity;