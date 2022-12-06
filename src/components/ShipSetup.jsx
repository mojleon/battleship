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

  placeShip() {
    this.setState({
      shipLength: this.state.shipLength.slice(1),
    });

    document.querySelectorAll(".hover:not(.clicked)").forEach((el) => {
      el.classList.add("clicked");
      this.props.gameBoardClick(el.id);
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
