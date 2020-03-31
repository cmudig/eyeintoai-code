import React, { Component } from 'react';
import _ from 'lodash';

import Category from '../Category/Category';
import Loading from '../../guessai/loading.js';
import Vis from '../../guessai/visualizations.js';
import Game from '../../guessai/game.js';
import Round from '../../guessai/round.js';
import ScoreImage from '../../guessai/scoreimages.js';

class GameState extends Component {
  state = {
    answer: {},
    turns: 0,
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
    guessPerRound: {},
    prevRoundScore: 0,
  };

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
    const randomNum = Math.random() * (4 - 1) + 1;
    this.setState({ turns: randomNum });
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
    this.setState({
      guessPerRound: {
        ...this.state.guessPerRound,
        [this.state.entireRound]: _.get(
          this.state.guessPerRound,
          this.state.entireRound,
          { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {} }
        ),
      },
    });
    if (this.state.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        const image = this.state.hints[i];
        const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        this.setState({
          guessPerRound: {
            ...this.state.guessPerRound,
            [this.state.entireRound]: { 'featuresChosenByExplainer': imageIdx },
          },
        });
      }
    }
    this.setState({
      guessPerRound: {
        ...this.state.guessPerRound,
        [this.state.entireRound]: { 'guesses': newGuess },
      },
    });
  }

  addHintSelected(hintGuess) {
    this.setState({
      guessPerRound: {
        ...this.state.guessPerRound,
        [this.state.entireRound]: _.get(
          this.state.guessPerRound,
          this.state.entireRound,
          { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {} }
        ),
      },
    });
    if (this.state.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        const image = this.state.hints[i];
        const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        this.setState({
          guessPerRound: {
            ...this.state.guessPerRound,
            [this.state.entireRound]: { 'featuresChosenByExplainer': imageIdx },
          },
        });
      }
    }
    this.setState({
      guessPerRound: {
        ...this.state.guessPerRound,
        [this.state.entireRound]: { 'hintRound': hintGuess },
      },
    });
  }

  addRound() {
    this.setState({ entireRound: this.state.entireRound + 1 });
    this.movetoNext(4);
  }

  setScore(n) {
    this.setState({ score: n });
  }

  setScoreImages(n) {
    this.setState({ playerScore: [...this.state.playerScore, this.state.score[0][1]] });
    const playerGuesses = [];
    let rounds = -1;
    let points = 0;
    _.keys(this.state.guessPerRound).forEach((round => {
      rounds++;
      this.setState({
        guessPerRound: {
          ...this.state.guessPerRound,
          round: { 'pointsEarned': _.get(this.state.guessPerRound[round], 'pointsEarned', _.get(this.state.playerScore, this.state.entireRound - 1, 0) - _.get(this.state.playerScore, this.state.entireRound - 2, 0)) },
        },
      });
      playerGuesses.push({
        featuresChosenByExplainer: this.state.guessPerRound[round]['featuresChosenByExplainer'],
        hintRound: this.state.guessPerRound[round]['hintRound'],
        guesses: this.state.guessPerRound[round]['guesses'],
        pointsEarned: this.state.guessPerRound[round]['pointsEarned'],
        answer: this.state.answer.classLabels[0],
      });
      points = this.state.score[0][rounds];
    }));
    this.props.update({ guessRounds: playerGuesses, totalPoints: points });
    this.setState({ scoreImages: [...this.state.scoreImages, n] });
  }

  movetoNext(n) {
    window.setTimeout(() => {
      if(n === 3) {
        this.setState({ blueOpacity : 1 });
      } else{
        this.setState({ blueOpacity : 0 });
      }
      this.setState({ mode: n });
    }, 100);
  }

  renderMode() {
    if (this.state.mode == 0) {
      return (
        <Loading
          movetoNext={this.movetoNext.bind(this)}
          players={this.state.players}
        />
      );
    } else if (this.state.mode == 1) {
      return (
        <Category
          setTestPhase={this.setTestPhase.bind(this)}
          setAnswer={this.setAnswer.bind(this)}
          movetoNext={this.movetoNext.bind(this)}
          update={this.props.update}
        />
      );
    } else if (this.state.mode == 2) {
      return (
        <Vis
          movetoNext={this.movetoNext.bind(this)}
          getPlayerHint={this.getPlayerHint.bind(this)}
          update={this.props.update}
          answer={this.state.answer}
        />
      );
    } else if (this.state.mode == 3) {
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
          hintVis={this.state.hintVis}
          hintVisUrl={this.state.hintsURL}
          players={this.state.players}
          setScoreImages={this.setScoreImages.bind(this)}
          movetoNext={this.movetoNext.bind(this)}
          addGuess={this.addGuess.bind(this)}
        />
      );
    } else if (this.state.mode == 4) {
      return (
        <Round
          testPhase={this.testPhase}
          entireRound={this.state.entireRound}
          turns={this.state.turns}
          movetoNext={this.movetoNext.bind(this)}
          update={this.props.update}
          players={this.state.players}
          setAnswer={this.setAnswer.bind(this)}
          setHintVisUrl={this.setHintsURL.bind(this)}
          setHint={this.setHint.bind(this)}
          setPlayerHint={this.setPlayerHint.bind(this)}
          answerRecord={this.state.answerRecord}
        />
      );
    } else if (this.state.mode == 5) {
      return (
        <ScoreImage scoreImages={this.state.scoreImages} />
      );
    }
  }

  render() {
    return (
      <div key="main">
        <div id="blue" style={{ opacity: this.state.blueOpacity }}/>
        {this.renderMode()}
      </div>
    );
  }
}

export default GameState;
