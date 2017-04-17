import React, { Component } from 'react';

import io from 'socket.io-client';

import upvoteButton from '../../upvoteButton.png';
import downvoteButton from '../../downvoteButton.png';

const buttonStyle = {
   backgroundColor: 'inherit',
   borderWidth: 0
}

const imageStyle = {
   width: 40
}

class Voter extends Component {
   constructor(props) {
       super(props);

       this.state = {
         votes: this.props.question.votes
       };

       this.vote = this.vote.bind(this);
   }

   componentDidMount() {

     this.props.socket.on("question:vote", this.vote);
   }

   vote(data) {

     if(data._id == this.props.question._id) {

       this.setState({
         votes: data.votes
       })
     }
   }

   handleClick(type) {

     if(type == "upvote") {
         this.props.socket.emit("question:vote", this.props.qId, this.props.question._id, 1);
     } else if (type =="downvote"){
         this.props.socket.emit("question:vote", this.props.qId, this.props.question._id, -1);
     }
   }

   render() {

     return (
         <div>
            <button style={ buttonStyle } ><img style={ imageStyle } src={upvoteButton} onClick={() => {this.handleClick("upvote")}}/></button>
              <p id="numVotes"> {this.state.votes} </p>
            <button style={ buttonStyle } ><img style={ imageStyle } src={downvoteButton} onClick={() => {this.handleClick("downvote")}}/></button>
         </div>
     );
   }
}

export default Voter
