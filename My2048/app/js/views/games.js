Manager2048.Views.Games = Backbone.View.extend({
    template: _.template($('#tpl-games').html()),

    renderOne: function(game) {
        var itemView = new Manager2048.Views.Game({model: game});
        this.$('.game-container').append(itemView.render().$el);
    },
    
    render: function() {
        var html = this.template();
        this.$el.html(html);
        
        this.collection.each(this.renderOne, this);
        
        return this;
    }
});