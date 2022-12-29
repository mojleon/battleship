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

  placeShipField(row, column) {
    const leftSide = column - 1 < 0 ? null : column - 1;
    const rightSide = column + 1 > 9 ? null : column + 1;
    const upSide = row - 1 < 0 ? null : row - 1;
    const downSide = row + 1 > 9 ? null : row + 1;

    const setFieldsBy = {
      0: { row: upSide, column: leftSide },
      1: { row: upSide, column: column },
      2: { row: upSide, column: rightSide },
      3: { row: row, column: leftSide },
      4: { row: row, column: column, ship: true },
      5: { row: row, column: rightSide },
      6: { row: downSide, column: leftSide },
      7: { row: downSide, column: column },
      8: { row: downSide, column: rightSide },
    };

    for (let i = 0; i <= 8; i++) {
      const r = setFieldsBy[i].row;
      const c = setFieldsBy[i].column;
      if ((r === null) | (c === null)) continue;

      this.setState((prevstate) =>
        update(prevstate, {
          playerField: {
            [r]: {
              [c]: { $set: "f" },
            },
          },
        })
      );
    }
  }

  async placeShip(id) {
    const row = Number(id[2]);
    const column = Number(id[3]);
    await this.placeShipField(row, column);

    this.setState((prevstate) =>
      update(prevstate, {
        playerField: { [row]: { [column]: { $set: "s" } } },
      })
    );
  }

  gameBoardClick(id) {
    if (id === undefined) return;

    if (this.state.GameSetup === true) {
      return this.placeShip(id);
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
            field={this.state.playerField}
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
              field={this.state.playerField}
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
