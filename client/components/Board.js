import React, { Component } from "react";
import Tile from "./Tile";

export default class Board extends Component {
  static buildTileMatrix(boardMatrix) {
    const tiles = [];
    boardMatrix.forEach((row, x) => {
      tiles[x] = [];
      row.forEach((val, y) => {
        const newTile = {
          value: val,
          x,
          y,
          flag: "",
          clicked: false,
        };

        tiles[x].push(newTile);
      });
    });

    return tiles;
  }

  constructor(props) {
    super(props);

    this.state = {
      clickedCount: 0,
      won: false,
      lost: false,
      visitedSet: new Set(),
      tiles: []
    };
    // TODO: is there a cleaner place for this?
    this.handleFlagged = this.handleFlagged.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
    this.handleEmptyTileClick = this.handleEmptyTileClick.bind(this);
    this.determineGameWon = this.determineGameWon.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newTiles = Board.buildTileMatrix(nextProps.boardMatrix);
    if (nextProps.refresh) {
      this.setState({
        clickedCount: 0,
        won: false,
        lost: false,
        visitedSet: new Set(),
        tiles: newTiles
      });
    } else {
      this.setState({ tiles: newTiles });
    }
  }

  getEmptyNeighbors(x, y) {
    const emptyNeighbors = [];
    const directions = [-1, 0, 1];
    const { size, boardMatrix } = this.props;
    const { visitedSet } = this.state;
    directions.forEach((xdir) => {
      directions.forEach((ydir) => {
        // Dont bother performing any operations if x and y are not changed.
        if (!(xdir === 0 && ydir === 0)) {
          const newx = x + xdir;
          const newy = y + ydir;


          if (newx >= 0 && newx < size && newy >= 0 && newy < this.props.size) {
            const neighborVal = boardMatrix[newx][newy];

            if (neighborVal !== 'x') {
              const setKey = `${newx},${newy}`;
              // Use a set here to ensure we don't repeat work.
              emptyNeighbors.push([newx, newy]);
              if (!visitedSet.has(setKey)) {
                visitedSet.add(setKey);
              }
            }
          }
        }
      });
    });

    this.setState({ visitedSet });
    return emptyNeighbors;
  }


  handleEmptyTileClick(x, y) {
    const emptyNeighbors = this.getEmptyNeighbors(x, y);
    if (emptyNeighbors.length === 0) {
      return;
    }
    const { tiles } = this.state;

    emptyNeighbors.forEach((xyArray) => {
      const x1 = xyArray[0];
      const y1 = xyArray[1];
      this.handleClicked(x1, y1);
    });
  }


  handleClicked(x, y) {
    const { tiles } = this.state;
    const tile = tiles[x][y];


    // No op if flag is placed
    if (tile.flag) {
      return;
    }

    if (tile.clicked) {
      return;
    }

    tile.clicked = true;
    // end game if user clicks a bomb
    if (tile.value === "x") {
      this.setState({ lost: true });
      return;
    }


    tiles[x][y] = tile;
    this.setState({ tiles });

    if (tile.value === "_") {
      this.handleEmptyTileClick(x, y);
    }

    this.determineGameWon();
  }

  // This unfortunate piece of code is the result of not having enough time to figure out why my increment state wouldn't update.
  // Performs well anyway ¯\_(ツ)_/¯
  // TODO: use visitedSet to calculate this?
  determineGameWon() {
    const { tiles } = this.state;
    const { size, bombCount } = this.props;
    const flatTiles = tiles.flat(2);
    let tilecount = 0;
    for (let i = 0; i < flatTiles.length; i++) {
      if (flatTiles[i].clicked) {
        tilecount += 1;
      }
    }
    if ((size * size - tilecount - bombCount) === 0) {
      this.setState({ won: true });
    }
  }


  handleFlagged(e, x, y) {
    const { tiles } = this.state;

    const tile = tiles[x][y];
    e.preventDefault();
    if (tile.clicked) {
      return;
    }
    if (tile.flag === "⚐") {
      tile.flag = "";
    } else {
      tile.flag = "⚐";
    }

    tiles[x][y] = tile;
    this.setState({ tiles });
  }

  render() {
    const { lost, won, tiles } = this.state;

    // TODO: render better win and lose scenarios, reveal board.
    if (lost) {
      return (<div className="lost">YOU LOSE</div>);
    }

    if (won) {
      return (<div className="won">YOU WIN</div>);
    }
    return (tiles.map((row, rowidx) => (
      <div className="row" key={`col_${rowidx}`}>
        {(row.map(tile => (
          <Tile
            key={`${tile.x},${tile.y}`}
            x={tile.x}
            y={tile.y}
            value={tile.value}
            clicked={tile.clicked}
            flag={tile.flag}
            handleClicked={(x, y) => this.handleClicked(x, y)}
            handleFlagged={(e, x, y) => this.handleFlagged(e, x, y)}
          />
        )))}
      </div>
    )));
  }
}
