import React, {Component} from 'react';

import io from 'socket.io-client';

import Client from '../front-end';
import Comments from './Comment';
import Card from './GUIcomponents/Card';
import Voter from './GUIcomponents/Voter';

class QuestionView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        value: '',
        commentBoard: []
      };

      Client.getCommentBoard(this.props.question._id, (commentB) => {
            if (commentB.doesNotExist) {
              console.log("Comment Board does not exist!");
            } else {
              console.log(commentB);
              console.log("Comment Board currently being set!");
              this.setState({
                commentBoard: commentB.commentBoard
              })
            }
          });

      this.push = this.push.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {

    this.props.socket.on('comment:add',this.push);
  }

  push(data) {

    if(data.question_id == this.props.question._id) {
      const _commentBoard = this.state.commentBoard;

      _commentBoard.push(data);

      console.log('triggered!');
      console.log(data.text);

      this.setState({
        commentBoard: _commentBoard
      });
    }

  }

  handleChange(event) {

    this.setState({value: event.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {

      const commentText = this.state.value;

      if (commentText === '') {
        this.setState({ error: 'Invalid Comment'});
        return;
      }

      const data = {
        commentText: commentText
      }

      this.props.socket.emit('comment:add', this.props.qId, this.props.masterKey, this.props.question._id, data);

      this.setState({
        value: ''
      });
    }
  }

  render() {
    let wasDate = Date.parse('16 April 00:00');
    const question = this.props.question;

    const commentBoard = this.state.commentBoard.map((comment, i) => (
      <div style={{ marginTop: 10 }}>
         <Card>
            <Comments
               key={comment._id}
               comment={comment}
               index={i}
            />
         </Card>
      </div>
    ));

    return (

        <div style={{ marginTop: 20 }}>
            <Card>
               <div className="row">
                  <div className="col-md-9" style={{ paddingTop: 10, paddingBottom: 10 }}>
                     <div className="row">
                        <h6 style={{ marginLeft: 10 }} className="card-title">{question.text}</h6>
                     </div>
                     <div className="row">
                        <div className="col-md-4" style={{ paddingTop: 30 }}>
                           <p style={{ marginBottom: 0 }}>{this.props.question.time}</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-3" style={{ textAlign: 'center' }}>
                     <Voter
                        socket={this.props.socket}
                        question={question}
                        qId={this.props.qId}
                     />
                  </div>
               </div>
            </Card>

            <input style={{ marginTop: 20 }} type="text" id="addCommentInput" className="form-control" placeholder="Comment on this question here"
               value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} >
            </input>
            {(this.state.commentBoard.length != 0) ? (commentBoard) : <div></div>}
        </div>
    );
  }
}

export default QuestionView;

//<div className="col-md-3" style={{ textAlign: 'center' }}>
   //<Voter
      //socket={this.props.socket}
      //question={question}
      //qId={this.props.qId}
   ///>
//</div>
