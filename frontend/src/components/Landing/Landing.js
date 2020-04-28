import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './Landing.module.scss';
import Modal from '../Modal/Modal';

import firstStep from '../../image/home/step1.png';
import secondStep from '../../image/home/step2.png';
import thirdStep from '../../image/home/step3.png';

import animatedGif from '../../image/home/eye-into-ai.gif';

const vis = [];
for (let i = 0; i < 10; i++) {
  vis[i] = require('../../image/mixed4d/' + (i + 1) + '.png');
}

class Home extends Component {
  state = { showHelpModal: false };

  showHelpModal = () => {
    this.setState({ showHelpModal: true });
  };

  hideHelpModal = () => {
    this.setState({ showHelpModal: false });
  };

  renderImg() {
    return (
      <img
        src={animatedGif}
        alt={'Eye into AI animation'}
      />
    );
  }

  render() {
    if (this.props.isSignedIn) {
      return (
        <div className={styles['home']}>
          <Modal show={this.state.showHelpModal} handleClose={this.hideHelpModal}>
            <div className={styles['home__modal']}>
              <section className={styles['home__modal--section']}>
                <img
                  className={styles['home__modal--image']}
                  src={firstStep}
                  alt="First Step"
                />
                <h1 className={styles['home__modal--header']}>
                  Step 1. As the Explainer: Select an image
                </h1>
                <p className={styles['home__modal--desc']}>
                  Select an image for other players to guess.
                </p>
              </section>
              <section className={styles['home__modal--section']}>
                <img
                  className={styles['home__modal--image']}
                  src={secondStep}
                  alt="Second Step"
                />
                <h1 className={styles['home__modal--header']}>
                  Step 2. As the Explainer: Select 4 feature visualizations
                </h1>
                <p className={styles['home__modal--desc']}>
                  Choose features that will be given as hints to other players. Pick the best ones 1st!
                </p>
              </section>
              <section className={styles['home__modal--section']}>
                <img
                  className={styles['home__modal--image']}
                  src={thirdStep}
                  alt="Third Step"
                />
                <h1 className={styles['home__modal--header']}>
                  Step 3. As a Guesser: Now it’s your turn to play.
                </h1>
                <p className={styles['home__modal--desc']}>
                  Guess original images from visualizations that other players choose and gain points.
                </p>
              </section>
            </div>
          </Modal>
          <div className={styles['home__wrapper']}>
            <div className={styles['home__side']}>
              <div className={styles['home--left']}>
                {this.renderImg()}
              </div>
            </div>
            <div className={classnames(styles['home__side'], styles['home--right'])}>
              <div className={styles['home__title']}>
              We need your Eye into AI!
              </div>
              <div className={styles['home__details']}>
                <p>
                  The goal of <i>Explainable AI</i> is to bring transparency to humans about how
                  AI systems make decisions. For example, why does the image recognition AI on the left
                  think that image is dog? How can we trust if the AI classifies dogs correctly is so the
                  AI can detect dogs reliably in the future? There have been many exciting proposals for how
                  to explain AI to provide such reliability, including&nbsp;
                  <a
                    href="https://distill.pub/2017/feature-visualization/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >feature visualizations</a>
                  &nbsp;and&nbsp;
                  <a
                    href="https://arxiv.org/pdf/1312.6034v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >saliency maps</a>.
                  But are these explanations helpful and interpretable to humans? We believe its critical to find out!
                </p>
                <p>
                  By playing our game, you will provide critical feedback for how explanations of AI may
                  benefit human understanding of their complex algorithms.
                </p>
                <p>
                  This study is part of a research project within the&nbsp;
                  <a
                    href="https://dig.cmu.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Data Interaction Group</a>
                  &nbsp;at&nbsp;
                  <a
                    href="https://dig.cmu.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Carnegie Mellon University</a>.
                </p>
                <p>
                  Consent: Your decision to participate is voluntary and we thank you for advancing research.
                  By playing this game, you agree that you are 18 or older and want to participate.
                </p>
                <p>
                  Enjoy the game!
                </p>
              </div>
              <div className={styles['home__links']}>
                <button
                  className={styles['home__btn']}
                  onClick={this.showHelpModal}
                >
                  How to Play
                </button>
                <Link
                  className={styles['home__btn']}
                  to="/play"
                  onClick={() => {
                    this.props.startNewLog();
                    this.props.setMenu(0);
                  }}
                >
                  Play
                </Link>
              </div>
            </div>
          </div>
          <p className={styles['home__footer']}>
            Designed and developed in the <a href="https://dig.cmu.edu" target="_blank" rel="noopener noreferrer">Data Interaction Group</a> at Carnegie Mellon University, © 2020
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles['home']}>
          <Modal show={this.state.showHelpModal} handleClose={this.hideHelpModal}>
            <div className={styles['home__modal']}>
              <section className={styles['home__modal--section']}>
                <img
                  className={styles['home__modal--image']}
                  src={firstStep}
                  alt="First Step"
                />
                <h1 className={styles['home__modal--header']}>
                  Step 1. As the Explainer: Select an image
                </h1>
                <p className={styles['home__modal--desc']}>
                  Select an image for other players to guess.
                </p>
              </section>
              <section className={styles['home__modal--section']}>
                <img
                  className={styles['home__modal--image']}
                  src={secondStep}
                  alt="Second Step"
                />
                <h1 className={styles['home__modal--header']}>
                  Step 2. As the Explainer: Select 4 feature visualizations
                </h1>
                <p className={styles['home__modal--desc']}>
                  Choose features that will be given as hints to other players. Pick the best ones 1st!
                </p>
              </section>
              <section className={styles['home__modal--section']}>
                <img
                  className={styles['home__modal--image']}
                  src={thirdStep}
                  alt="Third Step"
                />
                <h1 className={styles['home__modal--header']}>
                  Step 3. As a Guesser: Now it’s your turn to play.
                </h1>
                <p className={styles['home__modal--desc']}>
                  Guess original images from visualizations that other players choose and gain points.
                </p>
              </section>
            </div>
          </Modal>
          <div className={styles['home__wrapper']}>
            <div className={styles['home__side']}>
              <div className={styles['home--left']}>
                {this.renderImg()}
              </div>
            </div>
            <div className={classnames(styles['home__side'], styles['home--right'])}>
              <div className={styles['home__title']}>
              We need your Eye into AI!
              </div>
              <div className={styles['home__details']}>
                <p>
                  The goal of <i>Explainable AI</i> is to bring transparency to humans about how
                  AI systems make decisions. For example, why does the image recognition AI on the
                  left think that image is dog? How can we trust if the AI classifies dogs correctly
                  is so the AI can detect dogs reliably in the future? There have been many exciting
                  proposals for how to explain AI to provide such reliability, including&nbsp;
                  <a
                    href="https://distill.pub/2017/feature-visualization/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >feature visualizations</a>
                  &nbsp;and&nbsp;
                  <a
                    href="https://arxiv.org/pdf/1312.6034v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >saliency maps</a>.
                  But are these explanations helpful and interpretable to humans? We believe its critical
                  to find out!
                </p>
                <p>
                  By playing our game, you will provide critical feedback for how explanations of AI may
                  benefit human understanding of their complex algorithms.
                </p>
                <p>
                  This study is part of a research project within the&nbsp;
                  <a
                    href="https://dig.cmu.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Data Interaction Group</a>
                  &nbsp;at&nbsp;
                  <a
                    href="https://dig.cmu.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Carnegie Mellon University</a>.
                </p>
                <p>
                  Consent: Your decision to participate is voluntary and we thank you for advancing research.
                  By playing this game, you agree that you are 18 or older and want to participate.
                </p>
                <p>
                  Enjoy the game!
                </p>
              </div>
              <div className={styles['home__links']}>
                <button
                  type="button"
                  className={styles['home__btn']}
                  onClick={this.showHelpModal}
                >
                  How to Play
                </button>
                <div id="g-signin2" onClick={() => { this.props.signOut(); }} />
              </div>
            </div>
          </div>
          <p className={styles['home__footer']}>
            Designed and developed in the <a href="https://dig.cmu.edu" target="_blank" rel="noopener noreferrer">Data Interaction Group</a> at Carnegie Mellon University, © 2020
          </p>
        </div>
      );
    }
  }
}

export default Home;
