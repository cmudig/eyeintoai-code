import React, { Component } from 'react';
import './index.scss';

import Convo from './convo.js';
import Profile from './profile.js';
import 'lodash';
import Score from './score.js';
import Hint from './hintmodal.js';
import Pause from './pause.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      timerWidth: '300px',
      mode: 1,
      // 0: game, 1: pause,  2: stop, 3: hint, 4:score
      opacity: 1,
      display: 'block',
      typemode : this.props.turns[this.props.entireRound - 1] === 1,
      // player's current mode. true: select mode, false: guess mode
      score: this.props.score,
      hint: 'animal',
      hintMode: false,
      hintContent:  <span id = "hintContent" key = "hintcontent" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,
      inputAnswers: [],
      answerSet:[],
    };
    this.answer = this.props.answer;
    this.addRound = this.props.addRound;
    this.timer = '';
  }

  componentDidMount() {
    this.setState({ selected: [] });
  }

  countRound = () => {
    // add one round after each round
    this.setState({ round: this.state.round + 1 });
  }

  changeMode(n) {
    this.setState({ mode: n });
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  saveAnswers(n, a) {
    // save the answers so we can save it on Firebase after the round + prompt typed answers on the score modal
    const element = this.state.answerSet;
    element.push(a);
    this.setState({ inputAnswers: n, answerSet: element });
  }

  changeScore(n) {
    // if player gets score, update the score
    this.setState({ score: n });
    this.props.setScore(n);
  }

  // Generate 4 visualizations for the Guess box
  generateVis() {
    const element = [];
    for (let i = 0; i < Math.min(4, this.state.round); i++) {
      element.push(<div className = "visWrapper" key = {'viswrapper' + i}>
        <img src={this.props.hintVis[i]} alt={'vis' + i} key={'vis' + i} /></div>);
    }
    for (let i = 0; i < (4 - this.state.round); i++) {
      element.push(<div className = "visWrapper" key={'vis' + i + 5}> ? </div>);
    }
    return element;
  }

  setTimer() {
    let width = 300;
    this.timer = setInterval(function() {
      width -= 30;
      this.setState({ timerWidth: width + 'px' });
      if (width === 0) {
        clearInterval(this.timer);
        if(this.state.round < 4) {
          this.setState({ round: (this.state.round * 1) + 1,
            mode: 1 });
        } else if (this.state.round === 4) {
          let hint = this.answer.hint;
          hint = <span id = "hintContent" key = "hintcontent" className = "active">{hint}</span>;
          this.setState({ round: (this.state.round * 1) + 1, mode: 1, hintContent: hint, hintMode: true });
        } else if(this.state.round === 5) {
          this.setState({ mode: 3 });
        } else {
          this.setState({ mode: 4 });
        }
        window.setTimeout(function() {
          this.setState({ timerWidth: '300px' });
        }.bind(this), 500);
      }
    }.bind(this), 1000);
  }

  updateWrapper(newGuess) {
    newGuess['release'] = this.state.round;
    this.props.addGuess(newGuess);
  }

  renderFirstHint() {
    return this.state.hintContent;
  }

  // if the player is not in guessing turn, show the answer modal
  renderAnswerBox() {
    const element = [];
    for(let i = 0; i < this.props.answer.classLabels.length / 2; i++) {
      element.push(<div className="answer" key = {'answer' + i}>{this.props.answer.classLabels[i * 2]}(s)</div>);
    }
    if(this.state.typemode === true) {
      return (
        <div className="answerBox">
          <img className="answerImg" src={this.props.answer.url} alt="Answer" />
          <div className="answerList">
            {element}
          </div>
        </div>
      );
    }
  }

  generateConvo() {
    if(this.state.mode === 0) {
      return <Convo turns = {this.props.turns} typemode = {this.state.typemode} score = {this.state.score} round = {this.state.round} setScore = {this.props.setScore.bind(this)} answer = {this.answer} saveAnswers = {this.saveAnswers.bind(this)} addRound = {this.addRound.bind(this)} changeMode = {this.changeMode.bind(this)} players = {this.props.players} hintMode = {this.state.hintMode} entireRound = {this.props.entireRound} typedAnswer = {this.state.typedAnswer} clearTimer = {this.clearTimer.bind(this)} updateWrapper = {this.updateWrapper.bind(this)} key ="convo"/>;
    }
  }

  generateModals() {
    switch(this.state.mode) {
    case 1:
      return <Pause setTimer = {this.setTimer.bind(this)} changeMode = {this.changeMode.bind(this)} />;
    case 3:
      return <Hint answer={this.answer} addHintSelected= {this.props.addHintSelected} turns = {this.props.turns} round={this.state.round} entireRound={this.props.entireRound} setTimer={this.setTimer.bind(this)} changeMode={this.changeMode.bind(this)} score = {this.state.score} changeScore = {this.changeScore.bind(this)} setScore = {this.props.setScore.bind(this)} key = "hintModal" />;
    case 4:
      return <Score answer={this.answer} turns = {this.props.turns} players = {this.props.players} score={this.state.score} round = {this.props.entireRound} hintVis = {this.props.hintVis} addRound = {this.props.addRound.bind(this)} inputAnswers = {this.state.inputAnswers} setScore = {this.props.setScore.bind(this)} key = "scoreModal" answerSet = {this.state.answerSet} hintVisUrl = {this.props.hintVisUrl} setScoreImages = {this.props.setScoreImages.bind(this)} movetoNext = {this.props.movetoNext.bind(this)}/>;
    default:
    }
  }

  render() {
    return (
      <div className="App" style={{ width: '100%', height: '100%' }} key="game">
        <div className="main">
          <div className="game">
            <div className="side left">
              <Profile score = {this.state.score} turns = {this.props.turns} players = {this.props.players}entireRound = {this.props.entireRound}/>
              {this.renderAnswerBox()}
            </div>
            <div className="side center">
              <div className="timer game" key="gameTimer">
                <div className="timer_in" key="gameTimer_in" style={{ width: this.state.timerWidth }} > <div className="timer_highlight" />
                  <div className="counter"></div>
                </div>
              </div>
              <div className="visDisplay" >
                <div className="title">
                  {this.state.typemode ? 'Others guess the original image' : 'Guess the original image!'}
                </div>
                <div className="hint" key="hints"><span className = "title">Hint:</span> It's a type of {this.renderFirstHint()}</div>
                <div className="selected-vis" key="visDisplay">
                  {this.generateVis()}
                </div>
                <div className="tip">
                  {this.state.typemode ? 'This is your image...sit back and relax.' : 'It\'s time to guess... go, go, go!'}
                </div>
              </div>
            </div>
            <div className="side right">
              <div className="convo" key="convo">
                {this.generateConvo()}
              </div>
            </div>
          </div>
          {this.generateModals()}
        </div>
      </div>
    );
  }
}

export default Game;
