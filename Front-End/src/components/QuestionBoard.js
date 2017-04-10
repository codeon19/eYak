import React, {Component} from 'react';

import Client from '../front-end';

import Question from './Question';
import EmptyBoard from './EmptyBoard';
import AddQuestion from './AddQuestion';

import io from 'socket.io-client';

class QuestionBoard extends Component {

  constructor(props) {
      super(props);

      this.state = {
        questionBoard: [],
        askQuestion: true,
        displayQuestion: null,
        master: this.props.route.master,
        masterKey: this.props.location.query.key
      };

      Client.getQuestionBoard(this.props.params.id, (questionB) => {
            if (questionB.doesNotExist) {
              console.log("Question Board does not exist!");
            } else {
              this.setState({
                questionBoard: questionB.questionBoard
              })
            }
          });

      this.push = this.push.bind(this);
      this.switchToAsk = this.switchToAsk.bind(this);

      this.socket = io('/');
  }

  componentDidMount() {

    // Client.checkMasterKey(this.props.params.id, this.state.masterKey, (resp) => {
    //   if (resp.isMaster === false) {
    //     this.props.router.push('/q/' + this.props.params.id);
    //     this.setState({
    //       master: false
    //     })
    //   } else {
    //     this.setState({
    //       master: true
    //     })
    //   }
    // });

    this.socket.on('connect', data => {
      this.socket.emit('joinB', this.props.params.id);
    });

    this.socket.on('question:add', this.push);
  }

  push(data) {
    const _questionBoard = this.state.questionBoard;

    _questionBoard.push(data);

    this.setState({
      questionBoard: _questionBoard
    })
  }

  handleClick(index) {

    console.log("Question clicked at " + index);

    this.setState({
      askQuestion: false,
      displayQuestion: index
    });
  }

  switchToAsk() {

    this.setState({
      askQuestion: true
    })
  }

  render() {

    const questionBoard = this.state.questionBoard.map((question, i) => (

      <div onClick={() => this.handleClick(i)}>
        <Question
          key={question._id}
          question={question}
          index={i}
          socket={this.socket}
          qId={this.props.params.id}
          masterKey={this.state.masterKey}
        />
      </div>

    ));

      return (
          <div id='questionQueue'>
              <div className='container'>
                <div className='col-md-7 col-md-push-5'>
                  <div className="row justify-content-center">
                    <button className='btn btn-lg btn-primary' onClick={this.switchToAsk}>
                        Ask Question <i className='glyphicon'></i>
                    </button>
                  </div>

                  <div className="row justify-content-center">
                      {(this.state.askQuestion) ? <AddQuestion socket={this.socket} qId={this.props.params.id}/> : (questionBoard[this.state.displayQuestion])}
                  </div>
                </div>

                <div className='col-md-5 col-md-pull-7'>
                  <div className='col-md text-center'>
                      {(this.state.questionBoard.length !== 0) ? (questionBoard) : (<EmptyBoard key='emptyBoard'/>)}
                  </div>
                </div>
              </div>
          </div>
      );
  }
}

export default QuestionBoard;
