import React, { Component } from 'react';
import Profile from './profile.js'


class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
        
    
    componentDidMount() {
        window.addEventListener('beforeunload', this.props.handleLeavePage);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.props.handleLeavePage);
    }
    //profile loading
    render() {
        return (
            <div id="hint" key="loading" >
                <div className="main vertCenter">
                    <div className="matching" >
                        <div className="title">Finding players
                        <span>.</span>
                        <span>.</span>
                        <span>.</span></div>
                    </div>
                    <Profile players  = {this.props.players} wait= "true" movetoNext = {this.props.movetoNext.bind(this)}/>
                </div>
            </div>

        );
    }
}

export default Loading;
