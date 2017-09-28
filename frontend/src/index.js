import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'

import App from './App';
import rootReducer from './root_reducer';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()

const middleware = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(
	rootReducer,
  	compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
  <Provider store = {store}><ConnectedRouter history={history}><App/></ConnectedRouter></Provider>, document.getElementById('root'));          
registerServiceWorker();


