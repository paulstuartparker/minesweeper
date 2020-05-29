import React, { Component } from "react";
import Board from "./components/Board"
import "./app.css";

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      boardMatrix: []
    }
  }

  componentDidMount() {
    const qstring = window.location.search
    fetch(`http://localhost:8080/game/${qstring}`)
      .then(res => res.json())
      .then((board) => {
        console.log(board)
        this.setState({ boardMatrix: board.board })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1 id="title">... xxx XXX Minesweeper XXX xxx ...</h1>
        <div id="board">
        <Board {...this.state} />
        </div>
      </div>
    );
  }
}
