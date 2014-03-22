/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

window.Manager2048 = {
    Models: {},
    Collections: {},
    Views: {},
    start: function (data) {
        "use strict";
        
        var games = new Manager2048.Collections.Games(data.games);
        
        var contactsView = new Manager2048.Views.Games({
            collection: games
        });
        
        $('.main-container').html(contactsView.render().$el);
    }
};

