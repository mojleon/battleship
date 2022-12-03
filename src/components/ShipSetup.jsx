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

    this.shipPlaced = this.shipPlaced.bind(this);
    this.toggleHorizontalPlacement = this.toggleHorizontalPlacement.bind(this);
  }

  toggleHorizontalPlacement() {
    this.setState({
      horizontalPlacement: !this.state.horizontalPlacement,
    });
    console.log(this.state.horizontalPlacement);
  }

  shipPlaced(e) {
    console.log(e);
  }

  render() {
    return (
      <div className="game-setup">
        <GameBoard
          shipLength={this.state.shipLength[0]}
          gameSetup={true}
          selectedShip={this.state.selectedShip}
          shipPlaced={this.shipPlaced}
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
