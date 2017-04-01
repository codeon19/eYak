import React, {Component} from 'react';

import front-end from '../front-end';

class Landing extends Component {

    constructor(props) {
        super(props);

        this.createQueue = this.createQueue.bind(this);
    }

    createSession() {
      front-end.createSession((sessionQ) => {
        
        this.props.router.push('/q/' + sessionQ + '/master?key=' + sessionQ.masterKey);
      });
    }

    render() {
        return (
            <div id='landing'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md text-center'>
                            <h2>Join an eYak Session </h2>

                            <p className='lead'></p>
                            <button className='btn btn-lg btn-primary' onClick={this.createSession}>
                                Start Session<i className='glyphicon'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
