import React, { Component } from 'react';
import './App.css';

import cmuLogo from './image/CMU_Logo.png'
import Loading from './loading.js'
import Vis from './visualizations.js'
import Category from './category.js'
import Game from './game.js'
import Round from './round.js'

const profiles = ["fas fa-otter", "fas fa-hippo", "fas fa-dog", "fas fa-kiwi-bird", "fas fa-horse", "fas fa-frog", "fas fa-fish", "fas fa-dragon", "fas fa-dove", "fas fa-crow", "fas fa-cat"]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer:{},
      mode: 4,
      entireRound: 2,
      hintVis: [],
      bluOpcity: 0,
      score: [[0, 0], [0, 0], [0, 0]],
      players: [],
      hintVisUrl: [],
    }
    
  }
  componentWillMount(){
    let ranNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let ran1, ran2, ranTemp;
    for (let i = 0; i < 10; i++) {
      ran1 = Math.floor(Math.random() * 11);
      ran2 = Math.floor(Math.random() * 11);
 
      ranTemp = ranNum[ran1];
      ranNum[ran1] = ranNum[ran2]
      ranNum[ran2] = ranTemp;
    }
   this.setState({players: [profiles[ranNum[0]], profiles[ranNum[1]], profiles[ranNum[2]]]})
  }

  setAnswer(n){
    this.setState({answer: n});
    if(this.state.entireRound === 1) {
      this.movetoNext(2)
    }
  }
  setHint(n){
    this.setState({hintVis: n})
  }
  setHintVisUrl(n){
    this.setState({hintVisUrl: n})
  }
  addRound(){
    this.setState({entireRound: this.state.entireRound + 1})
    this.movetoNext(4);
  }
  setScore(n){
    this.setState({score: n})
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
      case 2: return <Vis movetoNext = {this.movetoNext.bind(this)} setHint = {this.setHint.bind(this)} answer = {this.state.answer} setHintVisUrl = {this.setHintVisUrl.bind(this)}/>
      case 3: return <Game answer={this.state.answer} setScore = {this.setScore.bind(this)} entireRound = {this.state.entireRound} addRound = {this.addRound.bind(this)} score = {this.state.score} hintVis = {this.state.hintVis} hintVisUrl = {this.state.hintVisUrl} players = {this.state.players}/> 
      case 4: return  <Round round = {this.state.entireRound} movetoNext = {this.movetoNext.bind(this)} players = {this.state.players} setAnswer={this.setAnswer.bind(this)} setHintVisUrl = {this.setHintVisUrl.bind(this)} setHint = {this.setHint.bind(this)}/>
      default:
    }
    
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%", position:"relative"}} key="main">
        <div id = "blue" style = {{opacity: this.state.bluOpcity}}/>
        <div className="header" >
          <div id="cmu"><img src = {cmuLogo} alt="CMU logo" /></div>
            <div className="title">Interpretable Machine Learning Research Project</div>
            <div className = "menuBar">
                <div className = "menu active">Game 1</div>
                <div className = "menu">Game 2</div>
                <div className = "profileWrapper">
                <i className={"profile " + this.state.players[0]}></i>
                </div>
            </div>
          </div>
        { this.renderMode()}
      </div>
    );
  }
}

export default App;
