import React, { Component } from 'react';

import '../App.css';

import Card from './GUIcomponents/Card';

class Question extends Component {
  constructor(props) {
      super(props);

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
               <a href="#" className="btn btn-primary">Upvote</a>
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
