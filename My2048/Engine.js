
function Board ()  {
    this.Content = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
};

Board.prototype.getCell = function()
{
    var x = Math.floor((Math.random() * 4));
    var y = Math.floor((Math.random() * 4));
    return [x, y];
},

Board.prototype.getCellValue= function(position)
{
    return this.Content[position[0]][position[1]];
};

Board.prototype.setCellValue = function (position, value) {
    this.Content[position[0]][position[1]] = value;
};

Board.prototype.getEmptyCell = function () {
    var cell = this.getCell();
    while (this.getCellValue(cell) != '') {
        cell = this.getCell();
    }

    return cell;
};

Board.prototype.fillBoard = function () {
    var cell = this.getEmptyCell();
    this.setCellValue(cell, Math.random() > 0.75 ? 4 : 2);
};