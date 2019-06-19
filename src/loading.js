import React, { Component } from 'react';
import './App.css';


class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
}
componentDidMount(){
}
   
    render() {

        return (
            <div id="hint" key = "loading" >
            <div id="hintTimer" key="hintTimer"> <svg width="150" height="120"><circle className = "active" key = "timeAnim" r="54" cx="60" cy="60" /></svg></div>
            <br />
            The player is selecting an image
            </div>

        );
    }
}

export default Loading;
