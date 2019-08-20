import React, { Component } from 'react';
import './index.scss';

import Convo from './convo.js'
import Profile from './profile.js'

import Score from './score.js'
import Hint from './hintmodal.js'
import Pause from './pause.js'


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            round: 1,
            timerWidth: "300px",
            mode: 1,
            //0: game, 1: pause,  2: stop, 3: hint, 4:score
            opacity: 1,
            display: "block",

            typemode : this.props.entireRound - 1,
            //player's current mode. 0: select image, 1: guess mode
            score: this.props.score,

            hint: "animal",
            hintMode: false,
            hintContent:  <span id = "hintContent" key = "hintcontent" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,

            inputAnswers: [],
            answerSet:[],
        }
        this.answer = this.props.answer;
        this.addRound = this.props.addRound;
        this.timer = "";
    }
    componentDidMount() {
        this.setState({ selected: [] });
    }
    countRound() {
        this.setState({ round: this.state.round + 1 })
    }
    changeMode(n) {
        this.setState({ mode: n });
    }
    clearTimer(){
        clearInterval(this.timer);
    }
    saveAnswers(n, a){
        let element = this.state.answerSet;
        element.push(a);
        this.setState({inputAnswers: n, answerSet: element})
    }
    changeScore(n){
        this.setState({score: n});
        this.props.setScore(n);
    }

    //Generate 4 visualizations for the Guess box
    generateVis() {
        let element = [];
        if(this.state.round < 5){
        for (let i = 0; i <  this.state.round; i++) {
            element.push(<div className =  "visWrapper" key = {"viswrapper" + i}>
            <img src={this.props.hintVis[i]} alt={"vis" + i} key={"vis" + i} /></div>)
        }
        for (let i = 0; i < (4 - this.state.round); i++) {
            element.push(<div className =  "visWrapper" key={"vis" + i + 5}/>)
        } 
       
    }else{
        for (let i = 0; i <  4; i++) {
            element.push(<div className =  "visWrapper" key = {"viswrapper" + i}>
            <img src={this.props.hintVis[i]} alt={"vis" + i} key={"vis" + i} /></div>)
        }
    }
    return element;
    }

    
    generateAnswer1() {
        let answer1 = [];
        let length = this.state.answer1.length - 1;

        for (let i = 0; i < 3; i++) {
            if (this.state.answer1[length - i]) {
                answer1.push(<div className="answer plyr2" key={"answer" + i}> {this.state.answer1[length - i]} </div>);
            }
        }
        return <div className="answers">
            {answer1}
        </div>

    }
    generateAnswer2() {
        let answer2 = [];
        let length = this.state.answer2.length - 1;
        for (let i = 0; i < 3; i++) {
            if (this.state.answer2[length - i]) {
                answer2.push(<div className="answer plyr3" key={"answer" + i}> {this.state.answer2[length - i]} </div>);
            }
        }
        return <div className="answers">
            {answer2}
        </div>
    }
    setTimer() {
        let width = 300;
        //timer
        this.timer = setInterval(function () {
            width -=15;
            this.setState({ timerWidth: width + "px" });
            if (width === 0) {
                clearInterval(this.timer);
                if(this.state.round < 4){
                    this.setState({round: (this.state.round * 1) + 1,
                    mode: 1})
                } else if (this.state.round === 4){
                    let hint = this.answer.hint;

                   hint =  <span id = "hintContent" key = "hintcontent" className = "active">{hint}</span>;
                    this.setState({ round: (this.state.round * 1) + 1,mode: 1, hintContent: hint, hintMode: true });
                } else if(this.state.round === 5){
                    this.setState({mode: 3})
                }else{
                    this.setState({mode: 4})
                }
                window.setTimeout(function () {
                    this.setState({ timerWidth: "300px" });
                }.bind(this), 500);
            }

        }.bind(this), 1000);

    }
    
    renderFirstHint(){
        return this.state.hintContent;
    }
    renderAnswerBox(){
        let element = [];
        for(let i = 0; i < this.props.answer.classLabels.length / 2; i++){
            element.push(<div className="answer" key = {"answer" + i}>{this.props.answer.classLabels[i * 2]}(s)</div>)
        }
        if(this.state.typemode === 0){
            return   <div className="answerBox">
            <img className="answerImg" src={this.props.answer.url} alt = "Answer"/>
            <div className="answerList">
                {element}
            </div>
    </div>
        }
    }
    generateConvo() {
        if(this.state.mode === 0){
        return  <Convo typemode = {this.state.typemode} score = {this.state.score} setScore = {this.props.setScore.bind(this)}  answer = {this.answer} saveAnswers = {this.saveAnswers.bind(this)} addRound = {this.addRound.bind(this)} changeMode = {this.changeMode.bind(this)}  players = {this.props.players} hintMode = {this.state.hintMode} entireRound = {this.props.entireRound} typedAnswer = {this.state.typedAnswer} clearTimer = {this.clearTimer.bind(this)} key ="convo"/>
    }
    }
    generateModals() {
        switch(this.state.mode){
            case 1: 
                return  <Pause setTimer = {this.setTimer.bind(this)} changeMode = {this.changeMode.bind(this)} />
            case 3: 
                return <Hint answer={this.answer} round={this.state.round} entireRound={this.props.entireRound} setTimer={this.setTimer.bind(this)} changeMode={this.changeMode.bind(this)} score = {this.state.score} changeScore = {this.changeScore.bind(this)} setScore = {this.props.setScore.bind(this)} key = "hintModal" />
            case 4: 
                return <Score answer={this.answer}  players = {this.props.players} score={this.state.score} round = {this.props.entireRound} hintVis = {this.props.hintVis} addRound = {this.props.addRound.bind(this)} inputAnswers = {this.state.inputAnswers} setScore = {this.props.setScore.bind(this)} key = "scoreModal" answerSet = {this.state.answerSet} hintVisUrl = {this.props.hintVisUrl} />
            default:
        }
    }

    render() {

        return (
            <div className="App" style={{ width: "100%", height: "100%" }} key="game">
                <div className="main">
                    <div className="game">
                        <div className="side left">
                           <Profile score = {this.state.score} players = {this.props.players}entireRound = {this.props.entireRound}/>
                          {this.renderAnswerBox()}
                        </div>

                        <div className="side center">
                            <div className="timer game" key="gameTimer">
                                <div className="timer_in" key="gameTimer_in" style={{ width: this.state.timerWidth }} > <div className="timer_highlight" />
                                    <div className="counter"></div>
                                </div>
                            </div>
                            <div className="visDisplay" >
                                <div className = "title">Guess the original image!</div>
                                <div className = "hint" key = "hints"><span className = "title">Hint:</span> It's a type of {this.renderFirstHint()}</div>
                                    <div className="selected-vis" key="visDisplay">
                                        {this.generateVis()}
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
