import React, { Component } from "react"


export default class Tile extends Component {
    constructor(props) {
      super(props)
      this.state = { clicked: false, flag: "" }
    }

    render() {
      let { clicked, flag } = this.state
      let { value, x, y } = this.props
      value = value === "x" ? "💣" : value
      return (
        <div className="tile" id={`${x},${y}`} onClick={this.handleClicked.bind(this)} onContextMenu={this.handleFlagged.bind(this)}>{clicked && !flag ? value : (flag || "")}</div>
      )
    }

    handleClicked() {
      this.setState({clicked: true})
    }

    handleFlagged() {
      this.setState({flag: "⚐"})
    }
}
