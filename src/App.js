import React, { Component } from 'react';
import './App.css';
import cmuLogo from './image/CMU_Logo.png'
import Match from './matching.js'
import Category from './category.js'
import Game from './game.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer:"hamster",
      mode: 0,
    }
  }
  setAnswer(n){
    this.setState({answer: n, mode: 2});
  }
  renderMode(){
    switch(this.state.mode){
      case 0:  window.setTimeout(function(){
        this.setState({mode : 1});
      }.bind(this), 3000);
      return <Match />
      case 1: return  <Category setAnswer={this.setAnswer.bind(this)} />
      case 2: return <Game answer={this.state.answer} /> 
      default:
    }
    
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }} key="main">
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
