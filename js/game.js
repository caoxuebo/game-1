jewel.game = (function() {
	
    function showScreen(screenId) {
		$('.screen').removeClass('active');
        jewel.screens[screenId].run();
		$('#'+screenId).addClass('active');
		console.log(screenId);
	}
	
	return {
		showScreen: showScreen
	};

})();
		
