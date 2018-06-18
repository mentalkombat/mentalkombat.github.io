import Sprite from './Sprite.js';
import Resources from './Resources.js';
import PlayerEntity from './PlayerEntity.js';
import EnemyEntity from './EnemyEntity.js';
import SpellWindow from './SpellWindow.js';
import Drawing from './Drawing.js';
import Task from './Task.js';
import SpellEntity from './SpellEntity.js';


class Game {
	constructor(userName) {
		this.userName = userName;
	}


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
			'body1-attack.png', 'body2-attack.png', 'body3-attack.png', 'body4-attack.png', 'body5-attack.png',
			'enemy-spell-sprite.png',
			'cat.jpg', 'dog.jpg', 'house.jpg', 'lion.jpg', 'rabbit.jpg', 'speaker.png'
		]);
		this.resources.onReady(() => this.init(100));
    this.checkAnswerBtn = document.getElementById('add_answer');
		this.audioWheel = document.getElementById("rotateWheel");
		this.TasksGroups = ["pictures", "translate", "math", "listening", "dragAndDrop"];
		this.tasksGroupsNumbers = {
			"pictures" : 0,
			"translate" : 0,
			"math" : 0,
			"listening" : 0,
			"dragAndDrop" : 0
		};
		this.currentTaskGroup = "dragAndDrop";	
		this.taskQuestion = document.getElementById('question');
		this.taskWindow = document.getElementById('task');
		this.isFirstLevel = true;
		this.score = 0;
	}

	createCanvas(canvasParent) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1280;
		this.canvas.height = 720;
		canvasParent.appendChild(this.canvas);
	}


	init(enemyHP) {
		this.player = new PlayerEntity([100, 200], new Sprite(this.resources.get('player-sprite.png'), [0, 0], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 1], false), this.userName);
		this.enemy = new EnemyEntity([this.canvas.width - 300, 80], this.resources, enemyHP);
		this.isHpReduction = false;
		this.isPlayerWinLevel = false;
		this.isShowingAttackButton = true;

		if (this.isFirstLevel) {
			this.isFirstLevel = false;
			this.background = this.resources.get('background.jpg');

			this.addAttackButtonLogic();
			this.canvas.addEventListener('click', this.spellsOnWheelClickHandler.bind(this));
			this.canvas.addEventListener('mousemove', this.spellsOnWheelMousemoveHandler.bind(this));
			this.checkAnswerBtn.addEventListener('click', this.checkAnswerHanlder.bind(this));
			this.initEvents();

			this.lastTime = Date.now();
			this.main();
		}
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
		// if(this.startWheel){
		// 	this.picture.isMouseOnWheel();
		// 	this.picture.waitClick();
		// }

		this.spellCastingLogic(dt);
		this.hpReduction();
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
			
			this.activeSpellCastEntity.checkCollisionWithEntity(this.player.positionOnCanvas, this.player.sprite.sizeOnCanvas, this.enemy.entities[1].positionOnCanvas, this.enemy.entities[1].sprite.sizeOnCanvas);
			if (this.activeSpellCastEntity.spellCastEntity.sprite.done) {
				this.showspellCastEntity = false;
				this.isHpReduction = true;
			}
		}
	}


	hpReduction() {
		if (this.isHpReduction) {
			if (this.enemy.currentHP > this.enemy.newHP || this.player.currentHP > this.player.newHP) {
				this.isCorrectAnswer ? this.enemy.currentHP -= 0.5 : this.player.currentHP -= 0.5;
			} else {
				this.isHpReduction = false;
				
				if (this.enemy.currentHP === 80) {
					this.isPlayerWinLevel = true;
					this.LevelEnd();
				} else if (this.player.currentHP === 80) {
					this.LevelEnd();
				} else {
					this.isShowingAttackButton = true;
				}
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
					document.getElementById("select_task_group").style.display = "flex";
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
		document.getElementById('task').style.display = "none";
		this.SpellWindow.show = false;
		this.isCorrectAnswer = this.task.checkAnswer(this.currentTaskGroup);

		if (this.isCorrectAnswer) {
			this.clearTaskWindow();
			this.player.changesprite(new Sprite(this.resources.get('player-sprite.png'), [0, 464], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 3, 4, 0]));
			this.enemy.newHP = this.enemy.currentHP - 20;
			this.score += 20;

		} else {
			let attackEntityImgLink = this.enemy.entities[1].sprite.img.src.split("/").pop().split(".")[0] + '-attack.png';
			this.enemy.attack(new Sprite(this.resources.get(attackEntityImgLink), [0, 0], [246, 170], [246 / 2, 170 / 2], 5, [0, 1, 2, 1, 0]));
			this.activeSpellCastEntity = new SpellEntity();
			this.activeSpellCastEntity.addSpellCastEntity('right', new Sprite(this.resources.get('enemy-spell-sprite.png'), [0, 128], [256, 128], [256, 128], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5], true));
			this.player.newHP = this.player.currentHP - 20;
			this.score = this.score === 0 ? 0 : this.score - 20;
		};
		setTimeout(() => {
			this.activeSpellCastEntity.setPositionOnCanvas(this.player.positionOnCanvas, this.player.sprite.sizeOnCanvas, this.enemy.entities[1].positionOnCanvas, this.enemy.entities[1].sprite.sizeOnCanvas);
			this.showspellCastEntity = true;
		}, 700);
	}

	clearTaskWindow(){
		switch (this.currentTaskGroup) {
			case "listening":
				let audio = document.querySelector('#question audio');
				let button = document.querySelector('#question .playAudio');

				this.taskQuestion.removeChild(audio);
				this.taskQuestion.removeChild(button);
				break;

			case "pictures":
				let img = document.querySelector('#question img');
				this.taskQuestion.removeChild(img);
				break;

			case "dragAndDrop":
				document.getElementById('gamer_answer').style.display = 'block';
				document.getElementById("sortable").style.display = 'none';
				break;
			
			default:
				document.querySelector("#question").innerHTML = '';
	
		}
	};

	LevelEnd() {
		if (this.isPlayerWinLevel) {
			console.log('player Win');
			this.enemy.die();
			if (this.enemy.maxHP === 120) {
				document.querySelector('#winGameModal p').innerText += this.score;
				this.addScoreToHighScoreTable();
				document.getElementById('winGameModal').style.display = 'block';
			} else {
				document.getElementById('passLevelModal').style.display = 'block';
			}
		} else {
			console.log('enemy Win');
			this.player.changesprite(new Sprite(this.resources.get('player-sprite.png'), [0, 928], [634, 464], [634 / 2, 464 / 2], 5, [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3], true));
			document.querySelector('#loseGameModal p').innerText += this.score;
			this.addScoreToHighScoreTable();
			document.getElementById('loseGameModal').style.display = 'block';
		}
	}


	initEvents() {
		document.getElementById('nextLevelButton').addEventListener('click', () => {
			document.getElementById('passLevelModal').style.display = 'none';
			this.init(this.enemy.maxHP + 20);
		});

		document.querySelectorAll('.newGameButton').forEach(element => {
			element.addEventListener('click', () => {
				document.location.reload();
			});
		});

		document.querySelectorAll('.showHighScoresButton').forEach(element => {
			element.addEventListener('click', () => {
				document.getElementById('highScoreTable').style.display = 'block';
			});
		});

		document.getElementById('closehighScoreTableButton').addEventListener('click', () => {
			document.getElementById('highScoreTable').style.display = 'none';
		});

		document.getElementById("select_task_group").addEventListener('click', (event)=>{
			let target = event.target;
			if(target.tagName != 'DIV') return;
			this.currentTaskGroup = target.innerHTML;
			console.log('this.currentTaskGroup', this.currentTaskGroup, target);
			document.getElementById("select_task_group").style.display = "none";	

			this.canvas.style.cursor = 'default';
			this.taskWindow.style.display = "block";
			this.task = new Task(this.resources, this.taskQuestion);
			console.log(this.taskNumber, 'this.taskNumber', this.taskQuestion, 'this.taskQuestion');

			this.task.createTask(this.currentTaskGroup, this.tasksGroupsNumbers[this.currentTaskGroup]);
			this.tasksGroupsNumbers[this.currentTaskGroup]++;
		});
	}

	addScoreToHighScoreTable() {
		let highScore = JSON.parse(localStorage.getItem('mentalkombat-game-results'));
		if (!highScore) {
			highScore = [];
		}
		highScore.push([this.userName, this.score]);
		highScore.sort((a, b) => b[1] - a[1]);
		highScore = highScore.slice(0, 20);
		localStorage.setItem('mentalkombat-game-results', JSON.stringify(highScore));

		let table = document.querySelector('#highScoreTable table');
		this.addRowToTable(table, 'th', 'Name', 'Score');

		highScore.forEach(element => {
			this.addRowToTable(table, 'td', element[0], element[1]);
		});
	}

	
	addRowToTable(table, tag, text1, text2) {
		let tableRow = document.createElement('tr');
		let tableData1 = document.createElement(tag);
		let tableData2 = document.createElement(tag);
		tableData1.textContent = text1;
		tableData2.textContent = text2;
		tableRow.appendChild(tableData1);
		tableRow.appendChild(tableData2);
		table.appendChild(tableRow);
	}
}

export default Game;