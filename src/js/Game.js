import Sprite from './Sprite.js';
import Resources from './Resources.js';
import PlayerEntity from './PlayerEntity.js';
import EnemyEntity from './EnemyEntity.js';
import SpellWindow from './SpellWindow.js';
import Drawing from './Drawing.js';
import Entity from './Entity.js';
import Task from './Task.js';


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
			'spell-water.png',
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
	}


	init() {
		this.ang = 0;
		this.background = this.resources.get('background.jpg');

		this.player = new PlayerEntity([100, 200], new Sprite(this.resources.get('player-sprite.png'), [0, 0], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 1], false), 'Player');
		this.enemy = new EnemyEntity([this.canvas.width - 300, 80], this.resources);
		
		this.addAttackButtonLogic();
		document.getElementById('add_answer').addEventListener('click', this.checkAnswerHanlder.bind(this));

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
		this.enemy.idleAnimate(dt);
		if(this.startWheel){
			this.picture.isMouseOnWheel();
			this.picture.waitClick();
		}

		this.spellCastingLogic(dt);
		this.enemyHpReduction();
	}


	render() {
		this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		this.renderEntity(this.player);
		this.enemy.entities.forEach(element => {
			this.renderEntity(element);
		})
		if (this.isShowingAttackButton) {
			Drawing.drawAttackButton(this.ctx, 'Attack!', 140, 500, 200, 50);
		}
		this.drawEntitiesInfo();

		if (this.spell) {
			this.renderEntity(this.spell);
		}

		if (this.SpellWindow && this.SpellWindow.show) {
			if (this.SpellWindow.isWheelStop === true) {
				this.SpellWindow.stopWheel();
			} else {
				this.SpellWindow.animateWheel();
			}
		}
	};


	renderEntity(entity) {
		this.ctx.save();
		this.ctx.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);
		entity.sprite.render(this.ctx);
		this.ctx.restore();
	}


	spellCastingLogic(dt) {
		if (this.spell) {
			if (this.spell.isSpellMoving) {
				this.spell.positionOnCanvas[0] += 10;
			}
			this.spell.sprite.update(dt);
			this.checkCollisionSpellWithEnemy();
			if (this.spell.sprite.done) {
				delete this.spell;
				this.enemy.isHpReduction = true;
			}
		}
	}


	enemyHpReduction() {
		if (this.enemy.isHpReduction) {
			if (this.enemy.currentHP > this.enemy.newHP) {
				this.enemy.currentHP -= 0.5;
			} else {
				this.enemy.isHpReduction = false;
				this.isShowingAttackButton = true;
				this.canvas.addEventListener('click', this.attackButtonClickHanlder);
				this.canvas.addEventListener('mousemove', this.attackButtonMousemoveHanlder);
			}
		}
	}


	checkCollisionSpellWithEnemy() {
		let spellCenterX = this.spell.positionOnCanvas[0] + this.spell.sprite.sizeOnCanvas[0] / 2;
		let enemyBodyCenterX = this.enemy.entities[1].positionOnCanvas[0] + this.enemy.entities[1].sprite.sizeOnCanvas[0] / 2;
		if (spellCenterX > enemyBodyCenterX) {
			this.spell.isSpellMoving = false;
		}
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
		this.attackButtonParameters = {	x1: 140, y1: 500, x2: 340, y2: 550 };
		this.isShowingAttackButton = true;

		this.attackButtonClickHanlder = this.attackButtonClickHanlder.bind(this);
		this.canvas.addEventListener('click', this.attackButtonClickHanlder);

		this.attackButtonMousemoveHanlder = this.attackButtonMousemoveHanlder.bind(this);
		this.canvas.addEventListener('mousemove', this.attackButtonMousemoveHanlder);

		this.stopWheelOnMousemoveHandler = this.stopWheelOnMousemoveHandler.bind(this);
		this.canvas.addEventListener('mousemove', this.stopWheelOnMousemoveHandler); 
	}


	attackButtonClickHanlder(event) {
		let x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;

		if (x > this.attackButtonParameters.x1 && x < this.attackButtonParameters.x2 && y > this.attackButtonParameters.y1 && y < this.attackButtonParameters.y2) {
			this.canvas.removeEventListener('click', this.attackButtonClickHanlder);
			this.canvas.style.cursor = 'default';
			this.canvas.removeEventListener('mousemove', this.attackButtonMousemoveHanlder);
			this.isShowingAttackButton = false;

			
			if (!this.SpellWindow) {
				this.ang = 0;
				this.SpellWindow = new SpellWindow(this.resources.get('wheel.png'), this.ctx, this.canvas.width, this.canvas.height, 70, this.ang);
				this.SpellWindow.wheelRadius = 280;
				this.taskNumber = 0;
			}
			this.SpellWindow.show = true;
			
			this.createTaskHandler = this.createTaskHandler.bind(this);
			this.canvas.addEventListener('click', this.createTaskHandler);
		}
	}


	attackButtonMousemoveHanlder(event) {
		let x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;

		if (x > this.attackButtonParameters.x1 && x < this.attackButtonParameters.x2 && y > this.attackButtonParameters.y1 && y < this.attackButtonParameters.y2) {
			this.canvas.style.cursor = 'pointer';
		} else {
			this.canvas.style.cursor = 'default';
		}
	}


	stopWheelOnMousemoveHandler(event) {
		let x = event.pageX - event.target.offsetLeft,
				y = event.pageY - event.target.offsetTop;

		let wheelCenterX = this.canvas.width / 2;
		let wheelCenterY = this.canvas.height / 2;
		let wheelRadius = 280;

		if (this.SpellWindow) {
			if (x > wheelCenterX - wheelRadius && x < wheelCenterX + wheelRadius && y > wheelCenterY - wheelRadius && y < wheelCenterY + wheelRadius) {
				this.SpellWindow.isWheelStop = true;
			} else {
				this.SpellWindow.isWheelStop = false;
			}
		}
	}


	checkAnswerHanlder() {
		if (this.task.checkAnswer()) {
			document.getElementById('task').style.display = "none";
			this.SpellWindow.show = false;

			this.player.attack(new Sprite(this.resources.get('player-sprite.png'), [0, 464], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 3, 4, 0]));
			setTimeout(() => this.createSpell(), 700);
		};
	}


	createTaskHandler(event) {
		if (event.x - 760 <= this.SpellWindow.wheelRadius && event.x - 760 > - this.SpellWindow.wheelRadius && event.y - 380 <= this.SpellWindow.wheelRadius && event.y - 380 > - this.SpellWindow.wheelRadius) {
			document.getElementById('task').style.display = "block";
			this.task = new Task;
			this.task.createTask(this.taskNumber);
			this.taskNumber++;
			this.canvas.removeEventListener('click', this.createTaskHandler);
		}
	}


	createSpell() {
		if (this.enemy.currentHP > 0) {
			this.enemy.newHP = this.enemy.currentHP - 20;
		}
		this.spell = new Entity(
			[this.player.positionOnCanvas[0] + this.player.sprite.sizeOnCanvas[0], this.player.sprite.sizeOnCanvas[1] + this.player.sprite.sizeOnCanvas[1] / 2 - 184 / 2],
			new Sprite(this.resources.get('spell-water.png'), [0, 0], [184, 184], [184, 184], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 10], true));
		this.spell.isSpellMoving = true;
	}
}

export default Game;