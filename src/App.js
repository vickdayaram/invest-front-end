import React, { Component } from 'react';
import Nav from './components/nav'
import HomePage from './containers/homepage'

class App extends Component {
  render() {
    return (
      <div>
        I am App
        < Nav />
        < HomePage />
      </div>
    );
  }
}

export default App;
