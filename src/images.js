import './App.css';
const poodle = 'https://farm2.static.flickr.com/1094/1429987031_c629931815.jpg'
const tabby = 'https://farm1.static.flickr.com/54/134239887_b28a8f3362.jpg'
const macaw = 'https://farm3.static.flickr.com/2163/2377222385_d0f757b60c.jpg'
const jellyfish = 'https://farm2.static.flickr.com/1104/896306447_d97fd08b9f.jpg'
const treeFrog = 'https://static.flickr.com/3175/2546265319_b7406e09fd.jpg'
const loggerhead = 'https://farm4.static.flickr.com/3175/2756781676_7763cb75b0.jpg'
const tiger = 'https://farm1.static.flickr.com/162/337569685_433e64a685.jpg'
const bee = 'https://farm1.static.flickr.com/105/267135921_c617672bbe.jpg'
const acorn = 'https://farm3.static.flickr.com/2475/4078289864_b4d3e1ca6a.jpg'
const toaster = 'https://farm4.static.flickr.com/3015/2586474204_7732f47bb2.jpg'
const camera = 'https://farm1.static.flickr.com/92/246430918_f217405884.jpg'
const sock = 'https://farm1.static.flickr.com/170/441373273_c5c3623d04.jpg'
const strawberry = 'https://farm1.static.flickr.com/170/450374827_040d138541.jpg'
const castle = 'https://farm2.static.flickr.com/1099/1367799876_791664634d.jpg'
const train = 'https://farm4.static.flickr.com/3147/2692438785_f1ab4d972f.jpg'
const soccerBall = 'https://farm3.static.flickr.com/2233/2091709908_1c7965b1ac.jpg'

export const StaticData = {
    animal:[
    {
    url: poodle,
	correctURLs: [166, 39, 23, 85, 188, 21, 182, 478],
	wrongVizURLs: [509, 330],
	classLabels: ['dog', 'dogs', 'poodle', 'poodles', 'standard poodle', 'standard poodles'],
	hint: 'animals',
},
{
    url: tabby,
	correctURLs: [493, 88, 168, 93, 450, 162, 305, 433],
	wrongVizURLs: [374, 107],
	classLabels: ['cat', 'cats', 'tabby', 'tabbies'],
	hint: 'animals',

},
{
    url:macaw,
	correctURLs: [504, 433, 475, 386, 162, 30, 47, 251],
	wrongVizURLs: [421, 142],
	classLabels: ['parrot', 'parrots', 'macaw', 'macaws', 'bird', 'birds'],
	hint: 'birds',
},
{
    url: jellyfish,
	correctURLs: [4, 103, 393, 23, 325, 11, 9, 433],
	wrongVizURLs: [ 102, 489],
	classLabels: ['jellyfish'],
	hint: 'sea animals',

},
{
    url: treeFrog,
	correctURLs: [18, 359, 527, 35, 396, 252, 93, 245],
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
	correctURLs: [25, 30, 200, 105, 498, 387, 23, 4],
	wrongVizURLs: [232, 70],
	classLabels: ['bee', 'bees', 'honey bee', 'honey bees'],
	hint: 'insects',

},
],
object: [
{
    url: acorn,
	correctURLs: [508, 40, 186, 6, 14, 23, 82, 478],
	wrongVizURLs: [127, 496],
	classLabels: ['acorn', 'acorns'],
	hint: 'nuts',
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
	hint: 'clothings',
},{
    url: strawberry,
	correctURLs: [20, 197, 69, 202, 520, 239, 368, 386],
	wrongVizURLs: [478, 18],
	classLabels: ['strawberry', 'strawberries'],
	hint: 'fruits',
},{
    url: castle,
	correctURLs: [88, 8, 467, 39, 3, 44, 462, 99],
	wrongVizURLs: [1, 497],
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
	hint: 'object',
},
{
    url: camera,
	correctURLs: [527, 31, 11, 32, 23, 60, 399, 91],
	wrongVizURLs: [455, 86],
	classLabels: ['camera', 'cameras', 'reflex camera', 'reflex cameras'],
	hint: 'object',
},
]}
