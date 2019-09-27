import React, { Component } from 'react';
import {StaticData} from './images'

//the player selecting the original image
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
      imgType: '',
      ranNum: 0,
    }
    this.animals = StaticData.animal;
    this.objects = StaticData.object;
  }
  componentDidMount(){
    let ranNum = [0, 1, 2, 3, 4, 5, 6, 7];
    let ran1, ran2, ranTemp;
    for (let i = 0; i < 20; i++) {
      ran1 = Math.floor(Math.random() * 8);
      ran2 = Math.floor(Math.random() * 8);

      ranTemp = ranNum[ran1];
      ranNum[ran1] = ranNum[ran2]
      ranNum[ran2] = ranTemp;
    }
    this.setState({ranNum : ranNum});
  }
  displayContent() {
    let element = []
    switch (this.state.questionNum) {
      case 0: element = (<div className="select-Category">
        <div className="title">Select a category</div>
        <div className="btn-row">
          <div className="btn" onClick={(ev) => { this.setState({ questionNum: 1, imgType: "animals" });}}>Animals</div>
          <div className="btn" onClick={(ev) => { this.setState({ questionNum: 1, imgType: "objects" }); }}>Objects</div>
          <div className="btn" onClick={(ev) => { (this.state.ranNum[0] % 2 === 1) ? this.props.setAnswer(this.animals[this.state.ranNum[0]]) : this.props.setAnswer(this.objects[this.state.ranNum[0]])
          this.props.movetoNext(2)}}>Random</div>
        </div>
      </div>);
        break;
      case 1: 
      element = [(this.displayImg())];
        break;
      default:
    }
    return element;
  }
  displayImg() {
    let ranNum = this.state.ranNum;
    let element, images = [];
    let category = "";
    switch (this.state.imgType) {
      case "animals": category = this.animals;
        break;
      case "objects": category = this.objects;
        break;
      default: (ranNum[0] % 2 === 1) ? category = this.animals : category = this.objects;
    }

    for (let i = 0; i < 4; i++) {
      images.push(<img src={category[ranNum[i]].url} alt={category[ranNum[i]].classLabels[0]} key={category[ranNum[i]].classLabels[0]} onClick={(ev) => { this.props.setAnswer(category[ranNum[i]]); this.props.movetoNext(2)}} />)
    }
    element = <div className="select-Category" key="selectCategory">
      <div className="title">Select an image</div>
      <div className="photo-row">
        {images}
      </div>
    </div>
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
