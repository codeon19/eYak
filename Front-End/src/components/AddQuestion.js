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
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <label>
                Question:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>

              <input className='btn btn-md btn-primary text-right' type="submit" value="Add" />
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default AddQuestion;
