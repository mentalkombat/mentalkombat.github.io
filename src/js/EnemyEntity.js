import Entity from './Entity.js';
import Sprite from './Sprite.js';


let adjectives = ['Terrible', 'Vile', 'Monstrous', 'Spiteful', 'Snotty', 'Demonic', 'Ghastly', 'Damnable', 'Abominable'];
let kinds = ['Ogr', 'Goblin', 'Zombie', 'Bugbear', 'Demon', 'Scarecrow', 'Lucifer', 'Undead', 'Devil', 'Vampire', 'Ghoul'];
let names = ['Aaron', 'Bob', 'Brody', 'Charlie', 'Cole', 'Dylan', 'Eric', 'Grant', 'Henry', 'Jack', 'Morgan', 'Sherie', 'York'];

let heads = ['head1.png', 'head2.png', 'head3.png', 'head4.png', 'head5.png'];
let bodies = ['body1.png', 'body2.png', 'body3.png', 'body4.png', 'body5.png'];
let legs = ['legs1.png', 'legs2.png', 'legs3.png', 'legs4.png', 'legs5.png'];


class EnemyEntity {
	constructor(positionOnCanvas, resources) {
		this.positionOnCanvas = positionOnCanvas;
		this.name = `${this.getRandomElement(adjectives)} ${this.getRandomElement(kinds)} ${this.getRandomElement(names)}`;
		this.sprites = [];
		this.booleanValuesForAnimation = [[true], [true], [true]];
		this.enemyGeneration(resources);
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
				startPosition: [x + 0, y + 205]
			},
			body: {
				url: this.getRandomElement(bodies),
				startPosition: [x - 5, y + 120]
			},
			head: {
				url: this.getRandomElement(heads),
				startPosition: [x + 45, y + 0]
			}
		};

		for (let bodyPart in this.bodyParts) {
			this.sprites.push(
				new Entity(
					[this.bodyParts[bodyPart].startPosition[0], this.bodyParts[bodyPart].startPosition[1]], 
					new Sprite(resources.get(this.bodyParts[bodyPart].url), [0, 0], [200, 200])
				));
		}
	}


	idleAnimate(dt) {
		let animateOptions = [
			{isVertical: 0, distance: 2, speed: 6 },
			{isVertical: 0, distance: 1, speed: 3 },
			{isVertical: 1, distance: 3, speed: 10},
		];

		let i = 0;
		for (let bodyPart in this.bodyParts) {
			this.changeAnimatePosition(
				this.booleanValuesForAnimation[i], 
				this.sprites[i], 
				dt, 
				this.bodyParts[bodyPart].startPosition, 
				animateOptions[i].isVertical, 
				animateOptions[i].distance, 
				animateOptions[i].speed
			);
			i++;
		}
	}


	changeAnimatePosition(booleanReference, entity, dt, startPosition, isVertical, distance, speed) {
		if (booleanReference[0] === true) {
			if (entity.positionOnCanvas[isVertical] > startPosition[isVertical] + distance) {
				booleanReference[0] = false;
			}
		}

		if (booleanReference[0] === false) {
			if (entity.positionOnCanvas[isVertical] < startPosition[isVertical] - distance) {
				booleanReference[0] = true;
			}
		}

		if (booleanReference[0]) {
			speed = speed;
		} else {
			speed = -speed;
		}
		entity.positionOnCanvas[isVertical] += speed * dt;
	}
}


export default EnemyEntity;
