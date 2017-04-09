import React, { Component } from 'react';

import Client from '../front-end';

class AddQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.baseState = this.state;

  }

  handleInputChange(event) {
    const value = event.target;

    this.setState({
      [name]: value
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const questionText = this.state.value;
    if (questionText === '') {
      this.setState({ error: 'Invalid Question. '});
      return;
    }

    const data = {
      questionText: questionText
    }

    this.props.socket.emit('question:add', this.props.qId, data);

    this.setState(this.baseState);
  }

  render() {
    return (

      <div className="card">
        <div className="card-block">

          <div className="card-text">
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </div>

          <button className='btn btn-primary' onClick={this.handleSubmit}>
              Add <i className='glyphicon'></i>
          </button>
        </div>
      </div>

    );
  }
}

export default AddQuestion;
