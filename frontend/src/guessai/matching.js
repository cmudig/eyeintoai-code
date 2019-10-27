import React, { Component } from 'react';
import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'

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
      dotcount: 0,
      newUser_img: " ",
      newUser_name: " ",
      newUser_alt:" ",
    }
    this.dots= [".", "..","..."];
    this.anim = '';
  }
  addUser(){
    this.setState({newUser_alt : "player 3", newUser_img: profile3, newUser_name: "Player 3"})
  }
  componentDidMount(){
    window.setTimeout(function(){
      this.addUser()
    }.bind(this), 2000);
    this.renderDots()
  }
  componentWillUnmount(){
    window.clearInterval(this.anim);
  }
  renderDots(){
    this.anim = window.setInterval(function(){
      let dotcount = this.state.dotcount;
      if(dotcount < 2){
        this.setState({dotcount: dotcount + 1})
      } else{
        this.setState({dotcount:0})
      }
    
    }.bind(this), 1000);
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
          <div className = "main vertCenter">
          <div className = "matching" >
            <div className = "title">Finding players{this.dots[this.state.dotcount]}</div>
            <div className = "profiles">
            <div className = "profile plyr1">
                    <div className = "playerNum">
                      Player 1
                    </div>
                    <div className = "photo " >
                      <img src= {profile1} alt="profile1"/>
                    </div>
                    <div className = "name">
                        Player
                    </div>
                </div>
                <div className = "profile plyr2">
                    <div className = "playerNum">
                      Player 2
                    </div>
                    <div className = "photo " >
                      <img src= {profile2} alt="profile2"/>
                    </div>
                    <div className = "name">
                        Qian
                    </div>
                </div>
                <div className = "profile plyr3">
                <div className = "playerNum">
                      Player 3
                    </div>
                    <div className = "photo " >
                      <img src= {this.state.newUser_img} alt={this.state.newUser_alt}/>
                    </div>
                    <div className = "name">
                        {this.state.newUser_name}
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
