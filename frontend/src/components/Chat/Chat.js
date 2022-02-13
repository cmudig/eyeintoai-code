/* eslint-disable */
import React, { Component } from 'react';

import HintAnswers from '../../data/HintAnswers';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generateAnswer: [],
      generateDisplay: [],
      time: 1,
      convo: [],
      typedAnswer: [],
    };
    this.messages = [];
    this.score = this.props.score;
  }

  componentDidMount() {
    this.messageGenerator();
  }

  componentWillUnmount() {
    if (this.props.saveAnswers) {
      this.props.saveAnswers(this.state.typedElement, this.state.generateAnswer);
    }
    clearInterval(this.messages);
  }

  rightAnswer(n, i = undefined) {
    clearInterval(this.messages);
    this.props.clearTimer();
    this.score[n][1] += 30 - this.props.round * 5;
    this.score[this.props.turns[this.props.entireRound - 1] - 1][1] += 10;
    if (i) {
      this.score[i][1] += 5;
      this.score[this.props.turns[this.props.entireRound - 1] - 1][1] += 10;
    }
    this.props.setScore(this.score);
    this.setState({ disable: true, inputOpcity: 0.5 });
    window.setTimeout(function() { this.props.changeMode(4); }.bind(this), 300);
  }

  messageGenerator() {
    const keys = Object.keys(HintAnswers);
    let answer = HintAnswers[keys[keys.length * Math.random() << 0]];
    if (this.props.hintMode === true) {
      answer = HintAnswers[this.props.answer.hint];
    }
    let answers, player, element, displayElement = [];
    this.setState({ opacity: 1 });
    if (this.props.mode !== 'home') {
      this.messages = setInterval(function() {
        answers = answer[Math.floor(Math.random() * answer.length)];
        element = this.state.generateAnswer;
        displayElement = this.state.generateDisplay;

        if (this.props.turns[this.props.entireRound - 1] === 1) {
          player = (Math.floor(Math.random() * 2)) + 2;
          const convo = (
            <div key={'convoWarp' + element.length}>
              <div className="convoWrap" key={'convo' + element.length}>
                <div className={'bubble plyr' + (player)} key={'convoBubble' + element.length}>
                  {answers}
                </div>
                <div className={'profile plyr' + (player)} key={'profile' + element.length}>
                  {this.props.players[player - 1].img}
                </div>
              </div>
            </div>
          );
          element.push(convo);
          displayElement.push(convo);
        } else {
          switch (this.props.turns[this.props.entireRound - 1]) {
          case 2: player = 3;
            break;
          case 3: player = 2;
            break;
          default: break;
          }
          const convo = (
            <div key={'convoWarp' + element.length}>
              <div className="convoWrap" key={'convo' + element.length}>
                <div className={'bubble plyr' + (player)} key={'convoBubble' + element.length}>
                  {answers}
                </div>
                <div className={'profile plyr' + (player)} key={'profile' + element.length}>
                  {this.props.players[player - 1].img}
                </div>
              </div>
            </div>
          );
          const displayConvo = (
            <div key={'convoWarp' + element.length}>
              <div className="convoWrap" key={'convo' + element.length}>
                <div className={'bubble plyr' + (player)} key={'convoBubble' + element.length}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className={'profile plyr' + (player)} key={'profile' + element.length}>
                  {this.props.players[player - 1].img}
                </div>
              </div>
            </div>
          );
          element.push(convo);
          displayElement.push(displayConvo);
        }
        // To prevent computer from guessing correctly
        // if (this.props.answer.classLabels.includes(answers)) { this.rightAnswer(player - 1); }
        this.setState({ generateAnswer: element, generateDisplay: displayElement, time: (this.state.time * 1) + 1 });
        this.autoScroll();
      }.bind(this), 4000);
    } else {
      throw new Error("DeadCodeCalled");
      // CODEFLOW SHOULD NEVER REACH HERE (Legacy)
      // this.messages = setInterval(function() {
      //   answers = answer[Math.floor(Math.random() * answer.length)];
      //   element = this.state.generateDisplay;
      //   player = (Math.floor(Math.random() * 2)) + 1;
      //   const convo = (
      //     <div key={'convoWarp' + element.length}>
      //       <div className="convoWrap" key={'convo' + element.length}>
      //         <div className={'bubble plyr' + (player + 1)} key={'convoBubble' + element.length}>
      //           {answers}
      //         </div>
      //         <div className={'profile plyr' + (player + 1)} key={'profile' + element.length}>
      //           {this.props.players[player].img}
      //         </div>
      //       </div>
      //     </div>
      //   );
      //   element.push(convo);
      //   this.setState({ generateDisplay: element });
      //   this.autoScroll();
      // }.bind(this), 4000);
    }
  }

  addAnswer() {
    const tanswer = document.getElementById('answerType');
    const answers = [tanswer.value.toLowerCase()];
    if (this.props.answer.classLabels.includes(tanswer.value.toLowerCase())) {
      this.rightAnswer(0);
      this.props.updateWrapper({ guess:tanswer.value.toLowerCase(), guessHit:true, timeOfAction: Date.now() });
    } else {
      this.props.updateWrapper({ guess:tanswer.value.toLowerCase(), guessHit:false, timeOfAction: Date.now() });
    }
    const element = this.state.generateAnswer;
    const displayElement = this.state.generateDisplay;
    const typedElement = this.state.typedAnswer;
    typedElement.push(answers);
    const display = (
      <div key={'convoWrap' + element.length}>
        <div className="convoWrap" key={'convo' + element.length}>
          <div className="bubble plyr1" key={'convoBubble' + element.length}>
            {answers}
          </div>
          <div className="profile plyr1" key={'profile' + element.length}>
            {this.props.players[0].img}
          </div>
        </div>
      </div>
    );
    element.push(display);
    displayElement.push(display);
    this.setState({ generateAnswer: element, generateDisplay: displayElement, typedAnswer: typedElement, time: (this.state.time * 1) + 1 });
    tanswer.value = '';
    window.setTimeout(() => { this.autoScroll(); }, 10);
  }

  autoScroll() {
    const convoBox = document.getElementsByClassName('convo_inner')[0];
    if (convoBox) {
      convoBox.scrollTop = convoBox.scrollHeight - convoBox.clientHeight;
    }
  }

  renderInputBox() {
    if (this.props.typemode === true) {
      return (
        <div className="typing">
          <div className="bubble all">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
          <div className="profileWrap">
            <div className="profile player3">
              <i className={this.props.players[2]}></i>
            </div>
            <div className="profile player2">
              <i className={this.props.players[1]}></i>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="tAnsrWrap">
          <input type="text" id="answerType" style={{ opacity: this.state.inputOpcity }} disabled={this.state.disable} autoFocus onKeyPress={(ev) => {
            if (ev.key === 'Enter') { this.addAnswer(); }
          }} />
          <div className="submit btn" onClick={this.addAnswer.bind(this)} style={{ opacity: this.state.inputOpcity }}>
            Enter
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className="convo_inner">
          {this.state.generateDisplay}
        </div>
        {this.renderInputBox()}
      </div>
    );
  }
}

export default Chat;
