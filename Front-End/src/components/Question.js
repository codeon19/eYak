import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
      super(props);

      this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('comment submitted');
      this.props.socket.emit('comment:add', this.props.qId, this.props.masterKey, this.props.question._id);

    }
  }

  render() {

    const question = this.props.question;

    return (

        <div className="card" style={{ borderColor: 333}}>
          <div className="card-block">
            <h4 className="card-title">{question.text}</h4>
            <a href="#" className="btn btn-primary">Upvote</a>
          </div>
          <input type="text" onKeyPress={this.handleKeyPress} />
        </div>
    );
  }
}

export default Question;
