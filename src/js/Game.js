import Sprite from './Sprite.js';
import Resources from './Resources.js';
import PlayerEntity from './PlayerEntity.js';
import EnemyEntity from './EnemyEntity.js';


class Game {
	start(canvasParent) {
		this.createCanvas(canvasParent);

		this.resources = new Resources();
		this.resources.load([
			'player-attack-sprite.png', 
			'player-idle-sprite.png', 
			'background.jpg', 
			'enemy-idle-sprite.png',
			'head1.png', 'head2.png',
			'body1.png', 'body2.png',
			'legs1.png', 'legs2.png'
		]);
		this.resources.onReady(() => this.init());
	}
	
	
	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
	}


	init() {
		this.background = this.resources.get('background.jpg');

		this.player = new PlayerEntity([100, 50], new Sprite(this.resources.get('player-idle-sprite.png'), [0, 0], [428, 380], 5, [0, 1, 2, 1]));
		this.enemy = new EnemyEntity([900, 50], this.resources);

		document.querySelector('button').addEventListener('click', () => {
			this.player.attack(new Sprite(this.resources.get('player-attack-sprite.png'), [0, 0], [540, 456], 5, [0, 1, 2, 3, 4, 0]));
			// this.player.positionOnCanvas = [74, 23];
		});

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
		this.player.sprite.update(dt);
		this.enemy.sprites.forEach(element => {
			element.sprite.update(dt);
		});
	}


	render() {
		this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		this.renderEntity(this.player);
		this.enemy.sprites.forEach(element => {
			this.renderEntity(element);
		})
	};


	renderEntity(entity) {
		this.context.save();
		this.context.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);			
		entity.sprite.render(this.context);
		this.context.restore();
	}
}

export default Game;