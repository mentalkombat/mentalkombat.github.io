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
			'legs1.png', 'legs2.png', 'legs3.png', 'legs4.png', 'legs5.png',
			'player-head.png'
		]);
		this.resources.onReady(() => this.init());
	}
	
	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
		this.ang = 0;
		this.framesPerSeconds = 70;		
		this.imgWheel = new Image();
		this.imgWheel.src = '/src/img/wheel.png'; //img
		this.ctx.canvas.addEventListener('mousemove', function(event){
			// console.log(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
			mouse.x = event.x;
			mouse.y = event.y;
			
		})
	}

	init() {
		this.background = this.resources.get('background.jpg');

		this.player = new PlayerEntity([100, 20], new Sprite(this.resources.get('player-sprite.png'), [0, 0], [634, 464], 5, [0, 1, 2, 1]), 'Player');
		this.enemy = new EnemyEntity([900, 70], this.resources);
		
		this.addAttackButtonLogic();

		// this.startWheel = null;
		// this.ctx.canvas.addEventListener('click', (event) => {
		// 	var x = event.pageX,
		// 			y = event.pageY;

		// 	if (event.pageX > 728 && event.pageY > 162 && event.pageX < 1040 && event.pageY < 200) {
				
		// 		this.startWheel = true;
		// 		this.SpellWindow = new SpellWindow( this.imgWheel, this.ctx, this.canvas.width, this.canvas.height,  this.framesPerSeconds, this.ang);
		// 		this.SpellWindow.animateWheel()
		// 		requestAnimationFrame(this.main.bind(this));
		// 	}
		// });

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

		this.drawBtnStartGame = (color) => {
			this.ctx.fillStyle = color;
			this.ctx.font = "italic 38pt Arial";
			btnStartGame = this.ctx.fillText("START GAME", 600, 200);
		}
		this.drawBtnStartGame('red');

		if (mouse.x > 728 
			&& mouse.y > 162
			&& mouse.x < 1040
			&& mouse.y < 200) {
				this.drawBtnStartGame('blue');
		};

		if (this.startWheel) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear the canvas
			
		}
	}

	update(dt) {
		this.player.sprite.update(dt);
		this.enemy.idleAnimate(dt);
	}

	render() {
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		this.renderEntity(this.player);
		this.enemy.entities.forEach(element => {
			this.renderEntity(element);
		})
		this.drawAttackButton();
		this.drawEntitiesInfo();
	};

	renderEntity(entity) {
		this.ctx.save();
		this.ctx.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);			
		entity.sprite.render(this.ctx);
		this.ctx.restore();
	}

	drawEntitiesInfo() {
		this.drawEntitiesInfoImage(this.resources.get('player-head.png'), 50, 50, 50, 50);
		this.drawEntitiesInfoImage(this.enemy.entities[2].sprite.img, this.canvas.width - 50, 50, 50, 50);
	}

	drawEntitiesInfoImage(image, imagePositionX, imagePositionY, imageWidth, imageHeight) {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc(imagePositionX, imagePositionY, Math.sqrt(imageWidth * imageWidth + imageHeight * imageHeight) / 2, 0, Math.PI * 2, true);//Math.sqrt(imageWidth * imageHeight / 2)
		this.ctx.closePath();
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = '#abc';
		this.ctx.stroke();
		this.ctx.clip();
		this.ctx.translate(imagePositionX, imagePositionY);
		this.ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
		this.ctx.restore();
	}


	addAttackButtonLogic() {
		this.canvas.addEventListener('click', (event) => {
			var x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;

			if (x > 280 && x < 480 && y > 500 && y < 550) {
				this.player.attack(new Sprite(this.resources.get('player-sprite.png'), [0, 464], [634, 464], 5, [0, 1, 2, 3, 4, 0]));
			}
		});

		this.canvas.addEventListener('mousemove', (event) => {
			var x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;

			if (x > 280 && x < 480 && y > 500 && y < 550) {
				this.canvas.style.cursor = 'pointer';
			}	else {
				this.canvas.style.cursor = 'default';				
			}
		});
	}

	drawAttackButton() {
		this.ctx.save();
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "#000000";
		this.ctx.fillStyle = "#abc";
		let rectX = 280;
		let rectY = 500;
		let rectWidth = 200;
		let rectHeight = 50;
		this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
		this.ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
		
		this.ctx.font = "20px Georgia";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "#000000";
		this.ctx.fillText("Attack!", rectX + (rectWidth / 2), rectY + (rectHeight / 2));
		this.ctx.restore();
	}
}

export default Game;