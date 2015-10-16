import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools';
import configureStore from './utils/configure-store';
import * as authActions from './actions/auth';
import routes from './routes';

const initialState = {
  auth: {
    token: null
  }
};

export const store = configureStore(initialState);

const component = (
  <Provider store={ store } key="provider">
    <ReduxRouter>
      { routes(store) }
    </ReduxRouter>
  </Provider>
);

const target = document.getElementById('app');

store.dispatch(authActions.load());

ReactDOM.render(component, target);

if (__DEVTOOLS__) {
  ReactDOM.render(
    <div>
      { component }
      <DebugPanel key="debug-panel" top right bottom>
        <DevTools store={ store } monitor={ LogMonitor } />
      </DebugPanel>
    </div>,
    target
  );
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // Enable react devtools
}
