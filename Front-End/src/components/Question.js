import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
      super(props);
  }

  render() {

    const question = this.props.question;

    return (
      
      <div class="card card-inverse" style="background-color: #333; border-color: #333;">
        <div class="card-block">
          <h2 class="card-title">{question.text}</h2>
            <a href="#" class="btn btn-primary">Upvote</a>
        </div>
      </div>

    );
  }
}

export default Question;
