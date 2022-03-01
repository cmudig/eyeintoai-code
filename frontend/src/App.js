/* eslint-disable */
import React, { Component } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import firebase from 'firebase/app';
// import dotenv from 'dotenv';

import 'firebase/firestore';
import 'firebase/auth';

import Landing from './components/Landing/Landing';
import About from './components/About/About';
import GameState from './components/GameState/GameState';

import './index.scss';
import './App.scss';
import Logo from './images/home/logo.png';

// dotenv.config();
const profiles = ['fas fa-otter', 'fas fa-hippo', 'fas fa-dog', 'fas fa-crow', 'fas fa-horse', 'fas fa-frog', 'fas fa-fish', 'fas fa-dragon', 'fas fa-dove', 'fas fa-spider', 'fas fa-cat'];

/* global gapi */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      players: [],
      gameClass: [' ', ' '],
    };
    this.googleUser = null;
    this.uid = '';
    this.db = null;
    this.timestamp = null;
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleLeavePage.bind(this));
    window.gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '423634020815-9pu8kc2gfh3s7rejq6d7k1nmcaqn70d4.apps.googleusercontent.com',
        scope: 'profile',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.handleAuthChange();
        this.auth.isSignedIn.listen(this.handleAuthChange);
      });
    });


    if (!this.db) {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        databaseURL: process.env.REACT_APP_databaseURL,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
      };
      const firebaseApp = firebase.initializeApp(firebaseConfig);
      this.db = firebaseApp.firestore();

      if (window.location.hostname === "localhost") {
        firebaseApp.firestore().useEmulator("localhost", 8081);
        firebaseApp.auth().useEmulator("http://localhost:9099")
      }
    }

    window.gapi.signin2.render('g-signin2', {
      'theme': 'dark',
      'width': 100,
      'display':'inline',
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

  handleLeavePage = event => {
    if (window.location.pathname === '/play') {
      event.preventDefault();
      event.returnValue = true;
      this.signOut();
    } else {
      this.signOut();
    }
  };

  selectProfile() {
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

  setMenu(i) {
    const menuClass = [' ', ' '];
    menuClass[i] = 'active';
    this.setState({ gameClass: menuClass });
  }

  isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  }

  onSuccess(googleUser) {
    if (this.state.isSignedIn) {
      this.signOut();
    } else {
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      firebase.auth().onAuthStateChanged((function(firebaseUser) {
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
          // Sign in with credential from the Google user.
          firebase.auth().signInWithCredential(credential);
        } else {
          this.uid = firebaseUser.uid;
          console.log('User already signed-in Firebase.');
        }
      }).bind(this));
      const playerProfile = googleUser.getBasicProfile();
      const players = this.state.players;
      players[0].img = (
        <i className={players[0].name}>
          <img src={playerProfile.getImageUrl()} alt="Player Profile" />
        </i>
      );
      players[0].name = playerProfile.getGivenName();
      this.googleUser = googleUser;
      this.setState({ players: players });
    }
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  startNewLog() {
    this.timestamp = Date.now();
    var usersUpdate = {playerEmail: this.googleUser.getBasicProfile().getEmail(), playerId: this.googleUser.getBasicProfile().getGivenName() };
    usersUpdate[`${this.timestamp}`] = { "version" : 2 };
    this.db.collection('gameLogsStudy2').doc(this.uid).set(usersUpdate, { merge: true });
  }

  update(fieldAndvalue) {
    var usersUpdate = {};
    usersUpdate[`${this.timestamp}`] = fieldAndvalue;
    this.db.collection('gameLogsStudy2').doc(this.uid).set(usersUpdate, { merge: true });
  }

  signOut() {
    this.auth.signOut();
    this.auth.disconnect();
  }

  render() {
    const rootComponent = (
      <Landing
        isSignedIn={this.state.isSignedIn}
        startNewLog={this.startNewLog.bind(this)}
        signOut={this.signOut.bind(this)}
        setMenu={this.setMenu.bind(this)}
      />
    );

    const playComponent = (
      <GameState
        players={this.state.players}
        update={this.update.bind(this)}
        setMenu={this.setMenu.bind(this)}
        handleLeavePage={this.handleLeavePage.bind(this)}
      />
    );

    return (
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div className="Mobile">
          <img className="Mobile__logo" src={Logo} alt="Eye Into AI Logo" />
          <h1 className="Mobile__heading">Eye Into AI</h1>
          <p className="Mobile__desc">
            Thank you for your interest in our game!
            Unfortunately at the moment, Eye Into AI is only supported
            on larger devices. We recommend playing on a desktop or laptop
            for the best experience.
          </p>
        </div>
        <div className="Desktop">
          <header className="Header">
            <span className="Header__left">
              <Link className="Header__link" to="/" onClick={() => { this.setState({ gameClass: [' ', ' '] }); }}>
                <img className="Header__logo" src={Logo} alt="Eye Into AI Logo" />
              </Link>
              <Link className="Header__link" to="/" onClick={() => { this.setState({ gameClass: [' ', ' '] }); }}>
                Eye Into AI
              </Link>
            </span>
            <Link className="Header__link" to="/about" onClick={()=> { this.setState({ gameClass: [' ', ' '] }); }}>
              About
            </Link>
          </header>
          <main>
            <Switch>
              <Route path="/" render={() => rootComponent} exact />
              <Route path="/play" render={() => playComponent} exact />
              <Route path="/about" component={About} exact />
            </Switch>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
