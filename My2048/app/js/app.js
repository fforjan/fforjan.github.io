/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

window.Manager2048 = {
    Models: {},
    Collections: {},
    Views: {},
    
    startRouter : function (games) {
        "use strict";
        var router = new Manager2048.Router();
             
        router.on('route:home', function () {
            router.navigate('games', {
                trigger: true,
                replace: true
            });
        });
        
        router.on('route:showGames', function () {
            var gamesView = new Manager2048.Views.Games({
                collection: games
            });
        
            $('.main-container').html(gamesView.render().$el);
        });
        
        router.on('route:startGame', function (id) {
            window.alert('Start Game');
        });

        Backbone.history.start();
    },
    
    start: function (data) {
        "use strict";
        
        var games = new Manager2048.Collections.Games(data.games);
        
        this.startRouter(games);
    }
};

