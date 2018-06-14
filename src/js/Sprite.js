class Sprite {
	constructor(img, positionOnImg, sizeOnImg, sizeOnCanvas, speed, frames, once) {
		this.img = img;
		this.positionOnImg = positionOnImg;
		this.sizeOnImg = sizeOnImg;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this.once = once;
		this.sizeOnCanvas = sizeOnCanvas;
		this.index = 0;

		this.newSpriteFramesNumber = 0;
		this.isNewSpriteActive = false;

		this.oldSpriteOptions = null;
	}


	update(dt) {
		this.index += this.speed * dt;
	}


	applyingNewSprite() {
		if (this.index < this.state + this.newSpriteFramesNumber) {
			// console.log('attack');
			this.isNewSpriteActive = true;
		}
		else {
			if (this.isNewSpriteActive === true) {
				// console.log('end attack');
				this.isNewSpriteActive = false;

				this.url = this.oldSpriteOptions.url;
				this.positionOnImg = this.oldSpriteOptions.positionOnImg;
				this.sizeOnImg = this.oldSpriteOptions.sizeOnImg;
				this.frames = this.oldSpriteOptions.frames;
			}
		}
	}


	render(ctx) {
		this.applyingNewSprite();

		let frame;

		if (this.speed > 0) {
			let max = this.frames.length;
			let idx = Math.floor(this.index);
			frame = this.frames[idx % max];

			if (this.once && idx >= max) {
				this.done = true;
				return;
			}
		}
		else {
			frame = 0;
		}

		let x = this.positionOnImg[0];
		let y = this.positionOnImg[1];
		x += frame * this.sizeOnImg[0];

		ctx.drawImage(this.img, x, y, this.sizeOnImg[0], this.sizeOnImg[1], 0, 0, this.sizeOnCanvas[0], this.sizeOnCanvas[1]);
	}
}

export default Sprite;