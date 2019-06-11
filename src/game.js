import React, { Component } from 'react';
import './App.css';

import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'

import Vis from './visualizations.js'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            round: 1,
            imgs: [],
            timerWidth: "120px",
            mode: 1,
            opacity: 0,
            display: "block",

            answer1: [],
            answer2: [],
        }
        this.answer = this.props.answer;
        this.round1_1 = ["wolf", "bug", "dog", "cat", "fur", "cotton"];
        this.round1_2 = ["fabric", "web", "spider", "fox", "wolf", "rubber", "mouse", "flower"];

        this.round2_1 = ["cat", "polar bear", "vase", "wolf", "plant"];
        this.round2_2 = ["mint", "daisy", "mouse", "glass", "dog", "cosmos", "space", "blanket"];

        this.round3_1 = ["monkey", "otter", "goose", "lion", "dog"];
        this.round3_2 = ["wolf", "bug", "bird", "peacock", "sky", "ceramic"];

        this.hint1_1 = ["bug", "dog", "cat", "fur", "cotton", "linen"];
        this.hint1_2 = ["fabric", "rubber", "mouse", "flower"];

        this.hint2_1 = ["strawberry", "jellyfish", "flamingo", "castle"];
        this.hint2_2 = ["umbrella", "ladybug", "balloon", "umbrella", "peacock"];

        this.answers1 = [this.round1_1, this.round2_1, this.round3_1];
        this.answers2 = [this.round1_2, this.round2_2, this.round3_2];

        this.answersHint1 = [this.hint1_1, this.hint2_1];
        this.answersHint2 = [this.hint1_2, this.hint2_2];


    }
    componentDidMount() {
        this.setState({ selected: [] })
    }
    countRound() {
        this.setState({ round: this.state.round + 1 })
    }
    selectedImg(imgs) {
        this.setState({ imgs: imgs, opacity: 0 });
        this.setTimer();
        window.setTimeout(function () {
            this.setState({ mode: 0, display: "none" });
        }.bind(this), 300);
    }
    generateVis() {
        let element = [];
        for (let i = 0; i < this.state.imgs.length; i++) {
            element.push(<img src={this.state.imgs[i]} alt={"vis" + i} key={"vis" + i} />)
        }
        return element;
    }
    // displayVis(){
    //     if(this.state.mode === 1){
    //         return <Vis answer = {this.answer} selectedImg = {this.selectedImg.bind(this)} round = {this.state.round} countRound={this.countRound.bind(this)} />  
    //     }
    // }
    generateAnswer1() {
        let answer1 =[];
        let length = this.state.answer1.length - 1;

        for(let i = 0; i < 3; i++){
            if(this.state.answer1[length - i]){
                answer1.push(<div className="answer" key={"answer" + i}> {this.state.answer1[length - i]} </div>);
            }
           
        }
        return <div className="answers">
                {answer1}
            </div>
           
    }
    generateAnswer2() {
        let answer2 =[];
        let length = this.state.answer2.length - 1;
        for(let i = 0; i < 3; i++){
            if(this.state.answer2[length - i]){
                answer2.push(<div className="answer" key={"answer" + i}> {this.state.answer2[length - i]} </div>);
            }
        }
        return  <div className="answers">
        {answer2}
    </div>
    }
    setTimer() {
        let width = 120;
        //timer
        let timer = window.setInterval(function () {
            this.setState({ timerWidth: width + "px" });
            if (width === 0) {
                clearInterval(timer);
                this.setState({ mode: 1});
                if(this.state.round < 11){
                    this.setState({opacity: 1, display: "block" });
                }
            }
            width -= 60;
        }.bind(this), 1000);

        //answers
        let answer1 = 0;
        let answer2 = 0;
        let tempAnswer1 = [];
        let tempAnswer2 = [];
        let round = (this.state.round - 2)%3

        if(this.state.mode !== 3){
        let answers1 = window.setInterval(function () {
            tempAnswer1.push(this.answers1[round][answer1])
            this.setState({ answer1: tempAnswer1});
            answer1 += 1;
            if(answer1 === (this.answers1[round].length - 1)){
                clearInterval(answers1);
            }
        }.bind(this), (20000/this.answers1[round].length));

        let answers2 = window.setInterval(function () {
            tempAnswer2.push(this.answers2[round][answer2])
            this.setState({ answer2: tempAnswer2});
            answer2 += 1;
            if(answer2 === (this.answers2[round].length - 1)){
                clearInterval(answers2);
            }
        }.bind(this), (20000/this.answers2[round].length));
    } else{
        let answers1 = window.setInterval(function () {
            tempAnswer1.push(this.answersHint1[round][answer1])
            this.setState({ answer1: tempAnswer1});
            answer1 += 1;
            if(answer1 === (this.answersHint1[round].length - 1)){
                clearInterval(answers1);
            }
        }.bind(this), (20000/this.answersHint1[round].length));

        let answers2 = window.setInterval(function () {
            tempAnswer2.push(this.answersHint2[round][answer2])
            this.setState({ answer2: tempAnswer2});
            answer2 += 1;
            if(answer2 === (this.answersHint2[round].length - 1)){
                clearInterval(answers2);
            }
        }.bind(this), (20000/this.answersHint2[round].length));
        
    }

    }
    render() {

        return (
            <div className="App" style={{ width: "100%", height: "100%" }}>
                <div className="main">
                    <div className="game">
                        <div className="side left">
                            <div className="profiles">
                                <div className="profile">
                                    <div className="photo" >
                                        <img src={profile1} />
                                    </div>
                                    <div className="name">
                                        Player 1
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
                                {this.generateAnswer2()}
                            </div>
                        </div>

                        <div className="side right">

                            <div className="profiles">
                                <div className="profile">
                                    <div className="photo" >
                                        <img src={profile2} />
                                    </div>
                                    <div className="name">
                                        Qian
                            </div>
                                </div>

                                <div className="profiles">
                                    <div className="profile">
                                        <div className="photo" >
                                            <img src={profile3} />
                                        </div>
                                        <div className="name">
                                            Young
                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="timer" key="timer">
                        <div id="timer_in" key="timer_in" style={{ width: this.state.timerWidth }} >
                            <div id="counter"></div>
                        </div>
                    </div>
                    <div id="hint">
                        Type of mammal
                        <div id = "hintTimer" > <svg width="150" height="120"><circle r="54" cx="60" cy="60" /></svg>3</div> 
                    </div>
                    <div style={{ opacity: this.state.opacity, display: this.state.display, overflow: "hidden" }} key="viswrapper">
                        <Vis answer={this.answer} selectedImg={this.selectedImg.bind(this)} round={this.state.round} countRound={this.countRound.bind(this)} />
                    </div>
                </div>


            </div>
        );
    }
}

export default Game;
