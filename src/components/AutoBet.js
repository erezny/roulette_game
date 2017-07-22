import React, { Component } from 'react';
import Bets from '../constants/Bets';

import './AutoBet/index.css';

export default class AutoBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curve: props.autoBetCurve,
    };

    // this.interval = setInterval(this.handleOnClick, 5000);
  }
  componentWillReceiveProps(props) {
    this.setState({
      curve: props.autoBetCurve,
    });
  }

  curve = index => {
    let curve = this.state.curve;
    let length = curve.length;
    if (length <= index) {
      var nextNum = curve[length - 1] + curve[length - 2];
      curve = [...curve, nextNum];
      this.setState({
        curve: curve,
      });
    } else {
      var nextNum = curve[index];
    }
    return nextNum;
  };

  handleOnClick = () => {
    let batchBets = [];
    for (let aggKey in Bets.Aggregates) {
      let agg = Bets.Aggregates[aggKey];
      let bet = this.betForPosition(agg);
      if (bet > 0) {
        batchBets.push({
          position: agg,
          amount: bet,
        });
      }
    }
    this.props.onBatchBet(batchBets);
    setTimeout(this.props.spin, 1000);
  };

  positionOffset = position => {
    return 0 - position.Payout * position.Payout;
  };

  winDistance = position => {
    let winDistance = 0;
    winDistance += this.positionOffset(position);

    let historyLast = this.props.history.length - 1;
    for (let i = historyLast; i >= 0; i -= 1) {
      let historyEntry = this.props.history[i];
      let win = position.Includes.reduce((w, p) => {
        if (p.Enum === historyEntry.winningNumber.Enum) {
          return w + 1;
        } else if (p.Enum === historyEntry.winning) {
          return w + 1;
        } else {
          return w + 0;
        }
      }, 0);
      if (win == 0) {
        winDistance += 1;
      } else {
        return winDistance;
      }
    }
    return winDistance;
  };

  betForPosition = position => {
    let winDistance = this.winDistance(position); // 0 = won most recenlty
    let nextBet = this.curve(winDistance);
    return nextBet;
  };

  render() {
    return (
      <div
        className={'AutoBet clickable'}
        onClick={this.handleOnClick}
      >
        {' '}AutoBet{' '}
      </div>
    );
  }
}
