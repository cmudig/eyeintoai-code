import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './homePage.scss';
import game1 from './image/home/game1.png'
import game2 from './image/home/game2.png'

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
    let element = [];
    for (let i = 0; i < 10; i++) {
      element.push(<img src={vis[i]} />)
    }
    return element;
  }
  render() {
    return (
      <div className="home">
        <div className="sideWrapper">
          <div className="side left">
            <div className="left">
              {this.renderImgs()}
            </div>
          </div>
          <div className="side right">
            <div className="title">Guess what the machine speaks!</div>
            <div className="expla">
              <p><a href="https://distill.pub/2017/feature-visualization/" target="_blank" rel="noopener noreferrer">Feature visualization</a> is a tool to understand how neural network works. Our goal is to understand how people percieve these feature visualizations.</p>
              <p>
                We are collecting data from your game play.<br />
                For now, enjoy the game! </p>
            </div>
          </div>
        </div>
        <div className="btnWrapper">

          <Link to="/guessai" key="btn1" onClick={(ev) => { this.props.setMenu(0) }}>
            <div className="gameBtn guessAI">
              <div className="icon">
              <img src={game1} />
              </div>
              <div className="textWrap">
                <div className="title">
                  Guess AI
            </div>
                <div className="expla">
                  Compete with other players on guessing what machine speaks!
            </div>
              </div>
            </div>
          </Link>
          <div className="gameBtn AIQuiz">
            <div className="icon">
              <img src={game2} />
            </div>
            <div className="textWrap">
              <div className="title">
                AI Quiz
                </div>
              <div className="expla">
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
