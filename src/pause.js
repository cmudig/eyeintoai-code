import React, { Component } from 'react';
import './App.css';

class Pause extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pauseTimer: 3,
            animation: "active",
            result: false,
        }
        this.answer = this.props.answer;
        this.pauseTimer = "";
        this.round = this.props.round;
        this.score = [
            [{
                name: "Player 1",
                color: "#F2A900",
                score: "10"
            },
            {
                name: "Qian",
                color: "#01843D",
                score: "10"
            }],
            [{
                name: "Qian",
                color: "#01843D",
                score: "10"
            },
            {
                name: "Player 1",
                color: "#F2A900",
                score: "10"
            }]
        ]
    }

    hintRound() {
        let time;

        this.pauseTimer = window.setInterval(function () {
            time = this.state.pauseTimer - 1;
            if (time === 9) {
                window.setTimeout(function () { this.test_selectCard() }.bind(this), 1000);
            }
            this.setState({ pauseTimer: time, });
            if (time === 0) {
               this.props.setTimer();
               this.props.changeMode(0);
               window.clearInterval(this.pauseTimer);
            }

        }.bind(this), 1000);

    }
    //select card for the first round

    hintGenerator() {
        return <div>
            Ready to guess!
                <div id="pauseTimer" key="pauseTimer"> <svg width="150" height="120"><circle className={this.state.animation} key="timeAnim" r="54" cx="60" cy="60" /></svg>{this.state.pauseTimer}</div>
        </div>
    }
    componentDidMount() {
        this.hintRound();
    }

    render() {

        return (
            <div id="pause" key="pause">
                {this.hintGenerator()}
            </div>

        );
    }
}

export default Pause;
