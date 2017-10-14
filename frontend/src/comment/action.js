export const GET_THIS_POST_COMMENTS = 'GET_THIS_POST_COMMENTS'

const getThisPostComments = comments => ({
        type: GET_THIS_POST_COMMENTS,
      	comments
  }
)

export function fetchThisPostComments(postId) {
  return function (dispatch) {
    const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`
    return fetch( url, { headers: { 'Authorization': 'whatever-you-want' }, credentials: 'include' })
    	.then((res) => res.json())
      .then(data => dispatch(getThisPostComments(data))
    );
  };
}