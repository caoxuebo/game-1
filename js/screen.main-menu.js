jewel.screens['main-menu'] = (function() {
    firstRun = true;
    function setup() {
        $('button').click(function() {
            jewel.game.showScreen($(this).attr('name'));          
        });
    }

    function run(){
        if(firstRun){
            firstRun = false;
            setup();
        }
    }

    return {
        run: run
    };
})();
    
