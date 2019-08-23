import React from "react";
import './css/Card.css';

// {name:'Snail', orgImage: './images/sample-org.png', featureViz: './images/sample-viz.png'},



const Card = ({ zIndex = 0, data }) => (
  <div className='Card' style={{zIndex}}>
    <div className='CardTitleSmall'>Is the image below a</div>
    <div className='CardTitle'>{data.name}?</div>
    <a className='WhatIsThis' href='#'>What is this?</a>
    <img className='FeatureViz' src={require(""+data.featureViz)}/>
  </div>
);

export default Card;
