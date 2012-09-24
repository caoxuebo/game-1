// function (-slash-object-property) that draws the jewels onto the board
jewel.display = (function() {

	//declare variables, import settings from main jewel settings
	var canvas, cursor, ctx, cols, rows, jewelSize, jewels, firstRun = true;
	cols = jewel.settings.cols;
	rows = jewel.settings.rows; 
	jewelSize = jewel.settings.jewelSize;
	
	//run the first time the function is called -- calls function to create jewel grid background
	function setup() {
		var boardElement = $('#game-screen .game-board')[0];
		canvas = $(".board")[0];
		ctx = canvas.getContext('2d');
		canvas.width = cols * jewelSize;
		canvas.height = rows * jewelSize;
		createBackground();
	}
	
	//helper function to clear cursor -- clears the canvas at an x,y loc
	function clearJewel(x, y) {
		ctx.clearRect(x * jewelSize, y * jewelSize, jewelSize, jewelSize);
	}
	
	//function to clear and redraw the jewel at a location
	function clearCursor() {
		if(cursor) {
			var x = cursor.x, y = cursor.y;
			clearJewel(x, y);
			drawJewel(jewels[x][y], x, y);
		}
	}
	
	//function that sets a cursors location and a specific position
	function setCursor(x, y, selected) {
		clearCursor();
		if(arguments.length > 0) {
			cursor = {
				x: x,
				y: y,
				selected: selected
			};
		} else {
			cursor = null;
		}
		renderCursor();
	}
	
	//creates grid background
	function createBackground() {
		var background = $(".board-bg")[0];
		bgctx = background.getContext('2d');
		background.width = cols * jewelSize;
		background.height = rows * jewelSize;
		bgctx.fillStyle = "rgba(225,235,255,0.15)";
		for(var x = 0; x < cols; x++) {
			for(var y = 0; y < rows; y++) {
				if((x+y)%2) {
					bgctx.fillRect(x*jewelSize, y*jewelSize, jewelSize, jewelSize);
				}
			}
		}
		return background;
	}
		
	//helper function for the redraw method	(draws the jewel specified by 'type'
	function drawJewel(type, x, y) {
		var image = jewel.images["images/jewels" + jewelSize + ".png"];
		ctx.drawImage(image, type * jewelSize, 0, jewelSize, jewelSize, x*jewelSize, y*jewelSize, jewelSize, jewelSize);
	}
	
	//method with callback -- draws jewels across the entire board
	function redraw(newJewels, callback) {
		var x, y;
		jewels = newJewels;
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(x = 0; x < cols; x++) {
			for(y = 0; y < rows; y++) {
				drawJewel(jewels[x][y], x, y);
			}
		}	
		renderCursor();
		callback();
	}
	
	//function to display where the cursor is -- simply draws on the canvas
	function renderCursor() {
		if (!cursor) {
			return;
		}
		var x = cursor.x, y = cursor.y;
		clearCursor();
		if (cursor.selected) {
			ctx.save();
			ctx.globalCompositeOperation = 'lighter';
			ctx.globalAlpha = 0.8;
			drawJewel(jewels[x][y], x, y);
			ctx.restore();
		}
		ctx.save();
		ctx.lineWidth = 0.05 * jewelSize;
		ctx.strokeStyle = "rgba(250,250,150,0.8)";
		ctx.strokeRect((x + 0.05) * jewelSize, (y + 0.05) * jewelSize, 0.9 * jewelSize,
		0.9 * jewelSize);
		ctx.restore();
	}
	
	//only other (redraw) public function -- sets up the board the first time, and has callback
	function initialize(callback) {
		if(firstRun) {
			setup();
			firstRun = false;
		}
		callback();
	}
	
	//expose public functions
	return {
		initialize: initialize,
		redraw: redraw,
		setCursor: setCursor
	};
})();
			