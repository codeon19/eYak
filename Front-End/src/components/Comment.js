import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) {
      super(props);

  }

  render() {

    const comment = this.props.comment;

    return (

        <div>
          <h6 className="card-title">{comment.text}</h6>
        </div>
    );
  }
}

export default Comment;
