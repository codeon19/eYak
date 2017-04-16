import React, { Component } from 'react';

import Client from '../front-end';

import Card from './GUIcomponents/Card';

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

      <div style={{ marginTop: 20, textAlign: 'center' }}>

            <input type="text" id="askQuestionInput" className="form-control" placeholder="Ask question here"
               value={this.state.value} onChange={this.handleChange}>
            </input>
            <button id="submitQuestionButton" className="btn-primary" onClick={this.handleSubmit}>
               Add <i className='glyphicon'></i>
            </button>

      </div>

    );
  }
}

export default AddQuestion;
