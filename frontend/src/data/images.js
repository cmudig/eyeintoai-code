import poodle from '../image/samples/dog.jpg';
import tabby from '../image/samples/cat.jpg';
import macaw from '../image/samples/parrot.jpg';
import jellyfish from '../image/samples/jellyfish.jpg';
import treeFrog from '../image/samples/frog.jpg';
import loggerhead from '../image/samples/turtle.jpg';
import tiger from '../image/samples/tiger.jpg';
import bee from '../image/samples/bee.jpg';
import toaster from '../image/samples/toaster.jpg';
import camera from '../image/samples/camera.jpg';
import strawberry from '../image/samples/strawberry.jpg';
import train from '../image/samples/train.jpg';
// import acorn from '../image/samples/acorn.jpg';
// import sock from '../image/samples/sock.jpg';
// import castle from '../image/samples/castle.jpg';
// import soccerBall from '../image/samples/soccerball.jpg';

import starfish from '../image/samples/starfish.jpg';
// import spiderMonkey from '../image/samples/spiderMonkey.jpg';
import mudTurtle from '../image/samples/mudTurtle.jpg';
import kingSnake from '../image/samples/kingSnake.jpg';
import banana from '../image/samples/banana.jpg';
import orange from '../image/samples/orange.jpg';
import pineapple from '../image/samples/pineapple.jpg';
// import raspberry from '../image/samples/raspberry.jpg';
import broccoli from '../image/samples/broccoli.jpg';
// import asparagus from '../image/samples/asparagus.jpg';
// import lettuce from '../image/samples/lettuce.jpg';
import corn from '../image/samples/corn.jpg';
import piano from '../image/samples/piano.jpg';
// import trumpet from '../image/samples/trumpet.jpg';
import violin from '../image/samples/violin.jpg';
// import sunflower from '../image/samples/sunflower.jpg';
// import palmTree from '../image/samples/palmTree.jpg';
import car from '../image/samples/car.jpg';
import bicycle from '../image/samples/bicycle.jpg';
import electricFan from '../image/samples/electricFan.jpg';
import laptop from '../image/samples/laptop.jpg';
import keyboard from '../image/samples/keyboard.jpg';

