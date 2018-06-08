import Entity from './Entity.js';
import Sprite from './Sprite.js';


let adjectives = ['Terrible', 'Vile', 'Monstrous', 'Spiteful', 'Snotty', 'Demonic', 'Ghastly', 'Damnable', 'Abominable'];
let kinds = ['Ogr', 'Goblin', 'Zombie', 'Bugbear', 'Demon', 'Scarecrow', 'Lucifer', 'Undead', 'Devil', 'Vampire', 'Ghoul'];
let names = ['Aaron', 'Bob', 'Brody', 'Charlie', 'Cole', 'Dylan', 'Eric', 'Grant', 'Henry', 'Jack', 'Morgan', 'Sherie', 'York'];

let heads = ['head1.png', 'head2.png'];
let bodies = ['body1.png', 'body2.png'];
let legs = ['legs1.png', 'legs2.png'];


class EnemyEntity {
	constructor(positionOnCanvas, resources) {
		this.positionOnCanvas = positionOnCanvas;
		this.name = `${this.getRandomElement(adjectives)} ${this.getRandomElement(kinds)} ${this.getRandomElement(names)}`;
		this.sprites = [];
		this.spriteGeneration(resources);
	}


	getRandomElement(array) {
		return array[Math.floor(Math.random() * array.length)];
	}


	spriteGeneration(resources) {
		let bodyParts = {
			legsPart: this.getRandomElement(legs),
			bodyPart: this.getRandomElement(bodies),
			headPart: this.getRandomElement(heads)
		};

		let x = this.positionOnCanvas[0],
			  y = this.positionOnCanvas[1];

		let spritesPosition = [
			[x + 0,  y + 210],
			[x - 5,  y + 120],
			[x + 45, y + 0]
		];

		let i = 0;
		for (let bodyPart in bodyParts) {
			this.sprites.push(new Entity(spritesPosition[i], new Sprite(resources.get(bodyParts[bodyPart]), [0, 0], [200, 200])));
			i++;
		}
	}
}


export default EnemyEntity;
