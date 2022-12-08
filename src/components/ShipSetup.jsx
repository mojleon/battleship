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
  }

  toggleHorizontalPlacement() {
    this.setState({
      horizontalPlacement: !this.state.horizontalPlacement,
    });
  }
  
  checkIfSafeToPlaceShip(e) {
    const row = e.id[2]
    const column = e.id[3];
    if (this.props.field[row][column] === 'f' || this.props.field[row][column] === 's') return false;
  }
  
  placeShip(e) {
    const domHovers = document.querySelectorAll(".hover:not(.clicked)");
    let notSafeToPlaceShip = false;
    domHovers.forEach((el) => {
      if(this.checkIfSafeToPlaceShip(el) === false) notSafeToPlaceShip = true;
    })

    if(notSafeToPlaceShip === true) return;

    domHovers.forEach((el) => {
      this.props.gameBoardClick(el.id);
    })

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
      </div>
    );
  }
}

export default ShipSetup;
