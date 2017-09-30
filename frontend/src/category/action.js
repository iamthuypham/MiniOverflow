export const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategories = categories => ({
        type: GET_CATEGORIES,
      	categories
  }
)

export function fetchCategories() {
  return function (dispatch) {
    return fetch(`${process.env.REACT_APP_BACKEND}/categories`, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then(res => res.json())
      .then(data => dispatch(getCategories(data))
    );
  };
}