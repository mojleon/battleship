import React from "react";

class Ship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      health: props.health,
    };

    this.hit = this.hit.bind(this);
  }

  hit() {
    if (this.state.health > 0)
      this.setState({ health: (this.state.health -= 1) });
    else this.sunk();
  }

  sunk() {
    console.log("sunk");
  }

  render() {
    return (
      <div>
        {this.state.health}
        <button onClick={this.hit}>HIT</button>
      </div>
    );
  }
}

export default Ship;
