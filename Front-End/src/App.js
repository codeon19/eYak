import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';

import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

import Landing from './components/Landing';

class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to eYak</h2>
        </div>

        <HashRouter>
          <div>
            <Route exact path="/" component={Landing} />
          </div>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
