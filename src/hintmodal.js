import React, { Component } from 'react';
import './App.css';


import Score from './score.js'

class Hint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintTimer: 3,
            hint: "",
            animation: "active",
            result: false,
        }
        this.answer = this.props.answer;
        this.hinttimer = "";
        this.round = this.props.round;
}

hintRound(){
    let hint;
    //answer
    switch(this.answer){
        case "sea lion": hint = "type of animal";
        break;
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
    case "balloon": 
    case "umbrella": hint="type of object";
        break;
    default:
    }
    this.setState({hint: hint});  
    if(this.round === 12){
        this.setState({hintTimer: 10});
        this.props.turnInput(10000);
    } else{
        this.props.turnInput(3000);
    }
    let time;
  
    this.hinttimer = window.setInterval(function () {
        time = this.state.hintTimer - 1;
        if(time === 9){
            window.setTimeout(function(){this.test_selectCard()}.bind(this), 1000);
        }
        this.setState({ hintTimer : time, });
        if (time === 0) {
            clearInterval(this.hinttimer);
            this.props.changeMode(0);
            this.props.setTimer();
            this.props.changeHint(this.state.hint)
            this.props.turnHintDisplay();
        }
        
    }.bind(this), 1000);
    
}
hintTimer(){
//timer
let time = this.state.hintTimer;
this.setState({ hintTimer : time, });
this.hinttimer = window.setInterval(function () {
    time -= 1;
    this.setState({ hintTimer : time, });
    if (time === 0) {
        clearInterval(this.hinttimer);
        this.props.changeMode(0);
        this.props.setTimer();
    }
    
}.bind(this), 1000);
window.setTimeout(function(){this.test_selectCard()}.bind(this), 1000);
}
test_selectCard(){
    let cards = document.getElementsByClassName("hintCard");

    window.setTimeout(function(){
        cards[1].classList.add("plyr2");
    }.bind(this),2000);

    window.setTimeout(function(){
        cards[3].classList.add("plyr3");
        clearInterval(this.hinttimer);
        this.setState({animation: ""});
        window.setTimeout(function(){this.setState({result: true}); this.round += 1; this.props.addRound()}.bind(this), 3000)
        // document.getElementsByTagName("circle")[0].style.animation = "none"
    }.bind(this),3000)

}
hintGenerator(){
    
    if(this.round<12){
        return <div>
        <div><span className="hinttop">It's a</span><br />
        {this.state.hint} </div>
        <div id="hintTimer" key="hintTimer"> <svg width="150" height="120"><circle className = {this.state.animation} key = "timeAnim" r="54" cx="60" cy="60" /></svg>{this.state.hintTimer}</div>
        </div>
    } else{
        
        if(this.state.result === false){
        let answer = this.answer[0].toUpperCase() + this.answer.slice(1,);
        return <div>Select the answer<br />
        <div className = "hintWrapper">
            <div className = "hintCard">Armadillo</div> 
            <div className = "hintCard">Potato</div>
            <div className = "hintCard">Beetles</div>
            <div className = "hintCard">{answer}</div>
        </div>
        <div id="hintTimer" key="hintTimer"> <svg width="150" height="120"><circle className = {this.state.animation} key = "timeAnim" r="54" cx="60" cy="60" /></svg>{this.state.hintTimer}</div>
        </div>
        } else{
            return <Score image = {this.props.image} answer = {this.answer} score = {[{name: "Player 1",
                                                                    color: "#F2A900",
                                                                    score: "10"}, 
                                                                    {name: "Young",
                                                                    color: "#002D72",
                                                                    score: "10"},]} />
        }
    }
}
    componentDidMount() {
    this.hintRound();
    }
   
    render() {

        return (
            <div id="hint" key = "hint">
                {this.hintGenerator()}
            </div>

        );
    }
}

export default Hint;
