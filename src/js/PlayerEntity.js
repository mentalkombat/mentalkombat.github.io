import Entity from './Entity.js';


class PlayerEntity extends Entity {
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