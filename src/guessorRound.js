import React, { Component } from 'react';
import './App.css';

import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'

import seaLion from './image/samples/seaLion.jpg'
import seaLion1 from './image/vis/seaLion/1.jpg'
import seaLion2 from './image/vis/seaLion/4.jpg'
import seaLion3 from './image/vis/seaLion/6.jpg'

import stingray from './image/samples/stingray.jpg'
import stingray1 from './image/vis/stingray/8.jpg'
import stingray2 from './image/vis/stingray/4.jpg'
import stingray3 from './image/vis/stingray/10.jpg'
import stingray4 from './image/vis/stingray/3.jpg'
import stingray5 from './image/vis/stingray/6.jpg'

import Hint from './hintmodal.js'

import Score from './score.js'
import Loading from './loading.js'

class Guess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            sessionRound: 1,
            imgs: [],
            timerWidth: "300px",
            mode: 0,
            opacity: 1,
            display: "block",

            loadingon: true,

            vis: [],
            answerLength: 0,

            answers: [],
            answeron : false,

            hintOn: false,
            hint: "",
            hintDisplay: false,

            disable : false,
            inputOpcity: 1,
        }
        this.timer = "";
        this.answer = "sea lion";
        this.vis_seaLion = [seaLion1, seaLion2, seaLion3];
        // this.vis_seaLion = [seaLion1];
        this.hint1 = "type of animal"
        this.vis_stingray = [stingray1, stingray2, stingray3, stingray4, stingray5];
        this.hint2 = "type of sea animal"
        this.round = this.props.round

        this.answerSet = {
            answer: this.answer,
            hint : this.hint1,
            vis: this.vis_seaLion,
            image : seaLion,
            quiz: "Qian"
        }
    }
    componentDidMount() {
       if(this.round === 3){
           this.answer = "stingray";
        this.answerSet = {
            answer: this.answer,
            hint : this.hint2,
            vis: this.vis_stingray,
            image : stingray,
            quiz: "Young"
        }
       }
       this.loading("an image");
       this.loadingoff();
    }
    countRound() {
        this.setState({ round: this.state.round + 1 })
    }
    changeMode(n){
        this.setState({mode: n});
    }
    changeHint(n){
        this.setState({hint: n});
    }
    turnHintOn(n){
        this.setState({hintOn: n, mode: 3, sessionRound: 11, display:"none"})
    }
    turnHintDisplay(){
        this.setState({displayHint: true});
    }
    //display visualizations
    generateVis() {
        let element = [];
        for (let i = 0; i < this.state.sessionRound; i++) {
            if(this.answerSet.vis[i]){
                if(this.round === 2){
                element.push(<img src={this.answerSet.vis[i]} alt={"vis" + i} key={"vis" + i} />)
                } else{
                element.push(<img src={this.answerSet.vis[i]} alt={"vis" + i} key={"vis" + i} />)
                }
            }
        }
        return element;
    }
    generateHint(){
        if(this.state.mode === 3){
            return <Hint turnInput = {this.turnInput.bind(this)} answer= {this.answer} addRound = {this.props.addRound.bind(this)} round = {this.state.sessionRound} turnHintDisplay = {this.turnHintDisplay.bind(this)} setTimer = {this.setTimer.bind(this)} changeMode = {this.changeMode.bind(this)} changeHint = {this.changeHint.bind(this)} />
        }
    }
    displayHint(){
        if(this.state.displayHint === true){
        return <div id = "hintDisplay" key ="hintPerm">
                It's a {this.answerSet.hint}     
        </div>
        }
    }
    //display fake answers
    generateAnswer1() {
        let answer1 =[];

        for(let i = 0; i < this.state.answerLength; i++){
            answer1.push(<div className="answer plyr3 grey" key={"answer" + i}>&nbsp;</div>);
        }
        return <div className="answers">
                {answer1}
            </div>
           
    }
    //get the inputs
    addAnswer(){
        let tanswer = document.getElementById("answerType");
        let answers = [tanswer.value];
        for(let i = 0; i < 2; i++){
            if(this.state.answers[i]){
                answers.push(this.state.answers[i])
            }
        }
        this.setState({answers : answers});
        if(tanswer.value === this.answer){
           this.rightAnswer()
        }
        tanswer.value = "";
    }
    //display typed answers
    generateTAnswer() {
        let answer =[];
        for(let i = 0; i < 3; i++){
            if(this.state.answers[i])
            answer.push(<div className="tAnsr" key={"tanswer" + i}>{this.state.answers[i]}</div>);
        }
        return <div id ="answerWrap">
                {answer}
            </div>
    }
    //disable the input field
    turnInput(n){
        this.setState({disable: true, inputOpcity: 1});
        window.setTimeout(function(){this.setState({disable: false, inputOpcity: .5})}.bind(this), n)
    }
    //if score is right, disable the input and display the score modal
    rightAnswer(){
        this.turnInput(500);
        window.clearInterval(this.timer);
        window.setTimeout(function(){this.setState({answeron : true})}.bind(this),300);
    }
    //if answer is right, display score modal
    answerModal(){
        if(this.state.answeron === true){
        return <div id="hint" key = "hint">
        <Score image = {this.answerSet.image} answer = {this.answer} score = {[{name: this.answerSet.quiz,
        color: "#01843D",
        score: "10"}, 
        {name: "Player 1",
        color: "#F2A900",
        score: "10"},]} />
        </div>
        }
    }
    loading(n){
        let type = n
        if(this.state.loadingon === true){
            return <Loading loading = {type}/>
        }
        
    }
    //loadingoff
    loadingoff(){
        window.setTimeout(function(){this.setState({loadingon: false}); this.setTimer();}.bind(this), 3000);
        
    }
    setTimer() {
        let width = 300;
        //timer
        this.timer = window.setInterval(function () {
            width -= 15;
            this.setState({ timerWidth: width + "px" });
            if(this.state.answerLength < 3 && width%30 === 0){
                this.setState({answerLength: this.state.answerLength + 1})
            }
            if (width === 0) {
                clearInterval(this.timer);
                window.setTimeout(function(){this.setState({ timerWidth: "300px", sessionRound : this.state.sessionRound+1});
                if(this.answerSet.vis[this.state.sessionRound - 1]){
                this.setState({loadingon : true, });
                this.loadingoff();
                } else{
                    this.turnHintOn(true)
                }
            }.bind(this), 1000);
                if(this.state.hintOn !== true){
                    this.setState({ mode: 1});
                } else{
                    this.setState({ mode: 3});
                }
                if(this.state.round < 11){
                    //first hint
                    this.setState({opacity: 1, display: "block" });
                } else{
                    //second hint
                    this.setState({round: 12});
                }
            }
            
        }.bind(this), 1000);
    
    }
    
    render() {
        return (
            <div className="App" style={{ width: "100%", height: "100%" }} key="game">
                <div className="main">
                    <div className="game">
                        <div className="side left">
                            <div className="profiles">
                            <div className="profile">
                                    <div className="photo plyr2" >
                                        <img src={profile2} alt="profile2"/>
                                    </div>
                                    <div className="name">
                                        Qian
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="selected-vis" key="visDisplay">
                            {this.generateVis()}
                        </div>

                        <div className="side right">

                            <div className="profiles">
                                {this.generateAnswer1()}
                            </div>
                        </div>

                        <div className="side right">

                            <div className="profiles">
                                

                                <div className="profiles">
                                    <div className="profile">
                                        <div className="photo plyr3" >
                                            <img src={profile3} alt="profile3"/>
                                        </div>
                                        <div className="name">
                                            Young
                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                     {this.generateTAnswer()}
                    <div id="tAnsrWrap">
                        <input type ="text" id = "answerType" style={{opacity: this.state.inputOpcity}} disabled = {this.state.disable} autoFocus onKeyPress={(ev) => {
                    if(ev.key === "Enter"){this.addAnswer()}}} />
                        <div class = "submit btn" onClick= {this.addAnswer.bind(this)} style={{opacity: this.state.inputOpcity}}>
                            Enter
                        </div>
                    </div>
                    <div id="timer" key="timer">
                       <div id="timer_in" key="timer_in" style={{ width: this.state.timerWidth }} > <div id="timer_highlight" />
                            <div id="counter"></div>
                        </div>
                    </div>
                    {this.loading()}
                    {this.displayHint()}
                    {this.generateHint()}
                    {this.answerModal()}
                </div>


            </div>
        );
    }
}

export default Guess;
