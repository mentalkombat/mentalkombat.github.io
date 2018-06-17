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
			'player-sprite.png', 'player-head.png',
			'background.jpg',
			'head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png',
			'body1.png', 'body2.png', 'body3.png', 'body4.png', 'body5.png',
			'legs1.png', 'legs2.png', 'legs3.png', 'legs4.png', 'legs5.png',
			'wheel.png',
			'spell-water.png', 'spell-fire.png',	'spell-wind.png',
			'water-round-sprite.png',	'fire-sprite.png', 'wind-round-sprite.png',
			'cat.jpg', 'dog.jpg', 'house.jpg', 'lion.jpg', 'rabbit.jpg', 'speaker.png'
		]);
		this.resources.onReady(() => this.init());
    	this.checkAnswerBtn = document.getElementById('add_answer');
		this.audioWheel = document.getElementById("rotateWheel");
		this.TasksGroups = ["pictures", "translate", "math", "listening", "dragAndDrop"];
		this.currentTaskGroup = "listening";	
		this.taskQuestion = document.getElementById('question');
		this.taskWindow = document.getElementById('task');
	}

	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
	}


	init() {
		this.background = this.resources.get('background.jpg');

		this.player = new PlayerEntity([100, 200], new Sprite(this.resources.get('player-sprite.png'), [0, 0], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 1], false), 'Player');
		this.enemy = new EnemyEntity([this.canvas.width - 300, 80], this.resources);
		
		this.addAttackButtonLogic();
		this.canvas.addEventListener('click', this.spellsOnWheelClickHandler.bind(this));
		this.canvas.addEventListener('mousemove', this.spellsOnWheelMousemoveHandler.bind(this));
		this.checkAnswerBtn.addEventListener('click', this.checkAnswerHanlder.bind(this));

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
		if (this.SpellWindow && this.SpellWindow.show){
			this.SpellWindow.update(dt);
		};
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
		});
		if (this.isShowingAttackButton) {
			Drawing.drawAttackButton(this.ctx, 'Attack!', 140, 500, 200, 50);
		}
		this.drawEntitiesInfo();

		if (this.showspellCastEntity) {
			this.renderEntity(this.activeSpellCastEntity.spellCastEntity);
		}

		if (this.SpellWindow && this.SpellWindow.show){
			this.SpellWindow.draw();
		}
	};


	renderEntity(entity) {
		this.ctx.save();
		this.ctx.translate(entity.positionOnCanvas[0], entity.positionOnCanvas[1]);
		entity.sprite.render(this.ctx);
		this.ctx.restore();
	}


	spellCastingLogic(dt) {
		if (this.showspellCastEntity) {
			this.activeSpellCastEntity.changePositionOnCanvas();

			this.activeSpellCastEntity.spellCastEntity.sprite.update(dt);
			
			this.activeSpellCastEntity.checkCollisionWithEntity(this.enemy.entities[1].positionOnCanvas, this.enemy.entities[1].sprite.sizeOnCanvas);
			if (this.activeSpellCastEntity.spellCastEntity.sprite.done) {
				this.showspellCastEntity = false;
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
			}
			this.activeSpellCastEntity.spellCastEntity.sprite.done = false;
			this.activeSpellCastEntity.spellCastEntity.sprite.index = 0;
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

		this.canvas.addEventListener('click', this.attackButtonClickHanlder.bind(this));
		this.canvas.addEventListener('mousemove', this.attackButtonMousemoveHanlder.bind(this));
	}


	attackButtonClickHanlder(event) {
		if (this.isShowingAttackButton === true) {
			let x = event.pageX - event.target.offsetLeft;
			let	y = event.pageY - event.target.offsetTop;

			if (x > this.attackButtonParameters.x1 && x < this.attackButtonParameters.x2 && y > this.attackButtonParameters.y1 && y < this.attackButtonParameters.y2) {
				this.canvas.style.cursor = 'default';
				this.isShowingAttackButton = false;

				if (!this.SpellWindow) {
//        this.audioWheel.play();
					this.SpellWindow = new SpellWindow(this.resources.get('wheel.png'), this.ctx, this.canvas.width, this.canvas.height, this.resources);
					this.taskNumber = 0;
				}
				this.SpellWindow.show = true;
			}
		}
	}


	attackButtonMousemoveHanlder(event) {
		if (this.isShowingAttackButton === true) {
			let x = event.pageX - event.target.offsetLeft;
			let y = event.pageY - event.target.offsetTop;

			if (x > this.attackButtonParameters.x1 && x < this.attackButtonParameters.x2 && y > this.attackButtonParameters.y1 && y < this.attackButtonParameters.y2
				&& this.isShowingAttackButton === true) {
				this.canvas.style.cursor = 'pointer';
			} else {
				this.canvas.style.cursor = 'default';
			}
		}
	}


	spellsOnWheelClickHandler(event) {
		if (this.SpellWindow && this.SpellWindow.show) {
			let x = event.pageX - event.target.offsetLeft;
			let	y = event.pageY - event.target.offsetTop;
			
			for (let i = 0; i < this.SpellWindow.spells.length; i++) {
				if (this.SpellWindow.spells[i].isMouseOnSpell(x, y)) {
					this.activeSpellCastEntity = this.SpellWindow.spells[i];

					this.taskWindow.style.display = "block";
					this.task = new Task(this.resources, this.taskQuestion);
					console.log(this.taskNumber, 'this.taskNumber');
					this.task.createTask(this.currentTaskGroup, this.taskNumber);

					this.taskNumber++;

					break;
				}
			}
		}
	}


	spellsOnWheelMousemoveHandler() {
		if (this.SpellWindow && this.SpellWindow.show) {
			let x = event.pageX - event.target.offsetLeft;
			let	y = event.pageY - event.target.offsetTop;

			for (let i = 0; i < this.SpellWindow.spells.length; i++) {
				if (this.SpellWindow.spells[i].isMouseOnSpell(x, y)) {
					this.canvas.style.cursor = 'pointer';
					break;
				} else {
					this.canvas.style.cursor = 'default';
				}
			}
		}
	}


	checkAnswerHanlder() {
		if (this.task.checkAnswer(this.currentTaskGroup)) {

			this.taskWindow.style.display = "none";
			this.SpellWindow.show = false;
			if (this.currentTaskGroup === "listening"){
				let audio = document.querySelector('#question audio');
				let button = document.querySelector('#question .playAudio');

				this.taskQuestion.removeChild(audio);
				this.taskQuestion.removeChild(button);
			};
			if (this.currentTaskGroup === "pictures"){
				let img = document.querySelector('#question img');
				this.taskQuestion.removeChild(img);
			};
			this.player.attack(new Sprite(this.resources.get('player-sprite.png'), [0, 464], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 3, 4, 0]));
			setTimeout(() => this.createSpell(), 700);
		};
	}


	createSpell() {
		if (this.enemy.currentHP > 0) {
			this.enemy.newHP = this.enemy.currentHP - 20;
		}

		this.activeSpellCastEntity.setPositionOnCanvas(this.player.positionOnCanvas, this.player.sprite.sizeOnCanvas, this.enemy.entities[1].positionOnCanvas, this.enemy.entities[1].sprite.sizeOnCanvas);
		this.showspellCastEntity = true;
	}
}

export default Game;