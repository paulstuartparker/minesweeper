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
      if (this.state.flag) {
        return
      }

      if (this.props.value === "x") {
        this.props.handleBombClick()
        return
      }
      if (this.state.clicked === false) {
        this.props.incrementCounter()
      }
      if (this.props.value === "_" && this.state.clicked === false) {
        this.props.handleEmptyTileClick(this.props.x, this.props.y)
      }

      this.setState({clicked: true})

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
