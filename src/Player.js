class Player {
	constructor(currentPosition, url, positionOnImg, sizeOnImg) {
		this.currentPosition = currentPosition;
		this.url = url;
		this.positionOnImg = positionOnImg;
		this.sizeOnImg = sizeOnImg;
		this.img = new Image();
		this.img.src = url;

	}
	render(ctx) {
		ctx.drawImage(this.img,	0, 0,	this.sizeOnImg[0], this.sizeOnImg[1]);
	}
}

export default Player;