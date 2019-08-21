import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'
import './index.scss';

import cmuLogo from './image/CMU_Logo.png'
import GuessAI from './guessai.js'
import Home from './home.js'
import GAIHome from './guessAIHome.js'

const profiles = ["fas fa-otter", "fas fa-hippo", "fas fa-dog", "fas fa-crow", "fas fa-horse", "fas fa-frog", "fas fa-fish", "fas fa-dragon", "fas fa-dove", "fas fa-spider", "fas fa-cat"]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      pagenumber: 3,
      gameClass: [" ", " "],
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
componentDidMount(){
  this.getCurPage();
}
  getCurPage(){
    let curpagePath=window.location.pathname;
    curpagePath=curpagePath.toLowerCase();
    
    let urlList=['/guessai', '/aiquiz']
    let classlist = this.state.gameClass;
    let urlRegex;
    for(let i=0; i<urlList.length; i++){
        urlRegex = new RegExp(urlList[i]);
        if(urlRegex.exec(curpagePath)){
            this.setState({pagenumber:i});
            classlist[i] = "active"
        } else{
          classlist[i] = " "
        }
    }
    this.setState({gameClass: classlist});
}

  render() {
    return (<Router>
      <div className="App" style={{ width: "100%", height: "100%", position:"relative"}} key="main">
        <div className="header" >
          <div id="cmu"><img src = {cmuLogo} alt="CMU logo" /></div>
            <div className="title">Interpretable Machine Learning Research Project</div>
            <div className = "menuBar">

            <Link to={process.env.PUBLIC_URL + "/guessai"} className={"menu " + this.state.gameClass[0]} key="menu0" onClick={(ev)=> {this.setState({pagenumber: 1}); this.getCurPage()}}>Guess AI</Link>

             <Link to={process.env.PUBLIC_URL + "/aiquiz"} className={"menu " + this.state.gameClass[1]} key="menu1" onClick={(ev)=> {this.setState({pagenumber: 2}); this.getCurPage()}}>AI Quiz</Link>
             
                <div className = "profileWrapper">
                <i className={"profile " + this.state.players[0]}></i>
                </div>
            </div>
          </div>
          <Switch>
            <Route path = {process.env.PUBLIC_URL} exact render={props => <Home />} />
            <Route path = {process.env.PUBLIC_URL  + "/guessai/"} render={props => <GAIHome />} />
            <Route path = {process.env.PUBLIC_URL + "/guessai/play"}render = {props => <GuessAI key = "guessAI" players = {this.state.players} />} />
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
