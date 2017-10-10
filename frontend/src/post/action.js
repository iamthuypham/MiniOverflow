export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_ONE_POSTS = 'GET_ONE_POSTS'
export const ADD_POST = 'ADD_POST'

const getPostsByCategory = posts => ({
        type: GET_POSTS_BY_CATEGORY,
      	posts
  }
)
const getOnePost = post => ({
        type: GET_ONE_POSTS,
      	post
  }
)
const addPost = (response, post, posts) => ({
        type: ADD_POST,
  		post,
  		posts,
      	response
  }
)
export function fetchPostsByCategory(categoryId) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/${categoryId}/posts`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getPostsByCategory(data)))
  };
}

export function fetchOnePost(postId) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getOnePost(data)))
  };
}

export function fetchAddPost(post, posts) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts`
    return fetch( url, { method: 'post', body: JSON.stringify(post), headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then(res => res.json())
      .then(data => dispatch(addPost(data, post, posts)))
  };
}