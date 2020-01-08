import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './Landing.module.scss';

const vis = [];
for (let i = 0; i < 10; i++) {
  vis[i] = require('../image/mixed4d/' + (i + 1) + '.png');
}

class Home extends Component {
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
                <Link
                  className={styles['home__btn']}
                  to="/"
                  onClick={() => { this.props.setMenu(0); }}
                >
                  How to Play
                </Link>
                <Link
                  className={styles['home__btn']}
                  to="/play"
                  onClick={() => { this.props.setMenu(0); }}
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
                <Link
                  className={styles['home__btn']}
                  to="/"
                  onClick={() => { this.props.setMenu(0); }}
                >
                  How to Play
                </Link>
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
