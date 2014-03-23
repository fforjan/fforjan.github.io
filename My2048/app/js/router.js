/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'games': 'showGames',
        'game/start/:id': 'startGame'
    }
});