import React from "react";
import GameBoard from "./Gameboard";

class ShipSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedShip: null,
      shipLength: [5, 4, 3, 3, 2],
      horizontalPlacement: true,
    };

    this.placeShip = this.placeShip.bind(this);
    this.toggleHorizontalPlacement = this.toggleHorizontalPlacement.bind(this);
    this.placeRandomShips = this.placeRandomShips.bind(this);
  }

  twoDecimalsNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  getPlacementCoordinates(length) {
    const horizontalPlacement = Math.random() >= 0.5;

    // Generate a random number between 0 and 5 inclusive
    const row = Math.floor(Math.random() * 6);
    const column = Math.floor(Math.random() * 6);

    // Initialize the ship array
    const ship = [];

    // Place the first part of the ship at the chosen location
    ship.push(`${row}${column}`);

    // Place the remaining parts of the ship, starting from the second part
    for (let i = 1; i < length; i++) {
      if (horizontalPlacement) {
        // If the ship is placed horizontally, the column value is incremented
        // but the row value remains the same
        ship.push(`${row}${column + i}`);
      } else {
        // If the ship is placed vertically, the row value is incremented
        // but the column value remains the same
        ship.push(`${row + i}${column}`);
      }
    }

    // Check for overlaps between the ship and existing ships on the game board
    if (
      ship.some((coordinates) => {
        const [row, column] = coordinates;
        return (
          this.props.field[row][column] === "f" ||
          this.props.field[row][column] === "s"
        );
      })
    ) {
      // If there is an overlap, return null to indicate that the ship could not be placed
      return this.getPlacementCoordinates(length);
    }

    // If the ship was placed successfully, return the array of coordinates
    return ship;
  }

  async placeRandomShips() {
    while (this.state.shipLength.length > 0) {
      const ship = this.getPlacementCoordinates(this.state.shipLength[0]);
      console.log(ship);
      for (let i = 0; i < ship.length; i++) {
        this.props.gameBoardClick("s-" + ship[i]);
      }

      await this.setState({
        shipLength: this.state.shipLength.slice(1),
      });

      if (this.state.shipLength.length === 0) {
        break;
      }
    }

    this.props.startGame();
  }

  toggleHorizontalPlacement() {
    this.setState({
      horizontalPlacement: !this.state.horizontalPlacement,
    });
  }

  checkIfSafeToPlaceShip(e) {
    const row = e.id[2];
    const column = e.id[3];
    if (
      this.props.field[row][column] === "f" ||
      this.props.field[row][column] === "s"
    )
      return false;
  }

  placeShip(e) {
    const domHovers = document.querySelectorAll(".hover:not(.clicked)");
    let notSafeToPlaceShip = false;
    domHovers.forEach((el) => {
      if (this.checkIfSafeToPlaceShip(el) === false) notSafeToPlaceShip = true;
    });

    if (notSafeToPlaceShip === true) return;

    domHovers.forEach((el) => {
      this.props.gameBoardClick(el.id);
    });

    this.setState({
      shipLength: this.state.shipLength.slice(1),
    });

    if (this.state.shipLength.length === 1) {
      this.props.startGame();
    }
  }

  render() {
    return (
      <div className="game-setup">
        <GameBoard
          shipLength={this.state.shipLength[0]}
          gameSetup={true}
          selectedShip={this.state.selectedShip}
          placeShip={this.placeShip}
          horizontalPlacement={this.state.horizontalPlacement}
          field={this.props.field}
        />
        <button onClick={this.toggleHorizontalPlacement}>
          {this.state.horizontalPlacement
            ? "HORIZONTAL PLACEMENT"
            : "VERTICAL PLACEMENT"}
        </button>
        <button onClick={this.placeRandomShips}>RANDOMLY PLACE SHIPS</button>
      </div>
    );
  }
}

export default ShipSetup;
