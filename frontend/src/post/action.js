export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'

const getPostsByCategory = posts => ({
        type: GET_POSTS_BY_CATEGORY,
      	posts
  }
)

export function fetchPostsByCategory(category) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/${category}/posts`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getPostsByCategory(data))
    );
  };
}