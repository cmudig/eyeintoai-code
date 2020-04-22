import React, { Component } from 'react';
import _ from 'lodash';

import styles from './Category.module.scss';
import { StaticData } from '../../data/images';

class Category extends Component {
  state = {
    nextStage: false,
    imageType: '',
  };

  displayContent() {
    if (this.state.nextStage) {
      return [(this.displayImage())];
    } else {
      return (
        <div>
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
            <div
              className={styles['Category__button']}
              onClick={() => {
                this.props.setTestPhase();
                const randomBool = Math.random() >= 0.5;
                if (randomBool) {
                  const item = StaticData.landAnimal[Math.floor(Math.random() * StaticData.landAnimal.length)];
                  this.props.setAnswer(item);
                  this.props.update({
                    explain_round: {
                      categorySelect: 'landAnimals',
                      imgSelect: item.classLabels[0],
                    },
                  });
                } else {
                  const item = StaticData.instrument[Math.floor(Math.random() * StaticData.instrument.length)];
                  this.props.setAnswer(item);
                  this.props.update({
                    explain_round: {
                      categorySelect: 'instruments',
                      imgSelect: item.classLabels[0],
                    },
                  });
                }
                this.props.movetoNext(2);
              }}
            >
              Random
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
      images.push(
        <div key={`${i}_${item.url}`}>
          <img
            src={item.url}
            alt={item.classLabels[0]}
            key={item.classLabels[0]}
            onClick={() => {
              this.props.update({
                explain_round: {
                  categorySelect: categoryName,
                  imgSelect: _.get(item.classLabels, 0, ''),
                },
              });
              this.props.setAnswer(item);
              this.props.movetoNext(2);
            }}
          />
        </div>
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
