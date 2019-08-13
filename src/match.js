import React, { Component } from 'react';
import './App.css';

import ladybug from "./image/samples/ladybug.jpg"
import flamingo from "./image/samples/flamingo.jpg"
import hamster from "./image/samples/hamster.jpg"
import jellyfish from "./image/samples/jellyfish.jpg"


class extends Component {
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
    this.animals = [ladybug, flamingo, hamster, jellyfish]
  }
  render() {

    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
       
          <div className="left">
            <div id="cmu">CMU</div>
            <div className="title">Interpretable Machine Learning Research Project</div>
          </div>
            <div className = "select-Category">
                <div className = "title">Select a category</div>
                <div className = "btn-row">
                    <div className = "btn">Animals</div>
                    <div className = "btn">Objects</div>
                    <div className = "btn">Randon</div>
                </div>
            </div>
            <div className = "select-Category">
            <div className = "title">Select an image</div>
                
                <div className = "photo-row">
                    <img src= {this.animals[0]}/>
                    <img src= {this.animals[1]}/>
                    <img src= {this.animals[2]}/>
                    <img src= {this.animals[3]}/>
                </div>
            </div>

      </div>
    );
  }
}

export default Category;
