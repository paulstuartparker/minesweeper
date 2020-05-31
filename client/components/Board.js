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
    console.log(tiles);
    return tiles;
  }

  constructor(props) {
    super(props);
    const { boardMatrix } = props.boardMatrix;
    console.log(props);
    this.state = {
      clickedCount: 0,
      won: false,
      lost: false,
      emptyNeighborSet: new Set(),
      boardMatrix,
      tiles: []
    };
  }

  componentDidMount() {
    // { boardMatrix } = this.props.boardMatrix
    // this.setState({ tiles: Board.buildTileMatrix(boardMatrix) });
  }

  getEmptyNeighbors(x, y) {
    const emptyNeighbors = [];
    const directions = [-1, 0, 1];
    const { size, boardMatrix } = this.props;
    directions.foreach((xdir) => {
      directions.foreach((ydir) => {
        const { emptyNeighborSet } = this.state;
        const newx = x + xdir;
        const newy = y + ydir;
        if (newx >= 0 && newx < size && newy >= 0 && newy < this.size) {
          const neighborVal = boardMatrix[newx][newy];
          if (neighborVal !== 'x') {
            const setKey = `${newx},${newy}`;
            // Use a set here to ensure we don't repeat work.
            if (!emptyNeighborSet.has(setKey)) {
              emptyNeighbors.push([newx, newy]);

              emptyNeighborSet.add(setKey);
              this.setState({ emptyNeighborSet });
            }
          }
        }
      });
    });
    return emptyNeighbors;
  }

  handleEmptyTileClick(x, y) {
    const emptyNeighbors = this.getEmptyNeighbors(x, y);

    emptyNeighbors.forEach((xyArray) => {
      const x1 = xyArray[0];
      const y1 = xyArray[1];

      setImmediate(() => {
        // Slight hack - simulate click, which will recursively call emptyNeighbors
        document.getElementById(`${x1},${y1}`).click();
      });
    });
  }

  handleClicked(e) {
    console.log(e);
    const wasClicked = this.clicked;
    this.setState({ clicked: true });

    if (this.flag) {
      return;
    }

    if (this.value === "x") {
      this.props.handleBombClick();
      return;
    }
    if (wasClicked === false) {
      this.props.incrementCounter();
    }

    if (this.value === "_" && wasClicked == false) {
      this.props.handleEmptyTileClick(this.x, this.y);
    }
  }

  handleBombClick() {
    this.setState({ lost: true });
  }

  incrementCounter() {
    let { clickedCount } = this.state;
    this.setState({ clickedCount: clickedCount += 1 });
    const { size, bombCount } = this.props;
    // if the number of clicks == the numer of non-bomb spaces on the board, you win.
    if (size * size - clickedCount - bombCount - 1 === 0) {
      this.setState({ won: true });
    }
    console.log(clickedCount);
  }

  handleFlagged(e) {
    e.preventDefault();
    if (this.clicked) {
      return;
    }
    if (this.flag === "⚐") {
      this.setState({ flag: "", clicked: false });
    } else {
      this.setState({ flag: "⚐" });
    }
  }

  render() {
    const { lost, won, tiles } = this.state;
    console.log(this.state);
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
            handleClicked={() => this.handleClicked()}
            handleFlagged={() => this.handleFlagged()}
            handleBombClick={() => this.handleBombClick()}
          />
        )))}
      </div>
    )));
  }
}
