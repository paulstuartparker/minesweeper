// const puzzles = require('../data/puzzles')

class Board {

  constructor (boardString) {
    this.size = 16
    this.isValid = this.isBoardStringValid(boardString)
    this.boardData = this.isValid ? this.getBoardFromString(boardString) : null
  }

  isBoardStringValid (boardString) {

    // Only allow square boards
    if (boardString.length != (this.size * this.size)) {
      return false
    }
    const validChars = new Set(['-', 'x'])
    const isValidChar = (char) => validChars.has(char)

    return Array.from(boardString).every(isValidChar)
  }

  getBoardFromString (boardString) {
    const length = boardString.length
    const board = []
    for (let i = 0; i < length; i += this.size) {
      board.push(Array.from(boardString.slice(i, i + this.size)))
    }
    console.log(board)
    return board
  }

  addNumbers(boardMatrix) {
    //
  }

  addUnderScores(boardMatrix) {
    //
  }
}

module.exports = { Board }
