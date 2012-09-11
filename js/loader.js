var jewel = {};

window.addEventListener('load', function() {
	Modernizr.load([
	{
		load: [
			"js/jquery.js",
			"js/dom.js",
			"js/game.js"
		],
		
		complete: function () {
			console.log('All files loaded!');
		}
	}
	]);
}, false);
