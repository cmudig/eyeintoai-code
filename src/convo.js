import React, { Component } from 'react';
import './index.scss';

class Convo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generateAnswer: [],
            time: 1,
            opacity: 1,
            convo: [],
            typedAnswer: [],

        }
        this.answers = ["wolf", "bug", "dog", "cat", "fur", "cotton", "fabric", "web", "spider", "fox", "rubber", "mouse", "flower", "polar bear", "vase", "plant", "mint", "daisy", "mouse", "glass", "cosmos", "space", "blanket", "monkey", "otter", "goose", "lion", "bird", "peacock", "sky", "ceramic", "cotton", "linen"];
        this.hintAnswer_animal = ["poodle", "alphaca", "lama", "snake", "spider", "cat", "parrot", "jellyfish", "otter", "frog", "bee", "butterfly", "shark", "turtle", "tiger", "bear", "deer", "mouse", "hamster"];
        this.hintAnswer_object = ["acorn", "plum", "bottle", "balloon", "confetti", "toaster", "camera", "socks", "strawberry", "castle", "train", "soccer ball", "vacuum", "spoon", "desk", "bed", "corn", "pumpkin", "candy"]
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
        this.props.saveAnswers(this.state.typedElement, this.state.generateAnswer);
        clearInterval(this.convo);
    }
    addAnswer() {
        let tanswer = document.getElementById("answerType");
        let answers = [tanswer.value];
        if (this.answer.includes(tanswer.value)) {
            this.rightAnswer()
        }
        let element = this.state.generateAnswer;
        let typedElement = this.state.typedAnswer;
        typedElement.push(answers);
        element.push(<div>
            <div className="convoWrap" key={"convo" + element.length}>
                <div className={"bubble plyr1"} key={"convoBubble" + element.length}>
                    {answers}
                </div>
                <div className="profile" key={"profile" + element.length}>
                    <i className={this.props.players[0]}></i>
                </div>
            </div>
        </div>);
        this.setState({ generateAnswer: element, typedAnswer: typedElement });

        let convoBox = document.getElementsByClassName("convo_inner")[0];
        if (convoBox) {
            convoBox.scrollTop = convoBox.scrollHeight - convoBox.clientHeight;
        }
        this.setState({ time: (this.state.time * 1) + 1 });
        tanswer.value = "";
    }
    rightAnswer() {
        window.clearInterval(this.timer);
        this.score[0][1] += 10;
        this.props.setScore(this.score);
        window.setTimeout(function () { this.setState({ disable: true, inputOpcity: .5 }); this.props.changeMode(4); }.bind(this), 300);
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
        let answer;
        if (this.props.hintMode === true) {
            if (this.hintAnswer_animal.includes(this.props.answer.classLabels[0])) {
                answer = this.hintAnswer_animal;
            } else {
                answer = this.hintAnswer_object;
            }
        } else {
            answer = this.answers;
        }
        let answers, player, element;
        switch (this.props.entireRound) {
            case 2: player = 2; break;
            case 3: player = 1; break;
            default:
        }
        this.setState({ opacity: 1 });
        this.convo = setInterval(function () {
            if (this.state.time > 4) {
                this.setState({ opacity: 0 });
                let element = this.state.convo;
                element.push(this.state.generateAnswer);
                this.setState({ convo: element });
                this.props.saveAnswers(this.state.convo);
            }
            answers = answer[Math.floor(Math.random() * answer.length)]
            element = this.state.generateAnswer;
            if (this.props.entireRound === 1) {
                player = (Math.floor(Math.random() * 2)) + 1;
            } 
            element.push(<div key={"convoWarp"  + element.length}>
                <div className="convoWrap" key={"convo" + element.length}>
                    <div className={"bubble plyr" + (player + 1)} key={"convoBubble" + element.length}>
                        {answers}
                    </div>
                    <div className={"profile plyr" + (player + 1)} key={"profile" + element.length}>
                        <i className={this.props.players[player]}></i>
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
                    <div className="profile player3">
                        <i className={this.props.players[2]}></i>
                    </div>
                    <div className="profile player2">
                        <i className={this.props.players[1]}></i>       
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
