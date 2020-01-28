import React, { Component } from 'react';

const hintAnswers = { "animals": ["dolphin", "alphaca", "lama", "snake", "spider", "otter", "butterfly", "shark", "bear", "deer", "mouse", "hamster"], 
                            "food": ["plum", "corn", "pumpkin", "candy", "watermelon", "peanut"],
                            "toy": ["confetti", "toy bear", "puppet", "balloon"],
                            "transportation": ["car", "plane", "bike", "metro", "ship"],
                            "building": ["tower", "theatre", "school", "temple"],
                            "home appliances": ["bottle", "vacuum cleaner", "spoon", "desk", "bed", "fork", "TV"]}
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
        let answers = hintAnswers[this.props.answer.hint]
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
        if (this.props.turns[this.props.entireRound - 1] === 1) {
            numbers[3] = this.answer;
        } else {
            numbers[Math.floor(Math.random() * 4)] = this.answer;
        }
        this.setState({randomOptions: numbers})

        this.hinttimer = setInterval(function () {
            this.setState({ hintTimer: this.state.hintTimer - 1, });
            if (this.state.hintTimer === 0) {
                clearInterval(this.hinttimer);
                this.props.changeMode(4);
            }
        }.bind(this), 1000);
        //if the player is guessing, using random selectcard
        (this.props.turns[this.props.entireRound - 1] === 1) ? this.test_selectCard() : this.random_selectCard();
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
  
        for(let j = 0; j < 4; j++){
            let players = cards[j].classList;
            if(cards[j].innerHTML === this.answer) {
                if (players.contains("plyr1")) this.props.addHintSelected({ hintSelectionRight: true, answerSelected: cards[j].innerHTML});
                this.rightAnswer(players);
            } else {
                if (players.contains("plyr1")) this.props.addHintSelected({ hintSelectionRight: false, answerSelected: cards[j].innerHTML});
            }
        
        }
    }
    rightAnswer(playersSelectCurCard) {
        for(let i = 1; i < playersSelectCurCard.length; i++) {
            let player =  parseInt(playersSelectCurCard[i].charAt(playersSelectCurCard[i].length - 1));
            
            this.score[player - 1][1] += 15;
            if (playersSelectCurCard < 3) {
                this.score[player - 1][1] += 5;
            } 
            this.props.setScore(this.score);
            this.setState({ disable: true, inputOpcity: .5 });
            window.setTimeout(function () { this.props.changeMode(4); }.bind(this), 300);
        }
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
            cards[3].classList.add("plyr3");
            this.setState({ animation: "" });
            clearInterval(this.hinttimer);
            window.setTimeout(function () {
                this.setState({ result: true });
                this.rightAnswer(cards[3].classList);
                
            }.bind(this), 3000)
        }.bind(this), 3000);
    }
    //player 2 or 3 randomly selects cards for the 2nd, 3rd round
    random_selectCard() {
        let cards = document.getElementsByClassName("hintCard");
        let ranNum = Math.floor(Math.random() * 4);
        let fakePlayers = [2, 3];
        let randPlayer =  fakePlayers[Math.floor(Math.random() * fakePlayers.length)];
        cards = cards[ranNum]
        //if player already selected the same card, add class name of plyr1+corresponding player
        window.setTimeout(function(){
            cards.classList.add("plyr" + randPlayer);
            this.state.ranSelected ? this.stopTimer() : this.setState({ ranSelected: 1 });
        }.bind(this), 3000);
      
    }
    selectCard(ev) {
        if (this.state.selectable === "active") {
          ev.target.classList.add("plyr1");
          this.setState({ selectable: " " })
        }
        this.state.ranSelected ? this.stopTimer() : this.setState({ ranSelected: 1 });
    }

    hintGenerator() {
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
                <div className="hintCard" onClick={this.selectCard.bind(this)}>{this.state.randomOptions[3]}</div>
            </div>
        </div>
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
