import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './App';
import rootReducer from './root_reducer';
import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(thunk);

const store = createStore(
	rootReducer,
  	compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
  <Provider store = {store}><BrowserRouter><Route component={App}/></BrowserRouter></Provider>, document.getElementById('root'));          
registerServiceWorker();


