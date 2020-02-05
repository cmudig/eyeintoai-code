import React, { Component } from 'react';

import Profile from './profile.js.js';

class Loading extends Component {
  // Profile Loading
  componentDidMount() {
    this.props.movetoNext(1);
  }

  render() {
    return (
      <div id="hint" key="loading" >
        <div className="main vertCenter">
          <div className="matching" >
            <div className="title">Waiting for other players selecting images</div>
          </div>
          <Profile />
        </div>
      </div>
    );
  }
}

export default Loading;
