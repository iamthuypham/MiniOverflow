import { combineReducers } from 'redux'

import {
  GET_THIS_POST_COMMENTS,
  ADD_COMMENT,
  RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH
} from './action'

function getThisPostComments (state={
    comments: []
  }, action) {
  const { comments } = action
  switch (action.type) {
    case GET_THIS_POST_COMMENTS:
      return Object.assign({}, state, {
        comments
      })
    default:
      return state
  }
}

function CurrentCommentsReducer (state={
    comments: []
  }, action) {
  const { comment, comments } = action  
  switch (action.type) {
    case ADD_COMMENT:
      return Object.assign({}, state, {
        comments:[
          ...comments, 
          comment
        ]
      })
    case RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH:
      return Object.assign({}, state, {
        comments:[
        ]
      })
    default:
      return state
  }
}

export default combineReducers({
  getThisPostComments,
  CurrentCommentsReducer
})