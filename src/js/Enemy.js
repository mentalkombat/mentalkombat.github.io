let adjectives = ['Terrible', 'Vile', 'Monstrous', 'Spiteful', 'Snotty', 'Demonic', 'Ghastly', 'Damnable', 'Abominable'];
let kinds = ['Ogr', 'Goblin', 'Zombie', 'Bugbear', 'Demon', 'Scarecrow', 'Lucifer', 'Undead', 'Devil', 'Vampire', 'Ghoul'];
let names = ['Aaron', 'Bob', 'Brody', 'Charlie', 'Cole', 'Dylan', 'Eric', 'Grant', 'Henry', 'Jack', 'Morgan', 'Sherie', 'York'];


class Enemy {
	constructor() {
		this.name = `${this.getRandomElement(adjectives)} ${this.getRandomElement(kinds)} ${this.getRandomElement(names)}`;
	}

	getRandomElement(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
}


export default Enemy;
