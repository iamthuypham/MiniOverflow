import { combineReducers } from 'redux'

import {
  GET_INIT_POSTS,
  GET_ONE_POST,
  ADD_POST,
} from './action'

function InitialPostsReducer (state={
    isFetching: true,
    posts: []
  }, action) {
  const { posts } = action
  switch (action.type) {
    case GET_INIT_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        posts
      })
    default:
      return state
  }
}
function CurrentPostsReducer (state={
    posts: []
  }, action) {
  const { post, posts } = action  
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, {
        posts:[
          ...posts, 
          post
        ]
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
  console.log(post)
  switch (action.type) {
    case GET_ONE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        post
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