import React, { Component } from 'react';
import Client from '../front-end';

class JoinBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qId: '',
      isValid: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    Client.getQuestionBoard(this.state.qId, (questionB) => {
      if (questionB.doesNotExist) {
        this.setState({
          isValid: false
        });
      } else {
        this.props.router.push('/q/' + questionB._id);
      }
    });
  }

  componentDidMount() {
    if (this.props.location.query.invalid && this.props.location.query.bad_id) {
      this.setState({
        isValid: false,
        qId: this.props.location.query.bad_id
      });
    }
  }

  render() {
    return (
      <div id='joinQueue'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 col-md-offset-2'>
              <div className='page-header'>
                <h4>Join a Question Board</h4>
              </div>

              <form onSubmit={this.handleSubmit}>
                <div className='input-group input-group-lg'>
                  <input type='text' className='form-control' placeholder='Example ID: BJUieeMRx' name='qId' onChange={this.handleInputChange} value={this.state.qId}></input>

                  <span className='input-group-btn'>
                    <button className='btn btn-primary' type='submit'>Join</button>
                  </span>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default JoinBoard;
