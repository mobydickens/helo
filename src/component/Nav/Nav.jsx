import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {

  render() {
  const { location } = this.props;
  console.log('username: ', this.props.username);

    return(
      <div>
        {location.pathname === '/' ? " " : 
          <div>
            <div className='sidebar'>
              <div>Welcome, { this.props.username === undefined ? "User!" : this.props.username }</div>
              <Link to='/dashboard'><button>Home</button></Link>
              <Link to='/post/3'><button>New Post</button></Link>
              <Link to='/'><button>Logout</button></Link>
            </div>
          </div>}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    username: state.username
  }
};

export default withRouter(connect(mapStateToProps)(Nav));