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
    }
  }
  setAnswer(n){
    this.setState({answer: n});
    console.log(this.state.answer)
  }
  
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
        <div className="header" >
          <div className="left">
            <div className="title">Interpretable Machine Learning Research Project</div>
            <div id="cmu"><img src = {cmuLogo} /></div>
          </div>
          {/* <div className="loading">
            <div className = "dots" />
            <div className = "dots" />
            <div className = "dots" />
          </div> */}
          </div>
          {/* <Category setAnswer={this.setAnswer.bind(this)}/> */}
          <Game answer={this.state.answer}/>
      </div>
    );
  }
}

export default App;
