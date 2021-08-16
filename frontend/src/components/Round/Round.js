import React, { Component, Fragment } from 'react';

import styles from './Round.module.scss';
import { StaticData } from '../../data/Images';
import FirstImage from '../../images/round/step1.png';
import SecondImage from '../../images/round/step2.png';
import ThirdImage from '../../images/round/step3.png';
import _ from 'lodash';

const limeVisuals = {}
for (var type of Object.keys(StaticData)) {
  let images = StaticData[type]
  for (var image of images) {
    let key = image.name;
    console.log(image)
    // let commPath = "../../images/LIME/"
    let top_five = []
    for (let i = 0; i < 5; i++) {
      let filename =key + "/top_" + i 
      // console.log( "../../images/LIME/" + filename + ".jpeg")
      try {
        let v = require(`../../images/LIME/${filename}.jpeg`)
        top_five.push(v)

      } catch {
        console.log("Couldn't load path : " + "../../images/LIME/" + filename + ".jpeg")
        continue;
      }
  
    }
  
    let bottom_five = []
    for (let i = 0; i < 5; i++) {
      let filename =key + "/bottom_" + i 
      try {
        let v = require(`../../images/LIME/${filename}.jpeg`)
        bottom_five.push(v)

      } catch (err) {
        console.log(err)
        console.log("Couldn't load path : " + "../../images/LIME/" + filename + ".jpeg")
        continue;
      }
  
    }
    limeVisuals[key] = {}
    limeVisuals[key]["top_five"] = top_five
    limeVisuals[key]["bottom_five"] = bottom_five
  
  }
  
}


const features = [];
for (let i = 0; i < 528; i++) {
  features[i] = require('../../images/mixed4d/' + i + '.png');
}

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};

class Round extends Component {
  state = { mode: 0 };

  componentDidMount() {
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    window.setTimeout(function() {
      // Q: Current round can't be 2? 
      if (![1, 3].includes(this.props.entireRound)) {
        this.props.moveToNext(3);
      }
    }.bind(this), 2000);
    const player = this.props.turns[this.props.entireRound - 1];

    // If it's not the user (1 is user, others are AI), then populate their answer and hints
    if (player !== 1) {
      if (this.props.explanationType == 1) { 
        let randomOrder = []
        // const randomNum = (Math.floor(Math.random() * 2));

        for (let i = 0; i < 5; i++) {
          randomOrder.push(i)
        }

        // quick and dirty way to randomize, not completely random 
        randomOrder = _.shuffle(randomOrder)
        let answers;
        // Either veggies or electronics will be picked
        // if (randomNum % 2 === 0) {
        //   answers = StaticData.vegetable;
        // } else {
        //   answers = StaticData.electronics;
        // }

        answers = randomProperty(StaticData);
        // Can randomize which one is chosen in the future 
       let limeVisual = limeVisuals[answers[Math.floor(Math.random()*answers.length)].name]
      //  let imgArr = limeVisual.top_five.concat(limeVisual.bottom_five)
      let imgArr = limeVisual.top_five

        console.log(randomOrder)

       this.props.setAnswer(answers[2]);
       this.props.setHints([
         imgArr[randomOrder[0]],
         imgArr[randomOrder[1]],
         imgArr[randomOrder[2]],
         imgArr[randomOrder[3]],
       ]);


      } else {
        // Weird way to shuffle array
        const randomNum = (Math.floor(Math.random() * 2));
        const randomVisualOrder = [0, 1, 2, 3, 4];
        let firstNum = 0;
        let secondNum = 0;
        let tempNum = 0;
        let answers = [];
        for (let i = 0; i < 10; i++) {
          firstNum = Math.floor(Math.random() * 5);
          secondNum = Math.floor(Math.random() * 5);
          tempNum = randomVisualOrder[firstNum];
          randomVisualOrder[firstNum] = randomVisualOrder[secondNum];
          randomVisualOrder[secondNum] = tempNum;
        }

        // Either veggies or electronics will be picked
        if (randomNum % 2 === 0) {
          answers = StaticData.vegetable;
        } else {
          answers = StaticData.electronics;
        }
        
        if (this.props.entireRound === 1 && this.props.testPhase) {
          secondNum = 2;
          answers = StaticData.vegetable;
        }

        while(this.props.answerRecord.includes(answers[secondNum].classLabels[0])) {
          secondNum = (secondNum + 1) % 5;
        }

        const visuals = answers[secondNum].correctURLs.concat(answers[secondNum].wrongVizURLs);
        this.props.setAnswer(answers[secondNum]);
        this.props.setHints([
          features[visuals[randomVisualOrder[0]]],
          features[visuals[randomVisualOrder[1]]],
          features[visuals[randomVisualOrder[2]]],
          features[visuals[randomVisualOrder[3]]],
        ]);
        this.props.setHintsURL([
          visuals[randomVisualOrder[0]],
          visuals[randomVisualOrder[1]],
          visuals[randomVisualOrder[2]],
          visuals[randomVisualOrder[3]],
        ]);
      }
     
    } else {
      this.props.setPlayerHint();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.props.handleLeavePage);
  }

  renderContent() {
    const elements = [];
    const player = this.props.turns[this.props.entireRound - 1];
    elements.push(
      <div className={styles['Profile']}>
        <div className={styles['Profile__icon']}>{this.props.players[player - 1].img}</div>
        <div className={styles['Profile__name']}>{this.props.players[player - 1].name}</div>
      </div>
    );
    return (
      <section className={styles['Round']}>
        <h1 className={styles['Round__title']}>Round {this.props.entireRound}</h1>
        {[1, 3].includes(this.props.entireRound) ? (
          <Fragment>
            <div className={styles['Round__text']}>It’s your turn to guess. Remember...</div>
            <section className={styles['Round__info']}>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={FirstImage} alt="Instruction #1" />
                <p className={styles['Round__message']} >Type your guesses in the chat</p>
              </div>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={SecondImage} alt="Instruction #2" />
                <p className={styles['Round__message']} >Visualizations show patterns, textures, and shapes</p>
              </div>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={ThirdImage} alt="Instruction #3" />
                <p className={styles['Round__message']} >Think broadly, you could get images that are less familiar</p>
              </div>
            </section>
            <button className={styles['Round__button']} onClick={() => this.props.moveToNext(3)}>
              I'm Ready!
            </button>
          </Fragment>
        ) : (
          <div className={styles['Round__text']}>Sit back and watch others guess your image</div>
        )}
      </section>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default Round;
