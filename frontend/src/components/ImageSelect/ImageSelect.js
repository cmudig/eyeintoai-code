import React, { Component } from 'react';
import _ from 'lodash';
import { StaticData } from '../../data/Images';


let r_lime = require.context('../../images/LIME', true, /\.(png|jpe?g|svg)$/);
let r_gradcam = require.context('../../images/gradcam', true, /\.(png|jpe?g|svg)$/);

const gradcamVisuals = {}

const limeVisuals = {}
for (var type of Object.keys(StaticData)) {
  let images = StaticData[type]
  for (var image of images) {
    let key = image.name;
    // console.log(image)
    // let commPath = "../../images/LIME/"
    let top_five_lime = []
    let top_five_gradcam = []

    for (let i = 0; i < 4; i++) {
      let filename =key + "/top_" + i 
      // console.log( "../../images/LIME/" + filename + ".jpeg")
      try {
        let v = r_lime(`./${filename}.jpeg`)
        let g =  r_gradcam(`./${filename}.png`)
        top_five_lime.push(v)
        top_five_gradcam.push(g)


      } catch {
        console.log("Couldn't load path : ../../images/LIME/" + filename + ".jpeg or ../../images/gradcam/" + filename + ".png")
        continue;
      }
  
    }
  
    let bottom_five_lime = []
    let bottom_five_gradcam = []

    for (let i = 0; i < 4; i++) {
      let filename =key + "/bottom_" + i 
      try {
        let v = r_lime(`./${filename}.jpeg`)
        let g =  r_gradcam(`./${filename}.png`)
        bottom_five_lime.push(v)
        bottom_five_gradcam.push(g)

      } catch (err) {
        // console.log(err)
        console.log("Couldn't load path : ../../images/LIME/" + filename + ".jpeg or ../../images/gradcam/" + filename + ".png")
        continue;
      }
  
    }
    limeVisuals[key] = {}
    limeVisuals[key]["top_five"] = top_five_lime
    limeVisuals[key]["bottom_five"] = bottom_five_lime

    gradcamVisuals[key] = {}
    gradcamVisuals[key]["top_five"] = top_five_gradcam
    gradcamVisuals[key]["bottom_five"] = bottom_five_gradcam

  
  }
  
}

const visuals = [];
for (let i = 0; i < 528; i++) {
  visuals[i] = require('../../images/mixed4d/' + (i) + '.png');
}

class ImageSelect extends Component {
  state = {
    selected: [],
    nonSelected: [],
    top_five: [], 
    bottom_five: [],
    display: 'none',
  };

  componentDidMount() {
    this.nonSelectedVisuals();
  }

  nonSelectedVisuals() {
    let currVisuals;
    if (this.props.explanationType === 1) {
      currVisuals = limeVisuals;
    } else if (this.props.explanationType === 2) {
      currVisuals = gradcamVisuals;
    }

    if ([1,2].includes(this.props.explanationType)) {

      // for (let i = 0; i < 5; i++) {
      //   let path = "bottom_" + i + ".jpeg"
      //   let combinedPath = commPath + path;
      //   console.log( "../../images/LIME/" + combinedPath)
      //   let v = require("../../images/LIME/" + (combinedPath))

      //   newVisuals.push(v)
      // }
      console.log(this.props.answer.name, currVisuals, currVisuals[this.props.answer.name])
      console.log(currVisuals[this.props.answer.name].top_five.concat( currVisuals[this.props.answer.name].bottom_five))
      let randomized = _.shuffle(currVisuals[this.props.answer.name].top_five.concat( currVisuals[this.props.answer.name].bottom_five))
      console.log(randomized)
      this.setState({ nonSelected: randomized, top_five: currVisuals[this.props.answer.name].top_five, bottom_five: currVisuals[this.props.answer.name].bottom_five });

    } else {
      const newVisuals = [];
      for (let i = 0; i < 8; i++) {
        newVisuals.push(visuals[this.props.answer.correctURLs[i]]);
      }
      for (let i = 0; i < 2; i++) {
        newVisuals.push(visuals[this.props.answer.wrongVizURLs[i]]);
      }
      
      let t = _.chunk(this.props.answer.correctURLs.concat(this.props.answer.wrongVizURLs), 5)
      let randomized = _.shuffle(newVisuals)

      this.setState({ nonSelected: randomized, top_five: t[0], bottom_five: t[1] });
    }
  }

