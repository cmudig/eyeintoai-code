import React, {Component} from "react";
import Swipeable from "react-swipy"
import './css/SwipyDeck.css';
import rej_btn from './images/rej-btn.svg'
import acc_btn from './images/acc-btn.svg'
import Card from "./Card";

// const data=[
//   {name:'Snail', orgImage: './images/sample-org.png', featureViz: './images/sample-viz.png'},
//   {name:'Tiger', orgImage: './images/sample-org.png', featureViz: './images/sample-viz.png'},
//   {name:'Monkey', orgImage: './images/sample-org.png', featureViz: './images/sample-viz.png'}
// ];

class SwipyDeck extends Component {
  state = {
    // cards: ["First", "Second", "Third"],
    current: 1,
  };

  remove = (direction) => {
    if (this.state.current === this.props.data.length) {
      this.props.handler('end');
      this.setState({current: 1});
      return;
    }
    this.setState({current: this.state.current + 1});
  };

  render() {
    return (
        <div className='SwipyDeck'>
          <Swipeable
            buttons={({left, right}) => (
              <div className='ActionsWrapper'>
                <div className='SelfCenter'>{this.state.current} / {this.props.data.length}</div>
                <div className='Actions'>
                  <img src={rej_btn} className='SwipeBtn' onClick={left}/>
                  <img src={acc_btn} className='SwipeBtn' onClick={right}/>
                </div>
              </div>
            )}
            onSwipe={this.remove}
          >
            <Card data={this.props.data[this.state.current-1]}></Card>
          </Swipeable>

          {/*{this.state.current < data.length && <Card zIndex={-1} data={data[this.state.current]}></Card>}*/}
        </div>
    );
  }
}

export default SwipyDeck;