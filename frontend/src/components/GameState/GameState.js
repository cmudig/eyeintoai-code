import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Loading from '../Loading/Loading';
import Category from '../Category/Category';
import ImageSelect from '../ImageSelect/ImageSelect';
import Game from '../Game/Game';
import Round from '../Round/Round';
import ScoreImage from '../ScoreImages/ScoreImages';

import styles from './GameState.module.scss';


// explanationType - 
// 0 : featureViz
// 1 : LIME 
// 2 : Gradcam


class GameState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      explanationType : 0, 
      explanationTypes : [],
      explanationNumber : 0,
      answer: {}, // contains the actual answer image for current round
      turns: [],
      mode: 0, // Current mode (choosing image, guessing, etc)
      entireRound: 1, // Current round of guessing (3 in total)
      blueOpacity: 0,
      score: [[0, 0], [0, 0], [0, 0]],
      players: this.props.players,
      playerHints: [], // contains hints for player chosen image
      playerHintsURL: [], // contains hints URLs for player chosen image
      playerAnswer: [], // contains actual image chosen by player
      playerScore: [],
      hints: [],
      hintsURL: [],
      scoreImages: [],
      answerRecord: [],
      testPhase: false,
      pastGuessingImgs: []
    };
    this.guessPerRound = {};
  }

  update(fieldAndvalue) { 
    if (this.state.explanationType === 0) {
      this.props.update({"featureViz" : fieldAndvalue})
    } else if (this.state.explanationType  === 1) {
      this.props.update({"LIME" : fieldAndvalue})
    } else if (this.state.explanationType  === 2) {
      this.props.update({"Gradcam" : fieldAndvalue})
    }  else if (this.state.explanationType  === 3) {
      this.props.update({"Baseline" : fieldAndvalue})
    } else {
      throw new Error("Invalid explanationType = " + this.state.explanationType );
    }
  }
  
  UNSAFE_componentWillMount() {
    this.randomizeTurn();
    this.randomizeExplanationTypes();
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
    this.setState({ turns: [2, 3] });
  }

  randomizeExplanationTypes() { 
    let arr = [0,1,2,3]
    let shuffled_arr = _.shuffle(arr)
    shuffled_arr.push(0)

    console.log(shuffled_arr)
    this.setState({explanationTypes : shuffled_arr, explanationType : shuffled_arr[0]})
  }

  setAnswer(n, setPastGuessingImgs = false) {
    this.setState({
      answer: n,
      answerRecord: [...this.state.answerRecord, n.classLabels[0]],
      setAnswerRecord: n,
      pastGuessingImgs : [...this.state.pastGuessingImgs, n]
    });
  }

  setPastGuesses(n) {
    console.log("In Set Past Guesses")
    this.setState({
      pastGuessingImgs: [...this.state.pastGuessingImgs, ...n]
    })
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

  logRoundStart() { 
    this.guessPerRound[this.state.entireRound] = _.get(
      this.guessPerRound,
      this.state.entireRound,
      { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {}, 'answer' : this.state.answer.classLabels[0]}
    );
    if (this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        // const image = this.state.hints[i];
        // const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        const feature = this.state.hintsURL[i];
        this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].push(feature);
      }
    }
    this.guessPerRound[this.state.entireRound]['roundStart'] = Date.now();
  }

  addGuess(newGuess) {
    this.guessPerRound[this.state.entireRound] = _.get(
      this.guessPerRound,
      this.state.entireRound,
      { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {}, 'answer' : this.state.answer.classLabels[0]}
    );
    if (this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        // const image = this.state.hints[i];
        // const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        const feature = this.state.hintsURL[i];
        this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].push(feature);
      }
    }
    this.guessPerRound[this.state.entireRound]['guesses'].push(newGuess);
  }

  addHintSelected(hintGuess) {
    this.guessPerRound[this.state.entireRound] = _.get(
      this.guessPerRound,
      this.state.entireRound,
      { 'guesses': [], 'featuresChosenByExplainer': [], 'hintRound': {},  'answer' : this.state.answer.classLabels[0]}
    );
    if (this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].length === 0) {
      for (let i = 0; i < 4; i++) {
        // const image = this.state.hints[i];
        // const imageIdx = image ? image.substring(image.lastIndexOf('/') + 1, image.indexOf('.')) : '-1';
        const feature = this.state.hintsURL[i];
        this.guessPerRound[this.state.entireRound]['featuresChosenByExplainer'].push(feature);
      }
    }
    this.guessPerRound[this.state.entireRound]['hintRound'] = hintGuess;
  }

  addRound() {
    this.setState({ entireRound: this.state.entireRound + 1 });
    this.moveToNext(4);
  }

  setScore(n) {
    // this.setState({ score: n });
    return;
  }

  setScoreImages(n) {
    this.setState({ playerScore: [...this.state.playerScore, this.state.score[0][1]] });
    const playerGuesses = [];
    // let rounds = -1;
    // let points = 0;
    console.log("logging guess per round")
    console.log(this.guessPerRound)

    _.keys(this.guessPerRound).forEach((round => {
      // rounds++;
      // this.guessPerRound[round]['pointsEarned'] = _.get(
      //   this.guessPerRound[round],
      //   'pointsEarned',
      //   _.get(this.state.playerScore, this.state.entireRound - 1, 0) - _.get(this.state.playerScore, this.state.entireRound - 2, 0)
      // );
      playerGuesses.push({
        featuresChosenByExplainer: this.guessPerRound[round]['featuresChosenByExplainer'],
        hintRound: this.guessPerRound[round]['hintRound'],
        guesses: this.guessPerRound[round]['guesses'],
        // pointsEarned: this.guessPerRound[round]['pointsEarned'],
        answer: this.guessPerRound[round]["answer"],
        roundStart: this.guessPerRound[round]["roundStart"]
      });
      // points = this.state.score[0][rounds];
    }));
    console.log("playersGuesses = ") 
    console.log(playerGuesses);
    this.update({ guessRounds: playerGuesses });
    this.setState({ scoreImages: [...this.state.scoreImages, n] });
  }

  moveToNext(n) {
    if(n === 3) {
      this.logRoundStart();
      this.setState({ blueOpacity : 1 });
    } else {
      this.setState({ blueOpacity : 0 });
    }
    this.setState({ mode: n });
  }
  
  // Renders based on current mode
  renderMode() {
      console.log(this.state)
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
            setPastGuesses={this.setPastGuesses.bind(this)}
            movetoNext={this.moveToNext.bind(this)}
            update={this.update.bind(this)}
            explanationType={this.state.explanationType}
          />
        );
      } else if (this.state.mode === 2) {
        return (
          <ImageSelect
            movetoNext={this.moveToNext.bind(this)}
            getPlayerHint={this.getPlayerHint.bind(this)}
            update={this.update.bind(this)}
            answer={this.state.answer}
            explanationType = {this.state.explanationType}
          />
        );
      } else if (this.state.mode === 3) {
        return (
          <Game
            answer={this.state.answer}
            addHintSelected={this.addHintSelected.bind(this)}
            setScore={this.setScore.bind(this)}
            update={this.update.bind(this)}
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
            explanationType = {this.state.explanationType}

          />
        );
      } else if (this.state.mode === 4) {
        return (
          <Round
            testPhase={this.testPhase}
            entireRound={this.state.entireRound}
            turns={this.state.turns}
            moveToNext={this.moveToNext.bind(this)}
            update={this.update.bind(this)}
            players={this.state.players}
            setAnswer={this.setAnswer.bind(this)}
            setHintsURL={this.setHintsURL.bind(this)}
            setHints={this.setHints.bind(this)}
            setPlayerHint={this.setPlayerHint.bind(this)}
            answerRecord={this.state.answerRecord}
            pastGuessingImgs = {this.state.pastGuessingImgs}
            explanationType = {this.state.explanationType}
            explanationNumber = {this.state.explanationNumber}
          />
        );
      } else if (this.state.mode === 5) {
        if (this.state.explanationNumber < 3) {
          let newExplanationNumber = this.state.explanationNumber + 1;
          let newExplanationType = this.state.explanationTypes[newExplanationNumber]
          this.setState({
            explanationType : newExplanationType,
            explanationNumber: newExplanationNumber, 
            answer: {}, // contains the actual answer image for current round
            turns: [],
            mode: 1, // Current mode (choosing image, guessing, etc)
            entireRound: 1, // Current round of guessing (3 in total)
            blueOpacity: 0,
            score: [[0, 0], [0, 0], [0, 0]],
            players: this.props.players,
            playerHints: [], // contains hints for player chosen image
            playerHintsURL: [], // contains hints URLs for player chosen image
            playerAnswer: [], // contains actual image chosen by player
            playerScore: [],
            hints: [],
            hintsURL: [],
            scoreImages: [],
            answerRecord: [],
            testPhase: false,
          })
          this.guessPerRound = {}
          this.randomizeTurn();  
        } else {
          return (
            <ScoreImage scoreImages={this.state.scoreImages} />
          );
        }
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
