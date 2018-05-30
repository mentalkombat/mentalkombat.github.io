class Sprite {
	constructor(url, positionOnImg, sizeOnImg, speed, frames) {
		this.url = url;
		this.positionOnImg = positionOnImg;
		this.sizeOnImg = sizeOnImg;
		this.img = new Image();
		this.img.src = url;
		this.speed = speed;
		this.frames = frames;
		this._index = 0;
	}


	update(dt) {
		this._index += this.speed * dt;
	}


	render(ctx) {
		let frame;

		if (this.speed > 0) {
			let max = this.frames.length;
			let idx = Math.floor(this._index);
			frame = this.frames[idx % max];
		}
		else {
			frame = 0;
		}

		let x = this.positionOnImg[0];
		let y = this.positionOnImg[1];
		x += frame * this.sizeOnImg[0];
		
		ctx.drawImage(this.img, x, y, this.sizeOnImg[0], this.sizeOnImg[1],	0, 0,	this.sizeOnImg[0], this.sizeOnImg[1]);
	}
}

export default Sprite;