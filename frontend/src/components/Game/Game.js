import React, { Component } from 'react';

import Chat from '../../guessai/convo.js';
import Profile from '../../guessai/profile.js';
import Score from '../../guessai/score.js';
import Hint from '../../guessai/hintmodal.js';
import Pause from '../../guessai/pause.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.timer = '';
  }

  state = {
    score: this.props.score,
    round: 1,
    addRound: this.props.addRound,
    mode: 1,
    hint: 'landAnimal',
    hintMode: false,
    hintContent: <span id="hintContent" key="hintcontent" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,
    selected: [],
    inputAnswers: [],
    answers: [],
    opacity: 1,
    display: 'block',
    timerWidth: '300px',
    typeMode: this.props.turns[this.props.entireRound - 1] === 1,
  };

  countRound() {
    this.setState({ round: this.state.round + 1 });
  }

  changeMode(n) {
    this.setState({ mode: n });
  }

  clearTimer() {
    clearInterval(this.state.timer);
  }

  saveAnswers(n, a) {
    this.setState({
      inputAnswers: n,
      answers: [...this.state.answers, a],
    });
  }

  changeScore(n) {
    this.setState({ score: n });
    this.props.setScore(n);
  }

  generateVisual() {
    const elements = [];
    for (let i = 0; i < Math.min(4, this.state.round); i++) {
      elements.push(
        <div className="Visual__wrapper" key={'visual_wrapper_' + i}>
          <img
            key={'visual_' + i}
            src={this.props.hints[i]}
            alt={'visual_' + i}
          />
        </div>
      );
    }
    for (let i = 0; i < (4 - this.state.round); i++) {
      elements.push(<div className="Visual__wrapper" key={'visual_wrapper_' + i + 5}> ? </div>);
    }
    return elements;
  }

  setTimer() {
    let width = 300;
    this.timer = setInterval(function() {
      width -= 30;
      this.setState({ timerWidth: width + 'px' });
      if (width === 0) {
        clearInterval(this.timer);
        if(this.state.round < 4) {
          this.setState({ round: (this.state.round * 1) + 1, mode: 1 });
        } else if (this.state.round === 4) {
          this.setState({
            round: (this.state.round * 1) + 1,
            mode: 1,
            hintContent: (
              <span
                id="hintContent"
                key="hintcontent"
                className="active"
              >
                {this.props.answer.hint}
              </span>
            ),
            hintMode: true,
          });
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

  renderAnswerBox() {
    const element = [];
    for(let i = 0; i < this.props.answer.classLabels.length / 2; i++) {
      element.push(
        <div
          className="answer"
          key={'answer' + i}
        >
          {this.props.answer.classLabels[i * 2]}(s)
        </div>
      );
    }
    if(this.state.typeMode === true) {
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

  generateChat() {
    if(this.state.mode === 0) {
      return (
        <Chat
          key="convo"
          turns={this.props.turns}
          round={this.state.round}
          typemode={this.state.typemode}
          score={this.state.score}
          setScore={this.props.setScore.bind(this)}
          answer={this.answer}
          saveAnswers={this.saveAnswers.bind(this)}
          addRound={this.addRound.bind(this)}
          changeMode={this.changeMode.bind(this)}
          players={this.props.players}
          hintMode={this.state.hintMode}
          entireRound={this.props.entireRound}
          typedAnswer={this.state.typedAnswer}
          clearTimer={this.clearTimer.bind(this)}
          updateWrapper={this.updateWrapper.bind(this)}
        />
      );
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
    default: break;
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
                  {this.generateVisual()}
                </div>
                <div className="tip">
                  {this.state.typemode ? 'This is your image...sit back and relax.' : 'It\'s time to guess... go, go, go!'}
                </div>
              </div>
            </div>
            <div className="side right">
              <div className="convo" key="convo">
                {this.generateChat()}
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
