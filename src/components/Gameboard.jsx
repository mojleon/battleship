import React from "react";

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: Array(props.size),
    };
  }

  twoDecimalsNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  async clicked(e) {
    if (this.props.gameSetup) return this.props.placeShip(e);
    if (e.target.classList.contains("clicked")) return;

    this.props.gameBoardClick(e.target.id);
    e.target.classList.add("clicked");
  }

  shipPlacementHover(event, id) {
    const addClass = event.nativeEvent.type === "mouseover" ? true : false;

    if (this.props.horizontalPlacement)
      this.horizontalDomHover(event, id, addClass);
    else this.verticalDomHover(event, id, addClass);
  }

  checkIfSafeToPlace(event, id, addClass) {
    if (String(this.twoDecimalsNumber(id))[1] > 10 - this.props.shipLength) {
      return this.cannotPlace(event);
    }
  }

  horizontalDomHover(event, id, addClass) {
    const safeToPlace = this.checkIfSafeToPlace(event, id, addClass);

    if (safeToPlace === false) return;

    for (let i = id; i < id + this.props.shipLength; i++) {
      if (addClass) {
        document
          .getElementById("s-" + this.twoDecimalsNumber(i))
          .classList.add("hover");
      } else {
        document
          .getElementById("s-" + this.twoDecimalsNumber(i))
          .classList.remove("hover");
      }
    }
  }

  verticalDomHover(event, id, addClass) {
    if (String(this.twoDecimalsNumber(id))[0] > 10 - this.props.shipLength)
      return this.cannotPlace(event);

    for (let i = id; i < id + this.props.shipLength * 10; i += 10) {
      if (addClass) {
        document
          .getElementById("s-" + this.twoDecimalsNumber(i))
          .classList.add("hover");
      } else {
        document
          .getElementById("s-" + this.twoDecimalsNumber(i))
          .classList.remove("hover");
      }
    }
  }

  cannotPlace(event) {
    event.target.classList.toggle("cannot-place");
    return false;
  }

  render() {
    return (
      <div className="gameboard">
        {Array.from(Array(100), (e, i) => {
          return (
            <div
              onMouseLeave={(event) => this.shipPlacementHover(event, i)}
              onMouseOver={(event) => this.shipPlacementHover(event, i)}
              onClick={() => {
                this.clicked();
              }}
              key={i}
              id={
                (this.props.gameSetup
                  ? "s-"
                  : this.props.player
                  ? "p-"
                  : "e-") + this.twoDecimalsNumber(i)
              }
            ></div>
          );
        })}
      </div>
    );
  }
}
