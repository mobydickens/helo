import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {

  constructor(props) {
    super(props);
      this.state = {
        search: [], 
        checked: true,
        posts: []
      }
      this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    let { userId } = this.props;
    let res = await axios.get(`/api/posts/${userId}`);
    this.setState({
      posts: res.data
    })
    // let { checked, search } = this.state;
    // if(search) {
    //   let res = await axios.get(`/api/posts/${userId}`, { userposts: checked, search: search })
    //   this.setState({
    //     posts: res.data
    //   })
    
    // } else {
    //   let res = await axios.get(`/api/posts/${userId}`, { userposts: checked })
    //   this.setState({
    //     posts: res.data
    //   })
    // }
  }

  resetSearch = () => {
    let { userId } = this.props;
    if(this.state.checked) {
      axios.get(`/api/posts/${userId}`, { userposts: true }).then(res => {
        this.setState({
          posts: res.data,
          search: ''
        })
      })
    }
  }

  changeCheckbox = () => {
    this.setState({
      checked: !this.state.checked
    })
  }
  
  render() {
    console.log(this.state.posts)
    let posts = this.state.posts.map((post, i) => {
      return (
        <div key={i} className='each-post'>
          <div>{post.title}</div>
          <div>{post.username}</div>
          <div>{post.post}</div>
        </div>
      )
    })
    return (
      <div className='dashboard'>
        <div className='main-col'>
          <div className='search-row'>
            <input type="search" onChange={ (e) => this.setState({ search: e.target.value }) }/>
            <button onClick={ () => this.getPosts() }>Search</button>
            <button onClick={ () => this.resetSearch() }>Reset</button>
            <label><input onClick={ this.changeCheckbox } type="checkbox"/>My Posts</label>
          </div>
          <div className='posts'>
            {posts}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.userId
  }
}
export default connect(mapStateToProps)(Dashboard);