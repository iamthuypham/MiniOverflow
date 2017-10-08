import { combineReducers } from 'redux';

import CategoryReducer from './category/reducer';
import PostReducer from './post/reducer';
import CommentReducer from './comment/reducer';

export default combineReducers({
  CategoryReducer,
  PostReducer,
  CommentReducer
});