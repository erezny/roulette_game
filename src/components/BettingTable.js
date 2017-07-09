import React, { Component } from 'react';
import './BettingTable/index.css';
import Bets from '../constants/Bets';

export default class BettingTable extends Component {
  render() {
    return (
      <div className={`board ${this.props.className}`}>
        <BettableClass
          className="blackPlace"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates.Black}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="redPlace"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates.Red}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="evenPlace"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates.Even}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="oddPlace"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates.Odd}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="firstHalfPlace"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates['1 to 18']}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="secondHalfPlace"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates['19 to 36']}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />

        <BettableClass
          className="first12Place"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates['1st 12']}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="second12Place"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates['2nd 12']}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="third12Place"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Aggregates['3rd 12']}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />

        <BettableClass
          className="zero"
          winningNumber={this.props.winningNumber}
          betValue={Bets.Numbers['0']}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <Dozen
          className="firstDozen"
          winningNumber={this.props.winningNumber}
          startNum={1}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <Dozen
          className="secondDozen"
          winningNumber={this.props.winningNumber}
          startNum={13}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <Dozen
          className="thirdDozen"
          winningNumber={this.props.winningNumber}
          startNum={25}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
      </div>
    );
  }
}

class Dozen extends Component {
  render() {
    return (
      <div className={`dozen ${this.props.className}`}>
        <BettableClass
          className="first"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 0}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="second"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 1}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="third"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 2}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="fourth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 3}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="fifth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 4}
          onBet={this.props.onBet}
        />
        <BettableClass
          className="sixth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 5}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="seventh"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 6}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="eighth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 7}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="nineth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 8}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="tenth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 9}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="eleventh"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 10}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
        <BettableClass
          className="twelvth"
          winningNumber={this.props.winningNumber}
          tableValue={this.props.startNum + 11}
          onBet={this.props.onBet}
          bets={this.props.bets}
        />
      </div>
    );
  }
}

class BettableClass extends Component {
  constructor(props) {
    super(props);

    let betValue = this.betValue(props);
    this.state = {
      betValue,
      title: betValue.Title,
      color: this.colorFor(betValue),
    };
  }

  betValue(props) {
    if (props.betValue === undefined) {
      return Bets.Numbers[`${props.tableValue}`];
    } else {
      return props.betValue;
    }
  }

  winningMark = () => {
    if (this.props.winningNumber === this.state.betValue) {
      return true;
    }
    if (
      this.state.betValue.Includes &&
      this.state.betValue.Includes.includes(this.props.winningNumber)
    ) {
      return true;
    }
    return false;
  };

  addBet = () => {
    this.props.onBet(this.state.betValue);
  };

  colorFor(number) {
    for (let i in Object.keys(Bets.Colors)) {
      let color = Object.keys(Bets.Colors)[i];
      if (
        Bets.Colors[color].Includes.includes(number) ||
        Bets.Colors[color] === number
      ) {
        return color;
      }
    }
    return 'notFound';
  }

  render() {
    return (
      <div
        className={
          `${this.props.className} ${this.state.color} Bettable` +
          `${this.winningMark() ? ' winningMark' : ''}`
        }
        onClick={this.addBet}
      >
        <span>
          {this.state.title}
        </span>
        <BetTokens bets={this.props.bets} position={this.state.betValue} />
      </div>
    );
  }
}

class BetTokens extends Component {
  render() {
    let amount = this.props.bets
      ? this.props.bets[this.props.position.Enum]
      : null;
    return (
      <div>
        {amount ? `${amount}` : null}
      </div>
    );
  }
}
