
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

Board.prototype.isCellEmpty= function(position)
{
    return this.Content[position[0]][position[1]] === '';
};

Board.prototype.setCellValue = function (position, value) {
    this.Content[position[0]][position[1]] = value;
};

Board.prototype.getEmptyCell = function () {
    var cell = this.getCell();
    while (!this.isCellEmpty(cell)) {
        cell = this.getCell();
    }

    return cell;
};

Board.prototype.fillBoard = function () {
    var cell = this.getEmptyCell();
    this.setCellValue(cell, Math.random() > 0.75 ? 4 : 2);
};

Board.prototype.IsBlocked = function()
{
	for(var x = 0 ; x < 4; x++)
	{
		for(var currentYIndex = 0; currentYIndex < 3; currentYIndex++)
		{
			if(this.isCellEmpty([x, currentYIndex]) || this.isCellEmpty([currentYIndex, x]))
			{
				return false;
			}
			
			if(		(this.getCellValue([x, currentYIndex]) == this.getCellValue([x, currentYIndex +1])) || (this.getCellValue([currentYIndex, x]) == this.getCellValue([currentYIndex +1, x])))
			{
				return false;
			}
		}	
	}
	
	return true;
};

/**
 * Move object to left to fill any hole but no Merge
 */
Board.prototype.MoveLeft = function() {
	
	var anyChange = false;
	
	for(var x = 0 ; x < 4; x++)
	{
		for(var currentYIndex = 0; currentYIndex < 3; currentYIndex++)
		{
			// check if currentYIndex is pointing to an empty cell.
			if( this.isCellEmpty([x,currentYIndex]))
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
					
					anyChange = true;
				}
			}
		}
	}
	
	return true;
};

/**
 * Merge object on left
 */
Board.prototype.MergeLeft = function() {
	for(var x = 0 ; x < 4; x++)
	{
		for(var currentYIndex = 0; currentYIndex < 3; currentYIndex++)
		{
			// check if next cell is the same.
			if( !this.isCellEmpty([x,currentYIndex]) && this.getCellValue([x, currentYIndex]) == this.getCellValue([x, currentYIndex +1]))
			{
				this.setCellValue([x,currentYIndex], 2 * this.getCellValue([x,currentYIndex]));
				this.clearCellValue([x, currentYIndex +1]);
			}
		}
	}
};

/**
 * Merge object on Up
 */
Board.prototype.MergeUp = function() {
	for(var y = 0 ; y < 4; y++)
	{
		for(var currentXIndex = 0; currentXIndex < 3; currentXIndex++)
		{
			// check if next cell is the same.
			if( !this.isCellEmpty([currentXIndex, y]) && this.getCellValue([currentXIndex, y]) == this.getCellValue([currentXIndex + 1, y]))
			{
				this.setCellValue([currentXIndex, y], 2 * this.getCellValue([currentXIndex, y]));
				this.clearCellValue([currentXIndex + 1, y]);
			}
		}
	}
};

/**
 * Merge object Down
 */
Board.prototype.MergeDown = function() {
	for(var y = 0 ; y < 4; y++)
	{
		for(var currentXIndex = 3; currentXIndex > 0; currentXIndex--)
		{
			// check if next cell is the same.
			if( !this.isCellEmpty([currentXIndex, y]) && this.getCellValue([currentXIndex, y]) == this.getCellValue([currentXIndex - 1, y]))
			{
				this.setCellValue([currentXIndex, y], 2 * this.getCellValue([currentXIndex, y]));
				this.clearCellValue([currentXIndex - 1, y]);
			}
		}
	}
};

/**
 * Merge object on Right
 */