export const StaticData = {
  landAnimal: [
    {
      url: poodle, /* fixed */
      correctURLs: [166, 39, 23, 85, 188, 21, 182, 478],
      wrongVizURLs: [201, 502],
      classLabels: ['dog', 'dogs', 'poodle', 'poodles', 'standard poodle', 'standard poodles'],
      hint: 'land animals',
    },
    {
      url: tabby, /* fixed */
      correctURLs: [493, 88, 168, 93, 450, 162, 305, 433],
      wrongVizURLs: [116, 517],
      classLabels: ['cat', 'cats', 'tabby', 'tabbies'],
      hint: 'land animals',
    },
    {
      url:macaw, /* fixed */
      correctURLs: [504, 433, 475, 386, 162, 30, 47, 251],
      wrongVizURLs: [301, 177],
      classLabels: ['parrot', 'parrots', 'macaw', 'macaws', 'bird', 'birds'],
      hint: 'land animals',
    },
    {
      url: treeFrog, /* fixed */
      correctURLs: [18, 359, 527, 35, 396, 252, 93, 245],
      wrongVizURLs: [434, 121],
      classLabels: ['frog', 'frogs', 'tree frog', 'tree frogs'],
      hint: 'land animals',
    },
    {
      url:tiger,
      correctURLs: [23, 39, 102, 142, 165, 108, 191, 221],
      wrongVizURLs: [305, 193],
      classLabels: ['tiger', 'tigers'],
      hint: 'land animals',
    },
    {
      url: bee, /* fixed */
      correctURLs: [25, 30, 200, 105, 498, 387, 23, 4],
      wrongVizURLs: [337, 2],
      classLabels: ['bee', 'bees', 'honey bee', 'honey bees'],
      hint: 'land animals',
    },
    {
      url: kingSnake,
      correctURLs: [6, 231, 23, 226, 39, 72],
      wrongVizURLs: [280, 275],
      classLabels:['king snake', 'king snakes', 'snake', 'snakes'],
      hint: 'land animals',
    },
  ],
  seaAnimal:[
    {
      url: jellyfish,
      correctURLs: [4, 103, 393, 23, 325, 11, 9, 433],
      wrongVizURLs: [ 102, 39],
      classLabels: ['jellyfish'],
      hint: 'sea animals',
    },
    {
      url: loggerhead,
      correctURLs: [48, 4, 462, 100, 386, 266, 15, 433],
      wrongVizURLs: [151, 353],
      classLabels: ['turtle', 'turtles', 'loggerhead', 'loggerheads', 'loggerhead sea turtle', 'loggerhead sea turtles', 'loggerhead turtle', 'loggerhead turtles'],
      hint: 'sea animals',
    },
    {
      url: starfish,
      correctURLs: [280, 163, 375, 18, 71, 13],
      wrongVizURLs: [177, 224],
      classLabels:['starfish', 'starfishes'],
      hint: 'sea animals',
    },
    {
      url: mudTurtle,
      correctURLs: [93, 229, 527, 173, 88, 174],
      wrongVizURLs: [72, 322],
      classLabels:['mud turtle', 'mud turtles', 'turtle', 'turtles', 'box turtle', 'box turtles'],
      hint: 'sea animals',
    },
  ],
  fruit: [
    {
      url: banana,
      correctURLs: [47, 259, 44, 57, 131, 150],
      wrongVizURLs: [5, 299],
      classLabels:['banana', 'bananas'],
      hint: 'fruits',
    },
    {
      url: orange,
      correctURLs: [9, 111, 285, 435, 485, 239],
      wrongVizURLs: [512, 196],
      classLabels:['orange', 'oranges', 'tangerine', 'tangerines'],
      hint: 'fruits',
    },
    {
      url: pineapple,
      correctURLs: [2, 200, 96, 217, 61, 33],
      wrongVizURLs: [79, 432],
      classLabels:['pineapple', 'pineapples'],
      hint: 'fruits',
    },
    {
      url: strawberry, /* fixed */
      correctURLs: [20, 197, 69, 202, 520, 239, 368, 386],
      wrongVizURLs: [334, 446],
      classLabels: ['strawberry', 'strawberries'],
      hint: 'food',
    },
  ],
  vegetable: [
    {
      url: broccoli,
      correctURLs: [0, 462, 86, 21, 58, 376],
      wrongVizURLs: [229, 292],
      classLabels:['broccoli', 'broccolis'],
      hint: 'vegetables',
    },
    {
      url: corn,
      correctURLs: [109, 435, 326, 25, 198, 282],
      wrongVizURLs: [30, 222],
      classLabels:['corn', 'corns'],
      hint: 'vegetables',
    },
  ],
  instrument: [
    {
      url: violin,
      correctURLs: [66, 348, 238, 98, 131, 47],
      wrongVizURLs: [396, 208],
      classLabels:['violin', 'violins', 'viola', 'violas', 'cello', 'cellos'],
      hint: 'musical instrument',
    },
    {
      url: piano,
      correctURLs: [338, 23, 156, 31, 249, 244],
      wrongVizURLs: [519, 343],
      classLabels:['piano', 'pianos', 'grand piano', 'grand pianos'],
      hint: 'musical instrument',
    },
  ],
  transportation: [
    {
      url: bicycle,
      correctURLs: [5, 74, 35, 27, 409, 251],
      wrongVizURLs: [10, 435],
      classLabels:['bicycle', 'bicycles', 'bike', 'bikes', 'bicycle-for-two'],
      hint: 'transportation',
    },
    {
      url: car,
      correctURLs: [55, 409, 123, 498, 23, 273],
      wrongVizURLs: [410, 8],
      classLabels:['car', 'cars', 'passenger car', 'passenger cars', 'sedan', 'sedans'],
      hint: 'transportation',
    }, {
      url: train,
      correctURLs: [62, 284, 39, 5, 433, 474, 23, 149],
      wrongVizURLs: [445, 12],
      classLabels: ['train', 'trains', 'passenger car', 'passenger cars', 'coach', 'coaches', 'railroad car', 'railroad cars', 'carriage', 'carriages', 'railway car', 'railway cars', 'railcar', 'railcars'],
      hint: 'transportation',
    },
  ],
  electronics: [
    {
      url: laptop,
      correctURLs: [47, 3, 218, 234, 433, 11],
      wrongVizURLs: [262, 66],
      classLabels:['laptop', 'laptops', 'computer', 'computers'],
      hint: 'electronics',
    },
    {
      url: electricFan,
      correctURLs: [102, 127, 15, 237, 47, 408],
      wrongVizURLs: [394, 419],
      classLabels:['fan', 'fans', 'electric fan', 'electric fans'],
      hint: 'electronics',
    },
    {
      url: keyboard,
      correctURLs: [441, 502, 47, 23, 104, 96],
      wrongVizURLs: [341, 35],
      classLabels:['keyboard', 'keyboards', 'computer keyboard', 'computer keys', 'keys'],
      hint: 'electronics',
    },
    {
      url: toaster,
      correctURLs: [456, 433, 37, 294, 414, 61, 54, 100],
      wrongVizURLs: [86, 105],
      classLabels: ['toaster', 'toasters'],
      hint: 'electronics',
    }, {
      url: camera, /* fixed, class 'reflex camera' */
      correctURLs: [527, 31, 11, 32, 23, 60, 399, 91],
      wrongVizURLs: [526, 523],
      classLabels: ['camera', 'cameras', 'reflex camera', 'reflex cameras'],
      hint: 'electronics',
    }],
};

// Unused Images
// object: [
// {
//     url: acorn, // fixed
// 	correctURLs: [508, 40, 186, 6, 14, 23, 82, 478],
// 	wrongVizURLs: [438, 198],
// 	classLabels: ['acorn', 'acorns'],
// 	hint: 'food',
// },
// {
//     url: sock,
// 	correctURLs: [109, 407, 70, 124, 310, 96, 197, 32],
// 	wrongVizURLs: [23, 296],
// 	classLabels: ['sock', 'socks'],
// 	hint: 'home appliances',
// },{
//     url: castle, // fixed
// 	correctURLs: [88, 8, 467, 39, 3, 44, 462, 99],
// 	wrongVizURLs: [424, 203],
// 	classLabels: ['castle', 'castles'],
// 	hint: 'building',
// },{
//     url: soccerBall,
// 	correctURLs: [148, 252, 301, 152, 104, 376, 23, 185],
// 	wrongVizURLs: [268, 172],
// 	classLabels: ['soccer ball', 'soccer balls', 'ball', 'balls'],
// 	hint: 'toy',
// },
