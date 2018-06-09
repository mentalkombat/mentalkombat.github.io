class Spell {

	constructor(x, y, radius, ctx, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.draw = () =>  {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.closePath;
        }
    }
}

export default Spell;