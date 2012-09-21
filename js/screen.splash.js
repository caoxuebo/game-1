jewel.screens['splash-screen'] = (function() {
    firstRun = true;
    function setup(getLoadProgress) {
        
		function checkProgress() {
			var p = getLoadProgress() * 100;
			$(".indicator").css("width", p+"%");
			if(p == 100) {
				$('#continue').css("display", "block");
				$('.progress').css("display", "none");
				$(document).click(function() {
					$(document).unbind('click');
					jewel.game.showScreen('main-menu');
				});
			} else {
				setTimeout(checkProgress, 30);
			}
		}
        checkProgress();
    }

    function run(getLoadProgress){
        if(firstRun) {
            setup(getLoadProgress);
            firstRun = false;
        }
    }

    return {
        run: run
    };
})();
