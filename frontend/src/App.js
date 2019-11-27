import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import './guessai/index.scss';
import cmuLogo from './image/CMU_Logo.png';
import GuessAI from './guessai/guessai.js';
import Home from './home.js';
import GAIHome from './guessAIHome.js';

const profiles = ['fas fa-otter', 'fas fa-hippo', 'fas fa-dog', 'fas fa-crow', 'fas fa-horse', 'fas fa-frog', 'fas fa-fish', 'fas fa-dragon', 'fas fa-dove', 'fas fa-spider', 'fas fa-cat'];

/* global gapi */
class App extends Component {
  state = {
    isSignedIn: false,
    players: [],
    gameClass: [' ', ' '],
    playerProfile: null,
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleLeavePage);
    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '423634020815-9pu8kc2gfh3s7rejq6d7k1nmcaqn70d4.apps.googleusercontent.com',
        scope: 'profile',
      });
    });
    window.gapi.signin2.render('g-signin2', {
      'theme': 'dark',
      'onsuccess': this.onSuccess.bind(this),
    });
    this.selectProfile();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleAppStateChange);
  }

  handleLeavePage = () => {
    this.signOut();
    this.setState({ isSignedIn: false });
    return 'leave';
  }

  selectProfile() {
    // randomly select players' profile
    const ranNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let ran1, ran2, ranTemp;
    for (let i = 0; i < 10; i++) {
      ran1 = Math.floor(Math.random() * 11);
      ran2 = Math.floor(Math.random() * 11);

      ranTemp = ranNum[ran1];
      ranNum[ran1] = ranNum[ran2];
      ranNum[ran2] = ranTemp;
    }
    const players = [];
    players.push(this.constructPlayer(profiles[ranNum[0]]));
    players.push(this.constructPlayer(profiles[ranNum[1]]));
    players.push(this.constructPlayer(profiles[ranNum[2]]));
    this.setState({ players: players });
  }

  constructPlayer(name) {
    return {
      img: <i className={name}></i>,
      name: name.slice(7),
      score: 0,
    };
  }

  // Change the url depending on the pages
  setMenu(i) {
    const menuClass = [' ', ' '];
    menuClass[i] = 'active';
    this.setState({ gameClass: menuClass });
  }

  onSuccess(googleUser) {
    if (this.state.isSignedIn) {
      this.signOut();
    } else {
      const playerProfile = googleUser.getBasicProfile();
      const players = this.state.players;

      players[0].img = <i className={players[0].name}><img src={playerProfile.getImageUrl()}></img></i>;
      players[0].name = playerProfile.getGivenName();
      this.setState({ players: players, playerProfile: playerProfile });
    }
    this.setState({ isSignedIn: !this.state.isSignedIn });
  }

  signOut() {
    this.auth2.signOut();
    this.auth2.disconnect();
  }

  render() {
    return (
      <HashRouter basename = "/">
        <div className="App" style={{ width: '100%', height: '100%', position:'relative' }} key="main">
          <div className="header" >
            <div id="cmu">
              <img src = {cmuLogo} alt="CMU logo" />
            </div>
            <Link
              to="/home/"
              className="title"
              onClick={()=> { this.setState({ gameClass: [' ', ' '] }); }}
            >
              Interpretable Machine Learning Research Project
            </Link>
            <div className="menuBar">
              <Link
                to="/guessai/"
                className={'menu ' + this.state.gameClass[0]}
                key="menu0"
                onClick={()=> { this.setState({ gameClass: ['active', ' '] }); }}
              >
                Guess AI
              </Link>
              <div id="g-signin2" onClick={() => { this.signOut.bind(this) ; }}></div>
            </div>
          </div>
          <Route path ="/" exact render={() => <Home setMenu = {this.setMenu.bind(this)} />} />
          <Route path ="/home/" render={() => <Home setMenu = {this.setMenu.bind(this)} />} />
          <Route path = "/guessai/" render={() => <GAIHome setMenu = {this.setMenu.bind(this)}/>} />
          <Route path = "/guessai-play/" render = {() => <GuessAI key = "guessAI" players = {this.state.players} setMenu = {this.setMenu.bind(this)} />} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
