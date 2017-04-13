import React, {Component} from 'react';

import Client from '../front-end';

import Comments from './Comment';

import io from 'socket.io-client';

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

    const question = this.props.question;

    const commentBoard = this.state.commentBoard.map((comment, i) => (
        <Comments
          key={comment._id}
          comment={comment}
          index={i}
        />
    ));

    return (

        <div>
          <div className="card" style={{ borderColor: 333}}>
            <div className="card-block">
              <h4 className="card-title">{question.text}</h4>
              <a href="#" className="btn btn-primary">Upvote</a>
            </div>
            <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          </div>
            {(this.state.commentBoard.length != 0) ? (commentBoard) : <div></div>}
        </div>
    );
  }
}

export default QuestionView;
