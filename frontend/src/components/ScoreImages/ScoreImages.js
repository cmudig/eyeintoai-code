/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ScoreImage extends Component {
  returnScoreImages() {
    const element = [];
    for (let i = 0; i < 3; i++) {
      if (this.props.scoreImages[i] !== 'Error') {
        element.push(
          <div className="scoreImage" key={i}>
            <img src={this.props.scoreImages[i]} alt="Round 1 score" />
            <a className="btn" download="Round1_Score.jpeg" href={this.props.scoreImages[i]}>
              Download the Image
            </a>
          </div>
        );
      } else {
        element.push(
          <div className="scoreImage">
            Sorry!
            <br />
            There was an error generating the image.
          </div>
        );
      }
    }
    return element;
  }

  render() {
    return (
      <div
        className="App"
        style={{ width: '100%', height: '100%' }}
        key="game"
      >
        <div className="main">
          <div className="result title">
            <span className="large" >
              Thank you for playing our game!
            </span>
            <iframe
              title="Google Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdRZs3KQo_SCFU99gJMUY0o-D6gVZ9tzVgnlZaX4yz6FnxmhQ/viewform?embedded=true"
              width="750px"
              height="600px"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              style={{ display: 'block', margin: '0 auto' }}
            >
              Loading…
            </iframe>
            {/* <br />
            Below are screenshots of the result of each round.
            <br />
            Feel free to download and share with your friends! */}
          </div>
          <Link
            className="btn again"
            to="/"
            key="btn1"onClick={()=> { this.setState({ gameClass: ['active', ' '] }); }}
          >
            Play Again
          </Link>
          {/* <div id="resultImage" key="resultImage">
            {this.returnScoreImages()}
          </div> */}
        </div>
      </div>
    );
  }
}

export default ScoreImage;
