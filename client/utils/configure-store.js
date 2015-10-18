import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers';

const storeEnhancers = [
  reduxReactRouter({ createHistory })
];

if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools');
  storeEnhancers.push(devTools());
}

const combinedCreateStore = compose(...storeEnhancers)(createStore);
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createLogger({ collapsed: true })
)(combinedCreateStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
