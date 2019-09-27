import React, { Component } from 'react';

import { StaticData } from './images'

const vis = [];
for(let i = 0; i < 484; i++){
    vis[i] = require('../image/mixed4d/'+ (i) +'.png')
}

class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
    }
    this.round = this.props.entireRound
    this.animals = StaticData.animal;
    this.objects = StaticData.object;
    this.turns = this.props.turns
  }

  renderContent() {
    let element = [];
    let curplayer = this.turns[this.round - 1];
    //current round's non-guessing player
     element.push(<div className={"profile plyr" + (curplayer)} key="roundProfile">
        <div className="photo " >
          <i className={this.props.players[curplayer - 1]} /></div>
        <div className="name">
        {this.props.players[curplayer - 1].slice(7)}
        </div>
      </div>)
       
    return <div key="roundInfo">
      <div className="title round">Round {this.props.round}</div>
      <div className="profiles">
        {element} selects an image
        </div>
    </div>
  }
  componentDidMount() {
    window.setTimeout(function () {
      this.props.movetoNext(3)
    }.bind(this), 5000)
    let curplayer = this.turns[this.round - 1];
    //if the player is guessing, randomly select the answer set
    if (curplayer !== 1) {
      let ranNum = (Math.floor(Math.random() * 2));
      let ranVisOrder = [0, 1, 2, 3, 4, 5, 6, 7];
      let ran1, ran2, ranTemp, answerSet, visSet;
      for (let i = 0; i < 10; i++) {
        ran1 = Math.floor(Math.random() * 8);
        ran2 = Math.floor(Math.random() * 8);

        ranTemp = ranVisOrder[ran1];
        ranVisOrder[ran1] = ranVisOrder[ran2]
        ranVisOrder[ran2] = ranTemp;
      }
      (ranNum % 2 === 0) ? answerSet = this.animals : answerSet = this.objects;
      let ranNumTemp = ran2
      while(this.props.answerRecord.includes(answerSet[ran2].classLabels[0])){
        ranNumTemp = (ran2 + 1) % 8;
      }
      visSet = answerSet[ranNumTemp].correctURLs.concat(answerSet[ranNumTemp].wrongVizURLs);
      this.props.setAnswer(answerSet[ranNumTemp]);
      this.props.setHint([vis[visSet[ranVisOrder[0]]], vis[visSet[ranVisOrder[1]]], vis[visSet[ranVisOrder[2]]], vis[visSet[ranVisOrder[3]]]]);
      this.props.setHintVisUrl([visSet[ranVisOrder[0]], visSet[ranVisOrder[1]],visSet[ranVisOrder[2]], visSet[ranVisOrder[3]]]);
    }
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
        <div className="main vertCenter">
          <div className="matching" >

            {this.renderContent()}
          </div>
        </div>

      </div>
    );
  }
}

export default Round;
