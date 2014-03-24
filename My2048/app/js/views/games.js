Manager2048.Views.Games = Backbone.View.extend({
    template: _.template($('#tpl-games').html()),

    renderOne: function(game) {
        "use strict";
        
        var itemView = new Manager2048.Views.Game({model: game});
        this.$('.games-container').append(itemView.render().$el);
    },
    
    render: function() {
        "use strict";
        
        var html = this.template();
        this.$el.html(html);
        
        this.collection.each(this.renderOne, this);
        
        return this;
    }
});