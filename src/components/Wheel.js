import React, { Component } from 'react';
import './Wheel/index.css';
import Bets from '../constants/Bets';

export default class Wheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomNumber: 5,
      style: {
        height: '3em',
        padding: 'auto',
      },
    };

    this.props.spin(this.spin);
  }

  spin = () => {
    let newEnum = Math.floor(Math.random() * (38 - 0)) + 0;
    if (newEnum == 38) {
      return this.spin();
    }
    const newNumber = this.numberFromEnum(newEnum);
    this.props.onNumberChange(newEnum, newNumber);
    this.setState({
      randomNumber: newEnum,
      number: newNumber,
    });
  };

  numberFromEnum(Enum) {
    for (let key of Object.keys(Bets.Numbers)) {
      if (Bets.Numbers[key].Enum === Enum) {
        return Bets.Numbers[key];
      }
    }
  }

  render() {
    return (
      <div
        style={this.state.style}
        className={`${this.props.className} clickable`}
        onClick={this.spin}
      >
        <div>
          {this.state.randomNumber}
        </div>
        <div>Spin</div>
      </div>
    );
  }
}
