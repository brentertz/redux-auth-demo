import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Account, App, Home, Login, NotFound } from './components';

export default function routes(store) {
  const requireLogin = (nextState, replaceState) => {
    const isLoggedIn = !!store.getState().auth.token;
    if (!isLoggedIn) {
      replaceState(null, '/login');
    }
  };

  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route onEnter={ requireLogin }>
        <Route path="account" component={ Account } />
      </Route>
      <Route path="login" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Route>
  );
};
