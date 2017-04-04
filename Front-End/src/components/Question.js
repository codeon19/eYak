import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
      super(props);
  }

  render() {

    const question = this.props.question;

    return (

      <div className="card card-inverse" style={{backgroundColor: '#333'}}>
        <div className="card-block">
          <h2 className="card-title">{question.text}</h2>
            <a href="#" class="btn btn-primary">Upvote</a>
        </div>
      </div>

    );
  }
}

export default Question;
