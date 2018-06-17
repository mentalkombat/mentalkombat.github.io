import Entity from './Entity.js';
import Sprite from './Sprite.js';


let adjectives = ['Terrible', 'Vile', 'Monstrous', 'Spiteful', 'Snotty', 'Demonic', 'Ghastly', 'Damnable', 'Abominable'];
let kinds = ['Ogr', 'Goblin', 'Zombie', 'Bugbear', 'Demon', 'Scarecrow', 'Lucifer', 'Undead', 'Devil', 'Vampire', 'Ghoul'];
let names = ['Aaron', 'Bob', 'Brody', 'Charlie', 'Cole', 'Dylan', 'Eric', 'Grant', 'Henry', 'Jack', 'Morgan', 'Sherie', 'York'];

let heads = ['head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png'];
let bodies = ['body1.png', 'body2.png', 'body3.png', 'body4.png', 'body5.png'];
let legs = ['legs1.png', 'legs2.png', 'legs3.png', 'legs4.png', 'legs5.png'];


class EnemyEntity {
	constructor(positionOnCanvas, resources, enemyHP) {
		this.positionOnCanvas = positionOnCanvas;
		this.name = `${this.getRandomElement(adjectives)} ${this.getRandomElement(kinds)} ${this.getRandomElement(names)}`;
		this.entities = [];
		this.enemyGeneration(resources);
		this.speed = 10;
		this.isDead = false;

		this.isHpReducing = false;
		this.currentHP = enemyHP;
		this.newHP = enemyHP;
		this.maxHP = enemyHP;
	}


	getRandomElement(array) {
		return array[Math.floor(Math.random() * array.length)];
	}


	enemyGeneration(resources) {
		let x = this.positionOnCanvas[0],
				y = this.positionOnCanvas[1];

		this.bodyParts = { 
			legs:	{	
				url: this.getRandomElement(legs), 
				startPosition: [x + 0, y + 255],
				animateOptions: {isVertical: 0, distance: 2, speed: 6}
			},
			body: {
				url: this.getRandomElement(bodies),
				startPosition: [x - 31, y + 220],
				animateOptions: {isVertical: 0, distance: 1, speed: 3}
			},
			head: {
				url: this.getRandomElement(heads),
				startPosition: [x + 20, y + 160],
				animateOptions: {isVertical: 1, distance: 1, speed: 3}
			}
		};

		for (let bodyPart in this.bodyParts) {
			this.entities.push(
				new Entity(
					[this.bodyParts[bodyPart].startPosition[0], this.bodyParts[bodyPart].startPosition[1]], 
					new Sprite(resources.get(this.bodyParts[bodyPart].url), [0, 0], [246, 200], [246 / 2, 200 / 2])
				)
			);
		}
	}


	idleAnimate(dt) {
		let i = 0;
		if (!this.isDead) {
			for (let bodyPart in this.bodyParts) {
				this.changeAnimatePosition(dt, this.entities[i], this.bodyParts[bodyPart]);
				i++;
			}
		}
		this.entities[1].sprite.update(dt);
	}


	changeAnimatePosition(dt, entity, bodyPart) {
		let startPosition = bodyPart.startPosition,
				isVertical = bodyPart.animateOptions.isVertical,
				distance = bodyPart.animateOptions.distance;

		if (entity.positionOnCanvas[isVertical] > startPosition[isVertical] + distance || entity.positionOnCanvas[isVertical] < startPosition[isVertical] - distance) {
			bodyPart.animateOptions.speed = -bodyPart.animateOptions.speed;
		}
		
		entity.positionOnCanvas[isVertical] += bodyPart.animateOptions.speed * dt;
	}


	attack(attackSprite) {
		let spriteOptions = {
			img: this.entities[1].sprite.img,
			positionOnImg: this.entities[1].sprite.positionOnImg,
			sizeOnImg: this.entities[1].sprite.sizeOnImg,
			sizeOnCanvas: this.entities[1].sprite.sizeOnCanvas,
			speed: this.entities[1].sprite.speed,
			frames: this.entities[1].sprite.frames
		};

		this.entities[1].changesprite(attackSprite);
		this.entities[1].sprite.state = this.entities[1].sprite.index;
		this.entities[1].sprite.newSpriteFramesNumber = attackSprite.frames.length;

		this.entities[1].sprite.oldSpriteOptions = spriteOptions;
	}


	die() {
		this.isDead = true;
		this.entities[1].positionOnCanvas[0] += 70;
		this.entities[1].positionOnCanvas[1] += 50;
		this.entities[2].positionOnCanvas[0] += 140;
		this.entities[2].positionOnCanvas[1] += 100;
	}
}


export default EnemyEntity;
