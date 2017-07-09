import React, { Component } from 'react';
import './Wallet/index.css';

export default class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cash: 100,
      onTable: 0,
      childHandlers: {
        handleBet: null,
        handleResult: null,
      },
    };

    this.props.onBet(this.handleBet);
    this.props.onResult(this.handleResult);
  }

  handleBet = bet => {
    if (this.state.cash < bet) {
      return false;
    } else {
      this.setState({
        cash: this.state.cash - bet,
        onTable: this.state.onTable + bet,
      });
      return true;
    }
    this.state.handleBet(bet);
  };

  handleResult = winnings => {
    this.setState({
      cash: this.state.cash + (winnings || 0),
      onTable: 0,
    });
    if (this.state.handleResult) {
      this.state.handleResult(winnings);
    }
  };

  registerHandleBet = childOnBet => {
    this.setState(prevState => {
      return {
        childHandlers: {
          handleBet: childOnBet,
          handleResult: prevState.handleResult,
        },
      };
    });
  };

  registerHandleResult = childOnResult => {
    this.setState(prevState => {
      return {
        childHandlers: {
          ehandleBet: prevState.handleBet,
          handleResult: childOnResult,
        },
      };
    });
  };

  render() {
    return (
      <div className={`${this.props.className}`}>
        <div>
          <div>On Table</div>
          <div>
            {this.state.onTable}
          </div>
        </div>
        <Cash
          count={this.state.cash}
          onBet={this.registerHandleBet}
          onResult={this.registerHandleResult}
          windowHeight={this.props.windowHeight}
          windowWidth={this.props.windowWidth}
        >
          <div>Cash</div>
          <div>
            {this.state.cash}
          </div>
        </Cash>
      </div>
    );
  }
}

class Cash extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.props.onBet(this.handleBet);
    this.props.onResult(this.handleResult);
  }

  handleBet = () => {};

  handleResult = () => {};

  render() {
    let coins = [];
    for (let i = 0; i < this.props.count; i += 1) {
      coins.push(
        <Coin
          key={`coin-${i}`}
          index={i}
          windowHeight={this.props.windowHeight}
          windowWidth={this.props.windowWidth}
        />
      );
    }
    return (
      <div>
        {this.props.children}
        <div>
          {coins}
        </div>
      </div>
    );
  }
}

class Coin extends Component {
  constructor(props) {
    super(props);

    let { left, top } = this.positionFromProps(props);
    this.state = {
      style: {
        width: '.1em',
        height: '.5em',
        left: left,
        top: top,
        border: 'solid brown',
      },
    };
  }

  positionFromProps(props) {
    let leftInterval = this.props.windowWidth / 101;
    let leftTotal = leftInterval * this.props.index;
    let left = leftTotal % this.props.windowWidth;
    let leftWrap = Math.floor(
      leftTotal / this.props.windowWidth
    );
    let top = this.props.windowHeight - 40 * (1 + leftWrap);
    return { left, top };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.style !== this.state.style) {
      this.styleFromProps(newProps);
    }
  }

  styleFromProps(props) {
    let { left, top } = this.positionFromProps(props);
    this.setState(prevState => {
      return {
        style: {
          width: '.5m',
          height: '2em',
          left: left,
          top: top,
          border: 'solid brown',
        },
      };
    });
  }

  render() {
    return (
      <div className="Coin" style={this.state.style}>
        {''}
      </div>
    );
  }
}
