import React, { Component } from "react";

// Tile is a 'dumb' component. Store state in Board.
export default class Tile extends Component {
  handleClicked(e) {
    this.props.handleClicked(e);
  }

  render() {
    const {
      clicked, flag, value, x, y
    } = this.props;

    const displayValue = value === "x" ? "💣" : value;
    // value = value === "_" ? "" : value
    return (
      <div
        className="tile"
        id={`${x},${y}`}
        onClick={this.handleClicked.bind(this)}
        onContextMenu={this.handleFlagged.bind(this)}
      >
        {clicked && !flag ? displayValue : (flag || "")}
      </div>
    );
  }
}
