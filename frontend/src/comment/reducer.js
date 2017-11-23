import { combineReducers } from 'redux'

import {
  GET_THIS_POST_COMMENTS,
  ADD_COMMENT,
  RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH,
  DELETE_COMMENT
} from './action'

function getThisPostComments (state={
    comments: [],
    isInitial: true
  }, action) {
  const { comments } = action
  switch (action.type) {
    case GET_THIS_POST_COMMENTS:
      return Object.assign({}, state, {
        comments,
        isInitial: true
      })
    default:
      return state
  }
}

function CurrentCommentsReducer (state={
    comments: [],
    isInitial: true
  }, action) {
  const { comment, comments } = action  
  switch (action.type) {
    case ADD_COMMENT:
      return Object.assign({}, state, {
        comments:[
          ...comments, 
          comment
        ],
        isInitial: false
      })
    case DELETE_COMMENT:
      let index = comments.findIndex(anyComment => anyComment.id==comment.id)
      return Object.assign({}, state, {
        comments: [
          ...comments.slice(0,index),
          ...comments.slice(index+1)
        ],
        isInitial: false
      })
    case RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH:
      return Object.assign({}, state, {
        comments:[
        ],
        isInitial: true
      })
    default:
      return state
  }
}

export default combineReducers({
  getThisPostComments,
  CurrentCommentsReducer
})