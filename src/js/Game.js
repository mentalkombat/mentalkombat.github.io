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
	}


	init(canvasParent) {
		this.createCanvas(canvasParent);

		this.background = new Image();
		this.background.src = BackgroundImage;

		this.player = new Entity([100, 50], new Sprite(PlayerIdleSprite, [0, 0], [428, 380], 5, [0, 1, 2, 1]));
		this.enemy = new Entity([900, 50], new Sprite(EnemyIdleSprite, [0, 0], [233, 373], 5, [0, 1, 3, 2, 1]));
		
		this.ctx.rotate(0.2);
		this.spell = new Spell([300, 150], new Sprite(SpellWheelSprite, [0, 0], [754, 754], 1, [0]));
		this.rotateWheel = setInterval(function(){
			ctx.rotate(0.2);
			this.spell = new Spell([300, 150], new Sprite(SpellWheelSprite, [0, 0], [754, 754], 1, [0]));

		}, 300);

		
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
		this.spell.activeSprite.update(dt);
		
	}


	render() {
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		this.renderEntity(this.player);
		this.renderEntity(this.enemy);
		this.renderEntity(this.spell);		
	};


	renderEntity(entity) {
		this.ctx.save();
		this.ctx.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);
		entity.activeSprite.render(this.ctx);
		this.ctx.restore();
	}
}

export default Game;