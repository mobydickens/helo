import React, { Component } from 'react';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <div>Helo</div>
          <input onChange={ (e) => this.setState({ username: e.target.value }) }type="text"/><br/>
          <input onChange={ (e) => this.setState({ password: e.target.value }) }type="password"/><br/>
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    );
  }
}

export default Auth;