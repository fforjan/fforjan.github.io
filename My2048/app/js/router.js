
Manager2048.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'games': 'showGames',
        'game/start/:id': 'startGame'
    }
});