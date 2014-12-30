/* AlbertMineSweeper.script.js
 * Date: 2014-12-25
 * Author: Albert Liang
 * Mentor: Adam Yee
 * 
 * Description:
 * Runs a browser-based Minesweeper game.
 */

/* General Rules:
 * Game takes place on a two-dimensional array (grid), where the dimensions and number of mines are selected by the user. 
 *  - If the number of mines the user chooses is greater than or equal to the number of cells, the game defaults to distributing one mine less than the number of cells,
 *  - leaving only a single safe cell.
 * Each cell holds a Cell obj ect, with properties "mine", "visited", and "risk".
 * When a player clicks on a cell with...
 *  - mine=true, the game ends.
 *  - risk!=0, set cell's visited=true;
 *  - risk==0, the function recursively visits all neighbors with risk==0, stopping when it visits a cell with risk!=0.
 * Game ends when the only unvisited cells are cells where mine==true.
 */


/***Cell Class***/
function Cell(i, j) {
  this.mine = false;
  this.visited = false;
  this.flagged = false;
  this.risk = 0;
  this.id = "cid_" + i + '_' + j;

  // memoized display value
  var revealedVal;

  this.revealedVal = function () {
    if (revealedVal !== undefined) {
      return revealedVal;
    } else if(this.mine) {
      revealedVal = '*';
    } else if(this.risk === 0) {
      revealedVal = '';
    } else {
      revealedVal = this.risk;
    }
    return revealedVal;
  };

  this.color = function () {
    var color = '';
    switch(this.risk) {
      case 1:
        color = 'blue';
        break;
      case 2:
        color = 'green';
        break;
      case 3:
        color = 'red';
        break;
      case 4:
        color = 'purple';
        break;
      case 5:
        color = 'maroon';
        break;
      case 6:
        color = 'turquoise';
        break;
      case 7:
        color = 'black';
        break;
      case 8:
        color = 'grey';
        break;
    }
    if(this.mine) {
      color = '#000';
    } else if(this.flagged) {
      color = 'yellow';
    }
    return color;
  };
}

/***Initialize Grid***/
var initialize = function(rows, columns, mines) {
  var isInsideGrid;
  var grid;
  var a;
  var b;
  
  // Generate grid of empty Cell Objects
  grid = [];
  for(var i = 0; i < rows; i++) {
    grid[i] = [];
    for(var j = 0; j < columns; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  grid.mineArray = [];

  // Seed mines randomly in grid, adds them to minedCells[] and calculate each cell's risk
  for(var c = 0; c < mines; c++) {
    a = Math.floor(rows * Math.random());
    b = Math.floor(columns * Math.random());
    if (grid[a][b].mine === true) {
      c--;
      continue;
    }
    grid[a][b].mine = true;
    grid.mineArray.push(grid[a][b].id)
    for(var i = -1; i <= 1; i++) {
      for(var j = -1; j <= 1; j++) {
        isInsideGrid = (a + i >= 0 && b + j >= 0 && a + i < rows && b + j < columns);
        if(isInsideGrid && !(i === 0 && j === 0)) {
          grid[a + i][b + j].risk += 1;
        }
      }
    }
  }
  return grid;
};
