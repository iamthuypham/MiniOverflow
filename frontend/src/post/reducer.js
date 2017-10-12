import { combineReducers } from 'redux'

import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_ONE_POST,
  ADD_POST,
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
function getAllPostsReducer (state={
    isFetching: true,
    posts: []
  }, action) {
  const { posts } = action
  console.log(posts)
  switch (action.type) {
    case GET_ALL_POSTS:
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
    case GET_ONE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        post
      })
    default:
      return state
  }
}
function addPostReducer (state={
    isAdded: false,
    posts: []
  }, action) {
  const { response, post, posts } = action
  if (post) {
    post.deleted = response.deleted
    post.voteScore = response.voteScore
  }
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, {
        isAdded: true,
        posts:[
          ...posts, 
          post: {
          ...state,
          },          
        ]
      })
    default:
      return state
  }
}

export default combineReducers({
  getPostsByCategoryReducer,
  getOnePostReducer,
  addPostReducer,
  getAllPostsReducer
})