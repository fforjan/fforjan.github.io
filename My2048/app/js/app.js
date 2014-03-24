/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

window.Manager2048 = {
    Models: {},
    Collections: {},
    Views: {},
    Board: new Board(),
    
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
            
            var game = games.get(id);
            var gameView;
            
            if (game && game.id === 'table') {
                gameView = new Manager2048.Views.GameTable({
                    model: game
                });

                $('.main-container').html(gameView.render().$el);
                
                gameView.rendered();
            } else if (game && game.id === 'canvas') {
                gameView = new Manager2048.Views.GameCanvas({
                    model: game
                });

                $('.main-container').html(gameView.render().$el);
                
                gameView.rendered();
            } else {
                router.navigate('games', true);
            }
        });

        Backbone.history.start();
    },
    
    start: function (data) {
        "use strict";
        
        var games = new Manager2048.Collections.Games(data.games);
        
        this.startRouter(games);
    }
};

