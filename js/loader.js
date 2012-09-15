var jewel = {
    screens: {}
};

window.addEventListener('load', function() {
	Modernizr.addTest("standalone", function() {
		return(window.navigator.standalone != false);
	});

	Modernizr.load([
	{
		load: [
			"js/jquery.js",
			"js/game.js"
		]
	}, {
		test: Modernizr.standalone,
		yep: "js/screen.splash.js",
		nope: "js/screen.install.js",
		
		complete: function() {
			if(Modernizr.standalone) {
				jewel.game.showScreen("splash-screen");
			} else {
				jewel.game.showScreen("install-screen");
			}
		}
	}
]);

if(Modernizr.standalone) {
	Modernizr.load([
	{
		load: [
            "js/screen.main-menu.js"
		]	
	}
	]);
}
