import React, { Component } from 'react';
import './App.css';


class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: "active",
            result: false,
        }
        this.answer = this.props.answer;
        this.image = this.props.image
        this.score = this.props.score;
}

scoreGenerator(){
    let element =[]
    for(let i = 0; i<this.score.length; i++){
        element.push(<div key={"score" + i}><span style={{color: this.score[i].color}}>{this.score[i].name}</span> got {this.score[i].score} points</div>)
    }

    return <div className="score">
       {element}
        </div>
        
}
componentDidMount(){
    if(this.props.round < 2){
        window.setTimeout(function(){this.props.addRound()}.bind(this), 5000);
    }
}
   
    render() {

        return (
            <div id="result" key = "result">
             <img id="asrImg" src = {this.image} />
            The answer is <span className = "asrColr">{this.answer}</span>!
                {this.scoreGenerator()}
            </div>

        );
    }
}

export default Score;
