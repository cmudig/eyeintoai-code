import React, { Component } from 'react';

import './App.css';

class Hint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintTimer: 10,
            animation: "active",
            result: false,
        }
        this.answer = this.props.answer.classLabels[0];
        this.hinttimer = "";
        this.round = this.props.round;
        this.score = this.props.score;
    }
    componentWillUnmount() {
        clearInterval(this.hinttimer);
        this.props.changeMode(4);
    }
    hintRound() {
        let time;
        this.hinttimer = window.setInterval(function () {
            time = this.state.hintTimer - 1;
            if (time === 9) {
                window.setTimeout(function () { this.test_selectCard() }.bind(this), 1000);
            }
            this.setState({ hintTimer: time, });
            if (time === 0) {
                this.props.changeMode(4);
            }

        }.bind(this), 1000);

    }
    //select card for the first round
    test_selectCard() {
        let cards = document.getElementsByClassName("hintCard");

        let time = 0;
        if (this.props.entireRound < 2) {
            window.setTimeout(function () {
                cards[3].classList.add("plyr2");
            }.bind(this), 2000);
            time = 3000
        } else {
            time = 7000
        }
        window.setTimeout(function () {
            cards[1].classList.add("plyr3");
            this.setState({ animation: "" });

            window.setTimeout(function () {
                this.setState({ result: true });
                this.score[1][1] += 10;
                this.score[2][1] += 10;
                this.props.setScore(this.score);
                this.props.changeMode(4);
            }.bind(this), 3000)
        }.bind(this), time);


    }
    selectCard(ev) {
        let cards = document.getElementsByClassName("hintCard");

        if (ev.target.classList.contains("active")) {
            ev.target.classList.add("plyr1");
        }
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("active");
        }
    }
    hintGenerator() {
        if (this.state.result === false) {
            let answer = this.answer[0].toUpperCase() + this.answer.slice(1);
            return <div>Last chance!<br />
                Select the answer
                <div id="hintTimer" key="hintTimer"> <svg width="90" height="90"><circle className={this.state.animation} key="timeAnim" r="30" cx="35" cy="35" /></svg>{this.state.hintTimer}</div>
                <div className="hintWrapper">
                    <div className="hintCard">Armadillo</div>
                    <div className="hintCard">Potato</div>
                    <div className="hintCard">Beetles</div>
                    <div className="hintCard">{answer}</div>
                </div>
            </div>

        }
    }
    componentDidMount() {
        this.hintRound();
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
