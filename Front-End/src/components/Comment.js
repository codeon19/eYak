import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) {
      super(props);

  }

  render() {

    const comment = this.props.comment;

    return (

        <div>
          <h4 className="card-title">{comment.text}</h4>
        </div>
    );
  }
}

export default Comment;
