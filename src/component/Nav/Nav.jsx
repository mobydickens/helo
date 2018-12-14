import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {

  render() {
  const { location, username } = this.props;
  console.log('props in state', this.props);

    return(
      <div>
        {location.pathname === '/' ? " " : 
          <div>
            <div>Username: { username }</div>
            <Link to='/dashboard'><button>Home</button></Link>
            <Link to='/post/3'><button>New Post</button></Link>
            <Link to='/'><button>Logout</button></Link>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {})(withRouter(Nav));