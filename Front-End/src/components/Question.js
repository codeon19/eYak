import React, { Component } from 'react';

import io from 'socket.io-client';

import '../App.css';
import upvoteButton from '../upvoteButton.png';
import downvoteButton from '../downvoteButton.png';

import Card from './GUIcomponents/Card';
import Voter from './GUIcomponents/Voter';

const buttonStyle = {
   backgroundColor: 'inherit',
   borderWidth: 0
}

const imageStyle = {
   width: 40
}

class Question extends Component {
  constructor(props) {
      super(props);

      //this.state = {
        //votes: this.props.question.votes
      //};

      //this.vote = this.vote.bind(this);
      //this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //
  //   this.props.socket.on("question:vote", this.vote);
  // }
  //
  // vote(data) {
  //
  //   if(data._id == this.props.question._id) {
  //
  //     this.setState({
  //       votes: data.votes
  //     })
  //   }
  // }
  //
  // handleClick(type) {
  //
  //   if(type == "upvote") {
  //       this.props.socket.emit("question:vote", this.props.qId, this.props.question._id, 1);
  //   } else if (type =="downvote"){
  //       this.props.socket.emit("question:vote", this.props.qId, this.props.question._id, -1);
  //   }
  // }

  render() {

    const question = this.props.question;

    return (
      <Card>
         <div className="row">
            <div className="col-md-9" style={{ paddingTop: 10, paddingBottom: 10 }} onClick={this.props.makeFocus}>
               <div className="row">
                  <h6 style={{ marginLeft: 10 }} className="card-title">{question.text}</h6>
               </div>
               <div className="row">
                  <div className="col-md-4" style={{ paddingTop: 30 }}>
                     <p style={{ marginBottom: 0 }}>10:54 am</p>
                  </div>
               </div>
            </div>
            <div className="col-md-3" style={{ textAlign: 'center' }}>
               <Voter
                  socket={this.props.socket}
                  question={question}
                  qId={this.props.qId}
               />
            </div>
         </div>

      </Card>
    );
  }
}

export default Question;
