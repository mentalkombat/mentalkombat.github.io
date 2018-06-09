import Sprite from './Sprite.js';
import Resources from './Resources.js';
import PlayerEntity from './PlayerEntity.js';
import EnemyEntity from './EnemyEntity.js';
import SpellWindow from './SpellWindow.js';

let mouse = {
	x : undefined,
	y : undefined
};
let	btnStartGame;




class Game {
	start(canvasParent) {
		this.createCanvas(canvasParent);

		this.resources = new Resources();
		this.resources.load([
			'player-sprite.png', 
			'background.jpg', 
			'head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png',
			'body1.png', 'body2.png', 'body3.png', 'body4.png', 'body5.png',
			'legs1.png', 'legs2.png', 'legs3.png', 'legs4.png', 'legs5.png'
		]);
		this.resources.onReady(() => this.init());
	}
	
	
	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
		this.ang = 0;
		this.framesPerSeconds = 70;		
		this.imgWheel = new Image();
		this.imgWheel.src = '/src/img/spell_wheel.png'; //img
		this.context.canvas.addEventListener('mousemove', function(event){
			mouse.x = event.x;
			mouse.y = event.y;
		})
		
	}
	

	init() {
		this.background = this.resources.get('background.jpg');

		this.player = new PlayerEntity([100, 20], new Sprite(this.resources.get('player-sprite.png'), [0, 0], [634, 464], 5, [0, 1, 2, 1]));
		this.enemy = new EnemyEntity([900, 70], this.resources);

		document.querySelector('button').addEventListener('click', () => {
			this.player.attack(new Sprite(this.resources.get('player-sprite.png'), [0, 464], [634, 464], 5, [0, 1, 2, 3, 4, 0]));
		});

		this.lastTime = Date.now();
		this.main('begining');
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
				this.context.fillStyle = color;
				this.context.font = "italic 38pt Arial";
				btnStartGame = this.context.fillText("START GAME", 550, 200);
			}
			this.drawBtnStartGame('red');

			if (mouse.x > 660 
				&& mouse.y > 140
				&& mouse.x < 1000
				&& mouse.y < 200) {
					this.drawBtnStartGame('blue');
			};
		} else {
			this.SpellWindow = new SpellWindow( this.imgWheel, this.context, this.canvas.width, this.canvas.height,  this.framesPerSeconds, this.ang);
		}
	}

	update(dt) {
		this.player.sprite.update(dt);
		this.enemy.idleAnimate(dt);
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