/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Views.GameCanvas = Backbone.View.extend({
    template: _.template($('#tpl-game-canvas').html()),
    
    render: function () {
        "use strict";
        
        var stage = new Kinetic.Stage({
            container: 'container',
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
        stage.add(layer);
        
        Manager2048.KineticStage =  stage;
        return this;
    }
});