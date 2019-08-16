import React, { Component } from 'react';
import './App.css';
import cmuLogo from './image/CMU_Logo.png'
import Loading from './loading.js'
import Vis from './visualizations.js'
import Category from './category.js'
import Game from './game.js'
import Round from './round.js'
import profile1 from './image/profile/profile1.png'

import ladybug from "./image/samples/ladybug.jpg"
import ladybug_feature1 from './image/vis/ladybug/1.jpg'
import ladybug_feature2 from './image/vis/ladybug/2.jpg'
import ladybug_feature3 from './image/vis/ladybug/3.jpg'
import ladybug_feature4 from './image/vis/ladybug/4.jpg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer:"ladybug",
      mode: 0,
      entireRound: 1,
      image: ladybug,
      hints: [ladybug_feature1, ladybug_feature2, ladybug_feature3, ladybug_feature4],
      bluOpcity: 0,
      score: [[0, 10], [0, 10], [0, 0]]
    }
  }
  setAnswer(n){
    this.setState({answer: n, mode: 2});
  }
  setImage(n){
    this.setState({image : n})
  }
  setHint(n){
    this.setState({hints: n})
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
      case 0: return <Loading movetoNext = {this.movetoNext.bind(this)}/>
      case 1:  return  <Category setAnswer={this.setAnswer.bind(this)} setImage = {this.setImage.bind(this)}  movetoNext = {this.movetoNext.bind(this)} />
      case 2: return <Vis movetoNext = {this.movetoNext.bind(this)} setHint = {this.setHint.bind(this)} answer = {this.state.answer} image = {this.state.image}/>
      case 3: return <Game answer={this.state.answer} setScore = {this.setScore.bind(this)} entireRound = {this.state.entireRound} addRound = {this.addRound.bind(this)} hints = {this.state.hints} image = {this.state.image} score = {this.state.score}/> 
      case 4: return  <Round round = {this.state.entireRound} movetoNext = {this.movetoNext.bind(this)}/>
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
                  <img src= {profile1} className =  "profile" />
                </div>
            </div>
          </div>
        { this.renderMode()}
      </div>
    );
  }
}

export default App;
