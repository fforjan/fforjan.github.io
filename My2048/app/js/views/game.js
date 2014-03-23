/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Views.Game = Backbone.View.extend({
    tagName: 'li',
    className: 'media col-md-6 col-lg-4',
    template: _.template($('#tpl-game').html()),

    render: function () {
        "use strict";
        
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    }
});