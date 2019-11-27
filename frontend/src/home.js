import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './homePage.scss';
import game1 from './image/home/game1.png';

const vis = [];
for (let i = 0; i < 10; i++) {
  vis[i] = require('./image/mixed4d/' + (i + 1) + '.png');
}

class Home extends Component {
  renderImgs() {
    const element = [];
    for (let i = 0; i < 10; i++) {
      element.push(<img src={vis[i]} alt="Visualization" />);
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
            <div className="title">
              Guess what the machine sees
            </div>
            <div className="expla">
              <p>
                Research:&nbsp;
                <a href="https://distill.pub/2017/feature-visualization/" target="_blank" rel="noopener noreferrer">
                  Feature visualization
                </a>
                &nbsp;is how neural networks build understanding of images.
                This is how AI interprets objects, patterns, animals, etc.
                Our goal is to understand how humans select and interpret feature visualizations.
              </p>
              <p>
                This study is part of a research project within the Visualization Group at Carnegie Mellon University.
              </p>
              <p>
                Try our game to learn more about feature visualization which help AI categorize images.
              </p>
              <p>
                Consent: Your decision to participate is voluntary and we thank you for advancing research.
                By playing this game, you agree that you are 18 or older and want to participate.
              </p>
              <p>
                Enjoy the game!
              </p>
            </div>
          </div>
        </div>
        <div className="btnWrapper">
          <Link to="/guessai" key="btn1" onClick={() => { this.props.setMenu(0); }}>
            <div className="gameBtn guessAI">
              <div className="icon">
                <img src={game1} alt="Game 1" />
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
        </div>
      </div>
    );
  }
}

export default Home;
