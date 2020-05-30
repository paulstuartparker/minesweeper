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

  handleEmptyTileClick(x, y) {
    const emptyNeighbors = this.getEmptyNeighbors(x, y)
    console.log(emptyNeighbors)
    emptyNeighbors.forEach((xyArray, i) => {
      let x1 = xyArray[0]
      let y1 = xyArray[1]
      setImmediate(() => {
        console.log(`${x1},${y1}`)
        console.log(document.getElementById(`${x1},${y1}`))
        document.getElementById(`${x1},${y1}`).click()
      })
    });
  }

  getEmptyNeighbors(x, y) {
    const emptyNeighbors = []
    const directions = [-1, 0, 1]
    directions.map((xdir) => {
      directions.map((ydir) => {
        let newx = x + xdir
        let newy = y + ydir
        if (newx >= 0 && newx < this.props.size && newy > 0 && newy < this.props.size) {
          if (this.props.boardMatrix[newx][newy] != 'x') {
            emptyNeighbors.push([newx, newy])
          }
        }
      })
    })
    return emptyNeighbors
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
                handleEmptyTileClick={(x, y) => this.handleEmptyTileClick(x, y)}
              />
            )
          }))}
        </div>
      )
    }))
  }
}
