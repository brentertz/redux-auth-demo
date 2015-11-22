import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './utils/store';
import { loadAuth } from './actions/auth';
import routes from './routes';

const store = configureStore();
const component = <ReduxRouter routes={ routes(store) } />;
const target = document.getElementById('app');

store.dispatch(loadAuth());

if (__DEVTOOLS__) {
  const DevTools = require('./components/DevTools');
  ReactDOM.render(
    <Provider store={ store }>
      <div>
        { component }
        <DevTools />
      </div>
    </Provider>,
    target
  );
} else {
  ReactDOM.render(
    <Provider store={ store }>
      { component }
    </Provider>,
    target
  );
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // Enable react devtools
}
