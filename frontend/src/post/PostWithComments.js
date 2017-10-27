import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { fetchOnePost } from './action';
import { fetchThisPostComments } from '../comment/action';
import Comment from '../comment/Comment';

class PostWithComments extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {    
    const postIdParam = this.props.match.params.post_id
    this.props.dispatchFetchOnePost(postIdParam)
    this.props.dispatchFetchThisPostComments(postIdParam)
  }

  render() {
    const { isFetching, post, comments } = this.props
    console.log(this.props)
    return (
      <div>
      	<div>{post.author} - {post.title} - {post.body} - {post.voteScore}</div>
      	{!isFetching && comments.map((comment) => 
      		 <Comment key={comment.id} comment={comment}/>      
    	  )}
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state)
  const { post, isFetching } = state.PostReducer.getOnePostReducer
  const { comments } = state.CommentReducer.getThisPostComments
  return { 
    post,
    isFetching,
    comments
         }
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchOnePost: (postId) => dispatch(fetchOnePost(postId)),
  	dispatchFetchThisPostComments: (postId) => dispatch(fetchThisPostComments(postId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostWithComments);
