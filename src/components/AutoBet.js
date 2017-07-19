import React, { Component } from 'react';
import Bets from '../constants/Bets';

import './AutoBet/index.css';

export default class AutoBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curve: props.autoBetCurve,
    };

    this.interval = setInterval(this.handleOnClick, 5000);
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
      console.log('calc next', {
        index,
        nextNum,
        curve,
        length,
      });
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
    console.log({ batchBets });
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
        console.log('win distance', {
          position,
          winDistance,
        });
        return winDistance;
      }
    }
    console.log('winDistanceDefault', {
      winDistance,
      historyLast,
    });
    return winDistance;
  };

  betForPosition = position => {
    let winDistance = this.winDistance(position); // 0 = won most recenlty
    let nextBet = this.curve(winDistance);
    console.log('betForPosition', {
      position,
      winDistance,
      nextBet,
    });
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
