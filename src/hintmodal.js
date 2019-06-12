import React, { Component } from 'react';
import './App.css';


class Hint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintTimer: 3,
            hint: "",
        }
        this.answer = this.props.answer;
}

hintRound(){
    let hint;
    //answer
    switch(this.answer){
        case "ladybug": hint="type of insect";
        break;
    case "flamingo": hint="type of bird";
        break;
    case "hamster": hint="type of mammal";
        break;
    case "jellyfish": hint="type of sea animal";
        break;
    case "strawberry": hint="type of fruit";
        break;
    case "castle": hint="type of building";
        break;
    case "balloon": hint="type of object";
    case "umbrella": 
        break;
    default:
    }
    this.setState({hint: hint});  
    let time;
    if(this.props.round < 12){
    time = this.state.hintTimer;
    } else{
        time = 10
    }   
    let hinttimer = window.setInterval(function () {
        time -= 1;
        this.setState({ hintTimer : time, });
        if (time === 0) {
            clearInterval(hinttimer);
            this.props.changeMode(0);
            this.props.setTimer();
        }
        
    }.bind(this), 1000);
}
hintTimer(){
//timer
let time = this.state.hintTimer;
this.setState({ hintTimer : time, });
let hinttimer = window.setInterval(function () {
    time -= 1;
    this.setState({ hintTimer : time, });
    if (time === 0) {
        clearInterval(hinttimer);
        this.props.changeMode(0);
        this.props.setTimer();
    }
    
}.bind(this), 1000);
}
hintGenerator(){
    
    if(this.props.round<12){
        return <div><span className="hinttop">It's a</span><br />
        {this.state.hint} </div>
    } else{
        let answer = this.answer[0].toUpperCase() + this.answer.slice(1, -1);
        return <div><span className="hinttop">Select the answer</span><br />
        <div className = "hintWrapper">
            <div className = "hintCard">Armadillo</div> 
            <div className = "hintCard">Potato</div>
            <div className = "hintCard">Beetles</div>
            <div className = "hintCard">{answer}</div>
        </div>
        </div>
    }
}
    componentDidMount() {
    this.hintRound();
    }
   
    render() {

        return (
            <div id="hint" key = "hint">
                {this.hintGenerator()}
                <div id="hintTimer" key="hintTimer"> <svg width="150" height="120"><circle r="54" cx="60" cy="60" /></svg>{this.state.hintTimer}</div>
            </div>

        );
    }
}

export default Hint;
