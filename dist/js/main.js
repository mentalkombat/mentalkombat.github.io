!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="dist/",i(i.s=4)}([function(t,e){},function(t,e,i){t.exports=i.p+"img/background.jpg"},function(t,e,i){t.exports=i.p+"img/enemy-idle-sprite.png"},function(t,e,i){t.exports=i.p+"img/player-idle-sprite.png"},function(t,e,i){"use strict";i.r(e);var s=class{constructor(t,e){this.positionOnCanvas=t,this.activeSprite=e}changeActiveSprite(t){this.activeSprite=t}};var n=class{constructor(t,e,i,s,n){this.url=t,this.positionOnImg=e,this.sizeOnImg=i,this.img=new Image,this.img.src=t,this.speed=s,this.frames=n,this._index=0}update(t){this._index+=this.speed*t}render(t){let e;if(this.speed>0){let t=this.frames.length,i=Math.floor(this._index);e=this.frames[i%t]}else e=0;let i=this.positionOnImg[0],s=this.positionOnImg[1];i+=e*this.sizeOnImg[0],t.drawImage(this.img,i,s,this.sizeOnImg[0],this.sizeOnImg[1],0,0,this.sizeOnImg[0],this.sizeOnImg[1])}};var a=class{constructor(t,e,i,s,n){this.x=t,this.y=e,this.radius=i,this.color=n,this.ctx=s,this.draw=(()=>{this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.ctx.fillStyle=this.color,this.ctx.fill(),this.ctx.closePath})}};var r=class{constructor(t,e,i,s,n,r){let h,c={x:void 0,y:void 0},o=new a(630,600,70,e,"#2185C5"),l=new a(420,330,70,e,"#7ECEFD"),d=new a(630,120,70,e,"#FFF6E5"),g=new a(880,330,70,e,"#FF7F66");t.onload=(()=>{this.animateWheel()}),this.animateWheel=(()=>{let a=t,c=a.width,p=a.height;h=setInterval(function(){e.save(),e.clearRect(0,0,i,s),e.translate(i/2,s/2),e.rotate(Math.PI/180*(r+=.1)),e.translate(-i/2,-s/2),e.drawImage(t,i/2-c/2,s/2-p/2,c,p),o.draw(),l.draw(),d.draw(),g.draw(),e.restore()},n)}),e.canvas.addEventListener("mousemove",function(t){c.x=t.x,c.y=t.y,p()});const p=()=>{console.log("yesdf"),c.x>500&&(e.save(),e.clearRect(0,0,i,s),e.translate(i/2,s/2),e.rotate(Math.PI/180*r),console.log(r),e.translate(-i/2,-s/2),e.drawImage(t,i/2-t.width/2,s/2-t.height/2,t.width,t.height),o.draw(),l.draw(),d.draw(),g.draw()),c.x<500&&(clearInterval(h),this.animateWheel())}}},h=(i(0),i(3)),c=i.n(h),o=(i(5),i(2)),l=i.n(o),d=i(1),g=i.n(d);let p,m={x:void 0,y:void 0};var u=class{createCanvas(t){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=1280,this.canvas.height=720,t.appendChild(this.canvas),this.ang=0,this.framesPerSeconds=70,this.imgWheel=new Image,this.imgWheel.src="/src/img/spell_wheel.png",this.ctx.canvas.addEventListener("mousemove",function(t){m.x=t.x,m.y=t.y})}init(t){this.createCanvas(t),this.background=new Image,this.background.src=g.a,this.player=new s([100,50],new n(c.a,[0,0],[428,380],5,[0,1,2,1])),this.enemy=new s([900,50],new n(l.a,[0,0],[233,373],5,[0,1,3,2,1])),this.lastTime=Date.now(),this.main("spelling")}main(t){let e=Date.now(),i=(e-this.lastTime)/1e3;this.update(i),"begining"===t?(this.render(),this.lastTime=e,requestAnimationFrame(this.main.bind(this,"begining")),this.drawBtnStartGame=(t=>{this.ctx.fillStyle=t,this.ctx.font="italic 38pt Arial",p=this.ctx.fillText("START GAME",550,200)}),this.drawBtnStartGame("red"),m.x>660&&m.y>140&&m.x<1e3&&m.y<200&&this.drawBtnStartGame("blue")):this.SpellWindow=new r(this.imgWheel,this.ctx,this.canvas.width,this.canvas.height,this.framesPerSeconds,this.ang)}update(t){this.player.activeSprite.update(t),this.enemy.activeSprite.update(t)}render(){this.ctx.drawImage(this.background,0,0,this.canvas.width,this.canvas.height),this.renderEntity(this.player),this.renderEntity(this.enemy)}renderEntity(t){this.ctx.save(),this.ctx.translate(t.positionOnCanvas[0],t.positionOnCanvas[1]),t.activeSprite.render(this.ctx),this.ctx.restore()}};i(10);let v=new u;v.init(document.body),addEventListener("click",function(t){t.pageX,t.pageY;t.pageX>660&&t.pageY>140&&t.pageX<1e3&&t.pageY<200&&(console.log("d"),v.main())},!1)},function(t,e,i){t.exports=i.p+"img/player-attack-sprite.png"},,,,,function(t,e){}]);