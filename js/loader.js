var jewel = {
    screens: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		numJewelTypes: 7
	}
};

window.addEventListener('load', function() {
	Modernizr.addTest("standalone", function() {
		return(window.navigator.standalone != false);
	});

	yepnope.addPrefix("preload", function(resource) {
		resource.noexec = true;
		return resource;
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
			jewel.game.setup();
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
		}, {
			test: Modernizr.webworkers,
			yep: [
				"js/board.worker-interface.js",
				"preload!js/board.worker.js"
				],
			nope: "js/board.js"
		}
		]);
	}
});
