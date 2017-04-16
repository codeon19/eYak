import React, { Component } from 'react';

import io from 'socket.io-client';

import '../App.css';

import Card from './GUIcomponents/Card';

class Question extends Component {
  constructor(props) {
      super(props);

      this.state = {
        votes: this.props.question.votes
      };

      this.vote = this.vote.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    this.props.socket.on("question:vote", this.vote);
  }

  vote(data) {

    if(data._id == this.props.question._id) {

      this.setState({
        votes: data.votes
      })
    }
  }

  handleClick(type) {

    if(type == "upvote") {
        this.props.socket.emit("question:vote", this.props.qId, this.props.question._id, 1);
    } else if (type =="downvote"){
        this.props.socket.emit("question:vote", this.props.qId, this.props.question._id, -1);
    }
  }

  render() {

    const question = this.props.question;

    return (
      <Card>
         <div className="row">
            <div className="col-md-8">
               <h6 className="card-title">{question.text}</h6>
            </div>
            <div className="col-md-3" style={{ textAlign: 'center' }}>
               <button className="btn btn-primary" onClick={() => {this.handleClick("upvote")}}>Up</button>
               <p> {this.state.votes} </p>
               <button className="btn btn-primary" onClick={() => {this.handleClick("downvote")}}>Down</button>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4">
               <p>10:54 am</p>
            </div>
         </div>
      </Card>
    );
  }
}

export default Question;
