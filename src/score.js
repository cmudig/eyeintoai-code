import React, { Component } from 'react';
import './App.css';
import Profile from './profile.js'
import * as firebase from 'firebase';
import Setup from './firebase'

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: "active",
            result: false,
            score: this.props.score,
        }
        this.answer = this.props.answer;
    }
    componentWillMount(){
        Setup();
        console.log(this.props.answerSet)
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
                <img src={this.props.hintVis[i]} alt={"vis" + i} key={"Scorevis" + i} /></div>)
        }
        return element;
    }
    componentDidMount() {
        const db = firebase.firestore();

        if(this.props.round < 3){
            window.setTimeout(function(){this.props.addRound()}.bind(this), 10000);
        }
        if(this.props.round === 1){
        this.setState({score: this.props.score});

        let urls = [];
        for(let i = 0; i< 4; i ++){
            if(this.props.hintVisUrl[i] > 7){
                urls.push(this.props.answer.wrongVizURLs[this.props.hintVisUrl[i] - 8])
            } else{
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
                <div className="side" style={{ marginRight: "60px" }}>
                    <img id="asrImg" src={this.answer.url} alt="Answer"/>
                    <div className="score_visWrap">
                        {this.generateVis()}
                    </div>
                    The answer is <span className="asrColr">{this.answer.classLabels[0]}</span>!
                </div>
                <div className="side">
                    <Profile score={this.props.score} countScore = {true} setScore = {this.props.setScore.bind(this)} players  = {this.props.players}/>
                    <div className = "answerWrapMsg">
                    See what other players thought
                    </div>
                    <div className="inputAnswerWrap">
                        <div className="convo" key="convo">
                            <div className="convo_inner" style ={{maxHeight: "190px"}}>
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
