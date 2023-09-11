/* eslint-disable */
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
let r_gradcam_baseline = require.context('../../images/gradcam_baseline', true, /\.(png|jpe?g|svg)$/);


const gradcamVisuals = {}
const limeVisuals = {}
const baselineVisuals = {}
const gradcam_baseline_Visuals = {}

for (var type of Object.keys(StaticData)) {
  let images = StaticData[type]
  for (var image of images) {
    let key = image.name;
    // console.log(image)
    // let commPath = "../../images/LIME/"
    let top_five_lime = []
    let top_five_gradcam = []
    let top_five_gradcam_baseline = []

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

      filename =key + "/top" + (i+1)
      try {
        let v = r_gradcam_baseline(`./${filename}.png`)
        // console.log("gradcam/"+ filename + ".png")
        top_five_gradcam_baseline.push(v)
      } catch {
        console.log("Couldn't load path : ../../images/gradcam_baseline/" + filename + ".png")
        continue;
      }
  
    }
  
    let bottom_five_lime = []
    let bottom_five_gradcam = []
    let bottom_five_gradcam_baseline = []

    for (let i = 0; i < 5; i++) {
      let filename =key + "/bottom_" + i 
      try {
        let v = r_lime(`./${filename}.png`)
        let g =  r_gradcam(`./${filename}.png`)
        bottom_five_lime.push(v)
        bottom_five_gradcam.push(g)

      } catch (err) {
        // console.log(err)
        // console.log("Couldn't load path : ../../images/LIME/" + filename + ".png or ../../images/gradcam/" + filename + ".png")
        continue;
      }

      filename =key + "/bottom" + (i+1)
      try {
        let v = r_gradcam_baseline(`./${filename}.png`)
        bottom_five_gradcam_baseline.push(v)
      } catch {
        // console.log("Couldn't load path : ../../images/gradcam_baseline/" + filename + ".png")
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
        // console.log("Couldn't load path : ../../images/baseline/" + filename)
        continue;
      }
  
    }

    limeVisuals[key] = {}
    limeVisuals[key]["top_five"] = top_five_lime
    limeVisuals[key]["bottom_five"] = bottom_five_lime

    gradcamVisuals[key] = {}
    gradcamVisuals[key]["top_five"] = top_five_gradcam
    gradcamVisuals[key]["bottom_five"] = bottom_five_gradcam

    gradcam_baseline_Visuals[key] = {}
    gradcam_baseline_Visuals[key]["top_five"] = top_five_gradcam_baseline
    gradcam_baseline_Visuals[key]["bottom_five"] = bottom_five_gradcam_baseline

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
      // if (this.props.explanationType === 1) {
      //   currVisuals = limeVisuals;
      // } else if (this.props.explanationType === 2) {
      //   currVisuals = gradcamVisuals;
      // } else if (this.props.explanationType === 3) {
      //   currVisuals = baselineVisuals;
      // } else if (this.props.explanationType === 4) {
      //   currVisuals = gradcam_baseline_Visuals;
      // }
      let value = 0;
      // we will assign player two to the regular and player three to the baseline
      if (player === 2){
        if (this.props.explanationType === 1){
          value = 1
          currVisuals = limeVisuals;
        } else if (this.props.explanationType === 2){
          value = 2
          currVisuals = gradcamVisuals;
        }
      } else if (player === 3){
        if (this.props.explanationType === 1){
          value = 3
          currVisuals = baselineVisuals;
        } else if (this.props.explanationType === 2){
          value = 4
          currVisuals = gradcam_baseline_Visuals;
        }
      }
  
      if ((value === 1 || value === 2) && [1,2].includes(this.props.explanationType)) {
          let randomOrder = []
        // const randomNum = (Math.floor(Math.random() * 2));

        for (let i = 0; i < 4; i++) {
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
          [answers, category] = randomProperty(StaticData);
          answer = answers[Math.floor(Math.random()*answers.length)]
          // console.log("past guess got repeated") 
          // console.log("ANSWER:",answer)
          // console.log(this.props.pastGuessingImgs)
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
        imgArr.push([currVisual.top_five[2], "top_2"])
        imgArr.push([currVisual.top_five[3], "top_3"])


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
        // console.log("orderArr = ", orderArr);
       this.props.setAnswer(answer);
       this.props.setHints(imgArr);
       this.props.setHintsURL(orderArr);


      } else if (value === 3 || value === 4)  {
        let randomOrder = []
        let randomOrder_grad_base = []
        // const randomNum = (Math.floor(Math.random() * 2));

        let [answers, category] = randomProperty(StaticData);
        let answer = answers[Math.floor(Math.random()*answers.length)]
        while (this.props.pastGuessingImgs.includes(answer)) {
          [answers, category] = randomProperty(StaticData);
          answer = answers[Math.floor(Math.random()*answers.length)]
          // console.log("past guess got repeated") 
          // console.log(answer)
          // console.log(this.props.pastGuessingImgs)
        }

        // console.log("FINAL ANSWER SET IS: ", answer['name'])

        for (let i = 0; i < 4; i++) {
          let randnum = Math.floor(Math.random() * 8)
          if(answer['name'] === "drum" || answer['name'] === "cat" || answer['name'] === "toaster" || answer['name'] === "orange" || answer['name'] === "keyboard"){
            // console.log("we need to limit the results")
            randnum = Math.floor(Math.random() * 7)
            while (randomOrder.includes(randnum)) {
              randnum = Math.floor(Math.random() * 7)
            }
            randomOrder.push(randnum)
          } else {
            // console.log("answer does not need to be limited")
            randnum = Math.floor(Math.random() * 8)
            while (randomOrder.includes(randnum)) {
              randnum = Math.floor(Math.random() * 8)
            }
            randomOrder.push(randnum)
          }
        }

        // quick and dirty way to randomize, not completely random 
        randomOrder = _.shuffle(randomOrder)
        // Either veggies or electronics will be picked
        // if (randomNum % 2 === 0) {
        //   answers = StaticData.vegetable;
        // } else {
        //   answers = StaticData.electronics;
        // }

        for (let i = 0; i < 4; i++) {
          let randnum_grad = Math.floor(Math.random() * 5)
          while (randomOrder_grad_base.includes(randnum_grad)) {
            randnum_grad = Math.floor(Math.random() * 5)
          }
          randomOrder_grad_base.push(randnum_grad)
        }

        // quick and dirty way to randomize, not completely random 
        randomOrder_grad_base = _.shuffle(randomOrder_grad_base)
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
        if (value === 4){

          const choice_name = ["top", "bottom"]
          const choice_list = []
          // console.log("RANDOMG GRAD: ")
          // console.log(randomOrder_grad_base)


          for (let i = 0; i < 4; i++){
            choice_list.push(choice_name[Math.floor(Math.random()*choice_name.length)]);
          }

          // console.log("CHOICE LIST: ")
          // console.log(choice_list)

          if (choice_list[0] == "top"){
            imgArr.push([currVisual.top_five[randomOrder_grad_base[0]], choice_list[0] + (randomOrder_grad_base[0]+1)])
          } else {
            imgArr.push([currVisual.bottom_five[randomOrder_grad_base[0]], choice_list[0] + (randomOrder_grad_base[0]+1)])
          }

          if (choice_list[1] == "top"){
            imgArr.push([currVisual.top_five[randomOrder_grad_base[1]], choice_list[1] + (randomOrder_grad_base[1]+1)])
          } else {
            imgArr.push([currVisual.bottom_five[randomOrder_grad_base[1]], choice_list[1] + (randomOrder_grad_base[1]+1)])
          }

          if (choice_list[2] == "top"){
            imgArr.push([currVisual.top_five[randomOrder_grad_base[2]], choice_list[2] + (randomOrder_grad_base[2]+1)])
          } else {
            imgArr.push([currVisual.bottom_five[randomOrder_grad_base[2]], choice_list[2] + (randomOrder_grad_base[2]+1)])
          }

          if (choice_list[3] == "top"){
            imgArr.push([currVisual.top_five[randomOrder_grad_base[3]], choice_list[3] + (randomOrder_grad_base[3]+1)])
          } else {
            imgArr.push([currVisual.bottom_five[randomOrder_grad_base[3]], choice_list[3] + (randomOrder_grad_base[3]+1)])
          }
          
        } else {
          imgArr.push([currVisual.all_eight[randomOrder[0]], "random_" + randomOrder[0]])
          imgArr.push([currVisual.all_eight[randomOrder[1]], "random_" + randomOrder[1]])
          imgArr.push([currVisual.all_eight[randomOrder[2]], "random_" + randomOrder[2]])
          imgArr.push([currVisual.all_eight[randomOrder[3]], "random_" + randomOrder[3]])
        }
        
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
        // console.log("orderArr = ", orderArr);
       this.props.setAnswer(answer);
       this.props.setHints(imgArr);
       this.props.setHintsURL(orderArr);


      }  else { // For Feature Viz - LEGACY
        // Weird way to shuffle array
        const randomNum = (Math.floor(Math.random() * 2));
        const randomVisualOrder = [];
        const visualOrder = [0, 1, 2, 3]
        let randNum = 0;
        let secondNum = 0;
        let tempNum = 0;
        // let answers = [];
        for (let i = 0; i < 4; i++) {
          randNum = Math.floor(Math.random() * 10);
          while (randomVisualOrder.includes(randNum)) {
            randNum = Math.floor(Math.random() * 10)
          }
          secondNum = Math.floor(Math.random() * 5)
          randomVisualOrder.push(randNum);
        }

        // Either veggies or electronics will be picked
        // if (randomNum % 2 === 0) {
        //   answers = StaticData.vegetable;
        // } else {
        //   answers = StaticData.electronics;
        // }
        
        // if (this.props.entireRound === 1 && this.props.testPhase) {
        //   secondNum = 2;
        //   answers = StaticData.vegetable;
        // }

        // while(this.props.answerRecord.includes(answers[secondNum].classLabels[0]) || this.props.pastGuessingImgs.includes(answers[secondNum])) {
        //   secondNum = (secondNum + 1) % 5;
        // }

        let [answers, category] = randomProperty(StaticData);
        let answer = answers[secondNum]
        while (this.props.pastGuessingImgs.includes(answer)) {
          [answers, category] = randomProperty(StaticData);
          secondNum = (secondNum + 1) % 4
          answer = answers[secondNum]
          // console.log("past guess got repeated") 
          // console.log("ANSWER:",answer)
          // console.log(this.props.pastGuessingImgs)
        }

        let visuals = answer.correctURLs.concat(answer.wrongVizURLs);

        if (player === 3){
          visuals = answer.randomURLs10;
          this.props.setAnswer(answer);
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

          // console.log("FEATURE VIZ: RANDOM ORDER: ")
          // console.log(randomVisualOrder)
          // console.log("FEATURE VIZ: VISUALS: ")
          // console.log(visuals)
        } else{
          this.props.setAnswer(answer);
          this.props.setHints([
            features[visuals[visualOrder[0]]],
            features[visuals[visualOrder[1]]],
            features[visuals[visualOrder[2]]],
            features[visuals[visualOrder[3]]],
          ]);
          this.props.setHintsURL([
            visuals[visualOrder[0]],
            visuals[visualOrder[1]],
            visuals[visualOrder[2]],
            visuals[visualOrder[3]],
          ]);

          // console.log("FEATURE VIZ: ORDER: ")
          // console.log(visualOrder)
          // console.log("FEATURE VIZ: VISUALS: ")
          // console.log(visuals)
        }
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
                <p className={styles['Round__message']} >Explanations may show important regions of the image, or show abstract patterns, textures, and shapes</p>
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