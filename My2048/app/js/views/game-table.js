/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

Manager2048.Views.GameTable = Backbone.View.extend({
    template: _.template($('#tpl-game-table').html()),
    table: {},
    
    render: function () {
        "use strict";
        
        var html = this.template();
        this.$el.append(html);
                                                                           
        return this;
    },
    
    updateUI : function () {
        "use strict";
        var r, c, n, m;

        for (r = 0, n = this.table.rows.length; r < n; r++) {
            for (c = 0, m = this.table.rows[r].cells.length; c < m; c++) {
                this.table.rows[r].cells[c].innerHTML = Manager2048.Board.getCellValue([r, c]);

                this.table.rows[r].cells[c].className = '_' + Manager2048.Board.getCellValue([r, c]);

                if (Manager2048.Board.LastInserted[0] === r && Manager2048.Board.LastInserted[1] === c) {
                    this.table.rows[r].cells[c].className += ' inserted';
                }
            }
        }
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
    },
    rendered: function () {
        "use strict";
        
        this.table = document.getElementById("TableUI");
        
        Manager2048.Board.fillBoard();
        this.updateUI();
        
        var _this = this;
        document.addEventListener("keydown", function (event) { _this.processKey(event); }, false);
        addSwipeListener(document, function (event) {_this.processSwipe(event); });
    }
});