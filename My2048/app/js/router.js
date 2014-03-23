
Manager2048.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'games': 'showGames',
        'games/start/:id': 'startGame'
    }
});