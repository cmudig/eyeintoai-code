import React, { Component } from 'react';
import _ from 'lodash'

const vis = [];
for(let i = 0; i < 484; i++){
    vis[i] = require('../image/mixed4d/'+ (i) +'.png')
}
//the player selecting feature vizs 
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
        //put entire viz of the image in the beginning
        let vislist = [];
        for(let i = 0; i < 8;  i++){
            vislist.push(vis[this.answer.correctURLs[i]]);
        }
        for(let i = 0; i < 2;  i++){
            vislist.push( vis[this.answer.wrongVizURLs[i]]);
        }
        this.setState({ nonSelected: vislist });
    }
    selectVis(list, item, number, target) {
        //select 4 vis
        let selected = this.state.selected;

        if (list.contains("selected")) {
            target.classList.remove("selected")
            for (let i = 0; i < selected.length; i++) {
                if (selected[i].number === number) {
                    selected.splice(i, 1);
                }
                document.getElementById("order" + number).classList.remove("active");
            }
            this.setState({ display: "none" })
        } else {
            if(this.state.selected.length < 4){
                target.classList.add("selected")
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
        this.props.getPlayerHint(hints, hinturls, this.props.answer);
    }
    renderVis() {
        let element1 = [];
        let imglist = this.state.nonSelected.concat(this.state.selected);

        for (let i = 0; i < 10; i++) {
            element1.push(
                <div key={"vis" + i}>
                    <div className="order" id={"order" + i}>{this.returnIndex(imglist[i])}</div>
                    <img src={imglist[i]} className="active" alt={this.answer.classLabels[0] + " visualization " + (i + 1)} key={this.answer.classLabels[0] + " visualization " + (i + 1)} onClick={(ev) => { this.selectVis(ev.target.classList, imglist[i], i, ev.target); }} />
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
                    Select the most representative 4 feature visualizations
            of the {this.props.answer.classLabels[0]} for hints</div>
                <div className="timer" key="timer">
                    <div className="timer_in" key="timer_in" style={{ width: this.state.timerWidth }} > <div className="timer_highlight" />
                        <div className="counter"></div>
                    </div>
                </div>
                {this.renderVis()}
                <div className="btn" style={{ width: "216px", margin: "32px auto 0", display: this.state.display }} onClick={(ev) => { 
                    let explanations = [];
                    for (let i = 0; i < this.state.selected.length; i++) {
                        explanations.push({featureID: _.get(this.state.selected, i).image, featureImportanceScore: 0, timeStamp: Date.now()});
                    }
                    this.sendHint();
                    this.props.update({ 'explain_round.explanations_chosen': explanations} );
                    this.props.movetoNext(4);
                }}>Start the Game</div>
            </div>

        );
    }
}

export default Vis;
