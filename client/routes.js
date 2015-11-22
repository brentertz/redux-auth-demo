import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { AccountContainer, AppContainer, LoginContainer } from './containers';
import { Home, NotFound } from './components';
import { isLoggedIn } from './reducers/auth';

export default function routes(store) {
  const requireLogin = (nextState, replaceState) => {
    if (!isLoggedIn(store.getState())) {
      replaceState(null, '/login');
    }
  };

  return (
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ Home } />
      <Route onEnter={ requireLogin }>
        <Route path="account" component={ AccountContainer } />
      </Route>
      <Route path="login" component={ LoginContainer } />
      <Route path="*" component={ NotFound } />
    </Route>
  );
};
