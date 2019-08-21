import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import { Link } from 'react-router-dom'
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
setMenu(i){
  let menuClass = [" ", " "];
  menuClass[i] = "active";
  this.setState({gameClass: menuClass})

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
            classlist[i] = "active"
        } else{
          classlist[i] = " "
        }
    }
    this.setState({gameClass: classlist});
}

  render() {
    return (<HashRouter basename = '/'>
      <div className="App" style={{ width: "100%", height: "100%", position:"relative"}} key="main">
        <div className="header" >
          <div id="cmu"><img src = {cmuLogo} alt="CMU logo" /></div>
            <Link to="/" className="title" onClick={(ev)=> {this.setState({ gameClass: [" ", " "]}); }}>Interpretable Machine Learning Research Project</Link>
            <div className = "menuBar">

            <Link to="/guessai/" className={"menu " + this.state.gameClass[0]} key="menu0" onClick={(ev)=> {this.setState({ gameClass: ["active", " "]}); }}>Guess AI</Link>

             {/* <Link to={process.env.PUBLIC_URL + "/aiquiz"} className={"menu " + this.state.gameClass[1]} key="menu1" onClick={(ev)=> {this.setState({ gameClass: [" ", "active"]}); this.getCurPage()}}> */}
             <div className = "menu">AI Quiz</div>
             {/* </Link> */}
             
                <div className = "profileWrapper">
                <i className={"profile " + this.state.players[0]}></i>
                </div>
            </div>
          </div>
         
            <Route path ="/" exact render={props => <Home setMenu = {this.setMenu.bind(this)} />} />
            <Route path = "/guessai/" render={props => <GAIHome  />} />
            <Route path = "/guessai-play/" render = {props => <GuessAI key = "guessAI" players = {this.state.players} />} />
         
      </div>
      </HashRouter>
    );
  }
}

export default App;
