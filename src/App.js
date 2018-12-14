import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Auth from './component/Auth/Auth';
import Form from './component/Form/Form';
import Post from './component/Post/Post';
import Nav from './component/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Auth />
        <Dashboard />
        <Form />
        <Post />
      </div>
    );
  }
}

export default App;
