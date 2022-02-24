/* eslint-disable */
import React, { Component } from 'react';
import _ from 'lodash';

import styles from './Category.module.scss';
import { StaticData } from '../../data/Images';

class Category extends Component {
  state = {
    nextStage: false,
    imageType: '',
  };

  items = [];

  displayContent() {
    if (this.state.nextStage) {
      return [(this.displayImage())];
    } else {
      let explanationTypeText = "0";
      let completed = "";
      console.log("Explanation TYPES LIST: ")
      console.log(this.props)
      if (this.props.explanationTypes.indexOf(this.props.explanationType) === 0){
        explanationTypeText = "0"
      } else if (this.props.explanationTypes.indexOf(this.props.explanationType) === 1) {
        explanationTypeText = "1"
      } else if (this.props.explanationTypes.indexOf(this.props.explanationType) === 2) {
        explanationTypeText = "2"
        completed = "Last round!"
      }
      // if (this.props.explanationType === 1) {
      //   explanationTypeText = "LIME";
      // } else if (this.props.explanationType === 2) {
      //   explanationTypeText = "GradCam"
      // } else if (this.props.explanationType === 3) {
      //   explanationTypeText = "SHAP"
      // }
      return (
        <div>
          <div className={styles['Category__title']}>Game Progress: </div>
          <div className={styles['Category__content']}>
            You have completed {explanationTypeText} out of 3 rounds. {completed}
          </div>
          <div className={styles['Category__title']}>Select a category</div>
          <div className={styles['Category__container']}>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'landAnimals' });
              }}
            >
              Land Animals
            </div>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'seaAnimals' });
              }}
            >
              Sea Animals
            </div>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'fruits' });
              }}
            >
              Fruits
            </div>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'vegetables' });
              }}
            >
              Vegetables
            </div>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'instruments' });
              }}
            >
              Instruments
            </div>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'transportation' });
              }}
            >
              Transportation
            </div>
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.setState({ nextStage: true, imageType: 'electronics' });
              }}
            >
              Electronics
            </div>
          </div>
        </div>
      );
    }
  }

  displayImage() {
    const images = [];
    let category = '';
    let categoryName = this.state.imageType;

    switch (this.state.imageType) {
    case 'landAnimals': {
      category = StaticData.landAnimal;
      break;
    }
    case 'seaAnimals': {
      category = StaticData.seaAnimal;
      break;
    }
    case 'fruits': {
      category = StaticData.fruit;
      break;
    }
    case 'vegetables': {
      category = StaticData.vegetable;
      break;
    }
    case 'instruments': {
      category = StaticData.instrument;
      break;
    }
    case 'transportation': {
      category = StaticData.transportation;
      break;
    }
    case 'electronics': {
      category = StaticData.electronics;
      break;
    }
    default: {
      // dead code, there is no state.randomNums
      if (this.state.randomNums[0] % 2 === 1) {
        category = StaticData.landAnimal;
        categoryName = 'landAnimals';
      } else {
        category = StaticData.instrument;
        categoryName = 'instruments';
      }
    }
    }

    const itemURLs = [];
    for (let i = 0; i < 4; i++) {
      let item = category[Math.floor(Math.random() * category.length)];
      while (itemURLs.includes(item.url)) {
        item = category[Math.floor(Math.random() * category.length)];
      }

      itemURLs.push(item.url);
      this.items.push(item);

      images.push(
        <div key={`${i}_${item.url}`}>
          <img
            src={item.url}
            alt={item.classLabels[0]}
            key={item.classLabels[0]}
            onClick={() => {
              // Goes to App.js for logging (not used in game state)
              this.props.update({
                explain_round: {
                  categorySelect: categoryName,
                  imgSelect: _.get(item.classLabels, 0, ''),
                },
              });
              this.props.movetoNext(2);
              this.props.setAnswer(item, true);
              this.props.setPastGuesses(this.items);

            }}
          />
        </div>,
      );
    }

    return (
      <div key="selectCategory">

        <div className={styles['Category__title']}>Select An Image</div>
        <div className={styles['Category__photos']}>
          {images}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles['Category']} key="Category">
        {this.displayContent()}
      </div>
    );
  }
}

export default Category;
