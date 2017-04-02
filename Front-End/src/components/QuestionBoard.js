import React, {Component} from 'react';

import Client from '../front-end';
import Question from './Question';
import EmptyBoard from './EmptyBoard';

class QuestionBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          questionBoard: [],
          master: this.props.route.master,
          masterKey: this.props.location.query.key
        };

        Client.getQuestionBoard("r1QSmnThl", (questionB) => {
              if (questionB.doesNotExist) {
                console.log("Question Board does not exist!");
              } else {
                this.setState({
                  questionBoard: questionB.questionBoard
                })
              }
            });

        // Client.getQuestionBoard(this.props.params.id, (questionB) => {
        //       if (questionB.doesNotExist) {
        //         console.log("Question Board does not exist!");
        //       } else {
        //         this.setState({
        //           questionBoard: questionB.questionBoard
        //         })
        //       }
        //     });
    }

    render() {

      const questionBoard = this.state.questionBoard.map((question, i) => (
        <Question
          key={question._id}
          text={question}
          index={i}
        />
      ));

        return (
            <div id='landing'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md text-center'>
                            {(this.state.questionBoard.length !== 0) ? (questionBoard) : (<EmptyBoard key='emptyBoard'/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionBoard;
