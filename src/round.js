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
      return <div className = "title round">Round {this.props.round}</div>;
  }
  componentDidMount(){
    window.setTimeout(function(){
      this.props.movetoNext(3)
    }.bind(this), 3000)
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
