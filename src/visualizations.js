import React, { Component } from 'react';
import './App.css';

const vis = [];
for(let i = 0; i < 484; i++){
    vis[i] = require('./image/mixed4d/'+ (i) +'.png')
}

class Vis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            nonSelected: [],
            round: this.props.round,
            display: "none",
        }
        this.answer = this.props.answer;
         }
    componentDidMount() {
        this.setState({ opacity: 1 });
       this.nonSelectedVis()
    }
    nonSelectedVis(){
        let vislist = [];
        for(let i = 0; i < 8;  i++){
            vislist.push(vis[this.answer.correctURLs[i]]);
        }
        for(let i = 0; i < 2;  i++){
            vislist.push( vis[this.answer.wrongVizURLs[i]]);
        }
        this.setState({ nonSelected: vislist });
    }
    selectVis(list, item, number) {
        //select 4 vis
        let selected = this.state.selected;

        if (list.contains("selected")) {
            for (let i = 0; i < selected.length; i++) {
                if (selected[i].number === number) {
                    selected.splice(i, 1);
                }
                document.getElementById("order" + number).classList.remove("active");
            }
            this.setState({ display: "none" })
        } else {
                if(this.state.selected.length < 4){
                document.getElementById("order" + number).classList.add("active");
                selected.push({ image: item, number: number });
                if (selected.length === 4) {
                    this.setState({ display: "block" })
                }
            
            this.setState({ selected: selected })
        }
        }
    }
    //Render selected order
    returnIndex(img) {
        if (this.state.selected) {
            for (let i = 0; i < this.state.selected.length; i++) {
                if (this.state.selected[i].image === img) {
                    return (i + 1)
                }
            }
        }
    }
    sendHint() {
        let hints = [];
        let hinturls = [];
        for (let i = 0; i < this.state.selected.length; i++) {
            hints.push(this.state.selected[i].image);
            hinturls.push(this.state.selected[i].number);
        }
        this.props.setHint(hints);
        this.props.setHintVisUrl(hinturls);

    }
    renderVis() {
        let element1 = [];
        let imglist = this.state.nonSelected.concat(this.state.selected);

        for (let i = 0; i < 10; i++) {
            element1.push(
                <div key={"vis" + i}>
                    <div className="order" id={"order" + i}>{this.returnIndex(imglist[i])}</div>
                    <img src={imglist[i]} className="active" alt={this.answer.classLabels[0] + " visualization " + (i + 1)} key={this.answer.classLabels[0] + " visualization " + (i + 1)} onClick={(ev) => { this.selectVis(ev.target.classList, imglist[i], i); if(this.state.selected.length < 5){(ev.target.classList.contains("selected")) ? ev.target.classList.remove("selected") : ev.target.classList.add("selected") }}} />
                </div>)
        }
        return (<div className="vis-row">
            {element1}
        </div>)
    }
    render() {

        return (
            <div className="modal-select" >
                <img src={this.props.answer.url} id="answerImg" alt = "answer"/>
                <div className="title"><span style={{ fontSize: "24px", lineHeight: "2" }}>
                    Make other players guess the image!</span><br />
                    Select 4 feature visualizations
            of the {this.props.answer.classLabels[0]} for hints</div>
                <div className="timer" key="timer">
                    <div className="timer_in" key="timer_in" style={{ width: this.state.timerWidth }} > <div className="timer_highlight" />
                        <div className="counter"></div>
                    </div>
                </div>
                {this.renderVis()}
                <div className="btn" style={{ width: "216px", margin: "32px auto 0", display: this.state.display }} onClick={(ev) => { this.sendHint(); this.props.movetoNext(4) }}>Start the Game</div>
            </div>

        );
    }
}

export default Vis;
