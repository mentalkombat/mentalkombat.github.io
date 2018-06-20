import SpellEntity from './Entity/SpellEntity';
import Sprite from './Sprite.js';

class SpellWindow {
	constructor(img, ctx, width, height, resources) {
		this.isWheelStop = false;
		this.img = img;
		this.imgWidth = img.width;
		this.imgHeight = img.height;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.ang = 0;
		this.dt = undefined;
		this.spells = [];

		this.GameSpellWater = new SpellEntity([500, 420], new Sprite(resources.get('water-round-sprite.png'), [0, 0], [330, 340], [150, 155], 9, [4, 5, 6], false), 'dist/audio/spell-cast/water.mp3');
		this.GameSpellWater.addSpellCastEntity('top', new Sprite(resources.get('spell-water.png'), [0, 0], [184, 184], [184, 184], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 10], true));
		this.spells.push(this.GameSpellWater);

		this.GameSpellFire = new SpellEntity([430, 150], new Sprite(resources.get('fire-sprite.png'), [0, 0], [512, 512], [200, 200], 6, [0, 1, 2, 0, 1, 2, 3, 2, 4, 5, 4, 5, 3, 4, 5, 4, 5], false), 'dist/audio/spell-cast/fire.mp3');
		this.GameSpellFire.addSpellCastEntity('bottom', new Sprite(resources.get('spell-fire.png'), [0, 0], [512, 512], [250, 250], 7, [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5], true));
		this.spells.push(this.GameSpellFire);

		this.GameSpellWind = new SpellEntity([710, 250], new Sprite(resources.get('wind-round-sprite.png'), [0, 0], [131, 131], [160, 160], 9, [0, 1, 2, 3], false), 'dist/audio/spell-cast/wind.mp3');
		this.GameSpellWind.addSpellCastEntity('left', new Sprite(resources.get('spell-wind.png'), [0, 0], [192, 192], [192, 192], 7, [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], true));
		this.spells.push(this.GameSpellWind);

	};

	draw() {
		this.ctx.save();
		this.ctx.drawImage(this.img, this.width / 2 - this.imgWidth / 2, this.height / 2 - this.imgHeight / 2, this.imgWidth, this.imgHeight);

		this.ctx.translate(this.GameSpellWater.positionOnCanvas[0], this.GameSpellWater.positionOnCanvas[1]);
		this.GameSpellWater.sprite.render(this.ctx);
		this.ctx.translate(-this.GameSpellWater.positionOnCanvas[0], -this.GameSpellWater.positionOnCanvas[1]);

		this.ctx.translate(this.GameSpellFire.positionOnCanvas[0], this.GameSpellFire.positionOnCanvas[1]);
		this.GameSpellFire.sprite.render(this.ctx);
		this.ctx.translate(-this.GameSpellFire.positionOnCanvas[0], -this.GameSpellFire.positionOnCanvas[1]);

		this.ctx.translate(this.GameSpellWind.positionOnCanvas[0], this.GameSpellWind.positionOnCanvas[1]);
		this.GameSpellWind.sprite.render(this.ctx);
		this.ctx.translate(-this.GameSpellWind.positionOnCanvas[0], -this.GameSpellWind.positionOnCanvas[1]);
		this.ctx.restore();
	};

	update(dt) {
		this.draw();
		this.GameSpellWater.sprite.update(dt / 2);
		this.GameSpellFire.sprite.update(dt / 2);
		this.GameSpellWind.sprite.update(dt / 2);
	};
}

export default SpellWindow;