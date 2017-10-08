import { combineReducers } from 'redux'

import {
  GET_POSTS_BY_CATEGORY,
  GET_ONE_POSTS
} from './action'

function getPostsByCategoryReducer (state={
    isFetching: true,
    posts: []
  }, action) {
  const { posts } = action
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

function getOnePostReducer (state={
    isFetching: true,
    post: []
  }, action) {
  const { post } = action
  switch (action.type) {
    case GET_ONE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        post
      })
    default:
      return state
  }
}

export default combineReducers({
  getPostsByCategoryReducer,
  getOnePostReducer
})