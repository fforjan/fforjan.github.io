/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Views.GameCanvas = Backbone.View.extend({
    template: _.template($('#tpl-game-canvas').html()),
    stage : {},
    
    render: function () {
        "use strict";
        
        var html = this.template();
        this.$el.append(html);
        
        return this;
    },
    
    rendered: function () {
        "use strict";
        
        this.stage = new Kinetic.Stage({
            container: 'kinetic',
            width: 578,
            height: 200
        });

        var layer = new Kinetic.Layer();

        var rect = new Kinetic.Rect({
            x: 239,
            y: 75,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        // add the shape to the layer
        layer.add(rect);

        // add the layer to the stage
        this.stage.add(layer);
                
        return this;
    }
});