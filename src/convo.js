import React, { Component } from 'react';
import './index.scss';

import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'



class Convo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generateAnswer: [],
            time: 1,
            opacity: 1,
            convo: [],
           
        }
        this.answers = ["wolf", "bug", "dog", "cat", "fur", "cotton", "fabric", "web", "spider", "fox", "rubber", "mouse", "flower", "polar bear", "vase", "plant", "mint", "daisy", "mouse", "glass", "cosmos", "space", "blanket", "monkey", "otter", "goose", "lion", "bird", "peacock", "sky", "ceramic", "cotton", "linen"];
        this.profile = [profile1, profile2, profile3]
        this.hintAnswer = ["strawberry", "jellyfish", "flamingo", "castle", "umbrella", "ladybug", "balloon", "peacock"];
        this.convo = [];
        this.answer = this.props.answer;
        this.score = this.props.score;
    }
    componentDidMount() {
        if (this.props.typemode === 0) {
            this.setState({ opacity: 1 })
        }
        this.convoGenerate()

    }
    componentWillUnmount() {
        clearInterval(this.convo);
    }
    addAnswer(){
        let tanswer = document.getElementById("answerType");
        let answers = [tanswer.value];
        if(tanswer.value === this.answer){
           this.rightAnswer()
        }
        let element = this.state.generateAnswer;
        element.push(<div>
            <div className="convoWrap" key={"convo" + element.length}>
                <div className={"bubble plyr1"} key={"convoBubble" + element.length}>
                    {answers}
                </div>
                <div className="profile" key={"profile" + element.length}>
                    <img src={profile1} className="photo " key={"profileImage" + element.length} />
                </div>
            </div>
        </div>);
        this.setState({ generateAnswer: element });

        let convoBox = document.getElementsByClassName("convo_inner")[0];
        if (convoBox) {
            convoBox.scrollTop = convoBox.scrollHeight - convoBox.clientHeight;
        }
        this.setState({ time: (this.state.time * 1) + 1 });
    tanswer.value = "";
    }
    rightAnswer(){
        window.clearInterval(this.timer);
        this.score[0][1] += 10;
        this.props.setScore(this.score);
        window.setTimeout(function(){this.setState({ disable: true, inputOpcity: .5});  this.props.changeMode(4);}.bind(this),300);
    }
    generateAnswer1() {
        let answer1 = [];
        let length = this.state.answer1.length - 1;

        for (let i = 0; i < 3; i++) {
            if (this.state.answer1[length - i]) {
                answer1.push(<div className="answer plyr2" key={"answer" + i}> {this.state.answer1[length - i]} </div>);
            }
        }
        return <div className="answers">
            {answer1}
        </div>

    }

    convoGenerate() {
        let date = "";
        let answer = this.answers
        this.setState({ opacity: 1 });
        this.convo = setInterval(function () {
            if (this.state.time > 4) {
                this.setState({ opacity: 0 });
                let element = this.state.convo;
                element.push(this.state.generateAnswer);
                this.setState({ convo: element });
                this.props.saveAnswers(this.state.convo);
            }
            date = new Date();
            let answers = answer[(date.getSeconds() * date.getSeconds()) % answer.length]
            let player = ((date.getSeconds() * date.getSeconds()) % 2) + 1;
            let element = this.state.generateAnswer;
            element.push(<div>
                <div className="convoWrap" key={"convo" + element.length}>
                    <div className={"bubble plyr" + (player + 1)} key={"convoBubble" + element.length}>
                        {answers}
                    </div>
                    <div className="profile" key={"profile" + element.length}>
                        <img src={this.profile[player]} className="photo " key={"profileImage" + element.length} />
                    </div>
                </div>
            </div>);
            this.setState({ generateAnswer: element });
            let convoBox = document.getElementsByClassName("convo_inner")[0];
            if (convoBox) {
                convoBox.scrollTop = convoBox.scrollHeight - convoBox.clientHeight;
            }
            this.setState({ time: (this.state.time * 1) + 1 });
        }.bind(this), 4000)
    }
    renderInputBox() {
        if (this.props.typemode === 0) {
            return <div className="typing">
                <div className="bubble all">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
                <div className='profileWrap'>
                    <div className="profile">
                        <img src={this.profile[0]} className="photo " />
                    </div>
                    <div className="profile">
                        <img src={this.profile[1]} className="photo " />
                    </div>
                    <div className="profile">
                        <img src={this.profile[2]} className="photo " />
                    </div>
                </div>
            </div>
        } else {
            return <div id="tAnsrWrap">
                <input type="text" id="answerType" style={{ opacity: this.state.inputOpcity }} disabled={this.state.disable} autoFocus onKeyPress={(ev) => {
                    if (ev.key === "Enter") { this.addAnswer() }
                }} />
                <div className="submit btn" onClick={this.addAnswer.bind(this)} style={{ opacity: this.state.inputOpcity }}>
                    Enter
            </div>
            </div>
        }
    }
    render() {

        return (

            <div>
                <div className="convo_inner">
                    {this.state.generateAnswer}
                </div>
                {this.renderInputBox()}
            </div>
        )

    }
}

export default Convo;
