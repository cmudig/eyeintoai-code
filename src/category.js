import React, { Component } from 'react';
import './App.css';

import ladybug from "./image/samples/ladybug.jpg"
import flamingo from "./image/samples/flamingo.jpg"
import hamster from "./image/samples/hamster.jpg"
import jellyfish from "./image/samples/jellyfish.jpg"

import strawberry from "./image/samples/strawberry.jpg"
import castle from "./image/samples/castle.jpg"
import balloon from "./image/samples/balloon.jpg"
import umbrella from "./image/samples/umbrella.jpg"


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
      imgType : '',
    }
    this.animals = [[ladybug, "ladybug"], [flamingo, "flamingo"], [hamster, "hamster"], [jellyfish, "jellyfish"]]
    this.objects = [[strawberry, "strawberry"], [castle, "castle"], [balloon, "balloon"], [umbrella, "umbrella"]]
  }

  displayContent(){
    let element =[]
    switch(this.state.questionNum){
      case 0: element=(<div className = "select-Category">
      <div className = "title">Select a category</div>
      <div className = "btn-row">
          <div className = "btn" onClick={(ev)=>{this.setState({questionNum:1, imgType: "animals"})}}>Animals</div>
          <div className = "btn" onClick={(ev)=>{this.setState({questionNum:1, imgType: "objects"})}}>Objects</div>
          <div className = "btn" onClick={(ev)=>{this.setState({questionNum:1, imgType: "random"})}}>Random</div>
      </div>
  </div>);
  break;
      case 1: element=[(this.displayImg())];
      break;
      default:
    }
return element;
  }
  displayImg(){
    let element = [];
    let images = [];
    if(this.state.imgType === "animals"){
      for(let i =0; i<4; i++){
        images.push( <img src= {this.animals[i][0]} alt={this.animals[i][1]} key={this.animals[i][1]} onClick={(ev)=>{this.props.setAnswer(this.animals[i][1]); this.props.setImage(this.animals[i][0]); this.props.movetoNext(2)}} />)
      }
      element = <div className = "select-Category" key="selectCategory">
      <div className = "title">Select an image</div>
          <div className = "photo-row">
             {images}
          </div>
      </div>
    } else if(this.state.imgType === "objects"){
      for(let i =0; i<4; i++){
        images.push( <img src= {this.objects[i][0]} alt={this.objects[i][1]} key={this.objects[i][1]} onClick={(ev)=>{this.props.setAnswer(this.objects[i][1]); this.props.setImage(this.objects[i][0]); this.props.movetoNext(2)}} />)
      }
      element = <div className = "select-Category" key="select-category">
      <div className = "title">Select an image</div>
          <div className = "photo-row">
              {images}
          </div>
      </div>
    } else {
      this.props.setAnswer(this.objects[0][1]);
      this.props.setImage(this.objects[0][0]);
      this.props.movetoNext(2);
    };
    return element;
  }

  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }} key="Category">
        <div className="main vertCenter">
          {this.displayContent()}
        </div>
      </div>
    );
  }
}

export default Category;
