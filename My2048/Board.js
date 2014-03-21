/**
 * Board constructor
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

function Board() {

    "use strict";
    this.Content = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
    this.LastInserted = [-1, -1];
}

Board.prototype.getCell = function () {
    "use strict";
    var x = Math.floor((Math.random() * 4)), y = Math.floor((Math.random() * 4));
    return [x, y];
};

/**
 Get the current cell value
 @param position array for the coordinate
 */
Board.prototype.getCellValue = function (position) {
    "use strict";
    return this.Content[position[0]][position[1]];
};

Board.prototype.clearCellValue = function (position) {
    "use strict";
    this.Content[position[0]][position[1]] = '';
};

Board.prototype.isCellEmpty = function (position) {
    "use strict";
    return this.Content[position[0]][position[1]] === '';
};

Board.prototype.setCellValue = function (position, value) {
    "use strict";
    this.Content[position[0]][position[1]] = value;
};

Board.prototype.getEmptyCell = function () {
    "use strict";
    var cell = this.getCell();
    while (!this.isCellEmpty(cell)) {
        cell = this.getCell();
    }

    return cell;
};

Board.prototype.fillBoard = function () {
    "use strict";
    this.LastInserted = this.getEmptyCell();
    this.setCellValue(this.LastInserted, Math.random() > 0.75 ? 4 : 2);
};

Board.prototype.IsBlocked = function () {
    "use strict";
    var x, currentYIndex;
    for (x = 0; x < 4; x++) {
        for (currentYIndex = 0; currentYIndex < 3; currentYIndex++) {
            if (this.isCellEmpty([x, currentYIndex]) || this.isCellEmpty([currentYIndex, x])) {
                return false;
            }

            if ((this.getCellValue([x, currentYIndex]) === this.getCellValue([x, currentYIndex + 1])) || (this.getCellValue([currentYIndex, x]) === this.getCellValue([currentYIndex + 1, x]))) {
                return false;
            }
        }
    }

    return true;
};

/**
 * Move object to left to fill any hole but no Merge
 */
Board.prototype.MoveLeft = function () {
    "use strict";
    var anyChange = false, x, currentYIndex, nonEmptyYIndex;

    for (x = 0; x < 4; x++) {
        for (currentYIndex = 0; currentYIndex < 3; currentYIndex++) {
            // check if currentYIndex is pointing to an empty cell.
            if (this.isCellEmpty([x, currentYIndex])) {
                // find the next non-empty cell;
                nonEmptyYIndex = currentYIndex + 1;
                while (nonEmptyYIndex < 4 && this.getCellValue([x, nonEmptyYIndex]) === '') {
                    nonEmptyYIndex++;
                }

                if (nonEmptyYIndex !== 4) {
                    this.setCellValue([x, currentYIndex], this.getCellValue([x, nonEmptyYIndex]));
                    this.clearCellValue([x, nonEmptyYIndex]);

                    anyChange = true;
                }
            }
        }
    }

    return anyChange;
};

/**
 * Merge object on left
 */
Board.prototype.MergeLeft = function () {
    "use strict";
    var x, currentYIndex;
    for (x = 0; x < 4; x++) {
        for (currentYIndex = 0; currentYIndex < 3; currentYIndex++) {
            // check if next cell is the same.
            if (!this.isCellEmpty([x, currentYIndex]) && this.getCellValue([x, currentYIndex]) === this.getCellValue([x, currentYIndex + 1])) {
                this.setCellValue([x, currentYIndex], 2 * this.getCellValue([x, currentYIndex]));
                this.clearCellValue([x, currentYIndex + 1]);
            }
        }
    }
};

/**
 * Merge object on Up
 */
Board.prototype.MergeUp = function () {
    "use strict";
    var y, currentXIndex;
    for (y = 0; y < 4; y++) {
        for (currentXIndex = 0; currentXIndex < 3; currentXIndex++) {
            // check if next cell is the same.
            if (!this.isCellEmpty([currentXIndex, y]) && this.getCellValue([currentXIndex, y]) === this.getCellValue([currentXIndex + 1, y])) {
                this.setCellValue([currentXIndex, y], 2 * this.getCellValue([currentXIndex, y]));
                this.clearCellValue([currentXIndex + 1, y]);
            }
        }
    }
};

/**
 * Merge object Down
 */
Board.prototype.MergeDown = function () {
    "use strict";
    var y, currentXIndex;
    for (y = 0; y < 4; y++) {
        for (currentXIndex = 3; currentXIndex > 0; currentXIndex--) {
            // check if next cell is the same.
            if (!this.isCellEmpty([currentXIndex, y]) && this.getCellValue([currentXIndex, y]) === this.getCellValue([currentXIndex - 1, y])) {
                this.setCellValue([currentXIndex, y], 2 * this.getCellValue([currentXIndex, y]));
                this.clearCellValue([currentXIndex - 1, y]);
            }
        }
    }
};

/**
 * Merge object on Right
 */
