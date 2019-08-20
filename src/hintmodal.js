import React, { Component } from 'react';

import './App.css';

const answers = ["wolf", "bug", "fur", "cotton", "fabric", "web", "spider", "fox", "rubber", "mouse", "flower", "polar bear", "vase", "plant", "mint", "daisy", "mouse", "glass", "cosmos", "space", "blanket", "monkey", "otter", "goose", "lion", "bird", "peacock", "sky", "ceramic", "cotton", "linen"];

class Hint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintTimer: 10,
            animation: "active",
            ranSelected: 0,
            selectable: "active",
            randomOptions: [],
        }
        this.answer = this.props.answer.classLabels[0];
        this.hinttimer = "";
        this.round = this.props.round;
        this.score = this.props.score;
    }
    componentDidMount() {
        //set numbers to randomly generate answers
        let numbers = [];
        for (let i = 0; i < answers.length; i++) {
            numbers.push(i);
        }
        let ran1, ran2, ranTemp;
        for (let i = 0; i < 10; i++) {
            ran1 = Math.floor(Math.random() * answers.length);
            ran2 = Math.floor(Math.random() * answers.length);

            ranTemp = numbers[ran1];
            numbers[ran1] = numbers[ran2]
            numbers[ran2] = ranTemp;
        }
        numbers = [answers[numbers[0]], answers[numbers[1]], answers[numbers[2]], answers[numbers[3]]];
        numbers[Math.floor(Math.random() * 4)] = this.answer;
        this.setState({randomOptions: numbers})

        this.hinttimer = setInterval(function () {
            this.setState({ hintTimer: this.state.hintTimer - 1, });
            if (this.state.hintTimer === 0) {
                clearInterval(this.hinttimer);
                this.props.changeMode(4);
            }
        }.bind(this), 1000);
        (this.props.entireRound * 1 === 1) ? this.test_selectCard() : this.random_selectCard();
    }

    componentWillUnmount() {
        clearInterval(this.hinttimer);
        this.props.changeMode(4);
    }
    stopTimer() {
        clearInterval(this.hinttimer);
        this.setState({ animation: "none" });
        window.setTimeout(function () {
            this.props.changeMode(4);
        }.bind(this), 2000)

        let cards = document.getElementsByClassName("hintCard");
        let classlists = ['plyr1', 'plyr2', 'plyr3', 'plyr1plyr2', 'plyr1plyr3']

        for(let j = 0; j < 4; j++){
            for(let i = 0; i < 5; i++){
                if(cards[j].innerHTML === this.answer && cards[j].classList.contains(classlists[i])){
                    i < 3 ? this.rightAnswer(i) : this.rightAnswer(0, i-3);
                }
            }
        }
    }
    rightAnswer(n, i = undefined) {
        this.score[n][1] += 10;
        this.score[this.props.entireRound - 1][1] += 10;
        if (i) {
            this.score[i][1] += 10;
            this.score[this.props.entireRound - 1][1] += 5;
        }
        this.props.setScore(this.score);
        this.setState({ disable: true, inputOpcity: .5 });
        window.setTimeout(function () { this.props.changeMode(4); }.bind(this), 300);
    }
    //player 2 and 3 automatically select card for the first round
    test_selectCard() {
        let cards = document.getElementsByClassName("hintCard");
        //plyr2 select card
        window.setTimeout(function () {
            cards[3].classList.add("plyr2");
        }.bind(this), 2000);

        //plyr3 select card and finish the round
        window.setTimeout(function () {
            cards[3].classList.remove("plyr2");
            cards[3].classList.add("plyr2plyr3");
            this.setState({ animation: "" });

            window.setTimeout(function () {
                this.setState({ result: true });
                this.rightAnswer(1, 2)
                clearInterval(this.hinttimer);
            }.bind(this), 3000)
        }.bind(this), 3000);
    }
    //player 2 or 3 randomly selects cards for the 2nd, 3rd round
    random_selectCard() {
        let cards = document.getElementsByClassName("hintCard");
        let ranNum = Math.floor(Math.random() * 4);
        cards = cards[ranNum]
        //if player already selected the same card, add class name of plyr1+corresponding player
        window.setTimeout(function(){
            cards.classList.length !== 1 ? cards.classList.add("plyr1plyr" + (6 / this.props.entireRound)) : cards.classList.add("plyr" + (6 / (this.props.entireRound * 1)))
            this.state.ranSelected ? this.stopTimer() : this.setState({ ranSelected: 1 });
        }.bind(this), 3000);
      
    }
    selectCard(ev) {
        if (this.state.selectable === "active") {
            ev.target.classList.length === 1 ? ev.target.classList.add("plyr1") : ev.target.classList.add("plyr" + (6 / (this.props.entireRound * 1)) + "plyr1");
        
            this.setState({ selectable: " " })
        }
        this.state.ranSelected ? this.stopTimer() : this.setState({ ranSelected: 1 });
    }

    hintGenerator() {
        if (this.props.entireRound === 1) {
            return <div>Last chance!<br />
                Select the answer
                <div id="hintTimer" key="hintTimer"> <svg width="90" height="90">
                    <circle key="timeAnimHint" r="30" cx="35" cy="35" />
                    <circle className={this.state.animation} key="timeAnimHint2" r="30" cx="35" cy="35" />

                </svg>
                    <div className="seconds">
                        {this.state.hintTimer}
                    </div>
                </div>
                <div className="hintWrapper">
                    <div className="hintCard">Armadillo</div>
                    <div className="hintCard">Potato</div>
                    <div className="hintCard">Beetles</div>
                    <div className="hintCard"> {this.props.answer.classLabels[0]}</div>
                </div>
            </div>
        } else {
            return <div>Last chance!<br />
                Select the answer
                <div id="hintTimer" key="hintTimer"> <svg width="90" height="90">
                    <circle key="timeAnimHint" r="30" cx="35" cy="35" />
                    <circle className={this.state.animation} key="timeAnimHint2" r="30" cx="35" cy="35" />
                </svg>
                    <div className="seconds">
                        {this.state.hintTimer}
                    </div>
                </div>
                <div className={"hintWrapper "+ this.state.selectable}>
                    <div className="hintCard" onClick={this.selectCard.bind(this)}>{this.state.randomOptions[0]}</div>
                    <div className="hintCard" onClick={this.selectCard.bind(this)}>{this.state.randomOptions[1]}</div>
                    <div className="hintCard" onClick={this.selectCard.bind(this)}>{this.state.randomOptions[2]}</div>
                    <div className="hintCard" onClick={this.selectCard.bind(this)}> {this.state.randomOptions[3]}</div>
                </div>
            </div>
        }
    }


    render() {
        return (
            <div id="hint" key="hint">
                {this.hintGenerator()}
            </div>

        );
    }
}

export default Hint;
