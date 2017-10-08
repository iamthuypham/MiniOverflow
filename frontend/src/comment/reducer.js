import { combineReducers } from 'redux'

import {
  GET_THIS_POST_COMMENTS
} from './action'

function getThisPostComments (state={
    isFetching: true,
    comments: []
  }, action) {
  const { comments } = action
  switch (action.type) {
    case GET_THIS_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        comments
      })
    default:
      return state
  }
}

export default combineReducers({
  getThisPostComments
})