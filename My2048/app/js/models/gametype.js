/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Models.GameType = Backbone.Model.extend({
    defaults: {
        id:null,
        name: null,
        screenshot: null
    },
    initialize: function () {
        "use strict";
        this.set('screenshot', _.random(1, 15) + '.jpg');
    }
});