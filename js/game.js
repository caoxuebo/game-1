jewel.game = (function() {
	
    function showScreen(screenId) {
		$('#game .screen.active').removeClass('active');
		
		var args = Array.prototype.slice.call(arguments, 1);
		jewel.screens[screenId].run.apply(jewel.screens[screenId], args);

		$('#'+screenId).addClass('active');
	}
    
	function setup() {
	
		$('body').on('touchmove', function(e) {
			e.preventDefault();
		});

		if(/Android/.test(navigator.userAgent)) {
			$(document).height("200%");
			setTimeout(function() {
				window.scrollTo(0,1);
			}, 0);
		}
		
		createBackground();
	}
	
	function createBackground() {
		if(!Modernizr.canvas) return;
		var canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d"), background = $(".background")[0], 
		rect = background.getBoundingClientRect(), gradient, i;
		
		canvas.width = rect.width;
		canvas.height = rect.height;
		
		ctx.scale(rect.width, rect.height);
		gradient = ctx.createRadialGradient(
					0.25, 0.15, 0.5,
					0.25, 0.16, 1.0
				);
		gradient.addColorStop(0, "rgb(55,65,50)");
		gradient.addColorStop(1, "rgb(0,0,0)");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 1, 1);
		ctx.strokeStyle = "rgba(255,255,255,0.02)";
		ctx.strokeStyle = "rgba(0,0,0.2)";
		ctx.lineWidth = 0.008;
		ctx.beginPath();
		for(var i = 0; i < 2; i +=0.020) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i-1, 1);
		}
		ctx.stroke();
		$(".background").append(canvas);
	}

	return {
		showScreen: showScreen,
		setup: setup
	};

})();
		
