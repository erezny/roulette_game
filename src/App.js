import React, { Component } from 'react';
import './App.css';
import BettingTable from './components/BettingTable';
import Controlls from './components/Controlls';
import Wheel from './components/Wheel';
import Wallet from './components/Wallet';
import Bets from './constants/Bets';
import History from './components/History';
import AutoBet from './components/AutoBet';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
      bets: [],
      betHandler: null,
      winHandler: null,
      history: [],
      timestamp: 1,
    };
  }

  handleNumberChange = Enum => {
    const winningBet = this.winningBets(Enum);

    let number = this.numberFromEnum(Enum);

    if (this.state.winHandler) {
      this.state.winHandler(winningBet);
    }
    return this.setState(prevState => {
      let historyEntry = {
        bets: prevState.bets,
        winningNumber: number,
        timestamp: prevState.timestamp,
      };
      console.log({ historyEntry });
      return {
        number: this.numberFromEnum(Enum),
        bets: {},
        history: [...prevState.history, historyEntry],
        timestamp: prevState.timestamp + 1,
      };
    });
  };

  winningBets = Enum => {
    let number = this.numberFromEnum(Enum);
    let winningBets = [];
    if (this.state.bets[number.Enum]) {
      winningBets.push({
        Amount: this.state.bets[number.Enum],
        Place: number,
        PayoutRatio: number.Payout,
      });
    }

    let addWinningBet = (amount, place) => {
      winningBets.push({
        Amount: amount,
        Place: place,
        PayoutRatio: place.Payout,
      });
    };

    let checkAggregateForBet = (agg, bets) => {
      return bets[agg.Enum] || 0;
    };

    let checkAggregateForWin = (agg, number) => {
      for (let aggregateInclude of agg.Includes) {
        if (aggregateInclude.Enum === number.Enum) {
          return true;
        }
      }
    };

    for (let aggregateName in Bets.Aggregates) {
      let aggregate = Bets.Aggregates[aggregateName];
      let betAmount = checkAggregateForBet(
        aggregate,
        this.state.bets
      );
      if (
        betAmount > 0 &&
        checkAggregateForWin(aggregate, number)
      ) {
        addWinningBet(betAmount, aggregate);
      }
    }
    console.log(winningBets);
    let payout = winningBets.reduce((acc, bet) => {
      acc += bet.Amount;
      acc += bet.Amount * bet.PayoutRatio;
      return acc;
    }, 0);

    return payout;
  };

  handleBet = (position, amount) => {
    if (this.state.betHandler(amount)) {
      this.setState(prevState => {
        return {
          bets: {
            ...prevState.bets,
            [position.Enum]:
              (prevState.bets[position.Enum] || 0) + amount,
          },
        };
      });
    } //else not enough cash
  };

  registerBetHandler = handler => {
    this.setState({
      betHandler: handler,
    });
  };

  registerWinHandler = handler => {
    this.setState({
      winHandler: handler,
    });
  };

  registerSpinHandler = handler => {
    this.setState({
      spinHandler: handler,
    });
  };

  simpleBet = position => {
    this.handleBet(position, 1);
  };

  batchBet = positionAmountArray => {
    for (let positionAmount of positionAmountArray) {
      this.handleBet(
        positionAmount.position,
        positionAmount.amount
      );
    }
  };

  numberFromEnum(Enum) {
    for (let key of Object.keys(Bets.Numbers)) {
      if (Bets.Numbers[key].Enum === Enum) {
        return Bets.Numbers[key];
      }
    }
  }

  render() {
    let windowHeight = this.props.window.innerHeight;
    let windowWidth = this.props.window.innerWidth;
    return (
      <div className="App">
        <BettingTable
          className="betting-table"
          winningNumber={this.state.number}
          onBet={this.simpleBet}
          bets={this.state.bets}
        />
        <AutoBet
          onBet={this.registerBetHandler}
          history={this.state.history}
          onBatchBet={this.batchBet}
          spin={this.state.spinHandler}
        />
        <History
          bets={this.state.bets}
          history={this.state.history}
        />
        <Controlls />
        <Wheel
          onNumberChange={this.handleNumberChange}
          spin={this.registerSpinHandler}
        />
        <Wallet
          onBet={this.registerBetHandler}
          onResult={this.registerWinHandler}
          windowHeight={windowHeight}
          windowWidth={windowWidth}
        />
      </div>
    );
  }
}

export default App;
