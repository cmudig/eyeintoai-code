import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';

import cmuLogo from './image/CMU_Logo.png'
import GuessAI from './guessai.js'

const profiles = ["fas fa-otter", "fas fa-hippo", "fas fa-dog", "fas fa-kiwi-bird", "fas fa-horse", "fas fa-frog", "fas fa-fish", "fas fa-dragon", "fas fa-dove", "fas fa-crow", "fas fa-cat"]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
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
   this.setState({players: [profiles[ranNum[0]]]})
  }
  render() {
    return (
      <Router>
      <div className="App" style={{ width: "100%", height: "100%", position:"relative"}} key="main">
        <div className="header" >
          <div id="cmu"><img src = {cmuLogo} alt="CMU logo" /></div>
            <div className="title">Interpretable Machine Learning Research Project</div>
            <div className = "menuBar">
                <div className = "menu active">Guess AI</div>
                <div className = "menu">Game 2</div>
                <div className = "profileWrapper">
                <i className={"profile " + this.state.players[0]}></i>
                </div>
            </div>
          </div>
          <Switch>
            <Route path = {process.env.PUBLIC_URL} exact render={props => <GuessAI key = "guessAI" players = {this.state.players} />} />
            <Route path = {process.env.PUBLIC_URL + "/guessai/"} render = {props => <GuessAI key = "guessAI" players = {this.state.players} />} />
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
