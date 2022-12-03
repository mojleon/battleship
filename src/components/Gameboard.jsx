import React, { Component } from "react";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: Array(props.size),
      player: props.player,
    };
  }

  twoDecimalsNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  async clicked(e) {
    if (e.target.classList.contains("clicked")) return;

    this.props.gameBoardClick(e.target.id);
    e.target.classList.add("clicked");
  }

  render() {
    return (
      <div className="gameboard">
        {Array.from(Array(100), (e, i) => {
          return (
            <div
              onClick={this.clicked.bind(this)}
              key={i}
              id={(this.state.player ? "p-" : "e-") + this.twoDecimalsNumber(i)}
            ></div>
          );
        })}
      </div>
    );
  }
}
