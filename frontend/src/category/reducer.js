import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UP_VOTE,
  DOWN_VOTE,
  ADD_COMMENT,
} from './action'

function getAllCategories (state={
    isFetching: true,
    categories: []
  }, action) {
  const { categories } = action
  console.log(categories)
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        categories
      })
    default:
      return state
  }
}

export default combineReducers({
  getAllCategories
})