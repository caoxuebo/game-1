var jewel = {
    screens: {},
	images: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		numJewelTypes: 7
	}
};

window.addEventListener('load', function() {

	var jewelProto = document.getElementById("jewel-proto"), rect = jewelProto.getBoundingClientRect();
	jewel.settings.jewelSize = rect.width;
		
	Modernizr.addTest("standalone", function() {
		return(window.navigator.standalone != false);
	});

	yepnope.addPrefix("preload", function(resource) {
		resource.noexec = true;
		return resource;
	});
	
	//loader
	var numPreload = 0, numLoaded = 0;
	yepnope.addPrefix("loader", function(resource) {
		console.log("Loading: "+resource.url);
		var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
		resource.noexec = isImage;
		numPreload++;
		resource.autoCallback = function(e){
			console.log("Finished loading: "+resource.url);
			numLoaded++;
			if(isImage){
				var image = new Image();
				image.src = resource.url;
				jewel.images[resource.url] = image;
			}
		};
		return resource;
	});
	
	function getLoadProgress() {
		if (numPreload > 0) {
			return numLoaded / numPreload;
		} else {
			return 0;
		}
	}
	
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
				jewel.game.showScreen("splash-screen", getLoadProgress);
			} else {
				jewel.game.showScreen("install-screen");
			}
		}
	}
	]);

	if(Modernizr.standalone) {
		Modernizr.load([
		{
			test: Modernizr.webworkers,
			yep: [
				"loader!js/board.js"
				//"preload!js/board.worker.js"
				],
			nope: "loader!js/board.js"
		}, {
			load: [
				"loader!js/display.canvas.js",
				"loader!js/screen.main-menu.js",
				"loader!js/screen.game.js",
				"loader!images/jewels" + jewel.settings.jewelSize + ".png"
			]	
		}
		]);
	}
});
