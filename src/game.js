import React, { Component } from 'react';
import './index.scss';

import Convo from './convo.js'
import Profile from './profile.js'
import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'

import Score from './score.js'

import ladybug from "./image/samples/ladybug.jpg"
import ladybug_feature1 from './image/vis/ladybug/1.jpg'
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

            typemode : 0,
            //player's current mode. 0: select image, 1: guess mode
            score: this.props.score,

            hint: "animal",
            hintDisplay: false,
            hintContent:  <span id = "hintContent" key = "hintcontent" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,

            inputAnswers: [],
        }
        this.answer = this.props.answer;
        this.image = this.props.image;
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
    saveAnswers(n){
        this.setState({inputAnswers: n})
    }

    //Generate 4 visualizations for the Guess box
    generateVis() {
        let element = [];
        if(this.state.round < 5){
        for (let i = 0; i <  this.state.round; i++) {
            element.push(<div class = "visWrapper">
            <img src={this.props.hints[i]} alt={"vis" + i} key={"vis" + i} /></div>)
        }
        for (let i = 0; i < (4 - this.state.round); i++) {
            element.push(<div class = "visWrapper" />)
        } 
       
    }else{
        for (let i = 0; i <  4; i++) {
            element.push(<div class = "visWrapper">
            <img src={this.props.hints[i]} alt={"vis" + i} key={"vis" + i} /></div>)
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
        let timer = window.setInterval(function () {
            width -= 15;
            this.setState({ timerWidth: width + "px" });
            if (width === 0) {
                clearInterval(timer);
                if(this.state.round < 4){
                    this.setState({round: (this.state.round * 1) + 1,
                    mode: 1})
                } else if (this.state.round === 4){
                    let hint = "";
                    switch (this.answer) {
                        case "sea lion": hint = "animal";
                            break;
                        case "ladybug": hint = "insect";
                            break;
                        case "flamingo": hint = "bird";
                            break;
                        case "hamster": hint = "mammal";
                            break;
                        case "jellyfish": hint = "sea animal";
                            break;
                        case "strawberry": hint = "fruit";
                            break;
                        case "castle": hint = "building";
                            break;
                        case "balloon":
                        case "umbrella": hint = "object";
                            break;
                        default:
                    }
                   hint =  <span id = "hintContent" key = "hintcontent" className = "active">{hint}</span>;
                    this.setState({ round: (this.state.round * 1) + 1,mode: 1, hintContent: hint });
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
        if(this.state.typemode === 0){
            return   <div className="answerBox">
            <img className="answerImg" src={this.props.image} />
            <div className="answerList">
                <div className="answer" >{this.props.answer}</div>
                <div className="answer" >Dog</div>
            </div>
    </div>
        }
    }
    generateConvo() {
        if(this.state.mode === 0){
        return  <Convo typemode = {this.state.typemode} saveAnswers = {this.saveAnswers.bind(this)} key ="convo"/>
    }
    }
    generateModals() {
        switch(this.state.mode){
            case 1: 
                return  <Pause setTimer = {this.setTimer.bind(this)} changeMode = {this.changeMode.bind(this)} />
            case 3: 
                return <Hint image={this.image} answer={this.answer} round={this.state.round} entireRound={this.props.round}setTimer={this.setTimer.bind(this)} changeMode={this.changeMode.bind(this)} />
            case 4: 
                return <Score image={this.image} answer={this.answer} score={this.state.score} round = {this.props.entireRound} hints = {this.props.hints} addRound = {this.props.addRound.bind(this)} inputAnswers = {this.state.inputAnswers} setScore = {this.props.setScore.bind(this)} key = "scoreModal"/>
        }
    }

    render() {

        return (
            <div className="App" style={{ width: "100%", height: "100%" }} key="game">
                <div className="main">
                    <div className="game">
                        <div className="side left">
                           <Profile score = {this.state.score}/>
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