Board.prototype.MergeRight = function() {
	for(var x = 0 ; x < 4; x++)
	{
		for(var currentYIndex = 3; currentYIndex > 0; currentYIndex--)
		{
			// check if next cell is the same.
			if( !this.isCellEmpty([x,currentYIndex]) && this.getCellValue([x, currentYIndex]) == this.getCellValue([x, currentYIndex  - 1]))
			{
				this.setCellValue([x,currentYIndex], 2 * this.getCellValue([x,currentYIndex]));
				this.clearCellValue([x, currentYIndex  - 1]);
			}
		}
	}
};

Board.prototype.DoLeft  = function()
{
	var anyChange = this.MoveLeft();
	this.MergeLeft();
	anyChange |= this.MoveLeft();
	
	if(anyChange)
	{
		this.fillBoard();
	}
	
	if(this.IsBlocked())
	{
		alert('looossseer');	
	}
};

Board.prototype.DoRight  = function()
{
	var anyChange = this.MoveRight();
	this.MergeRight();
	anyChange |= this.MoveRight();
	
	if(anyChange)
	{
		this.fillBoard();
	}
	
	if(this.IsBlocked())
	{
		alert('looossseer');	
	}
};

Board.prototype.DoUp  = function()
{
	var anyChange = this.MoveUp();
	this.MergeUp();
	 anyChange |= this.MoveUp();
	 
	if(anyChange)
	{
		this.fillBoard();
	}
	
	if(this.IsBlocked())
	{
		alert('looossseer');	
	}
};

Board.prototype.DoDown  = function()
{
	var anyChange = this.MoveDown();
	this.MergeDown();
	anyChange |= this.MoveDown();
	
	if(anyChange)
	{
		this.fillBoard();
	}
	
	if(this.IsBlocked())
	{
		alert('looossseer');	
	}
};

/**
 * Move object to up to fill any hole but no Merge
 */
Board.prototype.MoveUp = function() {
	var anyChange = false;
	
	for(var y = 0 ; y < 4; y++)
	{
		for(var currentXIndex = 0; currentXIndex < 3; currentXIndex++)
		{
			// check if currentYIndex is pointing to an empty cell.
			if( this.getCellValue([currentXIndex, y]) === '')
			{
				// find the next non-empty cell;
				var nonEmptyXIndex = currentXIndex +1;
				while( nonEmptyXIndex < 4 && this.getCellValue([nonEmptyXIndex, y]) === '')
				{
					nonEmptyXIndex++;	
				}
			
				if (nonEmptyXIndex != 4)
				{
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
Board.prototype.MoveDown = function() {
	
	var anyChange = false;
	
	for(var y = 0 ; y < 4; y++)
	{
		for(var currentXIndex = 3; currentXIndex > 0; currentXIndex--)
		{
			// check if currentYIndex is pointing to an empty cell.
			if( this.getCellValue([currentXIndex, y]) === '')
			{
				// find the next non-empty cell;
				var nonEmptyXIndex = currentXIndex  -1;
				while( nonEmptyXIndex >= 0 && this.getCellValue([nonEmptyXIndex, y]) === '')
				{
					nonEmptyXIndex--;	
				}
			
				if (nonEmptyXIndex >= 0)
				{
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
Board.prototype.MoveRight = function() {
	
	var anyChange = false;
	
	for(var x = 0 ; x < 4; x++)
	{
		for(var currentYIndex = 3; currentYIndex > 0; currentYIndex--)
		{
			// check if currentYIndex is pointing to an empty cell.
			if( this.getCellValue([x,currentYIndex]) === '')
			{
				// find the next non-empty cell;
				var nonEmptyYIndex = currentYIndex  - 1;
				while( nonEmptyYIndex >= 0 && this.getCellValue([x,nonEmptyYIndex]) === '')
				{
					nonEmptyYIndex--;	
				}
			
				if (nonEmptyYIndex >= 0)
				{
					this.setCellValue([x,currentYIndex], this.getCellValue([x,nonEmptyYIndex]));
					this.clearCellValue([x,nonEmptyYIndex]);
					
					anyChange = true;
				}
			}
		}
	}
	
	return true;
};