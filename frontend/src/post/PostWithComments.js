import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { fetchOnePost } from './action';
import { fetchThisPostComments, fetchAddComment, resetComments } from '../comment/action';
import Comment from '../comment/Comment';
import CommentForm from '../comment/CommentForm';

class PostWithComments extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this)
  }
  componentDidMount() {    
    const postIdParam = this.props.routing.match.params.post_id
    this.props.dispatchFetchOnePost(postIdParam)
    this.props.dispatchResetComments()
    this.props.dispatchFetchThisPostComments(postIdParam)
  }
  handleSubmitRequest(comment) {
  	this.props.dispatchFetchAddComment(comment,this.props.commentsByPost)
  }

  render() {
    const { post, commentsByPost } = this.props
    console.log(this.props)
    return (
      <div>
      	<div>{post.author} - {post.title} - {post.body} - {post.voteScore}</div>
      	<div>Comments</div>
      	{commentsByPost && commentsByPost.map((comment) => 
          comment.id && <Comment key={comment.id} comment={comment}/>      
        )}
        <div>Add a comment</div>
         <CommentForm post={post} comments={commentsByPost} onSubmitRequest={this.handleSubmitRequest}/>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const currentPostId = ownProps.routing.match.params.post_id
  let commentsByPost
  const { post } = state.PostReducer.getOnePostReducer
  const { comments } = state.CommentReducer.getThisPostComments
  const currentComments = state.CommentReducer.CurrentCommentsReducer.comments
  
  if (currentComments.length) {
    commentsByPost = currentComments.filter((comment) => comment.parentId === currentPostId)
  } else {
  	commentsByPost = comments.filter((comment) => comment.parentId === currentPostId)
  }
  return {post, commentsByPost}
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchOnePost: (postId) => dispatch(fetchOnePost(postId)),
  	dispatchResetComments: () => dispatch(resetComments()),
  	dispatchFetchThisPostComments: (postId) => dispatch(fetchThisPostComments(postId)),
  	dispatchFetchAddComment: (comment, comments) => dispatch(fetchAddComment(comment, comments)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostWithComments);
