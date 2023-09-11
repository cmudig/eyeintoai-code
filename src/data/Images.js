/* eslint-disable */
import poodle from '../images/samples/dog.jpg';
import tabby from '../images/samples/cat.jpg';
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
import drum from '../images/samples/drum.jpg';
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
      randomURLs: [163, 236, 185, 261, 395],
      randomURLs10: [489, 143, 366, 253, 208, 62, 170, 283, 275, 344],
      classLabels: ['dog', 'dogs', 'poodle', 'poodles', 'standard poodle', 'standard poodles'],
      hint: 'land animal',
    },
    {
      url: tabby,
      name: "cat", /* fixed */
      correctURLs: [493, 88, 168, 93, 450] ,
      wrongVizURLs: [505, 417, 410, 460, 446] ,
      randomURLs: [164, 523, 418, 483, 423],
      randomURLs10: [74, 149, 278, 374, 81, 295, 427, 100, 256, 481],
      classLabels: ['cat', 'cats', 'tabby', 'tabbies'],
      hint: 'land animal',
    },
    {
      url:macaw, /* fixed */
      name: "parrot",
      correctURLs: [504, 433, 475, 386, 162] ,
      wrongVizURLs: [132, 332, 119, 434, 523] ,
      randomURLs: [405, 170, 237, 59, 449],
      randomURLs10: [423, 287, 248, 177, 13, 450, 421, 85, 353, 444],
      classLabels: ['parrot', 'parrots', 'macaw', 'macaws', 'bird', 'birds'],
      hint: 'land animal',
    },
    {
      url: treeFrog,
      name: "frog", /* fixed */
      correctURLs: [18, 359, 527, 35, 396] ,
      wrongVizURLs: [246, 49, 211, 229, 159] ,
      randomURLs: [330, 369, 142, 391, 363],
      randomURLs10: [51, 515, 155, 105, 326, 463, 61, 228, 25, 466],
      classLabels: ['frog', 'frogs', 'tree frog', 'tree frogs'],
      hint: 'land animal',
    },
    {
      url:tiger,
      name : "tiger",
      correctURLs: [23, 39, 102, 142, 165] ,
      wrongVizURLs: [275, 32, 296, 240, 434] ,
      randomURLs: [141, 105, 177, 356, 186],   
      randomURLs10: [206, 171, 460, 290, 358, 206, 442, 177, 471, 423],   
      classLabels: ['tiger', 'tigers'],
      hint: 'land animal',
    },
    {
      url: bee,
      name: "bee", /* fixed */
      correctURLs: [25, 30, 200, 105, 498] ,
      wrongVizURLs: [394, 460, 332, 18, 97] ,
      randomURLs: [409, 175, 77, 70, 522],
      randomURLs10: [450, 336, 361, 399, 212, 11, 417, 487, 437, 117],
      classLabels: ['bee', 'bees', 'honey bee', 'honey bees'],
      hint: 'land animal',
    },
    {
      url: kingSnake,
      name: "kingSnake",
      correctURLs: [6, 231, 23, 226, 39] ,
      wrongVizURLs: [370, 214, 389, 100, 120] ,
      randomURLs: [338, 521, 383, 291, 17],
      randomURLs10: [209, 304, 152, 30, 174, 412, 300, 94, 149, 343],
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
      randomURLs: [400, 33, 188, 109, 466],  
      randomURLs10: [132, 507, 505, 157, 141, 48, 506, 233, 211, 69], 
      classLabels: ['jellyfish'],
      hint: 'sea animal',
    },
    {
      url: loggerhead,
      name: "turtle",
      correctURLs: [48, 4, 462, 100, 386] ,
      wrongVizURLs: [19, 3, 178, 434, 72] ,
      randomURLs: [455, 447, 522, 163, 496],
      randomURLs10: [224, 208, 390, 521, 199, 303, 173, 259, 304, 198],
      classLabels: ['turtle', 'turtles', 'loggerhead', 'loggerheads', 'loggerhead sea turtle', 'loggerhead sea turtles', 'loggerhead turtle', 'loggerhead turtles'],
      hint: 'sea animal',
    },
    {
      url: starfish,
      name: "starfish",
      correctURLs: [280, 163, 375, 18, 71] ,
      wrongVizURLs: [178, 434, 295, 21, 121] ,
      randomURLs: [7, 310, 147, 308, 278],   
      randomURLs10: [228, 157, 242, 468, 396, 410, 364, 391, 259, 383], 
      classLabels:['starfish', 'starfishes'],
      hint: 'sea animal',
    },
    {
      url: mudTurtle,
      name: "mudTurtle",
      correctURLs: [93, 229, 527, 173, 88] ,
      wrongVizURLs: [159, 257, 523, 409, 434] ,
      randomURLs: [105, 38, 265, 470, 360],
      randomURLs10: [320, 28, 516, 99, 206, 254, 75, 465, 428, 441],
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
      randomURLs: [86, 153, 333, 483, 195],
      randomURLs10: [287, 474, 460, 331, 421, 234, 411, 285, 409, 245],
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
    {
      url: orange,
      name: "orange",
      correctURLs: [9, 111, 285, 435, 485] ,
      wrongVizURLs: [394, 295, 233, 434, 416] ,
      randomURLs: [433, 124, 105, 449, 502],
      randomURLs10: [465, 365, 527, 464, 122, 88, 242, 318, 467, 173],
      classLabels:['orange', 'oranges', 'tangerine', 'tangerines'],
      hint: 'fruit',
    },
    {
      url: pineapple,
      name: "pineapple",
      correctURLs: [2, 200, 96, 217, 61] ,
      wrongVizURLs: [106, 92, 232, 19, 434] ,
      randomURLs: [212, 522, 263, 274, 183],
      randomURLs10: [150, 3, 489, 492, 484, 110, 445, 24, 402, 252],
      classLabels:['pineapple', 'pineapples'],
      hint: 'fruit',
    },
    {
      url: strawberry,
      name: "strawberry", /* fixed */
      correctURLs: [20, 197, 69, 202, 520] ,
      wrongVizURLs: [315, 299, 321, 233, 394] ,
      randomURLs: [414, 442, 440, 23, 527],   
      randomURLs10: [363, 88, 167, 51, 280, 126, 341, 55, 96, 343], 
      classLabels: ['strawberry', 'strawberries'],
      hint: 'fruit',
    },
    {
      url: pomegranate,
      name: "pomegranate",
      correctURLs: [82, 20, 323, 307, 72] ,
      wrongVizURLs: [295, 26, 17, 100, 257] ,
      randomURLs: [40, 130, 505, 205, 59],  
      randomURLs10: [478, 91, 143, 431, 278, 170, 293, 43, 384, 337],   
      classLabels:['pomegranate', 'pomegranates'],
      hint: 'fruit',
    },
    {
      url: fig,
      name: "fig",
      correctURLs: [82, 114, 382, 73, 485] ,
      wrongVizURLs: [121, 438, 391, 98, 434] ,
      randomURLs: [351, 240, 340, 514, 483],
      randomURLs10: [393, 362, 469, 139, 487, 15, 6, 97, 509, 71],
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
      randomURLs: [308, 416, 413, 246, 12],
      randomURLs10: [347, 450, 520, 487, 516, 455, 230, 36, 386, 282],
      classLabels:['broccoli', 'broccolis'],
      hint: 'vegetable',
    },
    {
      url: corn,
      name: "corn",
      correctURLs: [109, 435, 326, 25, 198] ,
      wrongVizURLs: [297, 224, 281, 441, 434] ,
      randomURLs: [19, 445, 30, 512, 305],
      randomURLs10: [82, 506, 511, 493, 45, 147, 285, 108, 274, 493],
      classLabels:['corn', 'corns'],
      hint: 'vegetable',
    },
    {
      url: artichoke,
      name: "artichoke",
      correctURLs: [33, 328, 447, 82, 130] ,
      wrongVizURLs: [19, 391, 164, 154, 434] ,
      randomURLs: [472, 382, 360, 218, 427],
      randomURLs10: [54, 125, 297, 379, 377, 455, 118, 473, 280, 109],
      classLabels:['artichoke', 'artichokes'],
      hint: 'vegetable',
    },
    {
      url: bellPepper,
      name: "bellPepper",
      correctURLs: [433, 294, 61, 16, 198] ,
      wrongVizURLs: [119, 108, 128, 478, 434] ,
      randomURLs: [224, 399, 90, 421, 219],
      randomURLs10: [234, 299, 121, 141, 269, 494, 328, 430, 275, 246],
      classLabels:['bell pepper', 'pepper', 'peppers', 'bell peppers'],
      hint: 'vegetable',
    },
    {
      url: cucumber,
      name: "cucumber",
      correctURLs: [2, 202, 433, 294, 511] ,
      wrongVizURLs: [434, 111, 331, 94, 27] ,
      randomURLs: [43, 427, 114, 64, 255],  
      randomURLs10: [359, 467, 228, 113, 372, 150, 24, 385, 180, 262],
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
      randomURLs: [86, 278, 65, 38, 328],
      randomURLs10: [100, 400, 527, 176, 191, 55, 473, 101, 162, 9],
      classLabels:['violin', 'violins', 'viola', 'violas', 'cello', 'cellos'],
      hint: 'musical instrument',
    },
    {
      url: piano,
      name: "piano",
      correctURLs: [338, 23, 156, 31, 249] ,
      wrongVizURLs: [87, 126, 100, 84, 85] ,
      randomURLs: [19, 402, 318, 228, 416],
      randomURLs10: [514, 114, 318, 78, 115, 123, 380, 401, 405, 505],
      classLabels:['piano', 'pianos', 'grand piano', 'grand pianos'],
      hint: 'musical instrument',
    },
    {
      url: drum,
      name: "drum",
      correctURLs: [84, 70, 42, 91, 38] ,
      wrongVizURLs: [494, 321, 481, 54, 93] ,
      randomURLs: [316, 111, 142, 219, 500],
      randomURLs10: [74, 489, 356, 234, 178, 492, 515, 331, 339, 400],
      classLabels:['drum', 'drums', 'steel drum', 'steel drums'],
      hint: 'musical instrument',
    },
    {
      url: acousticGuitar,
      name: "acousticGuitar",
      correctURLs: [348, 11, 108, 79, 93] ,
      wrongVizURLs: [50, 287, 35, 419, 32] ,
      randomURLs: [267, 349, 190, 245, 457],
      randomURLs10: [30, 455, 341, 240, 283, 291, 39, 257, 29, 426],
      classLabels:['guitar', 'guitars', 'acoustic guitar', 'acoustic guitars'],
      hint: 'musical instrument',
    },
    {
      url: flute,
      name: "flute",
      correctURLs: [75, 12, 368, 23, 4] ,
      wrongVizURLs: [434, 514, 313, 420, 297] ,
      randomURLs: [253, 262, 188, 0, 99],
      randomURLs10: [166, 144, 342, 95, 260, 383, 316, 26, 11, 249],
      classLabels:['flute', 'flutes'],
      hint: 'musical instrument',
    },
    {
      url: harmonica,
      name: "harmonica",
      correctURLs: [433, 435, 467, 132, 61] ,
      wrongVizURLs: [523, 86, 495, 304, 70] ,
      randomURLs: [482, 202, 256, 377, 472],
      randomURLs10: [374, 186, 11, 276, 303, 300, 93, 306, 146, 424],
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
      randomURLs: [69, 201, 62, 339, 526],
      randomURLs10: [373, 506, 299, 104, 502, 491, 70, 225, 322, 121],
      classLabels:['bicycle', 'bicycles', 'bike', 'bikes', 'bicycle-for-two'],
      hint: 'transportation',
    },
      {
        url: car,
        name: "car",
        correctURLs: [55, 409, 123, 498, 23] ,
        wrongVizURLs: [248, 403, 455, 195, 417] ,
        randomURLs: [94, 251, 56, 52, 104],
        randomURLs10: [175, 178, 390, 514, 270, 404, 297, 24, 453, 399],
        classLabels:['car', 'cars', 'passenger car', 'passenger cars', 'sedan', 'sedans'],
        hint: 'transportation',
      },
      {
        url: train,
        name: "train",
        correctURLs: [62, 284, 39, 5, 433] ,
        wrongVizURLs: [141, 421, 489, 164, 269] ,
        randomURLs: [504, 170, 472, 178, 33],
        randomURLs10: [257, 159, 98, 90, 9, 414, 151, 278, 51, 26],
        classLabels: ['train', 'trains', 'passenger car', 'passenger cars', 'coach', 'coaches', 'railroad car', 'railroad cars', 'carriage', 'carriages', 'railway car', 'railway cars', 'railcar', 'railcars'],
        hint: 'transportation',
      },
    {
      url: canoe,
      name: "canoe",
      correctURLs: [27, 507, 462, 11, 13] ,
      wrongVizURLs: [463, 398, 434, 304, 29] ,
      randomURLs: [392, 210, 234, 444, 366],     
      randomURLs10: [456, 351, 484, 217, 523, 407, 179, 55, 292, 85],
      classLabels:['canoe', 'boat', 'canoes', 'boats'],
      hint: 'transportation',
    },
    {
      url: tractor,
      name: "tractor",
      correctURLs: [169, 243, 72, 11, 375] ,
      wrongVizURLs: [460, 485, 434, 84, 484] ,
      randomURLs: [473, 268, 207, 59, 503],
      randomURLs10: [272, 438, 323, 7, 467, 49, 268, 497, 368, 362],
      classLabels:['tractor', 'tractors'],
      hint: 'transportation',
    },
    {
      url: warplane,
      name: "warplane",
      correctURLs: [217, 208, 347, 104, 433, 83, 125, 325],
      wrongVizURLs: [211, 480],
      randomURLs: [292, 282, 473, 420, 191],
      randomURLs10: [192, 197, 524, 71, 41, 31, 78, 385, 414, 348],
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
      randomURLs: [496, 112, 131, 170, 309],
      randomURLs10: [511, 497, 186, 507, 314, 130, 423, 70, 55, 393],
      classLabels:['laptop', 'laptops', 'computer', 'computers'],
      hint: 'electronics',
    },
    {
      url: electricFan,
      name: "electricFan",
      correctURLs: [15, 24, 203, 399, 0] ,
      wrongVizURLs: [59, 170, 434, 166, 495] ,
      randomURLs: [493, 291, 473, 329, 48],
      randomURLs10: [450, 113, 55, 162, 368, 506, 35, 430, 420, 323],
      classLabels:['fan', 'fans', 'electric fan', 'electric fans'],
      hint: 'electronics',
    },
    {
      url: keyboard,
      name: "keyboard",
      correctURLs: [441, 502, 47, 23, 104] ,
      wrongVizURLs: [184, 180, 352, 343, 394] ,
      randomURLs: [77, 189, 148, 245, 400],
      randomURLs10: [477, 431, 449, 266, 312, 232, 12, 16, 340, 283],
      classLabels:['keyboard', 'keyboards', 'computer keyboard', 'computer keys', 'keys'],
      hint: 'electronics',
    },
    {
      url: toaster,
      name: "toaster",
      correctURLs: [456, 433, 37, 294, 414] ,
      wrongVizURLs: [319, 244, 364, 5, 27] ,
      randomURLs: [266, 333, 225, 363, 352],
      randomURLs10: [493, 225, 208, 215, 392, 254, 169, 276, 81, 49],
      classLabels: ['toaster', 'toasters'],
      hint: 'electronics',
    }, 
    {
      url: camera, /* fixed, class*/
      name: "camera",
      correctURLs: [527, 31, 11, 32, 23] ,
      wrongVizURLs: [371, 394, 304, 29, 434] ,
      randomURLs: [165, 428, 204, 494, 248],
      randomURLs10: [185, 107, 487, 470, 513, 194, 404, 211, 430, 382],
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