import React, { Component } from 'react';
import logo from './eyak.png';
import './App.css';

import { Router, Route, browserHistory } from 'react-router'

import Landing from './components/Landing';
import QuestionBoard from './components/QuestionBoard';

class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>eYak</h1>
        </div>

        <Router history={browserHistory}>
          <Route path='/' component={Landing} />
          <Route path='/q/:id/' component={QuestionBoard}/>
          <Route path='/q/:id/master' component={QuestionBoard} master={true}/>
        </Router>

      </div>
    );
  }
}

export default App;
