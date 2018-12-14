import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './component/Auth/Auth.jsx';
import Dashboard from './component/Dashboard/Dashboard.jsx';
import Form from './component/Form/Form.jsx';
import Post from './component/Post/Post.jsx';

export default (
  <Switch>
    <Route exact path='/' component={ Auth } />
    <Route path='/dashboard' component={ Dashboard } />
    <Route path='/post/:postid' component={ Post } />
    <Route path='/new' component={ Form }/>
  </Switch>
)