export const GET_INIT_POSTS = 'GET_INITL_POSTS'
export const GET_ONE_POST = 'GET_ONE_POST'
export const ADD_POST = 'ADD_POST'

const getInitialPosts = (posts) => ({
        type: GET_INIT_POSTS,
      	posts
  }
)
const getOnePost = post => ({
        type: GET_ONE_POST,
      	post
  }
)
const addPost = (post, posts) => ({
        type: ADD_POST,
  		post,
  		posts,      	
  }
)
export function fetchInitialPosts() {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getInitialPosts(data)))
    .catch(function(error) { console.log("error: "+ error); })
  };
}

export function fetchOnePost(postId) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getOnePost(data)))
    .catch(function(error) { console.log("error: "+ error); })
  };
}

export function fetchAddPost(post, posts) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts`

    const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(post),
      headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json", },
      credentials: 'include' 
    });

    return fetch(request).then(res => res.json()).then(data => dispatch(addPost(data, posts)))
  };
}