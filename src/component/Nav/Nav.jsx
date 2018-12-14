import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';

class Nav extends Component {

  render() {
  const { location } = this.props;
  console.log(location);

    return(
      <div>
        {location.pathname === '/' ? " " : 
          <div>
            <Link to='/dashboard'><button>Home</button></Link>
            <Link to='/post/3'><button>New Post</button></Link>
            <Link to='/'><button>Logout</button></Link>
          </div>}
      </div>
    )
  }
}

export default withRouter(Nav);