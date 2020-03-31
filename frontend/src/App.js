import React, { Component } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import dotenv from 'dotenv';

import Landing from './components/Landing/Landing';
import GameState from './components/GameState/GameState';

import './App.scss';
import CMULogo from './image/CMU_Logo.png';

dotenv.config();
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

  handleLeavePage = (e) => {
    this.signOut();
    e.preventDefault();
    e.returnValue = true;
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
    var usersUpdate = {};
    usersUpdate[`${this.timestamp}`] = { playerEmail: this.googleUser.getBasicProfile().getEmail(), playerId: this.googleUser.getBasicProfile().getGivenName(), versionNumber: 'v1', totalPoints: 0 };
    this.db.collection('gameLogs').doc(this.uid).set(usersUpdate, { merge: true });
  }

  update(fieldAndvalue) {
    var usersUpdate = {};
    usersUpdate[`${this.timestamp}`] = fieldAndvalue;
    this.db.collection('gameLogs').doc(this.uid).set(usersUpdate, { merge: true });
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
      <HashRouter basename="/">
        <div>
          <header className="Header">
            <img className="Header__logo" src={CMULogo} alt="Carnegie Mellon University" />
            <Link className="Header__link" to="/" onClick={()=> { this.setState({ gameClass: [' ', ' '] }); }}>
              Interpretable Machine Learning Research Project
            </Link>
          </header>
          <main>
            <Switch>
              <Route path="/" render={() => rootComponent} exact />
              <Route path="/play" render={() => playComponent} exact />
            </Switch>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
