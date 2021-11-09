import React, { Component, Fragment } from 'react';

import styles from './Round.module.scss';
import { StaticData } from '../../data/Images';
import FirstImage from '../../images/round/step1.png';
import SecondImage from '../../images/round/step2.png';
import ThirdImage from '../../images/round/step3.png';
import _ from 'lodash';


let r_lime = require.context('../../images/LIME', true, /\.(png|jpe?g|svg)$/);
let r_gradcam = require.context('../../images/gradcam', true, /\.(png|jpe?g|svg)$/);
let r_baseline = require.context('../../images/baseline', true, /\.(png|jpe?g|svg)$/);


const gradcamVisuals = {}
const limeVisuals = {}
const baselineVisuals = {}

for (var type of Object.keys(StaticData)) {
  let images = StaticData[type]
  for (var image of images) {
    let key = image.name;
    // console.log(image)
    // let commPath = "../../images/LIME/"
    let top_five_lime = []
    let top_five_gradcam = []

    for (let i = 0; i < 5; i++) {
      let filename =key + "/top_" + i 
      // console.log( "../../images/LIME/" + filename + ".png")
      try {
        let v = r_lime(`./${filename}.png`)
        let g =  r_gradcam(`./${filename}.png`)
        top_five_lime.push(v)
        top_five_gradcam.push(g)


      } catch {
        console.log("Couldn't load path : ../../images/LIME/" + filename + ".png or ../../images/gradcam/" + filename + ".png")
        continue;
      }
  
    }
  
    let bottom_five_lime = []
    let bottom_five_gradcam = []

    for (let i = 0; i < 5; i++) {
      let filename =key + "/bottom_" + i 
      try {
        let v = r_lime(`./${filename}.png`)
        let g =  r_gradcam(`./${filename}.png`)
        bottom_five_lime.push(v)
        bottom_five_gradcam.push(g)

      } catch (err) {
        // console.log(err)
        console.log("Couldn't load path : ../../images/LIME/" + filename + ".png or ../../images/gradcam/" + filename + ".png")
        continue;
      }
    }

    let all_eight_baseline = []
    for (let i = 0; i < 8; i++) {
      let filename =key + "/random" + i 
      try {
        let b =  r_baseline(`./${filename}.png`)
        all_eight_baseline.push(b)

      } catch (err) {
        // console.log(err)
        console.log("Couldn't load path : ../../images/baseline/" + filename)
        continue;
      }
  
    }

    limeVisuals[key] = {}
    limeVisuals[key]["top_five"] = top_five_lime
    limeVisuals[key]["bottom_five"] = bottom_five_lime

    gradcamVisuals[key] = {}
    gradcamVisuals[key]["top_five"] = top_five_gradcam
    gradcamVisuals[key]["bottom_five"] = bottom_five_gradcam

    baselineVisuals[key] = {}
    baselineVisuals[key]["all_eight"] = all_eight_baseline


  
  }
  
}


const features = [];
for (let i = 0; i < 528; i++) {
  features[i] = require('../../images/mixed4d/' + i + '.png');
}

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  var key = keys[ keys.length * Math.random() << 0];
  return [obj[key], key];
};

class Round extends Component {
  state = { mode: 0 };

