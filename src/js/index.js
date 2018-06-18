import Game from './Game.js';
import '../sass/style.sass';
import $ from 'jquery';
import jqueryui from './jquery-ui.js'

document.getElementById('userForm').addEventListener('submit', (event) => {
	event.preventDefault();
	document.getElementById('firstScreen').style.display = 'none';
	
	let userName = document.getElementById('userName').value;
	let game = new Game(userName);
	game.start(document.body);
	
	$(function () {
		$("#sortable").sortable();
		$("#sortable").disableSelection();
	});
});