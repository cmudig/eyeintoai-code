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
        this.hinttimer = "";
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
    if(time > 9){
        window.setTimeout(function(){this.test_selectCard()}.bind(this), 1000);
    }
    this.hinttimer = window.setInterval(function () {
        time -= 1;
        this.setState({ hintTimer : time, });
        if (time === 0) {
            clearInterval(this.hinttimer);
            this.props.changeMode(0);
            this.props.setTimer();
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
        // document.getElementsByTagName("circle")[0].style.animation = "none"
    }.bind(this),3000)

}
hintGenerator(){
    
    if(this.props.round<12){
        return <div><span className="hinttop">It's a</span><br />
        {this.state.hint} </div>
    } else{
        let answer = this.answer[0].toUpperCase() + this.answer.slice(1,);
        return <div>Select the answer<br />
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
