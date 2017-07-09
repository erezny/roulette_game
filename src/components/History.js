import React, { Component } from 'react';
import './History/index.css';
import Bets from '../constants/Bets';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  titles() {
    let aggs = Object.keys(Bets.Aggregates);
    let tds = aggs.map(agg => {
      return (
        <td>
          {agg}
        </td>
      );
    });
    return (
      <tr>
        <td />
        {tds}
      </tr>
    );
  }

  eachAggTd = agg => {
    return (
      <td>
        {this.props.bets[Bets.Aggregates[agg].Enum]}
      </td>
    );
  };

  winningMark = (winningNumber, betValue) => {
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

  currentBets() {
    let aggs = Object.keys(Bets.Aggregates);
    let tds = aggs.map(this.eachAggTd);
    return (
      <tr>
        <td />
        {tds}
      </tr>
    );
  }
  pastBets() {
    let roundTr = round => {
      let aggs = Object.keys(Bets.Aggregates);
      let winningAggs = aggs.reduce((wAggs, agg) => {
        let bAgg = Bets.Aggregates[agg];
        if (bAgg.Includes.includes(round.winningNumber)) {
          wAggs.push(bAgg);
        }
        return wAggs;
      }, []);
      let tds = aggs.map(agg => {
        let bAgg = Bets.Aggregates[agg];
        let winningAgg = winningAggs.includes(bAgg);
        return (
          <td
            key={`${agg}`}
            className={` ${winningAgg ? 'winningBet' : 'nonWinningBet'}`}
          >
            {round.bets[bAgg.Enum]}
          </td>
        );
      });
      return (
        <tr key={`past-round-${round.timestamp || '0'}`}>
          <td>
            {round.winningNumber.Title}
          </td>
          {tds}
        </tr>
      );
    };
    let revHistory = [...this.props.history].reverse();
    let roundTrs = revHistory.map(round => {
      return roundTr(round);
    });
    return roundTrs;
  }

  render() {
    console.log('history', this.props);
    return (
      <div className="History">
        <div>History</div>
        <table style={{ width: '100%' }}>
          <tr>
            <td>Number</td>
            <td colSpan={10}>Bets</td>
          </tr>
          {this.titles()}
          {this.currentBets()}
          {this.pastBets()}
        </table>
      </div>
    );
  }
}
