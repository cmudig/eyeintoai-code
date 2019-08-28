import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './homePage.scss';
import './guessai/index.scss';
import Convo from './guessai/convo.js'
import step1 from './image/guessaihome/step1.png'
import step2 from './image/guessaihome/step2.png'
import step3 from './image/guessaihome/step3.png'

const vis = [];
for (let i = 0; i < 4; i++) {
  vis[i] = require('./image/mixed4d/' + (i + 1) + '.png')
}


class GAIHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderImgs() {
    let element = [];
    for (let i = 0; i < 10; i++) {
      element.push(<img src={vis[i]} />)
    }
    return element;
  }
  render() {
    return (
      <div className="home howto">
        <div className="sideWrapper">
          <div className="side left">
            <div className="main">
              <div className="side center">
                <div className="visDisplay" >
                  <div className="title">Guess the original image!</div>
                  <div className="hint" key="hints"><span className="title">Hint:</span> It's a type of  <span id="hintContent" key="hintcontent" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                  <div className="selected-vis" key="visDisplay">
                  <div>
                    <div className="visWrapper" key={"viswrapper0"}>
                      <img src={vis[0]} alt={"vis0"} key={"vis0"} /></div>
                      <div className="visWrapper" key={"viswrapper1"}>
                      <img src={vis[1]} alt={"vis1"} key={"vis1"} /></div>
                    </div>
                    <div>
                      <div className="visWrapper" key={"viswrapper2"}>
                      <img src={vis[2]} alt={"vis2"} key={"vis2"} /></div>
                      <div className="visWrapper" key={"viswrapper3"}>
                      <img src={vis[3]} alt={"vis3"} key={"vis3"} /></div>
                    </div>
                  </div>
                   </div>
              </div>
              <div className="side">
                <div className="convo">
                  <Convo mode="home" typemode={0} score={[[0, 0], [0, 0], [0, 0]]} answer={this.answer} players={["fas fa-otter", "fas fa-dragon", "fas fa-dove"]} hintMode={false} entireRound={2} key="convo" />
                </div>
              </div>
            </div>
          </div>
          <div className="side right">
            <div className="title">Guess AI</div>
            <div className="expla">
              Compete with other players on guessing what machine speaks.
              <div className="btnWrap">
                <div className="btn outline" onClick ={(ev) => {
                  let howto = document.getElementById("howto");
                  window.scrollTo({ top: howto.offsetTop, behavior: 'smooth' })
                }}>
                  How to Play?
                </div>
                <Link to="/guessai-play" key="btn1">
                <div className="btn">
                  Play Now &#9655;
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="howToWrapper">


          <div className="howto" id = "howto">
          <img src= {step1} id = "step1" /> 
            <div className="title">
              Step 1.<br />
              Select an image
              </div>
            <div className="expla">
              Select an image which you want other players to guess
            </div>
          </div>
          <div className="howto">
          <img src= {step2} id = "step2" /> 
            <div className="title">
              Step 2.<br />
              Select 4 feature visualizations
              </div>
            <div className="expla">
              Select 4 feature visualizations generated from the original image which will give ohter players hints of what the original image is.
            </div>
          </div>

          <div className="howto">
          <img src= {step3} id = "step3" /> 
            <div className="title">
              Step 3.<br />
              Make other players guess or guess
the original image.
              </div>
            <div className="expla">
              Take turns and make other players guess or guess what other people’s original image is.</div>
          </div>


        </div>
      </div>

    );
  }
}

export default GAIHome;
