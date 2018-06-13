import Sprite from './Sprite.js';
import Resources from './Resources.js';
import PlayerEntity from './PlayerEntity.js';
import EnemyEntity from './EnemyEntity.js';
import SpellWindow from './SpellWindow.js';
import Drawing from './Drawing.js';


let mouse = {
	x: null,
	y: null
};
let btnStartGame;


class Game {
	start(canvasParent) {
		this.createCanvas(canvasParent);
		this.resources = new Resources();
		this.resources.load([
			'player-sprite.png',
			'background.jpg',
			'head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png',
			'body1.png', 'body2.png', 'body3.png', 'body4.png', 'body5.png',
			'legs1.png', 'legs2.png', 'legs3.png', 'legs4.png', 'legs5.png',
			'player-head.png',
			'wheel.png'
		]);
		this.resources.onReady(() => this.init());
	}


	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
		//this.ang = 0;
		//this.imgWheel = new Image();
		//this.imgWheel.src = '/src/img/wheel.png';
		//this.ctx.canvas.addEventListener('mousemove', function (event) {
		//	mouse.x = event.x;
		//	mouse.y = event.y;
		//})
	}


	init() {
		this.ang = 0;
		this.background = this.resources.get('background.jpg');
		this.player = new PlayerEntity([100, 30], new Sprite(this.resources.get('player-sprite.png'), [0, 0], [634, 464], 5, [0, 1, 2, 1]), 'Player');
		this.enemy = new EnemyEntity([this.canvas.width - 400, 80], this.resources);

		this.picture = new SpellWindow(this.resources.get('wheel.png'), this.ctx, 700, 500, this.ang);

		this.addAttackButtonLogic();
		//if (event.pageX - event.target.offsetLeft > 600 && event.pageY - event.target.offsetTop < 200 && event.pageX - event.target.offsetLeft < 930 && event.pageY - event.target.offsetTop > 160) {
		//	this.startWheel = true;
		//	this.SpellWindow = new SpellWindow(this.imgWheel, this.ctx, this.canvas.width, this.canvas.height, 70, this.ang);
		//	this.SpellWindow.isMouseOnWheel()
		//	//requestAnimationFrame(this.main.bind(this));
		//}
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

		// this.drawBtnStartGame = (color) => {
		// 	this.ctx.fillStyle = color;
		// 	this.ctx.font = "italic 38pt Arial";
		// 	btnStartGame = this.ctx.fillText("START GAME", 600, 200);
		// }
		// this.drawBtnStartGame('red');

		// if (mouse.x > 728 
		// 	&& mouse.y > 162
		// 	&& mouse.x < 1040
		// 	&& mouse.y < 200) {
		// 		this.drawBtnStartGame('blue');
		// };

		// if (this.startWheel) {
		// 	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear the canvas

		// }
	}
	update(dt) {
		this.player.sprite.update(dt);
		this.enemy.idleAnimate(dt);
		if(this.startWheel){
			this.picture.isMouseOnWheel();
			this.picture.waitClick();
		}

		
		//Test enemy HP reduce
		if (this.enemy.isHpReducing) {
			if (this.enemy.currentHP > this.enemy.newHP) {
				this.enemy.currentHP -= 0.5;
			} else {
				this.enemy.isHpReducing = false;
			}
		}
	}


	render() {
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		this.renderEntity(this.player);
		this.enemy.entities.forEach(element => {
			this.renderEntity(element);
		})
		Drawing.drawAttackButton(this.ctx, 'Attack!', 280, 500, 200, 50);
		this.drawEntitiesInfo();

		

	};


	renderEntity(entity) {
		this.ctx.save();
		this.ctx.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);
		entity.sprite.render(this.ctx);
		this.ctx.restore();
	}


	drawEntitiesInfo() {
		Drawing.drawEntitiesInfoImage(this.ctx, this.resources.get('player-head.png'), 50, 50, 50, 50);
		Drawing.drawEntitiesInfoImage(this.ctx, this.enemy.entities[2].sprite.img, this.canvas.width - 50, 50, 50, 50);
		Drawing.drawHealthBar(this.ctx, 100, 25, this.player.currentHP * 3, this.player.maxHP * 3, 20, Math.floor(this.player.currentHP) + ' / ' + this.player.maxHP, 1, 1, false);
		Drawing.drawHealthBar(this.ctx, 100, 25, this.enemy.currentHP * 3, this.enemy.maxHP * 3, 20, Math.floor(this.enemy.currentHP) + ' / ' + this.enemy.maxHP, -1, 1, true);
		Drawing.drawEntityName(this.ctx, this.player.name, 100, 50, false);
		Drawing.drawEntityName(this.ctx, this.enemy.name, this.canvas.width - 100, 50, true);
	}


	addAttackButtonLogic() {
		let that = this;
		this.startWheel = null;
		this.canvas.addEventListener('click', (event) => {
			let x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;
			if (x > 280 && x < 480 && y > 500 && y < 550) {
				that.startWheel = true;
				this.picture.animateWheel();

				

				//this.player.attack(new Sprite(this.resources.get('player-sprite.png'), [0, 464], [634, 464], 5, [0, 1, 2, 3, 4, 0]));

				//Test enemy HP reduce
				//if (this.enemy.currentHP > 0) {
				//	this.enemy.isHpReducing = true
				//	this.enemy.newHP = this.enemy.currentHP - 20;
				//};


			}
		});



		this.canvas.addEventListener('mousemove', (event) => {
			let x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;

			if (x > 280 && x < 480 && y > 500 && y < 550) {
				this.canvas.style.cursor = 'pointer';
			} else {
				this.canvas.style.cursor = 'default';
			}
		});
	}
}

export default Game;