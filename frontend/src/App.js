import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import './guessai/index.scss';
import cmuLogo from './image/CMU_Logo.png'
import GuessAI from './guessai/guessai.js'
import Home from './home.js'
import GAIHome from './guessAIHome.js'
import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
require("firebase/firestore");

const profiles = ["fas fa-otter", "fas fa-hippo", "fas fa-dog", "fas fa-crow", "fas fa-horse", "fas fa-frog", "fas fa-fish", "fas fa-dragon", "fas fa-dove", "fas fa-spider", "fas fa-cat"]

/* global gapi */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      players: [],
      gameClass: [" ", " "],
      playerProfile: null,
    }
    this.db = null;
    this.docRef = null;
  }

  componentDidMount() {    
    window.addEventListener('beforeunload', this.handleLeavePage.bind(this));
    window.gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '423634020815-9pu8kc2gfh3s7rejq6d7k1nmcaqn70d4.apps.googleusercontent.com',
        scope: 'profile'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.handleAuthChange();
        this.auth.isSignedIn.listen(this.handleAuthChange);
      });
    })
    window.gapi.signin2.render('g-signin2', {
      'theme': 'dark',
      'onsuccess': this.onSuccess.bind(this),
    });  

    this.selectProfile();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage.bind(this));
  }

  handleAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  handleSignIn = () => {
    this.auth.signIn();
  };

  handleSignOut = () => {
    this.auth.signOut();
  };
  
  handleLeavePage = (e) => {
    this.signOut();
    e.preventDefault();
    e.returnValue = true;
  }
    
  
  
  selectProfile(){
    //randomly select players' profile
    let ranNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let ran1, ran2, ranTemp;
    for (let i = 0; i < 10; i++) {
      ran1 = Math.floor(Math.random() * 11);
      ran2 = Math.floor(Math.random() * 11);
 
      ranTemp = ranNum[ran1];
      ranNum[ran1] = ranNum[ran2]
      ranNum[ran2] = ranTemp;
    }
    let players = [];
    players.push(this.constructPlayer(profiles[ranNum[0]]));
    players.push(this.constructPlayer(profiles[ranNum[1]]));
    players.push(this.constructPlayer(profiles[ranNum[2]]));
    this.setState({players: players});
  }
  constructPlayer(name) {
    return {
      img: <i className={name}></i>,
      name: name.slice(7),
      score: 0,
    };
  }
  //change the url depending on the pages
  setMenu(i){
    let menuClass = [" ", " "];
    menuClass[i] = "active";
    this.setState({gameClass: menuClass})

  }

  onSuccess(googleUser) {
    if (this.state.isSignedIn) {
      this.signOut();
    } else {
      if (!this.db) {
        const firebaseApp = firebase.initializeApp({
          apiKey: process.env.apiKey, 
          authDomain: process.env.authDomain, 
          databaseURL: process.env.databaseURL,
          projectId: process.env.projectId,
          storageBucket: process.env.storageBucket,
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
        });
        this.db = firebaseApp.firestore();
      }
      
      let playerProfile =  googleUser.getBasicProfile();
      let players = this.state.players;

      players[0].img = <i className={players[0].name}><img src={playerProfile.getImageUrl()}></img></i>;
      players[0].name = playerProfile.getGivenName();
      
      this.update({playerEmail: playerProfile.getEmail(), playerId: playerProfile.getGivenName(), versionNumber: "v1", startTime: Date.now(), totalPoints: 0});
      this.setState({players: players, playerProfile: playerProfile});
    }
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }


  update(fieldAndvalue) {
    if (!this.docRef) {
      this.db.collection("data").add({}).then((docRef) => {
        
        this.docRef = docRef;
        this.docRef.update(fieldAndvalue);
      });
    } else {
      this.db.collection("data").doc(this.docRef.id).update(fieldAndvalue);
    }
  }

  signOut() {
    this.auth.signOut().then(function () {
    });
    this.auth.disconnect();
  }
  
  render() {
    return (
      <HashRouter basename = "/">
        <div className="App" style={{ width: "100%", height: "100%", position:"relative"}} key="main">
          <div className="header" >
            <div id="cmu">
              <img src = {cmuLogo} alt="CMU logo" /></div>
              
              <Link to="/home/" className="title" onClick={(ev)=> {this.setState({ gameClass: [" ", " "]}); }}>Interpretable Machine Learning Research Project</Link>
              <div className = "menuBar">
            
              <Link to="/guessai/" className={"menu " + this.state.gameClass[0]} key="menu0" onClick={(ev)=> {
                this.setState({ gameClass: ["active", " "]}); 
              }}>Guess AI</Link>
              <div id="g-signin2" onClick={(env) => {this.signOut.bind(this)}}></div>
              </div>
            </div>
          
              <Route path ="/" exact render={props => <Home isSignedIn = {this.state.isSignedIn} setMenu = {this.setMenu.bind(this)} />} />
              <Route path ="/home/" render={props => <Home isSignedIn = {this.state.isSignedIn} setMenu = {this.setMenu.bind(this)} />} />
              <Route path = "/guessai/" render={props => <GAIHome  players = {this.state.players} update={this.update.bind(this)} setMenu = {this.setMenu.bind(this)}/>} />
              <Route path = "/guessai-play/" render = {props => <GuessAI key = "guessAI" players = {this.state.players} update={this.update.bind(this)} setMenu = {this.setMenu.bind(this)} handleLeavePage = {this.handleLeavePage.bind(this)}/>}  />
          
        </div>
      </HashRouter>
    );
  }
}
export default App;