export const GET_THIS_POST_COMMENTS = 'GET_THIS_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH = 'RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH'
export const DELETE_COMMENT = 'DELETE_COMMENT'

const reset = () => ({
        type: RESET_CURRENT_COMMENT_AFTER_CHANGE_PATH
  }
)

const getThisPostComments = comments => ({
        type: GET_THIS_POST_COMMENTS,
      	comments
  }
)

const addComment = (comment, comments) => ({
        type: ADD_COMMENT,
      	comment,
      	comments
  }
)

const deleteComment = (comment, comments) => ({
        type: DELETE_COMMENT,
        comment,
        comments
  }
)

export function resetComments() {
  return function (dispatch) {
    dispatch(reset())
  }
}

export function fetchThisPostComments(postId) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getThisPostComments(data))
    );
  };
}

export function fetchAddComment(comment, comments) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/comments`
  
    const request = new Request(url, {
      method: 'post',
      body: JSON.stringify(comment),
      headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include'
    });

    return fetch(request).then(res => res.json()).then(data => dispatch(addComment(data, comments)))
  }
}

export function fetchDeleteComment(comment, comments) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/comments/${comment.id}`
  
    const request = new Request(url, {
      method: 'delete',
      headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' 
    });

    return fetch(request).then((res) => console.log(res)).then(data => dispatch(deleteComment(comment, comments)))
  }
}