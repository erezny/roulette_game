import React, { Component } from 'react';
import Bets from '../constants/Bets';

import './AutoBet/index.css';

export default class AutoBet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curve: [0, 0, 1, 1, 2, 3, 5, 8],
    };
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
    setImmediate(this.props.spin);
  };

  positionHistory(position, history) {
    let positionHistory = [];
    for (let historyEntry of history) {
      positionHistory.push({
        bet: historyEntry.bets[position.Enum] || 0,
        win: position.Includes.reduce((win, p) => {
          if (p.Enum == historyEntry.winningNumber.Enum) {
            return win + 1;
          } else {
            return win + 0;
          }
        }, 0),
      });
    }
    return positionHistory;
  }

  winDistanceLastBet = position => {
    return this.positionHistory(
      position,
      this.props.history
    ).reduce(
      (acc, position) => {
        if (position.bet > 0) {
          acc.lastBet = position.bet;
        }
        if (position.win) {
          acc.winDistance = 0;
        } else {
          acc.winDistance += 1;
        }
        return acc;
      },
      { winDistance: 0, lastBet: 0 }
    );
  };

  betForPosition = position => {
    let { winDistance, lastBet } = this.winDistanceLastBet(
      position
    ); // 0 = won most recenlty
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
