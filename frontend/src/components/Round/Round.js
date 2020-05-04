import React, { Component, Fragment } from 'react';

import styles from './Round.module.scss';
import { StaticData } from '../../data/images';
import FirstImage from '../../images/round/step1.png';
import SecondImage from '../../images/round/step2.png';
import ThirdImage from '../../images/round/step3.png';

const features = [];
for (let i = 0; i < 528; i++) {
  features[i] = require('../../images/mixed4d/' + i + '.png');
}

class Round extends Component {
  state = { mode: 0 };

  componentDidMount() {
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    window.setTimeout(function() {
      if (this.props.entireRound !== 1) {
        this.props.moveToNext(3);
      }
    }.bind(this), 2000);
    const player = this.props.turns[this.props.entireRound - 1];
    if (player !== 1) {
      const randomNum = (Math.floor(Math.random() * 2));
      const randomVisualOrder = [0, 1, 2, 3, 4];
      let firstNum = 0;
      let secondNum = 0;
      let tempNum = 0;
      let answers = [];
      for (let i = 0; i < 10; i++) {
        firstNum = Math.floor(Math.random() * 5);
        secondNum = Math.floor(Math.random() * 5);
        tempNum = randomVisualOrder[firstNum];
        randomVisualOrder[firstNum] = randomVisualOrder[secondNum];
        randomVisualOrder[secondNum] = tempNum;
      }
      if (randomNum % 2 === 0) {
        answers = StaticData.vegetable;
      } else {
        answers = StaticData.electronics;
      }

      if (this.props.entireRound === 1 && this.props.testPhase) {
        secondNum = 2;
        answers = StaticData.vegetable;
      }

      while(this.props.answerRecord.includes(answers[secondNum].classLabels[0])) {
        secondNum = (secondNum + 1) % 5;
      }

      const visuals = answers[secondNum].correctURLs.concat(answers[secondNum].wrongVizURLs);
      this.props.setAnswer(answers[secondNum]);
      this.props.setHints([
        features[visuals[randomVisualOrder[0]]],
        features[visuals[randomVisualOrder[1]]],
        features[visuals[randomVisualOrder[2]]],
        features[visuals[randomVisualOrder[3]]],
      ]);
      this.props.setHintsURL([
        visuals[randomVisualOrder[0]],
        visuals[randomVisualOrder[1]],
        visuals[randomVisualOrder[2]],
        visuals[randomVisualOrder[3]],
      ]);
    } else {
      this.props.setPlayerHint();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.props.handleLeavePage);
  }

  renderContent() {
    const elements = [];
    const player = this.props.turns[this.props.entireRound - 1];
    elements.push(
      <div className={styles['Profile']}>
        <div className={styles['Profile__icon']}>{this.props.players[player - 1].img}</div>
        <div className={styles['Profile__name']}>{this.props.players[player - 1].name}</div>
      </div>
    );
    return (
      <section className={styles['Round']}>
        <h1 className={styles['Round__title']}>Round {this.props.entireRound}</h1>
        {this.props.entireRound === 1 ? (
          <Fragment>
            <div className={styles['Round__text']}>It’s your turn to guess. Remember...</div>
            <section className={styles['Round__info']}>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={FirstImage} alt="Instruction #1" />
                <p className={styles['Round__message']} >Type your guesses in the chat</p>
              </div>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={SecondImage} alt="Instruction #2" />
                <p className={styles['Round__message']} >Visualizations show patterns, textures, and shapes</p>
              </div>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={ThirdImage} alt="Instruction #3" />
                <p className={styles['Round__message']} >Think broadly, you could get images that are less familiar</p>
              </div>
            </section>
            <button className={styles['Round__button']} onClick={() => this.props.moveToNext(3)}>
              I'm Ready!
            </button>
          </Fragment>
        ) : (
          <div className={styles['Round__text']}>Sit back and watch others guess your image</div>
        )}
      </section>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default Round;
