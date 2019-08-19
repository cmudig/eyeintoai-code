import React, { Component } from 'react';
import './App.css';
import Profile from './profile.js'


class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    //profile loading
    componentDidMount() {
            window.setTimeout(function(){
                this.props.movetoNext(1)
            }.bind(this),1000)
    }

    render() {

        return (
            <div id="hint" key="loading" >
                <div className="main vertCenter">
                    <div className="matching" >
                        <div className="title">Finding players...</div>
                    </div>
                    <Profile players  = {this.props.players}/>
                </div>
            </div>

        );
    }
}

export default Loading;
