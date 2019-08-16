import React, { Component } from 'react';
import './App.css';

import Profile from './profile.js'

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: "active",
            result: false,
            score: this.props.score,
        }
        this.answer = this.props.answer;
        this.image = this.props.image;
    }

    scoreGenerator() {
        let element = []
        for (let i = 0; i < this.state.score.length; i++) {
            element.push(<div key={"score" + i}><span style={{ color: this.state.score[i].color }}>{this.state.score[i].name}</span> got {this.state.score[i].score} points</div>)
        }

        return <div className="score">
            {element}
        </div>

    }
    generateVis() {
        let element = [];
        for (let i = 0; i < 4; i++) {
            element.push(<div class="visWrapper">
                <img src={this.props.hints[i]} alt={"vis" + i} key={"Scorevis" + i} /></div>)
        }
        return element;
    }
    componentDidMount() {
        if(this.props.round < 3){
            window.setTimeout(function(){this.props.addRound()}.bind(this), 10000);
        }
        this.setState({score: this.props.score});
    }

    render() {

        return (
            <div id="result" key="result">
                <div className="side" style={{ marginRight: "60px" }}>
                    <img id="asrImg" src={this.image} />
                    <div className="score_visWrap">
                        {this.generateVis()}
                    </div>
                    The answer is <span className="asrColr">{this.answer}</span>!
                </div>
                <div className="side">
                    <Profile score={this.props.score} countScore = {true} setScore = {this.props.setScore.bind(this)} setScore = {this.props.setScore.bind(this)}/>
                    <div className = "answerWrapMsg">
                    See what other players thought
                    </div>
                    <div className="inputAnswerWrap">
                        <div className="convo" key="convo">
                            <div className="convo_inner">
                                {this.props.inputAnswers}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Score;
