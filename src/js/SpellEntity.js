import Entity from './Entity.js';


export default class SpellEntity extends Entity {
	constructor(positionOnCanvas, sprite) {
		super(positionOnCanvas, sprite);
	}

	addSpellCastAnimation(direction, sprite) {
		this.spellCastAnimation = new Entity([0, 0], sprite);
		this.direction = direction;
		this.isSpellMoving = false;
	}

	isMouseOnSpell(mouseX, mouseY) {
		if (mouseX > this.positionOnCanvas[0] && 
			mouseX < this.positionOnCanvas[0] + this.sprite.sizeOnCanvas[0] && 
			mouseY > this.positionOnCanvas[1] && 
			mouseY < this.positionOnCanvas[1] + this.sprite.sizeOnCanvas[1]) {
			return true;            
		}
	}

	setPositionOnCanvas(playerPosition, playerSpriteSize, enemyPosition, enemySpriteSize) {
		switch(this.direction) {
			case 'left': {
				this.spellCastAnimation.positionOnCanvas = [playerPosition[0] + playerSpriteSize[0], playerSpriteSize[1] + playerSpriteSize[1] / 2 - this.spellCastAnimation.sprite.sizeOnCanvas[1] / 2];
				break;
			}
			case 'bottom': {
				this.spellCastAnimation.positionOnCanvas = [enemyPosition[0] + enemySpriteSize[0] / 2 - this.spellCastAnimation.sprite.sizeOnCanvas[0] / 2, enemyPosition[1] + 200];
				break;
			}
			case 'top': {
				this.spellCastAnimation.positionOnCanvas = [enemyPosition[0] + enemySpriteSize[0] / 2 - this.spellCastAnimation.sprite.sizeOnCanvas[0] / 2, enemyPosition[1] - 250];
			}
		}
	}

	checkCollisionWithEntity(entityPosition, entitySpriteSize) {
		switch(this.direction) {
			case 'left': {
				let spellCenterX = this.spellCastAnimation.positionOnCanvas[0] + this.spellCastAnimation.sprite.sizeOnCanvas[0] / 2;
				let enemyBodyCenterX = entityPosition[0] + entitySpriteSize[0] / 2;
				if (spellCenterX > enemyBodyCenterX) {
					this.isSpellMoving = false;
				}
				break;
			}
			case 'bottom': {
				let spellCenterY = this.spellCastAnimation.positionOnCanvas[1] + this.spellCastAnimation.sprite.sizeOnCanvas[1] / 2;
				let enemyBodyCenterY = entityPosition[1] + entitySpriteSize[1] / 2;
				if (spellCenterY < enemyBodyCenterY) {
					this.isSpellMoving = false;
				}
				break;
			}
			case 'top': {
				let spellCenterY = this.spellCastAnimation.positionOnCanvas[1] + this.spellCastAnimation.sprite.sizeOnCanvas[1] / 2;
				let enemyBodyCenterY = entityPosition[1] + entitySpriteSize[1] / 2;
				if (spellCenterY > enemyBodyCenterY) {
					this.isSpellMoving = false;
				}
			}
		}		
	}

	changePositionOnCanvas() {
		if (this.isSpellMoving) {
			switch(this.direction) {
				case 'left': {
					this.spellCastAnimation.positionOnCanvas[0] += 10;
					break;
				}
				case 'bottom': {
					this.spellCastAnimation.positionOnCanvas[1] -= 10;
					break;
				}
				case 'top': {
					this.spellCastAnimation.positionOnCanvas[1] += 10;
				}
			}		
		}
	}
}

