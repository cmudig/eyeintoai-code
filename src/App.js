import React, { Component } from 'react';
import './App.css';
import cmuLogo from './image/CMU_Logo.png'
import Match from './matching.js'
import Category from './category.js'
import Game from './game.js'
import Round from './round.js'
import Guess from './guessorRound.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer:"hamster",
      mode: 0,
      round: 1,
      image: "",
    }
  }
  setAnswer(n){
    this.setState({answer: n, mode: 2});
  }
  setImage(n){
    this.setState({image : n})
  }
  addRound(){
    this.setState({round: this.state.round + 1})
    this.movetoNext(4);
  }
  movetoNext(n){
    window.setTimeout(function(){this.setState({mode: 3})}.bind(this), 5000);
    window.setTimeout(function(){this.setState({mode: n})}.bind(this), 11000);
  }
  renderMode(){
    switch(this.state.mode){
      case 0:  window.setTimeout(function(){
        this.setState({mode : 3});
        this.movetoNext(1);
      }.bind(this), 3000);
      return <Match />
      case 1: return  <Category setAnswer={this.setAnswer.bind(this)} setImage = {this.setImage.bind(this)} />
      case 2: return <Game answer={this.state.answer} round = {this.state.round} addRound = {this.addRound.bind(this)} image = {this.state.image}/> 
      case 3: return  <Round round = {this.state.round} />
      case 4: return  <Guess round = {this.state.round} addRound = {this.addRound.bind(this)} />
      default:
    }
    
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%", position:"relative" }} key="main">
        <div className="header" >
          <div className="left">
            <div className="title">Interpretable Machine Learning Research Project</div>
            <div id="cmu"><img src = {cmuLogo} alt="CMU logo" /></div>
          </div>
          </div>
        { this.renderMode()}
      </div>
    );
  }
}

export default App;
