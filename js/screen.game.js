// function that calls the drawing functions
jewel.screens["game-screen"] = (function() {
	var board = jewel.board, display = jewel.display;
	
	// self explainitory -- calls board initialize with display.initialize callback with display.redraw call back
	// board sets up the math behind the board, display.init sets up canvas, display.redraw draws them onto the board
	function run() {
		board.initialize(function() {
			display.initialize(function() {
				display.redraw(board.getBoard(), function() {
				});
			});
		});
	}
	
	return {
		run: run
	};
})();