Board.prototype.MergeRight = function () {
    "use strict";
    var x, currentYIndex;
    for (x = 0; x < 4; x++) {
        for (currentYIndex = 3; currentYIndex > 0; currentYIndex--) {
            // check if next cell is the same.
            if (!this.isCellEmpty([x, currentYIndex]) && this.getCellValue([x, currentYIndex]) === this.getCellValue([x, currentYIndex - 1])) {
                this.setCellValue([x, currentYIndex], 2 * this.getCellValue([x, currentYIndex]));
                this.clearCellValue([x, currentYIndex - 1]);
            }
        }
    }
};

Board.prototype.DoLeft = function () {
    "use strict";
    this.LastInserted = [-1, -1];
    var anyChange = this.MoveLeft();
    this.MergeLeft();
    anyChange = anyChange || this.MoveLeft();

    if (anyChange) {
        this.fillBoard();
    }

    if (this.IsBlocked()) {
        alert('looossseer');
    }
};

Board.prototype.DoRight = function () {
    "use strict";
    this.LastInserted = [-1, -1];
    var anyChange = this.MoveRight();
    this.MergeRight();
    anyChange =  anyChange || this.MoveRight();

    if (anyChange) {
        this.fillBoard();
    }

    if (this.IsBlocked()) {
        alert('looossseer');
    }
};

Board.prototype.DoUp = function () {
    "use strict";
    this.LastInserted = [-1, -1];
    var anyChange = this.MoveUp();
    this.MergeUp();
    anyChange = anyChange || this.MoveUp();

    if (anyChange) {
        this.fillBoard();
    }

    if (this.IsBlocked()) {
        alert('looossseer');
    }
};

Board.prototype.DoDown = function () {
    "use strict";
    this.LastInserted = [-1, -1];
    var anyChange = this.MoveDown();
    this.MergeDown();
    anyChange = anyChange || this.MoveDown();

    if (anyChange) {
        this.fillBoard();
    }

    if (this.IsBlocked()) {
        alert('looossseer');
    }
};

/**
 * Move object to up to fill any hole but no Merge
 */
Board.prototype.MoveUp = function () {
    "use strict";

    var anyChange = false, y, currentXIndex, nonEmptyXIndex;

    for (y = 0; y < 4; y++) {
        for (currentXIndex = 0; currentXIndex < 3; currentXIndex++) {
            // check if currentYIndex is pointing to an empty cell.
            if (this.getCellValue([currentXIndex, y]) === '') {
                // find the next non-empty cell;
                nonEmptyXIndex = currentXIndex + 1;
                while (nonEmptyXIndex < 4 && this.getCellValue([nonEmptyXIndex, y]) === '') {
                    nonEmptyXIndex++;
                }

                if (nonEmptyXIndex !== 4) {
                    this.setCellValue([currentXIndex, y], this.getCellValue([nonEmptyXIndex, y]));
                    this.clearCellValue([nonEmptyXIndex, y]);

                    anyChange = true;
                }
            }
        }
    }

    return anyChange;
};

/**
 * Move object to up to fill any hole but no Merge
 */
Board.prototype.MoveDown = function () {
    "use strict";
    var anyChange = false, y, currentXIndex, nonEmptyXIndex;

    for (y = 0; y < 4; y++) {
        for (currentXIndex = 3; currentXIndex > 0; currentXIndex--) {
            // check if currentYIndex is pointing to an empty cell.
            if (this.getCellValue([currentXIndex, y]) === '') {
                // find the next non-empty cell;
                nonEmptyXIndex = currentXIndex - 1;
                while (nonEmptyXIndex >= 0 && this.getCellValue([nonEmptyXIndex, y]) === '') {
                    nonEmptyXIndex--;
                }

                if (nonEmptyXIndex >= 0) {
                    this.setCellValue([currentXIndex, y], this.getCellValue([nonEmptyXIndex, y]));
                    this.clearCellValue([nonEmptyXIndex, y]);

                    anyChange = true;
                }
            }
        }
    }

    return anyChange;
};


/**
 * Move object to right to fill any hole but no Merge
 */
Board.prototype.MoveRight = function () {
    "use strict";
    var anyChange = false, x, currentYIndex, nonEmptyYIndex;

    for (x = 0; x < 4; x++) {
        for (currentYIndex = 3; currentYIndex > 0; currentYIndex--) {
            // check if currentYIndex is pointing to an empty cell.
            if (this.getCellValue([x, currentYIndex]) === '') {
                // find the next non-empty cell;
                nonEmptyYIndex = currentYIndex - 1;
                while (nonEmptyYIndex >= 0 && this.getCellValue([x, nonEmptyYIndex]) === '') {
                    nonEmptyYIndex--;
                }

                if (nonEmptyYIndex >= 0) {
                    this.setCellValue([x, currentYIndex], this.getCellValue([x, nonEmptyYIndex]));
                    this.clearCellValue([x, nonEmptyYIndex]);

                    anyChange = true;
                }
            }
        }
    }

    return anyChange;
};