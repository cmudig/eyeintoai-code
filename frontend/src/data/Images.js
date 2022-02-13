/* eslint-disable */
import poodle from '../images/samples/dog.jpg';
// import tabby from '../images/samples/cat.jpg';
import macaw from '../images/samples/parrot.jpg';
import jellyfish from '../images/samples/jellyfish.jpg';
import treeFrog from '../images/samples/frog.jpg';
import loggerhead from '../images/samples/turtle.jpg';
import tiger from '../images/samples/tiger.jpg';
import bee from '../images/samples/bee.jpg';
import toaster from '../images/samples/toaster.jpg';
import camera from '../images/samples/camera.jpg';
import strawberry from '../images/samples/strawberry.jpg';
import train from '../images/samples/train.jpg';
// import acorn from '../images/samples/acorn.jpg';
// import sock from '../images/samples/sock.jpg';
// import castle from '../images/samples/castle.jpg';
// import soccerBall from '../images/samples/soccerball.jpg';

import starfish from '../images/samples/starfish.jpg';
// import spiderMonkey from '../images/samples/spiderMonkey.jpg';
import mudTurtle from '../images/samples/mudturtle.jpg';
import kingSnake from '../images/samples/kingSnake.jpg';
// import banana from '../images/samples/banana.jpg';
import orange from '../images/samples/orange.jpg';
import pineapple from '../images/samples/pineapple.jpg';
// import raspberry from '../images/samples/raspberry.jpg';
import broccoli from '../images/samples/broccoli.jpg';
// import asparagus from '../images/samples/asparagus.jpg';
// import lettuce from '../images/samples/lettuce.jpg';
import corn from '../images/samples/corn.jpg';
import piano from '../images/samples/piano.jpg';
// import trumpet from '../images/samples/trumpet.jpg';
import violin from '../images/samples/violin.jpg';
// import sunflower from '../images/samples/sunflower.jpg';
// import palmTree from '../images/samples/palmTree.jpg';
import car from '../images/samples/car.jpg';
import bicycle from '../images/samples/bicycle.jpg';
import electricFan from '../images/samples/electricFan.jpg';
import laptop from '../images/samples/laptop.jpg';
import keyboard from '../images/samples/keyboard.jpg';

// import seaUrchin from '../images/samples/seaUrchin.jpg';
import seaAnemone from '../images/samples/seaAnemone.jpg';
import pomegranate from '../images/samples/pomegranate.jpg';
import fig from '../images/samples/fig.jpg';
import artichoke from '../images/samples/artichoke.jpg';
import bellPepper from '../images/samples/bellPepper.jpg';
import cucumber from '../images/samples/cucumber.jpg';
// import drum from '../images/samples/drum.jpg';
import acousticGuitar from '../images/samples/acousticGuitar.jpg';
import flute from '../images/samples/flute.jpg';
import harmonica from '../images/samples/harmonica.jpg';
import canoe from '../images/samples/canoe.jpg';
import tractor from '../images/samples/tractor.jpg';
import warplane from '../images/samples/warplane.jpg';
// import spiderMonkey from '../images/samples/spiderMonkey.jpg';

