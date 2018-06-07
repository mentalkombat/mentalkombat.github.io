class Spell {
	constructor(x, y, radius, ctx, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.draw = () =>  {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI*2, false);
            ctx.fillstyle = color;
            ctx.fill();
            ctx.closePath;
        }
    }


}

export default Spell;