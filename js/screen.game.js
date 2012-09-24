// function that calls the drawing functions and handles some input
jewel.screens["game-screen"] = (function() {
	var board = jewel.board, display = jewel.display, settings = jewel.settings,
	input = jewel.input, cursor, firstRun = true;
	
	// self explainitory -- calls board initialize with display.initialize callback with display.redraw call back
	// board sets up the math behind the board, display.init sets up canvas, display.redraw draws them onto the board
	function run() {
		if(firstRun) {
			setup();
			firstRun = false;
		}
		board.initialize(function() {
			display.initialize(function() {
				cursor = {
					x: 0,
					y: 0,
					selected: false
				};
				display.redraw(board.getBoard(), function() {
				});
			});
		});
	}
	
	//initializes the input object and binds actions to functions
	function setup() {
		input.initialize();
		input.bind("selectJewel", selectJewel);
		input.bind("moveUp", moveUp);
		input.bind("moveDown", moveDown);
		input.bind("moveLeft", moveLeft);
		input.bind("moveRight", moveRight);
	}
	
	//function to set cursor x, y, and selection
	function setCursor(x, y, select) {
		cursor.x = x;
		cursor.y = y;
		cursor.selected = select;
		console.log(x, y, select);
		//links the logic in screen.game.js to the display
		display.setCursor(x, y, select);
	}
	
	//function to move the cursor and select new jewel if appropriate
	function moveCursor(x, y) {
		if(cursor.selected) {
			x += cursor.x;
			y += cursor.y;
			if(x >= 0 && x < settings.cols && y >= 0 && y < settings.rows) {
				selectJewel(x, y);
			}
		} else {
			x = (cursor.x + x + settings.cols) % settings.cols;
			y = (cursor.y + y + settings.rows) % settings.rows;
			setCursor(x, y, false);
		}
	}
	
	//functions to move the cursor directionally
	function moveUp() {
		moveCursor(0, -1);
	}
	
	function moveRight() {
		moveCursor(1, 0);
	}
	
	function moveDown() {
		moveCursor(0, 1);
	}
	
	function moveLeft() {
		moveCursor(-1, 0);
	}
	
	//callback function for swap (board.js) -- uses the events array 
	// (from the board.js swap function) to display graphically what events too place
	function playBoardEvents (events) {
		//if there are events
		if(events.length > 0) {
			//get first item from array and remove it
			var boardEvent = events.shift(),
			//callback function to recursively call this function and go through all
			//the items stored in events
			next = function() {
				playBoardEvents(events);
			};
			//switch to display whatever is happening in the events
			switch (boardEvent.type) {
				case "move":
					display.moveJewels(boardEvent.data, next);
					break;
				case "remove":
					display.removeJewels(boardEvent.data, next);
					break;
				case "refill":
					display.refill(boardEvent.data, next);
					break;
				default:
					next();
					break;
			}
		} else {
			//then redraw the board when we're done
			display.redraw(board.getBoard(), function() {
			});
		}
	}
	
	//function to select jewels -- helper fucntion for move cursor
	function selectJewel(x, y) {
		//if no x and y are provided, select the jewel where the cursor is
		if(arguments.length == 0) {
			selectJewel(cursor.x, cursor.y);
			return;
		}
		//if the cursor has selected a jewel already, check the dist from where the first
		//click was. if its 1, swap the jewels, if not, select a new jewel.
		if(cursor.selected) {
			var dx = Math.abs(x - cursor.x),
			dy = Math.abs(y - cursor.y),
			dist = dx + dy;
			if(dist == 0) {
				setCursor(x, y, false);
			} else if(dist == 1) {
				board.swap(cursor.x, cursor.y, x, y, playBoardEvents);
				setCursor(x, y, false);
			} else {
				setCursor(x, y, true);
			}
		} else {
			setCursor(x, y, true);
		}
	}
	
	return {
		run: run
	};
})();