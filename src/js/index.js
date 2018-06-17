import Game from './Game.js';
import '../sass/style.sass';
import $ from 'jquery';
import jqueryui from './jquery-ui.js'

let game = new Game();
game.start(document.body);

$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
});