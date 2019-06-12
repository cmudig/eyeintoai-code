import React, { Component } from 'react';
import './App.css';

import ladybug_feature1 from './image/vis/ladybug/1.jpg'
import ladybug_feature2 from './image/vis/ladybug/2.jpg'
import ladybug_feature3 from './image/vis/ladybug/3.jpg'
import ladybug_feature4 from './image/vis/ladybug/4.jpg'
import ladybug_feature5 from './image/vis/ladybug/5.jpg'
import ladybug_feature6 from './image/vis/ladybug/6.jpg'
import ladybug_feature7 from './image/vis/ladybug/7.jpg'
import ladybug_feature8 from './image/vis/ladybug/8.jpg'
import ladybug_feature9 from './image/vis/ladybug/9.jpg'
import ladybug_feature10 from './image/vis/ladybug/10.jpg'

import flamingo_feature1 from './image/vis/flamingo/1.jpg'
import flamingo_feature2 from './image/vis/flamingo/2.jpg'
import flamingo_feature3 from './image/vis/flamingo/3.jpg'
import flamingo_feature4 from './image/vis/flamingo/4.jpg'
import flamingo_feature5 from './image/vis/flamingo/5.jpg'
import flamingo_feature6 from './image/vis/flamingo/6.jpg'
import flamingo_feature7 from './image/vis/flamingo/7.jpg'
import flamingo_feature8 from './image/vis/flamingo/8.jpg'
import flamingo_feature9 from './image/vis/flamingo/9.jpg'
import flamingo_feature10 from './image/vis/flamingo/10.jpg'

import hamster_feature1 from './image/vis/hamster/1.jpg'
import hamster_feature2 from './image/vis/hamster/2.jpg'
import hamster_feature3 from './image/vis/hamster/3.jpg'
import hamster_feature4 from './image/vis/hamster/4.jpg'
import hamster_feature5 from './image/vis/hamster/5.jpg'
import hamster_feature6 from './image/vis/hamster/6.jpg'
import hamster_feature7 from './image/vis/hamster/7.jpg'
import hamster_feature8 from './image/vis/hamster/8.jpg'
import hamster_feature9 from './image/vis/hamster/9.jpg'
import hamster_feature10 from './image/vis/hamster/10.jpg'

import jellyfish_feature1 from './image/vis/jellyfish/1.jpg'
import jellyfish_feature2 from './image/vis/jellyfish/2.jpg'
import jellyfish_feature3 from './image/vis/jellyfish/3.jpg'
import jellyfish_feature4 from './image/vis/jellyfish/4.jpg'
import jellyfish_feature5 from './image/vis/jellyfish/5.jpg'
import jellyfish_feature6 from './image/vis/jellyfish/6.jpg'
import jellyfish_feature7 from './image/vis/jellyfish/7.jpg'
import jellyfish_feature8 from './image/vis/jellyfish/8.jpg'
import jellyfish_feature9 from './image/vis/jellyfish/9.jpg'
import jellyfish_feature10 from './image/vis/jellyfish/10.jpg'

import strawberry_feature1 from './image/vis/strawberry/1.jpg'
import strawberry_feature2 from './image/vis/strawberry/2.jpg'
import strawberry_feature3 from './image/vis/strawberry/3.jpg'
import strawberry_feature4 from './image/vis/strawberry/4.jpg'
import strawberry_feature5 from './image/vis/strawberry/5.jpg'
import strawberry_feature6 from './image/vis/strawberry/6.jpg'
import strawberry_feature7 from './image/vis/strawberry/7.jpg'
import strawberry_feature8 from './image/vis/strawberry/8.jpg'
import strawberry_feature9 from './image/vis/strawberry/9.jpg'
import strawberry_feature10 from './image/vis/strawberry/10.jpg'

import castle_feature1 from './image/vis/castle/1.jpg'
import castle_feature2 from './image/vis/castle/2.jpg'
import castle_feature3 from './image/vis/castle/3.jpg'
import castle_feature4 from './image/vis/castle/4.jpg'
import castle_feature5 from './image/vis/castle/5.jpg'
import castle_feature6 from './image/vis/castle/6.jpg'
import castle_feature7 from './image/vis/castle/7.jpg'
import castle_feature8 from './image/vis/castle/8.jpg'
import castle_feature9 from './image/vis/castle/9.jpg'
import castle_feature10 from './image/vis/castle/10.jpg'

import balloon_feature1 from './image/vis/balloon/1.jpg'
import balloon_feature2 from './image/vis/balloon/2.jpg'
import balloon_feature3 from './image/vis/balloon/3.jpg'
import balloon_feature4 from './image/vis/balloon/4.jpg'
import balloon_feature5 from './image/vis/balloon/5.jpg'
import balloon_feature6 from './image/vis/balloon/6.jpg'
import balloon_feature7 from './image/vis/balloon/7.jpg'
import balloon_feature8 from './image/vis/balloon/8.jpg'
import balloon_feature9 from './image/vis/balloon/9.jpg'
import balloon_feature10 from './image/vis/balloon/10.jpg'

import umbrella_feature1 from './image/vis/umbrella/1.jpg'
import umbrella_feature2 from './image/vis/umbrella/2.jpg'
import umbrella_feature3 from './image/vis/umbrella/3.jpg'
import umbrella_feature4 from './image/vis/umbrella/4.jpg'
import umbrella_feature5 from './image/vis/umbrella/5.jpg'
import umbrella_feature6 from './image/vis/umbrella/6.jpg'
import umbrella_feature7 from './image/vis/umbrella/7.jpg'
import umbrella_feature8 from './image/vis/umbrella/8.jpg'
import umbrella_feature9 from './image/vis/umbrella/9.jpg'
import umbrella_feature10 from './image/vis/umbrella/10.jpg'

