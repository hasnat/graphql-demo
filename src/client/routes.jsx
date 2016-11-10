import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import BrowsersList from './components/BrowsersList';

export default (
  <Route component={App}>
    <Route path="/" component={BrowsersList} />
  </Route>
);
