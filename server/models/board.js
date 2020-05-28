// const puzzles = require('../data/puzzles')

class Board {
  constructor (boardString) {
    this.isValid = true
    this.size = 16
    this.boardData = this.getBoardFromString(boardString)
  }

  // static defaultBoard () {
  //   return Board.new(puzzles[Math.floor(Math.random() * puzzles.length)])
  // }
  //
  // static getBoardFromLayout (idx) {
  //
  // }
  getBoardFromString (boardString) {
    const length = boardString.length
    const board = []
    for (let i = 0; i < length; i += this.size) {
      board.push(Array.from(boardString.slice(i, i + this.size)))
    }
    console.log(board)
    return board
  }
}

module.exports = { Board }