export const StaticData = {
  landAnimal: [
    {
      url: poodle,
      name: "dog", /* fixed */
      correctURLs: [166, 39, 23, 85, 188] ,
      wrongVizURLs: [308, 446, 434, 499, 448] ,
      classLabels: ['dog', 'dogs', 'poodle', 'poodles', 'standard poodle', 'standard poodles'],
      hint: 'land animal',
    },
    // {
    //   url: tabby,
    //   name: "cat", /* fixed */
    //   correctURLs: [493, 88, 168, 93, 450] ,
    //   wrongVizURLs: [505, 417, 410, 460, 446] ,
    //   classLabels: ['cat', 'cats', 'tabby', 'tabbies'],
    //   hint: 'land animal',
    // },
    {
      url:macaw, /* fixed */
      name: "parrot",
      correctURLs: [504, 433, 475, 386, 162] ,
      wrongVizURLs: [132, 332, 119, 434, 523] ,
      
      classLabels: ['parrot', 'parrots', 'macaw', 'macaws', 'bird', 'birds'],
      hint: 'land animal',
    },
    {
      url: treeFrog,
      name: "frog", /* fixed */
      correctURLs: [18, 359, 527, 35, 396] ,
      wrongVizURLs: [246, 49, 211, 229, 159] ,
      classLabels: ['frog', 'frogs', 'tree frog', 'tree frogs'],
      hint: 'land animal',
    },
    {
      url:tiger,
      name : "tiger",
      correctURLs: [23, 39, 102, 142, 165] ,
      wrongVizURLs: [275, 32, 296, 240, 434] ,      
      classLabels: ['tiger', 'tigers'],
      hint: 'land animal',
    },
    {
      url: bee,
      name: "bee", /* fixed */
      correctURLs: [25, 30, 200, 105, 498] ,
      wrongVizURLs: [394, 460, 332, 18, 97] ,
      classLabels: ['bee', 'bees', 'honey bee', 'honey bees'],
      hint: 'land animal',
    },
    {
      url: kingSnake,
      name: "kingSnake",
      correctURLs: [6, 231, 23, 226, 39] ,
      wrongVizURLs: [370, 214, 389, 100, 120] ,
      classLabels:['king snake', 'king snakes', 'snake', 'snakes'],
      hint: 'land animal',
    },
  ],
  seaAnimal:[
    {
      url: jellyfish,
      name: "jellyfish",
      correctURLs: [4, 103, 393, 23, 325] ,
      wrongVizURLs: [286, 362, 107, 36, 15] ,      
      classLabels: ['jellyfish'],
      hint: 'sea animal',
    },
    {
      url: loggerhead,
      name: "turtle",
      correctURLs: [48, 4, 462, 100, 386] ,
      wrongVizURLs: [19, 3, 178, 434, 72] ,
      classLabels: ['turtle', 'turtles', 'loggerhead', 'loggerheads', 'loggerhead sea turtle', 'loggerhead sea turtles', 'loggerhead turtle', 'loggerhead turtles'],
      hint: 'sea animal',
    },
    {
      url: starfish,
      name: "starfish",
      correctURLs: [280, 163, 375, 18, 71] ,
      wrongVizURLs: [178, 434, 295, 21, 121] ,      
      classLabels:['starfish', 'starfishes'],
      hint: 'sea animal',
    },
    {
      url: mudTurtle,
      name: "mudTurtle",
      correctURLs: [93, 229, 527, 173, 88] ,
      wrongVizURLs: [159, 257, 523, 409, 434] ,
      classLabels:['mud turtle', 'mud turtles', 'turtle', 'turtles', 'box turtle', 'box turtles'],
      hint: 'sea animal',
    },
    // {
    //   url: seaUrchin,
    // name: "seaUrchin",
    //   correctURLs: [163, 485, 123, 18, 379, 94, 433, 158],
    //   wrongVizURLs: [332, 25],
    //   classLabels:['sea urchin', 'urchin', 'urchins', 'sea urchins'],
    //   hint: 'sea animals',
    // },
    {
      url: seaAnemone,
      name: "seaAnemone",
      correctURLs: [280, 70, 200, 102, 95] ,
      wrongVizURLs: [58, 463, 212, 34, 523] ,
      classLabels:['sea anemone', 'anemone', 'anemones', 'sea anemones'],
      hint: 'sea animal',
    },
  ],
  fruit: [
    // {
    //   url: banana,
    //   name: "banana",
    //   correctURLs: [47, 259, 44, 57, 131, 150, 97, 407],
    //   wrongVizURLs: [5, 299],
    //   classLabels:['banana', 'bananas'],
    //   hint: 'fruit',
    // },
    // {
    //   url: orange,
    //   name: "orange",
    //   correctURLs: [9, 111, 285, 435, 485] ,
    //   wrongVizURLs: [394, 295, 233, 434, 416] ,
    //   classLabels:['orange', 'oranges', 'tangerine', 'tangerines'],
    //   hint: 'fruit',
    // },
    {
      url: pineapple,
      name: "pineapple",
      correctURLs: [2, 200, 96, 217, 61] ,
      wrongVizURLs: [106, 92, 232, 19, 434] ,
      classLabels:['pineapple', 'pineapples'],
      hint: 'fruit',
    },
    {
      url: strawberry,
      name: "strawberry", /* fixed */
      correctURLs: [20, 197, 69, 202, 520] ,
      wrongVizURLs: [315, 299, 321, 233, 394] ,      
      classLabels: ['strawberry', 'strawberries'],
      hint: 'fruit',
    },
    {
      url: pomegranate,
      name: "pomegranate",
      correctURLs: [82, 20, 323, 307, 72] ,
      wrongVizURLs: [295, 26, 17, 100, 257] ,      
      classLabels:['pomegranate', 'pomegranates'],
      hint: 'fruit',
    },
    {
      url: fig,
      name: "fig",
      correctURLs: [82, 114, 382, 73, 485] ,
      wrongVizURLs: [121, 438, 391, 98, 434] ,
      classLabels:['fig', 'figs'],
      hint: 'fruit',
    },
  ],
  vegetable: [
    {
      url: broccoli,
      name: "broccoli",
      correctURLs: [0, 462, 86, 21, 58] ,
      wrongVizURLs: [112, 295, 32, 25, 434] ,
      classLabels:['broccoli', 'broccolis'],
      hint: 'vegetable',
    },
    {
      url: corn,
      name: "corn",
      correctURLs: [109, 435, 326, 25, 198] ,
      wrongVizURLs: [297, 224, 281, 441, 434] ,
      classLabels:['corn', 'corns'],
      hint: 'vegetable',
    },
    {
      url: artichoke,
      name: "artichoke",
      correctURLs: [33, 328, 447, 82, 130] ,
      wrongVizURLs: [19, 391, 164, 154, 434] ,
      classLabels:['artichoke', 'artichokes'],
      hint: 'vegetable',
    },
    {
      url: bellPepper,
      name: "bellPepper",
      correctURLs: [433, 294, 61, 16, 198] ,
      wrongVizURLs: [119, 108, 128, 478, 434] ,
      classLabels:['bell pepper', 'pepper', 'peppers', 'bell peppers'],
      hint: 'vegetable',
    },
    {
      url: cucumber,
      name: "cucumber",
      correctURLs: [2, 202, 433, 294, 511] ,
      wrongVizURLs: [434, 111, 331, 94, 27] ,      
      classLabels:['cucumber', 'cucumbers'],
      hint: 'vegetable',
    },
  ],
  instrument: [
    {
      url: violin,
      name: "violin",
      correctURLs: [66, 348, 238, 98, 131] ,
      wrongVizURLs: [27, 95, 19, 352, 5] ,
      classLabels:['violin', 'violins', 'viola', 'violas', 'cello', 'cellos'],
      hint: 'musical instrument',
    },
    {
      url: piano,
      name: "piano",
      correctURLs: [338, 23, 156, 31, 249] ,
      wrongVizURLs: [87, 126, 100, 84, 85] ,
      classLabels:['piano', 'pianos', 'grand piano', 'grand pianos'],
      hint: 'musical instrument',
    },
    // {
    //   url: drum,
    //   name: "drum",
    //   correctURLs: [84, 70, 42, 91, 38] ,
    //   wrongVizURLs: [494, 321, 481, 54, 93] ,
    //   classLabels:['drum', 'drums', 'steel drum', 'steel drums'],
    //   hint: 'musical instrument',
    // },
    {
      url: acousticGuitar,
      name: "acousticGuitar",
      correctURLs: [348, 11, 108, 79, 93] ,
      wrongVizURLs: [50, 287, 35, 419, 32] ,
      classLabels:['guitar', 'guitars', 'acoustic guitar', 'acoustic guitars'],
      hint: 'musical instrument',
    },
    {
      url: flute,
      name: "flute",
      correctURLs: [75, 12, 368, 23, 4] ,
      wrongVizURLs: [434, 514, 313, 420, 297] ,
      classLabels:['flute', 'flutes'],
      hint: 'musical instrument',
    },
    {
      url: harmonica,
      name: "harmonica",
      correctURLs: [433, 435, 467, 132, 61] ,
      wrongVizURLs: [523, 86, 495, 304, 70] ,
      classLabels:['harmonica', 'harmonicas'],
      hint: 'musical instrument',
    },
  ],
  transportation: [
    {
      url: bicycle,
      name: "bicycle",
      correctURLs: [42, 99, 204, 84, 39] ,
      wrongVizURLs: [164, 244, 93, 434, 460] ,
      classLabels:['bicycle', 'bicycles', 'bike', 'bikes', 'bicycle-for-two'],
      hint: 'transportation',
    },
      {
        url: car,
        name: "car",
        correctURLs: [55, 409, 123, 498, 23] ,
        wrongVizURLs: [248, 403, 455, 195, 417] ,
        classLabels:['car', 'cars', 'passenger car', 'passenger cars', 'sedan', 'sedans'],
        hint: 'transportation',
      },
      {
        url: train,
        name: "train",
        correctURLs: [62, 284, 39, 5, 433] ,
        wrongVizURLs: [141, 421, 489, 164, 269] ,
        classLabels: ['train', 'trains', 'passenger car', 'passenger cars', 'coach', 'coaches', 'railroad car', 'railroad cars', 'carriage', 'carriages', 'railway car', 'railway cars', 'railcar', 'railcars'],
        hint: 'transportation',
      },
    {
      url: canoe,
      name: "canoe",
      correctURLs: [27, 507, 462, 11, 13] ,
      wrongVizURLs: [463, 398, 434, 304, 29] ,      
      classLabels:['canoe', 'boat', 'canoes', 'boats'],
      hint: 'transportation',
    },
    {
      url: tractor,
      name: "tractor",
      correctURLs: [169, 243, 72, 11, 375] ,
      wrongVizURLs: [460, 485, 434, 84, 484] ,
      classLabels:['tractor', 'tractors'],
      hint: 'transportation',
    },
    {
      url: warplane,
      name: "warplane",
      correctURLs: [217, 208, 347, 104, 433, 83, 125, 325],
      wrongVizURLs: [211, 480],
      classLabels:['warplanes', 'warplane', 'jet', 'jets', 'plane', 'planes'],
      hint: 'transportation',
    },
  ],
  electronics: [
    {
      url: laptop,
      name: "laptop",
      correctURLs: [47, 3, 218, 234, 433] ,
      wrongVizURLs: [6, 463, 236, 467, 88] ,
      classLabels:['laptop', 'laptops', 'computer', 'computers'],
      hint: 'electronics',
    },
    {
      url: electricFan,
      name: "electricFan",
      correctURLs: [15, 24, 203, 399, 0] ,
      wrongVizURLs: [59, 170, 434, 166, 495] ,
      classLabels:['fan', 'fans', 'electric fan', 'electric fans'],
      hint: 'electronics',
    },
    // {
    //   url: keyboard,
    //   name: "keyboard",
    //   correctURLs: [441, 502, 47, 23, 104] ,
    //   wrongVizURLs: [184, 180, 352, 343, 394] ,
    //   classLabels:['keyboard', 'keyboards', 'computer keyboard', 'computer keys', 'keys'],
    //   hint: 'electronics',
    // },
    // {
    //   url: toaster,
    //   name: "toaster",
    //   correctURLs: [456, 433, 37, 294, 414] ,
    //   wrongVizURLs: [319, 244, 364, 5, 27] ,
    //   classLabels: ['toaster', 'toasters'],
    //   hint: 'electronics',
    // }, 
    {
      url: camera, /* fixed, class*/
      name: "camera",
      correctURLs: [527, 31, 11, 32, 23] ,
      wrongVizURLs: [371, 394, 304, 29, 434] ,
      classLabels: ['camera', 'cameras', 'reflex camera', 'reflex cameras'],
      hint: 'electronics',
    }],
};

