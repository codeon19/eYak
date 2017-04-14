import React, {Component} from 'react';

import { Link } from 'react-router';

import Client from '../front-end';

class Landing extends Component {
    constructor(props) {
        super(props);

        this.createSession = this.createSession.bind(this);
    }

    createSession() {
      Client.createSession((sessionQ) => {
        this.props.router.push('/q/' + sessionQ._id + '/master?key=' + sessionQ.masterKey);
      });
    }

    render() {
        return (
            <div id='landing'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md text-center'>
                            <h3>Join an eYak Session </h3>

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
