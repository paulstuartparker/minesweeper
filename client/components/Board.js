import React, { Component } from "react"
import Tile from "./Tile"

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedCount: 0,
      won: false,
      lost: false,
    }
  }

  handleEmptyTileClick() {

  }

  getEmptyNeighbors() {

  }
  handleBombClick() {
    this.setState({lost: true})
  }

  incrementCounter() {
    let { clickedCount, won, lost } = this.state
    this.setState({clickedCount: clickedCount += 1})
    // if the number of clicks == the numer of non-bomb spaces on the board, you win.
    if (this.props.size * this.props.size - this.state.clickedCount - this.props.bombCount === 0) {
      this.setState({won: true})
    }
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    if (this.state.lost) {
      return (<div className="lost">YOU LOSE</div>)
    }
    if (this.state.won) {
      return (<div className="won">YOU WIN</div>)
    }
    return (this.props.boardMatrix.map((row, rowidx) => {
      return (
        <div className="row" key={rowidx}>
          {(row.map((tile, colidx) => {
            return (
              <Tile
                key={colidx}
                x={rowidx}
                y={colidx}
                value={tile}
                handleBombClick={() => this.handleBombClick()}
                incrementCounter={() => this.incrementCounter()}
                handleEmptyTileClick={(x, y) => this.handleEmptyTileClick()}
              />
            )
          }))}
        </div>
      )
    }))
  }
}
