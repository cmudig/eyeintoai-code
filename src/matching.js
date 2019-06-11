import React, { Component } from 'react';
import './App.css';
import profile1 from './image/profile/profile2.png'
import profile2 from './image/profile/profile3.png'


class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasknum: 1,
      mode: 0,
      page: 0,
      answerClass: ["", "", "", ""],
      btnClass: "",
      btnactive: false,
      facenum: 0,
      headop: 1,
    }
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
          <div className = "main vertCenter">
          <div className = "matching" >
            <div className = "title">You’re matched with</div>
            <div className = "profiles">
                <div className = "profile">
                    <div className = "photo" >
                      <img src= {profile1} />
                    </div>
                    <div className = "name">
                        Qian
                    </div>
                </div>
                <div className = "profile">
                    <div className = "photo" >
                      <img src= {profile2} />
                    </div>
                    <div className = "name">
                        Young
                    </div>
                </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}

export default Match;
