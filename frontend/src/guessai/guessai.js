import React, { Component } from 'react';

import Loading from './loading.js'
import Vis from './visualizations.js'
import Category from './category.js'
import Game from './game.js'
import Round from './round.js'
import ScoreImage from './scoreimages.js'

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
      //player profile selected from the app.js
      hintVisUrl: [],
      scoreImages : [],
      //score modal screenshots
      answerRecord: [],
    }
    
  }
  componentWillMount(){
   this.randomizeTurn()

  }
  componentDidMount(){
    //change the url when the view is mounted
    this.props.setMenu(0)
  }
  
  randomizeTurn(){
    //randomize the guessing turns
    let ranNum = [1, 2, 3];
    // let ran1, ran2, ranTemp;
    // for (let i = 0; i < 5; i++) {
    //   ran1 = Math.floor(Math.random() * 3);
    //   ran2 = Math.floor(Math.random() * 3);
 
    //   ranTemp = ranNum[ran1];
    //   ranNum[ran1] = ranNum[ran2]
    //   ranNum[ran2] = ranTemp; 
    // }

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
  addRound(){
    //add the round and move to the Round view
    this.setState({entireRound: this.state.entireRound + 1})
    this.movetoNext(4);
  }
  setScore(n){
    this.setState({score: n})
  }

  setScoreImages(n){
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
      case 1:  return  <Category setAnswer={this.setAnswer.bind(this)} movetoNext = {this.movetoNext.bind(this)} />
      case 2: return <Vis movetoNext = {this.movetoNext.bind(this)} setHint = {this.setHint.bind(this)} answer = {this.state.answer} setHintVisUrl = {this.setHintVisUrl.bind(this)} />
      case 3: return <Game answer={this.state.answer} setScore = {this.setScore.bind(this)} turns = {this.state.turns} entireRound = {this.state.entireRound} addRound = {this.addRound.bind(this)} score = {this.state.score} hintVis = {this.state.hintVis} hintVisUrl = {this.state.hintVisUrl} players = {this.state.players} setScoreImages = {this.setScoreImages.bind(this)} movetoNext = {this.movetoNext.bind(this)}/> 
      case 4: return  <Round entireRound = {this.state.entireRound} turns = {this.state.turns} movetoNext = {this.movetoNext.bind(this)} players = {this.state.players} setAnswer={this.setAnswer.bind(this)} setHintVisUrl = {this.setHintVisUrl.bind(this)} setHint = {this.setHint.bind(this)} answerRecord = {this.state.answerRecord}/>
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