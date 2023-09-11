/* eslint-disable */
import React, { Component } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import About from './components/About/About';
import GameState from './components/GameState/GameState';

import './index.scss';
import './App.scss';
import Logo from './images/home/logo.png';

const profiles = ['fas fa-otter', 'fas fa-hippo', 'fas fa-crow', 'fas fa-horse', 'fas fa-frog', 'fas fa-fish', 'fas fa-dragon', 'fas fa-dove', 'fas fa-spider', 'fas fa-cat'];

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
const db = firebaseApp.firestore();

const randomNumber = Math.floor(Math.random() * 10000000000);

// Convert the random number to a string
const randomNumberString = randomNumber.toString();

// Pad the string with leading zeros to ensure it's 10 characters long
const paddedRandomNumber = randomNumberString.padStart(10, '0');
console.log("PADDED:", paddedRandomNumber)
const documentId = paddedRandomNumber
// const documentId = "myCustomDocumentID";

// Reference to the Firestore collection
const collectionRef = db.collection('living-public-game'); // Replace with your collection name

// Create a document with the specified document ID
const customDocRef = collectionRef.doc(documentId);

class App extends Component {
  state = {
      players: [],
      gameClass: [' ', ' '],
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleLeavePage);

    this.selectProfile();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage.bind(this));
  }

  handleLeavePage = (event) => {
    if (window.location.pathname === '/play') {
      event.preventDefault();
      event.returnValue = true;
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
    console.log("NAME:", name)
    if (name) {
      return {
        img: <i className={name}></i>,
        name: name.slice(7),
        score: 0,
      };
    } else {
      return {
        img: <i className={"guest"}></i>,
        name: "guest",
        score: 0,
      };
    }
    
  }

  setMenu(i) {
    const menuClass = [' ', ' '];
    menuClass[i] = 'active';
    this.setState({ gameClass: menuClass });
  }

  update(fieldAndvalue) {
    var usersUpdate = {};
    const currentDate = new Date()
    usersUpdate[`${Math.floor(currentDate.getTime()/1000)}`] = fieldAndvalue;
    console.log("USERS UPDATE: ", usersUpdate)
    customDocRef.set(usersUpdate, { merge: true })
      .then(() => {
        // Update successful
        console.log("Document updated successfully");
      })
      .catch((error) => {
        // Handle update error
        console.error("Update Error: ", error);
      });
  }

  render() {
    
    const rootComponent = (
      <Landing
        // startNewLog={this.startNewLog.bind(this)}
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
