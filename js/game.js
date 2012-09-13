jewel.game = (function() {
	
    function showScreen(screenId) {
		$('.screen').removeClass('active');
		$('#'+screenId).addClass('active');
		console.log(screenId);
	}
	
	return {
		showScreen: showScreen
	};

})();
		