class Vis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : [],
            nonSelected: [],
            round: this.props.round,
            display: "none",
        }
        this.answer = this.props.answer;
        
        this.ladybug=[ladybug_feature1,ladybug_feature2,ladybug_feature3,ladybug_feature4,ladybug_feature5,ladybug_feature6,ladybug_feature7,ladybug_feature8,ladybug_feature9,ladybug_feature10];
        this.flamingo = [flamingo_feature1,flamingo_feature2,flamingo_feature3,flamingo_feature4,flamingo_feature5,flamingo_feature6,flamingo_feature7,flamingo_feature8,flamingo_feature9,flamingo_feature10];
        this.hamster = [hamster_feature1,hamster_feature2,hamster_feature3,hamster_feature4,hamster_feature5,hamster_feature6,hamster_feature7,hamster_feature8,hamster_feature9,hamster_feature10];
        this.jellyfish = [jellyfish_feature1,jellyfish_feature2,jellyfish_feature3,jellyfish_feature4,jellyfish_feature5,jellyfish_feature6,jellyfish_feature7,jellyfish_feature8,jellyfish_feature9,jellyfish_feature10];

        this.strawberry = [strawberry_feature1,strawberry_feature2,strawberry_feature3,strawberry_feature4,strawberry_feature5,strawberry_feature6,strawberry_feature7,strawberry_feature8,strawberry_feature9,strawberry_feature10];
        this.castle = [castle_feature1,castle_feature2,castle_feature3,castle_feature4,castle_feature5,castle_feature6,castle_feature7,castle_feature8,castle_feature9,castle_feature10];
        this.balloon = [balloon_feature1,balloon_feature2,balloon_feature3,balloon_feature4,balloon_feature5,balloon_feature6,balloon_feature7,balloon_feature8,balloon_feature9,balloon_feature10];
        this.umbrella = [umbrella_feature1,umbrella_feature2,umbrella_feature3,umbrella_feature4,umbrella_feature5,umbrella_feature6,umbrella_feature7,umbrella_feature8,umbrella_feature9,umbrella_feature10];
    }
    componentDidMount(){
        this.setState({opacity: 1});
        if(this.props.round === 1){
            let imglist;
            switch(this.answer){
                case "ladybug": imglist = this.ladybug;
                    break;
                case "flamingo": imglist = this.flamingo;
                    break;
                case "hamster": imglist = this.hamster;
                    break;
                case "jellyfish": imglist = this.jellyfish;
                    break;
                case "strawberry": imglist = this.strawberry;
                    break;
                case "castle": imglist = this.castle;
                    break;
                case "balloon": imglist = this.balloon;
                    break;
                case "umbrella": imglist = this.umbrella;
                    break;
                default:
            }
            this.setState({nonSelected: imglist});
        }
    }
    selectVis(i){
        this.props.countRound();

        if(i < 11){
            let nonselected = this.state.nonSelected;
            let selected = this.state.selected;
            window.setTimeout(function(){
                selected.push(nonselected[i]);
                nonselected.splice(i, 1);  
                this.setState({selected: selected, nonSelected: nonselected, display:"block"});
                this.props.selectedImg(selected);
                this.props.hideVisPanel();
            }.bind(this), 300);
        } else{
            window.setTimeout(function(){
                    this.props.turnHintOn(true)

            }.bind(this), 300);
        }
       
       

    }
    renderVis(){
        let element1 = [];
        let element2 = [];
        let imglist = this.state.nonSelected.concat(this.state.selected);
        for(let i = 0; i< 5; i++){
            if(i < (10 - this.state.selected.length)){
            element1.push(<img src={imglist[i]} className = "active" alt={this.answer+" visualization "+ (i + 1)} key={this.answer+" visualization "+ (i + 1)} onClick={(ev)=>{this.selectVis(i); }}/>)
        }  else{
            element1.push(<img src={imglist[i]} style={{opacity: "0.5"}} alt={this.answer+" visualization "+ (i + 1)} key={this.answer+" visualization "+ (i + 1)}/>)
        }
        }
        for(let i = 5; i< 10; i++){
           if(i < (10 - this.state.selected.length)){
            element2.push(<img src={imglist[i]} className = "active" alt={this.answer+" visualization "+ (i + 1)} key={this.answer+" visualization "+ (i + 1)} onClick={(ev)=>{this.selectVis(i); }}/>)
        }  else{
            element2.push(<img src={imglist[i]}  style={{opacity: "0.5"}} alt={this.answer+" visualization "+ (i + 1)} key={this.answer+" visualization "+ (i + 1)}/>)
        }
        }
        return (  <div className="vis-row">
                    <div>{element1}</div>
                    <div>{element2}</div>
                </div>)
    }
    render() {

        return (
            <div className="modal-select" >
            <div className="title">Select a feature you want to reveal</div>
                <div className = "btn" style={{width: "216px", margin:"0 auto 26px", display:this.state.display}} onClick={(ev)=>{this.selectVis(11)}}>Stop Revealing</div>
                {this.renderVis()}
            </div>
                  
        );
    }
}

export default Vis;
