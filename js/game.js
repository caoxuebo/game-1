jewel.game = (function() {
	
    function showScreen(screenId) {
		$('.screen').removeClass('active');
        jewel.screens[screenId].run();
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
	}

	return {
		showScreen: showScreen,
		setup: setup
	};

})();
		
