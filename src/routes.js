import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.js';
import Home from './components/Home.js';
import About from './components/About.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About}/>
  </Route>
);
