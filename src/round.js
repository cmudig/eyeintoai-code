import React, { Component } from 'react';
import './App.css';
import profile1 from './image/profile/profile1.png'
import profile2 from './image/profile/profile2.png'
import profile3 from './image/profile/profile3.png'

class Round extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
    }
    this.round = this.props.round
  }
  renderContent(){
    switch(this.state.mode){
      case 0 : window.setTimeout(function(){this.setState({mode: 1})}.bind(this), 3000)
      return <div className = "title round">Round {this.props.round}</div>;
      case 1: return this.renderProfile()
    }
  }
  renderProfile(){
    switch(this.round){
        case 1: return  <div className = "profiles">
        <div className = "profile">
            <div className = "photo plyr1" >
              <img src= {profile1} alt="profile1"/>
            </div>
            <div className = "name">
                Player 1
            </div>
        </div>
        <div className = "expla">selects an image</div>
      </div>
      case 2: return  <div className = "profiles">
      <div className = "profile">
          <div className = "photo plyr2" >
            <img src= {profile2} alt="profile2"/>
          </div>
          <div className = "name">
              Qian
          </div>
      </div>
      <div className = "expla">selects an image</div>
    </div>
    case 3: return  <div className = "profiles">
    <div className = "profile">
        <div className = "photo plyr3" >
          <img src= {profile3} alt="profile3"/>
        </div>
        <div className = "name">
            Young
        </div>
    </div>
    <div className = "expla">selects an image</div>
  </div>
    }
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
          <div className = "main vertCenter">
          <div className = "matching" >
            
           {this.renderContent()}
          </div>
        </div>
       
      </div>
    );
  }
}

export default Round;
