import React, { Component } from 'react';
import { connect } from 'react-redux';

import GreetingPhoto from '../components/GreetingPhoto';
import GreetingText from '../components/GreetingText';

import AppStyleIgnored from './App.scss';

class App extends Component {
  render() {
    return (
      <div className="wedding-app">
        <GreetingPhoto />
        <GreetingText />
      </div>
    );
  }
}

export default connect()(App);
