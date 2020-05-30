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
      // value = value === "_" ? "" : value
      return (
        <div className="tile" id={`${x},${y}`} onClick={this.handleClicked.bind(this)} onContextMenu={this.handleFlagged.bind(this)}>{clicked && !flag ? value : (flag || "")}</div>
      )
    }

    handleClicked() {
      let wasClicked = this.state.clicked
      this.setState({clicked: true})

      if (this.state.flag) {
        return
      }

      if (this.props.value === "x") {
        this.props.handleBombClick()
        return
      }
      if (wasClicked === false) {
        this.props.incrementCounter()
      }

      if (this.props.value === "_" && wasClicked == false) {
        this.props.handleEmptyTileClick(this.props.x, this.props.y)
      }

    }

    handleFlagged(e) {
      e.preventDefault()
      if (this.state.clicked) {
        return
      }
      if (this.state.flag == "⚐") {
        this.setState({flag: "", clicked: false})
      } else {
        this.setState({flag: "⚐"})
      }
    }
}
