import { combineReducers } from 'redux'

import {
  GET_POSTS_BY_CATEGORY,
} from './action'

function getPostsByCategoriesReducer (state={
    isFetching: true,
    posts: []
  }, action) {
  const { posts } = action
  console.log(posts)
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return Object.assign({}, state, {
        isFetching: false,
        posts
      })
    default:
      return state
  }
}

export default combineReducers({
  getPostsByCategoriesReducer
})