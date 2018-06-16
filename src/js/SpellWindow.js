import Spell from './Spell.js';
import GameSpell from './GameSpell.js';
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
        this.resources = new Resources();
        this.resources.load([
            'water-round-sprite.png',
            'fire-sprite.png',
            'wind-sprite-all.png',
            'wind-round-sprite.png'
        ]);
        this.isResourcesReady = false;
        this.resources.onReady(() => {
            this.GameSpellWater = new GameSpell([530, 440], new Sprite(this.resources.get('water-round-sprite.png'), [0, 0], [330, 340], [150, 155], 9, [4, 5, 6], false));
            this.GameSpellWater.addSpellCastAnimation('top', new Sprite(resources.get('spell-water.png'), [0, 0], [184, 184], [184, 184], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 10], true));
            
            this.GameSpellFire = new GameSpell([430, 150], new Sprite(this.resources.get('fire-sprite.png'), [0, 0], [512, 512], [227, 227], 6, [0, 1, 2, 0, 1, 2, 3, 2, 4, 5, 4, 5, 3, 4, 5, 4, 5], false));
            this.GameSpellFire.addSpellCastAnimation('bottom', new Sprite(this.resources.get('spell-fire.png'), [0, 0], [512, 512], [250, 250], 7, [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5], true));
            
            // this.GameSpellWind = new GameSpell([770, 200], new Sprite(this.resources.get('wind-sprite-all.png'), [0, 0], [230, 300], [140, 140], 9, [4, 5, 3, 4, 5, 6, 4, 5, 6, 3, 4, 5, 6, 4, 5, 6, 7, 8, 7, 6, 5 , 4 , 3, 2, 1, 0], false));            
            this.GameSpellWind = new GameSpell([710, 220], new Sprite(this.resources.get('wind-sprite-all.png'), [0, 0], [227, 202], [227, 202], 9, [5, 6, 7, 8], false));
            this.GameSpellWind.addSpellCastAnimation('left', new Sprite(this.resources.get('spell-water.png'), [0, 0], [184, 184], [184, 184], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 10], true));

            this.isResourcesReady = true;
    });
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
        if (this.isResourcesReady){
            // let lengthToWheelCenterX = this.width / 2 - 500 - 100 / 2;
            // console.log((lengthToWheelCenterX * Math.cos(Math.PI / 180 * this.ang)) - (lengthToWheelCenterX * Math.sin(Math.PI / 180 * this.ang)));
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
            // this.ctx.strokeRect(this.width / 2, this.height / 2, 50, (lengthToWheelCenterX * Math.cos(Math.PI / 180 * this.ang)) - (lengthToWheelCenterX * Math.sin(Math.PI / 180 * this.ang)));
        }
    }

    animateWheel() {
        
        if (!this.isWheelStop && this.isResourcesReady) {
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