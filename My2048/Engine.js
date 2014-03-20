
function Board ()  {
    this.Content = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
}

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

Board.prototype.clearCellValue= function(position)
{
    this.Content[position[0]][position[1]] = '';
};

Board.prototype.setCellValue = function (position, value) {
    this.Content[position[0]][position[1]] = value;
};

Board.prototype.getEmptyCell = function () {
    var cell = this.getCell();
    while (this.getCellValue(cell) !== '') {
        cell = this.getCell();
    }

    return cell;
};

Board.prototype.fillBoard = function () {
    var cell = this.getEmptyCell();
    this.setCellValue(cell, Math.random() > 0.75 ? 4 : 2);
};

/**
 * Move object to left to fill any hole.
 */
Board.prototype.MoveLeft = function() {
	for(var x = 0 ; x < 4; x++)
	{
		for(var currentYIndex = 0; currentYIndex < 3; currentYIndex++)
		{
			// check if currentYIndex is pointing to an empty cell.
			if( this.getCellValue([x,currentYIndex]) === '')
			{
				// find the next non-empty cell;
				var nonEmptyYIndex = currentYIndex +1;
				while( nonEmptyYIndex < 4 && this.getCellValue([x,nonEmptyYIndex]) === '')
				{
					nonEmptyYIndex++;	
				}
			
				if (nonEmptyYIndex != 4)
				{
					this.setCellValue([x,currentYIndex], this.getCellValue([x,nonEmptyYIndex]));
					this.clearCellValue([x,nonEmptyYIndex]);
				}
			}
		}
	}
};