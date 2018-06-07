import Spell from './Spell.js';
class SpellWindow {
	constructor(imgWheel, ctx, width, height, framesPerSeconds, ang) {
		let Spell1 = new Spell(600, 600, 70, ctx, 'red');;

		imgWheel.onload = () => {
			this.animateWheel();
		}
		this.animateWheel = ()=>{
			
			let cache = imgWheel, //cache the local copy of image element for future reference
				imageWidth = cache.width,
				imageHeight = cache.height;


			setInterval(function () {
				ctx.save(); //saves the state of canvas
				ctx.clearRect(0, 0, width, height); //clear the canvas
				ctx.translate(width/2, height/2); //let's translate
				ctx.rotate(Math.PI / 180 * (ang += .1)); //increment the angle and rotate the image
				ctx.translate(-width/2, -height/2); //let's translate
				ctx.drawImage(imgWheel, width/2  - imageWidth/2, height/2 - imageHeight/2, imageWidth, imageHeight); //draw the image

				Spell1.draw();

				ctx.restore(); //restore the state of canvas
			}, framesPerSeconds);
		};
		this.stopWheel = () =>{
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(imgWheel, width / 2 - imageWidth / 2, height / 2 - imageHeight / 2, imageWidth, imageHeight);
		}






	}
}






export default SpellWindow;