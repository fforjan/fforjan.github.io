Manager2048.Views.Game = Backbone.View.extend({
    render: function () {
        "use strict";
        var html = '<h1>' + this.model.get('name') + '</h1>';
        this.$el.html(html);
        return this;
    }
});