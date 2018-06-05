import Entity from './Entity.js';
import Sprite from './Sprite.js';
import Spell from './Spell.js';
import PlayerIdleSprite from '../img/player-idle-sprite.png';
import PlayerAttackSprite from '../img/player-attack-sprite.png';
import EnemyIdleSprite from '../img/enemy-idle-sprite.png';
import SpellWheelSprite from '../img/spell_wheel.png';
import BackgroundImage from '../img/background.jpg';

class Game {
	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
		this.canvas2 = document.getElementById('canvas2');
		this.ctx2 = this.canvas2.getContext('2d');
		this.canvas2.width = 1280;
		this.canvas2.height = 1000;
	}


	init(canvasParent) {
		this.ang = 0;
		this.framesPerSeconds = 70;
		this.wheelWidth = 754*2;
		this.wheelHeight = 754*2;
		this.imgWheel = new Image();
		

		this.createCanvas(canvasParent);

		this.background = new Image();
		this.background.src = BackgroundImage;

		this.player = new Entity([100, 50], new Sprite(PlayerIdleSprite, [0, 0], [428, 380], 5, [0, 1, 2, 1]));
		this.enemy = new Entity([900, 50], new Sprite(EnemyIdleSprite, [0, 0], [233, 373], 5, [0, 1, 3, 2, 1]));
		
		/*this.spell = new Spell([300, 150], new Sprite(SpellWheelSprite, [0, 0], [754, 754], 1, [0]));
		this.rotateWheel = setInterval (function rotateW(){
			ctx.save();
			ctx.cearRect(0, 0, this.canvas.width, this.canvas.height);		
			ctx.rotate(Math.PI / 180 * (ang += 5));
			ctx.drawImage(this.spell, -this.canvas.width / 2, -this.canvas.height /2); //draw the image ;)
            ctx.restore()

		}, framesPerSeconds);*/
		this.imgWheel.src = '/src/img/spell_wheel.png'; //img
		
		
		this.imgWheel.onload = animmateWheel(this.imgWheel, this.ctx2, this.canvas.width, this.canvas.height, this.framesPerSeconds, this.ang);
		
		function animmateWheel (imgwheel, ctx, width, height, framesPerSeconds, ang) { //on image load do the following stuff
			
			ctx.drawImage(imgwheel, 200, 200);
			
				var cache = imgwheel; //cache the local copy of image element for future reference
				
				
				setInterval(function () {
					ctx.save(); //saves the state of canvas
					ctx.clearRect(0, 0, width, height); //clear the canvas
					
					ctx.translate(cache.width, cache.height); //let's translate
					ctx.rotate(Math.PI / 180 * (ang += .1)); //increment the angle and rotate the image 
					ctx.drawImage(imgwheel, -cache.width / 2, -cache.height /2); //draw the image ;)
					ctx.restore(); //restore the state of canvas
				}, framesPerSeconds);
			};
		

		// this.player.changeActiveSprite(new Sprite(PlayerAttackSprite, [0, 0], [540, 456], 5, [0, 1, 2, 3, 4]));

		this.lastTime = Date.now();
		this.main();
	}

	main() {
		let now = Date.now();
		let dt = (now - this.lastTime) / 1000;
		
		this.update(dt);
		this.render();

		this.lastTime = now;
		requestAnimationFrame(this.main.bind(this));
	}


	update(dt) {
		this.player.activeSprite.update(dt);
		this.enemy.activeSprite.update(dt);
		//this.spell.activeSprite.update(dt);
		
	}


	render() {
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		this.renderEntity(this.player);
		this.renderEntity(this.enemy);
		//this.renderEntity(this.spell);		
	};


	renderEntity(entity) {
		this.ctx.save();
		this.ctx.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);
		entity.activeSprite.render(this.ctx);
		this.ctx.restore();
	}
}

export default Game;