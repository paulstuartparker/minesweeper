const puzzles = require('../data/puzzles');
const { Board } = require('../models/board');

function GameController() {
  this.getGame = (params) => {
    const { board } = params;
    const { layoutIndex } = params;

    if (layoutIndex) {
      return this.getBoardFromLayout(layoutIndex);
    } if (board) {
      return this.getBoardFromString(board);
    }

    return this.getBoardFromString(this.defaultBoard());
  };

  this.defaultBoard = () => puzzles[Math.floor(Math.random() * puzzles.length)];

  this.getBoardFromLayout = (idx) => {
    if (idx < 0 || idx >= puzzles.length) {
      const message = `invalid game idx provided: ${idx}`;
      console.log(message);
      return {
        status: 404,
        data: { message }
      };
    }

    return this.getBoardFromString(puzzles[idx]);
  };

  this.getBoardFromString = (boardString) => {
    const board = new Board(boardString);
    if (board.isValid) {
      return {
        status: 200,
        data: { board: board.boardData, bombCount: board.bombCount }
      };
    }
    return {
      status: 400,
      data: { message: 'invalid board string provided' }
    };
  };

  this.isGameValid = gameString => true;
}

const gameController = exports = new GameController();
module.exports = { gameController };
