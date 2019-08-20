import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './homePage.scss';

const vis = [];
for (let i = 0; i < 10; i++) {
  vis[i] = require('./image/mixed4d/' + (i + 1) + '.png')
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderImgs() {
    let element;
    for (let i = 0; i < 10; i++) {
      element.push(<img src={vis[i]} />)
    }
    return element;
  }
  render() {
    return (
      <div className="home">
        <div className="side left">
          {this.renderImgs()}
        </div>
        <div className="side right">
          <div className="title">Guess what the machine speaks!</div>
          <div className="expla">
            <p>Feature visualization is a tool to understand how neural network works. Our goal is to understand how people percieve these feature visualizations.</p>
            <p>
              We are collecting data from your game play.<br />
              For now, enjoy the game! </p>
          </div>
        </div>
        <div className = "btnWrapper">
          <div className = "gameBtn guessAI">
            <div className = "icon">
            
            </div>
            <div className = "title">
            Guess AI
            </div>
            <div className = "expla">
            Compete with other players on guessing what machine speaks!
            </div>
          </div>
          <div className = "btnWrapper">
          <div className = "gameBtn AIQuiz">
            <div className = "icon">
            
            </div>
            <div className = "title">
            AI Quiz
            </div>
            <div className = "expla">
            Find who has similar AI taste as you at Carnegie Mellon University!
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
