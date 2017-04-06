import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
      super(props);
  }

  render() {

    const question = this.props.question;

    return (

      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{question.text}</h4>
            <a href="#" className="btn btn-primary">Upvote</a>
        </div>
      </div>

    );
  }
}

export default Question;
