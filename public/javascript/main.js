// Header of the index page
var header 		  = document.querySelector('header');
var socialNetwork = document.querySelector('.contato');

// Calling all links on mnu navBar using on function in down more
var linkOfMenu = Array.from(document.querySelectorAll('nav a'));

// Main tag of the index page
var main = document.querySelector('main');
var defaultTitle = 'João Augusto - Web Developer';

// Menu Index Page and another pages too
var menu 		= document.querySelector('nav');
var buttonAbout = menu.children[0];
var ul 			= menu.children[1];
var buttonMenu 	= menu.children[2];

// Function to effects with click or press button on keyboard
var effectToggle = function () {	
	header.classList.toggle('effect');
	main.classList.toggle('effect-main');
	buttonAbout.classList.toggle('color');
	buttonMenu.classList.toggle('white');

};

// Calling the function
buttonAbout.addEventListener('click', effectToggle);

// Function to effect on menu navigation
var effectMenuToggle = function () {
	ul.classList.toggle('show-ul');
	buttonMenu.classList.toggle('color');
};

// Calling the function on the event click
buttonMenu.addEventListener('click', effectMenuToggle);

var ajax = function (url, callback) {
	var request = new XMLHttpRequest();

	request.open('GET', url, true);

	request.addEventListener('load', function () {
		callback(request.responseText);
	});

	request.send(null);
};

// Calling the function on the event prees button on the keyboard
window.addEventListener('keydown', function (event) {
	var key = event.keyCode;
	if(event.shiftKey) return;

	var link = document.querySelector('nav a[data-key="'+ event.keyCode +'"]');

	if (key === 40 || key === 38) effectToggle();
	if (key === 39 || key === 37 || key === 27) effectMenuToggle();
	if (!link) return;

	var pushObj = link.href;
	var href = link.href.split('/');
	if (href[3] === '') href[3] = 'scape';

	ajax('views/'+ href[3] + '.html', function (data) {
		  header.innerHTML = data;
	});	

	history.pushState({pushObj}, '', link.href);

	document.title = link.title;
	if(document.title === '') document.title = defaultTitle;
});


linkOfMenu.forEach(function (itens) {
	itens.addEventListener('click', function (event) {
		event.preventDefault();

		effectMenuToggle();

		var href = this.href.split('/');
		var pushObj = this.href;

		if (href[3] === '') href[3] = 'scape';

		ajax('views/'+ href[3] + '.html', function (data) {
			  header.innerHTML = data;
		});

		history.pushState({pushObj}, '', this.href);

		document.title = this.title;
		if(document.title === '') document.title = defaultTitle;
	});
});

// Retorna com o back e o forward do browser
window.addEventListener('popstate', function (event) {

	if(event.state === null) {
		document.title = defaultTitle;

		ajax('views/scape.html', function (data) {
			  header.innerHTML = data;
		});
	}

	var newhref = event.state.pushObj;
	var split = newhref.split('/');


	document.title = split[3].toUpperCase();

	if(split[3] === '') {
		split[3] = 'scape';
		document.title = defaultTitle;
	}

	ajax('views/'+ split[3] + '.html', function (data) {
		  header.innerHTML = data;
	});

});


// Initial effect
socialNetwork.style.opacity = 0;
document.querySelector('.logo').addEventListener('animationend', function () {
	menu.classList.add('opacity');
	socialNetwork.style.opacity = 1;
});
