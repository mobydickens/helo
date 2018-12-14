import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.getPerson = this.getPerson.bind(this);
    this.login = this.login.bind(this);
  }

  async getPerson() {
    const { username, password } = this.state;
    let res = await axios.post('/auth/signup', { username, password });
    this.props.updateUser(res.data);
    this.setState({
      username: '',
      password: ''
    })
    if(res.data.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  async login() {
    const { username, password } = this.state;
    let res = await axios.post('/auth/login', { username, password });
    this.props.updateUser(res.data);
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
          <button onClick={ this.login }>Login</button>
          <button onClick={ this.getPerson }>Register</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateUser })(Auth);