  componentDidMount() {
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    // window.setTimeout(function() {
    //   // Q: Current round can't be 2? 
    //   if (![1, 3].includes(this.props.entireRound)) {
    //     this.props.moveToNext(3);
    //   }
    // }.bind(this), 2000);
    const player = this.props.turns[this.props.entireRound - 1];
     

    // If it's not the user (1 is user, others are AI), then populate their answer and hints
    if (player !== 1) {
      let currVisuals;
      if (this.props.explanationType === 1) {
        currVisuals = limeVisuals;
      } else if (this.props.explanationType === 2) {
        currVisuals = gradcamVisuals;
      } else if (this.props.explanationType === 3) {
        currVisuals = baselineVisuals;
      }
  
      if ([1,2].includes(this.props.explanationType)) {
          let randomOrder = []
        // const randomNum = (Math.floor(Math.random() * 2));

        for (let i = 0; i < 5; i++) {
          randomOrder.push(i)
        }

        // quick and dirty way to randomize, not completely random 
        randomOrder = _.shuffle(randomOrder)
        // Either veggies or electronics will be picked
        // if (randomNum % 2 === 0) {
        //   answers = StaticData.vegetable;
        // } else {
        //   answers = StaticData.electronics;
        // }

        let [answers, category] = randomProperty(StaticData);
        let answer = answers[Math.floor(Math.random()*answers.length)]
        while (this.props.pastGuessingImgs.includes(answer)) {
          answer = answers[Math.floor(Math.random()*answers.length)]
          console.log("past guess got repeated") 
          console.log(answer)
        }

        // Temporary
        // if (this.props.explanationType === 2 && this.props.entireRound === 2) {
        //   answer = StaticData["seaAnimal"][3]
        // }

        // if (this.props.explanationType === 1 && this.props.entireRound === 1)  {
        //   answer = StaticData["transportation"][5]
        // }

        let currVisual = currVisuals[answer.name]

        
        //  let imgArr = limeVisual.top_five.concat(limeVisual.bottom_five)
        let imgArr = []
        imgArr.push([currVisual.top_five[0], "top_0"])
        imgArr.push([currVisual.top_five[1], "top_1"])
        imgArr.push([currVisual.top_five[2], "top_3"])
        imgArr.push([currVisual.top_five[3], "top_4"])


        // if (randomOrder[0] !== 0) {
        //     imgArr.push([currVisual.top_five[randomOrder[0]], "top_" + randomOrder[0]])
        // } else {
        //   imgArr.push([currVisual.top_five[randomOrder[1]], "top_" + randomOrder[1]])
        // }


        // randomOrder = _.shuffle(randomOrder)
        // imgArr.push([currVisual.bottom_five[randomOrder[0]], "bottom_" + randomOrder[0]])
        // imgArr.push([currVisual.bottom_five[randomOrder[1]], "bottom_" + randomOrder[1]])

        // imgArr = _.shuffle(imgArr)
        let t = _.unzip(imgArr)
        imgArr = t[0]
        let orderArr = t[1]
        let roundNum = "round_" + this.props.entireRound
        
        let dict = {guess_round : {}}
        let innerDict =  {
            categorySelect : category, 
            imgSelect : answer.name, 
            orderArr : orderArr
        }
        dict["guess_round"][roundNum] = innerDict;
        // this.props.update(dict)
        // console.log(category, answer.name)
        console.log("orderArr = ", orderArr);
       this.props.setAnswer(answer);
       this.props.setHints(imgArr);
       this.props.setHintsURL(orderArr);


      } else if ([3].includes(this.props.explanationType))  {
        let randomOrder = []
        // const randomNum = (Math.floor(Math.random() * 2));

        for (let i = 0; i < 5; i++) {
          randomOrder.push(i)
        }

        // quick and dirty way to randomize, not completely random 
        randomOrder = _.shuffle(randomOrder)
        // Either veggies or electronics will be picked
        // if (randomNum % 2 === 0) {
        //   answers = StaticData.vegetable;
        // } else {
        //   answers = StaticData.electronics;
        // }

        let [answers, category] = randomProperty(StaticData);
        let answer = answers[Math.floor(Math.random()*answers.length)]
        while (this.props.pastGuessingImgs.includes(answer)) {
          answer = answers[Math.floor(Math.random()*answers.length)]
          console.log("past guess got repeated") 
          console.log(answer)
        }

        // Temporary
        // if (this.props.explanationType === 2 && this.props.entireRound === 2) {
        //   answer = StaticData["seaAnimal"][3]
        // }

        // if (this.props.explanationType === 1 && this.props.entireRound === 1)  {
        //   answer = StaticData["transportation"][5]
        // }

        let currVisual = currVisuals[answer.name]

        
        //  let imgArr = limeVisual.top_five.concat(limeVisual.bottom_five)
        let imgArr = []
        imgArr.push([currVisual.all_eight[randomOrder[0]], "random_" + randomOrder[0]])
        imgArr.push([currVisual.all_eight[randomOrder[1]], "random_" + randomOrder[1]])
        imgArr.push([currVisual.all_eight[randomOrder[2]], "random_" + randomOrder[2]])
        imgArr.push([currVisual.all_eight[randomOrder[3]], "random_" + randomOrder[3]])




        // if (randomOrder[0] !== 0) {
        //     imgArr.push([currVisual.top_five[randomOrder[0]], "top_" + randomOrder[0]])
        // } else {
        //   imgArr.push([currVisual.top_five[randomOrder[1]], "top_" + randomOrder[1]])
        // }


        // randomOrder = _.shuffle(randomOrder)
        // imgArr.push([currVisual.bottom_five[randomOrder[0]], "bottom_" + randomOrder[0]])
        // imgArr.push([currVisual.bottom_five[randomOrder[1]], "bottom_" + randomOrder[1]])

        // imgArr = _.shuffle(imgArr)
        let t = _.unzip(imgArr)
        imgArr = t[0]
        let orderArr = t[1]
        let roundNum = "round_" + this.props.entireRound
        
        let dict = {guess_round : {}}
        let innerDict =  {
            categorySelect : category, 
            imgSelect : answer.name, 
            orderArr : orderArr
        }
        dict["guess_round"][roundNum] = innerDict;
        // this.props.update(dict)
        // console.log(category, answer.name)
        console.log("orderArr = ", orderArr);
       this.props.setAnswer(answer);
       this.props.setHints(imgArr);
       this.props.setHintsURL(orderArr);


      }  else { // For Feature Viz - LEGACY
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

        while(this.props.answerRecord.includes(answers[secondNum].classLabels[0]) || this.props.pastGuessingImgs.includes(answers[secondNum])) {
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
        <h1 className={styles['Round__title']}>Round { this.props.explanationNumber *2 + this.props.entireRound}</h1>
        {player !== 1 ? (
          <Fragment>
            <div className={styles['Round__text']}>It’s your turn to guess. Remember...</div>
            <section className={styles['Round__info']}>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={FirstImage} alt="Instruction #1" />
                <p className={styles['Round__message']} >Type your guesses in the chat</p>
              </div>
              <div className={styles['Round__card']}>
                <img className={styles['Round__image']} src={SecondImage} alt="Instruction #2" />
                <p className={styles['Round__message']} >Explanations may important regions of the image, or show abstract patterns, textures, and shapes</p>
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
