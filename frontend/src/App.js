import React, { Component } from 'react';
import logo from './logo.svg';
import BoardContainer from './BoardContainer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BoardContainer />
      </div>
    );
  }
}

export default App;
