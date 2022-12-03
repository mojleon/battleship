import React, { Component } from "react";

import "./App.scss";

import ShipSetup from "./components/ShipSetup";
import Ship from "./components/Ship";
import Gameboard from "./components/Gameboard";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      GameSetup: true,
      playerTurn: true,
      areasDestroyedPlayer: [],
      areasDestroyedEnemy: [],
    };

    this.gameBoardClick = this.gameBoardClick.bind(this);
  }

  gameBoardClick(id) {
    if (id.includes("p")) {
      console.log("player");
    } else {
      this.enemyTurn();
      console.log("enemy");
    }
  }

  twoDecimalsNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  enemyTurn() {
    const idToHit =
      "p-" + this.twoDecimalsNumber(Math.floor(Math.random() * 100));
    console.log(idToHit);
    if (document.querySelector(`#${idToHit}`).classList.contains("clicked"))
      return this.enemyTurn();
    document.querySelector(`#${idToHit}`).click();
  }

  render() {
    let { GameSetup } = this.state.GameSetup;

    const game = () => {
      if (GameSetup) {
        return <ShipSetup />;
      } else {
        return (
          <div>
            <Gameboard
              gameBoardClick={this.gameBoardClick}
              player={true}
              playerturn={this.state.playerTurn}
            />
            <p className="vs">VS</p>
            <Gameboard
              gameBoardClick={this.gameBoardClick}
              playerturn={this.state.playerTurn}
            />
          </div>
        );
      }
    };

    return <div className="App">{game()}</div>;
  }
}

export default App;
