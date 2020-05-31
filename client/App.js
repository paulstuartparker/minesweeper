import React, { Component } from "react";
import Board from "./components/Board";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardMatrix: [],
      bombCount: 0,
    };
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    const qstring = window.location.search;
    fetch(`http://localhost:8080/game/${qstring}`)
      .then(res => res.json())
      .then((board) => {
        this.setState({
          boardMatrix: board.board,
          bombCount: board.bombCount,
          size: board.board.length,
          refresh: false,
        });
      })
      .catch(console.log);
  }


  restartGame() {
    this.setState({ refresh: true });
  }

  render() {
    return (
      <div>
        <h1 id="title">... xxx XXX Minesweeper XXX xxx ...</h1>
        <div id="restart" onClick={this.restartGame}>restart</div>
        <div id="board">
          <Board {...this.state} />
        </div>
      </div>
    );
  }
}
