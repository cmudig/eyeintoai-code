import poodle from '../image/samples/dog.jpg'
import tabby from '../image/samples/cat.jpg'
import macaw from '../image/samples/parrot.jpg'
import jellyfish from '../image/samples/jellyfish.jpg'
import treeFrog from '../image/samples/frog.jpg'
import loggerhead from '../image/samples/turtle.jpg'
import tiger from '../image/samples/tiger.jpg'
import bee from '../image/samples/bee.jpg'
import acorn from '../image/samples/acorn.jpg'
import toaster from '../image/samples/toaster.jpg'
import camera from '../image/samples/camera.jpg'
import sock from '../image/samples/sock.jpg'
import strawberry from '../image/samples/strawberry.jpg'
import castle from '../image/samples/castle.jpg'
import train from '../image/samples/train.jpg'
import soccerBall from '../image/samples/soccerball.jpg'

export const StaticData = {
    animal:[
    {
    url: poodle,
	correctURLs: [166, 39, 23, 85, 188, 21, 182, 478],
	wrongVizURLs: [39, 330],
	classLabels: ['dog', 'dogs', 'poodle', 'poodles', 'standard poodle', 'standard poodles'],
	hint: 'animals',
},
{
    url: tabby,
	correctURLs: [/**/1, 88, 168, 93, 450, 162, 305, 433],
	wrongVizURLs: [374, 107],
	classLabels: ['cat', 'cats', 'tabby', 'tabbies'],
	hint: 'animals',

},
{
    url:macaw,
	correctURLs: [/**/1, 433, 475, 386, 162, 30, 47, 251],
	wrongVizURLs: [421, 142],
	classLabels: ['parrot', 'parrots', 'macaw', 'macaws', 'bird', 'birds'],
	hint: 'animals',
},
{
    url: jellyfish,
	correctURLs: [4, 103, 393, 23, 325, 11, 9, 433],
	wrongVizURLs: [ 102, 39],
	classLabels: ['jellyfish'],
	hint: 'animals',

},
{
    url: treeFrog,
	correctURLs: [18, 359, /**/1, 35, 396, 252, 93, 245],
	wrongVizURLs: [13, 285],
	classLabels: ['frog', 'frogs', 'tree frog', 'tree frogs'],
	hint: 'animals',
},
{
    url: loggerhead,
	correctURLs: [48, 4, 462, 100, 386, 266, 15, 433],
	wrongVizURLs: [151, 353],
	classLabels: ['turtle', 'turtles', 'loggerhead', 'loggerheads', 'loggerhead sea turtle', 'loggerhead sea turtles', 'loggerhead turtle', 'loggerhead turtles'],
	hint: 'animals',

},
{
    url:tiger,
	correctURLs: [23, 39, 102, 142, 165, 108, 191, 221],
	wrongVizURLs: [305, 193],
	classLabels: ['tiger', 'tigers'],
	hint: 'animals',
},
{
    url: bee,
	correctURLs: [25, 30, 200, 105, /**/1, 387, 23, 4],
	wrongVizURLs: [232, 70],
	classLabels: ['bee', 'bees', 'honey bee', 'honey bees'],
	hint: 'animals',

},
],
object: [
{
    url: acorn,
	correctURLs: [/**/1, 40, 186, 6, 14, 23, 82, 478],
	wrongVizURLs: [127, 39],
	classLabels: ['acorn', 'acorns'],
	hint: 'food',
},
{
    url: toaster,
	correctURLs: [456, 433, 37, 294, 414, 61, 54, 100],
	wrongVizURLs: [86, 105],
	classLabels: ['toaster', 'toasters'],
	hint: 'home appliances',
},{
    url: sock,
	correctURLs: [109, 407, 70, 124, 310, 96, 197, 32],
	wrongVizURLs: [23, 296],
	classLabels: ['sock', 'socks'],
	hint: 'home appliances',
},{
    url: strawberry,
	correctURLs: [20, 197, 69, 202, /**/1, 239, 368, 386],
	wrongVizURLs: [478, 18],
	classLabels: ['strawberry', 'strawberries'],
	hint: 'food',
},{
    url: castle,
	correctURLs: [88, 8, 467, 39, 3, 44, 462, 99],
	wrongVizURLs: [1, 39],
	classLabels: ['castle', 'castles'],
	hint: 'building',
},{
    url: train,
	correctURLs: [62, 284, 39, 5, 433, 474, 23, 149],
	wrongVizURLs: [445, 12],
	classLabels: ['train',  'trains', 'passenger car', 'passenger cars', 'coach', 'coaches', 'railroad car','railroad cars','carriage','carriages','railway car','railway cars','railcar','railcars'],
	hint: 'transportation',
},{
    url: soccerBall,
	correctURLs: [148, 252, 301, 152, 104, 376, 23, 185],
	wrongVizURLs: [268, 172],
	classLabels: ['soccer ball', 'soccer balls', 'ball', 'balls'],
	hint: 'toy',
},
{
    url: camera,
	correctURLs: [/**/1, 31, 11, 32, 23, 60, 399, 91],
	wrongVizURLs: [455, 86],
	classLabels: ['camera', 'cameras', 'reflex camera', 'reflex cameras'],
	hint: 'home appliances',
},
]}
