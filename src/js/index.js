import Game from './Game.js';
import '../sass/style.sass';
import $ from 'jquery';
import jqueryui from './jquery-ui.js'

let game = new Game(document.body);

$(function () {
	$("#sortable").sortable();
	$("#sortable").disableSelection();
});

document.getElementById('userForm').addEventListener('submit', (event) => {
	event.preventDefault();
	document.getElementById('firstScreen').style.display = 'none';
	let name = document.getElementById('userName').value;
	game.playerName = name;
	game.player.name = name;
});
