import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import Time from 'react-time';

import Client from '../front-end';

import Question from './Question';
import QuestionView from './QuestionView';
import EmptyBoard from './EmptyBoard';
import AddQuestion from './AddQuestion';

import io from 'socket.io-client';

class QuestionBoard extends Component {

  constructor(props) {
      super(props);

      this.state = {
        questionBoard: [],
        askQuestion: false,
        displayQuestion: null,
        master: this.props.route.master,
        masterKey: this.props.location.query.key,
        sortType: "time"
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

      this.socket = io(this.props.key);

      this.onChange = this.onChange.bind(this);
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

    Client.getQuestionBoard(this.props.params.id, (questionB) => {
          if (questionB.doesNotExist) {
            console.log("Question Board does not exist!");
          } else {
            this.setState({
              questionBoard: questionB.questionBoard
            })
          }
        });

    const questionData = this.state.questionBoard[index]

    this.setState({
      askQuestion: false,
      displayQuestion:
        <QuestionView
          key={questionData._id}
          question={questionData}
          qId={this.props.params.id}
          socket={this.socket}
          masterKey={this.state.masterKey}
        />
    });
  }

  switchToAsk() {

    this.setState({
      askQuestion: true
    })
  }

  onChange(i, value, tab, ev) {
    this.setState({ sortType: value });
  }

  render() {
    if (this.state.sortType == "time") {
      this.state.questionBoard.sort((a, b) => (Date.parse(a.time) < Date.parse(b.time)));
    }
    else {
      this.state.questionBoard.sort((a, b) => (a.votes < b.votes));
    }

    const questionBoard = this.state.questionBoard.map((question, i) => (
      <div style={{ marginTop: 30 }}>
        <Question
          makeFocus={() => this.handleClick(i)}
          key={question._id}
          question={question}
          index={i}
          qId={this.props.params.id}
          masterKey={this.state.masterKey}
          socket={this.socket}
        />
      </div>

    ));

      return (
          <div id='questionQueue'>
              <div className='container'>
                <div className='col-md-7 col-md-push-5'>
                  <div className="row justify-content-center" id="addQuestionButton">
                    <button className='btn btn-lg btn-primary' onClick={this.switchToAsk}>
                        Ask Question <i className='glyphicon'></i>
                    </button>
                  </div>

                  <div className="row justify-content-center">
                      {(this.state.askQuestion) ? <AddQuestion socket={this.socket} qId={this.props.params.id}/> : this.state.displayQuestion}
                  </div>
                </div>

                <div className='col-md-5 col-md-pull-7'>
                  {(this.state.questionBoard.length !== 0) ? (
                     <div><div style={{ textAlign: 'center' }}>
                        <Tabs onChange={this.onChange} defaultSelectedIndex={0}>
                           <Tab value="time" label="New"></Tab>
                           <Tab value="votes" label="Hot"></Tab>
                        </Tabs>
                     </div>
                     <div className='col-md text-center'>
                         { questionBoard }
                     </div></div>
                  ) : (<EmptyBoard key='emptyBoard'/>)}
                </div>
              </div>
          </div>
      );
  }
}

export default QuestionBoard;