  selectedVisuals(list, item, number, target) {
    const selected = [...this.state.selected];
    if (list.contains('selected')) {
      target.classList.remove('selected');
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].number === number) {
          selected.splice(i, 1);
        }
        document.getElementById('order' + number).classList.remove('active');
      }
      this.setState({ display: 'none', selected: selected });
    } else if(this.state.selected.length < 4) {
      target.classList.add('selected');
      document.getElementById('order' + number).classList.add('active');
      selected.push({ image: item, number: number });
      if (selected.length === 4) {
        this.setState({ display: 'block' });
      }
      this.setState({ selected: selected });
    }
  }

  returnIndex(img) {
    if (this.state.selected) {
      for (let i = 0; i < this.state.selected.length; i++) {
        if (this.state.selected[i].image === img) {
          return (i + 1);
        }
      }
    }
  }

  sendHints() {
    const hints = [];
    const hintURLS = [];
    for (let i = 0; i < this.state.selected.length; i++) {
      hints.push(this.state.selected[i].image);
      hintURLS.push(this.state.selected[i].number);
    }
    this.props.getPlayerHint(hints, hintURLS, this.props.answer);
  }

  renderVisuals() {
    const elements = [];
    const images = this.state.nonSelected.concat(this.state.selected);
    let numPics, maxWidth;
    if ([1,2].includes(this.props.explanationType)) {
      numPics = 8; 
      maxWidth = "640px";
    } else {
      numPics = 10; 
      maxWidth = "740px";
    }  
      for (let i = 0; i < numPics; i++) {
        elements.push(
          <div key={'vis' + i}>
            <div className="order" id={'order' + i}>
              {this.returnIndex(images[i])}
            </div>  
            <img
              className="active"
              src={images[i]}
              alt={this.props.answer.classLabels[0] + ' visualization ' + (i + 1)}
              key={this.props.answer.classLabels[0] + ' visualization ' + (i + 1)}
              onClick={(e) => { this.selectedVisuals(e.target.classList, images[i], i, e.target); }}
            />
          </div>
        );
      }
    // }
    
    return (
      <div className="vis-row" style={{"maxWidth" : maxWidth }}>
        {elements}
      </div>
    );
  }

  render() {
    return (
      <div className="modal-select">
        <img id="answerImg" src={this.props.answer.url} alt="answer"/>
        <div className="title">
          <span style={{ fontSize: '24px', lineHeight: '2' }}>
            Make other players guess the image!
          </span>
          <br />
          Select 4 of the most representative feature visualizations of the {this.props.answer.classLabels[0]} for hints
        </div>
        <div className="timer" key="timer">
          <div className="timer_in" key="timer_in" style={{ width: this.state.timerWidth }}>
            <div className="timer_highlight" />
            <div className="counter"></div>
          </div>
        </div>
        {this.renderVisuals()}
        <div
          className="btn"
          style={{ width: '216px', margin: '32px auto 0', display: this.state.display }}
          onClick={() => {
            const explanations = [];
            console.log(this.state)
            for (let i = 0; i < this.state.selected.length; i++) {
              const curImage = _.get(this.state.selected, i).image;
              if ([1,2].includes(this.props.explanationType)) { 
                if (this.state.top_five.indexOf(curImage) !== -1) 
                explanations.push({ technique_rank: "top_"+ this.state.top_five.indexOf(curImage) });
              else if (this.state.bottom_five.indexOf(curImage) !== -1) 
                explanations.push({ technique_rank: "bottom_"+ this.state.bottom_five.indexOf(curImage) });
              else 
                throw new Error("Couldn't find img = " + curImage); 

              } else {
                const imgIdx = parseInt(curImage.substring(curImage.lastIndexOf('/') + 1, curImage.indexOf('.')));
                if (this.state.top_five.indexOf(imgIdx) !== -1) 
                  explanations.push({ technique_rank: "top_"+ this.state.top_five.indexOf(imgIdx)});
                else if (this.state.bottom_five.indexOf(imgIdx) !== -1) 
                  explanations.push({ technique_rank: "bottom_"+ this.state.bottom_five.indexOf(imgIdx) });
                else 
                  throw new Error("Couldn't find imgIdx = " + imgIdx);              }
            }
            this.sendHints();
            this.props.update({ explain_round: { explanations_chosen: explanations } });
            this.props.movetoNext(4);
          }}
        >
            Start the Game
        </div>
      </div>

    );
  }
}

export default ImageSelect;
