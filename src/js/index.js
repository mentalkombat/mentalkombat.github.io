import Game from './Game.js';
import '../sass/style.sass';
import events from './events.js';

let game = new Game();
game.start(document.body);

addEventListener('click', function(event) {

    var x = event.pageX,
        y = event.pageY;

        if (event.pageX > 660 
            && event.pageY > 140
            && event.pageX < 1000
            && event.pageY < 200) {
                console.log('d');
                game.main();
        }

}, false);
