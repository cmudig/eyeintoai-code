import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './Landing.module.scss';
import Modal from '../Modal/Modal';

import firstStep from '../../image/home/step1.png';
import secondStep from '../../image/home/step2.png';
import thirdStep from '../../image/home/step3.png';

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

  renderImgs() {
    const element = [];
    for (let i = 0; i < 10; i++) {
      element.push(
        <img
          key={i}
          src={vis[i]}
          alt={`Visualization ${i + 1}`}
        />
      );
    }
    return element;
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
                {this.renderImgs()}
              </div>
            </div>
            <div className={classnames(styles['home__side'], styles['home--right'])}>
              <div className={styles['home__title']}>
                Guess what the machine sees
              </div>
              <div className={styles['home__details']}>
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
            Designed and developed at Carnegie Mellon University, © 2019
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
                {this.renderImgs()}
              </div>
            </div>
            <div className={classnames(styles['home__side'], styles['home--right'])}>
              <div className={styles['home__title']}>
                Guess what the machine sees
              </div>
              <div className={styles['home__details']}>
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
              <div className={styles['home__links']}>
            
                <div id="g-signin2" onClick={() => { this.props.signOut(); }} />

                <button
                  type="button"
                  className={styles['home__btn']}
                  onClick={this.showHelpModal}
                >
                  How to Play
                </button>
              </div>
            </div>
          </div>
          <p className={styles['home__footer']}>
            Designed and developed at Carnegie Mellon University, © 2019
          </p>
        </div>
      );
    }
  }
}

export default Home;
