jewel.game = (function() {
	
	function showScreen(screenId) {
		$('div').removeClass('active');
		$('#'+screenId).addCLass('active');
	}
	
	return {
		showScreen : showScreen
	};

})();
		
