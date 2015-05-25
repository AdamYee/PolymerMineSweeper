'use strict';
Polymer({
  is: "play-minesweeper",
  properties: {  
    rows: {
      type: Number,
      value: 10
    },
    columns: {
      type: Number,
      value: 10
    },
    mines: {
      type: Number,
      value: 10
    },
    board: Object
  },

  ready() {
    this.board = document.createElement('ms-board');
    Polymer.dom(this.$.board).appendChild(this.board);
  },

  play() {
    let rows = this.rows = parseInt(this.$$('#rows').value);
    let columns = this.columns = parseInt(this.$$('#columns').value);
    let mines = this.mines = parseInt(this.$$('#mines').value);
    let max = rows * columns;
    if (this.mines > max) {
      this.mines = max - 1;
    }
    if (this.mines < 1) {
      this.mines = 1;
    }
    this.board.rows = rows;
    this.board.columns = columns;
    this.board.mines = mines;
    this.board.play();
  }
});
