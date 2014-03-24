/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Views.GameCanvas = Backbone.View.extend({
    template: _.template($('#tpl-game-canvas').html()),
    stage : {},
    layer : {},
    
    boardUI: [[ {}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}]],
    
    render: function () {
        "use strict";
        
        var html = this.template();
        this.$el.append(html);
        
        return this;
    },
    
    createCell : function () {
        "use strict";
        var rect = new Kinetic.Rect({
            id : 'rect',
            x: 2.5,
            y: 2.5,
            width: 95,
            height: 95,
            fill: 'lightgrey',
            cornerRadius: 10
        });
                
        var text = new Kinetic.Text({
            id: 'text',
            x: 0,
            y: 47,
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
        
        group.RectObject = rect;
        group.TextObject = text;
                        
        group.updateContent = function (content) {
            
            this.TextObject.setText(content);
            
            var color;
            switch (content) {
            case '':
                color = 'lightgrey';
                break;
            case 2:
                color = '#39C0B3';
                break;
            case 4:
                color = '#2AB0C5';
                break;
            case 8:
                color = '#227FB0';
                break;
            case 16:
                color = '#1F5AE8';
                break;
            case 32:
                color = '#274389';
                break;
            case 64:
                color = '#5C4399';
                break;
            case 128:
                color = '#6C2A6A';
                break;
            case 256:
                color = '#B32E37';
                break;
            case 512:
                color = '#EB403B';
                break;
            case 1024:
                color = '#E98931';
                break;
            case 2048:
                color = '#FBB735';
                break;
            }
            
            this.RectObject.setFill(color);
        };
        
        return group;
    },
    
    createBoardUI: function () {
        "use strict";
        
        var x, y;
        for (x = 0; x < 4; x = x + 1) {
            for (y = 0; y < 4; y = y + 1) {
                var group = this.createCell();
                group.setPosition({x: x * 100, y  : y * 100});
                
                this.boardUI[x][y] = group;
                this.layer.add(group);
            }
        }
    },
          
    updateUI: function () {
        "use strict";
        var x, y;
                       
        for (x = 0; x < 4; x = x + 1) {
            for (y = 0; y < 4; y = y + 1) {
                this.boardUI[x][y].updateContent(Manager2048.Board.getCellValue([y, x]));
            }
        }
        
        this.layer.draw();
    },

    
    rendered: function () {
        "use strict";
        
        this.stage = new Kinetic.Stage({
            container: 'kinetic',
            width: 400,
            height: 400
        });

        this.layer = new Kinetic.Layer();
      
        this.createBoardUI();
                    
        // add the layer to the stage
        this.stage.add(this.layer);
        
        Manager2048.Board.fillBoard();
        this.updateUI();
        
        var _this = this;
        document.addEventListener("keydown", function (event) { _this.processKey(event); }, false);
        addSwipeListener(document, function (event) {_this.processSwipe(event); });
                        
        return this;
    },
    
    processKey: function (keyEvent) {
        "use strict";
              
        switch (keyEvent.keyCode) {
        case 37:
            Manager2048.Board.DoLeft();
            break;
        case 38:
            Manager2048.Board.DoUp();
            break;
        case 39:
            Manager2048.Board.DoRight();
            break;
        case 40:
            Manager2048.Board.DoDown();
            break;
        }

        this.updateUI();
    },

    processSwipe: function (swipeDirection) {
        "use strict";
        
        switch (swipeDirection) {
        case SwipeDirection.Left:
            Manager2048.Board.DoLeft();
            break;
        case SwipeDirection.Up:
            Manager2048.Board.DoUp();
            break;
        case SwipeDirection.Right:
            Manager2048.Board.DoRight();
            break;
        case SwipeDirection.Down:
            Manager2048.Board.DoDown();
            break;
        }

        this.updateUI();
    }
});