import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import CategoryReducer from './category/reducer';
//import CategoryReducer from './category/reducer';
//import CategoryReducer from './category/reducer';

export default combineReducers({
  router: routerReducer,
  CategoryReducer,
  
});