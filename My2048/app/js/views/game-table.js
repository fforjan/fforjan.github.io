/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Views.GameTable = Backbone.View.extend({
    template: _.template($('#tpl-game-table').html()),
    
    render: function () {
        "use strict";
        
        var html = this.template();
        var instanceTemplate = this.$el.append(html)[0];
        var table = instanceTemplate.getElementsByTagName('table')[0];
        
        Manager2048.Board.updateUI = function () {            
            var r, c, n, m;
            
            for (r = 0, n = table.rows.length; r < n; r++) {
                for (c = 0, m = table.rows[r].cells.length; c < m; c++) {
                    table.rows[r].cells[c].innerHTML = this.getCellValue([r, c]);

                    table.rows[r].cells[c].className = '_' + this.getCellValue([r, c]);

                    if (this.LastInserted[0] === r && this.LastInserted[1] === c) {
                        table.rows[r].cells[c].className += ' inserted';
                    }
                }
            }
        };

        Manager2048.Board.processKey = function (keyEvent) {
            switch (keyEvent.keyCode) {
            case 37:
                this.DoLeft();
                break;
            case 38:
                this.DoUp();
                break;
            case 39:
                this.DoRight();
                break;
            case 40:
                this.DoDown();
                break;
            }

            Manager2048.Board.updateUI();
        };

        Manager2048.Board.processSwipe = function (swipeDirection) {
            switch (swipeDirection) {
            case SwipeDirection.Left:
                this.DoLeft();
                break;
            case SwipeDirection.Up:
                this.DoUp();
                break;
            case SwipeDirection.Right:
                this.DoRight();
                break;
            case SwipeDirection.Down:
                this.DoDown();
                break;
            }

            Manager2048.Board.updateUI();
        };
                        
        Manager2048.Board.fillBoard();
        Manager2048.Board.updateUI();

        document.addEventListener("keydown", function (event) { Manager2048.Board.processKey(event); }, false);
        addSwipeListener(document, function (event) { Manager2048.Board.processSwipe(event); });
                
        return this;
    }
});