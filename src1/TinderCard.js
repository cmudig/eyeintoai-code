import React, { Component } from 'react';
import './css/TinderCard.css';
import { animated, interpolate } from "react-spring/hooks";

class TinderCard extends Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, data } = this.props;
    const {content} = data;
    return (
      <animated.div key={i} style={{ transform: interpolate ( [x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)}}>
        <animated.div {...bind(i)}>
          <div className="TinderCard">{content}
          </div>
        </animated.div>
      </animated.div>
    );
  }
}

export default TinderCard;
