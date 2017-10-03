import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
} from './action'

function getAllCategories (state={
    isFetching: true,
    categories: []
  }, action) {
  const { categories } = action
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