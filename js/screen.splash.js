jewel.screens['splash-screen'] = (function() {
    firstRun = true;
    function setup() {
        $(document).click(function() {
            jewel.game.showScreen('main-menu');
        });
    }

    function run(){
        if(firstRun) {
            setup();
            firstRun = false;
        }
    }

    return {
        run: run
    };
})();
