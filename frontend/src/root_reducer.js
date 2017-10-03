import { combineReducers } from 'redux';

import CategoryReducer from './category/reducer';
import PostReducer from './post/reducer';
//import CategoryReducer from './category/reducer';

export default combineReducers({
  CategoryReducer,
  PostReducer,
});