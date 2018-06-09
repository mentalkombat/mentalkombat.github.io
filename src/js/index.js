import Game from './Game.js';
import '../sass/style.sass';
import events from './events.js';

let game = new Game();
game.start(document.body);