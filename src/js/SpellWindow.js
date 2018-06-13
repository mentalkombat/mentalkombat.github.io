import Spell from './Spell.js';
class SpellWindow {
	constructor(imgWheel, context, width, height, ang) {	
		this.isWheelStop = false;
		this.imgWheel = imgWheel;
		this.context = context;
		this.width = width;
		this.height = height;
		this.ang = ang;
		let a;
		this.Spell1 = new Spell(630, 500, 70, this.context, '#2185C5');
		this.Spell2 = new Spell(500, 330, 70, this.context, '#7ECEFD');
		this.Spell3 = new Spell(630, 190, 70, this.context, '#FFF6E5');
		this.Spell4 = new Spell(810, 330, 70, this.context, '#FF7F66');
	}



	animateWheel() {
		if (!this.isWheelStop) {
			let cache = this.imgWheel, //cache the local copy of image element for future reference
				imageWidth = cache.width,
				imageHeight = cache.height;

			this.context.save();
			this.context.translate(this.width / 2, this.height / 2);
			this.context.rotate(Math.PI / 180 * (this.ang += .2)); //increment the angle and rotate the image
			this.context.translate(-this.width / 2, -this.height / 2);
			this.context.drawImage(this.imgWheel, this.width / 2 - imageWidth / 2, this.height / 2 - imageHeight / 2, imageWidth, imageHeight);

			this.Spell1.draw();
			this.Spell2.draw();
			this.Spell3.draw();
			this.Spell4.draw();

			this.context.restore();
		}
	};

	stopWheel() {
		this.isWheelStop = true;
		this.context.save();
		this.context.translate(this.width / 2, this.height / 2);
		this.context.rotate(Math.PI / 180 * (this.ang));
		this.context.translate(-this.width / 2, -this.height / 2);
		this.context.drawImage(this.imgWheel, this.width / 2 - this.imgWheel.width / 2, this.height / 2 - this.imgWheel.height / 2, this.imgWheel.width, this.imgWheel.height);
		this.Spell1.draw();
		this.Spell2.draw();
		this.Spell3.draw();
		this.Spell4.draw();
		this.context.restore();
	}
}

export default SpellWindow;