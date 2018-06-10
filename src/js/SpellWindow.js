import Spell from './Spell.js';
class SpellWindow {
	constructor(imgWheel, context, width, height, ang) {
		let mouse = {
			x : undefined,
			y : undefined
		};

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


		this.imgWheel.onload = () => {
			animateWheel();
		}
	}


	animateWheel(){
		if(!this.isWheelStop){this.imgWheel
			let cache = this.imgWheel, //cache the local copy of image element for future reference
			imageWidth = cache.width,
			imageHeight = cache.height;

			this.context.save(); //saves the state of canvas
			this.context.clearRect(0, 0, this.width, this.height); //clear the canvas
			this.context.translate(this.width/2, this.height/2); //let's translate
			this.context.rotate(Math.PI / 180 * (this.ang += .1)); //increment the angle and rotate the image
			this.context.translate(-this.width/2, -this.height/2); //let's translate
			this.context.drawImage(this.imgWheel, this.width/2  - imageWidth/2, this.height/2 - imageHeight/2, imageWidth, imageHeight); //draw the image

			this.Spell1.draw();
			this.Spell2.draw();
			this.Spell3.draw();
			this.Spell4.draw();

			this.context.restore(); //restore the state of canvas
			this.checkIsWheel();
			//console.log(this.isWheelStop);
			requestAnimationFrame(this.animateWheel.bind(this));
		}
	};
	
	checkIsWheel() {
		//console.log(this.context.canvas);
		this.context.canvas.addEventListener('mousemove', function(event){
		let mouse = {
			x: event.x,
			y: event.y
		}
		const wheelRadius = 280;

		if(mouse.x - 760 <= wheelRadius && mouse.x - 760 > -wheelRadius && mouse.y - 380 <= wheelRadius  && mouse.y - 380 > -wheelRadius){				
			this.stopWheel();
		} else {
			this.isWheelStop = false;
			this.context.restore();
			this.animateWheel();
		};
	})
	this.checkIsWheel.bind(this)
	};
	
	
	stopWheel(){
		this.isWheelStop = true;
		this.context.save(); //saves the state of canvas
		this.context.clearRect(0, 0, this.width, this.height); //clear the canvas
		this.context.drawImage(this.imgWheel, this.width/2  - this.imgWheel.width/2, this.height/2 - this.imgWheel.height/2, this.imgWheel.width, this.imgWheel.height);
		this.Spell1.draw();
		this.Spell2.draw();
		this.Spell3.draw();
		this.Spell4.draw();
	}


}






export default SpellWindow;