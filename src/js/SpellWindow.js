import Spell from './Spell.js';
import SpellEntity from './SpellEntity.js';
import Sprite from './Sprite.js';
import Resources from "./Resources";


class SpellWindow {
    constructor(img, ctx, width, height, ang, resources) {
        this.isWheelStop = false;
        this.img = img;
        this.imgWidth = img.width;
        this.imgHeight = img.height;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.ang = 0;
        this.dt = undefined;
            
        this.GameSpellWater = new SpellEntity([530, 440], new Sprite(resources.get('water-round-sprite.png'), [0, 0], [330, 340], [150, 155], 9, [4, 5, 6], false));
        this.GameSpellWater.addSpellCastAnimation('top', new Sprite(resources.get('spell-water.png'), [0, 0], [184, 184], [184, 184], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 10], true));
        this.spells = [];
        this.spells.push(this.GameSpellWater);
        
        this.GameSpellFire = new SpellEntity([430, 150], new Sprite(resources.get('fire-sprite.png'), [0, 0], [512, 512], [227, 227], 6, [0, 1, 2, 0, 1, 2, 3, 2, 4, 5, 4, 5, 3, 4, 5, 4, 5], false));
        this.GameSpellFire.addSpellCastAnimation('bottom', new Sprite(resources.get('spell-fire.png'), [0, 0], [512, 512], [250, 250], 7, [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5], true));
        this.spells.push(this.GameSpellFire);
        
        this.GameSpellWind = new SpellEntity([710, 220], new Sprite(resources.get('wind-sprite-all.png'), [0, 0], [227, 202], [227, 202], 9, [5, 6, 7, 8], false));
        this.GameSpellWind.addSpellCastAnimation('left', new Sprite(resources.get('spell-wind.png'), [0, 0], [192, 192], [192, 192], 7, [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], true));
        this.spells.push(this.GameSpellWind);
    };

    render(spellWindow, showWindow, isWheelStop, dt){
        this.dt = dt
        if (spellWindow && showWindow) {
            if (isWheelStop === true) {
                this.stopWheel();
            } else {
                this.animateWheel();
            }
        }
	}

    draw(angg){
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(Math.PI / 180 * angg);
        this.ctx.translate(-this.width / 2, -this.height / 2);
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
    }

    animateWheel() {
        
        if (!this.isWheelStop) {
            // this.draw(this.ang);
            this.GameSpellWater.sprite.update(this.dt);
            this.GameSpellFire.sprite.update(this.dt);
            this.GameSpellWind.sprite.update(this.dt);

        }
    };

    stopWheel() {
        // this.draw();
            this.GameSpellWater.sprite.update(this.dt);
            this.GameSpellFire.sprite.update(this.dt);
            this.GameSpellWind.sprite.update(this.dt);
    }
}

export default SpellWindow;