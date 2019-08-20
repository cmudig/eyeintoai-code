import React, { Component } from 'react';
import './index.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [{
                img: <i className={this.props.players[0]}></i>,
                name: this.props.players[0].slice(7),
                score: 0,
            },
            {
                img: <i className={this.props.players[1]}></i>,
                name: this.props.players[1].slice(7),
                score: 0,
            },
            {
                img: <i className={this.props.players[2]}></i>,
                name: this.props.players[2].slice(7),
                score: 0,
            }],
            score: this.props.score,
            counter: [0, 0, 0],
            addscore: [],
        }
    }

    componentDidMount() {
      if (this.props.countScore) {
            window.setTimeout(this.countScore.bind(this), 500);
        }
        if (this.props.score) {
            this.setState({ score: this.props.score })
        }
        if (this.props.entireRound) {
            let players = this.state.players;
            players[this.props.entireRound - 1].name = <b>{players[this.props.entireRound - 1].name}</b>
            this.setState({ players: players })
        }
        if(this.props.wait)
        {
            let players =  [{
                img: <i className={this.props.players[0]}></i>,
                name: this.props.players[0].slice(7),
                score: 0,
            },
            {
                img: "",
                name: "",
                score: 0,
            },
            {
                img: "",
                name: "",
                score: 0,
            }];
            this.setState({players: players})

            window.setTimeout(function(){
                players[1] = {
                    img: <i className={this.props.players[1]}></i>,
                    name: this.props.players[1].slice(7),
                    score: 0,
                }
                this.setState({players: players});
                window.setTimeout(function(){
                    players[2] = {
                        img: <i className={this.props.players[2]}></i>,
                        name: this.props.players[2].slice(7),
                        score: 0,
                    }
                    this.setState({players: players});

                    window.setTimeout(function(){
                        this.props.movetoNext(1)
                    }.bind(this),1500)

                }.bind(this), 1000)
            }.bind(this), 700);
        }
    }
    countScore() {
        for (let i = 0; i < 3; i++) {
            if (this.state.score[i][0] !== this.state.score[i][1]) {
                this.addScore = setInterval(function () {
                    let scoreCopy = this.state.score;
                    let counterCopy = this.state.counter;
                    if (scoreCopy[i][0] !== scoreCopy[i][1]) {
                        scoreCopy[i][0] += 1;
                        counterCopy[i] += 1;
                        this.setState({ score: scoreCopy, counter: counterCopy })
                    } else {
                        clearInterval(this.addScore);
                        this.props.setScore(this.state.score);
                    }
                }.bind(this), 100)
            }
        }
    }
    componentWillUnmount(){
        clearInterval(this.addScore);
    }
    generateProfiles() {
        let element = []
        for (let i = 0; i < 3; i++) {
            if (this.state.score) {
                (i === this.props.entireRound - 1) ?
                    element.push(
                        <div className={"mainGame active profile plyr" + (i + 1)} key={"profile" + i}>

                            <div className="photo " >
                                {this.state.players[i].img}
                            </div>
                            <div className="name">
                                {this.state.players[i].name}
                            </div>
                            <div id={"plyr" + (i + 1) + "_score"} className={"score plyr" + (i + 1)}>{this.state.score[i][0]}</div>
                        </div>) : element.push(
                            <div className={"mainGame profile plyr" + (i + 1)} key={"profile" + i}>

                                <div className="photo " >
                                    {this.state.players[i].img}
                                </div>
                                <div className="name">
                                    {this.state.players[i].name}
                                </div>
                                <div id={"plyr" + (i + 1) + "_score"} className={"score plyr" + (i + 1)}>{this.state.score[i][0]}</div>
                            </div>)
            }
            else {
                element.push(
                    <div className={"profile plyr" + (i + 1)} key={"profile" + i}>
                        <div className="playerNum">
                            Player {i}
                        </div>
                        <div className="photo " >
                            {this.state.players[i].img}</div>
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
