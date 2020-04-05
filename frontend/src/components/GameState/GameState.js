import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Loading from '../../guessai/loading.js';
import Category from '../Category/Category';
import ImageSelect from '../ImageSelect/ImageSelect';
import Game from '../Game/Game';
import Round from '../Round/Round';
import ScoreImage from '../../guessai/scoreimages.js';

import styles from './GameState.module.scss';

class GameState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {},
      turns: [],
      mode: 0,
      entireRound: 1,
      blueOpacity: 0,
      score: [[0, 0], [0, 0], [0, 0]],
      players: this.props.players,
      playerHints: [],
      playerHintsURL: [],
      playerAnswer: [],
      playerScore: [],
      hints: [],
      hintsURL: [],
      scoreImages: [],
      answerRecord: [],
      testPhase: false,
    };
    this.guessPerRound = {};
  }

  UNSAFE_componentWillMount() {
    this.randomizeTurn();
  }

  setTestPhase() {
    this.setState({ testPhase: true });
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    this.props.setMenu(0);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.props.handleLeavePage);
  }

  randomizeTurn() {
    this.setState({ turns: [2, 1, 3] });
  }

  setAnswer(n) {
    this.setState({
      answer: n,
      answerRecord: [...this.state.answerRecord, n.classLabels[0]],
      setAnswerRecord: n,
    });
  }

  setHints(n) {
    this.setState({ hints: n });
  }

  setHintsURL(n) {
    this.setState({ hintsURL: n });
  }

  getPlayerHint(hints, hintsURL, answer) {
    this.setState({
      playerHints: hints,
      playerHintsURL: hintsURL,
      playerAnswer: answer,
    });
  }

  setPlayerHint() {
    this.setAnswer(this.state.playerAnswer);
    this.setHints(this.state.playerHints);
    this.setHintsURL(this.state.playerHintsURL);
  }

  addGuess(newGuess) {
    this.guessPerRound[this.state.entireRound] = _.get(
      this.guessPerRound,
      this.state.entireRound,
      { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {} }
    );
    if (this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        const image = this.state.hints[i];
        const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].push(imageIdx);
      }
    }
    this.guessPerRound[this.state.entireRound]['guesses'].push(newGuess);
  }

  addHintSelected(hintGuess) {
    this.guessPerRound[this.state.entireRound] = _.get(
      this.guessPerRound,
      this.state.entireRound,
      { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {} }
    );
    if (this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        const image = this.state.hints[i];
        const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].push(imageIdx);
      }
    }
    this.guessPerRound[this.state.entireRound]['hintRound'] = hintGuess;
  }

  addRound() {
    this.setState({ entireRound: this.state.entireRound + 1 });
    this.moveToNext(4);
  }

  setScore(n) {
    this.setState({ score: n });
  }

  setScoreImages(n) {
    this.setState({ playerScore: [...this.state.playerScore, this.state.score[0][1]] });
    const playerGuesses = [];
    let rounds = -1;
    let points = 0;
    _.keys(this.guessPerRound).forEach((round => {
      rounds++;
      this.guessPerRound[round]['pointsEarned'] = _.get(
        this.guessPerRound[round],
        'pointsEarned',
        _.get(this.state.playerScore, this.state.entireRound - 1, 0) - _.get(this.state.playerScore, this.state.entireRound - 2, 0)
      );
      playerGuesses.push({
        featuresChosenByExplainer: this.guessPerRound[round]['featuresChosenByExplainer'],
        hintRound: this.guessPerRound[round]['hintRound'],
        guesses: this.guessPerRound[round]['guesses'],
        pointsEarned: this.guessPerRound[round]['pointsEarned'],
        answer: this.state.answer.classLabels[0],
      });
      points = this.state.score[0][rounds];
    }));
    this.props.update({ guessRounds: playerGuesses, totalPoints: points });
    this.setState({ scoreImages: [...this.state.scoreImages, n] });
  }

  moveToNext(n) {
    if(n === 3) {
      this.setState({ blueOpacity : 1 });
    } else {
      this.setState({ blueOpacity : 0 });
    }
    this.setState({ mode: n });
  }

  renderMode() {
    if (this.state.mode === 0) {
      return (
        <Loading
          movetoNext={this.moveToNext.bind(this)}
          players={this.state.players}
        />
      );
    } else if (this.state.mode === 1) {
      return (
        <Category
          setTestPhase={this.setTestPhase.bind(this)}
          setAnswer={this.setAnswer.bind(this)}
          movetoNext={this.moveToNext.bind(this)}
          update={this.props.update}
        />
      );
    } else if (this.state.mode === 2) {
      return (
        <ImageSelect
          movetoNext={this.moveToNext.bind(this)}
          getPlayerHint={this.getPlayerHint.bind(this)}
          update={this.props.update}
          answer={this.state.answer}
        />
      );
    } else if (this.state.mode === 3) {
      return (
        <Game
          answer={this.state.answer}
          addHintSelected={this.addHintSelected.bind(this)}
          setScore={this.setScore.bind(this)}
          update={this.props.update}
          turns={this.state.turns}
          entireRound={this.state.entireRound}
          guessPerRound={this.guessPerRound}
          addRound={this.addRound.bind(this)}
          score={this.state.score}
          hints={this.state.hints}
          hintsURL={this.state.hintsURL}
          players={this.state.players}
          setScoreImages={this.setScoreImages.bind(this)}
          movetoNext={this.moveToNext.bind(this)}
          addGuess={this.addGuess.bind(this)}
        />
      );
    } else if (this.state.mode === 4) {
      return (
        <Round
          testPhase={this.testPhase}
          entireRound={this.state.entireRound}
          turns={this.state.turns}
          moveToNext={this.moveToNext.bind(this)}
          update={this.props.update}
          players={this.state.players}
          setAnswer={this.setAnswer.bind(this)}
          setHintsURL={this.setHintsURL.bind(this)}
          setHints={this.setHints.bind(this)}
          setPlayerHint={this.setPlayerHint.bind(this)}
          answerRecord={this.state.answerRecord}
        />
      );
    } else if (this.state.mode === 5) {
      return (
        <ScoreImage scoreImages={this.state.scoreImages} />
      );
    }
  }

  render() {
    return (
      <Fragment>
        <div className={styles['GameState__blue']} style={{ opacity: this.state.blueOpacity }}/>
        {this.renderMode()}
      </Fragment>
    );
  }
}

export default GameState;
