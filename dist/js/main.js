!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="dist/",i(i.s=1)}([function(t){t.exports={d:[{word:"dog",translation:["собака","собачка"]},{word:"cat",translation:["кот","котик","кошка"]},{word:"man",translation:["человек","мужчина"]},{word:"house",translation:["дом","домик"]}]}},function(t,e,i){"use strict";i.r(e);var s=class{constructor(t,e,i,s,n,a,r){this.img=t,this.positionOnImg=e,this.sizeOnImg=i,this.speed="number"==typeof n?n:0,this.frames=a,this.once=r,this.sizeOnCanvas=s,this.index=0,this.newSpriteFramesNumber=0,this.isNewSpriteActive=!1,this.oldSpriteOptions=null}update(t){this.index+=this.speed*t}applyingNewSprite(){this.index<this.state+this.newSpriteFramesNumber?this.isNewSpriteActive=!0:!0===this.isNewSpriteActive&&(this.isNewSpriteActive=!1,this.url=this.oldSpriteOptions.url,this.positionOnImg=this.oldSpriteOptions.positionOnImg,this.sizeOnImg=this.oldSpriteOptions.sizeOnImg,this.frames=this.oldSpriteOptions.frames)}render(t){let e;if(this.applyingNewSprite(),this.speed>0){let t=this.frames.length,i=Math.floor(this.index);if(e=this.frames[i%t],this.once&&i>=t)return void(this.done=!0)}else e=0;let i=this.positionOnImg[0],s=this.positionOnImg[1];i+=e*this.sizeOnImg[0],t.drawImage(this.img,i,s,this.sizeOnImg[0],this.sizeOnImg[1],0,0,this.sizeOnCanvas[0],this.sizeOnCanvas[1])}};var n=class{constructor(){this.resourceCache={},this.readyCallbacks=[],this.images={}}load(t){let e=i(42);t.forEach(t=>this.images[t]=e("./"+t));for(let t in this.images)this._load(t)}_load(t){if(this.resourceCache[t])return this.resourceCache[t];var e=new Image;e.addEventListener("load",()=>{this.resourceCache[t]=e,this.isReady()&&this.readyCallbacks.forEach(function(t){t()})}),this.resourceCache[t]=!1,e.src=this.images[t]}get(t){return this.resourceCache[t]}isReady(){var t=!0;for(var e in this.resourceCache)this.resourceCache.hasOwnProperty(e)&&!this.resourceCache[e]&&(t=!1);return t}onReady(t){this.readyCallbacks.push(t)}};var a=class{constructor(t,e){this.positionOnCanvas=t,this.sprite=e}changesprite(t){this.sprite=t}};var r=class extends a{constructor(t,e,i){super(t,e),this.name=i,this.isHpReducing=!1,this.currentHP=100,this.newHP=100,this.maxHP=100}attack(t){let e={url:this.sprite.url,positionOnImg:this.sprite.positionOnImg,sizeOnImg:this.sprite.sizeOnImg,frames:this.sprite.frames};super.changesprite(t),this.sprite.state=this.sprite.index,this.sprite.newSpriteFramesNumber=t.frames.length,this.sprite.oldSpriteOptions=e}};let h=["Terrible","Vile","Monstrous","Spiteful","Snotty","Demonic","Ghastly","Damnable","Abominable"],o=["Ogr","Goblin","Zombie","Bugbear","Demon","Scarecrow","Lucifer","Undead","Devil","Vampire","Ghoul"],l=["Aaron","Bob","Brody","Charlie","Cole","Dylan","Eric","Grant","Henry","Jack","Morgan","Sherie","York"],p=["head1.png","head2.png","head3.png","head4.png","head5.png"],c=["body1.png","body2.png","body3.png","body4.png","body5.png"],d=["legs1.png","legs2.png","legs3.png","legs4.png","legs5.png"];var g=class{constructor(t,e){this.positionOnCanvas=t,this.name=`${this.getRandomElement(h)} ${this.getRandomElement(o)} ${this.getRandomElement(l)}`,this.entities=[],this.booleanValuesForAnimation=[[!0],[!0],[!0]],this.enemyGeneration(e),this.speed=10,this.isHpReducing=!1,this.currentHP=100,this.newHP=100,this.maxHP=100}getRandomElement(t){return t[Math.floor(Math.random()*t.length)]}enemyGeneration(t){let e=this.positionOnCanvas[0],i=this.positionOnCanvas[1];this.bodyParts={legs:{url:this.getRandomElement(d),startPosition:[e+0,i+255],animateOptions:{isVertical:0,distance:2,speed:6}},body:{url:this.getRandomElement(c),startPosition:[e-3,i+220],animateOptions:{isVertical:0,distance:1,speed:3}},head:{url:this.getRandomElement(p),startPosition:[e+20,i+160],animateOptions:{isVertical:1,distance:1,speed:3}}};for(let e in this.bodyParts)this.entities.push(new a([this.bodyParts[e].startPosition[0],this.bodyParts[e].startPosition[1]],new s(t.get(this.bodyParts[e].url),[0,0],[200,200],[100,100])))}idleAnimate(t){let e=0;for(let i in this.bodyParts)this.changeAnimatePosition(t,this.entities[e],this.bodyParts[i]),e++}changeAnimatePosition(t,e,i){let s=i.startPosition,n=i.animateOptions.isVertical,a=i.animateOptions.distance;(e.positionOnCanvas[n]>s[n]+a||e.positionOnCanvas[n]<s[n]-a)&&(i.animateOptions.speed=-i.animateOptions.speed),e.positionOnCanvas[n]+=i.animateOptions.speed*t}};var m=class{constructor(t,e,i,s,n){this.x=t,this.y=e,this.radius=i,this.color=n,this.ctx=s,this.draw=(()=>{this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.ctx.fillStyle=this.color,this.ctx.fill(),this.ctx.closePath})}update(){}};var u=class{constructor(t,e,i,s,n){this.isWheelStop=!1,this.imgWheel=t,this.context=e,this.width=i,this.height=s,this.ang=n,this.Spell1=new m(630,500,70,this.context,"#2185C5"),this.Spell2=new m(500,330,70,this.context,"#7ECEFD"),this.Spell3=new m(630,190,70,this.context,"#FFF6E5"),this.Spell4=new m(810,330,70,this.context,"#FF7F66")}animateWheel(){if(!this.isWheelStop){let t=this.imgWheel,e=t.width,i=t.height;this.context.save(),this.context.translate(this.width/2,this.height/2),this.context.rotate(Math.PI/180*(this.ang+=.2)),this.context.translate(-this.width/2,-this.height/2),this.context.drawImage(this.imgWheel,this.width/2-e/2,this.height/2-i/2,e,i),this.Spell1.draw(),this.Spell2.draw(),this.Spell3.draw(),this.Spell4.draw(),this.context.restore()}}stopWheel(){this.isWheelStop=!0,this.context.save(),this.context.translate(this.width/2,this.height/2),this.context.rotate(Math.PI/180*this.ang),this.context.translate(-this.width/2,-this.height/2),this.context.drawImage(this.imgWheel,this.width/2-this.imgWheel.width/2,this.height/2-this.imgWheel.height/2,this.imgWheel.width,this.imgWheel.height),this.Spell1.draw(),this.Spell2.draw(),this.Spell3.draw(),this.Spell4.draw(),this.context.restore()}};var w=class{static drawAttackButton(t,e,i,s,n,a){t.save(),t.lineWidth=2,t.strokeStyle="#000000",t.fillStyle="#abc",t.fillRect(i,s,n,a),t.strokeRect(i,s,n,a),t.font="20px Arial",t.textAlign="center",t.textBaseline="middle",t.fillStyle="#000000",t.fillText(e,i+n/2,s+a/2),t.restore()}static drawEntitiesInfoImage(t,e,i,s,n,a){t.save(),t.beginPath(),t.arc(i,s,Math.sqrt(n*n+a*a)/2,0,2*Math.PI,!0),t.closePath(),t.lineWidth=5,t.strokeStyle="#ddd",t.stroke(),t.clip(),t.translate(i,s),t.drawImage(e,-n/2,-a/2,n,a),t.restore()}static drawHealthBar(t,e,i,s,n,a,r,h,o,l){t.save(),l&&t.translate(t.canvas.width,0),t.scale(h,o),t.fillStyle="red",t.fillRect(e,i,s,a),t.lineWidth=3,t.strokeStyle="#ddd",t.strokeRect(e,i,n,a),t.scale(h,o),t.font="18px Arial",t.textAlign="center",t.textBaseline="middle",t.fillStyle="#000000";let p=1;l&&(p=-1),t.fillText(r,p*(e+n/2),i+a/2),t.restore()}static drawEntityName(t,e,i,s,n){t.save(),t.font="20px Arial",t.textBaseline="top",n&&(t.textAlign="right"),t.fillStyle="yellow",t.fillText(e,i,s),t.restore()}},f=i(0);var y=class{constructor(t,e,i){this.answer=null,this.number=null,this.text=e,this.answers=i,this.dict=f,this.userAnswer=null,this.rightAnswersArray=null}createTask(t){document.getElementById("question").innerHTML=this.dict.d[t].word,this.number=t,console.log("task created")}checkAnswer(){console.log(this.dict,this.number),this.rightAnswersArray=this.dict.d[0].translation,this.userAnswer=document.getElementById("gamer_answer").value;for(let t=0;t<=this.rightAnswersArray.length-1;t++)if(this.userAnswer==this.rightAnswersArray[t])return console.log("Super",this.userAnswer),!0}};var x=class{start(t){this.createCanvas(t),this.resources=new n,this.resources.load(["player-sprite.png","background.jpg","head1.png","head2.png","head3.png","head4.png","head5.png","body1.png","body2.png","body3.png","body4.png","body5.png","legs1.png","legs2.png","legs3.png","legs4.png","legs5.png","player-head.png","spell-water.png","wheel.png"]),this.resources.onReady(()=>this.init())}createCanvas(t){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=1280,this.canvas.height=720,t.appendChild(this.canvas)}init(){this.ang=0,this.background=this.resources.get("background.jpg"),this.player=new r([100,200],new s(this.resources.get("player-sprite.png"),[0,0],[634,464],[317,232],5,[0,1,2,1],!1),"Player"),this.enemy=new g([this.canvas.width-300,80],this.resources),this.addAttackButtonLogic(),document.getElementById("add_answer").addEventListener("click",this.checkAnswer.bind(this)),this.lastTime=Date.now(),this.main()}main(){let t=Date.now(),e=(t-this.lastTime)/1e3;this.update(e),this.render(),this.lastTime=t,requestAnimationFrame(this.main.bind(this))}update(t){this.player.sprite.update(t),this.enemy.idleAnimate(t),this.startWheel&&(this.picture.isMouseOnWheel(),this.picture.waitClick()),this.spellCastingLogic(t),this.enemyHpReduction()}render(){this.ctx.drawImage(this.background,0,0,this.canvas.width,this.canvas.height),this.renderEntity(this.player),this.enemy.entities.forEach(t=>{this.renderEntity(t)}),this.isShowingAttackButton&&w.drawAttackButton(this.ctx,"Attack!",140,500,200,50),this.drawEntitiesInfo(),this.spell&&this.renderEntity(this.spell),this.SpellWindow&&this.showWheel&&(!0===this.SpellWindow.isWheelStop?this.SpellWindow.stopWheel():this.SpellWindow.animateWheel())}renderEntity(t){this.ctx.save(),this.ctx.translate(t.positionOnCanvas[0],t.positionOnCanvas[1]),t.sprite.render(this.ctx),this.ctx.restore()}spellCastingLogic(t){this.spell&&(this.spell.isSpellMoving&&(this.spell.positionOnCanvas[0]+=10),this.spell.sprite.update(t),this.checkCollisionSpellWithEnemy(),this.spell.sprite.done&&(delete this.spell,this.enemy.isHpReduction=!0))}enemyHpReduction(){this.enemy.isHpReduction&&(this.enemy.currentHP>this.enemy.newHP?this.enemy.currentHP-=.5:(this.enemy.isHpReduction=!1,this.isShowingAttackButton=!0,this.canvas.addEventListener("click",this.attackButtonClickHanlder),this.canvas.addEventListener("mousemove",this.attackButtonMousemoveHanlder)))}checkCollisionSpellWithEnemy(){this.spell.positionOnCanvas[0]+this.spell.sprite.sizeOnCanvas[0]/2>this.enemy.entities[1].positionOnCanvas[0]+this.enemy.entities[1].sprite.sizeOnCanvas[0]/2&&(this.spell.isSpellMoving=!1)}drawEntitiesInfo(){w.drawEntitiesInfoImage(this.ctx,this.resources.get("player-head.png"),50,50,50,50),w.drawEntitiesInfoImage(this.ctx,this.enemy.entities[2].sprite.img,this.canvas.width-50,50,50,50),w.drawHealthBar(this.ctx,100,25,3*this.player.currentHP,3*this.player.maxHP,20,Math.floor(this.player.currentHP)+" / "+this.player.maxHP,1,1,!1),w.drawHealthBar(this.ctx,100,25,3*this.enemy.currentHP,3*this.enemy.maxHP,20,Math.floor(this.enemy.currentHP)+" / "+this.enemy.maxHP,-1,1,!0),w.drawEntityName(this.ctx,this.player.name,100,50,!1),w.drawEntityName(this.ctx,this.enemy.name,this.canvas.width-100,50,!0)}addAttackButtonLogic(){this.attackButtonParameters={x1:140,y1:500,x2:340,y2:550},this.isShowingAttackButton=!0,this.attackButtonClickHanlder=this.attackButtonClickHanlder.bind(this),this.canvas.addEventListener("click",this.attackButtonClickHanlder),this.attackButtonMousemoveHanlder=this.attackButtonMousemoveHanlder.bind(this),this.canvas.addEventListener("mousemove",this.attackButtonMousemoveHanlder),this.stopWheelOnMousemoveHandler=this.stopWheelOnMousemoveHandler.bind(this),this.canvas.addEventListener("mousemove",this.stopWheelOnMousemoveHandler)}attackButtonClickHanlder(t){let e=t.pageX-t.target.offsetLeft,i=t.pageY-t.target.offsetTop;e>this.attackButtonParameters.x1&&e<this.attackButtonParameters.x2&&i>this.attackButtonParameters.y1&&i<this.attackButtonParameters.y2&&(this.canvas.removeEventListener("click",this.attackButtonClickHanlder),this.canvas.style.cursor="default",this.canvas.removeEventListener("mousemove",this.attackButtonMousemoveHanlder),this.isShowingAttackButton=!1,this.ang=0,this.showWheel=!0,this.SpellWindow=new u(this.resources.get("wheel.png"),this.ctx,this.canvas.width,this.canvas.height,70,this.ang),this.SpellWindow.wheelRadius=280,this.canvas.addEventListener("click",this.createTaskHandler.bind(this)))}attackButtonMousemoveHanlder(t){let e=t.pageX-t.target.offsetLeft,i=t.pageY-t.target.offsetTop;e>this.attackButtonParameters.x1&&e<this.attackButtonParameters.x2&&i>this.attackButtonParameters.y1&&i<this.attackButtonParameters.y2?this.canvas.style.cursor="pointer":this.canvas.style.cursor="default"}stopWheelOnMousemoveHandler(t){this.SpellWindow&&(t.x-760<=this.SpellWindow.wheelRadius&&t.x-760>-this.SpellWindow.wheelRadius&&t.y-380<=this.SpellWindow.wheelRadius&&t.y-380>-this.SpellWindow.wheelRadius?this.SpellWindow.isWheelStop=!0:this.SpellWindow.isWheelStop=!1)}checkAnswer(){this.task.checkAnswer()&&(document.getElementById("task").style.display="none",this.showWheel=!1,this.player.attack(new s(this.resources.get("player-sprite.png"),[0,464],[634,464],[317,232],5,[0,1,2,3,4,0])),setTimeout(()=>this.createSpell(),700))}createTaskHandler(t){t.x-760<=this.SpellWindow.wheelRadius&&t.x-760>-this.SpellWindow.wheelRadius&&t.y-380<=this.SpellWindow.wheelRadius&&t.y-380>-this.SpellWindow.wheelRadius&&(document.getElementById("task").style.display="block",this.task=new y,this.task.createTask(0),this.canvas.removeEventListener("click",this.createTaskHandler))}createSpell(){this.enemy.currentHP>0&&(this.enemy.newHP=this.enemy.currentHP-20),this.spell=new a([this.player.positionOnCanvas[0]+this.player.sprite.sizeOnCanvas[0],this.player.sprite.sizeOnCanvas[1]+this.player.sprite.sizeOnCanvas[1]/2-92],new s(this.resources.get("spell-water.png"),[0,0],[184,184],[184,184],7,[0,1,2,3,4,3,2,3,4,3,2,3,4,5,6,7,8,9,10],!0)),this.spell.isSpellMoving=!0}};i(47),i(2);(new x).start(document.body)},function(t,e){},function(t,e,i){t.exports=i.p+"img/wheel2.png"},function(t,e,i){t.exports=i.p+"img/wheel.png"},function(t,e,i){t.exports=i.p+"img/wheel.jpg"},function(t,e,i){t.exports=i.p+"img/water1.jpg"},function(t,e,i){t.exports=i.p+"img/water-explosion-special-effect-fx-animation-frames-sprite-sheet-vortex-M6E8H7.jpg"},function(t,e,i){t.exports=i.p+"img/sprite-sheet-water-wave-splashes-260nw-535514053.jpg"},function(t,e,i){t.exports=i.p+"img/sprite-sheet-water-pillar-trap-260nw-1040354470.jpg"},function(t,e,i){t.exports=i.p+"img/sprite-sheet-fire-torch-animation-260nw-1050560345.jpg"},function(t,e,i){t.exports=i.p+"img/spell_wheel.png"},function(t,e,i){t.exports=i.p+"img/spell-water.png"},function(t,e,i){t.exports=i.p+"img/player-sprite.png"},function(t,e,i){t.exports=i.p+"img/player-idle-sprite.png"},function(t,e,i){t.exports=i.p+"img/player-head.png"},function(t,e,i){t.exports=i.p+"img/player-attack-sprite.png"},function(t,e,i){t.exports=i.p+"img/legs5.png"},function(t,e,i){t.exports=i.p+"img/legs4.png"},function(t,e,i){t.exports=i.p+"img/legs3.png"},function(t,e,i){t.exports=i.p+"img/legs2.png"},function(t,e,i){t.exports=i.p+"img/legs1.png"},function(t,e,i){t.exports=i.p+"img/images.jpg"},function(t,e,i){t.exports=i.p+"img/imageproxy.jpg"},function(t,e,i){t.exports=i.p+"img/head5.png"},function(t,e,i){t.exports=i.p+"img/head4.png"},function(t,e,i){t.exports=i.p+"img/head3.png"},function(t,e,i){t.exports=i.p+"img/head2.png"},function(t,e,i){t.exports=i.p+"img/head1.png"},function(t,e,i){t.exports=i.p+"img/fire-explosion-special-effect-fx-animation-frames-sprite-sheet-vortex-M6E8H8.jpg"},function(t,e,i){t.exports=i.p+"img/enemy-idle-sprite.png"},function(t,e,i){t.exports=i.p+"img/d5508e88029e715cad30397e553fa630.jpg"},function(t,e,i){t.exports=i.p+"img/body5.png"},function(t,e,i){t.exports=i.p+"img/body4.png"},function(t,e,i){t.exports=i.p+"img/body3.png"},function(t,e,i){t.exports=i.p+"img/body2.png"},function(t,e,i){t.exports=i.p+"img/body1.png"},function(t,e,i){t.exports=i.p+"img/background.jpg"},function(t,e,i){t.exports=i.p+"img/Sprites-JenniferBaldwin.gif"},function(t,e,i){t.exports=i.p+"img/Elements-0.png"},function(t,e,i){t.exports=i.p+"img/Dragon_Breath_noBG.png"},function(t,e,i){t.exports=i.p+"img/88b56c648431076fb611f0c0cbbdc1bd.png"},function(t,e,i){var s={"./88b56c648431076fb611f0c0cbbdc1bd.png":41,"./Dragon_Breath_noBG.png":40,"./Elements-0.png":39,"./Sprites-JenniferBaldwin.gif":38,"./background.jpg":37,"./body1.png":36,"./body2.png":35,"./body3.png":34,"./body4.png":33,"./body5.png":32,"./d5508e88029e715cad30397e553fa630.jpg":31,"./enemy-idle-sprite.png":30,"./fire-explosion-special-effect-fx-animation-frames-sprite-sheet-vortex-M6E8H8.jpg":29,"./head1.png":28,"./head2.png":27,"./head3.png":26,"./head4.png":25,"./head5.png":24,"./imageproxy.jpg":23,"./images.jpg":22,"./legs1.png":21,"./legs2.png":20,"./legs3.png":19,"./legs4.png":18,"./legs5.png":17,"./player-attack-sprite.png":16,"./player-head.png":15,"./player-idle-sprite.png":14,"./player-sprite.png":13,"./spell-water.png":12,"./spell_wheel.png":11,"./sprite-sheet-fire-torch-animation-260nw-1050560345.jpg":10,"./sprite-sheet-water-pillar-trap-260nw-1040354470.jpg":9,"./sprite-sheet-water-wave-splashes-260nw-535514053.jpg":8,"./water-explosion-special-effect-fx-animation-frames-sprite-sheet-vortex-M6E8H7.jpg":7,"./water1.jpg":6,"./wheel.jpg":5,"./wheel.png":4,"./wheel2.png":3};function n(t){var e=a(t);return i(e)}function a(t){var e=s[t];if(!(e+1)){var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}return e}n.keys=function(){return Object.keys(s)},n.resolve=a,t.exports=n,n.id=42},,,,,function(t,e){}]);