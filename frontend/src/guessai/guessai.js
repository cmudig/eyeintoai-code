import React, { Component } from 'react';

import Loading from './loading.js'
import Vis from './visualizations.js'
import Category from './category.js'
import Game from './game.js'
import Round from './round.js'
import ScoreImage from './scoreimages.js'
import _ from 'lodash'

const profiles = ["fas fa-otter", "fas fa-hippo", "fas fa-dog", "fas fa-crow", "fas fa-horse", "fas fa-frog", "fas fa-fish", "fas fa-dragon", "fas fa-dove", "fas fa-spider", "fas fa-cat"]

class GuessAI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer:{},
      turns: 0,
      //randomized turns. When is the non-guessing turn
      mode: 0,
      //0:loading, 1:category, 2:selectViz, 3:game, 4:round, 5:scoreImage
      entireRound: 1,
      //guessing turn round
      hintVis: [],
      bluOpcity: 0,
      //when the guess starts, change the bg to blue
      score: [[0, 0], [0, 0], [0, 0]],
      //score sets. 1st one for each array is the current score, and the 2nd one is the new score. Requires both for the animation on the score view
      players: this.props.players,
      playerHints: [],
      playerHintsUrl: [],
      playerAnswer: [],
      //player profile selected from the app.js
      hintVisUrl: [],
      scoreImages : [],
      //score modal screenshots
      answerRecord: [],
    }
    this.testPhase = false;
    this.guessPerRound = {};
    this.prevRoundScore = 0;
  }
  componentWillMount(){
   this.randomizeTurn()
  }

  setTestPhase() {
    this.testPhase = true;
  }
  componentDidMount(){
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    //change the url when the view is mounted
    this.props.setMenu(0)
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.props.handleLeavePage);
  }
  
  randomizeTurn(){
    let ranNum = [2, 1, 3];
    this.setState({turns: ranNum})
  }
  setAnswer(n){
    let answerRecord = this.state.answerRecord;
    answerRecord.push(n.classLabels[0]);
    this.setState({answer: n, answerRecord: answerRecord});

    this.setState({setAnswerRecord: n});
  }
  setHint(n){
    this.setState({hintVis: n})
  }
  setHintVisUrl(n){
    this.setState({hintVisUrl: n})
  }
  getPlayerHint(hints, hintsUrl, answer) {
    this.setState({playerHints: hints, playerHintsUrl: hintsUrl, playerAnswer: answer});
  }

  setPlayerHint() {
    this.setAnswer(this.state.playerAnswer); 
    this.setHint(this.state.playerHints);
    this.setHintVisUrl(this.state.playerHintsUrl);
  }

  addGuess(newGuess) {
    this.guessPerRound[this.state.entireRound] = _.get(this.guessPerRound, this.state.entireRound, {"guesses": [], "featuresChosenByExplainer":[], "hintRound":{}});
    if (this.guessPerRound[this.state.entireRound]["featuresChosenByExplainer"].length === 0) {
        for (let i = 0; i < 4; i++) {
            this.guessPerRound[this.state.entireRound]["featuresChosenByExplainer"].push(this.state.hintVis[i]);
        }
    }
    this.guessPerRound[this.state.entireRound]["guesses"].push(newGuess);
  }

  addHintSelected(hintGuess) {
    this.guessPerRound[this.state.entireRound] = _.get(this.guessPerRound, this.state.entireRound, {"guesses": [], "featuresChosenByExplainer":[], "hintRound":{}});
    if (this.guessPerRound[this.state.entireRound]["featuresChosenByExplainer"].length === 0) {
      for (let i = 0; i < 4; i++) {
          this.guessPerRound[this.state.entireRound]["featuresChosenByExplainer"].push(this.state.hintVis[i]);
      }
    }
    this.guessPerRound[this.state.entireRound]["hintRound"] = hintGuess;
  }

  addRound(){
    this.setState({entireRound: this.state.entireRound + 1});
    this.movetoNext(4);
  }
  setScore(n){
    this.setState({score: n})
  }

  setScoreImages(n){
    //add the round and move to the Round view
    let playerGuesses = [];
    let roundCnt = -1;
    let pointsGot = 0;

    
    this.prevRoundScore = this.state.score[0][1];
    _.keys(this.guessPerRound).forEach((function (round) {
      roundCnt = roundCnt + 1;
      this.guessPerRound[round]["pointsEarned"] = _.get(this.guessPerRound[round], "pointsEarned",  this.state.score[0][1] - this.prevRoundScore);
      playerGuesses.push({ featuresChosenByExplainer: this.guessPerRound[round]["featuresChosenByExplainer"], hintRound: this.guessPerRound[round]["hintRound"], guesses: this.guessPerRound[round]["guesses"], pointsEarned: this.guessPerRound[round]["pointsEarned"]});  
      pointsGot = this.state.score[0][roundCnt];
    }).bind(this));  
    this.props.update({guessRounds: playerGuesses, totalPoints: pointsGot});
    let images = this.state.scoreImages;
    images.push(n);
    this.setState({scoreImages: images})
  }
  movetoNext(n){
    window.setTimeout(function(){
      if(n === 3){
        this.setState({bluOpcity : 1});
      } else{
        this.setState({bluOpcity : 0});
      }
      this.setState({mode: n})}.bind(this), 100);
  }
  renderMode(){
    switch(this.state.mode){
      case 0: 
      return <Loading movetoNext = {this.movetoNext.bind(this)} players = {this.state.players}/>
      case 1:  return  <Category setTestPhase={this.setTestPhase.bind(this)} setAnswer={this.setAnswer.bind(this)} movetoNext = {this.movetoNext.bind(this)} update={this.props.update} />
      case 2: return <Vis movetoNext = {this.movetoNext.bind(this)} getPlayerHint={this.getPlayerHint.bind(this)} update={this.props.update} answer={this.state.answer}/>
      case 3: return <Game answer={this.state.answer} addHintSelected={this.addHintSelected.bind(this)}  setScore = {this.setScore.bind(this)} update={this.props.update} turns = {this.state.turns} entireRound = {this.state.entireRound} guessPerRound = {this.guessPerRound} addRound = {this.addRound.bind(this)} score = {this.state.score} hintVis = {this.state.hintVis} hintVisUrl = {this.state.hintVisUrl} players = {this.state.players} setScoreImages = {this.setScoreImages.bind(this)} movetoNext = {this.movetoNext.bind(this)} addGuess = {this.addGuess.bind(this)}/> 
      case 4: return <Round testPhase = {this.testPhase} entireRound = {this.state.entireRound} turns = {this.state.turns} movetoNext = {this.movetoNext.bind(this)} update={this.props.update} players = {this.state.players} setAnswer={this.setAnswer.bind(this)} setHintVisUrl = {this.setHintVisUrl.bind(this)} setHint = {this.setHint.bind(this)} setPlayerHint = {this.setPlayerHint.bind(this)} answerRecord = {this.state.answerRecord}/>
      case 5: return <ScoreImage scoreImages = {this.state.scoreImages}/>
      default:
    }
    
  }
  render() {
    return (
      <div className="App" style={{ width: "100%", height: "100%", position:"relative"}} key="main">
        <div id = "blue" style = {{opacity: this.state.bluOpcity}}/>
        { this.renderMode()}
      </div>
    );
  }
}

export default GuessAI;