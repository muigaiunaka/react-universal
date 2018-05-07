import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import history from './utils/history'
import { Router, Route } from 'react-router';
import reduxThunk from 'redux-thunk';

import reducers from './redux/reducers';
import { AUTH_USER } from './redux/actions/types';
import Routes from './Routes';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// contains the redux state
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if there is a token, consider the user signed in
if (token) {
  // update application state
  store.dispatch({ type: AUTH_USER });
}
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(() => { });
    });
  }
};
render();
if (module.hot) {
  module.hot.accept();
}