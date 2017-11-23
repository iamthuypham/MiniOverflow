import { combineReducers } from 'redux'

import {
  GET_INIT_POSTS,
  RESET_POSTS_AFTER_CHANGE_PATH,
  GET_ONE_POST,
  ADD_POST,
  DELETE_POST
} from './action'

function InitialPostsReducer (state={
    posts: [],
    isInitial: true
  }, action) {
  const { posts } = action
  switch (action.type) {
    case GET_INIT_POSTS:
      return Object.assign({}, state, {
        posts,
        isInitial: true
      })
    default:
      return state
  }
}
function CurrentPostsReducer (state={
    posts: [],
    isInitial: true
  }, action) {
  const { post, posts } = action  
  switch (action.type) {
    case RESET_POSTS_AFTER_CHANGE_PATH:
      return Object.assign({}, {
        posts: [],
        isInitial: true,
      })
    case ADD_POST:
      return Object.assign({}, state, {
        posts:[
          ...posts, 
          post
        ],
        isInitial: false
      })
    case DELETE_POST:
      let index = posts.findIndex(anyPost => anyPost.id==post.id)
      return Object.assign({}, state, {
        posts: [
          ...posts.slice(0,index),
          ...posts.slice(index+1)
        ],
        isInitial: false
      })
    default:
      return state
  }
}
function getOnePostReducer (state={
    isInitial: true,
    post: []
  }, action) {
  const { post } = action
  switch (action.type) {
    case GET_ONE_POST:
      return Object.assign({}, state, {
        isInitial: false,
        post
      })
    case RESET_POSTS_AFTER_CHANGE_PATH:
      return Object.assign({}, state, {
        post: [],
        isInitial: true,
      })
    default:
      return state
  }
}

export default combineReducers({
  getOnePostReducer,
  InitialPostsReducer,
  CurrentPostsReducer
})