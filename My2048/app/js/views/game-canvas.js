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
    
    createCell : function () {
        "use strict";
        var rect = new Kinetic.Rect({
            x: 2.5,
            y: 2.5,
            width: 95,
            height: 95,
            fill: 'lightgrey',
            cornerRadius: 10,
        });
                
        var text = new Kinetic.Text({
            x: 0,
            y: 37,
            width: 100,
            height: 100,
            align: 'center',
            text: '0',
            fontSize: 30,            
            fill: 'green'
        });
      
        var group = new Kinetic.Group();
        
        group.add(rect);
        group.add(text);
        
        return group;
    },
    
    createBoardUI: function (layer) {
        "use strict";
        
        var x, y;
        for (x = 0; x < 4; x = x + 1) {
            for (y = 0; y < 4; y = y + 1) {
                var group = this.createCell();
                group.setPosition({x: x * 100, y  : y * 100});
                
                layer.add(group);
            }
        }
    },
    
    rendered: function () {
        "use strict";
        
        this.stage = new Kinetic.Stage({
            container: 'kinetic',
            width: 600,
            height: 600
        });

        var layer = new Kinetic.Layer();
      
        this.createBoardUI(layer);
                    
        // add the layer to the stage
        this.stage.add(layer);
                
        return this;
    }
});