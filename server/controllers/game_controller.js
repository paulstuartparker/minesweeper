const puzzles = require('../data/puzzles')

function GameController () {
  this.getGame = (params) => {
    const board = params.board
    const layoutIndex  = params.layoutIndex

    if (board) {
      return this.getGameFromBoard(board)
    } else if (layoutIndex) {
      return this.getLayout(layoutIndex)
    }

    return this.defaultGame()
  }

  this.defaultGame = () => {
      return {
        data: puzzles[Math.floor(Math.random() * puzzles.length)],
        status: 200
      }
  }

  this.getLayout = (idx) => {
    if (idx < 0 || idx >= puzzles.length) {
      const message = `invalid game idx provided: ${idx}`
      console.log(message)
      return {
        status: 404,
        data: { message: message}
      }
    }

    return {
      status: 200,
      data: puzzles[idx]
    }
  }

  this.getGameFromBoard = (boardString) => {
    if (this.isGameValid(boardString)) {
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
