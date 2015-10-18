import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers';

const middleware = [
  thunk,
  createLogger({ collapsed: true })
];

const storeEnhancers = [
  reduxReactRouter({ createHistory }) // routes?
];

let finalCreateStore;

if (__DEVTOOLS__) {
  const { persistState } = require('redux-devtools');
  const DevTools = require('../components/DevTools');

  finalCreateStore = compose(
    applyMiddleware(...middleware),
    ...storeEnhancers,
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    ...storeEnhancers
  )(createStore);
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
