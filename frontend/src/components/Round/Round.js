import React, { Component } from 'react';

import styles from './Round.module.scss';
import { StaticData } from '../../data/images';

const features = [];
for (let i = 0; i < 528; i++) {
  features[i] = require('../../image/mixed4d/' + i + '.png');
}

class Round extends Component {
  state = { mode: 0 };

  componentDidMount() {
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    window.setTimeout(function() { this.props.moveToNext(3); }.bind(this), 100000);
    const player = this.props.turns[this.props.entireRound - 1];
    if (player !== 1) {
      const randomNum = (Math.floor(Math.random() * 2));
      const randomVisualOrder = [0, 1, 2, 3, 4, 5, 6, 7];
      let firstNum = 0;
      let secondNum = 0;
      let tempNum = 0;
      let answers = [];
      for (let i = 0; i < 10; i++) {
        firstNum = Math.floor(Math.random() * 8);
        secondNum = Math.floor(Math.random() * 8);
        tempNum = randomVisualOrder[firstNum];
        randomVisualOrder[firstNum] = randomVisualOrder[secondNum];
        randomVisualOrder[secondNum] = tempNum;
      }
      (randomNum % 2 === 0) ? answers = StaticData.landAnimal : answers = StaticData.electronics;
      if (this.props.entireRound == 1 && this.props.testPhase) {
        secondNum = 2;
        answers = StaticData.landAnimal;
      }

      while(this.props.answerRecord.includes(answers[secondNum].classLabels[0])) {
        secondNum = (secondNum + 1) % 8;
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
        <div className={styles['Round__text']}>{elements} selects an image</div>
      </section>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default Round;
