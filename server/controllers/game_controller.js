const puzzles = require('../data/puzzles')
const { Board } = require('../models/board')
function GameController () {
  this.getGame = (params) => {
    const board = params.board
    const layoutIndex  = params.layoutIndex

    if (layoutIndex) {
      return this.getBoardFromLayout(layoutIndex)
    } else if (board) {
      return this.getBoardFromString(board)
    }

    return this.getBoardFromString(this.defaultBoard())
  }

  this.defaultBoard = () => {
    return puzzles[Math.floor(Math.random() * puzzles.length)]
  }

  this.getBoardFromLayout = (idx) => {
    if (idx < 0 || idx >= puzzles.length) {
      const message = `invalid game idx provided: ${idx}`
      console.log(message)
      return {
        status: 404,
        data: { message: message}
      }
    }

    return this.getBoardFromString(puzzles[idx])
  }

  this.getBoardFromString = (boardString) => {
    const board = new Board(boardString)
    if (board.isValid) {
      return {
        status: 200,
        data: boardString
      }
    } else {
      return {
        status: 400,
        data: { message: 'invalid game string provided' }
      }
    }
  }

  this.isGameValid = (gameString) => {
    return true
  }
}

const gameController = exports = new GameController()
module.exports = { gameController }
