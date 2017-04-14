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

      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    this.props.socket.on("question:vote",this.push);
  }

  handleClick(type) {

    if(type == "upvote") {
        this.props.socket.emit("question:vote", this.props.question._id, 1);
    } else if (type =="downvote"){
        this.props.socket.emit("question:vote", this.props.question._id, -1);
    }
  }

  render() {

    const question = this.props.question;

    return (
      <Card>
         <div className="row">
            <div className="col-md-8">
               <h5 className="card-title">{question.text}</h5>
            </div>
            <div className="col-md-3">
               <a href="#" className="btn btn-primary" onClick={this.handleClick("upvote")}>Up</a>
            </div>
            <div className="col-md-3">
               <a href="#" className="btn btn-primary" onClick={this.handleClick("downvote")}>Down</a>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4">
              <p> {this.state.votes} </p>
               <p>10:54 am</p>
            </div>
         </div>
      </Card>
    );
  }
}

export default Question;
