import Player from './Player.js';
import PlayerImage from './img/player.png';
import Spell from './js/Spell.js';
import spellImage from './img/wheel.jpg';
import BackgroundImage from './img/background.jpg';

class Game {
	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		console.dir(canvasParent)
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
	}


	init(canvasParent) {
		this.lastTime = Date.now();
		this.createCanvas(canvasParent);
		this.player = new Player([0, 0], PlayerImage, [0, 0], [325, 325]);
		this.spell = new Spell([250, 250], spellImage, [250, 250], [100, 100])
		this.background = new Image();
		this.background.src = BackgroundImage;
		this.main();
	}


	main() {
		let now = Date.now();
		let dt = (now - this.lastTime) / 1000;
		//console.log(dt);
		
		// update(dt);
		this.render();

		this.lastTime = now;
		requestAnimationFrame(this.main.bind(this));
	}


	render() {
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

		this.ctx.save();
		this.ctx.translate(this.player.currentPosition[0], this.player.currentPosition[1]);
		this.player.render(this.ctx);
		this.spell.render(this.ctx);	
		this.ctx.restore();
	};
}
export default Game;