// Unused Images
// object: [
// {
//     url: acorn,
// name: "acorn", // fixed
// 	correctURLs: [508, 40, 186, 6, 14, 23, 82, 478],
// 	wrongVizURLs: [438, 198],
// 	classLabels: ['acorn', 'acorns'],
// 	hint: 'food',
// },
// {
//     url: sock,
// name: "sock",
// 	correctURLs: [109, 407, 70, 124, 310, 96, 197, 32],
// 	wrongVizURLs: [23, 296],
// 	classLabels: ['sock', 'socks'],
// 	hint: 'home appliances',
// },{
//     url: castle,
// name: "castle", // fixed
// 	correctURLs: [88, 8, 467, 39, 3, 44, 462, 99],
// 	wrongVizURLs: [424, 203],
// 	classLabels: ['castle', 'castles'],
// 	hint: 'building',
// },{
//     url: soccerBall,
// name: "soccerBall",
// 	correctURLs: [148, 252, 301, 152, 104, 376, 23, 185],
// 	wrongVizURLs: [268, 172],
// 	classLabels: ['soccer ball', 'soccer balls', 'ball', 'balls'],
// 	hint: 'toy',
// },


// let obj = JSON.parse(JSON.stringify(StaticData));

// for (const [key, value] of Object.entries(obj)) {
//   value.forEach((element) => {
//     delete element["url"]
//   }) 
// }

// console.log(JSON.stringify(obj))