jewel.board = (function() {
	var settings, worker;
	
	function initialize(callback) {
		settings = jewel.settings;
		rows = settings.rows;
		cols = settings.cols;
		worker = new Worker("js/board.worker.js");
	}
})();