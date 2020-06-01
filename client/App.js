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
    // TODO: Handle errors/ render error message on invalid board or invalid idx
    const qstring = window.location.search;
    const baseurl = "minesweeperfullstack-codesmith.herokuapp.com";
    console.log(process.env);
    console.log(process.env.env);
    fetch(`https://${baseurl}/game/${qstring}`)
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
      <div id="wrapper">
        <marquee id="banner" scrollamount="10" direction="left" behavior="slide">
          <h1 id="title">Minesweeper</h1>
        </marquee>
        <div id="restart" onClick={this.restartGame}>Retry</div>
        <div id="board">
          <Board {...this.state} />
        </div>
      </div>
    );
  }
}
