import React, { Component } from 'react';
import './App.css';

class ScoreImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="App" style={{ width: "100%", height: "100%" }} key="game">
                <div className="main">
               
                    <div className = "result title">
                    <span className = "large" >Thank you for playing our game!</span><br />
                    Below are screenshots of the result of each round.<br />
                    Feel free to download and share with your friends!
                    </div>
                        <div id="resultImage" key="resultImage">
                            <div className="scoreImage">
                                <img src={this.props.scoreImages[0]} alt="Round 1 score" />
                                <a className="btn" download = "Round1_Score.jpeg" href={this.props.scoreImages[0]}>
                                    Download the Image
                    </a>
                            </div>
                            <div className="scoreImage">
                                <img src={this.props.scoreImages[1]} alt="Round 2 score" />
                                <a className="btn" download = "Round2_Score.jpeg" href={this.props.scoreImages[1]}>
                                    Download the Image
                    </a>
                            </div>
                            <div className="scoreImage">
                                <img src={this.props.scoreImages[2]} alt="Round 3 score" />
                                <a className="btn" download = "Round3_Score.jpeg" href={this.props.scoreImages[2]}>
                                    Download the Image
                    </a>
                            </div>
                        </div>
                </div>
            </div>

        );
    }
}

export default ScoreImage;
