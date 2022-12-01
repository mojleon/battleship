import React, { Component } from "react"

export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: Array(props.size)
        }
    }

    render() {
        return <div className="gameboard">
                    {Array.from(Array(100), (e, i) => {
                        return <div key={i}></div>
                    })}
                </div>
    }
}

