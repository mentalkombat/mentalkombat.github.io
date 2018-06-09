import Spell from './Spell.js';
class SpellWindow {
	constructor(imgWheel, ctx, width, height, framesPerSeconds, ang) {
		let mouse = {
			x : undefined,
			y : undefined
		};

		let Spell1 = new Spell(630, 500, 70, ctx, '#2185C5');
		let Spell2 = new Spell(500, 330, 70, ctx, '#7ECEFD');
		let Spell3 = new Spell(630, 190, 70, ctx, '#FFF6E5');
		let Spell4 = new Spell(810, 330, 70, ctx, '#FF7F66');
		let a;
		imgWheel.onload = () => {
			this.animateWheel();
		}
		this.animateWheel = ()=>{
			
			let cache = imgWheel, //cache the local copy of image element for future reference
				imageWidth = cache.width,
				imageHeight = cache.height;


			a = setInterval(function () {
				ctx.save(); //saves the state of canvas
				ctx.clearRect(0, 0, width, height); //clear the canvas
				ctx.translate(width/2, height/2); //let's translate
				ctx.rotate(Math.PI / 180 * (ang += .1)); //increment the angle and rotate the image
				ctx.translate(-width/2, -height/2); //let's translate
				ctx.drawImage(imgWheel, width/2  - imageWidth/2, height/2 - imageHeight/2, imageWidth, imageHeight); //draw the image

				Spell1.draw();
				Spell2.draw();
				Spell3.draw();
				Spell4.draw();
				
				

				ctx.restore(); //restore the state of canvas
			}, framesPerSeconds);
		};

		ctx.canvas.addEventListener('mousemove', function(event){
			mouse.x = event.x;
			mouse.y = event.y;
			stopWheel();
		});
		const wheelRadius = 377;
		const stopWheel = () =>{
			console.log('yesdf');
			console.log(mouse.x, mouse.y, mouse.x - 760, mouse.x - 760 <= wheelRadius,
						mouse.x - 760, mouse.x - 760 > -wheelRadius,
						mouse.y - 380, mouse.y - 380 <= wheelRadius,
						mouse.y - 380, mouse.y - 380 > -wheelRadius);
			if(mouse.x - 760 <= wheelRadius && mouse.x - 760 > -wheelRadius && mouse.y - 380 <= wheelRadius  && mouse.y - 380 > -wheelRadius){
				clearInterval(a);
				ctx.drawImage(imgWheel, width/2  - imgWheel.width/2, height/2 - imgWheel.height/2, imgWheel.width, imgWheel.height);
				Spell1.draw();
				Spell2.draw();
				Spell3.draw();
				Spell4.draw();
			} else {
				clearInterval(a);
				this.animateWheel();
			};
		}
	}
}






export default SpellWindow;