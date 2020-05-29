import React, { Component } from "react";
import queryString from 'query-string'
import "./app.css";

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      boardArray: []
    }
  }

  componentDidMount() {
    const qstring = window.location.search
    fetch(`http://localhost:8080/game/${qstring}`)
      .then(res => res.json())
      .then((board) => {
        console.log(board)
        this.setState({ boardArray: board })
      })
      .catch(console.log)
  }
  render() {
    return (
      <div>
        <h1 id="title">... xxx XXX Minesweeper XXX xxx ...</h1>
        <div id="board">
        </div>
      </div>
    );
  }
}
