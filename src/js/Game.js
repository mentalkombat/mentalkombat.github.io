import Entity from './Entity.js';
import Sprite from './Sprite.js';
import SpellWindow from './SpellWindow.js';
import events from './events.js';
import PlayerIdleSprite from '../img/player-idle-sprite.png';
import PlayerAttackSprite from '../img/player-attack-sprite.png';
import EnemyIdleSprite from '../img/enemy-idle-sprite.png';
import BackgroundImage from '../img/background.jpg';
let mouse = {
	x : undefined,
	y : undefined
};
let	btnStartGame;



class Game {
	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
		this.ang = 0;
		this.framesPerSeconds = 70;		
		this.imgWheel = new Image();
		this.imgWheel.src = '/src/img/spell_wheel.png'; //img
		this.ctx.canvas.addEventListener('mousemove', function(event){
			mouse.x = event.x;
			mouse.y = event.y;
		})
		
	}
	

	init(canvasParent) {
		this.createCanvas(canvasParent);
		this.background = new Image();
		this.background.src = BackgroundImage;
		this.player = new Entity([100, 50], new Sprite(PlayerIdleSprite, [0, 0], [428, 380], 5, [0, 1, 2, 1]));
		this.enemy = new Entity([900, 50], new Sprite(EnemyIdleSprite, [0, 0], [233, 373], 5, [0, 1, 3, 2, 1]));
		// this.player.changeActiveSprite(new Sprite(PlayerAttackSprite, [0, 0], [540, 456], 5, [0, 1, 2, 3, 4]));
		this.lastTime = Date.now();
		this.main('spelling');
	}

	main(stage) {
		let now = Date.now();
		let dt = (now - this.lastTime) / 1000;
		this.update(dt);

		if(stage === 'begining'){
			this.render();
			this.lastTime = now;
			requestAnimationFrame(this.main.bind(this, 'begining'));
			this.drawBtnStartGame = (color) => {
				this.ctx.fillStyle = color;
				this.ctx.font = "italic 38pt Arial";
				btnStartGame = this.ctx.fillText("START GAME", 550, 200);
			}
			this.drawBtnStartGame('red');

			if (mouse.x > 660 
				&& mouse.y > 140
				&& mouse.x < 1000
				&& mouse.y < 200) {
					this.drawBtnStartGame('blue');
			};
		} else {
			this.SpellWindow = new SpellWindow( this.imgWheel, this.ctx, this.canvas.width, this.canvas.height,  this.framesPerSeconds, this.ang);
		}
	}

	update(dt) {
		this.player.activeSprite.update(dt);
		this.enemy.activeSprite.update(dt);
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