import React, { Component } from 'react';
import './index.scss';

import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [{
                img: profile1,
                name: "Player 1",
                score: 0,
                effect: "",
            },
            {
                img: profile2,
                name: "Qian",
                score: 0,
                effect: "",
            },
            {
                img: profile3,
                name: "John",
                score: 0,
                effect: "",
            }],
            score: this.props.score,
            counter: [0, 0, 0],
        }
    }
    componentDidMount() {

        if (this.props.wait) {
            this.setState({
                players: [{
                    img: profile1,
                    name: "Player 1",
                    score: 0,
                    effect: "",
                },
                {
                    img: profile2,
                    name: "Qian",
                    score: 0,
                    effect: "",
                },
                {
                    img: profile3,
                    name: "John",
                    score: 0,
                    effect: "wait",
                }]
            })
            window.setTimeout(function () {
                this.props.movetoNext(4);
            }.bind(this), 3000)
        }
        if(this.props.countScore){
            this.countScore()
        }
        if(this.props.score){
            this.setState({score: this.props.score})
        }
       
    }
    countScore() {
        for (let i = 0; i < 3; i++) {
            if (this.state.score[i][0] !== this.state.score[i][1]) {
                let addScore = window.setInterval(function () {
                    let scoreCopy = this.state.score;
                    let counterCopy = this.state.counter;
                    if (scoreCopy[i][0] !== scoreCopy[i][1]) {
                        scoreCopy[i][0] += 1;
                        counterCopy[i] += 1;
                        this.setState({score: scoreCopy, counter: counterCopy })
                    } else{
                        window.clearInterval(addScore);
                        this.props.setScore(this.state.score);
                        
                    }
                }.bind(this), 100)

            }
        }
    }
    generateProfiles() {
        let element = []
        for (let i = 0; i < 3; i++) {
            if (this.state.score) {
                element.push(
                    <div className={"mainGame profile plyr" + (i + 1)}>

                        <div className="photo " >
                            <img src={this.state.players[i].img} alt={"profile" + (i + 1)} />
                        </div>
                        <div className="name">
                            {this.state.players[i].name}
                        </div>
                        <div id={"plyr" + (i + 1) + "_score"} className={"score plyr" + (i + 1)}>{this.state.score[i][0]}</div>
                    </div>)
            }
            else if (this.state.players[i].effect == "wait") {

                element.push(
                    <div className={"profile wait plyr" + (i + 1)}>
                        <div className="playerNum">
                            Player {i}
                        </div>
                        <div className="photo " >
                            <img src={this.state.players[i].img} alt={"profile" + (i + 1)} />
                        </div>
                        <div className="name">
                            {this.state.players[i].name}
                        </div>
                    </div>)
            } else {

                element.push(
                    <div className={"profile plyr" + (i + 1)}>
                        <div className="playerNum">
                            Player {i}
                        </div>
                        <div className="photo " >
                            <img src={this.state.players[i].img} alt={"profile" + (i + 1)} />
                        </div>
                        <div className="name">
                            {this.state.players[i].name}
                        </div>
                    </div>
                )
            }
        }
        return element;
    }
    render() {
        return (

            <div className="profileWrapper">
                <div className="profiles">
                    {this.generateProfiles()}
                </div>
            </div>
        );
    }
}

export default Profile;
