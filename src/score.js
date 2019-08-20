import React, { Component } from 'react';
import './App.css';
import Profile from './profile.js'

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 10,
            animation: "active",
            result: false,
            score: this.props.score,
            timerOn : "block",
        }
        this.answer = this.props.answer;
        this.timer = '';
    }
    generateVis() {
        let element = [];
        for (let i = 0; i < 4; i++) {
            element.push(<div className="visWrapper">
                <img src={this.props.hintVis[i]} alt={"vis" + i} key={"Scorevis" + i} /></div>)
        }
        return element;
    }
    changeMode(){
        clearInterval(this.timer);
        this.setState({animation: "none"})
        if (this.props.round < 3) {this.props.addRound();}
    }
    componentDidMount() {
        // const db = firebase.firestore();
        if(this.props.round < 3){
        this.timer = setInterval(function () {
            this.setState({ timer: this.state.timer - 1, });
            if (this.state.timer === 0) {
                this.changeMode()
            }
        }.bind(this), 1000);
    } else{
        this.setState({timerOn: "none"})
    }

        if (this.props.round === 1) {
            let urls = [];
            for (let i = 0; i < 4; i++) {
                if (this.props.hintVisUrl[i] > 7) {
                    urls.push(this.props.answer.wrongVizURLs[this.props.hintVisUrl[i] - 8])
                } else {
                    urls.push(this.props.answer.correctURLs[this.props.hintVisUrl[i]])
                }
            }
        
            // db.collection('games').doc().set({
            //     originalImage: this.props.answer.url,
            //     selectedViz: this.props.hintVisUrl,
            // })
            // .then(function(docRef) {
            //     console.log("Document written with ID: ", docRef.id);
            // })
            // .catch(function(error) {
            //     console.error("Error adding document: ", error);
            // });

        }
    }

    render() {
        return (
            <div id="result" key="result">
                <div className="scoreTimer" style={{display: this.state.timerOn}}>
                    <div id="scoreTimer" key="scoreTimer"> 
                        <svg>
                        <circle key="timeAnimScore" r="16" cx="25" cy="25" />
                        <circle className={this.state.animation} key="timeAnimScore2"  r="16" cx="25" cy="25"  />
                    </svg>
                        <div className="seconds">
                            {this.state.timer}
                        </div>
                    </div>
                </div>
                <div className="side resultleft">
                    <img id="asrImg" src={this.answer.url} alt="Answer" />
                    <div className="score_visWrap">
                        {this.generateVis()}
                    </div>
                    The answer is <span className="asrColr">{this.answer.classLabels[0]}</span>!
                </div>
                <div className="side">
                    <Profile score={this.props.score} countScore={true} setScore={this.props.setScore.bind(this)} players={this.props.players} />
                    <div className="answerWrapMsg">
                        See what other players thought
                    </div>
                    <div className="inputAnswerWrap">
                        <div className="convo" key="convo">
                            <div className="convo_inner" style={{ maxHeight: "190px" }}>
                                {this.props.answerSet}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Score;
