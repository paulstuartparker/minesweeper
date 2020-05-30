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

  render() {
    console.log(this.props)
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
                  // bombClick=
                  // onClick={() => this.handleTileClick(rowidx, colidx)}
                />
              )
            }))}
          </div>
        )
      }))
  }

  // handleTileClick() {
  //
  // }
}
