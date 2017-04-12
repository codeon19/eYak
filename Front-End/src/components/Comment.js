import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) {
      super(props);

  }

  render() {

    const comment = this.props.comment;

    return (

        <div className="card" style={{ borderColor: 333}}>
          <div className="card-block">
            <h4 className="card-title">{comment.text}</h4>
          </div>
        </div>
    );
  }
}

export default Comment;
