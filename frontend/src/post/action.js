export const GET_INIT_POSTS = 'GET_INITL_POSTS'
export const RESET_POSTS_AFTER_CHANGE_PATH = 'RESET_POSTS_AFTER_CHANGE_PATH'
export const GET_ONE_POST = 'GET_ONE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

const getInitialPosts = (posts) => ({
        type: GET_INIT_POSTS,
      	posts
  }
)

const reset = () => ({
        type: RESET_POSTS_AFTER_CHANGE_PATH,
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

const deletePost = (posts, post) => ({
        type: DELETE_POST,
        posts,
        post
  }
)
export function resetPosts() {
  return function (dispatch) {
    dispatch(reset())
  };
}

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
      headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json",}
    });

    return fetch(request).then(res => res.json()).then(data => dispatch(addPost(data, posts)))
  };
}

export function fetchDeletePost(post,posts) {
  console.log(post)
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${post.id}`

    const request = new Request(url, {
      method: 'delete',
      headers: { 'Authorization': 'whatever-you-want', "Content-Type": "application/json",}
    });

    return fetch(request)
      .then((res) => {console.log(res)})
      .then(data => dispatch(deletePost(posts, post)))
  };
}