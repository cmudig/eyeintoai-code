import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score,
      counter: [0, 0, 0],
      players: [],
    };
    this.addScore = [];
    this.curplayer = 0;
  }

  UNSAFE_componentWillMount() {
    this.players = this.props.players;
    this.setState({ players: this.players });
    if(this.props.turns) {
      this.curplayer = this.props.turns[this.props.entireRound - 1];
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.props.handleLeavePage);
    if (this.props.countScore) {
      window.setTimeout(this.countScore.bind(this), 500);
    }
    if (this.props.score) {
      this.setState({ score: this.props.score });
    }
    if (this.props.entireRound) {
      const players = this.state.players;
      players[this.curplayer - 1].name = <b>{players[this.curplayer - 1].name}</b>;
      this.setState({ players: players });
    }
    if(this.props.wait) {
      const interval = 500;
      const players = [
        {
          img: '',
          name: '',
          score: 0,
        },
        {
          img: '',
          name: '',
          score: 0,
        },
        {
          img: '',
          name: '',
          score: 0,
        },
      ];
      this.setState({ players: players });
      for (let i = 0; i < this.players.length; i++) {
        window.setTimeout(() => {
          players[i] = this.players[i];
          this.setState({ players: players });
        }, interval * i);
      }
      window.setTimeout(() => {
        this.props.movetoNext(1);
      }, interval * this.players.length);
    }
  }

  countScore() {
    for (let i = 0; i < 3; i++) {
      if (this.state.score[i][0] !== this.state.score[i][1]) {
        this.addScore.push(setInterval(function() {
          const scoreCopy = this.state.score;
          const counterCopy = this.state.counter;
          if (scoreCopy[i][0] !== scoreCopy[i][1]) {
            scoreCopy[i][0] += 1;
            counterCopy[i] += 1;
            this.setState({ score: scoreCopy, counter: counterCopy });
          } else {
            clearInterval(this.addScore[i]);
            this.props.setScore(this.state.score);
          }
        }.bind(this), 100));
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.props.handleLeavePage);
    if(this.addScore) {
      this.addScore.forEach(function(element) { clearInterval(element); });
    }
  }

  generateProfiles() {
    if (this.state.players.length === 0) {
      window.location.href = '/';
    }

    const element = [];
    for (let i = 0; i < 3; i++) {
      if (this.state.score) {
        if (i === this.curplayer - 1) {
          element.push(
            <div className={'mainGame active profile plyr' + (i + 1)} key={'profile' + i}>
              <div className="photo " >
                {this.state.players[i].img}
              </div>
              <div className="name">
                {this.state.players[i].name}
              </div>
              <div id={'plyr' + (i + 1) + '_score'} className={'score plyr' + (i + 1)}>
                {this.state.score[i][0]}
              </div>
            </div>
          );
        } else {
          element.push(
            <div className={'mainGame profile plyr' + (i + 1)} key={'profile' + i}>
              <div className="photo " >
                {this.state.players[i].img}
              </div>
              <div className="name">
                {this.state.players[i].name}
              </div>
              <div id={'plyr' + (i + 1) + '_score'} className={'score plyr' + (i + 1)}>
                {this.state.score[i][0]}
              </div>
            </div>
          );
        }
      } else {
        element.push(
          <div className={'profile plyr' + (i + 1)} key={'profile' + i}>
            <div className="playerNum">
              Player {i + 1}
            </div>
            <div className="photo">
              {this.state.players[i].img}
            </div>
            <div className="name">
              {this.state.players[i].name}
            </div>
          </div>
        );
      }
    }
    return element;
  }

  render() {
    return (
      <div className="profileWrapper">
        <div className="profiles">
          {this.generateProfiles()}
        </div>
      </div>
    );
  }
}

export default Profile;
