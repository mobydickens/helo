import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav/Nav.jsx';
import routes from './route';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        { routes }
      </div>
    );
  }
}

export default App;
