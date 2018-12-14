import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect, Link } from 'react-router-dom';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.getPerson = this.getPerson.bind(this)
  }

  async getPerson() {
    const { username, password } = this.state;
    let res = await axios.post('/auth/signup', { username, password });
    this.setState({
      username: '',
      password: ''
    })
    if(res.data.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>Helo</div>
          <input 
            onChange={ (e) => this.setState({ username: e.target.value }) }
            type="text"
            value={ this.state.username }/><br/>
          <input 
            onChange={ (e) => this.setState({ password: e.target.value }) }
            type="password"
            value={ this.state.password }/><br/>
          <button>Login</button>
          <button onClick={ this.getPerson }>Register</button>
        </div>
      </div>
    );
  }
}

export default Auth;