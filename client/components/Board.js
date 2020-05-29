import React, { Component } from "react"
import { Tile } from "./Tile"

export default class Board extends Component {
  render() {
    console.log(this.props)
      return (this.props.boardMatrix.map((row) => {
        return (
          <div className="row">
            {(row.map((tile) => {
              return (
                <div className="tile">{tile}</div>
              )
            }))}
          </div>
        )
      }))
  }
}
