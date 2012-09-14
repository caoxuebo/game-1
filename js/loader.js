var jewel = {
    screens: {}
};

window.addEventListener('load', function() {
	Modernizr.load([
	{
		load: [
			"js/jquery.js",
			"js/game.js",
            "js/screen.splash.js",
            "js/screen.main-menu.js"
		],
		
		complete: function () {
			jewel.game.showScreen("splash-screen");	
            console.log('load complete!');
		}
	}
	]);
}, false);
