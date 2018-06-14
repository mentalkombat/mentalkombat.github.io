import Spell from './Spell.js';
import GameSpell from './GameSpell.js';
import Sprite from './Sprite.js';
import Resources from "./Resources";

class SpellWindow {
    constructor(img, ctx, width, height, ang, dt) {
        this.isWheelStop = false;
        this.img = img;
        this.imgWidth = img.width;
        this.imgHeight = img.height;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.ang = ang;
        this.dt = dt
        this.Spell1 = new Spell(630, 500, 70, this.ctx, '#2185C5');
        this.Spell2 = new Spell(500, 330, 70, this.ctx, '#7ECEFD');
        this.Spell3 = new Spell(630, 190, 70, this.ctx, '#FFF6E5');
        this.Spell4 = new Spell(810, 330, 70, this.ctx, '#FF7F66');


        this.resources = new Resources();
        this.resources.load([
            'spell-water.png'
        ]);
        this.resources.onReady(() => console.log('loaded'));

        this.GameSpell = new GameSpell([100,200], new Sprite(this.resources.get('spell-water.png'), [0, 0], [184, 184], [184, 184], 7, [0, 1, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 7, 8, 9, 10], false))
    }

    render(spellWindow, showWindow, isWheelStop){
        if (spellWindow && showWindow) {
            if (isWheelStop === true) {
                this.stopWheel();
            } else {
                this.animateWheel();
            }
        }
	}

    draw(){
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(Math.PI / 180 * this.ang);
        this.ctx.translate(-this.width / 2, -this.height / 2);
        this.ctx.drawImage(this.img, this.width / 2 - this.imgWidth / 2, this.height / 2 - this.imgHeight / 2, this.imgWidth, this.imgHeight);

        this.Spell1.draw();
        this.Spell2.draw();
        this.Spell3.draw();
        this.Spell4.draw();
        this.GameSpell.sprite.update(this.dt);

        this.ctx.restore();
    }

    animateWheel() {
        if (!this.isWheelStop) {
            this.ang += .2;
            this.draw();
        }
    };

    stopWheel() {
        this.isWheelStop = true;
        this.draw();
    }
}

export default SpellWindow;