import React, { Component } from "react";
import update from "react-addons-update";

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

      playerField: [],
      enemyField: [],
    };

    this.gameBoardClick = this.gameBoardClick.bind(this);
    this.stateChange = this.stateChange.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  generateField(field) {
    let generatedField = field;
    for (let i = 0; i < 10; i++) {
      generatedField.push([]);
      for (let j = 0; j < 10; j++) {
        generatedField[i].push("");
      }
    }
    this.setState({ [field]: generatedField });
  }

  componentDidMount() {
    this.generateField(this.state.playerField);
    this.generateField(this.state.enemyField);
  }

  startGame() {
    this.setState({ GameSetup: false });
  }

  updateTwoDigitsField(key, value) {
    const pIndex = Number(String(key)[0]);
    const cIndex = Number(String(key)[1]);

    this.setState({
      playerField: [...this.state.playerField[pIndex][cIndex], value],
    });
  }

  stateChange(key, value) {
    this.setState({ key, value });
  }

  placeShip(ship) {
    if (ship[0][3] === ship[1][3]) this.placeVerticalShip(ship);
    else this.placeHorizontalShip(ship);
  }

  placeVerticalShip(ship) {
    let array = this.state.playerField;
    for(let i = Number(ship[0][2]); i <= ship.length - 1; i++) {
      array[Number(ship[i][2])][Number(ship[i][3])] = 's'; 
    }

    this.setState({ playerField: [...this.state.playerField, array]});
  }

  placeHorizontalShip(ship) {
    let array = ["", "", "", "", "", "", "", "", "", ""];

    ship.map((part) => {
      array[Number(part[3])] = "s";
    });

    this.setState(
      update(this.state, {
        playerField: {
          [ship[0][2]]: {
            $set: array,
          },
        },
      })
    );
  }

  gameBoardClick(id) {
    if (id === undefined) return;

    if (typeof id === "object") {
      this.placeShip(id);
    }
    if (id.includes("p")) {
      console.log("player");
    }
    if (id.includes("e")) {
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
    let GameSetup = this.state.GameSetup;
    const game = () => {
      if (GameSetup) {
        return (
          <ShipSetup
            playerField={this.state.playerField}
            startGame={this.startGame}
            gameBoardClick={this.gameBoardClick}
            playerBoard={this.state.playerBoard}
          />
        );
      } else {
        return (
          <div>
            <Gameboard
              gameBoardClick={this.gameBoardClick}
              player={true}
              playerturn={this.state.playerTurn}
              playerField={this.state.playerField}
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
