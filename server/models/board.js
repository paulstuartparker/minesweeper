// const puzzles = require('../data/puzzles')

class Board {
  constructor(boardString) {
    this.size = 16;
    this.bombCount = 0;
    this.isValid = this.isBoardStringValid(boardString);
    this.boardData = this.isValid ? this.getBoardFromString(boardString) : null;
  }

  isBoardStringValid(boardString) {
    // Only allow square boards
    if (boardString.length !== (this.size * this.size)) {
      return false;
    }
    const validChars = new Set(['-', 'x']);
    const isValidChar = char => validChars.has(char);

    return Array.from(boardString).every(isValidChar);
  }

  getBoardFromString(boardString) {
    const { length } = boardString;
    const board = [];
    for (let i = 0; i < length; i += this.size) {
      board.push(Array.from(boardString.slice(i, i + this.size)));
    }
    const boardMatrix = this.addNumbersAndUnderscores(board);

    return boardMatrix;
  }

  addNumbersAndUnderscores(boardMatrix) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (boardMatrix[x][y] === 'x') {
          this.bombCount += 1;
          continue;
        }

        let neighboringMines = 0;

        // top
        if (x > 0 && boardMatrix[x - 1][y] === 'x') {
          neighboringMines += 1;
        }
        // top right
        if (x > 0 && y < this.size - 1 && boardMatrix[x - 1][y + 1] === 'x') {
          neighboringMines += 1;
        }
        // right
        if (y < this.size - 1 && boardMatrix[x][y + 1] === 'x') {
          neighboringMines += 1;
        }
        // bottom right
        if (x < this.size - 1 && y < this.size - 1 && boardMatrix[x + 1][y + 1] === 'x') {
          neighboringMines += 1;
        }
        // bottom
        if (x < this.size - 1 && boardMatrix[x + 1][y] === 'x') {
          neighboringMines += 1;
        }
        // bottom left
        if (x < this.size - 1 && y > 0 && boardMatrix[x + 1][y - 1] === 'x') {
          neighboringMines += 1;
        }
        // left
        if (y > 0 && boardMatrix[x][y - 1] === 'x') {
          neighboringMines += 1;
        }
        // top left
        if (x > 0 && y > 0 && boardMatrix[x - 1][y - 1] === 'x') {
          neighboringMines += 1;
        }

        // Add a number or underscore depending on neighboringMines
        if (neighboringMines > 0) {
          boardMatrix[x][y] = neighboringMines;
        } else {
          boardMatrix[x][y] = '_';
        }
      }
    }
    return boardMatrix;
  }
}

module.exports = { Board };
